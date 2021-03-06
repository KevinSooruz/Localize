<div id="adressesList" class="inBox">
    <span class="title">Adresses de la liste {{nameList}}</span>
    <div class="inBoxContent">
        <span ng-show="errorLoadAddresses === true" class="errorBlock">Une erreur s'est produite. Merci de recharger la page.</span>
        <ul class="row listAdresses noButton" ng-hide="errorLoadAddresses === true">
            <li class="col-md-12 col-sm-12 col-xs-12" ng-repeat="address in addresses | reverse">
                <div class="row">
                    <span class="title col-md-8 col-sm-8 col-xs-8">{{address.name}}</span>
                    <div class="col-md-4 col-sm-4 col-xs-4 textRight">
                        <span class="categorieLabel">{{address.categorie}}</span>
                    </div>
                </div>
                <span class="locationAddress">{{address.location}}</span>
                <div class="elemPlus row">
                    <div class="col-md-8 col-sm-8 col-xs-8">
                        <span class="fw7">Contact :</span> {{address.phone}}<span ng-show="address.phone === ''">...</span>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-4 textRight">
                        <i class="glyphicon glyphicon-map-marker" ng-click="redirect('/map/categories/{{address.categorie}}/{{address.name}}')"></i>
                        <i class="glyphicon glyphicon-wrench" ng-click="redirect('/addresses/categories/{{address.categorie}}/{{address.name}}')"></i>
                        <i class="glyphicon glyphicon-trash" ng-click="deleteAddressList($index, address.name)"></i>
                    </div>
                </div>
                <div>
                    <span ng-show="indexErrorDeleteAddressInList === $index" class="errorBlock errorBlockMargin errorDeleteAddressInList{{$index}}">{{textErrorDeleteAddressInList}}</span>
                </div>
            </li>
        </ul>
    </div>
</div>