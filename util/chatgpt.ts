
async function askChatGPT(prompt: string): Promise<string>{

  return await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {Authorization: `Bearer ${process.env.OPENAI_TOKEN}`, "Content-Type": "application/json"},
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": prompt}]
    })
  })
    .then(response => response.json())
    .then(response => response.choices[0].message.content)


}

function trimString(value: string){
  const trimable = "\" .\n";
  const start = value.split("").findIndex(c => trimable.indexOf(c) === -1);
  const end = value.split("").reverse().findIndex(c => trimable.indexOf(c) === -1);
  return value.substring(start, value.length - end);
}

export async function getInstagramTitle(description: string){
  const value = await askChatGPT(description+"\n\nSchreibe einen Artikel für eine christliche Umweltbewegung aus den oberen Informationen. Formuliere den Inhalt aus dieser Perspektive um. Formatiere den Text als Markdown und verwende Absätze und Zwischenüberschriften. Antworte im JSON Format mit folgenden Feldern: title, content (formatter als Markdown)");
  return trimString(value);
}