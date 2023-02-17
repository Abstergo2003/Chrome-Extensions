document.addEventListener('click', (e) =>{
    let id = e.target.id;
    if (id == 'save') {
        let note = document.getElementById("textbox").value;
        let title = document.getElementById("title-textbox").value;
        console.log(note);
        chrome.storage.local.get(["titles"]).then ((items) =>{
          let list = items.titles
          list.push(title)
          chrome.storage.local.set({"titles": list}, function() {
            console.log("saved")
          })
        })
        chrome.storage.local.get(["notes"]).then ((items) =>{
          let notes = items.notes
          notes.push(note)
          chrome.storage.local.set({"notes": notes}, function() {
            console.log("saved")
          })
        })

        

    } else if (id == 'reset') {
        var note = document.getElementById("textbox");
        note.value = "";
    } else {
        console.log("brak id")
    }
});
