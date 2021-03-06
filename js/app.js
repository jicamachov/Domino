// var utilizada para que resetees el juego antes de volver a jugar
let intentos = 1;
let revolver = 0;
// all dominoes
let domino = [
    { top: 0, bottom: 0 },
    { top: 0, bottom: 1 }, { top: 1, bottom: 1 },
    { top: 0, bottom: 2 }, { top: 1, bottom: 2 }, { top: 2, bottom: 2 },
    { top: 0, bottom: 3 }, { top: 1, bottom: 3 }, { top: 2, bottom: 3 }, { top: 3, bottom: 3 },
    { top: 0, bottom: 4 }, { top: 1, bottom: 4 }, { top: 2, bottom: 4 }, { top: 3, bottom: 4 }, { top: 4, bottom: 4 },
    { top: 0, bottom: 5 }, { top: 1, bottom: 5 }, { top: 2, bottom: 5 }, { top: 3, bottom: 5 }, { top: 4, bottom: 5 }, { top: 5, bottom: 5 },
    { top: 0, bottom: 6 }, { top: 1, bottom: 6 }, { top: 2, bottom: 6 }, { top: 3, bottom: 6 }, { top: 4, bottom: 6 }, { top: 5, bottom: 6 }, { top: 6, bottom: 6 }
];

// Jugadores
let players = ['player1', 'player2', 'player3', 'player4'];
let name_players = [];

name_players['player1'] = 'Jose Camacho';
name_players['player2'] = 'Eduardo Romero';
name_players['player3'] = 'Fabian Gonzalez';
name_players['player4'] = 'Jose Luna';

let playersDominoes = Array(); // Jugadores con sus fichas
let numberGames = 0; //
let paso = 0; // variable para controlar el paso de un jugador
let pasoGeneral = 0; // varible para controlar el pago de todos los jugadores
let rondas = 0;

// Funcion pila utilizada para controlar las fichas jugadas
function stack() {
    var elements = [];

    this.add = add;
    this.pop = pop;
    this.getTopElement = getTopElement;
    this.hasElements = hasElements;
    this.removeAll = removeAll;
    this.size = size;

    // custom
    this.getBottomElement = getBottomElement;
    this.getElements = getElements;

    // Con este método agregaremos uno o más elementos a nuestra pila (en la parte superior).
    function add(element) {
        elements.push(element);
    }

    // Este método quitará de la parte superior el último elemento y también lo regresará.
    function pop() {
        return elements.pop();
    }

    // Este método solamente nos regresará el elemento que se encuentre en la parte superior sin modificarlo ni removerlo.
    function getTopElement() {
        return elements[elements.length - 1];
    }
    function getBottomElement() {
        return elements[elements.length - 2];
    }

    // Retornará true si nuestra pila tiene al menos un elemento, o en su defecto false si esta vacía.
    function hasElements() {
        return elements.length > 0;
    }

    // Limpia la pila quitando todos los elementos.
    function removeAll() {
        elements = [];
    }

    // Regresará el tamaño de la pila (cuantos elementos hay en ella).
    function size() {
        return elements.length;
    }

    function getElements() {
        console.log(elements);
    }
}

//  Algoritmo Fisher-Yates
Array.prototype.shuffle = function () {
    var input = this;
    for (var i = input.length - 1; i >= 0; i--) {

        var randomIndex = Math.floor(Math.random() * (i + 1));//0 to 8
        var itemAtIndex = input[randomIndex]; // random letter from word "scrambled"

        input[randomIndex] = input[i];// replacing randomly picked letter with last letter 
        input[i] = itemAtIndex;// replacing last letter with randomly picked letter 
    }
    return input;
}

// Allocation of dominoes to players
function assignDominoes() {

    for (let i = 0; i < players.length; i++) {
        let domionesToAssign = [];

        for (let j = 0; j < 7; j++) { domionesToAssign[j] = domino[j]; }
        // Delete dominoes of the array
        for (let k = 0; k < 7; k++) { domino.shift(); }

        // Allocation of dominoes to player
        playersDominoes[players[i]] = domionesToAssign;

    }

}

