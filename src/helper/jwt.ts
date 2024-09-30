
import jwt from "jsonwebtoken"

function signatureToken(token: string) {
    return token.split('.')[2]
}

function generatePasswordTimer(payload: any) {
    const key = `${process.env.TOKEN_PASS_REFRESH_MAIL_KEY}`
    const timer = 300
    return jwt.sign({ data: payload }, key, {
        expiresIn: timer,
    })
}

function verifyTokenPasswordTimer(token: string) {
    const key = `${process.env.TOKEN_PASS_REFRESH_MAIL_KEY}`
    try {
        return { payload: jwt.verify(token, key), expired: false }
    } catch (error: any) {
        if (error.name == 'TokenExpiredError') {
            return { payload: jwt.decode(token), expired: true }
        }
        throw error
    }
}

function generateToken(type = 'access', payload: any, tokenLife: string) {
    const key = type
        ? process.env.TOKEN_SECRET_KEY
        : process.env.REFRESH_TOKEN_SECRET_KEY

    return jwt.sign({ data: payload }, key + '', {
        expiresIn: tokenLife,
    })
}

function verifyToken(type = 'access', token: string) {
    const key = type
        ? process.env.TOKEN_SECRET_KEY
        : process.env.REFRESH_TOKEN_SECRET_KEY

    try {
        return { payload: jwt.verify(token, key + ''), expired: false }
    } catch (error: any) {
        if (error.name == 'TokenExpiredError') {
            return { payload: jwt.decode(token), expired: true }
        }
        throw error
    }
}

export default {
    verifyToken,
    generateToken,
    signatureToken,
    generatePasswordTimer,
    verifyTokenPasswordTimer,
}