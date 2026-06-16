import { Router } from "express";

const router = Router();

function generateResume(data) {
  const skills = Array.isArray(data.skills) ? data.skills : (data.skills || "").split(",").map(s => s.trim()).filter(Boolean);
  const education = data.education || {};
  const projects = data.projects || [];

  const summary = `${data.name || "Candidate"} is a motivated ${data.jobRole || "professional"}${education.degree ? " with a " + education.degree : ""}${education.branch ? " in " + education.branch : ""} seeking to leverage technical skills and academic background in a challenging role. ${skills.length > 0 ? "Proficient in " + skills.slice(0, 4).join(", ") + "." : ""} A quick learner with strong problem-solving abilities and a passion for building impactful solutions.`;

  const eduStr = education.degree
    ? `${education.degree}${education.branch ? " in " + education.branch : ""} — ${education.college || "University"}${education.graduationYear ? " (" + education.graduationYear + ")" : ""}${education.cgpa ? " | CGPA/Percentage: " + education.cgpa : ""}`
    : "Details not provided";

  const skillsStr = skills.length > 0 ? skills.join(", ") : "Not specified";

  const experienceStr = data.isFresher === false && data.company
    ? `${data.compRole || "Role"} at ${data.company}${data.compDuration ? " (" + data.compDuration + ")" : ""}\n${data.responsibilities || ""}`
    : null;

  const projectsStr = projects.filter(p => p.name).map(p =>
    `${p.name}${p.desc ? ": " + p.desc : ""}`
  );

  const certsStr = data.certifications || null;

  return {
    summary: `${summary}`,
    education: `${eduStr}`,
    skills: `${skillsStr}`,
    experience: experienceStr || projectsStr.length > 0
      ? (experienceStr ? [experienceStr] : []).concat(projectsStr).join("\n\n")
      : "Fresher — eager to contribute and grow in a professional environment.",
    certifications: certsStr || "Not specified",
  };
}

function generateCoverLetter(data) {
  const name = data.name || "Candidate";
  const role = data.jobRole || "the position";
  const skills = Array.isArray(data.skills) ? data.skills : (data.skills || "").split(",").map(s => s.trim()).filter(Boolean);
  const education = data.education || {};

  const para1 = `Dear Hiring Manager,\n\nI am writing to express my strong interest in the ${role} position. As a ${education.degree || "qualified professional"}${education.branch ? " in " + education.branch : ""}${education.college ? " from " + education.college : ""}, I am confident that my skills and enthusiasm make me an ideal candidate for this role at your esteemed organization.`;

  const para2 = `Throughout my academic and professional journey, I have developed strong expertise in ${skills.slice(0, 4).join(", ") || "relevant technologies and practices"}. I am passionate about applying my knowledge to solve real-world problems and contribute meaningfully to your team's success. ${data.isFresher === false && data.company ? "My experience at " + data.company + " has equipped me with practical skills in " + (data.compRole || "the field") + "." : "I am eager to start my professional career and bring fresh perspectives to your organization."}`;

  const para3 = `I am excited about the opportunity to contribute to your company's growth while continuing to learn and develop as a professional. Thank you for considering my application. I look forward to the possibility of discussing how I can add value to your team.\n\nBest regards,\n${name}`;

  return `${para1}\n\n${para2}\n\n${para3}`;
}

router.post("/generate", async (req, res) => {
  try {
    const formData = req.body;
    const { action = "both" } = req.query;

    let resume = null;
    let coverLetter = null;

    if (action === "resume" || action === "both") {
      resume = generateResume(formData);
    }

    if (action === "coverletter" || action === "both") {
      coverLetter = generateCoverLetter(formData);
    }

    res.json({
      success: true,
      resume,
      coverLetter,
    });
  } catch (error) {
    console.error("Generate error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to generate resume. Please try again.",
    });
  }
});

export { router as generateRouter };
