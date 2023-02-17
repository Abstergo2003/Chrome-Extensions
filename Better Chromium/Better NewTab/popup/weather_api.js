window.onload = function() {
    document.getElementById("weather_api_window_trigger").addEventListener("click", weather_api_window_trigger)
    document.getElementById("weather_api_set").addEventListener("click", weather_api_set)
}
function weather_api_window_trigger() {
    document.getElementById("weather_api_window").style.top = "50px"
}
function weather_api_set() {
    var api_key = document.getElementById("weather_api_textarea").value
    chrome.storage.local.set({"better_chromium_weather_api_key" : api_key})
    document.getElementById("weather_api_window").style.top = "550px"
}