import express from "express"
import { db } from "./database/db.js"

const app = express()
const PORT = 8000

app.use(express.json())
app.use(express.static("public"))
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"))

app.post("/jobs", (req, res) => {
    const {txtJobTitle, txtCompany, txtStartDate, txtEndDate, txtLocation} = req.body

    const strQuery = `
        INSERT INTO jobs
        (txtJobTitle, txtCompany, txtStartDate, txtEndDate, txtLocation)
        VALUES (?, ?, ?, ?, ?)
    `

    db.run(strQuery, [txtJobTitle, txtCompany, txtStartDate, txtEndDate, txtLocation], function (err){
        if(err){
            return res.status(400).json({message: "Unable to add job due to " + err.message})
        }

        res.status(201).json({
            message: "Job added successfully!",
            jobID: this.lastID
        })
    })
})

app.get("/jobs", (req, res) => {

    const strQuery = `
        SELECT * FROM jobs
    `

    db.all(strQuery, [], (err, rows) => {

        if(err){
            return res.status(400).json({
                message: "Unable to retrieve jobs"
            })
        }

        res.json(rows)
    })
})

app.post("/job-details", (req, res) => {
    const {jobID, txtDetail} = req.body

    const strQuery = `
        INSERT INTO job_details
        (jobID, txtDetail)
        VALUES (?, ?)
    `

    db.run(strQuery, [jobID, txtDetail], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to add job detail due to " + err.message
            })
        }

        res.status(201).json({
            message: "Job detail added successfully",
            detailID: this.lastID
        })
    })
})

app.delete("/jobs/:jobID", (req, res) => {
    const jobID = req.params.jobID

    const strDeleteDetailsQuery = `
        DELETE FROM job_details
        WHERE jobID = ?
    `

    const strDeleteJobQuery = `
        DELETE FROM jobs
        WHERE jobID = ?
    `

    db.run(strDeleteDetailsQuery, [jobID], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to delete job details due to " + err.message
            })
        }

        db.run(strDeleteJobQuery, [jobID], function(err){
            if(err){
                return res.status(400).json({
                    message: "Unable to delete job due to " + err.message
                })
            }

            res.json({
                message: "Job deleted successfully"
            })
        })
    })
})

app.get("/job-details/:jobID", (req, res) => {
    const jobID = req.params.jobID

    const strQuery = `
        SELECT * FROM job_details
        WHERE jobID = ?
    `

    db.all(strQuery, [jobID], (err, rows) =>{
        if(err){
            return res.status(400).json({
                message: "Unable to retrieve job details"
            })
        }

        res.json(rows)
    })
})


app.post("/skills", (req, res) => {
    const {txtSkillName, txtSkillCategory} = req.body

    const strQuery = `
        INSERT INTO skills
        (txtSkillName, txtSkillCategory)
        VALUES (?,?)
    `

    db.run(strQuery, [txtSkillName, txtSkillCategory], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to add skill due to " + err.message
            })
        }

        res.status(201).json({
            message: "Skill added successfully!",
            skillID: this.lastID
        })
    })
})

app.delete("/job-details/:detailID", (req, res) => {
    const detailID = req.params.detailID

    const strQuery = `
        DELETE FROM job_details
        WHERE detailID = ?
    `

    db.run(strQuery, [detailID], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to delete job detail due to " + err.message
            })
        }

        res.json({
            message: "Job detail deleted successfully"
        })
    })
})

app.get("/skills", (req, res) => {
    const strQuery = `
        SELECT * FROM skills
    `

    db.all(strQuery, [], (err, rows) => {
        if(err){
            return res.status(400).json({

            })
        }
        
        res.json(rows)
    })
})

app.post("/certifications", (req, res) => {
    const {txtCertificationName, txtOrganization, txtDateEarned} = req.body

    const strQuery = `
        INSERT INTO certifications
        (txtCertificationName, txtOrganization, txtDateEarned)
        VALUES (?, ?, ?)
    `

    db.run(strQuery, [txtCertificationName, txtOrganization, txtDateEarned], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to add certification due to " + err.message
            })
        }

        res.status(201).json({
            message: "Certification added successfully",
            certificationID: this.lastID
        })
    })
})

app.get("/certifications", (req, res) => {
    const strQuery = `
        SELECT * FROM certifications
    `

    db.all(strQuery, [], (err, rows) => {
        if(err){
            return res.status(400).json({
                message: "Unable to retrieve certifications"
            })
        }

        res.json(rows)
    })
})

app.delete("/certifications/:certificationID", (req, res) => {
    const certificationID = req.params.certificationID

    const strQuery = `
        DELETE FROM certifications
        WHERE certificationID = ?
    `

    db.run(strQuery, [certificationID], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to delete certification due to " + err.message
            })
        }

        res.json({
            message: "Certification deleted successfully"
        })
    })
})

app.post("/awards", (req, res) => {
    const {txtAwardName, txtAwardOrganization, txtAwardDate} = req.body

    const strQuery = `
        INSERT INTO awards
        (txtAwardName, txtAwardOrganization, txtAwardDate)
        VALUES (?, ?, ?)
    `

    db.run(strQuery, [txtAwardName, txtAwardOrganization, txtAwardDate], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to add award due to " + err.message
            })
        }

        res.status(201).json({
            message: "Award added successfully!",
            awardID: this.lastID
        })
    })
})

