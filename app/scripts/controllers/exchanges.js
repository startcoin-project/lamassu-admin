'use strict';

angular.module('myApp').controller('ExchangesCtrl', function ($scope, $http) {

  $scope.saveExchangeConfig = function() {
    $http({
      url: '/exchange',
      method: 'POST',
      data: JSON.stringify($scope.config),
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status, headers, config) {
      $scope.successMessage = "Exchange config updated."
    }).error(function (data, status, headers, config) {
      $scope.errorMessage = "Exchange not updated."
    });
  };  

  $scope.getExchangeConfig = function () {
    $http({
      url: '/exchange',
      method: 'GET'
    }).success(function(data){
      if(data.ok) {
        $scope.config = data.config;
      }
    }).error(function() {
    });
  };

  $scope.getExchangeConfig();


});
