import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { AppError } from '../utils/app-error.js';

interface RegisterUserData {
    name: string;
    email: string;
    password: string
}

export const createUser = async (userData: RegisterUserData) => {
    const name = userData.name.trim();

    const email = userData.email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new AppError(409,"Email already registered");

    const passwordHash = await bcrypt.hash(userData.password, 12);

    const user = await User.create({ name, email, passwordHash });


    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email
    }
}

export const loginUserService = async (email: string, password: string) => {
    const user = await User.findOne({
        email: email.toLowerCase()
    }).select("+passwordHash");

    if (!user) {
        return null;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordCorrect) return null;

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email
    }
}

export const getUserProfileService = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        return null;
    }

    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
    }
}