
const bcrypt = require('bcryptjs');

var Password = "Password123Abc!";

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(Password,salt, (err,hash)=>{
        console.log(hash);
    })
});

//Hashed value has a lot of information stored inside of it
// $2a$10$P3M.zuVidf3jXS8BihhCB.VIYTD1w6kA06R1QhSMrhUoOL23EsxtG
// $10$ -> number of rounds
// -- bcryptjs allows us not to store salt and hash in the database (for passwords
var hashedPassword = "$2a$10$P3M.zuVidf3jXS8BihhCB.VIYTD1w6kA06R1QhSMrhUoOL23EsxtG";

bcrypt.compare(Password, hashedPassword, (err,res)=>{

    // if(err){
    //     return console.log(err);
    // }

    //   res is a true boolean if true, and undefined if false
    if(res)
    {
        return console.log("There is a match")
    }
    else{
        return console.log("No Match")
    }

});