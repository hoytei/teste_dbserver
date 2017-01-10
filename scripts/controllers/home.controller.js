(function () {
    'use strict';
    angular.module('app')
        .controller('homeCtrl', ['$scope', '$http', '$filter','$rootScope','MockService','$uibModal', '$location', homeCtrl])
        .controller('ModalInstanceCtrl', ['$scope', '$rootScope', ModalInstanceCtrl])

    function homeCtrl($scope, $http, $filter, $rootScope, MockService, $uibModal, $location) {

        $scope.service = new MockService($scope);
        $scope.commitmentList = [];
        
        $scope.init = function(){
            $scope.service.getAll(function (result){ 
                for(var i = 0; i < result.length; i++){ 
                    if(result[i].status == "active"){
                        $scope.commitmentList.push(result[i]);                    
                    }
                }

                $scope.list_length = $scope.commitmentList.length;
                for(var i = 0; i < $scope.list_length; i++){
                  $scope.commitmentList[i].begin_date = $scope.formatDateTime($scope.commitmentList[i].begin_date);
                  $scope.commitmentList[i].end_date = $scope.formatDateTime($scope.commitmentList[i].end_date);
                }

                $scope.count_commitment = $scope.list_length;

            });

        }
       

        $scope.formatDateTime = function(dt){ 
           dt = new Date(dt);
           return $filter('date')(dt,"dd/MM/yyyy HH:mm");
        }

      

        $scope.goToDetail = function(id){

            if(id != undefined)
                window.location ="#/commitment_detail/"+id
            else
                window.location ="#/commitment_detail"

        }
       

        $scope.openModal = function (item) {
            event.cancelBubble = true;
            if(event.stopPropagation) event.stopPropagation();
            
            $rootScope.modalInstance = $uibModal.open({
              templateUrl: 'views/cancel_modal.html',
              controller: ModalInstanceCtrl,
              resolve: {
               
              }
            });

            $rootScope.modalInstance.result.then(function (result) {
                item.status = 'inactive'; alert(JSON.stringify(item))
               $scope.service.save($scope.list, function (result){                    
                    if(result.data.msg == "success")   
                        $scope.init();               
                });
            });
          
        };

        $scope.init();
        
    };

    function ModalInstanceCtrl($scope, $rootScope) {

          $scope.ok = function () {
            $rootScope.modalInstance.close(true);
          };

          $scope.cancel = function () {
            $rootScope.modalInstance.dismiss('cancel');
          };
    };
})(); 