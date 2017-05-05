angular.module('classes.index', ['ngRoute', 'security.authorization']);
angular.module('classes.index').config(['$routeProvider', 'securityAuthorizationProvider', function($routeProvider, securityAuthorizationProvider){
  $routeProvider
    .when('/classes', {
      templateUrl: 'classes/class.tpl.html',
      controller: 'classesCtrl',
      title: 'Class List'
    });
}]);
angular.module('classes.index').controller('classesCtrl', ['$scope', '$http',
  function($scope, $http){
    console.log('herer');
    $scope.getClassList = function(){
      $http.get('/api/classes').success(function(res){
        console.log("res: ",res);
        $scope.classList = res;
      });
    };
  }]);