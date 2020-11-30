var Config = function(
    playerNames,
    gameLevel,
    gameMode,
    isAutoSupplementButton,
    isSetButton,
    isWhereSetButton
) {
    this.playerNames            = playerNames || [];
    this.gameLevel              = gameLevel || GAME_LEVEL_BEGINNER;
    this.gameMode               = gameMode || GAME_MODE_PRACTICE;
    this.isAutoSupplementButton = isAutoSupplementButton || false;
    this.isSetButton            = isSetButton || false;
    this.isWhereSetButton       = isWhereSetButton || false;
    this.timeForCheck           = 10;
};