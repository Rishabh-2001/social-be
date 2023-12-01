const {Users}=require('../db/models')
const { where } = require('sequelize');
const nodemailer=require('nodemailer')
console.log("Nodemailer obj:::", nodemailer);
const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
       user:'sociome89@gmail.com',
       pass:'bcofomqwlxxvvbma'
    }
})


const verificationCode = Math.floor(100000 + Math.random() * 900000);

async function sendMailFn(token,to){
  console.log("Sednonf to :", token,  to);

  const mailOptions = {
    from: 'sociome89@gmail.com',
    to: to,
    subject: 'Verification Code',
    text: `Your verification code is: ${token}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      throw error;
    } else {
      console.log('Email sent:', info.response);
      return info.response;
    }
  });


   



    
}


module.exports={sendMailFn};




//copy ==shift+alt+downarr


//to shoft up: alt+upkey

// to select all the same keyword and change == ctrl+d

// to write multiple places: alt+click(where u want to write)

//