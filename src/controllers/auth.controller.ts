import { Request, Response } from "express"
import User from "@/models/user.model"
import Error from "@/utils/errors"
import HelperCrypto from "@/helper/crypto"
import HelperJWT from "@/helper/jwt"
import HTTP_STATUS from "@/constant/HttpStatus"

export const login = async (req: Request, res: Response) => {

    const { email, password, remmber } = req.body
    var refreshToken = ''
    try {
        //Checked email
        const user = await User.findOne({
            email: email,
        })
        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                status: HTTP_STATUS.NOT_FOUND,
                message: 'Email or Password not found',
            })
        } else {
            const decPassword = HelperCrypto.decryptedPassword(user.password)
            if (decPassword !== password) {
                return Error.sendNotFound(res, 'Password not found')
            }
            //Checked Active
            if (!user.status) {
                return Error.sendNotFound(res, 'Your account has not been activated')
            }
            //Checked RefreshToken
            if (refreshToken === '') {
                refreshToken = HelperJWT.generateToken(
                    'refresh',
                    { id: user._id, dateCreated: Date.now },
                    '30000h'
                )
            } else {
                const authHead = req.headers['authorization'] + ''
                refreshToken = authHead.replace(
                    'Bearer ',
                    ''
                )
            }
            const accessToken = HelperJWT.generateToken(
                'access',
                { id: user._id, dateCreated: Date.now },
                remmber ? '24h' : '1h'
            )
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                status: HTTP_STATUS.CREATED,
                message: 'Login Success',
                user,
                tokenList: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body
        const user = await User.findOne({ email: email }).lean()
        if (user) {
            return Error.sendConflict(res, 'User Already Exist. Please Login')
        }
        const encryptedPassword = HelperCrypto.encryptedPassword(password)

        const newUser = await User.create({
            email,
            password: encryptedPassword,
            firstName,
            lastName,
        })
        const accessToken = HelperJWT.generateToken(
            'access',
            { id: newUser._id, dateCreated: Date.now },
            '1h'
        )
        const refreshToken = HelperJWT.generateToken(
            'refresh',
            { id: newUser._id, dateCreated: Date.now },
            '30000h'
        )
        const signature = HelperJWT.signatureToken(refreshToken)

        return res.status(HTTP_STATUS.OK).json({
            success: true,
            status: 200,
            message: 'Register Success',
            user: newUser,
            tokenList: {
                accessToken,
                refreshToken,
            },
        })
    } catch (error: any) {
        return Error.sendError(res, error)
    }
    return {}
}

