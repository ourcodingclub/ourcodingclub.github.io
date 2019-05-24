---
layout: post
title: Efficient data synthesis and visualisation
subtitle: A Coding Club workshop for the Oxford Zoology & Plant Sciences departments
date: 2016-01-01 10:00:00
author: Gergana
meta: "Tutorials"
tags: data_manip data_vis intermediate
---

<center> <img src="{{ site.baseurl }}/img/tutheader_synthesis.png" alt="Img"> </center>

<p></p>
### Tutorial Aims:

#### <a href="#tidyverse"> 1. Format and manipulate large datasets </a>
#### <a href="#purrr"> 2. Automate repetitive tasks using pipes and functions </a>
#### <a href="#synthesis"> 3. Synthesise information from different databases </a>
#### <a href="#panels"> 4. Create beautiful and informative figure panels </a>

<p></p>

<div class="bs-callout-blue" markdown="1">

__The goal of this tutorial is to advance skills in working efficiently with data from different sources, in particular in synthesising information, formatting datasets for analyses and visualising the results. It's an exciting world full of data out there, but putting it all together can eat up lots of time. There are many tasks that can be automated and done in a more efficient way - `tdyverse` to the rescue! As with most things in `R`, there are different ways to achieve the same tasks. Here, we will focus on ways using packages from the `tidyverse` collection and a few extras, which together can streamline data synthesis and visualisation!__

</div>

#### This tutorial was developed for the Coding Club workshop at the University of Oxford with the support of the <a href="https://sites.google.com/site/robresearchsite/" target="_blank">SalGo Population Ecology Team</a>.

### All the files you need to complete this tutorial can be downloaded from <a href="https://github.com/ourcodingclub/CC-oxford" target="_blank">this repository</a>. __Click on `Clone/Download/Download ZIP` and unzip the folder, or clone the repository to your own GitHub account.__

<a name="tidyverse"></a>

## 1. Format and manipulate large datasets

<b>Across the tutorial, we will focus on how to efficiently format, manipulate and visualise large datasets. We will use the `tidyr` and `dplyr` packages to clean up data frames and calculate new variables. We will use the `broom` and `purr` packages to make the modelling of thousands of population trends more efficient. We will use the `ggplot2` package to make graphs, maps of occurrence records, and to visualise ppulation trends and then we will arrange all of our graphs together using the `gridExtra` package.</b>

We will be working with bird population data (abundance over time) from the <a href="http://www.livingplanetindex.org/home/index" target="_blank">Living Planet Database</a>, bird trait data from the <a href="https://esajournals.onlinelibrary.wiley.com/doi/abs/10.1890/13-1917.1" target="_blank">Elton Database</a>, and emu occurrence data from the <a href="http://www.gbif.org/" target="_blank">Global Biodiversity Information Facility</a>, all of which are publicly available datasets.

__First, we will format the bird population data, calculate a few summary variables and explore which countries have the most population time-series and what is theit average duration.__

__Make sure you have set the working directory to where you saved your files.__

Here are the packages we need. Note that not all `tidyverse` packages load automatically with `library(tidyverse)` -  only the core ones do, so you need to load `broom` separately. If you don't have some of the packages installed, you can install them using `ìnstall.packages("package-name")`. One of the packages is only available on `GitHub`, so you can use `install_github()` to install it. In general, if you ever have troubles installing packages from CRAN (that's where packages come from by default when using `install.packages()`), you can try googling the package name and "github" and installing it from its `GitHub` repo, sometimes that works! 


```r
# Libraries
library(tidyverse)
library(broom)
library(wesanderson)
library(ggthemes)
library(ggalt)
library(ggrepel)
library(rgbif)
library(CoordinateCleaner)
# devtools::install_github("wilkox/treemapify")
library(treemapify)
library(gridExtra)
```

If you've ever tried to perfect your `ggplot2` graphs, you might have noticed that the lines starting with `theme()` quickly pile up: you adjust the font size of the axes and the labels, the position of the title, the background colour of the plot, you remove the grid lines in the background, etc. And then you have to do the same for the next plot, which really increases the amount of code you use. Here is a simple solution: create a customised theme that combines all the `theme()` elements you want and apply it to your graphs to make things easier and increase consistency. You can include as many elements in your theme as you want, as long as they don't contradict one another and then when you apply your theme to a graph, only the relevant elements will be considered - e.g. for our graphs we won't need to use `legend.position`, but it's fine to keep it in the theme in case any future graphs we apply it to do have the need for legends.

```r
# Setting a custom ggplot2 function ---
# *** Functional Programming ***
# This function makes a pretty ggplot theme
# This function takes no arguments!
theme_clean <- function(){
  theme_bw() +
    theme(axis.text.x = element_text(size = 14),
          axis.text.y = element_text(size = 14),
          axis.title.x = element_text(size = 14, face = "plain"),             
          axis.title.y = element_text(size = 14, face = "plain"),             
          panel.grid.major.x = element_blank(),                                          
          panel.grid.minor.x = element_blank(),
          panel.grid.minor.y = element_blank(),
          panel.grid.major.y = element_blank(),  
          plot.margin = unit(c(0.5, 0.5, 0.5, 0.5), units = , "cm"),
          plot.title = element_text(size = 15, vjust = 1, hjust = 0.5),
          legend.text = element_text(size = 12, face = "italic"),          
          legend.title = element_blank(),                              
          legend.position = c(0.5, 0.8))
}
```

#### Load population trend data

Now we're ready to load in the data!

```r
bird_pops <- read.csv("bird_pops.csv")
bird_traits <- read.csv("elton_birds.csv")
```

We can check out what the data look like now, either by clicking on the objects name on the right in the list in your working environment, or by running `View(bird_pops)` in the console.

<center> <img src="{{ site.baseurl }}/img/ox_wide.png" alt="Img" style="width: 600px;"/> </center>

