(function () {
'use strict';

angular.module('LunchCheck', [])
/*.inject("$scope")*/
.controller('LunchCheckController', function ($scope) {
  $scope.dishes = "";
  $scope.message = "";

  $scope.checkIfTooMuch = function () {
    var dishesArray = $scope.dishes.split(",");
    var countDishes = dishesArray.length;
    if ($scope.dishes == "") {
      $scope.message = "Please enter data first" ;
    } else if (countDishes<=3)
      { $scope.message = "Enjoy!"
      } else {
        $scope.message = "Too much!"
      }
    /*$scope.message = countDishes;*/
  };

});


})();
