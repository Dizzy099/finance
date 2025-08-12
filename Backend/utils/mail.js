import Mailgen from "mailgen";
import nodemailer from "nodemailer";


const sendMail = async (option) => {
    var mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Mailgen',
            link: 'https://mailgen.js/'
        }
    })  
    const emailText = mailGenerator.generatePlaintext(option.mailGenContent);
    const emailHtml = mailGenerator.generate(option.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_HOST,
        
        secure: false,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        },
    });

    const mail = {
        from: process.env.MAILTRAP_FROM,
        to: option.email,
        subject: option.subject,
        text: emailText,
        html: emailHtml,
    };

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.log(error.message)
        return false
    }
}

const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: 'Welcome to MailGen platform!',
            action: {
                instructions: 'To get started with Mailgen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your email Account',
                    link: verificationUrl,
                },
            },
            outro: 'Need help? Contact our support team.',
        },
    };
}

sendMail({
    email: user.email,
    subject: 'Verify your email',
    mailGenContent: emailVerificationMailGenContent(
    user.username, verificationUrl),
})

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: 'We get a request to reset your password!',
            action: {
                instructions: 'To change ypur password and please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset Paasword',
                    link: passwordResetUrl,
                },
            },
            outro: 'Need help? Contact our support team.',
        },
    };
}
sendMail({
    email: user.password,
    subject: 'Reset your password',
    mailGenContent: forgotPasswordMailGenContent(
    user.username, passwordResetUrl),
})