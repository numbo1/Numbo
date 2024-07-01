var arr = [];

function upload() {
    var txt = document.getElementById("text").value;
    var nm = document.getElementById("person").value;
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var text = nm + " " + hours + ":" + minutes + ": " + txt;
    arr.unshift(text);
    document.getElementById("arr").innerHTML = arr.join("<br>");
    console.log(arr);
}
    

