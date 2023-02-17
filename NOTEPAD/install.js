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
  }else if(details.reason == "update"){
      console.log("Updated!");
  }
});