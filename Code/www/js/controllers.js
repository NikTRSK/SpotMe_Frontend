angular.module('starter')

.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('inside');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})

.controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})

.controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };

  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };
})

.controller('CreateProfileCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
    $scope.fitness_level = [
    // value is the value of the field to be used with logic
    { text: "Beginner", value: "beginner" },
    { text: "Intermediate", value: "intermediate" },
    { text: "Advanced", value: "advanced" },
    { text: "Overall Health & Wellness", value: "overall health & wellness" },
    { text: "Build Muscle Mass", value: "build muscle mass" },
    { text: "Lose Weight", value: "lose weight" }
  ];

  // store all of the form data
  $scope.formData = {};

  // process the form here
  $scope.processForm = function() {
    console.log('we made it!!!');
    console.log($scope.formData);
    $scope.pairingMode;
  };

})

.controller('pairingModeCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
    $scope.fitness_goals = [
    // value is the value of the field to be used with logic

  ];
})

.controller('pairingMode2Ctrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
    $scope.fitness_goals = [
    // value is the value of the field to be used with logic

  ];
})

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
});
