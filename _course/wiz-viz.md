---
layout: course
title: "Wiz of Data Vis"
subtitle: "A (good) graph is worth a thousand words!"
banner: "../assets/img/banner/wiz-viz.jpg"
---
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@our_codingclub" />
<meta name="twitter:creator" content="@our_codingclub" />
<meta property="og:url" content="https://ourcodingclub.github.io/course/wiz-viz/index.html" />
<meta property="og:title" content="Wiz of Data Vis: Data Science for Ecologists and Environmental Scientists" />
<meta property="og:description" content="Make graphs that tell a compelling story and learn different ways of communicating key messages with data." />
<meta property="og:image" content="https://ourcodingclub.github.io/assets/img/dl_course/DL_stream2.png" />

This stream is aimed at scientists who are looking to improve and expand their data visualisation skills. This is ideal for students or researchers wanting to produce high-impact figures, people working with geospatial data, or with an interest in science communication. For this stream, we will assume you have some basic R experience and know how to import files and manipulate data to some degree. (You don't? Try our [Stats from Scratch]({{ site.baseurl }}/dl_course/stats-scratch/index.html) course stream instead, or just visit some of its tutorials for a refresher.)

We will first teach you to format your datasets in the most efficient way for plotting and the basics of the `ggplot2` package. Then, we'll move way beyond basic and learn to customise all the elements of a graph, create our own palettes and themes, and use panels to declutter graphs. We will use different types of data, from model predictions to geographical data, and work towards presenting them in an engaging and informative way. Finally, we'll explore the Markdown language for professional and reproducible reporting of codes and results, and have fun with interactive web apps!

{% capture banner %}
# As part of this course stream, we suggest you do the following tutorials:

* [Efficient data manipulation: Streamline your code]({{ site.baseurl }}/tutorials/data-manip-efficient/index.html)
* [Data visualisation I: beautiful and informative graphs]({{ site.baseurl }}/tutorials/datavis/index.html)
* [Data visualisation II: customising graphs]({{ site.baseurl }}/tutorials/data-vis-2/index.html) 
* [Spatial analysis in R]({{ site.baseurl }}/tutorials/spatial/index.html) 
* [Professional reporting with Markdown]({{ site.baseurl }}/tutorials/rmarkdown/index.html) 
* [Intro to Shiny: interactive web apps]({{ site.baseurl }}/tutorials/shiny/index.html) 
{% endcapture %}
{% capture url %}{{ site.baseurl }}/assets/img/banner/path.jpg{% endcapture %}
{% include scroll-banner.html content=banner background=url %}

# Getting started

We hope you enjoy doing the course! There is no time limit for completion, so you can take it at your own pace. Each tutorial listed above might take you between one and three hours to complete, and your completion will be recorded once you take the quiz at the end. You can track your progression and access the course quizzes in our test centre.

#### You can download all the materials for this stream from our [GitHub repository](https://github.com/ourcodingclub/CC_course_stream2).

#### If you are not yet registered for the course, you will have to [sign up first](https://coding-club.shinyapps.io/course-registration/).


{% capture link %}https://coding-club.shinyapps.io/test-centre/{% endcapture %}
{% include link-button.html url=link button="Launch Quiz Centre" %}

<center><img src="{{ site.baseurl }}/assets/img/dl_course/DL_workflow.png" style= "width:50%; height:auto;" alt="workflow-diagram"></center>

{% capture link %}{{ site.baseurl }}/course/wiz-viz-challenge/index.html{% endcapture %}
{% capture banner %}
# Challenge yourself

Have you completed all the tutorials you wanted to? Feel you're ready for some real-life applications? We encourage you to test your skills and take the challenge associated to this stream.

Our case-study challenges are designed to test the range of skills you gained throughout the course. We provide guidance but no step-by-step instructions, so your solution will be unique! A challenge might take you 4-8 hours to complete (get in touch if you get stuck!). The button below will take you to the challenge page where you can see what is required.

{% include link-button.html url=link button="Try me!" %}
{% endcapture %}
{% capture url %}{{ site.baseurl }}/assets/img/banner/woods.jpg{% endcapture %}
{% include scroll-banner.html content=banner background=url %}

# All done?

If you have finished the stream and would like to request a certificate, you can do so in a few clicks. Note that this will not exclude you from the course, so if you decide to come back for more our doors are still open! 

<form class="form-group" action="https://coding-club.shinyapps.io/certificate/" method="get"> 
   <button type="submit" style="background-color:#b5daa7"> Request your certificate
            </button>
</form>

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


