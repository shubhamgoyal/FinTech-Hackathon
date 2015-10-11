/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){    
    'use strict';
    var app= angular.module('myApp');

    configuration.$inject = ['$routeProvider','$httpProvider' ,'ENV','$locationProvider', '$mdThemingProvider'];
    gconv.$inject = ['$route','InboxManager'];

    app.config(configuration);
    
    function gconv($route, InboxManager){
        return InboxManager.getConversation($route.current.params.cid);
    }
    function configuration ($routeProvider, $httpProvider, ENV,$locationProvider, $mdThemingProvider) {

        // Customize theme
            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('blue-grey');

        $routeProvider.
                    when("/dashboard", {templateUrl: ENV.base_url+"assets/zpartials/emplr-main.html", controller: "EmployerDashMainCtrl"}).
            when("/inbox", {templateUrl: ENV.base_url+"assets/zpartials/inbox.html", controller: "inboxCtrl"}).
            when("/inbox/conversation/:cid/:jid?", {templateUrl: ENV.base_url+"assets/zpartials/conversation.html", controller: "conversationCtrl", "resolve": {
                "gconv": gconv}}).
            when("/jobs", {templateUrl: ENV.base_url+"assets/zpartials/emplr-jobs.html", controller: "EmployerDashMainCtrl"}).
            when("/jobcreate", {templateUrl: ENV.base_url+"assets/zpartials/emplr-job-create.html", controller: "EmployerDashCreateJobCtrl"}).
            when("/applications/jobid/:jobid/jobtitle/:jobtitle", {templateUrl: ENV.base_url+"assets/zpartials/emplr-job-applications.html", controller: "candApplicationCtrl"}).
            when("/applications/jobid/:jobid", {templateUrl: ENV.base_url+"assets/zpartials/emplr-job-applications.html", controller: "candApplicationCtrl"}).
            when("/job/jobid/:jobid", {templateUrl: ENV.base_url+"assets/zpartials/emplr-job-details.html", controller: "jobDetailsCtrl"}).
            when("/jobedit/jobid/:jobid", {templateUrl: ENV.base_url+"assets/zpartials/emplr-job-edit.html", controller: "jobDetailsCtrl"}).
            when("/profile", {templateUrl: ENV.base_url+"assets/zpartials/emplr-profile.html", controller: "EmployerProfileCrtl"}).
            when("/profileedit", {templateUrl: ENV.base_url+"assets/zpartials/emplr-profile-edit.html", controller: "EmployerProfileCrtl"}).
            when("/adv", {templateUrl: ENV.base_url+"assets/zpartials/emplr-srch-adv.html", controller: "jobsCrtl"}).
            when("/building", {templateUrl: ENV.base_url+"assets/zpartials/srch-building.html", controller: "employersCrtl"}).
            when("/employers", {templateUrl: ENV.base_url+"assets/zpartials/srch-emplr.html", controller: "employersCrtl"}).
            when("/media", {templateUrl: ENV.base_url+"assets/zpartials/media.html", controller: "employersCrtl"}).
            when("/home", {templateUrl: ENV.base_url+"assets/zpartials/emplr-home.html", controller: "jobsCrtl"}).
            when("/firetapa", {templateUrl: ENV.base_url+"assets/zpartials/empl-firetap-a.html", controller: "jobsCrtl"}).
            when("/firetapf", {templateUrl: ENV.base_url+"assets/zpartials/empl-firetap-f.html", controller: "jobsCrtl"}).
            when("/firetapp", {templateUrl: ENV.base_url+"assets/zpartials/empl-firetap-p.html", controller: "jobsCrtl"}).
            when("/applied", {templateUrl: ENV.base_url+"assets/zpartials/applied.html", controller: "employersCrtl"}).
            when("/forgetpwd", {templateUrl: ENV.base_url+"assets/zpartials/emplr-forgetpwd.html", controller:"ForgetCtrl"}).
            when("/forgetpwd/:resettoken", {templateUrl: ENV.base_url+"assets/zpartials/emplr-forgetpwd.html", controller:"ForgetCtrl"}).
            when("/login", {templateUrl: ENV.base_url+"assets/zpartials/emplr-login.html", controller:"LoginCtrl"}).
            when("/register", {templateUrl: ENV.base_url+"assets/zpartials/emplr-register.html", controller: "RegisterCtrl"}).
            when("/landing", {templateUrl: ENV.base_url+"assets/zpartials/empl-landing-dynamic.html", controller: "employersCrtl"}).
                    when("/landcreate", {templateUrl: ENV.base_url+"assets/zpartials/empl-landing-add.html", controller: "employersCrtl"}).
                    when('/landedit/:landingId', {templateUrl: ENV.base_url+"assets/zpartials/empl-landing-edit.html", controller: 'employersCrtl'}).
                    when("/go/:companyname", {templateUrl: ENV.base_url+"assets/zpartials/empl-landing-public.html", controller: "employerslandingCrtl"}).
                    when("/verifymail/:verificationcode", {templateUrl: ENV.base_url+"assets/zpartials/emplr-email-verify.html", controller:"VerifyCtrl"}).
                    when("/verifyadmail/:verificationcode", {templateUrl: ENV.base_url+"assets/zpartials/emplr-email-verify.html", controller:"VerifyAdminCtrl"}).
            when("/candapplication/candid/:candid/applid/:application_id/shortlisted/:shortlisted", {templateUrl: ENV.base_url+"assets/zpartials/emplr-cand-view.html", controller: "candApplicationCtrl"}).
            when("/stats", {templateUrl: ENV.base_url+"assets/zpartials/emplr-stats.html", controller: "statsCtrl"}).
            when("/admin", {templateUrl: ENV.base_url+"assets/zpartials/admin-panel.html", controller: "AdminCtrl"}).
            when("/adminprofile", {templateUrl: ENV.base_url+"assets/zpartials/admin-profile-edit.html", controller: "AdminProfileCtrl"}).
            when("/adminregister", {templateUrl: ENV.base_url+"assets/zpartials/admin-register.html", controller: "AdminRegisterCtrl"}).
            when("/admin/:emp_id/:url*", {templateUrl: ENV.base_url+"assets/zpartials/emplr-email-verify.html", controller: "AdminCtrl"}).
            //calendar
            when("/calendar", {templateUrl: ENV.base_url+"assets/zpartials/emplr-calendar.html", controller: "CalendarCtrl"}).
            //when("/calendar/create", {templateUrl: ENV.base_url+"assets/zpartials/emplr-create-calendar.html", controller: "CalendarCtrl"}).
            //when("/calendar/edit/:sch_id", {templateUrl: ENV.base_url+"assets/zpartials/emplr-add-timeslot.html", controller: "CalendarCtrl"}).
            otherwise({redirectTo: '/dashboard'});
    //$locationProvider.html5Mode(true);
    }
}());

(function(){    
    'use strict';
    var app= angular.module('myApp');

    calendarconfig.$inject = ['ChartJsProvider'];

    app.config(calendarconfig);
    
    function calendarconfig (ChartJsProvider) {
         //chart configurations
        // Configure all charts
        ChartJsProvider.setOptions({
          colours: ['#FF5252', '#FF8A80'],
          responsive: true,
          animation: true
        });
        // Configure all line charts
        ChartJsProvider.setOptions('Line', {
          datasetFill: true
        });
        ChartJsProvider.setOptions('Bar', {
          //datasetFill: true
          colours: ['rgba(151,187,205,1)'],
        });
    }
}());

(function(){    
    'use strict';
    var app= angular.module('myApp');

    cfpconfig.$inject = ['cfpLoadingBarProvider'];

    app.config(cfpconfig);
    
    function cfpconfig (cfpLoadingBarProvider) {
    //cfpLoadingBarProvider.includeSpinner = false;
    //cfpLoadingBarProvider.includeBar = false;
    }
}());

(function(){    
    'use strict';
    var app= angular.module('myApp');

    flowfactoryconfig.$inject = ['flowFactoryProvider','ENV'];

    app.config(flowfactoryconfig);
    
    function flowfactoryconfig (flowFactoryProvider,ENV) {
            flowFactoryProvider.defaults = {
				target: ENV.base_url+'emplanding/uploader',
                permanentErrors: [404, 500, 501],
                maxChunkRetries: 1,
                chunkRetryInterval: 5000,
                simultaneousUploads: 4,
                singleFile: true
            };
            flowFactoryProvider.on('catchAll', function (event) {
                console.log('catchAll', arguments);
            });
			flowFactoryProvider.on('filesSubmitted', function (event) {
			console.log("prevent default");
            });
            // Can be used with different implementations of Flow.js
            // flowFactoryProvider.factory = fustyFlowFactory;
    }
}());


//lightbox config:
(function(){    
    'use strict';
    var app= angular.module('myApp');

    lightboxconfig.$inject = ['LightboxProvider', 'ENV'];

    app.config(lightboxconfig);
    
    function lightboxconfig (LightboxProvider,ENV) {
    // set a custom template
    LightboxProvider.templateUrl = ENV.base_url+"assets/components/angular-lightbox/lightbox.html";
    }
}());

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//unique check for Company landing page url:
(function(){    
    'use strict';
    var app= angular.module('myApp');

    nameUnique.$inject = ['$timeout', '$resource', 'ENV'];

    app.directive('nameUnique', nameUnique);
    
    function nameUnique ($timeout, $resource, ENV) {

        return {
          restrict: 'A',
          require: 'ngModel',
          link: function(scope, element, attrs, ngModel) {
            var stop_timeout;
            return scope.$watch(function() {
              return ngModel.$modelValue;
            }, function(companypagename) {
              $timeout.cancel(stop_timeout);

              if (companypagename === '') 
                ngModel.$setValidity('unique', true);
              console.log(ENV.rest_server +"employers/EmployerLandingPageList/:companypagename"+"?token=" +scope.token);
              var Model = $resource(ENV.rest_server +"employers/EmployerLandingPageList/:companypagename"+"?token=" +scope.token, {companypagename:"@companypagename"});

              stop_timeout = $timeout(function() {
              Model.query({
                  companypagename: companypagename,
                }, function(models) {
                        console.log(models.length);
                  return ngModel.$setValidity('unique', models.length === 0);
                });
              }, 200);
            });
          }
        };
    }
}());

(function(){    
    'use strict';
    var app= angular.module('myApp');

    app.directive('pwCheck', pwCheck);
    
    function pwCheck () {
        
	return {
		restrict: 'AEC',
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			var firstPassword = '#' + attrs.pwCheck;
			$(elem).add(firstPassword).on('keyup', function () {
				scope.$apply(function () {
					if($(elem).val()!="" && $(firstPassword).val()!=""){
						var v = $(elem).val()===$(firstPassword).val();
						console.log("tell me v: "+v);
						ctrl.$setValidity('pwmatch', v);
					}
				});
			});
		}
	}
    }
}());

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){    
    'use strict';
    var app= angular.module('myApp');

    mySearchFields.$inject = ['$http', 'ENV', '$rootScope'];

    app.service('mySearchFields', mySearchFields);
    
    function mySearchFields ($http, ENV,$rootScope) {

        //this service calls http and retrieves values for search fields
        $rootScope.searchfields = [];
        $rootScope.searchreference = {
            categories:{},
            towns:{},
            types:{}
        };
        $http.get(ENV.rest_server+'searchfields')
            .success(function(data){
            //console.log('getSearchFields -> sending request to server done');
            //console.log("Received search fields data");
            //console.log(data);

            //process data
            $rootScope.searchfields = data;

            for(var key in data){
                //console.log("key is now:"+key);
                var searchfield = data[key]; //data[categories] is an array
                //console.log(searchfield);
                //console.log(searchfield.length);
                for(var i=0;i<searchfield.length;i++){
                    var d = searchfield[i];
                    //console.log(searchfield[i]);
                    $rootScope.searchreference[key][d.id] = d.name;
                }
                //console.log($rootScope.searchreference[key]);
            }

        }).error(function(data, status){
            console.log('getSearchFields -> failed to get response');
            return false;
        });
    }
}());

//Search service, need search data to be persistent between partial loads
(function(){    
    'use strict';
    var app= angular.module('myApp');

    mySearch.$inject = ['$http'];

    app.service('mySearch', mySearch);
    
    function mySearch ($http) {

        this.srch = {keyword:"", currentPage:"1", entryLimit:"5", filteredItems:"", totalItems:"", cat:"",catname:"", type:"", typename:"", town:"",townname:"" };
        //this.srch = {};
        var jobList = [];
        var ss = {};


        //GET keyword
        this.getKeyword = function(){
            //console.log("getKeyword: " + this.srch.keyword);
            return this.srch.keyword;
        };

        //SEARCH
        this.searchJobs = function(isearch) {
              //console.info(this.srch);
              //Construct search query based on model passed in

              this.srch.keywords = isearch.keywords;

              /*
               $http.get('http://jldevphp.cloudaccess.net/' + 'api/jobs/search/'+'keyword/'+isearch.keyword).success(function(data) {
                  //console.log("mySearch->searchJobs: Success searching Jobs from RIGHT drawer returned: ");
                  //console.info(data);
                  jobList = data;
                  console.info(jobList);
                  //srch.currentPage = 1; //current page
                  //this.srch.entryLimit = 5; //max no of items to display in a page
                  //this.srch.filteredItems = this.list.length; //Initially for no filter  
                  //this.srch.totalItems = this.list.length;
              }).error(function(data, status) {
                  console.log("mySearch->searchJobs: Error searching Jobs : "+status);

              }); */
          }; //END searchJobs ***************************

          //CRITERIA search criteria: category, type, town
          //'declare' the scope variables
          this.setCategory = function( category, name) {
              this.srch.cat = category;
              this.srch.catname = name;

          };

           this.setType = function(type, name) {
              this.srch.type = type;
              this.srch.typeName = name;

          };

           this.setTown = function(town, name) {
              this.srch.town = town;
              this.srch.townName = name;
          };
          // End Search criteria

    //RESET criteria
          this.resetSrch = function() {
              console.log("Inside resetSrch");
              this.srch.keyword = '';
              this.srch.currentPage = '';
              this.srch.entryLimit = '';
              this.srch.filteredItems = '';
              this.srch.totalItems = '';
              this.srch.cat = '';
              this.srch.catname = '';
              this.srch.type = '';
              this.srch.typename = '';
              this.srch.town = '';
              this.srch.townname = '';


          };

    }
}());


//Service to maintain global data such as login  ***
(function(){    
    'use strict';
    var app= angular.module('myApp');

    mySession.$inject = ['$cookieStore'];

    app.service('mySession', mySession);
    
    function mySession ($cookieStore) {

        this.name = $cookieStore.get("name");
        this.subname = $cookieStore.get("name"); //""; //used by admin to display currently selected sub acct.
        this.company = $cookieStore.get("employer_token");
        this.loggedIn = function() { 
               return this.hasEmployerToken()||this.hasAdminToken();
               /*var token = $cookieStore.get('admin_token')||$cookieStore.get('employer_token');
                           console.log ('mySession Service START---> ');
                           if (token == undefined || token == '') {
                               // If user is not signed in, enable the sign in link
                   return false;
                           } else {
                               // If user is signed in, enable the signout link
                   return true;
               } */
        };
           this.hasEmployerToken = function() { 
               var token = $cookieStore.get('employer_token');
               if (token == undefined || token == '') return false;
               else return true;
           };
           this.hasAdminToken = function() { 
               var token = $cookieStore.get('admin_token');
               if (token == undefined || token == '') return false;
               else return true;
           };
    }
}());

