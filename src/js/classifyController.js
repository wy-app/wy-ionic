/**
 * Created by qingyun on 16/11/4.
 */
angular.module('app.classifyController', [])
    .controller('classifyController', ['$scope','liveUrlArr','$location','myFactory','$timeout', function ($scope,liveUrlArr,$location,myFactory,$timeout) {

        $scope.mine = {
            model: liveUrlArr,
            classifyList: [],
            live_review: [],

            goTo: function (str) {
                if(str == '热门'){
                    $location.path('/tabBar/live');
                }else if(str == '分类'){
                    $location.path('/tabBar/classify');
                }else if(str == '订阅'){
                    $location.path('/tabBar/subscription')
                }
            },
            changeLiveList: function (e,id) {
                // console.log(e);
                // if(e.target) e.target.className += ' button-assertive';

                var url = 'http://data.live.126.net/livechannel/classify/'+ id +'/1.json';
                myFactory.ajaxData(url, '分类直播');
            },
            goToLiveDetail : function (roomId) {
                //隐藏tabBar
                // $timeout(function () {
                //     document.querySelector('.tab-nav.tabs').style.top = 1000 + 'px';
                //     document.querySelector('.live-detail-content').style.bottom = 0 + 'px';
                // },200);
                $location.path('/liveDetail/'+ roomId);
            }
        };


        var  classifylistUrl = 'http://data.live.126.net/livechannel/classifylist.json';
        myFactory.ajaxData(classifylistUrl, '分类');
        $scope.mine.changeLiveList('',3);

        $scope.$on('success', function (e, msg) {

            if(msg[0] == '分类'){
                $scope.mine.classifyList = msg[1].data;
            }
            if(msg[0] == '分类直播'){
                $scope.mine.live_review = msg[1].data.live_review;
            }

            console.log([$scope.mine.classifyList, $scope.mine.live_review])
        })


        // var requestUrl = '', number ;
        // doRefresh('down');
        // //下拉刷新，上拉加载
        // function doRefresh(str) {
        //     console.log(str);
        //     $scope.mine.downOrUp = str;
        //     if(str == 'down'){
        //         number = 1;
        //         requestUrl = liveUrlArr[0].url;
        //     }else if(str == 'up'){
        //         number++;
        //         requestUrl = 'http://data.live.126.net/livechannel/previewlist/'+ number +'.json';
        //         console.warn(requestUrl)
        //     }
        //
        //     //请求数据
        //     requestUrl && myFactory.ajaxData(requestUrl, '热门');
        // }

        //接收数据成功
        // $scope.$on('success', function (e,msg) {
        //     if(msg[0] == '热门'){
        //         var msg = msg[1];
        //
        //         if($scope.mine.downOrUp == 'down'){
        //             console.log(msg.data);
        //             $scope.mine.top = msg.data.top;
        //             $scope.mine.subscription = msg.data.sublives;
        //             $scope.mine.live_review = msg.data.live_review;
        //             $scope.mine.future = msg.data.future;
        //
        //             $scope.mine.isShow = true;
        //             $scope.$broadcast('scroll.refreshComplete');
        //         }else {
        //             console.log(msg.data);
        //             $scope.mine.live_review = $scope.mine.live_review.concat(msg.data.live_review);
        //             console.info([$scope.mine.live_review]);
        //
        //             if(number >= 5){
        //                 $scope.mine.isShow = false;
        //             }
        //             $scope.$broadcast('scroll.infiniteScrollComplete')
        //         }
        //
        //     }
        // });
        // //接收数据失败
        // $scope.$on('error', function (e,msg) {
        //     if($scope.mine.downOrUp == 'down'){
        //         $scope.$broadcast('scroll.refreshComplete')
        //     }else {
        //         $scope.$broadcast('scroll.infiniteScrollComplete')
        //     }
        // });

    }])