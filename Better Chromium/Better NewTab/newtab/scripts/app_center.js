function save() {
    var name = document.getElementById("app_name").value
    var link = document.getElementById("app_link").value
    console.log(name)
    console.log(link)
    //zapisuje tytuł
    chrome.storage.local.get(["apps"]).then((items) =>{
        var names = items.apps
        names.push(name)
        chrome.storage.local.set({"apps": names}, function(){
            console.log("apps names updated")
          })
    })
    //zapisuje link
    chrome.storage.local.get(["apps_links"]).then((items) =>{
        var links = items.apps_links
        links.push(link)
        chrome.storage.local.set({"apps_links": links}, function(){
            console.log("apps links updated")
          })
    })
    document.getElementById("add-app").style.top = "1200px"
    close()
    reset_app_center()
    setTimeout(app_load, 100)
}
function close() {
    document.getElementById("add-app").style.top = "1200px"
}
function trigger_window() {
    document.getElementById("add-app").style.top = "30px"
}
function app_load() {
    chrome.storage.local.get(["apps_links"]).then((items) => {
        window.list = items.apps_links;
    })
    chrome.storage.local.get(["apps"]).then((items) => {
        var table = document.getElementById("app-center");
        let list2 = items.apps;
        for (var i = 0; i < list.length; i++) {
            table.innerHTML += '<div class="app"><a href="' + window.list[i] + '"><img src="https://s2.googleusercontent.com/s2/favicons?domain_url='+ window.list[i] +'" class="favicon"><a><br><a href="https://drive.google.com">' + list2[i] +'</a></div>';
        }
        //wczytuje icony dla add app i delete app
        table.innerHTML += '<div class="app"><a href="#"><img src="favicons/add.png" class="favicon" id="trigger_window_add_img"></a><br><a id="trigger_window_add_text" href="#">Add App</a></div>';
        table.innerHTML += '<div class="app"><a href="#"><img src="favicons/delete.png" class="favicon" id="trigger_window_remove_img"></a><br><a id="trigger_window_remove_text" href="#">Delete Apps</a></div>';
    })
}
function trigger_delete_window() {
    var app_list_window = document.getElementById("app_list")
    app_list_window.style.top = "30px";
    chrome.storage.local.get(["apps"]).then((items) =>{
        let app_list = items.apps;
        for (let i = 0; i <app_list.length; i++) {
            app_list_window.innerHTML += '<button id="' + (i +1000) + '" class="delete-b">' + app_list[i] + '</button><br>';
        }
    })
}
function close_del() {
    document.getElementById("app_list").style.top = "1200px";
    document.getElementById("app_list").innerHTML = '<button class="close" id="close-delete">X</button><br>';
}
function del(id) {
    console.log(id)
    chrome.storage.local.get(["apps"]).then((items) =>{
        window.list = items.apps;
    })
    chrome.storage.local.get(["apps_links"]).then((items) =>{
        var list2 = items.apps_links;
        window.list.splice((id-1000), 1)
        list2.splice((id-1000), 1)
        chrome.storage.local.set({"apps": window.list}, function(){
            console.log("apps updated")
          })
          chrome.storage.local.set({"apps_links": list2}, function(){
            console.log("apps links updated")
          })
    })
    document.getElementById("app_list").style.top = "1200px";
    close_del()
    reset_app_center()
    setTimeout(app_load, 100)
}
function reset_app_center() {
        document.getElementById("app-center").innerHTML = '<div class="app"><a href="https://youtube.com"><img src="favicons/yt.png" class="favicon"></a><br><a href="https://youtube.com">You Tube</a></div>                <div class="app"><a href="https://gmail.com"><img src="favicons/gmail.ico" class="favicon"></a><br><a href="https://gmail.com">Gmail</a>                </div>                <div class="app"><a href="https://drive.google.com"><img src="favicons/drive.png" class="favicon"></a><br><a href="https://drive.google.com">Google Drive</a>                </div>                <div class="app"><a href="https://google.com/maps"><img src="favicons/maps.png" class="favicon"></a><br><a href="https://google.com/maps">Google Maps</a>                </div>                <div class="app"><a href="https://pp-group.com.pl"><img src="favicons/pp.png" class="favicon"></a><br><a href="https://pp-group.com.pl">PP Group</a>                </div>                <div class="app"><a href="https://webd.pl"><img src="favicons/webd.ico" class="favicon"></a><br><a href="https://webd.pl">WebD</a>                </div>                <div class="app"><a href="https://wn26.webd.pl:2083"><img src="data:image/x-icon;base64,AAABAAEAICAAAAEAIADSAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAgAAAAIAgGAAAAc3p69AAAAplJREFUWIXt1j2IHGUYB/DfOzdnjIKFkECIVWIKvUFsIkRExa9KJCLaWAgWJx4DilZWgpDDiI0wiViIoGATP1CCEDYHSeCwUBBkgiiKURQJFiLo4d0eOxYzC8nsO9m9XcXC+8MW+3z+9/l6l2383xH+iSBpElyTdoda26xsDqp/h0CVZ3vwKm7tMBngAs7h7eRYebG6hMtMBHbMBX89vfARHprQ5U8cwdFQlIOZCVR5di1+w/wWXT/EY6EoN5NZCODuKZLDwzgSMCuBe2fwfX6QZwtpWzqfBBtLC3txF/ZhxKbBGx0EfsTJS77vwmGjlZrD4mUzUOXZjVjGI65cnTXchB8iupdDUb7QinsQZ7GzZftdQj2JVZ49iC/w6JjksIo7OnS9tiA5Vn6GtyK2+1MY5NkhfGDygVrBAxH5WkPuMjR7/3UsUFLl2Q68s4XkA3ws3v9zoSjX28Kr5wL1xrTxa6ou+f6OZGvqPg9v1wZeaUjcELE/DVfNhWFSvy/enOIZ9eq1sTokEMNLWI79oirP8g6fXpVnh7GEvY1sV/OJ4f0UhyKKk6EoX4x5pEkgXv6L6OM99YqNw/c4kXSwG5nkIfpLCynuiahW1GWeJHkfT4aiXO9atz1XcD6I6yLyHu6bIPk6Hg9FeYZ63y9EjBarPDvQ8VJ1nd9V3D4m+RncForyxFCQ4hSeahlej88Hefauurdwaufr5z/F/ZHAX6nL+mZE18e36IWiHLkFocqzW9QXcNz1+wUHxJ/f10JRPjvGP4pk/vj5L3F8AtufdD+/p6dJDknzX+05fDLGtife/766t9MRgFCUffWTudwE3AqBlVCUf0xLYGTQqzzbhydwJ3Y34g318J1tmX+DPBTlz9MS2MY2/nP8DTGaqeTDf30rAAAAAElFTkSuQmCC" type="image/x-icon" /></a><br><a href="https://wn26.webd.pl:2083">Cpanel</a>                </div>                <div class="app"><a href="https://poczta.pp-group.com.pl"><img src="favicons/pp.png" class="favicon"></a><br><a href="https://poczta.pp-group.com.pl">Poczta PP</a>                </div>                <div class="app"><a href="https://cas.usos.pw.edu.pl/cas/login?service=https%3A%2F%2Fusosweb.usos.pw.edu.pl%2Fkontroler.php%3F_action%3Dlogowaniecas%2Findex&locale=pl"><img src="favicons/usos.png" class="favicon"></a><br><a href="https://pp-group.com.pl">USOS</a>                </div>                <div class="app"><a href="https://moodle.usos.pw.edu.pl/"><img src="favicons/moodle.ico" class="favicon"></a><br><a href="https://moodle.usos.pw.edu.pl/">Moodle</a>                </div>                <div class="app"><a href="https://moodle.okno.pw.edu.pl/"><img src="favicons/okno.ico" class="favicon"></a><br><a href="https://moodle.okno.pw.edu.pl/">Moodle Okno</a>                </div>                <div class="app"><a href="https://outlook.office.com/mail/"><img src="favicons/outlook.png" class="favicon"></a><br><a href="https://outlook.office.com/mail/">USOS Mail</a>                </div>                <div class="app" ><a href="https://allegro.pl/"><img src="favicons/allegro.png" class="favicon"></a><br><a href="https://moodle.usos.pw.edu.pl/">OLX</a>                </div>                <div class="app"><a href="https://www.olx.pl/"><img src="favicons/olx.ico" class="favicon"></a><br><a href="https://pp-group.com.pl">Allegro</a>                </div>                <div class="app"><a href="https://www.morele.net/"><img src="favicons/morele.ico" class="favicon"></a><br><a href="https://wn26.webd.pl:2083">Morele.net</a>                </div>                <div class="app"><a href="https://aliexpress.com/"><img src="favicons/aliexpress.ico" class="favicon"></a><br><a href="https://poczta.pp-group.com.pl">Aliexpress</a>                </div>        </div>'
}