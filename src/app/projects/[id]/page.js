import Link from 'next/link';
import { getProjectById } from '../actions/queries';
import { ProjectOverview } from './components/overview';
import { RecentActivity } from './components/recent-activity';
import { WeatherWidget } from '@/components/shared/weather';
import { ProgressWidget } from './components/progress';

export const ProjectsDetailPage = async ({ params }) => {
    const { id } = await params;
    const project = await getProjectById(id);
    return (
        <div className="space-y-6">
            <div className='flex items-center justify-between'>
                <Link href="/projects" className="btn btn-link">
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Projects
                </Link>
                <Link href={`/projects/${project._id}/edit`} className="btn btn-primary">
                    <i className="fas fa-edit mr-2"></i>
                    Edit Project
                </Link>
            </div>

            <div role='tablist' className='tabs tabs-box bg-base-300'>
                <a className='tab tab-active'>Details</a>
                <a className='tab'>Tasks</a>
                <a className='tab'>Files</a>
                <a className='tab'>Comments</a>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='col-span-2 space-y-6'>
                    <ProjectOverview project={project} />
                    <RecentActivity project={project} />
                </div>
                <div className='flex flex-col gap-4'>
                    <ProgressWidget project={project} />
                    <WeatherWidget location={project.location} />
                </div>
            </div>
        </div>
    );
};

export default ProjectsDetailPage;