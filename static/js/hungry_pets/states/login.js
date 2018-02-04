app.config(function($stateProvider, CONSTANTS) {
  $stateProvider.state('hungry_pets.login', {
    //permissions: {authenticated: true},
    url: '/login',
    templateUrl: CONSTANTS.root + '/states/login.html',
    controller: 'LoginController',
    resolve: {
      pets: function(PetsFactory) { return PetsFactory.list(); }
    }
  });
});

app.controller('LoginController', function($state, $scope, UserFactory, pets) {
  console.log('we are in login state with %o pets', pets);
  check_already_logged();
  $scope.pets = pets;
  $scope.email = null;
  $scope.password = null;
  function check_already_logged() {
    // If the user is authenticated, they should not be here.
    if (UserFactory.is_authenticated()) {
      $state.go('/');
    }
  }

  $scope.login = function() {
    UserFactory.login($scope.email, $scope.password).then(
      function(res) {$state.go('hungry_pets.account');},
      function(res) {console.err("Error %o", res);}
    );
  }
});
