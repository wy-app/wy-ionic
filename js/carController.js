
angular.module('myApp.carController', [])
    .controller('carController', ['$scope', '$http', '$location','$timeout','IPAndPort','$state','myFactory',function ($scope, $http, $location,$timeout,IPAndPort,$state,myFactory) {

        $scope.mine = {
            newsList: [],
            imgArr: [],
            imgObj: null,
            goToDetailView:   function goToDetailView(postid, skipID, specialID,photosetID) {
                console.log( [postid, skipID, specialID ]);
                if(typeof specialID != 'undefined'){   //注意：必须检测类型，不能检测值
                    //$location.path('/special/'+ specialID);  //跳转到专题页面
                    $state.go('specialState',{  //直接跳转到详情页
                        'specialID': specialID
                    });
                }else{
                    $state.go('headlineState-detailState',{  //直接跳转到详情页
                        'postid': postid,
                        'skipID': skipID,
                        'photosetID': photosetID
                    });
                }
            },
            refreshOrLoad: doRefresh,
            downOrUp:'',
            isShow: true
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
                var wyUrl = 'http://c.m.163.com/nc/auto/list/6YOR5bee/0-'+ number +'.html';
                var randomNum = Math.floor(Math.random() * 10 + 1);
                wyUrl = wyUrl+ '&randomNum=' + randomNum ;

            } else if (str == 'up') {
                $scope.mine.downOrUp = 'up';
                number += 20;
                wyUrl = 'http://c.m.163.com/nc/auto/list/6YOR5bee/'+ number + '-20.html';
                // console.warn(wyUrl)
            }
            wyUrl && myFactory.ajaxData(wyUrl,'汽车');
        }

        //处理请求到的数据
        $scope.$on('success', function (e,msg) {
            if(msg[0] == '汽车'){

                var result = msg[1];
                console.info(result);
                result = result.data.list;

                if( $scope.mine.downOrUp == 'down'){
                    var deleteObj = result.shift();
                    console.log(deleteObj);
                    if (deleteObj.ads.length >= 5) {
                        $scope.mine.imgArr = deleteObj;
                    } else {
                        $scope.mine.imgObj = deleteObj;
                    }
                    $scope.mine.newsList = result;
                    console.log([$scope.mine.imgArr, $scope.mine.newsList]);

                    $scope.$broadcast('scroll.refreshComplete')
                }else {
                    //数据拼接
                    $scope.mine.newsList = $scope.mine.newsList.concat(result);
                    console.log([$scope.mine.imgArr, $scope.mine.newsList]);

                    if(number >=400){
                        $scope.mine.isShow = false;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete')
                }
                //在设置轮播图的总长度之前设置一个时间等待，防止DOM元素未加载完毕
                $timeout(function () {
                    //swiper配置
                    var wheelSwiper = new Swiper('.headslide', {
                        direction: 'horizontal',
                        autoplay: 3000,
                        speed: 500,
                        autoplayDisableOnInteraction: false,

                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        pagination: '.swiper-pagination',  //设置分页器
                        paginationClickable: true,
                    });

                }, 800);
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


}]);
