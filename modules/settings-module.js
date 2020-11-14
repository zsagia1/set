const Settings = function() {

    this.maintainPlayerNameInputs = function(playerNumber, playerInputsContainer) {

        var playerInputs = template.playerInputsContainer.getElementsByTagName('input');

            if(playerInputs.length > playerNumber) {
                while(playerInputs.length > playerNumber) {
                    template.playerInputsContainer.removeChild(
                        template.playerInputsContainer.childNodes[playerInputs.length]
                    );
                }
            } else if(playerInputs.length < playerNumber) {
                while(playerInputs.length < playerNumber) {
                    var x = document.createElement('input');

                    x.setAttribute('type', 'text');
                    x.setAttribute('value', 'Player' + (playerInputs.length + 1));

                    template.playerInputsContainer.appendChild(x);
                }
            }
    };

    this.init = function() {
        template.playerNumberElement.setAttribute('value', defaultSettings.defaultPlayerNumber);
        template.playerNumberElement.addEventListener('change', function(event) {
            this.maintainPlayerNameInputs(event.target.value, template.playerInputsContainer);
        });

        template.gameModesElement.addEventListener('change', function(event) {
            if(event.target.value === 'competition') {
                template.isSetCheckboxElement.setAttribute('disabled', 'disabled');
                template.isSetCheckboxElement.removeAttribute('checked');

                template.isWhereSetCheckboxElement.setAttribute('disabled', 'disabled');
                template.isWhereSetCheckboxElement.removeAttribute('checked');

                template.isAutoSupplementCheckboxElement.setAttribute('disabled', 'disabled');
                template.isAutoSupplementCheckboxElement.removeAttribute('checked');
            } else {
                template.isSetCheckboxElement.removeAttribute('disabled');
                template.isWhereSetCheckboxElement.removeAttribute('disabled');
                template.isAutoSupplementCheckboxElement.removeAttribute('disabled');
            }
        });
    };

    this.getPlayers = function () {
        var playerInputs = template.playerInputsContainer.getElementsByTagName("input");

        return Array.from(playerInputs).map(
            (playerInput) => new Player(playerInput.value)
        );
    };

    this.getGameMode = function() {
        return document.querySelector('input[name=gameMode]:checked').value;
    };

    this.getGameLevel = function() {
        return document.querySelector('input[name=gameLevel]:checked').value;
    };

    this.isSetButton = function() {
        return !!document.querySelector('input[name=isSetCheckbox]:checked');
    };

    this.isWhereSetButton = function() {
        return !!document.querySelector('input[name=isWhereSetCheckbox]:checked');
    };

    this.isAutoSupplementButton = function() {
        return !!document.querySelector('input[name=isAutoSupplementCheckbox]:checked');
    };

    this.init();
};