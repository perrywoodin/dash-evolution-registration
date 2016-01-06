angular.module('dashevolution.models.users',[])

	.service('UsersModel', ['$http', '$q', '$log', 'ENDPOINTS', function ($http, $q, $log, ENDPOINTS) {
		var model = this,
			request,
			user;

		function extract(result) {
			if(result.data){
				return result.data;
			}
			return result;
		}

		model.signUp = function() {
			
		};

		model.validate = function() {
			
		};

	}])
;