"use client";

import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import { fetchNotes } from "../lib/api";
import { useState, useEffect } from "react";
import { Note } from "../types/Note";

export default function Home() {
	const [notes, setNotes] = useState<Note[]>([]);

	const loadNotes = async () => {
		const data = await fetchNotes();
		setNotes(data);
	};

	useEffect(() => {
		loadNotes();
	}, []);

	return (
		<main>
			<h1>Notes App</h1>
			<NoteForm onCreated={loadNotes} />
			<NotesList notes={notes} onDeleted={loadNotes} />
		</main>
	);
}
