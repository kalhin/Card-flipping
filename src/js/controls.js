import * as THREE from 'three';
import dat from 'dat.gui';
import { card } from './card'

export const gui = function () {
  const gui = new dat.GUI();
  gui.add(card, 'positionX').min(-10).max(10).step(0.1);
  gui.add(card, 'positionY').min(-10).max(10).step(0.1);
  gui.add(card, 'positionZ').min(-20).max(20).step(0.1);
  gui.add(card, 'rotationX').min(-0.2).max(0.2).step(0.001);
  gui.add(card, 'rotationY').min(-0.2).max(0.2).step(0.001);
  gui.add(card, 'rotationZ').min(-0.2).max(0.2).step(0.001);
};
