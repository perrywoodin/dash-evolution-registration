angular.module('signup', [
		'signup.confirm'
	])

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

	.controller('SignupCtrl', ['$rootScope', '$log', '$uibModal', 'UserService', function ($rootScope, $log, $uibModal, UserService) {
		var signupCtrl = this;

		// ************************** BEGIN - Private Methods **************************
		// Launch a modal to fake an email so we can test the confirmation.
		var spoofEmail = function(signupResponse) {
			signupCtrl.modalInstance = $uibModal.open({
				templateUrl: 'signup/fake-email-modal.tpl.html',
				controller: 'FakeEmailCtrl as fakeEmailCtrl',
				resolve: {
					SignupResponse: function(){
						return signupResponse;
					}
				}
			});
		};

		var signup = function(user) {
			UserService.signup(user).then(function(response){
				if(response.error_id){
					var errors = [];
					errors.push(response.error_message);
					$rootScope.$broadcast('ErrorAlert',errors);
					return;
				}
				$log.log('singup() response', response);
				spoofEmail(response);
			});
		};
		// ************************** //END - Private Methods **************************

		

		// ************************** BEGIN - Public Methods **************************
		signupCtrl.signUp = function() {
			signup(signupCtrl.newUser);
		};
		// ************************** //END - Public Methods **************************
	}])

	// This entire controller is temporary until we can hook up to the backend. 
	.controller('FakeEmailCtrl', ['$state', '$log', '$uibModalInstance', 'SignupResponse', function ($state, $log, $uibModalInstance, SignupResponse) {
		var fakeEmailCtrl = this,
			signupResponse = fakeEmailCtrl.signupResponse = SignupResponse;

		fakeEmailCtrl.confirmEmail = function() {
			$uibModalInstance.close();
			$state.go('root.signup.confirm', {from:signupResponse.from_uid,to:signupResponse.to_uid,code:signupResponse.to_challenge_code});
		};
		
		fakeEmailCtrl.cancel = function(){
			$uibModalInstance.close();
		};
	}])

;