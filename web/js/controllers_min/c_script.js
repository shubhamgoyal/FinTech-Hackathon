/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){    
    'use strict';
    var app = angular.module('myApp');

    configuration.$inject = ['$routeProvider','$httpProvider' ,'ENV' ,'$locationProvider', '$mdThemingProvider'];

    app.config(configuration);
    
    gconv.$inject = ['$route','InboxManager']
    function gconv($route,InboxManager){
        return InboxManager.getConversation($route.current.params.cid);
    }
    
    function configuration($routeProvider, $httpProvider, ENV, $locationProvider, $mdThemingProvider) {


        // Customize theme
          $mdThemingProvider.theme('default')
                  .primaryPalette('red')
                  .accentPalette('blue');//.accentPalette('deep-orange');

        $routeProvider.
              // JMR only temp for now...  when("/candmain", {templateUrl: ENV.base_url+"assets/zpartials/cand-main.html", controller: "candidateDashMainCtrl"}).
              when("/candmain", {templateUrl: ENV.base_url+"assets/zpartials/srch-adv-main.html", controller: "jobsCtrl"}).
              when("/inbox", {templateUrl: ENV.base_url+"assets/zpartials/inbox.html", controller: "inboxCtrl"}).
              when("/inbox/conversation/:cid/:jid?", {templateUrl: ENV.base_url+"assets/zpartials/conversation.html", controller: "conversationCtrl", "resolve": {
                  "gconv": gconv}}).
              when("/jobcreate", {templateUrl: ENV.base_url+"assets/zpartials/emplr-job-create.html", controller: "candidateDashApplyJobCtrl"}).
              when("/job/jobid/:jobid", {templateUrl: ENV.base_url+"assets/zpartials/cand-job-details.html", controller: "jobDetailsCtrl"}).
              when("/jobedit/jobid/:jobid", {templateUrl: ENV.base_url+"assets/zpartials/emplr-job-edit.html", controller: "jobDetailsCtrl"}).
              when("/profile", {templateUrl: ENV.base_url+"assets/zpartials/cand-profile.html", controller: "candidateProfileCrtl"}).
              when("/takequiz", {templateUrl: ENV.base_url+"assets/zpartials/cand-takequiz.html", controller: "quizCtrl"}).
              when("/adv/:empid?", {templateUrl: ENV.base_url+"assets/zpartials/srch-adv_tab.html"}).//, controller: "jobsCtrl"}).
              when("/map", {templateUrl: ENV.base_url+"assets/zpartials/srch-map.html", controller: "JobMapCtrl"}).
              when("/building", {templateUrl: ENV.base_url+"assets/zpartials/srch-adv-main.html", controller: "candidateCtrl"}).
              when("/employers", {templateUrl: ENV.base_url+"assets/zpartials/srch-emplr.html", controller: "candidateCtrl"}).
              when("/media", {templateUrl: ENV.base_url+"assets/zpartials/media.html", controller: "candidateCtrl"}).
              //when("/dashboard", {templateUrl: ENV.base_url+"assets/zpartials/cand-main.html", controller: "candidateCrtl"}).
              when("/favs", {templateUrl: ENV.base_url+"assets/zpartials/cand-favorites.html", controller: "favsCtrl"}).
              when("/animation", {templateUrl: ENV.base_url+"assets/zpartials/animations.html", controller: "AnimCtrl"}).
              when("/applied", {templateUrl: ENV.base_url+"assets/zpartials/cand-applied.html", controller: "applicationsCtrl"}).
              when("/login", {templateUrl: ENV.base_url+"assets/zpartials/cand-login.html", controller: "LoginCtrl"}).
              when("/register", {templateUrl: ENV.base_url+"assets/zpartials/cand-register.html", controller: "RegisterCtrl"}).
                      when("/forgetpwd", {templateUrl: ENV.base_url+"assets/zpartials/emplr-forgetpwd.html", controller:"ForgetCtrl"}).
                      when("/forgetpwd/:resettoken", {templateUrl: ENV.base_url+"assets/zpartials/emplr-forgetpwd.html", controller:"ForgetCtrl"}).
                      when("/verifymail/:verificationcode", {templateUrl: ENV.base_url+"assets/zpartials/emplr-email-verify.html", controller:"VerifyCtrl"}).
              when("/go/:companyname", {templateUrl: ENV.base_url+"assets/zpartials/empl-landing-public.html", controller: "employerslandingCrtl"}).
              when("/go/:companyname/events", {templateUrl: ENV.base_url+"assets/zpartials/cand-emplr-calendar.html", controller: "CalendarEmplrCtrl"}).
               when("/feedback/:token", {templateUrl: ENV.base_url+"assets/zpartials/cand-feedback.html", controller: "feedbackCtrl"}).
               //calendar
              when("/calendar", {templateUrl: ENV.base_url+"assets/zpartials/cand-calendar.html", controller: "CalendarCtrl"}).
               when("/calendar/:companyname", {templateUrl: ENV.base_url+"assets/zpartials/cand-emplr-calendar.html", controller: "CalendarEmplrCtrl"}).
              otherwise({redirectTo: '/candmain'});

    }
}());

    
(function(){    
    'use strict';
    var app = angular.module('myApp');

    configuration2.$inject = ['flowFactoryProvider'];

    app.config(configuration2);
    
    function configuration2(flowFactoryProvider) {
            flowFactoryProvider.defaults = {
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
    }
}());

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//JMR control to limit numbers only input
//specify the model, field name, and optional max length (input-length='x')

(function(){    
    'use strict';
    var app = angular.module('myApp');

    app.directive('numberOnlyInput', numberOnlyInput);
    
    function numberOnlyInput () {
        
    return {
        restrict: 'EA',
        template: '<input name="{{inputName}}" ng-model="inputValue" maxlen="inputLength"/>',
        scope: {
            inputValue: '=',
            inputName: '=',
            inputLength: '='
        },
        link: function (scope) {
            scope.$watch('inputValue', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue) || arr.length > scope.inputLength) {
                    scope.inputValue = oldValue;
                }
            });
        }
    };
    }
}());