// funcion para iniciar el juego

function play() {
    let placedDominoesLeft = new stack(); // Controla los movimientos hacia la izquierda 
    let placedDominoesRight = new stack(); // Controla los movimientos hacia la derecha
    let firstMove = true; // varible utilizada para hacer el primer movimiento
    let games = 0; // varible utilizada para controlar los juegos por jugador
    let winner = 0; // varible para utilizada para controlar que se obtenga un ganador

    do {
        console.log(`Ronda - ${++rondas}`);
        for (let i = 0; i < players.length; i++) { // turno por jugador
            console.log(`Turno - ${players[i]}`);
            if (playersDominoes[players[i]].length > 0) { // verificar que tenga fichas para jugar 
                games = 0;
                //console.log(`----- Turno Jugador : ${players[i]} ------`);
                //console.log(playersDominoes[players[i]].length)
                for (let j = 0; j < playersDominoes[players[i]].length; j++) { // Fichas a colocar
                    if (games === 0) {
                        if (firstMove) {
                            let tab = playersDominoes[players[i]][j];
                            // console.log('-************ ficha a poner **************');
                            //console.log(tab);
                            document.getElementById(`${tab.top}-${tab.bottom}`).style.backgroundColor = 'orange';
                            if (tab.top === 6 && tab.bottom === 6) {
                                firstMove = false;
                                placedDominoesLeft.add(tab.bottom);
                                placedDominoesLeft.add(tab.top);

                                placedDominoesRight.add(tab.top);
                                placedDominoesRight.add(tab.bottom);
                                playersDominoes[players[i]].splice(j, 1);
                                games = 1;
                                paso = 1;
                                //   console.log(`----- Primera Ficha Jugada : ${placedDominoesLeft.getBottomElement()}  : ${placedDominoesLeft.getTopElement()} ------`);
                                document.getElementById(`${tab.top}-${tab.bottom}`).style.backgroundColor = 'red';
                                document.getElementById(`${tab.top}-${tab.bottom}`).innerHTML = ++numberGames;
                            }
                        } else {
                            let tab = playersDominoes[players[i]][j];
                            // console.log('-************ ficha a poner **************');
                            //  console.log(tab);
                            // console.log('-----------------------------------------')
                            document.getElementById(`${tab.top}-${tab.bottom}`).style.backgroundColor = 'orange';
                            if (tab.top === placedDominoesLeft.getTopElement()) {
                                placedDominoesLeft.pop();
                                placedDominoesLeft.pop();
                                placedDominoesLeft.add(tab.top);
                                placedDominoesLeft.add(tab.bottom);
                                playersDominoes[players[i]].splice(j, 1);
                                games = 1;
                                paso = 1;
                                // console.log(`----- Ultima Ficha Jugada Left : ${placedDominoesLeft.getBottomElement()}  : ${placedDominoesLeft.getTopElement()} ------`);
                                document.getElementById(`${tab.top}-${tab.bottom}`).style.backgroundColor = 'blue';
                                document.getElementById(`${tab.top}-${tab.bottom}`).innerHTML = ++numberGames;
                            } else if (tab.bottom === placedDominoesLeft.getTopElement()) {
                                placedDominoesLeft.pop();
                                placedDominoesLeft.pop();
                                placedDominoesLeft.add(tab.bottom);
                                placedDominoesLeft.add(tab.top);
                                playersDominoes[players[i]].splice(j, 1);
                                games = 1;
                                paso = 1;
                                //console.log(`----- Ultima Ficha Jugada  Left: ${placedDominoesLeft.getBottomElement()}  : ${placedDominoesLeft.getTopElement()} ------`);
                                document.getElementById(`${tab.top}-${tab.bottom}`).style.backgroundColor = 'blue';
                                document.getElementById(`${tab.top}-${tab.bottom}`).innerHTML = ++numberGames;
                            } else if (tab.top === placedDominoesRight.getTopElement()) {
                                placedDominoesRight.pop();
                                placedDominoesRight.add(tab.top);
                                placedDominoesRight.add(tab.bottom);
                                playersDominoes[players[i]].splice(j, 1);
                                games = 1;
                                paso = 1;
                                //console.log(`----- Ultima Ficha Jugada  Right: ${placedDominoesRight.getBottomElement()}  : ${placedDominoesRight.getTopElement()} ------`);
                                document.getElementById(`${tab.top}-${tab.bottom}`).style.backgroundColor = 'blue';
                                document.getElementById(`${tab.top}-${tab.bottom}`).innerHTML = ++numberGames;

                            } else if (tab.bottom === placedDominoesRight.getTopElement()) {
                                placedDominoesRight.pop();
                                placedDominoesRight.add(tab.bottom);
                                placedDominoesRight.add(tab.top);
                                playersDominoes[players[i]].splice(j, 1);
                                games = 1;
                                paso = 1;
                                //console.log(`----- Ultima Ficha Jugada  Right b: ${placedDominoesRight.getBottomElement()}  : ${placedDominoesRight.getTopElement()} ------`);
                                document.getElementById(`${tab.top}-${tab.bottom}`).style.backgroundColor = 'blue';
                                document.getElementById(`${tab.top}-${tab.bottom}`).innerHTML = ++numberGames;
                            }

                            if (playersDominoes[players[i]].length === 0) {
                                document.getElementById(players[i]).style.border = '5px solid green'
                                document.getElementById(`${tab.top}-${tab.bottom}`).style.backgroundColor = 'green';
                                //alert(`Winner ${players[i]}`);
                                let message = `The Winner is ${name_players[players[i]]}`;
                                document.getElementById('winner').innerHTML = message;
                                document.getElementById('winner').removeAttribute('hidden');
                                console.log(`Jugó - ${players[i]}`);
                                console.log(`Winner ${players[i]}`);
                                winner = 1;
                                return false;
                            }
                        }
                    }
                }

            }
            // validación de cantidad de paso
            if (paso === 0) {
                console.log(`Pasó - ${players[i]}`);
                pasoGeneral++;
                if (pasoGeneral === 4) {
                    let message = 'The game is finished tied';
                    document.getElementById('error').innerHTML = message;
                    document.getElementById('error').removeAttribute('hidden');
                    return false;
                }
            } else {
                paso = 0;
                pasoGeneral = 0;
                console.log(`Jugó - ${players[i]}`);
            }
        }
    } while (winner != 1);


}

