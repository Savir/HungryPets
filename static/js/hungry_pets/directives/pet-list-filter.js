app.directive('petListFilter', function(CONSTANTS, MiscUtils) {
  return {
    restrict: 'E',
    templateUrl: CONSTANTS.root + 'directives/pet-list-filter.html',
    scope: {
      pets: '=',
    },
    link: function(scope) {
      var pets_copy = angular.copy(scope.pets);
      scope.species_names = MiscUtils.extract_uniques(scope.pets, 'species_name').sort();
      scope.breed_names = MiscUtils.extract_uniques(scope.pets, 'breed_name').sort();
      scope.filter = {
        species_names: [],
        breed_names: [],
        min_price: 0,
        max_price: 1000
      };

      scope.price_slider_options = {
        floor: 0,
        ceil: 450,
        onEnd: function() { refilter_pets(); }
      };

      function refilter_pets() {
        var new_pets = angular.copy(pets_copy);
        for (var i=new_pets.length - 1; i >= 0; i--) {
          console.log("i=%s", i);
          var pet = new_pets[i];
          if (scope.filter.species_names.length > 0 && scope.filter.species_names.indexOf(pet.species_name) < 0) {
            new_pets.splice(i, 1);
          }
          if (scope.filter.breed_names.length > 0 && scope.filter.breed_names.indexOf(pet.breed_name) < 0) {
            new_pets.splice(i, 1);
          }
          if (pet.price < scope.filter.min_price || pet.price > scope.filter.max_price) {
            new_pets.splice(i, 1);
          }
        }
        console.log("After refilter got %s pets: %s", new_pets.length, new_pets);
        scope.pets = new_pets;
      }

      scope.is_filter_by_species_name = function(name) { return scope.filter.species_names.indexOf(name) >= 0; }
      scope.is_filter_by_breed_name = function(name) { return scope.filter.breed_names.indexOf(name) >= 0; }
      scope.toggle_species_name_filter = function(name) {
        MiscUtils.toggle_value(scope.filter.species_names, name);
        refilter_pets();
      }
      scope.toggle_breed_name_filter = function(name) {
        MiscUtils.toggle_value(scope.filter.breed_names, name);
        refilter_pets();
      }

      console.log("got breed_names: %o",  scope.breed_names);
    }
  }
});
