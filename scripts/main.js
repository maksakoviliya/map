//= ../libs/jquery/jquery.3.3.1.js

$(document).ready(function () {
	var timer;
	$('#custom-map span').hover(function () {
		clearTimeout(timer);
		var classlist = $(this).attr('class');

		if (classlist) {
			if (~classlist.indexOf("florida")) {
				$('.florida').addClass('hovered');
			}
			else if (~classlist.indexOf("alaska")) {
				$('.alaska').addClass('hovered');
			}
			else if (~classlist.indexOf("arizona")) {
				$('.arizona').addClass('hovered');
			}
			else if (~classlist.indexOf("california")) {
				$('.california').addClass('hovered');
			}
			else if (~classlist.indexOf("colorado")) {
				$('.colorado').addClass('hovered');
			}
			else if (~classlist.indexOf("dominikana")) {
				$('.dominikana').addClass('hovered');
			}
			else if (~classlist.indexOf("mexico")) {
				$('.mexico').addClass('hovered');
			}
			else if (~classlist.indexOf("montana")) {
				$('.montana').addClass('hovered');
			}
		}
	},
	function () {
		timer = setTimeout(function () {
			$('#custom-map span').removeClass('hovered');
		}, 300)
	});

});
