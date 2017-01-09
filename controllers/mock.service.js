(function () {
    'use strict';
    angular.module('app')
        .factory('MockService', ['$http', function ($http) {
        
            function MockService($scope) {
                this.http = $http;
                this.scope = $scope;
            }      

            MockService.prototype.getAll = function (callback){
                var url = "http://demo0741009.mockable.io/get_list";            
                $http.get(url,{cache: false}).success(function(response) {
                    callback(response);
                });
            };

            MockService.prototype.getById = function (id, callback) {           
                var url = "http://demo0741009.mockable.io/get_list?id="+id;         
                $http.get(url,{cache: false}).success(function(response) {
                    callback(response);
                });
            };

            MockService.prototype.save = function (json, callback) {
                var url = "http://demo0741009.mockable.io/save";            
                var contentType = {'Content-Type': 'application/json'};
                $http.post(url, json,{cache: false}).then(function(response) {
                    callback(response);
                });

               // $http.post(contentType, this.scope, this.http, url, json, callBack);  
            };

            MockService.prototype.deleteItens = function (pmItem, callBack){               
               var url = "http://demo0741009.mockable.io/get_list";            
                $http.get(url,{cache: false}).success(function(response) {
                    callback(response);
                });                                
            };               
            
            return MockService;
        }])

}) (); 


