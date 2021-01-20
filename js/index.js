const database = require('./js/database');
const electron = require('electron'); 

const path = require('path'); 

const fs = require('fs'); 
      
var uploadFile = document.getElementById('upload'); 

// Defining a Global file path Variable to store 
// user-selected file 
global.filepath = undefined;

uploadFile.addEventListener('click', () => { 
  const {dialog} = require('electron')

// If the platform is 'win32' or 'Linux' 
	if (process.platform !== 'darwin') { 
		// resolves to a Promise<Object> 
		dialog.showOpenDialog({ 
			title: 'Select the File to be uploaded', 
			defaultPath: path.join(__dirname, '../assets/'), 
			buttonLabel: 'Upload', 
			// restricting the user to only Text Files. 
			filters: [ 
				{ 
					name: 'Text Files', 
					extensions: ['txt', 'docx'] 
				}, ], 
			// specifying the File Selector Property 
			properties: ['openFile'] 
		}).then(file => { 
			// stating whether dialog operation was 
			// cancelled or not. 
			console.log(file.canceled); 
			if (!file.canceled) { 
			// updating the GLOBAL filepath variable 
			// to user-selected file. 
			global.filepath = file.filePaths[0].toString(); 
			console.log(global.filepath); 
      } 
      if (global.filepath && !file.canceled) { 
        fs.readFile(global.filepath, {encoding: 'utf-8'}, function(err,data) { 
           if (!err) { 
                console.log('received data: ' + data); 
           } else { 
                console.log(err); 
            } 
         }); 
       } 
      
		}).catch(err => { 
			console.log(err) 
		}); 
	} 
	else { 
		// If the platform is 'darwin' (macOS) 
		dialog.showOpenDialog({ 
			title: 'Select the File to be uploaded', 
			defaultPath: path.join(__dirname, '../assets/'), 
			buttonLabel: 'Upload', 
			filters: [ 
				{ 
					name: 'Text Files', 
					extensions: ['txt', 'docx'] 
				}, ], 
			// Specifying the File Selector and Directory 
			// Selector Property In macOS 
			properties: ['openFile', 'openDirectory'] 
		}).then(file => { 
			console.log(file.canceled); 
			if (!file.canceled) { 
			global.filepath = file.filePaths[0].toString(); 
			console.log(global.filepath); 
			} 
		}).catch(err => { 
			console.log(err) 
		}); 
	} 
}); 




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

/*This function is for calling api using user id and password also called Authentication.
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
httpGet("http://sms.currentdiary.com/sms_api/sendsms.php?username=verma12&password=verma6536&mobile=8707370705&sendername=CDIARY&message=this%20is%20offline%20testingGet%20currentdiary"); */