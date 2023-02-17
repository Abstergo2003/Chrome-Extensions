$(document).ready(function() {
  chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    var bookmarks = [];
    function parseNode(node) {
      var bookmark = {
        id: node.id,
        parent: node.parentId || "#",
        text: node.title
      };
      
      if (node.url) {
        bookmark.a_attr = { href: node.url };
      }
      
      if (node.url) {
        bookmark.icon = "fa fa-link";
      } else {
        bookmark.icon = "fa fa-folder";
      }
      
      bookmarks.push(bookmark);
      
      if (node.children) {
        node.children.forEach(function(child) {
          parseNode(child);
      });
      }
    }
      
    parseNode(bookmarkTreeNodes[0]);
      
      $('#bookmark-tree').jstree({
        'core': {
          'data': bookmarks
        },
        "plugins" : ["themes","icons","search"],
        "themes" : {
          "icons": true
        }
      });
  });
});