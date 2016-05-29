scotchApp.controller('richieste',['$rootScope','$scope', '$http','$window', 'generali', function($rootScope,$scope, $http,$window, generali) {
    $rootScope.user={};
    $scope.contacts={};
    
    $scope.invio= function (obj){
        
        $http.post("/login_result", obj)
            .success(function (data) {
            $window.location.href = '/';
            })
            .error(function (data, status) {
            alert(data+" "+status);
            });
    };
    
    
    $scope.logout= function (){
        
        $http.get("/logout")
            .success(function (data) {
            $window.location.href = '/';
            });
    };
                                  
    generali.getAccount()
        .then(
            function (result) {
                $rootScope.user=result;
                console.log(JSON.stringify(result));
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
            },
            function (error) {
                // handle errors here
                console.log("eeee"+error.statusText);
            }
        );
    
}]);