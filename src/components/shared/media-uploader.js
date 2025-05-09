'use client';

import { useState } from 'react';

export default function MediaUploader({
    type = 'images',
    label = 'Upload File',
    onUploadComplete,
    autoRegister = true,
    preview = true,
}) {
    const [status, setStatus] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    async function handleUpload(file) {
        const fileName = file.name;
        const mimeType = file.type;

        setStatus('Requesting upload URL...');

        const res1 = await fetch('/api/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
          mutation GenerateUploadUrl($type: UploadType!, $fileName: String!) {
            generateUploadUrl(type: $type, fileName: $fileName) {
              uploadUrl
              fileUrl
              fileName
            }
          }
        `,
                variables: { type, fileName },
            }),
        });

        const { data } = await res1.json();
        const { uploadUrl, fileUrl, fileName: safeFileName } = data.generateUploadUrl;

        setStatus('Uploading to Azure...');

        const res2 = await fetch(uploadUrl, {
            method: 'PUT',
            headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': mimeType,
            },
            body: file,
        });

        if (!res2.ok) {
            setStatus('Upload failed');
            return;
        }

        setFileUrl(fileUrl);

        let finalUrl = fileUrl;

        if (autoRegister) {
            setStatus('Registering with media API...');

            const registerRes = await fetch('/api/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
            mutation Register($input: ImageInput!) {
              registerImage(input: $input) {
                url
              }
            }
          `,
                    variables: {
                        input: {
                            fileName: safeFileName,
                            mimeType,
                            url: fileUrl,
                        },
                    },
                }),
            });

            const registerData = await registerRes.json();
            finalUrl = registerData?.data?.registerImage?.url || fileUrl;
        }

        setStatus('Upload complete');
        if (typeof onUploadComplete === 'function') {
            onUploadComplete(finalUrl);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm">{label}</label>
            <input
                type="file"
                accept={getAcceptMime(type)}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                }}
            />
            {status && <p className="text-xs text-gray-600">{status}</p>}

            {preview && fileUrl && type === 'images' && (
                <img src={fileUrl} alt="Uploaded" className="w-40 h-auto mt-2 rounded shadow" />
            )}
            {preview && fileUrl && type === 'videos' && (
                <video controls className="w-60 mt-2 rounded shadow">
                    <source src={fileUrl} type="video/mp4" />
                </video>
            )}
        </div>
    );
}

function getAcceptMime(type) {
    if (type === 'images') return 'image/*';
    if (type === 'videos') return 'video/*';
    return '*/*';
}
