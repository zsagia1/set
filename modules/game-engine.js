const GameEngine = function() {
    this.deck = null;

    let cardsOnBoard = null;
    let selectedPlayerContainer = null;

    this.init = function() {
        template.createGameAreaContainer();
        template.createGamePlayersContainer();
    };

    this.startGame = function(config) {
        
        template.createHeaderButtons(config.isSetButton, config.isWhereSetButton, config.isAutoSupplementButton);

        createGamePlayers(config.playerNames);

        this.deck = new Deck(config.gameLevel);

        cardsOnBoard = this.deck.handOutDeck(12);

        maintainGameAreaContainer();
    };

    const createGamePlayers = function(playerNames) {
        const players = playerNames.map((playerName) => new Player(playerName));
        const playerElements = [];

        players.forEach((player) => {
            const playerContainer = document.createElement('div');

            playerContainer.classList.add('row');
            playerContainer.classList.add('player');
            playerContainer.setAttribute('data-player', JSON.stringify(player));
            console.log(player);

            playerContainer.innerHTML = 
                '<div class="col-sm-4 name">' + player.name + '</div>' +
                '<div class="col-sm-2 attempts">' + player.attempts + '</div>' +
                '<div class="col-sm-2 corrects">' + player.corrects + '</div>' +
                '<div class="col-sm-2 fails">' + player.fails + '</div>' +
                '<div class="col-sm-2 points">' + player.points + '</div>';

            playerElements.push(playerContainer);

            template.gamePlayersContainer.appendChild(playerContainer);
        });
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