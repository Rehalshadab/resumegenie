import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

async function callGemini(systemPrompt, userPrompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(systemPrompt + "\n\n" + userPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error.message, error.status, JSON.stringify(error));
    throw new Error("AI generation failed: " + (error.message || "Unknown error"));
  }
}

router.post("/generate", async (req, res) => {
  try {
    const formData = req.body;
    const { action = "both" } = req.query;

    const candidateJSON = JSON.stringify(formData, null, 2);

    let resumeText = "";
    let coverLetter = "";

    if (action === "resume" || action === "both") {
      resumeText = await callGemini(
        `You are a professional resume writer specializing in the Indian job market. Create an ATS-friendly resume for the following candidate. Format it cleanly with these sections: Summary, Education, Skills, Experience/Projects, Certifications. Make it compelling, use strong action verbs, quantify achievements where possible. Return ONLY valid JSON with sections as keys (summary, education, skills, experience, certifications). Do not wrap in markdown code blocks.`,
        `Candidate Data:\n${candidateJSON}\n\nJob Role: ${formData.jobRole || "Not specified"}\nJob Description: ${formData.jobDescription || "Not provided"}\nResume Tone: ${formData.resumeTone || "Professional"}`
      );
    }

    if (action === "coverletter" || action === "both") {
      coverLetter = await callGemini(
        `You are an expert cover letter writer for the Indian job market. Write a professional, personalized cover letter for this candidate. Tone: confident but humble, suitable for Indian corporate culture. Length: 3 paragraphs. Return plain text only, no markdown.`,
        `Candidate: ${formData.name || "Candidate"}\nJob Role: ${formData.jobRole || "Software Engineer"}\nSkills: ${formData.skills || "Not specified"}\nExperience: ${formData.experience || "Fresher"}\nEducation: ${JSON.stringify(formData.education || {})}`
      );
    }

    let parsedResume = null;
    if (resumeText) {
      try {
        const cleaned = resumeText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
        parsedResume = JSON.parse(cleaned);
      } catch {
        parsedResume = { raw: resumeText };
      }
    }

    res.json({
      success: true,
      resume: parsedResume,
      coverLetter: coverLetter || null,
    });
  } catch (error) {
    console.error("Generate error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate resume. Please try again.",
    });
  }
});

export { router as generateRouter };
