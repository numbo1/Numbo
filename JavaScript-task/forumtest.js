let arr = [];

function post(arr) {
    text = document.getElementById("text")
    person = document.getElementById("person")
    txt = (text.value)
    nm = (person.value)
    output = arr.push(nm + ": " + txt)
    document.getElementById("arr").innerHTML = arr
}