---
layout: post
title: Writing R packages in Rstudio
subtitle: Tutorial adapted from stirlingcodingclub.github.io
date: 2017-03-20 00:00:00
author: Brad Duthie
meta: "Tutorials"
tags: R
---
<div class="block">
	<center>
		<img src="{{ site.baseurl }}/img/tutheaderdatavis2.png" alt="Img">
	</center>
</div>

### Tutorial Content

#### <a href="#intro"> 1. Introduction: What is an R package? </a>

#### <a href="#install"> 2. Packages that need to be installed </a>

#### <a href="#basic"> 3. The most basic R package </a>

#### <a href="#project"> 4. Making a new R project  </a>

#### <a href="#documentation"> 5. Adding documentation (help files) </a>

#### <a href="#github"> 6. Uploading to and installing from GitHub </a>

#### <a href="#morestuff"> 7. Other useful things to know </a>

#### <a href="#whatelse"> 8. Additional resources </a>

__This tutorial was originally created by the University of Stirling's Coding Club, <a href="https://stirlingcodingclub.github.io/SCC_R_package/notebook/Rpackage_notes.html" target="_blank">and can be found at this link</a>. Our Coding Club would like to extend our deepest gratitude to them, for allowing us to publish this tutorial on our website as well. After going through this tutorial, you will be able to write a basic R package, which can be installed from <a href="http://github.com" target="_blank">Github</a>.__

<a name="intro"></a>

## 1. Introduction: What is an R package?

Packages are bundles of code and data that can be written by anyone in the R community. R Packages can serve any number of uses, and range from well documented and widely used <a href="https://cran.r-project.org/package=vegan"target="_blank">statistical libraries</a> to packages of functions that <a href="https://github.com/psolymos/KnockKnockJokes"target="_blank">tell knock-knock jokes.</a>

. If you have been using R for even a short length of time, you have probably needed to install and use the functions published in an R package. **In these notes, I will walk you through the basics of writing your own R package**. Even if you never intend to do this for your own code, I hope that this process will make you more familiar with the R packages that you use in your research, and how those packages are made. 

A lot of R users are probably familiar with the <a href="https://cran.r-project.org/" target="_blank">Comprehensive R Archive Network (CRAN)</a>, a massive repository that currently holds over 13000 published R packages. Packages on CRAN are published for the R community and installed in RStudio using the function `install.packages`. But not every R package is or should be uploaded to CRAN. Packages can uploaded and downloaded from GitHub, or even just built for personal use (some R users have their own personal R packages with documented functions that they have written and regularly use in their own research).

Here I will walk through the process of writing a very simple R package, uploading it to GitHub, and downloading it from GitHub. Throughout these notes, I will present only the Rstudio version of package development, but package development can also be done using the command line (though there is really no reason to do this, as Rstudio makes the whole process much easier). There are some packages that need to be installed before we start developing.

<a name="install"></a> 

## 2. Packages that need to be installed 

Before getting started, we need to install the <a href="https://cran.r-project.org/package=devtools" target="_blank">devtools</a> and <a href="https://cran.r-project.org/package=roxygen2" target="_blank">roxygen2</a> packages. The former contains a large bundle of tools needed in package development, while the latter is used to easily write documentation.

```r
install.packages("devtools")
install.packages("roxygen2")
```

It might be necessary to restart Rstudio after installing the above packages.

<a name="basic"></a> 

## 3. The most basic R package 

Assume that we want to create an R package that includes two functions. The first function will convert temperatures from degrees Fahrenheit to degrees Celsius, while the second function will convert temperatures from degrees Celsius to degrees Fahrenheit. The first thing we need to do is create a new folder somewhere on our computer that will hold the whole R package (there are other ways of doing this, but I am showing the way that I tend to use most often).

<center> <img src="{{ site.baseurl }}/img/rpackage1.png" alt="Img" style="width: 1000px;"/> </center>

