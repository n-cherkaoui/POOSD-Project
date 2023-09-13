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

function printPopUp() {
  alert("Pop-up dialog-box")
}

function doLogin() {
  //alert("reached doLogin")
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
    xhr.onreadystatechange = function() {
      alert(this.status)
      if (this.readyState == 4 && this.status == 200) {
        alert("reached doLogin 2")
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          document.getElementById("result").innerHTML = "User/Password combination incorrect, userid is" +userId;
          alert("wrong user/pass");
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();
        alert("right user/pass")

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
  alert("reached register")
  userId = 0;
  //firstName = "";
  //lastName = "";

  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;
  let login = document.getElementById("loginN").value;
  let password = document.getElementById("loginP").value;
  //	var hash = md5(password);
  //document.getElementById("result").innerHTML = "";


  let tmp = { firstName: firstName, lastName: lastName, login: login, password: password };
  //	var tmp = {login:login,password:hash};
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + '/Register.' + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
 
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function() {
      alert("readyState = " + this.readyState)
      alert("status = " + this.status)
      if (this.readyState == 4 && this.status == 200) {
		document.getElementById("result").innerHTML = "User successfully registeredt";
        //let jsonObject = JSON.parse(xhr.responseText);
        //userId = jsonObject.id;
        /*
            if( userId < 1 ){		
              document.getElementById("result").innerHTML = "User/Password combination incorrect";
              alert("wrong user/pass")
              return;
            }*/

        //firstName = jsonObject.firstName;
        //lastName = jsonObject.lastName;
		
        saveCookie();

        window.location.href = "index.html";
      }
    };
    alert("sending")
    xhr.send(jsonPayload);
  }
  catch (err) {
   // document.getElementById("result").innerHTML = err.message;
  }
}

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + (minutes * 60 * 1000));
  document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
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
    document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
  }
}


function doLogout(){
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

function addContact()
{
  alert("inside contact")
 readCookie();
 document.getElementById("useridprint").innerHTML = "userid is " +userId;
  firstName = document.getElementById("firstN").value;
  alert(userId)
  lastName = document.getElementById("lastN").value;
  let phone = document.getElementById("phoneNum").value;
  let email = document.getElementById("email").value;
  document.getElementById("contactAddResult").innerHTML = "";

  alert("after variables")
  let tmp = {userId: userId, firstName: firstName, lastName: lastName, phone:phone, email:email};
  let jsonPayload = JSON.stringify( tmp );

  let url = urlBase + '/CreateContact.' + extension;
	
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.onreadystatechange = function() 
    {
		alert(this.readyState)
		alert(this.status)
      if (this.readyState == 4 && this.status == 200) 
      {
		alert("inside if")
        document.getElementById("contactAddResult").innerHTML = "Contact has been added";
      }
    };
    xhr.send(jsonPayload);
  }
  catch(err)
  {
    document.getElementById("contactAddResult").innerHTML = err.message;
  }
	
}

$(".link").on("click", function(e) {

});
/*
function searchColor()
{
  let srch = document.getElementById("searchText").value;
  document.getElementById("colorSearchResult").innerHTML = "";
	
  let colorList = "";

  let tmp = {search:srch,userId:userId};
  let jsonPayload = JSON.stringify( tmp );

  let url = urlBase + '/SearchColors.' + extension;
	
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.onreadystatechange = function() 
    {
      if (this.readyState == 4 && this.status == 200) 
      {
        document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
        let jsonObject = JSON.parse( xhr.responseText );
      	
        for( let i=0; i<jsonObject.results.length; i++ )
        {
          colorList += jsonObject.results[i];
          if( i < jsonObject.results.length - 1 )
          {
            colorList += "<br />\r\n";
          }
        }
      	
        document.getElementsByTagName("p")[0].innerHTML = colorList;
      }
    };
    xhr.send(jsonPayload);
  }
  catch(err)
  {
    document.getElementById("colorSearchResult").innerHTML = err.message;
  }
	
}
*/