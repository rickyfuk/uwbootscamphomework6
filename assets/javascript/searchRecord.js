// global variable
var searchCityRecordArr = [];

// function searchRec1 - load the select date from session stroage and so it will not being lose when reload the window
function loadFromLocalStroage() {
	var storedDateResult = JSON.parse(
		localStorage.getItem('searchWeatherCityList')
	);
	if (storedDateResult !== null) {
		searchCityRecordArr = storedDateResult;
		// show the list for the large screen
		$('.searchRecordList').addClass('d-lg-block');
		// show the arrow and remove the extra padding from the container bottom
		$('.searchCity').removeClass('pb-4');
		$('.dropDownIconDiv').removeClass('d-none');
		// display the list heading
		var listTag1 = $('<li>');
		// add class and id for the list header
		$(listTag1).addClass('searchRecordHead');
		$(listTag1).attr('id', 'searchRecordHead');
		// append it to searchRecordList
		$('.searchRecordList').append(listTag1);

		// create a span to show the title 'Recent Search :'
		var listSpan1 = $('<span>');
		// add class id and dataValue for the list span
		$(listSpan1).addClass('searchRecordSpanHead');
		$(listSpan1).attr('id', 'searchRecordSpanHead');
		$(listSpan1).text('Recent Search :');
		$('.searchRecordHead').append(listSpan1);
	} else {
		// run default search with user geolocation - (function - Result 3)
		defaultResult();
	}
}

// function searchRec2 - clear duplicate and store the result to local storage
function saveToLocalStroage() {
	// 1. find the dup item
	var findDup = function (arr) {
		let dups = [];
		let compare = [];
		for (a = 0; a < arr.length; a++) {
			if (compare.includes(arr[a])) {
				dups.push(arr[a]);
			} else {
				compare.push(arr[a]);
				console.log(compare);
			}
		}
		return compare;
	};
	// 2. find the first index for the dup item
	var firstIndex = function (arr1, arr2) {
		let firstIndexArr = [];
		for (b = 0; b < arr2.length; b++) {
			let num = arr1.indexOf(arr2[b]);
			firstIndexArr.push(num);
		}
		return firstIndexArr;
	};
	// 3. only get the last time to the final array
	var removeDup = function (arr1, arr2) {
		let finalResult = [];
		for (c = 0; c < arr2.length; c++) {
			finalResult.push(arr1[arr2[c]]);
		}
		return finalResult;
	};
	// 4. return the final result for saving
	saveCityListArrayFinal = removeDup(
		searchCityRecordArr,
		firstIndex(searchCityRecordArr, findDup(searchCityRecordArr))
	);
	// 5. save it into local stroage
	localStorage.setItem(
		'searchWeatherCityList',
		JSON.stringify(saveCityListArrayFinal)
	);
}

function displayRecordList() {
	// empty the list
	$('.searchRecordList').empty();
	// load data from local stroage (function - searchRec1)
	loadFromLocalStroage();
	// display all the city in the searchCityRecordArr
	for (let j = 0; j < Math.min(searchCityRecordArr.length, 16); j++) {
		// create a list tag
		var listTag = $('<li>');
		// add class and id for the list header
		$(listTag).addClass('searchRecord');
		$(listTag).attr('id', 'searchRecord' + j);
		// append it to searchRecordList
		$('.searchRecordList').append(listTag);
		// create a span to show the city name
		var listSpan = $('<span>');
		// add class id and dataValue for the list span
		$(listSpan).addClass('searchRecordSpan btn btn-outline-primary');
		$(listSpan).attr('id', 'searchRecordSpan' + j);
		$(listSpan).attr('dataValue', searchCityRecordArr[j]);
		$(listSpan).text(searchCityRecordArr[j]);
		$('#searchRecord' + j).append(listSpan);
	}
}

function saveTheList(cityName) {
	console.log(cityName);
	// add the city name in the searchCityRecord array
	searchCityRecordArr.push(cityName);
	let sortArray = [];
	sortArray[0] = searchCityRecordArr[searchCityRecordArr.length - 1];
	// sort the list by picking the last search item to first
	for (let k = 0; k < searchCityRecordArr.length - 1; k++) {
		sortArray[k + 1] = searchCityRecordArr[k];
	}
	searchCityRecordArr = sortArray;
	console.log(searchCityRecordArr);
	// save the new array into local stroage
	saveToLocalStroage();
	// redisplay the searchcityrecord list
	displayRecordList();
}
