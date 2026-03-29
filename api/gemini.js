export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  const { prompt } = req.body;
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 1200, responseMimeType: "application/json" }
      })
    }
  );
  const data = await geminiRes.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  res.status(200).json({ text });
}
