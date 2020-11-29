var History = function(startTime, players, gameMode, gameLevel) {
    this.endTime    = null;
    this.gameLevel  = gameLevel;
    this.gameMode   = gameMode;
    this.item       = [];
    this.players    = players;
    this.startTime  = startTime;
};

var HistoryItem = function(actionTime, player, action, result) {
    this.action     = action;
    this.actionTime = actionTime;
    this.player     = player;
    this.result     = result;
};