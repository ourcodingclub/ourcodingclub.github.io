// toggle button to turn background images on and off

function togglebg(id){
  if (document.getElementById(id).classList.contains('nobg')){
document.getElementById(id).classList.remove('nobg');
} else {
document.getElementById(id).classList.add('nobg');   
}
}

function toggle2(id) {
$(id).toggleClass('nobg');
}

function toggle3(id) {
   if ($(id).hasClass('feature')) {
   $(id).removeClass('feature');
   $(id).addClass('nobg');
   }
   else {
   $(id).removeClass('nobg');
   $(id).addClass('feature');   
   }
}

$('#MyElement').removeClass('MyClass');

$('.btn-switch').click(function toggle(id) {
$(id).toggleClass('nobg');
});