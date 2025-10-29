import React, { useCallback, useState } from 'react';
import MovieTable from '../components/MovieTable';
import MovieFormModal from '../components/MovieForm';


export default function Home() {
    const [openNew, setOpenNew] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);


    const handleEdit = useCallback((id: number) => setEditingId(id), []);
    const handleCloseEdit = useCallback(() => setEditingId(null), []);


    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-medium">Your Collection</h2>
                    <p className="text-sm text-gray-500">Add, edit, and manage your favorite movies and TV shows.</p>
                </div>
                <div>
                    <button
                        onClick={() => setOpenNew(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                    >
                        + Add New
                    </button>
                </div>
            </div>


            <MovieTable onEdit={handleEdit} />


            <MovieFormModal open={openNew} onClose={() => setOpenNew(false)} />
            <MovieFormModal open={!!editingId} onClose={handleCloseEdit} movieId={editingId ?? undefined} />
        </div>
    );
}