app.config(function($stateProvider, CONSTANTS) {
  $stateProvider.state('hungry_pets.signup', {
    //permissions: {authenticated: true},
    url: '/signup',
    templateUrl: CONSTANTS.root + '/states/signup.html',
    controller: 'SignupController',
  });
});

app.controller('SignupController', function(UserFactory, $scope) {
  console.log('Register state loaded');
  $scope.errors = [];

  $scope.signup = function() {
    UserFactory.signup(
      $scope.email,
      $scope.first_name,
      $scope.last_name,
      $scope.phone_number,
      $scope.password,
      $scope.confirm_password
    ).then(
      function() { $state.go('hungry_pets.login'); },
      function(err) { $scope.$broadcast("server-user-errors", err.data); }
    );
  };

});
