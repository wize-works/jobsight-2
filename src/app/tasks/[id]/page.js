import Link from 'next/link';
import { getTaskById } from '../actions/queries';
import { TaskOverview } from './components/overview';
import { TaskSubtasks } from './components/subtasks';
import { TaskComments } from './components/comments';
import { TaskAttachments } from './components/attachments';

export const TasksDetailPage = async ({ params }) => {
    const { id } = await params;
    const task = await getTaskById(id);

    return (
        <div className="space-y-6">
            <div className='flex items-center justify-between'>
                <Link href="/tasks" className="btn">
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Tasks
                </Link>
                <Link href={`/tasks/${task._id}/edit`} className="btn btn-primary">
                    <i className="fas fa-edit mr-2"></i>
                    Edit Task
                </Link>
            </div>

            <div role='tablist' className='tabs tabs-box bg-base-300'>
                <a className='tab tab-active'>Details</a>
                <a className='tab'>History</a>
                <a className='tab'>Files</a>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='col-span-2 space-y-6'>
                    <TaskOverview task={task} />
                    <TaskSubtasks task={task} />
                </div>
                <div className='flex flex-col gap-4'>
                    <TaskComments task={task} />
                    {task.attachments && task.attachments.length > 0 && (
                        <TaskAttachments task={task} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TasksDetailPage;