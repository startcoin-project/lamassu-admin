'use strict';

angular.module('myApp').controller('MainCtrl', function ($rootScope, $scope, User, $location, authService) {

  var publicRoutes = ['login'];

  $rootScope.$on('login', function(event, user) {
    $scope.user = user;
  });

  $rootScope.$on('logout', function() {
    $scope.user = null;
  });

  // Prevent the user from visiting restricted routes if they're not logged in,
  // or from visiting the login or signup pages if they are logged in
  var checkRoute = function (event, route) {
    if (!route) {
      return;
    }

    route = route.split('/').pop();

    if (!$scope.user) {
      if (!_.contains(publicRoutes, route)) {
        event.preventDefault();
      }
    } else if (_.contains(['login', 'signup'], route)) {
      event.preventDefault();
    }
  };

  $scope.checkLoginStatus = function () {
    User.instance(function (data) {
      if (data.user) {
        authService.loginConfirmed();
      } else {
        var route = $location.path().split('/')[1];
        if (!_.contains(publicRoutes, route)) {
          $location.path('/login');
        }
      }
      $rootScope.$on('$locationChangeStart', function (event, next) {
        checkRoute(event, next);
      });
    });
  };

  $scope.checkLoginStatus();

  $scope.logout = function () {
    User.logout(function () {
      $location.path('/login');
    });
  };

});
