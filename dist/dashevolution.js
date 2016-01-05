/*! dashevolution - v0.0.1 - 2016-01-05
 * Copyright (c) 2016 Perry Woodin <perry@node40.com>;
 * Licensed 
 */
angular.module('layout', [])

	.controller('HeaderCtrl', ['$rootScope', '$state', '$timeout', '$log', function ($rootScope, $state, $timeout, $log) {
		var headerCtrl = this;

	}])

	.controller('FooterCtrl', [function () {
		
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
	'services.httpResponseInterceptor',
	'services.httpRequestTracker',	
	'services.bitcoin'
]);
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
	'layout',
	'home',
	'signup',
	'converters',
	'documentation',
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

	.run(['$rootScope', '$state', function () {

	}])

	.controller('RootCtrl', ['$rootScope', '$log', function ($rootScope, $log) {
		var rootCtrl = this;


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
				url: '/confirm/:code',
				views: {
					'main@root': {
						templateUrl: 'signup/confirm/confirm.tpl.html',
						controller: 'ConfirmCtrl as confirmCtrl'
					}
				}
			});
	}])

	.controller('ConfirmCtrl', ['$scope', '$log', '$stateParams', '$state', function ($scope, $log, $stateParams, $state) {
		var confirmCtrl = this,
			code = $stateParams.code;

		// If the code is not accessible from the URL, redirect to the signup page.
		if(!code){
			$state.go('root.signup');
		}

		$log.info('this is the confirmCtrl controller');
		$log.info('validation code',code);

		// ************************** BEGIN - Private Methods **************************


		// ************************** //END - Private Methods **************************




		// ************************** BEGIN - Public Methods **************************
		
		// ************************** //END - Public Methods **************************
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

	.controller('SignupCtrl', ['$scope', '$log', function ($scope, $log) {
		var signupCtrl = this;

		$log.info('this is the signupCtrl controller');

		// ************************** BEGIN - Private Methods **************************
		

		// ************************** //END - Private Methods **************************



		// ************************** BEGIN - Public Methods **************************
		signupCtrl.signUp = function() {
			console.log('newUser',signupCtrl.newUser);
		};
		// ************************** //END - Public Methods **************************
	}])

;
angular.module('templates.app', ['common/layout/footer.tpl.html', 'common/layout/header.tpl.html', 'common/layout/main.tpl.html', 'home/home.tpl.html', 'signup/confirm/confirm.tpl.html', 'signup/signup.tpl.html']);

angular.module("common/layout/footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/footer.tpl.html",
    "<hr />\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "	\n" +
    "</div>\n" +
    "\n" +
    "<footer class=\"footer push-down\">\n" +
    "\n" +
    "	<div class=\"container\">\n" +
    "		<p class=\"text-muted text-center\"><small>Dash Evolution</small></p>\n" +
    "	</div>\n" +
    "\n" +
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
    "			<a ui-sref=\"root.home\" class=\"navbar-brand\">Dash Evolution</a>\n" +
    "		</div>\n" +
    "		<div id=\"navbar\" class=\"collapse navbar-collapse\">\n" +
    "\n" +
    "			<ul class=\"nav navbar-nav navbar-right\">\n" +
    "				<li><a ui-sref=\"root.home\">Home</a></li>\n" +
    "			</ul>\n" +
    "			\n" +
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
    "	\n" +
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
    "	<div class=\"col-sm-4 text-center\">\n" +
    "		<button class=\"btn btn-primary\" ui-sref=\"root.signup\">Signup</button>\n" +
    "	</div>\n" +
    "	<div class=\"col-sm-4 text-center\">\n" +
    "		<button class=\"btn btn-primary\" ui-sref=\"root.converters\">Search Converters</button>\n" +
    "	</div>\n" +
    "	<div class=\"col-sm-4 text-center\">\n" +
    "		<button class=\"btn btn-primary\" ui-sref=\"root.documentation\">Documentation</button>\n" +
    "	</div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("signup/confirm/confirm.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/confirm/confirm.tpl.html",
    "confirm.tpl.html");
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
    "	<div class=\"form-group\" ng-class=\"{'has-error':form.rootPubkey.$invalid && form.rootPubkey.$dirty, 'has-success':form.rootPubkey.$valid}\">\n" +
    "		<label for=\"inputPubkey\" class=\"col-sm-2 control-label\">Root Pubkey</label>\n" +
    "		<div class=\"col-sm-10\">\n" +
    "			<input ng-model=\"signupCtrl.newUser.rootPubkey\" name=\"rootPubkey\" type=\"text\" class=\"form-control\" id=\"inputPubkey\" placeholder=\"Root Pubkey\" required>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"form-group\">\n" +
    "		<div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "			<button ng-click=\"signupCtrl.signUp()\" ng-disabled=\"form.$invalid\" type=\"submit\" class=\"btn btn-primary\">Signup</button>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</form>\n" +
    "");
}]);

angular.module('templates.common', []);

