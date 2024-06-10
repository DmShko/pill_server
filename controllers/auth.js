const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const {nanoid} = require("nanoid");

const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

//!!! GOOGLE_PASSWORD - app password!) Infirst, create 2-level guard and then generate app password there!!!
const { SECRET_KEY, BASE_URL, GOOGLE_PASSWORD } = process.env;

const User = require("../models/user");

const schemas = require("../schemas");

const signup = async (req, res) => {
    
    const { body } = req;
    const { email, password } = req.body;
    const { error } = schemas.checkRegister.validate(body);
  
    // for create unique 409 message. Does base have sach email?
    const user = await User.findOne({email});
    // if sach email exist
    if(user) throw HttpError(409, "Email in use");

    // ather error message
    if (error) { 
    throw HttpError(
        400,
        'Joi validation error'
        );
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // verify code from email
    const verificationCode = nanoid();
  
    const newUser = await User.create({...body, password: hashPassword, verificationCode});

    // configuration
    const nodemailerConfig = {
        service: "Gmail",
        host: 'smtp.gmail.com',
        port: 465, //465 or 25 or 2525. 465 - protected port
        secure: true, // on crypt
        auth: {
            user: 'medicine2024.service@gmail.com',
            pass: GOOGLE_PASSWORD,
        },
    };

    // create transporter object
    const transporter = nodemailer.createTransport(nodemailerConfig);

    const verify = {
        to: email,
        from: 'medicine2024.service@gmail.com',
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
    };

    transporter.sendMail(verify).then(() => 
        console.log('Email send successfuly')
    )
    .catch( error =>
        console.log(error.message)
    );
    /*******************for nodemailer end*********** */

    res.status(201).json({
        user:{
            email: newUser.email,
        }
    });
   
};

// get from link in user mail
const verifyEmail = async (req, res) => {

    const { verificationCode } = req.params;
    const user = await User.findOne({verificationCode});

    // find user whith souch verication code
    // if not found
    if(!user) throw HttpError(401, "Email not found");

    // if found, change verify true
    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});

    res.json({
        message: "Email verify success"
    });
};

const resendVerifyEmail = async (req, res) => {
   
    const { body } = req;
    const { email } = req.body.data;
    const { error } = schemas.emailSchema.validate(body.data);
   
    // ather error message (from frontend)
    if (error) {
        throw HttpError(
            400,
            'Joi validation error'
        );
    }

    const user = await User.findOne({email});
   
    if(!user) throw HttpError(401, "Email not found");
  
    if(user.verify) throw HttpError(401, "User already verified");
    
    // configuration
    const nodemailerConfig = {
        service: "Gmail",
        host: 'smtp.gmail.com',
        port: 465, //465 or 25 or 2525. 465 - protected port
        secure: true, // on crypt
        auth: {
            user: 'medicine2024.service@gmail.com',
            pass: GOOGLE_PASSWORD,
        },
    };

    // create transporter object
    const transporter = nodemailer.createTransport(nodemailerConfig);

    const verify = {
        to: email,
        from: 'dmitry.schevchenko.work@gmail.com',
        subject: "Medicine service verify email",
        html: `
        <head>

        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        </head>
        <body>

            <p>Verify email</p>
                <img src="cid:bottle" alt='Medicine logo' width='400px' height='200px'>
            <a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>
          
        </body>
        `,
        attachments: [{
            filename: 'verify.jpg',
            path: `${__dirname}/images/verify.jpg`,
            cid: 'bottle' //same cid value as in the html img src
        }]
    };

    transporter.sendMail(verify).then(() => 
        console.log('Email send successfuly')
    )
    .catch( error =>
        console.log(error.message)
    );
    /*******************for nodemailer end*********** */

    res.json({
        message: `Verify mail send to email${email}`,
    });
};

const login = async (req, res) => {

    const { body } = req;
    const { email, password } = req.body;
    const { error } = schemas.checkLogin.validate(body);

    // ather error message (from frontend)
    if (error) {
        throw HttpError(
            400,
            'Joi validation error'
        );
    }

    // check email that user with sach email use (on DB resource) return user {...} if he exist.
    const user = await User.findOne({email});

    if(!user) throw HttpError(401, "Email or password wrong");

    // if email comfirm
    if(!user.verify) throw HttpError(401, "Email isn't verified");

    // check email that enter password invalid
    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare) throw HttpError(401, "Email or password wrong");

    // create token
    const payload = {
        id: user._id,
    };

    // 'jwt' - create json web token
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});

    await User.findByIdAndUpdate(user._id,{token});

    res.status(200).json({
        token,
    });
};

const getCurrent = (req, res) => {

    const { email } = req.user;
  
    res.status(200).json({
        email: email,
    });
  
};

const logout = async(req, res) => {
 
    const { _id } = req.user;
    
    await User.findByIdAndUpdate(_id, {token: ""});
  
    res.status(204).json({
        message: "No Content",
    });
  
};

module.exports = {
    signup: ctrlWrapper(signup),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};