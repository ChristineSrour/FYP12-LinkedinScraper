const fs = require('fs');

fs.readFile('./fetcher-extractor/ProfilesWithEducation_Major_Filtered.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let institutes = JSON.parse(data);

    institutes.forEach(institute => {
        if (institute.Education) {
            institute.Education.forEach(edu => {
                if (edu.instituteName.toLowerCase().includes('e.s.i.b') || 
                edu.instituteName.toLowerCase().includes('esib') || 
                edu.instituteName.toLowerCase().includes('ecole supérieure des ingénieurs de beyrouth')|| 
                edu.instituteName.toLowerCase().includes('université saint joseph') || 
                edu.instituteName.toLowerCase().includes("ecole supérieure d'ingénieurs de beirut")) {
                    // Replace the institute name
                    edu.instituteName = 'Saint Joseph University of Beirut';
                }
            });
        }
    });

    fs.writeFile('./fetcher-extractor/ProfilesWithEducation_InstitueName_Major_Filtered.json', JSON.stringify(institutes, null, 4), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('JSON file has been updated.');
    });
});
