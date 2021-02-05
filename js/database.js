// Initialize the database
var Datastore = require('nedb');
db = new Datastore({ filename: 'db/persons.db', autoload: true });


// Adds a person
exports.addPerson = function(firstname, lastname,
  gender,
  dateOfBirth,
  dateOfAdmission,
  rollNumber,
  contactNumber,
  alternateNumber,
  studentAadharNumber,
  fatherAadharNumber,
  fatherName,
  motherAadharNumber,
  motherName,
  bloodGroup,
  admission,
  religion,
  category,
  email,
  grade,
  section,
  house,
  admissionId,
  shortBio,
  studentPhoto) {

  // Create the person object
  var person = {
    "firstname": firstname,
    "lastname": lastname,
    "gender": gender,
    "dateOfBirth": dateOfBirth,
    "dateOfAdmission": dateOfAdmission,
    "rollNumber": rollNumber,
    "contactNumber": contactNumber,
    "alternateNumber": alternateNumber,
    "studentAadharNumber": studentAadharNumber,
    "fatherAadharNumber": fatherAadharNumber,
    "fatherName": fatherName,
    "motherAadharNumber": motherAadharNumber,
    "motherName": motherName,
    "bloodGroup": bloodGroup,
    "admission": admission,
    "religion": religion,
    "category": category,
    "email": email,
    "grade": grade,
    "section": section,
    "house": house,
    "admissionId": admissionId,
    "shortBio": shortBio,
    "studentPhoto": studentPhoto,
    };

  // Save the person to the database
  db.insert(person, function(err, newDoc) {
    // Do nothing
  });
};

// Returns all persons
exports.getPersons = function(fnc) {

  // Get all persons from the database
  db.find({}, function(err, docs) {

    // Execute the parameter function
    fnc(docs);
  });
}

// Deletes a person
exports.deletePerson = function(id) {

  db.remove({ _id: id }, {}, function(err, numRemoved) {
    // Do nothing
  });
}
