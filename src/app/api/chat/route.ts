export async function POST(req: Request) {
  try {
    const { question, context } = await req.json();

    const WORKER_URL = "https://madaryar-ai.feloraalamian.workers.dev";

    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, context }),
    });

    if (!response.ok) {
      throw new Error("Worker error");
    }

    const data = await response.json();
    return Response.json({ answer: data.answer });
  } catch (error) {
    console.error("خطا:", error);
    return Response.json(
      { answer: "متاسفانه یه مشکلی پیش اومد. دوباره امتحان کن." },
      { status: 500 }
    );
  }
}