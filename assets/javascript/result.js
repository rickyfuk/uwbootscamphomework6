// global variable
// user input value
var inputByUser;
// get the orignal list-state from html
var listState = $('.searchRecordList').attr('listShow');

// function Result1 - convert the UNIX time to a date
function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var year = a.getFullYear();
	var month = a.getMonth() + 1;
	var date = a.getDate();
	var finalDate = month + '/' + date + '/' + year;
	return finalDate;
}

// function Result2 - show UV index
function uvIndex(lat, lon, APIKey) {
	// Here we are building another URL for UV as we need to query another database
	var queryURLUV =
		'https://api.openweathermap.org/data/2.5/uvi?appid=' +
		APIKey +
		'&lat=' +
		lat +
		'&lon=' +
		lon;

	// use ajax to call the UV deatils
	$.ajax({
		url: queryURLUV,
		method: 'GET',
	}).then(function (responseUV) {
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
		// append UV Div to resultToday Div
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
}

// function Result3 - run default search when nothing has been search yet (by user geolocation)
function defaultResult() {
	// empty the previous search result
	$('.showResult').empty();

	// set the option for the geolocation
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	// when the location load successfully
	function success(pos) {
		let locatedResult = pos.coords;
		console.log('Your current position is:');
		console.log(`Latitude : ${locatedResult.latitude}`);
		console.log(`Longitude: ${locatedResult.longitude}`);

		let lat = locatedResult.latitude;
		let lon = locatedResult.longitude;

		// This is our API key
		var APIKey = '73c25ad71b995c66d607f5fb411cc629';
		// Here we are building the URL we need to query the database
		var queryURL =
			'https://api.openweathermap.org/data/2.5/weather?lat=' +
			lat +
			'&lon=' +
			lon +
			'&appid=' +
			APIKey;
		// run showResultAjax for all the Ajax and layout building (function - Result5)
		showResultAjax(queryURL, APIKey);
	}

	// when the location load unsuccessfully
	function error(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
		// Create a h2 tag to hold the city name/date/weather icon
		var todayH2 = $('<h2>');
		// add class for todayh2
		$(todayH2).addClass('resultrowMain errorMsg');
		// append todayH2 to resultToday Div
		$('.showResult').append(todayH2);

		// Create a span tag to hold the city name inside the h2 tag
		var todaySpanCity = $('<span>');
		// add id and class for todaySpanCity
		$(todaySpanCity).addClass('resultCityname display-4 mb-2 mr-lg-2');
		// add the city name to the span
		$(todaySpanCity).html(
			'Sorry, we cannot find your location <br/><br/>Please enter a city in the search box'
		);
		// append todaySpanCity into todayH2
		$('.resultrowMain').append(todaySpanCity);
	}
	// run the geolocation API
	navigator.geolocation.getCurrentPosition(success, error, options);
}

// function Result4 - look up the weather for the city from the database
function showResult() {
	// empty the previous search result
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
	// run showResultAjax for all the Ajax and layout building (function - Result5)
	showResultAjax(queryURL, APIKey);
}

// function Result5 - run the ajax fot today weather and build the today layout
function showResultAjax(queryURL, APIKey) {
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
		$(todayDiv0).addClass('col-12 resultToday containerShadow');

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
		// append todaySpanCity into todayH2
		$('.resultrowMain').append(todaySpanCity);

		// Create a span tag to hold the Date inside the h2 tag
		var todaySpanDate = $('<span>');
		// add id and class for todaySpanDate
		$(todaySpanDate).addClass('resultDate py-lg-auto');
		// add the date to the todaySpanDate
		// convert the time from Unix time to normal calender time (function - Result1)
		var finalDate = timeConverter(response.dt + response.timezone);
		$(todaySpanDate).text(' (' + finalDate + ')');
		// append the todaySpanDate into the todayH2
		$('.resultrowMain').append(todaySpanDate);

		// Create a span tag to hold the weather icon inside the h2 tag
		var todaySpanWeatherIcon = $('<span>');
		var iconCode = response.weather[0].icon;
		var imgURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
		var iconDescription = response.weather[0].description;
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

		// get the coorinate for UV and forcast query
		coorLat = response.coord.lat;
		coorLon = response.coord.lon;
		// get the official city name and put into search result list
		cityName = response.name;

		// show UV index (function - Result2)
		uvIndex(coorLat, coorLon, APIKey);
		// run forcast weather => show and build forcast weather layout (function - Forcast1)
		forcastWeather(coorLat, coorLon, APIKey);
		// save the current search into the search history array ( function - searchRec4)
		saveTheList(cityName);
	});
}
