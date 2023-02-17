function save() {
    let note = document.getElementById("textbox").value;
    let title = document.getElementById("title-textbox").value;
    console.log(note);
    chrome.storage.local.get(["list"]).then ((items) =>{
      let list = items.list
      list.push(title)
      chrome.storage.local.set({"list": list}, function() {
        console.log("saved")
      })
    })
}