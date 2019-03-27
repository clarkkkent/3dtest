import * as THREE from 'three';

let OrbitControls = require('three-orbit-controls')(THREE);
let container = document.getElementById('container');

let camera, sphere, controls, scene, renderer, geometry, texture, light, material;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1, 100
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

    let ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
    scene.add( ambient );

    let spotLight = new THREE.SpotLight(0xffffff, 2);
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
    scene.add(lightHelper);

    let shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    scene.add(shadowCameraHelper);

    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);


    camera.position.set(0, 0, 30);
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

