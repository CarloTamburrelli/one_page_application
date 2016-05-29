scotchApp.service("generali",["$http","$q", function ($http, $q) {
 
 
    this.getAccount = function () {
        
    var deferred = $q.defer();
        return $http.get('/isAuthenticate')
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise 
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        ;
    };
    
    this.islogged = function () {
        return $http.get('/isAuthenticate')
            .success(function (data) {
            return data;
            })
            .error(function (data, status) {
            return false;
            });
    };
    
    this.getcontacts = function () {
        
    var deferred = $q.defer();
        return $http.get('/find_contacts')
            .then(function (response) {
                // promise is fulfilled
                deferred.resolve(response.data);
                // promise is returned
                return deferred.promise;
            }, function (response) {
                // the following line rejects the promise 
                deferred.reject(response);
                // promise is returned
                return deferred.promise;
            })
        ;
    };
    
    
    
}]);