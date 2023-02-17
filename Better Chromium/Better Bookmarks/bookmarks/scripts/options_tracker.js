function options_window_trigger(event) {
    var cursorX = event.pageX;
    var cursorY = event.pageY;
    var options_window = document.getElementById("options")
    options_window.style.top = cursorY + "px"
    options_window.style.left = cursorX + "px"
}
function bookmark_goto() {
    chrome.storage.local.get(["bookmarks_id_clicked"]).then((items) =>{
        var specs = items.bookmarks_id_clicked;
        var id = specs[0] + "_anchor"
        console.log(id)
        var link = document.getElementById(id).href
        console.log(link)
        document.location.href= link
    })
}