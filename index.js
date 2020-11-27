const defaultSettings = {
    defaultPlayerNumber: 1,
};

const template = new Template();
const settings = new Settings();
const gameEngine = new GameEngine();

const start = () => {
    const config = settings.createConfig();

    template.changeAreas();

    gameEngine.startGame(config);
};