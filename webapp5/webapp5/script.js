const tag = document.getElementById('tag');
const input = document.getElementById('input');
var image = document.getElementById("image");
var words = ["1", "2"];

var http = new XMLHttpRequest();
var url = 'image';

tag.addEventListener('click', function () {
    words = input.value.split(" ");

    http.open('POST', url, true);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            image.src = "http://localhost:1337/image?" + words[0] + "&" + words[1];
        }
    }
    
    if ((words[0] == 'giena' || words[0] == 'gazel' || words[0] == 'gekkon') &&
        (words[1] >= 1 && words[1] <= 9) && words.length == 2) {
        http.send("animal=" + words[0] + "num=" + words[1]);
    } else {
        image.src = "";
        alert("Разрешается ввод только на слова\n giena | gazel | gekkon с числом через пробел!");
    }
});