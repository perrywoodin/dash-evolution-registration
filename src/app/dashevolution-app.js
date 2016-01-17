angular.module('dashevolution', [
	'ui.router',
	'ui.bootstrap',
	'ngSanitize',
	// Set CONSTANT
	'config',
	// App modules
	'services',
	'layout',
	'home',
	'signup',
	'converters',
	'vendors',
	'documentation',
	'alerts',
	// Template cache
	'templates.app',
	'templates.common' 
])

	.config(function ($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) { 
		$httpProvider.interceptors.push('httpResponseInterceptor');

		$locationProvider.html5Mode(false);
		$stateProvider
			.state('root', {
				abstract: true,
				views: {
					'': {
						templateUrl: 'common/layout/main.tpl.html',
						controller: 'RootCtrl as rootCtrl'
					},
					'header@root': {
						templateUrl: 'common/layout/header.tpl.html',
						controller: 'HeaderCtrl as headerCtrl'
					},
					'footer@root': {
						templateUrl: 'common/layout/footer.tpl.html',
						controller: 'FooterCtrl'
					}
				}
			})
		; 

		$urlRouterProvider.otherwise('/home'); 
	})

	.run([ function () {

	}])

	.controller('RootCtrl', ['$rootScope', '$log', '$uibModal', function ($rootScope, $log, $uibModal) {
		var rootCtrl = this;

		var showErrorModal = function(errors){
			var _errors = errors;
			rootCtrl.modalInstance = $uibModal.open({
				templateUrl: 'common/alerts/errors/alerts-errors-modal.tpl.html',
				controller: 'AlertsErrorsModalCtrl as alertsErrorsModdalCtrl',
				resolve: {
					Errors: function(){
						return _errors;
					}
				}
			});
		};

		$rootScope.$on('ErrorAlert',function(event,errors){
			showErrorModal(errors);
		});

	}])	
;