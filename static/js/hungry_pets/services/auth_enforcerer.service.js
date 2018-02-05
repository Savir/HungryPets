app.service('AuthEnforcerService', function($state, $q, $timeout, UserFactory) {
  var self = this;
  // The given state requires an authenticated user.
  var state_requires_auth = function(state) {
    return state.permissions && state.permissions.authenticated;
  };

   // Enforce that a user be logged in
  this.enforce_login = function(ui_router_transition) {
    if (state_requires_auth(ui_router_transition.to())) {
      if (!UserFactory.is_locally_authenticated()) {
        // No cookie, don't even try to check the server
        console.log("No authentication cookie (no need to look any further)");
        return $state.go('hungry_pets.login');
      } else {
        // We got an authenticated cookie. Can we trust it??
        return UserFactory.current_user().then(
          function(user) {
            if (user == null) {
              console.log('User is NOT logged in. Redirecting to login/');
              return $state.go('hungry_pets.login');
            }
          }
        );
      }
    }
  }
})
