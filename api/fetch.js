export default async function handler(req, res) {
  const ids = req.query.id;
  const apiKey = process.env.PUBMED_API_KEY;
  const email = process.env.PUBMED_EMAIL;

  if (!ids) {
    return res.status(400).json({ error: 'ID(s) missing' });
  }

  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${encodeURIComponent(ids)}&retmode=xml&email=${email}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const text = await response.text(); // efetch gibt XML zurück

    res.status(200).send(text); // du kannst später auf JSON umstellen oder in N8n parsen
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', details: err.message });
  }
}