chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      chrome.storage.local.set({ "hidden": [] }, function() {
        console.log('hidden elemets ememory crated');
    });
    }else if(details.reason == "update"){
        console.log("Updated!");
    }
  });