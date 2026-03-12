
import { getAllUsersDB, getUserByIdDB, createUserDB, updateUserDB, deleteUserDB, loginUserDB } from "../services/userService.mjs";

export function displayLoginForm(req, res) {
    res.render('loginUser');
}

export function displayRegisterForm(req, res) {
    res.render('createUser');
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
    console.log(req.params.id);
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
        console.log(req.body);
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
        console.log(req.body);
        const result = await loginUserDB(useremail, userpassword);
        res.json({message: "Login Successful", data: result});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}