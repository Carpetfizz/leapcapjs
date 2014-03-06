var LeapcapJS = angular.module('LeapcapJS',['ngRoute']);

LeapcapJS.config(function($routeProvider){

	$routeProvider

		.when('/',{
			templateUrl:'pages/home.html',
			controller: 'mainController'
		})

		.when('/usage',{
			templateUrl: 'pages/usage.html',
			controller: 'usageController'
		})

		.when('/example',{
			templateUrl: 'pages/example.html',
			controller: 'exampleController'
		})

		.when('/contact',{
			templateUrl: 'pages/contact.html',
			controller: 'contactController'
		});
});




LeapcapJS.controller('mainController',function($scope){
});

LeapcapJS.controller('usageController',function($scope){
});

LeapcapJS.controller('exampleController',function($scope){
});

LeapcapJS.controller('contactController',function($scope){
});