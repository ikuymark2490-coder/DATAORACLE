// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.groq}`, // ดึง Key จากระบบหลังบ้าน Vercel
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body) // ส่งข้อมูลที่รับมาจาก HTML ไปให้ Groq ต่อ
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Groq' });
  }
}
