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
