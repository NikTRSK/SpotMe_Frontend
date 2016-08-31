angular.module('UsersCtrl', []).controller('UsersController', function($scope, $http) {
  //$scope.userData = {};

  $scope.getUsers = function () {
    // get all users and show them
    $http.get('/api/user')
      .then(function (response) {
          $scope.users = response.data;
          console.log(response);
        },
        function (response) {
          console.log('Error: ', response);
        });
  };

  // create a new user
  $scope.createUser = function () {
    console.log($scope.user);
    $http.post('/api/user', angular.toJson($scope.user))
      .success(function (response) {
        console.log(response);

      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };

  $scope.loginUser = function () {
    // check if user exists
    $http.post('/api/login', angular.toJson($scope.user))
      .success(function (response) {
        console.log(response);
        $scope.message = response.message;
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  };
});