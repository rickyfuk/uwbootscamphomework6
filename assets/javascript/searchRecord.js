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
	// part 1 - set an array var for finding the dup item
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
	// part 2 - set an array var for finding the first index for the dup item
	var firstIndex = function (arr1, arr2) {
		let firstIndexArr = [];
		for (b = 0; b < arr2.length; b++) {
			let num = arr1.indexOf(arr2[b]);
			firstIndexArr.push(num);
		}
		return firstIndexArr;
	};

	// part 3 - set an array var for only get the first time to the final array
	var removeDup = function (arr1, arr2) {
		let finalResult = [];
		for (c = 0; c < arr2.length; c++) {
			finalResult.push(arr1[arr2[c]]);
		}
		return finalResult;
	};

	// part 4 - set a var for return the final result for saving
	var saveCityListArrayFinal = removeDup(
		searchCityRecordArr,
		firstIndex(searchCityRecordArr, findDup(searchCityRecordArr))
	);
	// part5 - save it into local stroage
	localStorage.setItem(
		'searchWeatherCityList',
		JSON.stringify(saveCityListArrayFinal)
	);
}

// function searchRec3 - dispaly the result into the "search Record" list
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

// function searchRec4 - put the city name (input by user) into an sort array
// => save the sort array into local stroage
function saveTheList(cityName) {
	// add the city name in the searchCityRecord array
	searchCityRecordArr.push(cityName);
	// set the sort array
	let sortArray = [];
	// put the last item to the first place inside the array
	sortArray[0] = searchCityRecordArr[searchCityRecordArr.length - 1];
	// put the rest of the item into the next postion to their orignal one
	for (let k = 0; k < searchCityRecordArr.length - 1; k++) {
		sortArray[k + 1] = searchCityRecordArr[k];
	}
	// change the searchCityRecordArr content as the sortArray
	searchCityRecordArr = sortArray;
	// save the new array into local stroage (function - searchRec2)
	saveToLocalStroage();
	// redisplay the searchcityrecord list (function - searchRec3)
	displayRecordList();
}
