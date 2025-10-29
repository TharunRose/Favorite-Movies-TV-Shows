import React from 'react';


export default function ConfirmDialog({ open, onClose, onConfirm, title, children }: any) {
   if (!open) return null;
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         <div className="modal-backdrop absolute inset-0" onClick={onClose}></div>
         <div className="relative bg-white rounded shadow p-4 z-50 max-w-md w-full">
            <h3 className="font-semibold mb-2">{title}</h3>
            <div className="mb-4">{children}</div>
            <div className="flex justify-end gap-2">
               <button onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
               <button onClick={onConfirm} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
         </div>
      </div>
   );
}