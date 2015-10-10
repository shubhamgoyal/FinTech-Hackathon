/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Conversation controller
(function(){    
    'use strict';
    var app= angular.module('myApp');

    conversationCtrl.$inject = ['$scope', '$route', '$location', '$routeParams', 'InboxManager', 'ENV', '$anchorScroll', 'gconv'];

    app.controller('conversationCtrl', conversationCtrl);
    
    function conversationCtrl ($scope, $route, $location, $routeParams, InboxManager, ENV, $anchorScroll, gconv) {
        
$scope.AWS_URL = ENV.aws_url;
    $scope.my_info = null;
    $scope.conversation_info = null;
    $scope.conversation = [];
    $scope.conversation_id = $routeParams.cid;
    $scope.job_id = $routeParams.jid;


    $scope.my_info = gconv.my_info;
                $scope.conversation_info = gconv.conversation;
                $scope.conversation = gconv.messages;
                InboxManager.resetConversationNotify($scope.conversation_id);
                setTimeout(function(){ 
                            $location.hash('message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));
                            console.log('Hash set MAIN to: ' + 'message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));
                            $anchorScroll(); 
                            //JMR, yes I know realize accessing controls in views directy is bad, must find another way
                            document.getElementById("reply1").focus();
                            }, 300); 

    $scope.sendReply = function (reply) {
        if (reply !== undefined && reply !== '') {
        InboxManager.postReply($scope.conversation_id, reply, $scope.job_id)
          .then(function(data) {
                    //JMR $location.path('/inbox');
                    $scope.refresh();
                },
                function(data, status) {
                    console.error('conversationCtrl: Error posting replay: ' + status);
                });
        }
    };

    $scope.goToInbox = function () {
        $location.path('/inbox');
    };

    $scope.refresh = function() {
        //$route.reload();
        InboxManager.getConversation($scope.conversation_id)
                          .then(function(data) {
                                    //$scope.my_info = data.my_info;
                                    //$scope.conversation_info = data.conversation;
                                    $scope.conversation = data.messages;
                                    
                                   //Scroll to last item
                                    $location.hash('message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));
                                    console.log('Hash set to: ' + 'message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));
                                
                                    $anchorScroll();
                                     document.getElementById("reply1").focus();
                                   // InboxManager.resetConversationNotify($scope.conversation_id);
console.log('REFRESHED');
                                    //console.log("Length: "+ $scope.conversation.length);
                                    //console.info($scope.conversation);
                                },
                                function(data, status) {
                                    console.error('conversationCtrl: Error loading conversation: ' + status);
                                });
                                
    }

    }
}());
// END Luigi Private messaging -----
//Luigi Private Messaging ---------
(function(){    
    'use strict';
    var app= angular.module('myApp');

    InboxManager.$inject = ['$q', '$http', '$cookieStore', 'ENV'];

    app.factory('InboxManager', InboxManager);
    
    function InboxManager ($q, $http, $cookieStore, ENV) {
        return {
          getMessages: function () {
            var deferred = $q.defer();
            var token = $cookieStore.get("employer_token");
            console.log(ENV.rest_server+'messages?token='+token);
            $http.get(ENV.rest_server+'messages?token='+token)
                .success(function(data) {
                    deferred.resolve(data);
                 }).error(function(data, status) {
                    deferred.reject(data, status);
                });
            return deferred.promise;
          },
          getConversation: function (conversation_id) {
            var deferred = $q.defer();
            var token = $cookieStore.get("employer_token");
            console.log(ENV.rest_server+'messages/conversation/'+conversation_id+'?token='+token);
            $http.get(ENV.rest_server+'messages/conversation/'+conversation_id+'?token='+token)
                .success(function(data) {
                    deferred.resolve(data);
                 }).error(function(data, status) {
                    deferred.reject(data, status);
                });
            return deferred.promise;
          },
          postReply: function (conversation_id, reply, job_id) {
            var deferred = $q.defer();
            var token = $cookieStore.get("employer_token");
            console.log(ENV.rest_server+'messages/reply/'+conversation_id+'?token='+token);
            $http.post(ENV.rest_server+'messages/reply/'+conversation_id+'?token='+token, { "reply": reply, "job_id": job_id })
                .success(function(data) {
                    deferred.resolve(data);
                 }).error(function(data, status) {
                    deferred.reject(data, status);
                });
            return deferred.promise;
          },
          getConversationId: function(job_id, candidate_id) {
            var deferred = $q.defer();
            var token = $cookieStore.get("employer_token");
            console.log(ENV.rest_server+'messages/init?token='+token);
            $http.post(ENV.rest_server+'messages/init?token='+token, { "job_id": job_id, "candidate_id": candidate_id })
                .success(function(data) {
                    deferred.resolve(data);
                 }).error(function(data, status) {
                    deferred.reject(data, status);
                });
            return deferred.promise;
          },
          resetConversationNotify: function(conversation_id) {
            var deferred = $q.defer();
            var token = $cookieStore.get("employer_token");
            console.log(ENV.rest_server+'messages/reset/'+conversation_id+'?token='+token);
            $http.get(ENV.rest_server+'messages/reset/'+conversation_id+'?token='+token)
                .success(function(data) {
                    deferred.resolve(data);
                 }).error(function(data, status) {
                    deferred.reject(data, status);
                });
            return deferred.promise;
          },
          getNotifications: function() {
            var deferred = $q.defer();
            var token = $cookieStore.get("employer_token");
            console.log(ENV.rest_server+'messages/notifications?token='+token);
            if(token==undefined){
                return false;
            }
            $http.get(ENV.rest_server+'messages/notifications?token='+token)
                .success(function(data) {
                    deferred.resolve(data);
                 }).error(function(data, status) {
                    deferred.reject(data, status);
                });
            return deferred.promise;
          }
        };
    }
}());


// Luigi Private Messaging Inbox controller
(function(){    
    'use strict';
    var app= angular.module('myApp');

    inboxCtrl.$inject = ['$scope', '$route', '$location', 'InboxManager'];

    app.controller('inboxCtrl', inboxCtrl);
    
    function inboxCtrl ($scope, $route, $location, InboxManager) {


        $scope.search = '';
        $scope.messages = [];

        InboxManager.getMessages()
          .then(function(data) {
                    $scope.messages = data;
                },
                function(data, status) {
                    console.error('inboxCtrl: Error loading messages: ' + status);
                });

        $scope.goToConversation = function (conversation_id) {
            $location.path('/inbox/conversation/' + conversation_id);
        };

        $scope.refresh = function() {
            $route.reload();
        }

    }
}());
