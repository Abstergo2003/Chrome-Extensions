function locate() {
    if (sessionStorage.getItem("weather_temp")) {
        console.log("data exist")
        weather_get()
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSucces, onError)
        } else {
            console.log("no support")
        }
    }
}
function onSucces (position){
    console.log(position)
    const {latitude, longitude} = position.coords;
    console.log(latitude)
    console.log(longitude)
    weather_get(latitude, longitude)
}
function onError (error){
    console.log(error)
}