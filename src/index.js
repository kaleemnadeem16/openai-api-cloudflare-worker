import OpenAI from 'openai';
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
}
export default {
	async fetch(request, env, ctx) {
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}
		const openai = new OpenAI({
			apiKey: env.OPENAI_API_KEY,
			baseURL: 'https://gateway.ai.cloudflare.com/v1/8c232f08ab338de346cf66f7809ce517/openiai-api-cloudflare-worker/openai'
		})
		try{
			const messages = await request.json()
			const chatCompletion = await openai.chat.completions.create({
				model: 'gpt-4.1-nano',
				messages,
			});
			const response =  chatCompletion.choices[0].message;
			return new Response(JSON.stringify(response), {headers: corsHeaders});
		}
		catch (e) {	
			return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
		}
		
		
	},
};
