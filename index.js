const defaultSettings = {
    defaultPlayerNumber: 1,
};

const template = new Template();
const settings = new Settings();

const start = function() {
    const config = settings.createConfig();

    template.changeAreas();
};