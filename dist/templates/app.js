angular.module('templates.app', ['common/layout/footer.tpl.html', 'common/layout/header.tpl.html', 'common/layout/main.tpl.html', 'home/home.tpl.html', 'signup/confirm/confirm.tpl.html', 'signup/fake-email-modal.tpl.html', 'signup/signup.tpl.html']);

angular.module("common/layout/footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/footer.tpl.html",
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
    "<p>Thank you for validating your Dashpay account. Now get out there an preach the gospel fo Dash!</p>");
}]);

angular.module("signup/fake-email-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/fake-email-modal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "	<h3 class=\"modal-title\">Email Mockup</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "\n" +
    "	<p class=\"text-muted\">This modal is for demo purposes only. The app will actually send an email to the user requesting confirmation.</p>\n" +
    "\n" +
    "	<p><strong>To:</strong> {{fakeEmailCtrl.user.email}}</p>\n" +
    "\n" +
    "	<p>You have requested the Dashpay username <strong>{{fakeEmailCtrl.user.username}}</strong>.</p> \n" +
    "\n" +
    "	<p>Please validate your account by going to <a ng-click=\"fakeEmailCtrl.confirmEmail()\" href=\"\">https://dashevolution.com/</a>.</p>\n" +
    "	 \n" +
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
