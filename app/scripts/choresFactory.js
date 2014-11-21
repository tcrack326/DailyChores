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

    allChores.put(chore).then( function (){
      //broadcast to the parent controller that the chore has been added and redirect in the controller
      $rootScope.$broadcast('chore:updated');
    });
  }

  return {

        getChores: getChores,
        getChore: getChore,
        addChore: addChore

      };

  }]);

}());
