import * as THREE from 'three';
import {PerspectiveCamera} from "three";
import {TextureLoader} from "three";
import {TweenMax} from 'gsap';
import anime from 'animejs/lib/anime.es.js';
let OrbitControls = require('three-orbit-controls')(THREE);
let OBJLoader = require('three-obj-loader');
OBJLoader(THREE);

export class Renderer {
    camera;
    scene;
    renderer;
    cameraPosition = {
        x: 0,
        y: 0,
        z: 10
    };
    sphere;
    geometry;
    material;
    object;
    texture;


    constructor(options) {
        this.container = document.querySelector(options.container);
    }

    render() {
        this.delete();
        this.initData();
        this.animate();
    };

    animate = () => {
        requestAnimationFrame(this.animate);
        this.initRender();
    };

    delete() {
        let blocks = this.container.children;
        if (blocks.length > 0) {
            this.container.removeChild(this.renderer.domElement);
        }
    };

    initData() {
        this.initScene();
        this.initLights();
        this.addObjects();
        this.initCamera(this.cameraPosition);
        this.initRenderer();
    }

    initScene() {
        this.scene = new THREE.Scene();
    }

    initCamera(cameraPosition) {
        this.camera = new THREE.PerspectiveCamera(70, this.container.clientWidth/this.container.clientHeight, 0.001, 1000);
        this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        let controls = new OrbitControls(this.camera);
        controls.update();
    }

    initLights() {
        let spotLight = new THREE.SpotLight(0xffffff, 1.4);
        spotLight.position.set(10, 40, 15);
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 0.05;
        spotLight.decay = 2;
        spotLight.distance = 200;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 200;
        this.scene.add(spotLight);

        let ambient = new THREE.AmbientLight(0xffffff, 0.9);
        this.scene.add(ambient);

        let lightHelper = new THREE.SpotLightHelper(spotLight);
        // this.scene.add(lightHelper);
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);
    }

    initRender() {
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    }

    addObjects() {
        this.texture = new THREE.TextureLoader().load('../images/base/texture4.jpg');
        this.geometry = new THREE.SphereGeometry(1,64,64);
        this.material = new THREE.MeshPhongMaterial({
           map: this.texture,
           color: 0xffffff
        });
        this.sphere = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.sphere);
    }
}
