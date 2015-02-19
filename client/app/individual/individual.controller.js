'use strict';

angular.module('jsonDataProcessingLabWithResaThomasJessPrestonApp')
  .controller('IndividualCtrl', function ($scope, $http, socket) {
    $scope.data = [];
    $scope.individual = null;
    $scope.validStudent = false;

///
    $scope.getStudents = function() {
      $http.get('/api/student').success(function (student) {
        $scope.data = student;
        $scope.addGPA();
        $scope.addCredits();
        $scope.addGradeYear();
        $scope.addId();
        console.log($scope.data);
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
      var id = document.location.search;
      id = id.split("=");
      id = id[1]; //since we want what's after the first =
      $scope.individual = $scope.data[id];
      if(-1 < id && id < $scope.data.length){
        $scope.validStudent = true;
      }
    }
    $scope.getIndividual();

    $scope.getMajors = function(){
      if(angular.isDefined($scope.individual.major2) && $scope.individual.major2 !== null ){
        return $scope.individual.major1+", "+$scope.individual.major2;
      }
      return $scope.individual.major1;
    }


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
      return (pointsEarned/totalCredits).toFixed(3);
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
        if(courseInList.grade != "F" && courseInList.grade != "IP"){
          totalCredits += courseInList.course.credits;
        }$scope.addGradeYear();
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
      for(var i=0; i<$scope.data.length; i++){$scope.addGradeYear();
        $scope.data[i].GPA = $scope.calculateGPA($scope.data[i]);
      }
    };


    $scope.addCredits = function(){
      for(var i=0; i<$scope.data.length; i++){
        $scope.data[i].completedCredits = $scope.calculateNumberOfCredits($scope.data[i]);
      }
    };

    $scope.addGradeYear = function(){
      for(var i=0; i<$scope.data.length; i++){
        $scope.data[i].gradeYear = $scope.getGradeYear($scope.data[i].completedCredits);
      }
    };

    //$scope.addId = function(){
    //  for(var i=0; i<$scope.localData.length; i++){
    //    $scope.localData[i].id = i+1;
    //  }
    //};


  });
