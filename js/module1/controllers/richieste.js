scotchApp.controller('richieste',['$scope', '$http', function($scope, $http) {
    
    $scope.invio= function (obj){
        
        $http.post("/login_result", obj)
            .success(function (data) {
            alert(JSON.stringify(data));
            })
            .error(function (data, status) {
            alert(data+" "+status);
            });
    };
    
}]);