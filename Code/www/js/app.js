// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards2', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('outside', {
    url: '/outside',
    abstract: true,
    templateUrl: 'templates/outside.html'
  })
  .state('outside.login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })
  .state('outside.register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  .state('inside', {
    url: '/inside',
    templateUrl: 'templates/inside.html',
    controller: 'InsideCtrl'
  })
  .state('createProfile', {
    url: '/createProfile',
    templateUrl: 'templates/createProfile.html',
    controller: 'CreateProfileCtrl'
  })
  .state('editProfile', {
    url: '/editProfile',
    templateUrl: 'templates/editProfile.html',
    controller: 'ProfileCtrl'
  })
  .state('pairingMode', {
    url: '/pairingMode',
    templateUrl: 'templates/pairingMode.html',
    controller: 'PairingModeCtrl'
  })
  .state('editPairing', {
    url: '/editPairing',
    templateUrl: 'templates/editPairing.html',
    controller: 'PairingModeCtrl'
  })
  .state('matches', {
    url: '/matches',
    templateUrl: 'templates/matches.html',
    controller: 'MatchesCtrl'
  })
  .state('chatBox', {
    url: '/chatBox',
    templateUrl: 'templates/chatBox.html',
    controller: 'ChatBoxCtrl'
  })
  .state('chatMatchList', {
    url: '/chatMatchList',
    templateUrl: 'templates/chatMatchList.html',
    controller: 'ChatBoxCtrl'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'ProfileCtrl'
  })

  .state('mainMenu', {
    url: '/mainMenu',
    templateUrl: 'templates/mainMenu.html',
    controller: 'ProfileCtrl'
  });
  $urlRouterProvider.otherwise('/outside/login');
})

  .directive('noScroll', function($document) {

    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {

        $document.on('touchmove', function(e) {
          e.preventDefault();
        });
      }
    }
  })

.run(function ($rootScope, $state, $ionicPlatform, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'outside.login' && next.name !== 'outside.register' && next.name !== 'createProfile' && next.name !== 'editProfile' && next.name !== 'createProfile2' && next.name !== 'pairingMode' && next.name !== 'editPairing' && next.name !== 'matches' && next.name !== 'chatBox' && next.name !== 'chatMatchList' && next.name !== 'profile' && next.name !== 'mainMenu') { // testing only. take out last condition
        event.preventDefault();
        $state.go('outside.login');
      }
    }
  });

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
