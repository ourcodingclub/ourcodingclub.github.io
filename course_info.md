---
layout: page
title: "Data Science for ecologists and environmental scientists"
banner: "../assets/img/banner/dl_course_banner.jpg"
redirect_from:
  - /course_info/
---

<center><h2>Course details</h2></center>

<section id="portfolio-work"> <!-- adding section to expand width of div -->
<div class="content-new-info">
    <img src="{{ site.baseurl }}/assets/img/logos/Logo_Data_Science_smallest.png" alt="Course logo">
      <br>
      <br>
      <big><b>Here you can find all the information you need to <a href="#signup">sign up</a> for the course and choose <a href="#streams">which tutorials</a> you want to complete. See our <a href="#instructions">instructions</a> on how best to access the course materials and how to <a href="#challenges">test</a> your new skills. We'll also <a href="#about">introduce ourselves</a> - don't hesitate to <a href="#contact">get in touch</a> with questions or feedback!</b></big>
</div>
</section>

<a name = "signup"></a>
<section id="portfolio-work" style="background-color: #eceef1; padding-bottom:20px">
<div class="content-new-streams">
    <img src="{{ site.baseurl }}/assets/img/dl_course/sign-up.png" style= "width:10%; height:auto; padding:20px;20px;20px;80px;" alt="Sign up icon">
      <h2>1. Sign up</h2>
      <p>By registering for the course, you can access not only our tutorials but also quizzes and challenges that will allow you to put your skills into practice and request your certificate. Registering only takes a minute. Remember to make a note of your login details!</p>
      
      <div style="padding:20px">
         <center>
            <a class="button" href="https://coding-club.shinyapps.io/course-registration/" target="_blank"> Sign me up! 
            </a>
         </center>
      </div>
          
</div>
</section>

{% capture link %}https://coding-club.shinyapps.io/test-centre/{% endcapture %}
{% include link-button.html url=link button="Registered user? This way to the quiz centre and your progress to date." %}

<a name = "streams"></a>
 <section id="portfolio-work" style="background-color:#275d71; color:#ffffff; padding-bottom:20px">
<div class="content-new-streams">
      <h2><font color="white">2. Choose your tutorials</font></h2>
       <p><big>You can mix and match across streams, but we have grouped tutorials under three popular topics targeting different levels and interests.</big></p>
<div class="row-eq-height">
   
      <div class="col-md-6 col-sm-12">
        <div class="profile" style="border: 0px;">
          <a href="{{ site.baseurl }}/course/stats-scratch/index.html"><img src="{{ site.baseurl }}/assets/img/dl_course/DL_stream1.png" alt="Stream 1: Stats from Scratch" align="center" style="max-width:500px; height: auto; width:100%; padding: 10px;" /></a>
        </div>
      </div><!-- .col-md-4 close -->
      
      <div class="col-md-6 col-sm-12">
        <div class="block">
            <h2><font color="white">Stats from Scratch</font></h2>
          <p>Our (anything but) basic introduction to R and object-oriented programming. Ideal for those with no previous coding experience - by the end you will have coded your way through all the key elements of scientific research, from manipulating data to conducting simple statistical analyses and presenting results in professional-looking graphs.</p>
   <p><a href="{{ site.baseurl }}/course/stats-scratch/index.html" target="_blank" style="font-weight:600; color:#d7aa69">See tutorials and start Stats from Scratch</a></p>
          
        </div>
      </div><!-- .col-md-8 close -->
    </div>
    
    <div class="row-eq-height">
   
      <div class="col-md-6 col-sm-12">
        <div class="profile" style="border: 0px;">
          <a href="{{ site.baseurl }}/course/wiz-viz/index.html"><img src="{{ site.baseurl }}/assets/img/dl_course/DL_stream2.png" alt="Stream 2: Wiz of Data Viz" align="center" style="max-width:500px; height: auto; width:100%; padding: 10px;" /></a>
        </div>
      </div><!-- .col-md-4 close -->
      
      <div class="col-md-6 col-sm-12">
        <div class="block">
            <h2><font color="white">Wiz of Data Viz</font></h2>
          <p>A picture is worth a thousand words! This stream is ideal for those with a bit of coding experience in R, but it recaps some key elements of data manipulation to make sure you're off to a strong start. Then it's all about making your science come to life with nice, informative figures and interactive elements such as Markdown reports and Shiny apps.</p>
             <p><a href="{{ site.baseurl }}/course/wiz-viz/index.html" target="_blank" style="font-weight:600; color:#d7aa69">See tutorials and start Wiz of Data Viz</a></p>
        </div>
      </div><!-- .col-md-8 close -->
    </div>
    
        <div class="row-eq-height">
   
      <div class="col-md-6 col-sm-12">
        <div class="profile" style="border: 0px;">
          <a href="{{ site.baseurl }}/course/mastering-modelling/index.html"><img src="{{ site.baseurl }}/assets/img/dl_course/DL_stream3.png" alt="Stream 3: Mastering Modelling" align="center" style="max-width:500px; height: auto; width:100%; padding: 10px;" /></a>
        </div>
      </div><!-- .col-md-4 close -->
      
      <div class="col-md-6 col-sm-12">
        <div class="block">
            <h2><font color="white">Mastering Modelling</font></h2>
          <p>All about the stats! Learn how to turn research questions into code, accounting for various data structures and types. This stream is ideal for those with some coding experience in R, but also offers entry-level spatial analysis with the Google Earth Engine.</p>
             <p><a href="{{ site.baseurl }}/course/mastering-modelling/index.html" target="_blank" style="font-weight:600; color:#d7aa69">See tutorials and start Mastering Modelling</a></p>
        </div>
      </div><!-- .col-md-8 close -->
    </div>
   </div>
