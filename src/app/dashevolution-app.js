angular.module('dashevolution', [
	'ui.router',
	'ui.bootstrap',
	'ngSanitize',
	'ngWebsocket',
	// Set CONSTANT
	'config',
	// App modules
	'layout',
	'home',
	'signup',
	'converters',
	'documentation',
	// Template cache
	'templates.app',
	'templates.common' 
])

	.config(function ($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) { 
		
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

	.run(['$websocket', function ($websocket) {
		var ws = $websocket.$new({
			url: 'ws://localhost:12345',
			mock: true
		});

		ws.$on('$open', function () {
			ws.$emit('test_ws', 'Mock websocket is working.');
		})
			.$on('test_ws', function (message) {
				console.log(message);
			});

	}])

	.controller('RootCtrl', ['$rootScope', '$log', function ($rootScope, $log) {
		var rootCtrl = this;


	}])

;