/**
 * Created by hagen715 on 2/10/15.
 */
/**
 * Created by hagen715 on 2/10/15.
 */
'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Defining Model
// =====================================================

var StudentSchema = new Schema({

  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  email: String,
  phone: String,
  address: String,
  courses:[
    {
      course: {
        name: String,
        subject: String,
        courseNumber: Number,
        credits: Number
      },
      grade: String
    }
  ],
  major1: String,
  major2: String

});

module.exports = mongoose.model('Student', StudentSchema);


