import { getClientStatusMeta } from "@/lib/enums";
import Link from "next/link";
import { formatAddress } from "@/lib/format-address";

export const Table = ({ clients }) => {
    return (
        <div className="bg-base-100 rounded-lg shadow-md w-full">
            <table className="table w-full">
                <thead className="bg-base-200/30 text-base-content">
                    <tr>
                        <th>Client</th>
                        <th>Contact</th>
                        <th>Status</th>
                        <th>Industry</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => {
                        const status = getClientStatusMeta(client.status);
                        return (
                            <tr key={client._id} className="hover:bg-base-200/30 transition duration-200 ease-in-out">
                                <td className="flex flex-col">
                                    <div className="font-semibold">
                                        <Link href={`/clients/${client._id}`} key={client._id}>{client.name}</Link>
                                    </div>
                                    <div className="text-sm text-neutral/60">{formatAddress(client.address)}</div>
                                </td>
                                <td className="flex flex-col text-sm">
                                    <div>{client.contactPerson}</div>
                                    <div className="text-neutral/60">{client.email}</div>
                                    <div className="text-neutral/60">{client.phone}</div>
                                </td>
                                <td><span className={`badge badge-sm ${status.badge}`}>{status.label || "Unknown"}</span></td>
                                <td>{client.industry || "N/A"}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;