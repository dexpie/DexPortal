/*
 * Spotify Refresh Token Generator
 * 
 * Usage:
 * 1. Open this file and paste your CLIENT_ID and CLIENT_SECRET below.
 * 2. Run: node scripts/get-spotify-token.js
 * 3. Follow the link, authorize, and copy the Refresh Token.
 */

const CLIENT_ID = "YOUR_CLIENT_ID_HERE";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET_HERE";
const REDIRECT_URI = "http://localhost:3000/callback";

// ---------------------------------------------------------

const http = require('http');
const querystring = require('querystring');
const url = require('url');

if (CLIENT_ID === "YOUR_CLIENT_ID_HERE") {
    console.error("❌ Please open this file and set your CLIENT_ID and CLIENT_SECRET first!");
    process.exit(1);
}

const SCOPES = 'user-read-currently-playing user-read-playback-state';

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/callback') {
        const code = parsedUrl.query.code;
        if (code) {
            try {
                const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
                    },
                    body: querystring.stringify({
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: REDIRECT_URI
                    })
                });

                const data = await tokenRes.json();

                if (data.error) {
                    res.end(`Error: ${JSON.stringify(data)}`);
                    return;
                }

                console.log("\n✅ SUCCESS! Here are your credentials for .env:\n");
                console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
                console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
                console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
                console.log("\n(Server closing...)");

                res.end("Success! Check your terminal for the Refresh Token. You can close this window.");
                server.close(() => process.exit(0));

            } catch (err) {
                res.end("Error fetching token: " + err.message);
            }
        } else {
            res.end("No code received.");
        }
    } else {
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    const authUrl = `https://accounts.spotify.com/authorize?` + querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPES,
        redirect_uri: REDIRECT_URI
    });

    console.log("Spotify Auth Helper Started!");
    console.log("1. Ensure your Spotify App (developer.spotify.com) has Redirect URI set to: " + REDIRECT_URI);
    console.log("2. Open this URL to authorize:");
    console.log("\n" + authUrl + "\n");
});