//for candidate short list
(function(){    
    'use strict';
    var app= angular.module('myApp');

    candShortlist.$inject = ['$http', 'ENV'];

    app.service('candShortlist', candShortlist);
    
    function candShortlist ($http, ENV) {

        //These properties are set when going from the list of applicants for a job to the actual detail of the applicant.
        //storing the data here allows the app to not have to query the DB again for the same info.
        this.invited = '';
        this.invited_date = '';

        //Toggles the candidate between being shortlisted and not for a specific employer
        this.shortlist = function(application, token) { 


            console.info(application.shortlisted);
            // Update this application so it is marked as short listed
           $http({url: ENV.rest_server + 'applications?token=' + token,
               method: 'PUT',
               data: application, //{'application_id':application.application_id},
               headers: {'Content-Type': 'application/json; charset=UTF-8'}
               }).

                //$http.put(ENV.rest_server+'employers?token=' + $scope.token, profile).
            success(function(data, status) {

                    application.shortlisted = data['shortlisted'].toString();
                    //Record the shortlist
                   console.info(data);
                    console.log("Shortlisting successful");
                    //*** would be ideal to invoke the polymer Toast here
                    return true;

                }).error(function(data, status) {
                       // called asynchronously if an error occurs
                       // or server returns response with an error status.
                       console.log("Problem shortlisting: " + status);
                       return false;
                });   
     }

    this.changeStatus = function(appid, candid, token, status, application) { 
        $http({url: ENV.rest_server + 'applications?token=' + token,
            method: 'PUT',
            data: {'application_id':appid, 'cand_id':candid.id,'status':status},
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        }).
        success(function(data, status) {
            application.status = data['status'].toString();
            return true;
        }).error(function(data, status) {
            return false;
    });
     }

        
    }
}());

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){    
    'use strict';
    var app= angular.module('myApp');

    AdminRouteCtrl.$inject = ['$scope', '$http','$timeout', '$location', '$cookieStore', 'ENV', '$routeParams'];

    app.controller('AdminRouteCtrl', AdminRouteCtrl);
    
    function AdminRouteCtrl ($scope, $http, $timeout,$location, $cookieStore, ENV, $routeParams) {

        $scope.token = $cookieStore.get('admin_token');
        if($scope.token==undefined){
            $location.path("/login");
            return false;
        }
        var emp_id = $routeParams.emp_id, job_id=$routeParams.job_id;

    }
}());

// RegisterCtrl ***
(function(){    
    'use strict';
    var app= angular.module('myApp');

    AdminRegisterCtrl.$inject = ['$scope', '$http', '$cookieStore', '$location','ENV', '$mdDialog'];

    app.controller('AdminRegisterCtrl', AdminRegisterCtrl);
    
    function AdminRegisterCtrl ($scope, $http, $cookieStore, $location, ENV, vcRecaptchaService, $mdDialog) {
        
        $scope.token = $cookieStore.get('admin_token');
            if ($scope.token !== undefined) {
                console.log("AdminRegisterCtrl -> Admin already logged in.");
                //window.location.href = ENV.base_url+"employers";
            } else {
                $scope.token = false;
                $scope.showError = false;
            }  //console.log("in here");

        $scope.registerFn = function(user, clickEvent) {
            $(clickEvent.target).button("loading");
            if(!user||!user.email||!user.password){
                $scope.errormsg = "Email or password fields cannot be empty.";
                $scope.showError = true;
                $(clickEvent.target).button("reset");
                return false;
            }
            $http.post(ENV.rest_server+"admin", user).
                success(function(data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    $(clickEvent.target).button("reset");
                    if (status === 201 || status === 200)
                    {
                //alert("You have successfully registered! Please login.")
                
                                       
                          $mdDialog.show(
                                    $mdDialog.alert()
                                      .parent(angular.element(document.body))
                                      .title('Registration')
                                      .content('You have successfully registered, please login. Thank you')
                                      .ariaLabel('Registration')
                                      .ok('OK!')
                                      .targetEvent()
                                  );
                          
                          
                    $location.path("/login");
                    }
                    else
                    {
                    $scope.showError = true;
                    }
                }).error(function(data, status, headers, config) {
                    switch(status){
                        case 409:
                            $scope.errormsg = "Email already exists.";
                        default:
                            $(clickEvent.target).button("reset");
                            $scope.showError = true;
                            break;
                    }
                });
        };
    }
}());

//Employer Profile ****
(function(){    
    'use strict';
    var app= angular.module('myApp');

    AdminProfileCtrl.$inject = ['$scope', '$http', '$timeout', '$location', '$cookieStore', 'ENV', '$mdDialog'];

    app.controller('AdminProfileCtrl', AdminProfileCtrl);
    
    function AdminProfileCtrl ($scope, $http, $timeout,$location, $cookieStore, ENV, $mdDialog) {

        $scope.token = $cookieStore.get('admin_token');
        $scope.profile = {};

        $http.get(ENV.rest_server+'admin?token=' + $scope.token, {ignoreLoadingBar: true}).success(function(data) {
            $scope.profile = data;
            console.log("AdminProfileCtrl returned:");
            console.info(data);
            $scope.showLoading = false;
        });

        $scope.submitEdits = function(profile) {
             $scope.showPwdError=0;
             profile.token = $scope.token;
             //console.log('AdminProfileCrtl: submitting PUT: ');
             //console.info(profile);

             $http({url: ENV.rest_server + 'admin?token=' + $scope.token,
                method: 'PUT',
                data: profile,
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            }).success(function(data, status) {
                //Show msg reset form
                $scope.profileForm.$setPristine();
                $scope.profileFormAcct.$setPristine();
                //console.log('EmployerProfileCrtl-> edited profile successfully:');
                if(data.msg=="passwordupdated"){
                //alert("Password changed");
                
                                       
                          $mdDialog.show(
                                    $mdDialog.alert()
                                      .parent(angular.element(document.body))
                                      .title('Success')
                                      .content('Your password has been chnaged.')
                                      .ariaLabel('Success')
                                      .ok('OK!')
                                      .targetEvent()
                                  );
                          
                          
                }else if(data.msg=="emailupdated"){
                //alert("Email change request is accepted, please check your email inbox for verification email. Also, please logout and log back in.");
                
                                       
                          $mdDialog.show(
                                    $mdDialog.alert()
                                      .parent(angular.element(document.body))
                                      .title('Updated')
                                      .content('Your email change request is accepted, please check your email and follow the verification instructions. Also, please logout.. Thank you')
                                      .ariaLabel('Updated')
                                      .ok('OK!')
                                      .targetEvent()
                                  );
                          
                          
                }else{
                //alert("Records saved!");
                                       
                          $mdDialog.show(
                                    $mdDialog.alert()
                                      .parent(angular.element(document.body))
                                      .title('Saved')
                                      .content('Your records have been saved.')
                                      .ariaLabel('Saved')
                                      .ok('OK!')
                                      .targetEvent()
                                  );
                          
                          
                }
                $location.path('/admin');
                //get server to return data and repopulate
            }).error(function(data, status) {
                if(data.msg=="wrongpassword"){
                    $scope.showPwdError = 1;
                    alert("saving failed due to wrong password");
                }else{
                    //console.log("EmployerProfileCrtl: Error editing profile" + status);
                    //alert("Token expired, login again");
                    $location.path('/login');
                }
            });

        }; // END submitEdits
    
    }
}());


