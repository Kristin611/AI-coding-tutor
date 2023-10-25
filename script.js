//dependencies
const inquirer = require('inquirer');
const { OpenAI } = require('langchain/llms/openai');
require('dotenv').config();
//console.log(process.env.apiKey)
const { PromptTemplate } = require('langchain/prompts');

//creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({
    openAIApiKey: process.env.apiKey,
    temperature: 0,
    model: 'gpt-3.5-turbo'
});
console.log({model})

//uses the instantiated OpenAI wrapper, model, and makes a call based on input from inquirer
const promptFunc = async (input) => { //using input parameter to capture user question. then will need to create an init function that when called will execute an inquirer prompt that will ask the user for a question about a coding concept. 
    try {
        const res = await model.call(input);
        console.log(res);
    }
    catch (err) {
        console.error(err);
    }
};

//promptFunc(); we are able to remove the promptFunc() from the global context bc we're now calling it inside the init() function. 

//initialization function that uses inquirer to prompt the user and returns a promise. It takes the user input and passes it through the call method
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
//calls the initialization function and starts the script
init();

//instantiation of a new object called "prompt" using the "PromptTemplate" class
    const prompt = new PromptTemplate({
        template: "You are a javascript expert and will answer the user's coding questions as thoroughly as possible", //the template allows us to set the stage of our application by giving the AI context about how it should behave and respond to user questions. 
        inputVariables: ['question'], //allows us to inject user input directly into our template so wtvr question the user asks will always be within the confines of the overall context that the developer sets.
    });

 //using the .format() method on our instantiated prompt object to pass in user input to our template. The key of the object being passed into the prompt method mathces the variable name, question, and value is the user input captured from inquirer.    
    const promptInput = await prompt.format({
       question: input
    });