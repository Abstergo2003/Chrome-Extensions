function delete_bookmarks() {
    chrome.storage.local.get(["bookmarks_to_delete"]).then((items) =>{
        let list = items.bookmarks_to_delete
        for (var i=0; i < list.length; i++) {
            chrome.bookmarks.remove(list[i][0], function() {
                console.log("Bookmark removed successfully!");
            })
        }
        list_clear()
        location.reload()
    })
}
function add_to_delete() {
    chrome.storage.local.get(["bookmarks_to_delete"]).then((items) =>{
        let list = items.bookmarks_to_delete
        chrome.storage.local.get(["bookmarks_id_clicked"]).then((result) =>{
            var new_id = result.bookmarks_id_clicked
            list.push(new_id)
            chrome.storage.local.set({"bookmarks_to_delete": list}) 
        })
    })
    setTimeout(show_to_delete, 100)
}
function show_to_delete() {
    chrome.storage.local.get(["bookmarks_to_delete"]).then((items) =>{
        let list = items.bookmarks_to_delete
        var to_del = document.getElementById("bookmarks_to_delete")
        to_del.innerHTML = "";
        for (var i = 0; i < list.length; i++) {
            to_del.innerHTML += '<li id="' + list[i][0] +'">' + list[i][1] + '</li>'
        }
    })
}
function list_clear() {
    chrome.storage.local.set({"bookmarks_to_delete": []})
    show_to_delete()
}