//Admin
(function(){    
    'use strict';
    var app= angular.module('myApp');

    AdminCtrl.$inject = ['$scope', '$http', '$timeout', 'ENV', '$cookieStore', 'mySession', '$location', '$mdDialog','$rootScope', 'InboxManager','$routeParams'];

    app.controller('AdminCtrl', AdminCtrl);
    
    function AdminCtrl ($scope, $http, $timeout, ENV, $cookieStore, mySession, $location, $mdDialog, $rootScope, InboxManager,$routeParams) {

        $scope.companies = [];
        $scope.token = $cookieStore.get("admin_token");
        $scope.errormsg = "";
        $scope.new_company = {adding:false};

        if($scope.token==undefined){
            $location.path("/login");
            return false;
        }


        $scope.getEmployersUnderAdmin = function(){
            $http.post(ENV.rest_server+"admin",{mode:"getemployers",token:$scope.token})
                    .success(function(data, status, headers, config) {
                        $scope.companies = data;
               // console.log("Companies under admin:")
                // console.info($scope.companies);
                        //check if route params
                        console.log($routeParams.emp_id+","+$routeParams.url);
                        if($routeParams.emp_id!=undefined){
                            //login to employer
                            for(key in data){
                                if(data[key].CMP_ID==$routeParams.emp_id){ //company
                                    $scope.changeCompany(data[key]);
                                    $location.path($routeParams.url);
                                    return true;
                                }
                            }
                            $location.path("/admin");
                            return false;
                        }else {
                            $scope.getstats();
                            //update subname
                            if ($cookieStore.get('company')) {

                                //update mySession
                                mySession.company = $cookieStore.get('company');
                                mySession.subname = $cookieStore.get('subname');
                                $scope.$emit('subname_upd', '');
                                console.log("should be updating subname to: "+ mySession.subname);
                            }
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });
        };
        $scope.getEmployersUnderAdmin();

        $scope.isCurrentCompany = function(company){

            return $cookieStore.get("company") == company.CMP_ID;
            //return $scope.currentCompany==i;
        }
        $scope.changeCompany = function(company){
            //$scope.currentCompany = i;
            //set employer token
            //console.log("changing to "+company.CMP_ID+" with token:"+company.CMP_TOKEN);
            $cookieStore.remove('employer_token');
            $cookieStore.put('employer_token', company.CMP_TOKEN);
            $cookieStore.remove('company');
            $cookieStore.put('company', company.CMP_ID);
            $cookieStore.put('subname', company.CMP_NAME);
            mySession.company = company.CMP_ID;
            mySession.subname = company.CMP_NAME;
            //console.log('changed to subname: ' + mySession.subname );
            $scope.$emit('loginout', '');

            //$scope.token = company.CMP_TOKEN;
        }
        $scope.addCompany = function(){

            if($scope.new_company.adding) return false; //do not proceed if already adding

            $scope.new_company.adding = true;
            $scope.errormsg = "";

            if(!$scope.new_company.email||!$scope.new_company.password){
                //error
                $scope.errormsg = "You need to provide company details.";
                $scope.new_company.adding = false;
                return false;
            }
            $http.post(ENV.rest_server+"admin",{mode:"createemployer",token:$scope.token,company:$scope.new_company})
                    .success(function(data, status, headers, config) {
                        $scope.getEmployersUnderAdmin();
                        $scope.new_company.email = '';
                        $scope.new_company.password = '';
                        $scope.new_company.adding = false;
                        $scope.showSimpleDialog("Done!","Your sub account has been created and added to your list. Please remember to update the profile to attract the best possible candidates!");

                    })
                    .error(function(data, status, headers, config) {
                        if(status==409)
                            $scope.errormsg = "Email already exists.";
                        else
                            $scope.errormsg = "Unable to create new company.";
                        $scope.new_company.adding = false;
                    });
        }

        $scope.setNotifications = function(company){
            if(!company.NOTIFICATIONS) company.NOTIFICATIONS = 0;
            $http.post(ENV.rest_server+"admin",{mode:"setnotifications",token: $scope.token, company:company})
                    .success(function(data, status, headers, config) {
                        console.log(data);
                        company.NOTIFICATIONS = data;
                    })
                    .error(function(data, status, headers, config) {
                    });
        }

        $scope.getstats = function(){
            $http.post(ENV.rest_server+"admin",{mode:"getstats",token: $scope.token})
                    .success(function(data, status, headers, config) {
                        $scope.mostvisits = data["mostvisits"];
                        $scope.mostviews = data["mostviews"];
                        $scope.mostfavs = data["mostfavs"];
                        console.log(data);
                    })
                    .error(function(data, status, headers, config) {
    });
        }
        //$scope.getstats();
    }
}());

//verification admin
(function(){    
    'use strict';
    var app= angular.module('myApp');

    VerifyAdminCtrl.$inject = ['$scope', '$http', '$location', 'ENV','$routeParams'];

    app.controller('VerifyAdminCtrl', VerifyAdminCtrl);
    
    function VerifyAdminCtrl ($scope, $http, $location, ENV, $routeParams) {

        $scope.verificationcode = $routeParams.verificationcode;
        console.log($scope.verificationcode);
        $scope.verificationmsg="";
        $http.get(ENV.rest_server+"admin/emailverification/"+ $scope.verificationcode).
            success(function(data, status, headers, config) {
            console.log("VerifyCtrl: AJAX is " + status);
            if (status === 200)
            {
                console.log("VerifyCtrl: response msg " + data.msg);
                if (data.msg == "emailchanged") {
                    if(confirm("Your email is updated, please use your new email to login."))
                    {
                        $scope.verificationcode = '';
                        $location.path("/login");
                    }
                }else if(data.msg == "success"){
                    if(confirm("Your email is verified, please use your email to login."))
                    {
                        $scope.verificationcode = '';
                        $location.path("/login");
                    }
                }else{
                    if(confirm("Sorry, your email is not verified.Please try again"))
                    {
                        $scope.verificationcode = '';
                        $location.path("/login");
                    }
                }
            }
            else
            {
                if(confirm("Something went wrong."))
                {
                    $scope.verificationcode = '';
                    $location.path("/login");
                }
            }
            }).error(function(data, status, headers, config) {
                console.log("Login AJAX Error! " + status);
                $scope.resettoken = '';
            });
    }
}());

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//Employer Profile ****
(function(){    
    'use strict';
    var app= angular.module('myApp');

    EmployerProfileCrtl.$inject = ['$scope', '$http', '$timeout', '$location', '$cookieStore', 'ENV', '$mdDialog'];

    app.controller('EmployerProfileCrtl', EmployerProfileCrtl);
    
    function EmployerProfileCrtl ($scope, $http, $timeout,$location, $cookieStore, ENV, $mdDialog) {

        // Constructor portion
        $scope.token = $cookieStore.get('employer_token');
        $scope.AWS_URL = ENV.aws_url;
        //$scope.showLoading = true;
        $scope.profile ={};
            //$scope.profile.imageurl='';

        $http.get(ENV.rest_server+'employers?token=' + $scope.token).success(function(data) {
            $scope.profile = data;
            console.log("EmployerProfileCtrl returned: ");
            console.info(data);
            $scope.showLoading = false;
        });
        // END Constructor

            //added for file upload--seeyouu
        $scope.uploader = {
          controllerFn: function ($flow, $file, $message) {
            console.log($flow, $file, $message); // Note, you have to JSON.parse message yourself.
            $scope.uploadermessage = angular.fromJson($message);
                    $scope.profile.imageurl = $scope.uploadermessage.success;
          }
        };
         $scope.submitEdits = function(profile) {
             $scope.showPwdError=0;
             //Set the token value
             profile.token = $scope.token;
             //console.log('EmployerProfileCrtl: submitting this PUT: ');
             //console.info(profile);
             //console.log("EmployerProfileCrtl-> This is what is being Updated: "+profile)

             $http({url: ENV.rest_server + 'employers?token=' + $scope.token,
                            method: 'PUT',
                            data: profile,
                            headers: {'Content-Type': 'application/json; charset=UTF-8'}
                            }).
                success(function(data, status) {
                    //Show msg reset form
                    $scope.profileForm.$setPristine();
                    $scope.profileFormAcct.$setPristine();
                    console.log('EmployerProfileCrtl-> edited profile successfully>>:');
                    if(data.msg=="passwordupdated"){
                           // alert("Password changed");
                            
                                $mdDialog.show(
                                    $mdDialog.alert()
                                      .parent(angular.element(document.body))
                                      .title('Updated')
                                      .content('You have successfully changed your password!')
                                      .ariaLabel('Updated')
                                      .ok('OK!')
                                      .targetEvent()
                                  );
    
    
                        }else if(data.msg=="emailupdated"){
                            //alert("Email change request is accepted, please check your email inbox for verification email. Also, please logout and log back in.");
                            
                                $mdDialog.show(
                                    $mdDialog.alert()
                                      .parent(angular.element(document.body))
                                      .title('Updated')
                                      .content('Email change request is accepted, please verify the change by checking the verification email that has been sent. Also, please logout and log back in.')
                                      .ariaLabel('Updated')
                                      .ok('OK!')
                                      .targetEvent()
                                  );

                        }else{
                       // alert("Records saved!");
                          $mdDialog.show(
                                    $mdDialog.alert()
                                      .parent(angular.element(document.body))
                                      .title('Profile')
                                      .content('Records saved!')
                                      .ariaLabel('Saved')
                                      .ok('OK!')
                                      .targetEvent()
                                  ); 

                        }
                        $location.path('/profile');

                    }).error(function(data, status) {
                           // called asynchronously if an error occurs
                           // or server returns response with an error status.
                           if(data.msg=="wrongpassword"){
                                $scope.showPwdError = 1;
                                 alert("saving failed due to wrong password");
                            }else{
                           console.log("EmployerProfileCrtl: Error editing profile" + status);
                       //alert("Token expired, login again");
                       
                          $mdDialog.show(
                                    $mdDialog.alert()
                                      .parent(angular.element(document.body))
                                      .title('Login session')
                                      .content('Your session has expired, please login again. Thank you')
                                      .ariaLabel('Expired')
                                      .ok('OK!')
                                      .targetEvent()
                                  );



                           $location.path('/login');
                       }
                    });
        }; // END submitEdits

            //Allows user to hit a save button next to the profile pic so it's clear to them that a change will happen
            $scope.savePicture= function(profile, $flow){
            console.log("called savePicture()");
                    $scope.submitEdits(profile);
                    $flow.cancel();
            };
            //A cancel button so users can revert back to their old pic if they haven't hit the save button yet
            $scope.cancelPicture = function(flow){
                    flow.cancel();
                    $http.get(ENV.rest_server+'candidates?token=' + $scope.token).success(function(data) {
            $scope.profile = data;
            console.log('Retrieved User profile info: ');
            console.info(data);
                    });
            };
    }
}());

// Email verification controller (for both registration and change email ***
(function(){    
    'use strict';
    var app= angular.module('myApp');

    VerifyCtrl.$inject = ['$scope', '$http', '$location', 'ENV','$routeParams'];

    app.controller('VerifyCtrl', VerifyCtrl);
    
    function VerifyCtrl ($scope, $http, $location, ENV, $routeParams) {

        $scope.verificationcode = $routeParams.verificationcode;//$cookieStore.get('pwdreset_token');
		console.log($scope.verificationcode);
		$scope.verificationmsg="";
        $http.get(ENV.rest_server+"employers/emailverification/"+ $scope.verificationcode).
				success(function(data, status, headers, config) {
					
					console.log("VerifyCtrl: AJAX is " + status);

					if (status === 200)
					{
					   console.log("VerifyCtrl: response msg " + data.msg);
					   if (data.msg == "emailchanged") {
							if(confirm("Your email is updated, please use your new email to login."))
							{	$scope.verificationcode = '';
								$location.path("/login");
							}
					   }else if(data.msg == "success"){
							if(confirm("Your email is verified, please use your email to login."))
							{$scope.verificationcode = '';
								$location.path("/login");
							}
					   }
						else
						{
							if(confirm("Sorry, your email is not verified.Please try again"))
							{$scope.verificationcode = '';
								$location.path("/login");
							}
							
						}
					}
					else
					{
						if(confirm("Something went wrong."))
							{
								$scope.verificationcode = '';
								$location.path("/login");
							}
						

					}
					
					//console.log(headers);
					//console.log(config);
				}).error(function(data, status, headers, config) {

						console.log("Login AJAX Error! " + status);
						$scope.resettoken = '';

				});
    }
}());

// Forget password -- reset password *** password retrieval
(function(){    
    'use strict';
    var app= angular.module('myApp');

    ForgetCtrl.$inject = ['$scope', '$http', '$cookieStore', '$location', 'ENV','$routeParams', '$mdDialog'];

    app.controller('ForgetCtrl', ForgetCtrl);
    
    function ForgetCtrl ($scope, $http, $cookieStore, $location, ENV, $routeParams, $mdDialog) {
        
        $scope.resettoken = $routeParams.resettoken;//$cookieStore.get('pwdreset_token');
		console.log($scope.resettoken);
		$scope.EmailNotExist=false;
		$scope.ResetMailSent=false;

        $scope.forgetFn = function(user, clickEvent)
        {
            console.log("ForgetCtrl: Called loginFn()");
           
            console.log("ForgetCtrl: " + user);
            console.log("ForgetCtrl: " + clickEvent.target);
            $(clickEvent.target).button("loading");
            
            $http.post(ENV.rest_server+"employers/reset", user).
                    success(function(data, status, headers, config) {
                        
                        console.log("ForgetCtrl: AJAX is " + status);

                        if (status === 200)
                        {
                           console.log("ForgetCtrl: response msg " + data.msg);
                           if (data.msg == "emailnotexist") {
                //alert("Your email is not registered, please try again.");
                                                                    $mdDialog.show(
                                                                        $mdDialog.alert()
                                                                          .parent(angular.element(document.body))
                                                                          .title('Registration')
                                                                          .content('Your email did not register, please try again.')
                                                                          .ariaLabel('Registration')
                                                                          .ok('OK!')
                                                                          .targetEvent()
                                                                      );
						   }
							else
							{
								$scope.resettoken = '';
                //alert("A password reset link has sent to your email inbox");
                                                                 $mdDialog.show(
                                                                    $mdDialog.alert()
                                                                      .parent(angular.element(document.body))
                                                                      .title('Reset')
                                                                      .content('A password reset link has been emailed to you.')
                                                                      .ariaLabel('Reset')
                                                                      .ok('OK!')
                                                                      .targetEvent()
                                                                  );
								
							}
                        }
                        else
                        {
                            console.log("something went wrong: " + status);
                            $scope.resettoken = '';

                        }
						setTimeout(function () {
							$(clickEvent.target).button("reset");
						}, 1000)
                        
                        //console.log(headers);
                        //console.log(config);
                    }).error(function(data, status, headers, config) {

                            console.log("Login AJAX Error! " + status);
                            $scope.resettoken = '';

                    });
        };
		
	$scope.changeFn = function(user, clickEvent)
        {
			if($scope.pwdchange.$valid)
			{
				console.log("ForgetCtrl: Called changeFn()");
			   
				console.log("ForgetCtrl: " + user);
				console.log("ForgetCtrl: " + clickEvent.target);
				$(clickEvent.target).button("loading");
				
				//user.token = "";//$scope.resettoken;
				
				$http.post(ENV.rest_server+"employers/changepwd/"+$scope.resettoken, user).
						success(function(data, status, headers, config) {
							
							console.log("ForgetCtrl: AJAX is " + status);

							if (status === 200)
							{
							   console.log("ForgetCtrl: response msg" + data.msg);
							   if (data.msg == "success") {
                  //alert("Your password has been updated, please logout and login using your new password");
                                                                            $mdDialog.show(
                                                                                $mdDialog.alert()
                                                                                  .parent(angular.element(document.body))
                                                                                  .title('Updated')
                                                                                  .content('Your password has been updated, please logout and login using your new password. Thank you.')
                                                                                  .ariaLabel('Updated')
                                                                                  .ok('OK!')
                                                                                  .targetEvent()
                                                                              );
    
								}
								else if(data.msg=="tokenexpired")
								{
                  //alert("Your password reset link is expired, please send a new request");
                                                                            $mdDialog.show(
                                                                                $mdDialog.alert()
                                                                                  .parent(angular.element(document.body))
                                                                                  .title('Expired')
                                                                                  .content('Your password reset link has expired, please make a new request. Thank you.')
                                                                                  .ariaLabel('Expired')
                                                                                  .ok('OK!')
                                                                                  .targetEvent()
                                                                              );
								}else if(data.msg=="wrongemail"){
									alert("Wrong Email entered");
								}
								else if(data.msg=="0"){
									alert("Something went wrong");
								}else{
									alert("updated successfully");
								}
								$scope.changeView("/login");
							}
							else
							{
								console.log("something went wrong: " + status);
								$scope.resettoken = '';

							}
							
							//console.log(headers);
							//console.log(config);
						}).error(function(data, status, headers, config) {

								console.log("Login AJAX Error! " + status);
								$scope.resettoken = '';

						});
			}
        };
    }
}());


// LoginCtrl ***
(function(){    
    'use strict';
    var app= angular.module('myApp');

    LoginCtrl.$inject = ['$scope', '$http', '$cookieStore', '$location', 'ENV' , 'mySession', '$mdDialog'];

    app.controller('LoginCtrl', LoginCtrl);
    
    function LoginCtrl ($scope, $http, $cookieStore, $location, ENV, mySession, $mdDialog) {
        
        $scope.token = $cookieStore.get('admin_token')||$cookieStore.get('employer_token');
        if ($scope.token !== undefined)
        {
            console.log("LoginCtrl: ******* Scope EMployer token = ");
            console.log($scope.token);
            //window.location.href = jlglobals.base_url+"employers/emplr";
            $location.path('/login');
        }
        //console.log("LoginCtrl:  what is this?: " + $location.search().ftl);
        if ($location.search().ftl === "1")
            $scope.showFirstTimeLogin = true;
        else
            $scope.showFirstTimeLogin = false;
        
        // LOGIN fn
        $scope.loginFn = function(user, clickEvent)
        {
            //remove twice, always seems to be floating around.
            $cookieStore.remove('employer_token');
            $cookieStore.remove('employer_token');
            //console.log("LoginCtrl: " + user);
            //console.log("LoginCtrl: " + clickEvent.target);
            $(clickEvent.target).button("loading");
            
           if(!user||!user.email||!user.password){
                $scope.errormsg = "Email or password fields cannot be empty.";
                 $(clickEvent.target).button("reset");
                 $scope.token = false;
                 return false;
            }
            //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post(ENV.rest_server+"employers/auth", user).
                    success(function(data, status, headers, config) {
                        
                        console.log("LoginCtrl: AJAX is " + status);
                        
                        $(clickEvent.target).button("reset");
                        if (status === 200)
                        {
                           console.log("LoginCtrl: storing token in cookie " + data.token);
                           $scope.loginfail = false;
                           if (data.token !== undefined) {
                                $cookieStore.put(data.type+'_token', data.token);
                                //20150205
                                $cookieStore.put('name',data.name);
                                
                                //console.log('This person just logged in: '+data.name);
                                //console.info(data);
                                // Get cookie
                                // how do we decided admin or employer cookie now? 
                                //$scope.token = $cookieStore.get('employer_token');
                                //JMR 20150205
                                mySession.name = $cookieStore.get('name');
                                
                                //Display any system messages waiting for the user
                                if (data.msgs) {
                                    $mdDialog.show(
                                        $mdDialog.alert()
                                          .parent(angular.element(document.body))
                                          .title('Message')
                                          .content(data.msgs)
                                          .ariaLabel('Message')
                                          .ok('Got it!')
                                          .targetEvent()
                                      );
                                }
                          
                                 //broadcast that a user has logged in, so appropriate changes can be made
                                $scope.$emit('loginout', '');
                                
                               //console.log("LoginCtrl: name is now " + mySession.name);
                                $location.path("/dashboard");
                       
                            }
                        }
                        else
                        {
                            if (status == 429) {
                                //alert ("You have exceeded your login attempt limit, please try again in 15 minutes thank you");
                                $mdDialog.show(
                                    $mdDialog.alert()
                                      .parent(angular.element(document.body))
                                      .title('Login attempts exceeded')
                                      .content('You have exceeded your login attempt limit, please try again in 15 minutes. Thank you.')
                                      .ariaLabel('Login attempts exceeded')
                                      .ok('OK!')
                                      .targetEvent()
                                  );
                            }
                            console.log("oooh, something went wrong: " + status);
                            $scope.token = false;

                        }
                        
                        //console.log(headers);
                        //console.log(config);
                    }).error(function(data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            $(clickEvent.target).button("reset");
                            console.log("Login AJAX Error! " + status);
                            $scope.token = false;
                             if (status == 429) {
                                //alert ("You have exceeded your login attempt limit, please try again in 15 minutes thank you");
                                 $mdDialog.show(
                                    $mdDialog.alert()
                                      .parent(angular.element(document.body))
                                      .title('Login attempts exceeded')
                                      .content('You have exceeded your login attempt limit, please try again in 15 minutes. Thank you.')
                                      .ariaLabel('Login attempts exceeded')
                                      .ok('OK!')
                                      .targetEvent()
                                  ); 
                            }

                        });
        };
    }
}());


// ------------General Dashboard functions for employer
(function(){    
    'use strict';
    var app= angular.module('myApp');

    employersCrtl.$inject = ['$scope', '$cookieStore', '$http', '$timeout', '$location', '$routeParams','ENV', 'mySession', 'Lightbox', '$mdSidenav', '$mdDialog', '$rootScope','InboxManager'];

    app.controller('employersCrtl', employersCrtl);
    
    function employersCrtl ($scope, $cookieStore, $http, $timeout,$location, $routeParams, ENV, mySession,Lightbox, $mdSidenav, $mdDialog, $rootScope, InboxManager) {

        //Luigi Private Messaging ---------
        // Inbox notifications
        $scope.$on('newNotifications', function(event, data) {
            $scope.notifications = data;
        });

        //Ang-Mat controls ------------
        $scope.title1 = 'Button';
        $scope.title4 = 'Warn';
        $scope.isDisabled = true;
        $scope.googleUrl = '//google.com';

        $scope.toggleLeft = function() {
            $mdSidenav('left').toggle();
        };
        $scope.toggleRight = function() {
            $mdSidenav('right').toggle();
        };

        //-------------------------------

        $scope.AWS_URL = ENV.aws_url;
        $scope.token = $cookieStore.get('employer_token');
    $scope.name = $cookieStore.get('name');


 $scope.parseInt = parseInt;
 
 
    $scope.$on('subname_upd', function () {
        $scope.subname = mySession.subname; 
    });

        //need new way of checking
        $scope.loggedIn = mySession.loggedIn();
        $scope.hasEmployerToken = mySession.hasEmployerToken();
        $scope.hasAdminToken = mySession.hasAdminToken();

        console.log('mySession says: '+$scope.loggedIn);
       //Listen for any emits (broadcasts from child controllers) on login status
        $scope.$on('loginout', function () {
            //check to see if the user is logged in or out
            $scope.hasEmployerToken = mySession.hasEmployerToken();
            $scope.hasAdminToken = mySession.hasAdminToken();
            $scope.loggedIn = mySession.loggedIn();
            //Need to set the bindings here whenever there is a login event
            $scope.name = mySession.name;
            $scope.subname = mySession.subname;        
            //Take care of any notification elements
            var promise = InboxManager.getNotifications();
            if(promise!=false)
              promise.then(function(data) {
                        $rootScope.$broadcast('newNotifications', data);
                    },
                    function(data, status) {
                        console.error('Error loading notifications: ' + status);
                    });
        }); 

            $scope.companyname = $routeParams.companyname;


        //Retreive standard list of jobs listed by employer
        //20150205
        /* JMR 20151202 May not need this any longer since EmployerDashMainCtrl is taking over.
        $http.get(ENV.rest_server+'jobs?token=' + $scope.token).success(function(data, status) {
            $scope.list = data;
            $scope.currentPage = 1; //current page
            $scope.entryLimit = 10; //max no of items to display in a page
            $scope.filteredItems = $scope.list.length; //Initially for no filter  
            $scope.totalItems = $scope.list.length;
            console.log("Status: " + status);

        });
        */


        //****** Filtering Functions ******************
        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.filter = function() {
            $timeout(function() { 
                $scope.filteredItems = $scope.filtered.length;
            }, 10);
        };
        $scope.sort_by = function(predicate) {
            $scope.predicate = predicate;
            $scope.reverse = !$scope.reverse;
        };
        // END filtering functions ***************************

        //Added this here since it's sort of the global area
        $scope.goBack = function() {
            window.history.back();
        };

        $scope.changeView = function(view){
        $location.path(view); // path not hash
        console.log('Inside  ChangeView!!!!!!');
            };

        $scope.logout = function() {
            $cookieStore.remove('admin_token');
            $cookieStore.remove('admin_token');
            $cookieStore.remove('company');
            $cookieStore.remove('employer_token');
            //Sometimes there are duplicate tokens, not sure why
            $cookieStore.remove('employer_token');
            //JMR 20150205
            $cookieStore.remove('name');
            mySession.name = "";
            mySession.subname = "";
            mySession.company = "";
            $scope.name = "";
            $scope.token = null;
            $scope.token = false;
    $scope.notifications = 0;
            console.log("Logging out... ");
            console.log("Cookie should be empty: " + $cookieStore.get("employer_token"));

          //Let the service confirm that user is logged out
          $scope.loggedIn = mySession.loggedIn();
            $scope.hasEmployerToken = mySession.hasEmployerToken();
            $scope.hasAdminToken = mySession.hasAdminToken();
            //window.location.href = jlglobals.base_url+"employers/";
            $location.path('/login');
            return false;
        };

      //JMR used to check if div contents/menus should be rendered, used to determine if user is logged in for those relevant functions
        $scope.isEmployer  = function() {
            //console.log("because isEmployer");
            return mySession.loggedIn();
        };

      //for emp landing page:
      $scope.sizeLimit      = 10585760; // 10MB in Bytes
      $scope.uploadProgress = 0;
      $scope.creds          = {};

      $scope.landing = {};

      $scope.landingedit={};
      $scope.uploadermessage ={};
      $scope.landingid= $routeParams.landingId;

      $scope.landing.type    = "photo";

            $scope.uploader = {
          controllerFn: function ($flow, $file, $message) {
            console.log($flow, $file, $message); // Note, you have to JSON.parse message yourself.
            $scope.uploadermessage = angular.fromJson($message);
                    $scope.landing.imageurl = $scope.uploadermessage.success;
                    $scope.landingedit.imageurl = $scope.uploadermessage.success;
          }
        };

      $scope.myupload = function(e) {
      console.log("called my upload, token: " + $scope.token);

        if(e.files.length) {
            // Perform File Size Check First
            //var fileSize = Math.round(parseInt(e.files[0].size));

            // Prepend Unique String To Prevent Overwrites

                    if($scope.landingedit.id==''||$scope.landingedit.id==undefined){
                    //console.log("before insert into db, check landing var: ");
                    //console.info($scope.landing);

                            // Insert into db
                $http({
                                    url: ENV.rest_server+"emplanding"+ '?token=' + $scope.token,
                                    data: $scope.landing,
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json; charset=UTF-8'}}).success(function(data, status, headers, config) {
                            if (status === 200)
                            {
                                                            console.log("successfully uploaded");
                                 $scope.changeView('/landing');
                            }
                            else
                            {
                                console.log("Something went wrong with AJAX request: " + status);
                            }

                                                    }).error(function(data, status, headers, config) {
                                console.log("Login AJAX Error! " + status);
                                $scope.token = false;

                            });

                    }else{
                            //update db
                            $http({
                            url: ENV.rest_server+"emplanding"+ '?token=' + $scope.token,
                            data: $scope.landingedit,
                            method: 'PUT',
                            headers: {'Content-Type': 'application/json; charset=UTF-8'}}).success(function(data, status, headers, config) {
                                            if (status === 200)
                                            {
                                                     $scope.changeView('/landing');
                                            }
                                            else
                                            {
                                                    console.log("Something went wrong with AJAX request: " + status);
                                            }

                                            //console.log(headers);
                                            //console.log(config);
                                            }).error(function(data, status, headers, config) {

                                                    console.log("Login AJAX Error! " + status);
                                                    $scope.token = false;

                                            }).on('httpUploadProgress',function(progress) {
                                              $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                                              $scope.$apply();
                                            });
                            }
         }else {
                     if($scope.landingedit.id==''||$scope.landingedit.id==undefined)
                     {
                     toastr.error('Please select a file to upload');
                     }
                     else{
                            //update db
                                    $http({
                                    url: ENV.rest_server+"emplanding"+ '?token=' + $scope.token,
                                    data: $scope.landingedit,
                                    method: 'PUT',
                                    headers: {'Content-Type': 'application/json; charset=UTF-8'}}).success(function(data, status, headers, config) {
                            if (status === 200)
                            {
                                 $scope.changeView('/landing');
                            }
                            else
                            {
                                console.log("Something went wrong with AJAX request: " + status);
                            }

                            //console.log(headers);
                            //console.log(config);
                                                    }).error(function(data, status, headers, config) {

                                console.log("Login AJAX Error! " + status);
                                $scope.token = false;

                            });
                    }
          }
        }; //END myupload

            $scope.createothers=function(){
                    // Insert into db
                    if($scope.landingedit.id==''||$scope.landingedit.id==undefined){
                $http({
                                    url: ENV.rest_server+"emplanding"+ '?token=' + $scope.token,
                                    data: $scope.landing,
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json; charset=UTF-8'}}).success(function(data, status, headers, config) {
                            if (status === 200)
                            {
                                 $scope.changeView('/landing');
                            }
                            else
                            {
                                console.log("Something went wrong with AJAX request: " + status);
                            }

                            //console.log(headers);
                            //console.log(config);
                                                    }).error(function(data, status, headers, config) {

                                console.log("Login AJAX Error! " + status);
                                $scope.token = false;

                            });
                    }else{
                            $http({
                                    url: ENV.rest_server+"emplanding"+ '?token=' + $scope.token,
                                    data: $scope.landingedit,
                                    method: 'PUT',
                                    headers: {'Content-Type': 'application/json; charset=UTF-8'}}).success(function(data, status, headers, config) {
                            if (status === 200)
                            {
                                 $scope.changeView('/landing');
                            }
                            else
                            {
                                console.log("Something went wrong with AJAX request: " + status);
                            }

                            //console.log(headers);
                            //console.log(config);
                                                    }).error(function(data, status, headers, config) {

                                console.log("Login AJAX Error! " + status);
                                $scope.token = false;

                            });
                    }
            }; //END createothers

             $scope.landingdelete=function(itemid, uniqueFileName){
             console.log("landing id to delete: "+ itemid);
                     $http({
                                    url: ENV.rest_server+"emplanding"+ '?token=' + $scope.token,
                                    data: {"id": itemid},
                                    method: 'DELETE',
                                    headers: {'Content-Type': 'application/json; charset=UTF-8'}}).success(function(data, status, headers, config) {
                            if (status === 200)
                            {	

                                                            $scope.landingchunk=data;
                            }
                            else
                            {	

                                console.log("Something went wrong with AJAX request: " + status);
                            }

                                                    }).error(function(data, status, headers, config) {

                                console.log("Login AJAX Error! " + status);
                                $scope.token = false;

                            });
             }; //END landingdelete

             $scope.updateordering=function(landing)
             {
                $http({
                        url: ENV.rest_server+"emplanding/reordering"+ '?token=' + $scope.token,
                        data: landing,
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json; charset=UTF-8'}})
                            .success(function(data, status, headers, config) {
                            $scope.landingchunk = data;
                    }).error(function(data, status, headers, config) {
                        console.log("Login AJAX Error! " + status);
                    });

             }//END updateordering

             $scope.editlanding=function(landingid){
                    $scope.changeView('/landedit/'+landingid);
            };

        $scope.fileSizeLabel = function() {
        // Convert Bytes To MB
        return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
      };

      $scope.uniqueString = function() {
        var text     = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 8; i++ ) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
        };

      //image grid lightbox
      $scope.images = [];
      $scope.order=[];

      $scope.$watch('landingchunk', function() {
              $scope.images=[];
                    angular.forEach($scope.landingchunk, function(values, keys) {
                            angular.forEach(values, function(value, key) {
                                    var imgObj= {};
                                    imgObj.url= ENV.aws_url + value.imageurl;
                                    imgObj.caption = value.texdesc;
                                    imgObj.thumbUrl= value.imageurl;
                                    this.push(imgObj);
                            },$scope.images);

                    },$scope.images);
              $scope.order=[];
              var i=1;
                var options ={};
              options.ind = 1;
                      angular.forEach($scope.landingchunk, function(values, keys) {
                              angular.forEach(values, function(value, key) {
                                  options = value;
                                  options.ind = i++;
                                  this.push(options);
                              },$scope.order);
                      },$scope.order); console.log($scope.order);
       });

    //index is the unique running number for the images item. (if row by row $index, it will only have 1~3 ) 
     $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.images, index);
      };

            //20150217 JMR Set condition to execute the landing page calls only if user is logged in
            if ($scope.loggedIn) {
                console.log("employersCtrl -> Calling restserver emplanding controller");
      //rendering items at employer landing page
            $http.get(ENV.rest_server+'emplanding'+ '?token=' + $scope.token).success(function(data){
                            $scope.landingchunk = data; 
            });

            //render edit mode for landing page
            $http.get(ENV.rest_server+'emplanding'+'?landingid='+$scope.landingid+ '&token=' + $scope.token).success(function(data){
                            $scope.landingedit = data; 
                            //$scope.landingedit.imageurl = 
            });
            } else {
                //console.log("employersCtrl -> NOT Calling restserver emplanding controller");
                //$location.path('/login');
            };


                //Show dialog mssage
        $scope.showSimpleDialog = function(title, msg, ev) {
           //$mdDialog.hide();
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .title(title)
            .content(msg)
            .ariaLabel('Registration')
            .ok('Got it!')
            .targetEvent(ev)
        );
      };


    }
}());

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// View Candidate's application - consists of their profile and their answers to the custom questions if any
// 20141122 
//20150213 JMR added APPL service for invite email functions
(function(){    
    'use strict';
    var app= angular.module('myApp');

    candApplicationCtrl.$inject = ['$scope', '$http', '$cookieStore', 'ENV','$location', '$routeParams', 'candShortlist','APPL', 'InboxManager',"$anchorScroll",'$mdDialog'];

    app.controller('candApplicationCtrl', candApplicationCtrl);
    
    function candApplicationCtrl ($scope, $http, $cookieStore, ENV, $location, $routeParams, candShortlist, APPL, InboxManager,$anchorScroll,$mdDialog) {

        $scope.AWS_DOC = "https://" + ENV.AWS_BUCKET +".s3.amazonaws.com/"; 
        console.log("In candApplicationCtrl ");
        //Store the job id , coming from emplr jobs list view
         APPL.jobid = $routeParams.jobid;
         APPL.jobtitle = $routeParams.jobtitle;
         $scope.jobtitle = APPL.jobtitle;
         $scope.jobid = $routeParams.jobid;
         $scope.token= $cookieStore.get('employer_token');
         //JMR model for radar chart
          $scope.behav_attrs = [];
          $scope.behav_vals = [];


        //list applications for a job
          console.log("my get call = "+ENV.rest_server+"applications?jobid="+APPL.jobid+ '&token=' + $scope.token);

          $scope.getSchedule = function(){
            $http.get(ENV.rest_server+'schedule?token='+$cookieStore.get('employer_token'))
            .success(function(data) {
                $scope.schedules = data;
            }).error(function(data, status) {});
        }
        $scope.getSchedule();

        $http.get(ENV.rest_server+"applications?jobid="+APPL.jobid+ '&token=' + $scope.token).success(function(data,status) {

            // Short form for Gets and Posts, but PUTS and DELETEs use long form
            /* $http({url: ENV.rest_server + $tokenStr,
                             method: 'GET',
                             headers: {'Content-Type': 'application/json; charset=UTF-8'}}).success(function(data){ */
                            console.log("applicationsCtrl-> data:" + data );
                $scope.applicants = data;
                $scope.filterPage = 'APPLIED';
                $scope.showLoading = false;
                console.log("applicationsCtrl: Got getting Application Data: "+status);
                //console.info(data);
            }).error(function(data, status) {
                console.log("applicationsCtrl: Error getting Jobs Data: "+status);
                //$scope.changeView("/login");
            });

       //Filter the list according to what tab the user is on
        $scope.filterApplications = function (item) {
            console.log("Filtering Triggered : " + item.first_name);
             switch($scope.filterPage ) {
                    case "ALL"        : return true; break; //(item.status === '0' || item.shortlisted === '1') 
                case "APPLIED"    : return (item.status === '1' || item.status === '0'); break;
                    case "SHORTLISTED": return item.status === '2'; break;
                    case "INVITED"    : return item.status === '3'; break;
                    case "HIRED"      : return item.status === '4';  break;
                    case "ARCHIVED"   : return item.status === '5';  break;
                    default:
                       console.log('There should not be a default failover at this thing.');
                }  

        }; 

       //Short list the selected candidate
       $scope.shortlist = function (application) {

            //call service to toggle shortlist    
            candShortlist.shortlist(application, $scope.token);
                    //JMR 20150127  Show toast message
                        $mdToast.show(
                          $mdToast.simple()
                            .content('Applicant Shortlisted!')
                            .position("bottom")
                            .hideDelay(0)
                        );



      };

      //Detailed data for the application the user just clicked on
       $scope.setApplDetails = function (data) {

            //set detailed info for current application that was clicked on, to avoid a DB call
            candShortlist.invited = data.invited;

            if (data.invited_date !== undefined) {
                candShortlist.invited_date = data.invited_date;
                console.log("Parent controller applicationsCtrl -> service invited_date is now: " + candShortlist.invited_date);
            }
            //candShortlist.invited_date = date.invited_date;
        };
        //JMR 20141121 Since profile data was retreived, now get the availability data *Note, saves are done by section
        if($routeParams.candid&&$routeParams.application_id){
        $http.get(ENV.rest_server + 'candidates?cand_id=' + $routeParams.candid + '&application_id=' + $routeParams.application_id + '&token=' + $scope.token)
                   .success(function(data) {
                        $scope.profile = data[0];
                        $scope.availability = data['availability'];
                        $scope.qas = data['qas'];
                        $scope.feedback = data['feedback'];
                        $scope.application = data['application'];

                        //$scope.profile.invited_date = '';


                        //set shortlist value
                        $scope.profile.shortlisted = $routeParams.shortlisted;
                        $scope.profile.application_id = $routeParams.application_id;
                        $scope.profile.invited = candShortlist.invited;
                        $scope.profile.invited_date = candShortlist.invited_date;
                         console.log("Invited date is: " + $scope.profile.invited_date); 
                        // Get the rest of the candidate application info such as answers to questions and invite status

                        // Get Candidate's behavior
                        $scope.behavior = data['behavior'];

            //JMR // RADAR CHART DATA console.log("Behav-------");
            //console.info(data['behav_vals']);
                        $scope.behav_attrs = data['behav_attrs'];
                        $scope.behav_vals = [data['behav_vals']];
             //console.info($scope.behav_attrs);
             //console.info($scope.behav_vals);
             //
                        //After successful basic profile info retrieval, get the availability data
                        console.log("candidateProfileCrtl returned: ");
                        console.info($scope.profile);
                        $scope.showLoading = false;
                     });
                 }
             $scope.showLoading = false;
            $scope.getPercentage = function(result){
            var total = parseInt(result.score)+parseInt(result.neg_score);
            return Math.round((result.score/total)*100);
            }
             // Call service to shortlist candidate --------------
            $scope.shortlist = function (application) {

                 //call service to toggle shortlist    
                candShortlist.shortlist(application, $scope.token);
            };

            //dialog for creating events
            $scope.showDialogEvent = function(ev) {
                $mdDialog.show({
                  controller: "EventCtrl",
                  templateUrl: ENV.base_url+'assets/zpartials/emplr-events_d.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                })
                .then(function() {
                  //get schedule
                  $scope.getSchedule();
                }, function() {});
            };

            //Send an email to the candiate with a link to the job ------------
            //20150213 JMR enhanced email invite
            $scope.invite = function (application) {
                    //send the email  **Need to integrate SendGrid ***
                    //Generate link to relevant job using the jobid
                    /* console.log("JOB: " + APPL.jobid + " " + APPL.jobtitle);
                    console.info(application); */

                    console.log('Setting Invite');
                    //record the transaction in the Applications table
                   $http({url: ENV.rest_server + 'applications?token=' + $scope.token,
                   method: 'PUT',
                   data: {'application_id':application.application_id, 'set_invited':'1', 'email':application.email, 'subject':application.subject, 'msg':application.msg , 'jobid':APPL.jobid, 'eventid':application.eventid}, 
                   headers: {'Content-Type': 'application/json; charset=UTF-8'}
                   }).

                    //$http.put(ENV.rest_server+'employers?token=' + $scope.token, profile).
                    success(function(data, status) {

                       //application.invited = data['invited'].toString();
                       $scope.application.status = data['status'].toString();
                       //console.log("status set to:"+application.status);
                        //Record the shortlist
                       console.info(data);
                       console.log("Invited successful");
                       return true;

                    }).error(function(data, status) {
                           // called asynchronously if an error occurs
                           // or server returns response with an error status.
                           console.log("Problem Inviting: " + status);
                           return false;
                    });   

            }; // END invite

            //Luigi Private Messaging
            $scope.sendMessage = function() {
                console.log('Send a message...');
                InboxManager.getConversationId(APPL.jobid, $scope.profile.id)
                  .then(function(data) {
                            var conversation_id = data;
                            $location.path('/inbox/conversation/' + conversation_id + '/' + APPL.jobid);
                        },
                        function(data, status) {
                            console.error('candApplicationCtrl: Error retrieving conversation by candidate: ' + status);
                        });
            };

            //Goto Inbox conversation
            $scope.gotoConversation = function() {
                console.log('Send a message...');
                InboxManager.getConversationId(APPL.jobid, $scope.profile.id)
                  .then(function(data) {
                            var conversation_id = data;
                            //enable fields to edit message
                            $location.path('/inbox/conversation/' + conversation_id + '/' + APPL.jobid);
                        },
                        function(data, status) {
                            console.error('candApplicationCtrl: Error retrieving conversation by candidate: ' + status);
                        });
            };

            //Goto Inbox conversation
            $scope.gotoConversation = function() {
                console.log('Send a message...');
                InboxManager.getConversationId(APPL.jobid, $scope.profile.id)
                  .then(function(data) {
                            var conversation_id = data;
                            $location.path('/inbox/conversation/' + conversation_id + '/' + APPL.jobid);
                        },
                        function(data, status) {
                            console.error('candApplicationCtrl: Error retrieving conversation by candidate: ' + status);
                        });
            };

    $scope.scrollToNotes = function(){
          $location.hash("notes");
          $anchorScroll();
      }
    $scope.saveNotes = function(){
        $http({
            url: ENV.rest_server + 'applications/notes?cand_id=' + $routeParams.candid + '&application_id=' + $routeParams.application_id + '&token=' + $scope.token,
            method: 'PUT',
            data: {'notes':$scope.application.notes}, 
            headers: {'Content-Type': 'application/json; charset=UTF-8'}
        })
        //$http.get(ENV.rest_server + 'applications/notes?cand_id=' + $routeParams.candid + '&application_id=' + $routeParams.application_id + '&token=' + $scope.token)
        .success(function(data, status) {
            if(status==200){
            //alert("Successfully saved.");
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.body))
        .title('Success!')
        .content('You have successfully saved.')
        .ariaLabel('Success')
        .ok('OK!')
        .targetEvent()
    );
                return true;
            }
        }).error(function(data, status) {
            alert("Unable to save notes.");
            return false;
        });       
    }
    $scope.changestatus = function(cand_id, status, app_id, data){
        if(app_id==undefined){
            app_id = $routeParams.application_id;
        }
        candShortlist.changeStatus(app_id, cand_id, $scope.token, status, data);
    }
    /*
    $scope.changestatus = function(profile, status){
        candShortlist.changeStatus($routeParams.application_id, profile, $scope.token, status, $scope.application);
    }
    */
    }
}());

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// EmployerDashCreateJobCtrl ***
(function(){    
    'use strict';
    var app= angular.module('myApp');

    EmployerDashCreateJobCtrl.$inject = ['$scope', '$http', '$cookieStore', '$location', 'ENV'];

    app.controller('EmployerDashCreateJobCtrl', EmployerDashCreateJobCtrl);
    
    function EmployerDashCreateJobCtrl ($scope, $http, $cookieStore, $location, ENV) {

        //Constructor
        //$scope.showLoading = true;
        
        //Get Countries list, *** don't really need this since we're only doing Singapore initially.
        $http.get(ENV.rest_server+'countries').success(function(data) {
            $scope.countries = data;
            $scope.showLoading = false;

        });
        // END Constructor
        $scope.showLoading = false;
        //JMR replaced param country_id with ENV.home_country
        //** need to move this into a service to be access by other controllers
        $scope.getGeoCode = function(zip, countryId)
        {
            console.log("getGeoCode --->");
            var $country_id = ENV.home_country;
            console.log('country id = '+ $country_id);
            var selectedCountry = $scope.countries.filter(function(el){
               return (el.id===$country_id);
            });
            selectedCountry = selectedCountry[0];
            console.log("selected Country");
            console.log(selectedCountry);
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+selectedCountry.name+'+ '+zip).success(function(data) {
                console.log(data);
                $scope.job.country_id = ENV.home_country;
                $scope.job.lat = data.results[0].geometry.location.lat;
                $scope.job.long = data.results[0].geometry.location.lng;
                console.log("lat = "+ $scope.job.lat);
                console.log("long = "+ $scope.job.long);
            });
            
        };

        // Create a job Fn
        $scope.createJob = function(job, clickEvent)
        {
            console.log(job);
            console.log(clickEvent.target);
            $(clickEvent.target).button("loading");
            $scope.token = $cookieStore.get('employer_token');
            
            //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            
            
            //JMR replaced short form with long one
            //$http.post(ENV.rest_server+'api/jobmgmt?token=' + $scope.token, job).
            
            $http({url: ENV.rest_server + 'jobmgmt?token=' + $scope.token,
			     method: 'POST',
			     data: job,
			     headers: {'Content-Type': 'application/json; charset=UTF-8'}
			}).success(function(data, status, headers, config) {
                        console.log(data);
                        console.log(status);
                        $(clickEvent.target).button("reset");
                        if (status === 201)
                        {
                            window.location.href = ENV.base_url+"employers/";
                        }
                        else
                        {
                            console.log('EmployerDashCreateJobCtrl: In else stmt');


                        }
                        //console.log(headers);
                        //console.log(config);
                    }).error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $(clickEvent.target).button("reset");
                console.log("Error " + status);


            });
        };  //END createJob
        
        
        //** See Youu : questionCtrl for job create **************************
        //
        //
        /* VERIFY this is no longer needed since the questions retrieval is rolled into getting the job details
 //Get questions, this will need to be merged with the current get for the job details
        // Questions will persist by employer and will be retreived for each job
        // The employer can then edit the jobs list which will make those changes persist
        $scope.getQuestions = function(empid) {
            //Restify this into it's own controller or add onto the existing get
        
        $http.get('/jobs/questionlist/1').success(function(data) {
            $scope.questions = data;
        });
        };
        */
        
        // May need to move to a separate questions controller or service since both the job details and create controllers use it
            //Add questions
        $scope.addRow = function() {
            // push a new object with some defaults
            $scope.questions.push({"question_id":"","jobid":"","question":"","type":null}); 
        };
        
                //Delete question
        $scope.deleteRow = function (index) {
            // push a new object with some defaults
            $scope.questions.splice(index,1); 
        }
    }
}());

