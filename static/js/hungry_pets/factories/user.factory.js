app.factory('UserFactory', function($http, $cookies){
    var UserFactory = {
      login: login,
      is_authenticated: is_authenticated,
      current_user: current_user,
      signup: signup
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
});
