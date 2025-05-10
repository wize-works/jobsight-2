import { formatFileSize } from "@/lib/utilities";

export const TaskAttachments = ({ task }) => {
    const { attachments } = task;

    // Function to get icon based on file type
    const getFileIcon = (filename) => {
        if (!filename) return "far fa-file";

        const extension = filename.split('.').pop().toLowerCase();

        switch (extension) {
            case 'pdf':
                return "far fa-file-pdf";
            case 'doc':
            case 'docx':
                return "far fa-file-word";
            case 'xls':
            case 'xlsx':
                return "far fa-file-excel";
            case 'ppt':
            case 'pptx':
                return "far fa-file-powerpoint";
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
            case 'svg':
                return "far fa-file-image";
            case 'zip':
            case 'rar':
            case '7z':
                return "far fa-file-archive";
            case 'txt':
                return "far fa-file-lines";
            default:
                return "far fa-file";
        }
    };

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Attachments</h2>

                <div className="space-y-2 mt-2">
                    {attachments.map((file, index) => (
                        <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                            className="flex items-center p-2 hover:bg-base-200 rounded-lg transition-colors"
                        >
                            <div className="mr-3 text-xl">
                                <i className={getFileIcon(file.filename)}></i>
                            </div>
                            <div className="flex-grow overflow-hidden">
                                <div className="truncate">{file.filename}</div>
                                {file.size && (
                                    <div className="text-xs text-neutral/60">
                                        {formatFileSize(file.size)}
                                    </div>
                                )}
                            </div>
                            <div className="text-neutral/60">
                                <i className="far fa-download"></i>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaskAttachments;