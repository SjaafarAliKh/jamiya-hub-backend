const Jamiya = require('../models/Jamiya')
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

// GET /jamiyas/:jamiyaId
async function getJamiyaById(req, res) {
    try {
        // Check if the logged-in user is an active member
        const membership = await Membership.findOne({
            jamiya: req.params.jamiyaId,
            user: req.user._id,
            status: 'active'
        })

        if (!membership) {
            return res.status(403).json({
                error: 'You are not a member of this Jamiya.'
            })
        }

        const jamiya = await Jamiya.findById(req.params.jamiyaId)

        if (!jamiya) {
            return res.status(404).json({
                error: 'Jamiya not found.'
            })
        }

        return res.status(200).json(jamiya)

    } catch (error) {
        console.error(error)

        if (error.name === 'CastError') {
            return res.status(400).json({
                error: 'Invalid Jamiya ID.'
            })
        }

        return res.status(500).json({
            error: 'Internal Server Error'
        })
    }
}

// PUT /jamiyas/:jamiyaId
async function updateJamiya(req, res) {
    try {
        const {
            name,
            description,
            contributionAmount,
            frequency,
            startDate,
            maxMembers,
            status
        } = req.body

        const existingJamiya = await Jamiya.findById(
            req.params.jamiyaId
        )

        if (!existingJamiya) {
            return res.status(404).json({
                error: 'Jamiya does not exist.'
            })
        }

        if (existingJamiya.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: 'You are not authorized to update this Jamiya.'
            })
        }

        const updatedJamiya = await Jamiya.findByIdAndUpdate(
            req.params.jamiyaId,
            {
                name,
                description,
                contributionAmount,
                frequency,
                startDate,
                maxMembers,
                status
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        )

        return res.status(200).json(updatedJamiya)

    } catch (error) {
        console.error(error)

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message })
        }
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid Jamiya ID.' })
        }

        return res.status(500).json({ error: 'Internal Server Error' })
    }
}


module.exports = {
    createJamiya,
    getJamiyas,
    getJamiyaById,
    updateJamiya
}