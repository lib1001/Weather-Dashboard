var searchData = $(".search-data")
var listOfCities = []
var city
var APIKey = "1fbc52aeb967c458eff7f98fe0ac9226";
 
function saveCities() {
        localStorage.setItem("cities", JSON.stringify(listOfCities));
}
 
function renderButtons() {
    $(".buttons-view").empty();
    for (var i = 0; i < listOfCities.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-default city-btn");
        a.attr("data-name", listOfCities[i]);
        a.text(listOfCities[i]);
        $(".buttons-view").prepend(a);
    }
}
 
function displayWeather() {
 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
            $(".search-data").html("")

            var newDiv = $("<div class='cityWeather'>")
            newDiv.html("<h2>Current Weather</h2><br>")
            searchData.prepend(newDiv)
     
            var cityName = response.name
            var pOne = $("<p>").html("<h4>" + cityName + "</h4>");
            newDiv.append(pOne)
           
            var currentDate = moment().format("LLLL")
            var pDate = $("<p>").html("<i>" + currentDate + "</i>");
            newDiv.append(pDate)
            
            var windSpeed = response.wind.speed
            var pTwo = $("<p>").text("Wind Speed: " + windSpeed.toFixed(0) + " mph");
            newDiv.append(pTwo)
        
            var humidity = response.main.humidity
            var pThree = $("<p>").text("Humidity: " + humidity.toFixed(0) + "%");
            newDiv.append(pThree)
          
            var temperature = response.main.temp
            var pFour = $("<p>").text("Temperature: " + temperature.toFixed(0) + " F");
            newDiv.append(pFour)
           
            var iconImg = $("<img id = 'icon'>")
            $(".weather-icon").append(iconImg)
            var icon = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
            $('#icon').attr('src', iconurl);
          
            var lon = response.coord.lon
            var lat = response.coord.lat
          
            var uvIndexUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon
           
            $.ajax({
                url: uvIndexUrl,
                method: "GET"
            }).then(function (response) {
                var uvIndex = response.value
                var pFive = $("<p id=uvIndex>").text("UV Index: " + uvIndex);
                newDiv.append(pFive)
            })
           
            if (listOfCities.includes(response.name) === false) {
                listOfCities.push(response.name)
            }
          
            renderButtons()
            saveCities()
            display5day()
        })
};
 

function display5day() {

    var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial"

    $(".fiveDayHeader").html("<h3>5 Day Forecast</h3>")

    $.ajax({
        url: forcastURL,
        method: "GET"
    })
        .then(function (response) {
 
            var day1date = new Date(response.list[2].dt_txt)
            var day2date = new Date(response.list[10].dt_txt)
            var day3date = new Date(response.list[18].dt_txt)
            var day4date = new Date(response.list[26].dt_txt)
            var day5date = new Date(response.list[34].dt_txt)
 
            var day1temp = (response.list[2].main.temp * (9 / 5) - 459.67).toFixed(0)
            var day2temp = (response.list[10].main.temp * (9 / 5) - 459.67).toFixed(0)
            var day3temp = (response.list[18].main.temp * (9 / 5) - 459.67).toFixed(0)
            var day4temp = (response.list[26].main.temp * (9 / 5) - 459.67).toFixed(0)
            var day5temp = (response.list[34].main.temp * (9 / 5) - 459.67).toFixed(0)
 
            var day1hum = (response.list[2].main.humidity).toFixed(0)
            var day2hum = (response.list[10].main.humidity).toFixed(0)
            var day3hum = (response.list[18].main.humidity).toFixed(0)
            var day4hum = (response.list[26].main.humidity).toFixed(0)
            var day5hum = (response.list[34].main.humidity).toFixed(0)
 
            var day1icon = "http://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png";
            var day2icon = "http://openweathermap.org/img/w/" + response.list[10].weather[0].icon + ".png";
            var day3icon = "http://openweathermap.org/img/w/" + response.list[18].weather[0].icon + ".png";
            var day4icon = "http://openweathermap.org/img/w/" + response.list[26].weather[0].icon + ".png";
            var day5icon = "http://openweathermap.org/img/w/" + response.list[34].weather[0].icon + ".png";
 
            $('.day1-icon').attr('src', day1icon);
            $('.day2-icon').attr('src', day2icon);
            $('.day3-icon').attr('src', day3icon);
            $('.day4-icon').attr('src', day4icon);
            $('.day5-icon').attr('src', day5icon);
 
            $(".day1").html("<br/>" + "<b>" + moment(day1date).format("MM/DD/YYYY") + "</b>" + "</br>" + "Temp: " + day1temp + " F </br>" + "Humidity: " + day1hum + "%")
            $(".day2").html("<br/>" + "<b>" + moment(day2date).format("MM/DD/YYYY") + "</b>" + "</br>" + "Temp: " + day2temp + " F </br>" + "Humidity: " + day2hum + "%")
            $(".day3").html("<br/>" + "<b>" + moment(day3date).format("MM/DD/YYYY") + "</b>" + "</br>" + "Temp: " + day3temp + " F </br>" + "Humidity: " + day3hum + "%")
            $(".day4").html("<br/>" + "<b>" + moment(day4date).format("MM/DD/YYYY") + "</b>" + "</br>" + "Temp: " + day4temp + " F </br>" + "Humidity: " + day4hum + "%")
            $(".day5").html("<br/>" + "<b>" + moment(day5date).format("MM/DD/YYYY") + "</b>" + "</br>" + "Temp: " + day5temp + " F </br>" + "Humidity: " + day5hum + "%")
        })
}
 

