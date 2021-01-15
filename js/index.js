const database = require('./js/database');

window.onload = function() {

  // Populate the table
  populateTable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');

    // Save the person in the database
    database.addPerson(firstname.value, lastname.value);

    // Reset the input fields
    firstname.value = '';
    lastname.value = '';

    // Repopulate the table
    populateTable();
  });
}

// Populates the persons table
function populateTable() {

  // Retrieve the persons
  database.getPersons(function(persons) {

    // Generate the table body
    var tableBody = '';
    for (var i = 0; i < persons.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + persons[i].firstname + '</td>';
      tableBody += '  <td>' + persons[i].lastname + '</td>';
      tableBody += '  <td><input type="button" value="Delete" onclick="deletePerson(\'' + persons[i]._id + '\')"></td>'
      tableBody += '</tr>';
    }

    // Fill the table content
    document.getElementById('tablebody').innerHTML = tableBody;
  });
}

// Deletes a person
function deletePerson(id) {

  // Delete the person from the database
  database.deletePerson(id);

  // Repopulate the table
  populateTable();
}

//Creating a RestAPI

/*var data = JSON.stringify({
  "message": "Text of the SMS message",
  "tpoa": "Sender",
  "recipient": [
    {
      "msisdn": "12015550123"
    },
    {
      "msisdn": "447400123456"
    },
    {
      "msisdn": "5212221234567"
    }
  ]
});*/

//This function is for calling api using user id and password also called Authentication.
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText); 
  }
});
xhr.open("POST", "http://sms.currentdiary.com/sms_api/sendsms.php?username=verma12&password=verma6536&mobile=8707370705&sendername=CDIARY&message=this%20is%20offline%20testingPost%20currentdiary");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Authorization", "Basic " + btoa("verma:verma6536"));
xhr.setRequestHeader("Cache-Control", "no-cache");
xhr.send(null);

//Simple GET function calling API
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    console.log(xmlHttp.responseText);
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
httpGet("http://sms.currentdiary.com/sms_api/sendsms.php?username=verma12&password=verma6536&mobile=8707370705&sendername=CDIARY&message=this%20is%20offline%20testingGet%20currentdiary"); 