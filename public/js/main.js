'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		// To have the index partial render in the ng-view
    $routeProvider.when('/', {templateUrl: 'partials/allPosts.html', controller: IndexCtrl});
    $routeProvider.when('/addPost', {templateUrl: 'partials/addPost.html', controller: AddPostCtrl});
    $routeProvider.when('/readPost/:id', {templateUrl: 'partials/readPost.html', controller: ReadPostCtrl});
    $routeProvider.when('/editPost/:id', {templateUrl: 'partials/editPost.html', controller: EditPostCtrl});
    $routeProvider.when('/deletePost/:id', {templateUrl: 'partials/deletePost.html', controller: DeletePostCtrl});

//    $routeProvider.otherwise({redirectTo: '/'});

//    $locationProvider.html5Mode(true);
  }]);