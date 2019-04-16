import * as THREE from 'three';
import {PerspectiveCamera} from "three";
import {TextureLoader} from "three";
import {TweenMax} from 'gsap';

import Empty from './items/empty.js';
import Bead from './items/bead.js';
import Item from './items/item.js';
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
        z: 100
    };
    sphere;
    geometries;
    materials;
    objects;
    texture;


    constructor(options) {
        this.container = document.querySelector(options.container);
    }

    render(objects) {
        this.delete();
        this.objects = objects;
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
        this.initRenderer();
        this.initScene();
        this.initLights();
        this.addObjects();
        this.initCamera(this.cameraPosition);
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
        console.log(this.objects);
        for (let i = 0; i < this.objects.length; i++) {
            let geometry = new THREE.SphereGeometry(this.objects[i].item.diameter/2,64, 64);
            let material = new THREE.MeshPhongMaterial({color: 0xffffff});
            let mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(this.objects[i].x, this.objects[i].y, this.objects[i].z);
            this.scene.add(mesh);
        }
    }
}
