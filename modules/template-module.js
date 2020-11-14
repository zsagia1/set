const Template = function() {

    this.playerInputsContainer = null;
    this.playerNumberElement = null;
    this.gameModesElement = null;
    this.isSetCheckboxElement = null;
    this.isWhereSetCheckboxElement = null;
    this.isAutoSupplementCheckboxElement = null;
    
    this.playerInputsContainer = document.querySelector('#playerInputs');
    this.playerNumberElement = document.querySelector('#playerNumber');
    this.gameModesElement = document.querySelector('#gameModes');
    this.isSetCheckboxElement = document.querySelector('#isSetCheckbox');
    this.isWhereSetCheckboxElement = document.querySelector('#isWhereSetCheckbox');
    this.isAutoSupplementCheckboxElement = document.querySelector('#isAutoSupplementCheckbox');
    
    
};