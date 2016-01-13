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

	.controller('SignupCtrl', ['$rootScope', '$log', '$timeout', '$uibModal', 'UserService', 'ENDPOINTS', function ($rootScope, $log, $timeout, $uibModal, UserService, ENDPOINTS) {
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

		var openPendingModal = function(username,email) {
			signupCtrl.modalInstance = $uibModal.open({
				templateUrl: 'signup/pending-modal.tpl.html',
				controller: 'SignupPendingCtrl as signupPendingCtrl',
				resolve: {
					Username: function(){
						return username;
					},
					Email: function(){
						return email;
					}
				}
			});
		};

		var signup = function(user) {
			UserService.signup(user).then(function(response){
				$log.log('singup() response', response);
				if(response.error_id){
					var errors = [];
					errors.push(response.error_message);
					$rootScope.$broadcast('ErrorAlert',errors);
					return;
				}

				// Open a modal to let the user know an email will be sent.
				openPendingModal(user.username,user.email);

				// Soon, the challange code won't be avaialbe from the reponse. 
				// For now, how the confirmation link so we can test the entire process.
				var link = ENDPOINTS.ROOT + '#/signup/confirm/dashevolution/' + user.username + '/' + response.data.challenge_code;
				$log.info('This needs to go away, but for now...', link);

				// Clear out the user details.
				signupCtrl.newUser = {};
			});
		};
		// ************************** //END - Private Methods **************************



		// ************************** BEGIN - Public Methods **************************
		signupCtrl.signUp = function() {
			signup(signupCtrl.newUser);
		};
		// ************************** //END - Public Methods **************************
	}])

	.controller('SignupPendingCtrl', ['$state', '$log', '$uibModalInstance', 'Username', 'Email', function ($state, $log, $uibModalInstance, Username, Email) {
		var signupPendingCtrl = this,
			username = signupPendingCtrl.username = Username,
			email = signupPendingCtrl.email = Email;
		
		signupPendingCtrl.cancel = function(){
			$uibModalInstance.close();
		};
	}])

;

