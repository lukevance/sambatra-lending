angular.module('lendingApp')
  .service('newUserService', ['$http', newUserService]);

function newUserService($http){
  return function () {
    $http.post()
  }
  // connect to new user post request at API
}

function editUserService ($http){
  // edit user info API
}

function getUserService ($http){
  // get user info from API
}
