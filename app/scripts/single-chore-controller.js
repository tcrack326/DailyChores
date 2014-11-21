(function () {

  angular.module('ChoresList')
    .controller('SingleChoreController', ['choresFactory', '$scope', '$rootScope', '$location', function (choresFactory, $scope, $rootScope, $location) {

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

    }]);

}());
