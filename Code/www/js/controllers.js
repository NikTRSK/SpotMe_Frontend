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
      // $state.go('outside.login');

      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });

      $scope.login = function() {
        AuthService.login($scope.user).then(function(msg) {
          $state.go('createProfile')
        }, function(errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: errMsg
          });
        });
      };

      $scope.login();
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
  $scope.heights = [ "4.0", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11",
    "5.0", "5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "5.11",
    "6.0", "6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11",
    "7.0", "7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9", "7.10", "7.11"];

  $scope.weights = [ "150", "151", "152", "153", "154", "155", "156", "157", "158", "159",
    "160", "161", "162", "163", "164", "165", "166", "167", "168", "169",
    "170", "171", "172", "173", "174", "175", "176", "177", "178", "179",
    "180", "181", "182", "183", "184", "185", "186", "187", "188", "189",
    "190", "191", "192", "193", "194", "195", "196", "197", "198", "199",
    "200", "201", "202", "203", "204", "205", "206", "207", "208", "209"];

  $scope.goalWeights = [ "150", "151", "152", "153", "154", "155", "156", "157", "158", "159",
    "160", "161", "162", "163", "164", "165", "166", "167", "168", "169",
    "170", "171", "172", "173", "174", "175", "176", "177", "178", "179",
    "180", "181", "182", "183", "184", "185", "186", "187", "188", "189",
    "190", "191", "192", "193", "194", "195", "196", "197", "198", "199",
    "200", "201", "202", "203", "204", "205", "206", "207", "208", "209"];

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
    $http.put(API_ENDPOINT.url + '/accountInfo', $scope.formData).then(function(result) {
      // $scope.memberinfo = result.data.msg;
      console.log(result.data.msg);
      $state.go('pairingMode');
    });
  };
})

.controller('pairingModeCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
/*    $scope.fitness_goals = [
    // value is the value of the field to be used with logic
      { text: "test" }
  ];*/

    console.log("in pairing");
  // store all of the form data
  $scope.paringData = {};

  // process the form here
  $scope.processPairingForm = function() {
    $http.put(API_ENDPOINT.url + '/accountInfo', $scope.paringData).then(function(result) {
      console.log(result.data.msg);
      console.log('going to matches screen');
      // $state.go('pairingMode');
    });
  };
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
