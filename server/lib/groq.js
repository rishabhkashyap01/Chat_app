import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const classifyMessageWithGroq = async (text) => {
    if (!text || text.trim() === "") {
        return 'SAFE';
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a chat content moderator. Your task is to classify a user's message as either 'SAFE' or 'OFFENSIVE'. 
                    An 'OFFENSIVE' message is one that is not suitable for children, including abusive language, sexually themed content, or harassment. 
                    All other messages are 'SAFE'. 
                    Respond with only the single word 'SAFE' or 'OFFENSIVE'.`
                },
                {
                    role: "user",
                    content: `Classify this message: "${text}"`
                }
            ],
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            temperature: 0,
            max_tokens: 5,
        });

        const classification = chatCompletion.choices[0]?.message?.content.trim().toUpperCase() || 'SAFE';

        // Update the validation array
        if (['SAFE', 'OFFENSIVE'].includes(classification)) {
            return classification;
        }
        
        return 'SAFE';

    } catch (error) {
        console.error("Error classifying message with Groq:", error);
        return 'SAFE';
    }
};