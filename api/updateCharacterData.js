export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    PlayFabId,
    CharacterId,
    Data,
    TitleId,
    SecretKey
  } = req.body;

  try {
    const result = await fetch(`https://${TitleId}.playfabapi.com/Server/UpdateCharacterData`, {
      method: "POST",
      headers: {
        "X-SecretKey": SecretKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        PlayFabId,
        CharacterId,
        Data
      })
    });

    const json = await result.json();

    if (!result.ok) {
      return res.status(result.status).json({ error: "PlayFab API failed", details: json });
    }

    return res.status(200).json(json);
  } catch (error) {
    console.error("PlayFab call failed:", error);
    return res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
}
