import * as THREE from 'three';
let OrbitControls = require('three-orbit-controls')(THREE);

let container = document.getElementById('container');

let camera, cube, controls, scene, renderer, geometry, geometry1, material,plane,another;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1, 100
    );

    renderer = new THREE.WebGLRenderer({alpha:true});
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    let geometry = new THREE.SphereGeometry( 5, 32, 32 );
    let material = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe:true});
    cube = new THREE.Mesh( geometry, material);

    scene.add(cube);

    camera.position.set( 0, 0, 5 );
    controls = new OrbitControls(camera, renderer.domElement);
}



function animate() {
    requestAnimationFrame(animate);
    controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    render();
}

function render() {
    renderer.render(scene, camera);
}

init();
animate();

