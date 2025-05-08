import Link from "next/link";

export const Header = async () => {
    return (
        <div className="flex w-full justify-between items-center">
            <div className="">
                <h1 className="text-2xl font-bold">Projects</h1>
                < p className="text-sm" > Explore my projects and contributions</p >
            </div>
            <div className="">
                <Link href={"/projects/new"} className="btn btn-primary"><i className="far fa-plus" />New Project</Link>
            </div>
        </div >
    );
}