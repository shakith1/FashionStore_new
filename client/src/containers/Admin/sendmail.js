
const sendemail = require('sendemail');

const SendMail = () => {

    let email = sendemail.email;
    let person = {
        name : "Jenny",
        email: "nimsara.shakith" + "@gmail.com", // person.email can also accept an array of emails
        subject:"Welcome to DWYL :)"
      }
       
      email('welcome', person, function(error, result){
        console.log(' - - - - - - - - - - - - - - - - - - - - -> email sent: ');
        console.log(result);
        console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - -')
      })


};

export default SendMail;