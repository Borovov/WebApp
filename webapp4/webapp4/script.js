const tag = document.getElementById('tag');
const input = document.getElementById('input');

tag.addEventListener('click', function () {
    var words = input.value.split(" ");
    var string;
    var count = 0;
    var url = new URL("http://localhost:1337/");

    if (words == 0) {
        string = "NULL";
    }
    else {
        for (var i = 0; i < words.length; i++) {
            if (words[i] != "") {
                count++;
                url.searchParams.set('word' + count, words[i]);
            }
        }
        string = "Count: " + count;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send("arra sicko mode");

    alert(string);
});