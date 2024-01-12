// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

  const userSlug = req.query.inputValue;
  try {
    const response = await fetch(`https://api.github.com/users/${userSlug}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from GitHub API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}