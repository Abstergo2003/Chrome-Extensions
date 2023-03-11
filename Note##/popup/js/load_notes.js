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
    for (var i = 0; i<res.length; i++) { //lop displaying notes
        document.body.innerHTML += `
                        <div id="${0}" class="note">
                            <a id="${0}"><b>${res[i].title}</b></a><br>
                            <p id="${0}">${res[i].text}</p>
                        </div>`
    }
}).catch((error)=>{
    console.error(error)
})

getPaintings().then((pres)=>{
    console.log(pres)
    for (var j = 0; j<pres.length; j++) { //loop displaying canvases
        console.log('loading' + j + 'canvas')
        document.body.innerHTML += `
        <div id="${0}" class="paint">
            <canvas id="${'p__' + j}"></canvas><br>
            <p id="${0}">${pres[j].title}</p>
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