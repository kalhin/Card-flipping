//Renderer - Camera
//         \ Scene - Lights
//                 \Mesh - Geometry
//                        \ Material - Display rules
//                                    \ Textures
//                                     \ Colors

console.log("card");
import * as THREE from "three";
import { renderer, camera, scene } from "./init";
import { gui } from './controls';
import { flame } from "./fire";

var initializeDomEvents = require("threex-domevents");
var THREEx = {};
initializeDomEvents(THREE, THREEx);

let cardMesh, cardGeometry, cardMaterial;

export const card = {
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
};

cardModel();
gui();
animation();

function cardModel() {
  cardGeometry = new THREE.BoxGeometry(180, 300, 10, 5, 5, 5); //figure width / height, sectors

  const sideMaterials = [
    new THREE.MeshBasicMaterial({
      color: 0xad1909,
      side: THREE.FrontSide,
      // opacity: 0.5
    }),
    new THREE.MeshBasicMaterial({
      color: 0xad1909,
      side: THREE.FrontSide,
      // opacity: 0.5
    }),
    new THREE.MeshBasicMaterial({
      color: 0xad1909,
      side: THREE.FrontSide,
      // opacity: 0.5
    }),
    new THREE.MeshBasicMaterial({
      color: 0xad1909,
      side: THREE.FrontSide,
      // opacity: 0.5
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("src/img/frame.jpg"),
      side: THREE.FrontSide,
      // opacity: 0.5
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("src/img/dragon.jpg"),
      side: THREE.FrontSide,
      // opacity: 0.5
    }),
  ];

  cardMaterial = new THREE.MeshFaceMaterial(sideMaterials);

  cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);

  // click event
  const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
  domEvents.addEventListener(
    cardMesh,
    "click",
    function (event) {
      console.log("you clicked on the cardMesh");
      cardFliping(10);
      setTimeout(function () {
        moveBack(10);
      }, 1200);
      setTimeout(function () {
        flame(1);
      }, 1600);

    },
    false
  );

  scene.add(cardMesh);
}

function moveBack(speed) {
  console.log("move back");
  if (cardMesh.position.z > 0) {
    cardMesh.position.z -= speed*2;
    renderer.render(scene, camera);
    requestAnimationFrame(function () {
      moveBack(speed);
    });
  }
}

function cardFliping(speed) {
  if (cardMesh.position.z < 400) {
    cardMesh.position.z += speed;
    cardMesh.rotation.y -= THREE.Math.degToRad(4.5);

    renderer.render(scene, camera);
    requestAnimationFrame(function () {
      cardFliping(speed);
    });
  }
}

function animation() {
  cardMesh.position.x += card.positionX;
  cardMesh.position.y += card.positionY;
  cardMesh.position.z += card.positionZ;
  cardMesh.rotation.x += card.rotationX;
  cardMesh.rotation.y += card.rotationY;
  cardMesh.rotation.z += card.rotationZ;

  renderer.render(scene, camera);
  requestAnimationFrame(function () {
    animation();
  });
}
