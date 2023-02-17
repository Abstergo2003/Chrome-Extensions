function show(id) {
    idn = Number(id)
        idn = idn - 1;
        document.getElementById("notepad-ext").innerHTML = ' <textarea id="note-title" placeholder="note1" class="title"></textarea><textarea id="note" class="note"></textarea><a id="notes_back" class="button">Back</a><a id="delete" class="button">Delete</a><a id="save" class="button">Save</a>'
        chrome.storage.local.set({ "numb": idn }, function() {
          console.log("numb saved");
          });
    // wczytuje tytuł
    chrome.storage.local.get(['numb']).then((result) => {
        let ord = result.numb
        let order = Number(ord)
        chrome.storage.local.get(['titles']).then((items) => {
        let list = items.titles
        document.getElementById('note-title').value = list[order]
    })});
    //wczytuje treść
    chrome.storage.local.get(["notes"]).then((items) => {
        chrome.storage.local.get(['numb']).then((result) => {
            let ord = result.numb
            let order = Number(ord)
            let notes = items.notes
            let curr_note = notes[order]
            document.getElementById("note").value = curr_note
    })});
    //event listener do usuwania/zapisuS
    document.addEventListener('click', (e) =>{
        let id = e.target.id;
        if (id == "delete") {
            delete_note()
        } else if (id == "save") {
            save_note()
        }
    })
}
function save_note() {
    chrome.storage.local.get(['numb']).then((result) => {
        let ord = result.numb
        let order = Number(ord) 
        chrome.storage.local.get(['titles']).then((items) => {
            let list = items.titles
            list.splice(order, 1)
            var news = document.getElementById("note-title").value
            list.push(news)
            chrome.storage.local.set({"titles": list}, function() {})         
        })      
    })
    chrome.storage.local.get(['numb']).then((result) => {
        let ord = result.numb
        let order = Number(ord) 
        chrome.storage.local.get(['notes']).then((items) => {
            let list = items.notes
            list.splice(order, 1)
            var news = document.getElementById("note").value
            list.push(news)
            chrome.storage.local.set({"notes": list}, function() {})         
        })      
    })
    setTimeout(titles_notes, 100);
}
function delete_note() {
    chrome.storage.local.get(['numb']).then((result) => {
        let ord = result.numb
        let order = Number(ord) 
        chrome.storage.local.get(['titles']).then((items) => {
            let list = items.titles
            list.splice(order, 1)
            chrome.storage.local.set({"titles": list}, function() {})         
        })      
    })
    chrome.storage.local.get(['numb']).then((result) => {
        let ord = result.numb
        let order = Number(ord) 
        chrome.storage.local.get(['notes']).then((items) => {
            let list = items.notes
            list.splice(order, 1)
            chrome.storage.local.set({"notes": list}, function() {})         
        })      
    })
    
    setTimeout(titles_notes, 200);
}
function titles_notes() {
    document.getElementById("notepad-ext").innerHTML = ' <div class="notes-site" id="notes-site"><a style="color :#e5e5e5; font-size: 30px; font-weight: 700;">Notepad<img id="notepad_trigger" src="weather_icons/arrows_circle_up.svg"></a><ul class="list" id="list"></ul><a id="newnote" class="button">+</a><a class="switch1" id="right">></a></div><div class="to-do-site" id="to-do-site"><a style="color :#e5e5e5; font-size: 30px; font-weight: 700;">To Do<img id="notepad_trigger" src="weather_icons/arrows_circle_up.svg"></a><ul class="list" id="to-do-list"></ul><a class="button" id="add-to-do">+</a><br><a class="switch2" id="left"><</a><img src="favicons/trashcan.svg" class="trash" id="del_to_do"></div>'
    chrome.storage.local.get(["titles"]).then((items) => {
        let list = items.titles;
        let listLength = list.length;
        for (let i=0; i < listLength; i++) {
            var output = document.getElementById("list")
            output.innerHTML += "<li><a class='item' id='" + (i + 1) + "'>" + list[i] + "</a><li>";
        }
      });
}
function newnote() {
    document.getElementById("notepad-ext").innerHTML = '<textarea placeholder="your title here"id="title-textbox"class="title"></textarea><br><textarea placeholder="your text here" id="textbox" class="note"></textarea><br><a id="notes_back" class="button">Back</a><a href="#" id="reset" class="button">Reset</a><a id="create" class="button">Save</a>'
}
function create_note() {
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
    setTimeout(titles_notes, 100);
}
function notepad_window_trigger() {
    if (document.getElementById("notepad-ext").style.top == "410px") {
        document.getElementById("notepad-ext").style.top = "20px"
        document.getElementById("notepad_trigger").src = "weather_icons/arrows_circle_down.svg"
    } else {
        document.getElementById("notepad-ext").style.top = "410px"
        document.getElementById("notepad_trigger").src = "weather_icons/arrows_circle_up.svg"
    }
}