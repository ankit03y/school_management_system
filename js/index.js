const database = require('./js/database');

window.onload = function () {

  // Populate the table
  populateTable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var gender = document.getElementById('gender');
    var dateOfBirth = document.getElementById('dateOfBirth');
    var dateOfAdmission = document.getElementById('dateOfAdmission');
    var rollNumber = document.getElementById('rollNumber');
    var contactNumber = document.getElementById('contactNumber');
    var alternateNumber = document.getElementById('alternateNumber');
    var studentAadharNumber = document.getElementById('studentAadharNumber');
    var fatherAadharNumber = document.getElementById('fatherAadharNumber');
    var fatherName = document.getElementById('fatherName');
    var motherAadharNumber = document.getElementById('motherAadharNumber');
    var motherName = document.getElementById('motherName');
    var bloodGroup = document.getElementById('bloodGroup');
    var admission = document.getElementById('admission');
    var religion = document.getElementById('religion');
    var category = document.getElementById('category');
    var email = document.getElementById('email');
    var grade = document.getElementById('grade');
    var section = document.getElementById('section');
    var house = document.getElementById('house');
    var admissionId = document.getElementById('admissionId');
    var shortBio = document.getElementById('shortBio');
    var studentPhoto = document.getElementById('studentPhoto');


    // Save the person in the database
    database.addPerson(firstname.value,
      lastname.value,
      gender.value,
      dateOfBirth.value,
      dateOfAdmission.value,
      rollNumber.value,
      contactNumber.value,
      alternateNumber.value,
      studentAadharNumber.value,
      fatherAadharNumber.value,
      fatherName.value,
      motherAadharNumber.value,
      motherName.value,
      bloodGroup.value,
      admission.value,
      religion.value,
      category.value,
      email.value,
      grade.value,
      section.value,
      house.value,
      admissionId.value,
      shortBio.value,
      studentPhoto.value
    );

    // Reset the input fields
    firstname.value = '';
    lastname.value = '';
    gender.value = '';
    dateOfBirth.value = '';
    dateOfAdmission.value = '';
    rollNumber.value = '';
    contactNumber.value = '';
    alternateNumber.value = '';
    studentAadharNumber.value = '';
    fatherAadharNumber.value = '';
    fatherName.value = '';
    motherAadharNumber.value = '';
    motherName.value = '';
    bloodGroup.value = '';
    admission.value = '';
    religion.value = '';
    category.value = '';
    email.value = '';
    grade.value = '';
    section.value = '';
    house.value = '';
    admissionId.value = '';
    shortBio.value = '';
    studentPhoto.value = '';
    // Repopulate the table
    populateTable();
  });
}

// Populates the persons table
function populateTable() {

  // Retrieve the persons
  database.getPersons(function (persons) {

    // Generate the table body
    var tableBody = '';
    for (var i = 0; i < persons.length; i++) {
      tableBody += '<tr>';
      tableBody += '  <td>' + persons[i].firstname + '</td>';
      tableBody += '  <td>' + persons[i].lastname + '</td>';
      tableBody += '  <td>' + persons[i].gender + '</td>';
      tableBody += '  <td>' + persons[i].dateOfBirth + '</td>';
      tableBody += '  <td>' + persons[i].dateOfAdmission + '</td>';
      tableBody += '  <td>' + persons[i].rollNumber + '</td>';
      tableBody += '  <td>' + persons[i].contactNumber + '</td>';
      tableBody += '  <td>' + persons[i].alternateNumber + '</td>';
      tableBody += '  <td>' + persons[i].studentAadharNumber + '</td>';
      tableBody += '  <td>' + persons[i].fatherAadharNumber + '</td>';
      tableBody += '  <td>' + persons[i].fatherName + '</td>';
      tableBody += '  <td>' + persons[i].motherAadharNumber + '</td>';
      tableBody += '  <td>' + persons[i].motherName + '</td>';
      tableBody += '  <td>' + persons[i].bloodGroup + '</td>';
      tableBody += '  <td>' + persons[i].admission + '</td>';
      tableBody += '  <td>' + persons[i].religion + '</td>';
      tableBody += '  <td>' + persons[i].category + '</td>';
      tableBody += '  <td>' + persons[i].email + '</td>';
      tableBody += '  <td>' + persons[i].grade + '</td>';
      tableBody += '  <td>' + persons[i].section + '</td>';
      tableBody += '  <td>' + persons[i].house + '</td>';
      tableBody += '  <td>' + persons[i].admissionId + '</td>';
      tableBody += '  <td>' + persons[i].shortBio + '</td>';
      tableBody += '  <td>' + persons[i].studentPhoto + '</td>';

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
