/**
 * Created by qingyun on 16/11/1.
 */

angular.module('app.liveDetailController', [])
    .controller('liveDetailController', ['$scope', '$http','$stateParams','myFactory', '$sce','$timeout',function ($scope, $http,$stateParams,myFactory,$sce, $timeout) {

        $scope.mine = {
            //直播
            messages: [],
            mutilVideo: null,
            startDate: '',
            banner: null,
            //聊天室
            last_log: [],
            msg: null
        };

        var liveDetaiUrl_room = 'http://data.chat.126.net/route_room?topicid='+  $stateParams.roomId +'&userid=tdWasfN6Pt5sJFI7JZh+p8FRJypl08llzqQKYM4bRt9yTTCSdJqa3v9Q/Kp8XW6t5k0nVk7x60QpvOYgUnV4gA==&nickname=ogm9zs2qyn42ccb7e2fc3fbd043f8950a72f487a47&avatar=http://wx.qlogo.cn/mmopen/Fg84K3vPIqgPwIDSa9CbUibRqvZs5XgyTxhPzqhtbG72fKsbrIerKpFAI4ibXZf4hoW9J8oPGMJUVUND0any1vOXwssz6chmVf/0';
        myFactory.ajaxData(liveDetaiUrl_room, '聊天室');
        var liveDetaiUrl_live = 'http://data.live.126.net/liveAll/'+  $stateParams.roomId  +'.json'
        myFactory.ajaxData(liveDetaiUrl_live, '直播间');

        $scope.$on('success', function (e, msg) {
            if (msg[0] == '聊天室') {
                var msg = msg[1];
                console.log(msg);
                $scope.mine.last_log = msg.data.last_log;
                $scope.mine.msg = msg.data.msg;

                console.info([$scope.mine.last_log,$scope.mine.msg])

            }
            if (msg[0] == '直播间') {
                var msg = msg[1];
                console.log(msg);
                $scope.mine.messages = msg.data.messages;
                if(msg.data.mutilVideo) {
                    $scope.mine.mutilVideo =  msg.data.mutilVideo;
                    $scope.videoUrl = $sce.trustAsResourceUrl($scope.mine.mutilVideo[1].url);
                }
                $scope.mine.startDate = msg.data.startDate;
                $scope.mine.banner = msg.data.banner;

                console.info([$scope.mine.messages])
            }

            console.info($scope.mine.video,$scope.mine.mutilVideo,$scope.videoUrl);

            //if($scope.mine.messages.length > 0 && $scope.mine.last_log.length > 0){
                $timeout(function () {
                    var live_room_swiper = new Swiper('.live-room-swiper', {
                        direction: 'horizontal',
                        speed: 500,
                        loopedSlides: 2,
                        loop:true,
                         controlBy:'container',
                         //effect: 'cube',
                         //cube: {
                         //    slideShadows: true,  //开启slide阴影。默认 true。
                         //    shadow: true,       // 开启投影。默认 true。
                         //    shadowOffset: 10,  //投影距离。默认 20，单位px。
                         //    shadowScale: 0.8   //投影缩放比例。默认0.94。
                         //},
                        effect: 'flip',
                        flip: {
                            limitRotation : true,
                        }
                    });
                    var live_title_swiper = new Swiper('.live-title-swiper', {
                        direction: 'horizontal',
                        speed: 500,
                        loopedSlides: 2,
                        loop:true,
                        slidesPerView: 2,
                        slideToClickedSlide: true,
                        touchRatio: 0.5
                    });
                    live_title_swiper.params.control = live_room_swiper;
                    live_room_swiper.params.control = live_title_swiper;

                },100)
            //}

        })


    }])