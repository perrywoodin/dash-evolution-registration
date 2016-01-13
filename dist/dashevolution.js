/*! dashevolution - v0.0.22 - 2016-01-13
 * Copyright (c) 2016 Perry Woodin <perry@node40.com>;
 * Licensed 
 */
angular.module('alerts', [
	'alerts.errors'
]);
angular.module('alerts.errors', [])

	.controller('AlertsErrorsModalCtrl', ['$scope', '$uibModalInstance', 'Errors', function ($scope, $uibModalInstance, Errors) {
		
		$scope.errors = Errors;
		
		$scope.cancel = function(){
			$uibModalInstance.close();
		};

	}])
;
angular.module('layout', [])

	.controller('HeaderCtrl', ['$rootScope', '$state', '$timeout', '$log', function ($rootScope, $state, $timeout, $log) {
		var headerCtrl = this;

	}])

	.controller('FooterCtrl', [function () {
		
	}])
;
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
angular.module('services.bitcoin', [])

	.service('BitcoinService', [function () {
		var model = this,
			network = bitcoin.networks.dash;

		model.verifyMessage = function(address,signature,message) {
			if(signature.length === 65){
				return bitcoin.message.verify(address, signature, message, network);
			}

			return false;
		};

	}])

;
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
angular.module('services.httpResponseInterceptor', [])

	.factory('httpResponseInterceptor', ['$q', '$rootScope', function($q, $rootScope) {
		var failure = {
				failed:true,
				errors:null,
				messages:[]
			},
			responseStatus = {
			response: function(response){
				if(response.headers()['content-type'] === "application/json;charset=UTF-8"){

					var data = response.data;

					// If data doesn't exist reject.				
					if(!data){
						return $q.reject(response);
					}

				}
				return response;
			},
			responseError: function (response) {
				// Loop through the errors array and returns an 
				// array of error messages.
				function getErrorMessages(errors) {
					return errors.map(function(error) {
						return error.message;
					});
				}

				if(response.data){
					if(response.data.errors){
						failure.messages = getErrorMessages(response.data.errors);
						failure.errors = response.data.errors;
					}

					if(response.data.error){
						failure.messages = [response.data.error];
						failure.errors = response.data.error;
					}
				}

				if (response.status === 401) {
					$rootScope.$broadcast('NotAuthorized',failure);
				}
				
				return $q.reject(failure);
			}
		};

		return responseStatus;
	}])
;

angular.module('services', [
	'services.user',
	'services.httpResponseInterceptor',
	'services.httpRequestTracker',	
	'services.bitcoin'
]);
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
angular.module('converters', [])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.converters', {
				url: '/converters',
				views: {
					'main@root': {
						template: 'converters/converters.tpl.html',
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
angular.module('dashevolution', [
	'ui.router',
	'ui.bootstrap',
	'ngSanitize',
	// Set CONSTANT
	'config',
	// App modules
	'services',
	'layout',
	'home',
	'signup',
	'converters',
	'documentation',
	'alerts',
	// Template cache
	'templates.app',
	'templates.common' 
])

	.config(["$httpProvider", "$stateProvider", "$locationProvider", "$urlRouterProvider", function ($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) { 
		
		$locationProvider.html5Mode(false);
		$stateProvider
			.state('root', {
				abstract: true,
				views: {
					'': {
						templateUrl: 'common/layout/main.tpl.html',
						controller: 'RootCtrl as rootCtrl'
					},
					'header@root': {
						templateUrl: 'common/layout/header.tpl.html',
						controller: 'HeaderCtrl as headerCtrl'
					},
					'footer@root': {
						templateUrl: 'common/layout/footer.tpl.html',
						controller: 'FooterCtrl'
					}
				}
			})
		; 

		$urlRouterProvider.otherwise('/home'); 
	}])

	.run([ function () {

	}])

	.controller('RootCtrl', ['$rootScope', '$log', '$uibModal', function ($rootScope, $log, $uibModal) {
		var rootCtrl = this;

		var showErrorModal = function(errors){
			var _errors = errors;
			rootCtrl.modalInstance = $uibModal.open({
				templateUrl: 'common/alerts/errors/alerts-errors-modal.tpl.html',
				controller: 'AlertsErrorsModalCtrl as alertsErrorsModdalCtrl',
				resolve: {
					Errors: function(){
						return _errors;
					}
				}
			});
		};

		$rootScope.$on('ErrorAlert',function(event,errors){
			showErrorModal(errors);
		});

	}])	
;
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
angular.module('home', [])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.home', {
				url: '/home',
				views: {
					'main@root': {
						templateUrl: 'home/home.tpl.html',
						controller: 'HomeCtrl as homeCtrl'
					}
				}
			});
	}])

	.controller('HomeCtrl', ['$scope', '$log', function ($scope, $log) {
		var homeCtrl = this;

		$log.info('this is the home controller');
	}])

