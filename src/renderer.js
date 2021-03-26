import canvasLib from 'canvas';

const { createCanvas } = canvasLib;

export default class Renderer {
  constructor(core) {
    this.core = core;
    this.canvas = createCanvas(1280, 720);
    this.context = this.canvas.getContext('2d');
  }

  run() {
    setInterval(() => this.frame(), 1000 / 20);
  }

  frame() {
    this.context.fillStyle = 'rgb(0, 0, 0)';
    this.context.fillRect(0, 0, 1280, 720);
    
    this.core.coolBlock.draw(this.context);
    this.core.streamer.putFrame();
  }
}