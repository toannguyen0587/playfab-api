export default async function handler(req, res) {
  const {
    PlayFabId,
    CharacterId,
    Data,
    TitleId,
    SecretKey
  } = req.body;

  const result = await fetch(
    `https://${TitleId}.playfabapi.com/Server/UpdateCharacterData`,
    {
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
    }
  );

  const json = await result.json();
  res.status(200).json(json);
}
