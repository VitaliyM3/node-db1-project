const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    db.select('*').from('accounts')
        .then(accounts => {
            res.status(200).json({ data: accounts })
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error getting accounts" });
        });
});

server.get('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
        if (account) {
            res.status(200).json({ data: account});
        } else {
            res.status(404).json({ message: "Account not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "There was an error locating the account" });
    });
});

server.post('/', (req, res) => {
    db('accounts')
    .insert(req.body, "id")
    .then(ids => {
        res.status(201).json({ results: ids });
    })
    .catch(error => {
        res.status(500).json({ message: "There was an error posting" });
    });
});

server.put('/:id', (req, res) => {
    const changes = req.body;
    db('accounts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "The account was updated" });
        } else {
            res.status(404).json({ message: "Account not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "There was an error updating your account" });
    });
});

server.delete('/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "The account was deleted" });
        } else {
            res.status(404).json({ message: "Account not found" });
        }
    })
    .catch(error => {
        res.status(500).json({ message: "There was an error deleting the account" });
    });
});

module.exports = server;
