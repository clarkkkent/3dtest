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

    geometry = new THREE.SphereGeometry( 2, 32, 32 );
    texture = new THREE.TextureLoader().load("../images/base/texture4.jpg");


    material = new THREE.MeshBasicMaterial({
            map: texture
    });

    sphere = new THREE.Mesh( geometry, material);
    scene.add(sphere);

    camera.position.set( 0, 0, 30 );
    controls = new OrbitControls(camera, renderer.domElement);
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
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
}

