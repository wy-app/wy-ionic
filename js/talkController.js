/**
 * Created by qingyun on 16/10/25.
 */

angular.module('app.talkController', [])
    .controller('talkController', ['$scope','$http','$location','IPAndPort', function ($scope,$http,$location,IPAndPort) {

        $scope.mine = {
            dataArr: [],
            goToTalkDetailView: function (expertId) {
                $location.path('/talkDetail/'+ expertId);
            }
        };


        (function () {
            var wyUrl = 'http://c.m.163.com/newstopic/list/expert/6YOR5bee/0-10.html';
            $http({
                method: 'jsonp',
                url: 'http://'+ IPAndPort.IP +':'+ IPAndPort.port +'?myUrl='+ wyUrl +'&callback=JSON_CALLBACK'
            }).then(function success(result) {

                console.log(result.data);
                $scope.mine.dataArr = result.data.data.expertList;

                console.log( $scope.mine.dataArr);


            },function error(e) {
                console.log(e);
            })

        })()


    }]);