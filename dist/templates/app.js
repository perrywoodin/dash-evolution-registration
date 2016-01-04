angular.module('templates.app', ['common/layout/footer.tpl.html', 'common/layout/header.tpl.html', 'common/layout/main.tpl.html', 'home/home.tpl.html']);

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
    "<nav class=\"navbar navbar-inverse navbar-fixed-top\">\n" +
    "	<div class=\"container\">\n" +
    "		<div class=\"navbar-header\">\n" +
    "			<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n" +
    "			<span class=\"sr-only\">Toggle navigation</span>\n" +
    "			<span class=\"icon-bar\"></span>\n" +
    "			<span class=\"icon-bar\"></span>\n" +
    "			<span class=\"icon-bar\"></span>\n" +
    "			</button>\n" +
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
    "home/home.tpl.html");
}]);