$("#run-search").on("click", function () {
    city = $("#search-term").val()
    displayWeather()
    display5day()
})
 

$(document).on("click", ".city-btn", function () {
    city = $(this).attr("data-name");
    displayWeather()
    display5day()
})
 

$("#clear-search").on("click", function (){
localStorage.clear("cities")
listOfCities = []
$(".buttons-view").empty()

location.reload()
})
 
$(document).ready(function() {
    if(localStorage.getItem("cities") !== null) {
        var savedCity = localStorage.getItem("cities");
        var pushCities = JSON.parse(savedCity)
        listOfCities = listOfCities.concat(pushCities)
    }
    renderButtons()
    })




















// var apiKey = "1fbc52aeb967c458eff7f98fe0ac9226";
// var searchHistory = [];
// var searchButton = $('search')
// var city = "Boston"
// var today = moment().format('MMMM Do YYYY');

// searchButton.on('click', function(event) {
//   event.preventDefault();
//   // go over this
//   city = $(this).parent('btnParent').sibling('.textVal').val().trim();

//   if (city === '') {
//     return;
//   }
//   searchHistory.push(city);

//   localStorage.setItem('city', JSON.stringify(searchHistory));
//   fiveDayEl.empty();
//   getSearchHistory();
//   getWeather();
// })

// // var date = moment().format('MMMM Do YYYY'); //today
// // var dateTime = moment().format('YYYY-MM-DD HH:MM:SS') //future


// // var cityHist = [];
// // $('.search').on('click', function(event) {
// //   event.preventDefault();
// //   city = $(this).parent('btnPar').siblings('.textVal').val().trim();
// //   //try way of saying from 23
// //   if (city === "") {
// //     return;
// //   };
// //   cityHist.push(city);

// //   localStorage.setItem('city', JSON.stringify(cityHist));
// //   fiveForecastEl.empty();
// //   getHistory();
// //   getWeatherToday();
// // })


// var contHistEl = $('.cityHist');
// function getHistory() {
// 	contHistEl.empty();

// 	for (var i = 0; i < cityHist.length; i++) {

// 		var rowEl = $('<row>');
// 		var btnEl = $('<button>').text(`${cityHist[i]}`)

// 		rowEl.addClass('row histBtnRow');
// 		btnEl.addClass('btn btn-outline-secondary histBtn');
// 		btnEl.attr('type', 'button');

// 		contHistEl.prepend(rowEl);
// 		rowEl.append(btnEl);
// 	} if (!city) {
// 		return;
// 	}
// 	//Allows the buttons to start a search as well
// 	$('.histBtn').on("click", function (event) {
// 		event.preventDefault();
// 		city = $(this).text();
// 		fiveForecastEl.empty();
// 		getWeatherToday();
// 	});
// };

// var cardTodayBody = $('.cardBodyToday')
// //Applies the weather data to the today card and then launches the five day forecast
// function getWeatherToday() {
// 	var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

// 	$(cardTodayBody).empty();

