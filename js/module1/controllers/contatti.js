
scotchApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

scotchApp.filter('myFilter', function () {  
   return function(inputs,filterValues) {
      var output = [];
       var str  =""+filterValues;
       var cerca = str.toLowerCase();
      angular.forEach(inputs, function (input) {
          if((input.name.toLowerCase().search(cerca)>-1) || (input.email.toLowerCase().search(cerca)=="")){
            output.push(input);
          }else if((input.phone.toLowerCase().search(cerca)>-1) || (input.email.toLowerCase().search(cerca)=="")){
            output.push(input);  
          }else if((input.email.toLowerCase().search(cerca)>-1) || (input.email.toLowerCase().search(cerca)=="")){
            output.push(input);
          }
       });
       return output;
   };
});


scotchApp.controller('contatti',['$rootScope','$scope', 'generali','$http', function($rootScope,$scope, generali,$http) {
    $scope.search_string = "";
    $scope.contacts={};
    
    generali.getcontacts()
        .then(
            function (result) {
                $scope.contacts=result;
                console.log(JSON.stringify(result));
                // promise was fullfilled (regardless of outcome)
                // checks for information will be peformed here
            },
            function (error) {
                // handle errors here
                console.log("eeee"+error.statusText);
            }
        );
    
    
    $scope.add_contact = function(contact) {
        $scope.add_user={};
         $http.post("/add_contacts", contact)
            .success(function (data) {
             $scope.contacts=data;
            })
            .error(function (data, status) {
            alert(data+" "+status);
            });
    };
    
    $scope.update = function(contact) {
    $http.post("update/", contact).then(function(response) {
      $scope.contacts= response.data;
    }); 
  };
     $scope.remove = function(contact) {
    $http.post("remove/", contact).then(function(response) {
      $scope.contacts= response.data;
    }); 
  };
    
    
    
}]);