import { Note } from "../types/Note";

const BASE_URL = "http://localhost:8080/api/notes";

export async function fetchNotes(): Promise<Note[]> {
	const res = await fetch(BASE_URL, { cache: "no-store" });
	return res.json();
}

export async function createNote(note: Omit<Note, "id">) {
	await fetch(BASE_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(note),
	});
}

export async function deleteNote(id: number) {
	await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}
