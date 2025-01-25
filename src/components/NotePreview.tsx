import { Note } from '@/lib/generateNotes';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface NotePreviewProps {
  note: Note;
  onClose: () => void;
}

export function NotePreview({ note, onClose }: NotePreviewProps) {
  return (
    <div className="note-preview">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
      >
        ×
      </button>
      <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
      <div className="flex gap-2 mb-4">
        {note.tags.map(tag => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <p className="text-sm text-gray-300 mb-4">{note.content}</p>
      <p className="text-xs text-gray-400">
        Created: {format(note.created, 'PPP')}
      </p>
    </div>
  );
}