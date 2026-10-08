import { useState } from "react";

function LeadTable({ leads, onDelete, onEdit }) {
    const [search, setSearch] = useState("");

    const filteredLeads = leads.filter((lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        (lead.email || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="lead-table">

            <div className="table-header">
                <h2>Leads</h2>

                <input
                    type="text"
                    placeholder="Search leads..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {filteredLeads.length === 0 ? (
                <p>No leads found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Source</th>
                            <th>Status</th>
                            <th>Follow Up</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredLeads.map((lead) => (
                            <tr key={lead.id}>

                                <td>{lead.name}</td>

                                <td>{lead.email}</td>

                                <td>{lead.phone}</td>

                                <td>{lead.source}</td>

                                <td>{lead.status}</td>

                                <td>
                                    {lead.follow_up_date || "-"}
                                </td>

                                <td>
                                    <button
                                        onClick={() => onEdit(lead)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => onDelete(lead.id)}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default LeadTable;