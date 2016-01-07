angular.module('signup.confirm', [])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.signup.confirm', {
				url: '/confirm/:code',
				views: {
					'main@root': {
						templateUrl: 'signup/confirm/confirm.tpl.html',
						controller: 'ConfirmCtrl as confirmCtrl'
					}
				}
			});
	}])

	.controller('ConfirmCtrl', ['$scope', '$log', '$stateParams', '$state', 'UsersModel', function ($scope, $log, $stateParams, $state, UsersModel) {
		var confirmCtrl = this,
			code = $stateParams.code;

		// If the code is not accessible from the URL, redirect to the signup page.
		if(!code){
			$state.go('root.signup');
		}

		UsersModel.validate(code);

		// ************************** BEGIN - Private Methods **************************


		// ************************** //END - Private Methods **************************




		// ************************** BEGIN - Public Methods **************************
		
		// ************************** //END - Public Methods **************************
	}])

;