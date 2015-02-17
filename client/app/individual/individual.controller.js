'use strict';

angular.module('jsonDataProcessingLabWithResaThomasJessPrestonApp')
  .controller('IndividualCtrl', function ($scope, $http, socket) {
    $scope.data = [];

///
    $scope.getStudents = function() {
      $http.get('/api/student').success(function (student) {
        $scope.data = student;
      });
    };
    $scope.getStudents();
///

    $scope.calculateGPA = function(student){
      if (array.length == 0) {
        return 0;
      }
      var pointsEarned = 0;
      var totalCredits = 0;
      for (var index = 0; index < student.courses.length; index++) {
        var course = student[index];
        pointsEarned += course.credits * $scope.letterToNum(course.grade);
        totalCredits += course.credits;
      }
      return pointsEarned/totalCredits;
    }

    $scope.getIndividual = function(){
      var id = document.location.search
      id = id.split("=");
      id = id[1]; //since we want what's after the first =
      return $scope.data[id];

    }

    $scope.letterToNum = function(letter){
      letter = letter.toUpperCase();
      switch(letter) {
        case "A":
          return 4.0;
        case "B":
          return 3.0;
        case "C":
          return 2.0;
        case "D":
          return 1.0;
        default:
          return 0.0;
      }
    }

  });
