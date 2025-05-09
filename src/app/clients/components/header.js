import Link from "next/link";

export const Header = async () => {
    return (
        <div className="flex w-full justify-between items-center">
            <div className="">
                <h1 className="text-2xl font-bold">Clients</h1>
                <p className="text-sm">Manage your clients and contacts</p>
            </div>
            <div className="">
                <Link href={"/clients/new"} className="btn btn-primary"><i className="far fa-plus" />New Client</Link>
            </div>
        </div>
    );
}