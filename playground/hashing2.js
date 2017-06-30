//essential get two functions with JSONWEBTOKEN aka JWT
// *) Hash (sendint to client)   and Confirm (receiving token back from the client) - two utility functions

const jwt = require('jsonwebtoken');
//jwt.sign(object,SaltString);
//jwt.verify(token,SaltString);


var data  = {
    id:10
}

var SecretSalt = 'ThisIsA$alt$tring';

var token = jwt.sign(data,SecretSalt);
// This is the token to send to the user when signing-in or signing-up
// THIS IS THE TOKEN THAT IS STORED IN THE TOKEN ARRAY OF THE MODEL



var deocodedResult = jwt.verify(token,SecretSalt);
console.log(deocodedResult);

// returns -> the original 'data' object with timestamp property added
//  ->  { id: 10, iat: 1498831884 }