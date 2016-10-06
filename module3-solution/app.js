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
    narrow.menuItems = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
  }
  narrow.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  var foundItems = []
  service.getMatchedMenuItems = function(searchTerm) {

    return $http({
                mehod: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
              }).then(
        function (result) {
        // process result and only keep items that match
        foundItems = result.data.menu_items;

        // return processed items
        return foundItems;

    });
  };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };

}



})();
