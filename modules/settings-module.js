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

    let maintainGameModeSettings = function() {

        //gamemode container
        const gameModeSettings = document.querySelector('#gameModeSettings');
        
        //input array for get the value of default
        let gameModeRadioButtonsArray = gameModeSettings.getElementsByTagName('input');

        //get the value by default
        function getValueForGameModeByDefault(array) {
            for(let i = 0; i < array.length; i++) {
                if(array[i].hasAttribute('checked') == true) {
                    gameModeInputValue = array[i].value;
                }
            };
            return gameModeInputValue;
        };

        //get the value by change
        function getValueForGameModeByChange(targetValue) {
            return gameModeInputValue = targetValue;
        };

        getValueForGameModeByDefault(gameModeRadioButtonsArray);
        gameModeSettings.addEventListener('change', function(event) {
            getValueForGameModeByChange(event.target.value);
            console.log(gameModeInputValue);
        });
        return gameModeInputValue;
    };

/*
    let maintainGameLevelSettings = function() {

        //gamelevel container
        const gameLevelSettings = document.querySelector('#gameLevelSettings');

        //get the value by change
        function getValueForGameLevelByChange(targetValue) {
            return gameLevelInputValue = targetValue;
        };

        gameLevelSettings.addEventListener('change', function(event) {
            getValueForGameLevelByChange(event.target.value);
            console.log(gameLevelInputValue);
        });

    };
*/

    maintainPlayerNameInputs();
    maintainGameModeSettings();
    console.log(gameModeInputValue);
    //maintainGameLevelSettings();
};

