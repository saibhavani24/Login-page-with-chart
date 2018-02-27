angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/',{
		templateUrl:'views/signupAngular.html'
	})
$locationProvider.html5Mode({
	enable: true,
	requireBase: false
});
	});