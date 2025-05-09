'use client';

import { useState } from 'react';
import Image from 'next/image';

// Helper function to validate URLs
const isValidUrl = (url) => {
    if (!url) return false;
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

export default function ClientLogoUploader(element) {
    const [status, setStatus] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    async function handleUpload(file) {
        const fileName = file.name;
        const mimeType = file.type;

        setStatus('Requesting upload URL...');

        const res1 = await fetch('/api/media-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
          mutation ($type: UploadType!, $fileName: String!) {
            generateUploadUrl(type: $type, fileName: $fileName) {
              uploadUrl
              fileUrl
              fileName
            }
          }
        `,
                variables: { type: 'images', fileName },
            }),
        });

        const { data } = await res1.json();
        const { uploadUrl, fileUrl, fileName: finalFileName } = data.generateUploadUrl;
        console.log('res1', res1, data, uploadUrl, fileUrl, finalFileName);
        setStatus('Uploading to Azure...');

        const res2 = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': mimeType,
            },
            body: file,
        });
        console.log('res2', res2);
        if (!res2.ok) {
            setStatus('Upload failed');
            return;
        }

        setStatus('Registering file...');

        const res3 = await fetch('/api/media-upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
          mutation ($input: ImageInput!) {
            registerImage(input: $input) {
              url
            }
          }
        `,
                variables: {
                    input: {
                        fileName: finalFileName,
                        mimeType,
                        url: fileUrl,
                    },
                },
            }),
        });

        const regData = await res3.json();
        const url = regData?.data?.registerImage?.url || finalFileName;
        console.log('regData', regData);
        setFileUrl(url);
        setStatus('Upload complete');

        const input = document.getElementById(element);
        if (input) input.value = url;
    }

    return (
        <div className="flex flex-col gap-2">
            <input
                type="file"
                accept="image/*"
                className='file-input w-full'
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                }}
            />
            {status && <p className="text-xs text-gray-600">{status}</p>}
            {fileUrl && isValidUrl(fileUrl) && (
                <img
                    src={fileUrl}
                    alt="Uploaded Image"
                    className="w-32 h-auto mt-2 rounded border"
                />
            )}
        </div>
    );
}
