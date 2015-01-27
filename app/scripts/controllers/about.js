'use strict';

/**
 * @ngdoc function
 * @name dineroApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dineroApp
 */
angular.module('dineroApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
