// function for look up the weather for the city from the database
function forcastWeather(lat, lon, APIKey) {
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
		console.log(response);
	});
}
