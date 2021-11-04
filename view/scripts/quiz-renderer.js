
let game = 1;
$( document ).ready(setCurrentGame)

async function checkPassword(){
    let method;
    switch(game){
        case 1:
            method = "firstPassword";
            break;
        case 2: 
            method = "secondPassword";
            break;
        case 3:
            method = "thirdPassword"
            break;
    }
    let passwordGuess = $("#solution").val();
    let response = await window.sendToMain(method,passwordGuess);
    if(game < 3 && !response.errorOccured && response.method == method && response.payload){
        game++;
        notify("Juhuu das Passwort war korrekt!","success")
        setCurrentGame();     
    }
    else if(game != 4){
        notify("Oops, das Passwort ist leider falsch","error")
    }
    $("#solution").val("");
}   


function setCurrentGame(){

    let arrayIndex = (game-1)
    let header = [
        "Servus Mama!",
        "Sehr gut!",
        "Perfekt!"
    ]

    let motivation = [
        "Wir haben ein kleines Quiz für dich vorbereitet",
        "Ab zum nächsten Spiel",
        "Ein finales Spiel hast du noch vor dir"
    ]
    let quizDescriptions = [
    "Wer versteckt das Passwort?",
    "Das ist das zweite Spiel",
    "Finale yeah!"
    ];

    $("#header").text(header[arrayIndex])
    $("#motivation").text(motivation[arrayIndex])
    $("#quiz-info").text(`Spiel ${game.toString()}: ${quizDescriptions[(arrayIndex)]}`);



}

    

function notify(message,icon = null){
    Swal.fire({
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        target:"#alert",
        heightAuto: false, 
      })
}