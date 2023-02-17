function bookmarks_filter() {
    var text = document.getElementById("bookmarks_filter_input").value
    $('#bookmark-tree').jstree(true).search(text);
}