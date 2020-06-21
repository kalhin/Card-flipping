//Renderer - Camera
//         \ Scene - Lights
//                 \Mesh - Geometry
//                        \ Material - Display rules
//                                    \ Textures
//                                     \ Colors

console.log("card");
import * as THREE from 'three';
import { renderer, camera, scene } from './init';
import dat from 'dat.gui';

var initializeDomEvents = require('threex-domevents');
var THREEx = {};
initializeDomEvents(THREE, THREEx);

let cardMesh, cardGeometry, cardMaterial;

const card = {
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
      color: 0xff00ff,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("src/img/dragon.jpg"),
      side: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("src/img/dragon.jpg"),
      side: THREE.DoubleSide,
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
      flipingCard();
    },
    false
  );
  
  scene.add(cardMesh);
}

function gui() {
  const gui = new dat.GUI();
  gui.add(card, "positionX").min(-10).max(10).step(0.1);
  gui.add(card, "positionY").min(-10).max(10).step(0.1);
  gui.add(card, "positionZ").min(-20).max(20).step(0.1);
  gui.add(card, "rotationX").min(-0.2).max(0.2).step(0.001);
  gui.add(card, "rotationY").min(-0.2).max(0.2).step(0.001);
  gui.add(card, "rotationZ").min(-0.2).max(0.2).step(0.001);
}

function flipingCard() {
    cardMesh.rotation.y -= 0.06;

  renderer.render(scene, camera);
  requestAnimationFrame(function () {
    flipingCard();
  });
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
