var module = angular.module('MyApp');
module.controller('userCtrl', ['userservice', function(userservice){
  var uc = this;
  uc.userservice = userservice;
  uc.showUser = function(){
    uc.userservice.getUser().then(function(result){
      uc.userId = result.userId;
      uc.userName = result.userName;
    });
  }
}]);
