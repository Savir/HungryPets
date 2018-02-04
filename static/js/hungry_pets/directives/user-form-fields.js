app.directive('userFormFields', function(CONSTANTS) {
  return {
    restrict: 'E',
    templateUrl: CONSTANTS.root + 'directives/user-form-fields.html',
    scope: {
      mode: '@',
      email: '=',
      firstName: '=',
      lastName: '=',
      phoneNumber: '=',
      password: '=',
      confirmPassword: '=',
    },
  }
});
