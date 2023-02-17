const canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
let isDrawing = false
let brushWidth = 5
let strokeColor = 'black'
let type = 'brush';
let prevMouseX, prevMouseY, snapshot
let fill = document.getElementById("fill")

window.onload = function () {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    //color
    document.getElementById('red').addEventListener('click', ()=>{strokeColor = 'red'})
    document.getElementById('green').addEventListener('click', ()=>{strokeColor = 'green'})
    document.getElementById('blue').addEventListener('click', ()=>{strokeColor = 'blue'})
    document.getElementById('yellow').addEventListener('click', ()=>{strokeColor = 'yellow'})
    document.getElementById('black').addEventListener('click', ()=>{strokeColor = 'black'})
    document.getElementById('customColorForm').addEventListener('submit', ()=>{strokeColor = document.getElementById('customColor').value})
    //width
    document.getElementById('stroke').addEventListener('change', ()=>{brushWidth = document.getElementById('stroke').valueAsNumber})
    // type
    document.getElementById('rectangle').addEventListener('click', ()=>{type = 'rectangle'})
    document.getElementById('triangle').addEventListener('click', ()=>{type = 'triangle'})
    document.getElementById('circle').addEventListener('click', ()=>{type = 'circle'})
    document.getElementById('line').addEventListener('click', ()=>{type = 'line'})
    document.getElementById('brush').addEventListener('click', ()=>{type = 'brush'})
    document.getElementById('rubber').addEventListener('click', ()=>{type = 'rubber'})
    // button
    document.getElementById('save').addEventListener('click', save)
    document.getElementById('clear').addEventListener('click', clear)
    load()
}

const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
const save = () => {
    //const link = document.createElement('a');
    //link.download = `${Date.now()}.jpg`;
    //link.href = canvas.toDataURL();
    //link.click()
    chrome.storage.local.get(['notes']).then((items)=>{
        let list = items.notes
        let dataIMG = canvas.toDataURL()
        list.push(dataIMG)
        chrome.storage.local.set({'notes' : list})
    })
}
const load = () => {
    chrome.storage.local.get(['notes']).then((items) =>{
        list = items.notes
        var img = new Image;
        img.src = list[2];
        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        };
    })
}

const startDrawing = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = strokeColor
    ctx.fillStyle = strokeColor
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
}

const drawing = (e) => {
    if(!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)
    if (type == 'brush') {
        //draw line
        ctx.strokeStyle = type === 'rubber' ? '#fff' : strokeColor
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
    } else if (type == 'rectangle') {
        //draw rectangle
        if (fill.checked) {
            ctx.fillRect(e.offsetX, e.offsetY, prevMouseX-e.offsetX, prevMouseY-e.offsetY)
        } else {
            ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX-e.offsetX, prevMouseY-e.offsetY)
        }
    } else if (type == 'triangle') {
        //draw triangle
        ctx.beginPath()
        ctx.moveTo(prevMouseX, prevMouseY)
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
        ctx.closePath()
        fill.checked ? ctx.fill() : ctx.stroke()
    } else if (type == 'circle') {
        ctx.beginPath()
        let radius = Math.sqrt(Math.pow(prevMouseX-e.offsetX, 2) + Math.pow(prevMouseY-e.offsetY, 2))
        ctx.arc(e.offsetX, e.offsetY, radius, 0, 2 * Math.PI)
        fill.checked ? ctx.fill() : ctx.stroke()
    } else if (type == 'rubber') {
        ctx.clearRect(e.offsetX, e.offsetY, prevMouseX-e.offsetX, prevMouseY-e.offsetY);
    } else if (type == 'line') {
        //draw line
        ctx.beginPath()
        ctx.moveTo(prevMouseX, prevMouseY)
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
    }
}
canvas.addEventListener('mousedown', startDrawing)
canvas.addEventListener('mouseup', ()=>{isDrawing = false})
canvas.addEventListener('mousemove', drawing)