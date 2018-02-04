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
      confirmPassword: '='
    },
    link: function(scope) {
      scope.errors = [];

      //
      var check_password_match = function() {
        if (scope.password && scope.password.length > 0 || scope.confirmPassword && scope.confirmPassword.length > 0) {
          if (scope.password !== scope.confirmPassword) {
            return false;
          }
        }
        return true;
      };

      var add_error = function(error){
        if (scope.errors.indexOf(error) < 0) { scope.errors.push(error); }
      };
      //

      scope.check_for_errors = function() {
        scope.errors = []
        var msgs = {
          password_match_error: "Password and its confirmation don't match"
        };
        if (!check_password_match()) { add_error(msgs.password_match_error); }
      };

      scope.$on("server-user-errors", function(event, errors_obj){
        scope.check_for_errors();

        for (var field in errors_obj) {
          if (errors_obj.hasOwnProperty(field)) {
            var field_errors = errors_obj[field];
            field_errors.forEach(function(field_error){ add_error(field_error); });
          }
        }
      });
    } // End link
  }
});