// EmployerDashMainCtrl ***  Gets list of jobs and any metrics that belong to the employer
(function(){    
    'use strict';
    var app= angular.module('myApp');

    EmployerDashMainCtrl.$inject = ['$scope', '$http', '$cookieStore', 'ENV','$location', '$mdDialog'];

    app.controller('EmployerDashMainCtrl', EmployerDashMainCtrl);
    
    function EmployerDashMainCtrl ($scope, $http, $cookieStore, ENV, $location, $mdDialog) {
        
        //$scope.token = $cookieStore.get('token');

        $scope.token = $cookieStore.get('employer_token');
        //JMR 20150217 check if token exists, if not then redirect to login
        if (!$scope.token) {
            if($cookieStore.get('admin_token')){ //he's logged in as admin that's all
                $location.path('/admin');
            }else{
            $location.path('/login');
        }
            return false;
        }
        
        
        //$scope.showLoading = true;
        console.log("EmployerDashMainCtrl: Getting jobs for employer token " + $scope.token);
        var tokenStr = "";
        if ($scope.token !== undefined) {
                //20150217 JMR chnaged to jobmgmt controller call w/ no job_id indicates return list of all jobs, 
                //Retrieve list of jobs related to the employer
                //$tokenStr = 'api/jobs?token=' + $scope.token;
                tokenStr = 'jobmgmt?token=' + $scope.token;
        } else {
                //20150217 JMR should immediately redirect user to login screen since they are trying to access private functions that need to be loged in
                 $location.path('/login');
                 //$tokenStr = 'api/jobs';
        }
        
        //Token set, get list of jobs that belongs/posted by employer
        $http.get(ENV.rest_server+tokenStr).success(function(data, status) {
            //JMR check return status if user is authorized
            if (status < 400) {
                //user passed authorization set data
            $scope.jobs = data['jobinfo'];
            $scope.showLoading = false;
            } else { 
                //user is unauthroized either becasue token expired or they do not have the correct user role.
                $location.path('/login');
            }
            console.log("EmployerDashMainCtrl - Success, token valid, Status returned: " + status);
        }).error(function(data, status) {
            console.log("EmployerDashMainCtrl: Error getting Jobs Data: "+status);
            $location.path('/login');
        }); //END http.error
$scope.showLoading = false;

    $scope.toggleStatus= function(job){
        
         $http.get(ENV.rest_server+'job/toggleStatus?token=' + $scope.token+"&jobid=" +job.id).success(function(data,status) {
        
        if(status==200){
                //Update variables and let data binding update frontend
                job.status = data.status;
                console.info(data);
            }
        }).error(function(data){
            //alert("login session expired");
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('Expired')
            .content('Your login session has expired, please login again.')
            .ariaLabel('Expired Login')
            .ok('OK!')
            .targetEvent()
        );
            $location.path("/login");
        });
    };
    
    }
}());

