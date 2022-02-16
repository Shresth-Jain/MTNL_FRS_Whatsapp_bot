// for web scrapping
const rp = require('request-promise');
const cheerio = require('cheerio');
require('dotenv').config();

// for telegram bot

const Telegraf = require('telegraf');
// const { Composer } = require('micro-bot')

const bot = new Telegraf(process.env.BOT_TOKEN);
// const bot = new Composer()

// ******************************************************************************************
const landlineSent=[];

const site="http://intranetd.mtnldelhi.in:7778/j2ee/hrd/pend_list.jsp?category=WEST&subcategory=RG";

async function startApp(){
        try{
            letFRSData=[];
            const response= await rp({
                url: site,
                json: true
            });

        let $=cheerio.load(response);
        let firstRow=2;
        let lastRow=$("tr").length-7;

        for (let i = firstRow; i <= lastRow; i++) {
            // Extract Individual Data
            let EXCH= $("body > center > table > tbody > tr:nth-child("+i+") > td:nth-child(2)").text().trim();
            let JESEC= $("body > center > table > tbody > tr:nth-child("+i+") > td:nth-child(3)").text().trim();
            let TELNO= $("body > center > table > tbody > tr:nth-child("+i+") > td:nth-child(4)").text().trim();
            let COMD= $("body > center > table > tbody > tr:nth-child("+i+") > td:nth-child(5)").text().trim();
            let MDFNO= $("body > center > table > tbody > tr:nth-child("+i+") > td:nth-child(7)").text().trim();
            let NAME= $("body > center > table > tbody > tr:nth-child("+i+") > td:nth-child(9)").text().trim();
            let ADD= $("body > center > table > tbody > tr:nth-child("+i+") > td:nth-child(10)").text().trim();
            let CONTACT= $("body > center > table > tbody > tr:nth-child("+i+") > td:nth-child(11)").text().trim();

            // FOR RG 121 
            if (EXCH == 'RG' && JESEC == '121') {
                // console.log(EXCH + JESEC);
                const isSent= landlineSent.find(element => element == TELNO);
                // if this landline fault is not sent 
                if (isSent===undefined) {
                    // design a message and send it now
                    var opts = {
                        "parse_mode": 'HTML'
                      };
                    let message=`TELNO:<b>${TELNO}</b>\nMDFNO:<b>${MDFNO}</b>\nADD:<b>${ADD}</b>\n\nJESEC:<i>${JESEC}</i>\nNAME:<i>${NAME}</i>\nCONTACT:<i>${CONTACT}</i>\nCOMD:<i>${COMD}</i>\n**********`;
                    bot.telegram.sendMessage(process.env.GROUP_ID_121,message,opts);
                    landlineSent.push(TELNO);
                }
            }

            // FOR RG 141 
            if (EXCH == 'RG' && JESEC == '141') {
                // console.log(EXCH + JESEC);
                const isSent= landlineSent.find(element => element == TELNO);
                // if this landline fault is not sent 
                if (isSent===undefined) {
                    // design a message and send it now
                    var opts = {
                        "parse_mode": 'HTML'
                      };
                    let message=`TELNO:<b>${TELNO}</b>\nMDFNO:<b>${MDFNO}</b>\nADD:<b>${ADD}</b>\n\nJESEC:<i>${JESEC}</i>\nNAME:<i>${NAME}</i>\nCONTACT:<i>${CONTACT}</i>\nCOMD:<i>${COMD}</i>\n***********`;
                    bot.telegram.sendMessage(process.env.GROUP_ID_141,message,opts);
                    landlineSent.push(TELNO);
                }
            }
            // FOR RG 151 
            if (EXCH == 'RG' && JESEC == '151') {
                // console.log(EXCH + JESEC);
                const isSent= landlineSent.find(element => element == TELNO);
                // if this landline fault is not sent 
                if (isSent===undefined) {
                    // design a message and send it now
                    var opts = {
                        "parse_mode": 'HTML'
                      };
                    let message=`TELNO:<b>${TELNO}</b>\nMDFNO:<b>${MDFNO}</b>\nADD:<b>${ADD}</b>\n\nJESEC:<i>${JESEC}</i>\nNAME:<i>${NAME}</i>\nCONTACT:<i>${CONTACT}</i>\nCOMD:<i>${COMD}</i>\n***********`;
                    bot.telegram.sendMessage(process.env.GROUP_ID_151,message,opts);
                    console.log("done");
                    landlineSent.push(TELNO);
                }
            }

            // FOR RG 161 
            if (EXCH == 'RG' && JESEC == '161') {
                // console.log(EXCH + JESEC);
                const isSent= landlineSent.find(element => element == TELNO);
                // if this landline fault is not sent 
                if (isSent===undefined) {
                    // design a message and send it now
                    var opts = {
                        "parse_mode": 'HTML'
                      };
                    let message=`TELNO:<b>${TELNO}</b>\nMDFNO:<b>${MDFNO}</b>\nADD:<b>${ADD}</b>\n\nJESEC:<i>${JESEC}</i>\nNAME:<i>${NAME}</i>\nCONTACT:<i>${CONTACT}</i>\nCOMD:<i>${COMD}</i>\n***********`;
                    bot.telegram.sendMessage(process.env.GROUP_ID_161,message,opts);
                    landlineSent.push(TELNO);
                }
            }
       }
    //    console.log(date_ob.getHours());

    }catch(e) {
        console.log('Error happened while connecting to the DB: ', e.message)
    }   
 }


console.log("Working Hours: 9:30 to 15:00 IST -> 4:00 - 9:30 UTC");

    // run this function every 10 minutes = 10*60*1000 milliseconds
var interval=setInterval(()=>{
    const date_ob = new Date();
    const currUTCHour=date_ob.getUTCHours();
    const currUTCMin=date_ob.getUTCMinutes();
    // if time is between 1000Hours to 1500Hours then run the command at regular interval of 10 minutes
    //  10am to 3pm IST  is 4:30am to 9:30pm UTC
        if((currUTCHour>=4 && currUTCHour<9) || (currUTCHour==9 && currUTCMin<=30)){   
            console.log("["+currUTCHour+":"+currUTCMin+"] "+"Starting the application at: ",currUTCHour);
            // startApp();
        }
        else if(landlineSent.size>0){
            console.log("["+currUTCHour+":"+currUTCMin+"] "+"Working Hours are over! Cleaning the memory");
            landlineSent=[];
        }
        else console.log("["+currUTCHour+":"+currUTCMin+"] "+"Memory Clean complete. Working Hours are over!");

    },10*60*1000);
// }

bot.start((ctx) => ctx.reply('Bot has started!'));

bot.launch();
// module.exports = bot


