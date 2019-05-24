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

### Tutorial Aims:

#### <a href="#tidyverse"> 1. Format and manipulate large datasets </a>
#### <a href="#purrr"> 2. Automate repetitive tasks using functions </a>
#### <a href="#synthesis"> 3. Synthesise information from different databases </a>
#### <a href="#panels"> 4. Create beautiful and informative figure panels </a>

<p></p>

## This tutorial was developed for the ...

Some summary text...

### All the files you need to complete this tutorial can be downloaded from <a href="https://github.com/ourcodingclub/CC-oxford" target="_blank">this repository</a>. __Click on `Clone/Download/Download ZIP` and unzip the folder, or clone the repository to your own GitHub account.__

<a name="tidyverse"></a>

## 1. Format and manipulate large datasets


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

```r
bird_pops <- read.csv("bird_pops.csv")
bird_traits <- read.csv("elton_birds.csv")
```

```r
# Rename variable names for consistency
names(bird_pops)
names(bird_pops) <- tolower(names(bird_pops))
names(bird_pops)
```

```r
bird_pops_long <- gather(data = bird_pops, key = "year", value = "pop", select = 27:71)

# Examine the tidy data frame
head(bird_pops_long)
```

```r
# Get rid of the X in front of years
# *** parse_number() from the readr package in the tidyverse ***
bird_pops_long$year <- parse_number(bird_pops_long$year)

# Create new column with genus and species together
bird_pops_long$species.name <- paste(bird_pops_long$genus, bird_pops_long$species, sep = " ")
```

```r
# Which countries have the most data
country_sum <- bird_pops %>% group_by(country.list) %>% tally() %>%
  arrange(desc(n))

country_sum[1:15,] # the top 15
```

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

```r
aus_pops <- bird_pops_long %>%
  filter(country.list == "Australia")

aus_pops <- bird_pops_long %>%
  filter(str_detect(country.list, pattern = "Australia"))
```

```r
# Check the distribution of duration across the time-series
(duration_hist <- ggplot() +
    geom_histogram(data = aus_pops, aes(x = duration)))
```

```r
(duration_hist <- ggplot() +
    geom_histogram(data = aus_pops, aes(x = duration), alpha = 0.6, 
                   breaks = seq(5, 40, by = 1), fill = "turquoise4"))

(duration_hist <- ggplot() +
    geom_histogram(data = aus_pops, aes(x = duration), alpha = 0.6, 
                   breaks = seq(5, 40, by = 1), fill = "turquoise4") +
    scale_y_continuous(limits = c(0, 600), expand = expand_scale(mult = c(0, 0.1))))
```

```r
# Adding an outline around the whole histogram
h <- hist(aus_pops$duration, breaks = seq(5, 40, by = 1))
d1 <- data.frame(x = h$breaks, y = c(h$counts, NA))  
  
(duration_hist <- ggplot() +
    geom_histogram(data = aus_pops, aes(x = duration), alpha = 0.6, 
                   breaks = seq(5, 40, by = 1), fill = "turquoise4") +
    scale_y_continuous(limits = c(0, 600), expand = expand_scale(mult = c(0, 0.1))) +
    geom_step(data = d1, aes(x = x, y = y),
              stat = "identity", colour = "deepskyblue4"))

summary(d1) # it's fine, you can ignore the warning message
```

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
    annotate("text", x = 15, y = 500, label = "The mean duration\n was 23 years.") +
    geom_curve(aes(x = 15, y = 550, xend = mean(aus_pops$duration) - 1, yend = 550),
               arrow = arrow(length = unit(0.07, "inch")), size = 0.7,
               color = "grey20", curvature = -0.3))

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

```r
ggsave(duration_hist, filename = "hist1.png",
       height = 5, width = 6)
```

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
```

```r
# PART 2: Using pipes to make figures with large datasets ----

# Make histograms of slope estimates for each biome -----
# Set up new folder for figures
# Set path to relevant path on your computer/in your repository
path1 <- "biome_histograms/"
# Create new folder
dir.create(path1)

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

```r
# Selecting the relevant data and splitting it into a list
aus_models_wide <- aus_models %>%
  dplyr::select(id, system, estimate) %>%
  spread(system, estimate) %>%
  dplyr::select(-id)

system.mean <- purrr::map(aus_models_wide, ~mean(., na.rm = TRUE))
# Note that we have to specify "."
# so that the function knows to use our taxa.slopes object
# This plots the mean population change per taxa
system.mean
```

```r
### Intro to the purrr package ----

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

```r
system.plots <- purrr::map(aus_models_wide, ~plot.hist(.))
# We need to make a new folder to put these figures in
path2 <- "biome_histograms_purrr/"
dir.create(path2)

# *** walk2() function in purrr from the tidyverse ***
walk2(paste0(path2, names(aus_models_wide), ".pdf"), system.plots, ggsave)
```

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
