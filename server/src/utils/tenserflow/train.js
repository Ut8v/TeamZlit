/*temporary fix for tensorflow*/
require('dotenv').config();

if (process.env.ENVIRONMENT !== 'production') {
const os = require('os');
const platform = os.platform();
let tf;
if (platform === 'darwin') {
    console.log("Running on macOS");
    tf = require('@tensorflow/tfjs-node');
} else if (platform === 'win32') {
    console.log("Running on Windows");
    tf = require('@tensorflow/tfjs');
} else {
    throw new Error("Unsupported OS");
}
}

if (process.env.ENVIRONMENT === 'production') {
    tf = require('@tensorflow/tfjs-node');
}

const fs = require('fs');
const path = require('path');

const currentDir = __dirname;
const defaultModelPath = path.join(currentDir, 'saved_model');

async function loadModel() {
    const model = await tf.loadLayersModel(`file://${defaultModelPath}/model.json`);
    const allSkills = JSON.parse(fs.readFileSync(`${defaultModelPath}/skills.json`, 'utf8'));
    console.log(`Model and skills loaded from ${defaultModelPath}`);
    return { model, allSkills };
}

async function predictMatch(model, user, team, allSkills) {
    const userVec = allSkills.map(skill => (user.includes(skill) ? 1 : 0));
    const teamVec = allSkills.map(skill => (team.includes(skill) ? 1 : 0));
    const input = tf.tensor2d([[...userVec, ...teamVec]]);
    const prediction = model.predict(input);
    return prediction.dataSync()[0]; 
}

async function matchMaker({ userData, teamData }) {
    let model;
    let allSkills;

    if (fs.existsSync(`${defaultModelPath}/model.json`)) {
        console.log("Loading existing model...");
        const loadedData = await loadModel();
        model = loadedData.model;
        allSkills = loadedData.allSkills;
    } 

    const match = await predictMatch(model, userData, teamData, allSkills);
    return match;
}

module.exports = matchMaker;

