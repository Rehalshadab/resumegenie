import { useState } from 'react'

const initialForm = {
  name: '', email: '', phone: '', city: '', state: '',
  linkedin: '', github: '', portfolio: '',
  degree: '', college: '', branch: '', graduationYear: '', cgpa: '',
  isFresher: true, company: '', compRole: '', compDuration: '', responsibilities: '',
  skills: '', projects: [{ name: '', desc: '' }], certifications: '',
  jobRole: '', jobDescription: '',   resumeTone: 'professional', customPrompt: '',
}

const stepTitles = ['Personal Info', 'Education', 'Experience & Skills', 'Job Target']

export default function ResumeForm({ onSubmit, loading }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const validateStep = () => {
    const errs = {}
    if (step === 0) {
      if (!form.name.trim()) errs.name = 'Name is required'
      if (!form.email.trim()) errs.email = 'Email is required'
      else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
      if (!form.phone.trim()) errs.phone = 'Phone is required'
      else if (!/^[6-9]\d{9}$/.test(form.phone)) errs.phone = 'Enter valid 10-digit number'
      if (!form.city.trim()) errs.city = 'City is required'
      if (!form.state.trim()) errs.state = 'State is required'
    } else if (step === 1) {
      if (!form.degree) errs.degree = 'Select your degree'
      if (!form.college.trim()) errs.college = 'College name is required'
      if (!form.graduationYear) errs.graduationYear = 'Select graduation year'
    } else if (step === 2) {
      if (!form.isFresher) {
        if (!form.company.trim()) errs.company = 'Company is required'
        if (!form.compRole.trim()) errs.compRole = 'Role is required'
      }
      if (!form.skills.trim()) errs.skills = 'Enter at least one skill'
    } else if (step === 3) {
      if (!form.jobRole.trim()) errs.jobRole = 'Job role is required'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const nextStep = () => { if (validateStep()) setStep(s => Math.min(s + 1, 3)) }
  const prevStep = () => { setStep(s => Math.max(s - 1, 0)); setErrors({}) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) { nextStep(); return }
    if (validateStep()) {
      const payload = {
        ...form,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        projects: form.projects.filter(p => p.name.trim()),
      }
      onSubmit(payload)
    }
  }

  const addProject = () => setForm(prev => ({ ...prev, projects: [...prev.projects, { name: '', desc: '' }] }))
  const updateProject = (idx, key, val) => {
    const updated = [...form.projects]
    updated[idx] = { ...updated[idx], [key]: val }
    setForm(prev => ({ ...prev, projects: updated }))
  }
  const removeProject = (idx) => {
    if (form.projects.length > 1) setForm(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== idx) }))
  }

  const input = (key, placeholder, type = 'text', opts = {}) => (
    <div className="space-y-1">
      {opts.label && <label className="text-sm font-medium text-gray-700">{opts.label}</label>}
      {opts.select ? (
        <select value={form[key]} onChange={e => update(key, e.target.value)} className="input-field">
          <option value="">{placeholder}</option>
          {opts.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} value={form[key]} onChange={e => update(key, e.target.value)}
          placeholder={placeholder} className="input-field" />
      )}
      {errors[key] && <p className="text-red-500 text-xs">{errors[key]}</p>}
    </div>
  )

  const textarea = (key, placeholder) => (
    <div className="space-y-1">
      <textarea value={form[key]} onChange={e => update(key, e.target.value)}
        placeholder={placeholder} className="input-field min-h-[100px]" />
      {errors[key] && <p className="text-red-500 text-xs">{errors[key]}</p>}
    </div>
  )

  const progressPct = ((step + 1) / 4) * 100

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {stepTitles.map((t, i) => (
            <span key={i} className={`text-xs font-medium ${i <= step ? 'text-primary-600' : 'text-gray-400'} hidden sm:inline`}>
              {t}
            </span>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-sm text-gray-500 mt-2">Step {step + 1} of 4</p>
      </div>

      {/* Step 1: Personal Info */}
      {step === 0 && (
        <div className="space-y-4 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {input('name', 'Full Name', 'text', { label: 'Full Name *' })}
            {input('email', 'Email Address', 'email', { label: 'Email Address *' })}
            {input('phone', 'Phone Number', 'tel', { label: 'Phone Number *' })}
            {input('city', 'City', 'text', { label: 'City *' })}
            {input('state', 'State', 'text', { label: 'State *' })}
            {input('linkedin', 'LinkedIn URL (optional)', 'url', { label: 'LinkedIn URL' })}
            {input('github', 'GitHub URL (optional)', 'url', { label: 'GitHub URL' })}
            {input('portfolio', 'Portfolio URL (optional)', 'url', { label: 'Portfolio URL' })}
          </div>
        </div>
      )}

      {/* Step 2: Education */}
      {step === 1 && (
        <div className="space-y-4 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Degree *</label>
              <select value={form.degree} onChange={e => update('degree', e.target.value)} className="input-field">
                <option value="">Select Degree</option>
                {['B.Tech', 'BCA', 'MCA', 'MBA', 'B.Sc', 'B.Com', 'Other'].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {errors.degree && <p className="text-red-500 text-xs">{errors.degree}</p>}
            </div>
            {input('college', 'College/University Name', 'text', { label: 'College/University Name *' })}
            {input('branch', 'Branch/Specialization', 'text', { label: 'Branch/Specialization' })}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Year of Graduation *</label>
              <select value={form.graduationYear} onChange={e => update('graduationYear', e.target.value)} className="input-field">
                <option value="">Select Year</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 4 + i).map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {errors.graduationYear && <p className="text-red-500 text-xs">{errors.graduationYear}</p>}
            </div>
            {input('cgpa', 'Percentage / CGPA', 'text', { label: 'Percentage / CGPA' })}
          </div>
        </div>
      )}

      {/* Step 3: Experience & Skills */}
      {step === 2 && (
        <div className="space-y-4 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience & Skills</h2>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Are you a fresher?</span>
            <button type="button" onClick={() => update('isFresher', true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${form.isFresher ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>Yes</button>
            <button type="button" onClick={() => update('isFresher', false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!form.isFresher ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}>No</button>
          </div>

          {!form.isFresher && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
              {input('company', 'Company Name', 'text', { label: 'Company Name *' })}
              {input('compRole', 'Your Role', 'text', { label: 'Your Role *' })}
              {input('compDuration', 'Duration (e.g. Jan 2024 - Present)', 'text', { label: 'Duration' })}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Key Responsibilities</label>
                {textarea('responsibilities', 'Describe your responsibilities and achievements...')}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Skills * (comma separated)</label>
            {input('skills', 'e.g. JavaScript, Python, React, SQL')}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Projects</label>
              <button type="button" onClick={addProject} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                + Add Project
              </button>
            </div>
            {form.projects.map((proj, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">Project {idx + 1}</span>
                  {form.projects.length > 1 && (
                    <button type="button" onClick={() => removeProject(idx)} className="text-red-500 text-xs hover:text-red-600">Remove</button>
                  )}
                </div>
                <input type="text" value={proj.name} onChange={e => updateProject(idx, 'name', e.target.value)}
                  placeholder="Project Name" className="input-field" />
                <textarea value={proj.desc} onChange={e => updateProject(idx, 'desc', e.target.value)}
                  placeholder="Brief description, technologies used..." className="input-field min-h-[60px]" />
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Certifications (optional)</label>
            {textarea('certifications', 'e.g. AWS Certified, Google Analytics, etc.')}
          </div>
        </div>
      )}

      {/* Step 4: Job Target */}
      {step === 3 && (
        <div className="space-y-4 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Target</h2>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Job Role Applying For *</label>
            {input('jobRole', 'e.g. Software Engineer, Data Analyst, Business Analyst')}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Job Description (paste JD for better AI matching) — optional</label>
            {textarea('jobDescription', 'Paste the job description here to get better AI matching...')}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Resume Tone</label>
            <div className="flex flex-wrap gap-3">
              {['professional', 'creative', 'fresher-friendly'].map(tone => (
                <label key={tone} className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all border-2 ${
                  form.resumeTone === tone
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}>
                  <input type="radio" name="resumeTone" value={tone} checked={form.resumeTone === tone}
                    onChange={e => update('resumeTone', e.target.value)} className="sr-only" />
                  {tone.charAt(0).toUpperCase() + tone.slice(1)}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Custom Prompt (optional)</label>
            <textarea value={form.customPrompt} onChange={e => update('customPrompt', e.target.value)}
              placeholder="e.g. Emphasize my leadership skills, highlight my open-source contributions, mention I'm a quick learner..."
              className="input-field min-h-[80px]" />
            <p className="text-xs text-gray-400">Add any specific instructions for the resume generation.</p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        {step > 0 ? (
          <button type="button" onClick={prevStep} className="btn-secondary text-sm px-6 py-2.5">
            ← Back
          </button>
        ) : <div />}
        <button type="submit" disabled={loading}
          className="btn-primary text-sm px-8 py-2.5 min-h-[44px]">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="loading-dot" /><span className="loading-dot" /><span className="loading-dot" />
              Generating...
            </span>
          ) : step === 3 ? 'Generate Resume →' : 'Next →'}
        </button>
      </div>
    </form>
  )
}
