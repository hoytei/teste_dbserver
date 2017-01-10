(function () {
    'use strict';
    angular.module('app')
        .controller('commitmentDetailCtrl', ['$scope', '$http', '$filter','$rootScope','MockService', '$routeParams',commitmentDetailCtrl])
      

    function commitmentDetailCtrl($scope, $http, $filter, $rootScope, MockService, $routeParams) {

        $scope.service = new MockService($scope);
       
        $scope.init = function(){
            $scope.id = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
            if($scope.id != 'commitment_detail'){
                $scope.service.getById($scope.id, function (result){ 
                    $scope.commitment = result;  
                    for(var i = 0; i < $scope.commitment.length; i++){
                        if($scope.commitment[i].id == $scope.id){
                            $scope.title = $scope.commitment[i].title;
                            $scope.detail = $scope.commitment[i].detail;
                            $scope.begin_date = 
                                    JSON.stringify($scope.formatDateTime($scope.commitment[i].begin_date)).split(" ")[0].replace(/"/, ""); 
                            $scope.begin_time = 
                                    JSON.stringify($scope.formatDateTime($scope.commitment[i].begin_date)).split(" ")[1].replace(/"/, "");
                            $scope.end_date = 
                                    JSON.stringify($scope.formatDateTime($scope.commitment[i].end_date)).split(" ")[0].replace(/"/, "");
                            $scope.end_time = 
                                    JSON.stringify($scope.formatDateTime($scope.commitment[i].end_date)).split(" ")[1].replace(/"/, "");
                        }
                    }                 
                });
            }            
        }

        $scope.formatDateTime = function(dt){ 
           dt = new Date(dt);
           return $filter('date')(dt,"dd/MM/yyyy HH:mm");
        }

        $scope.verify = function(){
            $scope.canSave = true;
            $scope.title_error = false;
            $scope.begin_date_error = false;
            $scope.begin_time_error = false;
            $scope.end_date_error = false;
            $scope.end_time_error = false;

            if(!$scope.isSet($scope.title)){
                $scope.danger_field = "O campo título é obrigatório"
                $scope.title_error = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.isSet($scope.begin_date)){
                $scope.danger_field = "O campo data de início é obrigatório"
                $scope.begin_date_error = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.isSet($scope.begin_time)){
                $scope.danger_field = "O campo horário de início é obrigatório"
                $scope.begin_time_error = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.verifyIfTimeIsCorrect($scope.begin_time)){
                $scope.show_alert = true;
                $scope.danger_field = "Horário incorreto"
                $scope.canSave = false;
                $scope.begin_time_error = true;
            }else if(!$scope.isSet($scope.end_date)){
                $scope.danger_field = "O campo data de término é obrigatório"
                $scope.end_date_error = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.isSet($scope.end_time)){
                $scope.danger_field = "O campo horário de término é obrigatório"
                $scope.end_time_error = true;
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.verifyIfTimeIsCorrect($scope.end_time)){
                $scope.show_alert = true;
                $scope.danger_field = "Horário incorreto"
                $scope.canSave = false;
                $scope.end_time_error = true;
            }
            
            if($scope.canSave == true){
                $scope.save();
            }
        }

        $scope.verifyIfTimeIsCorrect = function(time){
            var regexp = /([01][0-9]|[02][0-3]):[0-5][0-9]/;
            return regexp.test(time)

        }

        $scope.save = function(){
           
            $scope.list = {
                            title : $scope.title,
                            begin_date : $scope.setDbDateTime($scope.begin_date, $scope.begin_time),
                            end_date : $scope.setDbDateTime($scope.end_date, $scope.end_time),
                            detail : $scope.detail
                          }
            if($scope.id != 'commitment_detail'){
                $scope.list.id = $scope.id;
            }
           
            $scope.service.save($scope.list, function (result){                    
                    if(result.data.msg == "success")
                        window.location ="/";
            });
                         
        }

        $scope.setDbDateTime = function(date, time){
           date = date.split("/");           
           var dt = new Date(date[2], date[1]-1, date[0]); 
           return $filter('date')(dt, "yyyy-MM-dd") + " "+ time;
        }
        
        $scope.goToHome = function(){ 
            window.location ="/"
        }

        $scope.isSet = function(variable){
            if(variable == undefined || variable == '' || variable == null)
                return false
            else
                return true
        }

        $scope.init();
      

        
    }
})(); 