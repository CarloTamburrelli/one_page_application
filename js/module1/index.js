  var scotchApp = angular.module('scotchApp', ['ui.router',"xeditable"]);

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
      .state('profile', {
          url: "/profile",
          templateUrl : "partials/state4.html",
          authenticate: true
     })
});


scotchApp.run(function ($rootScope, $state, generali) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        //console.log($rootScope.user.error+"<----");
      if (toState.authenticate && (($rootScope.user.error) || ($rootScope.user==="undefined"))){
        // User isn’t authenticated
          console.log("cos");
        $state.transitionTo("login");
        event.preventDefault(); 
      }
    });
  });