// 	$.ajax({
// 		url: getUrlCurrent,
// 		method: 'GET',
// 	}).then(function (response) {
// 		$('.cardTodayCityName').text(response.name);
// 		$('.cardTodayDate').text(today);
// 		//Icons
// 		$('.icons').attr('src', `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
// 		// Temperature
// 		var pEl = $('<p>').text(`Temperature: ${response.main.temp} °F`);
// 		cardTodayBody.append(pEl);
// 		//Feels Like
// 		var pElTemp = $('<p>').text(`Feels Like: ${response.main.feels_like} °F`);
// 		cardTodayBody.append(pElTemp);
// 		//Humidity
// 		var pElHumid = $('<p>').text(`Humidity: ${response.main.humidity} %`);
// 		cardTodayBody.append(pElHumid);
// 		//Wind Speed
// 		var pElWind = $('<p>').text(`Wind Speed: ${response.wind.speed} MPH`);
// 		cardTodayBody.append(pElWind);
// 		//Set the lat and long from the searched city
// 		var cityLon = response.coord.lon;
// 		// console.log(cityLon);
// 		var cityLat = response.coord.lat;
// 		// console.log(cityLat);

// 		var getUrlUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${apiKey}`;

// 		$.ajax({
// 			url: getUrlUvi,
// 			method: 'GET',
// 		}).then(function (response) {
// 			var pElUvi = $('<p>').text(`UV Index: `);
// 			var uviSpan = $('<span>').text(response.current.uvi);
// 			var uvi = response.current.uvi;
// 			pElUvi.append(uviSpan);
// 			cardTodayBody.append(pElUvi);
// 			//set the UV index to match an exposure chart severity based on color 
// 			if (uvi >= 0 && uvi <= 2) {
// 				uviSpan.attr('class', 'green');
// 			} else if (uvi > 2 && uvi <= 5) {
// 				uviSpan.attr("class", "yellow")
// 			} else if (uvi > 5 && uvi <= 7) {
// 				uviSpan.attr("class", "orange")
// 			} else if (uvi > 7 && uvi <= 10) {
// 				uviSpan.attr("class", "red")
// 			} else {
// 				uviSpan.attr("class", "purple")
// 			}
// 		});
// 	});
// 	getFiveDayForecast();
// };

// var fiveForecastEl = $('.fiveForecast');

// function getFiveDayForecast() {
// 	var getUrlFiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

// 	$.ajax({
// 		url: getUrlFiveDay,
// 		method: 'GET',
// 	}).then(function (response) {
// 		var fiveDayArray = response.list;
// 		var myWeather = [];
// 		//Made a object that would allow for easier data read
// 		$.each(fiveDayArray, function (index, value) {
// 			testObj = {
// 				today: value.dt_txt.split(' ')[0],
// 				time: value.dt_txt.split(' ')[1],
// 				temp: value.main.temp,
// 				feels_like: value.main.feels_like,
// 				icon: value.weather[0].icon,
// 				humidity: value.main.humidity
// 			}

// 			if (value.dt_txt.split(' ')[1] === "12:00:00") {
// 				myWeather.push(testObj);
// 			}
// 		})
// 		//Inject the cards to the screen 
// 		for (var i = 0; i < myWeather.length; i++) {

// 			var divElCard = $('<div>');
// 			divElCard.attr('class', 'card text-white bg-primary mb-3 cardOne');
// 			divElCard.attr('style', 'max-width: 200px;');
// 			fiveForecastEl.append(divElCard);

// 			var divElHeader = $('<div>');
// 			divElHeader.attr('class', 'card-header')
// 			var m = moment(`${myWeather[i].today}`).format('MM-DD-YYYY');
// 			divElHeader.text(m);
// 			divElCard.append(divElHeader)

// 			var divElBody = $('<div>');
// 			divElBody.attr('class', 'card-body');
// 			divElCard.append(divElBody);

// 			var divElIcon = $('<img>');
// 			divElIcon.attr('class', 'icons');
// 			divElIcon.attr('src', `https://openweathermap.org/img/wn/${myWeather[i].icon}@2x.png`);
// 			divElBody.append(divElIcon);

// 			//Temp
// 			var pElTemp = $('<p>').text(`Temperature: ${myWeather[i].temp} °F`);
// 			divElBody.append(pElTemp);
// 			//Feels Like
// 			var pElFeel = $('<p>').text(`Feels Like: ${myWeather[i].feels_like} °F`);
// 			divElBody.append(pElFeel);
// 			//Humidity
// 			var pElHumid = $('<p>').text(`Humidity: ${myWeather[i].humidity} %`);
// 			divElBody.append(pElHumid);
// 		}
// 	});
// };

// //Allows for the example data to load for Denver
// function initLoad() {

// 	var cityHistStore = JSON.parse(localStorage.getItem('city'));

// 	if (cityHistStore !== null) {
// 		cityHist = cityHistStore
// 	}
// 	getHistory();
// 	getWeatherToday();
// };

// initLoad();