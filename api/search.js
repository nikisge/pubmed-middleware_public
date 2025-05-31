export default async function handler(req, res) {
  const term = req.query.term;
  const apiKey = process.env.PUBMED_API_KEY;
  const email = process.env.PUBMED_EMAIL;

  const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmode=json&email=${email}&api_key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
