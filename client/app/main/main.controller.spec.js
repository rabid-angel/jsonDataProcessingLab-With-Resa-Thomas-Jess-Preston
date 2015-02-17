'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('jsonDataProcessingLabWithResaThomasJessPrestonApp'));
  beforeEach(module('socketMock'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));


  it('should convert a grade letter to a credit value', function () {
    expect(scope.letterToNum("A")).toBe(4);
    expect(scope.letterToNum("B")).toBe(3);
    expect(scope.letterToNum("C")).toBe(2);
    expect(scope.letterToNum("D")).toBe(1);
    expect(scope.letterToNum("F")).toBe(0);

    expect(scope.letterToNum("a")).toBe(4);
    expect(scope.letterToNum("b")).toBe(3);
    expect(scope.letterToNum("c")).toBe(2);
    expect(scope.letterToNum("d")).toBe(1);
    expect(scope.letterToNum("f")).toBe(0);
  });



//Tests for CalculateGPA
  it('these results should yield 4.0', function(){
    var theOneClassAStudent = {
      "firstName": "Love",
      "lastName": "Roberts",
      "dateOfBirth": "1989-01-18",
      "gender": "male",
      "email": "loveroberts@eweville.com",
      "phone": "+1 (875) 519-3316",
      "address": "562 Eastern Parkway, Crayne, Virginia, 5152",
      "courses": [
        {
          "course": {
            "name": "Models of Computing Systems",
            "subject": "CSCI",
            "courseNumber": 3401,
            "credits": 4
          },
          "grade": "A"
        }]};
    expect(scope.calculateGPA(theOneClassAStudent)).toBeCloseTo(4.0, 2); // This makes sure we have 2 decimal points of precision.
  })

  it('these results should yield 2.0', function(){
    var theTwoClassStudent = {
      "firstName": "Love",
      "lastName": "Roberts",
      "dateOfBirth": "1989-01-18",
      "gender": "male",
      "email": "loveroberts@eweville.com",
      "phone": "+1 (875) 519-3316",
      "address": "562 Eastern Parkway, Crayne, Virginia, 5152",
      "courses": [
        {
          "course": {
            "name": "Models of Computing Systems",
            "subject": "CSCI",
            "courseNumber": 3401,
            "credits": 4
          },
          "grade": "A"
        },
        {
          "course": {
            "name": "Software Design and Development",
            "subject": "CSCI",
            "courseNumber": 3601,
            "credits": 4
          },
          "grade": "D"
        }]};
    expect(scope.calculateGPA(theTwoClassStudent)).toBeCloseTo(2.5, 2);
  })

});
