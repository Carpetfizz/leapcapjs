var LeapcapJS = angular.module('LeapcapJS',['ngRoute']);

LeapcapJS.config(function($routeProvider){

	$routeProvider

		.when('/',{
			templateUrl:'pages/home.html',
			controller: 'mainController'
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

LeapcapJS.controller('exampleController',function($scope){
});

LeapcapJS.controller('contactController',function($scope){
});