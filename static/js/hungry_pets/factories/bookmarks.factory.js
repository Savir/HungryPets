app.factory('BookmarksFactory', function($http) {
  var BookmarksFactory = {
    toggle_bookmark: toggle_bookmark
  };
  return BookmarksFactory;

  function toggle_bookmark(pet_id) {
    return $http.put('/hungry_pets/api/bookmarks/', {'pet_id': pet_id}).then(
      function(res) { return res.data; },
      function(err) { return []; },
    );
  };
});
