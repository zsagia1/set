var Config = function(
    playerNames,
    gameLevel,
    gameMode,
    isAutoSupplementButton,
    isSetButton,
    isWhereSetButton
) {
    this.playerNames            = playerNames || [];
    this.gameLevel              = gameLevel || GAME_LEVELS_ID;
    this.gameMode               = gameMode || GAME_MODE_PRACTICE;
    this.isAutoSupplementButton = isAutoSupplementButton || false;
    this.isSetButton            = isSetButton || false;
    this.isWhereSetButton       = isWhereSetButton || false;
};