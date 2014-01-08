'use strict';

describe('Controller: CommissionsCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var CommissionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommissionsCtrl = $controller('CommissionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
