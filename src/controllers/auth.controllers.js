import {User} from '../models/asociations.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function Register(req,res){
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ 
            message: "Username, email, and password are required" 
        });
    }

    const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ 
                message: "Email already exists" 
            });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        })

        res.status(201).json({
            message: "User successfully registered.",
            user: {
                username: username,
                email: email,
            }
            })
    }
    catch(err){
        console.log("error:", err.message);
        return res.status(500).json({message: err.message });
    }
}

async function Login(req,res){
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: "Email and password are required" 
        });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ 
                message: "Invalid email or password" 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                message: "Invalid email or password" 
            });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error during login", error: error.message });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        User.destroy({ where: { id } });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
}

const authController = {
    Register: Register,
    deleteUser: deleteUser,
    Login: Login
}

export {authController}