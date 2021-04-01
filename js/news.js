/**
 * Created by qingyun on 16/10/9.
 */

angular.module('myApp.news', ['ngAnimate'])
    .controller('newsController', ['$scope', '$state',function ($scope,$state) {

        $scope.mine = {
            goTo:  goTo,
        };

        function goTo(e) {
            // console.log(e,e.target.innerHTML,e.currentTarget);
            for(var i = 0; i <  e.currentTarget.children.length; i++){
                e.currentTarget.children[i].className = 'tab-item';
                // console.log( e.currentTarget.children[i]);
            }

            switch (e.target.innerHTML) {
                case '头条':
                    $state.go('tabState.newsState.headlineState');
                    e.target.className += ' active';
                    return;
                case '精选':
                    $state.go('tabState.newsState.choiceState');
                    e.target.className += ' active';
                    return;
                case '娱乐':
                    $state.go('tabState.newsState.funState');
                    e.target.className += ' active';
                    return;
                case '体育':
                    $state.go('tabState.newsState.sportState');
                    e.target.className += ' active';
                    return;
                case '汽车':
                    $state.go('tabState.newsState.carState');
                    e.target.className += ' active';
                    return;
                case '平顶山':
                    $state.go('tabState.newsState.pdsState');
                    e.target.className += ' active';
                    return;
                case '漫画':
                    $state.go('tabState.newsState.cartoonState');
                    e.target.className += ' active';
                    return;
                case '视频':
                    $state.go('tabState.newsState.videoState');
                    e.target.className += ' active';
                    return;
                default :
                    return
            }
        }

    }]);

