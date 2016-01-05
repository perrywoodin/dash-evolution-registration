angular.module('signup', [])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.signup', {
				url: '/signup',
				views: {
					'main@root': {
						templateUrl: 'signup/signup.tpl.html',
						controller: 'SignupCtrl as signupCtrl'
					}
				}
			});
	}])

	.controller('SignupCtrl', ['$scope', '$log', function ($scope, $log) {
		var signupCtrl = this;

		$log.info('this is the signupCtrl controller');

		// ************************** BEGIN - Private Methods **************************


		// ************************** //END - Private Methods **************************




		// ************************** BEGIN - Public Methods **************************
		signupCtrl.signUp = function() {
			console.log('newUser',signupCtrl.newUser);
		};
		// ************************** //END - Public Methods **************************
	}])

;