;
angular.module('signup.confirm', [])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.signup.confirm', {
				url: '/confirm/:from/:to/:code',
				views: {
					'main@root': {
						templateUrl: 'signup/confirm/confirm.tpl.html',
						controller: 'ConfirmCtrl as confirmCtrl'
					}
				}
			});
	}])

	.controller('ConfirmCtrl', ['$rootScope', '$log', '$stateParams', '$state', 'UserService', function ($rootScope, $log, $stateParams, $state, UserService) {
		var confirmCtrl = this,
			from = $stateParams.from,
			to = $stateParams.to,
			code = $stateParams.code;

		if(!from || !to || !code){
			$state.go('root.home');	
		} else {
			UserService.validate(from,to,code).then(function(response){
				$log.log('validate() response', response);
				if(response.error_id){
					var errors = [];
					errors.push(response.error_message);
					$rootScope.$broadcast('ErrorAlert',errors);
					return;
				}
				confirmCtrl.success = true;
				confirmCtrl.confirmation = response.data;
			});
		}

	}])

;
angular.module('signup', [
		'signup.confirm'
	])

	.config(['$stateProvider', function($stateProvider){
		$stateProvider
			.state('root.signup', {
				url: '/signup',
				views: {
					'main@root': {
						templateUrl: 'signup/signup.tpl.html',
						controller: 'SignupCtrl as signupCtrl'
					}
				}
			});
	}])

	.controller('SignupCtrl', ['$rootScope', '$log', '$uibModal', 'UserService', function ($rootScope, $log, $uibModal, UserService) {
		var signupCtrl = this;

		// ************************** BEGIN - Private Methods **************************
		// Launch a modal to fake an email so we can test the confirmation.
		var spoofEmail = function(signupResponse) {
			signupCtrl.modalInstance = $uibModal.open({
				templateUrl: 'signup/fake-email-modal.tpl.html',
				controller: 'FakeEmailCtrl as fakeEmailCtrl',
				resolve: {
					SignupResponse: function(){
						return signupResponse;
					}
				}
			});
		};

		var signup = function(user) {
			UserService.signup(user).then(function(response){
				$log.log('singup() response', response);
				if(response.error_id){
					var errors = [];
					errors.push(response.error_message);
					$rootScope.$broadcast('ErrorAlert',errors);
					return;
				}

				// Following is temporary until the email confrimation is working. 
				var pendingUser = {
					username: user.username,
					challenge_code: response.data.challenge_code
				};
				spoofEmail(pendingUser);
			});
		};
		// ************************** //END - Private Methods **************************




		// ************************** BEGIN - Public Methods **************************
		signupCtrl.signUp = function() {
			signup(signupCtrl.newUser);
		};
		// ************************** //END - Public Methods **************************
	}])

	// This entire controller is temporary until we can hook up to the backend. 
	.controller('FakeEmailCtrl', ['$state', '$log', '$uibModalInstance', 'SignupResponse', function ($state, $log, $uibModalInstance, SignupResponse) {
		var fakeEmailCtrl = this,
			signupResponse = fakeEmailCtrl.signupResponse = SignupResponse;

		$log.log('signupResponse: ',signupResponse);

		fakeEmailCtrl.confirmEmail = function() {
			$uibModalInstance.close();
			$state.go('root.signup.confirm', {from:'dashevolution',to:signupResponse.username,code:signupResponse.challenge_code});
		};
		
		fakeEmailCtrl.cancel = function(){
			$uibModalInstance.close();
		};
	}])

;


