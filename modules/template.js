const Template = function() {
    this.cardNumberElement  = null;
    this.countdownElement   = null;
    
    this.gameAreaContainer              = null;
    this.gameAreaDivElement             = null;
    this.gameAreaHeaderElement          = null;
    this.gameFurtherSettingsDivElement  = null;
    this.gameRankElement                = null;
    this.gameResultDivElement           = null;
    this.gameSettingsDivElement         = null;

    this.gameLevelsElement      = null;
    this.gameModesElement       = null;
    this.gamePlayersContainer   = null;

    this.isAutoSupplementCheckboxElement    = null;
    this.isSetCheckboxElement               = null;
    this.isWhereSetCheckboxElement          = null;

    this.isSetButtonElement     = null;
    this.isWhereButtonElement   = null;

    this.playerInputsContainer  = null;
    this.playerNumberElement    = null;
    
    this.cardNumberElement  = document.querySelector(CARD_NUMBER_ID);
    this.countdownElement   = document.querySelector(COUNTDOWN_ID);

    this.gameAreaContainer              = document.querySelector(GAME_AREA_ID);
    this.gameAreaDivElement             = document.querySelector(GAME_AREA_DIV_ID);
    this.gameAreaHeaderElement          = document.querySelector(GAME_AREA_HEADER_ID);
    this.gameFurtherSettingsDivElement  = document.querySelector(GAME_FURTHER_SETTINGS_DIV_ID);
    this.gameRankElement                = document.querySelector(GAME_RANK_ID);
    this.gameResultDivElement           = document.querySelector(GAME_RESULT_DIV_ID);
    this.gameSettingsDivElement         = document.querySelector(GAME_SETTINGS_DIV_ID);

    this.gameLevelsElement  = document.querySelector(GAME_LEVELS_ID);
    this.gameModesElement   = document.querySelector(GAME_MODES_ID);

    this.isAutoSupplementCheckboxElement    = document.querySelector(IS_AUTO_SUPPLEMENT_CHECKBOX_ID);
    this.isSetCheckboxElement               = document.querySelector(IS_SET_CHECKBOX_ID);
    this.isWhereSetCheckboxElement          = document.querySelector(IS_WHERE_SET_CHECKBOX_ID);

    this.playerInputsContainer  = document.querySelector(PLAYER_INPUTS_ID);
    this.playerNumberElement    = document.querySelector(PLAYER_NUMBER_ID);
    

    this.changeAreas = () => {
        this.gameSettingsDivElement.classList.toggle('d-none');
        this.gameAreaDivElement.classList.toggle('d-none');
    };

    this.createHeaderButtons = (isSetButton, isWhereSetButton, isAutoSupplementButton) => {
        if(isSetButton === true) {
            this.isSetButtonElement = document.createElement('button');

            this.isSetButtonElement.innerHTML = 'Is there Set?';
            this.isSetButtonElement.type = 'button';
            this.isSetButtonElement.classList.add('btn');
            this.isSetButtonElement.classList.add('btn-secondary');
            this.isSetButtonElement.classList.add('mr-1');

            this.gameAreaHeaderElement.appendChild(this.isSetButtonElement);
        }

        if(isWhereSetButton === true) {
            this.isWhereSetButtonElement = document.createElement('button');

            this.isWhereSetButtonElement.innerHTML = 'Where is the Set?';
            this.isWhereSetButtonElement.type = 'button';
            this.isWhereSetButtonElement.classList.add('btn');
            this.isWhereSetButtonElement.classList.add('btn-secondary');
            this.isWhereSetButtonElement.classList.add('mr-1');

            this.gameAreaHeaderElement.appendChild(this.isWhereSetButtonElement);
        }

        if(isAutoSupplementButton === true) {
            this.isAutoSupplementButtonElement = document.createElement('button');

            this.isAutoSupplementButtonElement.innerHTML = 'Supplement';
            this.isAutoSupplementButtonElement.type = 'button';
            this.isAutoSupplementButtonElement.classList.add('btn');
            this.isAutoSupplementButtonElement.classList.add('btn-secondary');
            this.isAutoSupplementButtonElement.classList.add('mr-1');

            this.gameAreaHeaderElement.appendChild(this.isAutoSupplementButtonElement);
        }
    };

    this.createGameAreaContainer = () => {
        this.gameAreaContainer = document.querySelector(GAME_AREA_ID);
    };

    this.createGamePlayersContainer = () => {
        this.gamePlayersContainer = document.querySelector(GAME_PLAYERS_ID);
    };
};