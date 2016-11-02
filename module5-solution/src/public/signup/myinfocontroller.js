(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserService'];
function MyInfoController(UserService) {
  var $ctrl = this;
  $ctrl.firstname = UserService.firstname;
  $ctrl.lastname = UserService.lastname;
  $ctrl.email = UserService.email;
  $ctrl.phonenumber = UserService.phonenumber;
  $ctrl.favoritedish = UserService.favoritedish;
  $ctrl.registered = UserService.registered;
  }

})();
