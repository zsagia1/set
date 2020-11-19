const GameEngine = function() {
    this.deck = null;

    let cardsOnBoard = null;

    this.init = function() {
        template.createGameAreaContainer();
    };

    this.startGame = function(config) {
        
        template.createHeaderButtons(config.isSetButton, config.isWhereSetButton, config.isAutoSupplementButton);

        this.deck = new Deck(config.gameLevel, 3);

        cardsOnBoard = this.deck.handOutDeck(12);

        
    };

    this.init();
};