__The data are in a wide format (each row contains a population that has been monitored over time and towards the right of the data frame there are lots of columns with population estimates for each year) and the column names are capitalised. Whenever working with data from different sources, chances are each dataset will follow a different column naming system, which can get confusing later on, so in general it is best to pick whatever naming system works for you and apply that to all datasets before you start working with them.__

```r
# Data formatting ----
# Rename variable names for consistency
names(bird_pops)
names(bird_pops) <- tolower(names(bird_pops))
names(bird_pops)
```

To make these data "tidy" (one column per variable and not the current wide format), we can use `gather()` to transform the data so there is a new column containing all the years for each population and an adjacent column containing all the population estimates for those years.

This takes our original dataset `bird_pops` and creates a new column called `year`, fills it with column names from columns `26:70` and then uses the data from these columns to make another column called `pop`.

```r
bird_pops_long <- gather(data = bird_pops, key = "year", value = "pop", select = 27:71)

# Examine the tidy data frame
head(bird_pops_long)
```

Because column names are coded in as characters, when we turned the column names (`1970`, `1971`, `1972`, etc.) into rows, R automatically put an `X` in front of the numbers to force them to remain characters. We don't want that, so to turn `year` into a numeric variable, use the `parse_number()` function from the `readr` package. 

```r
# Get rid of the X in front of years
# *** parse_number() from the readr package in the tidyverse ***
bird_pops_long$year <- parse_number(bird_pops_long$year)
```

<center> <img src="{{ site.baseurl }}/img/ox_long.png" alt="Img" style="width: 600px;"/> </center>

Check out the data frame again to make sure the years really look like years. As you're looking through, you might notice something else. We have many columns in the data frame, but there isn't a column with the species' name. We can make one super quickly, since there are already columns for the genus and the species.

```r
# Create new column with genus and species together
bird_pops_long$species.name <- paste(bird_pops_long$genus, bird_pops_long$species, sep = " ")
```

