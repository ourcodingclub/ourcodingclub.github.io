---
layout: page
title: Frequently asked questions
date: 2015-03-26 00:00:00
author: Izzy Rich & Sam Kellerhals 
permalink: /faq/
---

<head>
   <style>
.collapsible {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}

.active, .collapsible:hover {
  background-color: #ccc;
}

.collapsible:after {
  content: '\02795';
  font-size: 13px;
  color: white;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: "\2796"; 
}

   </style>
</head>

<script>
        var acc = document.getElementsByClassName("collapsible");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
</script>


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


    <!-- Basic skills -->
<section id="intro" markdown="1">
## Basic skills (first way: like tutorials)

<details>
   <summary markdown= "span"> Setting up your workspace </summary>
    <summary markdown= "block"> 

First of all, what is a working directory? This is the folder that R will look into to find data and save any plots or scripts. To find out where your working directory currently is and to change it see the code below.

```r
# Identify your current directory
getwd()

# Set your working directory
setwd("insert folder path")
```

Alternatively you can set it from the menu: _Session > Set Working Directory > Choose Directory_. For `setwd()`, inside the brackets you should input your file path as follows `setwd("C:/Documents/Directory")`

</summary>   
 </details> <br>
</section>

<!-- Data manip -->
<div class="row">
## Data manipulation (second way; javascript)

 <button class="collapsible"> Structure your dataset </button>
   <div class="panel">
      <summary markdown= "block"> 
      
      <p>Lorem ipsum...</p>
  
  ```r
  # some code
  code(code)
  ```
 And some text
   
      </summary> 
   <div>
</div>

## Another section

</div>
 