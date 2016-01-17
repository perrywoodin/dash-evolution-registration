angular.module('templates.app', ['common/alerts/errors/alerts-default-modal.tpl.html', 'common/alerts/errors/alerts-errors-modal.tpl.html', 'common/alerts/errors/alerts-info-modal.tpl.html', 'common/layout/footer.tpl.html', 'common/layout/header.tpl.html', 'common/layout/main.tpl.html', 'converters/converters.tpl.html', 'home/home.tpl.html', 'signup/confirm/confirm.tpl.html', 'signup/fake-email-modal.tpl.html', 'signup/pending-modal.tpl.html', 'signup/signup.tpl.html', 'vendors/vendors-donation-modal.tpl.html', 'vendors/vendors.tpl.html']);

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
    "						<li><a ui-sref=\"root.vendors\">Vendors</a></li>\n" +
    "						<li><a href=\"https://www.dash.org/evolution/\">Documentation</a></li>\n" +
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

angular.module("converters/converters.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("converters/converters.tpl.html",
    "<div class=\"row\">\n" +
    "	<div class=\"col-sm-6\">\n" +
    "		<h1>Converters</h1>\n" +
    "		<ul style=\"font-size:2em;\">\n" +
    "			<li style=\"padding:.5em 0;\">Search for users that want to sell Dash.</li>\n" +
    "			<li style=\"padding:.5em 0;\">Buy some Dash.</li>\n" +
    "			<li style=\"padding:.5em 0;\">Rate them for their service!</li>\n" +
    "		</ul>\n" +
    "	</div>\n" +
    "	<div class=\"col-sm-6\">\n" +
    "		<img class=\"img-responsive\" src=\"img/converters_map.png\"/>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<p>Signup for a Dash Evolution username.</p>\n" +
    "\n" +
    "<div class=\"row push-down\">\n" +
    "	<div class=\"col-xs-4 text-center\">\n" +
    "		<button class=\"btn btn-primary\" ui-sref=\"root.signup\">Signup</button>\n" +
    "	</div>\n" +
    "	<div class=\"col-xs-4 text-center\">\n" +
    "		<button class=\"btn btn-primary\" ui-sref=\"root.converters\">Search Converters</button>\n" +
    "	</div>\n" +
    "	<div class=\"col-xs-4 text-center\">\n" +
    "		<a class=\"btn btn-primary\" href=\"https://www.dash.org/evolution/\">Documentation</a>\n" +
    "	</div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("signup/confirm/confirm.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/confirm/confirm.tpl.html",
    "<div ng-if=\"confirmCtrl.showLoading\">\n" +
    "	Validating your account, please stand by...\n" +
    "</div>\n" +
    "\n" +
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

angular.module("signup/pending-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/pending-modal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "	<h3 class=\"modal-title\">Registration Pending</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "	<p>Thank you for registering</p>\n" +
    "\n" +
    "	<p>An email will be sent to {{signupPendingCtrl.email}} asking you to confirm the registration of the username <strong>{{signupPendingCtrl.username}}</strong></p>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">	\n" +
    "	<button class=\"btn btn-default\" ng-click=\"signupPendingCtrl.cancel()\">Close</button>\n" +
    "</div>");
}]);

angular.module("signup/signup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup/signup.tpl.html",
    "<form name=\"signupCtrl.form\" class=\"form-horizontal\" novalidate>\n" +
    "	<div class=\"form-group\" ng-class=\"{'has-error':signupCtrl.form.username.$invalid && signupCtrl.form.username.$dirty, 'has-success':signupCtrl.form.username.$valid}\">\n" +
    "		<label for=\"inputUsername\" class=\"col-sm-2 control-label\">Username</label>\n" +
    "		<div class=\"col-sm-10\">\n" +
    "			<input ng-model=\"signupCtrl.newUser.username\" name=\"username\" type=\"text\" class=\"form-control\" id=\"inputUsername\" placeholder=\"Username\" required>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<div class=\"form-group\" ng-class=\"{'has-error':signupCtrl.form.email.$invalid && signupCtrl.form.email.$dirty, 'has-success':signupCtrl.form.email.$valid}\">\n" +
    "		<label for=\"inputEmail\" class=\"col-sm-2 control-label\">Email</label>\n" +
    "		<div class=\"col-sm-10\">\n" +
    "			<input ng-model=\"signupCtrl.newUser.email\" name=\"email\" type=\"email\" class=\"form-control\" id=\"inputEmail\" placeholder=\"Email\" required>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "	<!-- <div class=\"form-group\" ng-class=\"{'has-error':signupCtrl.form.rootPubkey.$invalid && signupCtrl.form.rootPubkey.$dirty, 'has-success':signupCtrl.form.rootPubkey.$valid}\">\n" +
    "		<label for=\"inputPubkey\" class=\"col-sm-2 control-label\">Root Pubkey</label>\n" +
    "		<div class=\"col-sm-10\">\n" +
    "			<input ng-model=\"signupCtrl.newUser.rootPubkey\" name=\"rootPubkey\" type=\"text\" class=\"form-control\" id=\"inputPubkey\" placeholder=\"Root Pubkey\" required>\n" +
    "		</div>\n" +
    "	</div> -->\n" +
    "	<div class=\"form-group\">\n" +
    "		<div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "			<button ng-click=\"signupCtrl.signUp()\" ng-disabled=\"signupCtrl.form.$invalid\" type=\"submit\" class=\"btn btn-primary\">Signup</button>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</form>");
}]);

