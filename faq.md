---
layout: page
title: Frequently asked questions
date: 2015-03-26 00:00:00
author: Izzy Rich & Sam Kellerhals 
permalink: /faq/
---

<head>
   <style>
   
details {
    border: 1px solid #aaa;
  	background: #b1d0da;
    border-radius: 4px;
    padding: .5em .5em 0;
}

summary {
    font-weight: bold;
    margin: -.5em -.5em 0;
    padding: .5em;
}

details[open] {
    padding: .5em;
  	background: #fff;
}

details[open] summary {
  	background: #b1d0da;
    border-bottom: 1px solid #aaa;
    margin-bottom: .5em;
}

intro {
   padding: 100px 25px;
}
   </style>
</head>


<!-- Slider -->
<section id="global-header">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="block">
                    <h1>Questions & Answers</h1>
                    <b><p><big>Here we have collated some of the questions we encounter most often during our workshops, plus their answers. We will continue expanding this page, so feel free to suggest additions to the content!</big></p></b>
                </div>
            </div>
        </div>
    </div>
</section>

{::options parse_block_html="true" /}

<div style="padding:100px;">

<!-- Basic skills -->

<section id="intro" markdown="1">
## Basic skills

<details>
   <summary markdown= "span"> Setting up your workspace </summary>

First of all, what is a working directory? This is the folder that R will look into to find data and save any plots or scripts. To find out where your working directory currently is and to change it see the code below.

```r
# Identify your current directory
getwd()

# Set your working directory
setwd("insert folder path")
```

Alternatively you can set it from the menu: _Session > Set Working Directory > Choose Directory_. For `setwd()`, inside the brackets you should input your file path as follows `setwd("C:/Documents/Directory")`

 </details> 
 <br>
 
 <details>
   <summary markdown= "span"> Loading data and packages </summary>
__Saving and loading your script again__

You should always be typing your code into a script file in order to produce a reproducible record of your analysis; if you only type in the console, R will not save your work! You should save your script often to avoid any problems. To save, click the icon at the top of your R Script to save as an .Rdata file. Here you will have to choose a file name. Try to avoid spaces and capital letters, as R can get confused by these! Save the file to your working directory so it will be easy to locate whenever you need it next. To load your script again, go to _File > Open File_ and choose your script. It should open on a new script tab in RStudio.

__Saving CSV files__

A CSV, or a comma-separated values file, contains values as a series of rows organised so that each column is separated by a comma. If your data is entered in Excel, you can save it as a CSV file by clicking on _Save As_ and then choosing CSV as your file extension. CSV files are often easier to work with in R.

__Loading packages__

R contains thousands of different packages which allow you to do many different things, ranging from mapping to machine learning to web scraping. The best way to find out about what packages may be helpful to you is to do a google search and/or search the <a href="https://cran.r-project.org/web/packages/" target="_blank"> CRAN website </a>. Once you have found your package, you must first install it on your machine and then call it in your script:

```r
# Load CSV file
objectname <- read.csv("filepath/file.csv")

# Installing dplyr package
install.packages("dplyr")

# Load package
library(dplyr)
```

 </details> 
 <br>
 
  <details>
   <summary markdown= "span"> Other tips and resources </summary>


__Writing clean code__

R code should be easy to  read, share and verify. Aim to keep your object naming conventions consistent across your script and make sure to comment your code using a hashtag. For extensive guidelines, please consult Google's R style guide <a href="https://google.github.io/styleguide/Rguide.xml" target="_blank">here</a>.

__Helpful tutorials__

   <a href="https://ourcodingclub.github.io/2016/11/13/intro-to-r.html" target="_blank"> Introduction to R </a>
   <a href="https://ourcodingclub.github.io/2016/11/15/troubleshooting.html" target="_blank"> Troubleshooting R </a>
   <a href="https://ourcodingclub.github.io/2017/04/25/etiquette.html" target="_blank"> Coding Etiquette </a>

__Useful commands for RStudio__

In order to clean your global environment (all the objects, functions etc. you have created), you can execute the following command in your console: `rm(list=ls())`. To clear your console, you can execute this command `cat("\014")`. 

 </details> 
 <br>
 

</section>


<!-- Data manipulation  -->
<section id="intro" markdown="1">
## Data manipulation

  <details>
   <summary markdown= "span"> Another question </summary>


 </details> 
 <br>
 
  <details>
   <summary markdown= "span"> Another question </summary>


 </details> 
 <br>


<details>
 <summary markdown= "span">Another question </summary>
    
 </details>
 <br>
 
</section>


<!-- Data viz  -->
<section id="intro" markdown="1">
## Data visualisation

  <details>
   <summary markdown= "span"> Another question </summary>


 </details> 
 <br>
 
  <details>
   <summary markdown= "span"> Another question </summary>


 </details> 
 <br>


<details>
 <summary markdown= "span">Another question </summary>
    
 </details>
 <br>
 
</section>


<!-- Modelling  -->
<section id="intro" markdown="1">
## Modelling basics

  <details>
   <summary markdown= "span"> Another question </summary>


 </details> 
 <br>
 
  <details>
   <summary markdown= "span"> Another question </summary>


 </details> 
 <br>


<details>
 <summary markdown= "span">Another question </summary>
    
 </details>
 <br>
 
</section>

</div>

