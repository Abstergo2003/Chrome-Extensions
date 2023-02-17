window.onload = function() {
    document.getElementById("bookmarks_filter_input").addEventListener("keyup", bookmarks_filter)
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('mousedown', (e) =>{
        let id = e.target.id;
        if (id.includes("anchor") == true) {
            switch (event.which) {
                case 1:
                    console.log('Left Mouse button pressed.');
                    break;
                case 2:
                    console.log('Middle Mouse button pressed.');
                    break;
                case 3:
                    options_window_trigger(event);
                    break;
                default:
                    console.log('You have a strange Mouse!');
            }
            let tree_id = id.substring(0, id.length-7);
            console.log(tree_id)
            chrome.storage.local.set({"bookmarks_id_clicked": [tree_id, document.getElementById(id).innerText]})
        } else {
            document.getElementById("options").style.left = "-200px"
        }
    })
    document.addEventListener('mousedown', (e) =>{
        let id2 = e.target.id;
        if (id2 == "options_delete") {
            add_to_delete()
        } else if (id2 == "list_clear") {
            list_clear()
        } else if (id2 == "options_goto") {
            bookmark_goto()
        } else if (id2 == "bookmarks_delete") {
            delete_bookmarks()
        }
    })
    show_to_delete()
}