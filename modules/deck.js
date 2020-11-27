var Deck = function(gameLevel) {
    this.cards = [];

    this.isEmpty = () => !!this.cards.length;

    this.getDeckSize = () => this.cards.length;
    
    this.logOutDeck = () => console.log(this.cards);

    this.handOutDeck = (cardNumber) => this.cards.splice(0, cardNumber);

    this.createCards = () => {
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

    this.shuffleDeck = (cards) => {
        var randomCards     = [];
        var pieceOfCards    = cards.length;
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

    this.init = () => {
        this.cards = this.createCards();
        this.cards = this.shuffleDeck(this.cards);
    
        this.logOutDeck();
      };

    this.init();
};