import {Renderer} from "./calculator/model";
import Layout from "./calculator/layout";
import UI from "./calculator/ui";

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
require('./calculator/model');

let canvas = new Renderer({
    container: '#container'
});



let layout = new Layout(canvas);
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        layout.render();
    }, 400);
});