The above shows the new folder 'SCC_R_package'. For now, this folder is empty. The first thing that we need to do is to create a new folder inside of `SCC_R_package' called 'R'.

<center> <img src="{{ site.baseurl }}/img/rpackage2.png" alt="Img" style="width: 1000px;"/> </center>

Inside this folder is where we will store the actual R scripts with the coded functions. Any number of '.R' files can be included in the folder, and each file can have any number of functions. You could, for example, give each function its own file, or just have one file with many R functions. For large projects, I find it easiest to group similar functions in the same R file. In our new R package, I will write both functions in the same file called 'temp_conversion.R', which has the code below.

```r
F_to_C <- function(F_temp){
    C_temp <- (F_temp - 32) * 5/9;
    return(C_temp);
}

C_to_F <- function(C_temp){
    F_temp <- (C_temp * 9/5) + 32;
    return(F_temp);
}
```

That is the whole file for now; just nine lines of code.

<center> <img src="{{ site.baseurl }}/img/rpackage3.png" alt="Img" style="width: 1000px;"/> </center>

The next thing that we need to do is create a new file called `DESCRIPTION` in the `SCC_R_package` directory (note, *not* in 'R', but just outside of it). This will be a plain text file with no extension, and it will hold some of the meta-data on the R package. For now, the whole file is just the following four lines of code, specifying the package name, type, title, and version number.

```
Package: SCCTempConverter
Type: Package
Title: Temperature Conversion Package for Demonstration
Version: 0.0.1.0
```

If we really wanted to call it quits, this is technically an R package, albeit an extremely basic one. We could load it using the code above after first reading in the `devtools` library. 

```r
library(devtools);
load_all("."); # Working directory should be in the package SCC_R_package
```

Note that the working directory needs to be set correctly to the R package directory (e.g., using the `setwd` function, or by choosing `Session > Set Working Directory` from the pull down menu of RStudio). In doing this, the above functions `F_to_C` and `C_to_F` are now read into R and we can use them to convert temperatures.

```r
F_to_C(79);
```

```r
C_to_F(20);
```

This is not a good stopping point for writing a package though, because we really should include some sort of documentation explaining what the package is for and helping users know what functions do. 

<a name="project"></a> 

## 4. Making a new R project

To get started on a proper R package complete with documentation, the best thing to do is to create a new R project. To do this in Rstudio, go to `File > New Project...`; the box below should pop up.

<center> <img src="{{ site.baseurl }}/img/rpackage4.png" alt="Img" style="width: 1000px;"/> </center>

Note that we could have started with a project right away, creating a new folder with the **New Directory** option. Instead, we will create the project in our **Existing Directory**, `SCC_R_package` by choosing the middle option. The following box should appear.

<center> <img src="{{ site.baseurl }}/img/rpackage5.png" alt="Img" style="width: 1000px;"/> </center>

The box above is asking for the local directory in which the project will be stored. Mine is shown above, but yours will be different depending on where `SCC_R_package` is stored. After clicking 'Create Project', you should be able to see the project inside the package directory.

<center> <img src="{{ site.baseurl }}/img/rpackage6.png" alt="Img" style="width: 1000px;"/> </center>

The R project is shown above as `SCC_R_package.Rproj`. Note that there are a couple other new things in the directory above, including `.Rproj.user` and `.Rbuildignore`. These are hidden files, so you might not see these in your own directory unless you explicitly ask your computer to show hidden files. The folder `.Rproj.user` is not really important; it stores some more meta-data about the package development. The file `.Rbuildignore` is not important for now, but could be useful later; this is just a plain text file that tells R to ignore selected files or folders when building the package (e.g., if we wanted to include a folder for our own purposes that is not needed or wanted for building the package). The interface in RStudio should now look something like the below.

<center> <img src="{{ site.baseurl }}/img/rpackage7.png" alt="Img" style="width: 1000px;"/> </center>

The colours you use might vary, but you should see the 'SCC_R_package' in the upper right indicating the project name.

<a name="documentation"></a> 

## 5. Adding documentation (help files) 

If we want others to use the functions that we have written, we need to provide some documentation for them. Documentation shows up in the 'Help' tab of RStudio when running the function `help`. You can run the following code to see what I mean.

```r
help(lm);
```

Note that the code below does the same thing as the code above.

```r
?lm
```

You should see a tab pop up somewhere in Rstudio that reads a markdown file with a helpful explanation of the `lm` function in R.

<center> <img src="{{ site.baseurl }}/img/rpackage8.png" alt="Img" style="width: 1000px;"/> </center>

You can make one of these helpful markdown files in Rstudio using the `roxygen2` package. To do this, we need to add to the functions written in the `temp_conversion.R` file. The code below shows a simple example.

```r
#' Fahrenheit conversion
#'
#' Convert degrees Fahrenheit temperatures to degrees Celsius
#' @param F_temp The temperature in degrees Fahrenheit
#' @return The temperature in degrees Celsius
#' @examples 
#' temp1 <- F_to_C(50);
#' temp2 <- F_to_C( c(50, 63, 23) );
#' @export
F_to_C <- function(F_temp){
    C_temp <- (F_temp - 32) * 5/9;
    return(C_temp);
}

