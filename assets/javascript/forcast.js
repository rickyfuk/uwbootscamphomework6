// function Forcast1 - look up the weather for the city from the database
function forcastWeather(lat, lon, APIKey) {
	// create a div for the forcast main header
	var forcastHeader = $('<div>');
	// add class to the forcast main header
	$(forcastHeader).addClass('col-12 row forcastRow');
	// append the forcast header to the showResult container
	$('.showResult').append(forcastHeader);

	// create a div for the forcast main header row
	var forcastHeaderRow = $('<div>');
	// add class to the forcast main header row
	$(forcastHeaderRow).addClass('col-12 my-3');
	// append the forcast header to the pre-set row
	$('.forcastRow').append(forcastHeaderRow);

	// create the h2 tag for the header
	var forcastHeaderH2 = $('<h2>');
	// add the text for the h2 tag
	$(forcastHeaderH2).attr('id', 'forcastHead');
	// add the text for the h2 tag
	$(forcastHeaderH2).text('5-Days Forcast');
	// append the h2 tag to forcastHeader div
	$(forcastHeaderRow).append(forcastHeaderH2);

	// Here we are building the URL we need to query the database
	var queryURLForcast =
		'https://api.openweathermap.org/data/2.5/onecall?lat=' +
		lat +
		'&lon=' +
		lon +
		'&exclude=current,minutely,hourly&appid=' +
		APIKey;

	// use ajax to call the city weather deatils
	$.ajax({
		url: queryURLForcast,
		method: 'GET',
	}).then(function (response) {
		var finalForcastDate = [];
		var iconCode = [];
		var imgURL = [];
		var iconDescription = [];
		var focasticonImage = [];
		var finalForcastTemp = [];
		var finalForcastHum = [];

		// inside the for loop to repeat the forcast 5 times
		for (i = 1; i < 6; i++) {
			// convert the time from Unix time to normal calender time (function - Result1)
			finalForcastDate[i] = timeConverter(
				response.daily[i].dt + response.timezone_offset
			);

			// create a div for the forcast result container
			var forcastResultDiv = $('<div>');
			// add class to the forcast result container
			$(forcastResultDiv).addClass(
				'forcastResult col-12 mb-3 mr-lg-3 col-lg-2 pt-lg-2'
			);
			$(forcastResultDiv).addClass('forcast' + i);
			// append the forcast result Div to the
			$('.forcastRow').append(forcastResultDiv);

			// create a div for the row inside the forcast result row Div
			var forcastResultRow1 = $('<div>');
			// add class for forcast result row div
			$(forcastResultRow1).addClass('row');
			// append the forcast date header to the
			$(forcastResultDiv).append(forcastResultRow1);

			// create a div for the forcast result date
			var forcastResultDate = $('<div>');
			// add class for forcast result date div
			$(forcastResultDate).addClass(
				'forcastResultDetail forcastDate col-3 col-lg-12'
			);
			// add the id forcast result date div
			$(forcastResultDate).attr('id', 'forcastDate' + i);
			// append the forcast result Date to the forcast result row
			$(forcastResultRow1).append(forcastResultDate);
			// add the date to forcast result date div
			$('#forcastDate' + i).text(finalForcastDate[i]);

			// create a div for the forcast result icon
			var forcastResultIcon = $('<div>');
			// add class for forcast result icon div
			$(forcastResultIcon).addClass(
				'forcastResultDetail forcastIcon col-2 px-0 col-lg-12'
			);
			// add the id forcast result icon div
			$(forcastResultIcon).attr('id', 'forcastIcon' + i);
			// append the forcast result Icon div to forcastResultRow1 div
			$(forcastResultRow1).append(forcastResultIcon);
			// prepare all the img information for the img tag
			iconCode[i] = response.daily[i].weather[0].icon;
			imgURL[i] = 'http://openweathermap.org/img/wn/' + iconCode[i] + '.png';
			iconDescription[i] = response.daily[i].weather[0].description;
			// Create an img tag to hold the weather icon inside the result icon div
			focasticonImage[i] = $('<img>').attr({
				src: imgURL[i],
				alt: iconDescription[i],
			});
			// append the forcast result Icon to the div
			$(forcastResultIcon).append(focasticonImage[i]);

			// create a div for the forcast result temp
			var forcastResultTemp = $('<div>');
			// add class for forcast result temp div
			$(forcastResultTemp).addClass(
				'forcastResultDetail forcastTemp px-0 px-lg-3 col-3 col-lg-12'
			);
			// add the id forcast result temp div
			$(forcastResultTemp).attr('id', 'forcastTemp' + i);
			// append the forcast result temp to the forcast result row
			$(forcastResultRow1).append(forcastResultTemp);
			// Convert the temp to fahrenheit °F
			var tempF = (response.daily[i].temp.day - 273.15) * 1.8 + 32;
			// round the temp to 1 decimal place
			finalForcastTemp[i] = Math.round(tempF * 10) / 10;
			// add the tempurture to forcast result temp div
			$('#forcastTemp' + i).html(
				' Temperture : <br/>' + finalForcastTemp[i] + ' °F'
			);

			// create a div for the forcast result humidity
			var forcastResultHum = $('<div>');
			// add class for forcast result temp div
			$(forcastResultHum).addClass(
				'forcastResultDetail forcastHum px-0 px-lg-3 col-3 col-lg-12'
			);
			// add the id forcast result hum div
			$(forcastResultHum).attr('id', 'forcastHum' + i);
			// append the forcast result hum to the forcast result row
			$(forcastResultRow1).append(forcastResultHum);
			// add the hum figure to forcast result hum div
			finalForcastHum[i] = response.daily[i].humidity;
			$('#forcastHum' + i).html(
				' Humidity : <br/>' + finalForcastHum[i] + ' %'
			);
		}
	});
}
