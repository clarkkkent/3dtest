import * as THREE from 'three';
import * as OBJLoader from '../components/OBJLoader/OBJLoader';
let OrbitControls = require('three-orbit-controls')(THREE);

let container = document.getElementById('container');

let camera, sphere1, sphere2, sphere3, sphere4, sphere5, sphere6, sphere7, sphere8, sphere9, controls, scene, renderer, geometry, texture, light, material;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1, 1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    geometry = new THREE.SphereGeometry(2, 32, 32);
    texture = new THREE.TextureLoader().load("../images/base/texture4.jpg");

    material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        map: texture,
        opacity: 1
    });

    sphere1 = new THREE.Mesh(geometry, material);
    sphere1.position.set(0, 0, 10);
    scene.add(sphere1);

    sphere2 = new THREE.Mesh(geometry, material);
    sphere2.position.set(4, 0, 8.5);
    scene.add(sphere2);
    scene.add(sphere2);

    sphere3 = new THREE.Mesh(geometry, material);
    sphere3.position.set(6.5, 0, 5);
    scene.add(sphere3);
    scene.add(sphere3);

    sphere4 = new THREE.Mesh(geometry, material);
    sphere4.position.set(5.5, 0, 0.9);
    scene.add(sphere4);
    scene.add(sphere4);

    sphere5 = new THREE.Mesh(geometry, material);
    sphere5.position.set(2.3, 0, -1.9);
    scene.add(sphere5);
    scene.add(sphere5);

    sphere6 = new THREE.Mesh(geometry, material);
    sphere6.position.set(-2, 0, -1.7);
    scene.add(sphere6);
    scene.add(sphere6);

    sphere7 = new THREE.Mesh(geometry, material);
    sphere7.position.set(-5, 0, 1);
    scene.add(sphere7);
    scene.add(sphere7);

    sphere7 = new THREE.Mesh(geometry, material);
    sphere7.position.set(-5, 0, 1);
    scene.add(sphere7);
    scene.add(sphere7);

    sphere8 = new THREE.Mesh(geometry, material);
    sphere8.position.set(-6, 0, 5);
    scene.add(sphere8);
    scene.add(sphere8);

    sphere9 = new THREE.Mesh(geometry, material);
    sphere9.position.set(-4, 0, 8.5);
    scene.add(sphere9);
    scene.add(sphere9);


    let loader = new THREE.OBJLoader();

    loader.load('../images/objects/Toilet.obj', (object) => {
        let bath = object;
        // scene.add(bath);
        bath.traverse(function(node) {
            console.log(node);
            if (node.material) {
                node.material.side = THREE.DoubleSide;
            }
        });
        bath.scale.x = 0.5;
        bath.scale.y = 0.5;
        bath.scale.z = 0.5;
    });

    let ambient = new THREE.AmbientLight( 0xffffff, 0.7 );
    scene.add( ambient );

    let spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(10, 10, 15);
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

    let lightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(lightHelper);
    let shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    // scene.add(shadowCameraHelper);

    camera.position.set(0, 0, 100);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);
    controls.minDistance = 20;
    controls.maxDistance = 500;
    controls.enablePan = false;
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    render();
}

function render() {
    renderer.render(scene, camera);
}

init();
animate();

window.addEventListener('resize', resize);

function resize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
}

