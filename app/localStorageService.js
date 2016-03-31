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
