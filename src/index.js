import OpenAI from 'openai';

export default {
	async fetch(request, env, ctx) {
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
		})
		try{
			const response = await openai.chat.completions.create({
				model: 'gpt-4.1-nano',
				messages: [
					{ role: 'user', content: 'Hello!' },
				],
			});
			return new Response(JSON.stringify(response));
		}
		catch (error) {	
			console.error('Error:', error);
			return new Response('Error: ' + error.message, { status: 500 });
		}
		
		
	},
};
