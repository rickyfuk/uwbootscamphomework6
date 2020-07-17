var selectCity = [];
var inputByUser;

// convert the UNIX time to a date
function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var year = a.getFullYear();
	var month = a.getMonth() + 1;
	var date = a.getDate();
	var finalDate = month + '/' + date + '/' + year;
	return finalDate;
}

// function for look up the weather for the city from the database
function todayWeather() {
	$('.showResult').empty();
	// This is our API key
	var APIKey = '73c25ad71b995c66d607f5fb411cc629';

	// Here we are building the URL we need to query the database
	var queryURL =
		'https://api.openweathermap.org/data/2.5/weather?' +
		'q=' +
		inputByUser +
		'&appid=' +
		APIKey;

	// use ajax to call the city weather deatils
	$.ajax({
		url: queryURL,
		method: 'GET',
	}).then(function (response) {
		// Create a div to hold the response
		var todayDiv0 = $('<div>');
		// append the todayDiv0 to resultToday Div
		$('.showResult').prepend(todayDiv0);
		// add id and class for todayDiv1
		$(todayDiv0).addClass('col-12 resultToday');

		// Create a div to hold the response
		var todayDiv1 = $('<div>');
		// append the todayDiv1 to resultToday Div
		$('.resultToday').append(todayDiv1);
		// add id and class for todayDiv1
		$(todayDiv1).addClass('row col-12 pr-0');
		$(todayDiv1).attr('id', 'resultTodayrow');

		// Create a h2 tag to hold the city name/date/weather icon
		var todayH2 = $('<h2>');
		// add class for todayh2
		$(todayH2).addClass('resultrowMain');
		// append todayH2 to resultToday Div
		$('#resultTodayrow').append(todayH2);

		// Create a span tag to hold the city name inside the h2 tag
		var todaySpanCity = $('<span>');
		// add id and class for todaySpanCity
		$(todaySpanCity).addClass('resultCityname display-4 mb-2 mr-lg-2');
		// add the city name to the span
		$(todaySpanCity).text(response.name);
		console.log(response.name);
		// append todaySpanCity into todayH2
		$('.resultrowMain').append(todaySpanCity);

		// Create a span tag to hold the Date inside the h2 tag
		var todaySpanDate = $('<span>');
		// add id and class for todaySpanDate
		$(todaySpanDate).addClass('resultDate py-lg-auto');
		// add the date to the todaySpanDate
		var finalDate = timeConverter(response.dt);
		$(todaySpanDate).text(' (' + finalDate + ')');
		// append the todaySpanDate into the todayH2
		$('.resultrowMain').append(todaySpanDate);

		// Create a span tag to hold the weather icon inside the h2 tag
		var todaySpanWeatherIcon = $('<span>');
		iconCode = response.weather[0].icon;
		imgURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
		iconDescription = response.weather[0].description;
		var iconImage = $('<img>').attr({ src: imgURL, alt: iconDescription });
		// append the image to weather icon span
		$(todaySpanWeatherIcon).append(iconImage);
		// append the todaySpanDate into the todayH2
		$('.resultrowMain').append(todaySpanWeatherIcon);

		// create a div for the temp result
		var todayTemp = $('<div>');
		// add class for temp result
		$(todayTemp).addClass('resultDetail row col-12');
		// Convert the temp to fahrenheit °F
		var tempF = (response.main.temp - 273.15) * 1.8 + 32;
		// round the temp to 1 decimal place
		tempF = Math.round(tempF * 10) / 10;
		// add the temp to the todaytemp Div
		$(todayTemp).text(' Temperture : ' + tempF + ' °F');
		// append Temp Div to resultToday Div
		$('#resultTodayrow').append(todayTemp);

		// create a div for the feel like temp result
		var todayFeelTemp = $('<div>');
		// add class for temp result
		$(todayFeelTemp).addClass('resultDetail row col-12');
		// Convert the temp to fahrenheit °F
		var tempFeelF = (response.main.feels_like - 273.15) * 1.8 + 32;
		// round the temp to 1 decimal place
		tempFeelF = Math.round(tempFeelF * 10) / 10;
		// add the tempFeeltemp to the todayFeelTemp Div
		$(todayFeelTemp).text('Feel Like Temperture : ' + tempFeelF + ' °F');
		// append feel like Temp Div to resultToday Div
		$('#resultTodayrow').append(todayFeelTemp);

		// create a div for the humidity result
		var todayHum = $('<div>');
		// add class for temp result
		$(todayHum).addClass('resultDetail row col-12');
		// save te humidity in tempHum
		var tempHum = response.main.humidity;
		// add the tempHum to the todayHum
		$(todayHum).text('Humidity : ' + tempHum + ' %');
		// append humidity Div to resultToday Div
		$('#resultTodayrow').append(todayHum);

		// create a div for the wind speed result
		var todayWindSpeed = $('<div>');
		// add class for temp result
		$(todayWindSpeed).addClass('resultDetail row col-12');
		// save the WindSpeed in tempWS
		var tempWS = response.wind.speed;
		// add the WIndSpeed to the todayWindSpeed
		$(todayWindSpeed).text('Wind Speed : ' + tempWS + ' MPH');
		// append humidity Div to resultToday Div
		$('#resultTodayrow').append(todayWindSpeed);

		coorLat = response.coord.lat;
		coorLon = response.coord.lon;

		// Here we are building another URL for UV as we need to query another database
		var queryURLUV =
			'http://api.openweathermap.org/data/2.5/uvi?appid=' +
			APIKey +
			'&lat=' +
			coorLat +
			'&lon=' +
			coorLon;

		// use ajax to call the city weather deatils
		$.ajax({
			url: queryURLUV,
			method: 'GET',
		}).then(function (responseUV) {
			console.log(responseUV);
			// save the uv value into uvValue
			uvValue = responseUV.value;
			// round the uv value into uvValueRound
			uvValueRound = Math.round(uvValue);
			// create a div for the UV result
			var todayUV = $('<div>');
			// add class for temp result
			$(todayUV).addClass('resultDetail row col-12');
			$(todayUV).attr('id', 'resultRowUV');
			// add the UV value to the todayUV
			$(todayUV).html(
				'<span>UV index : ' +
					'<span class="resultUV">' +
					uvValue +
					'</span> </span>'
			);
			// append humidity Div to resultToday Div
			$('#resultTodayrow').append(todayUV);
			// add class for different uv index to add the color background color
			if (uvValueRound < 3) {
				$('.resultUV').addClass('uvGreen');
			} else if (uvValueRound < 6) {
				$('.resultUV').addClass('uvYellow');
			} else if (uvValueRound < 8) {
				$('.resultUV').addClass('uvOrange');
			} else if (uvValueRound < 11) {
				$('.resultUV').addClass('uvRed');
			} else {
				$('.resultUV').addClass('uvViolet');
			}
		});
	});
}
