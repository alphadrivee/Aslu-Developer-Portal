var label = document.createElement('h5');
label.innerText = "Members";
document.getElementById('users').appendChild(label);

firebase.database().ref('users').on('value', function(snapshot) {
    snapshot.forEach(user => {
        var uname = user.val().Username || user.val().Fullname;
        var userList = document.createElement('div');
        userList.className = "user online";
        document.getElementById('users').appendChild(userList);
        userList.innerHTML = "<div class=\"user-avatar\">"
        userList.innerHTML += "<img src=\""+user.val().Pfp+"\" alt=\"User\" width=\"40px\" height=\"40px\" style=\"margin-right: 10px; border: 3px solid rgb(6, 250, 177); border-radius: 25px;\"></div>"
        userList.innerHTML += "<p>" + uname + "</p>";
    });
});
