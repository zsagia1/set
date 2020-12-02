const GameEngine = function() {
    this.deck               = null;
    this.checkButtonElement = null;

    let cardsOnBoard            = null;
    let currentCheckInterval    = null;
    let currentSets             = [];
    let failedPlayerContainers   = [];
    let gameLevel               = null;
    let gameMode                = null;
    let isAutoSupplementButton  = false;
    let isSingleMode            = false;
    let players                 = null;
    let playersMap              = new Map();
    let selectedCards           = [];
    let selectedPlayerContainer = null;
    let timeForCheck            = null;


    this.init = () => {
        template.createGameAreaContainer();
        template.createGamePlayersContainer();

        registerKeyUpEvent();
    };

    this.startGame = (config) => {
        gameMode    = config.gameMode;
        gameLevel   = config.gameLevel;
        timeForCheck = config.timeForCheck;
        isAutoSupplementButton = config.isAutoSupplementButton;
        isSingleMode = config.playerNames.length === 1;

        createCheckButtonElement();
        
        createHeaderButtons(config.isSetButton, config.isWhereSetButton, config.isAutoSupplementButton);

        createGamePlayers(config.playerNames, template.gamePlayersContainer, isSingleMode);

        if(isSingleMode === true) {
            selectPlayer(0);
        }

        this.deck = new Deck(config.gameLevel);

        cardsOnBoard = this.deck.handOutDeck(12);

        maintainGameAreaContainer();

        storage.startGame(this.getnow(), players, gameMode, gameLevel);
    };

    const checkSelectedCardsForSet = () => {
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

    const checkSetOnCards = (cards) => {
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

    const clearCheckInterval = () => {
        clearInterval(currentCheckInterval);

        template.countdownElement.innerHTML = '';
    };

    const createCheckButtonElement = () => {
        this.checkButtonElement = document.createElement('button');

        this.checkButtonElement.innerHTML = 'CHECK';
        this.checkButtonElement.setAttribute('disabled', 'disabled');
        this.checkButtonElement.classList.add('btn');
        this.checkButtonElement.classList.add('btn-primary');
        this.checkButtonElement.classList.add('mr-1');

        this.checkButtonElement.addEventListener('click', (event) => {
            clearCheckInterval();
            
            const isSet = checkSelectedCardsForSet();

            handleCheckAction(isSet);
        });

        template.gameAreaHeaderElement.appendChild(this.checkButtonElement);
    };

    const createGamePlayers = (playerNames, container, isSingleMode) => {
        players = playerNames.map((playerName) => new Player(playerName));

        players.forEach((player) => playersMap.set(player.name, player));

        createGamePlayerList(players, container, true, isSingleMode);
    };

    const createGamePlayerList = (players, container, isAction, isSingleMode) => {
        const playerElements = [];

        players.forEach((player) => {
            const playerContainer = document.createElement('div');

            playerContainer.classList.add('row');
            playerContainer.classList.add('player');
            playerContainer.setAttribute('data-player', JSON.stringify(player));

            if(isAction === true && !isSingleMode) {
                playerContainer.addEventListener('click', (event) => {
                    if (selectedCards.length === 0 && !failedPlayerContainers.includes(playerContainer)) {
                        clearCheckInterval();

                        selectedPlayerContainer = playerContainer;
    
                        playerElements.forEach((playerElement) => {
                            playerElement.classList.remove('selected');
                        });
    
                        playerContainer.classList.add('selected');
    
                        currentCheckInterval = setCheckingCountdown(1000, timeForCheck);
                    }
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

    const createHeaderButtons = (isSetButton, isWhereSetButton, isAutoSupplementButton) => {

        template.createHeaderButtons(isSetButton, isWhereSetButton, isAutoSupplementButton);

        if(isSetButton === true) {
            setClickEventOnIsSetButton();
        }

        if(isWhereSetButton === true) {
            setClickEventOnIsWhereSetButton();
        }

        if(isAutoSupplementButton === true) {
            template.isAutoSupplementButtonElement.setAttribute('disabled', 'disabled');

            template.isAutoSupplementButtonElement.addEventListener('click', (event) => {
                cardsOnBoard = [...cardsOnBoard, ...this.deck.handOutDeck(3)];

                maintainGameAreaContainer();
            });
        }
    };

    const equalOrDifferent = (values) => {
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

    const findSet = (cardsMap) => {
        const correctSets = [];

        Array.from(cardsMap.values()).forEach((cards) => {

            if(checkSetOnCards(cards) === true) {
                correctSets.push(cards);
            }
        });
        return correctSets;
    };

    const generateThreeCardsArray = (cards) => {
        const threeCards = new Map();

        cards.forEach((card1) =>
            cards.forEach((card2) =>
                cards.forEach((card3) => {
                    if(card1.name !== card2.name && card1.name !== card3.name && card2.name !== card3.name) {
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
        return threeCards;
    };

    this.getnow = () => {
        const date = new Date();

        return date.getTime();
    };

    const handleCheckAction = (isSet) => {
        maintainPlayer(selectedPlayerContainer, isSet);

        if(isSet === true) {
            selectedCards.forEach((card) => {
                cardsOnBoard = cardsOnBoard.filter(
                    (cardOnBoard) => cardOnBoard !== card
                );
            });

            console.log(cardsOnBoard);

            cardsOnBoard = [...cardsOnBoard, ...this.deck.handOutDeck(3)];

            failedPlayerContainers = [];
        } else if(!isSingleMode) {
            failedPlayerContainers.push(selectedPlayerContainer);
        }

        if(failedPlayerContainers.length === players.length) {
            failedPlayerContainers = [];
        }

        storage.addHistoryItem(
            this.getnow(),
            JSON.parse(selectedPlayerContainer.getAttribute('data-player')),
            selectedCards,
            isSet
        );

        reset(isSingleMode);

        maintainGameAreaContainer();

        if(currentSets.length === 0 && this.deck.getDeckSize() === 0) {
            this.finishGame();
        } else if(currentSets.length === 0 && isAutoSupplementButton === true) {
            template.isAutoSupplementButtonElement.removeAttribute('disabled');
        }
    };

    const maintainGameAreaContainer = () => {
        currentSets = findSet(generateThreeCardsArray(Array.from(cardsOnBoard)));

        while(currentSets.length === 0 && !isAutoSupplementButton && this.deck.getDeckSize() > 0) {
            cardsOnBoard = [...cardsOnBoard, ...this.deck.handOutDeck(3)];
            currentSets = findSet(generateThreeCardsArray(Array.from(cardsOnBoard)));
        }

        if(currentSets.length > 0 && 
            isAutoSupplementButton === true && 
            !template.isAutoSupplementButtonElement.disabled) {
                template.isAutoSupplementButtonElement.setAttribute('disabed', 'disabled');
        }

        template.gameAreaContainer.innerHTML = "";
        template.cardNumberElement.innerHTML = this.deck.getDeckSize();

        cardsOnBoard.forEach((card) => {
            const cardElement = document.createElement('span');

            cardElement.classList.add('card-container');
            cardElement.setAttribute('data-card', JSON.stringify(card));

            var img = document.createElement('img');

            img.addEventListener('click', (event) => {
                if (selectedCards.length < 3 && !!selectedPlayerContainer) {
                    if (selectedCards.includes(card)) {
                        selectedCards = selectedCards.filter((selectedCard) => {
                            return selectedCard.name !== card.name;
                        });

                        img.classList.toggle('selected');
                    } else {
                        selectedCards.push(card);

                        img.classList.toggle('selected');
                    }
                }

                if(selectedCards.length === 3) {
                    this.checkButtonElement.removeAttribute('disabled');
                }

                console.log("Selected Cards: ", selectedCards);
            });

            img.setAttribute('width', 110);
            img.setAttribute('src', 'images/' + card.imageURL);
            img.setAttribute('data-card', JSON.stringify(card));

            cardElement.appendChild(img);

            template.gameAreaContainer.appendChild(cardElement);
        });
    };

    const maintainPlayer = (playerContainer, isSet) => {
        const player = JSON.parse(playerContainer.getAttribute('data-player'));

        player.attempts = player.attempts + 1;

        if(isSet === true) {
            player.corrects = player.corrects + 1;
            player.points   = player.points + 1;
        } else {
            player.fails    = player.fails + 1;
            player.points   = player.points - 1;
        }

        playerContainer.querySelector('.attempts').innerHTML    = player.attempts;
        playerContainer.querySelector('.corrects').innerHTML    = player.corrects;
        playerContainer.querySelector('.fails').innerHTML       = player.fails;
        playerContainer.querySelector('.points').innerHTML      = player.points;

        playerContainer.setAttribute('data-player', JSON.stringify(player));

        playersMap.set(player.name, player);
    };

    const registerKeyUpEvent = () => {
        document.addEventListener('keyup', (event) => {
            if(event.altKey === true) {
                const index = event.code.replace('Numpad', '');

                Array.from(template.gamePlayersContainer.children).forEach((playerElement) => {
                    playerElement.classList.remove('selected');
                });

                selectPlayer(index);

                currentCheckInterval = setCheckingCountdown(
                    1000,
                    timeForCheck
                );
            }
        });
    };

    const reset = (isSingleMode) => {
        if(!isSingleMode) {
            selectedPlayerContainer.classList.remove('selected');
            selectedPlayerContainer = null;
        }

        this.checkButtonElement.setAttribute('disabled', 'disabled');

        selectedCards = [];
    };

    const selectPlayer = (index) => {
        selectedPlayerContainer = template.gamePlayersContainer.children[index];

        selectedPlayerContainer.classList.add('selected');
    };

    const setClickEventOnIsSetButton = () => {
        template.isSetButtonElement.addEventListener('click', (event) => {
            const currentSetsNumber = currentSets.length;
            let isSetContainer = document.createElement('div');

            isSetContainer.classList.add('isSet');
            isSetContainer.innerHTML = currentSetsNumber > 0
                ? `There is set on the board.`
                : `There is no set on the board.`;

            template.gameAreaHeaderElement.appendChild(isSetContainer);

            setTimeout(() => {
                template.gameAreaHeaderElement.removeChild(template.gameAreaHeaderElement.lastChild);
            }, 6000);
        });
    };

    const setClickEventOnIsWhereSetButton = () => {
        template.isWhereSetButtonElement.addEventListener('click', (event) => {
            if(currentSets.length === 0) {
                let whereSetContainer = document.createElement('div');

                whereSetContainer.classList.add('is-where-set');
                whereSetContainer.innerHTML = `There is no set on the board`;

                template.gameAreaHeaderElement.appendChild(whereSetContainer);

                setTimeout(() => {
                    template.gameAreaHeaderElement.removeChild(template.gameAreaHeaderElement.lastChild);
                }, 6000);
            } else {
                const currentSelectedSetCardElements = [];

                currentSets[0].forEach((setCard) => {
                    const setCardElement = 
                        Array.from(template.gameAreaContainer.children).find((cardElement) => {
                        const card = 
                            JSON.parse(cardElement.getAttribute('data-card'));

                        return card.name === setCard.name;
                    });

                    setCardElement.querySelector('img').classList.toggle('selected');

                    currentSelectedSetCardElements.push(setCardElement);
                });

                setTimeout(() => {
                    currentSelectedSetCardElements.forEach((setCardElement) => {
                        return setCardElement.querySelector('img').classList.toggle('selected')
                    });
                }, 3000);
            }
        });
    };

    const setCheckingCountdown = (time, fromValue) => {
        return setInterval(() => {
            template.countdownElement.innerHTML = --fromValue;

            if(fromValue === -1) {
                clearCheckInterval();

                handleCheckAction(false);
            }
        }, time);
    };

    this.finishGame = () => {
        storage.finishGame(this.getnow());

        template.gameAreaDivElement.classList.add('d-none');
        template.gameResultDivElement.classList.remove('d-none');

        const sortedPlayers = Array.from(playersMap.values()).sort((a, b) =>
            a.points < b.points ? 1 : -1
        );

        createGamePlayerList(sortedPlayers, template.gameResultDivElement, false);
    };

    this.init();
};