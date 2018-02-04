app.config(function($stateProvider, CONSTANTS) {
  $stateProvider.state('hungry_pets.home', {
    url: '/home',
    permissions: {
      authenticated: true
    },
    templateUrl: CONSTANTS.root + '/states/home.html',
    controller: 'HomeController',
    resolve: {
      user: function(UserFactory) { return UserFactory.current_user(); },
      pets: function(PetsFactory) { return PetsFactory.list(); }
    },
  });
});

app.controller('HomeController', function($scope, user, pets) {
  $scope.pets = pets;
  $scope.user = user;
});