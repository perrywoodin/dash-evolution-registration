angular.module('home', [])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.home', {
				url: '/home',
				views: {
					'main@root': {
						templateUrl: 'home/home.tpl.html',
						controller: 'HomeCtrl as homeCtrl'
					}
				}
			});
	}])

	.controller('HomeCtrl', ['$scope', '$log', function ($scope, $log) {
		var homeCtrl = this;

		$log.info('this is the home controller');
	}])

;