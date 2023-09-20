const urlBase = 'http://quillcontacts.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function myFunction() {
    var x = document.getElementById("loginform");
    var y = document.getElementById("registerform");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "contents";
    } else {
        x.style.display = "none";
        y.style.display = "contents";
    }
}

function closebutton(){
  var x = document.getElementById("closebtn");
  if(x.style.display === "none"){
    x.style.display = "contents";
  }
}

function hideEdit(){
  var x = document.getElementById("createPopup");
  var y = document.getElementById("editPopup");
  if (x.style.display === "none") {
    x.style.display = "contents";
    y.style.display = "none";
} else {
    x.style.display = "none";
    y.style.display = "none";
}
}

function myFunction2() {
    var x = document.getElementById("registerform");
    var y = document.getElementById("loginform");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "contents";
    } else {
        x.style.display = "none";
        y.style.display = "contents";
    }
}

function showPassword() {
    var x = document.getElementById("loginPassword");
    if (x.type === "password") {
        x.type = "loginPassword";
    } else {
        x.type = "password";
    }
}

function showPassword2() {
    var x = document.getElementById("loginP");
    if (x.type === "password") {
        x.type = "loginP";
    } else {
        x.type = "password";
    }
}

function doLogin() {
    userId = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("loginName").value;
    let password = document.getElementById("loginPassword").value;
    //	var hash = md5(password);

    document.getElementById("result").innerHTML = "";

    let tmp = { login: login, password: password };
    //	var tmp = {login:login,password:hash};
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if (userId < 1) {
                    document.getElementById("result").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();

                window.location.href = "contacts.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("result").innerHTML = err.message;
    }
}


function register() {
    userId = 0;

    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    let login = document.getElementById("loginN").value;
    let password = document.getElementById("loginP").value;
    //	var hash = md5(password);
    document.getElementById("result").innerHTML = "";

    let tmp = { firstName: firstName, lastName: lastName, login: login, password: password };
    //	var tmp = {login:login,password:hash};
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + '/Register.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                saveCookie();

                window.location.href = "index.html";
            }
        };
        //alert("sending")
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("result").innerHTML = err.message;
    }
}

function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
    readCookie();
}

function readCookie() {
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] == "firstName") {
            firstName = tokens[1];
        }
        else if (tokens[0] == "lastName") {
            lastName = tokens[1];
        }
        else if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) {
        window.location.href = "contacts.html";
    }
    else {
        //document.getElementById("printUserInfo").innerHTML = "Logged in as " + firstName + " " + lastName;
    }
}

function userInfo() {
    //alert(userId)
    document.getElementById("printUserInfo").innerHTML = "firstName";
}

function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

function addContact() {
    firstName = document.getElementById("firstN").value;
    lastName = document.getElementById("lastN").value;
    let phone = document.getElementById("phoneNum").value;
    let email = document.getElementById("email").value;
    document.getElementById("contactAddResult").innerHTML = "";

    let tmp = { userId: userId, firstName: firstName, lastName: lastName, phone: phone, email: email };
    let jsonPayload = JSON.stringify(tmp);

    //let url = urlBase + '/CreatedidisContact.' + extension;

    let url = urlBase + '/CreateContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contactAddResult").innerHTML = "Added to your scroll of contacts!";
                searchContact();
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("contactAddResult").innerHTML = err.message;
    }

}

function showCreateInfo() {
    var x = document.getElementById("contactPopup");
    var y = document.getElementById("createPopup");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "contents";
    } else {
        x.style.display = "none";
        y.style.display = "contents";
    }
}

function printContacts() {
    let user = -1;
    let first = "";
    let last = "";
    let data = document.cookie;
    let splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] == "firstName") {
            first = tokens[1];
        }
        else if (tokens[0] == "lastName") {
            last = tokens[1];
        }
        else if (tokens[0] == "userId") {
            user = parseInt(tokens[1].trim());
        }
    }
    document.getElementById("firstnamehere").innerHTML = ("Hi, " + first + " " + last);
    //searchContact();
}

function listContacts() {
    let srch = document.getElementById("searchText").value;
    document.getElementById("contactSearchResult").innerHTML = "";

    let tmp = { search: srch, userId: userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/SearchContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                let contactNames = new Array(jsonObject.results.length);
                let contactInfo = new Array(jsonObject.results.length);
                let contactIDs = new Array(jsonObject.results.length);


                for (let i = 0; i < jsonObject.results.length; i++) {
                    let contact = jsonObject.results[i];

                    let contactName = `${contact.firstName} ${contact.lastName}`;
                    let contactDetail = [`${contact.id}`, `${contact.firstName}`, `${contact.lastName}`, `${contact.phone}`, `${contact.email}`];

                    contactNames[i] = contactName;
                    contactInfo[i] = contactDetail;
                }

                displayContacts(contactNames, contactInfo);
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("contactSearchResult").innerHTML = err.message;
    }
}

