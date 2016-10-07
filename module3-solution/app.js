(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller("NarrowItDownController",NarrowItDownController)
.service("MenuSearchService",MenuSearchService)
.directive("foundItems",FoundItemDirective)
;

function FoundItemDirective() {
  var ddo = {
    templateUrl: 'menuItem.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemDirectiveController() {
  var list = this;

}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.searchTerm = "";
  narrow.menuItems = [];

  narrow.getMatchedMenuItems  = function () {
    if (narrow.searchTerm)  {
      var menuItemsPromise = MenuSearchService.getMatchedMenuItems();
      menuItemsPromise.then(
          function (result) {
          // process result and only keep items that match
          var temp_menu_items = result.data.menu_items;
          narrow.menuItems = temp_menu_items.filter(
              function(value) {
                return value.name.toLowerCase().includes(narrow.searchTerm.toLowerCase());
              });
      });
    } else {narrow.menuItems=[];}
  }
  narrow.removeItem = function (itemIndex) {
//    MenuSearchService.removeItem(itemIndex);
    narrow.menuItems.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  //var foundItems = []
  service.getMatchedMenuItems = function() {

    var promise= $http({
                mehod: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
              });
    return promise;
  };

  // service.removeItem = function (itemIndex) {
  //   foundItems.splice(itemIndex, 1);
  // };

}



})();