// jobDetailsCtrl ***
//JMR 2014/11/15 - added questions code for retrival and storage
(function(){    
    'use strict';
    var app= angular.module('myApp');

    jobDetailsCtrl.$inject = ['$scope', '$http', '$timeout', '$location','ENV', '$routeParams', '$cookieStore', 'mySearchFields'];

    app.controller('jobDetailsCtrl', jobDetailsCtrl);
    
    function jobDetailsCtrl ($scope, $http, $timeout,$location, ENV, $routeParams, $cookieStore, mySearchFields) {

        $scope.token = $cookieStore.get('employer_token');
            //JMR
            $scope.jobId =  $routeParams.jobid;
            console.log("you selected job id: " + $routeParams.jobid);

        //20150214 JMR Added status eval for proper routing to login when user is logged in but expired token
        //  Also, changed call to api/jobmgmt controller
        //$http.get(ENV.rest_server+'job?jobid='+$routeParams.jobid + '&token=' + $scope.token).success(function(data, status){
        $http({url: ENV.rest_server + 'jobmgmt/'+$scope.jobId + '?token=' + $scope.token,
                            method: 'GET',
                            headers: {'Content-Type': 'application/json; charset=UTF-8'}
                            })

            //$http.get(ENV.rest_server+'api/jobmgmt/'+$scope.jobId + '&token=' + $scope.token)

            .success(function(data, status){
                //20150214 JMR added check for status
                if (status < 400) {
                    //everything fine, set data model
            $scope.jobDet = data;  // get job details
                } else {
                    //Error make user login
                    console.log("jobDetailsCtrl-> Something wrong!!!");
                    $location.path('/login');
                }
            //$scope.questions = data.questions; // get job questions
                console.log("jobDetailsCtrl->Get Status returned: " + status);
            console.info($scope.jobDet);
            }).error(function(data, status) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("jobDetailsCtrl: Error Get job>: " + status);
                    $location.path('/login');
        });
        $scope.showLoading = false;


        // Button press, Updates jobs data via ajax calls
        $scope.submitEdits = function(job) {
            //job[0].token = $scope.token;
            //Use country code specified in contstants ENV
            job.country_id = ENV.home_country;
            //add questions object to jobs
            //$scope.jobs['questions'] = $scope.questions;
            console.log("jobDetailsCtrl-> submitting the following Job for update: ");

            console.info(job.questions);
            // need to combine into a complex array that contains the questions object in the 1st put, for now it submits on success

            //20150214 JMR replaced call to old controller Job with api/jobmgmt
            //$http({url: ENV.rest_server + 'job'+ '?token=' + $scope.token,
                $http({url: ENV.rest_server + 'jobmgmt/'+$scope.jobId + '?token=' + $scope.token,
                            method: 'PUT',
                            data: job[0],
                            headers: {'Content-Type': 'application/json; charset=UTF-8'}
                            }).

                    //$http.put(ENV.rest_server+'employers?token=' + $scope.token, profile).
                success(function(data, status) {

                     //20150214 JMR added check for status
                    if (status < 400) {
                        console.log(job[0]);
                        //return false;
                        //everything fine, save questions
                        // Job update was successful, submit the related questions for the newly creatd job.id
                        $http({url: ENV.rest_server + 'questions' + '?token=' + $scope.token + '&id='+ $scope.jobId,
                            method: 'PUT',
                            data: job.questions,
                            headers: {'Content-Type': 'application/json; charset=UTF-8'}
                            }).success(function( status) {

                                    console.log('jobDetailsCtrl-> edited questions successfully:');
                                    //console.info(data);

                            }).error(function(status) {
                                       // called asynchronously if an error occurs
                                       // or server returns response with an error status.
                                       console.log("jobDetailsCtrl: Error editing questions: " + status);
                            });  // END inner PUT for questions
                    } else {
                        //Error make user login
                        $location.path('/login');
                    }


                        console.log('jobDetailsCtrl-> edited job ID successfully: ');
                        //console.info(data);

                    }).error(function(data, status) {
                           // called asynchronously if an error occurs
                           // or server returns response with an error status.
                           console.log("jobDetailsCtrl: Error editing job: " + status);
                            $location.path('/login');
                    });
                    //Return back to jobs detail view
                    $location.path("/job/jobid/" + job[0].id);
        };

            //Add questions
            $scope.addRow = function() {
                // push a new object with some defaults
                $scope.jobDet['questions'].push({"question_id":"","job_id":$scope.jobId,"question":"","type":null}); 
            };

            //Delete question
            $scope.deleteRow = function (index) {
                // push a new object with some defaults
                $scope.jobDet['questions'].splice(index,1); 
            }

            //JMR Need to move this into a service, duplicate code in create job, also hardcoded for SG
            //replaced param country_id with ENV.home_country
            //** need to move this into a service to be access by other controllers
            $scope.getGeoCode = function(zip, countryId)
            {
                /* Default to Singapore
                 * console.log("getGeoCode --->");
                var $country_id = ENV.home_country;
                console.log('country id = '+ $country_id);
                var selectedCountry = $scope.countries.filter(function(el){
                   return (el.id===$country_id);
                });
                */
               //only run when there are 6 digits, for SG only
               if (zip.length == 6) {
                    selectedCountry = 'singapore'; //lectedCountry[0];
                    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+selectedCountry+'+ '+zip).success(function(data) {
                        console.info(data);
                        $scope.jobDet[0].lat = data.results[0].geometry.location.lat;
                        $scope.jobDet[0].long = data.results[0].geometry.location.lng;
                        console.log("lat = "+ $scope.job.lat);
                        console.log("long = "+ $scope.job.long);
                    });
                };

            };

    }
}());

