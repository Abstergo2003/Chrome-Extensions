// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
  if(details.reason == "install"){
    let titles = ["Stwórz notatkę"];
    let notes = ["Tu możesz bezproblemowo edytować swoją notatkę"]
    chrome.storage.local.set({ "titles": titles }, function() {
      console.log("list created");
    });
    chrome.storage.local.set({ "notes": notes }, function() {
      console.log("note created");
    });
    chrome.storage.local.set({ "numb": 0 }, function() {
      console.log("numb saved");
    });
    let todo = ["create To Do list"]
    chrome.storage.local.set({ "todo": todo }, function() {
      console.log("to do created");
    });
    chrome.storage.local.set({"apps": ["First App"]}, function(){
      console.log("apps names created")
    })
    chrome.storage.local.set({"apps_links": ["https://google.com"]}, function(){
      console.log("apps link created")
    })
    chrome.storage.local.set({"to_do_tasks": ["complete this task"]}, function(){
      console.log("to do tasks created")
    })
    chrome.storage.local.set({"to_do_completion": [0]}, function(){
      console.log("to do completion set")
    })
  }else if(details.reason == "update"){
      console.log("Updated!");
  }
});