chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      chrome.storage.local.set({ "bookmarks_to_delete": [] }, function() {
        console.log("empty list to delete created");
      });
      chrome.storage.local.set({ "bookmarks_id_clicked": "" }, function() {
        console.log("empty list of clicked created");
      });
    }else if(details.reason == "update"){
        console.log("Updated!");
    }
  });