app.config(function($stateProvider, CONSTANTS) {
  $stateProvider.state('hungry_pets.account', {
    url: '/account',
    templateUrl: CONSTANTS.root + '/states/account.html',
    controller: 'AccountController',
    resolve: {
      user: function(UserFactory) { return UserFactory.current_user(); }
    },
  });
});

app.controller('AccountController', function($scope, user) {
  console.log("in the account controller with user %o", user);
  $scope.email = user.email;
  $scope.first_name = user.first_name;
  $scope.last_name = user.last_name;
  $scope.phone_number = user.phone_number;
  $scope.password = null;
  $scope.confirm_password = null;
  //
  $scope.update_user = function() {
    console.log("Updating user");
  };
});