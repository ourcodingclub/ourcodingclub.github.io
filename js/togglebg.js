// toggle button to turn background images on and off

var id=["stream1tuts", "stream2tuts","stream3tuts", "challenge1go", "challenge2go", "challenge3go"];
var i;

function togglebg(){
   for (i = 0; i < id.length; i++) { //start of loop 2

   // toggle the bg depending on current state
    if (document.getElementById(id[i]).class=='feature') {
      // bg is visible. hide it
      document.getElementById(id[i]).class='nobg';
    }
    else {
      // bg is invisible. show it
      document.getElementById(id[i]).class ='feature';
    }
}//end of loop 2
}
)
