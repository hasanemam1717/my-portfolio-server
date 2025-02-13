
import bcrypt from 'bcrypt'
import { TUser, UserModel } from './user.model';
import { TLogInUser } from './auth.interface';

const registerUser = async (payload: TUser) => {
    const result = await UserModel.create(payload)

    return result;
}

const logIn = async (payload: TLogInUser) => {
    const user = await UserModel.findOne({ email: payload?.email })

    if (!user) {
        throw new Error('User not found.')
    }
    if (user.isBlocked === true) {
        throw new Error('User is blocked.')
    }

    const isPasswordMatched = await bcrypt.compare(payload?.password, user?.password)
    if (!isPasswordMatched) {
        throw new Error('Invalid credentials')
    }
    return { user }
}


export const authService = {
    registerUser,
    logIn
}