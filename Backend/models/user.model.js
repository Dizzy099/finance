import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// User Schema
const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            localpath: String,
        },
        default: {
            url: `https://res.cloudinary.com/dqj0xg3zv/image/upload/v1698231234/avatars/default-avatar.png`,
            localpath: `https://res.cloudinary.com/dqj0xg3zv/image/upload/v1698231234/avatars/default-avatar.png`,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index : true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    // isEmailVerified: {
    //     type: Boolean,
    //     default: false,
    // },
    // forgotPasswordToken: {
    //     type: String,
    //     default: null,
    // },
    // forgotPasswordTokenExpiry: {
    //     type: Date,
    //     default: null,
    // },
    // refreshToken: {
    //     type: String,
    //     default: null,
    // },
    // emailVerificationToken: {
    //     type: String,
    //     default: null,
    // },
    // emailVerificationTokenExpiry: {
    //     type: Date,
    //     default: null,
    // },
    // isDeleted: {
    //     type: Boolean,
    //     default: false,
    // },
    // isActive: {
    //     type: Boolean,
    //     default: true,
    // },

}, { timestamps: true });

//Hooks :- Password hashing middleware(Ise hasing ke throw password ko hash (secure) karte hai)
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10); // yha 10 salt rounds hai
    }
    next();
});

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
} 

userSchema.methods.generateEmailVerificationToken = function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRYS,
        },
    )
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        },
    )
};

userSchema.methods.generateTemporaryToken = function () {
    const unHashedToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(unHashedToken).digest("hex");
    const tokenExpiry  = Date.now() + 10 * 60 * 1000; // 10 minutes
    
    return {
        unHashedToken,
        hashedToken,
        tokenExpiry,
    };
};

const User = mongoose.model("User", userSchema);
export default User;