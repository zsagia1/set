var Deck = function(gameLevel, setSize) {
    this.cards = [];

    this.isEmpty = function() {
        return !!this.cards.length;
    };

    this.getDeckSize = function() {
        return this.cards.length;
    };

    this.createCards = function() {
        var cards = [];

        if(gameLevel === 'beginner') {
            CARD_NUMBERS.forEach((number) =>
                CARD_COLORS.forEach((color) =>
                    CARD_SHAPES.forEach((shape) =>
                        cards.push(new Card(number, CARD_CONTENTS[0], color, shape))
                    )
                )
            );
        } else {
            CARD_NUMBERS.forEach((number) =>
                CARD_CONTENTS.forEach((content) =>
                    CARD_COLORS.forEach((color) =>
                        CARD_SHAPES.forEach((shape) =>
                            cards.push(new Card(number, content, color, shape))
                        )
                    )
                )
            );
        }

        return cards;
    };

    this.shuffleDeck = function(cards) {
        var randomCards = [];
        var pieceOfCards = cards.length;
        var i;

        while(pieceOfCards) {
            i = Math.floor(Math.random() * cards.length);

            if(i in cards) {
                randomCards.push(cards[i]);
                delete cards[i];
                pieceOfCards--;
            }
        }

        return randomCards;
    };

    this.logOutDeck = function() {
        console.log(this.cards);
    };

    this.handOutDeck = function(cardNumber) {
        return this.cards.splice(0, cardNumber);
    };

    this.handOutNumber = setSize;

    this.init = function () {
        this.cards = this.createCards();
        this.cards = this.shuffleDeck(this.cards);
    
        this.logOutDeck();
      };

    this.init();
};