(function(){    
    'use strict';
    var app = angular.module('myApp');

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


//unique check for Company landing page url:
(function(){    
    'use strict';
    var app = angular.module('myApp');

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

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//Service to maintain global data such as login  ***

(function(){    
    'use strict';
    var app = angular.module('myApp');

    mySession.$inject = ['$cookieStore'];

    app.service('mySession', mySession);
    
    function mySession ($cookieStore) {

        this.name = $cookieStore.get("name");
        this.loggedIn = function() {
                       var token = $cookieStore.get('cand_token');

                        //console.log ('mySession Service START---> ');
                        if (token == undefined) {
                            // If user is not signed in, enable the sign in link
                            return  false;
                        } else {
                            // If user is signed in, enable the signout link
                            //console.log("User is logged in");
                            return  true;
                        }
     }

    }
}());

//Search service, need search data to be persistent between partial loads
(function(){    
    'use strict';
    var app = angular.module('myApp');

    mySearch.$inject = ['$http', '$q', 'ENV', '$cookieStore'];

    app.service('mySearch', mySearch);
    
    function mySearch ($http, $q, ENV, $cookieStore) {
    this.srch = {
        keyword: "",
        currentPage: "1",
        entryLimit: "5",
        filteredItems: "",
        totalItems: "",
        cat: "",
        catname: "",
        radius: "",
        radiusCenter: "",
        type: "",
        typename: "",
        town: "",
        townname: "",
        zipcode: ""
    };

    // save map view state between tab switches
    this.mapState = {
        centerLat: 1.3058358,
        centerLong: 103.8618718,
        zoom: 11
    };

    // list of found jobs, updated after searchJobs() call
    // map listens this array
    // Probably better aproach would be use observer pattern
    // and notify listeners (map, list) when user clicks Go. Listeners
    // will call searchJobs and get results.
    this.foundJobs = [];

    //this.srch = {};
    var jobList = [];
    var ss = {};


    //GET keyword
    this.getKeyword = function(){
        //console.log("getKeyword: " + this.srch.keyword);
        return this.srch.keyword;
    };

    // Find coordinates for specified zip code
    // This is async function and returns promise object
    this.geocodeZip = function(zipcode) {
        var geocoder = new google.maps.Geocoder();
        var query = {
            'address': zipcode,
            'region': 'SG'
        };

        return $q(function(resolve, reject){
            geocoder.geocode(query, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var pos = results[0].geometry.location;
                    resolve(pos);
                } else {
                    reject(status);
                }
            });
        });
    }

    /**
     * Convert q hash to backend url;
     */
    this._buildQueryUrl = function(q) {
        var url = ENV.rest_server +'jobs';
        var qs = '';

        if ( ! _.isEmpty(q)) {
            qs = _.reduce(q, function(memo, value, key){
                return memo + '/' + key + '/' + value;
            }, '/search');
        }

        return url + qs;
    }

    /**
     * Filter jobs list and return job items containing keyword
     */
    this._filterByKeyword = function(jobs, keyword) {
        return _(jobs).filter(function(job) {
            return job.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
    }

    // Return a list of jobs for current search criteria
    // This function is async and returns promise object
    this.searchJobs = function(opts) {
        var srchstring = '';
        var q = {};

        if (this.srch.keyword) {
            q.keyword = this.srch.keyword;
        }

        // Category
        if (this.srch.cat) {
            q.category = this.srch.cat;
        }
        // Type
        if (this.srch.type) {
            q.type = this.srch.type;
        }
        // Town
        if (this.srch.town) {
            q.town = this.srch.town;
        }
        // Zipcode
        if (this.srch.zipcode && this.srch.radius) {
            q.zipcode = this.srch.zipcode;
        }
        // Location
        // radius search useless without zip for now - we are handling zip search
        // below
        // if (this.srch.radius) {
        //     q.distance = parseInt(this.srch.radius) / 1000;
        //     q.latitude = this.srch.radiusCenter.lat();
        //     q.longitude = this.srch.radiusCenter.lng();
        // }

        console.log('mySearch.srch:', this.srch);

        var self = this;

        if (_.isEmpty(q)) {
            console.log('GENERAL SEARCH');

            if (!_.isUndefined(opts) && opts.token) {
                var token = opts.token;
            } else {
                var token = '';
            }

            return $q(function(resolve, reject){
                $http.get(ENV.rest_server+'jobs?token='+token).success(function(data){
                    console.log('general search success');

                    self.foundJobs = data; // cache, update map

                    resolve(data);
                }).error(function(data, status){
                    console.log('general search reject');
                    reject(status);
                });
            });
        }


        // full query url
        var url = this._buildQueryUrl(q) + "?token=";
        //ET - pass token so that favourites and applied statuses can be retrieved
        url += $cookieStore.get('cand_token')?$cookieStore.get('cand_token'):"";

        return $q(function(resolve, reject) {
            function askBackend() {
                $http.get(url).success(function(data) {
                    // backend have not implemented keyword + distance search.
                    // It is searching by distance only, we need to filter
                    // results by keyword here
                    if (q.keyword && q.distance) {
                        data = self._filterByKeyword(data, q.keyword);
                    }

                    self.foundJobs = data; // cache, update map

                    console.group('mySearch.searchJobs: Success, ' + data.length + ' jobs');
                    console.log(url)
                    console.log(data);
                    console.groupEnd();

                    resolve(data);
                }).error(function(data, status) {
                    console.error('mySearch.searchJobs: Error searching Jobs:' + status);
                    reject(status);
                });
            }

            // if we have zipcode than we need geocode it first
            var zipcode = self.srch.zipcode;
            var radius = self.srch.radius;

            if (zipcode && radius) {
                console.group('zipcode lookup:', zipcode);

                self.geocodeZip(zipcode).then(function(pos){
                    console.log('found pos:', pos.lat(), pos.lng());

                    q.distance = parseInt(radius) / 1000;
                    q.latitude = pos.lat();
                    q.longitude = pos.lng();
                    self.srch.radiusCenter = pos; // display radius on map
                    // rewrite query string and url add new params
                    url = self._buildQueryUrl(q);

                    console.log('rewriting query:', url);
                    console.groupEnd();

                    askBackend();
                }, function(status) {
                    console.log('zip lookup failed:', status);
                    console.groupEnd();

                    askBackend();
                });
            } else {
                askBackend();
            }
        });
    }

      //CRITERIA search criteria: category, type, town
      //'declare' the scope variables
      this.setCategory = function( category, name) {
          this.srch.cat = category;
          this.srch.catname = name;

      };

      this.setRadius = function(radius) {
          this.srch.radius = radius;
      }

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
          this.srch.radius = '';
          this.srch.radiusCenter = '';
          this.srch.type = '';
          this.srch.typename = '';
          this.srch.town = '';
          this.srch.townname = '';
      };

    }
}());

(function(){    
    'use strict';
    var app = angular.module('myApp');

    mySearchFields.$inject = ['$http', 'ENV', '$rootScope'];

    app.service('mySearchFields', mySearchFields);
    
    function mySearchFields ($http, ENV, $rootScope) {
        
        //this service calls http and retrieves values for search fields
        $rootScope.searchfields = [];
        $rootScope.searchreference =
            {
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
            //console.log(data.towns);
            for(var key in data){
                //console.log("key is now:"+key);
                var searchfield = data[key]; //data[categories] is an array
               // console.log(searchfield);
                //console.log(searchfield.length);
                for(var i=0;i<searchfield.length;i++){
                    var d = searchfield[i];
                    //console.log(searchfield[i]);
                    $rootScope.searchreference[key][d.id] = d.name;
                }
                //console.log($rootScope.searchreference[key]);
            }
            console.log($rootScope.searchreference);
        }).error(function(data, status){
            //console.log('getSearchFields -> failed to get response');
            return false;
        });
    }
}());

//JMR Favorites service
(function(){    
    'use strict';
    var app = angular.module('myApp');

    myFavorites.$inject = ['$q', '$cookieStore', '$http', 'ENV'];

    app.service('myFavorites', myFavorites);
    
    function myFavorites ($q, $cookieStore, $http, ENV) {

        //Toggle the favorites for this job  and user
        //Want to get away from having to have a specific job object available to favorite it

        this.favorite = function(jobid, isFavorited) {

            console.log ("Favoriting job id: " + jobid);
            var deferred = $q.defer();
            var candtoken = $cookieStore.get("cand_token");

            //Create a favorite
            if (isFavorited=='0') {
                console.log('myFav Enablining favorite, current val: ' + isFavorited);
                // Create favorite

                $http.post(ENV.rest_server+'favorites?token=' + candtoken, {"job_id":jobid}).

                    success(function(data, status) {

                        //console.log('jobsCtrl: created favorite successfully for job: ' + status);
                       //Setting the model to favorited
                       deferred.resolve('1');

                    }).error(function(data, status) {
                           // called asynchronously if an error occurs
                           // or server returns response with an error status.
                           //console.log("jobsCtrl: Error creating favorite " + status);
                       deferred.reject(data, status);
                    });
                    return deferred.promise;

            } else {
                console.log('Disabling favorite, current val: ' + isFavorited);
               $http({url: ENV.rest_server + 'favorites?token=' + candtoken,
                            method: 'DELETE',
                            data: {"job_id":jobid},
                            headers: {'Content-Type': 'application/json; charset=UTF-8'}
                            })
                        .success(function(data, status, headers, config){
                                console.log('jobsCtrl: deleted favorite successfully for job: ' + jobid);
                                deferred.resolve('0');
                                });
                    return deferred.promise;
            }
        }; // END favorites

    }
}());
//END Favorites service

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){    
    'use strict';
    var app= angular.module('myApp');

    LoginCtrl.$inject = ['$rootScope','$scope', '$http', '$cookieStore', '$location', 'ENV', 'mySession' , '$mdDialog', '$route'];

    app.controller('LoginCtrl', LoginCtrl);
    
    function LoginCtrl ($rootScope, $scope, $http, $cookieStore, $location, ENV, mySession, $mdDialog, $route) {
	
        $scope.token = $cookieStore.get('cand_token');
        if ($scope.token !== undefined)
        {
            console.log("LoginCtrl: ******* Scope EMployer token = ");
            console.log($scope.token);
            //window.location.href = jlglobals.base_url+"employers/emplr";
            $location.path('/login');
        }
        console.log("LoginCtrl:  what is this?: " + $location.search().ftl);
        if ($location.search().ftl === "1")
            $scope.showFirstTimeLogin = true;
        else
            $scope.showFirstTimeLogin = false;


        // LOGIN fn **************
        $scope.loginFn = function(user, clickEvent, dia)
        {
            console.log("LoginCtrl: Called loginFn()...");

            console.info(user);
            console.log("LoginCtrl: " + clickEvent.target);
            $(clickEvent.target).button("loading");


            //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post(ENV.rest_server+"candidates/auth", user).
                    success(function(data, status, headers, config) {

                        $(clickEvent.target).button("reset");
                        if (status === 200)
                        {

                            $scope.loginfail = false;
                            if (data.token !== undefined) {
                                $cookieStore.put('cand_token', data.token);
                                $cookieStore.put('name',data.name);

                                // Get cookie
                                $scope.token = $cookieStore.get('cand_token');
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
                          
                                $rootScope.name = mySession.name;
                                //broadcast that a user has logged in, so appropriate changes can be made
                                $scope.$emit('loginout', '');

                               //console.log("LoginCtrl: name stored in mySession " + mySession.name);
                               
if (dia == undefined || dia != '1') {
                                $location.path("/candmain");
                            } else {
                                $route.reload();
                                $mdDialog.hide(user);
                                
                            }
                            
                            
                            
                            }
                        }
                        else
                        {
                            console.log("oooh, something went wrong: " + status);
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

                        }

                        //console.log(headers);
                        //console.log(config);
                    }).error(function(data, status, headers, config) {
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                            $(clickEvent.target).button("reset");
                            console.log("Attempts:  " +data['attempts'] + "  Status: " + status);
                            console.info(data);
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
        
    $scope.closeDialog = function(ev) {
       $mdDialog.hide();
        };
        
	}
}());

// Email verification controller (for both registration and change email ***
(function(){    
    'use strict';
    var app= angular.module('myApp');

    VerifyCtrl.$inject = ['$scope', '$http', '$location', 'ENV', '$routeParams'];

    app.controller('VerifyCtrl', VerifyCtrl);
    
    function VerifyCtrl ($scope, $http, $location, ENV, $routeParams) {
	        $scope.verificationcode = $routeParams.verificationcode;//$cookieStore.get('pwdreset_token');
		console.log($scope.verificationcode);
		$scope.verificationmsg="";
        $http.get(ENV.rest_server+"candidates/emailverification/"+ $scope.verificationcode).
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

// Forget password -- reset password ***
(function(){    
    'use strict';
    var app= angular.module('myApp');

    ForgetCtrl.$inject = ['$scope', '$http', '$cookieStore', '$location', 'ENV', '$routeParams'];

    app.controller('ForgetCtrl', ForgetCtrl);
    
    function ForgetCtrl ($scope, $http, $cookieStore, $location,  ENV, $routeParams) {
	$scope.resettoken = $routeParams.resettoken;//$cookieStore.get('pwdreset_token');
		console.log($scope.resettoken);
		$scope.EmailNotExist=false;
		$scope.ResetMailSent=false;
        
        $scope.forgetFn = function(user, clickEvent)
        {
            console.log("ForgetCtrl: Called forgetFn()");
           
            console.log("ForgetCtrl: " + user);
            console.log("ForgetCtrl: " + clickEvent.target);
            $(clickEvent.target).button("loading");
            
            $http.post(ENV.rest_server+"candidates/reset", user).
                    success(function(data, status, headers, config) {
                        
                        console.log("ForgetCtrl: AJAX is " + status);

                        if (status === 200)
                        {
                           console.log("ForgetCtrl: response msg " + data.msg);
                           if (data.msg == "emailnotexist") {
								alert("Your email is not registered, please try again.");
						   }
							else
							{
								$scope.resettoken = '';
								alert("A password reset link has sent to your email inbox");
								
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
				
				$http.post(ENV.rest_server+"candidates/changepwd/"+$scope.resettoken, user).
						success(function(data, status, headers, config) {
							
							console.log("ForgetCtrl: AJAX is " + status);

							if (status === 200)
							{
							   console.log("ForgetCtrl: response msg" + data.msg);
							   if (data.msg == "success") {
									alert("Your password has been updated, please logout try to login using your new password");
								}
								else if(data.msg=="tokenexpired")
								{
									alert("Your password reset link is expired, please send a new request");
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

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



app.directive('jlhype', function() {
    var directive = {};

    directive.restrict = 'E';

    directive.template = "";

    /*directive.scope = {
        scoperef : "=attrset"
    }*/
    
    directive.compile = function(element, attributes) {
        //element.css("border", "1px solid #cccccc");

        var linkFunction = function($scope, element, attributes) {
            //console.log(attributes.src);
            //element.html("");
            //element.css("background-color", "#ffff00");
            //element.append("<script src='assets/js/testhtml5_hype_generated_script.js' />");
            //http://www.javascriptkit.com/javatutors/loadjavascriptcss.shtml
            //alert(attributes.src);
            var fileref=document.createElement('script');
            fileref.setAttribute("type","text/javascript");
            fileref.setAttribute("src", attributes.src);
            document.getElementsByTagName("head")[0].appendChild(fileref);
            
            /*element.on('load change', function(event) {
				console.log("running");
                animFN();
            });*/

            element.ready(function(event) {
                //animFN();
                //console.log(attributes.function);
                //window[attributes.function]();
                //console.log($("#"+attributes.id).find(".HYPE_scene"));
                var child = $("#"+attributes.id).find(".HYPE_scene");
                //child.css("display", "none"); ;
                //console.log("changing height");

                /*if(attributes.style){
                    console.log(JSON.parse(attributes.style));
                    child.css(JSON.parse(attributes.style));
                }*/
                if(attributes.height) child.css("height",attributes.height);
                if(attributes.width)  child.css("width", attributes.width );
                
            });
      
        }
        return linkFunction;
    }
        
    return directive;
});


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Calendar (Candidates')
(function(){    
    'use strict';
    var app= angular.module('myApp');

    CalendarCtrl.$inject = ['$scope', '$http', '$location', '$cookieStore', 'ENV', '$routeParams'];

    app.controller('CalendarCtrl', CalendarCtrl);
    
    function CalendarCtrl ($scope, $http, $location, $cookieStore, ENV, $routeParams) {
    $scope.process = "list";
    $scope.filterPage = "EVENTS";

    $scope.getSchedule = function(){
        $http.get(ENV.rest_server+'schedule?token='+$cookieStore.get('cand_token'))//{'emp_id':$routeParams.emp_id}
        .success(function(data) {
            $scope.schedules = data;
            console.log(data);
        }).error(function(data, status) {});
    }
    $scope.getSchedule();
    
    $scope.filterEvents = function (item) {
        //console.log("Filtering Triggered : " + item.first_name);
        //what's this candidate's id? //need to check on backend side!!!
        switch($scope.filterPage) {
            case "EVENTS"     : 
                console.log("filter: events");
                return item.type=="0"; 
                break;
            case "TASKS"     : 
                console.log("filter: tasks");
                return item.type=="1"; 
                break;
            default:
                console.log('There should not be a default failover at this thing.');
        }  
    }; 
    $scope.changeApplicationStatus = function(timeid,status){
        if(!$cookieStore.get('cand_token'))
            $location.path("/login");
        $http.post(ENV.rest_server+'schedule/changeappstatus?token='+$cookieStore.get('cand_token'), {'timeid':timeid,'status':status})
            .success(function(data) {
                //deferred.resolve(data);
                //$location.path('/calendar');  
                $scope.getSchedule();
             }).error(function(data, status) {
                switch(data){
                    case "notallowed": alert("You cannot make that status change.");break;
                    case "notauthorized": alert("You are not authenticated to perform this action.");break;
                    default: alert("Please contact out admin for assistance.");
                }
            });
    }
};
}());

(function(){    
    'use strict';
    var app= angular.module('myApp');

    CalendarEmplrCtrl.$inject = ['$scope', '$http', '$location', '$cookieStore', 'ENV', '$routeParams'];

    app.controller('CalendarEmplrCtrl', CalendarEmplrCtrl);
    
    function CalendarEmplrCtrl ($scope, $http, $location, $cookieStore, ENV, $routeParams){
        $scope.process = "list";
    $scope.filterPage = "EVENTS";
    //$scope.emp_id = $routeParams.emp_id;
    console.log("calendar ctrl"+$routeParams.emp_id);
    $scope.getSchedule = function(){
        $http.post(ENV.rest_server+'schedule/getschedulebyemp?token='+$cookieStore.get('cand_token'),{'companyname':$routeParams.companyname})//'emp_id':$routeParams.emp_id,
        .success(function(data) {
            $scope.schedules = data;
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
    
    $scope.selectTimeslot = function(timeslot_id, status){
        $http.post(ENV.rest_server+'schedule/selecttimeslot?token='+$cookieStore.get('cand_token'),{'timeslot_id':timeslot_id,'status':status})
        .success(function(data) {
            $scope.getSchedule();
            /*for(key in $scope.schedules){
                var timeslot = $scope.schedules[key]["timeslots"];
                for(tkey in timeslot){ //convert string to objects
                    timeslot[tkey]["ongoingdays"] = JSON.parse(timeslot[tkey]["ongoingdays"]);
                    timeslot[tkey]["dates"] = JSON.parse(timeslot[tkey]["dates"]);
                }
            }
            console.log($scope.schedules);*/
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
    
    $scope.filterEvents = function (item) {
        //console.log("Filtering Triggered : " + item.first_name);
        //what's this candidate's id? //need to check on backend side!!!
        switch($scope.filterPage) {
            case "EVENTS"     : console.log("filter: events");return item.type=='0'; break;
            case "APPLIED"    : 
                console.log("filter: APPLIED");
                //return true only if this schedule is private and none of the timeslots are booked by candidate
                /*var invited = (item.invited == '1');
                for(var key in item["timeslots"]){
                    var ts = item["timeslots"][key]; //timeslot
                    if(ts.applied=="1" && invited){
                        return true;
                    }
                }*/
                if(item.applied=='1') return true;
                return false; 
                break;
            case "INVITATIONS"    : 
                console.log("filter: INVITED");
                return item.invited == '1'; break;
                break;
            case "TASKS"    : 
                console.log("filter: TASKS");
                return item.type=='1'; break;
                break;
                
            default:
                console.log('There should not be a default failover at this thing.');
        }  
    }; 
    
    $scope.getWidth = function(value, max){
        if(max==0) return 100;
        return 100-(100*((max-value)/max));
    }
    
    $scope.changeApplicationStatus = function(timeid,status){
        if(!$cookieStore.get('cand_token'))
            $location.path("/login");
        $http.post(ENV.rest_server+'schedule/changeappstatus?token='+$cookieStore.get('cand_token'), {'timeid':timeid,'status':status})
            .success(function(data) {
                //deferred.resolve(data);
                //$location.path('/calendar');  
                $scope.getSchedule();
             }).error(function(data, status) {
                switch(data){
                    case "notallowed": alert("You cannot make that status change.");break;
                    case "notauthorized": alert("You are not authenticated to perform this action.");break;
                    default: alert("Please contact out admin for assistance.");
                }
});
    }
}
}());
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//seeyouu: feedback controller for supervisor to write feedback for candidate
(function(){    
    'use strict';
    var app= angular.module('myApp');

    feedbackCtrl.$inject = ['$scope', '$cookieStore', '$http', '$timeout', '$location','$routeParams',  'ENV', 'mySession', 'Lightbox', '$sce'];

    app.controller('feedbackCtrl', feedbackCtrl);
    
    function feedbackCtrl ($scope, $cookieStore, $http, $timeout,$location, $routeParams, ENV, mySession, Lightbox, $sce) {
	$scope.token = $routeParams.token;
        $http.get(ENV.rest_server+'candidates/feedbackload/' + $scope.token).success(function(data){
             $scope.candname= data.candname;
        }).error(function(data){
            alert("Token expired");
        });

        $scope.submitFeedback=function(sup,clickEvent){
            $http.post(ENV.rest_server+'candidates/createfeedback?token=' + $scope.token, sup).success(function(data,status){
             if(status==200){
                 alert("Thanks for giving feedback");
             }
            }).error(function(data){
                alert("Token expired");
            });
        };
    }
}());
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//LUIGI Private Messaging
//JMR added the loggedIn check so only queries for messages when user is logged in
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


// Luigi Inbox controller ----------------
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


//Luigi Conversation controller
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



                    //Scroll to last item
                    //$location.hash('message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));

            //$anchorScroll();

       /* InboxManager.getConversation($scope.conversation_id)
          .then(function(data) {
                    $scope.my_info = data.my_info;
                    $scope.conversation_info = data.conversation;
                    $scope.conversation = data.messages;
                    InboxManager.resetConversationNotify($scope.conversation_id);

                    //Scroll to last item
                    setTimeout(function(){ 
                                $location.hash('message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));
                                console.log('Hash set MAIN to: ' + 'message_id' + ($scope.conversation[$scope.conversation.length -1].message_id));
                                $anchorScroll(); 
                                }, 1000);


                    console.log("Length: "+ $scope.conversation.length);
                    //console.info($scope.conversation);
                },
                function(data, status) {
                    console.error('conversationCtrl: Error loading conversation: ' + status);
                });  */

            //Scroll to last item
            //$location.hash('message_id' + ($scope.conversation[$scope.conversation.length -1]['message_id']));
            //$anchorScroll();



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

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Applications controller  - returns the list of jobs the candidate has applied to
(function(){    
    'use strict';
    var app= angular.module('myApp');

    applicationsCtrl.$inject = ['$scope', '$cookieStore', '$http', '$timeout', '$location', 'ENV'];

    app.controller('applicationsCtrl', applicationsCtrl);
    
    function applicationsCtrl ($scope, $cookieStore, $http, $timeout,$location, ENV) {
	
     $scope.token = $cookieStore.get("cand_token");
     $scope.AWS_URL = ENV.aws_url;
    //Removed database call and instead getting from json file
    //$http.get('ajax/getCustomers.php').success(function(data){
    $http.get(ENV.rest_server+'applications?token='+$scope.token).success(function(data){
        $scope.jobList = data;
        //$scope.totalItems = $scope.data.len;
        console.log("applicationsCtrl-> GET sucessful, got :" );
        console.info(data);
    }).error(function(data, status) {
                    //user is unauthorized
                    $location.path('/login');
    });
	}
}());

//Favorites controller - returns the list of jobs the candidate has favorited
(function(){    
    'use strict';
    var app= angular.module('myApp');

    favsCtrl.$inject = ['$scope', '$cookieStore', '$http', '$timeout', '$location',  'ENV'];

    app.controller('favsCtrl', favsCtrl);
    
    function favsCtrl ($scope, $cookieStore, $http, $timeout,$location, ENV) {
	
    $scope.token = $cookieStore.get("cand_token");
    $scope.AWS_URL = ENV.aws_url;
    //Removed database call and instead getting from json file
    //$http.get('ajax/getCustomers.php').success(function(data){
    $http.get(ENV.rest_server+'favorites?token='+$scope.token).success(function(data){
        $scope.jobList = data;
        //$scope.totalItems = $scope.data.len;
        console.log("favsCtrl-> GET sucessful, got :" );
        console.info(data);
	}).error(function(data, status) {
                    //user is unauthorized
                    $location.path('/login');
                });

    //Set favorite via the myFavorite service
    $scope.toggleFavorite = function (jobDet) {
        
        //call to toggle favorite for this job
       myFavorites.favorite(jobDet.id, jobDet.isFavorited,$scope.token )
            .then(function(data) {
                jobDet.isFavorited = data;
            },
            function(data, status) {
                console.error('Favorite: Error toggling favorite: ' + status);
            });

    };
	}
}());

    
// Jobs Controller - main controller to list jobs for the candidate (from search results) ---------------------------
(function(){    
    'use strict';
    var app= angular.module('myApp');

    jobsCtrl.$inject = ['$scope', '$cookieStore', '$http', '$timeout', '$route', '$location', 'ENV', 'mySearch', '$routeParams'];

    app.controller('jobsCtrl', jobsCtrl);
    
    function jobsCtrl ($scope, $cookieStore, $http, $timeout, $route, $location, ENV, mySearch, $routeParams) {
	

    $scope.advsearch = mySearch.srch;

    $scope.token = $cookieStore.get("cand_token");

    //Get current search criteria that's been set by the user from the mySearch service:
     //$scope.isearch.keyword = mySearch.getKeyword();

     //$scope.isearch.keyword = mySearch.getKeyword;

    //console.log($scope.isearch.keyword);
    //console.log("scope Keyword now changed to: "+ $scope.advsearch.keyword);
    //console.log("mySearch service Keyword now changed to: "+mySearch.srch.keyword);
    
    //gotojob ID
    $scope.gotoJob = function(jobID){
        $location.path("/job/jobid/"+jobID);
    }
    //check if candidate is logged in
    $scope.isLoggedIn = function(){
        return $cookieStore.get("cand_token")?true:false;
    }

    $scope.$watch("advsearch.keyword", function (newVal, oldVal) {
        mySearch.srch.keyword = newVal;
       //console.log(mySearch.srch.keyword);
    });

     // JMR Search function ******** This was put in constructor area because it needs to be defined before calling ****************
      $scope.searchJobs = function() {
          if($routeParams.empid!=undefined){
            $http.get(ENV.rest_server+'jobs?empid='+$routeParams.empid+'&token='+$scope.token).success(function(data){
              //bound to mySearch so MapsCtrl can update it's view
              mySearch.foundJobs = data;
              $scope.list = data;
              $scope.currentPage = 1; //current page
              $scope.entryLimit = 5; //max no of items to display in a page
              $scope.filteredItems = $scope.list.length; //Initially for no filter
              $scope.totalItems = $scope.list.length;
              console.log("jobsCtrl->searchJobs: Success searching Jobs");
              console.info(data);
              $routeParams.empid = undefined;
                }).error(function(data, status){
                    console.error("jobsCtrl->searchJobs: Error searching Jobs : "+status);
                });
            return false;
            }
          mySearch.searchJobs({token: $scope.token}).then(function(data){
              $scope.list = data;
              $scope.currentPage = 1; //current page
              $scope.entryLimit = 5; //max no of items to display in a page
              $scope.filteredItems = $scope.list.length; //Initially for no filter
              $scope.totalItems = $scope.list.length;
              console.log("jobsCtrl->searchJobs: Success searching Jobs");
              console.info(data);
          }, function(status){
              console.error("jobsCtrl->searchJobs: Error searching Jobs : "+status);
          });

      }; //END searchJobs ***************************


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


    $scope.searchJobs();


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

    //** Favorite a job function ***
    $scope.favorite = function(job) {

        console.log ("Favoriting job id: " + job.id);
        console.info (job);

        //Create a favorite
        if (job.isFavorited=='0') {
            console.log('Enablining favorite, current val: ' + job.isFavorited);
            // Create favorite

            $http.post(ENV.rest_server+'favorites?token=' + $scope.token, {"job_id":job.id}).

                success(function(data, status) {

                    console.log('jobsCtrl: created favorite successfully for job: ' + status);
                   //Setting the model to favorited
                   job.isFavorited = '1';

                }).error(function(data, status) {
                       // called asynchronously if an error occurs
                       // or server returns response with an error status.
                       console.log("jobsCtrl: Error creating favorite " + status);

                });


        } else {
            console.log('Disabling favorite, current val: ' + job.isFavorited);
           $http({url: ENV.rest_server + 'favorites?token=' + $scope.token,
			method: 'DELETE',
			data: {"job_id":job.id},
			headers: {'Content-Type': 'application/json; charset=UTF-8'}
			})
                    .success(function(data, status, headers, config){
                            console.log('jobsCtrl: deleted favorite successfully for job: ' + data.job_id);
                            job.isFavorited = '0';
                            });
        }
    } // END favorites


//** Apply function ******************
$scope.apply = function(job, answers) {

        console.log ("Applying to job id: " + job.id);
        console.info (job);
        //console.info (answers);
        /* for (i = 0, i < answers.length, i ++) {


        } */



        //Open dialog window so user can apply
        //If no custom questions then just apply


 //Set job to Applied status in DB
        if (job.hasApplied=='0') {
            console.log('Applying to job , current val: ' + job.hasApplied);
            // Create aplication entry
            //Modal dialog box to answer questions



            //Pass in answers to custom questions
            $http.post(ENV.rest_server+'applications?token=' + $scope.token, {"job_id":job.id}).
                success(function(data, status) {

                    console.log('jobsCtrl: created application successfully for job: ' + status);
                   //Setting the model to favorited
                   job.hasApplied = '1';

                }).error(function(data, status) {
                       // called asynchronously if an error occurs
                       // or server returns response with an error status.
                       console.log("jobsCtrl: Error creating application " + status);

                });


        } else {
            console.log('Disabling button, should have never been enabled current val: ' + job.hasApplied);

            /* JMR
              may want to move this to another function, too allow candidates to withdraw application
              $http({url: ENV.rest_server + 'favorites?token=' + $scope.token,
			method: 'DELETE',
			data: {"job_id":job.id},
			headers: {'Content-Type': 'application/json; charset=UTF-8'}
			})
                    .success(function(data, status, headers, config){
                            console.log('jobsCtrl: deleted favorite successfully for job: ' + data.job_id);
                            job.isFavorited = '0';
                            });

                            */
        } // END if-else


    }; //END Apply

	}
}());

//Retrieves detailed info about a job for the detail view --- users can also apply to jobs from here
(function(){    
    'use strict';
    var app= angular.module('myApp');

    jobDetailsCtrl.$inject = ['$scope', '$http', '$timeout','$location','ENV', '$routeParams', '$cookieStore', 'mySession', 'InboxManager', '$mdDialog', 'myFavorites', '$route'];

    app.controller('jobDetailsCtrl', jobDetailsCtrl);
    
    function jobDetailsCtrl ($scope, $http, $timeout,$location, ENV, $routeParams,$cookieStore, mySession, InboxManager, $mdDialog, myFavorites, $route) {
	$scope.token = $cookieStore.get('cand_token');
        //JMR
        console.log("YOU selected job details id: " + $routeParams.jobid);
   //$scope.qa = [];
   $scope.jobDet = {}; //requires init
    $http.get(ENV.rest_server+'job?jobid='+$routeParams.jobid + '&token=' + $scope.token).success(function(data){
        $scope.jobDet = data[0];
        $scope.questions = data['questions'];
        console.log("Title of job is>>>: "+$scope.jobDet.title);
        console.info($scope.jobDet);
        console.info($scope.questions);
    });

    $scope.test = function () {
        console.log("Does this work??????");
    }

    //JMR testing creation of datastructure to send to CI to insert directly into the DB
    $scope.testit = function (answers) {
        console.log ('EXEC -> testit(answers)');
        //console.info(answers);

        $scope.ans = [];
             // index : object
            angular.forEach(answers, function(value, key) {
               //console.log(key + ': ' + value);

               // key : value
            /*   angular.forEach(value, function(value, key) {
                   //console.log(value);
                   //console.log(key + ': ' + value);
                    this.push(key + ': ' + value);
               }, $scope.in); */
               this.push({job_id : value.job_id, question:value.question, answer:value.answer, question_id: value.question_id});

            }, $scope.ans);
            console.info($scope.ans);
    }


//** Apply function ****************** also in jobsCtrl  -> move to service?
$scope.zapply = function(answers,job) {

        console.log ("Applying to job ID===: " + job.id);
        //console.info (job);
        //console.info (answers);
        //Answers data strcture to insert
        $scope.ans = [];
        //Open dialog window so user can apply
        //If no custom questions then just apply

//create object

 //Set job to Applied status in DB
        if (job.hasApplied=='0') {
            console.log('Applying to job , current val: ' + job.hasApplied);
             // index : object
            angular.forEach(answers, function(value, key) {
               this.push({job_id : value.job_id, question_id : value.question_id, question:value.question, answer:value.answer?value.answer:""}); //if no answer, server throws error and results in nothing happening.
            }, $scope.ans);
            console.log("Submitting the following answer data struc: ");
            console.info ($scope.ans);
            //Pass in answers to custom questions
            //$http.post(ENV.rest_server+'applications?token=' + $scope.token, {"job_id":job.id, "answers":$scope.ans}).
            //$http.post(ENV.rest_server+'applications?token=' + $scope.token + '&job_id=' + job.id, $scope.ans).
            
            var web_url = $scope.getReferrer();
            
            $http({url: ENV.rest_server + 'applications?' + 'jobid=' + job.id + '&title=' + job.title + '&url='+web_url+'&token=' + $scope.token,
			method: 'POST',
			data: $scope.ans,
			//headers: {'Content-Type': 'application/json; charset=UTF-8'}
			}).
                success(function(data, status) {
                    console.log('jobDetailsCtrl: created application successfully for job: ' + status);
                   //Setting the model to applied
                   job.hasApplied = '1';
                   //$scope.getRef();
                }).error(function(data, status) {
                       // called asynchronously if an error occurs
                       // or server returns response with an error status.
                       console.log("jobDetailsCtrl: Error creating application " + status);
                });
        } else {
            console.log('Disabling button, should have never been enabled current val: ' + job.hasApplied);


        } // END if-else


    } //END Apply
    $scope.getReferrer = function(){
        var web_url = document.referrer;
        if(!web_url){
            console.log("No document.referrer, proceeding as jobslah.com");
            web_url = "//www.jobslah.com";
            //return false;

            //pretend to be referred from elsewhere
            //bit silly they could be surfing yahoo.com and paste the job site ... that is not a referrer...
            //web_url = "//yahoo.com/gotest";
        }
        //perform filtering, if jobslah.com drop it
        var start = web_url.indexOf("://");
        var end = web_url.indexOf("/",start+3); //if / is not found....
        if(end==-1) end = web_url.length;
        web_url = web_url.substring(start+3,end);
        return web_url;
    }
    $scope.getRef = function(){
        var web_url = $scope.getReferrer();

        /*if(web_url=="jobslah.com"){
            console.log("from own site -> ignore");
            return false;
        }*/
        
        //proceed with referral
        $http.get(ENV.rest_server+'referrer?type=job&id='+$routeParams.jobid+"&site="+web_url)
                .success(function(data){
                    //process the different headers that come back
                    console.log("referral link: success");
                })
                .error(function(data, status, headers, config) {
                        switch(status){
                            case 501:
                                console.log("referral link: failed");
                            break;
                            default:
                            break;
                        }
                });

    };
    $scope.getRef(); //testing
    
    //for checking if user is logged in
    $scope.isLoggedIn = function(){
        return $cookieStore.get("cand_token")?true:false;
    }
    $scope.hasApplied = function(){
        return $scope.jobDet.hasApplied == '1';
    }
    
    
    // Luigi Private Messaging sendMessage fn
    $scope.sendMessage = function() {
        console.log('Send a message...');
        InboxManager.getConversationId($scope.jobDet.id)
          .then(function(data) {
                    var conversation_id = data;
                    $location.path('/inbox/conversation/' + conversation_id + '/' + $scope.jobDet.id);
                },
                function(data, status) {
                    console.error('jobDetailsCtrl: Error retrieving conversation by job: ' + status);
                });
    };
    
    //Dialog for Login
    $scope.showDialogLogin = function(ev) {
        $mdDialog.show({
          controller: "LoginCtrl",
          templateUrl: ENV.base_url+'assets/zpartials/cand-login_d.html',
          parent: angular.element(document.body),
          targetEvent: ev,
        })
        .then(function(user) {
          console.log("Login for email: ");
        }, function() {
          console.log( 'After then - what is this???.');
        });
    };
  
  
    //Dialog for register
        $scope.showDialogRegister = function(ev) {
        $mdDialog.show({
          controller: "RegisterCtrl",
          templateUrl: ENV.base_url+'assets/zpartials/cand-register_d.html',
          parent: angular.element(document.body),
          targetEvent: ev,
        })
        .then(function(user) {
          //console.log("Login for email: " + user.email);
        }, function() {
          //console.log( 'After then - what is this???.');
        });
    };
    
    
    //Set favorite via the myFavorite service
    $scope.toggleFavorite = function (jobDet) {
        
        //call to toggle favorite for this job
       myFavorites.favorite(jobDet.id, jobDet.isFavorited,$scope.token )
            .then(function(data) {
                jobDet.isFavorited = data;
            },
            function(data, status) {
                console.error('Favorite: Error toggling favorite: ' + status);
            });
    };
    }
}());


// ------------- Dmitry's map 28.01.2015
(function(){
    
var map;
var geocoder;
var markers = [];
var builds = [];
var mc;

/**
* Generate unique location string for job building.
* Builds with same id will be grouped as one pin on map.
*/
function genBuildId(job) {
    return job['zip'].replace(/^\s+|\s+$/gm, ''); // trim zip
}

function getBuildAddress(job) {
    return [
    job['address']
    // job['Street'],
    //job['Town'], Bugis is not a town
    // job['Zipcode']
    ].join(', ');
}

function getBuildTitle(job) {
    // return job['Building / Mall'];
    return job['address'];
}

app.factory('jobManager', ['$q', '$http', function($q, $http) {
    // var jobsUrl = '',
    // jobs = [],
    // filter = {},
    // builds = {};

    // Group jobs into buildings. Later we will create marker
    // for every build
    var assembleBuilds = function(jobs) {
        var builds = {};

        // this function geocodes build address and returns marker
        var getMarker = function() {
            var geocoder = new google.maps.Geocoder();
            var self = this;
            var address = self['address'];
            var req = {'address': address};

            var markerTitle = function(build) {
                var title = '';
                if (build.jobs.length > 1) {
                    title += build['jobs'].length + ' jobs in ';
                } else {
                    title += build['jobs'][0]['title'] + ' job in ';
                }
                return title += build['title'];
            }

            return $q(function(resolve, reject) {
                if (self._marker) {
                    // if marker is already geocoded, return it
                    resolve(self._marker);
                    return;
                }

                if (self['jobs'][0].addr_lat) {
                    var pos = new google.maps.LatLng(self['jobs'][0].addr_lat, self['jobs'][0].addr_long);
                } else {
                    var pos = new google.maps.LatLng(self['jobs'][0].lat, self['jobs'][0].long);
                }

                var marker = new google.maps.Marker({
                    position: pos,
                    title: markerTitle(self),
                    map: map
                });

                // store ref to build inside marker
                marker.build = self;

                // cache marker
                self._marker = marker;

                resolve(marker);
            });
        }

        _.each(jobs, function(job) {
            var build_id = genBuildId(job);

            if (!(build_id in builds)) {
                builds[build_id] = {
                    'jobs': [],
                    'title': getBuildTitle(job),
                    'address': getBuildAddress(job),
                    'getMarker': getMarker,
                    '_marker': null
                };
            }

            builds[build_id]['jobs'].push(job);
        });

        return builds;
    }

    return {
        'assembleBuilds': assembleBuilds,
    }

}])
.factory('InboxManager', ['$q', '$http', '$cookieStore', 'ENV', function($q, $http, $cookieStore, ENV) {
        // Luigi Private Messaging InboxManager factory
    return {
      getMessages: function () {
        var deferred = $q.defer();
        var token = $cookieStore.get("cand_token");
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
        var token = $cookieStore.get("cand_token");
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
        var token = $cookieStore.get("cand_token");
        console.log(ENV.rest_server+'messages/reply/'+conversation_id+'?token='+token);
        $http.post(ENV.rest_server+'messages/reply/'+conversation_id+'?token='+token, { "reply": reply, "job_id": job_id })
            .success(function(data) {
                deferred.resolve(data);
             }).error(function(data, status) {
                deferred.reject(data, status);
            });
        return deferred.promise;
      },
      getConversationId: function(job_id) {
        var deferred = $q.defer();
        var token = $cookieStore.get("cand_token");
        console.log(ENV.rest_server+'messages/init?token='+token);
        $http.post(ENV.rest_server+'messages/init?token='+token, { "job_id": job_id })
            .success(function(data) {
                deferred.resolve(data);
             }).error(function(data, status) {
                deferred.reject(data, status);
            });
        return deferred.promise;
      },
      resetConversationNotify: function(conversation_id) {
        var deferred = $q.defer();
        var token = $cookieStore.get("cand_token");
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
        var token = $cookieStore.get("cand_token");
        console.log(ENV.rest_server+'messages/notifications?token='+token);
        $http.get(ENV.rest_server+'messages/notifications?token='+token)
            .success(function(data) {
                deferred.resolve(data);
             }).error(function(data, status) {
                deferred.reject(data, status);
            });
        return deferred.promise;
      }
    };
}])
.controller('JobMapCtrl', ['$scope', '$location', '$http', 'jobManager', 'mySearch', function($scope, $location, $http, jobManager, mySearch) {
    $scope.onmapJobs = [];
    $scope.mySearch = mySearch;

    $scope.jobs = [];
    $scope.builds = [];

    $scope.backendUrl = ''; // this shows query url in <pre> tag above the map


    $scope.map = {
        'all_markers': [], // all markers after filtering applied
        'bound_markers': [] // visible on map at the moment
    }

    $scope.onViewLoad = function(){
        // console.log('onviewload called');
        var opts = _.defaults($location.search(), {
            'lat': 1.3058358,
            'lng': 103.8618718,
            'zoom': 11
        });

        var mapOpts = {
            center: new google.maps.LatLng(
                mySearch.mapState.centerLat,
                mySearch.mapState.centerLong
            ),
            zoom: mySearch.mapState.zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOpts);
        mc = new MarkerClusterer(map, [], {maxZoom: 15});

        var geocoder = new google.maps.Geocoder();

        var infowindow = new google.maps.InfoWindow();
        var infowindow_tpl = _.template(document.getElementById('infowindowtemplate').innerHTML);

        $scope.geolocate = function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    $scope.$apply(function(){
                        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        map.setCenter(pos);
                        $scope.map.circle.visible = true;
                        $scope.map.circle.center = pos;
                    });
                });
            }
            return false;
        }

        // this used in previous version for search location by zip
        $scope.searchZip = function() {
            var zip = $scope.filter.zip;
            var query = {
                'address': zip,
                'region': 'SG'
            };

            geocoder.geocode(query, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var pos = results[0].geometry.location;
                    map.setCenter(pos);

                    $scope.$apply(function(){
                        $scope.map.circle.center = pos;
                        $scope.map.circle.visible = true;
                        $scope.filter.radius = 10000;
                    });
                }
            });
        }

        // Update jobs and builds when user clicks Go
        $scope.$watchCollection('mySearch.foundJobs', function(){
            // console.log('$scope.mySearch.srch changed to', sr);
            $scope.jobs = mySearch.foundJobs;
            $scope.builds = jobManager.assembleBuilds($scope.jobs);
        });

        /**
         * Set map viewport to show all markers.
         */
        var fitMarkers = function() {
            var markers = $scope.map.all_markers;
            var bounds = new google.maps.LatLngBounds();

            if (!markers.length) {
                return;
            }

            _(markers).each(function(marker){
                var pos = marker.getPosition();
                if (pos.lat() > 85 || pos.lng() < -85) {
                    // work on the north pole leads to non-working map
                    return;
                }

                bounds.extend(pos);
            });

            map.fitBounds(bounds);

            // 15 is maximum zoom - more is useless
            if (map.getZoom() > 15) {
                map.setZoom(15);
            }
        }

        /**
         * Set map viewport to show radius circle
         */
        function fitRadius() {
            var radiusCenter = $scope.mySearch.srch.radiusCenter;
            var radius = $scope.mySearch.srch.radius;
            if (radiusCenter && radius) {
                map.fitBounds(circle.getBounds());
            }
        }


        // When $scope.builds is changing, map updates one's markers
        $scope.$watchCollection('builds', function(builds){
            mc.clearMarkers();
            $scope.map.all_markers = [];

            _.each(builds, function(build, buildId){

                // and call getMarker, wich send request to google geocoder and when
                // answer is received,
                build.getMarker().then(function(marker){

                    // add this marker in mc cluster
                    mc.addMarker(marker);

                    // store in scope, because list of visible jobs listens it
                    $scope.map.all_markers.push(marker);

                    // this function called many times, but it doesn't decrease
                    // performance (for 10 markers)
                    // if it will work slow one day, use _.debounce
                    fitMarkers();
                    fitRadius(); // fit radius has more priority


                    //Array.prototype.push.apply($scope.onmapJobs, marker.build.jobs);

                    google.maps.event.addListener(marker, 'click', function(){
                        var content = infowindow_tpl({'build': build, 'buildId': buildId});

                        infowindow.close();
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    });
                });
            });
        });

        // when user change radius, show circle on map
        var circle = new google.maps.Circle({
            clickable: false,
            strokeColor: '#AA0000',
            fillOpacity: 0.05,
            strokeWeight: 1
        });
        var circleMarker = new google.maps.Marker({
            map: map,
            // position: ,
            icon: '//maps.google.com/mapfiles/ms/icons/blue-dot.png',
            title: 'radius center'
            //draggable: true
        });
        circle.bindTo('center', circleMarker, 'position');

        // init circle center
        if (mySearch.srch.radiusCenter) {
            circleMarker.setPosition(mySearch.srch.radiusCenter);
        }

        // Render circle when mySearch.srch.radius changed
        $scope.$watch('mySearch.srch.radius', function(radius){
            if (radius != '') {
                circle.setMap(map);
                circleMarker.setMap(map);
                circle.setRadius(parseInt(radius));

                // fit map
                map.fitBounds(circle.getBounds());
            } else {
                circle.setMap(null);
                circleMarker.setMap(null);
            }
        });

        $scope.$watch('mySearch.srch.radiusCenter', function(radiusCenter){
            if(radiusCenter)
                circleMarker.setPosition(mySearch.srch.radiusCenter);
        });

        // marker moves -> mySearch.radiusCenter follows
        // google.maps.event.addListener(circleMarker, 'dragend', function() {
        //     $scope.$apply(function(){
        //         mySearch.srch.radiusCenter = circleMarker.getPosition();
        //     });
        // });


        // change jobs list after map panning or zooming
        var updateMapBoundMarkers = function() {
            $scope.onmapJobs = [];
            var bounds = map.getBounds();

            // console.log('update bound markers');

            // find all markers inside map bounds
            _.each(mc.getMarkers(), function(marker) {
                if (bounds.contains(marker.getPosition())) {
                    // and push jobs from these markers in job list
                    Array.prototype.push.apply(
                        $scope.onmapJobs,
                        marker.build.jobs
                    );
                }
            });
        }

        // When map moves, $scope.map.boound_markers filtered
        google.maps.event.addListener(map, 'idle', function(){
            $scope.$apply(function(){
                updateMapBoundMarkers();
            });
        });
        $scope.$watchCollection('map.all_markers', updateMapBoundMarkers);

        // Save map view state
        google.maps.event.addListener(map, 'idle', function(){
            _(mySearch.mapState).extend({
                centerLat: map.getCenter().lat(),
                centerLong: map.getCenter().lng(),
                zoom: map.getZoom()
            });
        });
    }
}]);
}());
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){    
    'use strict';
    var app= angular.module('myApp');

    employerslandingCrtl.$inject = ['$scope', '$cookieStore', '$http', '$timeout', '$location', '$routeParams', 'ENV', 'mySession', 'Lightbox', '$sce'];

    app.controller('employerslandingCrtl', employerslandingCrtl);
    
    function employerslandingCrtl ($scope, $cookieStore, $http, $timeout,$location, $routeParams, ENV, mySession, Lightbox, $sce) {
	
    //See Youu Employer Landing page vars
    $scope.companyname = $routeParams.companyname;
    $scope.profile = {};
    $scope.landingchunk ={};
    $scope.AWS_URL = ENV.aws_url;

    // ******** For EMPLOYER LANDING page, See Youu *************
    $scope.landing = {};

    //Watch the Route Param that stores the company name, it it changes (user types in new name)
	//then retrieve new items for employer landing page, data bindings will auto update the page
    $scope.$watch('companyname', function() {
		  if($scope.companyname!=undefined){
				$http.get(ENV.rest_server+'go/companyname/' + $scope.companyname).success(function(data){
					console.log(data);
					$scope.landingchunk = data;
				});
		  }
	   });

    // Retrieves media data to display in the grid, called each time the page is loaded
    $http.get(ENV.rest_server+'go/companyname/' + $scope.companyname).success(function(data){
                    //console.log("Landing page data:");
                    //console.info(data);
                    $scope.landingchunk = data;
                    $scope.profile = data['emp_info'];
                    //prepare for referrers
                    $scope.employer_id= data['emp_id'];
                    console.log("retrieved employer's id="+$scope.employer_id);
                    $scope.getRef();
    });

    $scope.searchJobs = function(){
        if($scope.employer_id){
            $location.path("/adv/"+$scope.employer_id);
        }else{
            $location.path("/adv");
        }
    }
    //image grid lightbox
    $scope.images = [];
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
     });

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

    //get referrals
    $scope.getRef = function(){
        var web_url = document.referrer;
        if(!web_url){
            console.log("No document.referrer, proceeding as jobslah.com");
            web_url = "https://www.jobslah.com";
            //return false;
            
            //pretend to be referred from elsewhere
            //bit silly they could be surfing yahoo.com and paste the job site ... that is not a referrer...
            //web_url = "//yahoo.com/gotest";
        }
        //perform filtering, if jobslah.com drop it
        var start = web_url.indexOf("://");
        var end = web_url.indexOf("/",start+3); //if / is not found....
        if(end==-1) end = web_url.length;
        web_url = web_url.substring(start+3,end);

        /*if(web_url=="jobslah.com"){
            console.log("from own site -> ignore");
            return false;
        }*/
        
        //proceed with referral
        $http.get(ENV.rest_server+'referrer?type=page&id='+$scope.employer_id+"&site="+web_url)
                .success(function(data){
                    //process the different headers that come back
                    console.log("referral link: success");
                })
                .error(function(data, status, headers, config) {
                        switch(status){
                            case 501:
                                console.log("referral link: failed");
                            break;
                            default:
                            break;
                        }
                });
                    
        
        
    };
    //$scope.getRef();
	}
}());
// ------------------ 050115 See Youu  Controller: General Dashboard functions for employer


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
          },
    template: '<iframe allowfullscreen="" style="{{istyle}}" class="embed-responsive-item" ng-src="{{url}}"></iframe>'
  
        };
    }
}());

(function(){    
    'use strict';
    var app= angular.module('myApp');

    JobMapCtrl.$inject = ['$scope', '$http', '$location', 'jobManager', 'mySearch'];

    app.controller('JobMapCtrl', JobMapCtrl);
    
    function JobMapCtrl ($scope, $http, $location, jobManager, mySearch) {
	$scope.onmapJobs = [];
        $scope.mySearch = mySearch;

        $scope.jobs = [];
        $scope.builds = [];

        $scope.backendUrl = ''; // this shows query url in <pre> tag above the map


        $scope.map = {
            'all_markers': [], // all markers after filtering applied
            'bound_markers': [] // visible on map at the moment
        }

        $scope.onViewLoad = function(){
            // console.log('onviewload called');
            var opts = _.defaults($location.search(), {
                'lat': 1.3058358,
                'lng': 103.8618718,
                'zoom': 11
            });

            var mapOpts = {
                center: new google.maps.LatLng(
                    mySearch.mapState.centerLat,
                    mySearch.mapState.centerLong
                ),
                zoom: mySearch.mapState.zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById('map_canvas'), mapOpts);
            var mc = new MarkerClusterer(map, [], {maxZoom: 15});

            var geocoder = new google.maps.Geocoder();

            var infowindow = new google.maps.InfoWindow();
            var infowindow_tpl = _.template(document.getElementById('infowindowtemplate').innerHTML);

            $scope.geolocate = function() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position){
                        $scope.$apply(function(){
                            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                            map.setCenter(pos);
                            $scope.map.circle.visible = true;
                            $scope.map.circle.center = pos;
                        });
                    });
                }
                return false;
            }

            // this used in previous version for search location by zip
            $scope.searchZip = function() {
                var zip = $scope.filter.zip;
                var query = {
                    'address': zip,
                    'region': 'SG'
                };

                geocoder.geocode(query, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var pos = results[0].geometry.location;
                        map.setCenter(pos);

                        $scope.$apply(function(){
                            $scope.map.circle.center = pos;
                            $scope.map.circle.visible = true;
                            $scope.filter.radius = 10000;
                        });
                    }
                });
            }

            // Update jobs and builds when user clicks Go
            $scope.$watchCollection('mySearch.foundJobs', function(){
                // console.log('$scope.mySearch.srch changed to', sr);
                $scope.jobs = mySearch.foundJobs;
                $scope.builds = jobManager.assembleBuilds($scope.jobs);
            });

            /**
             * Set map viewport to show all markers.
             */
            var fitMarkers = function() {
                var markers = $scope.map.all_markers;
                var bounds = new google.maps.LatLngBounds();

                if (!markers.length) {
                    return;
                }

                _(markers).each(function(marker){
                    var pos = marker.getPosition();
                    if (pos.lat() > 85 || pos.lng() < -85) {
                        // work on the north pole leads to non-working map
                        return;
                    }

                    bounds.extend(pos);
                });

                map.fitBounds(bounds);

                // 15 is maximum zoom - more is useless
                if (map.getZoom() > 15) {
                    map.setZoom(15);
                }
            }

            /**
             * Set map viewport to show radius circle
             */
            function fitRadius() {
                var radiusCenter = $scope.mySearch.srch.radiusCenter;
                var radius = $scope.mySearch.srch.radius;
                if (radiusCenter && radius) {
                    map.fitBounds(circle.getBounds());
                }
            }


            // When $scope.builds is changing, map updates one's markers
            $scope.$watchCollection('builds', function(builds){
                mc.clearMarkers();
                $scope.map.all_markers = [];

                _.each(builds, function(build, buildId){

                    // and call getMarker, wich send request to google geocoder and when
                    // answer is received,
                    build.getMarker().then(function(marker){

                        // add this marker in mc cluster
                        mc.addMarker(marker);

                        // store in scope, because list of visible jobs listens it
                        $scope.map.all_markers.push(marker);

                        // this function called many times, but it doesn't decrease
                        // performance (for 10 markers)
                        // if it will work slow one day, use _.debounce
                        fitMarkers();
                        fitRadius(); // fit radius has more priority


                        //Array.prototype.push.apply($scope.onmapJobs, marker.build.jobs);

                        google.maps.event.addListener(marker, 'click', function(){
                            var content = infowindow_tpl({'build': build, 'buildId': buildId});

                            infowindow.close();
                            infowindow.setContent(content);
                            infowindow.open(map, marker);
                        });
                    });
                });
            });

            // when user change radius, show circle on map
            var circle = new google.maps.Circle({
                clickable: false,
                strokeColor: '#AA0000',
                fillOpacity: 0.05,
                strokeWeight: 1
            });
            var circleMarker = new google.maps.Marker({
                map: map,
                // position: ,
                icon: '//maps.google.com/mapfiles/ms/icons/blue-dot.png',
                title: 'radius center'
                //draggable: true
            });
            circle.bindTo('center', circleMarker, 'position');

            // init circle center
            if (mySearch.srch.radiusCenter) {
                circleMarker.setPosition(mySearch.srch.radiusCenter);
            }

            // Render circle when mySearch.srch.radius changed
            $scope.$watch('mySearch.srch.radius', function(radius){
                if (radius != '') {
                    circle.setMap(map);
                    circleMarker.setMap(map);
                    circle.setRadius(parseInt(radius));

                    // fit map
                    map.fitBounds(circle.getBounds());
                } else {
                    circle.setMap(null);
                    circleMarker.setMap(null);
                }
            });

            $scope.$watch('mySearch.srch.radiusCenter', function(radiusCenter){
                if(radiusCenter)
                    circleMarker.setPosition(mySearch.srch.radiusCenter);
            });

            // marker moves -> mySearch.radiusCenter follows
            // google.maps.event.addListener(circleMarker, 'dragend', function() {
            //     $scope.$apply(function(){
            //         mySearch.srch.radiusCenter = circleMarker.getPosition();
            //     });
            // });


            // change jobs list after map panning or zooming
            var updateMapBoundMarkers = function() {
                $scope.onmapJobs = [];
                var bounds = map.getBounds();
                if(bounds==null) return;
                // console.log('update bound markers');

                // find all markers inside map bounds
                _.each(mc.getMarkers(), function(marker) {
                    if (bounds.contains(marker.getPosition())) {
                        // and push jobs from these markers in job list
                        Array.prototype.push.apply(
                            $scope.onmapJobs,
                            marker.build.jobs
                        );
                    }
                });
            }

            // When map moves, $scope.map.boound_markers filtered
            google.maps.event.addListener(map, 'idle', function(){
                $scope.$apply(function(){
                    updateMapBoundMarkers();
                });
            });
            $scope.$watchCollection('map.all_markers', updateMapBoundMarkers);

            // Save map view state
            google.maps.event.addListener(map, 'idle', function(){
                _(mySearch.mapState).extend({
                    centerLat: map.getCenter().lat(),
                    centerLong: map.getCenter().lng(),
                    zoom: map.getZoom()
                });
            });
        }
        // end closure
        // ---- end of Dmitry's map
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
    var app = angular.module('myApp');

    LeftCtrl.$inject = ['$rootScope', '$scope', '$timeout', '$mdSidenav', 'mySession', '$location'];

    app.controller('LeftCtrl', LeftCtrl);
    
    function LeftCtrl ($rootScope, $scope, $timeout, $mdSidenav, mySession, $location) {
        $rootScope.name = mySession.name;
        
        $scope.close = function(url) {
             $location.path(url);
            $mdSidenav("left").close();
           //$scope.changeView(url, true);
        };
	}
}());

(function(){    
    'use strict';
    var app= angular.module('myApp');

    rightMenuCtrl.$inject = ['$http', 'ENV', '$scope', '$location', '$timeout', '$mdSidenav','mySearch','mySearchFields'];

    app.controller('rightMenuCtrl', rightMenuCtrl);
    
    function rightMenuCtrl ($http, ENV, $scope, $location, $timeout, $mdSidenav, mySearch, mySearchFields) {
	
    $scope.isearch = mySearch.srch;
    $scope.radius = '';
    $scope.zipcode = '';
    $scope.radiusDisabled = true;

    // ng-submit form handler
    $scope.submit = function() {
        // run search query, update mySearch.foundJobs
        mySearch.searchJobs();

        // and reload view
        if ($location.path().indexOf('/map') === 0) {
            $scope.changeView('/map'); // no need to reload map, because
            // map listens mySearch.foundSearch
        } else {
            // while list only get updated when searchJobs() called
            $scope.changeView('/adv', true);
        }
    }

    $scope.$watch("isearch.keyword", function (newVal, oldVal) {
        mySearch.srch.keyword = newVal;
    });

    // Enable radius search controls if zipcode filled in
    $scope.$watch('zipcode', function(zipcode) {
        zipcode = zipcode.replace(/^\s+|\s+$/gm, ''); // trim zip
        if (zipcode != '') {
            $scope.radiusDisabled = false;
        } else {
            $scope.radiusDisabled = true;
        }

        mySearch.srch.zipcode = zipcode;
    });


    $scope.setCategory = function(cat, catname) {
        mySearch.setCategory(cat, catname);
        $scope.catName = catname;
    };

    $scope.$watch('radius', function(radius) {
        mySearch.setRadius(radius);
    });

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
        $scope.zipcode = '';
    };

    // Called when user clicks "find my location zipcode"
    // This place user location zipcode in zip field
    $scope.geolocate = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                var pos = new google.maps.LatLng(position.coords.latitude,
                                                 position.coords.longitude);
                var geocoder = new google.maps.Geocoder();
                var req = {'latLng': pos};

                geocoder.geocode(req, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var address = results[0].address_components;
                        var zipcode = address[address.length - 1].long_name;
                        $scope.$apply(function(){
                            $scope.zipcode = zipcode;
                        });
                    } else {
                        // can't find zip for user location
                    }
                });
            });
        }
        //return false;
    };

    $scope.close = function() {
        $mdSidenav('right').close();
      $scope.submit();
    };
    
    //get search fields
    /*$scope.getSearchFields = function(){
        $scope.fields = {};
        $http.get(ENV.rest_server+'searchfields').success(function(data){
            console.log('getSearchFields -> sending request to server');
            $scope.fields = data;
        }).error(function(data, status){
            console.log('getSearchFields -> failed to get response');
        });
    }
    $scope.getSearchFields();*/
	}
}());

