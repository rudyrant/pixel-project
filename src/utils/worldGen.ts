import { Noise } from 'noisejs';

export const generateWorld = (width: number, height: number) => {
  const noise = new Noise(Math.random());
  const world = [];

  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      // Perlin noise for terrain elevation
      // We want the surface to be roughly in the middle
      const surfaceHeight = height / 2 + noise.perlin2(x / 20, 0) * 10;
      
      let type = 'air';
      if (y > surfaceHeight) {
        if (y < surfaceHeight + 2) {
          type = 'grass';
        } else if (y < surfaceHeight + 10) {
          type = 'dirt';
        } else {
          // Deep underground: stone with occasional caves
          const caveNoise = noise.perlin2(x / 10, y / 10);
          type = caveNoise > 0.4 ? 'air' : 'stone';
        }
      }
      
      row.push({ x, y, type });
    }
    world.push(row);
  }
  return world;
};
