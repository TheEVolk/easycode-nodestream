export default class CoolBlock {
  constructor(core) {
    this.core = core;
    this.position = [
      Math.floor(this.core.size[0] / 2),
      Math.floor(this.core.size[1] / 2)
    ];
  
    this.size = [
      Math.floor(this.core.size[0] * 0.1),
      Math.floor(this.core.size[1] * 0.1)
    ];

    this.velocity = [
      Math.random() > 0.5 ? 1 : -1,
      Math.random() > 0.5 ? 1 : -1
    ];
  }

  move () {
    if (this.position[0] + this.size[0] / 2 > this.core.size[0]) {
      this.velocity[0] = -1;
    }

    if (this.position[1] + this.size[1] / 2 > this.core.size[1]) {
      this.velocity[1] = -1;
    }

    if (this.position[0] - this.size[0] / 2 < 0) {
      this.velocity[0] = 1;
    }

    if (this.position[1] - this.size[1] / 2 < 0) {
      this.velocity[1] = 1;
    }

    this.position[0] += this.velocity[0] * 10;
    this.position[1] += this.velocity[1] * 10;
  }

  draw (context) {
    this.move();
    context.fillStyle = 'rgb(255, 255, 255)';
    context.fillRect(this.position[0] - this.size[0] / 2, this.position[1] - this.size[1] / 2, this.size[0], this.size[1]);

    const getChannels = (x, y) => {
      const pX = x / (this.core.size[0] - this.size[0]);
      const pY = y / (this.core.size[1] - this.size[1]);

      return {
        red: (1 - pX) * (1 - pY),
        green: (1 - pX) * pY,
        blue: pX * pY,
        black: pX * (1 - pY)
      };
    }

    const gradient = context.createLinearGradient(0, 0, this.size[0], 0);
    const channels = getChannels(this.position[0], this.position[1]);
    const color = [
      Math.floor(channels.red * (1 - channels.black) * 256),
      Math.floor(channels.green * (1 - channels.black) * 256),
      Math.floor(channels.blue * (1 - channels.black) * 256)
    ];

    gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`);
    gradient.addColorStop(1, `rgba(${256 - color[0]}, ${256 - color[1]}, ${256 - color[2]}, 1)`);
    // red blue green black
    // block green blue red

    context.fillStyle = gradient;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '30px Verdana';
    context.fillText('TheEVolk', this.position[0], this.position[1]);
  }
}