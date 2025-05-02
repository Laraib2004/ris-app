"use client";

import { useState } from "react";
import { createNote } from "../../lib/api";

export default function NoteForm({ onCreated }: { onCreated: () => void }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await createNote({ title, content });
		setTitle("");
		setContent("");
		onCreated();
	};

	return (
		<form onSubmit={handleSubmit}>
			<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
			<textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
			<button type="submit">Add Note</button>
		</form>
	);
}
