const Vote = require('../models/voteSchema');
const User = require('../models/userSchema');

exports.submitVote = async (req, res) => {
    try {
        const now = Date.now();
        const oneDayAgo = now - 24 * 60 * 60 * 1000;

        const recentVotesCount = await Vote.countDocuments({
            userId: req.user._id,
            createdAt: { $gte: oneDayAgo }
        });

        //vote limit set by admin.
        if (recentVotesCount >= 3) {
            return res.status(400).json({ error: 'You can only vote 3 times within 24 hours.' });
        }
        if (req.body.userId !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You can only vote as yourself.' });
        }
        const vote = new Vote({
            userId: req.user._id,
            variable: req.body.variable,
            rating: req.body.rating
        });
        await vote.save();

        const user = await User.findById(req.user._id);
        user.votes.push(vote);
        await user.save();

        res.status(201).json(vote);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred while submitting the vote.' });
    }
}