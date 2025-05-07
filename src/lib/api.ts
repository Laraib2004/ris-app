import { Note } from "../types/Note";

const BASE_URL = "http://localhost:8080/api/notes";

export async function fetchNotes(): Promise<Note[]> {
	const res = await fetch(BASE_URL, { cache: "no-store" });
	return res.json();
}

export async function createNote(note: Note) {
	await fetch(BASE_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(note),
	});
}

export async function deleteNote(id: number) {
	await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}

export async function updateNote(note: Note) {
	const response = await fetch(`${BASE_URL}/${note.id}`, {
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(note)
	});
	if (!response.ok) {
		throw new Error("Failed to update Note")
	}
	return await response.json();
}
