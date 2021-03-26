import Renderer from './renderer.js';
import Streamer from './streamer.js';
import CoolBlock from './coolblock.js';

class Core {
  size = [1280, 720];
  renderer = new Renderer(this);
  streamer = new Streamer(this);
  coolBlock = new CoolBlock(this);

  run() {
    this.streamer.run();
    this.renderer.run();
  }
}

new Core().run();