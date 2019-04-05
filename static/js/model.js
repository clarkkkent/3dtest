import * as THREE from 'three';
import {PerspectiveCamera} from "three";
let scene;
let camera;
let renderer;
let light;
let texture;


export class Renderer {
    constructor(options) {
        this.container = document.querySelector(options.container);
        this.init();
        this.animate();
        this.render();
    }

    init = () => {
        this.initScene();
        this.initCamera();
        this.initRenderer();
        window.addEventListener('resize', this.resize);
    };

    initScene = () => {
        scene = new THREE.Scene();
    };

    initCamera = () => {
        camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    };

    initRenderer = () => {
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(renderer.domElement);
    };

    render = () => {
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        this.resize();
    };

    animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
    };

    resize = () => {
        let w = window.innerWidth;
        let h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }
}
