const webhook = "https://discord.com/api/webhooks/???";

const hexToDecimalColor = hex => {
	const hexColor = hex.replace("#", "");
	const r = parseInt(hexColor.substring(0, 2), 16);
	const g = parseInt(hexColor.substring(2, 4), 16);
	const b = parseInt(hexColor.substring(4, 6), 16);
	return r * 65536 + g * 256 + b;
};

export default {
    async fetch(request) {
		const headers = new Headers({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST',
			'Access-Control-Allow-Headers': 'Content-Type'
		})
		const reqUrl = new URL(request.url);
		const reqMethod = request.method;
		if (reqMethod === "OPTIONS") {
			return new Response(null, {
				headers,
			});
		}
		if (reqUrl.pathname !== "/contact") {
			return new Response("Not found", {
				status: 404,
				headers: headers,
			});
		}
		var body;
		try {
			body = await request.json();
		} catch (e) {
			return new Response("Bad request", {
				status: 400,
				headers: headers,
			});
		}
		if (!body.email || !body.message || !reqMethod === "POST") {
			return new Response("Bad request", {
				status: 400,
				headers: headers,
			});
		}
		await fetch(webhook, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				embeds: [
					{
						title: "New contact form submission!",
						color: hexToDecimalColor("#1f35b9"),
						fields: [
							{
								name: "Email",
								value: body.email,
							},
							{
								name: "Message",
								value: body.message.substring(0, 254),
							},
						],
						footer: {
							text: "Contact form at komodroid.com",
						},
					},
				],
			}),
		});
		return new Response(JSON.stringify({"status":"OK"}), {
			status: 200,
			headers: headers,
		});
    },
};