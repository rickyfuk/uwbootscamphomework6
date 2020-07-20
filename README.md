# Project Name

Homework 6 - Weather Dashboard

# Table of contents

- [Project Name](#project-name)
- [Table of contents](#table-of-contents)
- [General info](#general-info)
- [Screenshots](#screenshots)
- [Features](#features)
- [Code Style](#code-style)
  - [<span style="color: rgb(220, 105, 1);"> Description for the code</span>](#description-for-the-code)
- [Technology](#technology)
- [Local File Description](#local-file-description)
- [Code Example](#code-example)
- [Test](#test)
- [Status](#status)
- [Future Plan](#future-plan)
- [Create By](#create-by)

# General info

This project is to bulid a weather dashboard where allow the user to check with the weather of different location when the user need to travel to different places around the world.

Apart from the same day weather infomraton, the user can obtain a five days weather forcast for any cities around the world.

- All the weather infomation provided by [OpenWeather](https://openweathermap.org/)

Please visit [https://rickyfuk.github.io/uwbootscamphomework6/](https://rickyfuk.github.io/uwbootscamphomework6/) for the site.

For the feature of the site, please visit the [Features](#features) section for more details.

# Screenshots

![screenshot](https://github.com/rickyfuk/uwbootscamphomework6/blob/master/assets/images/screenshot.PNG?raw=true)

# Features

In this project, the following features have apply to the site:

1. Favicon have been added for the page
2. The user can enter any city name and press the searh button to look for the weather for that city
3. The weather information include the same day weather and a five days forcast. the table below will show the list of the infomation included for each area:
   | Infomation | Same Day Weather | 5 Days Forcast |
   | :----------: | :--------------------------------: | :----------: |
   | City Name | Yes | No |
   | Date | Yes | Yes |
   | Weather Icon | Yes | Yes |
   | Temperture | Yes | Yes |
   | Feel Like Temperture | Yes | No |
   | Humidity | Yes | Yes |
   | Wind Speed | Yes | No |
   | UV index\*^ | Yes | No |
   - \*Note: UV Color Indicator will determine by the rounded UV index.
   - ^Note: UV Index will include a color background for an indicator and the color scale is refer to the standard of [World Health Organization](https://www.who.int/).Please refer to the details as below:
     | UV INDEX | Level | Color indicator |
     | :----------: | :--------------------------------: | :----------: |
     | 0-2 | Low | Green - rgb(62, 167, 45) |
     | 3-5 | Medium | Yellow - rgb(255, 243, 0) |
     | 6-7 | High | Orange - rgb(241, 139, 0) |
     | 8-10 | Very High | Red - rgb(229, 50, 16)|
     | 11+ | Extreme| Violet - rgb(181, 103, 164) |
4. The default dashboard will show the weather of the city where the user located in.
5. The user can choose a city from the recent search result by clicking the cities name in the list
   - Only last 15 cities record will be shown on the list
   - The weather infomration for the last seen city will go to the top of the list
6. For the mobile user, the recent search list will not shown until the following condition take place
   1. At least one city have been searched
   2. The users click the down arrow (The user can always click the up arrow to hide the list)
      - Down Arrow Sample ![Down arrow](assets/images/downArrowSample.png)
      - Up Arrow Sample ![Up arrow](assets/images/upArrowSample.png)
   3. The users click the input box for the searching a new the city
      - The list will hide if the box is not being focus anymore

# Code Style

Standard

## <span style="color: rgb(220, 105, 1);"> Description for the code</span>

A general description (the commented code) for the every section on the top of the code to breifly explain the puopose of that section and some note for the section details.

  <div>
  <img src="assets/images/descriptionexample.png" alt="Description Example">
   *example for the section description*
  </div>

For easier reference, every function has assigned a location name in the comment (e.g. "function - Result5" for the example below)
![functionlocation](assets/images/functionlocation.png)

Also, the location of the function will place inside its description when it is executed
![functionlocation2](assets/images/functionlocation2.png)

Below is the further explanation for the description:

| function name start with | location of the function |
| :----------------------: | :----------------------: |
|        searchRec         |     searchRecord.js      |
|          Result          |        result.js         |
|         Forcast          |        forcast.js        |

Please note that all the function is in a numbered ordered.

# Technology

The following technology have been used for this project:

1. [HTML](https://whatwg.org/)
2. [CSS](https://www.w3.org/Style/CSS/)
3. [Bootstrap](https://getbootstrap.com/)
4. [Fontawesome](https://fontawesome.com/)
5. [JavaScript](https://www.javascript.com/)
6. [JQUERY](https://jquery.com/)
7. [JSON](https://www.json.org/json-en.html)
8. [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)
9. [API](https://en.wikipedia.org/wiki/Application_programming_interface)
   1. [Openweather](https://openweathermap.org/api)

# Local File Description

Below are the description for all local files:

1. HTML:
   1. index.html - The main structure for the application
2. CSS:
   1. reset.css - to reset all the styling setting
   2. style.css - to add the local style to this application
3. JavaScript
   1. main.js - the main javascript for the eventlisten setup on the main framework
   2. result.js - the javascript for loading the "Today weather" data into the application and bulid the layout for "Today" section
   3. forcast.js - the javascript for loading the"Forcast weather" data into the application and bulid the layout for the "Forcast" section
   4. searchRecord.js - the javascript for displaying the previous search record on the Recent Search list.

# Code Example

Below are some example for the code has been used and the corresponding outcome:

1. To add an event listener by Jquery to a dynamic gernerate element, an another inner function is required

   ```Javascript
     // reset the search city as normal when the mouse exit the city span
        $('.searchRecordList').on('mouseleave', '.searchRecordSpan', function () {
            event.preventDefault();
            $(this).removeClass('searchRecordHighlight');
        });
   ```

2. To make the list only show the searched city once, remove duplicate and sorted the array have done everytime when the page load and/or user search a new city

   ```Javascript
        // Part 0 - Rearrange the array order
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
   ```

   ```Javascript
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
   ```

3. The geolocation is run by the following script

   ```Javascript
        // run the geolocation API
        navigator.geolocation.getCurrentPosition(success, error, options);
   ```

# Test

1. The site have been tested by open with small/medium/large device respectively.
2. The site have been tested by a HTML validation service - [W3C](https://validator.w3.org/)

# Status

Project status: finished

# Future Plan

Plan for the future development of this site:

1. The user can click the different data box and the details weather data for that day will show up on the main box.
2. enhance the search box with an autocompleted function when the user type part of the city name
3. Set up an option page for the user to choose the parameter (e.g. wind speed - MPH/Knt)
4. Connect more API with the location (e.g. news/yelp)

# Create By

Created by Chung Hei Fuk
