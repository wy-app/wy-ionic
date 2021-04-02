/**
 * Created by qingyun on 16/11/3.
 */

angular.module('app.subDetailController', [])
    .controller('subDetailController', ['$scope','myFactory','$stateParams','$location','$timeout', function ($scope,myFactory,$stateParams,$location,$timeout) {

        $scope.mine = {
            subscribe_info_all: null,
            tab_list_all: null,

            subscribe_info_live: null,
            tab_list_live: null,
            goToLiveDetail : function (roomId) {
                //隐藏tabBar
                // $timeout(function () {
                //     document.querySelector('.tab-nav.tabs').style.top = 1000 + 'px';
                //     document.querySelector('.live-detail-content').style.bottom = 0 + 'px';
                // },200);
                $location.path('/tabBar/liveDetail/'+ roomId);
            },
        };

        var detailUrl_all = 'http://c.m.163.com/nc/subscribe/list/'+ $stateParams.ename +'/all/0-20.html';
        myFactory.ajaxData(detailUrl_all, '订阅号详情-全部');
        var detailUrl_live = 'http://c.m.163.com/nc/subscribe/list/'+ $stateParams.ename +'/live/0-20.html';
        myFactory.ajaxData(detailUrl_live, '订阅号详情-直播');


        $scope.$on('success', function (e, msg) {
            if (msg[0] == '订阅号详情-全部') {
                var msg = msg[1];
                console.log(msg);
                $scope.mine.subscribe_info_all = msg.data.subscribe_info;
                $scope.mine.tab_list_all = msg.data.tab_list;

                console.info([$scope.mine.subscribe_info_all,$scope.mine.tab_list_all])

            }
            if (msg[0] == '订阅号详情-直播') {
                var msg = msg[1];
                console.log(msg);
                $scope.mine.subscribe_info_live = msg.data.subscribe_info;
                $scope.mine.tab_list_live = msg.data.tab_list;

                console.info([$scope.mine.subscribe_info_live,$scope.mine.tab_list_live])

            }
        })

    }]);