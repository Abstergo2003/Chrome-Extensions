const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let isDrawing = false
let brushWidth = 5
let strokeColor = 'black'
let type = 'brush';
let prevMouseX, prevMouseY, snapshot
let fill = document.getElementById("fill")

const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    } else if (type == 'text') {
        var text = document.getElementById('textIn').value
        ctx.font = e.offsetX - prevMouseX + 'px Oxanium'
        ctx.fillText(text, prevMouseX, prevMouseY);
    }
}
canvas.addEventListener('mousedown', startDrawing, console.log("started"))
canvas.addEventListener('mouseup', ()=>{isDrawing = false})
canvas.addEventListener('mousemove', drawing)