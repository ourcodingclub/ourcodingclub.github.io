---
layout: tutorial
title: Troubleshooting and how to find help
subtitle: How to avoid common mistakes in R
date: 2016-11-15 17:11:27
updated: 2019-04-04 00:00:00
author: Gergana
updater: Sandra
survey_links: https://www.surveymonkey.co.uk/r/6CQF3J7
redirect_from:
  - /2016/11/15/troubleshooting.html
tags: basic-r
---

# Tutorial aims:

1. [Learn how to pick up on errors in R](#id)
2. [Get familiar with common errors and solutions](#errors)
3. [Learn how to find help online](#help)
4. [Practice by fixing errors in an example script](#practice)

In [our first tutorial]({{ site.baseurl }}/tutorials/intro-to-r/index.html), we learned how to import data into `RStudio`, conduct a simple analysis (calculate species richness) and plot the results. Not bad for a first time! If you need reminding of some programming terms, take a quick look at our [glossary]({{ site.baseurl }}/tutorials/intro-to-r/index.html#glossary).

Programming comes with a learning curve and you will no doubt encounter many error messages while you familiarise yourself with the workings of R. But fear not! Today we will tackle some of the most common coding errors and help you avoid them. You might have seen some of these error messages already, but after completing this tutorial, we hope they won't appear too often on your RStudio screens.


# 1. Learn how to pick up on errors in R
{: #id}

In addition to keeping a record of your code, scripts are also useful for detecting simple coding errors before you've even run the code. If `RStudio` picks up on a character missing, a command that doesn't make sense due to spelling errors or similar, a little red _x_ appears next to that line of code. Scanning your code for _x_'s before running it is always a good idea and it's very convenient since you know exactly on which line you made a mistake. The other way `R` reports errors is through messages in the console, which appear after you run code that is not quite right. Although the error messages look scary (the red font and words like "fatal" sure give them a bad reputation), they are actually the second best option to no errors at all: `R` has identified there is a problem and from the message, you can figure out what it is and solve it!

![RStudio GUI error and code linter warning, annotated]({{ site.baseurl }}/assets/img/tutorials/troubleshooting/xandm.png)

# 2. Get familiar with common errors and solutions
{: #errors}

Here we have compiled a list of mistakes we often make. Do you think we have forgotten an error message or problem you encounter often? Please let us know at ourcodingclub(at)gmail.com and we will add it to our list!

- __Your version of `R` or `RStudio` is too old (or too new)__. If you haven't updated `R` or `RStudio` in a while, you might not be able to use some of the new packages coming out - when you try installing the package, you will get an error message saying that the package is not compatible with your version of `RStudio`. This problem is quickly fixed by a visit to the [RStudio website](https://www.rstudio.com/products/rstudio/) or the [R website](https://cran.r-project.org/), from there you can get the most recent version. On the flip side, when you get the newest RStudio, packages that haven't been updated recently might not work, or your old code breaks. This occurs less often and in general, code is ever evolving and getting better and better, so it's good to keep up to date with the latest versions of both RStudio and R packages.
- __Syntax errors__. The easiest mistakes to make! You've forgotten a comma, opened a bracket, but haven't closed it, added an extra character by mistake or something else `R` doesn't understand. Those are usually picked up by R and you will get error messages reminding you to proof-read your code and fix it. If you can't pinpoint the correct way to code what you need, there are many [places to find help](#help). Following a [Coding Etiquette]({{ site.baseurl }}/tutorials/etiquette/index.html) can help you keep these errors to a minimum.
- __You're trying to use a certain function and R doesn't recognise it__. First, it's worth checking whether you have installed and loaded the package the function comes from - running the code `?function-name`, e.g. `?filter` will display a help screen with information on how you use the function, as well as the package it comes from. 

If you have loaded several similar packages from your library, they might contain different functions with the same name and your code might break if `R` is confused as to which one to use - running `package::function`, e.g. `dplyr::filter` will return information on the function in the console. Note that `R` will try to add `()` at the end of `dplyr::filter`. Delete them and run the code. 

If you are reading up on `R` online, or copying and modifying code, you might be using a function from a new package without knowing. If it looks unfamiliar, googling its name with "r package" might reveal its origin. Sometimes packages depend on other packages to run. Often those get installed automatically when you install the package, but sometimes you get an error message asking you to install another package, easily solved by `install.packages("newpackage")`.

- __Function breakdown and debugging__. If you are running self made functions or `for` loops, you might need to go through R's traceback/debug browser. You can find help on [RStudio's Debugging Support Page](https://support.rstudio.com/hc/en-us/articles/205612627-Debugging-with-RStudio).
- __Missing objects__. Running tests and plotting data are often hindered by R failing to find the object it's meant to analyse. When that happens, first check that your object names are correct: spelling mistakes (capital and lower case letters, wrong letters, etc.) can all make objects unrecognisable. In this code `e <- length(unique(FloweringPlants$taxonName))` I asked R to calculate species richness of flowering plants, but forgot that I called the object `Flowering.Plants` not `FloweringPlants`. Remember that when you refer to a certain variable from an object using the dollar sign, the object comes first, the variable second:`Flowering.Plants$taxonGroup`, not `taxonGroup$Flowering.Plants`.
- __Data not in the right format__. This might not necessarily result in an error message, but might lead to graphs/results that are wrong. For example, in [our first tutorial]({{ site.baseurl }}/tutorials/intro-to-r/index.html) we created a data frame and plotted species richness. If we had chosen a data matrix instead, that plot would have looked very different (and wrong). We use matrices when the variables are all the same type (all text, all numerical) and of the same length (same number of rows). Data frames are for when we have multiple variables of different types and vectors are for a series of numbers of the same type. If your results/plots make you feel suspicious, it's good to go back to your data and check: did it import right into R, and is it in the right format? You can do this using `head()` for a preview, `str()` to check the class of each variable, and `summary()`.

![Incorrect stacked bar chart]({{ site.baseurl }}/assets/img/tutorials/troubleshooting/wrong.png)

Figure 1. An unfortunate looking barplot! The data were chosen to be a data matrix, but, because in matrices all variables are of the same type, R expects `taxa_f` - the names of the different taxa - to have a numerical value, and lumps all the species richness values together in the second bar. A data frame was definitely a better choice!

- __Wrong data distribution used in models__. There are several reasons why models won't converge, including the use of inappropriate distribution type. Usually we choose between normal (gaussian), binomial, Poisson, or Quasipoisson distributions, which we will learn more about in [our workhops on modelling]({{ site.baseurl }}/tutorials/modelling/index.html).
- __R crashed!__ If you've overloaded `R`, it can make a dramatic exit (bomb image and all) or sometimes it stops responding and you have to terminate the session. That's why it's very important to save your scripts often, but it's better to save them as new files, e.g. `Edi_biodiv_16thNov.R`, instead of overwriting the same file. That way if you want to revert back to old code or use some part of it, it's easy to find it. This is the most basic type of version control. We can learn more about version control in [our `git` tutorial]({{ site.baseurl }}/tutorials/git)

![Aborted R Session error message]({{ site.baseurl }}/assets/img/tutorials/troubleshooting/bomb.png)

- __Aaaah! I enlarged my plot, and now it's full screen and I can't get back__! If you click on the little magnifying glass in the Plots window, it opens your plot in a new window that you can resize. Convenient! Less convenient is when you accidentally drag the window to the top of your screen and it goes full screen, blocking everything else. This is not an issue anymore with newer versions of R Studio, but if it ever happens, you can escape using the _backspace_ key on your keyboard - and hopefully you don't lose data in the process.
- __I am stuck in a loop of pluses__! If the numbers of opening and closing brackets don't match up, `R` thinks there is more code coming. That is why, in the console, it is prompting you to add more code: every time you press enter, a new + appears. Press _Escape_ on your keyboard to get back to the normal `>` prompt in the console and check your code to find your error.

![RStudio console prompt changed to "plus" syrbols]({{ site.baseurl }}/assets/img/tutorials/troubleshooting/pluses.png)

- __The cursor in the script file changed from `|` to `_` and now text gets overwritten when I type__. This happens when you accidentally press _Insert_ on your keyboard and as a result when you add new text, it gets written over. Press _Insert_ again to go back to normal.


{% capture callout %}
## Cheat sheet! 
{: #help}

__Here are some of the most common error messages you'll meet when you get started, and what they actually mean:__

- __Error in `function-name(...)`: could not find function 'function-name'__ : This probably means that you are trying to use a function from a package you have not loaded. Type `??function-name` (or look it up online) to find out which package it comes from, and make sure the package is loaded using `library(package-name)`. Which leads us to...
- __Error in `library(package-name)`: there is no package called 'package-name'.__ : Did you install the package? Packages need to be installed once, using `install.packages('packag-name')`, after which they can be loaded with the `library()` command. 
- __Error in `function-name()`: object 'object-name' not found__: R tells you that it cannot find an object that should be in your environment. First, make sure that you have an object with this name in your Environment panel. It could be just a typo, for instance you defined the object as `birds_nests` yet you try to plot it calling `Bird_nests`. (And yes, R is also case-sensitive!) Or it could be that you haven't actually run the code which creates this object yet! 
- __Error: unexpected symbol in 'line-of-code'__ : Most likely you forgot (or had an extra!) comma, bracket or other punctuation sign somewhere. 
- __Cannot open file 'your-file-path': No such file or directory__: R cannot find the file you are trying to load, often because you forgot to specify your working directory (we learned how to do it in our [first tutorial]({{ site.baseurl }}/tutorials/intro-to-r/index.html), or because there is a mistake in your file path. (Hint: if you copied it from the Windows Explorer, you need to swap the backward slashes for forward slashes.) If you get __object 'your-file-path' not found__, then you probably forgot the quotation marks around the file path `read.csv(file = 'my-file-path/file.csv')`. 
{% endcapture %}
{% include callout.html content=callout colour='callout' %}

# 3. Learn how to find help

__An online search for the error message (along with "R" and the function or package name) is always a good start__. Chances are someone has already encountered that error and has asked about it online. If the error message is very long, try paraphrasing based on what you think the problem might be (and delete references to your specific objects and file names). There are several really useful online forums and websites where people ask for and receive help, such as [Stackoverflow](http://stackoverflow.com) and [Rbloggers](https://www.r-bloggers.com/).

__For "how to ..." type queries, a search will often result in tutorials, and even Youtube videos as well__. For instance, " ggplot how to change axis titles" or "dplyr filtering on two conditions" will quickly get you what you need.

__R Help__ Of course, R has built-in documentation for all functions and packages. We already mentioned that you can type `help()` or `?function-name` (try `??function-name`for a broader search). The [RDocumentation website](https://www.rdocumentation.org/) contains much of the same in a slightly nicer format, with examples and more links. 

We have also compiled a ["Useful links" list of helpful websites and tutorials]({{ site.baseurl }}/links/) where you can find additional help. 

__Of course, `R` won't always tell you if you are doing something wrong: sometimes your code is correct, but you are doing the wrong type of analysis for your data. Nevertheless, making sure you avoid easy-to-make mistakes is a great place to start - even the fanciest, super-advanced tests can be brought down by a single missing comma.__

{% capture callout %}
## A warning on warnings!

Errors are not the only scary red text that will appear in the console. Often, you will run code and get a message saying something like 'There were 13 warnings, use `warnings()`to see them'. It could also be a specific warning telling you that R is ignoring `NA`s (missing) data in a plot, or that a function generated unexpected results such as `NaN` (not a number). 

Warnings are not necessarily the end of the world, but you should see them as major red flags, and make sure you know what is going on before you pursue your analysis. Like error messages, a simple online search of the warning text will often put you on the right track. 
{% endcapture %}
{% include callout.html content=callout colour="important" %}

# 4. Practice! 
{: #practice}

Practice truly is the best way to learn how to avoid errors in `R` - to get you started, we have written a purposefully wrong script - you can download the file from this [Github repository](https://github.com/ourcodingclub/CC-1-RBasics). There you will find the data `edidiv.csv`, as well as the wrong (`CC_2_RBasics_Wrong_Script.R`) and right script. Can you fix all the mistakes?


# Tutorial outcomes:

1. You know how `R` reports errors, both in script files and in the console
2. You can solve common mistakes in `R`
3. If you can't figure out a solution yourself, you know where to find help

Next up. we have a tutorial on [Coding Etiquette]({{ site.baseurl }}/tutorials/etiquette/index.html)! Developing code-writing routines and sticking to defined conventions is a good way to ensure uniform, mistake-free code that runs smoothly!

Feeling ready to go one step further? Learn how to format and manipulate data in a tidy and efficient way with our [tidyr and dplyr tutorial]({{ site.baseurl }}/tutorials/piping/index.html)! Keen to make more graphs? Check out our [data visualisation tutorial]({{ site.baseurl }}/tutorials/datavis/index.html).

<br>

<section id="portfolio-work" style="background-color: #ebd970; padding-bottom:20px">
<div class="content-new-streams">
<a href="https://ourcodingclub.github.io/course/stats-scratch/index.html" target="_blank"><img src="{{ site.baseurl }}/assets/img/dl_course/DL_stream1.png" style= "width:30%; height:auto; padding:20px;20px;20px;80px;" alt="Stats from Scratch stream"></a>
<h4>Doing this tutorial as part of our Data Science for Ecologists and Environmental Scientists online course?</h4>
<p><big>This tutorial is part of the <b><a href="https://ourcodingclub.github.io/course/stats-scratch/index.html" target="_blank">Stats from Scratch stream</a></b> from our online course. Go to the stream page to find out about the other tutorials part of this stream!</big></p>
<p>If you have already signed up for our course and you are ready to take the quiz, go to our quiz centre.<b> Note that you need to <a href="https://ourcodingclub.github.io/course_info" target="_blank">sign up first</a> before you can take the quiz.</b> If you haven't heard about the course before and want to learn more about it, check out the <a href="https://ourcodingclub.github.io/course" target="_blank">course page.</a></p>

{% capture link %}https://coding-club.shinyapps.io/test-centre/{% endcapture %}
{% include link-button.html url=link button="Launch Quiz Centre" %}

</div>
</section>
