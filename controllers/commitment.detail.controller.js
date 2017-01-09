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
                   alert(JSON.stringify($scope.commitment))
                });
            }            
        }

        $scope.formatDateTime = function(dt){ 
           dt = new Date(dt);
           return $filter('date')(dt,"dd/MM/yyyy HH:mm");
        }

        $scope.verify = function(){
            $scope.canSave = true;

            if(!$scope.isSet($scope.title)){
                $scope.danger_field = "título"
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.isSet($scope.begin_date)){
                $scope.danger_field = "data início"
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.isSet($scope.begin_time)){
                $scope.danger_field = "horário início"
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.isSet($scope.end_date)){
                $scope.danger_field = "data final"
                $scope.show_alert = true;
                $scope.canSave = false;
            }else if(!$scope.isSet($scope.end_time)){
                $scope.danger_field = "horário final"
                $scope.show_alert = true;
                $scope.canSave = false;
            }           

            if($scope.canSave == true){
                $scope.save();
            }
        }

        $scope.save = function(){
           
            $scope.list = {
                            title : $scope.title,
                            begin_date : $scope.setDateTime($scope.begin_date, $scope.begin_time),
                            end_date : $scope.setDateTime($scope.end_date, $scope.end_time),
                            detail : $scope.detail
                          }

            $scope.service.save($scope.list, function (result){                    
                   alert(JSON.stringify(result.msg));
                   window.location ="/";
            });
                         
        }

        $scope.setDateTime = function(date, time){        
           var hour = time.getHours();
           var min = time.getMinutes();
           if(hour == '0'){
            hour = '00';
           }
           return date + " "+ hour+ ":" + min;
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