<div class="form-group noMargin">
    <label for="categorieChange" class="col-md-2 col-sm-2 control-label">Cat&eacute;gorie</label>
    <div class="col-md-10 col-sm-10">
        <select class="form-control select" ng-model="dataUpAddress.newcategorie" name="categorieChange" ng-options="categorie.name for categorie in categories" ng-click="selectCategorie(); errorBackEndAddress = false">
            <option value="">Choisissez une cat&eacute;gorie</option>
        </select>
    </div>
</div>