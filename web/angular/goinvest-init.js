var app = angular.module('App', [
    'ngCookies',
    'ngRoute',
    'ngResource',
	'ui.bootstrap',
    'ui.bootstrap.datetimepicker', 
	'chart.js',
	'ui.utils.masks'
]);

app.constant('ENV', {

	// base_url: "http://13.199.115.4:82/goinvest-public/",
	// rest_server: "http://13.199.115.4:82/goinvest-public/",
    // base_url: "http://localhost:82/goinvest-public/",
    // rest_server: "http://localhost:82/goinvest-public/",
    base_url: "/",
    rest_server: "/",
});

app.config(['$routeProvider', '$httpProvider', 'ENV', '$locationProvider', function ($routeProvider, $httpProvider, ENV, $locationProvider) {
        $routeProvider.
				when("/aboutus", {templateUrl: ENV.base_url + "partial/aboutus.html", controller: "pageCtrl"}).
				when("/contact", {templateUrl: ENV.base_url + "partial/contact.html", controller: "pageCtrl"}).
				when("/faq", {templateUrl: ENV.base_url + "partial/faq.html", controller: "pageCtrl"}).
				when("/investment", {templateUrl: ENV.base_url + "partial/investment.html", controller: "landingCtrl"}).
				when("/index", {templateUrl: ENV.base_url + "partial/landing.html", controller: "landingCtrl"}).
                otherwise({redirectTo: '/index'});
    }]);

//Service to maintain $scope data  ***
app.service('myInput', function ($rootScope) {
    if($rootScope.user==undefined){
		$rootScope.user={};
		$rootScope.user.age="";
		$rootScope.user.money="";
		$rootScope.user.retire=60;
		$rootScope.user.yearly=0;
	}

});