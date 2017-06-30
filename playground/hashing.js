//THE JSON WEB TOKEN - SIMULATION//
// THIS IS HOW WEB TOKENS WORK, BUT FOR PRODUCTION WILL USE NUGET PACKAGE 'JSONWEBTOKEN'

const {SHA256} = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(hash);

// same result each time
// -> 9da4d19e100809d42da806c2b7df5cf37e72623d42f1669eb112e23f5c9d45a3

var data = {
    id:4
};


var salt = 'secretSalt';
var token = {
    data : data,
    hash: SHA256(JSON.stringify(data) + salt).toString()
}


//SALTING THE HASH - basically addeding concating a seceret string to the hashed data
// this confirms that the token is authentic


var tokenFromClient = SHA256(JSON.stringify(token.data) + salt).toString();



console.log(token.hash === tokenFromClient);  
// -> returns true - simulates a token passed back and forth from server to the client
//                  and confirming that the token is authentic ie, the same