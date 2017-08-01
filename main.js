

// foodieApp is the name of the app here
//ngRoute is not a directive it is a module
var foodieApp = angular.module('foodieApp',['ngRoute']);
//console.log(foodieApp);


foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})

	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})

foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	//Empty
	$scope.ingredients = [];
	$scope.restaurantId = $routeParams.id;
//console.log($routeParams.id);
var restaurants = [{
					name: 'Farzi Cafe',
					address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
					location: 'Connaught Place',
					category: 'Casual Dining, Bar',
					vote: '4.0',
					cuisines: 'Modern Indian',
					cost: '2200',
					id: 1,
					hours: '12 Noon to 1 AM (Mon-Sun)',
					image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
				},{
            name: 'Apex Cafe',
            address: 'Inner Circle, Connaught Place',
            location: 'Connaught Place',
            category: 'Coffee',
            vote: '4.8',
            cuisines: 'Spanish',
            cost: '1500',
						bestDish: {
									name: 'Corn Pizza',
									image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
								},
            hours: '9 AM to 1 AM (Mon-Sun)',
            image: 'https://images8.alphacoders.com/369/369063.jpg'
          },
          {
                name: 'Royal Park',
                address: 'baddi',
                location: 'Himachal pradesh',
                category: 'Casual Dining, Bar',
                vote: '3.5',
                cuisines: 'Italian',
                cost: '1000',
								id: 3,
                hours: '5 AM Noon to 10 PM (Mon-Sun)',
                image: 'https://www.bbcgoodfood.com/sites/default/files/bream.jpg'
              },
              {
                    name: 'Saffron',
                    address: 'BUEST',
                    location: 'Baddi',
                    category: 'Casual Dining, Bar',
                    vote: '5.0',
                    cuisines: 'Mexican',
                    cost: '2000',
										id: 4,
                    hours: '1 AM to 1 PM (Mon-Sun)',
                    image: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/mexican-chicken-tortilla-soup.jpg'
									}]


				$scope.restaurant = restaurants[$routeParams.id - 1];

			$scope.getIngredients = function(url) {
	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
					$http({
						'method': 'POST',
						'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
						'headers': {
							'Authorization': 'Key a83cf33d81ca4f71ae7f18345e7b8ab0',
							'Content-Type': 'application/json'
						},
						'data': data,

					}).then(function (response) {
								var ingredients = response.data.outputs[0].data.concepts;
					  			var list = '';
									var protein = ['egg','chicken','oats','cheese','yogurt','milk','broccoli','tuna','lentil','fish','shrimp'];
									var fat = ['flaxseed','almond','oil','avocado','walnuts','peanut','cashew','dark chocolate'];
									var carb = ['oatmeal','yams','brown rice','pumpkin','apple','oranges','pears','mango']

									for (var i =0;i < ingredients.length;i++) {
										$scope.ingredients.push(ingredients[i].name);

										}

										for(var i=0;i< protein.length;i++){
											// CHECK FOR THE PROTEIN ROR CARB OR FAT RICH FOOD
											//console.log($scope.protein);
										if ($scope.ingredients.indexOf(protein[i]) > -1) {
												var info = "<p>Protien Rich</p>";
												console.log("run");
													$(".rest-extra .best-dish").append(info);
													$(".highlight-info").css("background-color" ,"green");
													break;
												 }

									 else if($scope.ingredients.indexOf(fat[i]) > -1){
										 	var info2 = "<p class='highlight-info'>Fat Rich</p>";
												console.log('fat rich');
												$(".type .bestDish").append(info2);
												$(".highlight-info").css("background-color" ,"yellow");
												break;
											}

										else if($scope.ingredients.indexOf(carb[i]) > -1){
	 										 	var info3 = "<p class='highlight-info'>Carbohydrate Rich</p>";
	 												console.log('carb rich');
	 												$(".type .bestDish").append(info3);
	 												$(".highlight-info").css("background-color" ,"blue");
	 												break;
	 											}

												else {
													 	var info4 = "<h1 class='highlight-info'>Not a nutrient rich food</h1>";
														$(".type .bestDish").append(info3);
														$(".highlight-info").css("background-color" ,"blue");
												}



										}





										//console.log(ingredients.length);
						//console.log(list);
					}, function (xhr) {
												   console.log(xhr);
												  });


}


})


foodieApp.controller('loginController',function($scope,$location) {
	$scope.goToHome = function() {
			$location.url('home')
			console.log($location.url);
		}
})


foodieApp.controller('mainController',function($scope) {
  //CONTROLLER KAREGA KYA

  $scope.restaurants = [{
							name: 'Farzi Cafe',
							address: '38/39, Level 1, Block E , Inner Circle, Connaught Place',
							location: 'Connaught Place',
							category: 'Casual Dining, Bar',
							vote: '4.2',
							cuisines: 'Modern Indian',
							cost: '2200',
							id: 1,
							hours: '12 Noon to 1 AM (Mon-Sun)',
							image: 'https://b.zmtcdn.com/data/pictures/chains/2/308022/dabd30bd0b000ea859ada9a08a0132fc.jpg'
						},{
            name: 'Apex Cafe',
            address: 'Inner Circle, Connaught Place',
            location: 'Connaught Place',
            category: 'Coffee',
            vote: '4.8',
            cuisines: 'Spanish',
            cost: '1500',
						id: 2,
            hours: '9 AM to 1 AM (Mon-Sun)',
            image: 'https://images8.alphacoders.com/369/369063.jpg'
          },
          {
                name: 'Royal Park',
                address: 'baddi',
                location: 'Himachal pradesh',
                category: 'Casual Dining, Bar',
                vote: '3.5',
                cuisines: 'Italian',
                cost: '1000',
								id: 3,
                hours: '5 AM Noon to 10 PM (Mon-Sun)',
                image: 'https://www.bbcgoodfood.com/sites/default/files/bream.jpg'
              },
              {
                    name: 'Saffron',
                    address: 'BUEST',
                    location: 'CHANDIGARH',
                    category: 'Casual Dining, Bar',
                    vote: '5.0',
                    cuisines: 'Mexican',
                    cost: '2000',
										id: 4,
                    hours: '1 AM to 1 PM (Mon-Sun)',
                    image: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/mexican-chicken-tortilla-soup.jpg'
                    }]
})