// General Dashboard functions for employer
(function(){    
    'use strict';
    var app= angular.module('myApp');

    candidateCtrl.$inject = ['$scope', '$route','$cookieStore', '$http', '$timeout', '$location', 'ENV', 'mySession', '$mdSidenav', '$mdDialog'];

    app.controller('candidateCtrl', candidateCtrl);
    
    function candidateCtrl ($scope, $route, $cookieStore, $http, $timeout,$location, ENV, mySession, $mdSidenav, $mdDialog) {
	
    // Luigi Inbox notifications
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

    $scope.token = $cookieStore.get('cand_token');
    $scope.name = $cookieStore.get('name');
    $scope.profile = {};
	$scope.AWS_URL = ENV.aws_url;


    $scope.loggedIn = mySession.loggedIn();
    //console.log('mySession says: '+$scope.loggedIn);


    //Listen for any emits (broadcasts from child controllers) on login status
    $scope.$on('loginout', function () {
        //check to see if the user is logged in or out
        $scope.loggedIn = mySession.loggedIn();
        //20150205
        $scope.name = mySession.name;
    });

 /*   if ($scope.token == undefined) {
        // If user is not signed in, enable the sign in link
        $scope.loggedIn = false;

    } else {
        // If user is signed in, enable the signout link
        console.log("User is logged in");
        $scope.loggedIn = true;

    } */

    //console.log("Retriving for token: " + $scope.token);
/*
    $scope.showLoading = true;
    //$http.get(ENV.rest_server+'jobs?token=' + $scope.token).success(function(data) {
    //Get

    $http.get(ENV.rest_server+'jobs?token=' + $scope.token).success(function(data) {
        //JMR dumpt ot console
        console.log("employersCtrl - Success, token valid, Data returned: " + data);
        $scope.jobs = data;
        $scope.showLoading = false;
    }).error(function(data, status) {
            console.log("employersCtrl: Error getting Jobs Data: "+status);
            $scope.changeView("/login");
        });
*/

    //Removed database call and instead getting from json file
    //$http.get('ajax/getCustomers.php').success(function(data){
 /*   $http.get(ENV.base_url+'assets/employerlist.json').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 10; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter
        $scope.totalItems = $scope.list.length;
    });
 */

// FILTERING *******************
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

    // END FILTERING ****************

//Added this here since it's sort of the global area
    $scope.goBack = function() {
        window.history.back();
    };
    
    $scope.changeView = function(view, forceReload){
        console.log('candidateCtrl.changeView passed:', view);

        if ($location.path() != view) {
            $location.path(view); // path not hash
        } else if (forceReload) {
            // this used when user modifies search in right menu, clicks Go
            // and we need to reexecute List tab view
            console.info('reloading route');
            $route.reload();
        }
    };

    $scope.logout = function() {
        $cookieStore.remove('cand_token');
        $cookieStore.remove('cand_token');
        $cookieStore.remove('name');
        mySession.name = "";
        $scope.name = "";
        $scope.token = null;
        $scope.token = false;
$scope.notifications = 0;
        console.log("Logging out... ");
        console.log("Cookie should be empty: " + $cookieStore.get("cand_token"));
        //Let the service confirm that user is logged out
      $scope.loggedIn = mySession.loggedIn();
        //window.location.href = jlglobals.base_url+"employers/";
        $location.path('/login');
        return false;
    };

    //JMR used to check if div contents/menus should be rendered, used to determine if user is logged in for those relevant functions
    $scope.isCandidate  = function() {
        return mySession.loggedIn();
    };


    $scope.back = function() {
        $window.history.back();
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
    //Get candidate's list of job favorites
    //Join jobs x favorites tables


    //Get candidate's list of job Applications
    //join jobs x applications table


	}
}());


(function(){    
    'use strict';
    var app= angular.module('myApp');

    candidateDashMainCtrl.$inject = ['$scope', '$http', '$cookieStore', 'ENV','$location'];

    app.controller('candidateDashMainCtrl', candidateDashMainCtrl);
    
    function candidateDashMainCtrl ($scope, $http, $cookieStore, ENV, $location) {
	
        //$scope.token = $cookieStore.get('token');

        $scope.token = $cookieStore.get('cand_token');
        if ($scope.token !== undefined)
                {
                //Retrieve list of jobs related to the employer
                $tokenStr = 'jobs?token=' + $scope.token;
        } else {
                $tokenStr = 'jobs';
                //JMR If not logged in either login or switch to guest view
                $scope.changeView("/login");
        }

        $scope.showLoading = true;
        console.log("candidateDashMainCtrl: Getting jobs for candidate token " + $scope.token);
        $http.get(ENV.rest_server + $tokenStr).success(function(data) {
            $scope.jobs = data;
            $scope.showLoading = false;
            console.log("candidateDashMainCtrl - Success, token valid, Data returned: " + data);
        }).error(function(data, status) {
            console.log("candidateDashMainCtrl: Error getting Jobs Data: "+status);
            $scope.changeView("/login");
        });

/*        $scope.logout = function() {
            $cookieStore.remove('employer_token');
            $scope.token = false;

            console.log("Logging out ");
            console.log($cookieStore.get("employer_token"));

            //window.location.href = jlglobals.base_url+"employers/";
            $location.path('/login');
            return false;
        };
        */
	}
}());

//Candidate Profile
// incorporated See Youu's availability here

(function(){    
    'use strict';
    var app= angular.module('myApp');

    candidateProfileCrtl.$inject = ['$scope', '$http', '$timeout', '$location', '$cookieStore', 'ENV', 'FileUploader'];

    app.controller('candidateProfileCrtl', candidateProfileCrtl);
    
    function candidateProfileCrtl ($scope, $http, $timeout,$location, $cookieStore, ENV, FileUploader) {
	    // Constructor portion
$scope.avails = {};
    $scope.token = $cookieStore.get('cand_token');
    $scope.showLoading = true;
	$scope.AWS_URL = ENV.aws_url;
        $scope.AWS_DOC = "https://" + "<?=AWS_RESUME_BUCKET?>" +".s3.amazonaws.com/"; 
	$scope.profile={};
	//start resume upload js
	var uploader1 = $scope.uploader1 = new FileUploader({
            url: 'candidates/uploadresume'
        });
    // FILTERS

        uploader1.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader1.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader1.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader1.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader1.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader1.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader1.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader1.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader1.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader1.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader1.onCompleteItem = function(fileItem, response, status, headers) {
		$scope.profile.resumeurl = response.success;
                $scope.profile.resumename = response.filename;
		alert("resume uploaded successully, click save to confirm");
            console.log("telll me response leh:" + response.success);
        };
        uploader1.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
//end resume upload js

    $http.get(ENV.rest_server+'candidates?token=' + $scope.token).success(function(data, status) {
        if (status < 400) {
            $scope.profile = data[0];
            $scope.profile.feedback=data.feedback;
            console.log('Retrieved User profile info: ');
            console.info(data);
$scope.showLoading = false;

//Scope problems with ng-repeat and setting checkboxes
$scope.avail_m = {};
$scope.avail_a = {};
$scope.avail_e = {};

            //JMR 20141121 Since profile data was retreived, now get the availability data *Note, saves are done by section
               $http.get(ENV.rest_server + 'availability?token=' + $scope.token).success(function(data) {
                            $scope.avails = data;
console.info(data);
/*console.log("setting avail DATA");
$scope.avail_m = data[0];
$scope.avail_a = data[1];
$scope.avail_e = data[2];
console.info($scope.avail_m);
console.info($scope.avail_a);
console.info($scope.avail_e);
console.log('Sunday evening: ' + $scope.avail_e['sunday']);
        

$scope.avails[0].tuesday = "1";
$scope.avails[0].wednesday = "1";
$scope.avails[0].monday = "1";
console.log('avails[0].tuesday is: ');
console.info($scope.avails[0]);
*/
                        });
            } else { 
                //user is unauthroized either becasue token expired or they do not have the correct user role.
                $location.path('/login');
            }
            console.log("candidateProfileCrtl returned: ");
            console.info(data);
            
            }).error(function(data, status) {
                       // called asynchronously if an error occurs
                       // or server returns response with an error status.
                       
                       $location.path('/login');
                }); //END http
        $scope.showLoading = false;
    // END Constructor
        
	//added for file upload--seeyouu
    $scope.uploader = {
      controllerFn: function ($flow, $file, $message) {
        console.log($flow, $file, $message); // Note, you have to JSON.parse message yourself.
        $scope.uploadermessage = angular.fromJson($message);
		$scope.profile.imageurl = $scope.uploadermessage.success;
      }
    };
    //Submit changes to profile
     $scope.submitEdits = function(profile) {
	  $scope.showPwdError=0;
         //this is the candidate profile info except the availability, which is saved separately
         console.log('candidateProfileCrtl: submitting this citizen_pr PUT: '+profile.is_citizen_pr);
         //Set the token value
         profile.token = $scope.token;
         console.info(profile);
         $http({url: ENV.rest_server + 'candidates?token=' + $scope.token,
			method: 'PUT',
			data: profile,
			headers: {'Content-Type': 'application/json; charset=UTF-8'}
			}).
            success(function(data, status) {

				//Show msg reset form
                                $scope.showMsg1 = '1';
				$scope.profileForm.$setPristine();
				$scope.profileFormDetails.$setPristine();
				$scope.profileFormAcct.$setPristine();
					if(data.msg=="passwordupdated"){
						alert("Password changed");
					}else if(data.msg=="emailupdated"){
						alert("Email change request is accepted, please check your email inbox for verification email. Also, please logout and log back in.");
					}else{
                                        alert("Record saved!");
                                    }
                         console.log('candidateProfileCrtl: edited profile successfully');
                }).error(function(data, status) {
                       // called asynchronously if an error occurs
                       // or server returns response with an error status.
                       console.log("ERROR SAVING");
                       console.info(data);
                       if(data.msg=="wrongpassword")
                       {
			$scope.showPwdError = 1;
                        alert("saving failed due to wrong password");
			}else if(data.msg=="invalidic"){
                            alert("Saving failed due to invalid IC");
			}else{
                            alert("Unexpected error occurred");
                        }
                       console.log("candidateProfileCrtl: Error editing profile" + status);
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
	$scope.gete = function(day){
            //console.log("value of day is: " + day + '   ' +$scope.avails[2][day]);
            //return $scope.avails[2][day];
            
        };
    
    
    
    $scope.checkboxclick=function(){
         $scope.availForm.$setDirty();
         //console.log("Checkbox clicked, OLD val AVAIL: "); // + avail + ' ' + day + ' '+mae);
         //console.info($scope.avails);
         //console.info($parent.avail);
         /*switch(mae) {
             case "0":
            case 0:
                console.log("BEFORE");
                console.info(avail);
                //$scope.avail_m[day] = ($scope.avail_m[day] = "1"?"0":"1");
                //avail = $scope.avail_m[day];
                avail = (avail == ("1"||1)?"0":"1");
                //avail = (avail == "0"||0?"1":"0");
                 console.log("AFTER");
                console.info(avail);
                break;
            case "1":
            case 1:
                $scope.avail_a[day] = ($scope.avail_a[day] = "1"?"0":"1");
                avail = $scope.avail_a[day];
                break;
            case "2":
                case 2:
                $scope.avail_e[day] = ($scope.avail_e[day] = "1"?"0":"1");
                avail = $scope.avail_e[day];
                break;
            default:
               
                console.log("Avail error: " + avail); 
            };
            
         //avail = (avail == "1"?"0":"1");
         console.log("Checkbox clicked, New val AVAIL: " + avail);
         */
    };
    
    //Updates availability info in the DB for the candidate
    $scope.updatecal = function(prof)
    {

        console.log("candidateProfileCrtl -> updateCal with following info: ");
            console.info(prof);

        //angular.forEach(avails,function(putdata,index){
        //   console.log(putdata);
        //console.log("Sending PUT data: ")
        //console.info(avails);
        $http({url: ENV.rest_server + 'availability?token=' + $scope.token,
			method: 'PUT',
			data: prof,
			headers: {'Content-Type': 'application/json; charset=UTF-8'}
			}).success(function(data, status, headers, config){
            console.log("Returned From PUT, contents: ");
			console.info(data);
            //console.log(status);

            //$scope.avails=avails;

            if(status === 200)
            {
				$scope.avails=data;
                                $scope.avails.saved = 1;
				$("#message").text("updated successfully");
              
                        //show saved message and reset form to pristine state

                        $scope.availForm.$setPristine();
            }else{
				
            console.log('bad');
			}
        });
    };  // END updatecal ***********
    
    //sendRequest: to send email to request for feedback
    $scope.sendRequest = function(profile){
        $http.post(ENV.rest_server+'candidates/feedbackreq?token=' + $scope.token, profile).success(function(data,status) {
            if(status==200){
                alert("feed back request sent!");
            }
        }).error(function(data){
            alert("login session expired");
            $location.path("/login");
        });
    };
    
    $scope.togglePublish= function(feedbackid, clickEvent){
         $http.get(ENV.rest_server+'candidates/feedbacktoggle?token=' + $scope.token+"&feedbackId=" +feedbackid).success(function(data,status) {
            if(status==200){
                if(data.publish==1){
                    alert("published!");
                }else{
                    alert("unpunblished");
                }
                var i=0;
                angular.forEach($scope.profile.feedback, function(fb)
                {
                    if(fb.id==feedbackid){$scope.profile.feedback[i].publish=data.publish;}
                    i++;
                });
            }
        }).error(function(data){
            alert("login session expired");
            $location.path("/login");
        });
    };
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

    quizCtrl.$inject = ['$scope', '$cookieStore', '$http', 'ENV', '$route'];

    app.controller('quizCtrl', quizCtrl);
    
    function quizCtrl ($scope, $cookieStore, $http, ENV, $route) {


        $scope.qnNo = 0; //1
        $scope.questionset = null;
        $scope.answerset = {};
        $scope.score = null;

        $scope.token = $cookieStore.get('cand_token');
        if ($scope.token !== undefined){}
        else {
            //user not logged in, ask user to log in.
        }


        $scope.getQuiz = function(){
            //replaced
            /*$http.get(ENV.rest_server+'quiz/start?token='+$scope.token).
            success(function(data, status, headers, config) {
                console.log("quizCtrl: success with status" + status);

                            //check if it's a score or question
                            switch(data["mode"]){
                                    case "score":
                                            $scope.score = data["data"];
                                    break;
                                    case "question":
                                            $scope.questionset = data["data"];
                                    break;
                            }
            }).error(function(data, status, headers, config) {
                console.log("quizCtrl: failed with status " + status);
            });*/
            $http.get(ENV.rest_server+'quiz/random?token='+$scope.token).
            success(function(data, status, headers, config) {
                //console.log("quizCtrl: success with status" + status);
                //$scope.questionset = data["data"];
                //convert object into array first
                var question_arr = [];
                for(var key in data["data"]){
                    var question = data["data"][key];
                    question_arr.push(question);
                }
                $scope.questionset = question_arr;
                $scope.qnNo = 0;
                $scope.total_qns = $scope.questionset.length;
                //console.log("Total # of questions: " + $scope.questionset.length);
                //console.info($scope.questionset);
            }).error(function(data, status, headers, config) {
                console.log("quizCtrl: failed with status " + status);
            });
        }
        //$scope.getQuiz();

        $http.get(ENV.rest_server+'quiz/score?token='+$scope.token).
            success(function(data, status, headers, config) {
                $scope.score = data["data"];
                if($scope.score.length<=0) $scope.getQuiz();
            }).error(function(data, status, headers, config) {
                console.log("quizCtrl: failed with status " + status);
            });

        $scope.getPercentage = function(result){
            var total = parseInt(result.score)+parseInt(result.neg_score);
            return Math.round((result.score/total)*100);
        }
        $scope.selectAns = function(qid, aid){
            //var ans = $scope.questionset[ansindex]; //selected answer based on index
            $scope.answerset[qid] = aid;
            console.log("QID:"+qid+" AID:"+aid);
            //console.log(ans.child_qid);
            /*if(ans.child_qid=="0"){
                //submit request to server
                console.log("quizCtrl -> selectAns -> Submitting answers");
                $scope.submitAnswers();
            }else{
                //get next question
                console.log("quizCtrl -> selectAns -> get next qn");
                $scope.getNextQuestion(qid,ans.child_qid);
            }*/

            if(++$scope.qnNo>=$scope.questionset.length){
                //submit
                $scope.submitAnswers();
            }else{
                //next

            }
        };

        $scope.getNextQuestion = function(qid,cqid){
            //requires questionid and child question id, can perform checks on server side to make sure the sequence is intact and not manipulated with
            $http.get(ENV.rest_server+'quiz/next?token='+$scope.token+"&qid="+qid+"&cqid="+cqid).
            success(function(data, status, headers, config) {
                console.log("quizCtrl -> getNextQuestion: success with status" + status);
                $scope.questionset = data;
                $scope.qnNo++;
            }).error(function(data, status, headers, config) {
                console.log("quizCtrl -> getNextQuestion: failed with status " + status);
            });
        };

        $scope.submitAnswers = function(){
            $http.get(ENV.rest_server+'quiz/submit?token='+$scope.token+'&answers='+JSON.stringify($scope.answerset)).
            success(function(data, status, headers, config) {
                console.log("quizCtrl -> submitAnswers: success with status" + status + " and data: "+data);
                //show complete!
                $scope.showSimpleDialog("Done!","You're finished, checkout your results!");

                //alert("Complete quiz!");
                            $route.reload();
            }).error(function(data, status, headers, config) {
                console.log("quizCtrl -> submitAnswers: failed with status " + status + " and data: "+data);
                            $route.reload();
            });
        };



	}
}());

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



/* NOT USED
// Change to candidate job application
app.controller('candidateDashApplyJobCtrl', ['$scope', '$http', '$cookieStore', '$location', 'ENV', function($scope, $http, $cookieStore, $location, ENV) {

        //Constructor
        $scope.showLoading = true;

        //Get Countries list
        $http.get(ENV.rest_server+'countries').success(function(data) {
            $scope.countries = data;
            $scope.showLoading = false;

        });
        // END Constructor

        $scope.getGeoCode = function(zip, country_id)
        {
            console.log('country id = '+ country_id);
            var selectedCountry = $scope.countries.filter(function(el){
               return (el.id===country_id);
            });
            selectedCountry = selectedCountry[0];
            console.log("selected Country");
            console.log(selectedCountry);
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+selectedCountry.name+'+ '+zip).success(function(data) {
                console.log(data);
                $scope.job.lat = data.results[0].geometry.location.lat;
                $scope.job.long = data.results[0].geometry.location.lng;
                console.log("lat = "+ $scope.job.lat);
                console.log("long = "+ $scope.job.long);
            });

        };

        // Creates a job Fn
        $scope.createJob = function(job, clickEvent)
        {
            console.log(job);
            console.log(clickEvent.target);
            $(clickEvent.target).button("loading");
            $scope.token = $cookieStore.get('cand_token');

            //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            $http.post(ENV.rest_server+'jobs?token=' + $scope.token, job).
                    success(function(data, status, headers, config) {
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
        };

    }]);  //*************************************
*/

// See Youu Availability ***********************************************
// JMR was moved to CandProfileCtrl ------------
/*
app.controller('availabilityCtrl', ['$scope', '$http', '$cookieStore', '$location', '$timeout', 'ENV', function($scope, $http, $cookieStore, $location, $timeout,ENV) {


$scope.avails = {};

    $http.get(ENV.rest_server + 'availability?token=' + $scope.token).success(function(data) {
          $scope.avails = data;
          //console.log("availabilityCtrl returned: " + data[0].toString());
          //console.info(data);
    });


    $scope.test = function(prof) {
        /*angular.forEach(avails,function(data,index){
                console.log(data.time);
            }); */

        //$scope.what = {"name": "yoyo", "age":"22"};
        //console.log($scope.what);
 /*       console.log(avails[1]);
        console.log(avails[2]);
    };

    //JMR 20141202  Moved to candidateProfileCtrl
    $scope.updatecal = function(prof)
    {

        console.log("availabilityCtrl -> updateCal");

        //angular.forEach(avails,function(putdata,index){
        //   console.log(putdata);
        //console.log("Sending PUT data: ")
        //console.info(avails);
        $http({url: ENV.rest_server + 'availability?token=' + $scope.token,
			method: 'PUT',
			data: prof,
			headers: {'Content-Type': 'application/json; charset=UTF-8'}
			}).success(function(data, status, headers, config){
            console.log("Returned From PUT, contents: ");
			console.info(data);
            //console.log(status);

            //$scope.avails=avails;

            if(status === 200)
            {
				$scope.avails=data;
                                $scope.avails.saved = 1;
				$("#message").text("updated successfully");
             
            console.log('good');
            }else{
				
            console.log('bad');
			}
        }); 

       // }); // END forEach loop
    };  // END updatecal ***********

}]); */


