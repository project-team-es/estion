import React from "react";

export default function AuthInput({ id, label, type, value, onChange, error }) { 
    return (
        <div className="mt-4">
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold">{label}</label>
            <input
                id={id}
                type={type}
                name={id}
                value={value}
                onChange={onChange}
                className={`mt-2 block w-full border-gray-300 rounded-md px-4 py-2 
                            focus:ring-blue-500 focus:border-blue-500
                            ${error ? 'border-red-500' : ''}`} 
            />
            {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
        </div>
    );
}