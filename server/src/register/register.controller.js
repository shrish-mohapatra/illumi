const keys = require("../../config/keys")
const jwt = require("jsonwebtoken")
const userModel = require("./register.models")

exports.signup = async (req, res) => {
    try {
        const email = req.body.email
        let user = await userModel.findOne({email})

        if (user) {
            return res.json({message: "User already exists."})
        }

        user = new userModel(req.body)
        user.password = hashPassword(user.password)
        await user.save()

        const token = createToken(user)

        return res.status(200).json({'token': token})

    } catch (error) {
        return res.json({message: error.message})
    }
}

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({message: "User with that email does not exist."})
        }

        if(!(password == jwt.verify(user.password, keys.api.key).password)) {
            return res.json({message: "Incorrect password."})
        }

        const token = createToken(user)

        return res.status(200).json({'token': token})

    } catch (error) {
        return res.json({message: error.message})
    }
}

exports.validate = (req, res, next) => {
    if(!req.body.token) {
        return res.json({message: "Missing token"})
    }

    const decoded = jwt.verify(req.body.token, keys.api.key)

    if(!decoded.user) {
        return res.json({message: "Invalid token"})
    }

    if(decoded.exp < Math.floor(Date.now()/1000)) {
        return res.json({message: "Expired token"})
    }

    const token = createToken(decoded.user)

    res.json({token: token})
    next()
}

exports.signout = (req, res) => {
    res.json({token: ''})
}

const createToken = (user) => {
    return (
        jwt.sign(
            {
                user: user,
                date: Date.now()
            },
            keys.api.key,
            {expiresIn: '1h'}
        )
    )
}

const hashPassword = (password) => {
    return (
        jwt.sign(
            {
                password: password,
            },
            keys.api.key
        )
    )
}