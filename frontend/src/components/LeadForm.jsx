import { useEffect, useState } from "react";

function LeadForm({ onAdd, onUpdate, editingLead, onCancel }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        source: "Website",
        status: "New",
        notes: "",
        follow_up_date: ""
    });

    useEffect(() => {
        if (editingLead) {
            setForm({
                name: editingLead.name || "",
                email: editingLead.email || "",
                phone: editingLead.phone || "",
                source: editingLead.source || "Website",
                status: editingLead.status || "New",
                notes: editingLead.notes || "",
                follow_up_date: editingLead.follow_up_date
                    ? editingLead.follow_up_date.substring(0, 10)
                    : ""
            });
        }
    }, [editingLead]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim()) {
            alert("Name is required");
            return;
        }

        if (editingLead) {
            onUpdate({
                ...form,
                id: editingLead.id
            });
        } else {
            onAdd(form);
        }
    };

    return (
        <form className="lead-form" onSubmit={handleSubmit}>
            <h2>{editingLead ? "Edit Lead" : "Add New Lead"}</h2>

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
            />

            <select
                name="source"
                value={form.source}
                onChange={handleChange}
            >
                <option>Website</option>
                <option>LinkedIn</option>
                <option>Referral</option>
                <option>Facebook</option>
                <option>Other</option>
            </select>

            <select
                name="status"
                value={form.status}
                onChange={handleChange}
            >
                <option>New</option>
                <option>Contacted</option>
                <option>Converted</option>
                <option>Lost</option>
            </select>

            <input
                type="date"
                name="follow_up_date"
                value={form.follow_up_date}
                onChange={handleChange}
            />

            <textarea
                name="notes"
                placeholder="Notes"
                value={form.notes}
                onChange={handleChange}
            />

            <div>
                <button type="submit">
                    {editingLead ? "Update Lead" : "Add Lead"}
                </button>

                {editingLead && (
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{ marginLeft: "10px" }}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default LeadForm;