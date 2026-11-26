
// create
// read
// update
const membership = require("../models/Membership");

async function CreateMemberShip(req, res) {
    try {
        const { jamiya, user, role, payoutPosition, status } = req.body;
        const createdMembership = await membership.create({
            jamiya,
            user,
            role,
            payoutPosition,
            status,
        });

        return res.status(201).json(createdMembership);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "membership with this name already exists" });
        }
        return res.status(500).json({ message: error.message });
    }
}

async function getAllMemberShip(req, res) {
    try {
        const allMemberShip = await membership.find();
        return res.status(200).json(allMemberShip);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function getMemberShipById(req, res) {
    try {
        const foundMemberShip = await membership.findById(req.params.membershipId);
        if (!foundMemberShip) {
            return res.status(404).json({ message: "membership Not Found" });
        }
        return res.status(200).json(foundMemberShip);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateMembership(req, res) {
    try {
        const { jamiya, user, role, payoutPosition, status } = req.body;
        const updatedMembership = await membership.findByIdAndUpdate(
            req.params.membershipId,
            { jamiya, user, role, payoutPosition, status },
            { returnDocument: "after", runValidators: true },
        );

        if (!updatedMembership) {
            return res.status(404).json({ message: "membership Not Found" });
        }
        return res.status(200).json(updatedMembership);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(409).json({ message: "membership with this name already exists" });
        }
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    CreateMemberShip,
    getAllMemberShip,
    getMemberShipById,
    updateMembership,
};