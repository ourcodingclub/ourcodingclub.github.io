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
  	background: #75c0d8;
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
  	background: #75c0d8;
    border-bottom: 1px solid #aaa;
    margin-bottom: .5em;
}

intro {
   padding: 100px;
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

 </details> <br>
 
 <details>
   <summary markdown= "span"> Another question </summary>

First of all, what is a working directory? This is the folder that R will look into to find data and save any plots or scripts. To find out where your working directory currently is and to change it see the code below.

```r
# Identify your current directory
getwd()

# Set your working directory
setwd("insert folder path")
```

Alternatively you can set it from the menu: _Session > Set Working Directory > Choose Directory_. For `setwd()`, inside the brackets you should input your file path as follows `setwd("C:/Documents/Directory")`

 </details> <br>
 
</section>


<!-- Second section  -->
<section id="intro" markdown="1">
## A new section

<details>
 <summary markdown= "span">Another question </summary>
    

First of all, what is a working directory? This is the folder that R will look into to find data and save any plots or scripts. To find out where your working directory currently is and to change it see the code below.

```r
# Identify your current directory
getwd()

# Set your working directory
setwd("insert folder path")
```

Alternatively you can set it from the menu: _Session > Set Working Directory > Choose Directory_. For `setwd()`, inside the brackets you should input your file path as follows `setwd("C:/Documents/Directory")`

 
 </details>
</section>


</div>

