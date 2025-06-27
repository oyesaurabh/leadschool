import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, apikey } = body;

    if (!imageBase64 || !apikey) {
      return NextResponse.json(
        { success: false, error: "Missing data" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: apikey });

    let result: any = {};
    try {
      result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBase64,
            },
          },
          {
            text: `Can you tell me Title, Author, Short Summary ,Grade Level (return null if not), Subject (return null if not), Series (return null if not) in a JSON format.`,
          },
        ],
      });
    } catch (error) {
      throw new Error(
        "Failed: Please check your API key or try after few time."
      );
    }

    const rawText = result.text || "";
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let json: any = {};
    try {
      json = JSON.parse(cleaned);
    } catch (e) {
      return NextResponse.json(
        { success: false, error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      details: {
        title: json.Title || "",
        author: json.Author || "",
        grade: json["Grade Level"] || "",
        subject: json.Subject || "",
        series: json.Series || "",
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
