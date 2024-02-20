// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Avirbhav{

 address public admin;


 mapping (string => int)  public  teams;


     modifier onlyAdmin(){

         require(msg.sender == admin);
         _;
     }

     constructor (){

        admin = msg.sender;
        
        teams["jal"] = 50;
        teams["vayu"] = 20;
        teams["agni"] = 30;
        teams["nandi"] = 40;

     }  


    function updateScore(string memory _name, int _score)public onlyAdmin {

        teams[_name] += _score;
    } 

    function getScore(string memory _name)public view returns(int){

        return teams[_name];

    }

    function addTeam(string memory _teamName, int256 _initialScore) public onlyAdmin{
        teams[_teamName] = _initialScore;
    }

    function removeTeam(string memory _teamName) public onlyAdmin{
        delete teams[_teamName];
    }

}