/**
 * Created by qingyun on 16/10/9.
 */

angular.module('myApp.detailController', ['ngAnimate'])
    .controller('detailController', ['$scope', '$stateParams', '$http', '$sce', 'IPAndPort', '$timeout', function ($scope, $stateParams, $http, $sce, IPAndPort, $timeout) {
        console.log($stateParams);

        $scope.mine = {
            title: '',
            content: '',
            time: '',
            source: '',
            replyCount: '',
            goBack: function () {
                //$timeout(function () {
                //    var viewHeight = getComputedStyle(document.querySelector('.headline-content'), false)['height'];
                //    document.querySelector('.tab-nav.tabs').style.top = parseInt(viewHeight) - 32 + 'px' ;
                //    console.info(viewHeight)
                //},200);
                window.history.go(-1);
            },
            imgArr: [],
            setName: ''
        };


        //处理数据
        (function () {

            var myUrl = '';
            //判断是图片新闻还是文字新闻
            if ((($stateParams.skipID != '') && ($stateParams.skipID.indexOf('|') != -1) && ($stateParams.skipID.length <= 20)) || ($stateParams.photosetID != '')) {
                //图片新闻
                var ID = '';
                if ($stateParams.skipID != 'undefined') {
                    ID = $stateParams.skipID.slice(4);
                } else {
                    ID = $stateParams.photosetID.slice(4);
                }
                console.log(ID);
                ID = ID.replace(/\|/, '/');
                console.log(ID);

                myUrl = 'http://c.3g.163.com/photo/api/set/' + ID + '.json';
                //通过本地服务器获取网易服务器数据
                $http({
                    method: 'jsonp',
                    url: 'http://' + IPAndPort.IP + ':' + IPAndPort.port + '?myUrl=' + myUrl + '&callback=JSON_CALLBACK'
                })
                    .then(function success(result) {
                        //处理请求到的网易数据
                        console.log(result);
                        $scope.mine.imgArr = result.data.photos;
                        $scope.mine.setName = result.data.setname;

                        $timeout(function () {
                            var swiper = new Swiper('.imgContent', {
                                // autoplay: 1000,
                                // speed: 1000,
                                loop: true
                            })
                        }, 100)

                    }, function error(e) {
                        console.log(e);
                    });

            }
            else {
                // 文字新闻
                if ($stateParams.postid != '') {
                    myUrl = 'http://c.3g.163.com/nc/article/' + $stateParams.postid + '/full.html';
                } else if ($stateParams.skipID.indexOf('|') == -1) {
                    myUrl = 'http://c.3g.163.com/nc/article/' + $stateParams.skipID + '/full.html';
                }

                //通过本地服务器请求网易服务器数据
                var promise = $http({
                    method: 'jsonp',
                    url: 'http://' + IPAndPort.IP + ':' + IPAndPort.port + '?myUrl=' + myUrl + '&callback=JSON_CALLBACK'
                });
                promise.success(function (result) {
                    console.log(result);
                    if ($stateParams.postid != '') {
                        result = result[$stateParams.postid];
                    } else if ($stateParams.skipID.indexOf('|') == -1) {
                        result = result[$stateParams.skipID];  // 数据还要处理！！！！！！！！！
                    }
                    // console.log(result.body);

                    //获取图片
                    if (result.img && result.img.length) {
                        for (i in result.img) {
                            if (result.img[i] && result.img[i].pixel) {
                                var width = result.img[i].pixel.split('*')[0];  //获取图片的宽
                                var height = result.img[i].pixel.split('*')[1];  //获取图片的高   
                            }
                            var str = '<img style="width:' + width + ';height:' + height + '" src=' + JSON.stringify(result.img[i].src) + '><span>' + result.img[i].alt + '</span>';
                            result.body = result.body.replace(result.img[i].ref, str)
                        }
                    }

                    $scope.mine.title = result.title;
                    $scope.mine.content = $sce.trustAsHtml(result.body);
                    $scope.mine.time = result.ptime.slice(5, -3);
                    $scope.mine.source = result.source;
                    $scope.mine.replyCount = result.replyCount;

                });
                promise.error(function (e) {
                    console.log(e);
                });
            }

        })();


    }]);

