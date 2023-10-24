const inquirer = require('inquirer');
//const { openAI } = require('./node_modules/langchain/llms/openai.cjs');
const { OpenAI } = require('langchain/llms/openai');
require('dotenv').config();
//console.log(process.env.apiKey)

const model = new OpenAI({
    openAIApiKey: process.env.apiKey,
    temperature: 0,
    model: 'gpt-3.5-turbo'
});
console.log({model})

const promptFunc = async (input) => { //using input parameter to capture user question. then will need to create an init function that when called will execute an inquirer prompt that will ask the user for a question about a coding concept. 
    try {
        const res = await model.call(input);
        console.log(res);
    }
    catch (err) {
        console.error(err);
    }
};

promptFunc();

const init = () => {
    inquirer.prompt([
       {
        type: 'input',
        name: 'name',
        message: 'Ask a coding question:',
       }, 
    ]).then((inquirerResponse) => {
        promptFunc(inquirerResponse.name) //the inquirer.prompt() method returns a promise--so we will need to call the promptFunc() inside a subsequent .then() method.
    });
};

init();