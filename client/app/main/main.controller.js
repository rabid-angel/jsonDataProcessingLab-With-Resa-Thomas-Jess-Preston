'use strict';

angular.module('jsonDataProcessingLabWithResaThomasJessPrestonApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.localData = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
//////
    $scope.getStudents = function() {
      $http.get('/api/student').success(function (student) {
        $scope.localData = student;
      });
    };
    $scope.getStudents();
//////

    $scope.calculateGPA = function(student){
     var studentCourses = student.courses;
      if (array.length == 0) {
        return 0;
      }
      var pointsEarned = 0;
      var totalCredits = 0;
      for (var index = 0; index < studentCourses.length; index++) {
        var courseInList = studentCourses[index];
        pointsEarned += courseInList.course.credits * $scope.letterToNum(courseInList.grade);
        totalCredits += courseInList.course.credits;
      }
      return pointsEarned/totalCredits;
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
