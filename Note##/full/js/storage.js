var edit_type
var show_type = 0

function getNotes() {
    return new Promise((resolve, reject)=>{
        chrome.storage.local.get(['notes'], (items)=>{
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                resolve(items.notes)
            }
        })
    })
}
function getPaintings() {
    return new Promise((resolve, reject)=>{
        chrome.storage.local.get(['paintings'], (items)=>{
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
            } else {
                resolve(items.paintings)
            }
        })
    })
}
getNotes().then((res)=>{
    console.log(res)
    var list = document.getElementById("list")
    for (var i = 0; i<res.length; i++) { //lop displaying notes
        list.innerHTML += `
                        <div id="${'n_' + i}" class="note">
                            <a id="${'n_' + i}"><b>${res[i].title}</b></a><br>
                            <p id="${'n_' + i}">${res[i].text}</p>
                        </div>`
    }
}).catch((error)=>{
    console.error(error)
})

getPaintings().then((pres)=>{
    console.log(pres)
    for (var j = 0; j<pres.length; j++) { //loop displaying canvases
        console.log('loading' + j + 'canvas')
        list.innerHTML += `
        <div id="${'p_' + j}" class="paint">
            <canvas id="${'p__' + j}"></canvas><br>
            <p id="${'p_' + j}">${pres[j].title}</p>
        </div>`
    }
    for (var k = 0; k<pres.length; k++) { //loop loading images to previously loaded canvases
        console.log('p__'+k)
        console.log('filling' + k + 'canvas')
        var can = document.getElementById('p__'+k)
        var ct = can.getContext('2d')
        var image = new Image();
        image.src = pres[k].canvas
        ct.drawImage(image, 0, 0, image.width,    image.height,
        0, 0, can.width, can.height);
    }
}).catch((error)=>{
    console.error(error)
})

function show_note(id, type) {
    console.log(id)
    console.log(show_type)
    if (show_type == 0) {
        edit_type = id //if edit type is diffrent than -1, on save_note it will update one from list of notes, otherwise will create another position
        if (type == 't') {
            document.getElementsByTagName('abstergos-paint')[0].style.position = 'absolute'
            document.getElementsByTagName('abstergos-note')[0].style.position = 'unset'
            document.getElementById('save_note').style.left = '60vw'
            getNotes().then((res)=>{
                document.getElementById('textarea-title').innerText = res[id].title
                document.getElementById('textarea-note').innerText = res[id].text
            })
        } else {
            document.getElementsByTagName('abstergos-note')[0].style.position = 'absolute'
            document.getElementsByTagName('abstergos-paint')[0].style.position = 'unset'
            document.getElementById('save_note').style.left = '160vw'
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            clear()
            getPaintings().then((pres)=>{
                var image = new Image()
                image.src = pres[id].canvas
                ctx.drawImage(image, 0, 0)
                document.getElementById('title_p').innerText = pres[id].title
            })
        }
    } else {
        if (type == 't') {
            document.getElementById('n_' + id).style.backgroundColor = 'red'
            getNotes().then((res)=>{
                res.splice(id, 1)
                chrome.storage.local.set({'notes': res})
            })
        } else {
            document.getElementById('p_' + id).style.backgroundColor = 'red'
            getPaintings().then((pres)=>{
                pres.splice(id, 1)
                chrome.storage.local.set({'paintings': pres})
            })
        }
    }
}
function save_note_n() {
    console.log('saving note')
    console.log(edit_type)
    var note = {
        "title" : document.getElementById('textarea-title').value,
        "text": document.getElementById('textarea-note').value,
    }
    if (edit_type == -1) {
        getNotes().then((res)=>{
            res.push(note)
            chrome.storage.local.set({'notes': res})
        })
    } else {
        getNotes().then((res)=>{
            res[edit_type] = note
            chrome.storage.local.set({'notes': res})
        })
    }
    location.reload()
}
function save_note_p() {
    var paint = {
        "title" : document.getElementById('title_p').value,
        "canvas" : document.getElementById('canvas').toDataURL()
    }
    if (edit_type == -1) {
        getPaintings().then((pres)=>{
            pres.push(paint)
            chrome.storage.local.set({"paintings": pres})
        })
    } else {
        getPaintings().then((pres)=>{
            pres[edit_type] = paint
            chrome.storage.local.set({"paintings": pres})
        })
    }
    location.reload()
}
function setToDelete() {
    if (show_type == 0) {
        show_type = 1
        document.getElementById('delete_note').style.backgroundColor = 'red'
    } else {
        show_type = 0
        location.reload()
    }
}