angular.module('templates.app', ['common/alerts/errors/alerts-default-modal.tpl.html', 'common/alerts/errors/alerts-errors-modal.tpl.html', 'common/alerts/errors/alerts-info-modal.tpl.html', 'common/layout/footer.tpl.html', 'common/layout/header.tpl.html', 'common/layout/main.tpl.html', 'home/home.tpl.html', 'signup/confirm/confirm.tpl.html', 'signup/fake-email-modal.tpl.html', 'signup/signup.tpl.html']);

angular.module("common/alerts/errors/alerts-default-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/alerts/errors/alerts-default-modal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "	<h3 class=\"modal-title\">Success</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "	\n" +
    "	<h4>That worked out well. Here's a summary:</h4>\n" +
    "\n" +
    "	<div ng-repeat=\"error in errors\">{{error}}</div> \n" +
    " \n" +
    "</div>\n" +
    "<div class=\"modal-footer\">	\n" +
    "	<button class=\"btn btn-success\" ng-click=\"cancel()\">Close</button>\n" +
    "</div>");
}]);

angular.module("common/alerts/errors/alerts-errors-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/alerts/errors/alerts-errors-modal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "	<h3 class=\"modal-title text-danger\">Whoops!</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "	\n" +
    "	<h4>That didn't work out as expected. Here's what we know:</h4>\n" +
    "\n" +
    "	<div ng-repeat=\"error in errors\">{{error}}</div> \n" +
    " \n" +
    "</div>\n" +
    "<div class=\"modal-footer\">	\n" +
    "	<button class=\"btn btn-warning\" ng-click=\"cancel()\">I can fix it</button>\n" +
    "</div>");
}]);

angular.module("common/alerts/errors/alerts-info-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/alerts/errors/alerts-info-modal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "	<h3 class=\"modal-title\">For Your Information</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "	\n" +
    "	<h4>That was unexpected, but not necessarily incorrect. Here's what we think happened:</h4>\n" +
    "\n" +
    "	<div ng-repeat=\"error in errors\">{{error}}</div> \n" +
    " \n" +
    "</div>\n" +
    "<div class=\"modal-footer\">	\n" +
    "	<button class=\"btn btn-primary\" ng-click=\"cancel()\">Carry On</button>\n" +
    "</div>");
}]);

angular.module("common/layout/footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/footer.tpl.html",
    "<footer class=\"footer push-down\">\n" +
    "	<div class=\"container\"></div>\n" +
    "</footer>");
}]);

angular.module("common/layout/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/header.tpl.html",
    "<nav class=\"navbar navbar-default navbar-fixed-top\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"navbar-header\">\n" +
    "			<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n" +
    "				<span class=\"sr-only\">Toggle navigation</span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "				<span class=\"icon-bar\"></span>\n" +
    "			</button>\n" +
    "		</div>\n" +
    "		<div id=\"navbar\" class=\"collapse navbar-collapse\">\n" +
    "			<ul class=\"nav navbar-nav navbar-right\">\n" +
    "				<li class=\"dropdown\">\n" +
    "					<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">Menu <span class=\"caret\"></span></a>\n" +
    "					<ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "						<li><a ui-sref=\"root.home\">Home</a></li>\n" +
    "						<li class=\"divider\"></li>\n" +
    "						<li><a ui-sref=\"root.signup\">Signup</a></li>\n" +
    "						<li><a ui-sref=\"root.converters\">Search Converters</a></li>\n" +
    "						<li><a ui-sref=\"root.documentation\">Documentation</a></li>\n" +
    "					</ul>\n" +
    "				</li>\n" +
    "			</ul>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</nav>");
}]);

