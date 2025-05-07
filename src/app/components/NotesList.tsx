"use client";

import { useState } from "react";
import { Note } from "../../types/Note";
import { deleteNote, updateNote } from "@/lib/api";

type NotesListProps = {
	notes: Note[];
	onDeleted: () => void;
	onUpdated: (note: Note) => void;
};

export default function NotesList({ notes, onDeleted, onUpdated }: NotesListProps) {
	const [deletingId, setDeletingId] = useState<number | null>(null);
	const [updateId, setUpdatingId] = useState<number | null>(null);

	const handleDelete = async (id: number) => {
		setDeletingId(id);

		await deleteNote(id);

		setDeletingId(null);
		onDeleted();
	};

	const handleUpdate = async (note: Note) => {
		setUpdatingId(note.id);
		const response = await updateNote(note);
		setUpdatingId(null);
		onUpdated(note);
	}
	return (
		<ul style={{ listStyle: "none", padding: 0 }}>
			{notes.map((note) => (
				<li
					key={note.id}
				>
					<h3 style={{ margin: "0 0 0.5rem" }}>{note.title}</h3>
					<p style={{ margin: "0 0 1rem" }}>{note.content}</p>
					<button className="update"
						onClick={() => handleUpdate(note)}
						disabled={updateId === note.id}
					>
						{updateId === note.id ? "Updating..." : "Update"}
					</button>
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
