/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){    
    'use strict';
    var app = angular.module('myApp');
    notifications.$inject = ['$rootScope', 'InboxManager', 'mySession', 'mySearchFields'];
    app.run(notifications);
    function notifications ($rootScope, InboxManager, mySession, mySearchFields) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if (mySession.loggedIn()){
            // Inbox notifications
            InboxManager.getNotifications()
              .then(function(data) {
                        $rootScope.$broadcast('newNotifications', data);
                    },
                    function(data, status) {
                        console.error('Error loading notifications: ' + status);
                    });
        };
    });
    }
}());


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
            console.info(data);
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

(function(){    
    'use strict';
    var app= angular.module('myApp');

    conversationCtrl.$inject = ['$scope','$route', '$location', '$routeParams', 'InboxManager', 'ENV', 'mySession', '$anchorScroll', 'gconv'];

    app.controller('conversationCtrl', conversationCtrl);
    
    function conversationCtrl ($scope, $route, $location, $routeParams, InboxManager, ENV, mySession, $anchorScroll, gconv) {

    $scope.AWS_URL = ENV.aws_url;
        $scope.my_info = null;
        $scope.conversation_info = null;
        $scope.conversation = [];
        $scope.conversation_id = $routeParams.cid;
        $scope.job_id = $routeParams.jid;
        //console.log('Struc of resolve promise getConversation: ');
        //console.info(gconv);
                    $scope.my_info = gconv.my_info;
                    $scope.conversation_info = gconv.conversation;
                    $scope.conversation = gconv.messages;
                    InboxManager.resetConversationNotify($scope.conversation_id);
                    setTimeout(function(){ 
                                $location.hash('message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));
                                //console.log('Hash set MAIN to: ' + 'message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));
                                console.log("In conv ctrl, hashing");
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

							$scope.conversation = data.messages;

						   //Scroll to last item
							$location.hash('message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));
							console.log('Hash set to: ' + 'message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));

							$anchorScroll();
							document.getElementById("reply1").focus();

						},
						function(data, status) {
							console.error('conversationCtrl: Error loading conversation: ' + status);
						});


        }
    }
}());