// ------------jobsCtrl ***
(function(){    
    'use strict';
    var app= angular.module('myApp');

    jobsCrtl.$inject = ['$scope', '$cookieStore', '$http', '$timeout', '$location', 'ENV', 'mySearch'];

    app.controller('jobsCrtl', jobsCrtl);
    
    function jobsCrtl ($scope, $cookieStore, $http, $timeout,$location, ENV, mySearch) {

        $scope.advsearch = mySearch.srch;
        $scope.$watch("advsearch.keyword", function (newVal, oldVal) {
            mySearch.srch.keyword = newVal;
           //console.log(mySearch.srch.keyword);
        });


       // JMR Search function ******** This was put in constructor area before it needs to be defined before calling ****************
        $scope.searchJobs = function() {
            console.log("jobsCtrl->searchJobs: searching Jobs");
            //Construct search query based on model passed in
            //Keyword
            $scope.srchstring = '';
            if (mySearch.srch.keyword) {
              $scope.srchstring = '/keyword/'+ mySearch.srch.keyword;
            }

            //Category
            if (mySearch.srch.cat) {
              $scope.srchstring = $scope.srchstring + '/category/'+ mySearch.srch.cat;
            }
            //Type
            if (mySearch.srch.type) {
              $scope.srchstring = $scope.srchstring + '/type/'+ mySearch.srch.type;
            }
            //Town
            if (mySearch.srch.town) {
              $scope.srchstring = $scope.srchstring + '/town/'+ mySearch.srch.town;
            }
            //Location

                     //If search criteria specified then add the search identifier
            if ($scope.srchstring) {
                $scope.srchstring = "/search" + $scope.srchstring;
            };

            console.log("submitting for search: " + $scope.srchstring);

            //ET - token was not passed, so it wasn't working
            //Get token
            var token = $cookieStore.get("employer_token");
            token = (token)?token:''; //if token does not exist, set as empty string

            //ET - calls jobmgmt instead of jobs as mentioned in one of the comments
            $http.get(ENV.rest_server + 'jobs'+ $scope.srchstring+"?token="+token).success(function(data) {
                $scope.list = data;
                $scope.currentPage = 1; //current page
                $scope.entryLimit = 5; //max no of items to display in a page
                $scope.filteredItems = $scope.list.length; //Initially for no filter  
                $scope.totalItems = $scope.list.length;
                console.log("jobsCtrl->searchJobs: Success searching Jobs");
            }).error(function(data, status) {
                console.log("jobsCtrl->searchJobs: Error searching Jobs : "+status);

                //ET - would be nice to have a pop up that says, "please log in to search" if code is 403
            });

        }; //END searchJobs ***************************
        //ET - automatically perform a job search
        $scope.searchJobs();

        //Set search criteria: category, type, town
        //'declare' the scope variables
        $scope.isearch = {keywords: '', cat:'', type:'', town:''};

        $scope.setCategory = function( category, name) {

            mySearch.srch.cat = category;
            $scope.catname = name;
            console.log('*****setting category to: '+ $scope.isearch.cat);
        };

         $scope.setType = function(type, name) {
            mySearch.srch.type = type;
            $scope.typeName = name;
        };

         $scope.setTown = function(town, name) {
            mySearch.srch.town = town;
            $scope.townName = name;
        };
        // End Search criteria************************


       $scope.setPage = function(pageNo) {
           $scope.currentPage = pageNo;                                                                                  
       };
       $scope.filter = function() {
           $timeout(function() { 
               $scope.filteredItems = $scope.filtered.length;
           }, 10);
       };
       $scope.sort_by = function(predicate) {
           $scope.predicate = predicate;
           $scope.reverse = !$scope.reverse;
       };

    }
}());

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Profile Landing page functions for employer ***************************
(function(){    
    'use strict';
    var app= angular.module('myApp');

    employerslandingCrtl.$inject = ['$scope', '$cookieStore', '$http', '$timeout', '$location', '$routeParams','ENV', 'mySession', 'Lightbox', '$sce'];

    app.controller('employerslandingCrtl', employerslandingCrtl);
    
    function employerslandingCrtl ($scope, $cookieStore, $http, $timeout,$location, $routeParams, ENV, mySession,Lightbox, $sce) {
        

	    $scope.AWS_URL = ENV.aws_url;
	    $scope.token = $cookieStore.get('employer_token');
            $scope.sortableOptions = {
     //restrict move across columns. move only within column.
    /*accept: function (sourceItemHandleScope, destSortableScope) {
     return sourceItemHandleScope.itemScope.sortableScope.$id !== destSortableScope.$id;
     },*/
    itemMoved: function (event) {
      event.source.itemScope.modelValue.status = event.dest.sortableScope.$parent.column.name;
    },
    orderChanged: function (event) {
    },
    containment: '#board'
  };
  
            //20150217 JMR check if employer token even exists
            console.log('employerslandingCrtl -> token value: '+ $scope.token);
            if (!$scope.token){
                $location.path("/login");
            }

		$scope.companyname = $routeParams.companyname;
		$scope.landingchunk ={};
	    //console.log("Retriving for token: " + $scope.token);
	    $scope.setPage = function(pageNo) {
	        $scope.currentPage = pageNo;
	    };
	    $scope.filter = function() {
	        $timeout(function() { 
	            $scope.filteredItems = $scope.filtered.length;
	        }, 10);
	    };
	    $scope.sort_by = function(predicate) {
	        $scope.predicate = predicate;
	        $scope.reverse = !$scope.reverse;
	    };
    
	    $scope.changeView = function(view){
	    $location.path(view); // path not hash
	        };
		
            $scope.logout = function() {
	        $cookieStore.remove('employer_token');
		$cookieStore.remove('employer_token');
	        $scope.token = null;
	        $scope.token = false;

	        console.log("Logging out... ");
	        console.log("Cookie should be empty: " + $cookieStore.get("employer_token"));

	      //Let the service confirm that user is logged out
	      $scope.loggedIn = mySession.loggedIn();
		  window.location =ENV.base_url+"employers#/login"
	       // $location.path('/jlfront/employers#/login');
	        return false;
	    };
	
	  //JMR used to check if div contents/menus should be rendered, used to determine if user is logged in for those relevant functions
	    $scope.isEmployer  = function() {
	        return mySession.loggedIn();
	    };
	
	
	    	//for emp landing page:
  
		  $scope.landing = {};

		  //rendering items at employer landing page
		  $scope.$watch('companyname', function() {
			  if($scope.companyname!=undefined){
					$http.get(ENV.rest_server+'go/companyname/' + $scope.companyname).success(function(data){
						console.log(data);
						$scope.landingchunk = data;			
					});
			  }
		   });
		$http.get(ENV.rest_server+'go/companyname/' + $scope.companyname).success(function(data){
				console.log(data);
				$scope.landingchunk = data;			
		});
	
	//image grid lightbox
    $scope.images = [];
    $scope.order=[];
    $scope.$watch('landingchunk', function() {
            $scope.images=[];
                  angular.forEach($scope.landingchunk, function(values, keys) {
                          angular.forEach(values, function(value, key) {
                                  var imgObj= {};
								  if(value.type=='pano'){
								  console.log("myvideo link"+value.videolink)
								  imgObj.url= $sce.trustAsResourceUrl(value.videolink);
                                  }else{
								  imgObj.url= $sce.trustAsResourceUrl(ENV.aws_url + value.imageurl);
								  }
                                  imgObj.caption = value.texdesc;
                                  imgObj.thumbUrl= value.imageurl;
                                  this.push(imgObj);
                          },$scope.images);

                  },$scope.images);
                   $scope.order=[];
                  angular.forEach($scope.landingchunk, function(values, keys) {
                          angular.forEach(values, function(value, key) {
                                  this.push(value);
                          },$scope.order);

                  },$scope.order);
             }); //END watch
console.log($scope.order);
	 $scope.openLightboxModal = function (index) {
	    Lightbox.openModal($scope.images, index);
	  };
             
     // Opens the image in a model dialog box
    $scope.openLightboxModal = function (index) {
	Lightbox.templateUrl ="<?php echo base_url();?>assets/components/angular-lightbox/lightbox.html";
       Lightbox.openModal($scope.images, index);
     };
	 
	 // Open pano
    $scope.openPanoModal = function (index) {
		Lightbox.templateUrl ="<?php echo base_url();?>assets/components/angular-lightbox/lightbox-pano.html";
       Lightbox.openModal($scope.images, index);
     };
         
	
        
    }
}());
             
(function(){    
    'use strict';
    var app= angular.module('myApp');

    youtubeBox.$inject = ['$sce'];

    app.directive('youtubeBox', youtubeBox);
    
    function youtubeBox ($sce) {
        return {
        restrict: 'E',
         scope: {},
              link: function (scope, element, attrs) {
            scope.url = $sce.trustAsResourceUrl(attrs.video);
                scope.istyle =attrs.style;
          },
          template: '<iframe allowfullscreen="" style="{{istyle}}" class="embed-responsive-item" ng-src="{{url}}"></iframe>'
        };
    }
}());

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//Angular Material -------
(function(){    
    'use strict';
    var app= angular.module('myApp');

    LeftCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', '$location', '$cookieStore', 'mySession'];

    app.controller('LeftCtrl', LeftCtrl);
    
    function LeftCtrl ($scope, $timeout, $mdSidenav, $location, $cookieStore, mySession) {

        $scope.close = function(url) {
           mySession.subname = $cookieStore.get('subname');
           $scope.$emit('subname_upd', '');
            $location.path(url);
            $mdSidenav('left').close();
        };
    }
}());

(function(){    
    'use strict';
    var app= angular.module('myApp');

    rightMenuCtrl.$inject = ['$scope', '$timeout', '$mdSidenav', 'mySearch'];

    app.controller('rightMenuCtrl', rightMenuCtrl);
    
    function rightMenuCtrl ($scope, $timeout, $mdSidenav, mySearch) {

        $scope.isearch = mySearch.srch;

        $scope.$watch("isearch.keyword", function (newVal, oldVal) {
            mySearch.srch.keyword = newVal;
        });


        $scope.setCategory = function (cat, catname) {
            mySearch.setCategory(cat, catname);
            $scope.catname = catname;

            //console.log("Current obj is: "+ mySearch.ss);
        };

        $scope.setCategory = function (cat, catname) {
              mySearch.setCategory(cat, catname);

              $scope.catName = catname;
          };

            $scope.setType = function(type, name) {
                mySearch.srch.type = type;
                $scope.typeName = name;
            };

             $scope.setTown = function(town, name) {
                mySearch.srch.town = town;
                $scope.townName = name;
            };

            $scope.resetSrch = function () {
                mySearch.resetSrch();
                $scope.catName = '';
                $scope.typeName = '';
                $scope.townName = '';
            };


        $scope.close = function() {
            $mdSidenav('right').close();
        };
    }
}());

