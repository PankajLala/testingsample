var module = angular.module('MyApp');
module.factory('userservice',['$http',function($http){
  return {
    getUser: function(){
      return $http.get('./data/user.json').then(function(result){
        return result.data;
      });
    }
  };
}]);
