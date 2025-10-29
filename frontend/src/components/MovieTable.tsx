import React, { useRef, useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import MovieRow from './MovieRow';
import ConfirmDialog from './ConfirmDialog';

export default function MovieTable({ onEdit }: { onEdit: (id: number) => void }) {
    const { movies, hasMore, loading, loadMore, removeMovie } = useMovies();
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [toDelete, setToDelete] = React.useState<number | null>(null);

    // Infinite scroll
    useEffect(() => {
        if (!loaderRef.current) return;
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) loadMore();
        });
        obs.observe(loaderRef.current);
        return () => obs.disconnect();
    }, [loaderRef.current, hasMore, loading, loadMore]);

    const confirmDelete = async () => {
        if (toDelete) await removeMovie(toDelete);
        setConfirmOpen(false);
    };

    return (
        <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-3 text-sm">Title</th>
                        <th className="p-3 text-sm">Type</th>
                        <th className="p-3 text-sm">Director</th>
                        <th className="p-3 text-sm">Budget</th>
                        <th className="p-3 text-sm">Location</th>
                        <th className="p-3 text-sm">Duration</th>
                        <th className="p-3 text-sm">Year/Time</th>
                        <th className="p-3 text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m) => (
                        <MovieRow key={m.id} movie={m} onEdit={() => onEdit(m.id)} onDelete={() => {
                            setToDelete(m.id);
                            setConfirmOpen(true);
                        }} />
                    ))}
                </tbody>
            </table>

            <div ref={loaderRef} className="p-4 text-center">
                {loading ? 'Loading...' : hasMore ? 'Scroll to load more' : 'No more records'}
            </div>

            <ConfirmDialog
                open={confirmOpen}
                title="Delete Entry"
                onClose={() => setConfirmOpen(false)}
                onConfirm={confirmDelete}
            >
                Are you sure you want to delete this movie?
            </ConfirmDialog>
        </div>
    );
}
