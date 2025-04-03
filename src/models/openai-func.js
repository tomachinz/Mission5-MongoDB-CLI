import { OpenAI } from "openai";

const openai = new OpenAI();

const tools = [{
    "type": "function",
    "name": "get_trademe",
    "description": "",
    "parameters": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "description": ""
            },
             "description": {
                "type": "string",
                "description": ""
            },
             "start_price": {
                "type": "string",
                "description": ""
            },
             "reserve_price": {
                "type": "string",
                "description": ""
            },
             "breadcrumb": {
                "type": "string",
                "description": "Marketplace / aby gea / Car seats"
            },
        },
        "required": [
            "location"
        ],
        "additionalProperties": false
    }
}];

const response = await openai.responses.create({
    model: "gpt-4o",
    input: [{ role: "user", content: "What is the weather like in Paris today?" }],
    tools,
});

console.log(response.output);