// Números pseudoaleatorios a partir de una semilla: mismo resultado en cada render
// (las estrellas del fondo y los planetas no "saltan" al volver a dibujarse).

/** Convierte una semilla (número o texto) en un entero de 32 bits. */
export function hashSeed(seed) {
  const texto = String(seed ?? 0);
  let h = 2166136261;
  for (let i = 0; i < texto.length; i += 1) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Generador mulberry32: devuelve una función que produce números en [0, 1). */
export function createRandom(seed) {
  let a = hashSeed(seed);
  return function random() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Número en [min, max) usando el generador dado. */
export function between(random, min, max) {
  return min + random() * (max - min);
}
