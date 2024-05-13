const fs = require('fs');

fs.readFile('./fetcher-extractor/ProfilesWithEducation.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let profiles = JSON.parse(data);

    function filterMajors(profiles) {
        return profiles.map(profile => {
            if (profile.Education) {
                profile.Education.forEach(edu => {
                    const lowerCaseMajor = edu.major.toLowerCase();
                    if (
                        lowerCaseMajor.includes('mechanical') || 
                        lowerCaseMajor.includes('mecanique') || 
                        lowerCaseMajor.includes('mécanique')
                    ) {
                        edu.major = 'Mechanical Engineering';
                    } else if (
                        lowerCaseMajor.includes('GIC') || 
                        lowerCaseMajor.includes('CCE') || 
                        lowerCaseMajor.includes('computer') ||  
                        lowerCaseMajor.includes('ordinateurs') || 
                        lowerCaseMajor.includes('ordinateur') || 
                        lowerCaseMajor.includes('software') || 
                        lowerCaseMajor.includes('communication') || 
                        lowerCaseMajor.includes('telecommunication') || 
                        lowerCaseMajor.includes('telecommunications') || 
                        lowerCaseMajor.includes('télécommunication') || 
                        lowerCaseMajor.includes('télécommunications') || 
                        lowerCaseMajor.includes('télécome') || 
                        lowerCaseMajor.includes('telecome') || 
                        lowerCaseMajor.includes('logiciel')  || 
                        lowerCaseMajor.includes('informatique') || 
                        lowerCaseMajor.includes('communications')
                    ) {
                        edu.major = 'Computer and Communication Engineering';
                    } else if (
                        lowerCaseMajor.includes('chemical') || 
                        lowerCaseMajor.includes('pétrochimique') || 
                        lowerCaseMajor.includes('pétro') || 
                        lowerCaseMajor.includes('petroleum') || 
                        lowerCaseMajor.includes('petrochemical') || 
                        lowerCaseMajor.includes('chimie') || 
                        lowerCaseMajor.includes('petrole') || 
                        lowerCaseMajor.includes('chimique')
                    ) {
                        edu.major = 'Chemical Engineering';
                    } else if (
                        lowerCaseMajor.includes('civil')  || 
                        lowerCaseMajor.includes('construction')
                    ) {
                        edu.major = 'Civil Engineering';
                    } else if (
                        lowerCaseMajor.includes('electrical') || 
                        lowerCaseMajor.includes('electrique') || 
                        lowerCaseMajor.includes('électrique') || 
                        lowerCaseMajor.includes('electro')
                    ) {
                        edu.major = 'Electrical Engineering';
                    } else {
                        edu.major = 'Other';
                    }
                });
            }
            return profile;
        });
    }

    const filteredProfiles = filterMajors(profiles);

    fs.writeFile('./fetcher-extractor/ProfilesWithEducation_Major_Filtered.json', JSON.stringify(filteredProfiles, null, 4), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('JSON file has been updated with filtered majors.');
    });
});
