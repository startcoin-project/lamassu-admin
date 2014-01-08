/*jshint unused: false */
'use strict';

angular.module('myApp').controller('LoginCtrl', function ($scope, $location, authService, User) {

  $scope.login = function (credentials) {

    if (!$scope.loginForm.$valid) {
      $scope.failMessage = 'Please enter email and password!';
      return;
    }

    credentials.email = credentials.email.toLowerCase();

    User.login(credentials, function (data) {
      authService.loginConfirmed();
      $location.path('/');
    }, function (data) {
      $scope.failMessage = 'Incorrect email or password!';
    });

  };

});
