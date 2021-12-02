var config = {
    secret: process.env.API_SECRET,
    refreshTokenSecret: process.env.API_REFRESHTOKENSECRET,
    port: 4000,
    tokenLife: 7200,
    refreshTokenLife: 7200,
    //smtpPort: 587,
    // fromEmailAddress: process.env.API_FROMEMAIL,
    // smtpAddress: "smtp.office365.com",
    // emailAlertUsername: process.env.API_FROMEMAIL,
    // emailAlertPassword: process.env.API_EMAILALERTPASSWORD,
    // resetPasswordValidityInMinutes: 60,
    // emailFooter: "This mailbox does not accept incoming messages and is not monitored. Please do not reply directly to this email message.",
    infoLogStatus : true,
    errorLogStatus : true,
    debugLogStatus : true,
    refreshTokenPopupTimeoutInMinutes: 30,
    unverifiedUserTokenExpTimeInDays: 7
};
module.exports = config;