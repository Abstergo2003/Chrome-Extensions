window.onload = function () {
    load_notes()
    document.getElementById('save_note').addEventListener('click', save_note_n)
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
    document.getElementById('rectangle').addEventListener('click', ()=>{type = 'rectangle', console.log('REC')})
    document.getElementById('triangle').addEventListener('click', ()=>{type = 'triangle'})
    document.getElementById('circle').addEventListener('click', ()=>{type = 'circle'})
    document.getElementById('line').addEventListener('click', ()=>{type = 'line'})
    document.getElementById('brush').addEventListener('click', ()=>{type = 'brush'})
    document.getElementById('text').addEventListener('click', ()=>{type = 'text'})
    document.getElementById('rubber').addEventListener('click', ()=>{type = 'rubber'})
    // button
    document.getElementById('save').addEventListener('click', save_note_p)
    document.getElementById('clear').addEventListener('click', clear)
    document.addEventListener('click', (e) =>{
        let id = e.target.id
        console.log(id)
        if (id.slice(0, 3) == "p__") {
            show_note(+id.slice(3, id.length), 'p')
        }
        else if (id.slice(0, 2) == "p_") {
            console.log(+id.slice(2, id.length))
            console.log('loading canvas')
            show_note(+id.slice(2, id.length), 'p')
       } else if(id.slice(0, 2) == "n_") {
            console.log('loading note')
            show_note(+id.slice(2, id.length), "t")
       } else if (id == 'add_note') {
        choose_type()
       } else if (id == 'add_note_paint') {
        new_note_p()
       } else if (id == 'add_note_text') {
        new_note_n()
       }
    })
}
function choose_type() {
    console.log('choosing type')
    document.getElementsByTagName('b')[0].style.display = 'none'
    document.getElementById('add_note_text').style.display = 'unset'
    document.getElementById('add_note_paint').style.display = 'unset'
}
function new_note_p() {
    edit_type = -1 //if edit type is diffrent than -1, on save_note it will update one from list of notes, otherwise will create another position
    document.getElementsByTagName('abstergos-note')[0].style.position = 'absolute'
    document.getElementsByTagName('abstergos-paint')[0].style.position = 'unset'
    document.getElementById('save_note').style.left = '160vw'
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    clear()
}
function new_note_n() {
    edit_type = -1 //if edit type is diffrent than -1, on save_note it will update one from list of notes, otherwise will create another positions
    document.getElementsByTagName('abstergos-paint')[0].style.position = 'absolute'
    document.getElementsByTagName('abstergos-note')[0].style.position = 'unset'
    document.getElementById('save_note').style.left = '60vw'
    document.getElementById('textarea-title').value = ''
    document.getElementById('textarea-note').value = ''
}