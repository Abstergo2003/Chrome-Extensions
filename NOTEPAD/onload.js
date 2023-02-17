window.onload = function() {
    // wczytuje tytuły
    chrome.storage.local.get(["titles"]).then((items) => {
        let list = items.titles;
        let listLength = list.length;
        for (let i=0; i < listLength; i++) {
            var output = document.getElementById("list")
            output.innerHTML += "<li><a class='item' href='note.html' id='" + i + "'>" + list[i] + "</a><li>";
        }
      });
      // po kliknięciu zapamietuje id 
      document.addEventListener('click', (e) =>{
        let id = e.target.id;
        if (id == "left") {
          document.getElementById("to-do-site").style.left = "400px"
      } else if (id == "right") { 
          document.getElementById("to-do-site").style.left = 0;
      } else if (id !== '') {
        idn = Number(id)
          chrome.storage.local.set({ "numb": idn }, function() {
            console.log("numb saved");
          });
      }
      })
      document.addEventListener('click', (e) =>{
        let id2 = e.target.id;
        if (id2 == "add-to-do") {
          chrome.storage.local.get(["todo"]).then ((items) =>{
            var list_to_do = items.list_to_do
            list_to_do.push("test")
          })
        }
      })
}