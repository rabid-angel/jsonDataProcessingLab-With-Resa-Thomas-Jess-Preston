'use strict';

describe('Controller: IndividualCtrl', function () {

  // load the controller's module
  beforeEach(module('jsonDataProcessingLabWithResaThomasJessPrestonApp'));
  beforeEach(module('socketMock'));

  var IndividualCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    IndividualCtrl = $controller('IndividualCtrl', {
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

  it('should be Math', function(){
    scope.individual = {major1: "Math", major2: null}
    expect(scope.getMajors()).toBe("Math");
  });

  it('should be Math, English', function(){
    scope.individual = {major1: "Math", major2: "English"}
    expect(scope.getMajors()).toBe("Math, English");
  });

});
