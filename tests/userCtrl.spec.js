/*
Trying to relate with AAA paradigm
*/

describe('testing userCtrl getuser', function(){

  var mockeduserservice, $rootScope, myCtrl;

//Arrange - first setup to get the module and configure $provide to have our test implementation of the userservice
  beforeEach(function() {
    angular.mock.module('MyApp');
    angular.mock.module(function($provide) {
      $provide.value('userservice', {
        getUser: function() {
          return {
            then: function(callback) {return callback({});}
          };
        }
      })
    })

  });
  

//Arrange - second beforeEach setup here userservice that we configured with $provide will be injected
  beforeEach(inject(function($rootScope, $controller, userservice) {
    $rootScope = $rootScope;

    //setup spy on the getuser behavour
    spyOn(userservice, 'getUser').and.callThrough();
    mockeduserservice = userservice;

    //configure the conroller
    myCtrl = $controller('userCtrl', {
      userservice: mockeduserservice
    })
  }));

  it('should call the getUser function', function() {

    //Act
    myCtrl.showUser();

    //Assert
    expect(mockeduserservice.getUser).toHaveBeenCalled();
  })
});
