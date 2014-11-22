(function (){

  var app = angular.module('ChoresList', ['ngRoute', 'restangular']);

  app.config( function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://tiy-atl-fe-server.herokuapp.com/collections/');
    RestangularProvider.setRestangularFields({
      id: '_id'
    });


    $routeProvider.when('/', {
      templateUrl: 'templates/main-template.html',
      controller: 'ChoresController'
    });

    $routeProvider.when('/edit/:id', {
      templateUrl: 'templates/single-template.html',
      controller: 'SingleChoreController'
    });

    $routeProvider.when('/add', {
      templateUrl: 'templates/add-template.html',
      controller: 'AddChoreController'
    });

  });

  app.directive('crossOut', function () {
    return {
      link: function ($scope, element, attrs) {
        element.bind('click', function () {
          console.log(this);
          //console.log(element.classlist);
          if ($scope.complete === undefined) {
            $scope.complete = 'complete';
            element.addClass('completed');
          }
          else {
            $(element).removeClass('completed');
            $scope.complete = undefined;

          }
        });
      }
    }
  });


}());
