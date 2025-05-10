/**
 * Formats a file size in bytes to a human-readable string (KB, MB, etc)
 * @param {string|number} sizeInBytes - File size in bytes (can be string or number)
 * @returns {string} Formatted file size
 */
export const formatFileSize = (sizeInBytes) => {
    if (!sizeInBytes) return 'Unknown size';

    // Convert to number if it's a string
    const size = typeof sizeInBytes === 'string' ? parseInt(sizeInBytes, 10) : sizeInBytes;

    if (isNaN(size)) return 'Unknown size';

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    let fileSize = size;

    while (fileSize >= 1024 && i < units.length - 1) {
        fileSize /= 1024;
        i++;
    }

    // Round to 2 decimal places
    return `${fileSize.toFixed(2)} ${units[i]}`;
};