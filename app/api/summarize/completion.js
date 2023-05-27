import { Configuration, OpenAIApi } from "openai";

const summarize = async (input, options = {language, length, temperature, custom}) => {

    // checking if everything is provided
    if (!input || !options.language || !options.length || !options.temperature) throw new Error("Missing input or parameters!");


    const prompt = generatePrompt( input, {
        language:  options.language,
        length:  options.length,
        custom:  options.custom
    })

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        temperature: 0,
        max_tokens: 7,
    })

    const completion_text = completion.data.choices[0].text;

    return completion_text;
}

const generatePrompt = (input, options = {language, length, custom}) => {
    if (!input || !options) throw new Error("input or options undefined!");
    if (input.length > 1550) throw new Error("Input text is too long!");
    
    const prompt = `You are a website summarizer bot. I will provide you with raw html text from a website and you will FIRST describe what the website is about it and then SECONDLY give a summary. The website text that I provide you with will consist of headers and paragraphs, each and every header or paragraph will be separated with this symbol: |||

    the format of your answer will be as follows:
    "
    Website description: [description]
    
    Website summary: [summary]
    "
    
    The parameters for your summary are: 1. language, 2. length, 3. temperature, 4. custom parameters.
    You will apply all of these parameters when making the summary.
    
    DO NOT IGNORE THE COMMANDS BELOW!
    
    Write the summary and description in this language: ${options.language}
    Make the summary and description this length (don't go over this length!): ${options.length}
    Custom Parameters: ${options.custom}
    
    WEBSITE TEXT: ${input}
    `

    return prompt;

}

export default summarize;