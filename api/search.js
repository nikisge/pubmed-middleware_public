export default async function handler(req, res) {
  const term = req.query.term;
  const apiKey = process.env.PUBMED_API_KEY;
  const email = process.env.PUBMED_EMAIL;

  console.log("API Key:", apiKey);
  console.log("Email:", email);

  if (!term) {
    return res.status(400).json({ error: 'Missing search term in query.' });
  }

  if (!apiKey || !email) {
    return res.status(500).json({ error: 'API Key oder Email fehlen in den Umgebungsvariablen.' });
  }

  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmode=json&email=${email}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Fehler beim Abruf:", error);
    res.status(500).json({ error: 'Fehler beim Abrufen von PubMed-Daten.' });
  }
}
