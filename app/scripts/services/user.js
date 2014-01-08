/*jshint camelcase: false, curly: false, unused: false */
'use strict';

angular.module('myApp').service('User', function User($rootScope, $http) {

  return {

    login: function(creds, win, fail) {
      $http({method: 'POST', url: '/auth/login', data: creds, cache: false}).
        success(function(data, status) {
          $rootScope.$emit('login', data.user);
          if (win) return win(data);
        }).
        error(function(data, status) {
          if (fail) return fail(data);
        });
    },

    logout: function(win, fail) {
      $http({method: 'POST', url: '/auth/logout', cache: false}).
        success(function(data, status) {
          $rootScope.$emit('logout');
          if (win) return win(data);
        }).
        error(function(data, status) {
          if (fail) return fail(data);
        });
    },

    instance: function(win, fail) {
      $http({method: 'GET', url: '/auth/instance', cache: false}).
        success(function(data, status) {
          if (data.user) {
            $rootScope.$emit('login', data.user);
          }
          if (win) return win(data);
        }).
        error(function(data, status) {
          if (fail) return fail(data);
        });
    }

  };

});

