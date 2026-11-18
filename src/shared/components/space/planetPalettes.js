// Paletas y rasgos de los planetas. Todo se elige a partir de una semilla, así que
// el mismo planeta (misma lección) siempre se ve igual.
import { between, createRandom } from './seededRandom';

// stops: degradado radial del cuerpo, de la zona iluminada a la sombra.
export const PLANET_PALETTES = {
  ocean: {
    stops: ['#5BDCFF', '#1C7FD0', '#0A3C92'],
    glow: '#5BDCFF',
    accent: '#8CF29A', // continentes
    detail: '#0A3C92',
    ring: '#BDEBFF',
  },
  lava: {
    stops: ['#FFD58A', '#FF7A3D', '#A3260F'],
    glow: '#FF7A3D',
    accent: '#FFE7B8',
    detail: '#7A1A08',
    ring: '#FFD58A',
  },
  amethyst: {
    stops: ['#F4C6FF', '#B65CFF', '#5A1FB0'],
    glow: '#B65CFF',
    accent: '#F9E3FF',
    detail: '#3D1380',
    ring: '#F4C6FF',
  },
  cyan: {
    stops: ['#A8F4FF', '#3FB2FF', '#2A44D6', '#171C78'],
    glow: '#3FB2FF',
    accent: '#E1FBFF',
    detail: '#171C78',
    ring: '#A8F4FF',
  },
  emerald: {
    stops: ['#C9FFD9', '#3FD48B', '#12795A', '#0B3B33'],
    glow: '#3FD48B',
    accent: '#EBFFF2',
    detail: '#0B3B33',
    ring: '#C9FFD9',
  },
  rose: {
    stops: ['#FFD3E6', '#FF6FAE', '#C2276E', '#5E0F3C'],
    glow: '#FF6FAE',
    accent: '#FFEAF3',
    detail: '#5E0F3C',
    ring: '#FFD3E6',
  },
};

const PALETTE_NAMES = Object.keys(PLANET_PALETTES);
export const PLANET_FEATURES = ['bands', 'craters', 'continents', 'ring', 'moon'];

/**
 * Describe cómo se ve un planeta a partir de su semilla.
 * @param {number|string} seed
 * @param {string} [paletteName] fuerza una paleta (ocean, lava, amethyst, cyan, emerald, rose)
 */
export function planetLook(seed, paletteName) {
  const random = createRandom(`planet-${seed}`);
  const nombre = PLANET_PALETTES[paletteName]
    ? paletteName
    : PALETTE_NAMES[Math.floor(random() * PALETTE_NAMES.length)];
  const palette = PLANET_PALETTES[nombre];

  let feature = PLANET_FEATURES[Math.floor(random() * PLANET_FEATURES.length)];
  // Los continentes con nubes son el rasgo natural del planeta océano.
  if (nombre === 'ocean' && feature === 'bands') feature = 'continents';

  // Detalles del rasgo (en coordenadas del dibujo de 200 x 200, centro 100,100).
  const bands = Array.from({ length: 5 }, (_, i) => ({
    y: 62 + i * 18 + between(random, -4, 4),
    ry: between(random, 3, 7),
    opacity: between(random, 0.25, 0.5),
    light: i % 2 === 0,
  }));
  const craters = Array.from({ length: 6 }, () => {
    const angulo = random() * Math.PI * 2;
    const distancia = between(random, 0, 38);
    return {
      cx: 100 + Math.cos(angulo) * distancia,
      cy: 100 + Math.sin(angulo) * distancia,
      r: between(random, 4, 10),
    };
  });
  const continents = Array.from({ length: 3 }, () => ({
    cx: between(random, 70, 130),
    cy: between(random, 70, 130),
    rx: between(random, 12, 24),
    ry: between(random, 7, 14),
    rotate: between(random, -40, 40),
  }));
  const clouds = Array.from({ length: 3 }, () => ({
    cx: between(random, 65, 135),
    cy: between(random, 60, 140),
    rx: between(random, 14, 26),
    ry: between(random, 2.5, 4.5),
  }));

  return {
    paletteName: nombre,
    palette,
    feature,
    bandTilt: between(random, -18, 8),
    ringTilt: between(random, -28, -12),
    moonAngle: between(random, -0.9, -0.3),
    bands,
    craters,
    continents,
    clouds,
  };
}
