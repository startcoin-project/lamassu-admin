'use strict';

describe('Controller: ExchangesCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var ExchangesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExchangesCtrl = $controller('ExchangesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
