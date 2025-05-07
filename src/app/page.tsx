"use client";

import { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import { fetchNotes } from "../lib/api";
import { Note } from "../types/Note";

export default function Home() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

	const loadNotes = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await fetchNotes();
			setNotes(data);
		} catch (err) {
			console.error("Failed to fetch notes", err);
			setError("Could not load notes. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadNotes();
	}, []);

	const handleNoteCreated = () => {
		loadNotes();
		setNoteToEdit(null);
	};

	const handleNoteDeleted = () => {
		loadNotes();
		alert("Note deleted successfully!");
	};

	const handleNoteUpdated = (note: Note) => {
		setNoteToEdit(note);
	};

	const handleCancelEdit = () => {
		setNoteToEdit(null);
	};

	return (
		<div className="main-container" style={{ maxWidth: 600, margin: "0 auto", padding: "1rem" }}>
			<h1>My Notes App</h1>

			<section className="form-section" style={{ marginBottom: "2rem" }}>
				<h2>{noteToEdit ? "Edit Note" : "Create a New Note"}</h2>
				<NoteForm onCreated={handleNoteCreated} noteToEdit={noteToEdit ?? undefined}
					clearEdit={handleCancelEdit} />
			</section>

			<section className="list-section">
				<h2>Your Notes</h2>

				{isLoading && <p>Loading notes...</p>}
				{error && <p style={{ color: "red" }}>{error}</p>}
				{!isLoading && !error && notes.length === 0 && <p>No notes yet.</p>}

				{!isLoading && !error && notes.length > 0 && (
					<NotesList notes={notes} onDeleted={handleNoteDeleted} onUpdated={handleNoteUpdated} />
				)}
			</section>
		</div>
	);
}
