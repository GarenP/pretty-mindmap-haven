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
  'business', 'psychology', 'mindset', 'wealth', 'marketing',
  'leadership', 'productivity', 'personal-development', 'biology', 'strategy'
];

const BOOK_NOTES = [
  {
    title: "Rich Dad's Cash Flow Quadrant",
    content: "The key difference between an employee and a business owner is that one works for money, while the other builds systems that generate money.",
    tags: ['business', 'wealth']
  },
  {
    title: "Influence: The Psychology of Persuasion",
    content: "The principle of social proof states that people tend to look at others' actions to determine their own behavior, especially in uncertain situations.",
    tags: ['psychology', 'marketing']
  },
  {
    title: "100M Offers by Alex Hormozi",
    content: "The grand slam offer framework: The better your offer, the less you need to be good at everything else in marketing and sales.",
    tags: ['marketing', 'business']
  },
  {
    title: "Steal Like an Artist",
    content: "Nothing is completely original. All creative work builds on what came before. Embrace influence don't run away from it.",
    tags: ['mindset', 'personal-development']
  },
  {
    title: "Man's Search for Meaning",
    content: "Those who have a 'why' to live can bear with almost any 'how'. Success, like happiness, cannot be pursued; it must ensue.",
    tags: ['psychology', 'mindset']
  },
  {
    title: "Finding My Virginity",
    content: "Business opportunities are like buses, there's always another one coming. The key is to recognize them when they appear.",
    tags: ['business', 'leadership']
  },
  {
    title: "The Choice Factory",
    content: "Understanding behavioral science is crucial for marketing. People make decisions based on cognitive biases and mental shortcuts.",
    tags: ['psychology', 'marketing']
  },
  {
    title: "Dopamine and Decision Making",
    content: "Neuroscience research shows that dopamine not only rewards us for good choices but helps with decision making and risk assessment.",
    tags: ['biology', 'psychology']
  },
  {
    title: "High Performance Habits",
    content: "The most successful entrepreneurs maintain strict routines and habits that optimize their energy and focus throughout the day.",
    tags: ['productivity', 'personal-development']
  },
  {
    title: "Strategic Business Thinking",
    content: "Effective strategy isn't about being better at the same things; it's about choosing to do different things or doing things differently.",
    tags: ['strategy', 'business']
  }
];

export function generateNotes(count: number): Note[] {
  const notes: Note[] = [];
  
  // First, add our predefined book notes
  BOOK_NOTES.forEach(bookNote => {
    const note: Note = {
      id: faker.string.uuid(),
      title: bookNote.title,
      content: bookNote.content,
      tags: bookNote.tags,
      connections: [],
      created: faker.date.past()
    };
    notes.push(note);
  });
  
  // Then generate additional random notes to reach the desired count
  for (let i = notes.length; i < count; i++) {
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