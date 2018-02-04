app.factory('UserFactory', function($http, $cookies){
    var UserFactory = {
      login: login,
      is_authenticated: is_authenticated,
      current_user: current_user,
      signup: signup,
      partial_update: partial_update
    };
    return UserFactory;

    // Functions for the UserFactory objects:
    function login(email, password) {
        return $http.post('/hungry_pets/api/login', {
            email: email,
            password: password
        });
    }

    function is_authenticated() {
        return !!$cookies.authenticatedAccount;
    }

    function current_user() {
      return $http.get('/hungry_pets/api/user/').then(
        function(res) { return res.data; },
        function(err) { return null; },
      );
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
