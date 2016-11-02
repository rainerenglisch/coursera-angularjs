(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);

//SignupStateController.$inject = ['$http'];
function UserService() {
  var $service = this;
  $service.firstname = "";
  $service.lastname = "";
  $service.email = "";
  $service.phonenumber = "";
  $service.favoritedish = "";
  $service.registered = false;
  $service.put = function(firstname,lastname,email,phonenumber,favoritedish) {
    $service.firstname = firstname;
    $service.lastname = lastname;
    $service.email = email;
    $service.phonenumber = phonenumber;
    $service.favoritedish = favoritedish;
    $service.registered = true;
    };
  
  }

})();
