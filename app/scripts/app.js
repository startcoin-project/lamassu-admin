'use strict';

var app = angular.module('myApp', ['ngRoute', 'http-auth-interceptor']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/exchanges', {
      templateUrl: 'views/exchanges.html',
      controller: 'ExchangesCtrl'
    })
    .when('/commissions', {
      templateUrl: 'views/commissions.html',
      controller: 'CommissionsCtrl'
    })
    .otherwise({
      redirectTo: '/login'
    });
});

app.run(function ($rootScope, $location) {

  $rootScope.$on('event:auth-loginRequired', function () {
    var path = $location.path();
    if (path === '/login' || path === '/signup' || path === '/home') {
      return;
    }
    $location.path('/login');
  });

});
