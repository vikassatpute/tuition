angular.module('admin.classes.add', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource', 'directives.serverError', 'ui.bootstrap']);
angular.module('admin.classes.add').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/classes/add', {
      templateUrl: 'admin/classes/add.tpl.html',
      controller: 'ClassAddCtrl',
      title: 'classes / Add',
      resolve: {
        account: ['$q', '$location', '$log', 'securityAuthorization', 'adminResource', function($q, $location, $log, securityAuthorization, adminResource){
          //get app stats only for admin-user, otherwise redirect to /account
          var redirectUrl;
          var promise = securityAuthorization.requireAdminUser()
            .then(function(){
              redirectUrl = '/admin/classes/add';
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
angular.module('admin.classes.add').controller('ClassAddCtrl', ['$scope', '$http', '$route', '$location', 'utility', 'adminResource', 'account',
  function($scope, $http, $route, $location, utility, adminResource, data) {
    $scope.addClass = function(){
      console.log('$scope.classObj:: ',$scope.classObj);
      $http.post('/api/admin/classes/add', $scope.classObj).success(function(res){
        console.log('here::::  ',res);
        $location.path('/admin/classes');
      });
    };

  }
]);