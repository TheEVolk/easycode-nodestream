import * as cp from 'child_process';

export default class Streamer {
  constructor(core) {
    this.core = core;
  }

  run() {
    // Если там, куда хотите транслировать есть ссылка и ключ, то вводим в формате 'url/key'
    const rtmpUrl = 'rtmp://a.rtmp.youtube.com/live2/secretkey';

    this.ffmpeg = cp.spawn('./ffmpeg.exe', [
        '-thread_queue_size', '0',
        '-f', 'rawvideo',
        '-pixel_format', 'bgra',
        '-video_size', '1280x720',
        '-re',
        '-framerate', '20',
        '-i', '-',
        '-re',
        '-i', 'http://lyd.nrk.no/nrk_radio_mp3_mp3_l',
        '-ac', '1',
        '-vcodec', 'libx264',
        '-acodec', 'aac',
        '-pix_fmt', 'yuv420p',
        '-preset', 'veryfast',
        '-g', '30',
        '-vsync', '1',
        '-b:v', '1200k',
        '-b:a', '16k',
        '-f', 'flv',
        rtmpUrl
   ], {
      stdio: ['pipe', process.stdout, process.stderr]
    });
    
    this.ffmpeg.on('close', code => { console.log('[FFMPEG] Closed.', code); process.exit(); });
    this.ffmpeg.on('error', error => { console.log(`[FFMPEG] Error: ${error}`); process.exit(); });
  }

  async putFrame() {
    this.ffmpeg.stdin.write(this.core.renderer.canvas.toBuffer('raw'));
  }
}