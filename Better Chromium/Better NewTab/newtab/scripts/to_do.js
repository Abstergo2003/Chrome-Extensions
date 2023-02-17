function load_to_do() {
    chrome.storage.local.get(("to_do_completion")).then((items) =>{
        var completion = items.to_do_completion
        chrome.storage.local.get(("to_do_tasks")).then((items) =>{
          var tasks = items.to_do_tasks
          var list = document.getElementById("to-do-list")
          for (var i = 0; i < tasks.length; i++) {
          list.innerHTML += '<li class="to-do-items" id=' + (i+2000) + '>' + tasks[i] + '<li>'
          if (completion[i] == 1){
            document.getElementById(i+2000).style.textDecoration = "line-through"
          }
      }
        })
      })
      
}
function del_to_do() {
  chrome.storage.local.get(["to_do_completion"]).then((items) =>{
    var completion = items.to_do_completion
    chrome.storage.local.get(["to_do_tasks"]).then((items) =>{
      var tasks = items.to_do_tasks
      for (var i = 0; i < tasks.length; i++) {
        if (completion[i] == 1) {
          completion.splice(i, 1)
          tasks.splice(i,1)
          i--;
        }
        chrome.storage.local.set({"to_do_tasks": tasks})
        chrome.storage.local.set({"to_do_completion": completion})
      }
    })
  })
  document.getElementById("to-do-site").innerHTML = '<a style="color :#e5e5e5; font-size: 30px; font-weight: 700;">To Do<img id="notepad_trigger" src="weather_icons/arrows_circle_up.svg"></a><ul class="list" id="to-do-list"></ul><a class="button" id="add-to-do">+</a><br><a class="switch2" id="left"><</a><img src="favicons/trashcan.svg" class="trash" id="del_to_do">'
  load_to_do()
}
function add_to_do() {
  document.getElementById("to-do-site").innerHTML += '<textarea class="to-do-textarea" id="to-do-textarea" placeholder="add to do here"></textarea><br><button class="to-do-button" id="to-do-save">OK</button>';
}
function save_to_do() {
  var newest = document.getElementById("to-do-textarea").value
  chrome.storage.local.get(["to_do_completion"]).then((items) =>{
    var completion = items.to_do_completion
    chrome.storage.local.get(["to_do_tasks"]).then((items) =>{
      var tasks = items.to_do_tasks
      tasks.push(newest)
      completion.push(0)
      chrome.storage.local.set({"to_do_tasks": tasks})
      chrome.storage.local.set({"to_do_completion": completion})
      document.getElementById("to-do-site").innerHTML = '<a style="color :#e5e5e5; font-size: 30px; font-weight: 700;">To Do<img id="notepad_trigger" src="weather_icons/arrows_circle_up.svg"></a><ul class="list" id="to-do-list"></ul><a class="button" id="add-to-do">+</a><br><a class="switch2" id="left"><</a><img src="favicons/trashcan.svg" class="trash" id="del_to_do">'
      load_to_do()
    })
  })
}
function to_do_done(id) {
  chrome.storage.local.get(["to_do_completion"]).then((items) =>{
    let completion = items.to_do_completion
    
    switch(completion[(id-2000)]) {
      case 0: completion.splice(id-2000, 1, 1); break;
      case 1: completion.splice(id-2000, 1, 0); break;
    }
    console.log(completion)
    chrome.storage.local.set({"to_do_completion": completion})
    document.getElementById("to-do-site").innerHTML = '<a style="color :#e5e5e5; font-size: 30px; font-weight: 700;">To Do<img id="notepad_trigger" src="weather_icons/arrows_circle_up.svg"></a><ul class="list" id="to-do-list"></ul><a class="button" id="add-to-do">+</a><br><a class="switch2" id="left"><</a><img src="favicons/trashcan.svg" class="trash" id="del_to_do">'
    load_to_do()
  })
}