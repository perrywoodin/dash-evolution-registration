angular.module('services.httpRequestTracker', [])

	.factory('httpRequestTracker', ['$q', function($q){
		return function (promise) {
			return promise.then(function (response) {
				// do something on success
				return response;

			}, function (response) {
				// do something on error
				return $q.reject(response);
			});
		};
	}])
;