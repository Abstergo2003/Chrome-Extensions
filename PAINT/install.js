chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      chrome.storage.local.set({ "notes": [] }, function() {
        console.log("notes created");
      });
    }else if(details.reason == "update"){
        console.log("Updated!");
    }
  });