'use client';
import { useEffect } from 'react';

export const ClientValidationSuppressor = () => {
    useEffect(() => {
        // Suppress native HTML5 validation tooltips
        const handleInvalid = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        // Attach to the document
        document.addEventListener('invalid', handleInvalid, true);

        // Clean up
        return () => {
            document.removeEventListener('invalid', handleInvalid, true);
        };
    }, []);

    return null;
};
