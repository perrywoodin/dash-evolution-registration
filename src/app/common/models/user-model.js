angular.module('dashevolution.models.user',[])

	.service('UserModel', ['$http', '$q', '$log', 'ENDPOINTS', function ($http, $q, $log, ENDPOINTS) {
		var model = this,
			request,
			user;

		function extract(result) {
			if(result.data){
				return result.data;
			}
			return result;
		}

		model.getUser = function(id) {

		};

	}])
;