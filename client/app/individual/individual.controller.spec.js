'use strict';

describe('Controller: IndividualCtrl', function () {

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

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });

  it('should calculate a students GPA based on their class grades and class credits', function () {
    expect(scope.calculateGPA()).toBe(4);
  });
});
