app.config(function($stateProvider, CONSTANTS) {
  $stateProvider.state('hungry_pets.login', {
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

  $scope.pets = pets;
  $scope.email = null;
  $scope.password = null;

  $scope.login = function() {
    UserFactory.login($scope.email, $scope.password).then(
      function(res) {$state.go('hungry_pets.home');},
      function(res) {console.error("Error %o", res);}
    );
  };

  $scope.go_to_signup = function() {
    $state.go("hungry_pets.signup");
  };
});
