/**
 * Created by qingyun on 16/10/9.
 */

angular.module('myApp', ['ionic','myApp.tabController','myApp.news', 'myApp.headlineController','myApp.detailController','myApp.funController','myApp.choiceController','myApp.sportsController','myApp.carController','myApp.pdsController', 'myApp.specialController', 'myApp.videoController','myApp.videoDetailController','myApp.cartoonController','myApp.cartoonDetailController',   'myApp.liveController','app.liveDetailController','app.subController','app.allSubController', 'app.subDetailController','app.classifyController',  'app.talkController'])
    .constant('myConstant', { IP: 'localhost',port: 9999 })
    .factory('myFactory', function ($http,myConstant,$rootScope) {
        return {
            ajaxData: function (url, str) {
                var requestUrl = 'http://'+ myConstant.IP +':'+ myConstant.port +'?myUrl='+ url + '&callback=JSON_CALLBACK';
                console.log(requestUrl)
                $http({
                    url: requestUrl,
                    method: 'jsonp'
                }).then(function (result) {
                    $rootScope.$broadcast('success', [str,result]);
                },function (e) {
                    $rootScope.$broadcast('error', e);
                })
            }
        }
    })
    .config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
        //配置
        $ionicConfigProvider.tabs.position('bottom');

        //通过路由状态跳转模块
        $stateProvider.state('tabState', {   //tabBar模板（总模板）
            url: '/tabBar',
            abstract: false,
            templateUrl: 'html/tabBar.html',
            controller: 'tabController'
        })
        .state('specialState', {    //special新闻专题
            url: '/special/:specialID',
            //views: {
            //    'tabBar-news': {
                    templateUrl: 'html/special.html',
                    controller: 'specialController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
            //    }
            //}
        })
        .state('headlineState-detailState', {    //detail新闻详情
            url: '/detail/:postid/:skipID/:photosetID',
            //views: {
            //    'tabBar-news': {
                    templateUrl: 'html/detail.html',
                    controller: 'detailController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
            //    }
            //}
        })
        .state('tabState.newsState',{
            url:'/news',
            views: {
                'tabBar-news': {
                    templateUrl: 'html/news.html',
                    controller: 'newsController'
                }
            }
        })
        .state('tabState.newsState.headlineState', {     //头条 模板(news的子模板)
            url: '/headline',
            //views: {
            //    'tabBar-headline': {
                    templateUrl: 'html/headline.html',
                    controller: 'headlineController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                //}
            //}
        })
        .state('tabState.newsState.choiceState', {     //精选 模板(news的子模板)
            url: '/choice',
            //views: {
            //    'tabBar-headline': {
                    templateUrl: 'html/headline.html',
                    controller: 'choiceController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                //}
            //}
        })
        .state('tabState.newsState.funState', {    //娱乐 模板(news的子模板)
            url: '/fun',
            //views: {
            //    'tabBar-headline': {
                    templateUrl: 'html/headline.html',
                    controller: 'funController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                //}
            //}
        })
        .state('tabState.newsState.sportState', {  //体育 模板(news的子模板)
            url: '/sport',
            //views: {
            //    'tabBar-headline': {
                    templateUrl: 'html/headline.html',
                    controller: 'sportsController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                //}
            //}
        })
        .state('tabState.newsState.carState', {    //汽车 模板(news的子模板)
            url: '/car',
            //views: {
            //    'tabBar-headline': {
                    templateUrl: 'html/headline.html',
                    controller: 'carController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                //}
            //}
        })
        .state('tabState.newsState.pdsState', {    //平顶山 模板(news的子模板)
            url: '/pds',
            //views: {
            //    'tabBar-headline': {
                    templateUrl: 'html/headline.html',
                    controller: 'pdsController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                //}
            //}
        })
        .state('tabState.newsState.videoState', {    //视频 模板(news的子模板)
            url: '/video',
            //views: {
            //    'tabBar-news': {
                    templateUrl: 'html/video.html',   //如果模板和其他不一样，承载模板就只能用上一级的
                    controller: 'videoController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                //}
            //}
        })
        .state('tabState.videoDetailState', {    //视频详情页 模板(news的子模板)
            url: '/videoDetail',
            params:{
                vid: ''
            },
            views: {
                'tabBar-news': {
                    templateUrl: 'html/videoDetail.html',   //如果模板和其他不一样，承载模板就只能用上一级的
                    controller: 'videoDetailController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                }
            }
        })

        .state('tabState.newsState.cartoonState', {    //视频 模板(news的子模板)
            url: '/cartoon',
            //views: {
            //    'tabBar-cartoon': {
                    templateUrl: 'html/cartoon.html',   //如果模板和其他不一样，承载模板就只能用上一级的
                    controller: 'cartoonController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                //}
            //}
        })
        .state('tabState.cartoonDetailState', {    //视频 模板(news的子模板)
            url: '/cartoonDetail/:url',
            views: {
                'tabBar-news': {
                    templateUrl: 'html/cartoonDetail.html',   //如果模板和其他不一样，承载模板就只能用上一级的
                    controller: 'cartoonDetailController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                }
            }
        })

        .state('tabState.liveState', {    //live下热门 页模板(live的子模板)
            url: '/live',
            views: {
                'tabBar-live': {
                    templateUrl: 'html/live.html',
                    controller: 'liveController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                }
            }
        })
        .state('tabState.liveState-detail', {    //live直播详情 页模板(tabBar子模板)
            url: '/liveDetail/:roomId',
            views: {
                'tabBar-live': {
                    templateUrl: 'html/liveDetailController.html',
                    controller: 'liveDetailController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                }
            }
        })
        .state('tabState.liveState-future', {    //直播预告 页模板(tabBar子模板)
            url: '/liveFuture',
            views: {
                'tabBar-live': {
                    templateUrl: 'html/live_future.html',
                    controller: 'liveFutureController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                }
            }
        })
        .state('tabState.classifyState', {
            url: '/classify',
            views: {
                'tabBar-live': {
                    templateUrl: 'html/classify.html',
                    controller: 'classifyController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                }
            }
        })
        .state('tabState.subState', {    //live下订阅 页模板(live的模板)
            url: '/subscription',
            views: {
                'tabBar-live': {
                    templateUrl: 'html/sub.html',
                    controller: 'subController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                }
            }
        })
        .state('tabState.subState-allSub', {    //全部订阅号 页模板(live的模板)
            url: '/subscription-allSub',
            views: {
                'tabBar-live': {
                    templateUrl: 'html/subAll.html',
                    controller: 'allSubController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                }
            }
        })
        .state('tabState.subState-subDetail', {    //订阅 页模板(live的子模板)
            url: '/subDetail/:ename',
            views: {
                'tabBar-live': {
                    templateUrl: 'html/subDetail.html',
                    controller: 'subDetailController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                }
            }
        })

        .state('tabState.talkState', {    //talk话题 页模板(tabBar子模板)
            url: '/talk',
            views: {
                'tabBar-talk': {
                    templateUrl: 'html/talk.html',
                    controller: 'talkController',
                    resolve: {
                        IPAndPort: 'myConstant'
                    }
                }
            }
        })

        $urlRouterProvider.otherwise('tabBar/news/headline');


    }]);
