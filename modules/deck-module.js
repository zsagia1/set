let Deck = function() {
    this.cards = [];

    this.isEmpty = function() {
        return !!this.cards.length;
    };

    this.getDeckSize = function() {
        return this.cards.length;
    };

    this.logOutDeck = function() {
            console.log(this.cards);
    };


};