(function () {

angular.module('ChoresList')
  .controller('ChoresController', ['choresFactory', '$scope', '$rootScope', '$location', function (choresFactory, $scope, $rootScope, $location) {

  choresFactory.getChores().then( function (results) {
    $scope.chores = results;
  });

  }]);

}());
