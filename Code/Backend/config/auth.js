// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

  'facebookAuth' : {
    'clientID' 		: '1493659497603839', // your App ID
    'clientSecret' 	: '1dfdf4c536e3e56beeb6d020bb923b8a', // your App Secret
    'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
  },

  'twitterAuth' : {
    'consumerKey' 		: 'your-consumer-key-here',
    'consumerSecret' 	: 'your-client-secret-here',
    'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
  },

  'googleAuth' : {
    'clientID' 		: 'your-secret-clientID-here',
    'clientSecret' 	: 'your-client-secret-here',
    'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
  }

};