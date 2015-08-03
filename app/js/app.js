var app=angular.module("app",["ngRoute","ngTouch","services"]),services=angular.module("services",[]);app.config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"app/views/home.php",controller:"HomeController"}).when("/profil",{templateUrl:"app/views/profil.php",controller:"ProfilController",resolve:{session:app.session}}).otherwise({redirectTo:"/"})}]),app.filter("reverse",function(){return function(items){return items?items.slice().reverse():void 0}}),app.controller("AllController",function($scope,$rootScope,User,Log){Log.storageInit(),$scope.logout=function(){Log.out()},$rootScope.userActif={},User.informations().then(function(response){$rootScope.userActif.informations={name:response[0].name,surname:response[0].surname,email:response[0].email}},function(data,status,config,headers){console.log(data,status,config,headers)}),User.addresses().then(function(response){if("errorLoadAddresses"===response)$scope.errorLoadAddresses=!0;else{$rootScope.userActif.addresses=[];for(var i=0,max=response.length;max>i;i++)$rootScope.userActif.addresses.push({categorie:response[i].categorie,name:response[i].name,location:response[i].location,list:response[i].list,lat:response[i].lat,lng:response[i].lng})}},function(data,status,config,headers){console.log(data,status,config,headers)})}),app.controller("HomeController",function($scope,ChangeText){$scope.modalInscription=!1,$scope.showModalInscription=function(){$scope.modalInscription=!0},$scope.showModalConnection=function(){$scope.modalConnection=!0};var textArr=["vos collègues","vos amis","vos proches","tous ceux qui vous entourent"];$scope.textTitle="votre famille",ChangeText.run($scope,textArr,0)}),app.controller("ProfilController",function(){}),app.controller("AdressesController",function($scope,$rootScope,Autocomplete,Api,Geocode,Address){var user=$rootScope.userActif;Autocomplete.run();var dataCategorie={categorie:!0};$scope.errorCategorieBackEnd=!1,Api.get("back/controls/categorieCtrl.php",dataCategorie).then(function(response){"categorieProblem"===response.data?$scope.errorCategorieBackEnd=!0:$scope.categories=response.data},function(data,status,headers,config){console.log(data,status,headers,config)}),$scope.selectCategorie=function(index,categorie){$scope.categorieIndex=index,adresse.categorie=categorie},$scope.lists=[],$scope.adList=function(listName){return void 0===listName||""===listName?void($scope.errorList=!0):void $scope.lists.push({name:listName})},$scope.selectList=function(index,listName){$scope.listIndex=index,adresse.list=listName};var adresse={categorie:"Autre"};$scope.addresses=user.addresses,$scope.adresseAdd=function(){var location=document.getElementById("adLocation").value;return void 0!==location&&""!==location||void 0!==$scope.adName&&""!==$scope.adName?void 0===location||""===location?void($scope.errorLocation=!0):void 0===$scope.adName||""===$scope.adName?void($scope.errorName=!0):(adresse.location=location,adresse.name=$scope.adName,void Geocode.run(location).then(function(results){adresse.lat=results[0].geometry.location.G,adresse.lng=results[0].geometry.location.K},function(status){console.log("Error geocode : "+status)})["finally"](function(){$scope.addresses.push({name:adresse.name,location:adresse.location,categorie:adresse.categorie}),Address.post(adresse,$scope)})):($scope.errorName=!0,void($scope.errorLocation=!0))}}),services.factory("Api",function($http){var api={};return api.post=function(url,data){return $http({method:"POST",url:url,headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8;"},data:api.urlSerialize(data)}).success(function(response){return response}).error(function(data,status,headers,config){var response="error";return console.log(data,status,headers,config),response})},api.get=function(url,dataReq){var data;return data=dataReq?dataReq:{},$http({method:"GET",url:url,params:data}).success(function(response){return response}).error(function(data,status,headers,config){console.log(data,status,headers,config)})},api.urlSerialize=function(data){var obj=data,dataUrl="",max=Object.keys(obj).length,i=0;for(var prop in obj)obj.hasOwnProperty(prop)&&(i++,dataUrl+=max>i?prop+"="+obj[prop]+"&":prop+"="+obj[prop]);return dataUrl},api}),services.factory("Log",function(Api,$location){var log={};return log["in"]=function(url){$location.path(url)},log.out=function(){var data={logout:!0};Api.post("back/controls/logoutCtrl.php",data).then(function(response){"logout"===response.data&&(log.storageOut(),$location.path("/"))})},log.storageInit=function(){if(sessionStorage.getItem("Log")){var session=sessionStorage.getItem("Log");"1"===session&&sessionStorage.setItem("Log",1)}else sessionStorage.setItem("Log",0)},log.storageIn=function(){sessionStorage.setItem("Log",1)},log.storageOut=function(){sessionStorage.setItem("Log",0)},log}),app.session=function(Api,$location,Log){var session=sessionStorage.getItem("Log");"1"===session?Api.get("back/controls/sessionCtrl.php").then(function(response){"session"!==response.data&&(Log.storageOut(),$location.path("/"))}):$location.path("/")},services.factory("Modal",function(Api,Log){var modal={};return modal.init=function(scope){scope.userExist=!1,scope.userNotExist=!1,scope.wrongMail=!1,scope.wrongMailCo=!1,scope.errorModalBackEnd=!1,scope.incorrectPassword=!1},modal.inputFocus=function(inputId){var label=document.getElementById("label"+inputId);label.classList.add("move")},modal.inputBlur=function(inputId){var input=document.getElementById(inputId),value=input.value,label=document.getElementById("label"+inputId);(""===value||void 0===value)&&label.classList.remove("move")},modal.change=function(scope){scope.modalInscription===!0?(scope.modalInscription=!1,scope.modalConnection=!0):(scope.modalConnection=!1,scope.modalInscription=!0)},modal.confirm=function(scope,data){void 0!==data&&(scope.errorModalBackEnd=!1,Api.post("back/controls/authUserCtrl.php",data).then(function(response){if("error"===response)scope.errorModalBackEnd=!0;else switch(response.data){case"userNotExist":scope.userNotExist=!0;break;case"wrongPassword":scope.incorrectPassword=!0;break;case"userLogin":scope.modalConnection=!1,Log.storageIn(),Log["in"]("/profil");break;case"userExist":scope.userExist=!0;break;case"wrongMail":scope.wrongMail=!0;break;case"userAdded":scope.modalInscription=!1,Log.storageIn(),Log["in"]("/profil")}}))},modal}),services.factory("ChangeText",function($timeout){var changeText={};return changeText.run=function($scope,arr,i){var max=arr.length;$timeout(function(){$scope.textTitle=arr[i],i++,max>i&&changeText.run($scope,arr,i)},1e3)},changeText}),services.factory("Autocomplete",function(){return autocomplete={},autocomplete.run=function(){var adLocation=document.getElementById("adLocation");new google.maps.places.Autocomplete(adLocation)},autocomplete}),services.factory("Geocode",function($q){var geocode={};return geocode.run=function(location){var deferred=$q.defer(),geocoder=new google.maps.Geocoder;return geocoder.geocode({address:location},function(results,status){return status===google.maps.GeocoderStatus.OK?deferred.resolve(results):deferred.reject(status)}),deferred.promise},geocode}),services.factory("User",function(Api,$q){var user={};return user.informations=function(){var deferred=$q.defer(),data={get:"informations"};return Api.get("back/controls/userCtrl.php",data).then(function(response){return deferred.resolve(response.data)},function(data,status,config,headers){return deferred.reject(data,status,config,headers)}),deferred.promise},user.addresses=function(){var deferred=$q.defer(),data={get:"addresses"};return Api.get("back/controls/userCtrl.php",data).then(function(response){return deferred.resolve(response.data)},function(data,status,config,headers){return deferred.reject(data,status,config,headers)}),deferred.promise},user.lists=function(){},user}),services.factory("Address",function(Api){var address={};return address.post=function(data,scope){Api.post("back/controls/userCtrl.php",data).then(function(response){switch(response.data){case"emptyName":scope.errorName=!0;break;case"emptyLocation":scope.errorLocation=!0}},function(data,status,config,headers){console.log(data,status,config,headers)})},address}),app.directive("inscription",function(Modal){var inscription={restrict:"E",replace:!0,templateUrl:"app/views/inscriptionModal.php",link:function(scope){Modal.init(scope),scope.focusInputModal=function(inputId){Modal.inputFocus(inputId)},scope.blurInputModal=function(inputId){Modal.inputBlur(inputId)},scope.hideModalInscription=function(){scope.modalInscription=!1},scope.changeModal=function(){Modal.change(scope)},scope.confirmInscription=function(user){this.user.inscription="login";var data=angular.copy(user);Modal.confirm(scope,data)}}};return inscription}),app.directive("connection",function(Modal){var connection={restrict:"E",replace:!0,templateUrl:"app/views/connectionModal.php",link:function(scope){Modal.init(scope),scope.focusInputModal=function(inputId){Modal.inputFocus(inputId)},scope.blurInputModal=function(inputId){Modal.inputBlur(inputId)},scope.hideModalConnection=function(){scope.modalConnection=!1},scope.changeModal=function(){Modal.change(scope)},scope.confirmConnection=function(userCo){this.userCo.connection="login";var data=angular.copy(userCo);Modal.confirm(scope,data)}}};return connection}),app.directive("menu",function(){return{replace:!0,restrict:"E",templateUrl:"app/views/menu.php",link:function(scope){scope.menu=[{icon:"glyphicon-th-list",title:"Adresses"},{icon:"glyphicon-map-marker",title:"Carte"},{icon:"glyphicon-user",title:"Amis"},{icon:"glyphicon-cog",title:"Paramètres"}],scope.indexMenu=0,scope.activeMenu=function(index){scope.indexMenu=index}}}}),app.directive("adresses",function(){return{retrict:"E",replace:!0,templateUrl:"app/views/adresses.php"}});