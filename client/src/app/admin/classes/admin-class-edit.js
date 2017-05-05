angular.module('admin.classes.edit', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource', 'directives.serverError', 'ui.bootstrap']);
angular.module('admin.classes.edit').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/classes/edit/:id', {
      templateUrl: 'admin/classes/edit.tpl.html',
      controller: 'ClassEditCtrl',
      title: 'classes / Edit',
      resolve: {
        account: ['$q', '$location', '$log', 'securityAuthorization', 'adminResource', function($q, $location, $log, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              redirectUrl = '/admin/classes/edit/:id';
            }, function(reason){
              //rejected either user is un-authorized or un-authenticated
              redirectUrl = reason === 'unauthorized-client'? '/account': '/login';
              return $q.reject();
            })
            .catch(function(){
              redirectUrl = redirectUrl || '/account';
              $location.search({});
              $location.path(redirectUrl);
              return $q.reject();
            });
          return promise;
        }]
      }
    });
}]);
angular.module('admin.classes.edit').controller('ClassEditCtrl', ['$scope', '$http', '$route', '$location', 'utility', 'adminResource', 'account',
  function($scope, $http, $route, $location, utility, adminResource, data) {
    $scope.getClass = function(){
      console.log("get class");
      var id = $route.current.params.id;
      console.log("id: ",id);
      $http.get('/api/admin/classes/edit/'+id).success(function(res){
        console.log('here::::  ',res);
        $scope.classObj = res;
      });
    };
    $scope.editClass = function(){
      console.log('$scope.classObj:: ',$scope.classObj);
      var id = $route.current.params.id;
      $http.put('/api/admin/classes/edit/'+id, $scope.classObj).success(function(res){
        console.log('here::::  ',res);
        $location.path('/admin/classes');
      });
    };    

  }
]);