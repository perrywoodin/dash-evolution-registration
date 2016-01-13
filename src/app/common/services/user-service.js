angular.module('services.user',[
		'dashevolution.models.user'
	])

	.service('UserService', ['$rootScope', '$q', '$log', '$timeout', 'ENDPOINTS', function ($rootScope, $q, $log, $timeout, ENDPOINTS) {
		var service = this,
			callbacks = {},
			currentCallbackId = 0,
			ws = new WebSocket(ENDPOINTS.WS);

		ws.onopen = function(){
			$log.info("Socket opened:", ENDPOINTS.WS);
		};

		ws.onmessage = function(message) {
			listener(JSON.parse(message.data));
		};

		function sendRequest(request) {
			var defer = $q.defer();
			var callbackId = getCallbackId();
			callbacks[callbackId] = {
				time: new Date(),
				cb:defer
			};
			request.callback_id = callbackId;
			/* 
				Adding the id here is temp because Evan included it 
				as a property of data instead of part of the root request. 
				Will revisit after Miami.
			*/
			request.data.id = String(callbackId); 
			//$log.info('Sending request', request);
			ws.send(JSON.stringify(request));
			return defer.promise;
		}

		function listener(data) {
			var messageObj = data;
			//$log.info("Received from websocket: ", messageObj);
			// If an object exists with callback_id in our callbacks object, resolve it
			if(callbacks.hasOwnProperty(messageObj.callback_id)) {
				//$log.info(callbacks[messageObj.callback_id]);
				$rootScope.$apply(callbacks[messageObj.callback_id].cb.resolve(messageObj.data));
				delete callbacks[messageObj.callbackID];
			} else {
				// If the ws doesn't parrot back the callbackId, just use the currentCallbackId
				$rootScope.$apply(callbacks[currentCallbackId].cb.resolve(messageObj.data));
				delete callbacks[currentCallbackId];
			}
		}

		// This creates a new callback ID for a request
		function getCallbackId() {
			currentCallbackId += 1;
			if(currentCallbackId > 10000) {
				currentCallbackId = 0;
			}
			return currentCallbackId;
		}


		function inviteUser(user) {
			var request = {};
			var data = {
				"command" : "invite_user",
				"from_uid" : "dashevolution",
				"to_uid" : user.username,
				"to_name" : "",
				"to_email" : user.email, 
				"to_pubkey" : "", 
				"signature": ""	
			};

			request = {
				"object" : "dapi_command",
				"data": data
			};
			
			var promise = sendRequest(request);
			return promise;
		}

		function validateUser(from,to,code) {
			var request = {};
			var data = {
				"command" : "validate_account",
				"from_uid" : from,
				"to_uid" : to,
				"to_challenge_code" : code,
				"signature": ""
			};

			request = {
				"object" : "dapi_command",
				"data": data
			};
			
			var promise = sendRequest(request);
			return promise;
		}

		service.signup = function(user) {
			return inviteUser(user).then(function(response){
				return response;
			});
		};

		service.validate = function(from,to,code) {
			return validateUser(from,to,code).then(function(response){
				return response;
			});
		};

	}])
;