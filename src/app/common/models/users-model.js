angular.module('dashevolution.models.users',[])

	.service('UsersModel', ['$rootScope', '$http', '$q', '$log', '$websocket', '$timeout', 'ENDPOINTS', function ($rootScope, $http, $q, $log, $websocket, $timeout, ENDPOINTS) {
		var model = this,
			request,
			user;

		var ws = $websocket.$new({
			url: ENDPOINTS.WS,
			protocols: []
		});	

		ws.$on('$open', function () {
			$log.info('Websocket is open: ', ENDPOINTS.WS);
		});

		function inviteUser(user) {
			var data = {
				"command" : "invite_user",
				"from_uid" : "UID",
				"to_uid" : user.username,
				"to_name" : null,
				"to_email" : user.email, 
				"to_pubkey" : user.rootPubkey, 
				"signature": ""			
			};
			ws.$emit('invite_user',data);

			ws.$on('invite_user', function (response) {
				$log.info(response);
			});
		}

		function validateUser() {
			ws.$on('validate_account', function (response) {
				$log.info(response);
			});
		}

		function extract(result) {
			if(result.data){
				return result.data;
			}
			return result;
		}

		model.signup = function(user) {
			inviteUser(user);
			$log.info('Register user.',user);
		};

		model.validate = function(code) {
			validateUser();
			$log.info('Validation Complete.');
		};

	}])
;