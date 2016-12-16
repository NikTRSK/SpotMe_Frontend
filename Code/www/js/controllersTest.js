angular.module('starter')

.factory('dataFactory', ['$http', function($http) {

    var urlBase = 'Code/www/templates';
    var dataFactory = {};

    dataFactory.getHTML = function () {
        return $http.get(urlBase);
    };

    dataFactory.getHTMLPage = function (id) {
        return $http.get(urlBase + '/' + id);
    };
    return dataFactory;
}]);

.controller('MainCtrl', function( myService,$scope) {
  $scope.clearData = function() {
    $scope.data = {};
  };
  $scope.getData = function() {
    // Call the async method and then do stuff with what is returned inside our own then function
    myService.async().then(function(d) {
      $scope.data = d;
    });
  };
});