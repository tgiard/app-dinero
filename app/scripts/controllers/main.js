'use strict';

/**
 * @ngdoc function
 * @name dineroApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dineroApp
 */
angular.module('dineroApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
