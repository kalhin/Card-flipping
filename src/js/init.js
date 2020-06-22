console.log("init")
import * as THREE from "three";

const canvas = document.getElementById("canvas");

const width = window.innerWidth;
const height = window.innerHeight;
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

export const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setClearColor(0x000000); //black background

export const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000); //angle, proportions, display range from, display range to
camera.position.set(0, 0, 1000); //x, y, z coordinates

export const scene = new THREE.Scene();

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);
