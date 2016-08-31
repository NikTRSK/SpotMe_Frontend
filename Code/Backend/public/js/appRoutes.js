angular.module('appRoutes', [])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/manageusers', {
			templateUrl: 'views/manageusers.html',
			controller: 'UsersController'
		})

		.when('/createuser', {
			templateUrl: 'views/createuser.html',
			controller: 'UsersController'
		})

		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'UsersController'
		})

    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'UsersController'
    });

	$locationProvider.html5Mode(true);

}]);