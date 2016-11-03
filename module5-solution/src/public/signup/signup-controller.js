(function () {
"use strict";

angular.module('public')
.controller('SignupStateController', SignupStateController);

SignupStateController.$inject = ['$http','UserService'];
function SignupStateController($http, UserService) {
  var $ctrl = this;
  $ctrl.firstname = "";
  $ctrl.lastname = "";
  $ctrl.email = "";
  $ctrl.phonenumber = "";
  $ctrl.favoritedish = "";
  $ctrl.notsuchmenunumber = false;
  $ctrl.infosaved = false;
  $ctrl.submit = function() {
    console.log($ctrl);
    $http({
      method: "GET",
      url: "https://renglisch-course5.herokuapp.com/menu_items/"+$ctrl.favoritedish+".json"
    }).then(function(response) {
      console.log("success");
      console.log(response);
      $ctrl.notsuchmenunumber = false;
      UserService.put($ctrl.firstname,$ctrl.lastname,$ctrl.email,$ctrl.phonenumber,$ctrl.favoritedish);
      $ctrl.infosaved = true;
    },function(response) {
      console.log("error");
      console.log(response);
      $ctrl.notsuchmenunumber = true;
      $ctrl.infosaved = false;
    });
  }

}

})();
