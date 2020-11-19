const Template = function() {

    this.playerInputsContainer = null;
    this.playerNumberElement = null;
    this.gameModesElement = null;
    this.gameLevelsElement = null;
    this.isSetCheckboxElement = null;
    this.isWhereSetCheckboxElement = null;
    this.isAutoSupplementCheckboxElement = null;
    this.gameSettingsDivElement = null;
    this.gameAreaDivElement = null;
    this.gameAreaContainer = null;
    this.gameAreaHeaderElement = null;
    
    
    this.playerInputsContainer = document.querySelector(PLAYER_INPUTS_ID);
    this.playerNumberElement = document.querySelector(PLAYER_NUMBER_ID);
    this.gameModesElement = document.querySelector(GAME_MODES_ID);
    this.gameLevelsElement = document.querySelector(GAME_LEVELS_ID);
    this.isSetCheckboxElement = document.querySelector(IS_SET_CHECKBOX_ID);
    this.isWhereSetCheckboxElement = document.querySelector(IS_WHERE_SET_CHECKBOX_ID);
    this.isAutoSupplementCheckboxElement = document.querySelector(IS_AUTO_SUPPLEMENT_CHECKBOX_ID);
    this.gameSettingsDivElement = document.querySelector(GAME_SETTINGS_DIV_ID);
    this.gameAreaDivElement = document.querySelector(GAME_AREA_DIV_ID);
    this.gameAreaContainer = document.querySelector(GAME_AREA_CONTAINER_ID);
    this.gameAreaHeaderElement = document.querySelector(GAME_AREA_HEADER_ID);
    
    this.changeAreas = function() {
        this.gameSettingsDivElement.classList.toggle('d-none');
        this.gameAreaDivElement.classList.toggle('d-none');
    };

    this.createHeaderButtons = function(isSetButton, isWhereSetButton, isAutoSupplementButton) {
        if(isSetButton == true) {
            const isSetButtonElement = document.createElement('button');

            isSetButtonElement.innerHTML = 'Is there Set?';
            isSetButtonElement.type = 'button';
            isSetButtonElement.classList.add('btn');
            isSetButtonElement.classList.add('btn-secondary');
            isSetButtonElement.classList.add('mr-1');

            this.gameAreaHeaderElement.appendChild(isSetButtonElement);
        }

        if(isWhereSetButton == true) {
            const isWhereSetButtonElement = document.createElement('button');

            isWhereSetButtonElement.innerHTML = 'Where is the Set?';
            isWhereSetButtonElement.type = 'button';
            isWhereSetButtonElement.classList.add('btn');
            isWhereSetButtonElement.classList.add('btn-secondary');
            isWhereSetButtonElement.classList.add('mr-1');

            this.gameAreaHeaderElement.appendChild(isWhereSetButtonElement);
        }

        if(isAutoSupplementButton == true) {
            const isAutoSupplementButtonElement = document.createElement('button');

            isAutoSupplementButtonElement.innerHTML = 'Supplement the board!';
            isAutoSupplementButtonElement.type = 'button';
            isAutoSupplementButtonElement.classList.add('btn');
            isAutoSupplementButtonElement.classList.add('btn-secondary');
            isAutoSupplementButtonElement.classList.add('mr-1');

            this.gameAreaHeaderElement.appendChild(isAutoSupplementButtonElement);
        }
    };

    this.createGameAreaContainer = function() {
        this.gameAreaContainer = document.querySelector(GAME_AREA_CONTAINER_ID);
    };
};