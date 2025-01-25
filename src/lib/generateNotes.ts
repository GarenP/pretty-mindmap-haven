import { faker } from '@faker-js/faker';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  connections: string[];
  created: Date;
}

const TAGS = [
  'philosophy', 'science', 'history', 'art', 'literature',
  'psychology', 'technology', 'mathematics', 'biology', 'physics'
];

export function generateNotes(count: number): Note[] {
  const notes: Note[] = [];
  
  for (let i = 0; i < count; i++) {
    const note: Note = {
      id: faker.string.uuid(),
      title: faker.lorem.sentence(3),
      content: faker.lorem.paragraphs(2),
      tags: faker.helpers.arrayElements(TAGS, { min: 1, max: 3 }),
      connections: [],
      created: faker.date.past()
    };
    notes.push(note);
  }

  // Add random connections between notes
  notes.forEach(note => {
    const connectionCount = faker.number.int({ min: 1, max: 5 });
    const possibleConnections = notes.filter(n => n.id !== note.id);
    note.connections = faker.helpers.arrayElements(
      possibleConnections.map(n => n.id),
      { min: 1, max: connectionCount }
    );
  });

  return notes;
}