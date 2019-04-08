import * as THREE from 'three';
import {PerspectiveCamera} from "three";
import {TextureLoader} from "three";
import {TweenMax} from 'gsap';
import anime from 'animejs/lib/anime.es.js';

let scene;
let camera;
let renderer;
let light;
let texture;
let OrbitControls = require('three-orbit-controls')(THREE);
let controls;
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let objects = [];


export class Renderer {
    constructor(options) {
        this.container = document.querySelector(options.container);
        this.init();
        this.animate();
    }

    init = () => {
        this.initScene();
        this.initRenderer();
        this.initCamera();
        this.initLights();
        this.addObjects();
        window.addEventListener('resize', this.resize);
        window.addEventListener('mousemove', this.onMouseMove);
    };

    initScene = () => {
        scene = new THREE.Scene({alpha: true});
    };

    initCamera = () => {
        camera = new PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 1000);
        camera.position.set(0,0,100);
        controls = new OrbitControls(camera);
        controls.update();
    };

    initRenderer = () => {
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(renderer.domElement);
    };

    initLights = () => {
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
        scene.add(spotLight);

        let ambient = new THREE.AmbientLight(0xffffff, 0.9);
        scene.add(ambient);

        let lightHelper = new THREE.SpotLightHelper(spotLight);
        // scene.add(lightHelper);

    };

    render = () => {
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        this.resize();
    };

    animate = () => {
        requestAnimationFrame(this.animate);
        this.render();
        controls.update();
    };

    resize = () => {
        let w = window.innerWidth;
        let h = window.innerHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    };

    addObjects = () => {
        let texture = new THREE.TextureLoader().load("../images/base/texture4.jpg");
        let geometry = new THREE.SphereGeometry(8, 32, 32);
        let material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            map: texture,
            transparent: true
        });
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(0, 0, 0);
        scene.add(sphere);
        objects.push(sphere);
    };

    onMouseMove = (event) =>  {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        let intersects = raycaster.intersectObjects( objects );
        if (intersects.length > 0) {
            anime({
                targets: intersects[0].object.material,
                opacity: {
                    value: .7,
                    duration: 300,
                    easing: 'linear'
                }
                }
            )
        } else {
            anime({
                    targets: objects[0].material,
                    opacity: {
                        value: 1,
                        duration: 300,
                        easing: 'linear'
                    }
                }
            )
        }
    }
}
