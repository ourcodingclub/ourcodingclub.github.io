---
layout: tutorial
title: Write your dissertation in Rmarkdown
subtitle: Using Rmarkdown to create complex pdf documents
date: 2021-03-25 19:00:00
author: Anna
tags: reprod
---


### Tutorial Aims

1. Understanding the advantages of using `Rmarkdown` for writing pdf documents, focusing on writing your dissertation;
2. Learning how to create the template for the main page, and appending all the other sections to it;
3. Using LaTex for embellishing the pdf output and functioning as a supplement to Markdown;
4. Becoming familiar with `knitr` and `kableExtra` packages.

### Steps:

1. [Introduction](#intro)
2. [The "main" Rmarkdown document.](#main-rmarkdown-doc)
- [The front page](#front-page)
- [The abstract](#abstract)
3. [Table Of Contents (TOC)](#toc)
4. ["Child" documents](#child-docs)
- [Bibliography and citations](#bibliography)
- [The appendix](#appendix)
5. [Let's merge!](#merge)
6. [Final tips](#final-tips)

--------------------------------------------

<a name="section0"></a>

## 1. Introduction.
{: #intro}

This tutorial is a step-by-step guide on creating a complex pdf document, including text, figures, references, images, formatting, and more, all using Rmarkdown.

**If you are new to Rmarkdown, you might find our other Rmarkdown tutorial useful to do first.** Click on [Getting Started with R Markdown](https://ourcodingclub.github.io/tutorials/rmarkdown/) to open the tutorial.

{% capture callout %}
All the resources for this tutorial, including data, images, and some example Rmarkdown files, can be downloaded from [this repository](https://github.com/ourcodingclub/CC-diss-rmd). __Download by clicking on Code -> Download ZIP, then unzipping the archive in a folder you will use for this tutorial.__
{% endcapture %}
{% include callout.html content=callout colour=alert %}

To do the tutorial, you will need to have R (tutorial was tested on R 4.0.4), RStudio, and a LaTeX distribution. You can easily install **TinyTex** by running two lines in the R console.

**TinyTex** is a custom LaTex distribution based on TeX Live, relatively small in size.

There are several other distributions that you install on your local machine, including [MikTex](https://miktex.org/download), [MacTex](https://www.tug.org/mactex/mactex-download.html) and [TeX Live](https://www.tug.org/texlive/quickinstall.html), but [TinyTex](https://yihui.org/tinytex/) **works best for R users, as with it you don't have to install LaTex packages which you don't need, and missing packages will be automatically installed on RStudio. Also, TinyTex does not require *sysadmin* privileges.**

To install or uninstall TinyTex from your local machine, this code is necessary (which you can write in your RStudio console).

````
# get the tinytex package
install.packages('tinytex')
library(tinytex)

# to install tinytex
tinytex::install_tinytex()

# to uninstall tinytex
tinytex::uninstall_tinytex()
````

Once the distribution is installed, you can move on to the next section.

<a name="section1"></a>

## 2. The "main" Rmarkdown document.
{: #main-rmarkdown-doc}

When you write a document, whether it's an essay, or a scientific report, or your undergraduate dissertation, it is going to be structured in different sections.

In the scientific world, these sections consist of: an introduction, methods, results, discussion, and bibliography. If we consider a published paper or a thesis, these also contain an abstract, perhaps a section with abbreviations, and at the end present a section with supplementary information or an appendix.

As the aim of this tutorial is to successfully write your dissertation with Rmarkdown, it is useful to consider the number of sections necessary for your output and to *avoid writing everything in one single .Rmd document*.

In fact, for sake of easier read and better organisation, but also faster upload of the final pdf, we are going to create multiple .Rmd files, corresponding to the main sections of the dissertation. We are then going to merge them, within the "mother" document.

**First thing we are going to do is create the *main.Rmd* file (you can name the file like this if you wish).**

Here, we are going to set the first page of your dissertation and we are going to **link** all the other .Rmd documents containing the different sections.
In this file, we are also going to set the general formatting rules (written in `LaTex`), which are going to apply to the entire document.

All the files that you need to complete this tutorial can be downloaded from this GitHub repository [link](https://github.com/AnnaChirumbolo/dissertation_template_with_rmd.git). Clone and download the repo as a zip file, then unzip it.

**Open Rstudio and create a new .Rmd file, within the repo folder you've just downloaded**, by clicking on the blank sheet with the green plus one on the left-hand side of the interface.

<img width="1280" alt="open_md" src="https://user-images.githubusercontent.com/43357858/111072154-91928380-84d9-11eb-8dd7-6cee402bd889.png">

Once you have created a new Rmarkdown document, leave the title and author blank (you don't want these to appear at the top of your pdf) and select PDF as the Default Output Format. Click OK and let's start writing in the new file.

![opening_md](https://user-images.githubusercontent.com/43357858/111620941-a75cbd00-87e7-11eb-84cc-6f4e51be7a31.jpg)

You will see at the top a section called **YAML header**, delimited by three hyphens (---). The header embeds the information that you have just given (blank for the title, no author and pdf_document as your desired output), and allows you to set the "rules" that are going to be applied throughout the document (as well as the **linked** documents). The information you are going to insert here defines the **metadata** of your document: its content will affect the code, content and the rendering process of the document, but itself *will not show* in the output.** Check out the *Rmarkdown Cookbook* on [YAML metadata](https://bookdown.org/yihui/rmarkdown-cookbook/rmarkdown-anatomy.html#yaml-metadata), if you wish to find out more. This [link](https://cran.r-project.org/web/packages/ymlthis/vignettes/yaml-fieldguide.html) offers you an exhaustive **field guide of possible YAML arguments** - check it out to have a better understanding of the kinds of metadata you can input in your document.

Each university or publishing institution will have their **own formatting rules**, which you'll need to follow when structuring and writing your work.

For this tutorial, we are going to follow the **guidelines from the School of GeoSciences (University of Edinburgh)**. These are as of 2020 - if they have changed edit them accordingly, or, if you are writing for another institution, edit them according to its specific guidelines.

**NOTE.** If you are writing for an institution other than university, perhaps **you are publishing your dissertation** on a scientific journal, you need to look for their "Author's Information" page as you can download their own **templates**. Here is an example of the template provided by [Nature](https://www.nature.com/sdata/publish/submission-guidelines#sec-3).

We need to add more details and specifications to our **YAML header** to apply to the entire to document (and its 'child' documents).

````
---
title: " "
output:
  pdf_document:
    number_sections: TRUE
geometry: "left = 2.5cm, right = 2cm, top = 2cm, bottom = 2cm"
fontsize: 11pt
header-includes:
  - \usepackage{float}
  - \usepackage{sectsty}
  - \usepackage{paralist}
  - \usepackage{setspace}\spacing{1.5}
  - \usepackage{fancyhdr}
  - \usepackage{lastpage}
  - \usepackage{dcolumn}
  - \usepackage{natbib}\bibliographystyle{agsm}
  - \usepackage[nottoc, numbib]{tocbibind}
bibliography: bibliography.bib
---
````
- **number_sections: TRUE** will automatically create sections in your Table Of Contents (TOC), ordered according to the type of header you specify (main, sub-, subsub- etc.);
- **geometry**: sets margin sides for pdf output (according to School of Geosciences guidelines);
- **fontsize**: sets the entire font throughout the document to be 11 pt. You can change that in the file for specific sections of your choosing;
- **header-includes**: allows you to specify all the **LaTex** packages you are going to need in your file. In this way, you can keep all the specifics inside your main .Rmd document and they **will apply to the child documents, too**.

The packages include:
- [float](https://ctan.mirror.garr.it/mirrors/ctan/macros/latex/contrib/float/float.pdf): improves the interface for defining *floating objects*, like figures and tables;
- [sectsty](http://www.ctex.org/documents/packages/layout/sectsty.pdf): helps you change the style of any or all LaTex *sectional headers* in the article, book or report classes. Examples include the addition of rules above or below a section title;
- [paralist](https://ctan.mirror.garr.it/mirrors/ctan/macros/latex/contrib/paralist/paralist.pdf): provides enumerate and itemise environments that can be used within paragraphs to format the items as either *running text* or as *separate paragraphs with preceding number or symbol*;
- [setspace](https://www.ctan.org/pkg/setspace): provides support for *setting spacing between lines* in a document. Options include \singlespacing, \onehalfspacing and \doublespacing commands (which we'll see below). As you can see, I've already set the general rule to be 1.5 spacing (as per university guidelines);
- [fancyhdr](https://ctan.mirror.garr.it/mirrors/ctan/macros/latex/contrib/fancyhdr/fancyhdr.pdf): the package provides extensive facilities, both for *constructing headers and footers and for controlling their use*;
- [lastpage](https://ctan.mirror.garr.it/mirrors/ctan/macros/latex/contrib/lastpage/lastpage.pdf): *references the number of pages* in your LaTex document through the introduction of a new label;
- [dcolumn](https://ctan.mirror.garr.it/mirrors/ctan/macros/latex/required/tools/dcolumn.pdf): makes use of the "array" package to define a *"D" column* for use in tabular environments;
- [natbib](https://www.ctan.org/pkg/natbib): provides *flexible biography support*, including both author-year and numbered references, both in-text and long-format. From the package, I have also specified the **bibliographic style** to be `agsm`, which corresponds to **Harvard**. You can specify whatever style you desire, have a look at the styles available in the package [here](https://www.overleaf.com/learn/latex/Natbib_bibliography_styles);
- [tocbibind](https://www.ctan.org/pkg/tocbibind): *automatically adds the bibliography and/or index and/or the contents, etc., to the Table Of Contents (TOC) listing*. The options `nottoc` disables the inclusion of the toc (which otherwise would be a duplicate), and `numbib` makes the bibliograpgy numbered in the toc list, thus consistent with the other section titles.

The YAML also needs to specify the file containing all of your references, with the `.bib` extension. In our case, I have already created a file called `bibliography.bib`, containing a few references on the Atlantic Puffin (*Fratercula arctica*), subject of our sample dataset for this tutorial (which we are going to work within the [appendix section](#subsect3)). Check out the [bibliograpgies and citations section](https://bookdown.org/yihui/rmarkdown-cookbook/bibliography.html) from the *Rmarkdown Cookbook*, if you'd like to dive deeper into the topic.

Erase all the content from the RMarkdown document, **but** the first code chunk, and write the following after the first code chunk.  

````
\allsectionsfont{\centering}
\subsectionfont{\raggedright}
\subsubsectionfont{\raggedright}

\pagenumbering{gobble}
````

The `\allsectionsfont` command specifies changes to your header font - in this case, to have them centred. Instead, we have specified `\subsectionfont` and `\subsubsectionfont` (for sub-headers) to be ragged right.

`\pagenumbering{gobble}`, instead, **does not print any page number**, and this is ideal for the moment, as we are about to create the front page, which does not require one. Remember though, the `gobble` option in the `pagenumbering` command has the side effect to reset the page number to 1 - so it is unlikely to be helpful **other than at the beginning of your document!**

<a name="subsect1"></a>

### a) The front page
{: #front-page}

Let's create the **front page** of the dissertation. It's an important one, as it's going to make the first great impression of your work!

The front page requires all elements to be **centred**. We are going to start using some **LaTex syntax** to do so. Write the following at the end of what we've written so far (below the first code chunk and the settings on text alignment).

````
\begin{centering}

\end{centering}
````

This is written in LaTex. We are defining a space in the document, **within** which anything we will write will be centred on the page.

To be clearer, the content of the front page is all **inside the `begin` and `end` centring** commands. The `\begin{centering}` has to be at the **top** and `\end{centering}` needs to be at the **bottom** in the **the front page**.

**In between** the `\begin{centring}` and `\end{centring}` we are going to specify a 3 cm spacing from the top of the page, to then insert the first element: the university logo.

````
\vspace{3cm}
````

Undearneath the *vertical spacing (vspace)* function, add a new code chunk by selecting on the icon "insert" and clicking on "R".

![uni_logo_chunk](https://user-images.githubusercontent.com/43357858/111621001-bc395080-87e7-11eb-81f1-a0f6b97d65df.png)

Inside it, write

````
```{r uni_logo, echo=F, out.width="20%"}
knitr::include_graphics("img/uniedlogo.png")
```
````

This way, the image of the UoE logo is going to appear at the top of the page.

[**Knitr**](https://yihui.org/knitr/) is the most important package used in Rmarkdown, to help you create elegant, flexible and fast report generation. If you click on the **Knit** button on the top of the page, you are able to **repeatedly output your pdf** so that you can **constantly check to see how your formatting has changed** as you continue working on your Rmarkdown file!

As you can see, I have **named** the code chunk "uni_logo", making it easier to retrieve the chunk later on, when there are going to be many more.

*Echo = False* will only show the output of the code inside the code chunk, not the code itself.

*Out.width* is a feature for images and figures, in particular the percentage width that the image will occupy out of the total white space in the pdf document.

You can retrieve the image of the university logo with the function *include_graphics()*.

1 cm distant from the logo, we need to add the name of the university and that of your department, As an example:

````
\vspace{1cm}

\Large
{\bf The University Of Edinburgh}

\Large
{\bf School Of Geosciences}
````

You recall the *\vspace* function from above. `\Large` sets all text below it to be of larger font, and `\bf` which sets the text within curly brackets to **bold**.

`\Large` is a font changing command, and the pt size it reflects is often determined by the document class itself. Here is an overview of the values for the standard classes.

````
Command             10pt    11pt    12pt
\tiny               5       6       6
\scriptsize         7       8       8
\footnotesize       8       9       10
\small              9       10      10.95
\normalsize         10      10.95   12
\large              12      12      14.4
\Large              14.4    14.4    17.28
\LARGE              17.28   17.28   20.74
\huge               20.74   20.74   24.88
\Huge               24.88   24.88   24.88
````

It's time to add the *title* of your dissertation! I have written mine below just as an example.

````
\vspace{1cm}

\Large

\doublespacing
{\bf COMPARISON OF TOP-DOWN AND BOTTOM-UP APPROACHES ON SPECIFIC LEAF AREA PATTERNS, \\AT GLOBAL, LATITUDINAL, AND BIOME SCALES}
````

As you might have figured, adding \doublespacing will double the space between lines of text. By wrapping a specific part of your text within curly brackets and adding the function \bf at the start, you will specify that **only** that part of the text will need to be in bold.

This link explains in more detail the different ways to do [simple text formatting](https://www.overleaf.com/learn/latex/Bold,_italics_and_underlining).

The university guidelines specify to have the title **all capitalised**. And finally, the `\\` sign will break the text onto a new line (just like \n for a string in R code!).

To finish up the front page we need to add the author, degree and date!

````
\vspace{1 cm}

\normalsize
\singlespacing
By

\vspace{0.5 cm}

\Large

{\bf ANNA CHIRUMBOLO}

\vspace{1.5 cm}

in partial fulfilment of the requirement \\for the degree of BSc with Honours \\in Ecological and Environmental Sciences

\vspace{1.5 cm}

\normalsize
mm yy
````

Again, as a matter of formatting guidance, I added some specified spacing in between the lines of text that follow the thesis title.

**Remember** that rmarkdown will remember any input you last gave it, and to change it again need to specify the new function for the lines of text that follow!

In fact, by changing the font back to `\normalsize` you input the .Rmd file to go back to a 'normal' font (12 pt), since the last input you gave it was to be `\Large`.

Now that we have created the front page, you can knit the document by clicking on the **Knit** button at the top of the RStudio interface, to check out the output!

If you're interested, check out the chapter [*what happens when we render*](https://bookdown.org/yihui/rmarkdown-cookbook/rmarkdown-process.html) from *Rmarkdown Cookbook*, to find out about the workflow from `.Rmd` to `.pdf` (or another output format).

![knit_button](https://user-images.githubusercontent.com/43357858/112044413-17ea3d80-8b4a-11eb-8c02-43a4640ee5e7.jpg)

**Don't worry if it takes time at first for the document to knit - it is normal at first and particularly if the document is heavy!**

Also, **knitting can be quite buggy** at first. That is also normal as you need to get used to some common practices to write in markdown that would avoid unnecessary problems.

A few ways **to avoid debugging**:
- develop chunks and execute them until they work, before moving on to creating new ones;
- knit the document regularly to check for errors;

If there is an error, check out this webpage describing [common problems with rmarkdown (and some solutions)](https://rmd4sci.njtierney.com/common-problems-with-rmarkdown-and-some-solutions.html).

Once you've successfully knitted your document, the front page should look like this.

![front_output](https://user-images.githubusercontent.com/43357858/111608138-2eeeff80-87d9-11eb-871a-79ccfb170957.jpg)

In case the front page isn't exactly as the image above, I have reported the **summary of the code that should be written so far in your .Rmd (YAML included)**.

````
---
title: " "
output:
  pdf_document:
    number_sections: TRUE
geometry: "left = 2.5cm, right = 2cm, top = 2cm, bottom = 2cm"
fontsize: 11pt
header-includes:
  - \usepackage{float}
  - \usepackage{sectsty}
  - \usepackage{paralist}
  - \usepackage{setspace}\spacing{1.5}
  - \usepackage{fancyhdr}
  - \usepackage{lastpage}
  - \usepackage{dcolumn}
  - \usepackage{natbib}\bibliographystyle{agsm}
  - \usepackage[nottoc, numbib]{tocbibind}
bibliography: bibliography.bib
---

```{r setup, include=FALSE}
knitr::opts_chunk$set(echo = TRUE)
options(tinytex.verbose = TRUE)
```

\allsectionsfont{\centering}
\subsectionfont{\raggedright}
\subsubsectionfont{\raggedright}

\pagenumbering{gobble}

\begin{centering}

\vspace{3cm}

```{r uni_logo, echo=F, out.width="20%"}
knitr::include_graphics("img/uniedlogo.png")
```

\vspace{1cm}

\Large
{\bf The University Of Edinburgh}

\Large
{\bf School Of Geosciences}

\vspace{1cm}

\Large

\doublespacing
{\bf COMPARISON OF TOP-DOWN AND BOTTOM-UP APPROACHES ON SPECIFIC LEAF AREA PATTERNS, \\AT GLOBAL, LATITUDINAL, AND BIOME SCALES}

\vspace{1 cm}

\normalsize
\singlespacing
By

\vspace{0.5 cm}

\Large

{\bf ANNA CHIRUMBOLO}

\vspace{1.5 cm}

in partial fulfilment of the requirement \\
for the degree of BSc with Honours \\
in Ecological and Environmental Sciences

\vspace{1.5 cm}

\normalsize
mm yy

\end{centering}
````

<a name="subsect2"></a>

### b) Abstract
{: #abstract}

We can add the Abstract on a [new page](https://bookdown.org/yihui/rmarkdown-cookbook/pagebreaks.html), by specifying this LaTex command. **Remember to start writing outside of the centering command from now on.**

````
\newpage

\pagenumbering{gobble}
````

Anything you'll write or insert after this command will appear on a new page. This way you have control over the distribution of your content.

You remember the pagenumbering command from before. It does not let any page number to be displayed in the pdf output.

In the new page, write the following:

````
\begin{centering}

{\bf Abstract}

\end{centering}

\spacing{1.5}

(the spacing is set to 1.5)

no more than 250 words for the abstract

- a description of the research question/knowledge gap – what we know and what we don’t know
- how your research has attempted to fill this gap
- a brief description of the methods
- brief results
- key conclusions that put the research into a larger context
````

The title "Abstract" is centered and bold, while the spacing between lines of text is set to 1.5.

<img width="1280" alt="abstract" src="https://user-images.githubusercontent.com/43357858/111073019-5eea8a00-84dd-11eb-86b0-0a0a5313c76c.png">

I have included main guidelines for writing an abstract, which should come useful to you when writing it.

<img width="1083" alt="abstract_output" src="https://user-images.githubusercontent.com/43357858/111073008-54c88b80-84dd-11eb-8f86-614a8f07a82d.png">


<a name="toc"></a>

## 3. Table Of Contents (TOC).
{: #toc}

One very important section is the TOC. It is typically located after the abstract (and abbreviations section, which is **optional, but very useful**).

Below, I have specified the syntax for including the toc, which is very straightforward. Paste it below the abstract.

````
\pagenumbering{roman}

\newpage

\centering
\raggedright
\newpage
\tableofcontents
````

I have included the `roman` option in the `pagenumbering` command, telling the document that from now on, it can start numbering the pages, roman way.

The remaining syntax prepares a new page for writing the toc - it is created automatically, and will identify headers and subheaders according to how you have written them (see [markdown syntax](https://github.com/tchapi/markdown-cheatsheet) for headers and subheaders).

You should get a new page with **Contents** as title and the rest is blank - for now. This page is going to get populated from now on, as you'll be adding headers and subheaders.

![toc_empty](https://user-images.githubusercontent.com/43357858/111608677-c81e1600-87d9-11eb-987b-82d48f1e9b58.jpg)

<a name="section2"></a>

## 4. "Child" documents.
{: #child-docs}

Looking good!

The front page of the dissertation is ready, and so are your abstract and toc.

Now we need to add the different sections of your dissertation, which we'll create on separate .Rmd files as I mentioned at the beginning of this tutorial. These .rmd files will behave as **'children'** to the main file, which we have worked on so far.

In the main document, paste the following after the toc section you created just above.

````
\newpage

```{r acknowledgments, child='acknowledgments.Rmd'}
```

\newpage

```{r intro, child = 'introduction.Rmd'}
```
\pagenumbering{arabic}

\newpage

```{r methods, child = 'methods.Rmd'}
```

\newpage

```{r results, child = 'results.Rmd'}
```

\newpage

```{r discussion, child = 'discussion.Rmd'}
```

\newpage

```{r conclusion, child = 'conclusion.Rmd'}
```

\newpage

```{r biblio, child = 'bibliography.Rmd'}
```

\newpage

```{r appendix, child = 'appendix.Rmd'}
```
````

As you can see, we've just added a code chunk for each section of your dissertation. The "child" feature specified in the code chunk options, links the **content** of this other .Rmd file to the main one. This means that once you'll knit the main document, the **content from each of the child documents will be pasted and merged into one, final pdf**.

Also, **note** that from the introduction onwards I've changed the pagenumbering to Arabic. You are going to see that in your pdf, the main sections are going to be numbered in Arabic, compared to the introductory pages (abstract, toc, acknowledgements), which are numbered in roman.

However, remember to make sure you've created **all** .Rmd files that you have **specified** in your main file and **check the spelling**! As you can imagine, non-existing or misspelt files which you will try to link to the main document will result in an error, whenever you will try to knit to pdf.

To speed things up a little, I have created the files already and you can see them in the [repository](https://github.com/AnnaChirumbolo/dissertation_template_with_rmd). Knitting the document now, you should see how the content from each has been pasted into one main document.

![md_childdocs](https://user-images.githubusercontent.com/43357858/111608181-3910fe00-87d9-11eb-979a-cfe64a587373.jpg)

You should now have a 10-page document, with each section of the dissertation appearing on a new page. The structure is coming along nicely! Well done!

<a name="bib"></a>

### Bibliography and citations
{: #bibliography}

For any scientific report and article, citing your sources and creating a list of references at the end of your document is **fundamental** if not mandatory.

We are going to do the same for our template.

When creating and managing a bibliography in LaTex, we use the package `natbib` for customising citations, when using `BibiTex`. [BibiTex](http://www.bibtex.org/) is a tool and file format used to describe and process lists of references, mostly **in conjunction with LaTex documents.**

There are a series of **reference managers** freely available to download, which ease and speed up the amount of time you are going to spend referencing and citing in your work.

The most popular and best ones (to my advice) are **Mendeley and Zotero**. One of the nice features about them is that after saving your list of references in a folder, you can export them into `BibiTex format` (**.bib**). This way, **you can directly link the content from the new `.bib` file to any document that supports LaTex syntax.**


````
---
title: " "
output:
  pdf_document:
    number_sections: TRUE
geometry: "left = 2.5cm, right = 2cm, top = 2cm, bottom = 2cm"
fontsize: 11pt
header-includes:
  - \usepackage{float}
  - \usepackage{sectsty}
  - \usepackage{paralist}
  - \usepackage{setspace}\spacing{1.5}
  - \usepackage{fancyhdr}
  - \usepackage{lastpage}
  - \usepackage{dcolumn}

  - \usepackage{natbib}\bibliographystyle{agsm}
  - \usepackage[nottoc, numbib]{tocbibind}
bibliography: bibliography.bib
---
````

Recall the packages dedicated to adding a bibliography in the YAML header (`natbib` and `tocbibind`), and the specification of the .bib file containing your bibliography.

If you open **bibliography.bib**, each citation is structured as such:

````
@article{breton_encounter_2006,
	title = {Encounter, Survival, and Movement Probabilities from an Atlantic Puffin (fratercula Arctica) Metapopulation},
	volume = {76},
	rights = {© 2006 by the Ecological Society of America},
	issn = {1557-7015},
	url = {https://esajournals.onlinelibrary.wiley.com/doi/abs/10.1890/05-0704},
	doi = {https://doi.org/10.1890/05-0704},
	abstract = {Several weaknesses in our understanding of long-lived animal populations have persisted, mainly due to a prevalence of studies of a single local population at the expense of multisite studies. We performed a multisite capture–mark–resight analysis using 2050 Atlantic Puffins (Fratercula arctica) banded as chicks on four islands (colonies) over 24 years in the Gulf of Maine, {USA} and Canada. Within program {MARK}, encounter, apparent survival, pre-breeding movement ({PBM}; annual movements between colonies prior to breeding), and natal dispersal ({ND}) probabilities were modeled as functions of age, colony, and several covariates. Information-theoretic model selection criteria and estimated model effect sizes were used to identify important effects and select models to estimate parameters. Encounter probabilities were extremely variable (0.10–0.95) and declined annually starting six years after bands were applied, due to changes in resighting effort, and band wear, respectively. Colony-dependent survival probabilities increased to a peak at age six years; arithmetic means from all colonies were: 0.70 for age 0–3, 0.78 for age 4, 0.81 for age 5, and 0.84 for age 6–8 years. Low adult survival (age ≥5 years) may reflect inclusion of breeding and nonbreeding adults in our sample or a bias due to band loss and illegibility. Consistent with a density-dependent prediction, the effect of colony size on survival was negative and acquired strong {AICc} support. However, this effect was inconsistent with strata effects in competing top models; the latter suggest that survival was lowest on the smallest island. The effects of origin and destination colony and origin colony size in {PBM} and {ND} probabilities resulted in important variation in these parameters. As few as 8\% and as many as 57\% of the puffins that we marked may have bred away from their natal colony, a signal of highly variable philopatry. Consistent with the conspecific attraction hypothesis, {ND} and {PBM} probabilities declined as the size of the origin colony increased. {PBM} probabilities were highest in the age 0–3 period, and these declined quickly with age thereafter. Strong colony and age effects in {ND} and {PMB} probabilities identify movement as a critical contributor to local population dynamics at our four study sites.},
	pages = {133--149},
	number = {1},
	journaltitle = {Ecological Monographs},
	author = {Breton, André R. and Diamond, Antony W. and Kress, Stephen W.},
	urldate = {2021-03-18},
	date = {2006},
	langid = {english},
	note = {\_eprint: https://esajournals.onlinelibrary.wiley.com/doi/pdf/10.1890/05-0704},
	keywords = {Atlantic Puffin, dispersal, Fratercula arctica, Gulf of Maine islands, K-selected, local population, movement, multistrata, natal, seabird, subadult, survival},
	file = {Full Text PDF:C\:\\Users\\annac\\Zotero\\storage\\5N3JWCP5\\Breton et al. - 2006 - Encounter, Survival, and Movement Probabilities fr.pdf:application/pdf},
}
````

You can see the citation starts with an `@`, followed by curly brackets, which contain the **citation key**, and other information relevant to the article (such as title, abstract, author, date etc.).

**The citation key is fundamental for in-line referencing**. Keep that in mind!

Try to write a few in-line citations in any section of the dissertation that you'd like. For example, open the introduction.Rmd file and paste the following.

````
\citep{breton_encounter_2006}

\citep*{breton_encounter_2006}

\citet{breton_encounter_2006}

\citet*{breton_encounter_2006}

\citep{martin_diet_1989, breton_encounter_2006}

\citeauthor{breton_encounter_2006}

\citeauthor*{breton_encounter_2006}

\citeyear{breton_encounter_2006}

\citeyearpar{breton_encounter_2006}
````

The **citation key** is always referred to within curly brackets, and you can specify multiple citations within the same brackets. **The command changes the type of in-line citation.** Observe the result to see what each command returns specifically.

![intext_citation](https://user-images.githubusercontent.com/43357858/111702795-19abbc80-883d-11eb-8701-51fdbc65a60d.jpg)

In case you have more doubts and want to find out more about commands for citing and other commands and options from the `natbib` package, check out this [reference sheet](https://gking.harvard.edu/files/natnotes2.pdf).

Last, we need to write our list of long references. Our `bibliography.Rmd` does not have a title when you first open it. Don't worry about it, as the `\bibliography` command takes care of adding a title itself.

Open the `bibliography.Rmd` file and paste this simple command.

```
\bibliography{bibliography}
```

**Note** that the name of the file containing our list of references has to be included without the .bib extension in the `\bibliography` command. This command takes the whole content from the list and turns it into the Harvard long-format style of referencing. In alphabetical order, of course.

This is your output in the bibliography section.

![biblio_long](https://user-images.githubusercontent.com/43357858/111703918-a4d98200-883e-11eb-9aa3-e8ac9372c5dc.jpg)

And check out the table of contents, with the bibliography being included and numbered (thanks to `numbib` option in the `tocbibbind` package).

![addedbiblio_toc](https://user-images.githubusercontent.com/43357858/111704217-10bbea80-883f-11eb-9c79-bd65f958de52.jpg)

Finally, here are useful links from the *Rmarkdown Cookbook* on [generating R package citations](https://bookdown.org/yihui/rmarkdown-cookbook/write-bib.html) and [cross-referencing within documents](https://bookdown.org/yihui/rmarkdown-cookbook/cross-ref.html), which are not covered in this tutorial.

<a name="subsect3"></a>

### The appendix.
{: #appendix}

As an example of a child document, we are going to structure a section that we do not often work with, because it is optional, albeit very useful - the appendix. You might decide to include it or not in your final dissertation, but what you're going to learn from now on applies to any section of your document.

However, some general rules apply to the appendix section. Appendices:
1. Appear the end of the document, often after references;
2. You should create one appendix for each topic, e.g. additional tables, additional figures, code, etc. Each should start on a new page;
3. If there are multiple appendices in your document, there should be labelled with letters, and usually accompanied by a title that clarifies their content;
4. Appendices are also included in the table of contents at the beginning of the main document.

We are going to follow these formatting rules and we are going to explore three types of appendices: additional tables, additional figures and code (used for programming during your research).

Opening the appendix.Rmd document, you will see it already contains some text I had added.

````
# Appendix(ces)

## Appendix A: additional tables

Insert content for additional tables here.

\newpage

## Appendix B: additional figures

Insert content for additional figures here.

\newpage

## Appendix C: code

Insert code (if any) used during your dissertation work here.
````

We will start with **Appendix A: additional tables**.

We are going to add a new chunk with the following code, to start coding live within the .Rmd.

We are opening a .csv file containing information on the Atlantic puffins (*Fratercula arctica*) species trend and temperature information from 1979 until 2008, in Norway.  

````
```{r open data and libraries, include = F}
library(knitr)  # for dynamic report generation
library(kableExtra) # to build complex HTML or 'LaTex' tables
library(tidyverse) # for data manipulation

puffins_t <- read.csv("./data/puffins_temp.csv")
                      # to open the file puffins_temp.csv

puffins_t <- puffins_t %>%
  rename("Year" = year, "Country list" = Country.list,
         "Population trend" = pop_trend, "ID" = id,
         "Mean max. T (°C)" = mean_tmax, "Mean min. T (°C)" = mean_tmin)  
            # A bit of data transformation! "New name" = Old.name
```
````

*Note: `include=F` in the `{}` makes sure that neither code chunk nor output is shown in the pdf output.*

If you have never used the `tidyverse` package before don't worry - it is not part of the learning objectives for this tutorial. If you want to learn about the Tidyverse, do this <a href="https://ourcodingclub.github.io/2017/03/20/seecc.html" target="____blank">Coding Club tutorial</a>.

Now, the data set is almost presentable and ready to be inserted into a table. There are still other details, like the number of decimals to be fixed, that `knitr::kable()` function helps to fix.

`kableExtra` is a package that uses `kable()` and *pipes* from the `Tidyverse` package, to build complex and professional tables. We are going to use one example for the sake of this tutorial, but if you wish to explore further on the large variety of features that kableExtra can offer, have a look at its <a href="https://cran.r-project.org/web/packages/kableExtra/kableExtra.pdf" target="____blank">manual</a>. Moreover, kableExtra is often combined with `viridisLite` package, for using smoother <a href="https://cran.r-project.org/web/packages/viridis/vignettes/intro-to-viridis.html" target="____blank">colour scales</a>.

Copy the following code chunk and run it (make sure it is spaced from the one above).

~~~~
```{r table1, echo=F}
puffins_t %>%
  slice(1:10) %>%   # the table is going to show only the first 10 lines (a sample of the data set)
  kable(digits = 2) %>% # each value has 2 decimal digits
  kable_styling(full_width = F, # the width of the table is not fit to the width of the page
                position = "center", font_size = 10,
                latex_options = "hold_position")  # table settings with the kableExtra package
```
~~~~

You can notice that the table has now appeared after the chunk and in the 'Viewer' tab on the bottom-right panel.

![appendixA_table](https://user-images.githubusercontent.com/43357858/111608223-43cb9300-87d9-11eb-8251-33ad959862b9.jpg)

**REMEMBER: the output of the table in Rstudio Viewer is in HTML format. This means that on pdf will have a slightly different look, particularly when it comes to colours chosen. Make sure you specify these colours and check the output (kableExtra was initially made for HTML, not pdf outputs).**

Moving on to **Appendix B: additional figures**. We are going to use the same data on the Atlantic Puffins.

As we did for the table, we could output our figure by coding directly inside the code chunk, and specifying **include = F** in the code chunk options, to only display the figure and not the code that generated it, in the pdf.

Otherwise, the **knitr** package provides us with options to add pre-saved figures. We've already used this function when adding the university logo to our main page.

As an example, we are displaying the mean temperature change between 1979 and 2008 in Norway.

~~~~
```{r path-to-folder plots fixed size, echo = FALSE, out.height="40%", fig.show='hold', fig.align="center",  fig.cap="Additional images in Appendix B"}

include_graphics("img/meant_plot.png")
```
~~~~
- <sub>`fig.align` defines the alignment of figures in the output;</sub>
- <sub>`fig.cap` adds the figure caption at the bottom;</sub>
- <sub>The `list.files()` function lists the files present in a specified path. Here I chose the 'appendix_fig' folder, where all the figures to insert in the appendix had been saved;</sub>
- <sub>`The 'include_graphics()` function is part of the 'knitr' package, and it allows to embed external images in document format supported by 'knitr'.</sub>

![appendixB_fig](https://user-images.githubusercontent.com/43357858/111608377-6e1d5080-87d9-11eb-803f-a2ba882dd546.jpg)

Finally, **Appendix C: code**. Let's imagine we want to use our last appendix to include all the code we used to carry out our data cleaning, the statistical analyses, the features used for creating our figures and tables, and perhaps the custom functions we created to automate our work.

Remember that making the code available in the appendix **favours the transparency and replicability of your work**.

Doing this requires a very simple, single line of code.

As you can see, we are leaving the code chunk empty, and writing exclusively within the curly brackets, to set the options for display.

~~~~
```{r ref.label=knitr::all_labels(), echo=TRUE, eval=FALSE}
```
~~~~

The function `all_labels()` from **knitr** returns a vector of **all chunk labels** in the document you're working on (in this case, the appendix itself). The function thus retrieves all the source code chunks to this particular code chunk. `Echo = True` will show the source code inside this code chunk, which is equivalent to the source code from the **entire document**. `Eval = False` will not evaluate the code chunk as all the code has been executed before.

A list of code lines should appear within the code chunk and it corresponds to the code we have just written in the appendix.Rmd!

By **code chunk label** we mean the custom names that you can give the code chunk, to be differentiated from the others so you can more easily recognise it and its source code. Not only that, considering that all_labels() takes **all** labels and so all code chunks, it might be useful to exclude some which are not going to be necessary, like the setup label present at the top of your main.Rmd.

To avoid it, it will be necessary to add this new code chunk to above the all_labels() one.

~~~~
```{r get-labels, echo = FALSE}
labs = knitr::all_labels() # this is the new code chunk to add
labs = setdiff(labs, c("setup", "get-labels")) # this function excludes the code chunk with the label "setup" from being displayed.
```

```{r all-code, ref.label=labs, eval=FALSE}
# this code chunk displays all source code from your entire dissertation document (that you have written in .Rmd, not from your R script).
```
~~~~

Here you can see how it's written in Rstudio...

![appendixC_code](https://user-images.githubusercontent.com/43357858/111608465-89885b80-87d9-11eb-8830-14219682a2fb.jpg)

...and this is what it looks like when you knit the pdf!

![appendixC_code_output](https://user-images.githubusercontent.com/43357858/111608601-b2105580-87d9-11eb-94ac-a35b472346a0.jpg)

<a name="section4"></a>

## 5. Let's Merge!
{: #merge}

Make sure **that all the text we've written so far is spelt correctly**, and be ready to **knit the main document**!

Now you can fill the sections in with your own content and your personal touch.

In the meantime, [this](https://github.com/ourcodingclub/CC-diss-rmd/raw/main/output/output.pdf) is what your output should look like at the end of this tutorial.

<a name="section5"></a>

## 6. Final tips.
{: #final-tips}

Here are some final tips which I found to be **essential** when I wrote my dissertation on Rmarkdown.
1. I have not talked about it in detail in this tutorial, but the **Abbreviations** section (it comes **after the TOC and acknowledgements**) can be very useful in your dissertation if you need to talk about many variables and features and need a way to speed things up (and save word count);
2. I also have not talked about this topic in this tutorial, but **writing mathematical formulas or equations** can be an important part of your work, especially when you are writing a dissertation that has a scientific purpose! If you need to write **mathematical formulas or equations**, I suggest you check out this [link](https://bookdown.org/yihui/bookdown/markdown-syntax.html#math-expressions) on *math expressions* and [this one](https://bookdown.org/yihui/bookdown/markdown-extensions-by-bookdown.html#equations) on *markdown extensions to support math equations*. Here is a [list of LaTex mathematical symbols](https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols) for you to explore, and here is a link to [convert models to general equations](https://bookdown.org/yihui/rmarkdown-cookbook/equatiomatic.html);
3. Make sure you have [TinyTex](https://bookdown.org/yihui/rmarkdown-cookbook/install-latex.html) installed to be able to **create pdf documents from rmarkdown**. Without it, it just won't work. Remember that TinyTex is sufficient and is the best distribution for us R users;
4. **NEVER** write your content directly onto Rmarkdown! As much as it might seem faster, Rmarkdown does not provide a spell checker by default, and you might take longer than expected in ultimating and finalising your drafts. **Plan the structure, the code that you want to include, the layout of each section to be written on Rmd**, but **always** have the text saved and written on a word document first. It is much easier and quicker to paste in your content, once you're 100% sure it is ready for submission;
5. **Before** knitting the main document, have a look at it, once, twice, three, four times... and more! This document will present many sections, and the smallest spelling mistake might crash your whole work. Since it's going to be a large document, knit it a few times, only when necessary, and definitely when you're sure to be printing your final pdf;
6. **Don't submit last minute!!!** This rule would apply to any submission scenario. However, take your time to check for errors and debugging, if need be. You don't want to find yourself at the end with errors that won't allow you to knit your pdf and submit your work on time.


You can check out my dissertation written in Rmarkdown by [clicking here](https://github.com/AnnaChirumbolo/Dissertation/blob/master/AnnaChirumbolo_dissertation.pdf).


Thank you for following this tutorial, I hope it has helped you with creating a nice and professional template for writing your work. **Good luck** with your submission and **congratulations** for completing your studies!


## Resources

* [Install TinyTex](https://bookdown.org/yihui/rmarkdown-cookbook/install-latex.html)
* [The Rmarkdown Cookbook](https://bookdown.org/yihui/rmarkdown-cookbook/)
* [Rmarkdown cheetsheet](https://rstudio.com/wp-content/uploads/2015/02/rmarkdown-cheatsheet.pdf)
* [Pdf document (Rmarkdown)](https://bookdown.org/yihui/rmarkdown/pdf-document.html)
* [The YAML Fieldguide](https://cran.r-project.org/web/packages/ymlthis/vignettes/yaml-fieldguide.html)
* [LaTex syntax](https://www.overleaf.com/learn/latex/Commands)
* [Html syntax](https://www.w3schools.com/html/html5_syntax.asp)
* [Knitr package](https://yihui.org/knitr/)
* [kableExtra package](https://cran.r-project.org/web/packages/kableExtra/vignettes/awesome_table_in_html.html)
* [ViridisLite package](https://cran.r-project.org/web/packages/viridisLite/viridisLite.pdf)
