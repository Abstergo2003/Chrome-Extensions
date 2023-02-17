window.onload = function() {
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
    //usuwa
    document.addEventListener('click', (e) =>{
        let id = e.target.id;
        if (id == "delete") {
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
        } else if (id == "save") {
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
        }
    })
}