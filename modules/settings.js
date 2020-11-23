const Settings = function() {

    this.maintainPlayerNameInputs = function(playerNumber, playerInputsContainer) {

        var playerInputs = playerInputsContainer.getElementsByTagName('input');

        if(playerInputs.length > playerNumber) {
            while(playerInputs.length > playerNumber) {
                playerInputsContainer.removeChild(
                    playerInputsContainer.childNodes[playerInputs.length]
                );
            }
        } else if(playerInputs.length < playerNumber) {
            while(playerInputs.length < playerNumber) {
                var x = document.createElement('input');

                x.setAttribute('type', 'text');
                x.setAttribute('value', 'Player' + (playerInputs.length + 1));

                playerInputsContainer.appendChild(x);
            }
        }
    };

    this.init = function() {
        template.playerNumberElement.setAttribute('value', defaultSettings.defaultPlayerNumber);

        template.playerNumberElement.addEventListener('change', (event) => {
            this.maintainPlayerNameInputs(event.target.value, template.playerInputsContainer);
        });

        template.gameModesElement.addEventListener('change', function(event) {
            if(event.target.value === 'competition') {
                template.isAutoSupplementCheckboxElement.setAttribute('disabled', 'disabled');
                template.isAutoSupplementCheckboxElement.removeAttribute('checked');

                template.isSetCheckboxElement.setAttribute('disabled', 'disabled');
                template.isSetCheckboxElement.removeAttribute('checked');

                template.isWhereSetCheckboxElement.setAttribute('disabled', 'disabled');
                template.isWhereSetCheckboxElement.removeAttribute('checked');
            } else {
                template.isSetCheckboxElement.removeAttribute('disabled');

                template.isWhereSetCheckboxElement.removeAttribute('disabled');

                template.isAutoSupplementCheckboxElement.removeAttribute('disabled');
            }
        });
    };

    this.createConfig = () => (
        new Config(
            this.getPlayers(),
            this.getGameLevel(),
            this.getGameMode(),
            this.isAutoSupplementButton(),
            this.isSetButton(),
            this.isWhereSetButton(),
        )
    );

    this.getGameLevel = function() {
        return document.querySelector('input[name=gameLevel]:checked').value;
    };

    this.getGameMode = function() {
        return document.querySelector('input[name=gameMode]:checked').value;
    };

    this.getPlayers = function () {
        var playerInputs = template.playerInputsContainer.getElementsByTagName('input');

        return Array.from(playerInputs).map(
            (playerInput) => playerInput.value
        );
    };

    this.isAutoSupplementButton = function() {
        return !!document.querySelector('input[name=isAutoSupplementCheckbox]:checked');
    };

    this.isSetButton = function() {
        return !!document.querySelector('input[name=isSetCheckbox]:checked');
    };

    this.isWhereSetButton = function() {
        return !!document.querySelector('input[name=isWhereSetCheckbox]:checked');
    };

    this.init();
};