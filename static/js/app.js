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

let canvas = new Renderer({
    container: '#container'
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        canvas.render();
    }, 400);
});