#' Celsius conversion
#'
#' Convert degrees Celsius temperatures to degrees Fahrenheit
#' @param C_temp The temperature in degrees Celsius
#' @return The temperature in degrees Fahrenheit
#' @examples 
#' temp1 <- C_to_F(22);
#' temp2 <- C_to_F( c(-2, 12, 23) );
#' @export
C_to_F <- function(C_temp){
    F_temp <- (C_temp * 9/5) + 32;
    return(F_temp);
}
```

Note that the total length of the code has increased considerably to add in the documentation, but we now have some helpful reminders of how to use each function. The first line (e.g., `#' Fahrenheit conversion`) shows the function title, with the next line showing the description. Additional tags such as `@param` and `@examples` are used to write different subsections of the help file. These are not the only tags available; for more details about the Roxygen format, see <a href="http://kbroman.org/pkg_primer/pages/docs.html" target="_blank">Karl Broman's page</a> or Hadley Wickham's <a href="https://cran.r-project.org/web/packages/roxygen2/vignettes/roxygen2.html" target="_blank">introduction to roxygen2</a>. Using the above format, the <a href="https://cran.r-project.org/package=roxygen2" target="_blank">roxygen2 package</a> makes it easy to create help files in markdown. All that we need to do is make sure that the project is open and that the working directory is correct (typing `getwd()` should return the directory of our R package), then run the below in the console.

```r
library(roxygen2); # Read in the roxygen2 R package
roxygenise();      # Builds the help files
```

Here is what our package directory looks like now.

<center> <img src="{{ site.baseurl }}/img/rpackage9.png" alt="Img" style="width: 1000px;"/> </center>

Note that two things have been added. The first is a new directory called 'man', which holds the help files that we have written. The second is a plain text file `NAMESPACE`, which works with R to integrate them into the package correctly; you do not need to edit `NAMESPACE` manually, in fact, the file itself tells you not to edit it. Here are the entire contents of `NAMESPACE`.

```
# Generated by roxygen2: do not edit by hand

export(C_to_F)
export(F_to_C)
```

Inside the 'man' folder, there are two new markdown documents, one for each function.

<center> <img src="{{ site.baseurl }}/img/rpackage10.png" alt="Img" style="width: 1000px;"/> </center>

Both are plain text files. Here are the contents of `F_to_C.Rd`.

```
% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/temp_conversion.R
\name{F_to_C}
\alias{F_to_C}
\title{Fahrenheit conversion}
\usage{
F_to_C(F_temp)
}
\arguments{
\item{F_temp}{The temperature in degrees Fahrenheit}
}
\value{
The temperature in degrees Celsius
}
\description{
Convert degrees Fahrenheit temperatures to degrees Celsius
}
\examples{
temp1 <- F_to_C(50);
temp2 <- F_to_C( c(50, 63, 23) );
}
```

We can load the package now and ask for help with `F_to_C`. 

