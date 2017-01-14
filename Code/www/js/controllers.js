angular.module('starter')

.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('matches');
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

.controller('PairingModeCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
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

.controller('MatchesCtrl', function($http, $scope, AuthService, $ionicPopup, TDCardDelegate, $timeout, API_ENDPOINT) {

  $scope.matches = [];

  $http.put(API_ENDPOINT.url + '/getMatches', $scope.formData).then(function(result) {
    // $scope.memberinfo = result.data.msg;
    console.log(result.data.msg);
      console.log($scope.matches);
    $scope.matches = result.data;
  });

  var cardTypes = [
    { image: 'http://c4.staticflickr.com/4/3924/18886530069_840bc7d2a5_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/421/19046467146_548ed09e19_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/278/18452005203_a3bd2d7938_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/297/19072713565_be3113bc67_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/536/19072713515_5961d52357_n.jpg' },
    { image: 'http://c4.staticflickr.com/4/3937/19072713775_156a560e09_n.jpg' },
    { image: 'http://c1.staticflickr.com/1/267/19067097362_14d8ed9389_n.jpg' }
  ];

  //setup initial card
  // if user not in matched array return
  // else return the user

  $scope.cards = {
    master: Array.prototype.slice.call(cardTypes, 0),
    active: Array.prototype.slice.call(cardTypes, 0),
    discards: [],
    liked: [],
    disliked: []
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.active.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[0];
    $scope.cards.active.push(angular.extend({}, newCard));
  };

  $scope.refreshCards = function() {
    // Set $scope.cards to null so that directive reloads
    $scope.cards.active = null;
    $timeout(function() {
      $scope.cards.active = Array.prototype.slice.call($scope.cards.master, 0);
    });
  };

  $scope.$on('removeCard', function(event, element, card) {
    var discarded = $scope.cards.master.splice($scope.cards.master.indexOf(card), 1);
    $scope.cards.discards.push(discarded);
  });

  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.disliked.push(card);
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    var card = $scope.cards.active[index];
    $scope.cards.liked.push(card);
    // send http request with username and user liked
  };

})

  .controller('ImageCtrl', function($scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService) {

/*    $ionicPlatform.ready(function() {
      $scope.images = FileService.images();
      $scope.$apply();
    });*/

    $scope.urlForImage = function(imageName) {
      var trueOrigin = cordova.file.dataDirectory + imageName;
      return trueOrigin;
    };

    $scope.addMedia = function() {
      $scope.hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: 'Take photo' },
          { text: 'Photo from library' }
        ],
        titleText: 'Add images',
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          $scope.addImage(index);
        }
      });
    };

    $scope.addImage = function(type) {
      $scope.hideSheet();
      ImageService.handleMediaDialog(type).then(function() {
        $scope.$apply();
      });
      console.log($scope.images.length);
    };

/*    $scope.sendEmail = function() {
      if ($scope.images != null && $scope.images.length > 0) {
        var mailImages = [];
        var savedImages = $scope.images;
        if ($cordovaDevice.getPlatform() == 'Android') {
          // Currently only working for one image..
          var imageUrl = $scope.urlForImage(savedImages[0]);
          var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
          var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
          $cordovaFile.copyFile(namePath, name, cordova.file.externalRootDirectory, name)
            .then(function(info) {
              mailImages.push('' + cordova.file.externalRootDirectory + name);
              $scope.openMailComposer(mailImages);
            }, function(e) {
              reject();
            });
        } else {
          for (var i = 0; i < savedImages.length; i++) {
            mailImages.push('' + $scope.urlForImage(savedImages[i]));
          }
          $scope.openMailComposer(mailImages);
        }
      }
    }*/

/*    $scope.openMailComposer = function(attachments) {
      var bodyText = '<html><h2>My Images</h2></html>';
      var email = {
        to: 'some@email.com',
        attachments: attachments,
        subject: 'Devdactic Images',
        body: bodyText,
        isHtml: true
      };

      $cordovaEmailComposer.open(email).then(null, function() {
        for (var i = 0; i < attachments.length; i++) {
          var name = attachments[i].substr(attachments[i].lastIndexOf('/') + 1);
          $cordovaFile.removeFile(cordova.file.externalRootDirectory, name);
        }
      });
    }*/
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


angular.module('starter')
// All this does is allow the message///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// to be sent when you tap return
.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})

.controller('ChatBoxCtrl', function($scope, $timeout, $ionicScrollDelegate) {

  $scope.hideTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      //userId: alternate ? '12345' : '54321',
      userId: '12345',
	  text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];

});
