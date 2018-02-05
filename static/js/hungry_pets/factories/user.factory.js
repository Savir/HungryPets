app.factory('UserFactory', function($http, $cookies){
    var UserFactory = {
      login: login,
      logout: logout,
      current_user: current_user,
      is_locally_authenticated: is_locally_authenticated,
      user_to_cookie: user_to_cookie,
      user_from_cookie: user_from_cookie,
      display_name: display_name,
      signup: signup,
      partial_update: partial_update
    };
    return UserFactory;

    // Functions for the UserFactory objects:
    function login(email, password) {
        return $http.post('/hungry_pets/api/login', {
            email: email,
            password: password
        }).then(
          function(res){ user_to_cookie(res != null ? res.data : null); },
          function(err){ user_to_cookie(null); }
        );
    }

    function logout() {
      user_to_cookie(null);
      $http.get('/hungry_pets/api/logout');
    }

    function current_user() {
      return $http.get('/hungry_pets/api/user/').then(
        function(res) { user_to_cookie(res.data); return res.data; },
        function(err) { user_to_cookie(null); return null; },
      );
    }

    function is_locally_authenticated() {
        return user_from_cookie() != null;
    }

    function user_to_cookie(user) {
      if (user == null) {
        $cookies.remove("hungry_pets_user");
      } else {
        $cookies.putObject("hungry_pets_user", user);
      }
    }

    function user_from_cookie() {
      return $cookies.getObject("hungry_pets_user");
    }

    function display_name() {
      var local_user = user_from_cookie();
      if (local_user != null) {
        if (local_user.first_name != null && local_user.first_name.length > 0) {
          return local_user.first_name
        } else {
          return local_user.email;
        }
      }
      return "";
    }

    function signup(email, first_name, last_name, phone_number, password, confirm_password) {
      return $http.post('/hungry_pets/api/user/', {
        email: email,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        password: password,
        confirm_password: confirm_password
      });
    }

    function partial_update(email, first_name, last_name, phone_number, password, confirm_password) {
      var put_data = {};
      if (email != null && email.length > 0) { put_data.email = email; }
      if (first_name != null && first_name.length > 0) { put_data.first_name = first_name; }
      if (last_name != null && last_name.length > 0) { put_data.last_name = last_name; }
      if (phone_number != null && phone_number.length > 0) { put_data.phone_number = phone_number; }
      if (password != null && password.length > 0) { put_data.password = password; }
      if (confirm_password != null && confirm_password.length > 0) { put_data.confirm_password = confirm_password; }
      return $http.put('/hungry_pets/api/user/', put_data);
    }
});
