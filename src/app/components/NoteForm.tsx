"use client";

import { useState, FormEvent } from "react";
import { createNote } from "../../lib/api";

type NoteFormProps = {
	onCreated: () => void;
};

export default function NoteForm({ onCreated }: NoteFormProps) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log("Creating note:", { title, content });
		await createNote({title, content});
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
			<button type="submit">Add Note</button>
		</form>
	);
}
