/**
 * Created by qingyun on 16/10/9.
 */

angular.module('myApp.specialController', ['ngAnimate'])
    .controller('specialController', ['$scope', '$stateParams','$state','$http','$anchorScroll','IPAndPort','$location',function ($scope, $stateParams,$state, $http,$anchorScroll,IPAndPort,$location) {
        console.log($stateParams);

        $scope.mine = {
            newsList: '',
            headImg: '',
            topicsArr: [],
            goBack: function () {
                //var viewHeight = getComputedStyle(document.querySelector('.headline-content'), false)['height'];
                //document.querySelector('.tab-nav.tabs').style.top = viewHeight ;
                window.history.go(-1);
            },
            goToAnchor: function (index) {
                $location.hash('div'+index);
            },
            goToDetailView: function (postid, skipID, photosetID) {
                $state.go('headlineState-detailState',{  //直接跳转到详情页
                    'postid': postid,
                    'skipID': skipID,
                    'photosetID': photosetID
                });
                // $location.path('/detail/'+ postid +'/'+ skipID +'/'+ photosetID); //跳转到详情页
            }
        };

        //处理数据
        (function () {

            var myUrl = 'http://c.m.163.com/nc/special/'+ $stateParams.specialID +'.html';
            //通过本地服务器获取网易服务器数据
            $http({
                method: 'jsonp',
                url: 'http://'+ IPAndPort.IP +':'+ IPAndPort.port +'?myUrl=' + myUrl + '&callback=JSON_CALLBACK'
            }).then(function success(result) {
                //处理请求到的网易数据
                // console.log(result);
                $scope.mine.newsList =result.data[$stateParams.specialID];
                $scope.mine.topicsArr = result.data[$stateParams.specialID].topics;

                console.log( $scope.mine.newsList, $scope.mine.topicsArr);

            },function error(e) {
                console.log(e);
            });


        })()


    }]);

