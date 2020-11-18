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
    
    this.changeAreas = function() {
        this.gameSettingsDivElement.classList.toggle('d-none');
        this.gameAreaDivElement.classList.toggle('d-none');
    };

    this.createGameAreaContainer = function() {
        this.gameAreaContainer = document.querySelector(GAME_AREA_CONTAINER_ID);
    };
};