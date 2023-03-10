
    var list = document.body
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
                        <div id="0" class="note">
                            <a id="0"><b>${list_titles[i]}</b></a><br>
                            <p id="0">${list_text[i]}</p>
                        </div>`
                    }
                    for (var j = 0; j<list_ptitles.length; j++) {
                        list.innerHTML += `
                        <div id="0" class="paint">
                            <canvas id="${'p__'+j}"></canvas><br>
                            <p id="0">${list_ptitles[j]}</p>
                        </div>`
                    }
                    chrome.storage.local.get(['painted']).then((items)=>{
                        for (var k = 0; k<items.painted.length; k++) {
                            console.log('p__'+k)
                            const cv = document.getElementById('p__'+k)
                            var ctx = cv.getContext('2d')
                            var image = new Image();
                            image.src = items.painted[k]
                            ctx.drawImage(image, 0, 0, image.width,    image.height, 0, 0, cv.width, cv.height);
                        }
                    })
                })
            })
        })
    })
