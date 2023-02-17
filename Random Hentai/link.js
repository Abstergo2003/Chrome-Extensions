function link() {
    var number = Math.random() * (435558 - 1) + 1;
    var output = document.getElementById("link");
    var digit6 = Math.round(number)
    var a = document.getElementById("a")
    output.innerHTML += "nhentai.net/g/" + digit6 + "/"
    a.href = "https://nhentai.net/g/" + digit6 + "/"
    //y = 2E-06x2 + 4,5606x + 98261
    //var gallery = 2 * Math.pow(10, -6) * Math.pow(digit6, 2) + 4.5606 * digit6 + 98261
    //console.log(gallery)
    return false;
}
//