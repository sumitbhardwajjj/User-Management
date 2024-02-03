const model = require('../models/users')
const USERS = model.USERS
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')



exports.Signup= async (req,res)=>{
   try{
    const doc = await USERS.findOne({ email: req.body.email });
        
    if (doc) {
        // If user not found, send a 401 Unauthorized response
        return res.json("exist");
    }

        const user = new USERS(req.body);
        // var token = JWT.sign({email:req.body.email}, process.env.SECRET,{ expiresIn: '10m' })
        const hash = bcrypt.hashSync(req.body.password,10)
        user.password = hash
        // user.token = token
        await user.save()
        res.status(201).json("OK")
  

   }catch(err){
    console.error('Error during signup:', err);
    res.status(500).json('Internal Server Error');
   }
}

exports.Login = async (req, res) => {
    try {
        // Find the user by email
        const doc = await USERS.findOne({ email: req.body.email });
        
        if (!doc) {
            // If user not found, send a 401 Unauthorized response
            return res.json("not");
        }

        // Compare the password provided in the request with the stored hash
        const isAuth = bcrypt.compareSync(req.body.password, doc.password);

        if (isAuth) {
            // Generate JWT token
            const token = JWT.sign({ email: doc.email }, process.env.SECRET,);

                 // Update the token in the user document
                 doc.token = token;

                 // Save the updated user document
                 await doc.save();
     
                 // Send the token in the response
                 res.json({ token });

        } else {
            // If password does not match, send a 401 Unauthorized response
            res.sendStatus(401);
        }
    } catch (err) {
        // Handle other errors
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

