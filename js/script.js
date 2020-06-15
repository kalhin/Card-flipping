//Renderer - Camera
//         \ Scene - Lights
//                 \Mesh - Geometry
//                        \ Material - Display rules
//                                    \ Textures
//                                     \ Colors
let width, height, canvas;
let renderer, camera, scene, light, mesh;
let cardGeometry, cardMaterial;
let cardTexture, loader;
const card = {
  positionX: 0,
  positionY: 0,
  positionZ: 0,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
};

init();
gui();

animation();

function init() {
  canvas = document.getElementById("canvas");

  width = window.innerWidth;
  height = window.innerHeight;
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);

  renderer = new THREE.WebGLRenderer({ canvas: canvas });
  renderer.setClearColor(0x000000); //black background

  camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 5000); //angle, proportions, display range from, display range to
  camera.position.set(0, 0, 1000); //x, y, z coordinates

  scene = new THREE.Scene();

  light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

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
      map: new THREE.TextureLoader().load("img/dragon.jpg"),
      side: THREE.DoubleSide,
    }),
    new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load("img/dragon1.jpg"),
      side: THREE.DoubleSide,
    }),
  ];

  cardMaterial = new THREE.MeshFaceMaterial(sideMaterials);

  mesh = new THREE.Mesh(cardGeometry, cardMaterial);

  //click event
  const domEvents = new THREEx.DomEvents(camera, renderer.domElement);
  domEvents.addEventListener(
    mesh,
    "click",
    function (event) {
      console.log("you clicked on the mesh");
      flipingCard();
    },
    false
  );

  scene.add(mesh);
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
    mesh.rotation.y -= 0.06;

  renderer.render(scene, camera);
  requestAnimationFrame(function () {
    flipingCard();
  });
}

function animation() {
  mesh.position.x += card.positionX;
  mesh.position.y += card.positionY;
  mesh.position.z += card.positionZ;
  mesh.rotation.x += card.rotationX;
  mesh.rotation.y += card.rotationY;
  mesh.rotation.z += card.rotationZ;

  renderer.render(scene, camera);
  requestAnimationFrame(function () {
    animation();
  });
}
