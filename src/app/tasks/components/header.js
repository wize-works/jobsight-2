import Link from "next/link";

export const Header = () => {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">Tasks</h1>
                <p className="text-sm text-neutral/70">Manage tasks across all projects</p>
            </div>
            <div>
                <Link href="/tasks/new" className="btn btn-primary">
                    <i className="fas fa-plus mr-2"></i>
                    New Task
                </Link>
            </div>
        </div>
    );
};

export default Header;