<div class="form-group">
    <label for="categorieSelect" class="col-md-2 col-sm-2 control-label">Cat&eacute;gorie</label>
    <div class="col-md-10 col-sm-10">
        <select class="form-control select" ng-model="categorieSelect" name="categorieSelect" ng-options="categorie.name for categorie in categories" ng-click="selectCategorie()">
            <option value="">Choisissez une cat&eacute;gorie</option>
        </select>
    </div>
    <input id="adCategorie" type="hidden" value="{{categorieSelect.name}}">
</div>