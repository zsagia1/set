var Config = function(
    playerNames,
    gameMode,
    gameLevel,
    isSetButton,
    isWhereSetButton,
    isAutoSupplementButton
) {
    this.playerNames = playerNames || [];
    this.gameMode = gameMode || GAME_MODES_ID;
    this.gameLevel = gameLevel || GAME_LEVELS_ID;
    this.isSetButton = isSetButton || false;
    this.isWhereSetButton = isWhereSetButton || false;
    this.isAutoSupplementButton = isAutoSupplementButton || false;
};