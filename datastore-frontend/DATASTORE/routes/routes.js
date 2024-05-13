const express = require('express');
const router = express.Router();
const Model = require('../models/Model');


module.exports = router;

router.post('/post', async (req, res) => {
    const { url, name, bio, location, coordinates, education, experience } = req.body;

    try {
        let existingUser = await Model.findOne({ url: url });

        if (existingUser) {
            // User with the same username already exists, check for changes
            let changesDetected = false;

            // Check if any of the fields have changed
            if (existingUser.url !== url ||
                existingUser.name !== name ||
                existingUser.bio !== bio ||
                existingUser.location !== location ||
                JSON.stringify(existingUser.coordinates) !== JSON.stringify(coordinates) ||
                !arraysEqual(existingUser.education, education) ||
                !arraysEqual(existingUser.experience, experience)) {
                changesDetected = true;
            }

            if (changesDetected) {
                // Update user's information
                existingUser.url = url;
                existingUser.name = name;
                existingUser.bio = bio || "N/A";
                existingUser.location = location || "Beirut";
                existingUser.coordinates = coordinates || [33.8886, 35.4955];
                existingUser.education = education;
                existingUser.experience = experience;

                const savedUser = await existingUser.save();

                return res.status(200).json({
                    code: 200,
                    description: 'User updated successfully'
                });
            } else {
                // No changes detected, discard the request
                return res.status(200).json({
                    code: 200,
                    description: 'No changes detected, request discarded'
                });
            }
        } else {
            const newUser = new Model({
                url: url,
                name: name,
                bio: bio || "N/A",
                location: location || "Beirut",
                coordinates: coordinates || [33.8886, 35.4955],
                education: education,
                experience: experience,
            });

            const savedUser = await newUser.save();

            return res.status(200).json({
                code: 200,
                description: 'User saved successfully'
            });
        }
    } catch (error) {
        return res.status(400).json({
            code: 400,
            description: 'Failed to save/update user',
            error: error.message
        });
    }
});

// Function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}


router.get('/getAll', async (req, res) => {
    try {
        const allData = await Model.find(); // Retrieve all data from the database
        res.status(200).json(
            allData);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

