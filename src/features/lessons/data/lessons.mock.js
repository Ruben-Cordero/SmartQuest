// Datos TEMPORALES mientras no exista data/lessons.js.
// Cuando llegue el archivo real, cambia el import en services/lessons.js y borra este archivo.
const lessonsMock = [
  {
    id: 'u1',
    title: 'Unit 1: Talking About Experiences',
    lessons: [
      { id: 'u1-l1', title: 'Present Perfect' },
      { id: 'u1-l2', title: 'Past Continuous' },
    ],
  },
  {
    id: 'u2',
    title: 'Unit 2: Comparing and Giving Advice',
    lessons: [
      { id: 'u2-l1', title: 'Comparatives and Superlatives' },
      { id: 'u2-l2', title: 'Modal Verbs: should, must, have to' },
    ],
  },
];

export default lessonsMock;
