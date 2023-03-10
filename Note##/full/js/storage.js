var list_titles
var list_text
var list_ptitles
var list_paintings
var edit_type

function load_notes() {
    var list = document.getElementById("list")
    chrome.storage.local.get(['notes_titles']).then((items)=>{
        list_titles = items.notes_titles
        chrome.storage.local.get(['notes_text']).then((items)=>{
            list_text = items.notes_text
            chrome.storage.local.get(['painted_titles']).then((items)=>{
                list_ptitles = items.painted_titles
                chrome.storage.local.get(['painted']).then((items)=>{
                    list_paintings = items.painted
                    for (var i = 0; i < list_titles.length; i++) {
                        list.innerHTML += `
                        <div id="${'n_' + i}" class="note">
                            <a id="${'n_' + i}"><b>${list_titles[i]}</b></a><br>
                            <p id="${'n_' + i}">${list_text[i]}</p>
                        </div>`
                    }
                    for (var j = 0; j<list_ptitles.length; j++) {
                        list.innerHTML += `
                        <div id="${'p_' + j}" class="paint">
                            <canvas id="${'p__' + j}"></canvas><br>
                            <p id="${'p_' + j}">${list_ptitles[j]}</p>
                        </div>`
                    }
                    chrome.storage.local.get(['painted']).then((items)=>{
                        for (var k = 0; k<items.painted.length; k++) {
                            console.log('p__'+k)
                            ct = document.getElementById('p__'+k).getContext('2d')
                            var image = new Image();
                            image.src = items.painted[k]
                            document.getElementById('p__'+k).getContext('2d').drawImage(image, 0, 0, image.width,    image.height,     // source rectangle
                            0, 0, document.getElementById('p__'+k).width, document.getElementById('p__'+k).height);
                        }
                    })
                })
            })
        })
    })
}
function show_note(id, type) {
    console.log(id)
    edit_type = id //if edit type is diffrent than -1, on save_note it will update one from list of notes, otherwise will create another position
    if (type == 't') {
        document.getElementsByTagName('abstergos-paint')[0].style.position = 'absolute'
        document.getElementsByTagName('abstergos-note')[0].style.position = 'unset'
        document.getElementById('save_note').style.left = '60vw'
        chrome.storage.local.get(['notes_titles']).then((items)=>{
            var list = items.notes_titles
            document.getElementById('textarea-title').innerText = list[id]
        })
        chrome.storage.local.get(['notes_text']).then((items)=>{
            var list = items.notes_text
            document.getElementById('textarea-note').innerText = list[id]
        })
    } else {
        document.getElementsByTagName('abstergos-note')[0].style.position = 'absolute'
        document.getElementsByTagName('abstergos-paint')[0].style.position = 'unset'
        document.getElementById('save_note').style.left = '160vw'
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        clear()
        chrome.storage.local.get(['painted']).then((items)=>{
            var list = items.painted
            var image = new Image();
            image.src = list[id]
            ctx.drawImage(image, 0, 0);
        })
        chrome.storage.local.get(['painted_titles']).then((items)=>{
            document.getElementById('title_p').value = items.painted_titles[id]
        })
    }
}
function save_note_n() {
    console.log('saving note')
    console.log(edit_type)
        chrome.storage.local.get(['notes_titles']).then((items)=>{
            var list = items.notes_titles
            console.log(list)
            if (edit_type == -1) {
                console.log(document.getElementById('textarea-title').value)
                list.push(document.getElementById('textarea-title').value)
            } else {
                console.log(document.getElementById('textarea-title').value)
                console.log(list[edit_type])
                list[edit_type] = document.getElementById('textarea-title').value
            }
            chrome.storage.local.set({'notes_titles': list})
        })
        chrome.storage.local.get(['notes_text']).then((items)=>{
            var list = items.notes_text
            console.log(list)
            if (edit_type == -1) {
                console.log(document.getElementById('textarea-note').value)
                list.push(document.getElementById('textarea-note').value)
            } else {
                console.log(document.getElementById('textarea-note').value)
                list[edit_type] = document.getElementById('textarea-note').value
            }
            chrome.storage.local.set({'notes_text': list})
        })
        location.reload()
}
function save_note_p() {
    if (edit_type == -1) {
        chrome.storage.local.get(['painted']).then((items)=>{
            var list = items.painted
            list.push(document.getElementById('canvas').toDataURL())
            chrome.storage.local.set({'painted': list})
        })
        chrome.storage.local.get(['painted_titles']).then((items)=>{
            var list = items.painted_titles
            list.push(document.getElementById('title_p').value)
            chrome.storage.local.set({'painted_titles': list})
        })
    } else {
        chrome.storage.local.get(['painted']).then((items)=>{
            var list = items.painted
            list[edit_type] = document.getElementById('canvas').toDataURL()
            chrome.storage.local.set({'painted': list})
        })
        chrome.storage.local.get(['painted_titles']).then((items)=>{
            var list = items.painted_titles
            list[edit_type] = document.getElementById('title_p').value
            chrome.storage.local.set({'painted_titles': list})
        })
    }
    location.reload()
}