import {Renderer} from "./model";

require('../scss/app.scss');

window.noZensmooth = true;

require('./common/goal.js');
require('./common/js_validation.js');
require('./common/links.js');
require('./common/main.js');
require('./common/pagination.js');
require('./common/respond.js');

require('./field/phone.js');
require('../components/smart-tabs/smart-tabs');
require('./model');

document.addEventListener('DOMContentLoaded', () => {
    let render = new Renderer({
        container: '#container'
    });

    render.render();
});
