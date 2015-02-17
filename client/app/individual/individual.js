'use strict';

angular.module('jsonDataProcessingLabWithResaThomasJessPrestonApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('individual', {
        url: '/individual',
        templateUrl: 'app/individual/individual.html',
        controller: 'IndividualCtrl'
      });
  });