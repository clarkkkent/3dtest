import * as THREE from 'three';
import {PerspectiveCamera} from "three";
import {TextureLoader} from "three";
import {TweenMax} from 'gsap';

import Empty from './items/empty.js';
import Bead from './items/bead.js';
import Item from './items/item.js';
import UI from './ui.js';

let OrbitControls = require('three-orbit-controls')(THREE);
let OBJLoader = require('three-obj-loader');
OBJLoader(THREE);
let Raycaster = new THREE.Raycaster();


export class Renderer {
    camera;
    scene;
    renderer;
    cameraPosition = {
        x: 0,
        y: 0,
        z: 100
    };
    meshs = [];
    materials;
    objects;
    mouse = new THREE.Vector2();
    intersects;
    meshSelected = false;
    activeMesh;
    ui = new UI({
        container: '#options'
    });


    constructor(options) {
        //В конструктор класса добавляем блок в который будет происходить рендер канваса
        this.container = document.querySelector(options.container);
    }

    render(objects) {
        //Основной метод...Используется для создания канваса в документе
        this.delete();
        this.objects = objects;
        this.initData();
        this.animate();
        this.container.addEventListener('mousemove', this.onMouseMove, false);
        this.container.addEventListener('click', this.onMouseClick, false);
    };

    animate = () => {
        //Создаем анимацию для сцены
        requestAnimationFrame(this.animate);
        this.initRender();

    };

    delete() {
        //Удаление контейнера после перерендера
        let blocks = this.container.children;
        if (blocks.length > 0) {
            this.container.removeChild(this.renderer.domElement);
            this.cameraPosition.x = this.camera.position.x;
            this.cameraPosition.y = this.camera.position.y;
            this.cameraPosition.z = this.camera.position.z;
        }
    };

    initData() {
        //Инициализация всех необходимых данных для рендера
        this.initRenderer();
        this.initScene();
        this.initLights();
        this.addObjects();
        this.initCamera(this.cameraPosition);
    }

    initScene() {
        //Инициализация сцены
        this.scene = new THREE.Scene();
    }

    initCamera(cameraPosition) {
        //Инициализация камеры
        this.camera = new THREE.PerspectiveCamera(70, this.container.clientWidth / this.container.clientHeight, 0.001, 1000);
        this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        let controls = new OrbitControls(this.camera);
        controls.update();
    }

    initLights() {
        //Инициализируем свет
        let spotLight = new THREE.SpotLight(0xffffff, 1.4);
        spotLight.position.set(0, 0, 100);
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
        //Инициализация WebGL Рендерера
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);
    }

    initRender() {
        //Сам Рендер
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    }

    initRaycaster() {
        // Инициализация Рэйкастера(для расчета пересчений мыши и объекта)
        Raycaster.setFromCamera(this.mouse, this.camera);
        this.intersects = Raycaster.intersectObjects(this.meshs);
    }

    checkIntersect() {
        // Отслеживание пересечений при движении мышью
        this.initRaycaster();
        if (this.meshSelected === false) {
            this.meshs.forEach(mesh => {
                if (this.intersects.length > 0) {
                    this.intersects.forEach(intersect => {
                        if (intersect.object === mesh) {
                            mesh.material.opacity = 0.6;
                        } else {
                            mesh.material.opacity = 1;
                        }})
                } else {
                    if (this.meshSelected === false) {
                        mesh.material.opacity = 1;
                    }
                }
            })
        }
    }

    checkClick = () => {
        //Отслеживание пересечений при клике мышью
        this.initRaycaster();
        if (this.intersects.length > 0) {
            this.intersects.forEach(intersect => {
                this.meshs.forEach(mesh => {
                    mesh.material.opacity = 0.5;
                });
                intersect.object.material.opacity = 1;
                this.activeMesh = this.meshs.indexOf(intersect.object);
            });
            this.meshSelected = true;
            this.ui.makeActive();
            let event = new CustomEvent('clicked', {
                detail: {
                    clickedObject: this.activeMesh
                }
            });
            document.dispatchEvent(event);
        } else {
            this.meshSelected = false;
            this.ui.makeUnActive();
        }
    };

    addObjects() {

        if(this.meshs.length > 0) {
            this.createGeometry();
        } else {
            this.rePaint();
        }
        //Добавление геометрических объектов в сцену

    }

    rePaint() {
        //Перерисовка канваса при изменении
        this.meshs.forEach(mesh => {
            this.scene.remove(mesh)
        });
        this.createGeometry();
    }

    createGeometry = () => {
        //Логика геометрии
        if (this.objects.length > 0) {
            for (let i = 0; i < this.objects.length; i++) {
                if (this.objects[i].item instanceof Empty) {
                    let geometry = new THREE.SphereGeometry(this.objects[i].item.diameter / 2, 64, 64);
                    let texture = new THREE.TextureLoader().load('../images/base/texture4.jpg');
                    let material = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture, transparent: true});
                    let mesh = new THREE.Mesh(geometry, material);
                    this.meshs.push(mesh);
                    mesh.position.set(this.objects[i].x, this.objects[i].y, this.objects[i].z);
                    this.scene.add(mesh);
                }
            }
        }
    };

    onMouseMove = (event) => {
        this.mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1;
        this.checkIntersect();
    };

    onMouseClick = (event) => {
        this.mouse.x = (event.clientX / this.container.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / this.container.clientHeight) * 2 + 1;
        this.checkClick();
    };
}
