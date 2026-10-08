const db = require("../config/db");

// Get all leads
const getLeads = (req, res) => {
    const sql = "SELECT * FROM leads ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json(results);
    });
};

// Add new lead
const addLead = (req, res) => {
    const {
        name,
        email,
        phone,
        source,
        status,
        notes,
        follow_up_date
    } = req.body;

    const sql = `
        INSERT INTO leads
        (name, email, phone, source, status, notes, follow_up_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            email,
            phone,
            source,
            status || "New",
            notes,
            follow_up_date
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            res.status(201).json({
                message: "Lead added successfully",
                id: result.insertId
            });
        }
    );
};

// Delete lead
const deleteLead = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM leads WHERE id = ?";

    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json({
            message: "Lead deleted successfully"
        });
    });
};

// Update lead
const updateLead = (req, res) => {
    const { id } = req.params;

    const {
        name,
        email,
        phone,
        source,
        status,
        notes,
        follow_up_date
    } = req.body;

    const sql = `
        UPDATE leads
        SET name = ?,
            email = ?,
            phone = ?,
            source = ?,
            status = ?,
            notes = ?,
            follow_up_date = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            name,
            email,
            phone,
            source,
            status,
            notes,
            follow_up_date,
            id
        ],
        (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }

            res.json({
                message: "Lead updated successfully"
            });
        }
    );
};

module.exports = {
    getLeads,
    addLead,
    deleteLead,
    updateLead
};