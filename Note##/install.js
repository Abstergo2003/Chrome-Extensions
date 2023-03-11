var notes = [
  {
    "title": "1",
    "text":"1"
  },
  {
    "title": "2",
    "text":"2"
  },
  {
    "title": "3",
    "text":"3"
  }
]
var paintings = [
  {
    "title": "1",
    "canvas":""
  },
  {
    "title": "2",
    "canvas":""
  },
  {
    "title": "3",
    "canvas":""
  }
]

chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      chrome.storage.local.set({ "notes": notes }, function() {
        console.log("notes created");
      });
      chrome.storage.local.set({"paintings" : paintings}, function() {
        console.log("paintings created")
      })
    }else if(details.reason == "update"){
        console.log("Updated!");
    }
  });