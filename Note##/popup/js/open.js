function open_full() {
    chrome.tabs.create({url: '/full/index.html'}) 
}
document.addEventListener('click', (e)=>{
    let id = e.target.id
    console.log(+id.slice(3, id.length))
    if (id == 0) {
        open_full()
    } else if (id.slice(0, 3) == 'p__') {
        open_full()
    }
})
