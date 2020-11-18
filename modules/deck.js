var Deck = function(gameLevel) {
    this.cards = [];

    this.isEmpty = function() {
        return !!this.cards.length;
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

        console.log(cards);
    };

    this.getDeckSize = function() {
        return this.cards.length;
    };

    this.logOutDeck = function() {
            console.log(this.cards);
    };
    this.createCards();

};