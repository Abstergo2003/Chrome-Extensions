chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      chrome.storage.local.set({ "notes_titles": ["1", "2", "3"] }, function() {
        console.log("list created");
      });
      chrome.storage.local.set({ "notes_text": ["1", "2", "3"] }, function() {
        console.log("note created");
      });
      chrome.storage.local.set({ "todo": ["1", "2", "3"] }, function() {
        console.log("to do created");
      });
      chrome.storage.local.set({"painted_titles" : ["1", "2", "3"]})
      chrome.storage.local.set({"painted" : []}, function() {
        console.log("painted created")
      })
    }else if(details.reason == "update"){
        console.log("Updated!");
    }
  });