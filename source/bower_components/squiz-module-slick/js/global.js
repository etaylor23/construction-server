(function($){
    var $slideshow = $('.slick-slideshow');

    $slideshow.each(function() {
      $(this).slick({
          dots:           true,
          arrows:         true,
          speed:          400,
          slide:          '.slick-slideshow__slide',
          slidesToScroll: 3,
          slidesToShow:   1
      });
    })

}(jQuery));