(function(){    
    'use strict';
    var app= angular.module('myApp');

    CalendarCtrl.$inject = ['$scope', '$http', '$location', '$cookieStore', 'ENV', '$routeParams'];

    app.controller('CalendarCtrl', CalendarCtrl);
    
    function CalendarCtrl ($scope, $http, $location, $cookieStore, ENV, $routeParams) {
    $scope.process = "list";
    $scope.filterPage = 'EVENTS';
    
    $scope.resetSchedule = function(){
        $scope.schedule = {
            title:'',
            desc:'',
            ongoing:'',
            enddate:''
        }; 
        $scope.task = {
            dates:{},
            list:[]
        }; 
        $scope.timeslots = {
            sch_id : null,
            starttime:'',
            endtime:'',
            ongoingdays:{},
            dates:{}
        };
    }
    $scope.resetSchedule();
    //
    //$("#datepicker").datepicker();
    $scope.getStyle = function(day){
        if($scope.timeslots.ongoingdays[day]==true)
            return "{'color':'blue'}";
        else
            return {};
    }
            
    $scope.getEndDate = function(){
        return $scope.timeslots.enddate;
    }
    $scope.changePage = function(page){
        $scope.process = page;
        switch(page){
            case "list": $scope.resetSchedule(); break;
            case "tasklist": 
                $scope.process = "list";
                //$scope.resetSchedule(); //don't reset!
                break;
            case "selecttimefortask": 
                $scope.task.dates = {}; //reset
                break;
        }   
    } //navigation
    
        function toggledate(date){
            var view = $('div[class~="fc-bg"] [data-date="'+date+'"]');
		if($scope.timeslots.dates[date]){
			delete $scope.timeslots.dates[date];
			view.css('background-color', '');
                        console.log("removed date"+date);
		}else{
			$scope.timeslots.dates[date] = true;
			view.css('background-color', '#bce8f1');
                        console.log("added date"+date);
		}
		console.log($scope.timeslots.dates);
                $scope.$apply(); //notify angular to update cause outside angular
	}
	function isDate(date){
		if($scope.timeslots.dates[date]){
			return true;
		}
	}
	$('#calendar').fullCalendar({
		selectable:true,
		//unselectAuto: false,
		select: function( start, end, jsEvent, view ){
			//console.log(start);
			//console.log(end);
			//console.log(view);
			//toggle all dates between start and end
			var date = start;
			while(date.format()!=end.format()){
				toggledate(date.format());
				date.add(1,'days');
			}
			//$('#calendar').fullCalendar('render');
			//console.log("set yellow");
			//$(jsEvent.target).closest('div[class~="fc-day"]'); //.addClass("selectedDay");.css('background-color', 'yellow')
			
		},
		dayClick: function(date, jsEvent, view) {

			//alert('Clicked on: ' + date.format());

			//alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

			//alert('Current view: ' + view.name);
			//toggledate(date.format(), this);
			// change the day's background color just for fun
			//$(this).css('background-color', 'red');
			//$('#calendar').fullCalendar('render');
		},
		viewRender: function( view, element ){
			console.log("new view");
		},
		dayRender: function( date, cell ){
			console.log("new date");//dates[date.format]
			if(isDate(date.format())){//date.format()==="2015-07-01"){
				//console.log($(this));
				console.log("found"+date.format());	
				cell.css('background-color', '#bce8f1');
			}
		}
	});

	$('#time').fullCalendar({
		defaultView:"agendaDay",
		allDaySlot:false,
		header:false,
		dayNames: ['', '', '', '', '', '', ''], //hiding the days, silly hack
		scrollTime: '00:00:00',
		selectable:true,
		unselectAuto: false,
		select:function( start, end, jsEvent, view ){
			if(!start.hasTime()||!end.hasTime()){
				return false; //check that probably passes 100% of time
			};
			console.log(start.format("HH:mm:ss")+" "+end.format("HH:mm:ss"));
                        $scope.timeslots.starttime = start.format("HH:mm:ss");
                        $scope.timeslots.endtime = end.format("HH:mm:ss");
                        $scope.$apply();
		}
	});
    
    $scope.submitSchedule = function(){
        if(!$cookieStore.get('employer_token'))
            $location.path("/admin");
        //filter ongoingdays
        /*var ongoingdays = [];
        for(var key in $scope.schedule.ongoingdays){
            if($scope.schedule.ongoingdays[key] == true){
                ongoingdays.push(key);
            }
        }
        $scope.schedule.ongoingdays = ongoingdays.join();
        var dates = [];
        for(var key in $scope.schedule.dates){
            if($scope.schedule.dates[key] == true){
                dates.push(key);
            }
        }
        $scope.schedule.dates = dates.join();*/
        
        $http.post(ENV.rest_server+'schedule/create?token='+$cookieStore.get('employer_token'), $scope.schedule)
            .success(function(data) {
                //deferred.resolve(data);
                //$location.path('/calendar');
                $scope.resetSchedule();
                $scope.getSchedule();
             }).error(function(data, status) {
                //deferred.reject(data, status);
            });
    }
    
    $scope.submitTimeslot = function(){
        if(!$cookieStore.get('employer_token'))
            $location.path("/admin");
        //filter ongoingdays
        var ongoingdays = [];
        for(var key in $scope.timeslots.ongoingdays){
            if($scope.timeslots.ongoingdays[key] == true){
                ongoingdays.push(key);
            }
        }
        $scope.timeslots.ongoingdays = ongoingdays.join();
        
        var dates = [];
        for(var key in $scope.timeslots.dates){
            $('div[class~="fc-bg"] [data-date="'+key+'"]').css('background-color', '');
            if($scope.timeslots.dates[key] == true){
                dates.push(key);
            }
        }
        $scope.timeslots.dates = dates.join();
        $("#time").fullCalendar('unselect');
        $http.post(ENV.rest_server+'schedule/addtimeslot?token='+$cookieStore.get('employer_token'), $scope.timeslots)
            .success(function(data) {
                //deferred.resolve(data);
                //$location.path('/calendar');
                /*//toggle dates
                var dates = $scope.timeslots.dates.split(",");
                for(var key in dates){
                    toggledate(dates[key]);
                }*/
        
                $scope.resetSchedule();
                $scope.getSchedule();
                $scope.changePage("list");
             }).error(function(data, status) {
                //deferred.reject(data, status);
            });
    }
    
    $scope.getSchedule = function(){
        $http.get(ENV.rest_server+'schedule?token='+$cookieStore.get('employer_token'))
        .success(function(data) {
            $scope.schedules = data;
            $scope.changePage("list");
            /*for(key in $scope.schedules){
                var timeslot = $scope.schedules[key]["timeslots"];
                for(tkey in timeslot){ //convert string to objects
                    timeslot[tkey]["ongoingdays"] = JSON.parse(timeslot[tkey]["ongoingdays"]);
                    timeslot[tkey]["dates"] = JSON.parse(timeslot[tkey]["dates"]);
                }
            }
            console.log($scope.schedules);*/
        }).error(function(data, status) {});
    }
    $scope.getSchedule();

    $scope.addTimeslot = function(sch){
        $scope.changePage("selectdate");
        $scope.timeslots.sch_id = sch.id;
        $scope.selectedschedule = sch;
    }
    
    $scope.viewApplications = function(sch,timeslot){
        $scope.changePage("viewapplications");
        //$scope.timeslots.sch_id = sch.id;
        $scope.selectedschedule = sch;
        $scope.selectedtimeslot = timeslot;
        $http.post(ENV.rest_server+'schedule/getapplications?token='+$cookieStore.get('employer_token'),{'timeslot_id':timeslot.timeslot_id})
        .success(function(data) {
            $scope.applications = data;
        }).error(function(data, status) {});
        
    }
            
    /*$scope.confirmTimeslot = function(schedule_id,timeslot_id){
        if(!$cookieStore.get('employer_token'))
            $location.path("/admin");
        $http.post(ENV.rest_server+'schedule/confirmtimeslot?token='+$cookieStore.get('employer_token'),{'schedule_id':schedule_id,'timeslot_id':timeslot_id})
        .success(function(data) {
            if(data=="success")
                $scope.getSchedule();
        }).error(function(data, status) {});
    }*/
    
    $scope.publish = function(schedule_id){
        if(!$cookieStore.get('employer_token'))
            $location.path("/admin");
        $http.post(ENV.rest_server+'schedule/publish?token='+$cookieStore.get('employer_token'),{'schedule_id':schedule_id})
        .success(function(data) {
            if(data=="success")
                $scope.getSchedule();
        }).error(function(data, status) {});
    }
    $scope.getWidth = function(value, max){
        if(max==0) return 100;
        return 100-(100*((max-value)/max));
    }
    
    $scope.confirmApplication = function(appid){
        //check for emp token
        if(!$cookieStore.get('employer_token'))
            $location.path("/admin");
        
        //post request to server
        $http.post(ENV.rest_server+'schedule/confirmapplication?token='+$cookieStore.get('employer_token'),{'application_id':appid})
        .success(function(data) {
            if(data=="success"){
                //$scope.getSchedule();
                //+1 to confirmed
                $scope.selectedtimeslot.confirmed = parseInt($scope.selectedtimeslot.confirmed)+1;
                $scope.selectedtimeslot.unconfirmed = parseInt($scope.selectedtimeslot.unconfirmed)-1;
                $scope.viewApplications($scope.selectedschedule,$scope.selectedtimeslot);
            }
        }).error(function(data, status) {
            switch(data){
                case "alreadyselected": alert("You have already selected this timeslot.");break;
                case "novacancies": alert("There are no more vacancies for this timeslot.");break;
                case "appliedschedule": alert("You can only apply for one timeslot for this event.");break;
                case "notinvited": alert("This is a private event and you do not have invitation.");break;
                default: alert("You are not able to register for this timeslot. Please contact out admin for assistance.");
            }
        });   
    }
    
    $scope.sumApplicants = function(timeslot){
    return parseInt(timeslot.confirmed)+parseInt(timeslot.unconfirmed);
    }

    $scope.deleteTimeslot = function(timeslotid){
        if(!confirm("Delete timeslot?")) return false;
        $http.post(ENV.rest_server+'schedule/deletetimeslot?token='+$cookieStore.get('employer_token'),{'timeslot_id':timeslotid})
        .success(function(data) {
            if(data=="success"){
                $scope.getSchedule();
            }
        }).error(function(data, status) {
            switch(data){
                case "alreadyselected": alert("You have already selected this timeslot.");break;
                case "novacancies": alert("There are no more vacancies for this timeslot.");break;
                case "appliedschedule": alert("You can only apply for one timeslot for this event.");break;
                case "notinvited": alert("This is a private event and you do not have invitation.");break;
                default: alert("You are not able to register for this timeslot. Please contact out admin for assistance.");
            }
});
    }

    $scope.editSchedule = function(schedule){schedule.editmode=true;}
    $scope.updateSchedule = function(schedule){
        schedule.editmode=false;
        $http.post(ENV.rest_server+'schedule/updateschedule?token='+$cookieStore.get('employer_token'),{'schedule':schedule})
        .success(function(data) {
            $scope.getSchedule();
        }).error(function(data, status) {
            alert("Update unsuccessful.");
            $scope.getSchedule();
        });
    }
    
    //task: refactor the code
    function tasktoggledate(date){
            var view = $('div[class~="fc-bg"] [data-date="'+date+'"]');
		if($scope.task.dates[date]){
			delete $scope.task.dates[date];
			view.css('background-color', '');
                        console.log("removed date"+date);
		}else{
			$scope.task.dates[date] = true;
			view.css('background-color', '#bce8f1');
                        console.log("added date"+date);
		}
		console.log($scope.task.dates);
                $scope.$apply(); //notify angular to update cause outside angular
	}
	function taskisDate(date){
		if($scope.task.dates[date]){
			return true;
		}
	}
        $scope.length=function(o){
            var c=0;
            for(key in o)c++;
            return c;
        }
	$('#taskcalendar').fullCalendar({
		selectable:true,
		//unselectAuto: false,
		select: function( start, end, jsEvent, view ){
			//console.log(start);
			//console.log(end);
			//console.log(view);
			//toggle all dates between start and end
			var date = start;
			while(date.format()!=end.format()){
				tasktoggledate(date.format());
				date.add(1,'days');
			}
			//$('#calendar').fullCalendar('render');
			//console.log("set yellow");
			//$(jsEvent.target).closest('div[class~="fc-day"]'); //.addClass("selectedDay");.css('background-color', 'yellow')
			
		},
		dayClick: function(date, jsEvent, view) {

			//alert('Clicked on: ' + date.format());

			//alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

			//alert('Current view: ' + view.name);
			//toggledate(date.format(), this);
			// change the day's background color just for fun
			//$(this).css('background-color', 'red');
			//$('#calendar').fullCalendar('render');
		},
		viewRender: function( view, element ){
			console.log("new view");
		},
		dayRender: function( date, cell ){
			console.log("new date");//dates[date.format]
			if(taskisDate(date.format())){//date.format()==="2015-07-01"){
				//console.log($(this));
				console.log("found"+date.format());	
				cell.css('background-color', '#bce8f1');
			}
		}
	});

	$('#tasktime').fullCalendar({
		defaultView:"agendaDay",
		allDaySlot:false,
		header:false,
		dayNames: ['', '', '', '', '', '', ''], //hiding the days, silly hack
		scrollTime: '00:00:00',
		selectable:true,
		unselectAuto: false,
		select:function( start, end, jsEvent, view ){
			if(!start.hasTime()){//||!end.hasTime()
				return false; //check that probably passes 100% of time
			};
			console.log(start.format("HH:mm:ss")+" "+end.format("HH:mm:ss"));
                        $scope.task.starttime = start.format("HH:mm:ss");
                        //$scope.task.endtime = end.format("HH:mm:ss");
                        $scope.$apply();
		}
	});
        
    $scope.filterEvents = function (item) {
        switch($scope.filterPage) {
            case "EVENTS"     : 
                console.log("filter: events");
                return item.type == '0';
                break;
            case "TASKS"    : 
                return item.type == '1';
                break;
            default:
                console.log('There should not be a default failover at this thing.');
        }  
    }; 
    
    $scope.addTask = function(){
        var item = {};
        $scope.task.list.push(item);
    }
    $scope.deleteTask = function(pos){
        $scope.task.list.splice(pos, 1);
    }
    $scope.submitTask = function(){
        if(!$cookieStore.get('employer_token'))
            $location.path("/admin");
        $scope.task.dates = $scope.datesToString($scope.task.dates);
        if($scope.task.unit=="custom") $scope.task.unit=$scope.task.custom;
        $("#tasktime").fullCalendar('unselect');
        $http.post(ENV.rest_server+'schedule/createtask?token='+$cookieStore.get('employer_token'), $scope.task)
            .success(function(data) {
                //deferred.resolve(data);
                //$location.path('/calendar');  
                $scope.resetSchedule();
                $scope.getSchedule();
             }).error(function(data, status) {
                //deferred.reject(data, status);
            });
    }
    
    $scope.changeApplicationStatus = function(appid,status){
        if(!$cookieStore.get('employer_token'))
            $location.path("/admin");
        $http.post(ENV.rest_server+'schedule/changeappstatus?token='+$cookieStore.get('employer_token'), {'appid':appid,'status':status})
            .success(function(data) {
                //deferred.resolve(data);
                //$location.path('/calendar');  
                $scope.resetSchedule();
                $scope.getSchedule();
             }).error(function(data, status) {
                switch(data){
                    case "notallowed": alert("You cannot make that status change.");break;
                    case "notauthorized": alert("You are not authenticated to perform this action.");break;
                    default: alert("Please contact out admin for assistance.");
                }
            });
    }
    
    
    
    $scope.datesToString = function(dates){
        //filter dates
        var datebuffer = [];
        for(var key in dates){
            if(dates[key] == true){
                datebuffer.push(key);
            }
        }
        return datebuffer.join();
    }
    }
}());

