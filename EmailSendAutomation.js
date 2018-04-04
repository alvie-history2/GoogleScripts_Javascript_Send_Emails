// This constant is written in column C for rows for which an email
// has been sent successfully.
var EMAIL_SENT = "EMAIL_SENT";
var daysSinceReady = 0;
var item = "";

function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;  // First row of data to process
  var numRows = 2400;   //problem at 2400 rows
  var date = Utilities.formatDate(new Date(), "GMT-4", "M/dd/yyyy")
  // Fetch the range of cells A2:B3
  var dataRange = sheet.getRange(startRow, 1, numRows, 100)
  var messageSentColumn = 34
  // Fetch values for each row in the Range.
  var data = dataRange.getValues(); //Gets current date
  
  //The first email
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i]; //Current Row
    var price = row[13]; //Price is currently located 13     parseInt(2+ Math.random() * 48);//
    var emailAddress = row[2];  // 3rd column
    var ticketNumber = row[12];
    var paid = row[15];
    var messageIfAlreadyPaid = "Hello from Crisp, \n\nYour order placed today, " +  date + ", will be ready for pickup tomorrow. \n\nPlease visit tomorrow to pick up your item(s). \n \nYour total was $" + price + " (you already paid). Don't forget your ticket! If you do, your ticket number is " + ticketNumber + ". \n\nThanks from Crisp";       // Custom Message
    var messageIfNotPaid = "Hello from Crisp, \n\nYour order placed today, " +  date + ", will be ready for pickup tomorrow. \n\nPlease visit to pick up your item(s). \n \nYour total is $" + price + " and you will pay when you pick up. Don't forget your ticket! If you do, your ticket number is " + ticketNumber + ". \n\nThanks from Crisp";       // Custom Message
    var messageIfForDelivery = "Hello from Crisp, \n\nYour order placed today, " +  date + ", will be ready for pickup. \n\nPlease visit tomorrow to pick up your item(s). \n \nYour total was $" + price + ". Don't forget your ticket! If you do, your ticket number is " + ticketNumber + ". \n\nThanks from Crisp";       // Custom Message
 //Prevent duplicates
    var emailSent = row[34];     //No people there was no problem here 
    var pickedUp = row[14];
    var daysSinceReady = row[33];
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates
      sheet.getRange(startRow + i, 1).setValue(date);
      var subject = "Your Order is Ready!";
      if(paid == item){
      MailApp.sendEmail(emailAddress, subject, messageIfNotPaid);
      sheet.getRange(startRow + i, 35).setValue(EMAIL_SENT);     //Uncomment line for real thing
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
      }else
      {
        MailApp.sendEmail(emailAddress, subject, messageIfAlreadyPaid);
        sheet.getRange(startRow + i, 35).setValue(EMAIL_SENT);     //Uncomment line for real thing
      // Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush();
      }
    }
    if(pickedUp == item){
      
     if(daysSinceReady == 4){
      emailAddress = row[2];  // 3rd column
      messageIfAlreadyPaid = "Hello from Crisp, \n\nThis is a reminder you order has been ready. You can pick it up any day from 6-7 pm. \n\nPlease visit to pick up your item(s). \n \nYour total was $" + price + " (you aready paid so don't worry about bringing money). Don't forget your ticket number! If you lost it, your ticket number is " + ticketNumber + ". \n\nThanks";       // Custom Message
      messageIfNotPaid = "Hello again from Crisp, \n\nThis is a reminder you order has been ready. You can pick it up any day from 6-7 pm. \n\nPlease visit to pick up your item(s). \n \nYour total is $" + price + ". Don't forget your ticket number! If you lost it, your ticket number is " + ticketNumber + ". \n\nThanks";       // Custom Message
      subject = "Your order has been ready"; 
       if(paid == item){
      MailApp.sendEmail(emailAddress, subject, messageIfNotPaid);
      daysSinceReady++;
      sheet.getRange(startRow + i, 34).setValue(daysSinceReady);
      SpreadsheetApp.flush();
      } else
      {
      MailApp.sendEmail(emailAddress, subject, messageIfAlreadyPaid);
      daysSinceReady++;
      sheet.getRange(startRow + i, 34).setValue(daysSinceReady);
      SpreadsheetApp.flush();
       }
       
      } else{
          daysSinceReady++;
          sheet.getRange(startRow + i, 34).setValue(daysSinceReady);
        
        
        
      }
      

    
 
}
    if(pickedUp != item){
      var emailSentSurvey = row[35];
      if (emailSentSurvey != EMAIL_SENT) {  // Survey Emails
          sheet.getRange(startRow + i, 1).setValue(date);
          message = "Hello again, it's Crisp, \n\nAt Crisp, customer satisfaction and experience is at the top of every decision we make, if you could please take our quick survey, just to reflect on your experience. https://goo.gl/forms/ \nAs a reminder, your total was " + price + ". \n\nHave a nice day, hope to see you again soon. \n\n Crisp" 
          subject = "How was your experience?"; 
          MailApp.sendEmail(emailAddress, subject, message);
          sheet.getRange(startRow + i, 36).setValue(EMAIL_SENT);
          // Make sure the cell is updated right away in case the script is interrupted
          SpreadsheetApp.flush();
  }
    
    }
  }
  
  
}

