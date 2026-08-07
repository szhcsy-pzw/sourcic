// Vercel Serverless Function: AI 找料代理
// 部署到 Vercel 后，前端调用 https://your-vercel-app.vercel.app/api/ai-search
// 服务器持有 DeepSeek API Key，访客零配置

const AI_ENDPOINT = process.env.AI_ENDPOINT || 'https://api.deepseek.com/v1/chat/completions';
const AI_MODEL    = process.env.AI_MODEL    || 'deepseek-chat';
const AI_KEY      = process.env.AI_KEY      || process.env.DEEPSEEK_API_KEY || '';

const SYSTEM_PROMPT = `你是电子元器件采购助手。把用户自然语言找料需求解析为 JSON。
字段说明：
- mpn: 型号片段或空字符串（如 "STM32F103"）
- brand: 原厂英文名或空（如 "STMicroelectronics"）
- cat: 中文大类或空（如 "集成电路 IC"、"被动元件"、"分立半导体"、"电源管理"、"射频/无线"、"光电器件"、"连接器"、"传感器"、"晶体与振荡器"）
- pkg: 封装或空（如 "0603"、"QFP64"、"SOT-23"）
- rohs: 1表示要求环保, 0表示不要求, -1表示未知
- alt: true表示找国产替代, false表示不需要
- advice: 简短中文采购建议（1-2句话）
只输出 JSON，不要解释，不要 markdown 代码块。`;

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body || {};

  if (!text || !text.trim()) {
    return res.status(400).json({ error: '缺少 text 参数' });
  }

  // 没有 API Key，返回错误
  if (!AI_KEY) {
    return res.status(500).json({ error: '服务器未配置 AI_KEY' });
  }

  try {
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_KEY}`
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text }
        ],
        temperature: 0.1,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('DeepSeek API error:', response.status, errText);
      return res.status(502).json({ error: 'AI 服务异常', detail: response.status });
    }

    const data = await response.json();
    let content = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '{}';

    // 清理 markdown 代码块
    content = content.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      // 如果 JSON 解析失败，尝试提取花括号内容
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          parsed = JSON.parse(match[0]);
        } catch (e2) {
          parsed = { mpn: '', brand: '', cat: '', pkg: '', rohs: -1, alt: false, advice: '解析失败，请尝试更具体的描述' };
        }
      } else {
        parsed = { mpn: '', brand: '', cat: '', pkg: '', rohs: -1, alt: false, advice: '解析失败，请尝试更具体的描述' };
      }
    }

    return res.status(200).json({
      mode: 'llm',
      filters: {
        mpn: parsed.mpn || '',
        brand_code: parsed.brand || '',
        cat: parsed.cat || '',
        pkg: parsed.pkg || '',
        rohs: parsed.rohs ?? -1,
        alt: parsed.alt || false
      },
      advice: parsed.advice || ''
    });

  } catch (err) {
    console.error('AI search error:', err);
    return res.status(500).json({ error: '服务器内部错误', detail: err.message });
  }
}