```r
?F_to_C;
```

RStudio will present the below in the 'Help' tab.

<center> <img src="{{ site.baseurl }}/img/rpackage11.png" alt="Img" style="width: 1000px;"/> </center>

Now that we have the key functions and documentation, we can upload this to GitHub for the world to see and use. 

<a name="github"></a> 

## 6. Uploading to and installing from GitHub 

Note that putting the R package on GitHub is not a requirement, but it is probably the easiest way to share your work. Before uploading the R package to GitHub, I will add one more folder to the repository. 

<center> <img src="{{ site.baseurl }}/img/rpackage12.png" alt="Img" style="width: 1000px;"/> </center>

I use the arbitrarily named 'notebook' folder to hold various files that I want to be available to me in development, but not actually present in the R package. I can make the R package ignore this in build by adding a single line of code to the '.Rbuildignore' file mentioned earlier. Below are the entire contents of the '.Rbuildignore' file.

```
^.*\.Rproj$
^\.Rproj\.user$
notebook*
```

The lines `^.*\.Rproj$` and `^\.Rproj\.user$` were already added automatically by RStudio. My added line `notebook*` tells R to ignore anything that follows 'notebook' in the directory. This would include anything in the folder 'notebook' (e.g., 'notebook/file1.txt'), but also any folder or file that starts out with these characters (e.g., 'notebook2/file1.txt' or 'notebook_stuff.txt'). I will now add these notes and all the images I have used to this folder.

<center> <img src="{{ site.baseurl }}/img/rpackage13.png" alt="Img" style="width: 1000px;"/> </center>

With the notebook folder now added, I need to initialise a new GitHub repository (see <a href="https://stirlingcodingclub.github.io/version_control/vc_notes.html" target="_blank">version control notes</a> for help). After doing this for Stirling Coding Club's organisation, here is what it looks like on GitHub.

<center> <img src="{{ site.baseurl }}/img/rpackage14.png" alt="Img" style="width: 1000px;"/> </center>

The R package is now live. Anyone can download it by using the `install_github` function in the `devtools` package. To do so, type the below into the RStudio console.

```r
library(devtools) # Make sure that the devtools library is loaded
install_github("StirlingCodingClub/SCC_R_package");
```

Our R package is now installed. We can start using it by reading it in as a normal package.

```r
library(SCCTempConverter);
F_to_C(30);
```

```{r, echo = FALSE}
F_to_C <- function(F_temp){
    C_temp <- (F_temp - 32) * 5/9;
    return(C_temp);
}
F_to_C(30);
```

That is it! We can share the <a href="https://github.com/StirlingCodingClub/SCC_R_package" target="_blank">location of the R package</a> with colleagues who we think might make use of its R functions. If you want to you can stop here, but I will press on with a few more helpful tips and tricks in the next section.

<a name="morestuff"></a> 

## 7. Other useful things to know 

**Additional subdirectories**

The subdirectories (i.e., folders) that I have walked you through are not the only ones that are useful to include in an R package. Here, for example, is what the directory of the <a href="https://github.com/ConFooBio/gmse" target="_blank">GMSE R package</a> looks like.

<center> <img src="{{ site.baseurl }}/img/rpackage15.png" alt="Img" style="width: 1000px;"/> </center>

There is a lot of extra stuff here, but the following are what each folder contains:

- **data** contains any and all data files provided in the R package. These files are saved in the `.rda` format (e.g., using `save()` in R), and can be loaded using `data` when a package is read into R (e.g., `data(cars)` in base R).

- **docs** includes documents for the <a href="https://confoobio.github.io/gmse/" target="_blank">GMSE website</a>, which was produced in less than 20 minutes using the extremely helpful <a href="https://pkgdown.r-lib.org/" target="_blank">pkgdown</a> R package (I highly recommend this for building website for your R package).

- **src** contains compiled code that is used by your R functions. This could include code written in C or C++ to speed up computations. In some packages, most of the code is actually in this folder.

