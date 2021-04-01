/**
 * Created by qingyun on 16/11/6.
 */

angular.module('myApp.cartoonController', [])
    .controller('cartoonController', function ($scope,myFactory,$state) {

        $scope.mine = {
            imgArr: null,
            newsList: [],
            refreshOrLoad: doRefresh,
            goToDetail: function (url) {
                $state.go('cartoonDetailState',{
                    url: url
                })
            }
        };


        var number = 0;
        doRefresh('down');
        //下拉刷新，上拉加载
        function doRefresh(str) {
            // console.log(str);
            $scope.mine.downOrUp = str;
            if (str == 'down') {
                $scope.mine.downOrUp = 'down';
                number = 20;
                var cartoonUrl = 'http://c.m.163.com/nc/article/list/T1444270454635/0-'+ number +'.html';
                var randomNum = Math.floor(Math.random() * 10 + 1);
                cartoonUrl = cartoonUrl+ '&randomNum=' + randomNum ;

            } else if (str == 'up') {
                $scope.mine.downOrUp = 'up';
                number += 20;
                cartoonUrl = 'http://c.m.163.com/nc/article/list/T1444270454635/'+ number +'-20.html';
            }
            cartoonUrl && myFactory.ajaxData(cartoonUrl,'漫画');
        }

        //处理请求到的数据
        $scope.$on('success', function (e,msg) {
            if(msg[0] == '漫画'){

                var result = msg[1];
                console.info(result);
                result = result.data.T1444270454635;

                if( $scope.mine.downOrUp == 'down'){
                    var deleteObj = result.shift();
                    // console.log(deleteObj);

                    $scope.mine.imgArr = deleteObj;

                    $scope.mine.cartoonList = result;
                    console.log([$scope.mine.imgArr, $scope.mine.cartoonList]);

                    $scope.$broadcast('scroll.refreshComplete')
                }else {
                    //数据拼接
                    $scope.mine.cartoonList = $scope.mine.cartoonList.concat(result);
                    console.log([$scope.mine.imgArr, $scope.mine.cartoonList]);

                    if(number >=400){
                        $scope.mine.isShow = false;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete')
                }
                // //在设置轮播图的总长度之前设置一个时间等待，防止DOM元素未加载完毕
                // $timeout(function () {
                //     //swiper配置
                //     var wheelSwiper = new Swiper('.headslide', {
                //         direction: 'horizontal',
                //         autoplay: 3000,
                //         speed: 500,
                //         autoplayDisableOnInteraction: false,
                //
                //         nextButton: '.swiper-button-next',
                //         prevButton: '.swiper-button-prev',
                //         pagination: '.swiper-pagination',  //设置分页器
                //         paginationClickable: true,
                //     });
                //
                // }, 800);
            }
        });
        //接收数据失败
        $scope.$on('error', function (e,msg) {
            if($scope.mine.downOrUp == 'down'){
                // 停止广播ion-refresher
                $scope.$broadcast('scroll.refreshComplete')
            }else {
                //停止广播ion-infinite-scroll
                $scope.$broadcast('scroll.infiniteScrollComplete')
            }
        });




    });