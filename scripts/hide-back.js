$('.scroll-banner button').click(function() {
   var $this = $(this);
   $this.closest('div').toggleClass('scroll-banner scroll-banner-nobg');
});
