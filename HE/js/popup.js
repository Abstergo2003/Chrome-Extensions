function loadElements() {
    chrome.storage.local.get('hidden', (items)=>{
        var list = items.hidden
        for (var i = 0; i <list.length; i++) {
            document.body.innerHTML += `
            <div class="element">
                <span>${list[i].url}</span><br>
                <span>Classes</span><br>
                <span>${JSON.stringify(list[i].class)}</span><br>
                <span>ID: ${list[i].id}</span>
                <img src="img/delete.svg" id="${i}">
            </div>`
        }
    })
}
function deleElement(id) {
    chrome.storage.local.get('hidden', (items)=>{
        var list = items.hidden
        list.splice(id, 1)
        chrome.storage.local.set({"hidden": list})
        window.location.reload()
    })
}

document.addEventListener('click', (e)=>{
    let id = e.target.id
    console.log(id)
    if (id == '0') {
        deleElement(0)
    } else if (+id) {
        deleElement(+id)
    }
})

loadElements()