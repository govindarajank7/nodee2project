import bcrypt from 'bcrypt';
const saltRounds = 10;
export async function hashPassword(req, res) {
    const userpassword = req.body.password;
    bcrypt.hash(userpassword, saltRounds, (err, hash)=>{
        
    });
}