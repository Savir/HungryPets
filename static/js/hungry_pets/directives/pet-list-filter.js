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

      var price_limits = {
        min: 1000,
        max: 0
      };
      pets_copy.forEach(function(pet){
        if (price_limits.min > parseFloat(pet.price)) { price_limits.min = pet.price; }
        if (price_limits.max < parseFloat(pet.price)) { price_limits.max = pet.price; }
      });

      scope.filter = {
        species_names: [],
        breed_names: [],
        min_price: price_limits.min,
        max_price: Math.ceil(price_limits.max)
      };

      scope.price_slider_options = {
        floor: Math.floor(price_limits.min),
        ceil: Math.ceil(price_limits.max),
        onEnd: function() { refilter_pets(); }
      };
      scope.$broadcast('rzSliderForceRender');

      function refilter_pets() {
        var new_pets = angular.copy(pets_copy);
        for (var i=new_pets.length - 1; i >= 0; i--) {
          var pet = new_pets[i];
          if (scope.filter.species_names.length > 0 && scope.filter.species_names.indexOf(pet.species_name) < 0) {
            new_pets.splice(i, 1);
            continue;
          }
          if (scope.filter.breed_names.length > 0 && scope.filter.breed_names.indexOf(pet.breed_name) < 0) {
            new_pets.splice(i, 1);
            continue;
          }
          if (parseFloat(pet.price) < scope.filter.min_price || parseFloat(pet.price) > scope.filter.max_price) {
            new_pets.splice(i, 1);
            continue;
          }
        }
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
    }
  }
});
