import { useState } from 'react';
import { Graph3D } from '@/components/Graph3D';
import { NotePreview } from '@/components/NotePreview';
import { generateNotes, Note } from '@/lib/generateNotes';
import { Button } from '@/components/ui/button';

const notes = generateNotes(100);

export default function Index() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <div className="relative w-full h-screen">
      <Graph3D
        notes={notes}
        onNodeClick={(note) => setSelectedNote(note)}
      />
      {selectedNote && (
        <NotePreview
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
        />
      )}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
        >
          Regenerate Graph
        </Button>
      </div>
    </div>
  );
}