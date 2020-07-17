// function for look up the weather for the city from the database
function forcastWeather(coor) {
	// This is our API key
	APIKey = '73c25ad71b995c66d607f5fb411cc629';

	coorLat = coor[0];
	coorLon = coor[1];

	// Here we are building the URL we need to query the database
	var queryURLForcast =
		'https://api.openweathermap.org/data/2.5/onecall?lat=' +
		coorLat +
		'&lon=' +
		coorLon +
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
