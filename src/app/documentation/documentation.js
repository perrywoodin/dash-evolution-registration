angular.module('documentation', [])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.documentation', {
				url: '/documentation',
				views: {
					'main@root': {
						template: 'documentation/documentation.tpl.html',
						controller: 'DocumentationCtrl as documentationCtrl'
					}
				}
			});
	}])

	.controller('DocumentationCtrl', ['$scope', '$log', function ($scope, $log) {
		var documentationCtrl = this;

		$log.info('this is the documentationCtrl controller');
	}])

;