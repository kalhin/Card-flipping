console.log("fire");
import * as THREE from "three";

import Stats from "three/examples/jsm/libs/stats.module.js";

import { Fire } from "three/examples/jsm/objects/Fire.js";
import { renderer, camera, scene } from "./init";

// var camera, scene, renderer,
export const flame = function (size) {
  var stats;
  var fire;

  var params = {
    color1: "0x00bdf7",
    color2: "0x1b3fb6",
    color3: "0x001869",
    colorBias: 0.25,
    burnRate: 2.6,
    diffuse: 5.0,
    viscosity: 0.5,
    expansion: 0.75,
    swirl: 30.0,
    drag: 0.0,
    airSpeed: 40.0,
    windX: 0.0,
    windY: -0.25,
    speed: 500.0,
    massConservation: false,
  };

  init();
  animate();

  function init() {
    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    scene.add(camera);

    var plane = new THREE.PlaneBufferGeometry(500*size, 500*size);
    fire = new Fire(plane, {
      textureWidth: 512,
      textureHeight: 512,
      debug: false,
    });
    fire.position.z = 0;
    fire.position.y = 80;
    scene.add(fire);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;

    function updateColor1(value) {
      fire.color1.set(value);
    }

    function updateColor2(value) {
      fire.color2.set(value);
    }

    function updateColor3(value) {
      fire.color3.set(value);
    }

    function updateColorBias(value) {
      fire.colorBias = value;
    }

    function updateBurnRate(value) {
      fire.burnRate = value;
    }

    function updateDiffuse(value) {
      fire.diffuse = value;
    }

    function updateViscosity(value) {
      fire.viscosity = value;
    }

    function updateExpansion(value) {
      fire.expansion = value;
    }

    function updateSwirl(value) {
      fire.swirl = value;
    }

    function updateDrag(value) {
      fire.drag = value;
    }

    function updateAirSpeed(value) {
      fire.airSpeed = value;
    }

    function updateWindX(value) {
      fire.windVector.x = value;
    }

    function updateWindY(value) {
      fire.windVector.y = value;
    }

    function updateSpeed(value) {
      fire.speed = value;
    }

    function updateMassConservation(value) {
      fire.massConservation = value;
    }

    params.Multiple = function () {
      fire.clearSources();
      fire.addSource(0.35, 0.1, 0.1, 0.5, 0.0, 1.0);
      fire.addSource(0.45, 0.1, 0.1, 0.5, 0.0, 1.0);
      fire.addSource(0.55, 0.1, 0.1, 0.5, 0.0, 1.0);
      fire.addSource(0.65, 0.1, 0.1, 0.5, 0.0, 1.0);
    };

    function updateAll() {
      updateColor1(params.color1);
      updateColor2(params.color2);
      updateColor3(params.color3);
      updateColorBias(params.colorBias);
      updateBurnRate(params.burnRate);
      updateDiffuse(params.diffuse);
      updateViscosity(params.viscosity);
      updateExpansion(params.expansion);
      updateSwirl(params.swirl);
      updateDrag(params.drag);
      updateAirSpeed(params.airSpeed);
      updateWindX(params.windX);
      updateWindY(params.windY);
      updateSpeed(params.speed);
      updateMassConservation(params.massConservation);
    }

    params.Iceball = function () {
      params.color1 = 0x00bdf7;
      params.color2 = 0x1b3fb6;
      params.color3 = 0x001869;
      params.windX = 0.0;
      params.windY = 0.4;
      params.colorBias = 0.0;
      params.burnRate = 4.40;
      params.diffuse = 4.6;
      params.viscosity = 0.20;
      params.expansion = -0.07;
      params.swirl = 50.0;
      params.drag = 0.0;
      params.airSpeed = 28.0;
      params.speed = 1000.0;
      params.massConservation = false;

      updateAll();
    };

    params.Iceball();
    params.Multiple();

    stats = new Stats();
    document.body.appendChild(stats.dom);

    window.addEventListener("resize", onWindowResize, false);

    if (typeof TESTING !== "undefined") {
      for (var i = 0; i < 60; i++) {
        renderer.render(scene, camera);
      }
    }
  }

  function onWindowResize() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    renderer.clear();
    renderer.render(scene, camera);
    stats.update();
  }
};
