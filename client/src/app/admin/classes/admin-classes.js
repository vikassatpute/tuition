angular.module('admin.classes.index', ['ngRoute', 'security.authorization', 'services.utility', 'services.adminResource', 'directives.serverError', 'ui.bootstrap']);
angular.module('admin.classes.index').config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/admin/classes', {
      templateUrl: 'admin/classes/classList.tpl.html',
      controller: 'ClassListCtrl',
      title: 'classes / List',
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
angular.module('admin.classes.index').controller('ClassListCtrl', ['$scope', '$http', '$route', '$location', 'utility', 'adminResource', 'account',
  function($scope, $http, $route, $location, utility, adminResource, data) {
    console.log('herer');
    $scope.getClassList = function(){
      $http.get('/api/admin/classes').success(function(res){
        console.log("res: ",res);
        $scope.classList = res;
      });
    };

  }
]);