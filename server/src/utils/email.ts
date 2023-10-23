import nodemailer, { Transporter } from "nodemailer";
import { google } from "googleapis";
import { makeStdErr } from "../exceptions/HttpError";
import _ from "lodash";

const OAuth2 = google.auth.OAuth2;
const myOAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
)
myOAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

const transport: Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_ADDRESS,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: myOAuth2Client.getAccessToken() //access token variable we defined earlier
    }
});
transport.set(
    'oauth2_provision_cb',
    async (user, renew, callback) => {
      if (renew) {
        const accessToken = await myOAuth2Client.getAccessToken();
        return callback(null, accessToken?.token || '');
      }
      return callback(null, process.env.ACCESS_TOKEN);
    }
);


const __sendEmail = (subject, email, html) => {//what if no async await? 
    const mailOptions = {
        from: 'Demo Project 2 <demoproject2@gmail.com>',
        to: email,
        subject,
        html,
    }
    
    transport.sendMail(
        mailOptions,
        function(error){
            if(error) {
                console.log(error)
                throw makeStdErr("SERVER_INTERNAL_ERROR")
            }
        }
    )
}

//avoid spam
export const sendEmail =  _.throttle(__sendEmail, 2000);
