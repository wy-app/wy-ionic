/**
 * Created by qingyun on 16/11/1.
 */


angular.module('myApp.tabController', [])
    .controller('tabController', function ($scope,$location,$timeout,$ionicSideMenuDelegate,$ionicModal,$ionicPopup) {



        $scope.mine = {
            userArr: [],
            number:0,
            saveInfo: saveInfo,
            Login: Login
        };
        $scope.toggleLeftSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        //注册
        $ionicModal.fromTemplateUrl('register.html', {
            scope: $scope
        }).then(function(register) {
            $scope.register = register;
        });
        $scope.showRegisterModel = function() {
            $scope.register.show();
        };
        $scope.cancelRegisterModel = function() {
            $scope.register.hide();
        };
        function saveInfo() {
            var name = document.getElementById('Rname').value;
            var pwd = document.querySelector('#Rpwd').value;
            if(name =='' || pwd == ''){
                alert('请输入完整信息！！！');
                return;
            }
            var obj = {name: name, pwd: pwd};
            var str = JSON.stringify(obj);
            // $scope.mine.userArr.push(obj);
            localStorage.pagecount ? (localStorage.pagecount = Number(localStorage.pagecount) +1) : localStorage.pagecount = 1;
            localStorage.setItem("user"+ parseInt(localStorage.pagecount),str);
            $scope.showAlert('注册成功！！！');
            // console.info($scope.mine.userArr)
            document.getElementById('Rname').value = '';
            document.querySelector('#Rpwd').value = '';
            // $scope.register.hide();
        }

        //登陆
        $ionicModal.fromTemplateUrl('login.html', {
            scope: $scope
        }).then(function(login) {
            $scope.login = login;
        });
        $scope.showLoginModel = function() {
            $scope.login.show();
        };
        $scope.cancelLoginModel = function() {
            $scope.login.hide();
        };
        function  Login() {
            var length = localStorage.length;
            var key = '';
            for(var i = 0; i < length; i++){
                var str = localStorage.getItem('user'+ (i + 1));
                obj = JSON.parse(str);
                var name = document.getElementById('Lname').value;
                var pwd = document.querySelector('#Lpwd').value ;
                if( obj && (obj.name == name) && (obj.pwd == pwd)){
                    key = true;
                    break;
                }else {
                    key = false;
                }
            }
            if(key){
                $scope.showAlert('登陆成功');
                document.querySelector('#userHead').src = 'img/fyz.png';
                document.getElementById('Lname').value = '';
                document.querySelector('#Lpwd').value = '';
            }else {
                $scope.showAlert('用户名或密码错误');
            }

        }


        //弹出窗口
        $scope.showAlert = function (str) {
            var alertPopup = $ionicPopup.alert({
                title: '',
                template: str
            });
            alertPopup.then(function (res) {
                if(res){
                    alertPopup.close();
                    $scope.register.hide();

                }
            });
            $timeout(function() {

                if(str == '登陆成功'){
                    $scope.login.hide();
                }
            }, 2000);
        }

    });