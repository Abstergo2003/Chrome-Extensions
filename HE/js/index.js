var hide = false
document.addEventListener('keydown', (e)=>{
    if (e.keyCode = 18){
        hide = true
    }
})
document.addEventListener('keyup', (e)=>{
    if (e.keyCode = 18){
        hide = false
    }
})
document.addEventListener('click', (e)=>{
    console.log(e.target)
    if (hide == true) {
        e.target.style.display = 'none'
        saveHidden(e.target)
    }
})
function saveHidden(elem) {
    var obj = {
        "id" : "none",
        "class": [],
        "url": window.location.href
    }
    if (elem.id != '') {
        obj.id = elem.id
    }
    if (elem.classList != '') {
        for (var i = 0; i < elem.classList.length; i++) {
            obj.class.push(elem.classList[i])
        }
    }
    chrome.storage.local.get('hidden', (items)=>{
        console.log(items.hidden)
        var list = items.hidden
        list.push(obj)
        chrome.storage.local.set({'hidden': list})
    })
}

function hideSaved() {
    var url = window.location.href
    chrome.storage.local.get('hidden', (items)=>{
        // get list of hidden elements
        var list = items.hidden
        console.log(list)

        // get elements hidden on current side
        const filteredSites = list.filter(function(site) {
            return site.url = url;
        });

        // hide those elements
        console.log(filteredSites)
        for (var j = 0; j < filteredSites.length; j++) {
            // if there is id hide get it by id and hide it
            if (filteredSites[j].id != "none") {
                document.getElementById(filteredSites[j].id).style.display = 'none'
            } else { // if there isn't any id get all elements by classes
                var classes = ''
                for (var k = 0; k <filteredSites[j].class.length; k++) {
                    classes += `.${filteredSites[j].class[k]}`
                }
                console.log(classes)
                var elements = document.querySelectorAll(classes)
                // hide all elements with exactly same classes
                elements.forEach(function(element) {
                    element.style.display = 'none'
                })
            }
        }
    })
}
hideSaved()