</section> <!-- end of streams-->


 <!-- Download --> 
 <a name = "instructions"></a>
<section id="portfolio-work" style="background-color:#f3f3f2; padding-bottom:20px">
<div class="content-new-streams">
<div class="row-eq-height">
    <img src="{{ site.baseurl }}/assets/img/dl_course/github-download.png" style= "width:30%; height:auto; padding:30px;" alt="git logo">
      <div class="col-md-4 col-sm-2">
        <div class="profile" style="border: 0px;">
        </div>
      </div><!-- .col-md-4 close -->
      
      <div class="col-md-8 col-sm-10">
        <div class="block">
            <h2>3. Download the course materials</h2>
          <p>If you want to tackle a whole course stream (or most of it), we recommend that you download the relevant data repository from GitHub (no account required) and place it somewhere near the root of your computer (e.g. the "C" drive). That way, you have all the materials you need already in a clear folder structure.</p>
          <ul>
  <li><a href="https://github.com/ourcodingclub/CC_course_stream1" target="_blank" style="font-size:18px;">Data repository for Stream 1: Stats from Scratch</a></li>
  <li><a href="https://github.com/ourcodingclub/CC_course_stream2" target="_blank" style="font-size:18px;">Data repository for Stream 2: Wiz of Data Viz</a></li>
  <li><a href="https://github.com/ourcodingclub/CC_course_stream3" target="_blank" style="font-size:18px;">Data repository for Stream 3: Mastering Modelling</a></li>
          </ul>
   <p>If you only plan on doing a couple of tutorials, then you may ignore this step and download the materials directly from the link provided in each tutorial.</p>
          
        </div>
      </div><!-- .col-md-8 close -->
   </div>
   </div>
   <div class="row" style="padding:10px 0px">
     <center><img src="{{ site.baseurl }}/assets/img/dl_course/clone-repo.png" style= "width: 50%; height:auto" alt="clone-repo"></center> 
   </div>
   <div class="content-new-streams">
   <div class="row">
      <p>You can then access the files in RStudio by setting your working directory to a specific folder, or by creating a new R project within the desired folder (which will automatically set the working directory). We suggest that you save your new script and all other outputs from the tutorial (e.g. graphs) in that tutorial folder (e.g. your script for the first tutorial would be saved as <i>C://CC_course_stream1/01_Getting_started/intro-to-R-script.R</i>). </p>
      
      <p>No idea what we're talking about? The <a href="https://ourcodingclub.github.io/2016/11/13/intro-to-r.html" target="_blank">very first tutorial</a> of <a href="https://ourcodingclub.github.io/course/stats-scratch.html" target="_blank">Stats from Scratch</a> should demystify all this.</p>
      
      <p>Are you a more advanced user keen on <a href="https://ourcodingclub.github.io/2017/02/27/git.html" target="_blank">version control</a>? Feel free to fork the repositories to your own Github account.</p>
   </div>
   </div>
</section> <!-- download closes -->

 <!-- Learn -->
 <section id="portfolio-work" style="background-color: #bccd6da; padding-bottom:20px">
<div class="content-new-streams">
<div class="row-eq-height">
      <div class="col-md-12 col-sm-12">
        <div class="block">
            <h2>4. Learn!</h2>
           <img src="{{ site.baseurl }}/assets/img/dl_course/tut-and-quiz.png" style= "width:28%; height:auto; padding:0px 30px; vertical-align: middle; float:right;" alt="laptop icon">
          <p>Now you're all set to start working on the tutorials! You can find the list of tutorials <b>on each stream page</b>, along with the links to related quizzes and challenges.</p>
         <p>An average tutorial takes around <b>two hours</b> to complete, although some may be longer or shorter. Make sure you save your script often as you go, so you can pick up where you left off if you don't finish a tutorial in one sitting. Our <a href="https://ourcodingclub.github.io/2016/11/13/intro-to-r.html" target="_blank">Intro to R</a> and <a href="https://ourcodingclub.github.io/2017/04/25/etiquette.html" target="_blank">Coding Etiquette</a> tutorials will tell you more about managing your code and scripts properly.</p>
          
         <p>When you work on the tutorials, we recommend that you have RStudio open in one window with your script and the tutorial data, and follow along the tutorial online in another window.</p>
         
        <p><b>Test yourself!</b> When you finish a tutorial, go to our <a href="https://coding-club.shinyapps.io/test-centre/" target="_blank">Test Centre</a> to take the associated quiz. The quizzes are short and their purpose is for you to recap concepts you have learned, and for us to verify that you have engaged with the tutorial. Remember, we're not here to catch you out! Still, better to take the test right after the tutorial, while everything is still fresh.</p> 
        
        <p><b>Do as many tutorials as you like. This course runs continuously so there is no start or end date, and no time limit - ideal for learning alongside your many other commitments!</b> When you request a certificate, all the tutorials and challenges you have completed will be listed on it. You can request a certificate at any point throughout the course, and if you end up doing more tutorials or challenges, you can request an updated certificate with all your new achievements included.</p>
         
        </div>
      </div><!-- .col-md-7 close -->
    </div>
   </div>
</section> <!-- end of Learn-->


<!-- Test yourself -->
<a name = "challenges"></a>
 <section id="portfolio-work" style="background-color: #896e81; color:#ffffff; padding-bottom:20px">
           <div class="content-new-info">
          <img src="{{ site.baseurl }}/assets/img/dl_course/challenge.png" style= "width:20%; height:auto; padding:25px 30px 160px 10px; vertical-align: top;" alt="mountain icon">
            <h2><font color="white">5. Challenge yourself</font></h2>
          <p>We offer three data challenges as the culmination of each course stream. <b>In these challenges, we give you various research questions to answer, using real-life, open-source data from Scottish environmental organisations.</b> The challenges are meant to be, well, challenging (!), and therefore we only provide minimal guidance. It will be up to you to make decisions and get creative with your code - there are usually more than one valid way of getting to an answer! </p>
          <br>
          <p>You don't need to have done every tutorial in a stream to succeed in the challenge, but you might want to refer back to them for reminders or useful snippets of code. Remember also that search engines are your friend and you are encouraged to look things up! Like with the tutorials, we test your completion of the challenge with a set of questions, with the difference that these questions are already made available to you on the challenge page. </p>
          <br>
         <p><b>Each challenge will probably take you anywhere between 3-8 hours to complete.</b> Don't get frustrated if you get stuck somewhere: take a break, ask a friend or colleague for help, or get in touch with us. We want you to have fun and feel empowered: after all, you've worked hard and learned a lot! </p>
        </div>
         <div class="content-new-streams">
             <h2><font color="white">Our data challenges</font></h2>
             <ul>
            <li style="font-size:16px;"><a href="https://ourcodingclub.github.io/course/stats-scratch-challenge/index.html" target="_blank" style="font-weight:600; color:#b8f2f8">Where are the red squirrels?</a><br>
            A data manipulation and analysis challenge for the Stats from Scratch stream</li>
            
            <li style="font-size:16px;"><a href="https://ourcodingclub.github.io/course/wiz-viz-challenge/index.html" target="_blank" style="font-weight:600; color:#b8f2f8">Exploring the native woodlands of Scotland</a><br>
            A spatial data visualisation challenge for the Wiz of Data Viz stream</li>
            
            <li style="font-size:16px;"><a href="https://ourcodingclub.github.io/course/mastering-modelling-challenge/index.html" target="_blank" style="font-weight:600; color:#b8f2f8">Investigating seabirds breeding success</a><br>
            A modelling challenge for the Mastering Modelling stream</li>
             </ul>
         </div>
</section> <!-- end of challenges-->

<!-- Certificate -->
<a name = "certificate"></a>
 <section id="portfolio-work" style="background-color: #bccd6da; padding-bottom:20px">
        <div class="content-new-streams">
        <center><img src="{{ site.baseurl }}/assets/img/dl_course/certificate.png" style= "height:250px; width:auto" alt="certificate"></center>
            <h2>6. Get recognition</h2>
          <p>Congratulations! You worked hard, learned new skills, and perhaps you want to show the world (or a potential employer) how far you've come. You can request your certificate in a few clicks. You will be able to download your PDF certificate listing the tutorials and challenges that you have successfully completed. </p>
          <br>
          
                <div style="padding:20px">
         <center>
            <a class="button" href="https://coding-club.shinyapps.io/certificate/" target="_blank"> Graduate from Coding Club! 
            </a>
         </center>
      </div>
    </div>
</section> <!-- end of certificate-->

<!-- About the course -->
<a name = "about"></a>
<section id="portfolio-work" style="background-color: #e4e6e5; padding-bottom:20px">
<div class="content-new-streams">
<div class="row">
       <center><img src="{{ site.baseurl }}/assets/img/dl_course/DL-CC.png" style= "width:30%; height:auto; padding: 25px 10px; float:right;" alt="DL-CC"></center>
            <h2>About the course</h2>
      <h3>What is the Coding Club?</h3>
          <p>Our Coding Club started in 2016 when a we, a group of students and staff members in Environmental and Ecological Sciences at the University of Edinburgh decided they wanted to learn more computer programming and quantitative methods than what they were being taught in class. Our goal is to overcome “code fear” and “statistics anxiety”. Statistics anxiety – the worry about a lack of quantitative skills – and code fear – the fear of programming – can hold people back in their studies and careers. We received funding to create coding tutorials and run weekly workshops that rapidly became a success.</p>
          
          <p>Our Coding Club workshops are a relaxed and fun learning environment for undergraduate students, postgraduates, and staff alike, but our impact reaches far beyond Edinburgh. Users worlwide access our tutorials, and other universities have created their own coding clubs based on our model.</p>
          
    <h3>Why a course?</h3>
          <p>We created the course to offer a semi-structured approach to learning programming. Instead of lectures, we rely on practical problem-solving with our tutorials, which are designed to be relaxed and informal, developing “skills without the intimidation factor”, but with clear and measurable learning objectives in mind. Similarly, we designed the course streams to progressively build up your skills and develop a toolkit suited to your studies or professional requirements. You will rapidly gain confidence as you tackle increasingly complex and varied datasets and tasks.</p>  
          
          <p>We strongly believe that <b>anyone</b> can code and pride ourselves on offering a highly flexible and <b>free course</b> so that you can participate regardless of your occupation or financial situation. Our tutorials are written by a very diverse <a href="https://ourcodingclub.github.io/team/" target="_blank">team</a> and we want to see that diversity represented in the next generation of environmental data scientists!</p>
          
          <big><p>We are able to provide this course completely free of charge thanks to the support of <a href="https://www.thedatalab.com/" target="_blank">the Data Lab</a>, Scotland's Innovation Centre for data and AI.</p></big>
          
        </div>
   </div>
</section> <!-- end of about-->


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
