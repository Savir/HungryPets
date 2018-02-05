app.config(function($stateProvider, CONSTANTS) {
  $stateProvider.state('hungry_pets.home', {
    url: '/home',
    permissions: {
      authenticated: true
    },
    templateUrl: CONSTANTS.root + '/states/home.html',
    controller: 'HomeController',
    resolve: {
      pets: function(PetsFactory) { return PetsFactory.list(); }
    },
  });
});

app.controller('HomeController', function($scope, pets) {
  $scope.pets = pets;
});