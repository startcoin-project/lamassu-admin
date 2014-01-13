'use strict';

angular.module('myApp').controller('ExchangesCtrl', function ($scope, $http) {

  $scope.saveExchangeConfig = function() {
    $http({
      url: '/exchange',
      method: 'POST',
      data: JSON.stringify($scope.config),
      headers: {'Content-Type': 'application/json'}
    }).success(function (data, status, headers, config) {
      console.log('success');
      $scope.successMessage = "Exchange config updated."
    }).error(function (data, status, headers, config) {
      console.log('error')
      $scope.errorMessage = "Exchange not updated."
    });
  };  

  $scope.getExchangeConfig = function () {
    $http({
      url: '/exchange',
      method: 'GET'
    }).success(function(data){
      $scope.config = data;
    }).error(function() {
    });
  };

  $scope.getExchangeConfig();


});
