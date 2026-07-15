// Service to integrate AI suggestions for recipes
// Uses OpenAI API to generate recipe ideas for expiring items

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Generate recipe suggestions for an expiring food item
 */
const generateRecipeSuggestions = async (foodName, quantity, unit) => {
  try {
    const prompt = `Generate 2-3 creative and easy recipe ideas for ${quantity} ${unit} of ${foodName}. 
    For each recipe, provide:
    1. Recipe name
    2. Short description (1 sentence)
    3. List of 3-4 additional ingredients needed
    4. 3-4 simple cooking steps
    
    Format as JSON array with objects containing: title, description, ingredients, instructions`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful cooking assistant. Provide practical, easy-to-follow recipes.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.data.choices[0].message.content;
    
    // Parse JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return null;
  } catch (err) {
    console.error('OpenAI API error:', err);
    return null;
  }
};

/**
 * Generate donation impact message
 */
const generateDonationMessage = async (itemName, quantity, charity) => {
  try {
    const prompt = `Create a short, encouraging message (2-3 sentences) about donating ${quantity} of ${itemName} to ${charity}. 
    Make it positive and highlight the impact of the donation.`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 100
    });

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error('OpenAI API error:', err);
    return `Thank you for donating ${quantity} of ${itemName}!`;
  }
};

/**
 * Generate sustainability tips
 */
const generateSustainabilityTips = async () => {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Generate 3 practical sustainability tips for reducing food waste in the kitchen.'
        }
      ],
      max_tokens: 150
    });

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error('OpenAI API error:', err);
    return 'Keep an inventory of your food, plan meals ahead, and store items properly.';
  }
};

module.exports = {
  generateRecipeSuggestions,
  generateDonationMessage,
  generateSustainabilityTips
};
