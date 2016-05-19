  var scotchApp = angular.module('scotchApp', ['ui.router']);

scotchApp.config(function($stateProvider,$urlRouterProvider) {
     $urlRouterProvider.otherwise("/index");
  $stateProvider
    .state('index', {
      url: "/index",
      templateUrl : "partials/state1.html"
    })
    .state('login', {
      url: "/login",
      templateUrl : "partials/state2.html"
    })
    .state('signup', {
      url: "/signup",
      templateUrl : "partials/state3.html"
    })
});

