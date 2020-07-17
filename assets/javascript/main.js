$(document).ready(function () {
	// A default array to keep all the city selected
	// var selectCity = [];
	// var inputByUser;
	var listState = $('.searchRecordList').attr('listShow');
	console.log(listState);

	// set the search button as white when the mouse enter the search button area
	$('.searchCityInputBtn').mouseenter(function () {
		$('.searchCityInputBtn').remove('.searchCityInputBtnImg1');
		$('.searchCityInputBtn').html(
			'<img class="searchCityInputBtnImg2" src="../uwbootscamphomework6/assets/images/searchWhite.png" srcset="../uwbootscamphomework6/assets/images/searchWhite.svg" alt="white search icon"/>'
		);
	});

	// reset the search button as blue when the mouse exit the search button area
	$('.searchCityInputBtn').mouseleave(function () {
		$('.searchCityInputBtn').remove('.searchCityInputBtnImg2');
		$('.searchCityInputBtn').html(
			'<img class="searchCityInputBtnImg1" src="../uwbootscamphomework6/assets/images/search.png" srcset="../uwbootscamphomework6/assets/images/search.svg" alt="blue search icon"/>'
		);
	});

	// unfocus the button when it is not click
	$('.searchCityInputBtn').mouseup(function blurInput() {
		$('.searchCityInputBtn').blur();
	});

	// when the search city button is click
	$('.searchCityInputBtn').click(function () {
		// locate the city name
		inputByUser = $('#searchCityInput').val();
		console.log(inputByUser);
		todayWeather();
	});

	$('.searchCityInputBtn').click(function () {
		if (listState !== 'notShow') {
			$('.searchRecordList').addClass('d-none');
			listState = 'notShow';
		}
	});

	// when the search city input box on focus in small screen size
	// => take out the display none for showing the recent search result
	$('#searchCityInput').focus(function () {
		if (listState === 'notShow') {
			$('.searchRecordList').removeClass('d-none');
			listState = 'show';
		}
		// set the search city as bold when the mouse enter the city span
		$('.searchRecordSpan').mouseenter(function () {
			$(this).addClass('searchRecordHighlight');
		});
	});

	// hide the list again when the input box is user click somewhere outside the search city area
	$('.searchCity').mouseleave(function () {
		if (listState !== 'notShow') {
			$('.searchRecordList').addClass('d-none');
			listState = 'notShow';
		}
	});

	// when the city in the search history list is click
	$('.searchRecordSpan').click(function () {
		if (listState !== 'notShow') {
			$('.searchRecordList').addClass('d-none');
			listState = 'notShow';
		}
		inputByUser = $(this).text();
		console.log(inputByUser);
		todayWeather();
	});

	// set the search city as bold when the mouse enter the city span
	$('.searchRecordSpan').mouseenter(function () {
		$(this).addClass('searchRecordHighlight');
	});

	// reset the search city as normal when the mouse exit the city span
	$('.searchRecordSpan').mouseleave(function () {
		$(this).removeClass('searchRecordHighlight');
	});

	// unfocus the city name when it is not click
	$('.searchRecordSpan').mouseup(function blurInput() {
		$('.searchRecordSpan').blur();
	});
});
