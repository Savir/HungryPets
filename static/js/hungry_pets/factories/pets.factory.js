app.factory('PetsFactory', function($http) {
  var PetsFactory = {
    list: list
  };
  return PetsFactory;

  function list() {
    return $http.get('/hungry_pets/api/pets/').then(
      function(res) { return res.data; },
      function(err) { return []; },
    );
  }

});
