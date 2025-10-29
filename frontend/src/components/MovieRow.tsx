import React from 'react';
import type { Movie } from '../types';


export default function MovieRow({ movie, onEdit, onDelete }: { movie: Movie; onEdit: () => void; onDelete: () => void }) {
    return (
        <tr className="border-t">
            <td className="p-3 align-top">
                <div className="flex items-center gap-3">

                    <div>
                        <div className="font-medium">{movie.title}</div>
                        <div className="text-xs text-gray-500">{movie.details}</div>
                    </div>
                </div>
            </td>
            <td className="p-3 align-top">{movie.type}</td>
            <td className="p-3 align-top">{movie.director}</td>
            <td className="p-3 align-top">{movie.budget}</td>
            <td className="p-3 align-top">{movie.location}</td>
            <td className="p-3 align-top">{movie.duration}</td>
            <td className="p-3 align-top">{movie.yearOrTime}</td>
            <td className="p-3 align-top">
                <div className="flex gap-2">
                    <button onClick={onEdit} className="px-3 py-1 border rounded text-sm">Edit</button>
                    <button onClick={onDelete} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
                </div>
            </td>
        </tr>
    );
}