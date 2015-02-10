/**
 * Created by hagen715 on 2/10/15.
 */
'use strict';

// Defining the "student" API module
// =======================================


var express = require('express');
var controller = require('./student.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/:student_id', controller.destroy);

module.exports = router;
