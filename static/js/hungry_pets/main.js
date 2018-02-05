app = angular.module(
    'HungryPets',
    ['ui.router', 'ngCookies', 'rzModule']
);
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
  $urlRouterProvider.otherwise('/home');  // If not logged, this will redirect to login
});

function HungryPetsCtrl() {};
app.controller('HungryPetsCtrl', HungryPetsCtrl);

app.run(function($http, $state, $transitions, $rootScope, UserFactory, AuthEnforcerService){
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
  console.log("App running");
  $rootScope.user_display_name = UserFactory.display_name;
  $rootScope.logout = function(){
    UserFactory.logout();
    $state.go('hungry_pets.login')
  };

  $transitions.onStart({},
    function(transition) { AuthEnforcerService.enforce_login(transition); }
  );
});
