$(document).ready(function () {

    var apiKey = "aec299195260a001b09706b5bfe740f7"
    var lat = "";
    var lon = "";
    var location = "";
    
    function getWeather() {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            lat = response.coord.lat;
            lon = response.coord.lon;

            $("#location").text(response.name);
            $("#date").text(moment.unix(response.dt).format("MMM Do YYYY"));
                        
            localStorage.setItem("locationname", response.name);

            getApi(lat,lon);

        })
    }

    function getApi(lat, lon) {
        var queryLatLonUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + apiKey + "&units=imperial";

        $.ajax({
            url: queryLatLonUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            $(".card-deck").empty();

            var icon = response.current.weather[0].icon;
            var iconImage = $("<img>");
            iconImage.addClass("img-fluid");
            iconImage.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png")
            $("#location").append(iconImage);

            // uvindex ranges info found through google search
            var uvi = parseInt(response.current.uvi);
            if (uvi <= 2) {
                $(".uvRange").css({"background-color":"green", "color":"white"});
            } else if (uvi >= 3 && uvi <= 5) {
                $(".uvRange").css({"background-color":"yellow"});
            } else if (uvi >= 6 && uvi <= 7) {
                $(".uvRange").css({"background-color":"orange" });
            } else if (uvi >= 8 && uvi <= 10) {
                $(".uvRange").css({"background-color":"red", "color": "white" });
            } else if (uvi >= 11) {
                $(".uvRange").css({"background-color":"blue", "color": "white" });
            }


            $("#temp").text("Temperature: " + response.current.temp + "°F");
            $("#wind").text("Wind Speed: " + response.current.wind_speed + "MPH");
            $("#humidity").text("Humidity: " + response.current.humidity + "%");
            $(".uvRange").text(response.current.uvi);


            $("#currentWeather").css({"display":"inline-block"});
            $("#currentWeather").css({"border-radius":"10px"})
            $("#currentWeather").css({"padding":"20px"})

            
            var daily = response.daily;

            for (i = 0; i < daily.length - 2; i++) {
                var dailyDate = moment.unix(daily[i].dt).format("dddd MM/DD/YY");
                var dailyTemp = daily[i].temp.day;
                var dailyWind = daily[i].wind_speed;
                var dailyHumidity = daily[i].humidity;
                var dailyIcon = daily[i].weather[0].icon;


                var dailyDiv = $("<div class='card bg-secondary text-white text-center'>")
                var newTemp = $("<p>");
                var newWind = $("<p>");
                var newHumidity = $("<p>");
                var newImage = $("<img>");
                var newDate = $("<h6>");


                newDate.text(dailyDate);
                newImage.attr("src", "https://openweathermap.org/img/wn/" + dailyIcon + "@2x.png")
                newImage.addClass("img-fluid");
                newImage.css({"width": "100%"});
                newTemp.text("Temp: " + dailyTemp + "°F");
                newWind.text("Wind: " + dailyWind + " MPH")
                newHumidity.text("Humidity: " + dailyHumidity + "%");

                dailyDiv.append(newDate);
                dailyDiv.append(newImage);
                dailyDiv.append(newTemp);
                dailyDiv.append(newWind);
                dailyDiv.append(newHumidity);
                $(".card-deck").append(dailyDiv);
                $("#five-day-forecast").css({"display":"block"});
            }

        })
    }

    function getCity(){
        cityName = localStorage.getItem("cityname");
        if (cityName !== null) {

            var searchList = $("<button>");
            searchList.addClass("list-group-item list-group-item-action");
            searchList.text(cityName);
            $("ul").prepend(searchList);
            getWeather()
        }
    }

    function searchButton() {
        cityName = $("input").val().trim();
        var searchList = $("<button>");
        searchList.addClass("list-group-item list-group-item-action");
        searchList.text(cityName);
        $("ul").prepend(searchList);
        $("input").val("");

        getWeather();
    }

    getCity();

    $("#search-form").submit(function (event) {
        event.preventDefault();
        searchButton();
    })

    $("#form-submit").click(function (event) {
        event.preventDefault();
        searchButton();
    })

    $("ul").on("click", "button", function () {
        cityName = $(this).text();
        console.log(cityName);

        getWeather();
    })

})