import Link from 'next/link';
import { getClientById } from '../actions/queries';
import { ClientOverview } from './components/overview';
import { ClientProjects } from './components/client-projects';

export const ClientDetailPage = async ({ params }) => {
    const { id } = await params;
    const client = await getClientById(id);
    return (
        <div className="space-y-6">
            <div className='flex items-center justify-between'>
                <Link href="/clients" className="btn btn-link">
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Clients
                </Link>
                <Link href={`/clients/${client._id}/edit`} className="btn btn-primary">
                    <i className="fas fa-edit mr-2"></i>
                    Edit Client
                </Link>
            </div>

            <div role='tablist' className='tabs tabs-box bg-base-300'>
                <a className='tab tab-active'>Profile</a>
                <a className='tab'>Projects</a>
                <a className='tab'>Invoices</a>
                <a className='tab'>Documents</a>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='col-span-2 space-y-6'>
                    <ClientOverview client={client} />
                </div>
                <div className='flex flex-col gap-4'>
                    <ClientProjects clientId={client._id} />
                </div>
            </div>
        </div>
    );
};

export default ClientDetailPage;