services.factory("Lists", function(Api, $timeout, Correct, $routeParams, $location){
    
    var lists = {};
    
    // Récupération des listes utilisateur
    lists.get = function(scope){
        
        // Initialisation objet data
        var data = {};
        
        // Paramètre pour get lists
        data.user = "lists";
        
        Api.get("back/controls/listsCtrl.php", data).then(function(response){
            
            if(response.data === "errorLoadLists"){

                scope.errorBackEnd = true;

            }else{
                    
                scope.lists = response.data;

            }

        }, function(data, status, config, headers){

            console.log(data, status, config, headers);
            scope.errorLoadLists = true;

        });
        
    };
    
    // Ajout d'une nouvelle liste
    lists.post = function(scope, data){
        
        // Si pattern pas incorrect
        if(scope.adLists.listName.$error.pattern){
            
            // Si erreur pattern
            scope.errorPatternList = true;
            scope.textErrorList = "Caractères spéciaux interdits.";
            return;
            
        }else if(scope.adLists.listName.$error.minlength || scope.adLists.listName.$error.maxlength){
            
            // Si nombre de caractères incorrect
            scope.errorListLength = true;
            scope.textErrorList = "Nombre de caractères interdit.";
            return;
            
        }else if(data.name === undefined || data.name === ""){
            
            // Si nom vide
            scope.errorListName = true;
            scope.textErrorList = "Merci de renseigner un nom.";
            return;
            
        }
        
        Api.post("back/controls/listsCtrl.php", data).then(function(response){
            
            switch(response.data){
                    
                case "errorListLength":
                    
                    // Si nombre de caractères incorrect
                    scope.errorListLength = true;
                    scope.textErrorList = "Nombre de caractères interdit.";
                    
                    break;
                    
                case "emptyName":

                    // Si nom vide
                    scope.errorListName = true;
                    scope.textErrorList = "Merci de renseigner un nom.";

                    break;

                case "alreadyExists":
                    
                    // Si nom existe déjà
                    scope.nameListExist = true;
                    scope.textErrorList = "Ce nom de liste existe déjà. Merci de le modifier.";

                    break;

                case "successAddList":

                    // Affichage front envoi ok
                    Correct.run(scope, "correctAddList");

                    var listName = document.getElementById("listName");

                    // Ajout de la liste
                    scope.lists.push({

                        name: data.name

                    });

                    // Remise à 0 de l'input
                    scope.addList.name = "";

                    $timeout(function(){

                        listName.classList.remove("ng-invalid");

                    });

                    break;
                    
            }
            
        }, function(data, status, config, headers){
            
            console.log(data, status, config, headers);
            scope.errorAddListName = true;
            scope.textErrorList = "Une erreur s'est produite, merci d'enregistrer de nouveau votre liste."
            
        });
        
    };
    
    // Mise à jour d'une liste
    lists.update = function(scope, data){
        
        if(scope.listModification.changeNameList.$error.minlength || scope.listModification.changeNameList.$error.maxlength){
            
            // Si erreur nombre de caractères nom
            scope.errorChangeLengthList = true;
            scope.textErrorChangeList = "Nombre de caractères interdit.";
            return;
            
        }else if(scope.listModification.changeNameList.$error.pattern){
            
            // Si erreur pattern nom
            scope.errorChangeListPattern = true;
            scope.textErrorChangeList = "Caractères spéciaux interdits.";
            return;
            
        }if(data === undefined){
            
            // Si pas de donnée
            return;
            
        }
        
        data.name = $routeParams.nameList;
        
        Api.post("back/controls/listsCtrl.php", data).then(function(response){
            
            switch(response.data){
                    
                case "errorListLengthNew":
                    
                    // Si erreur nombre caractères
                    scope.errorChangeLengthList = true;
                    scope.textErrorChangeList = "Nombre de caractères interdit.";
                    
                    break;
                    
                case "emptyNewName":
                    
                    // Si pas de nom ne rien faire
                    
                    break;
                    
                case "alreadyExists":
                    
                    scope.errorNameExist = true;
                    scope.textErrorChangeList = "Ce nom de liste existe déjà. Merci de le modifier.";
                    
                    break;
                    
                case "successUpdateList":
                    
                    // Affichage front envoi ok
                    Correct.run(scope, "correctChangeList");
                    
                    // On remet à 0
                    scope.dataUpList.newname = "";
                    
                    // Redirection vers nouvelle adresse
                    $location.path("/addresses/lists/" + data.newname);
                    
                    break;
                    
            }
            
        }, function(headers, data, status, config){
            
            console.log(headers, data, status, config);
            scope.errorChangeList = true;
            scope.textErrorChangeList = "Une erreur s'est produite, merci de recharger la page.";
            
        });
        
    };
    
    // Suppression d'une liste
    lists.delete = function(scope){
        
        // Données envoyées
        var data = {
            
            list: $routeParams.nameList,
            delete: true
            
        };
        
        // Envoie des données et attente de la réponse serveur
        Api.post("back/controls/addressListCtrl.php", data).then(function(response){
            
            // Retour au bouton "Supprimer la liste"
            scope.confirmDelete = false;
            
            switch(response.data){
                    
                case "successDeleteList":
                    
                    // Redirection si succès
                    $location.path("/addresses");
                    
                    break;
                    
            }
            
        }, function(headers, data, status, config){
            
            console.log(headers, data, status, config);
            
            // Retour au bouton "Supprimer la liste"
            scope.confirmDelete = false;
            
            // Message erreur suppression
            scope.errorDeleteList = true;
            
        });
        
    };
    
    return lists;
    
});