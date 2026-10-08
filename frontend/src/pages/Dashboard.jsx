import { useEffect, useState } from "react";
import API from "../services/api";
import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";

function Dashboard({ onLogout }) {
    const [leads, setLeads] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingLead, setEditingLead] = useState(null);

    const getLeads = async () => {
        try {
            const response = await API.get("/leads");
            setLeads(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getLeads();
    }, []);

    const addLead = async (lead) => {
        try {
            await API.post("/leads", lead);
            setShowForm(false);
            getLeads();
        } catch (error) {
            console.error(error);
        }
    };

    const updateLead = async (lead) => {
        try {
            await API.put(`/leads/${lead.id}`, lead);
            setEditingLead(null);
            setShowForm(false);
            getLeads();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteLead = async (id) => {
        if (!window.confirm("Delete this lead?")) return;

        try {
            await API.delete(`/leads/${id}`);
            getLeads();
        } catch (error) {
            console.error(error);
        }
    };

    const editLead = (lead) => {
        setEditingLead(lead);
        setShowForm(true);
    };

    return (
        <div className="dashboard">

            <header>
                <div>
                    <h1>Mini CRM</h1>
                    <p>Client Lead Management</p>
                </div>

                <div>
                    <button
                        onClick={() => {
                            setEditingLead(null);
                            setShowForm(!showForm);
                        }}
                    >
                        {showForm ? "Close" : "+ Add Lead"}
                    </button>

                    <button
                        onClick={onLogout}
                        style={{ marginLeft: "10px" }}
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="stats">

                <div className="card">
                    <h3>Total Leads</h3>
                    <p>{leads.length}</p>
                </div>

                <div className="card">
                    <h3>New</h3>
                    <p>
                        {leads.filter(
                            (lead) => lead.status === "New"
                        ).length}
                    </p>
                </div>

                <div className="card">
                    <h3>Contacted</h3>
                    <p>
                        {leads.filter(
                            (lead) => lead.status === "Contacted"
                        ).length}
                    </p>
                </div>

                <div className="card">
                    <h3>Converted</h3>
                    <p>
                        {leads.filter(
                            (lead) => lead.status === "Converted"
                        ).length}
                    </p>
                </div>

            </div>

            {showForm && (
                <LeadForm
                    onAdd={addLead}
                    onUpdate={updateLead}
                    editingLead={editingLead}
                    onCancel={() => {
                        setEditingLead(null);
                        setShowForm(false);
                    }}
                />
            )}

            <LeadTable
                leads={leads}
                onDelete={deleteLead}
                onEdit={editLead}
            />

        </div>
    );
}

export default Dashboard;