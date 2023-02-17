window.onload = function() {
  startTime()
    // wczytuje tytuły
    titles_notes()
      // po kliknięciu zapamietuje id 
      document.addEventListener('click', (e) =>{
        let id = e.target.id;
        if (id == "left") {
          document.getElementById("to-do-site").style.left = "400px"
      } else if (id == "right") { 
          document.getElementById("to-do-site").style.left = 0;
      } else if (+id && id < 1000) {
        show(id)
      } else if (+id && id >= 2000) {
        to_do_done(id)
      } else if (id == 'create') {
        create_note()
      } else if (id == 'reset') {
          var note = document.getElementById("textbox");
          note.value = "";
      } else if (id == "close") {
          close()
      } else if (id == "app_save") {
        save()
      } else if (id == "trigger_window_add_img") {
        trigger_window()
      } else if (id == "trigger_window_add_text") {
        trigger_window()
      } else if (id == "trigger_window_remove_img") {
        trigger_delete_window()
      } else if (id == "trigger_window_remove_text") {
        trigger_delete_window()
      } else if (id == "close-delete") {
        close_del()
      } else if (+id) {
        if (id >= 1000 && id < 2000) {
          del(id)
        }
      } else if (id == "del_to_do") {
        del_to_do()
      } else if (id == "add-to-do") {
        add_to_do()
      } else if (id == "to-do-save") {
        save_to_do()
      } else if (id == "newnote") {
        newnote()
      } else if (id == "weather_trigger") {
        weather_window_trigger()
      } else if (id == "notes_back") {
        titles_notes()
      } else if (id == "notepad_trigger") {
        notepad_window_trigger()
      } else if (id == "button_clock_clock" || id =="button_clock_stoper") {
        clock_mode_swap(id)
      } else if (id == "button_clock_countdown") {
        clock_mode_swap(id)
      } else if (id == "clock_stoper_start_stop") {
        clock_stoper_start_stop()
      } else if (id == "clock_stoper_reset") {
        clock_stoper_reset()
      } else if (id == "clock_countdown_window_trigger") {
        clock_countdown_window_trigger()
      } else if (id == "clock_countdown_set_minutes_add" || id == "clock_countdown_set_minutes_remove") {
        clock_countdown_set(id)
      } else if (id == "clock_countdown_set_seconds_add" || id == "clock_countdown_set_seconds_remove") {
        clock_countdown_set(id)
      } else if (id == "clock_countdown_start") {
        clock_countdown_start()
      } else if (id == "clock_countdown_reset") {
        clock_countdown_stop()
      }
      })
      //wczytuje apki
      app_load()
    //wczytuje to do
    load_to_do()
    locate()
}