// Mostrar en pantalla las fichas de los jugadores
function showGame() {
    revolver = 1;
    document.getElementById('error').setAttribute('hidden', true);
    for (let j = 0; j < players.length; j++) {
        var content = `<h4>Jugador ${j + 1}</h4> <table class="table table-dark">`;
        for (let i = 0; i < playersDominoes[players[j]].length; i++) {
            content += `<tr>
                            <th id="${playersDominoes[players[j]][i].top}-${playersDominoes[players[j]][i].bottom}"></th>
                            <td>${playersDominoes[players[j]][i].top}</td>  
                            <td>|</td>
                            <td>${playersDominoes[players[j]][i].bottom}</td>
                        </tr>`
        }
        content += `</table>`;

        document.getElementById(players[j]).innerHTML = content;
    }
}

 // funcion iniciar
function init() {
    // Barajar
    domino.shuffle();
    //console.log(domino);

    // Repartimos fichas;
    assignDominoes();
    //console.log(playersDominoes);


    document.getElementById('revolver').addEventListener('click', showGame);

    document.getElementById('game').addEventListener('click', function(){
        if(revolver !== 0){
            if(intentos === 1){
                intentos++;
                play();
            }else{
                let message = 'Para volver a jugar deben resetear el juego anterior';
                document.getElementById('error').innerHTML = message;
                document.getElementById('error').removeAttribute('hidden');
            }
        }else{
            let message = 'Para poder jugar tienen que revolver el juego primero';
            document.getElementById('error').innerHTML = message;
            document.getElementById('error').removeAttribute('hidden');
        }
    });

    document.getElementById('reset').addEventListener('click', function() {
        location.reload();
    });

}

window.onload = init();

