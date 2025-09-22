import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch("https://api.mistral.ai/v1/agents/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        agent_id: body.agent_id,
        messages: body.messages,
      }),
    });

    const data = await res.json();


    const reply = data?.choices?.[0]?.message?.content || "⚠️ No response";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ reply: "⚠️ Error connecting to agent." });
  }
}

