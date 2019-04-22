import {Power4, TimelineMax, TweenMax} from 'gsap';

export default class UI {
    tl = new TimelineMax();
    constructor(options) {
        this.container = document.querySelector(options.container);
        this.items = Array.prototype.slice.call(this.container.children);
        this.selectTexture();
    }

    makeActive() {
        this.tl.staggerTo('.index-main__options-item', 0.4, {opacity: 1, y: -30, ease: Power1.easeOut}, "0.1");
    }

    makeUnActive() {
        this.tl.staggerTo('.index-main__options-item', 0.4, {opacity: 0, y: 0, ease: Power1.easeOut}, "0.1");
    }

    selectTexture() {
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                let event = new CustomEvent('textureSelected', {
                    detail: {
                        texture: item.querySelector('img').src
                    }
                });
                document.dispatchEvent(event);
            })
        })
    }
}