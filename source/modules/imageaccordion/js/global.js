(function($){
    'use strict';

	$("#slideshow").zAccordion({
		timeout: 4500,
		speed: 500,
		slideClass: 'slide',
		animationStart: function () {
			$('#slideshow').find('li.slide-previous div').fadeOut();
		},
		animationComplete: function () {
			$('#slideshow').find('li.slide-open div').fadeIn();
		},
		buildComplete: function () {
			$('#slideshow').find('li.slide-closed div').css('display', 'none');
			$('#slideshow').find('li.slide-open div').fadeIn();
		},
		startingSlide: 1,
		width: 700,
		tabWidth: 100,
		height: 310
	});

}(jQuery));