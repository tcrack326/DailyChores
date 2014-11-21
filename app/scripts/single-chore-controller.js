(function () {

  angular.module('ChoresList')
    .controller('SingleChoreController', ['choresFactory', '$scope', '$routeParams', '$rootScope', '$location', function (choresFactory, $scope, $routeParams, $rootScope, $location) {

      choresFactory.getChore($routeParams.id).then(function (result){

        $scope.chore = result;

      });

  $scope.addChore = function (chore) {
            choresFactory.addChore(chore);

            $rootScope.$on('chore:added', function () {
              $location.path('/');
            });

  }

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
