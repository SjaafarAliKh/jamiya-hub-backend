const Membership = require("../models/Membership");

// POST /memberships
async function createMembership(req, res) {
    try {
        const { jamiya, payoutPosition } = req.body;

        const createdMembership = await Membership.create({
            jamiya,
            user: req.user._id,
            role: "member",
            payoutPosition
        });

        return res.status(201).json(createdMembership);

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                message: "This user is already a member of this Jamiya."
            });
        }

        return res.status(500).json({ message: error.message });
    }
}

// GET /memberships
async function getAllMemberships(req, res) {
    try {
        const allMemberships = await Membership.find()
            .populate("user", "username fullName")
            .populate("jamiya", "name contributionAmount frequency");

        return res.status(200).json(allMemberships);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// GET /memberships/:membershipId
async function getMembershipById(req, res) {
    try {
        const foundMembership = await Membership.findById(
            req.params.membershipId
        )
            .populate("user", "username fullName")
            .populate("jamiya", "name contributionAmount frequency");

        if (!foundMembership) {
            return res.status(404).json({
                message: "Membership Not Found"
            });
        }

        return res.status(200).json(foundMembership);

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid membership ID."
            });
        }

        return res.status(500).json({ message: error.message });
    }
}

// PUT /memberships/:membershipId
async function updateMembership(req, res) {
    try {
        const { payoutPosition, status } = req.body;

        const updatedMembership = await Membership.findByIdAndUpdate(
            req.params.membershipId,
            { payoutPosition, status },
            { new: true, runValidators: true },
        );

        if (!updatedMembership) {
            return res.status(404).json({
                message: "Membership Not Found"
            });
        }

        return res.status(200).json(updatedMembership);

    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid membership ID."
            });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                message: "This user is already a member of this Jamiya."
            });
        }

        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createMembership,
    getAllMemberships,
    getMembershipById,
    updateMembership,
};