angular.module("common/layout/main.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/main.tpl.html",
    "<div ui-view=\"header\"></div>\n" +
    "\n" +
    "<div ui-view=\"subheader\"></div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "	<div class=\"main-view\" ui-view=\"main\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\" ui-view=\"footer\"></div>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<p>Radio telescope explorations Vangelis. Tingling of the spine explorations permanence of the stars billions upon billions Apollonius of Perga white dwarf radio telescope! Euclid tesseract bits of moving fluff encyclopaedia galactica finite but unbounded? Bits of moving fluff, finite but unbounded are creatures of the cosmos! Muse about, Cambrian explosion, encyclopaedia galactica the ash of stellar alchemy. Corpus callosum! Great turbulent clouds extraordinary claims require extraordinary evidence a very small stage in a vast cosmic arena Vangelis Hypatia star stuff harvesting star light.</p>\n" +
    "\n" +
    "<div class=\"row push-down\">\n" +
    "	<div class=\"col-xs-4 text-center\">\n" +
    "		<button class=\"btn btn-primary\" ui-sref=\"root.signup\">Signup</button>\n" +
    "	</div>\n" +
    "	<div class=\"col-xs-4 text-center\">\n" +
    "		<button class=\"btn btn-primary\" ui-sref=\"root.converters\">Search Converters</button>\n" +
    "	</div>\n" +
    "	<div class=\"col-xs-4 text-center\">\n" +
    "		<button class=\"btn btn-primary\" ui-sref=\"root.documentation\">Documentation</button>\n" +
    "	</div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("signup/confirm/confirm.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/confirm/confirm.tpl.html",
    "<div ng-if=\"confirmCtrl.success\">\n" +
    "	<p>Thank you for validating your Dashpay account.</p> \n" +
    "\n" +
    "	<p>The username <strong>{{confirmCtrl.confirmation.username}}</strong> has been validated.</p>\n" +
    "\n" +
    "	<p>Now get out there an preach the gospel fo Dash!</p>\n" +
    "</div>");
}]);

angular.module("signup/fake-email-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/fake-email-modal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "	<h3 class=\"modal-title\">Email Mockup</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "	<p class=\"text-muted\">This modal is for demo purposes only. The app will actually send an email to the user requesting confirmation.</p>\n" +
    "\n" +
    "	<p><strong>To:</strong> {{fakeEmailCtrl.signupResponse.to_email}}</p>\n" +
    "\n" +
    "	<p>You have requested the Dashpay username <strong>{{fakeEmailCtrl.signupResponse.to_uid}}</strong>.</p> \n" +
    "\n" +
    "	<p>Please validate your account by going to <a ng-click=\"fakeEmailCtrl.confirmEmail()\" href=\"\">https://dashevolution.com/</a>.</p> \n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">	\n" +
    "	<button class=\"btn btn-default\" ng-click=\"fakeEmailCtrl.cancel()\">Close</button>\n" +
    "</div>");
}]);

angular.module("signup/signup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/signup.tpl.html",
    "<form name=\"form\" class=\"form-horizontal\" novalidate>\n" +
    "	<div class=\"form-group\" ng-class=\"{'has-error':form.username.$invalid && form.username.$dirty, 'has-success':form.username.$valid}\">\n" +
    "		<label for=\"inputUsername\" class=\"col-sm-2 control-label\">Username</label>\n" +
    "		<div class=\"col-sm-10\">\n" +
    "			<input ng-model=\"signupCtrl.newUser.username\" name=\"username\" type=\"text\" class=\"form-control\" id=\"inputUsername\" placeholder=\"Username\" required>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"form-group\" ng-class=\"{'has-error':form.email.$invalid && form.email.$dirty, 'has-success':form.email.$valid}\">\n" +
    "		<label for=\"inputEmail\" class=\"col-sm-2 control-label\">Email</label>\n" +
    "		<div class=\"col-sm-10\">\n" +
    "			<input ng-model=\"signupCtrl.newUser.email\" name=\"email\" type=\"email\" class=\"form-control\" id=\"inputEmail\" placeholder=\"Email\" required>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<!-- <div class=\"form-group\" ng-class=\"{'has-error':form.rootPubkey.$invalid && form.rootPubkey.$dirty, 'has-success':form.rootPubkey.$valid}\">\n" +
    "		<label for=\"inputPubkey\" class=\"col-sm-2 control-label\">Root Pubkey</label>\n" +
    "		<div class=\"col-sm-10\">\n" +
    "			<input ng-model=\"signupCtrl.newUser.rootPubkey\" name=\"rootPubkey\" type=\"text\" class=\"form-control\" id=\"inputPubkey\" placeholder=\"Root Pubkey\" required>\n" +
    "		</div>\n" +
    "	</div> -->\n" +
    "	<div class=\"form-group\">\n" +
    "		<div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "			<button ng-click=\"signupCtrl.signUp()\" ng-disabled=\"form.$invalid\" type=\"submit\" class=\"btn btn-primary\">Signup</button>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</form>");
}]);

angular.module('templates.common', []);

