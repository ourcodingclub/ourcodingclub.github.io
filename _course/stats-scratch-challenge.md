---
layout: course
title: "Stats from Scratch challenge: Where are the red squirrels?"
banner: "../assets/img/banner/stats-scratch.jpg"
---
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@our_codingclub" />
<meta name="twitter:creator" content="@our_codingclub" />
<meta property="og:url" content="https://ourcodingclub.github.io/course/stats-scratch-challenge/index.html?" />
<meta property="og:title" content="Stats from Scratch Challenge: Where are the red squirrels?" />
<meta property="og:description" content="Put your skills into practice with our challenge!" />
<meta property="og:image" content="https://ourcodingclub.github.io/assets/img/dl_course/DL-challenge-squirrel.jpg" />

This challenge will require the use of data manipulation, plotting and linear modelling skills, and is the culmination of the [STATS FROM SCRATCH]({{ site.baseurl }}/dl_course/stats-scratch/index.html) course stream. Scroll for more information on your tasks and how to complete the challenge. 

{% capture banner %}
# Challenge outline and objectives

Red squirrels, once widespread throughout the UK, have declined sharply in the last century following the introduction of grey squirrels from North America. Most of the remaining populations are now restricted to parts of Scotland, and still threatened by the expansion of grey squirrels, which are more competitive and carry the deadly squirrel pox.

