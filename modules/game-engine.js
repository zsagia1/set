const GameEngine = function() {
    this.deck = null;

    let cardsOnBoard = null;

    this.init = function() {
        template.createGameAreaContainer();
        template.createGamePlayersContainer();
    };

    this.startGame = function(config) {
        
        template.createHeaderButtons(config.isSetButton, config.isWhereSetButton, config.isAutoSupplementButton);

        this.deck = new Deck(config.gameLevel);

        cardsOnBoard = this.deck.handOutDeck(12);

        maintainGameAreaContainer();
    };

    const maintainGameAreaContainer = function() {
        template.gameAreaContainer.innerHTML = "";

        cardsOnBoard.forEach((card) => {
            const cardElement = document.createElement('span');

            cardElement.classList.add('card-container');

            var img = document.createElement('img');
            img.setAttribute('width', 120);
            img.setAttribute('src', 'images/' + card.imageURL);
            img.setAttribute('data-card', JSON.stringify(card));

            cardElement.appendChild(img);
            template.gameAreaContainer.appendChild(cardElement);
        });


    };

    this.init();
};