angular.module('converters', [])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.converters', {
				url: '/converters',
				views: {
					'main@root': {
						templateUrl: 'converters/converters.tpl.html',
						controller: 'ConvertersCtrl as convertersCtrl'
					}
				}
			});
	}])

	.controller('ConvertersCtrl', ['$scope', '$log', function ($scope, $log) {
		var convertersCtrl = this;

		$log.info('this is the convertersCtrl controller');
	}])

;