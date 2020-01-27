---
layout: post
title: Copying and pasting code chunks
subtitle: Let's make a template that works!
date: 1900-01-01
author: Sandra
---
<div class="block">
          <center><img src="{{ site.baseurl }}/img/tutheaderintro.jpg" alt="Img"></center>
        </div>

### Tutorial aims:

#### 1. Get a script and button that copy and paste the code
#### It works!


<div class="row">

  <div class="col-md-3" markdown="1">
  <img width="auto" height="100" src="{{ site.baseurl }}/img/DL/shield_stream1.png">
  </div>
  
  <div class="col-md-9" markdown="1">
  <big>This tutorial is part of the [Stats from Scratch](https://ourcodingclub.github.io/course/stats-scratch.html) stream of our online course. Want to join? More info [here](https://ourcodingclub.github.io/course_home/)!</big>
  </div>
  
</div>




<b> What is R? </b> 
R is a statistical programming language that has rapidly gained popularity in many scientific fields. It was developed by Ross Ihaka and Robert Gentleman as an open source implementation of the "S" programming language. (Next time you need a fun fact, you can say "Did you know that S came before R?") R is also the name of the software that uses this language for statistical computing. With a huge online support community and dedicated packages that provide extra functionality for virtually any application and field of study, there's hardly anything you <i>can't</i> do in R. 

<a id="Acode01" class="copy" name="copy_pre" href="#"> <i class="fa fa-clipboard"></i> Copy Contents </a><br>
<section id= "code01" markdown="1">

```r
install.packages("dplyr")
library(dplyr)
# Note that there are quotation marks when installing a package, but not when loading it
# and remember that hashtags let you add useful notes to your code! 

setwd("C:/User/CC-1-RBasics-master")
# This is an example filepath, alter to your own filepath
```
</section>

<b>Watch out!<b/> Note that on a Windows computer, a copied-and-pasted file path will have backslashes separating the folders (`"C:\folder\data"`), but the filepath you enter into R should use <b>forward slashes<b/> (`"C:/folder/data"`). 


You'll notice the `taxonGroup` variable shows as a character variable, but it should be a factor (categorical variable), so we'll force it to be one. When you want to access just one column of a data frame, you append the variable name to the object name with a dollar `$`sign. This syntax lets you see, modify, and/or reassign this variable.

<a id="Acode02" class="copy" name="copy_pre" href="#"> <i class="fa fa-clipboard"></i> Copy Contents </a><br>
<section id= "code02" markdown="1">

```r
head(edidiv$taxonGroup)     # Displays the first few rows of this column only
class(edidiv$taxonGroup)    # Tells you what type of variable we're dealing with: it's character now but we want it to be a factor

edidiv$taxonGroup <- as.factor(edidiv$taxonGroup)     # What are we doing here?!
```
</section> 

In that last line of code, the `as.factor()` function turns whatever values you put inside into a factor (here, we specified we wanted to transform the character values in the `taxonGroup` column from the `edidiv` object). However, if you were to run just the bit of code on the _right side_ of the arrow, it would work that one time, but would not modify the data stored _in_ the object. By _assigning_ with the arrow the output of the function to the variable, the original `edidiv$taxonGroup` in fact gets _overwritten_ : the transformation is stored in the object. Try again to run `class(edidiv$taxonGroup)` - what do you notice?

<a id="Acode03" class="copy" name="copy_pre" href="#"> <i class="fa fa-clipboard"></i> Copy Contents </a><br>
<section id= "code03" markdown="1">

```r
# More exploration
dim(edidiv)                 # Displays number of rows and columns
summary(edidiv)             # Gives you a summary of the data
summary(edidiv$taxonGroup)  # Gives you a summary of that particular variable (column) in your dataset
```
</section>
<hr>
<hr>

__Check out <a href="https://ourcodingclub.github.io/workshop/" target="_blank">this page</a> to learn how you can get involved! We are very happy to have people use our tutorials and adapt them to their needs. We are also very keen to expand the content on the website, so feel free to get in touch if you'd like to write a tutorial!__

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/). <a href="https://creativecommons.org/licenses/by-sa/4.0/"><img src="https://licensebuttons.net/l/by-sa/4.0/80x15.png" alt="Img" style="width: 100px;"/></a>

<a href="https://www.surveymonkey.co.uk/r/6CQF3J7" target="_blank">&nbsp; We would love to hear your feedback, please fill out our survey!</a>
<br>
&nbsp; You can contact us with any questions at <a href="mailto:ourcodingclub@gmail.com?Subject=Tutorial%20question" target = "_top">ourcodingclub@gmail.com</a>
<br>
<h3>&nbsp; Related tutorials:</h3>
{% assign posts_thresh = 8 %}

<ul>
  {% assign related_post_count = 0 %}
  {% for post in site.posts %}
    {% if related_post_count == posts_thresh %}
      {% break %}
    {% endif %}
    {% for tag in post.tags %}
      {% if page.tags contains tag %}
        <li>
            <a href="{{ site.url }}{{ post.url }}">
	    &nbsp; - {{ post.title }}
            </a>
        </li>
        {% assign related_post_count = related_post_count | plus: 1 %}
        {% break %}
      {% endif %}
    {% endfor %}
  {% endfor %}
</ul>
<br>
<h3>&nbsp; Subscribe to our mailing list:</h3>
<div class="container">
	<div class="block">
        <!-- subscribe form start -->
		<div class="form-group">
			<form action="https://getsimpleform.com/messages?form_api_token=de1ba2f2f947822946fb6e835437ec78" method="post">
			<div class="form-group">
				<input type='text' class="form-control" name='Email' placeholder="Email" required/>
			</div>
			<div>
                        	<button class="btn btn-default" type='submit'>Subscribe</button>
                    	</div>
                	</form>
		</div>
	</div>
</div>

<ul class="social-icons">
	<li>
		<h3>
			<a href="https://twitter.com/our_codingclub" target="_blank">&nbsp;Follow our coding adventures on Twitter! <i class="fa fa-twitter"></i></a>
		</h3>
	</li>
</ul>

