import { getAllUsersDB, getUserByIdDB, createUserDB, updateUserDB, deleteUserDB } from "../services/userService.mjs";

export function displayLoginForm(req, res) {
    res.render('loginUser');
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
    if (req.query.id) {
            const usersData = await getUserByIdDB(req.query.id);
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
    const formData = req.body;
    if (formData) {
        const resultID = await createUserDB(formData);
        if (resultID) { res.status(200).json({message: 'success'}); }
        else { res.status(400).json({message:'Data not inserted'});}
    }
}

export async function updateUser(req, res) {
    const userID = req.query.id;
    const formData = req.body;
    if (formData) {
        const resultID = await updateUserDB(userID, formData);
        if (resultID) { res.status(200).json({message: 'success'}); }
        else { res.status(400).json({message:'Data not updated'});}
    }
}

export async function deleteUser(req, res) {
    const userID = req.query.id;
    if (userID) {
        const resultID = await deleteUserDB(userID);
        if (resultID) { res.status(200).json({message: 'success'}); }
        else { res.status(400).json({message:'Data not deleted'});}
    }
}