app.directive('petTile', function(CONSTANTS, BookmarksFactory) {
  return {
    restrict: 'E',
    templateUrl: CONSTANTS.root + 'directives/pet-tile.html',
    scope: {
      pet: '=',
      showHeart: '<'
    },
    link: function(scope) {
      scope.toggle_bookmark = function(pet){
        BookmarksFactory.toggle_bookmark(pet.id).then(
          function(data){pet.is_bookmarked = data.is_bookmarked;}
        )
      };
    }
  }
});
