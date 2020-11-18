const Template = function() {

    this.playerInputsContainer = null;
    this.playerNumberElement = null;

    this.gameModesElement = null;
    this.gameLevelsElement = null;

    this.isSetCheckboxElement = null;
    this.isWhereSetCheckboxElement = null;
    this.isAutoSupplementCheckboxElement = null;
    
    
    this.playerInputsContainer = document.querySelector(PLAYER_INPUTS_ID);
    this.playerNumberElement = document.querySelector(PLAYER_NUMBER_ID);

    this.gameModesElement = document.querySelector(GAME_MODES_ID);
    this.gameLevelsElement = document.querySelector(GAME_LEVELS_ID);

    this.isSetCheckboxElement = document.querySelector(IS_SET_CHECKBOX_ID);
    this.isWhereSetCheckboxElement = document.querySelector(IS_WHERE_SET_CHECKBOX_ID);
    this.isAutoSupplementCheckboxElement = document.querySelector(IS_AUTO_SUPPLEMENT_CHECKBOX_ID);
    
    
};