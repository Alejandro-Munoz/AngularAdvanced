/**
 * Created by Alejandro on 10/28/2015.
 */

angular.module('myApp',['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/task1");
    //
    // Now set up the states
    $stateProvider
        .state('task1', {
            url: "/task1",
            templateUrl: "partials/_task1.html",
            controller:function($scope) {
                $scope.message = 'text from scope',
                $scope.changeMessage = function(){
                    var div = angular.element(document.querySelector('#mydiv'));
                    div.scope().message = 'text changed';
                }
            }
        })
        .state('task2', {
            url: "/task2",
            templateUrl: "partials/_task2.html",
            controller:function($scope){
                $scope.format = 'M/d/yy h:mm:ss a';
                $scope.destroy = function(){
                    angular.element(document.querySelector('#mydiv')).remove();
                    console.log('$destroy has been applied');
                }
            }

        })
        .state('task3', {
            url: "/task3",
            templateUrl: "partials/_task3.html",
            controller:function($scope){
                function square(n){
                    return n*n;
                }
                function multiplyByTwo(n){
                    return n*2;
                }
                $scope.initialValue=5;
                $scope.result=0;
                $scope.giveResult=function(fn,value){
                    $scope.result = (fn||angular.identity)(value);
                }
            }
        })
        .state('task4', {
            url: "/task4",
            templateUrl: "partials/_task4.html"
        })
        .state('task5', {
            url: "/task5",
            templateUrl: "partials/_task5.html"
        })
        .state('task6', {
            url: "/task6",
            templateUrl: "partials/_task6.html"
        });
}).directive('myCurrentTime', function($interval, dateFilter) {

        function link(scope, element, attrs) {

            var format,timeoutId;

            function updateTime() {
                element.text(dateFilter(new Date(), format));
            }

            scope.$watch(attrs.myCurrentTime, function(value) {
                format = value;
                updateTime();
            });

            element.on('$destroy', function() {
                $interval.cancel(timeoutId);
                console.log('element has been destroy');
            });

            // start the UI update process; save the timeoutId for canceling
            timeoutId = $interval(function() {
                updateTime(); // update DOM
            }, 1000);
        }

        return {
            link: link
        };
    });