(function(){    
    'use strict';
    var app= angular.module('myApp');

    EventCtrl.$inject = ['$scope', '$http', '$location', '$cookieStore', 'ENV', '$routeParams', '$mdDialog'];

    app.controller('EventCtrl', EventCtrl);
    
    function EventCtrl ($scope, $http, $location, $cookieStore, ENV, $routeParams, $mdDialog) {
        $scope.resetSchedule = function(){
            $scope.schedule = {
                title:'',
                desc:'',
                ongoing:'',
                enddate:''
            }; 
        }
        $scope.resetSchedule();

        $scope.submitSchedule = function(){
            if(!$cookieStore.get('employer_token'))
                $location.path("/admin");

            $http.post(ENV.rest_server+'schedule/create?token='+$cookieStore.get('employer_token'), $scope.schedule)
                .success(function(data) {
                    $scope.closeDialog();
                 }).error(function(data, status) {
                });
        }
                $scope.closeDialog = function(ev) {
                $mdDialog.hide();
            };
    }
}());

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
                            
                            
   /* InboxManager.getConversation($scope.conversation_id)
      .then(function(data) {
                $scope.my_info = data.my_info;
                $scope.conversation_info = data.conversation;
                $scope.conversation = data.messages;
                InboxManager.resetConversationNotify($scope.conversation_id);
                //Scroll to last item
                $location.hash('message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));
                $anchorScroll();
        console.info($scope.conversation_info);
            },
            function(data, status) {
                console.error('conversationCtrl: Error loading conversation: ' + status);
            }); */

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

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){    
    'use strict';
    var app= angular.module('myApp');

    statsCtrl.$inject = ['$scope', '$http', '$timeout', 'ENV', '$cookieStore', '$location'];

    app.controller('statsCtrl', statsCtrl);
    
    function statsCtrl ($scope, $http, $timeout, ENV, $cookieStore, $location) {

        $scope.token = $cookieStore.get('employer_token');
        if (!$scope.token) {
        $location.path('/login');
        return false;
        }
        //scope variables
        $scope.urlcount = {};

        $scope.resetStats = function(){
            $scope.stats = {
                visits:{total:0, url:"", count:0, percent:0},
                views:{count:0, title:""},
                favs:{count:0, title:""},
                refs:{count:0, title:""}
            };
            $scope.page = { current:0, max:0, dataperpage: 0 };
            $scope.cdata = [];
            $scope.clabels = [];
        }
        $scope.resetStats();

          /*$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
          $scope.series = ['Series A', 'Series B'];
          $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
          ];
          $scope.onClick = function (points, evt) {
            console.log(points, evt);
          };

          // Simulate async data update
          $timeout(function () {
            $scope.data = [
              [28, 48, 40, 19, 86, 27, 90],
              [65, 59, 80, 81, 56, 55, 40]
            ];
          }, 3000);
          */

           //$scope.page_id = 0;

            function getDateLabel(datum){ //format in day/month/year or month/year
                switch($scope.format){
                    case "2weeks":
                    case "daily":
                        return moment()
                        .set("year",datum['year'])
                        .set("month",datum['month']-1) //quirk of moment.js, req -1
                        .set("date",datum['day'])
                        .format("DD/MM/YYYY");
                        //return datum['day']+"/"+datum['month']+"/"+datum['year'];
                    break;
                    case "3months":
                        return moment()
                        .set("year",datum['year'])
                        .set("month",datum['month']-1) //quirk of moment.js, req -1
                        .set("date",datum['day'])
                        .format("MMM YYYY-WW");
                        //return datum['month']+"/"+datum['year'];
                    break;
                    case "12months":
                    case "yearly":
                        return moment()
                        .set("year",datum['year'])
                        .set("month",datum['month']-1) //quirk of moment.js, req -1
                        //.set("date",datum['day'])
                        .format("MM/YYYY");
                        //return datum['month']+"/"+datum['year'];
                    break;
                    case "hourly":
                        return moment()
                        //.set("year",datum['year'])
                        //.set("month",datum['month']-1)
                        //.set("date",datum['day'])
                        .set("hour",datum['hour'])
                        .format("hA");
                        //return datum['hour'];
                    break;
                }
            }

            $scope.getDataFromServer = function(from,to,format){
                var type = 'page';
                if($scope.jobid) type = "job";
                else $scope.jobid = "";

                var token = $cookieStore.get('employer_token')?$cookieStore.get('employer_token'):"";
                $http.get(ENV.rest_server + 'getstats?token='+token+'&type='+type+'&from='+from+'&to='+to+'&format='+format+'&jobid='+$scope.jobid).success(function(data) {
                     $scope.rdata = data;
                     //process data
                     $scope.processData();
                 }).error(function(data, status) {
                });
            }

            $scope.getRefBy = function(format,job){
                if(job){
                    $scope.job = job;
                    $scope.jobid = job.id; //set jobid if user selects a job
                }
                $scope.format = format;
                if(!$scope.jobid){
                    console.log("not doing page ref");
                    return false; //we are not showing page referrals
                }
                var from, to;

                switch(format){
                    case "2weeks":
                        from = moment().subtract(14,'days').format("YYYYMMDD");
                        to = moment().add(1,'days').format("YYYYMMDD");
                    break;
                    case "daily":
                        //$scope.format = "day";
                        from = moment().subtract(90,'days').format("YYYYMMDD");
                        to = moment().add(1,'days').format("YYYYMMDD");
                    break;
                    case "3months":
                        from = moment().subtract(12,'weeks').format("YYYYMMDD");
                        to = moment().add(1,'days').format("YYYYMMDD");
                    break;
                    case "12months":
                        from = moment().subtract(12,'months').format("YYYYMMDD");
                        to = moment().add(1,'days').format("YYYYMMDD");
                    break;
                    case "yearly":
                        //$scope.format = "month";
                        //provide a range at least
                        from = moment().subtract(2,'years').format("YYYYMMDD");
                        to = moment().add(1,'days').format("YYYYMMDD");
                    break;
                    default:
                        //$scope.format = "day";
                        from = moment().subtract(1,'months').format("YYYYMMDD");
                        to = moment().format("YYYYMMDD");
                    break;
                }
                console.log('Getting '+$scope.format+ 'info from '+from+' to '+to);
                //get info from server
                $scope.getDataFromServer(from,to,'');
                //$scope.processData();
            };
            //don't show page stats
            //$scope.getRefBy('month'); //default when autoload to show data for this month

            //default behavior
            //$scope.series = ['Number of Referrals'];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
                if($scope.format!="2weeks") return false; //do not proceed if it's not 2weeks format

                //deleet the current canvas and make another?
                //$('#canvascontainer').children()[0].remove();
                //$('#canvascontainer').append('<canvas id="line" class="chart chart-line" data="data" labels="labels" legend="true" series="series" click="onClick" width="400" height="400"></canvas>');

                //need to extract label data of the date and format it
                var from = moment(points[0].label, "DD/MM/YYYY").format("YYYYMMDD");
                var to = moment(points[0].label, "DD/MM/YYYY").add(1,'days').format("YYYYMMDD");
                $scope.getDataFromServer(from,to,"hour");
                $scope.format="hourly";
                $scope.subtitle = "Hourly Stats for "+points[0].label;
            };

            $scope.processData = function(){
                var label = [], data = [];
                var countdata = {};
                var urlcount = {};
                var highest = 0;
                $scope.urltotal = 0;
                //take the rdata and put into an object in specific format determined by selection

                for(var i in $scope.rdata){
                    //if($scope.format=="all") break; //no need to loop, we have special preparations for "all" case below
                    var d = $scope.rdata[i]; //datum

                    //also check the url and add to a separate url count
                    urlcount[d['url']] = parseInt(d['count']) + parseInt((urlcount[d['url']])?urlcount[d['url']]:0);

                    //add current datum's count into countdata[_DATE_LABEL_]
                    countdata[getDateLabel(d)] = (countdata[getDateLabel(d)]!=undefined)?countdata[getDateLabel(d)]+parseInt(d['count']):parseInt(d['count']);
                    if(countdata[getDateLabel(d)]&&countdata[getDateLabel(d)]>highest) highest = countdata[getDateLabel(d)];
                    /*//check if label already exist in labels array
                    //if yes increment the count
                    var success = false;
                    for(var i =0;i<labels.length;i++){
                        if (labels[i] == getDateLabel(d)){
                        //if (labels[i] == d['month']+"/"+d['year']){
                            countdata[i] = parseInt(countdata[i]) + parseInt(d['count']);
                            success=true;
                        }
                    }
                    if(!success){
                        labels.push(getDateLabel(d));
                        countdata.push(parseInt(d['count']));
                    }*/
                    //$scope.urltotal += parseInt(d['count']);
                }

                //build an array based on the date sequence (this will be in order)
                //while doing so, take data from countdata object (which will have the items in fragments)
                //i.e: will have hour 3, 5 and 12. But missing data for those which are 0.

                switch($scope.format){
                    case "hourly": //if format==hour, build an array based on the hours and collect the data from countdata object
                        var lab = null;
                        for(var i=0;i<24;i++){
                            lab = moment().set("hour",i).format("hA"); //0am, 1am... 12pm... 11pm
                            data.push(countdata[lab]?countdata[lab]:0); //data.push(countdata["1am"]); countdata = {"1am":5, "12pm":1};
                            label.push(lab); //label.push("1am");
                        }
                    break;
                    case "daily":
                        var lab = null;
                        for(var i=90;i>=0;i--){
                            lab = moment().subtract(i,'days').format("DD/MM/YYYY");
                            data.push(countdata[lab]?countdata[lab]:0);
                            label.push(lab);
                        }
                        $scope.subtitle = "Daily Stats for 3 months";
                    break;
                    case "2weeks":
                        var lab = null;
                        for(var i=13;i>=0;i--){
                            lab = moment().subtract(i,'days').format("DD/MM/YYYY");
                            data.push(countdata[lab]?countdata[lab]:0);
                            label.push(lab);
                        }
                        $scope.subtitle = "Daily Stats for 2 weeks";
                    break;
                    case "monthly": //build 30 days from now
                        var lab = null;
                        for(var i=30;i>=0;i--){
                            lab = moment().subtract(i,'days').format("DD/MM/YYYY");
                            data.push(countdata[lab]?countdata[lab]:0);
                            label.push(lab);
                        }
                    break;
                    case "3months":
                        var lab = null;
                        for(var i=11;i>=0;i--){
                            lab = moment().set("day",1).subtract(i,'weeks').format("MMM YYYY-WW");
                            data.push(countdata[lab]?countdata[lab]:0);
                            label.push(lab);
                        }
                        $scope.subtitle = "Weekly Stats for 3 Months";
                    break;
                    case "12months":
                        var lab = null;
                        for(var i=11;i>=0;i--){
                            lab = moment().set("day",1).subtract(i,'months').format("MM/YYYY");
                            data.push(countdata[lab]?countdata[lab]:0);
                            label.push(lab);
                        }
                        $scope.subtitle = "Monthly Stats for 12 Months";
                    break;
                    case "yearly": //build from 2 years ago, if we build from "from" date, could be 5 years of data 5 years from now
                        var lab = null;
                        for(var i=24;i>=0;i--){
                            lab = moment().set("day",1).subtract(i,'months').format("MM/YYYY");
                            data.push(countdata[lab]?countdata[lab]:0);
                            label.push(lab);
                        }
                        $scope.subtitle = "Monthly Stats for 24 Months";
                    break;
                    default: //display data without filling the timeframe
                        //just take rdata which is already in sequence
                        var label = [];
                        var data = [];
                        for(var k in $scope.rdata){ //iterate over all data
                            var datum = $scope.rdata[k];
                            var lab = getDateLabel(datum); //get it's label
                            //loop through the current labels and see if it already exists
                            var success = false;
                            for(var i = 0;i<label.length;i++){
                                if (label[i] == getDateLabel(datum)){ //found the label, just increment count
                                    data[i] = parseInt(data[i]) + parseInt(datum['count']);
                                    success=true;
                                    break; //break outta this for loop if found
                                }
                            }
                            console.log("break!");
                            if(!success){ //couldn't find existing label, so push
                                label.push(getDateLabel(datum));
                                data.push(parseInt(datum['count']));
                            }
                        }
                    break;
                }

                //set values
                $scope.urlcount = urlcount;

                //no data, no slider
                if(data.length==0){
                    $scope.data = [[0]];
                    $scope.label = ["No Referrals"];
                    $scope.page = { current:0, max:0, dataperpage: 0 };
                    return false;
                }

                //for 3 months data, rewrite the labels
                if($scope.format=="3months"){
                    var lastmth = "";
                    for(k in label){
                        //strip the label of it's week no #
                        label[k] = label[k].substring(0, label[k].indexOf("-"));
                        if(lastmth==label[k]){
                            label[k] = "";
                        }else lastmth = label[k];
                    }
                }
                //there is data
                $scope.cdata = [data,[(highest==0)?1:highest*1.5]];
                $scope.clabels = label;
                if($scope.format=="hourly") $scope.colours = ["#97BBCD", "#FFFFFF"];
                else $scope.colours = ["#FF5252", "#FFFFFF"];

                $scope.presentData(data,label);
            };



        /*var drawGraph = function(data){
            var ctx = document.getElementById("myChart").getContext("2d");
            if(ctx)
                var myBarChart = new Chart(ctx).Bar(data, null);
            else
                window.setTimeout(drawGraph(data), 1000);
        }*/

        $scope.getJobs = function(){
            $scope.token = $cookieStore.get('employer_token');
            $http.get(ENV.rest_server + 'jobmgmt?token='+$scope.token)
                .success(function(data, status){
                    if(data['jobinfo'].length>0){
                        $scope.resetStats();
                        $scope.jobs = data['jobinfo'];  // get job details
                        $scope.refs = data['refinfo'];    
                        $scope.getRefBy('2weeks',data['jobinfo'][0]);
                    }
                    else
                        $("#loadingjobs").text("No jobs available.");
                }).error(function(data, status) {
                    console.log('error');
                });

        };
        $scope.getJobs();

        //added June 03

        $scope.$watch("urlcount", function(){
            var highest = 0, total = 0, url = "";
            for(var key in $scope.urlcount){
                total += parseInt($scope.urlcount[key]);
                if(parseInt($scope.urlcount[key])>highest){
                    highest = $scope.urlcount[key];
                    url = key;
                }
            }   
            $scope.stats.visits = {"total":total,"url":url,"count":highest,"percent":(total)?((highest/total)*100).toFixed(2):0};
        });
        $scope.getPercentage = function(value){
            return ($scope.stats.visits.total)?((value/$scope.stats.visits.total)*100).toFixed(2):0;
        }
        //get most favourited
        $scope.$watch("jobs", function(){
            //$scope.resetStats();
            for(var key in $scope.jobs){
                //console.log(parseInt($scope.jobs[key].num_views)>$scope.stats.views.count);
                if(parseInt($scope.jobs[key].num_views)>$scope.stats.views.count){
                    $scope.stats.views.count = $scope.jobs[key].num_views;
                    $scope.stats.views.title = $scope.jobs[key].title;
                    console.log($scope.stats.views.count);
                    console.log($scope.stats.views.title);
                }
                if(parseInt($scope.jobs[key].fav)>$scope.stats.favs.count){
                    $scope.stats.favs.count = $scope.jobs[key].fav;
                    $scope.stats.favs.title = $scope.jobs[key].title;
                }
            }
        });
        $scope.$watch("refs", function(){
            //$scope.resetStats();
            for(var key in $scope.refs){
                if(parseInt($scope.refs[key].count)>$scope.stats.refs.count){
                    $scope.stats.refs.count = $scope.refs[key].count;
                    $scope.stats.refs.title = $scope.refs[key].refs;
                }
            }
        });

        //slider page
        $scope.page = { current:0, max:0, dataperpage: 0 };
        $scope.presentData = function(data, label){
                //get number of pages to display per page
                $scope.page.dataperpage = function(){
                    switch($scope.format){
                        case "2weeks": return 14;
                        case "hourly": return 12;
                        case "3months": return 12;
                        case "monthly": return 12;
                        case "daily": return 12;
                        case "12months": return 12;
                        case "yearly": return 12;
                    }
                    return 0; //default
                }();
                console.log("data per page:"+$scope.page.dataperpage);
                //set slider's max range = max number of pages
                //$scope.page.max = data.length - $scope.page.dataperpage; //formula if doing slider
                $scope.page.max = Math.ceil(data.length / $scope.page.dataperpage);
                console.log("max pages"+$scope.page.max);
                //use JQuery to set the max value of slider
                $("#pageslider").attr("max",$scope.page.max);
                console.log("set slider");
                //set current page to 0
                $scope.page.current = 1;
                //call slice and display
                $scope.sliceData();
        }
        $scope.sliceData = function(){
            if(!$scope.cdata[0]||!$scope.clabels) return false;
            //$scope.data = $scope.cdata[0].slice($scope.page.current,parseInt($scope.page.current)+$scope.page.dataperpage);
            var offset = (parseInt($scope.page.current)-1)*$scope.page.dataperpage;
            console.log("Page:"+$scope.page.current);
            console.log("Showing data:"+offset+" to "+(offset+$scope.page.dataperpage));
            console.log("Max page:"+$scope.page.max);

            $scope.data = [$scope.cdata[0].slice(offset,offset+$scope.page.dataperpage),$scope.cdata[1]];
            $scope.labels = $scope.clabels.slice(offset,offset+$scope.page.dataperpage);
            console.log($scope.data);
        }
        /*$scope.$watch("page.current", function(){
            $scope.sliceData();
        });*/
        $scope.changePage = function(value){
            $scope.page.current += value;
            if($scope.page.current<=1) $scope.page.current = 1;
            if($scope.page.current>=$scope.page.max) $scope.page.current = $scope.page.max;
            $scope.sliceData();
        };
        $scope.getCurrentPage = function(){
            return parseInt($scope.page.current);
        };
            }
}());
