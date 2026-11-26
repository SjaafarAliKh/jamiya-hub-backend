const Jamiya = require('../models/Jamiya')
const membership = require('../models/Membership')
const Membership = require('../models/Membership')

// POST /jamiyas
async function createJamiya(req, res) {
    try {
        const newJamiya = await Jamiya.create({
            name: req.body.name,
            description: req.body.description,
            contributionAmount: req.body.contributionAmount,
            frequency: req.body.frequency,
            startDate: req.body.startDate,
            maxMembers: req.body.maxMembers,
            organizer: req.user._id
        })

        // Add creator as the organizer
        await Membership.create({
            jamiya: newJamiya._id,
            user: req.user._id,
            role: 'organizer',
            payoutPosition: 1
        })

        res.status(201).json(newJamiya)

    } catch (error) {
        console.error(error)

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message })
        }

        if (error.code === 11000) {
            return res.status(409).json({
                error: 'Duplicate value already exists.'
            })
        }

        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

// GET /jamiyas
async function getJamiyas(req, res) {
    try {
        const memberships = await Membership.find({
            user: req.user._id,
            status: 'active'
        })

        const jamiyaIds = memberships.map(membership => membership.jamiya)

        const jamiyas = await Jamiya.find({
            _id: { $in: jamiyaIds }
        })

     return res.status(200).json(jamiyas)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}



module.exports = {
    createJamiya,
    getJamiyas
}