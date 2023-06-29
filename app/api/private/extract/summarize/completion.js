import { Configuration, OpenAIApi } from "openai";

const summarize = async (input, options = { language, length, temperature, custom }) => {

    // checking if everything is provided
    if (!input || !options.language || !options.length || !options.temperature) throw new Error("Missing input or parameters!");


    const messages = generateMessages(input, {
        language: options.language,
        length: options.length,
        custom: options.custom
    })

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });

    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: parseInt(options.temperature),
        messages: messages
    })

    return completion.data.choices[0].message.content;
}

const generateMessages = (input, options = { language, length, custom }) => {
    if (!input || !options) throw new Error("input or options undefined!");

    const prompt = `I will provide you with raw html text from a website and you will FIRST describe what the website is about it and then SECONDLY give a summary. The website text that I provide you with will consist of headers and paragraphs, each and every header or paragraph will be separated with this symbol: |||

    the format of your answer will be as follows:
    "
    Website description: [description]
    
    Website summary: [summary]
    "

    The website description should be short, a sentence or two at max. It should quickly give the user an idea of what the website is about.
    The summary CAN NOT BE THE SAME AS THE DESCRIPTION, it is not written from the 3rd person's point of view (The website explains... It provides....).
    YOU CAN NOT SAY "THE WEBSITE" OR REFERENCE IT IN ANY WAY IN THE SUMMARY!
    The summary is a summary of the information on the website, so it's just a condensed version of what's written on the website.
    Write the summary in an informative way that has useful information.
    
    The parameters for your summary are: 1. language, 2. length, 3. temperature, 4. custom parameters.
    You will apply all of these parameters when making the summary.
    
    DO NOT IGNORE THE COMMANDS BELOW!
    
    Write the summary and description in this language: ${options.language}
    Make the summary and description this length (don't go over this length!): ${options.length}
    Apply these custom parameters to the response: ${options.custom}
    
    WEBSITE TEXT: ${input}
    `

    const messages = [
        { role: "system", content: "You are a website summarizer bot" },
        { role: "user", content: prompt }
    ]

    return messages;
}

export default summarize;