"use client";

import { Note } from "../../types/Note";
import { deleteNote } from "../../lib/api";

export default function NotesList({ notes, onDeleted }: { notes: Note[]; onDeleted: () => void }) {
	return (
		<ul>
			{notes.map((note) => (
				<li key={note.id}>
					<h3>{note.title}</h3>
					<p>{note.content}</p>
					<button onClick={async () => { await deleteNote(note.id); onDeleted(); }}>Delete</button>
				</li>
			))}
		</ul>
	);
}
