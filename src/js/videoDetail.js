/**
 * Created by qingyun on 16/11/5.
 */


angular.module('myApp.videoDetailController', [])
    .controller('videoDetailController', ['$scope','myFactory','$stateParams','$sce','$timeout', function ($scope,myFactory,$stateParams,$sce,$timeout) {

        $scope.mine = {
            videoObj: null,
            recommend: [],
            url: '',
            recommendUrl:[],
            goBack: function () {
                $timeout(function () {
                    var viewHeight = getComputedStyle(document.querySelector('.video-content'), false)['height'];
                    document.querySelector('.tab-nav.tabs').style.top = parseInt(viewHeight) + 60  + 'px' ;
                    // console.info(viewHeight)
                },200);
                window.history.go(-1);
            },
        };


        var videoDetailUrl  =  'http://c.m.163.com/nc/video/detail/'+ $stateParams.vid + '.html';

        myFactory.ajaxData(videoDetailUrl, '视频详情');

        $scope.$on('success', function (e, msg) {
            console.log(msg);
            if(msg[0] == '视频详情'){
                $scope.mine.videoObj = msg[1].data;
                $scope.mine.recommend = msg[1].data.recommend;
                $scope.videoUrl = $sce.trustAsResourceUrl(msg[1].data.mp4_url);
                $scope.mine.recommend.forEach(function (ele,index) {
                    ele.recommendUrl = $sce.trustAsResourceUrl(ele.mp4_url)
                });
                // $scope.mine.recommend.UrlArr = $scope.mine.recommendUrl;

                console.log([ $scope.mine.videoObj, $scope.mine.recommend, $scope.videoUrl]);
            }

        })



    }])