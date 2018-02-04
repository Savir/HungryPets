app.config(function($stateProvider, CONSTANTS) {
  $stateProvider.state('hungry_pets.account', {
    url: '/account',
    permissions: {
      authenticated: true
    },
    templateUrl: CONSTANTS.root + '/states/account.html',
    controller: 'AccountController',
    resolve: {
      user: function(UserFactory) { return UserFactory.current_user(); }
    },
  });
});

app.controller('AccountController', function($scope, user, UserFactory) {
  console.log("in the account controller with user %o", user);

  var email_back = user.email;
  $scope.email = user.email;

  var first_name_back = user.first_name;
  $scope.first_name = user.first_name;

  var last_name_back = user.last_name;
  $scope.last_name = user.last_name;

  var phone_number_back = user.phone_number;
  $scope.phone_number = user.phone_number;

  $scope.password = null;
  $scope.confirm_password = null;
  //
  $scope.update_user = function() {
    $scope.$broadcast("server-user-errors", {});

    UserFactory.partial_update(
      ($scope.email != email_back) ? $scope.email : null,
      ($scope.first_name != first_name_back) ? $scope.first_name : null,
      ($scope.last_name != last_name_back) ? $scope.last_name : null,
      ($scope.phone_number != phone_number_back) ? $scope.phone_number : null,
      $scope.password,
      $scope.confirm_password
    ).then(
      function(res) {
        $scope.email = res.data.email;
        $scope.first_name = res.data.first_name;
        $scope.last_name = res.data.last_name;
        $scope.phone_number = res.data.phone_number;
      },
      function(err) { $scope.$broadcast("server-user-errors", err.data); }
    );
  };
});