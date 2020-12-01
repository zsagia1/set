const Settings = function() {

    this.maintainPlayerNameInputs = (playerNumber, playerInputsContainer) => {

        var playerInputs = playerInputsContainer.getElementsByTagName('input');

        if(playerInputs.length > playerNumber) {
            while(playerInputs.length > playerNumber) {
                playerInputsContainer.removeChild(
                    playerInputsContainer.childNodes[playerInputs.length + 1]
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

    this.init = () => {
        template.playerNumberElement.setAttribute('value', defaultSettings.defaultPlayerNumber);

        template.playerNumberElement.addEventListener('change', (event) => {
            this.maintainPlayerNameInputs(event.target.value, template.playerInputsContainer);
        });

        template.gameModesElement.addEventListener('change', (event) => {
            if(event.target.value === 'competition') {
                template.gameFurtherSettingsDivElement.style.display = 'none';

                template.isAutoSupplementCheckboxElement.checked    = false;
                template.isSetCheckboxElement.checked               = false;
                template.isWhereSetCheckboxElement.checked          = false;
            } else {
                template.gameFurtherSettingsDivElement.style.display = 'block';
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

    this.getPlayers = () => {
        var playerInputs = template.playerInputsContainer.getElementsByTagName('input');

        return Array.from(playerInputs).map(
            (playerInput) => playerInput.value
        );
    };

    this.getGameLevel = () => document.querySelector('input[name=gameLevel]:checked').value;

    this.getGameMode = () => document.querySelector('input[name=gameMode]:checked').value;

    this.isAutoSupplementButton = () => !!document.querySelector('input[name=isAutoSupplementCheckbox]:checked');

    this.isSetButton = () => !!document.querySelector('input[name=isSetCheckbox]:checked');

    this.isWhereSetButton = () => !!document.querySelector('input[name=isWhereSetCheckbox]:checked');

    this.init();
};