Red squirrels are a protected species and, with conservation efforts from [dedicated organisations](https://scottishsquirrels.org.uk/), are able to maintain strongholds in various parts of Scotland. These organisations also collect information on red and grey squirrel sightings, and we will use these data in the challenge to learn more about red squirrel population trends and habitat preferences.
{% endcapture %}
{% capture url %}{{ site.baseurl }}/assets/img/banner/squirrel.jpg{% endcapture %}
{% include scroll-banner.html content=banner background=url %}

{% capture coloursection %}
# Data overview

##### __You will use the following datasets, available from the [Challenge Github repository](https://github.com/ourcodingclub/CC_course_challenge1) on Github. To be able to answer the quiz questions properly, it is important that you use these datasets and not potentially updated versions available through the original providers.__

### The Scottish Squirrel Database

`squirrels.csv`: A dataset of grey and red squirrel observations compiled by the [Scottish Wildlife Trust](http://scottishwildlifetrust.org.uk/) and hosted on the [NBN Atlas](https://registry.nbnatlas.org/public/show/dr949). The most relevant variables in the dataset for this challenge are:

* Year: the year of the sighting
* Count: the number of squirrels sighted on the occasion (if blank, assume it is 1)
* OSGR: the Ordnance Survey [grid reference](https://getoutside.ordnancesurvey.co.uk/guides/beginners-guide-to-grid-references/) for 10 x 10 km squares; will be useful to link the forest cover data

### Forest cover 

`forestcoverOS.csv`: This dataset contains the forest cover (in % and total area) in each OS grid cell. This dataset was created by us*, using:

* The National Forest Inventory for Scotland 2017, from the [Forestry Commission](http://data-forestry.opendata.arcgis.com/datasets/3cb1abc185a247a48b9d53e4c4a8be87_0/)
* OS grid cells at a 10 x 10 km resolution, from [this Git repository](https://github.com/charlesroper/OSGB_Grids)

__Fancy a more advanced challenge? Why don't you try re-creating this dataset yourself?__ (Best suited to someone with notions of spatial analysis: all you have to do is intersect the files and extract the area.)
{% endcapture %}
{% include coloursection.html content=coloursection colour="lightGrey" %}

{% capture coloursection %}
# Specific tasks

Here is a detailed list of the tasks you should achieve within this challenge. Remember that a challenge is meant to be, well, challenging, and therefore we are setting you goals but the choice of workflow and functions to achieve them is up to you! We also list the questions that will be asked in the quiz at the end to confirm your successful completion - we suggest you take note of your answers as you go.

## 1. Data manipulation

Clean the squirrel dataset for the last decade, so it’s ready to analyse. Specifically, you should: 

* Keep only observations for the years 2008 to 2017 (using the `Start.date.year` column and renaming it to `year`)
* Remove the observations that are not at the species level (i.e. we don’t know whether they are grey or red squirrels)
* Create a _species_ column that will have _Red_ and _Grey_ as factor levels
* We will assume that the observations that have `NA` as `count` are observations of one squirrel; replace them with the value 1.

__Be prepared to answer the question:__

To the nearest thousand, how large is your __cleaned__ dataset?

{% endcapture %}
{% include coloursection.html content=coloursection colour="reddishBrown" %}

{% capture coloursection %}
## 2. Temporal trends

Determine if there is a temporal trend in the number of observations for red and grey squirrels (2008-2017). Specifically, you should:

* Summarise the number of observations _per species and per year_. (That means a total number of red vs grey squirrels for each year.) A more complex analysis would also account for spatial autocorrelation and other factors, but as a preliminary analysis you are only asked to consider the total numbers at the national scale. 
* Plot the data and run __one linear model__ to test the question _Have squirrel populations increased or decreased over time, and is the trend the same for red and grey squirrels?_

__Be prepared to answer the questions:__

* Which species showed the strongest change over time? 
* What were your predictor variable(s) and their data type in the model?
* What is the adjusted R-squared of the regression? 
* Considering the nature of our response variable, what modelling approach would be the most appropriate? (Don't worry if you only ran a linear regression! It's a justifiable approach for a preliminary analysis, and for such large numbers the results will be similar.) 

__Think about the following:__ what could be the reasons for this trend? Is it ecologically meaningful? Are there any biases in the data to be aware of?

{% endcapture %}
{% include coloursection.html content=coloursection colour="greenDark" %}

{% capture coloursection %}
## 3. Do red and grey squirrels prefer different habitats?

We usually think of grey squirrels as city dwellers, while red squirrels require extensive forest cover. Determine whether recent squirrel counts in OS grid cells (10km) are linked to forest cover in that cell. Specifically, you should: 

* Filter the data to the period covering 2015-2017. Summarise the squirrel count data at the _species_ and _grid cell_ level. (You can sum counts across years; this is not ideal but since we're only dealing with a few years of data this will give us a population index that allows for inconsistent sampling across years, hopefully without double-counting too much.) Remove observations greater than 300, as they mess up with the plots later (but feel free to experiment with different subsets!).
* Merge the squirrel and forest datasets 
* Visualise the scatterplot of abundance as a function of forest cover for each species. Run one linear model (bonus: try a glm with the appropriate distribution) to test the relationship.

__Be prepared to answer the questions:__

* Are red squirrels significantly associated with forested areas? 
* Does the model explain the variation in the data well?

{% endcapture %}
{% include coloursection.html content=coloursection colour="beigeYellow" %}

{% capture coloursection %}
## 4. Re-classify forest cover

Building on the previous point, try turning the forest cover data into a categorical variable, and use the visual representation of your choice to display the median abundance of grey and red squirrels in these classes, and the uncertainty around these measures. Specifically, you should: 

* Transform the cover data into a _cover.class_ variable with the following bins:
	* 0-10% 
	* 10-20%
	* 20-30%
	* 30-40%
	* 40-50%
	* 50+%
* Create your visualisation

__Be prepared to answer the question:__

* In what cover classes are red squirrels more abundant than the grey?
{% endcapture %}
{% include coloursection.html content=coloursection colour="greenLight" %}

{% capture banner %}
# How to get started

Download the [challenge Github repository](https://github.com/ourcodingclub/CC_course_challenge1), which contains all the data you need, and create a new script for your challenge. Refer to this page to make sure you are answering all the questions.

There is no script or code provided for this challenge: how you go about solving the tasks is entirely up to you! You may want to refer to the tutorials listed below (and other online resources).
{% endcapture %}
{% capture url %}{{ site.baseurl }}/assets/img/banner/squirrel_3.jpg{% endcapture %}
{% include scroll-banner.html content=banner background=url %}


# Finished? Take the quiz!

Once you have a fully working script and have completed the specific tasks, take the quiz.

{% capture link %} https://coding-club.shinyapps.io/test-centre/ {% endcapture %}
{% include link-button.html url=link button="Go to quiz centre" %}


{% capture coloursection %}
# Help & hints

Here is a list of tutorials that might help you complete this challenge:

* [Data manipulation 1]({{ site.baseurl }}/tutorials/data-manip-intro/index.html)
* [Data visualisation 1]({{ site.baseurl }}/tutorials/datavis/index.html)
* [From distributions to linear models]({{ site.baseurl }}/tutorials/modelling/index.html)


## Need a hint? Just click on a question to expand


{% capture reveal %}
You can specify a variety of [logical statements]({{ site.baseurl }}/tutorials/data-manip-intro/index.html#logic) in the the `filter()` function from `{dplyr}`.
{% endcapture %}
{% include reveal.html content=reveal button="How do I remove unwanted data points" %}

{% capture reveal %}
NA values are something special in R, and there are special functions to handle them. Take a look at the `is.na()` logical function, and see if you can use it within a `mutate` call to create a new column based on existing values.

You'll want mutate to replace the value in a cell _IF_ the original value was one, and _ELSE_ you'll want to keep the original value. Oh, hey, do you know the `ifelse()` function?
{% endcapture %}
{% include reveal.html content=reveal button="I can't figure out how to replace NA values with something else." %}

We love getting your feedback, and will add more hints to this section if you get in touch and tell us where you struggled in this challenge!
{% endcapture %}
{% include coloursection.html content=coloursection colour="lightGrey" %}

{% capture coloursection %}
# Acknowledgements

We thank all the organisations that provided open access data for this challenge. The datasets licences are as follow:

* __Scottish Wildlife Trust (2018).__ The Scottish Squirrel Database. Occurrence dataset [https://doi.org/10.15468/fqg0h3] under license CC-BY-4.0
* __Forestry Commission (2018).__ National Forest Inventory Woodland Scotland 2017. Available at the [Forestry Commission Open Data portal](http://data-forestry.opendata.arcgis.com/datasets/3cb1abc185a247a48b9d53e4c4a8be87_0/) under Open Governement licence: Crown copyright and database right 2018 Ordnance Survey [100021242]
* __Charles Roper (2015).__ OSGB Grids in shapefile format. Available on [Github](https://github.com/charlesroper/OSGB_Grids) under a CC-0 (public domain) license.
{% endcapture %}
{% include coloursection.html content=coloursection colour="boldOrange" %}

<!-- Get help -->
<a name = "contact"></a>
 <section id="portfolio-work" style="background-color: #bccd6da; padding-bottom:20px" id="portfolio-work" style="background-color: #bccd6da; padding-bottom:20px">
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
