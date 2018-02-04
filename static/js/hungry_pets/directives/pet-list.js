app.directive('petList', function(CONSTANTS) {
  return {
    restrict: 'E',
    templateUrl: CONSTANTS.root + 'directives/pet-list.html',
    scope: {
      pets: '=',
      showHeart: '<'
    }
  }
});
