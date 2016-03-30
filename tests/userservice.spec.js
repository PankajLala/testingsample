/*
 general body of a test is following
  describe('test description', function() {
    //var: declare variable needed for test

    //beforeEach: the Assign section

    //it: the act and assert section

  });
*/

describe('testing backend call', function() {

  var userservice,
      httpBackend;

  //beforeEach
  beforeEach(function() {

    //load the module
    angular.mock.module('MyApp');

    inject(function($httpBackend, _userservice_) {
      httpBackend = $httpBackend;
      userservice = _userservice_;
    });

  });

  //it
  it('should get the user information', function() {

    var userInfomation = {'userId': 1, 'userName': 'sample'}
    //assign
    httpBackend.expectGET('./data/user.json').respond(userInfomation);
    //act
    var returnedPromise = userservice.getUser();
    var result;
    returnedPromise.then(function(response) {
      result = response;
    });

    httpBackend.flush();

    //assert
    expect(result).toEqual(userInfomation);

  });

});
