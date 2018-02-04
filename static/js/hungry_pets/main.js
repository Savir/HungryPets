app = angular.module('HungryPets', ['ui.router', 'ngCookies']);
app.constant('CONSTANTS', {
  root: '/static/js/hungry_pets/'
});

app.config(function($locationProvider, $urlRouterProvider, $stateProvider, CONSTANTS) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $stateProvider.state('hungry_pets', {
    abstract: true,
    url: "",
    templateUrl: CONSTANTS.root + 'states/main.html'
  });
  $urlRouterProvider.otherwise('/err');
});

function HungryPetsCtrl($scope) {}
app.controller('HungryPetsCtrl', HungryPetsCtrl);

app.run(function($http, $state, $rootScope, UserFactory){
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
  //$state.go('account');
  console.log("App running");
});
