const passwords = require("./passwords.json");
const rendererMethods = ["firstPassword","secondPassword","thirdPassword"]

function isValidRendererMessage(data){
    return  typeof data == "object" 
            && !Array.isArray(data) 
            && data.hasOwnProperty("method")
            && rendererMethods.includes(data.method)
            && data.hasOwnProperty("payload");
}

function checkPassword(type,value){
    return passwords[type] == value;    
}

module.exports = {
    isValidRendererMessage: isValidRendererMessage,
    checkPassword: checkPassword
}