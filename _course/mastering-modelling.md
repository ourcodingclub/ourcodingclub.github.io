---
layout: course
title: "Mastering Modelling"
subtitle: "Advanced data manipulation and analysis for complex ecological datasets"
banner: "../assets/img/banner/mastering-modelling.jpg"
---
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@our_codingclub" />
<meta name="twitter:creator" content="@our_codingclub" />
<meta property="og:url" content="https://ourcodingclub.github.io/course/mastering-modelling/index.html" />
<meta property="og:title" content="Mastering Modelling: Data Science for Ecologists and Environmental Scientists" />
<meta property="og:description" content="Learn statistical modelling from model design through to mixed models, Bayesian inference and more." />
<meta property="og:image" content="https://ourcodingclub.github.io/assets/img/dl_course/DL_stream3.png" />

# Stream overview

Ecological data are messy... We study a range of organisms and processes through varied study designs like long-term monitoring and factorial experiments, and most of the time usual statistical assumptions don't hold because the data we collect are not independent. 

But fear not, environmental scientist! This course stream is designed to give the more experienced R user* an overview of the things to consider in choosing and fitting a model, and to explore a wide range of statistical models, from mixed-effects models to ordination studies, time-series analysis, and more, with the option to branch out towards different programming languages to best suit your needs. 

We assume you have a good understanding of the different objects in R and can manipulate them, for instance for plotting or inclusion in linear models. Need a refresher? Take a look at the tutorials in our [Stats from Scratch]({{ site.baseurl }}/dl_course/stats-scratch/index.html) or [Wiz of Data Vis]({{ site.baseurl }}/dl_course/wiz-viz/index.html) course streams.

{% capture banner %}
# As part of this course stream, we suggest you do the following tutorials:

* [Efficient data manipulation: Streamline your code]({{ site.baseurl }}/tutorials/data-manip-efficient/index.html)
* [Intro to functional programming: loops & custom functions]({{ site.baseurl }}/tutorials/funandloops/index.html) 
* [Intro to model design: pick the right model for your questions]({{ site.baseurl }}/tutorials/model-design/index.html) 
* [Ordination: finding patterns in data]({{ site.baseurl }}/tutorials/ordination/index.html) 
* [Intro to mixed-effects linear models]({{ site.baseurl }}/tutorials/mixed-models/index.html) 
* [Intro to Bayesian inference with MCMCglmm]({{ site.baseurl }}/tutorials/mcmcglmm/index.html)
* [Generalised mixed-effects models in Stan]({{ site.baseurl }}/tutorials/stan-2/index.html)
{% endcapture %}
{% capture url %}{{ site.baseurl }}/assets/img/banner/river.jpg{% endcapture %}
{% include scroll-banner.html content=banner background=url %}

# Getting started

We hope you enjoy doing the course! There is no time limit for completion, so you can take it at your own pace. Each tutorial listed above might take you between one and three hours to complete, and your completion will be recorded once you take the quiz at the end. You can track your progression and access the course quizzes in our test centre.

#### You can download all the materials for this stream from our [GitHub repository](https://github.com/ourcodingclub/CC_course_stream3).

#### If you are not yet registered for the course, you will have to [sign up first](https://coding-club.shinyapps.io/course-registration/).

{% capture link %}https://coding-club.shinyapps.io/test-centre/{% endcapture %}
{% include link-button.html url=link button="Launch Quiz Centre" %}

<center><img src="{{ site.baseurl }}/assets/img/dl_course/DL_workflow.png" style= "width:50%; height:auto;" alt="workflow-diagram"></center>

{% capture link %}{{ site.baseurl }}/course/mastering-modelling-challenge/index.html{% endcapture %}
{% capture banner %}
# Challenge yourself

Have you completed all the tutorials you wanted to? Feel you're ready for some real-life applications? We encourage you to test your skills and take the challenge associated to this stream.

Our case-study challenges are designed to test the range of skills you gained throughout the course. We provide guidance but no step-by-step instructions, so your solution will be unique! A challenge might take you 4-8 hours to complete (get in touch if you get stuck!). The button below will take you to the challenge page where you can see what is required.
{% include link-button.html url=link button="Try me!" %}
{% endcapture %}
{% capture url %}{{ site.baseurl }}/assets/img/banner/gannets.jpg{% endcapture %}
{% include scroll-banner.html content=banner background=url %}

# All done?

If you have finished the stream and would like to request a certificate, you can do so in a few clicks. Note that this will not exclude you from the course, so if you decide to come back for more our doors are still open! 

<form class="form-group" action="https://coding-club.shinyapps.io/certificate/" method="get"> 
   <button type="submit" style="background-color:#69a6e0"> Request your certificate
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

