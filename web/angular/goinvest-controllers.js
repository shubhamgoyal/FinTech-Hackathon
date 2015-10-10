app.controller('pageCtrl', ['$scope', '$http', '$cookieStore', '$location', 'ENV','myInput', function ($scope, $http, $cookieStore, $location, ENV, myInput) {
}]);
app.controller('landingCtrl', ['$scope', '$http', '$cookieStore', '$location', 'ENV','myInput', '$locale', function ($scope, $http, $cookieStore, $location, ENV, myInput,$locale) {
	$locale.NUMBER_FORMATS.CURRENCY_SYM =""; //no need to show currency symbol inside input field
	$scope.EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
	$scope.user.type = "bal"; //user type options: cons, modcons, bal, modag, agg
	$scope.user.typelabel ="Balance";
	$scope.labels = [];
	$scope.series = ['Fixed Deposit', 'Low Fees', 'High Fees'];
	$scope.data = [];
	$scope.linecolor = ['#0101DF', '#40FF00','#DF0101'];
	$scope.user.yearly=0;
	$scope.user.yeargap = 0;

	$scope.doglabels = ["Domestic equity", "Foreign equity", 
	"Foreign high dividend yield equity", "Foreign high-yield bonds", 
	"Domestic investment-grade bonds"];
	$scope.dogdata = [0.45, 0.32, 0.13, 0.03,0.07];
	$scope.dogcolor = ['#0101B2','#0101DF','#00aae4','#FF6600','#FFA319'];//FF6600'#3434E5'
	$scope.finalValue=0;
	$scope.diffValue =0;
	//redirect to landing page if $scope.user is null:
	if($scope.user.age==undefined||$scope.user.age==""){
		$location.path("/index");
	}
	//validation function: 
	$scope.validation = function(user){
		if(user.age==undefined||user.age==""){
			alert("Age cannot be empty!");
			return false;
		}else if(user.age<18){
			alert("You must be at least 18 years old!");
			return false;
		}else if(user.age>$scope.user.retire){
			$scope.user.retire = user.age;
			if(user.money==undefined||user.money==""||user.money==0){
				alert("Investment amount cannot be empty!");
				return false;
			}else{
				//no need to set age gap as this case should be 0;
				return true;
			}
		}else if(user.money==undefined||user.money==""||user.money==0){
			alert("Investment amount cannot be empty!");
			return false;
		}else if(user.money<=0){
			alert("invalid amount to invest");
			return false;
		}
		//set age gap if validation all passed
		$scope.user.yeargap = parseInt($scope.user.retire) - parseInt($scope.user.age);
		return true;
	}
	
	for(var i= parseInt($scope.user.age); i<(parseInt($scope.user.retire)+5);i=i+5){
		$scope.labels.push(i);
	}
	//initial value for charts:
	$scope.user.yeargap = parseInt($scope.user.retire) - parseInt($scope.user.age);
	$scope.data = [];
	$scope.dogdata =[];
	var maxEquity = 0.0;
	var bondPercent = 0.15;
	var equityPercent = 1-bondPercent;
	if(parseInt($scope.user.age)>=20&&parseInt($scope.user.age)<25){
		bondPercent = 0.20;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=25&&parseInt($scope.user.age)<30){
		bondPercent = 0.25;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=30&&parseInt($scope.user.age)<35){
		bondPercent = 0.30;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=35&&parseInt($scope.user.age)<40){
		bondPercent = 0.35;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=40&&parseInt($scope.user.age)<45){
		bondPercent = 0.40;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=45&&parseInt($scope.user.age)<50){
		bondPercent = 0.45;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=50&&parseInt($scope.user.age)<55){
		bondPercent = 0.50;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=55&&parseInt($scope.user.age)<60){
		bondPercent = 0.55;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=60&&parseInt($scope.user.age)<65){
		bondPercent = 0.60;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=65&&parseInt($scope.user.age)<70){
		bondPercent = 0.65;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=70&&parseInt($scope.user.age)<75){
		bondPercent = 0.70;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=75&&parseInt($scope.user.age)<80){
		bondPercent = 0.75;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=80&&parseInt($scope.user.age)<85){
		bondPercent = 0.80;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=85&&parseInt($scope.user.age)<90){
		bondPercent = 0.85;
		equityPercent = 1-bondPercent;
	}else if(parseInt($scope.user.age)>=90){
		bondPercent = 0.90;
		equityPercent = 1-bondPercent;
	}
	if($scope.user.yeargap>=15)
	{	
		maxEquity= 0.9;
	}else if($scope.user.yeargap<15&&$scope.user.yeargap>=11)
	{
		maxEquity = 0.8;
	}else if($scope.user.yeargap<11&&$scope.user.yeargap>=4)
	{
		maxEquity = ($scope.user.yeargap-3)/10;
	}else if($scope.user.yeargap<4)
	{
		maxEquity = 0.0;
	}
	if(equityPercent>maxEquity){
			equityPercent = maxEquity;
			bondPercent = 1- equityPercent;
		}
	$scope.dogdata=[parseInt(0.45*equityPercent/0.9*parseInt($scope.user.money)), 
						parseInt(0.32*equityPercent/0.9*parseInt($scope.user.money)), 
						parseInt(0.13*equityPercent/0.9*parseInt($scope.user.money)), 
						parseInt(0.03*bondPercent*10*parseInt($scope.user.money)),
						parseInt(0.07*bondPercent*10*parseInt($scope.user.money))];
			
			
			for(var i=0; i<3; i++){ //loop 1: base line; loop 2: high fee; loop 3: low fee
				var linerate = 1.0062; //for base line
				//money is going to be combination of 5 assets:
				var tmpYearly = [(0.45*equityPercent/0.9*parseInt($scope.user.yearly)).toFixed(2), 
						(0.32*equityPercent/0.9*parseInt($scope.user.yearly)).toFixed(2), 
						(0.13*equityPercent/0.9*parseInt($scope.user.yearly)).toFixed(2), 
						(0.03*bondPercent*10*parseInt($scope.user.yearly)).toFixed(2),
						(0.07*bondPercent*10*parseInt($scope.user.yearly)).toFixed(2)];
				//every line should start at the same point
				var tmpDoug = [(0.45*equityPercent/0.9*parseInt($scope.user.money)).toFixed(2), 
						(0.32*equityPercent/0.9*parseInt($scope.user.money)).toFixed(2), 
						(0.13*equityPercent/0.9*parseInt($scope.user.money)).toFixed(2), 
						(0.03*bondPercent*10*parseInt($scope.user.money)).toFixed(2),
						(0.07*bondPercent*10*parseInt($scope.user.money)).toFixed(2)];
						
				//set for high fee adjustment and low fee adjustment
				if(i==1){linerate = 0.004;}else if(i==2){linerate = 0.02;}
				var tmpArr =[parseInt(parseFloat(tmpDoug[0])+parseFloat(tmpDoug[1])+parseFloat(tmpDoug[2])+parseFloat(tmpDoug[3])+parseFloat(tmpDoug[4]))]; 
				if(i==0){
					tmpArr = [$scope.user.money];
				}

				angular.forEach($scope.labels, function(value, key)
				{	if(i==0){
						if(key!=($scope.labels.length-1))
						{	var tmpmoney = parseInt(tmpArr[tmpArr.length-1]);
							for(var k=0; k<5;k++)
							{
								tmpmoney *= linerate;
							}
							tmpArr.push(parseInt(tmpmoney));
						}
					}else{
						//apply annual returns as 0.45, 0.32, 0.13, 0.03,0.07 respectively
						for(var k=0; k<5;k++)
						{
							tmpDoug[0] = parseFloat((parseFloat(tmpDoug[0])+parseFloat(tmpYearly[0]))*(1.1466-linerate));
							tmpDoug[1] = parseFloat((parseFloat(tmpDoug[1])+parseFloat(tmpYearly[1]))*(1.0725-linerate));
							tmpDoug[2] = parseFloat((parseFloat(tmpDoug[2])+parseFloat(tmpYearly[2]))*(1.0269-linerate));
							tmpDoug[3] = parseFloat((parseFloat(tmpDoug[3])+parseFloat(tmpYearly[3]))*(1.0921-linerate));
							tmpDoug[4] = parseFloat((parseFloat(tmpDoug[4])+parseFloat(tmpYearly[4]))*(1.0248-linerate));
							
						}
						
						if(key!=($scope.labels.length-1)){
							tmpArr.push(parseInt(parseInt(tmpDoug[0])+parseInt(tmpDoug[1])+parseInt(tmpDoug[2])+parseInt(tmpDoug[3])+parseInt(tmpDoug[4])));
						}
						console.log("check tmpArr " + tmpArr);
					}
					//console.log("tmpArr: "+tmpArr);
				}, tmpArr);
				$scope.data.push(tmpArr);
			}
			console.log(bondPercent);
			var indexlow=$scope.data[1].length-1;
			var indexhigh = $scope.data[2].length-1;
			$scope.finalValue = parseInt($scope.data[1][indexlow]);
			$scope.diffValue = parseInt($scope.data[1][indexlow]-$scope.data[2][indexhigh]);
		

	$scope.refreshChart = function(lbl){
		$scope.data = [];
		$scope.dogdata =[];
		var maxEquity = 0.0;
		var bondPercent = 0.15;
		var equityPercent = 1-bondPercent;
		if($scope.user.retire<$scope.user.age){
			alert("Your retirement age is reset to current age.Please amend retirement age as it is earlier than current age");
		}
		if($scope.validation($scope.user)){
			if(lbl){
				$scope.labels = [];
				for(var i= parseInt($scope.user.age); i<(parseInt($scope.user.retire)+5);i=i+5){
					$scope.labels.push(i);
				}
			}

			if(parseInt($scope.user.age)>=20&&parseInt($scope.user.age)<25){
				bondPercent = 0.20;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=25&&parseInt($scope.user.age)<30){
				bondPercent = 0.25;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=30&&parseInt($scope.user.age)<35){
				bondPercent = 0.30;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=35&&parseInt($scope.user.age)<40){
				bondPercent = 0.35;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=40&&parseInt($scope.user.age)<45){
				bondPercent = 0.40;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=45&&parseInt($scope.user.age)<50){
				bondPercent = 0.45;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=50&&parseInt($scope.user.age)<55){
				bondPercent = 0.50;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=55&&parseInt($scope.user.age)<60){
				bondPercent = 0.55;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=60&&parseInt($scope.user.age)<65){
				bondPercent = 0.60;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=65&&parseInt($scope.user.age)<70){
				bondPercent = 0.65;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=70&&parseInt($scope.user.age)<75){
				bondPercent = 0.70;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=75&&parseInt($scope.user.age)<80){
				bondPercent = 0.75;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=80&&parseInt($scope.user.age)<85){
				bondPercent = 0.80;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=85&&parseInt($scope.user.age)<90){
				bondPercent = 0.85;
				equityPercent = 1-bondPercent;
			}else if(parseInt($scope.user.age)>=90){
				bondPercent = 0.90;
				equityPercent = 1-bondPercent;
			}
			
			console.log($scope.user.type+"labels length:"+ $scope.labels.length);
			switch($scope.user.type){
				case "cons":
					if(equityPercent>0.3){
						equityPercent=equityPercent-0.2;
						bondPercent=1-equityPercent
					}else{
						bondPercent=0.9;
						equityPercent=0.1;
					}
					if($scope.user.yeargap>=15)
					{
						maxEquity= 0.9;
					}else if($scope.user.yeargap<15&&$scope.user.yeargap>=11)
					{
						maxEquity = 0.8;
					}else if($scope.user.yeargap<11&&$scope.user.yeargap>=4)
					{
						maxEquity = ($scope.user.yeargap-3)/10;
					}else if($scope.user.yeargap<4)
					{
						maxEquity = 0.0;
					}
					if(equityPercent>maxEquity){
							equityPercent = maxEquity;
							bondPercent = 1- equityPercent;
						}
					break;
				case "modcons":
					if(equityPercent>0.2){
						equityPercent=equityPercent-0.1;
						bondPercent=1-equityPercent
					}else{
						bondPercent=0.9;
						equityPercent=0.1;
					}
					if($scope.user.yeargap>=15)
					{	
						maxEquity= 0.9;
					}else if($scope.user.yeargap<15&&$scope.user.yeargap>=11)
					{
						maxEquity = 0.8;
					}else if($scope.user.yeargap<11&&$scope.user.yeargap>=4)
					{
						maxEquity = ($scope.user.yeargap-3)/10;
					}else if($scope.user.yeargap<4)
					{
						maxEquity = 0.0;
					}
					if(equityPercent>maxEquity){
							equityPercent = maxEquity;
							bondPercent = 1- equityPercent;
						}

					break;
				case "bal":
					
					if($scope.user.yeargap>=15)
					{	
						maxEquity= 0.9;
					}else if($scope.user.yeargap<15&&$scope.user.yeargap>=11)
					{
						maxEquity = 0.8;
					}else if($scope.user.yeargap<11&&$scope.user.yeargap>=4)
					{
						maxEquity = ($scope.user.yeargap-3)/10;
					}else if($scope.user.yeargap<4)
					{
						maxEquity = 0.0;
					}
					if(equityPercent>maxEquity){
							equityPercent = maxEquity;
							bondPercent = 1- equityPercent;
						}

					break;
				case "modag":
					if(bondPercent>0.2){
						bondPercent=bondPercent-0.1;
						equityPercent=1-bondPercent
					}else{
						bondPercent=0.1;
						equityPercent=0.9;
					}
					if($scope.user.yeargap>=15)
					{	
						maxEquity= 0.9;
					}else if($scope.user.yeargap<15&&$scope.user.yeargap>=11)
					{
						maxEquity = 0.8;
					}else if($scope.user.yeargap<11&&$scope.user.yeargap>=4)
					{
						maxEquity = ($scope.user.yeargap-3)/10;
					}else if($scope.user.yeargap<4)
					{
						maxEquity = 0.0;
					}
					if(equityPercent>maxEquity){
							equityPercent = maxEquity;
							bondPercent = 1- equityPercent;
						}
					
					break;
				case "agg":
					if(bondPercent>0.3){
						bondPercent=bondPercent-0.2;
						equityPercent=1-bondPercent
					}else{
						bondPercent=0.1;
						equityPercent=0.9;
					}
					if($scope.user.yeargap>=15)
					{	
						maxEquity= 0.9;
					}else if($scope.user.yeargap<15&&$scope.user.yeargap>=11)
					{
						maxEquity = 0.8;
					}else if($scope.user.yeargap<11&&$scope.user.yeargap>=4)
					{
						maxEquity = ($scope.user.yeargap-3)/10;
					}else if($scope.user.yeargap<4)
					{
						maxEquity = 0.0;
					}
					if(equityPercent>maxEquity){
							equityPercent = maxEquity;
							bondPercent = 1- equityPercent;
						}
					
					break;
			}

			$scope.dogdata=[parseInt(0.45*equityPercent/0.9*parseInt($scope.user.money)), 
						parseInt(0.32*equityPercent/0.9*parseInt($scope.user.money)), 
						parseInt(0.13*equityPercent/0.9*parseInt($scope.user.money)), 
						parseInt(0.03*bondPercent*10*parseInt($scope.user.money)),
						parseInt(0.07*bondPercent*10*parseInt($scope.user.money))];
			
			
			for(var i=0; i<3; i++){ //loop 1: base line; loop 2: high fee; loop 3: low fee
				var linerate = 1.0062; //for base line
				//money is going to be combination of 5 assets:
				var tmpYearly = [(0.45*equityPercent/0.9*parseInt($scope.user.yearly)), 
						(0.32*equityPercent/0.9*parseInt($scope.user.yearly)), 
						(0.13*equityPercent/0.9*parseInt($scope.user.yearly)), 
						(0.03*bondPercent*10*parseInt($scope.user.yearly)),
						(0.07*bondPercent*10*parseInt($scope.user.yearly))];
				//every line should start at the same point
				var tmpDoug = [(0.45*equityPercent/0.9*parseInt($scope.user.money)), 
						(0.32*equityPercent/0.9*parseInt($scope.user.money)), 
						(0.13*equityPercent/0.9*parseInt($scope.user.money)), 
						(0.03*bondPercent*10*parseInt($scope.user.money)),
						(0.07*bondPercent*10*parseInt($scope.user.money))];
						
				//set for high fee adjustment and low fee adjustment
				if(i==1){linerate = 0.004;}else if(i==2){linerate = 0.02;}
				var tmpArr =[parseInt(parseFloat(tmpDoug[0])+parseFloat(tmpDoug[1])+parseFloat(tmpDoug[2])+parseFloat(tmpDoug[3])+parseFloat(tmpDoug[4]))]; 
				if(i==0){
					tmpArr = [$scope.user.money];
				}

				angular.forEach($scope.labels, function(value, key)
				{	if(i==0){
						if(key!=($scope.labels.length-1))
						{	var tmpmoney = parseInt(tmpArr[tmpArr.length-1]);
							for(var k=0; k<5;k++)
							{
								tmpmoney *= linerate;
							}
							tmpArr.push(parseInt(tmpmoney));
						}
					}else{
						//apply annual returns as 0.45, 0.32, 0.13, 0.03,0.07 respectively
						for(var k=0; k<5;k++)
						{
							tmpDoug[0] = parseFloat((parseFloat(tmpDoug[0])+parseFloat(tmpYearly[0]))*(1.1466-linerate));
							tmpDoug[1] = parseFloat((parseFloat(tmpDoug[1])+parseFloat(tmpYearly[1]))*(1.0725-linerate));
							tmpDoug[2] = parseFloat((parseFloat(tmpDoug[2])+parseFloat(tmpYearly[2]))*(1.0269-linerate));
							tmpDoug[3] = parseFloat((parseFloat(tmpDoug[3])+parseFloat(tmpYearly[3]))*(1.0921-linerate));
							tmpDoug[4] = parseFloat((parseFloat(tmpDoug[4])+parseFloat(tmpYearly[4]))*(1.0248-linerate));
							
						}
						
						if(key!=($scope.labels.length-1)){
							tmpArr.push(parseInt(parseFloat(tmpDoug[0])+parseFloat(tmpDoug[1])+parseFloat(tmpDoug[2])+parseFloat(tmpDoug[3])+parseFloat(tmpDoug[4])));
						}
						console.log("check tmpArr " + tmpArr);
					}
					//console.log("tmpArr: "+tmpArr);
				}, tmpArr);
				$scope.data.push(tmpArr);
			}
			console.log(bondPercent);
			var indexlow=$scope.data[1].length-1;
			var indexhigh = $scope.data[2].length-1;
			$scope.finalValue = parseInt($scope.data[1][indexlow]);
			$scope.diffValue = parseInt($scope.data[1][indexlow]-$scope.data[2][indexhigh]);
		}
	}

	//angularjs bookmark feature
	$scope.scrollTo = function(selector) {
		window.scrollTo(0, $(selector)[0].offsetTop - 100);
	}
	//email invitation
	$scope.sendInvite=function(email, clickEvent){
		
		if($scope.EMAIL_REGEXP.test(email)){
			$(clickEvent.target).text("Sending");
			$http.get("http://goinvest.today/old-bak/email.php?email="+email).success(function(data){
				alert("Thank you! \nAn invitation email will send to you shortly.");
				$(clickEvent.target).text("Success!");
				$(clickEvent.target).css("background-color", "green");
			}).error(function(status){
				alert("Sorry, unexpected error occurred. \nAlternatively you may email to eugene@goinvestgroup.com for enquiries");
				$(clickEvent.target).text("Failed!");
				$(clickEvent.target).css("background-color", "red");
			});
			
		}else{
			alert("Invalid email format");
			$("#emailcapturebutton2").css("background-color", "red");
		}
	}

	//set user investment behavior as conservative
	$scope.setCons=function(){
		$scope.user.type = "cons";
		$scope.user.typelabel = "Conservative";
		$scope.refreshChart(false);
	}
	//set user investment behavior as moderately conservative
	$scope.setModC=function(){
		$scope.user.type = "modcons";
		$scope.user.typelabel = "Moderately Conservative";
		$scope.refreshChart(false);
	}
	//set user investment behavior as balance
	$scope.setBal=function(){
		$scope.user.type = "bal";
		$scope.user.typelabel = "Balance";
		$scope.refreshChart(false);
	}
	//set user investment behavior as moderately aggressive
	$scope.setModAg=function(){
		$scope.user.type = "modag";
		$scope.user.typelabel = "Moderately Aggressive";
		$scope.refreshChart(false);
	}
	//set user investment behavior as aggressive
	$scope.setAg=function(){
		$scope.user.type = "agg";
		$scope.user.typelabel = "Aggressive";
		$scope.refreshChart(false);
	}

	//after key in age and money to invest, redirect to investment plan page:
	$scope.goinvest=function(user){
		if($scope.validation(user))
		{
			$location.path("/investment");
		}
	}
	//angular-carousel:
	 $scope.myInterval = 20000;
  $scope.noWrapSlides = false;
}]);
//custom filter for currency: 
app.filter('noFractionCurrency',
  [ '$filter', '$locale',
  function($filter, $locale) {
    var currencyFilter = $filter('currency');
    var formats = $locale.NUMBER_FORMATS;
    return function(amount, currencySymbol) {
      var value = currencyFilter(amount, currencySymbol);
      var sep = value.indexOf(formats.DECIMAL_SEP);
      if(amount >= 0) { 
        return value.substring(0, sep);
      }
      return value.substring(0, sep) + ')';
    };
  } ]);