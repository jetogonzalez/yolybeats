const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const code = event.queryStringParameters.code;

  if (!code) {
    return {
      statusCode: 400,
      body: "Missing authorization code"
    };
  }

  const client_id = "5ebacc33660540008dcdaded2f82a2cd";
  const client_secret = "4de4ee9270f468d9b8c4f158f66e497d"; // ⚠️ Reemplazar si es rotado

  const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": \`Basic \${auth}\`
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://yolibeats.netlify.app/.netlify/functions/callback"
    })
  });

  const data = await response.json();

  if (data.access_token) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in
      })
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify(data)
    };
  }
};
