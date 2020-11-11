const Settings = function() {

    let maintainPlayerNameInputs = function() {
        const playerNameColumn = document.querySelector('#playerNameColumn');
        const playerNumberInput = document.querySelector('#playerNumberInput');

        function createPlayerInputs(number) {
            let playerDefaultNames = [];
            for(let i = 0; i < number; i++) {
                playerDefaultNames.push("Player" + (i+1));
            };

            let playerInputs = playerNameColumn.getElementsByTagName('input');

            if(playerInputs.length > number) {
                while(playerInputs.length > number) {
                    playerNameColumn.removeChild(playerNameColumn.childNodes[playerInputs.length]);
                };
            } else if(playerInputs.length < number) {
                while(playerInputs.length < number) {
                    let newInputElement = document.createElement('input');
                    newInputElement.value = playerDefaultNames[playerInputs.length];
                    newInputElement.type = "text";
                    playerNameColumn.appendChild(newInputElement);
                };
            }
        };

        createPlayerInputs(1);
        playerNumberInput.addEventListener('change', function(event) {
            createPlayerInputs(event.target.value);
        });
    };

    let = maintainGameModeSettings = function() {

        //gamemode container
        const gameModeSettings = document.querySelector('#gameModeSettings');
        
        //input array for get the value of default
        let gameModeRadioButtonsArray = gameModeSettings.getElementsByTagName('input');
        let gameModeInputValue;

        //get the value by default
        function getValueForGameModeByDefault(array, inputValue) {
            for(let i = 0; i < array.length; i++) {
                if(array[i].hasAttribute('checked') == true) {
                    inputValue = array[i].value;
                }
            };
            return inputValue;
        };

        //get the value by change
        function getValueForGameModeByChange(targetValue, inputValue) {
            inputValue = targetValue;
        }

        getValueForGameModeByDefault(gameModeRadioButtonsArray, gameModeInputValue);
        gameModeSettings.addEventListener('change', function(event) {
            getValueForGameModeByChange(event.target.value, gameModeInputValue);
        });
        console.log(gameModeInputValue);
    };

    maintainPlayerNameInputs();
    maintainGameModeSettings();
};

