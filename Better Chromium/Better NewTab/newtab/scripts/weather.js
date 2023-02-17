function weather_get(latitude, longitude) {
    if (sessionStorage.getItem("weather_temp")) {
        var city = sessionStorage.getItem("weather_city")
        var country = sessionStorage.getItem("weather_country")
        var description = sessionStorage.getItem("weather_desc")
        var feels_like = sessionStorage.getItem("weather_feels")
        var humidity = sessionStorage.getItem("weather_hum")
        var temp = sessionStorage.getItem("weather_temp")
        var id = sessionStorage.getItem("weather_id")
        weather_show(city, country, description, feels_like, humidity, temp, id)
    } else {
        chrome.storage.local.get(["better_chromium_weather_api_key"]).then((result) => {
            let api_key = result.better_chromium_weather_api_key
            console.log(window.api_key)
            let api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude +'&lon=' + longitude +'&appid=' + api_key;
            console.log(api)
            fetch(api).then(response => response.json()).then(result => weather_details(result))
        })
        
    }
}
function weather_details(info) {
    console.log(info)
    const city = info.name
    const country = info.sys.country
    const {description, id} = info.weather[0]
    var {feels_like, humidity, temp} = info.main
    temp = Math.round(temp - 273.15)
    feels_like = Math.round(feels_like - 273.15)
    weather_show(city, country, description, feels_like, humidity, temp, id)
    sessionStorage.setItem("weather_temp", temp);
    sessionStorage.setItem("weather_city", city);
    sessionStorage.setItem("weather_country", country);
    sessionStorage.setItem("weather_desc", description);
    sessionStorage.setItem("weather_hum", humidity);
    sessionStorage.setItem("weather_feels", feels_like);
    sessionStorage.setItem("weather_id", id);

}
function weather_show(city, country, description, feels_like, humidity, temp, id) {
    var temp_out = document.getElementById("weather_temp")
    var des_out = document.getElementById("weather_desc")
    var loc_out = document.getElementById("weather_loc")
    var feels_out = document.getElementById("weather_feels_like")
    var hum_out = document.getElementById("weather_humidity")
    temp_out.innerHTML = temp + '&#176 C'
    des_out.innerHTML = description
    loc_out.innerHTML = city + " " + country
    feels_out.innerHTML += feels_like + '&#176 C'
    hum_out.innerHTML += humidity + '%'
    if (id >= 200 && id <= 232) {
        document.getElementById("weather_icon").src = "weather_icons/thunderstorm.svg"
    } else if (id >= 300 && id <=321) {
        document.getElementById("weather_icon").src = "weather_icons/drizzle.svg"
    } else if (id >=500 && id <= 531) {
        document.getElementById("weather_icon").src = "weather_icons/rain.svg"
    } else if (id >= 600 && id <= 622) {
        document.getElementById("weather_icon").src = "weather_icons/snow.svg"
    } else if (id >=700 && id <= 781) {
        document.getElementById("weather_icon").src = "weather_icons/atmosphere.svg"
    } else if (id == 800) {
        document.getElementById("weather_icon").src = "weather_icons/clear.svg"
    } else if (id >800) {
        document.getElementById("weather_icon").src = "weather_icons/clouds.svg"
    }
}
function weather_window_trigger() {
    if (document.getElementById("weather_app").style.top == "635px") {
        document.getElementById("weather_app").style.top = "250px"
        document.getElementById("weather_trigger").src = "weather_icons/arrows_circle_down.svg"
        document.getElementById("weather_app").style.backgroundColor = "rgba(255, 255, 255, 1)"
    } else {
        document.getElementById("weather_app").style.top = "635px"
        document.getElementById("weather_trigger").src = "weather_icons/arrows_circle_up.svg"
        document.getElementById("weather_app").style.backgroundColor = "rgba(255, 255, 255, 0.7)"
    }
}