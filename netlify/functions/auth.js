exports.handler = async function(event, context) {
  const client_id = "5ebacc33660540008dcdaded2f82a2cd";
  const redirect_uri = "https://yolibeats.netlify.app/.netlify/functions/callback";
  const scope = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state"
  ].join(" ");

  const auth_url = \`https://accounts.spotify.com/authorize?response_type=code&client_id=\${client_id}&scope=\${encodeURIComponent(scope)}&redirect_uri=\${encodeURIComponent(redirect_uri)}\`;

  return {
    statusCode: 302,
    headers: {
      Location: auth_url
    }
  };
};
