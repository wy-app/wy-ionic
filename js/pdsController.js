
angular.module('myApp.pdsController', [])
    .controller('pdsController', ['$scope', '$http', '$location', 'IPAndPort','$state',function ($scope, $http, $location,IPAndPort,$state) {

        $scope.mine = {
            newsList: [],
            imgArr: [],
            imgObj: null,
            goToDetailView:   function goToDetailView(postid, skipID, specialID,photosetID) {
                console.log( [postid, skipID, specialID ]);
                if(typeof specialID != 'undefined'){   //注意：必须检测类型，不能检测值
                    $location.path('/special/'+ specialID);  //跳转到专题页面
                }else{
                    $state.go('headlineState-detailState',{  //直接跳转到详情页
                        'postid': postid,
                        'skipID': skipID,
                        'photosetID': photosetID
                    });
                }
            }
        };



        //首页数据请求
        (function () {

              var wyUrl = 'http://c.3g.163.com/nc/article/local/5bmz6aG25bGx/0-20.html';
              var randomNum = Math.floor( Math.random()*11 );
              $http({
                  method: 'jsonp',
                  url: 'http://'+ IPAndPort.IP +':'+ IPAndPort.port +'?randomNum='+ randomNum + '&myUrl=' + wyUrl + '&callback=JSON_CALLBACK'

              }).then(function success(result){
                      console.log(result.data);
                  result = result.data.平顶山;

                  $scope.mine.newsList = result;
                  // //
                  console.log([ $scope.mine.imgObj , $scope.mine.newsList ])

                  }, function error(e){
                      console.log(e.message);
                  });
          })();


}]);
