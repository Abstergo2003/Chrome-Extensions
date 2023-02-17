window.onload = function() {
    get_history()
    get_most_viewed()
    document.getElementById("history_search_input").addEventListener("keyup", search_history)
    //https://s2.googleusercontent.com/s2/favicons?domain_url=
    document.addEventListener('click', (e) =>{
        let id = e.target.id;
        if (id == "history_delete_checked") {
            history_delete_checked()
        } else if (id == "history_open_checked"){
            history_open_checked()
        }
    })
    document.documentElement.style.setProperty('--color', "#e5e5e5")
    document.documentElement.style.setProperty('--color_purp', "#400C57")
    document.documentElement.style.setProperty('--color_text', "black")
    document.documentElement.style.setProperty('--color_title', "#400C57")
    document.documentElement.style.setProperty('--url', "url(logo.jpg)")
    document.documentElement.style.setProperty('--filter', "invert(0%) sepia(60%) saturate(19%) hue-rotate(113deg) brightness(95%) contrast(100%)")
}