const GameEngine = function() {
    this.deck = null;

    let cardsOnBoard = null;
    let currentSets = [];
    let playersMap = new Map();
    let selectedCards = [];
    let selectedPlayerContainer = null;

    

    this.init = function() {
        template.createGameAreaContainer();
        template.createGamePlayersContainer();
    };

    this.startGame = function(config) {
        createCheckButtonElement();
        
        createHeaderButtons(config.isSetButton, config.isWhereSetButton, config.isAutoSupplementButton);

        createGamePlayers(config.playerNames, template.gamePlayersContainer);

        this.deck = new Deck(config.gameLevel);

        cardsOnBoard = this.deck.handOutDeck(12);

        maintainGameAreaContainer();
    };

    const generateThreeCardsArray = function(cards) {
        const threeCards = new Map();

        cards.forEach((card1) =>
            cards.forEach((card2) =>
                cards.forEach((card3) => {
                    if(card1 !== card2 && card1 !==card3 && card2 !==card3) {
                        const selectedCards = [card1, card2, card3];
                        const sortedSelectedCards = selectedCards.sort((c1, c2) => {
                            c1.name < c2.name ? 1 : -1
                        });
                        const name = sortedSelectedCards.map((c) => c.name).join('-');

                        threeCards.set(name, selectedCards);
                    }
                })
            )
        );

        console.log(threeCards);

        return threeCards;
    };

    const equalOrDifferent = function(values) {
        return (
                (values[0]  === values[1] &&
                values[0]   === values[2] &&
                values[1]   === values[2]) 
                ||
                (values[0]  !== values[1] &&
                values[0]   !== values[2] &&
                values[1]   !== values[2])
        );
    };

    const checkSetOnCards = function(cards) {
        if(
            equalOrDifferent([cards[0].number,  cards[1].number,    cards[2].number])   &&
            equalOrDifferent([cards[0].content, cards[1].content,   cards[2].content])  &&
            equalOrDifferent([cards[0].color,   cards[1].color,     cards[2].color])    &&
            equalOrDifferent([cards[0].shape,   cards[1].shape,     cards[2].shape])
        ) {
            return true;
        } else {
            return false;
        }
    };

    const findSet = function(cardsMap) {
        const correctSets = [];

        Array.from(cardsMap.values()).forEach((cards) => {
            console.log(cards);

            if(checkSetOnCards == true) {
                correctSets.push(cards);
            }
        });
        return correctSets;
    };

    const checkSelectedCardsForSet = function() {
        return currentSets.reduce((isSet, currentCards) => {
            if(
                currentCards.includes(selectedCards[0]) &&
                currentCards.includes(selectedCards[1]) &&
                currentCards.includes(selectedCards[2])
            ) {
                isSet = true;
            }
            return isSet;
        }, false);
    };

    const createCheckButtonElement = function() {
        this.checkButtonElement = document.createElement('button');

        this.checkButtonElement.innerHTML = 'CHECK';
        this.checkButtonElement.setAttribute('enabled', 'enabled');
        this.checkButtonElement.classList.add('btn');
        this.checkButtonElement.classList.add('btn-primary');
        this.checkButtonElement.classList.add('mr-1');

        this.checkButtonElement.addEventListener('click', (event) => {
            const isSet = checkSelectedCardsForSet();

            if(isSet == true) {
                selectedCards.forEach((card) => {
                    cardsOnBoard = cardsOnBoard.filter((cardOnBoard) => {
                        return cardOnBoard !== card;
                    });
                });

                console.log(cardsOnBoard);

                cardsOnBoard = [...cardsOnBoard, ...this.deck.handOutDeck(3)];
            }
        });

        template.gameAreaHeaderElement.appendChild(this.checkButtonElement);
    };

    const createGamePlayerList = function(players, container, isAction) {
        const playerElements = [];

        players.forEach((player) => {
            const playerContainer = document.createElement('div');

            playerContainer.classList.add('row');
            playerContainer.classList.add('player');
            playerContainer.setAttribute('data-player', JSON.stringify(player));

            if(isAction == true) {
                playerContainer.addEventListener('click', (event) => {
                    selectedPlayerContainer = playerContainer;

                    playerElements.forEach((playerElement) => {
                        playerElement.classList.remove('selected');
                    });

                    playerContainer.classList.add('selected');
                });
            }

            playerContainer.innerHTML = 
                '<div class="col-sm-4 name">'       + player.name       + '</div>' +
                '<div class="col-sm-2 attempts">'   + player.attempts   + '</div>' +
                '<div class="col-sm-2 corrects">'   + player.corrects   + '</div>' +
                '<div class="col-sm-2 fails">'      + player.fails      + '</div>' +
                '<div class="col-sm-2 points">'     + player.points     + '</div>';

            playerElements.push(playerContainer);

            container.appendChild(playerContainer);
        });
    };

    const createGamePlayers = (playerNames, container) => {
        players = playerNames.map((playerName) => new Player(playerName));

        players.forEach(player => playersMap.set(player.name, player));

        createGamePlayerList(players, container, true);
    };

    const maintainGameAreaContainer = () => {
        template.gameAreaContainer.innerHTML = "";

        cardsOnBoard.forEach((card) => {
            const cardElement = document.createElement("span");

            cardElement.classList.add("card-container");
            cardElement.setAttribute("data-card", JSON.stringify(card));

            var img = document.createElement("img");

            img.addEventListener("click", (event) => {
                if (selectedCards.length < 3 && !!selectedPlayerContainer) {
                    if (selectedCards.includes(card)) {
                        selectedCards = selectedCards.filter((selectedCard) => {
                            return selectedCard.name !== card.name;
                        });

                        img.classList.toggle("selected");
                    } else {
                        selectedCards.push(card);

                        img.classList.toggle("selected");
                    }
                }

                console.log("Selected Cards: ", selectedCards);
            });

            img.setAttribute("width", 120);
            img.setAttribute("src", "images/" + card.imageURL);
            img.setAttribute("data-card", JSON.stringify(card));

            cardElement.appendChild(img);

            template.gameAreaContainer.appendChild(cardElement);

            currentSets = findSet(generateThreeCardsArray(Array.from(cardsOnBoard)));
        });
    };

    const createHeaderButtons = function(isSetButton, isWhereSetButton, isAutoSupplementButton) {

        template.createHeaderButtons(isSetButton, isWhereSetButton, isAutoSupplementButton);
    };

    this.init();
};