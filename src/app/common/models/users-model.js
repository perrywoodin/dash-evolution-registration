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

		model.signup = function(user) {
			$log.info('Register user.',user);
		};

		model.validate = function(code) {
			$log.info('Validation Complete.');
		};

	}])
;