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

          if ($scope.chore.complete === undefined || $scope.chore.complete === 'incomplete') {
            $scope.chore.complete = 'complete';
            $scope.chore.put();

          }

          else {
            $scope.chore.complete = 'incomplete';
            $scope.chore.put();

          }
        });
      }
    }
  });


}());

(function () {

  angular.module('ChoresList')
  .factory('choresFactory', ['$rootScope', 'Restangular', function ($rootScope, Restangular) {

  //defines the endpoint where Restangular gets the data - url defined in app.config with Restangular provider
  var allChores = Restangular.all('choreslistThomas');

  function getChores () {
    //retrieves (gets the data) from the REST endpoint
    return allChores.getList();

  }

  function getChore (id) {
    //gets a single chore from the server based on id
    return allChores.get(id);

  }

  function addChore (chore) {

    allChores.post(chore).then( function (){
      //broadcast to the parent controller that the chore has been added and redirect in the controller
      $rootScope.$broadcast('chore:added');
    });
  }

  function updateChore (chore) {

  chore.put().then( function (){
      //broadcast to the parent controller that the chore has been updated and redirect in the controller
      $rootScope.$broadcast('chore:updated');
    });
  }

  function deleteChore (chore) {

  chore.remove().then( function (){
      //broadcast to the parent controller that the chore has been updated and redirect in the controller
      $rootScope.$broadcast('chore:deleted');
    });
  }

  return {

        getChores: getChores,
        getChore: getChore,
        addChore: addChore,
        updateChore: updateChore,
        deleteChore: deleteChore

      };

  }]);

}());

(function () {

angular.module('ChoresList')
  .controller('ChoresController', ['choresFactory', '$scope', '$rootScope', '$location', function (choresFactory, $scope, $rootScope, $location) {

  choresFactory.getChores().then( function (results) {
    $scope.chores = results;
  });

  }]);

}());

(function () {

  angular.module('ChoresList')
    .controller('SingleChoreController', ['choresFactory', '$scope', '$routeParams', '$rootScope', '$location', function (choresFactory, $scope, $routeParams, $rootScope, $location) {

  choresFactory.getChore($routeParams.id).then(function (result){

    $scope.chore = result;

  });


  $scope.updateChore = function (chore) {

    choresFactory.updateChore(chore);

    $rootScope.$on('chore:updated', function (){
      $location.path('/');
    });

  }

  $scope.deleteChore = function (chore) {
    choresFactory.deleteChore(chore);

    $rootScope.$on('chore:deleted', function (){
      $location.path('/');
    });

  }

    }]);

}());

(function () {

  angular.module('ChoresList')
    .controller('AddChoreController', ['choresFactory', '$scope', '$rootScope', '$location', function (choresFactory, $scope, $rootScope, $location) {


  $scope.addChore = function (chore) {
            choresFactory.addChore(chore);

            $rootScope.$on('chore:added', function () {
              $location.path('/');
            });

  }
  
    }]);

}());
