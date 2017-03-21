function submitForm() {
    var list = document.getElementById("list");
    var newItem = document.createElement('div');
    newItem.className = 'comment';
    var name = document.forms.form1.name;
    var comment = document.forms.form1.comment;
    newItem.innerHTML = "<p class='text'>" + comment.value + "</p><p class='name'>" + name.value + "</p>";
    list.insertBefore(newItem, list.firstChild);
    comment.value = "";
    name.value = "";
    return false;
}