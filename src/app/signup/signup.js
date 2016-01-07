angular.module('signup', [
		'signup.confirm',
		'dashevolution.models.users'
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

	.controller('SignupCtrl', ['$scope', '$log', '$uibModal', 'UsersModel', function ($scope, $log, $uibModal, UsersModel) {
		var signupCtrl = this;

		// ************************** BEGIN - Private Methods **************************
		// Launch a modal to fake an email so we can test the confirmation.
		var spoofEmail = function(user) {
			signupCtrl.modalInstance = $uibModal.open({
				templateUrl: 'signup/fake-email-modal.tpl.html',
				controller: 'FakeEmailCtrl as fakeEmailCtrl',
				resolve: {
					User: function(){
						return user;
					}
				}
			});
		};

		var signup = function(user) {
			// This will hit UsersModel.signup() which will be responsible for communicating with the endpoint.
		};
		// ************************** //END - Private Methods **************************



		// ************************** BEGIN - Public Methods **************************
		signupCtrl.signUp = function() {
			// signup(signupCtrl.newUser);
			spoofEmail(signupCtrl.newUser);
		};
		// ************************** //END - Public Methods **************************
	}])

	// This entire controller is temporary until we can hook up to the backend. 
	.controller('FakeEmailCtrl', ['$scope', '$state', '$uibModalInstance', 'User', function ($scope, $state, $uibModalInstance, User) {
		var fakeEmailCtrl = this,
			user = fakeEmailCtrl.user = User;

		fakeEmailCtrl.confirmEmail = function() {
			$uibModalInstance.close();
			$state.go('root.signup.confirm', {code:'1234'});
		};
		
		fakeEmailCtrl.cancel = function(){
			$uibModalInstance.close();
		};
	}])

;