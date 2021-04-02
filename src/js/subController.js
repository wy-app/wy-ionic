/**
 * Created by qingyun on 16/11/2.
 */

angular.module('app.subController', [])
    .controller('subController', ['$scope','liveUrlArr','$state','$timeout','mySubs','$location', function ($scope,liveUrlArr,$state,$timeout,mySubs,$location) {

        $scope.mine = {
            model: liveUrlArr,
            goToSubMore: function () {
                // $timeout(function () {
                //     document.querySelector('.tab-nav.tabs').style.top = 1000 + 'px';
                //     document.querySelector('.subDetail-Content').style.bottom = 20 + 'px';
                // },200);
                $state.go('tabState.subState-allSub')
            },
            mySubs: [],
            goTo: function (str) {
                if(str == '热门'){
                    $location.path('/tabBar/live');
                }else if(str == '分类'){
                    $location.path('/tabBar/classify');
                }else if(str == '订阅'){
                    $location.path('/tabBar/subscription');
                }

            },
            goToSubDetail: function (ename) {
                $location.path('/tabBar/subDetail/'+ ename)
            },
        };

        $scope.mine.mySubs = mySubs;
        $scope.fresh = function () {
            console.info(mySubs);
            $scope.mine.mySubs = mySubs;
            $scope.$broadcast('scroll.refreshComplete');
        };




        $scope.mine.isShowDelete = false;
        $scope.mine.isShowEdit = false;

        $scope.deleteItem = function (item) {
//                    console.info($scope.mine.dataArr.indexOf(item))
            $scope.mine.mySubs.splice($scope.mine.mySubs.indexOf(item), 1);
        };
        $scope.moveItem = function (item, from, to) {
            console.info(from,to);
            $scope.mine.mySubs.splice(from, 1); // 删除
            $scope.mine.mySubs.splice(to, 0, item);  //插入
        };




    }]);