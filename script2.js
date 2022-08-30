var cityArr = [];
var city = "";
var lat = "";
var lon = "";


$("#searchBtn").on("click", getUserInput);
$(document).on("click", ".selected", getCities);

cityHistory();

function getCities() {
    var city = $(this)[0].innerHTML;
    getWeather(city);
}

function getUserInput(event) {
    event.preventDefault();
    $("previousSearches").empty();

    var city = $(".form-control").val();
    cityArr.push(city);
    localStorage.setItem("cities", JSON.stringify(cityArr));
    var cityHistoryList = $("<div>").text(city).addClass("selected");
    $("#cityHistory").append(cityHistoryList);
    $("#searchInput").val("");


    getWeather(city);
}

function cityHistory() {
    cityArr = JSON.parse(localStorage.getItem("cities"));

    if (cityArr == null) {
    cityArr = [];
     }

    for (var i = 0; i < cityArr.length; i++) {
        var displayCityHistory = cityArr[i];
        var cityHistoryList = $("<div>").text(displayCityHistory).addClass("selected"); 
        $("#cityHistory").append(cityHistoryList);
    }
}

var apiKey = "1ff0f6823d723403dabe8415bdcb12e3";
    

    function getWeather(city) {
     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    

        $.ajax({
            url: queryURL,
            method: "GET",
            success: function(response) {
                console.log(queryURL);
                console.log(response);
    

                function date_format(dt_string){
                    var date = new Date(dt_string.dt*1000);
                    return date.toDateString();
                    }

                    $("#previousSearches").empty();

                    var currentEvent= response.list[0];

                    $(".currentCity").html("<h3>" + response.city.name + " " + date_format(currentEvent) + "</h3>").append(
                        $('<img src=" '+ "http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+"@2x.png" +' "/>')); 
                    $(".windSpeed").text("Wind Speed: " + currentEvent.wind.speed + " mph");
                    $(".humidity").text("Humidity: " + currentEvent.main.humidity + " %");
                    $(".temperature").text(temp_trans(currentEvent));
                
                    getUVindex(response.city.coord.lat, response.city.coord.lon);

                    for (i = 0; i < 5; i++) {
                        currentEvent.response.list[i];
                        $("#"+ i + "dayForecast").text(date_format(currentEvent));
                        $("#"+ i + "dayIcon").empty().append($('<img src=" '+ "http://openweathermap.org/img/wn/"+currentEvent.weather[0].icon+".png" +' "/>'));
                        $("#"+ i + "dayHumidity").text("Humidity: " + currentEvent.main.humidity + " %");
                        $("#"+ i + "dayTemperature").text(temp_trans(currentEvent));
    
                        }
                  }
            });           
    } 
    

                    




// $(document).ready(function(){


    
    
    // ******************************************* GET UVI INDEX API CALL ******************************************* //              
    
    // Using lat and long with get uvIndex and display on Currentweather DOM
    // function getUVindex(lat,lon) {  
                 
        //Build the URL we need to get the UVI information
        // var queryURL = "https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
    
        // Here we run our AJAX call to the OpenWeatherMap API
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     })
    //         .then(function(responseUVI) {
    //             console.log(responseUVI.current.uvi)
    //             var uvIndex = responseUVI.current.uvi;
    //             //Print UVIndex
    //             $("#uvIndex").text("UV Index: " + uvIndex);
                
    //             if (uvIndex <= 2.99) {                  
    //                 uvIndex = $("#uvIndex").css({"background-color": "olivedrab", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
    //             } else if (uvIndex >= 3 & uvIndex <= 5.99) {
    //                 uvIndex = $("#uvIndex").css({"background-color": "gold", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
    //             } else if (uvIndex >= 6 & uvIndex <= 7.99) {
    //                 uvIndex = $("#uvIndex").css({"background-color": "darkorange", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
    //             } else if (uvIndex >= 8) {
    //                 uvIndex = $("#uvIndex").css({"background-color": "firebrick", "display": "block", "border-radius": "12px", "padding": "1.5%", "max-width": "20%"});
    //             };
    
    //         });
    //     } 
    // getWeather("New York");
    // }); 