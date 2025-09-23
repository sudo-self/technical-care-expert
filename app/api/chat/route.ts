import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.agent_id || !body.messages) {
      return NextResponse.json({ reply: "⚠️ Missing agent_id or messages." });
    }

 
    const systemMessage = {
      role: "system",
      content: "You are a technical support expert for Internet, Fiber, Voice, and IPTV. Answer clearly, politely, and provide step-by-step instructions."
    };
    const messagesWithSystem = [systemMessage, ...body.messages];

    const res = await fetch("https://api.mistral.ai/v1/agents/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        agent_id: body.agent_id,
        messages: messagesWithSystem,
      }),
    });

    const data = await res.json();
    console.log("Mistral API raw response:", JSON.stringify(data, null, 2));

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      console.warn("No message content found in response");
      return NextResponse.json({ reply: "⚠️ No response from agent. Check logs." });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Error in /api/chat:", err);
    return NextResponse.json({ reply: "⚠️ Error connecting to agent." });
  }
}


