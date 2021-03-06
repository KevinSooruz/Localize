<?php

class Lists{
    
    private $_bdd;
    
    public function __construct($bdd){
        
        $this->setBdd($bdd);
        
    }
    
    public function setBdd($bdd){
        
        $this->_bdd = $bdd;
        
    }
    
    public function create($name){
        
        $reqCreate = $this->_bdd->prepare("INSERT INTO lists(name, id_user) VALUES(:name, :user)");
        $reqCreate->execute(array(
        
            "name" => $name,
            "user" => $_SESSION["user"]
            
        ));
        
        echo "successAddList";
        
    }
    
    public function read(){
        
        $reqRead = $this->_bdd->prepare("SELECT * FROM lists WHERE id_user = :user");
        $reqRead->execute(array(
        
            "user" => $_SESSION["user"]
        
        ));
        
        $result = "[";
        while($lists = $reqRead->fetch()){
            if($result != "["){
                $result .= ",";
            }
            $result.= json_encode(array(
                "id" => $lists["id"],
                "name" => $lists["name"]
            ));
        };
        $result.= "]";
        
        return $result;
        
    }
    
    public function update($name, $newname){
        
        $reqUpdate = $this->_bdd->prepare("UPDATE lists SET name = :newname WHERE name = :name AND id_user = :user");
        $reqUpdate->execute(array(
        
            "newname" => $newname,
            "name" => $name,
            "user" => $_SESSION["user"]
        
        ));
        
        $reqUpdateLists = $this->_bdd->prepare("UPDATE addresses_lists SET list = :newname WHERE list = :name AND id_user = :user");
        $reqUpdateLists->execute(array(
        
            "newname" => $newname,
            "name" => $name,
            "user" => $_SESSION["user"]
        
        ));
        
         echo "successUpdateList";
        
    }
    
    public function delete($nameList){
        
        $reqDelete = $this->_bdd->prepare("DELETE FROM lists WHERE name = :nameList AND id_user = :user");
        $reqDelete->execute(array(
        
            "user" => $_SESSION["user"],
            "nameList" => $nameList
            
        ));
        
        $reqDeleteInAddressList = $this->_bdd->prepare("DELETE FROM addresses_lists WHERE list = :nameList AND id_user = :user");
        $reqDeleteInAddressList->execute(array(
        
            "user" => $_SESSION["user"],
            "nameList" => $nameList
        
        ));
        
        echo "successDeleteList";
        
    }
    
    public function verifListExist($nameList){
        
        $reqRead = $this->_bdd->prepare("SELECT name FROM lists WHERE id_user = :user AND name = :nameList");
        $reqRead->execute(array(
        
            "user" => $_SESSION["user"],
            "nameList" => $nameList
        
        ));
        
        return $reqRead->rowCount();
        
    }
    
}