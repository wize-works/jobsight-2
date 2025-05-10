'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

export const TaskComments = ({ task }) => {
    const router = useRouter();
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [comments, setComments] = useState(task.comments || []);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            setIsSubmitting(true);

            // Create a new comment object
            const comment = {
                content: newComment,
                createdBy: "current-user-id", // This would come from auth context in a real app
                createdByName: "Current User", // This would come from auth context in a real app
                createdAt: new Date().toISOString()
            };

            // Optimistic update
            const updatedComments = [...comments, comment];
            setComments(updatedComments);
            setNewComment("");

            // Construct GraphQL mutation
            const query = `
                mutation ($id: ID!, $input: TaskInput!) {
                    updateTask(id: $id, input: $input) {
                        _id
                        comments {
                            id
                            content
                            createdBy
                            createdByName
                            createdAt
                        }
                    }
                }
            `;

            // Send to server via API route
            const response = await fetch('/api/wize-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables: {
                        id: task._id,
                        input: {
                            comments: updatedComments
                        }
                    }
                }),
            });

            const result = await response.json();

            if (!response.ok || result.errors) {
                throw new Error(result.errors?.[0]?.message || 'Failed to add comment');
            }

            // Refresh page data
            router.refresh();
        } catch (error) {
            console.error("Failed to add comment:", error);
            // Remove the optimistic comment on error
            setComments(comments);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Comments</h2>

                <div className="space-y-4 mt-2">
                    {comments.length === 0 ? (
                        <div className="text-center py-4 text-neutral/60">
                            <p>No comments yet</p>
                        </div>
                    ) : (
                        comments.map((comment, index) => (
                            <div key={index} className="bg-base-200/50 rounded-lg p-3">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="font-semibold">{comment.createdByName || "Unknown user"}</div>
                                    <div className="text-xs text-neutral/60">
                                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                    </div>
                                </div>
                                <p className="whitespace-pre-wrap">{comment.content}</p>
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={handleSubmitComment} className="mt-4">
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                        disabled={isSubmitting}
                    ></textarea>
                    <button
                        type="submit"
                        className="btn btn-primary mt-2"
                        disabled={!newComment.trim() || isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="loading loading-spinner loading-xs mr-2"></span>
                                Posting...
                            </>
                        ) : (
                            <>
                                <i className="far fa-paper-plane mr-2"></i>
                                Post Comment
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskComments;