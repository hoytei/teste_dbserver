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
            $scope.setDateTime();

            $scope.list = {
                            title : $scope.title,
                            begin_date : $scope.begin_date,
                            end_date : $scope.begin_time, 
                            detail : $scope.detail
                          }
        }

        $scope.setDateTime = function(){
           alert($scope.begin_date) 
            alert($scope.begin_time)

            alert($scope.end_date)
            alert($scope.end_time)

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