app.directive('petList', function(CONSTANTS) {
  return {
    restrict: 'E',
    templateUrl: CONSTANTS.root + 'directives/pet-list.html',
    scope: {
      pets: '=',
    },
    link: function(scope) {
      console.log("got pets: %o", scope.pets);
    }
  }
});
