angular.module('services.payment',[])

	.service('PaymentService', ['$http', '$q', '$log', 'ENDPOINTS', function ($http, $q, $log, ENDPOINTS) {
		var service = this,
			request;

		function extract(result) {
			if(result.data){
				return result.data;
			}
			return result;
		}

		service.donate = function(username){
			var data = {};
			
			$http.defaults.headers.post['Content-Type'] = 'text/plain';	

			data['username'] = username;
			
			request = $http.post(ENDPOINTS.DONATION,data);
			return request.then(function(response){
				return extract(response);
			});
		};

	}])
;