angular.module("vendors/vendors-donation-modal.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("vendors/vendors-donation-modal.tpl.html",
    "<div class=\"modal-header\">\n" +
    "	<h3 class=\"modal-title\">Donate to the Dash Foundation</h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\">\n" +
    "\n" +
    "	<p>This feature will demonstrate use of the Dash Evolution payment system.</p>\n" +
    "\n" +
    "	<p>Simply enter your Dash username below and click the donate button. If you don't yet have a Dash username, please visit the <a ng-click=\"donationCtrl.gotoSignupPage()\" href=\"\">Signup</a> page.</p>\n" +
    "\n" +
    "	<form name=\"donationCtrl.form\" class=\"form-inline\" novalidate>\n" +
    "		<div class=\"row\">\n" +
    "			\n" +
    "			<div class=\"form-group col-xs-8\" ng-class=\"{'has-error':donationCtrl.form.username.$invalid && donationCtrl.form.username.$dirty, 'has-success':donationCtrl.form.username.$valid}\">\n" +
    "				<label for=\"inputUsername\" class=\"sr-only\">Username</label>\n" +
    "				<input ng-model=\"donationCtrl.username\" name=\"username\" type=\"text\" class=\"form-control fill-width\" id=\"inputUsername\" placeholder=\"Username\" required>\n" +
    "			</div>\n" +
    "			\n" +
    "			<div class=\"col-xs-4\">\n" +
    "				<button ng-click=\"donationCtrl.donate()\" ng-disabled=\"donationCtrl.form.$invalid || donationCtrl.showLoading\" type=\"submit\" class=\"btn btn-primary\">Donate</button>\n" +
    "\n" +
    "				<span ng-show=\"donationCtrl.showLoading\" class=\"pull-right glyphicons glyphicons-refresh glyphicon-spin\"></span>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "	</form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer\">	\n" +
    "	<p class=\"pull-left text-primary\" ng-if=\"donationCtrl.showRfpMessage\">A request for payment has been sent to your Dash Evolution wallet.</p>\n" +
    "\n" +
    "	<p class=\"pull-left text-success\" ng-if=\"donationCtrl.showSuccess\">Thank you. Your donation has been received.</p>\n" +
    "\n" +
    "	<button class=\"btn btn-default\" ng-click=\"donationCtrl.cancel()\">Close</button>\n" +
    "</div>");
}]);

angular.module("vendors/vendors.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("vendors/vendors.tpl.html",
    "<h1>Vendors</h1>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "	<div class=\"col-sm-6\">\n" +
    "		<h3>Dash Foundation</h3>\n" +
    "\n" +
    "		<p>Would you like to donate 0.33 Dash to the Dash Foundation using Dash Evolution?</p>\n" +
    "\n" +
    "		<button ng-click=\"vendorsCtrl.donate();\" class=\"btn btn-primary\">Yes! I would like to donate.</button>\n" +
    "\n" +
    "	</div>\n" +
    "	<div class=\"col-sm-6\">\n" +
    "		<img src=\"/img/Node40.png\" class=\"img-responsive\" style=\"width:140px; padding:1em 0;\">\n" +
    "\n" +
    "		<p>Node40 offers managed masternode servies and was an early adopter of Dash Evolution. Their first integration with Dash Evolution supported invoicing of their customers. Read more about it at the <a href=\"https://blog.node40.com\" target=\"_blank\">Node40 blog</a>, or visit <a href=\"https://node40.com\" target=\"_blank\">https://node40.com</a>\n" +
    "		\n" +
    "		</p> \n" +
    "	</div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
