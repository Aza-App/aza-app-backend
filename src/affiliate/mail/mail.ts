import nodemailer from "nodemailer";

export const sendMail = async (
  recipient: string,
  mailSubject: string,
  mailText: string,
  mailContent: string
) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports like 587
    auth: {
      user: "mbyahya2579@gmail.com",
      pass: "Abie2579@@5740",
    },
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: `"Aza Store Email Comfirmation" <mbyahya2579@gmail.com>`, // sender address
    to: recipient, // list of receivers
    subject: mailSubject, // Subject line
    text: mailText, // plain text body
    html: mailContent, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};
