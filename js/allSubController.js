/**
 * Created by qingyun on 16/11/2.
 */

/**
 * Created by qingyun on 16/11/2.
 */

angular.module('app.allSubController', [])
    .constant('mySubs', [])
    .controller('allSubController', ['$scope','liveUrlArr','$state','myFactory','mySubs','$timeout', '$location',function ($scope,liveUrlArr,$state,myFactory,mySubs,$timeout,$location) {

        $scope.mine = {
            sublives: [],
            subs: [],
            isFirst: true,
            changeSubs: function (collectionId) {
                var requestUrl = 'http://data.live.126.net/livechannel/sub/'+ collectionId +'.json';
                myFactory.ajaxData(requestUrl, '订阅');
            },
            isAdd: true,
            goToSubDetail: function (ename) {
                $location.path('/tabBar/subDetail/'+ ename)
            }
        };

        // console.warn(mySubs)
        $scope.mine.addSubs = function (e,item) {
            e.stopPropagation();
            // console.log(e.target,item);
            //设置样式
            var className = e.target.className;
            if( /ion-plus-circled/.test(className) ){  // 如果按钮处于可添加状态
                e.target.className = 'button ion-minus-circled button-stable';
                if(mySubs.length != 0){
                    for(var i = 0 ; i < mySubs.length ; i++){
                        if(mySubs[i].tname == item.tname){return}  //存在就返回
                    }
                    mySubs.push( item );
                }else { mySubs.push( item );}
                console.log(mySubs)
            }else {
                e.target.className = 'button ion-plus-circled button-assertive';
                if(mySubs.length != 0){
                    for(var i = 0 ; i < mySubs.length ; i++){
                        if(mySubs[i].tname == item.tname){ mySubs.splice(i,1);}  //存在就删除
                    }
                }else { mySubs.pop( item );}
                console.log(mySubs)
            }
            //传播事件

        };

        var requestUrl = 'http://data.live.126.net/livechannel/sub/1.json';
        //请求数据
        requestUrl && myFactory.ajaxData(requestUrl, '订阅');


        //接收数据成功
        $scope.$on('success', function (e,msg) {
            if(msg[0] == '订阅') {
                var msg = msg[1];
                // console.log(msg.data);
                if($scope.mine.isFirst){
                    $scope.mine.subs = msg.data.subs;
                    $scope.mine.isFirst = false;
                }
                $scope.mine.sublives = msg.data.sublives;

                $scope.mine.subScrollStyle =  {
                    height: ($scope.mine.sublives.length ) * 70 + 'px',
                    background: 'pink'
                };


                //防止页面未加载完毕，加上一个时间等待
                $timeout(function () {
                    //取页面上所有添加按钮
                    var buttonArr = document.querySelectorAll('.sublives-button');
                    buttonArr.forEach(function (ele,index) {
                        // console.log(ele.getAttribute('name'))
                        if(mySubs.length != 0){
                            for(var i = 0 ; i < mySubs.length ; i++){
                                if(mySubs[i].tname ==  ele.getAttribute('name')){
                                    ele.className = 'button ion-minus-circled button-stable';
                                }  //存在就删除
                            }
                        }
                    });
                });

            }

        });


    }]);