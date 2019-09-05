// Copy and paste function

$(document).ready(function(){
   $("a[name=copy_pre]").click(function() {
      var id = $(this).attr('id').slice(1); //always have letter A as prefix to link ID
      var el = document.getElementById(id);
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('copy');
      return false;
   });
});