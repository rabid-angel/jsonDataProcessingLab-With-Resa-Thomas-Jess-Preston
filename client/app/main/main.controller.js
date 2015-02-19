'use strict';

angular.module('jsonDataProcessingLabWithResaThomasJessPrestonApp')
  .controller('MainCtrl',['$scope', '$filter', '$http', function ($scope, $filter, $http, socket) {
    var orderBy = $filter('orderBy');
    $scope.awesomeThings = [];
    $scope.localData = [];
    $scope.order = function(predicate, reverse){
      $scope.localData = orderBy($scope.localData, predicate, reverse);
    };
    $scope.order('lastName', false);
    //$http.get('/api/things').success(function(awesomeThings) {
    //  $scope.awesomeThings = awesomeThings;
    //  socket.syncUpdates('thing', $scope.awesomeThings);
    //});


    $scope.addThing = function() {
      if($scope.newThing === '') {
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
      console.log("We Got Here");
    //  student = student.toJSON();
     var studentCourses = student.courses;
      if (studentCourses.length == 0) {
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

    $scope.calculateNumberOfCredits = function(student){
      var studentCourses = student.courses;
      if (studentCourses.length == 0) {
        return 0;
      }
      var totalCredits = 0;
      for (var index = 0; index < studentCourses.length; index++) {
        var courseInList = studentCourses[index];
        totalCredits += courseInList.course.credits;
      }
      return totalCredits;
    }

  $scope.getGradeYear = function(credits){
      if(credits < 0){
        return "Impossible Amount of Credits";
      }
       if(credits < 30) {
         return "Freshman";
       }else if( credits < 60) {
         return "Sophomore";
       }else if(credits < 90) {
         return "Junior";
       }else{
         return "Senior";
       }
    }

    $scope.addGPA = function(){
      for(i=0; i<localData.length; i++){
        localData[i].GPA = calculateGPA(localData[i]);
      }
    };
    $scope.addGPA();

    //$scope.addCredits = function(){
    //  for(i=0; i<localData.length; i++){
    //    localData[i].completedCredits = (localData[i]);
    //  }
    //};
    //$scope.addCredits();

  }]);
