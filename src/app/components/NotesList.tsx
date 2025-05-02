"use client";

import { useState } from "react";
import { Note } from "../../types/Note";

type NotesListProps = {
	notes: Note[];
	onDeleted: () => void;
};

export default function NotesList({ notes, onDeleted }: NotesListProps) {
	const [deletingId, setDeletingId] = useState<number | null>(null);

	const handleDelete = async (id: number) => {
		setDeletingId(id);
		console.log("Deleting note with ID:", id);

		// Simulated API delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		setDeletingId(null);
		onDeleted();
	};

	return (
		<ul style={{ listStyle: "none", padding: 0 }}>
			{notes.map((note) => (
				<li
					key={note.id}
				>
					<h3 style={{ margin: "0 0 0.5rem" }}>{note.title}</h3>
					<p style={{ margin: "0 0 1rem" }}>{note.content}</p>
					<button className="delete"
						onClick={() => handleDelete(note.id)}
						disabled={deletingId === note.id}
					>
						{deletingId === note.id ? "Deleting..." : "Delete"}
					</button>
				</li>
			))}
		</ul>
	);
}