We can tidy up the data a bit more and create a few new columns with useful information. Whenever we are working with datasets that combine multiple studies, it's useful to know when they each, what their duration was, etc. Here we've combined all of that into one "pipe" (lines of code that use the piping operator `%>%`). The pipes always take whatever has come out of the previous pipe (or the first object you've given the pipe), and at the end of all the piping, out comes a tidy data frame with useful information.

```r
# *** piping from from dplyr
bird_pops_long <- bird_pops_long %>%
  # Remove duplicate rows
  # *** distinct() function from dplyr
  distinct() %>%
  # remove NAs in the population column
  # *** filter() function from dplyr
  filter(is.finite(pop)) %>%
  # Group rows so that each group is one population
  # *** group_by() function from dplyr
  group_by(id) %>%  
  # Make some calculations
  # *** mutate() function from dplyr
  mutate(maxyear = max(year), minyear = min(year),
         # Calculate duration
         duration = maxyear - minyear,
         # Scale population trend data
         scalepop = (pop - min(pop))/(max(pop) - min(pop))) %>%
  # Keep populations with >5 years worth of data and calculate length of monitoring
  filter(is.finite(scalepop),
         length(unique(year)) > 5) %>%
  # Remove any groupings you've greated in the pipe
  ungroup()

head(bird_pops_long)
```

Now we can calculate some finer-scale summary statistics. Though we have the most ecological data we've ever had, there are still many remaining data gaps, and a lot of what we know about biodiversity is based on information coming from a small set of countries. Let's check out which!


```r
# Which countries have the most data
# Using "group_by()" to calculate a "tally"
# for the number of records per country
country_sum <- bird_pops %>% group_by(country.list) %>% 
  tally() %>%
  arrange(desc(n))

country_sum[1:15,] # the top 15
```

As we probably all expected, a lot of the data come from Western European and North American countries. Sometimes as we navigate our research questions, we go back and forth between combining (adding in more data) and extracting (filtering to include only what we're interested in), so to mimic that, this tutorial will similarly take you on a combinign and extracting journey, this time through Australia.

To get just the Australian data, we can use the `filter()` function. To be on the safe side, we can also combine it with `str_detect()`. The difference is that filter on its own will extract any rows with "Australia", but it will miss rows that have e.g. "Australia / New Zealand" - occasions when the population study included multiple countries. In this case though, both ways of filtering return the same number of rows, but always good to check.

```r
# Data extraction ----
aus_pops <- bird_pops_long %>%
  filter(country.list == "Australia")

aus_pops <- bird_pops_long %>%
  filter(str_detect(country.list, pattern = "Australia"))
```

<div class="bs-callout-blue" markdown="1">

__Managing long scripts:__ Lines of code pile up quickly! There is an outline feature in `RStudio` that makes long scripts more organised and easier to navigate. You can make a subsection by writing out a comment and adding four or more characters after the text, e.g. `# Section 1 ----`. If you've included all of the comments from the tutorial in your own script, you should already have some sections.

</div>

<center> <img src="{{ site.baseurl }}/img/ouline.png" alt="Img" style="width: 600px;"/> </center>

Now that we have our Australian bird population studies, we can learn more about the data by visualising the variation in study duration. Earlier on, we filtered to only include studies with more than five years of data, but it's still useful to know how many studies have six years of data, and how many have much more.

__An important note about graphs made using `ggplot2`: you'll notice that throughout this tutorial, the `ggplot2` code is always surrounded by brackets. That way, we both make the graph, assign it to an object, e.g. `duration_hist` and we "call" the graph, so we can see it in the plot tab. If you don't have the brackets around the code chunk, you'll make the graph, but you won't actually see it. Alternatively, you can "call" the graph to the plot tab by running just the line `duration_hist`. It's also best to assign your graphs to objects, especially if you want to save them later, otherwise they just disappear and you'll have to run the code again to see or save the graph.__

```r
# Check the distribution of duration across the time-series
# A quick and not particularly pretty graph
(duration_hist <- ggplot(aus_pops, aes(x = duration)) +
    geom_histogram())
```

<center> <img src="{{ site.baseurl }}/img/hist1a.png" alt="Img" style="width: 500px;"/> </center>

This graph just uses all the `ggplot2` default settings. It's fine if you just want to see the distribution and move on, but if you plan to save the graph and share it with other people, we can make it way better. The figure beautification journey!

<b> When using `ggplot2`, you usually start your code with `ggplot(your_data, aes(x = independent_variable, y = dependent_variable))`, then you add the type of plot you want to make using `+ geom_boxplot()`, `+ geom_histogram()`, etc. `aes` stands for aesthetics, hinting to the fact that using `ggplot2` you can make aesthetically pleasing graphs - there are many `ggplot2` functions to help you clearly communicate your results, and we will now go through some of them.</b>

<b>When we want to change the colour, shape or fill of a variable based on another variable, e.g. colour-code by species, we include `colour = species` inside the `aes()` function. When we want to set a specific colour, shape or fill, e.g. `colour = "black"`, we put that outside of the `aes()` function.</b>

```r
(duration_hist <- ggplot() +
    geom_histogram(data = aus_pops, aes(x = duration), alpha = 0.6, 
                   breaks = seq(5, 40, by = 1), fill = "turquoise4"))

(duration_hist <- ggplot(aus_pops, aes(x = duration)) +
    geom_histogram(alpha = 0.6, 
                   breaks = seq(5, 40, by = 1), 
		   fill = "turquoise4") +
    # setting new colours, changing the opacity and defining custom bins
    scale_y_continuous(limits = c(0, 600), expand = expand_scale(mult = c(0, 0.1))))
    # the final line of code removes the empty blank space below the bars
```

<center> <img src="{{ site.baseurl }}/img/hist1b.png" alt="Img" style="width: 500px;"/>  <img src="{{ site.baseurl }}/img/hist1c.png" alt="Img" style="width: 500px;"/></center>

Now imagine you want to have a darker blue outline around the whole histogram - not around each individual bin, but the whole shape. It's the little things that add up to make nice graphs! We can use `geom_step()` to create the histogram outline, but we have to put the steps in a data frame first. The two lines of code below are a bit of a cheat to create the histogram outline effect. Check out the object `d1` to see what we've made.

```r
# Adding an outline around the whole histogram
h <- hist(aus_pops$duration, breaks = seq(5, 40, by = 1))
d1 <- data.frame(x = h$breaks, y = c(h$counts, NA))  
```

__When we want to plot data from different data frames in the same graph, we have to move the data frame from the main `ggplot()` call to the specific part of the graph where we want to use each dataset. Compare the code below with the code for the previous versions of the histograms to spot the difference.__

```r
(duration_hist <- ggplot() +
    geom_histogram(data = aus_pops, aes(x = duration), alpha = 0.6, 
                   breaks = seq(5, 40, by = 1), fill = "turquoise4") +
    scale_y_continuous(limits = c(0, 600), expand = expand_scale(mult = c(0, 0.1))) +
    geom_step(data = d1, aes(x = x, y = y),
              stat = "identity", colour = "deepskyblue4"))

summary(d1) # it's fine, you can ignore the warning message
# it's because there's no "zero" step
```

<center> <img src="{{ site.baseurl }}/img/hist1d.png" alt="Img" style="width: 500px;"/> </center>

We can also add a line for the mean duration across studies and add an annotation on the graph so that people can quickly see what the line means.

```r
(duration_hist <- ggplot() +
    geom_histogram(data = aus_pops, aes(x = duration), alpha = 0.6, 
                   breaks = seq(5, 40, by = 1), fill = "turquoise4") +
    scale_y_continuous(limits = c(0, 600), expand = expand_scale(mult = c(0, 0.1))) +
    geom_step(data = d1, aes(x = x, y = y),
              stat = "identity", colour = "deepskyblue4") +
    geom_vline(xintercept = mean(aus_pops$duration), linetype = "dotted",
               colour = "deepskyblue4", size = 1))

(duration_hist <- ggplot() +
    geom_histogram(data = aus_pops, aes(x = duration), alpha = 0.6, 
                   breaks = seq(5, 40, by = 1), fill = "turquoise4") +
    scale_y_continuous(limits = c(0, 600), expand = expand_scale(mult = c(0, 0.1))) +
    geom_step(data = d1, aes(x = x, y = y),
              stat = "identity", colour = "deepskyblue4") +
    geom_vline(xintercept = mean(aus_pops$duration), linetype = "dotted",
               colour = "deepskyblue4", size = 1) +
    # Adding in a text allocation - the coordinates are based on the x and y axes
    annotate("text", x = 15, y = 500, label = "The mean duration\n was 23 years.") +
    # "\n" creates a line break
    geom_curve(aes(x = 15, y = 550, xend = mean(aus_pops$duration) - 1, yend = 550),
               arrow = arrow(length = unit(0.07, "inch")), size = 0.7,
               color = "grey20", curvature = -0.3))
    # Similarly to the annotation, the curved line follows the plot's coordinates
    # Have a go at changing the curve parameters to see what happens
```

<center> <img src="{{ site.baseurl }}/img/hist1f.png" alt="Img" style="width: 500px;"/>  <img src="{{ site.baseurl }}/img/hist1e.png" alt="Img" style="width: 500px;"/></center>

We are super close to a nice histogram - all we are missing is letting it "shine". The default `ggplot2` theme is a bit cluttered and the grey background and lines distract from the main message of the graph. At the start of the tutorial we made our own clean theme, time to put it in action!

```r
(duration_hist <- ggplot() +
  geom_histogram(data = aus_pops, aes(x = duration), alpha = 0.6, 
                 breaks = seq(5, 40, by = 1), fill = "turquoise4") +
  scale_y_continuous(limits = c(0, 600), expand = expand_scale(mult = c(0, 0.1))) +
  geom_step(data = d1, aes(x = x, y = y),
            stat = "identity", colour = "deepskyblue4") +
  geom_vline(xintercept = mean(aus_pops$duration), linetype = "dotted",
             colour = "deepskyblue4", size = 1) +
  annotate("text", x = 15, y = 500, label = "The mean duration\n was 23 years.") +
  geom_curve(aes(x = 15, y = 550, xend = mean(aus_pops$duration) - 1, yend = 550),
             arrow = arrow(length = unit(0.07, "inch")), size = 0.7,
             color = "grey20", curvature = -0.3) +
  labs(x = "\nDuration", y = "Number of time-series\n") +
  theme_clean())
```

<center> <img src="{{ site.baseurl }}/img/hist1.png" alt="Img" style="width: 500px;"/> </center>

There's our histogram! We can save it using `ggsave`. The units for the height and width are in inches. Unless you specify a different file path, the graph will go in your working directory. If you've forgotten where that is, you can easily find out by running `getwd()` in the console.

```r
ggsave(duration_hist, filename = "hist1.png",
       height = 5, width = 6)
```

<a name="purrr"></a>

## 2. Automate repetitive tasks using pipes and functions

We are now ready to model how each population has changed over time. There are 1785 populations, so with this one code chunk, we will run 4331 models and tidy up their outputs. You can read through the line-by-line comments to get a feel for what each line of code is doing.

__One specific thing to note is that when you add the `lm()` function in a pipe, you have to add `data = .`, which means use the outcome of the previous step in the pipe for the model.__

<div class="bs-callout-blue" markdown="1">

__A piping tip:__ A useful way to familiriase yourself with what the pipe does at each step is to "break" the pipe and check out what the resulting object looks like if you've only ran the code up to e.g., the `do()` function, then up to the `tidy()` function and so on. You can do that by just select the relevant bit of code and running only that, but remember you have to exclude the piping operator at the end of the line, so e.g. you select up to `do(mod = lm(scalepop ~ year, data = .))` and *not* the whole `do(mod = lm(scalepop ~ year, data = .)) %>%`.

__Running pipes gradually also comes in handy when there is an error in your pipe and you don't know which part exactly introduces the error.__

</div>

```r
# Calculate population change for each forest population
# 4331 models in one go!
# Using a pipe
aus_models <- aus_pops %>%
  # Group by the key variables that we want to iterate over
  # note that if we only include e.g. id (the population id), then we only get the
  # id column in the model summary, not e.g. duration, latitude, class...
  group_by(decimal.latitude, decimal.longitude, class, 
           species.name, id, duration, minyear, maxyear,
           system, common.name) %>%
  # Create a linear model for each group
  do(mod = lm(scalepop ~ year, data = .)) %>%
  # Extract model coefficients using tidy() from the
  # *** tidy() function from the broom package ***
  tidy(mod) %>%
  # Filter out slopes and remove intercept values
  filter(term == "year") %>%
  # Get rid of the column term as we don't need it any more
  #  *** select() function from dplyr in the tidyverse ***
  dplyr::select(-term) %>%
  # Remove any groupings you've greated in the pipe
  ungroup()

head(aus_models)
# Check out the model data frame
```

<center> <img src="{{ site.baseurl }}/img/model_df.png" alt="Img" style="width: 600px;"/> </center>

__Next up, we will focus on automating iterative actions, for example when we want to create the same type of graph for different subsets of our data. In our case, we will make histograms of the population change experienced by birds across three different systems - marine, freshwater and terrestrial. When making multiple graphs at once, we have to specify the folder where they will be saved first.__

```r
# Make histograms of slope estimates for each system -----
# Set up new folder for figures
# Set path to relevant path on your computer/in your repository
path1 <- "system_histograms/"
# Create new folder
dir.create(path1) # skip this if you want to use an existing folder
# but remember to replace the path in "path1" if you're changing the folder

# First we will do this using dplyr and a pipe
aus_models %>%
  # Select the relevant data
  dplyr::select(id, system, species.name, estimate) %>%
  # Group by taxa
  group_by(system) %>%
  # Save all plots in new folder
  do(ggsave(ggplot(., aes(x = estimate)) +
              # Add histograms
              geom_histogram(colour = "deepskyblue4", fill = "turquoise4", binwidth = 0.02) +
              # Use custom theme
              theme_clean() +
              # Add axis lables
              xlab("Population trend (slopes)"),
            # Set up file names to print to
            filename = gsub("", "", paste0(path1, unique(as.character(.$system)),
                                           ".pdf")), device = "pdf"))
```
A warning message pops up: `Error: Results 1, 2, 3, 4 must be data frames, not NULL` - you can ignore this, it's because the `do()` function expects a data frame as an output, but in our case we are making graphs, not data frames.

Check out your folder, you should see three graphs in there! You can use pipes to make way more than just three graphs at once, it just so happens that our grouping variable has only three levels, but if it had thirty levels, there would be thirty graphs in the folder.

<center> <img src="{{ site.baseurl }}/img/folder.png" alt="Img" style="width: 600px;"/> </center>

Another way to make all those histograms in one go is by creating a function for it. In general, whenever you find yourself copying and pasting lots of code only to change the object name, you're probably in a position to swap all the code with a function - you can then apply the function using the `purrr` package.

But what is `purrr`? __It is a way to "map" or "apply" functions to data. Note that there are functions from other packages also called `map()`, which is why we are specifying we want the `map()` function from the `purrr` package. Here we will first format the data `taxa.slopes` and then we will map it to the mean fuction:__

We have to change the format of the data, in our case we will split the data using `spread()` from the `tidyr` package.

```r
# Selecting the relevant data and splitting it into a list
aus_models_wide <- aus_models %>%
  dplyr::select(id, system, estimate) %>%
  spread(system, estimate) %>%
  dplyr::select(-id)

# We can apply the `mean` function using `purrr::map()`:
system.mean <- purrr::map(aus_models_wide, ~mean(., na.rm = TRUE))
# Note that we have to specify "."
# so that the function knows to use our taxa.slopes object
# This plots the mean population change per taxa
system.mean
```

Now we can write our own function to make histograms and use the `purrr` package to apply it to each taxa.

```r
### Functional programming ----

# First let's write a function to make the plots
# *** Functional Programming ***
# This function takes one argument x, the data vector that we want to make a histogram

# note that when you run code for a function, you have to place the cursor
# on the first line (so not in the middle of the function) and then run it
# otherwise you get an error
# For most other things (like normal ggplot2 code, it doesn't matter 
# if the cursor is on the first line, or the 3rd, 5th...)
plot.hist <- function(x) {
  ggplot() +
    geom_histogram(aes(x), colour = "deepskyblue4", fill = "turquoise4", binwidth = 0.02) +
    theme_clean() +
    xlab("Population trend (slopes)")
}
```

__Now we can use purr to "map" our figure making function. The first input is your data that you want to iterate over and the second input is the function.__

```r
system.plots <- purrr::map(aus_models_wide, ~plot.hist(.))
# We need to make a new folder to put these figures in
path2 <- "system_histograms_purrr/"
dir.create(path2)
```

__We've learned about `map()`, but there are other `purrr` functions,too, and we still need to actually save our graphs.
`walk2()` takes two arguments and returns nothing. In our case we just want to print the graphs, so we don't need anything returned. The first argument is our file path, the second is our data and ggsave is our function.__

```r
# *** walk2() function in purrr from the tidyverse ***
walk2(paste0(path2, names(aus_models_wide), ".pdf"), system.plots, ggsave)
```

<a name="tidyverse"></a>

## 3. Synthesise information from different databases

```r
# Linking with other databases - traits! ----
colnames(bird_traits)
bird_traits <- bird_traits %>% rename(species.name = Scientific)
colnames(bird_traits)

bird_diet <- bird_traits %>% dplyr::select(species.name, `Diet.5Cat`) %>% 
  distinct() %>% rename(diet = `Diet.5Cat`)

bird_models_traits <- left_join(aus_models, bird_diet, by = "species.name") %>%
  drop_na()
head(bird_models_traits)
```

```r
(trends_diet <- ggplot(bird_models_traits, aes(x = diet, y = estimate,
                                               colour = diet)) +
    geom_boxplot())

(trends_diet <- ggplot(data = bird_models_traits, aes(x = diet, y = estimate,
                                                      colour = diet)) +
    geom_jitter(size = 3, alpha = 0.3, width = 0.2))

(trends_diet <- ggplot() +
    geom_jitter(data = bird_models_traits, aes(x = diet, y = estimate,
                                               colour = diet),
                size = 3, alpha = 0.3, width = 0.2) +
    geom_segment(data = diet_means,aes(x = diet, xend = diet,
                                       y = mean(bird_models_traits$estimate), 
                                       yend = mean_trend),
                 size = 0.8) +
    geom_point(data = diet_means, aes(x = diet, y = mean_trend,
                                      fill = diet), size = 5,
               colour = "grey30", shape = 21) +
    geom_hline(yintercept = mean(bird_models_traits$estimate), 
               size = 0.8, colour = "grey30") +
    geom_hline(yintercept = 0, linetype = "dotted", colour = "grey30"))
```

```r
diet_means <- bird_models_traits %>% group_by(diet) %>%
  summarise(mean_trend = mean(estimate)) %>%
  arrange(mean_trend)

bird_models_traits <- bird_models_traits %>%
  group_by(diet) %>%
  mutate(mean_trend = mean(estimate)) %>%
  ungroup() %>%
  mutate(diet = fct_reorder(diet, -mean_trend))
```

```r
(trends_diet <- ggplot() +
  geom_jitter(data = bird_models_traits, aes(x = diet, y = estimate,
                                                 colour = diet),
              size = 3, alpha = 0.3, width = 0.2) +
  geom_segment(data = diet_means,aes(x = diet, xend = diet,
                   y = mean(bird_models_traits$estimate), 
                   yend = mean_trend),
               size = 0.8) +
  geom_point(data = diet_means, aes(x = diet, y = mean_trend,
                                    fill = diet), size = 5,
             colour = "grey30", shape = 21) +
  geom_hline(yintercept = mean(bird_models_traits$estimate), 
             size = 0.8, colour = "grey30") +
  geom_hline(yintercept = 0, linetype = "dotted", colour = "grey30") +
  coord_flip() +
  theme_clean() +
  scale_colour_manual(values = wes_palette("Cavalcanti1")) +
  scale_fill_manual(values = wes_palette("Cavalcanti1")) +
  scale_y_continuous(limits = c(-0.23, 0.23),
                     breaks = c(-0.2, -0.1, 0, 0.1, 0.2),
                     labels = c("-0.2", "-0.1", "0", "0.1", "0.2")) +
  scale_x_discrete(labels = c("Carnivore", "Fruigivore", "Omnivore", "Insectivore", "Herbivore")) +
  labs(x = NULL, y = "\nPopulation trend") +
  guides(colour = FALSE, fill = FALSE))
```

```r
ggsave(trends_diet, filename = "trends_diet.png",
       height = 5, width = 8)
```

```r
# Map
australia <- map_data("world", region = "Australia")

# the populations which don't have trait data
bird_models_no_traits <- anti_join(aus_models, bird_diet, by = "species.name") %>%
  drop_na()
```

```r
(map <- ggplot() +
    geom_map(map = australia, data = australia,
             aes(long, lat, map_id = region), 
             color = "gray80", fill = "gray80", size = 0.3) +
    coord_proj(paste0("+proj=merc"), ylim = c(-9, -45)) +
    theme_map() +
    geom_point(data = bird_models_no_traits, 
               aes(x = decimal.longitude, y = decimal.latitude)) +
    geom_point(data = bird_models_traits, 
               aes(x = decimal.longitude, y = decimal.latitude, colour = diet)) +
    scale_colour_manual(values = wes_palette("Cavalcanti1")) +
    scale_fill_manual(values = wes_palette("Cavalcanti1")) +
    # guides(colour = FALSE) +
    theme(legend.position = "bottom",
          legend.title = element_text(size = 16),
          legend.text = element_text(size = 10),
          legend.justification = "top"))
```

```r
(map <- ggplot() +
    geom_map(map = australia, data = australia,
             aes(long, lat, map_id = region), 
             color = "gray80", fill = "gray80", size = 0.3) +
    coord_proj(paste0("+proj=merc"), ylim = c(-9, -45)) +
    theme_map() +
    geom_point(data = bird_models_no_traits, 
               aes(x = decimal.longitude, y = decimal.latitude),
               alpha = 0.8, size = 4, fill = "white", colour = "grey30",
               shape = 21,
               position = position_jitter(height = 0.5, width = 0.5)) +
    geom_point(data = bird_models_traits, 
               aes(x = decimal.longitude, y = decimal.latitude, fill = diet),
               alpha = 0.8, size = 4, colour = "grey30", shape = 21,
               position = position_jitter(height = 0.5, width = 0.5)) +
    scale_colour_manual(values = wes_palette("Cavalcanti1")) +
    scale_fill_manual(values = wes_palette("Cavalcanti1"),
                      labels = c("Carnivore", "Fruigivore", "Omnivore", "Insectivore", "Herbivore")) +
   # guides(colour = FALSE) + # if you wanted to hide the legend
    theme(legend.position = "bottom",
          legend.title = element_blank(),
          legend.text = element_text(size = 12),
          legend.justification = "top"))

ggsave(map, filename = "map1.png",
       height = 5, width = 8)
```

```r
diet_sum <- bird_models_traits %>% group_by(diet) %>%
  tally()
```

```r
(diet_bar <- ggplot(diet_sum, aes(x = diet, y = n,
                                   colour = diet,
                                  fill = diet)) +
    geom_bar(stat = "identity") +
    scale_colour_manual(values = wes_palette("Cavalcanti1")) +
    scale_fill_manual(values = wes_palette("Cavalcanti1")) +
    guides(fill = FALSE))
```

```r
(diet_area <- ggplot(diet_sum, aes(area = n, fill = diet, label = n,
                                 subgroup = diet)) +
    geom_treemap() +
    geom_treemap_subgroup_border(colour = "white", size = 1) +
    geom_treemap_text(colour = "white", place = "center", reflow = T) +
    scale_colour_manual(values = wes_palette("Cavalcanti1")) +
    scale_fill_manual(values = wes_palette("Cavalcanti1")) +
    guides(fill = FALSE))

ggsave(diet_area, filename = "diet_area.png",
       height = 5, width = 8)
```

```r
# Timeline
bird_models_traits$id <- as.factor(as.character(bird_models_traits$id))

(timeline_aus <- ggplot() +
    geom_linerange(data = bird_models_traits, aes(ymin = minyear, ymax = maxyear, 
                                                  colour = diet,
                                                  x = id),
                   size = 1) +
    scale_colour_manual(values = wes_palette("Cavalcanti1")) +
    labs(x = NULL, y = NULL) +
    theme_bw() +
    coord_flip())
```

```r
# Create a sorting variable
bird_models_traits$sort <- bird_models_traits$diet
bird_models_traits$sort <- factor(bird_models_traits$sort, levels = c("VertFishScav",
                                                                      "FruiNect",
                                                                      "Omnivore",
                                                                      "Invertebrate",
                                                                      "PlantSeed"),
                          labels = c(1, 2, 3, 4, 5))

bird_models_traits$sort <- paste0(bird_models_traits$sort, bird_models_traits$minyear)
bird_models_traits$sort <- as.numeric(as.character(bird_models_traits$sort))
```

```r
(timeline_aus <- ggplot() +
    geom_linerange(data = bird_models_traits, aes(ymin = minyear, ymax = maxyear, 
                                          colour = diet,
                                          x = fct_reorder(id, desc(sort))),
                   size = 1) +
    scale_colour_manual(values = wes_palette("Cavalcanti1")) +
    labs(x = NULL, y = NULL) +
    theme_bw() +
    coord_flip() +
    guides(colour = F) +
    theme(panel.grid.minor = element_blank(),
          panel.grid.major.y = element_blank(),
          panel.grid.major.x = element_line(),
          axis.ticks = element_blank(),
          legend.position = "bottom", 
          panel.border = element_blank(),
          legend.title = element_blank(),
          axis.title.y = element_blank(),
          axis.text.y = element_blank(),
          axis.ticks.y = element_blank(),
          plot.title = element_text(size = 20, vjust = 1, hjust = 0),
          axis.text = element_text(size = 16), 
          axis.title = element_text(size = 20)))

ggsave(timeline_aus, filename = "timeline.png",
       height = 5, width = 8)
```

```r
# Population trends versus size
mass <- bird_traits %>% dplyr::select(species.name, BodyMass.Value) %>%
  rename(mass = BodyMass.Value)
bird_models_mass <- left_join(aus_models, mass, by = "species.name") %>%
  drop_na(mass)
head(bird_models_mass)
```

```r
(trends_mass <- ggplot(bird_models_mass, aes(x = log(mass), y = abs(estimate))) +
    geom_point() +
    geom_smooth(method = "lm") +
    theme_clean() +
    labs(x = "\nlog(mass)", y = "Absolute population change\n"))

# A more beautiful and clear version
(trends_mass <- ggplot(bird_models_mass, aes(x = log(mass), y = abs(estimate))) +
  geom_point(colour = "turquoise4", size = 3, alpha = 0.3) +
  geom_smooth(method = "lm", colour = "deepskyblue4", fill = "turquoise4") +
  geom_label_repel(data = subset(bird_models_mass, log(mass) > 9),
                   aes(x = log(mass), y = abs(estimate),
                                                           label = common.name),
                   box.padding = 1, size = 5, nudge_x = 1,
                   # We are specifying the size of the labels and nudging the points so that they
                   # don't hide data points, along the x axis we are nudging by one
                   min.segment.length = 0, inherit.aes = FALSE) +
  geom_label_repel(data = subset(bird_models_mass, log(mass) < 1.8),
                   aes(x = log(mass), y = abs(estimate),
                       label = common.name),
                   box.padding = 1, size = 5, nudge_x = 1,
                   min.segment.length = 0, inherit.aes = FALSE) +
  theme_clean() +
  labs(x = "\nlog(mass)", y = "Absolute population change\n"))

ggsave(trends_mass, filename = "trends_mass.png",
       height = 5, width = 6)
```

__In this part of the tutorial, we will focus on one particular species, red deer (*Cervus elaphus*), where it has been recorded around the world, and where it's populations are being monitored. We will use occurrence data from the <a href="http://www.gbif.org/" target="_blank">Global Biodiversity Information Facility</a> which we will download in `R` using the `rgbif` package.__

```r
# Data synthesis x 3 - adding in occurrence data
# Let's see how many emu populations are included
emu <- bird_pops %>% filter(common.name == "Emu") # just one!
```

But where do emus occur and where in the range is this one monitored population?

```r
# Download species occurrence records from the Global Biodiversity Information Facility
# *** rgbif package and the occ_search() function ***
# You can increase the limit to get more records - 10000 takes a couple of minutes
emu_locations <- occ_search(scientificName = "Dromaius novaehollandiae", limit = 10000,
                             hasCoordinate = TRUE, return = "data") %>%
  # Simplify occurrence data frame
  dplyr::select(key, name, decimalLongitude,
                decimalLatitude, year,
                individualCount, country)
```

```r
# We can check the validity of the coordinates using the CoordinateCleaner package
emu_locations_test <- clean_coordinates(emu_locations, lon = "decimalLongitude", lat = "decimalLatitude",
                                       species = "name", tests = c("outliers", "zeros"), 
                                       outliers_method = "distance", outliers_td = 5000)
# No records were flagged
```

```r
# We do want to focus on just Australia though, as that's the native range
summary(as.factor(emu_locations$country))
# Thus e.g. no German emus
emu_locations <- emu_locations %>% filter(country == "Australia")

# Getting the data for the one monitored emu population
emu_long <- bird_pops_long %>% filter(common.name == "Emu") %>%
  drop_na(pop)
```

```r
(emu_map <- ggplot() +
    geom_map(map = australia, data = australia,
             aes(long, lat, map_id = region), 
             color = "gray80", fill = "gray80", size = 0.3) +
    coord_proj(paste0("+proj=merc"), ylim = c(-9, -45)) +
    theme_map() +
    geom_point(data = emu_locations, 
               aes(x = decimalLongitude, y = decimalLatitude),
               alpha = 0.1, size = 1, colour = "turquoise4") +
   geom_label_repel(data = emu_long[1,],
                     aes(x = decimal.longitude, y = decimal.latitude,
                         label = location.of.population),
                     box.padding = 1, size = 5, nudge_x = -30,
                     nudge_y = -6,
                     min.segment.length = 0, inherit.aes = FALSE) +
    geom_point(data = emu_long[1,], 
               aes(x = decimal.longitude, y = decimal.latitude),
               size = 5, fill = "deepskyblue4", 
               shape = 21, colour = "white") +
    theme(legend.position = "bottom",
          legend.title = element_text(size = 16),
          legend.text = element_text(size = 10),
          legend.justification = "top"))

ggsave(emu_map, filename = "emu_map.png",
       height = 5, width = 8)
```

```r
(emu_trend <- ggplot(emu_long, aes(x = year, y = pop)) +
    geom_line() +
    geom_point())

(emu_trend <- ggplot(emu_long, aes(x = year, y = pop)) +
  geom_line(linetype = "dotted", colour = "turquoise4") +
  geom_point(size = 6, colour = "white", fill = "deepskyblue4",
             shape = 21) +
  geom_rect(aes(xmin = 1987.5, xmax = 1988.5, ymin = 0, ymax = 0.3),
            fill = "turquoise4", alpha = 0.03) +
  annotate("text", x = 1986.2, y = 0.25, colour = "deepskyblue4",
           label = "Maybe 1988 was a wetter year\n or something else happened...",
           size = 4.5) +
  scale_y_continuous(limits = c(0, 0.3), expand = expand_scale(mult = c(0, 0)),
                     breaks = c(0, 0.1, 0.2, 0.3)) +
  labs(x = NULL, y = bquote(atop('Emus per ' ~ (km^2), ' ')),
       title = "Emu abundance in the\n pastoral zone of South Australia\n") +
  theme_clean())

ggsave(emu_trend, filename = "emu_trend.png",
       height = 5, width = 8)
```

```r
# Panels ----
# Create panel of all graphs
# Makes a panel of the map and occurrence plot and specifies the ratio
# i.e., we want the map to be wider than the other plots
emu_panel <- grid.arrange(emu_map, emu_trend, ncol = 2)

# suppressWarnings() suppresses warnings in the ggplot call here
emu_panel <- suppressWarnings(grid.arrange(emu_map, emu_trend, 
                                           ncol = 2, widths = c(1.2, 0.8)))
```

```r
(emu_trend <- ggplot(emu_long, aes(x = year, y = pop)) +
    geom_line(linetype = "dotted", colour = "turquoise4") +
    geom_point(size = 6, colour = "white", fill = "deepskyblue4",
               shape = 21) +
    geom_rect(aes(xmin = 1987.5, xmax = 1988.5, ymin = 0, ymax = 0.3),
              fill = "turquoise4", alpha = 0.03) +
    annotate("text", x = 1986, y = 0.25, colour = "deepskyblue4",
             label = "Maybe 1988 was a wetter year\n or something else happened...",
             size = 4.5) +
    scale_y_continuous(limits = c(0, 0.3), expand = expand_scale(mult = c(0, 0)),
                       breaks = c(0, 0.1, 0.2, 0.3)) +
    labs(x = "\n\n", y = bquote(atop('Emus per ' ~ (km^2), ' ')),
         title = "\n\nEmu abundance in the\n pastoral zone of South Australia\n") +
    theme_clean())

emu_panel <- suppressWarnings(grid.arrange(emu_map, emu_trend, 
                                           ncol = 2, widths = c(1.1, 0.9)))

ggsave(emu_panel, filename = "emu_panel.png", height = 6, width = 14)
```

```r
# More complex panels

# Map on top, three panels below
diet_panel <- suppressWarnings(grid.arrange(timeline_aus,
                                            trends_diet, ncol = 2))
diet_panel_map <- suppressWarnings(grid.arrange(map, diet_panel, nrow = 2))
```

```r
diet_panel_map <- suppressWarnings(grid.arrange(map, diet_panel, nrow = 2, heights = c(1.3, 0.7)))
```

```r
(timeline_aus <- ggplot() +
    geom_linerange(data = bird_models_traits, aes(ymin = minyear, ymax = maxyear, 
                                                  colour = diet,
                                                  x = fct_reorder(id, desc(sort))),
                   size = 1) +
    scale_colour_manual(values = wes_palette("Cavalcanti1")) +
    labs(x = NULL, y = "\n") +
    theme_clean() +
    coord_flip() +
    guides(colour = F) +
    theme(panel.grid.minor = element_blank(),
          panel.grid.major.y = element_blank(),
          panel.grid.major.x = element_line(),
          axis.ticks = element_blank(),
          legend.position = "bottom", 
          panel.border = element_blank(),
          legend.title = element_blank(),
          axis.text.y = element_blank(),
          axis.ticks.y = element_blank(),
          plot.title = element_text(size = 20, vjust = 1, hjust = 0),
          axis.text = element_text(size = 16), 
          axis.title = element_text(size = 20)))

diet_panel <- suppressWarnings(grid.arrange(timeline_aus,
                                            trends_diet, ncol = 2))
diet_panel_map <- suppressWarnings(grid.arrange(map, diet_panel, nrow = 2, heights = c(1.3, 0.7)))

ggsave(diet_panel_map, filename = "diet_panel.png", height = 9, width = 10)
```

```r
(trends_diet <- ggplot() +
    geom_jitter(data = bird_models_traits, aes(x = diet, y = estimate,
                                               colour = diet),
                size = 3, alpha = 0.3, width = 0.2) +
    geom_segment(data = diet_means,aes(x = diet, xend = diet,
                                       y = mean(bird_models_traits$estimate), 
                                       yend = mean_trend),
                 size = 0.8) +
    geom_point(data = diet_means, aes(x = diet, y = mean_trend,
                                      fill = diet), size = 5,
               colour = "grey30", shape = 21) +
    geom_hline(yintercept = mean(bird_models_traits$estimate), 
               size = 0.8, colour = "grey30") +
    geom_hline(yintercept = 0, linetype = "dotted", colour = "grey30") +
    coord_flip() +
    theme_minimal() +
    theme(axis.text.x = element_text(size = 14),
          axis.text.y = element_text(size = 14),
          axis.title.x = element_text(size = 14, face = "plain"),             
          axis.title.y = element_text(size = 14, face = "plain"),             
          plot.margin = unit(c(0.5, 0.5, 0.5, 0.5), units = , "cm"),
          plot.title = element_text(size = 15, vjust = 1, hjust = 0.5),
          legend.text = element_text(size = 12, face = "italic"),          
          legend.title = element_blank(),                              
          legend.position = c(0.5, 0.8)) +
    scale_colour_manual(values = wes_palette("Cavalcanti1")) +
    scale_fill_manual(values = wes_palette("Cavalcanti1")) +
    scale_y_continuous(limits = c(-0.23, 0.23),
                       breaks = c(-0.2, -0.1, 0, 0.1, 0.2),
                       labels = c("-0.2", "-0.1", "0", "0.1", "0.2")) +
    scale_x_discrete(labels = c("Carnivore", "Fruigivore", "Omnivore", "Insectivore", "Herbivore")) +
    labs(x = NULL, y = "\nPopulation trend") +
    guides(colour = FALSE, fill = FALSE))

diet_panel <- suppressWarnings(grid.arrange(timeline_aus,
                                            trends_diet, ncol = 2))
diet_panel_map <- suppressWarnings(grid.arrange(map, diet_panel, nrow = 2, heights = c(1.3, 0.7)))

ggsave(diet_panel_map, filename = "diet_panel2.png", height = 9, width = 10)
```

## Challenges

## Extra resources

To learn more about the power of pipes check out:
<a href = "http://dplyr.tidyverse.org/" target ="_blank"> the tidyverse website</a> and <a href="http://r4ds.had.co.nz/pipes.html" target="_blank"> the R for Data Science book</a>.

To learn more about `purrr` check out the <a href="http://purrr.tidyverse.org/reference/map2.html" target="_blank">tidyverse website</a> and the <a href="http://r4ds.had.co.nz/iteration.html" target="_blank"> R for Data Science book</a>.

For more information on functional programming see the <a href="http://r4ds.had.co.nz/functions.html" target="_blank">R for Data Science book chapter here</a>.

To learn more about the `tidyverse` in general, check out Charlotte Wickham's slides <a href="https://github.com/cwickham/data-science-in-tidyverse/tree/master/slides" target="_blank">here</a>.



<hr>
<hr>



<h3><a href="https://www.surveymonkey.com/r/XD85MW5" target="_blank">&nbsp; We would love to hear your feedback, please fill out our survey!</a></h3>

<br>
<h3>&nbsp; You can contact us with any questions on <a href="mailto:ourcodingclub@gmail.com?Subject=Tutorial%20question" target = "_top">ourcodingclub@gmail.com</a></h3>
<br>
<h3>&nbsp; Related tutorials:</h3>
{% for post in site.posts %}
	{% if post.url != page.url %}
  		{% for tag in post.tags %}
    			{% if page.tags contains tag %}
<h4><a style="margin:0 padding:0" href="{{ post.url }}">&nbsp; - {{ post.title }}</a></h4>
  			{% endif %}
		{% endfor %}
	{% endif %}
{% endfor %}
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