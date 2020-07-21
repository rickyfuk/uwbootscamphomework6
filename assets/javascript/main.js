$(document).ready(function () {
	// display the searchcityrecord list (function - searchRec3)
	displayRecordList();
	// when the user return to the application => check if any previous usage
	// if yes => pull the last seen city as the city input and load the result (acceptance criteria)
	if (searchCityRecordArr.length > 0) {
		inputByUser = searchCityRecordArr[0];
		// run the main function to generate the weather data and layout (function - Result4)
		showResult();
	}

	// unfocus the button when it is not click
	$('.searchCityInputBtn').mouseup(function () {
		$(this).blur();
	});

	// when the search city button is click
	$('.searchCityInputBtnJS').mousedown(function () {
		event.preventDefault();
		// hide the search list and change the arrow from up to down
		if (listState !== 'notShow') {
			$('.searchRecordList').addClass('d-none');
			listState = 'show';
			$('.dropDownIcon').removeClass('fa-angle-double-up');
			$('.dropDownIcon').addClass('fa-angle-double-down');
		}
		// locate the city name and run weather result
		inputByUser = $('#searchCityInput').val();
		// run the main function to generate the weather data and layout (function - Result4)
		showResult();
	});

	// unfocus the drop Down ICON button when it is not click
	$('.dropDownIconBtn').mouseup(function () {
		$(this).blur();
	});

	// **for mobile screen only**
	// when the down arrow button is click => show the list => change the icon to up
	// when the up arrow button is click => hide the list => change the icon to down
	$('.dropDownIconBtn').mousedown(function () {
		event.preventDefault();
		if (listState === 'notShow') {
			$('.searchRecordList').removeClass('d-none');
			listState = 'show';
			$('.dropDownIcon').removeClass('fa-angle-double-down');
			$('.dropDownIcon').addClass('fa-angle-double-up');
		} else {
			$('.searchRecordList').addClass('d-none');
			listState = 'notShow';
			$('.dropDownIcon').removeClass('fa-angle-double-up');
			$('.dropDownIcon').addClass('fa-angle-double-down');
		}
	});

	// **for mobile screen only**
	// when the search city input box on focus => show the recent search result
	// turn the up arrow to down arrow
	$('#searchCityInput').focus(function () {
		event.preventDefault();
		if (listState === 'notShow') {
			$('.searchRecordList').removeClass('d-none');
			listState = 'show';
			$('.dropDownIcon').removeClass('fa-angle-double-down');
			$('.dropDownIcon').addClass('fa-angle-double-up');
		}
	});

	// **for mobile screen only**
	// hide the list again when the input box is user click somewhere outside the search city area
	// turn the up arrow to down arrow
	$('#searchCityInput').on('pointerout', function () {
		event.preventDefault();
		if (listState !== 'notShow') {
			$('.searchRecordList').addClass('d-none');
			listState = 'notShow';
			$('.dropDownIcon').removeClass('fa-angle-double-up');
			$('.dropDownIcon').addClass('fa-angle-double-down');
		}
	});

	// **for mobile screen only**
	// hide the list again when the input box is not being focus anymore
	// => turn the up arrow to down arrow
	$('#searchCityInput').focusout(function () {
		event.preventDefault();
		if (listState !== 'notShow') {
			$('.searchRecordList').addClass('d-none');
			listState = 'notShow';
			$('.dropDownIcon').removeClass('fa-angle-double-up');
			$('.dropDownIcon').addClass('fa-angle-double-down');
		}
	});

	// when the city in the search history list is click
	$('.searchRecordList').on('click', '.searchRecordSpan', function () {
		event.preventDefault();
		// change the arrow button direction and show the list
		if (listState !== 'notShow') {
			$('.searchRecordList').addClass('d-none');
			listState = 'notShow';
			$('.dropDownIcon').removeClass('fa-angle-double-up');
			$('.dropDownIcon').addClass('fa-angle-double-down');
		}
		// take the input box text as the city name for searching the weather data
		inputByUser = $(this).text();
		// clear the input box content
		$('#searchCityInput').val('');
		// run the main function to generate the weather data and layout (function - Result4)
		showResult();
	});

	// set the search city as bold when the mouse enter the city span
	$('.searchRecordList').on('mouseenter', '.searchRecordSpan', function () {
		event.preventDefault();
		$(this).addClass('searchRecordHighlight');
	});

	// reset the search city as normal when the mouse exit the city span
	$('.searchRecordList').on('mouseleave', '.searchRecordSpan', function () {
		event.preventDefault();
		$(this).removeClass('searchRecordHighlight');
	});

	// unfocus the city name when it is not click
	$('.searchRecordList').on('mouseup', '.searchRecordSpan', function () {
		event.preventDefault();
		$('.searchRecordSpan').blur();
	});
});
