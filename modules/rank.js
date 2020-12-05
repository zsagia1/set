var Rank = function() {
    let histories = null;

    this.init = () => {
        histories = storage.read(HISTORIES) || [];

        createCompetitionRank(GAME_LEVEL_BEGINNER);
        createCompetitionRank(GAME_LEVEL_ADVANCED);
        createMultiPlayerResultList();
    };

    const calculateCompetitionRankPlayers = (gameLevel) => {
        competitionHistories = histories.filter((history) =>
            history.gameMode        === GAME_MODE_COMPETITION &&
            history.gameLevel       === gameLevel &&
            history.players.length  === 1
        );

        return competitionHistories.map((history) => {
            return {
                playerName: history.players[0].name,
                timeLength: (history.endTime - history.startTime) / 1000
            };
        }).sort((a, b) => (a.timeLength < b.timeLength ? -1 : 1));
    };

    const calculateMultiPlayerGameWinnerPlayers = () => {
        multiPlayerHistories = histories.filter((history) => 
            history.gameMode === GAME_MODE_COMPETITION &&
            history.players.length > 1
        );

        return multiPlayerHistories.map((history) => {
            return {
                playerName: history.players[0].name,
                attempts:   history.players[0].attempts,
                points:     history.players[0].points
            }
        })
    };

    const createCompetitionRank = (gameLevel) => {
        const headerElement = document.createElement('h2');
        const emptyRankElement = document.createElement('h2');

        headerElement.innerHTML = gameLevel[0].toUpperCase() + gameLevel.slice(1) + ' ' + 'Competition Rank';
        emptyRankElement.innerHTML = 'No ' + gameLevel + ' results found yet!';

        const tableElement = document.createElement('table');
        const tableElementTr = document.createElement('tr');
        const tableElementTh1 = document.createElement('th');
        const tableElementTh2 = document.createElement('th');

        tableElement.classList.add('table');
        tableElement.classList.add('table-dark');

        tableElementTh1.innerHTML = 'Name';
        tableElementTh2.innerHTML = 'Time';

        tableElementTr.appendChild(tableElementTh1);
        tableElementTr.appendChild(tableElementTh2);

        tableElement.appendChild(tableElementTr);

        template.gameRankElement.appendChild(headerElement);
        template.gameRankElement.appendChild(emptyRankElement);

        const rankedPlayers = calculateCompetitionRankPlayers(gameLevel);

        if(rankedPlayers.length === 0) {
            headerElement.classList.add('d-none');
            tableElement.classList.add('d-none');
        } else {
            headerElement.classList.remove('d-none');
            tableElement.classList.remove('d-none');
            emptyRankElement.classList.add('d-none');

            rankedPlayers.slice(0, 10).forEach((player) => {
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
    
                td1.innerHTML = player.playerName;
                td2.innerHTML = player.timeLength + ' seconds';
    
                tr.appendChild(td1);
                tr.appendChild(td2);
    
                tableElement.appendChild(tr);
            })
        }

        template.gameRankElement.appendChild(tableElement);
    };

    const createMultiPlayerResultList = () => {
        const headerElement = document.createElement('h2');
        const emptyRankElement = document.createElement('h2');

        headerElement.innerHTML = 'Multiplayer Winner List';
        emptyRankElement.innerHTML = 'No multiplayer results found yet!';

        const tableElement = document.createElement('table');
        const tableElementTr = document.createElement('tr');
        const tableElementTh1 = document.createElement('th');
        const tableElementTh2 = document.createElement('th');
        const tableElementTh3 = document.createElement('th');
        
        tableElement.classList.add('table');
        tableElement.classList.add('table-dark');

        tableElementTh1.innerHTML = 'Name';
        tableElementTh2.innerHTML = 'Attempt';
        tableElementTh3.innerHTML = 'Point';

        tableElementTr.appendChild(tableElementTh1);
        tableElementTr.appendChild(tableElementTh2);
        tableElementTr.appendChild(tableElementTh3);

        tableElement.appendChild(tableElementTr);     

        template.gameRankElement.appendChild(headerElement);
        template.gameRankElement.appendChild(emptyRankElement);

        const winnerPlayers = calculateMultiPlayerGameWinnerPlayers();

        if(winnerPlayers.length === 0) {
            headerElement.classList.add('d-none');
            tableElement.classList.add('d-none');
        } else {
            headerElement.classList.remove('d-none');
            tableElement.classList.remove('d-none');
            emptyRankElement.classList.add('d-none');

            winnerPlayers.slice(0, 10).forEach((player) => {
                const tr = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                const td3 = document.createElement('td');

                td1.innerHTML = player.playerName;
                td2.innerHTML = player.attempts;
                td3.innerHTML = player.points;

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);

                tableElement.appendChild(tr);
            });
        }

        template.gameRankElement.appendChild(tableElement);
    };

    this.init();
};