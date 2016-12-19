angular.module('starter')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('API_ENDPOINT', {
  // holds the address of the API
  // url: 'http://192.168.237.128:8080/api'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
  url: 'http://127.0.0.1:8080/api'
});