function searchContact() {
    let srch = document.getElementById("searchText").value;
    document.getElementById("contactSearchResult").innerHTML = "";

    let tmp = { search: srch, userId: userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/SearchContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                let contactNames = new Array(jsonObject.results.length);
                let contactInfo = new Array(jsonObject.results.length);
                let contactIDs = new Array(jsonObject.results.length);


                for (let i = 0; i < jsonObject.results.length; i++) {
                    let contact = jsonObject.results[i];

                    let contactName = `${contact.firstName} ${contact.lastName}`;
                    let contactDetail = [`${contact.id}`, `${contact.firstName}`, `${contact.lastName}`, `${contact.phone}`, `${contact.email}`];

                    contactNames[i] = contactName;
                    contactInfo[i] = contactDetail;
                }

                displayContacts(contactNames, contactInfo);
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("contactSearchResult").innerHTML = err.message;
    }
}

function displayContacts(contactNames, contactInfo) {
    var data = contactNames;
    var info = contactInfo;

    var table = "<tr>", perrow = 1;
    data.forEach((value, i) => {
        table += `<td><button type="button" onclick="showContact('${info[i]}');"><span class="material-symbols-outlined" id = "sidebarprofilepic">account_circle</span>
            ${value}</button></td>`;
        var next = i + 1;
        if (next % perrow == 0 && next != data.length) { table += "</tr><tr>"; }
    });
    table += "</tr>";

    document.getElementById("contactTb").innerHTML = table;
}

function showContact(info) {
    contacts = info.split(',');

    document.getElementById("editPopup").style.display = "none";
    document.getElementById("createPopup").style.display = "none";
    document.getElementById("contactPopup").style.display = "contents";

    document.getElementById("contactFirstName").innerHTML = contacts[1];
    document.getElementById("contactLastName").innerHTML = contacts[2];
    document.getElementById("contactPhone").innerHTML = contacts[3];
    document.getElementById("contactEmail").innerHTML = contacts[4];

    //var btn = "<button>";
    let btn = `<button type="buttons" id="editcontact" onclick="showUpdateForm('${contacts[0]}');"><i class="material-icons"
            id="editicon">history_edu</i>Edit</button>`;

    document.getElementById("editBtn").innerHTML = btn;

    let btn2 = `<button type="buttons" id="deletecontact" onclick="showDeletePopup('${contacts[0]}');"><i
                class="material-icons" id="deleteicon">delete</i>Delete</button>`;

    document.getElementById("deleteBtn").innerHTML = btn2;
}


function showUpdateForm(id) {
   // alert("called edit with id = " + id)
    document.getElementById("contactPopup").style.display = "none";
    document.getElementById("editPopup").style.display = "contents";

    document.getElementById("updateContact").onclick = function() {updateContact(id)};
}

function updateContact(id) {
    firstName = document.getElementById("editFirstN").value;
    lastName = document.getElementById("editLastN").value;
    let phone = document.getElementById("editPhoneNum").value;
    let email = document.getElementById("editEmail").value;
    document.getElementById("contactEditResult").innerHTML = "";

    let tmp = { id: id, userId: userId, firstName: firstName, lastName: lastName, phone: phone, email: email };
    let jsonPayload = JSON.stringify(tmp);

    //let url = urlBase + '/CreatedidisContact.' + extension;

    let url = urlBase + '/UpdateContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contactEditResult").innerHTML = "Contact has been updated";
                hideEdit();
                searchContact();
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("contactEditResult").innerHTML = err.message;
    }
}

function showDeletePopup(id) {
    //alert("called delete with id = " + id)
    document.getElementById("contactPopup").style.display = "none";
    document.getElementById("deletePopup").style.display = "contents";

    deleteContact(id);
}

function deleteContact(id) {
    document.getElementById("contactDeleteResult").innerHTML = "";

    let tmp = { id: id };
    let jsonPayload = JSON.stringify(tmp);

    //let url = urlBase + '/CreatedidisContact.' + extension;

    let url = urlBase + '/DeleteContact.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
                searchContact();
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("contactDeleteResult").innerHTML = err.message;
    }
}