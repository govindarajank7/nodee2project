import {format} from 'date-fns';
import { getAllUsersDB, getUserByIdDB, createUserDB, updateUserDB, deleteUserDB, loginUserDB } from "../services/userService.mjs";

export function displayLoginForm(req, res) {
    res.render('loginUser', { title: 'Login' });
}

export function displayRegisterForm(req, res) {
    res.render('createUser', { title: 'Register' });
}

export async function getAllUsers(req, res) {
    const usersData = await getAllUsersDB();
    if (usersData) {
        res.status(200).json({usersData});
    } else {
        res.status(400).json({message: 'Data Not available'});
    }
}

export async function getUser(req, res) {
    if (req.params.id) {
            const usersData = await getUserByIdDB(req.params.id);
        if (usersData) {
            res.status(200).json({usersData});
        } else {
            res.status(400).json({message: 'Data Not available'});
        }
    } else {
        res.status(400).json({message: 'No ID present in url'});
    }
}

export async function createUser(req, res) {
    try {
        const user = await createUserDB(req.body, req.file);
        res.status(201).json({message: 'User registered', data: user});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}

export async function updateUser(req, res) {
    const userID = req.params.id;
    const formData = req.body;
    if (formData) {
        const resultID = await updateUserDB(userID, formData);
        if (resultID) { res.status(200).json({message: 'success'}); }
        else { res.status(400).json({message:'Data not updated'});}
    }
}

export async function deleteUser(req, res) {
    const userID = req.params.id;
    if (userID) {
        const resultID = await deleteUserDB(userID);
        if (resultID) { res.status(200).json({message: 'User Deleted Successfully'}); }
        else { res.status(400).json({message:'Data not deleted'});}
    }
}

export async function loginUser(req, res) {
    try {
        const {useremail, userpassword} = req.body;
        const loginResult = await loginUserDB(useremail, userpassword);
        const allUsersList = await getAllUsersDB();
        console.log(allUsersList);
        let newUsersList = null;
        req.session.user = loginResult.user;
        req.session.token = loginResult.token;
        console.log('Session set - user:', req.session.user);
        console.log('Session set - token:', req.session.token);
        //res.redirect("/users");
        //res.json({message: "Login Successful", data: result});
        newUsersList = allUsersList.map((data)=>{
            //console.log('Inside map:',data);
            //console.log('data userbirthdate: '+data.userbirthdate);
            let birthDate = new Date(data.userbirthdate);
            //console.log('birth: '+birthDate);
            data.userbirthdate = format(birthDate, "MM/dd/yyyy");
            return data;
            //console.log('User birthdate___'+ data.userbirthdate);
            //console.log(data);
        });
        

        // If the client expects JSON (e.g., API call), return token + user list.
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.status(200).json({
                message: 'Login Successful',
                token: loginResult.token,
                user: loginResult.user,
                users: newUsersList,
            });
        }

        return res.render('userList', { message: 'Login Successful', users: newUsersList, user: req.session.user, title: 'User List' });
    } catch (error) {
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.status(400).json({ message: error.message });
        }
        return res.render('loginUser', { message: error.message, title: 'Login' });
    }
}

export async function userList(req, res) {
    console.log('Session user:', req.session.user);
    console.log('Session token:', req.session.token);
    if(!req.session.user) {
        return res.redirect("/user/login");
    }

    const users = await getAllUsersDB();
    newUsersList = allUsersList.map((data)=>{
            let birthDate = new Date(data.userbirthdate);
            data.userbirthdate = format(birthDate, "MM/dd/yyyy");
            return data;
        });
    res.render('userList', {users: newUsersList, user: req.session.user, title: 'User List'});
}

export function logoutUser(req, res) {
    // Clear session and redirect to login
    req.session.destroy(err => {
        if (err) {
            console.error('Session destroy error:', err);
            return res.status(500).json({ message: 'Unable to logout' });
        }
        res.redirect('/user/login');
    });
}