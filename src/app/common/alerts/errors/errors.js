angular.module('alerts.errors', [])

	.controller('AlertsErrorsModalCtrl', ['$scope', '$uibModalInstance', 'Errors', function ($scope, $uibModalInstance, Errors) {
		
		$scope.errors = Errors;
		
		$scope.cancel = function(){
			$uibModalInstance.close();
		};

	}])
;