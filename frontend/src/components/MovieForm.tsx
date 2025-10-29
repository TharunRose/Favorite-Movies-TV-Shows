
import React, { useEffect, useState } from 'react';
import type { Movie } from '../types';
import { useMovies } from '../context/MovieContext';
import { fetchMovieById } from '../services/api';


function ModalShell({ open, onClose, children, title }: any) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-40 flex items-start justify-center pt-20">
            <div className="modal-backdrop absolute inset-0" onClick={onClose}></div>
            <div className="relative bg-white rounded shadow max-w-2xl w-full z-50 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-500">✕</button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default function MovieFormModal({ open, onClose, movieId }: { open: boolean; onClose: () => void; movieId?: number }) {
    const { addMovie, editMovie } = useMovies();
    const [form, setForm] = useState<Partial<Movie>>({ type: 'Movie' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadMovie() {
            if (movieId && open) {
                const data = await fetchMovieById(movieId);
                setForm(data);
            } else if (!open) {
                setForm({ type: 'Movie' });
            }
        }
        loadMovie();
    }, [movieId, open]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            if (movieId) await editMovie(movieId, form);
            else await addMovie(form);
            onClose();
        } catch (err) {
            console.error(err);
            alert('Error saving movie');
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalShell open={open} onClose={onClose} title={movieId ? 'Edit Entry' : 'Add New Entry'}>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm">Title *</label>
                        <input required value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border p-2 rounded" />
                    </div>


                    <div>
                        <label className="block text-sm">Type</label>
                        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as any })} className="w-full border p-2 rounded">
                            <option>Movie</option>
                            <option>TV Show</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm">Director</label>
                        <input value={form.director || ''} onChange={(e) => setForm({ ...form, director: e.target.value })} className="w-full border p-2 rounded" />
                    </div>


                    <div>
                        <label className="block text-sm">Budget</label>
                        <input value={form.budget || ''} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full border p-2 rounded" />
                    </div>


                    <div>
                        <label className="block text-sm">Location</label>
                        <input value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full border p-2 rounded" />
                    </div>


                    <div>
                        <label className="block text-sm">Duration</label>
                        <input value={form.duration || ''} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full border p-2 rounded" />
                    </div>


                    <div>
                        <label className="block text-sm">Year/Time</label>
                        <input value={form.yearOrTime || ''} onChange={(e) => setForm({ ...form, yearOrTime: e.target.value })} className="w-full border p-2 rounded" />
                    </div>



                </div>


                <div>
                    <label className="block text-sm">Notes</label>
                    <textarea value={form.details || ''} onChange={(e) => setForm({ ...form, details: e.target.value })} className="w-full border p-2 rounded" />
                </div>


                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
                </div>

            </form>
        </ModalShell>
    )
}