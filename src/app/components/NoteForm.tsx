"use client";

import { useState, FormEvent, useEffect } from "react";
import { createNote, updateNote } from "../../lib/api";
import { Note } from "@/types/Note";

type NoteFormProps = {
	onCreated: () => void;
	noteToEdit?: Note;
	clearEdit?: () => void;
};

export default function NoteForm({ onCreated, noteToEdit, clearEdit }: NoteFormProps) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const id = -1;

	useEffect(() => {
		if (noteToEdit) {
			setTitle(noteToEdit.title);
			setContent(noteToEdit.content);
		}
	}, [noteToEdit]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (noteToEdit) {
			await updateNote({ id: noteToEdit.id, title, content });
			clearEdit?.();
		} else {
			await createNote({ id, title, content });
		}
		// Reset form and trigger parent refresh
		setTitle("");
		setContent("");
		onCreated();
	};

	return (
		<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Title"
				required
			/>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Content"
				required
			/>
			<button type="submit">
				{noteToEdit ? "Update Note" : "Add Note"}
			</button>
			{noteToEdit && (
				<button type="button" className="delete" onClick={clearEdit}>
					Cancel Edit
				</button>
			)}
		</form>
	);
}
