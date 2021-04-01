/**
 * Created by qingyun on 16/11/1.
 */

angular.module('myApp.liveController', [])
    .constant('liveUrlArr', [
        { name: '热门', url: 'http://data.live.126.net/livechannel/previewlist.json'},
        { name: '分类' ,url: ['http://data.live.126.net/livechannel/classifylist.json', ' http://data.live.126.net/livechannel/classify/3/1.json']},
        { name: '订阅' ,url: 'http://data.live.126.net/livechannel/sub/1.json' }
    ])
    .controller('liveController', ['$scope', '$http','myFactory','liveUrlArr','$timeout','$location', function ($scope, $http, myFactory,liveUrlArr,$timeout,$location) {

        $scope.mine = {
            model: liveUrlArr,
            top: [],    // 轮播图
            subscription: [],   //直播号
            live_review: [],  //  直播
            future: [],     // 预告
            isShow: true,
            refreshOrLoad: doRefresh,
            downOrUp: '',
            goTo: function (str) {
                if(str == '热门'){
                    $location.path('/tabBar/live');
                }else if(str == '分类'){
                    $location.path('/tabBar/classify');
                }else if(str == '订阅'){
                    $location.path('/tabBar/subscription');
                }
            },
            goToSubs: function () {
                $location.path('/tabBar/subscription-allSub')
            },
            goToSubDetail: function (ename) {
                $location.path('/tabBar/subDetail/'+ ename)
            },
            goToLiveDetail : function (roomId) {
                $location.path('/tabBar/liveDetail/'+ roomId);
            },
            goToFuture: function () {
                $location.path('/tabBar/liveFuture')
            }
        };


        var requestUrl = '', number ;
        doRefresh('down');
        //下拉刷新，上拉加载
        function doRefresh(str) {
            console.log(str);
            $scope.mine.downOrUp = str;
            if(str == 'down'){
                number = 1;
                requestUrl = liveUrlArr[0].url;
            }else if(str == 'up'){
                number++;
                requestUrl = 'http://data.live.126.net/livechannel/previewlist/'+ number +'.json';
                console.warn(requestUrl)
            }

            //请求数据
            requestUrl && myFactory.ajaxData(requestUrl, '热门');
        }

        //接收数据成功
        $scope.$on('success', function (e,msg) {
            if(msg[0] == '热门'){
                var msg = msg[1];

                if($scope.mine.downOrUp == 'down'){
                    //console.log(msg.data);
                    $scope.mine.top = msg.data.top;
                    $scope.mine.subscription = msg.data.sublives;
                    $scope.mine.live_review = msg.data.live_review;
                    $scope.mine.future = msg.data.future;

                    $scope.mine.isShow = true;
                    $scope.$broadcast('scroll.refreshComplete');
                }else {
                    console.log(msg.data);
                    $scope.mine.live_review = $scope.mine.live_review.concat(msg.data.live_review);
                    console.info([$scope.mine.live_review]);

                    if(number >= 5){
                        $scope.mine.isShow = false;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete')
                }
                //轮播图
                $timeout(function () {
                    var liveSwiper = new Swiper('.live-swiper-container', {
                        direction: 'horizontal',
                        autoplay: 3000,
                        speed: 500,
                        autoplayDisableOnInteraction: false,
                        pagination: '.swiper-pagination',  //设置分页器
                        paginationClickable: true,
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next'
                    });
                    var futureSwiper = new Swiper('.future-live-swiper-container', {
                        direction: 'vertical',
                        autoplay: 1000,
                        speed: 500,
                        autoplayDisableOnInteraction: false,
                    });
                })

            }
        });
        //接收数据失败
        $scope.$on('error', function (e,msg) {
            if($scope.mine.downOrUp == 'down'){
                $scope.$broadcast('scroll.refreshComplete')
            }else {
                $scope.$broadcast('scroll.infiniteScrollComplete')
            }
        });



    }])
    .controller('liveFutureController', function ($scope,$sce) {

        $scope.mine = {
            template: ''
        };

        $scope.mine.template =  $sce.trustAsResourceUrl('http://c.m.163.com/nc/qa/newsapp/live.html');

        $scope.mine.futureLive_style = {
            width: document.querySelector('#futureContent').clientWidth +'px',
            height: document.querySelector('#futureContent').clientHeight + 'px'
        };

    });