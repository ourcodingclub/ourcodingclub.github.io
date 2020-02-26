---
layout: course
title: "Wiz of Data Vis challenge: Native woodlands"
banner: "../assets/img/banner/wiz-viz.jpg"
---
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@our_codingclub" />
<meta name="twitter:creator" content="@our_codingclub" />
<meta property="og:url" content="https://ourcodingclub.github.io/course/wiz-viz/index.html" />
<meta property="og:title" content="Wiz of Data Vis Challenge: Where are Scotland's high-value conservation habitats?" />
<meta property="og:description" content="Put your skills into practice with our challenge!" />
<meta property="og:image" content="https://ourcodingclub.github.io/assets/img/dl_course/DL-challenge-larch.jpg" />

This challenge will require the use of data manipulation, plotting and mapping skills, and is the culmination of the [WIZ OF DATA VIS]({{ site.baseurl }}/dl_course/wiz-viz/index.html) course stream. Scroll for more information on your tasks and how to complete the challenge.

{% capture banner %}
# Challenge outline and objectives

While Scotland is best known for its endless rolling heather hills, it used to be covered in wide swathes of forest. Less than 20% of Scotland is now afforested, and only 4% of the territory consists of native woodlands ([Woodland Trust](https://www.woodlandtrust.org.uk/about-us/where-we-work/scotland/), [Scottish Natural Heritage](https://www.nature.scot/professional-advice/land-and-sea-management/managing-land/forests-and-woodlands/woodland-expansion-across-scotland)). 

The Scottish government has included woodland expansion goals in its Climate Change plan, and several governmental and non governmental organisations are working towards the creation of new woodlands that will support native species and provide a wider range of ecosystem services than just timber. 

You have been asked to provide a report on the extent and structure of some high-priority conservation habitats in national nature reserves (NNR) of Scotland. For selected woodland types, you are required to prepare maps of their distribution in the Cairngorms, the Glen Affric, and the Trossachs nature reserve areas. You have also been tasked to calculate their respective extent within the reserve boundaries, and some basic biodiversity indices.
{% endcapture %}
{% capture url %}{{ site.baseurl }}/assets/img/banner/pine.jpg{% endcapture %}
{% include scroll-banner.html content=banner background=url %}

{% capture coloursection %}
# Data overview 

##### __You will use the following datasets, available from the [Challenge repository](https://github.com/ourcodingclub/CC_course_challenge2) on GitHub. To be able to answer the quiz questions properly, it is important that you use these datasets and not potentially updated versions available through the original providers.__

__NOTE:__ The data files have been saved as RDS objects because of their relatively large size. You can easily read a RDS file in R using the [`readRDS()` function](https://www.rdocumentation.org/packages/base/versions/3.6.2/topics/readRDS).

## Native Woodland Survey of Scotland
 
* __NWSS.RDS__: a shapefile of all woodland patches in Scotland. The most important variables in the dataset are:
	* __DOM_HABITA__: the main habitat type for the polygon. We will only retain some habitats of interest.
	* __HECTARES__: the area of a given patch

Original data link [here](http://data-forestry.opendata.arcgis.com/datasets/feadebb6bbf844a7bfdb5c8a7b9f73d7_0) and more information about the survey [here](https://forestry.gov.scot/forests-environment/biodiversity/native-woodlands/native-woodland-survey-of-scotland-nwss).

* __species_structure.RDS__: a spreadsheet containing tree species information from the woodlands. The most important variables in the dataset are:

- __SCPTDATA_I__: a unique identifier code that will allow to match the observations to the spatial data in __NWSS.RDS__
- __SPECIES__: the name of the species recorded
- __ESTIMT_HA__: the estimated area, in hectares, covered by a given species at this location

Original data link [here](http://data-forestry.opendata.arcgis.com/datasets/feadebb6bbf844a7bfdb5c8a7b9f73d7_6).

## National Nature Reserves

* __SNH_national_reserves.RDS__: a shapefile containing the outlines of Scotland's [NNRs](https://www.nnr.scot/). The most important variables in the dataset are:
- __NAME__: The name of the reserve
- __SITE_HA__: The area of the site in hectares

Original data link [here](https://gateway.snh.gov.uk/natural-spaces/dataset.jsp?dsid=NNR).
{% endcapture %}
{% include coloursection.html content=coloursection colour="lightGrey" %}

{% capture coloursection %}
## About spatial data
Two of the three datasets are __shapefiles__, which means that they contain geometric information that allow the data to be represented as shapes (polygons), points or lines. But don't panic! When you import the files into R, you will see that you can preview and manipulate the data much like any other dataframe.

The spatial objects have been saved using the [sf package](https://r-spatial.github.io/sf/articles/sf1.html) which allows for integration with the tidyverse: the _sf_ functions are pipe-friendly and you can pretty much do everything to a _sf_ object that you would do to a regular dataframe (e.g. merge with another dataset, subset to some values or conditions, etc). Remember, in the end, a spatial dataset is just like any other dataset, with extra geographic information tucked in one column!

You will not have to do any complex spatial analysis for this, but the instructions will point you in the right direction when functions specific to the _sf_ package might be needed. More [hints](#hints) can be found at the bottom of the page.
{% endcapture %}
{% include coloursection.html content=coloursection colour="goldDark" %}

{% capture coloursection %}
# Specific tasks 

Here is a detailed list of the tasks you should achieve within this challenge. Remember that a challenge is meant to be, well, challenging, and therefore we are setting you goals but the choice of workflow and functions to achieve them is up to you! We also list the questions that will be asked in the quiz at the end to confirm your successful completion - we suggest you take note of your answers as you go.

## 1. Clean the data

You will need to clean and filter the data to the sites and woodland types of interest. __Specifically, you should:__ 

* Restrict the NWSS observations to the following __dominant habitat types__:
	- Native pinewood
	- Upland birchwood
	- Upland mixed ashwood
	- Upland oakwood 
	- Wet woodland
	- Lowland mixed deciduous woodland
* Restrict the NNR shapefile to the __following areas__, lump the last three under the same name, and rename as indicated: 
	- The Great Trossachs Forest (rename to "Trossachs")
	- Glen Affric (leave as such)
	- Cairngorms (part of the "Cairngorms" group)
	- Mar Lodge Estate (part of the "Cairngorms" group)
	- Abernethy (part of the "Cairngorms" group)

_NB: There are 6 more NNRs within the Cairngorms National Park, but these three are large ones within the core of the park, and the only ones we'll be considering for this analysis._

__HINT:__ Once you have filtered both datasets to only keep the regions and habitats of interest, the best way forward is to create __one object__ that combines the two: i.e. only keep the habitats of interest _that are found within_ the regions of interest. You may need some indepent research to figure it out, but only one function from the _sf_ package is required to achieve this. To get you started, know that all _sf_ functions begin with _"st_"_, and this type of spatial operation is called an _intersection_...
{% endcapture %}
{% include coloursection.html content=coloursection colour="heatherDark" %}

{% capture coloursection %}
## 2. Map the areas of interest 

Create a map for each of the three areas (Cairngorms, Trossachs, and Glen Affric) showing the geographical distribution of the priority habitats. __Specifically, you should:__ 

* Create a colour palette that you will use consistently to refer to the habitat types 
*  Produce a map for each region, complete with a legend.  __Be prepared to answer the question:__
	* What type(s) of priority habitat is (are) found in the Trossachs but not in the other two areas?

__HINT:__ Producing a map is not very different than producing any other plot. The _sf_ package integrates almost seamlessly with _ggplot2_, so you can use all your favourite ways of selecting colours based on factor levels, adding text and legends, etc. The only difference is that the _sf_ objects are called in your plot through _geom_sf_. 
{% endcapture %}
{% include coloursection.html content=coloursection colour="goldLight" %}

{% capture coloursection %}
## 3. Calculate the proportion of land (in %) covered by each habitat in the three areas.

The total NNR area is found in the cell SITE_HA, and the habitat polygon size is contained in the cell HECTARES. _(Note that there are more than one polygon per habitat type! Think about grouping observations first.)_

__Specifically, you should:__

* Create a graph of your choice to represent the proportion of each habitat within the three reserves.

__Be prepared to answer the questions:__

* What type of graph did you create?
* What proportion of Glen Affric is covered in pinewoods?
{% endcapture %}
{% include coloursection.html content=coloursection colour="steelBlue" %}

{% capture coloursection %}
## 4. Calculate the species richness and evenness of the three areas.

__Species richness__ simply corresponds to the number of different species in each area. _(Tip: all the species information can be found in __species_structure.RDS__.)_ 

__Species evenness__ is a value between 0 (not even at all) and 1 (perfectly even) indicating how equitably species are represented, abundance-wise (i.e., is there one very dominant species, or are all species found in similar proportions?). A way of calculating this is to divide H’, the Shannon diversity index, by the natural logarithm (ln) of species richness that you have previously calculated. The __Shannon diversity index__ is calculated as such:

__H’ = -1 * sum of all ( _p_i * ln(_p_i))__, where _p_i in our case is the proportion of species i cover (ESTIMT_HA) relative to the cover of all species._

__Specifically, you should:__

* Calculate the richness, the Shannon index, and the evenness for all three sites. _(Hint: some pipe chains involving our favourite dplyr functions may be useful here!)_ 
* Create a map that visually represents the difference in evenness among the three sites. (Think colour gradient.) 

__Be ready to answer the questions:__

* Which area has the most species?
* Which area has the lowest evenness?
{% endcapture %}
{% include coloursection.html content=coloursection colour="beigeYellow" %}


{% capture banner %}
# How to get started 

Download the [challenge repository](https://github.com/ourcodingclub/CC_course_challenge2), which contains all the data you need, and create a new script for your challenge. Refer to this page to make sure you are answering all the questions. 

There is no script or code provided for this challenge: how you go about solving the tasks is entirely up to you! You may want to refer to the tutorials listed below (and other online resources). 
{% endcapture %}
{% capture url %}{{ site.baseurl }}/assets/img/banner/larch.jpg{% endcapture %}
{% include scroll-banner.html content=banner background=url %}

# Finished? Take the quiz! 

Once you have a fully working script and have completed the specific tasks, take the quiz. 

{% capture link %} https://coding-club.shinyapps.io/test-centre/ {% endcapture %}
{% include link-button.html url=link button="Go to quiz centre" %}

# Help & hints 
{: #hints}

Here is a list of tutorials that might help you complete this challenge: 

* [Data visualisation 1]({{ site.baseurl }}/tutorials/datavis/index.html)
* [Data visualisation 2]({{ site.baseurl }}/tutorials/data-vis-2/index.html)
* [Efficient data manipulation]({{ site.baseurl }}/tutorials/data-manip-efficient/index.html)

##  Need a hint? Just click on a question to expand. 

{% capture reveal %}
First, make sure that you have filtered both datasets to only keep the 6 habitats and 3 NNRs required. You can do this with the `filter` function from `dplyr`. 
Then, you need to do a spatial operation called an intersection with your two data objects, which will keep only the observations of _A_ found within the boundaries of _B_. You can achieve this with `st_intersection(A, B)`. 
{% endcapture %}
{% include reveal.html content=reveal button="How do I crop the NWSS to just the NNRs I want?" %}

{% capture reveal %}
You can plot `sf` objects from the comfort of `ggplot2`.

You can try something like: `ggplot() + geom_sf(data = nwss, aes(fill = DOM_HABITA)) + theme_minimal()`
{% endcapture %}
{% include reveal.html content=reveal button="How do I plot spatial data?" %}

{% capture reveal %}
Of course you can! Think of our favourite `dplyr` functions `group_by()` and `summarise()`.
{% endcapture %}
{% include reveal.html content=reveal button="Can I calculate the biodiversity metrics for the 3 sites at once?" %}

{% capture reveal %}
We have a tutorial that shows exactly how to create a [custom colour palette]({{ site.baseurl }}/tutorials/data-vis-2/index.html#palette).
{% endcapture %}
{% include reveal.html content=reveal button="How do I make my colour scheme consistent across plots?" %}
 
We love getting your feedback, and will add more hints to this section if you get in touch and tell us where you struggled in this challenge!


{% capture coloursection %}
# Acknowledgements 

We thank all the organisations that provided open access data for this challenge. The datasets licences are as follows: 

* __Scottish Natural Heritage (2018).__ National Nature Reserves. Shapefile [available here](https://gateway.snh.gov.uk/natural-spaces/dataset.jsp?dsid=NNR) under Open Government Licence (Crown copyright).
* __Forestry Commission (2018).__ Native Woodland Survey of Scotland (NWSS). Available on the [Forestry Commission Open Data portal](http://data-forestry.opendata.arcgis.com/datasets/feadebb6bbf844a7bfdb5c8a7b9f73d7) under Open Governement licence (Crown copyright).
* __Forestry Commission (2018).__ Native Woodland Survey of Scotland (NWSS) - Species structure. Available on [Forestry Commission Open Data portal](http://data-forestry.opendata.arcgis.com/datasets/feadebb6bbf844a7bfdb5c8a7b9f73d7_6) under Open Governement licence (Crown copyright).
{% endcapture %}
{% include coloursection.html content=coloursection colour="purpleDark" %}

<!-- Get help -->
<a name = "contact"></a>
 <section id="portfolio-work" style="background-color: #bccd6da; padding-bottom:20px">
        <div class="content-new-info">
           
<div class="row-eq-height">
      
<div class="col-md-4 col-sm-2">
        <div class="profile" style="border: 0px;">
         <img src="{{ site.baseurl }}/assets/img/dl_course/bug.png" style= "width:15%; height:auto; padding:10px 50px 10px 10px;" alt="bug icon">
        </div>
      </div><!-- .col-md-4 close -->
      
      <div class="col-md-8 col-sm-10">
        <div class="block">
            <h2>Get in touch</h2>
          <br>  
          <p>Bee in your bonnet? Technical issues? Don't hesitate to get in touch with any questions or suggestions concerning the course. Please keep in mind that this is a brand new course and we are still testing and implementing some features, so if you notice errors or some areas of the site are not working as they should, please tell us!</p>
          <br>
          <div style="padding:50px">
            <center>
               <a class="button" href="mailto:ourcodingclub@gmail.com" target="_blank"> Contact us 
               </a>
            </center>
         </div>
      </div>
   </div><!-- .col-md-8 close -->
            
    </div>
   </div>
</section> <!-- end of help-->
