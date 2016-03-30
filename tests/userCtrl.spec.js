/*
Trying to relate with AAA paradigm
*/

describe('testing userCtrl getuser', function(){

  var mockeduserservice, $rootScope, myCtrl, mockedlocalstorageservice;

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

      mockedlocalstorageservice = jasmine.createSpyObj('localStorageService', ['SaveState','RemoveState']);
      $provide.value('localStorageService', mockedlocalstorageservice);
    })

  });


//Arrange - second beforeEach setup here userservice that we configured with $provide will be injected
  beforeEach(inject(function($rootScope, $controller, userservice, localStorageService) {
    $rootScope = $rootScope;

    //setup spy on the getuser behavour
    spyOn(userservice, 'getUser').and.callThrough();
    mockeduserservice = userservice;

    //configure the conroller
    myCtrl = $controller('userCtrl', {
      userservice: mockeduserservice,
      localStorageService: localStorageService
    })
  }));

  it('should call the getUser function', function() {
    //Act
    myCtrl.showUser();
    //Assert
    expect(mockeduserservice.getUser).toHaveBeenCalled();
  });

  it('should save user information to localStorageService', function() {
    //Act
    myCtrl.showUser();
    //Assert
    expect(mockedlocalstorageservice.SaveState).toHaveBeenCalled();
  });
});
