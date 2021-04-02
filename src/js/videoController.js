/**
 * Created by qingyun on 16/11/5.
 */


angular.module('myApp.videoController', [])
    .controller('videoController', ['$scope','myFactory','$state', '$timeout',function ($scope,myFactory,$state,$timeout) {

        $scope.mine = {
            videoArr: [],
            goToDetail: function (vid) {
                $state.go('tabState.videoDetailState',{
                    vid: vid
                });
                //隐藏tabBar
                $timeout(function () {
                    document.querySelector('.tab-nav.tabs').style.top = 1000 + 'px';
                },200);
            }
        };
        // http://c.m.163.com/nc/video/detail/VC461AEJ2.html


        var videoUrl  = 'http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&size=20&offset=0&fn='+  1 +'&passport=&devId=GWs1dXe0XRaDTl%2BFIZzcSA%3D%3D&lat=efJFOa8VVTo8GXnVBtvyHw%3D%3D&lon=pQ9j%2B6ww7jEBB7dQTATYcQ%3D%3D&version=17.1&net=wifi&ts=1478311562&sign=CcxpNLyC%2F3IdpkXDFPnZjfqqH6vSWswVjuNGU1aXVRB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=F6vsF%2BhIFcu5BspoJJ5YBAvVdjgSXYDtwEDZ03eH1l8%3D';
        var videoUrl2  = "http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&size=20&offset=0&fn=1&passport=&devId=GWs1dXe0XRaDTl%2BFIZzcSA%3D%3D&lat=C6b%2FQ1WuGOyS1RfTLPe%2BlQ%3D%3D&lon=i1axxBJNHGRfQjQrE0WTCw%3D%3D&version=17.1&net=wifi&ts=1478315679&sign=LFeIhkNQLzh%2Fa9%2FtFI0C%2BuADqq0RKwnadX9cXAVVEnt48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=F6vsF%2BhIFcu5BspoJJ5YBAvVdjgSXYDtwEDZ03eH1l8%3D";
        var videoUrl3 =  "http://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&size=20&offset=0&fn=2&passport=&devId=GWs1dXe0XRaDTl%2BFIZzcSA%3D%3D&lat=C6b%2FQ1WuGOyS1RfTLPe%2BlQ%3D%3D&lon=i1axxBJNHGRfQjQrE0WTCw%3D%3D&version=17.1&net=wifi&ts=1478315855&sign=39nnodcyxsfAwH1f%2BKYyQ1LNon9u53Ym6DSj%2FU8OTDx48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=oppo_store2014_news&mac=F6vsF%2BhIFcu5BspoJJ5YBAvVdjgSXYDtwEDZ03eH1l8%3D";

        myFactory.ajaxData(videoUrl, '视频');

        $scope.$on('success', function (e, msg) {

            if(msg[0] == '视频'){
                console.log(msg);
                $scope.mine.videoArr = msg[1].data.视频;

                console.log([ $scope.mine.videoArr]);
            }

        })



    }])