const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'data'); // replace 'json_files' with your directory name
let allCoordinates = [];

// This function transforms the data to an array of [lat, long] pairs
function extractCoordinates(dataArray) {
    return dataArray.map(item => [item.lat, item.long]);
}

// Read all files from the directory
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.error('Unable to read directory:', err);
    }

    let jsonFiles = files.filter(file => file.endsWith('.json'));

    let filesProcessed = 0;

    jsonFiles.forEach(file => {
        fs.readFile(path.join(directoryPath, file), 'utf8', (readErr, data) => {
            if (readErr) {
                console.error(`Error reading the file ${file}:`, readErr);
                checkIfAllFilesProcessed(++filesProcessed, jsonFiles.length);
                return;
            }

            try {
                const jsonData = JSON.parse(data);
                const coordinates = extractCoordinates(jsonData.data.searchDetections.items);
                allCoordinates = allCoordinates.concat(coordinates);
                checkIfAllFilesProcessed(++filesProcessed, jsonFiles.length);
            } catch (parseError) {
                console.error(`Error parsing JSON in file ${file}:`, parseError);
                checkIfAllFilesProcessed(++filesProcessed, jsonFiles.length);
            }
        });
    });
});

function checkIfAllFilesProcessed(processed, total) {
    if (processed === total) {
        // All files have been processed, write the results to a file
        fs.writeFile('results.json', JSON.stringify(allCoordinates, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
            } else {
                console.log('Coordinates have been written to results.json');
            }
        });
    }
}
