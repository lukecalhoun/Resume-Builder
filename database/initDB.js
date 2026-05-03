import sqlite3 from "sqlite3"

const db = new sqlite3.Database("./database/resume.db")

db.serialize(() => {
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
    
    db.run(`
        CREATE TABLE IF NOT EXISTS job_details (
            detailID INTEGER PRIMARY KEY AUTOINCREMENT,
            jobID INTEGER NOT NULL,
            txtDetail TEXT NOT NULL,
            FOREIGN KEY (jobID) REFERENCES jobs(jobID)
        )
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS skills (
            skillID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtSkillName TEXT NOT NULL,
            txtSkillCategory TEXT
        )
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS certifications (
            certificationID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtCertificationName TEXT NOT NULL,
            txtOrganization TEXT,
            txtDateEarned TEXT
        )
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS awards (
            awardID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtAwardName TEXT NOT NULL,
            txtAwardOrganization TEXT,
            txtAwardDate TEXT
        )
    `)

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

    db.run(`
        CREATE TABLE IF NOT EXISTS api_settings (
            settingID INTEGER PRIMARY KEY AUTOINCREMENT,
            txtGeminiAPIKey
        )
    `)
})
db.close()