app.get("/awards", (req, res) => {
    const strQuery = `
        SELECT * FROM awards
    `

    db.all(strQuery, [], (err, rows) => {
        if(err){
            return res.status(400).json({
                message: "Unable to retrieve awards"
            })
        }

        res.json(rows)
    })
})

app.delete("/awards/:awardID", (req, res) => {
    const awardID = req.params.awardID

    const strQuery = `
        DELETE FROM awards
        WHERE awardID = ?
    `

    db.run(strQuery, [awardID], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to delete award due to " + err.message
            })
        }

        res.json({
            message: "Award deleted successfully"
        })
    })
})

app.post("/profile", (req, res) => {
    const {txtFullName, txtEmail, txtPhone, txtLinkedIn, txtGitHub} = req.body

    const strDeleteQuery = `
        DELETE FROM profile
    `

    const strInsertQuery = `
        INSERT INTO profile
        (txtFullName, txtEmail, txtPhone, txtLinkedIn, txtGitHub)
        VALUES (?, ?, ?, ?, ?)
    `

    db.run(strDeleteQuery, [], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to update profile due to " + err.message
            })
        }

        db.run(strInsertQuery, [txtFullName, txtEmail, txtPhone, txtLinkedIn, txtGitHub], function(err){
            if(err){
                return res.status(400).json({
                    message: "Unable to update profile due to " + err.message
                })
            }

            res.status(201).json({
                message: "Profile saved successfully",
                profileID: this.lastID
            })
        })
    })
})

app.get("/profile", (req, res) => {
    const strQuery = `
        SELECT * FROM profile
        LIMIT 1
    `

    db.get(strQuery, [], (err, row) => {
        if(err){
            return res.status(400).json({
                message: "Unable to retrieve profile"
            })
        }

        res.json(row || {})
    })
})

app.post("/api-settings", (req, res) => {
    const {txtGeminiAPIKey} = req.body

    const strDeleteQuery = `
        DELETE FROM api_settings
    `

    const strInsertQuery = `
        INSERT INTO api_settings
        (txtGeminiAPIKey)
        VALUES (?)
    `

    db.run(strDeleteQuery, [], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to save API key due to " + err.message
            })
        }

        db.run(strInsertQuery, [txtGeminiAPIKey], function(err){
            if(err){
                return res.status(400).json({
                    message: "Unable to save API key due to " + err.message
                })
            }

            res.status(201).json({
                message: "API key saved successfully"
            })
        })
    })
})

app.get("/api-settings", (req, res) => {
    const strQuery = `
        SELECT * FROM api_settings
        LIMIT 1
    `

    db.get(strQuery, [], (err, row) => {
        if(err){
            return res.status(400).json({
                message: "Unable to retrieve API settings"
            })
        }

        res.json(row || {})
    })
})

app.post("/suggest-detail", async (req, res) => {
    const {txtDetail} = req.body

    const strKeyQuery = `
        SELECT * FROM api_settings
        LIMIT 1
    `

    db.get(strKeyQuery, [], async (err, row) => {
        if(err){
            return res.status(400).json({
                message: "Unable to retrieve API key"
            })
        }

        if(!row || !row.txtGeminiAPIKey){
            return res.status(400).json({
                message: "Please save your Gemini API key first"
            })
        }

        try{
            const prompt = `
                Improve this resume bullet point. 
                Keep it professional, concise, and action-focused.
                Return only one improved bullet point.

                Bullet point: ${txtDetail}
            `

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${row.txtGeminiAPIKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            })

            const data = await response.json()

            if(!response.ok){
                return res.status(400).json({
                    message: "Gemini request failed",
                    details: data
                })
            }

            const suggestion = data.candidates[0].content.parts[0].text

            res.json({
                message: "Suggestion created successfully",
                suggestion: suggestion
            })

        } catch(error){
            res.status(500).json({
                message: "Unable to create suggestion due to " + error.message
            })
        }
    })
})

app.post("/education", (req, res) => {
    const {txtSchoolName, txtDegree, txtGraduationDate, txtSchoolLocation} = req.body

    const strQuery = `
        INSERT INTO education
        (txtSchoolName, txtDegree, txtGraduationDate, txtSchoolLocation)
        VALUES (?, ?, ?, ?)
    `

    db.run(strQuery, [txtSchoolName, txtDegree, txtGraduationDate, txtSchoolLocation], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to add education due to " + err.message
            })
        }

        res.status(201).json({
            message: "Education added successfully",
            educationID: this.lastID
        })
    })
})

app.get("/education", (req, res) => {
    const strQuery = `
        SELECT * FROM education
    `

    db.all(strQuery, [], (err, rows) => {
        if(err){
            return res.status(400).json({
                message: "Unable to retrieve education"
            })
        }

        res.json(rows)
    })
})

app.delete("/education/:educationID", (req, res) => {
    const educationID = req.params.educationID

    const strQuery = `
        DELETE FROM education
        WHERE educationID = ?
    `

    db.run(strQuery, [educationID], function(err){
        if(err){
            return res.status(400).json({
                message: "Unable to delete education due to " + err.message
            })
        }

        res.json({
            message: "Education deleted successfully"
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
