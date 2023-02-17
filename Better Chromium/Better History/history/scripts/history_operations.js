function search_history() {
    document.getElementById("history_list").innerHTML = ""
    var filter = document.getElementById("history_search_input").value
    chrome.history.search({text: filter}, function(historyItems) {
        console.log(historyItems);
        var list_out = document.getElementById("history_list")
        for (var i = 0; i < historyItems.length; i++) {
            list_out.innerHTML += '<li id="' + historyItems[i].id + '"><input type="checkbox" class="history_to_delete"><a href="' + historyItems[i].url + '">' + historyItems[i].title + '</a></li>'
        }
    });
    
}
function get_history() {
    chrome.history.search({text: ""}, function(historyItems) {
        console.log(historyItems);
        var list_out = document.getElementById("history_list")
        for (var i = 0; i < historyItems.length; i++) {
            list_out.innerHTML += '<li><input type="checkbox" class="checkbox" id="' + historyItems[i].url + '"><img src="https://s2.googleusercontent.com/s2/favicons?domain_url=' + historyItems[i].url +'"><a href="' + historyItems[i].url + '">' + historyItems[i].title + '</a></li>'
        }
    });
}
function get_most_viewed() {
    chrome.history.search({text: ""}, function(historyItems) {
        // Sort the historyItems by visitCount in descending order
        historyItems.sort(function(a, b) {
            return b.visitCount - a.visitCount;
        });
        // Retrieve the top 5 most viewed sites
        const topFive = historyItems.slice(0, 5);
        console.log(topFive);
        var most_out = document.getElementById("most_viewed_list")
        for (var i = 0; i < topFive.length; i++) {
            most_out.innerHTML += '<li><img src="https://s2.googleusercontent.com/s2/favicons?domain_url=' + topFive[i].url +'"><a href="' + topFive[i].url +'">' + topFive[i].title + '</a></li>'
        }
    });
}
function history_delete_checked() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    for (var i = 0; i < checked.length; i++) {
        chrome.history.deleteUrl({url: checked[i].id}, function() {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
            } else {
                console.log("URL successfully removed from history.");
            }
        });
    }
    document.getElementById("history_list").innerHTML = ""
    get_history()
}
function history_open_checked() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checked = Array.from(checkboxes).filter(checkbox => checkbox.checked);
    for (var i = 0; i <checked.length; i++) {
        window.open(checked[i].id, "_blank");
    }
}