- **tests** includes files to test your code to ensure that it is running properly throughout the development process. This folder can be created using the <a href="https://cran.r-project.org/package=testthat" target="_blank">testthat</a> R package. For large projects, especially, this is extremely useful because it allows you to quickly test to make sure that all of the functions that you write return the output that you expect of them.

- **vignettes** includes larger documentation files for your code -- more like a package guide than a simple help file for package functions. <a href="https://confoobio.github.io/gmse/articles/SI1.html" target="_blank">Here is an example</a> from GMSE.

One more folder that could be useful but is not in the GMSE R package above is the following:

- **inst** allows you to <a href="http://r-pkgs.had.co.nz/inst.html" target="_blank">add arbitrary files to the R install</a>. This acts as a sort of reverse '.Rbuildignore', in that it tells R to incorporate something specific into the R build process.

**Building a source package**

We can build a source package (i.e., a zipped version of the R package) in Rstudio by selecting `Build > Build Source Package`. This will create a zipped package outside of the package directory, which would be what we would need to build if we wanted to submit our package to CRAN.

<center> <img src="{{ site.baseurl }}/img/rpackage16.png" alt="Img" style="width: 1000px;"/> </center>

**Tagging a version**

It is sometimes helpful to 'tag' a particular commit in git to identify a particular version or 'release' of your R package (e.g., <a href="https://github.com/ConFooBio/gmse/releases" target="_blank">in GMSE</a>). I did not go into detail about using git tags in the <a href="https://stirlingcodingclub.github.io/version_control/vc_notes.html" target="_blank">version control</a> session, but the general idea is that a tag is essentially a commit that has a meaningful name rather than a large number -- the tag is therefore a snapshot of a particular point in the history of the repository that is of particular interest. In the command line, a commit works as below.

```
git tag -a v0.0.1.0 -m "my first version of SCC_R_package"
git push -u origin v0.0.1.0
```

Note that the BASH code above would create the tag 'v0.0.1.0' with the quoted message in the first line. In the second line, it would push the tag to GitHub. We can do the same thing in <a href="https://www.gitkraken.com/" target="_blank">GitKraken</a> with a more friendly graphical user interface.

<center> <img src="{{ site.baseurl }}/img/rpackage17.png" alt="Img" style="width: 1000px;"/> </center>

To tag any commit, right click on the commit and select 'Create tag here'. This allows you to name the commit, and the name will show up on the left hand side in GitKraken.

<center> <img src="{{ site.baseurl }}/img/rpackage18.png" alt="Img" style="width: 1000px;"/> </center>

See the 'SCCTempConverter.v0.0.1.0' tag on the left. To push this tag to GitHub, right click on this tag and select 'Push SCCTempConverter.v0.0.1.0 to origin'. We can now see that there is one release in the GitHub repository.

<center> <img src="{{ site.baseurl }}/img/rpackage19.png" alt="Img" style="width: 1000px;"/> </center>

If we click on this, we would see the version we tagged.

<a name="whatelse"></a> 

## 8. Additional resources 

**From <a href="https://kbroman.org/" target="_blank">Karl Broman</a>**

- <a href="http://kbroman.org/pkg_primer/pages/minimal.html" target="_blank">The minimal R package</a>
- <a href="http://kbroman.org/pkg_primer/pages/build.html" target="_blank">Building and installing an R package</a>
- <a href="http://kbroman.org/pkg_primer/pages/docs.html" target="_blank">Writing documentation with Roxygen2</a>

**From RStudio**

- <a href="http://r-pkgs.had.co.nz/" target="_blank">R packages free online book</a>

<hr>
<hr>

<h3><a href="https://www.surveymonkey.co.uk/r/X7VHQ6S" target="_blank">&nbsp; We would love to hear your feedback, please fill out our survey!</a></h3>
<br>
<h3>&nbsp; You can contact us with any questions on <a href="mailto:ourcodingclub@gmail.com?Subject=Tutorial%20question" target = "_top">ourcodingclub@gmail.com</a></h3>
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


