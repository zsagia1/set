const playerNameColumn = document.querySelector('#playerNameColumn');
const playerNumberInput = document.querySelector('#playerNumberInput');

function createPlayerInputs(number) {
    let playerDefaultNames = [];
    for(let i = 0; i < number; i++) {
        playerDefaultNames.push("Player" + (i+1));
    }

    let playerInputs = playerNameColumn.getElementsByTagName('input');

    if(playerInputs.length > number) {
        while(playerInputs.length > number) {
            playerNameColumn.removeChild(playerNameColumn.childNodes[playerInputs.length])
        }
    } else if(playerInputs.length < number) {
        while(playerInputs.length < number) {
            let newInputElement = document.createElement('input');
            newInputElement.value = playerDefaultNames[playerInputs.length];
            newInputElement.type = "text";
            playerNameColumn.appendChild(newInputElement);
        }
    }
}

createPlayerInputs(1);
playerNumberInput.addEventListener('change', function(event) {
    createPlayerInputs(event.target.value);
});