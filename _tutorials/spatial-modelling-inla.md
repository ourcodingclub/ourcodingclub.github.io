---
layout: tutorial
title: Hierarchical modelling of spatial data
subtitle: Spatial modelling using R-INLA
date: 2019-02-23 08:40:00
author: Lisa Gecchele
survey_link: 
tags: modelling intermediate advanced
---

## Tutorial Aims:

1. [Learn to fit simple models on area data](#lattice)
2. [Learn the basics of geostatistical (marked points) data modelling](#point)
3. [Construct and run more complex spatial models](#increasecomplexity)
4. [Plot spatial predictions and gaussian random field](#modelpredictions)

<br>
{% capture callout %}
__Keen to take your analyses and statistical models to the next level? Working with data distributed across space and want to incorporate their spatial structure in your models? If yes, read on and you can jumpstart your spatial modelling journey! This tutorial is meant to be a starting point for anyone interested in spatial modelling, and aims to show the basics of modelling spatial data using `R-INLA`. This is by no mean a comprehensive tutorial, and it's only scratching the surface of what is possible using INLA. However, my main goal with this tutorial is to give you the tools needed to start a basic analysis, in a way that would make more advanced customisation of the model possible (if not easy) using the available resources.__
{% endcapture %}
{% include callout.html content=callout colour='important' %}
<br>
{% capture callout %}
The first and most important concept you need to remember (in my opinion), is the concept of neighbourhood. By Tobler’s first law of geography, *"Everything is related to everything else, but near things are more related than distant things*, in practice this translate in having neighbours (or individuals from a given species, or entire plots, if you're an ecologist) that are more similar with each other than individuals that are far away.
{% endcapture %}
{% include callout.html content=callout colour='callout' %}

`INLA` explicitly uses neighbouring structures to estimate the spatial autocorrelation structure of the entire dataset. For area data this is relatively straghtforward as there is an explicit neighbouring structure included in the data (areas either share a border or they don't). For point processes, however, we need to create an artificial discretisation of the space to tell the models which points are close to each other and where each new point have explicit neighbours so we can calculate the spatial autocorrelation structure among them. Once you understand this concept, the steps taken to fit a spatial model become logical, as it is just a matter of finding the best way to discretise the space and relate it back to the original dataset.

Analysis of area data (where each polygon has clearly defined neighbours) is generally more straightforward, and that is where we will start in this tutorial and then we will gradually build up the complexity.

This tutorial assumes working knowledge of <a href="https://ourcodingclub.github.io/tutorials/mixed-models/" target="_blank">GLMs and GLMMs</a>, as well as <a href="https://ourcodingclub.github.io/tutorials/mcmcglmm/" target="_blank">Bayesian statistics</a> and some experience in <a href="https://ourcodingclub.github.io/tutorials/maps/" target="_blank">spatial data manipulation</a> (especially of  <a href="https://ourcodingclub.github.io/tutorials/spatial/" target="_blank">raster data</a>). Luckily, all these subjects are covered by previous Coding Club tutorials, so check them out! It might also be useful to have a read our other <a href="https://ourcodingclub.github.io/tutorials/inla/" target="_blank">INLA tutorial</a>, which includes some introduction to the general framework of `R-INLA`.

## The packages

Before going further in the tutorial, it would be good to start downloading the relevant packages (if you don't have them already). Some of them ( `R-INLA` in particular), might take several minutes, so you might want to do this before starting the tutorial.
```R
# Adding dep = T means you will also install package dependencies
install.packages("RColorBrewer", dep = T)
install.packages("spdep", dep = T)
install.packages("sp", dep = T)
install.packages("rgdal", dep = T)
install.packages("raster", dep = T)

# To download the most recent stable version of the package.
install.packages("INLA", 
                 repos = c(getOption("repos"), 
                         INLA = "https://inla.r-inla-download.org/R/stable"), 
                 dep = T)
```

## The dataset

We will be using two datasets for this practical, derived from my own fieldwork here in Edinburgh. The purpose of the study was to collect fox scats (i.e. faecal marking) in public greenspace around the city of Edinburgh and analyse them for gastrointestinal parasites. 

{% capture callout %}
All the files you need to complete this tutorial can be downloaded from [this repository](https://github.com/ourcodingclub/spatial-inla). __Click on `Clone/Download/Download ZIP` and unzip the folder, or clone the repository to your own GitHub account.__
{% endcapture %}
{% include callout.html content=callout colour=alert %}

## The question

##### Is the amount of greenspace in an area was significantly correlated with:
##### A) The number of fox scats found
##### B) The number of parasite species (species richness) found in each scat

The data I am going to use includes area data of the number of scats found (The exagonal lattice in the figure) and the point data of the parasite richness we found per sample.

{% capture link %}{{ site.baseurl }}/assets/img/tutorials/spatial-inla/FIG01_Dataset.jpg{% endcapture %}
{% include figure.html url=link caption="Dataset overview" %}

<a name="lattice"></a>
## Modelling Area Data

__The aim of this section is to carry out a spatial analysis on area data.__ This kind of data is normally found in epidemiological, ecological or social sciences studies. In brief, it reports the number of cases (generally of a disease) recorded per area, which could be an administrative district, such as a post-code area, council area, region and so on. The main characteristic of area data is that there are explicit neighbours for each or the areas, which makes computing the autocorrelation structure much easier.

__Here, we are going to test the hypothesis that a higher greenspace ratio (a higher percentage of green areas) is associated with a higher number of scats found. We are going to use a dataset I have modified for the purpose of this tutorial. The data refer to the number of fox scats found in the city of Edinburgh during a 6 months survey of every public green area in the city.__

To do so, I have constructed a lattice that covers the study area, and for each zone recorded the number of scats found, along with the greenspace ratio, calculated using the <a href="https://digimap.edina.ac.uk/webhelp/os/data_information/os_products/scotlands_greenspace_map.htm" target="_blank">Greenspace Dataset</a> from Edina Digimap.

```R
# Load the lattice shapefile and the fox scat data
require(sp)  # package to work with spatial data
require(rgdal)  # package to work with spatial data

# Fox lattice is a spatial object containing the polygons constructed on the basis of the data
# (normally you would use administrative district)
Fox_Lattice <- readOGR("Fox_Lattice/Fox_Lattice.shp")

require(RColorBrewer)
# Create a colour palette to use in graphs
my.palette <- brewer.pal(n = 9, name = "YlOrRd")

# Visualise the number of scats across space
spplot(obj = Fox_Lattice, zcol = "Scat_No",
       col.regions = my.palette, cuts = 8)
```

{% capture link %}{{ site.baseurl }}/assets/img/tutorials/spatial-inla/FIG02_Scat_No.jpeg{% endcapture %}
{% include figure.html url=link caption="Number of fox scats across space" %}

As mentioned previously, `INLA` needs to know which areas are neighbouring, so it can compute the spatial autocorrelation structure, we do that by computing the adjacency matrix.

``` R
# We can extract the data frame attached to the shape (file extensioon shp) object 
Lattice_Data <- Fox_Lattice@data
str(Lattice_Data)

require(spdep)
require(INLA)

# Specify the adjacency matrix
Lattice_Temp <- poly2nb(Fox_Lattice)
nb2INLA("Lattice.graph", Lattice_Temp)
Lattice.adj <- paste(getwd(),"/Lattice.graph",sep="")

inla.setOption(scale.model.default = F)
H <- inla.read.graph(filename = "Lattice.graph")  

# Plot adjacency matrix 
image(inla.graph2matrix(H), xlab = "", ylab = "")
```
Note that in this case the cells were already sorted so they are only adjacent to ones with a similar name. When using administrative districts this matrix will likely be messier.

{% capture link %}{{ site.baseurl }}/assets/img/tutorials/spatial-inla/FIG02b_Adjacency Matrix.jpeg{% endcapture %}
{% include figure.html url=link caption="Adjacency matrix" %}

We also need to specify the model formula. This model will test whether there is a linear effect of greenspace ratio (`GS_ratio`) on the number of fox scats found in each area across Edinburgh. We will do the model formula first, which doesn't actually run our model, and we will do the running part in the next step.

``` R
formula <- Scat_No ~ 1 + GS_Ratio + # fixed effect
  f(ZONE_CODE, model = "bym",       # spatial effect: ZONE_CODE is a numeric identifier for each area in the lattice  (does not work with factors)
    graph = Lattice.adj)            # this specifies the neighbouring of the lattice areas
```

{% capture callout %}
_NOTE:_ The spatial effect is modelled using the BYM (Besag, York and Mollie's model) is the model type usually used to fit area data. CAR (conditional auto-regressive) and besag models are other options, but here we will focus on BYM since that is appropriate way to model the spatial effect when working with area data.
{% endcapture %}
{% include callout.html content=callout colour='callout' %}

```r
# Finally, we can run the model using the inla() function
Mod_Lattice <- inla(formula,     
                    family = "poisson",  # since we are working with count data
                    data = Lattice_Data,
                    control.compute = list(cpo = T, dic = T, waic = T))  
# CPO, DIC and WAIC metric values can all be computed by specifying that in the control.compute option
# These values can then be used for model selection purposes if you wanted to do that
```

We've now ran our first `INLA` model, nice one!

### Setting priors

__We can also set priors for the hyperparameters by specifying them in the formula. `INLA` works with precision (tau = 1/Variance) so a very low precision corresponds to a very high variance by default. Keep in mind that the priors need to be specified for the linear predictor of the model (so they need to be transformed according to the data distribution) in this case they follow a log gamma distribution (since it's a Poisson model).__

```R
formula_p <- Scat_No ~ 1 + GS_Ratio + 
  f( ZONE_CODE, model = "bym", 
     graph = Lattice.adj, 
     scale.model = TRUE,
     hyper = list(
       prec.unstruct = list(prior = "loggamma", param = c(1,0.001)),   # precision for the unstructured effect (residual noise)
       prec.spatial =  list(prior = "loggamma", param = c(1,0.001))    # precision for the spatial structured effect
       )
     )

Mod_Lattice_p <- inla(formula_p,
                    family = "poisson",
                    data = Lattice_Data,
                    control.compute = list(cpo = T)
                  )
                                    
summary(Mod_Lattice)
summary(Mod_Lattice_p)

# We can extract the summary of the fixed effects (in this case only GS)
round(Mod_Lattice$summary.fixed, 3)
```

The posterior mean for the random (spatial) effect can also be computed and plotted overlayed to the lattice. To do so, we need to extract the posterior mean of the spatial effect for each of the cells in the lattice (using the `emarginal()` function) and then add it to the original shapefile so we can map it.

This represents the distribution in space of the response variable, once you accounted for the covariates included in the model. Think of it as the "real distribution" of the response variable in space, according to the model (obviously this is only as good as the model we have and will suffer if the estimation are poor, we have missing data or we failed to include an important covariate in our model).

```R
# Calculating the number of areas
Nareas <- length(Lattice_Data[,1])

csi <- Mod_Lattice$marginals.random$ZONE_CODE[1:Nareas]
zeta <- lapply(csi,function(x) inla.emarginal(exp,x))  
# we exponentiate the distibutions to convert them into real numbers 
# (the output of the model is expressed in the linear predictor scale of the model which was a log scale)

zeta.cutoff <- c(0, 1, 2, 5, 9, 15, 20, 35, 80, 800)   # we make a categorisation to make visualisation easier
cat.zeta <- cut(unlist(zeta),
                breaks = zeta.cutoff,
                include.lowest = TRUE)

# Create a dataframe with all the information needed for the map
maps.cat.zeta <- data.frame(ZONE_CODE = Lattice_Data$ZONE_CODE, 
                            cat.zeta = cat.zeta)

# Create a new polygon from Fox_Lattice and add the value of the posterior mean
Fox_Lattice_post <- Fox_Lattice
data.fox.post <- attr(Fox_Lattice_post, "data")
attr(Fox_Lattice_post, "data") <- merge(data.fox.post, 
                                       maps.cat.zeta, 
                                       by = "ZONE_CODE")
```

Now we are ready to make a colour palette and make our map!

```r
my.palette.post <- rev(brewer.pal(n = 9, name = "YlGnBu"))
spplot(obj = Fox_Lattice_post, zcol = "cat.zeta",
       col.regions = my.palette.post)
```

{% capture link %}{{ site.baseurl }}/assets/img/tutorials/spatial-inla/FIG03_PostMean.jpeg{% endcapture %}
{% include figure.html url=link caption="Posterior means mapped across space showing the number of fox scats as per our model." %}

Similarly, we can plot the uncertainty associated with the posterior mean. As with any modelling, important to think not just about the mean, but how confident we are in that mean.

``` R
a <- 0
prob.csi <- lapply(csi, function(x) {1 - inla.pmarginal(a, x)})

prob.csi.cutoff <- c(0, 0.1, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1)
cat.prob.csi <- cut(unlist(prob.csi),
                    breaks = prob.csi.cutoff, 
                    include.lowest = T)

# Create a new polygon from Fox_Lattice and add the value of the posterior sd
maps.cat.prob.csi <- data.frame(ZONE_CODE = Lattice_Data$ZONE_CODE, 
                                cat.prob.csi = cat.prob.csi)

Fox_Lattice_var <- Fox_Lattice
data.fox.var <- attr(Fox_Lattice_var, "data")
attr(Fox_Lattice_var, "data") <- merge(data.fox.var, 
                                       maps.cat.prob.csi, 
                                       by = "ZONE_CODE")

my.palette.var <- brewer.pal(n = 9, name = "BuPu")
spplot(obj = Fox_Lattice_var, zcol = "cat.prob.csi",
       col.regions = my.palette.var, add = T)
```

{% capture link %}{{ site.baseurl }}/assets/img/tutorials/spatial-inla/FIG04_PostVar.jpeg{% endcapture %}
{% include figure.html url=link caption="Uncertainty in the posterior means mapped across space as per our model." %}

{% capture callout %}
Note that the posterior mean is highest where we have the higher level of uncertainty. We have some area where the response variable reaches really high numbers, this is due to missing GS data in this areas (GS=0), so the model compensates for it; however, these are the areas where we also have the highest uncertainty, because the model is unable to produce accurate estimates.
{% endcapture %}
{% include callout.html content=callout colour='important' %}

<a name="point"></a>

## Geostatistical Data: Marked Point Data

{% capture callout %}
For this analysis, we will be using geostatistical data, also known as marked points. In practice the dataset comprises of georeferenced points that have an associated value (which is generally the response variable). In this example, we are going to be using the same points I used to generate the dataset for the spatial data (the Edinburgh fox scats), but we will be looking at the number of parasites species (`Spp_Rich`) found in each scat. The dataset also contains a number of variables associated with each sample: 

- JanDate (the date when the sample was collected)
- Site (which park was it collected from), 
- Greenspace variability (`GS_Var`) which is a categorical variable measuring the number of different greenspace types (Low, Med, High)
{% endcapture %}
{% include callout.html content=callout colour='callout' %}

In this case we are going to model the species richness of gastrointestinal parasites as a function of greenspace ratio, while taking into account both the spatial effect and the other covariates mentioned just above.

``` R
Point_Data <- read.csv("Point_Data.csv")
str(Point_Data )
```

When transforming the point dataset into a spatial object, we need to specify a Coordinate Reference System (CRS). The coordinates for this dataset are expressed in Easting / Northing and it's projected using the British National Grid (BNG). This is important in case you are using multiple shapefiles which might not be in the same coordinate system, and they will have to be projected accordingly.

{% capture callout %}
_NOTE:_ The choice of CRS should be done on the basis of the extent of the study area. 
- __Small areas__ - For small areas (such as this), Easting-Northing coordinate systems are best. They effectively express the coordinates on a flat surface (which does not take into account the globe curvature and consequent modification of the projection shape). 
- __Medium-sized studies__ - We should use Latitude-Longitude for medium-sized studies (country level/ multi country levels), as this will take into account a more realistic shape of the map. 
- __Continental and global-scale studies__ - Finally, for studies conducted at continental and global scale, we should use radians and fit the mesh taking into account the curvature of the globe.
{% endcapture %}
{% include callout.html content=callout colour='important' %}

The type of coordinates is important as several steps in the code are unit-specific and should be modified accordingly. I will point them out as they come up. To illustrate this concept, I will plot the points against the shapefile of Scotland, derived from <a href="https://gadm.org/index.html" target="_blank">GADM website</a> (an excellent source for administrative district shapefiles), which is mapped using Lat-Long.

``` R
require (rgdal)

# First, we need the coordinates of the points
Loc <- cbind(Point_Data$Easting, Point_Data$Northing)
# Then we can transform our dataset in a spatial object (a spatial point dataframe)
Fox_Point <- SpatialPointsDataFrame(coords = Loc, data = Point_Data, match.ID = T,
                                    proj4string = CRS("+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 
                                                           +datum=OSGB36 +units=m +no_defs +ellps=airy +towgs84=446.448,
                                                           -125.157,542.060,0.1502,0.2470,0.8421,-20.4894"))

par(mfrow = c(1,1), mar = c(1,1,1,1))
plot(Fox_Point, col = 2, pch = 16, cex = 0.5)

# Load the UK shapefile and subset the Scotland polygon
UK_Shape <- readOGR(dsn = "United Kingdom", layer = "gadm34_GBR_1")
Scot_Shape <- UK_Shape[UK_Shape$NAME_1 == "Scotland",]

# Using the proj4string() function we can check the projection of the shapefile
proj4string(Scot_Shape)
# You should see "+proj=longlat +datum=WGS84 +no_defs +ellps=WGS84 +towgs84=0,0,0"
```

This is the standard latitude/longitude coordinate system, which is projected in a geodesic system (taking into account the curvature of the globe). Most shapefiles (especially at country level) will use this coordinate system. This <a href="https://www.nceas.ucsb.edu/~frazier/RSpatialGuides/OverviewCoordinateReferenceSystems.pdf" target="_blank">Cheatsheet </a> provides more context and explains how to specify the right coordinate system using R notation.

Trying to plot both our points and our shapefile in the same map will not work as they cannot be plotted in their coordinates are expressed in different systems.
```R

plot(Fox_Point, col = 2, pch = 16, cex = 0.5)
plot(Scot_Shape, add = T)
```

{% capture link %}{{ site.baseurl }}/assets/img/tutorials/spatial-inla/FIG05_Point_wrongCRS.jpeg{% endcapture %}
{% include figure.html url=link caption="" %}

However, if we change the transform the CRS of Scot_Shape using the `spTransform()` function, we can map them together
``` R
foxcrs <- CRS("+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 
                                                           +datum=OSGB36 +units=m +no_defs +ellps=airy +towgs84=446.448,
                                                           -125.157,542.060,0.1502,0.2470,0.8421,-20.4894")

Scot_Shape_BNG <- spTransform(Scot_Shape, foxcrs)

plot(Fox_Point, col = 2, pch = 16, cex = 0.5)
plot(Scot_Shape_BNG, add = T)
```

{% capture link %}{{ site.baseurl }}/assets/img/tutorials/spatial-inla/FIG06_Point_rightCRS.jpeg{% endcapture %}
{% include figure.html url=link caption="" %}

__Now that the data is properly loaded, we can start putting together all the components required by a geostatistical `INLA` model. We'll start fitting just a simple base model with only an intercept and spatial effect in it and build up complexity from there.__

{% capture callout %}
The absolutely essential component of a model are: 

##### The mesh
##### The projector matrix
##### The correlation structure specifier(spde) 
##### The formula
{% endcapture %}
{% include callout.html content=callout colour='important' %}

### The Mesh
Unlike the area data, point data do not have explicit neighbours and thus we would have to calculate the autocorrelation structure between each possible point existing in the space, which is obviously imposssible. For this reason,the first step is to discretise the space to create a mesh that would create artificial (but useful) set of neighbours so we could calculate the autocorrelation between points `INLA` uses a triangle mesh, because is much more flexible and can be adapted to irregular spaces. There are several options that can be used to adjust the mesh.
I will not spend a lot of time explaining the mesh as there are a number of excellent tutorials that do that much better than I could, and I find defining the mesh is the easiest part of this process

``` R
# Then we can construct the mesh around them
Mesh1 <- inla.mesh.2d(Loc, 
                      max.edge = c(500))       # this part specify the maximum lenght of the triangle edge. 
                                               # THIS NEEDS TO BE SPECIFIED IN COORDINATE UNITS (in this case this would be in metres)
Mesh2 <- inla.mesh.2d(Loc, 
                      max.edge = c(900, 2000)) # We can also specify an outer layer with a lower triangle density where there are no points to avoid edge effect

Mesh3 <- inla.mesh.2d(Loc, 
                      max.edge = c(900, 2000), 
                      cutoff = 200)            # The cutoff is the distance at which two points will be considered as one. Useful for dataset with a lot of points clamped together

Mesh4 <- inla.mesh.2d(Loc, 
                      max.edge = c(900, 2000), 
                      cutoff = 200, 
                      offset = c(1000, 1000))    # The offset control the extension of the two layer (high and low triangle density)

# Ideally, we aim to have a regular mesh with an inner layer of triangles, without clumping and with a smooth, lower density of triangles on the outer layer
par(mfrow = c(2,2), mar = c(1,1,1,1))
plot(Mesh1,asp = 1, main = "")
points(Loc, col = 2, pch = 16, cex = 0.1)

plot(Mesh2,asp = 1, main = "")
points(Loc, col = 2, pch = 16, cex = 0.1)

plot(Mesh3,asp = 1, main = "")
points(Loc, col = 2, pch = 16, cex = 0.1)

plot(Mesh4,asp = 1, main = "")
points(Loc, col = 2, pch = 16, cex = 0.1)
```

######### FIG07_Meshes #############

``` R

# The third Mesh seems the most regular and appropriate for this dataset
par(mfrow = c(1,1), mar = c(1,1,1,1))
plot(Mesh3,asp = 1, main = "")
points(Fox_Point, col = 2, pch = 16, cex = 1)
plot(Scot_Shape_BNG, add=T)
```

######### FIG08_Right Mesh #############

_NOTE:_ You can see that the mesh extends past the coastline into the sea. Since we are trying to evaluate the effect of greenspace ratio on the parasite species of foxes, it makes no sense to include area that are part of the sea in the mesh. There are two possible solutions: the first is to run the model using this mesh and then simply ignore the results the model provides for the sea area. The second is to modify the mesh to reflect the coastline.
I will not give examples here, but keep in mind that you can either use shapefiles or create nonconvex hulls around the data and use those shapes to create bespoke meshes. Check out the Blangiardo & Cameletti book (chapter 6) for more exhaustive examples.

### Projector matrix
Now that we constructed our mesh, we need to relate the datapoints to the mesh vertices.
As mentioned before, geostatistical data do not have explicit neighbours, so we need to artificially discretise the space using the mesh The projector matrix projects the points onto the mesh where each vertex has explicitly specified neighbours. If the datapoint falls on the vertex, then it will be directly related to the adjacent vertices (and the points that fall on them), however, if the points falls within a triangle, its weight will be split between the tree vertices according to the proximity and the points will have "pseudo-neighbours" from all the vertices of the triangles
``` R
A_point <- inla.spde.make.A(Mesh3, loc = Loc)
dim (A_point)
# [1] 223 1029    # Number of points  # Number of nodes int he mesh
```

### SPDE
The SPDE (standing for Stochastic Partial Differential Equation) is the solution for the Matern correlation structure . In practice this part integrates the weight of each datapoint in the mesh and computes the solution to the SPDE which calculates the autocorrelation structure between each point and its neighbours.
``` R
spde1 <- inla.spde2.matern(Mesh3, 
                            alpha = 2) # alpha is 2 by default, for most models this can be left as it is (needs to be adjusted for 3D meshes)
```

### Fitting a basic spatial model
We will first fit a model only including an intercept and the spatial effect to show how to code this. This model is simply testing the effect of the spatial autocorrelation on the parasite species richness, without including any other covariate.

One thing to keep in mind is that `INLA` syntax codes nonlinear effects using the format f(Covariate Name, model = Effect Type).
In the case of the spatial effect, the model name is the name you assigned to the SPDE (spde1 in this case). I will explain other type of nonlinear effects later.
``` R
#First, we specify the formula
formula_p1 <- y ~ -1 + intercept +
  f(spatial.field1, model = spde1)       # this specifies the spatial random effect. The name (spatial.field1) is of your choosing but needs to be the same you will include in the model 
 
# Now we can fit the proper model using the inla() function 
Mod_Point1 <- inla(formula_p1,
                data = list( y = Point_Data$Spp_Rich,         # response variable
                            intercept = rep(1,spde1$n.spde),   # intectept (manually specified)
                            spatial.field1 = 1:spde1$n.spde),  # the spatial random effect (specified with the matern autocorrelation structure from spde1)   
                control.predictor = list( A = A_point, 
                                          compute = T),       # this tells the model to compute the posterior marginals for the linear predictor
                control.compute = list(cpo = T))

# We can access the summary of fixed (just intercept here) and random effects by using 
round(Mod_Point1$summary.fixed,3)
round(Mod_Point1$summary.hyperpar[1,],3)
```
We can also compute the random term variance by using the `emarginal()` function (remember that INLA works with precisions so we cannot directly extract the variance).

_NOTE:_ `INLA` offers a number of functions to manipulate posterior marginals, we are only going to use the `emarginal()` (which computes the expectations of a function and is used to transform precision to variance) for this tutorial, but it is worth knowing that there is a full roster of function for merginal manipulation, such as sampling from the marginals, transform them or compute summary statistics:

###################  TAB_01_PostMarg functions   ##################

(Krainski et al 2018, Ch1)

Back to extracting our random term variance
```R
inla.emarginal(function(x) 1/x, Mod_Point1$marginals.hyper[[1]])

# In order to extract the relevant information on the spatial field we will need to use the inla.spde2.result() function
Mod_p1.field <- inla.spde2.result(inla = Mod_Point1, 
                                 name = "spatial.field1", spde = spde, 
                                 do.transf = T)     # This will transform the results back from the internal model scale 

names(Mod_p1.field)
```
The two most important things we can extract here are the range parameter (kappa), the nominal variance (sigma) and the range (r, radius where autocorrelation falls below 0.1)) 
These important parameters of the spatial autocorrelation: the highest the Kappa, the more smooth the spatial autocorrelation structure (and the highest the range). Shorter range indicates a sharp increase of autocorrelation between closely located points and a stronger autocorrelation effect
``` R
inla.emarginal(function(x) x, Mod_p1.field$marginals.kappa[[1]])             #posterior mean for kappa
inla.hpdmarginal(0.95, Mod_p1.field$marginals.kappa[[1]])                    # credible intervarls for Kappa

inla.emarginal(function(x) x, Mod_p1.field$marginals.variance.nominal[[1]])  #posterior mean for variance
inla.hpdmarginal(0.95, Mod_p1.field$marginals.variance.nominal[[1]])         # CI for variance

inla.emarginal(function(x) x, Mod_p1.field$marginals.range.nominal[[1]])     #posterior mean for r (in coordinates units)
inla.hpdmarginal(0.95, Mod_p1.field$marginals.range.nominal[[1]])            # CI for r
```

<a name="increasingcomplexity"></a>
## Increasing Model Complexity

Normally we are interested in fitting models that include covariates (and we are interested in how these covariates influence the response variable while taking into account spatial autocorrelation in this case we need to add another step in the model construction.
We will retain the same mesh we used before (Mesh3), and the projector matrix (A_point), and we will continue from there.
I am going to mention in passing to a variety of costumisation for the model (such as spatio-temporal modelling), while I think it's beyond the scope of this practical for me to go into details, you can find a lot of useful examples (and code) in <a href="https://www.taylorfrancis.com/books/9780429031892" target="_blank">this recent book</a>, which also includes really useful tables of customisation options for the `inla()` function.

###Specify PC priors
we can provide priors to the spatial term. A special kind of priors (penalised complexity or pc priors) can be imposed on the spde. These priors are widely used as they (as the name suggests) penalise the complexity of the model. In practice they shrink the spatial model towards the base model (one without a spatial term) to do so we apply weakly informative priors that penalise small ranges and large variance
``` R
spde.pc   <- inla.spde2.pcmatern(Mesh3,                      # inla.spde2.pcmatern() instead of inla.spde2.matern()"
                                 prior.range = c(500,0.01),  # the probability that the range is less than 300 (unit) is 0.01. The range here should be rather large (compare to the dataset extension)
                                 prior.sigma = c(1, 0.01))   # the probability that variance (on the log scale) is more that 1 is 0.01 
```

###Spatial index
One useful step includes constructing a spatial index. This will provide all the required elements to the SPDE model. This is not strictly necessary, unless you want to create multiple spatial fields (e.g. year-specific spatial fields). Replicate will produce iid replicates (the variance will be equally distributed between the levels), while groups will produce dependent replicates (each level of the group will depend from the previous/following one)

shown beneath are the default settings for the index (no replicates or groups are specified)
``` R
s.index <- inla.spde.make.index(name = "spatial.field2",
                                n.spde = spde.pc$n.spde,
                                n.group = 1,
                                n.repl = 1)
```

###The Stack
The stack has become infamous for being particularly fiddly and hard to handle, but in short it provides all the elements that are going to be used in the model. It includes the data, the covariates (including linear and non-linear ones), and the index for each of them. One thing that is useful to remeber is that the stack does NOT automatically include an intercept, so this will need to be specified explicitly.
``` R
# We need to limit the number of levels that GS has. This way, GS can only have 100 levels between 0 and 100
Point_Data$GS_Ratio2 <- round(Point_Data$GS_Ratio*100)

StackEst <- inla.stack(data = list(y = Point_Data$Spp_Rich),               # First off, the response variable

                        A = list(A_point, 1),                              # Then the projector matrix (for the spatial effect) and a linear vector (1) for the other effects
                        
                        effects = list(c(s.index, list(Intercept = 1)),    # The effects are organised in a list of lists. spatial effect and intercept first

                                       list(GS_Var = Point_Data$GS_Var,    # Then all the other effects. We will specify the type of effect using the formula
                                            GS_Ratio = Point_Data$GS_Ratio2,
                                            JanDate = Point_Data$JanDate,
                                            SiteID = Point_Data$Site)),
                        
                        tag="Est")                                          # The tag specify the name of this stack
```

### Fitting the model
the formula specify what kind of effect each covariate should have. linear variables are specified in a standard GLM way, while random effects and non-linear effects need to be specified using the f(Cov Name, model = Effect Type) format, similarly to what we have seen so far for the spatial effect terms.
``` R
formula_p2 <- y ~ - 1 + Intercept + GS_Var +  #linear covariates
  f(spatial.field2, model = spde.pc) +        # the spatial effect is specified using the spde tag (which is why we don't use the "" for it)
  f(GS_Ratio, model = "rw2") +                # non-linear effects such as random walk and autoregressive effects (rw1/rw2/ar1) can be add like this
  f(JanDate,model = "rw1") +                  # rw1 allows for less smooth transitions between nodes (useful for temporal data)
  f(SiteID,model = "iid")                     # Categorical random effects can be added as independent identically distributed effects ("iid")
  
```

Finally, we're ready to run the model. This include the stack (which data are to be included), the formula (how are the covariates modelled), and the details about the model (such as computing model selection tools or make predictions). 
This model tests the effect of the GS_ratio and GS variability on the parasite species richness, while accounting for spatial autocorrelation, temporal autocorrelation and the site where the sample was found (to account for repeat sampling)
``` R
Mod_Point2 <- inla(formula_p2,
               data = inla.stack.data(StackEst, spde=spde.pc),
               family = "poisson",
               control.compute = list(cpo = TRUE),
               control.predictor = list(A = inla.stack.A(StackEst), 
                                        compute = T))

# This time we will have more effects to examine in the fixed and random effect summaries
round(Mod_Point2$summary.fixed,3)
round(Mod_Point2$summary.hyperpar,3)

# We can extract the posterior mean of the variance for the other random effects
inla.emarginal(function(x) 1/x, Mod_Point2$marginals.hyperpar$`Precision for SiteID`)
inla.emarginal(function(x) 1/x, Mod_Point2$marginals.hyperpar$`Precision for JanDate`)
inla.emarginal(function(x) 1/x, Mod_Point2$marginals.hyperpar$`Precision for GS`)

# And plot the non-linear effects (GS ratio and Jandate), to see if they have a distinct effect 
par(mfrow = c(1,1), mar = c(4,3,1,1))
plot(Mod_Point2$summary.random$GS_Ratio[,1:2], 
     type = "l", 
     lwd = 2, 
     xlab = "GS_Ratio",
     ylab = "",
     cex.axis = 2,
     cex.lab = 2)
for(i in c(4,6)) 
  lines(Mod_Point2$summary.random$GS_Ratio[,c(1,i)], lty = 2)
abline(h = 0, lty = 3)
# GS Ratio is clearly positively correlated with species richness, but the effect is fairly linear, so we could re-fit the model 

plot(Mod_Point2$summary.random$JanDate[,1:2], 
     type = "l", 
     lwd = 2, 
     xlab = "Jandate",
     ylab = "",          
     cex.axis = 2,
     cex.lab = 2)
for(i in c(4,6)) 
  lines(Mod_Point2$summary.random$JanDate[,c(1,i)], lty = 2)
abline(h = 0, lty = 3)
```

######### FIG09_GS_Ratiorw2 #############     ######### FIG10_JanDatrw1 #############

``` R
# Extract the information on the spatial field 
Mod_p2.field <- inla.spde2.result(inla = Mod_Point2, 
                                  name = "spatial.field2", 
                                  spde = spde.pc, 
                                  do.transf = T)

inla.emarginal(function(x) x, Mod_p2.field$marginals.kappa[[1]])
inla.hpdmarginal(0.95, Mod_p2.field$marginals.kappa[[1]])    

inla.emarginal(function(x) x, Mod_p2.field$marginals.variance.nominal[[1]]) 
inla.hpdmarginal(0.95, Mod_p2.field$marginals.variance.nominal[[1]])

inla.emarginal(function(x) x, Mod_p2.field$marginals.range.nominal[[1]])  
inla.hpdmarginal(0.95, Mod_p2.field$marginals.range.nominal[[1]])   
```

We might also be interested in visualising the gaussian random field (GRF). As mentioned before, the GRF represents the variation of the response variable in space, once all the covariates int he model are accounted for. It could be seen as "the real distribution of the response variable in space". 
However, this can also reflect the lack of an important covariate in the model, and examining the spatial distribution GRF could reveal which covariates are missing, For example, if elevation is positively correlated with the response variable, but it is not included in the model, we could see a higher posterior mean in areas with higher elevation, a researcher familiar with the terrain would be able to recognise this and improve the model accordingly.
``` R
points.em <- Mesh3$loc

stepsize <- 150                           # This is given in coordinates unit (in this case this is straightforward and correspond to 150m)
east.range <- diff(range(points.em[,1]))  # calculate the length of the Easting range
north.range <- diff(range(points.em[,2])) # calculate the length of the Northing range

nxy <- round(c(east.range, north.range)/stepsize)  # Calculate the number of cells in the x and y ranges

# Project the spatial field on the mesh vertices using the inla.mesh.projector() function
projgrid <- inla.mesh.projector(Mesh3, 
                                xlim = range(points.em[,1]),
                                ylim = range(points.em[,2]),
                                dims = nxy)
xmean <- inla.mesh.project(projgrid,
                           Mod_Point2$summary.random$spatial.field2$mean)
xsd <- inla.mesh.project(projgrid,
                         Mod_Point2$summary.random$spatial.field2$sd)
```

We need to create spatial objects for the mean and variance of the GRF
```R
require(raster)

xmean2 <- t(xmean)
xmean3 <- xmean2[rev(1:length(xmean2[,1])),]
xmean_ras <- raster(xmean3,
                    xmn = range(projgrid$x)[1], xmx = range(projgrid$x)[2],
                    ymn = range(projgrid$y)[1], ymx = range(projgrid$y)[2],
                    crs = CRS("+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 
                                                           +datum=OSGB36 +units=m +no_defs +ellps=airy +towgs84=446.448,
                                                           -125.157,542.060,0.1502,0.2470,0.8421,-20.4894"))

xsd2 <- t(xsd)
xsd3 <- xsd2[rev(1:length(xsd2[,1])),]
xsd_ras <- raster(xsd3,
                  xmn = range(projgrid$x)[1], xmx =range(projgrid$x)[2],
                  ymn = range(projgrid$y)[1], ymx =range(projgrid$y)[2],
                  crs = CRS("+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 
                                                           +datum=OSGB36 +units=m +no_defs +ellps=airy +towgs84=446.448,
                                                           -125.157,542.060,0.1502,0.2470,0.8421,-20.4894"))
```
xmean_ras and xsd_ras are raster items and can be exported, stored and manipulated outside R (including in GIS softwares) using the function `writeRaster()`

Now, we can plot the GRF (I used the same colour scheme as the areal data)
``` R
par(mfrow = c(1,1), mar = c(2,2, 1,1))
plot(xmean_ras, asp = 1, col = my.palette.post)
points(Fox_Point, pch = 16, cex = 0.5)
plot(Scot_Shape_BNG, add = T) 

plot(xsd_ras, asp = 1, col = my.palette.var)
points(Fox_Point, pch = 16, cex = 0.5) 
plot(Scot_Shape_BNG, add = T) 
```

######### FIG11_xmean_ras #############       ######### FIG12_xsd_ras #############

<a name="modelpredictions"></a>
## Model Predictions

Finally, I'm going to show how to produce spatial predictions from `INLA` models. This will involve a bit of manipulation of rasters and matrices (check out the coding club tutorial on this subject), but essentially it comes down to create a spatial grid of coordinates where we do not have values but wish to generate an prediction for the response variable using the model estimations (taking into account the spatial autocorrelation structure of the data). 
``` R
# The first step is to load the prediction raster file(this one is a ASCII file). 
require(raster)
require(rgdal)
GS_Pred <- raster("GS_Pred/GS_Pred_Ras.txt")

# This is simply a raster map of greeenspace values (precentage of greenspace per raster cell) plotted for the entire Edinburgh area.
require(RColorBrewer)
my.palette_GS <- brewer.pal(n = 9, name = "Greens")
plot(GS_Pred, col = my.palette_GS)
points(Fox_Point, pch = 16, cex = 0.5) 
```

######### FIG13_GS_Pred #############

To produce predictions using `INLA`, we need to generate a dataset (with attached coordinates on the locations we wish to predict to) and attach a series of missing observation to it (coded as NA in R); when the missing observations are in the response variable, `INLA` automatically computes the predictive distribution of the corresponding linear predictor and fitted values. 
By using `INLA` syntax is possible to generate model preditions by fitting a stack where the response variable is set as NAs, and then join this stack with the estimation stack (which is similar to what we have used so far), then we can extract the values of the predicted response variable and use the `inla.mesh.projector()` function to progect these values on the mesh vertices (not unlikely we have been doing when plotting the GRF)

To start, we transform the raster values (GS ratio) into a matrix and the reallocate the coordinates to a matrix of ncol X nrow cells
``` R
GS_Matrix <- matrix(GS_Pred)

str(GS_Mat)
str(GS_Matrix)

y.res <- GS_Pred@nrows
x.res <- GS_Pred@ncols
```

Next, we need to create a grid of ncol X nrow cells containing the coordinates of the points where we wish to project our model predictions
```R
Seq.X.grid <- seq(from = GS_Pred@extent@xmin,
                  to = GS_Pred@extent@xmax,
                  length = x.res) 

Seq.Y.grid <- seq(from = GS_Pred@extent@ymin,
                  to = GS_Pred@extent@ymax,
                  length = y.res)

pred.grid <- as.matrix(expand.grid(x = Seq.X.grid,
                                   y = Seq.Y.grid)) 

str(pred.grid)
```

Now that we the grid with the coordinates of each cell centroid we can procede to make the mesh spde and spatial index as usual
```R
MeshPred <- inla.mesh.2d(Loc, max.edge = c(900, 2000),
                         cutoff = 300) 

spde.pred <- inla.spde2.matern(mesh = MeshPred,
                               alpha = 2)

s.index.p <- inla.spde.make.index(name = "sp.field.pred", 
                                  n.spde = spde.pred$n.spde) 
```

However, since the points where we want to project our predictions are different from the datapoints, we need two different projector matrices. The first one is the standard one we have used so far (A_est), while the second does not contain point location since we will project the model results directly at the mesh vertices.
Similarly, we will need two stacks, one for estimations and one for predictions, joined using the `inla.stack()` function to form a joined stack.
```R
A_est <- inla.spde.make.A(mesh = MeshPred, 
                          loc = Loc)

A_pred <- inla.spde.make.A(mesh = MeshPred)


StackEst <- inla.stack(data = list(y = Point_Data$Spp_Rich),
                       A = list(A_est, 1),
                       effects = list(c(s.index.p, list(Intercept = 1)), 
                                      list(GS_Ratio = Point_Data$GS_Ratio2)),
                       tag = "Est")

stackPred <- inla.stack(data = list(y = NA),  # NAs in the response variable  
                        A = list(A_pred),
                        effects = list(c(s.index.p, list(Intercept = 1))),
                        tag = "Pred")

StackJoin <- inla.stack(StackEst, stackPred)

```

Then we can specify the formula and run the model as usual (using the joint stack)
```R
formula_Pred <- y ~ -1 + Intercept + 
  f(GS_Ratio, model = "rw2") +
  f(sp.field.pred, model = spde.pred)

Mod_Pred <-  inla(formula_Pred, 
                  data = inla.stack.data(StackJoin, spde = spde.pred),
                  family = "poisson",
                  control.predictor = list(A = inla.stack.A(StackJoin), 
                                         compute = T))
```

We need to extract the index of the data from the prediction part of the stack (using the tag "Pred" we assigned to the stack) and use it to select the relevant posterior mean and sd for the predicted response variable. Then we use the `inla.mesh.projector()` function to calculate the projection from the Mesh to the grid we created (pred.grid)
```R
index.pred <- inla.stack.index(StackJoin, "Pred")$data

post.mean.pred <- Mod_Pred$summary.linear.predictor[index.pred, "mean"]
post.sd.pred <- Mod_Pred$summary.linear.predictor[index.pred, "sd"]

proj.grid <- inla.mesh.projector(MeshPred, 
                                 xlim = range(pred.grid[,1]), 
                                 ylim = range(pred.grid[,2]), 
                                 dims = c(ncol,nrow))
```

Finally, we project the values we extracted from the model on the lattice we have created and transform the projected predictions to a raster object as we did before with the GRF and plot them in a similar fashion (we do this for both mean and sd)
```R
post.mean.pred.grid <- inla.mesh.project(proj.grid, post.mean.pred)
post.sd.pred.grid <- inla.mesh.project(proj.grid, post.sd.pred)

predmean <- t(post.mean.pred.grid)
predmean2 <- predmean[rev(1:length(predmean[,1])),]
predmean_ras <- raster(predmean2,
                      xmn = range(projgrid$x)[1], xmx = range(projgrid$x)[2],
                      ymn = range(projgrid$y)[1], ymx = range(projgrid$y)[2],
                      crs = CRS("+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 
                                                           +datum=OSGB36 +units=m +no_defs +ellps=airy +towgs84=446.448,
                                                           -125.157,542.060,0.1502,0.2470,0.8421,-20.4894"))

predsd <- t(post.sd.pred.grid)
predsd2 <- predsd[rev(1:length(predsd[,1])),]
predsd_ras <- raster(predsd2,
                       xmn = range(projgrid$x)[1], xmx = range(projgrid$x)[2],
                       ymn = range(projgrid$y)[1], ymx = range(projgrid$y)[2],
                       crs = CRS("+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 
                                                           +datum=OSGB36 +units=m +no_defs +ellps=airy +towgs84=446.448,
                                                           -125.157,542.060,0.1502,0.2470,0.8421,-20.4894"))

# plot the model predictions for mean
par(mfrow = c(1,1), mar = c(2,2, 1,1))
plot(predmean_ras, asp = 1, col = my.palette.post)
points(Fox_Point, pch = 16, cex = 0.5)
plot(Scot_Shape_BNG, add = T) 
# plot the model predictions for sd
par(mfrow = c(1,1), mar = c(2,2, 1,1))
plot(predsd_ras, asp = 1, col = my.palette.var)
points(Fox_Point, pch = 16, cex = 0.5)
plot(Scot_Shape_BNG, add = T) 
```
######### FIG14_predmean_ras #############      ######### FIG15_predsd_ras #############

## Final Remarks


If you made it this far, Well done!!
After this you should be able to fit basic spatial models of area and marked point data, extract results and make predictions. Spatial modelling is becoming increasingly popular and being able to account for autocorrelation in your modelling is a great skill to have.

There is probably still much more you still want to know. The good news is that `INLA` is extremely customisable and you can modify it to do almost anything you need.
The `R-INLA` project is still in its infancy and under active development, and the <a href="http://www.r-inla.org/" target="_blank">INLA project website</a> is a great place to go to find materials (including tutorials, explained examples and code from published articles) and help: the discussion R-INLA group is very active and it is a great place to go if you get stuck. 
There are also a number of books and tutorials avaiable online (I have mentioned a couple but so many more are available), most of which are freely available to download (including the code), or available in the library if you're a student.
