// Import sqlite3 and create/open the local resume database file.
import sqlite3 from "sqlite3"

export const db = new sqlite3.Database("./database/resume.db")

// Create all required tables automatically when the server starts.
// This allows the app to run correctly even when resume.db is not included in GitHub.
db.serialize(() => {

    // Stores job experience entries.
    db.run(`
        CREATE TABLE IF NOT EXISTS jobs (
            jobID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtJobTitle TEXT NOT NULL,
            txtCompany TEXT NOT NULL,
            txtStartDate TEXT,
            txtEndDate TEXT,
            txtLocation TEXT
        ) 
    `)
    
    // Stores responsibility/detail bullet points for each job.
    db.run(`
        CREATE TABLE IF NOT EXISTS job_details (
            detailID INTEGER PRIMARY KEY AUTOINCREMENT,
            jobID INTEGER NOT NULL,
            txtDetail TEXT NOT NULL,
            FOREIGN KEY (jobID) REFERENCES jobs(jobID)
        )
    `)

    // Stores user skills and optional skill categories.
    db.run(`
        CREATE TABLE IF NOT EXISTS skills (
            skillID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtSkillName TEXT NOT NULL,
            txtSkillCategory TEXT
        )
    `)

    // Stores certifications the user may include on a resume.
    db.run(`
        CREATE TABLE IF NOT EXISTS certifications (
            certificationID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtCertificationName TEXT NOT NULL,
            txtOrganization TEXT,
            txtDateEarned TEXT
        )
    `)
    
    // Stores awards the user may include on a resume.
    db.run(`
        CREATE TABLE IF NOT EXISTS awards (
            awardID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtAwardName TEXT NOT NULL,
            txtAwardOrganization TEXT,
            txtAwardDate TEXT
        )
    `)
    
    // Stores the user's resume header/contact information
    db.run(`
        CREATE TABLE IF NOT EXISTS profile (
            profileID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtFullName TEXT NOT NULL,
            txtEmail TEXT,
            txtPhone TEXT,
            txtLinkedIn TEXT,
            txtGitHub TEXT
        )
    `)
    
    // Stores the user's Gemini API key locally for resume detail suggestions.
    db.run(`
        CREATE TABLE IF NOT EXISTS api_settings (
            settingID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtGeminiAPIKey TEXT
        )
    `)
    
    // Stores education entries for the resume.
    db.run(`
        CREATE TABLE IF NOT EXISTS education (
            educationID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtSchoolName TEXT NOT NULL,
            txtDegree TEXT,
            txtGraduationDate TEXT,
            txtSchoolLocation TEXT
        )
    `)
})