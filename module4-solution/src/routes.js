(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

//  Premade list page
  .state('categoryList', {
    url: '/category-list',
    templateUrl: 'src/menuapp/templates/main-category.template.html',
    controller: 'MainCategoryListController as categoryList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        var promise = MenuDataService.getAllCategories();
        return promise;
      }]
    }
  });
  // itemsInCategoryList
  // .state('itemsInCategoryList', {
  //   url: '/category-list/items',
  //   templateUrl: 'src/menuapp/templates/main-category.template.html',
  //   controller: 'MainCategoryListController as categoryList',
  //   resolve: {
  //     categories: ['MenuDataService', function (MenuDataService) {
  //       var promise = MenuDataService.getAllCategories();
  //       return promise;
  //     }]
  //   }
  // });
}
})();
