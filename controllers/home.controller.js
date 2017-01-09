(function () {
    'use strict';
    angular.module('app')
        .controller('homeCtrl', ['$scope', '$http', '$filter','$rootScope','MockService', homeCtrl])
      

    function homeCtrl($scope, $http, $filter, $rootScope, MockService) {

        $scope.service = new MockService($scope);

        $scope.service.getAll(function (result){ console.log(JSON.stringify(result));
            $scope.commitmentList = result;
            $scope.list_length = $scope.commitmentList.length;
            for(var i = 0; i < $scope.list_length; i++){
              $scope.commitmentList[i].begin_date = $scope.formatDateTime($scope.commitmentList[i].begin_date);
              $scope.commitmentList[i].end_date = $scope.formatDateTime($scope.commitmentList[i].end_date);
            }

            $scope.count_commitment = $scope.list_length;

        });

        $scope.formatDateTime = function(dt){ 
           dt = new Date(dt);
           return $filter('date')(dt,"dd/MM/yyyy HH:mm");
        }

        $scope.selectAll = function(){
            if ($scope.isSelected) {
                var status = false;    
            }else{
                var status = true;
            }
            for(var i=0; i < $scope.filteredStores.length; i++){
                var store =  $scope.commitmentList[i];
                store.isSelected = status;
                if (store.isSelected) {
                    $scope.selectedItens.push(store);
                }else{
                    removeItemFromList($scope.selectedItens,store);
                }
            }
            $scope.isSelected = status;
        }

        $scope.goToDetail = function(id){
            if(id != undefined)
                window.location.href ="#/commitment_detail/"+id
            else
                window.location ="#/commitment_detail"
        }
      

        
    }
})(); 