angular.module('MyApp', []);

var module = angular.module('MyApp');

module.factory('localStorageService', function() {
  return {
    SaveState: function(key, data) {
      localStorage.setItem(key, angular.toJson(data));
    },
    GetState: function(key) {
      return angular.fromJson(localStorage.getItem(key));
    },
    RemoveState: function(key) {
      localStorage.removeItem(key);
    }

  };
});

var module = angular.module('MyApp');
module.controller('userCtrl', ['userservice', 'localStorageService', function(userservice, localStorageService){
  var uc = this;
  uc.userservice = userservice;
  uc.localStorageService = localStorageService;
  uc.showUser = function(){
    uc.userservice.getUser().then(function(result){
      if(result.length !== 0 ){
        uc.userId = result.userId;
        uc.userName = result.userName;
        uc.localStorageService.SaveState('user', {userId: uc.userId, userName: uc.userName});
        uc.localStorageService.RemoveState('usernotfoundmessage');
      } else{
        uc.localStorageService.SaveState('usernotfoundmessage', 'No user exists');
        uc.localStorageService.RemoveState('user');
      }
    });
  };
}]);

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
