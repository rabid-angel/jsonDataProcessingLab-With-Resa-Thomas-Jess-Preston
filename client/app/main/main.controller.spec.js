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


 // it('should calculate a students GPA based on their class grades and class credits', function () {
 //   expect(scope.calculateGPA()).toBe(4);
 // });

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
    var theArray = [{class: "TheBestClass", credits: 4, grade: "A"}, {class: "TheSecondBestClass", credits: 2, grade: "a"}];
    expect(scope.calculateGPA(theArray)).toBeCloseTo(4.0, 2); // This makes sure we have 2 decimal points of precision.
  })

  it('these results should yield 2.56', function(){
    var theArray = [{class: "TheThirdClass", credits: 4, grade: "A"}, {class: "TheFourthBestClass", credits: 4, grade: "a"}, {class: "TheWorstClass", credits: 5, grade: "F"}, {class: "TheSecondBestClass", credits: 3, grade: "b"}];
    expect(scope.calculateGPA(theArray)).toBeCloseTo(2.56, 2);
  })

  it('these results should yield 2.9', function(){
    var theArray = [{class: "TheClass", credits: 1, grade: "d"}, {class: "TheFourthClass", credits: 4, grade: "C"}, {class: "TheWorst", credits: 5, grade: "A"}];
    expect(scope.calculateGPA(theArray)).toBeCloseTo(2.9, 2);
  })

  it('these results should yield 0', function(){
    var theArray = [];
    expect(scope.calculateGPA(theArray)).toBeCloseTo(0, 5);
  })

});
