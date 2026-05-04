// Get references to each main section of the single-page application.
const homeSection = document.getElementById("homeSection")
const jobsSection = document.getElementById("jobsSection")
const skillsSection = document.getElementById("skillsSection")
const certificationsSection = document.getElementById("certificationsSection")
const awardsSection = document.getElementById("awardsSection")
const educationSection = document.getElementById("educationSection")
const resumeSection = document.getElementById("resumeSection")

// Get references to the navigation buttons.
const btnHome = document.getElementById("btnHome")
const btnJobs = document.getElementById("btnJobs")
const btnSkills = document.getElementById("btnSkills")
const btnResume = document.getElementById("btnResume")
const btnCertifications = document.getElementById("btnCertifications")
const btnAwards = document.getElementById("btnAwards")
const btnEducation = document.getElementById("btnEducation")
const btnPrintResume = document.getElementById("btnPrintResume")

// Hide all sections before showing the section selected by the user.
function hideAllSections (){
    homeSection.classList.add("d-none")
    jobsSection.classList.add("d-none")
    skillsSection.classList.add("d-none")
    certificationsSection.classList.add("d-none")
    awardsSection.classList.add("d-none")
    educationSection.classList.add("d-none")
    resumeSection.classList.add("d-none")
}

// Navigation button event listeners show one section at a time.
btnHome.addEventListener("click", () => {
    hideAllSections()
    homeSection.classList.remove("d-none")
})

btnJobs.addEventListener("click", () => {
    hideAllSections()
    jobsSection.classList.remove("d-none")
    loadJobs()
})

btnSkills.addEventListener("click", () => {
    hideAllSections()
    skillsSection.classList.remove("d-none")
    loadSkills()
})

btnResume.addEventListener("click", () => {
    hideAllSections()
    resumeSection.classList.remove("d-none")
    loadResumePreview()
})

btnCertifications.addEventListener("click", () => {
    hideAllSections()
    certificationsSection.classList.remove("d-none")
    loadCertifications()
})

btnAwards.addEventListener("click", () => {
    hideAllSections()
    awardsSection.classList.remove("d-none")
    loadAwards()
})

btnEducation.addEventListener("click", () => {
    hideAllSections()
    educationSection.classList.remove("d-none")
    loadEducation()
})

btnPrintResume.addEventListener("click", () => {
    const resumeContent = document.getElementById("resumePreview").outerHTML

    const printWindow = window.open("", "", "width=900,height=1000")

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Resume</title>
            <link id="bootstrapStyles" rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
        </head>
        <body class="bg-light">
            <main class="container-fluid my-4 px-6">
                ${resumeContent}
            </main>

            <script>
                const bootstrapLink = document.getElementById("bootstrapStyles")

                bootstrapLink.onload = () => {
                    window.focus()
                    window.print()
                }
            <\/script>
        </body>
        </html>
    `)

    printWindow.document.close()
})

const profileForm = document.getElementById("profileForm")
const profileMessage = document.getElementById("profileMessage")

// Save the user's profile/contact information.
profileForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const objProfile = {
        txtFullName: document.getElementById("txtFullName").value,
        txtEmail: document.getElementById("txtEmail").value,
        txtPhone: document.getElementById("txtPhone").value,
        txtLinkedIn: document.getElementById("txtLinkedIn").value,
        txtGitHub: document.getElementById("txtGitHub").value
    }

    const response = await fetch("/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objProfile)
    })

    const data = await response.json()

    profileMessage.textContent = data.message
})

const jobForm = document.getElementById("jobForm")
const jobMessage = document.getElementById("jobMessage")

// Save a new job entry and reload the job list.
jobForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const objJob = {
        txtJobTitle: document.getElementById("txtJobTitle").value,
        txtCompany: document.getElementById("txtCompany").value,
        txtStartDate: document.getElementById("txtStartDate").value,
        txtEndDate: document.getElementById("txtEndDate").value,
        txtLocation: document.getElementById("txtLocation").value
    }

    const response = await fetch("/jobs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objJob)
    })

    const data = await response.json()

    jobMessage.textContent = data.message
    loadJobs()
})

const skillForm = document.getElementById("skillForm")
const skillMessage = document.getElementById("skillMessage")
const skillsList = document.getElementById("skillsList")

// Save a new skill and reload the skill list.
skillForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const objSkill = {
        txtSkillName: document.getElementById("txtSkillName").value,
        txtSkillCategory: document.getElementById("txtSkillCategory").value
    }

    const response = await fetch("/skills", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objSkill)
    })

    const data = await response.json()

    skillMessage.textContent = data.message
    loadSkills()
})

const certificationForm = document.getElementById("certificationForm")
const certificationMessage = document.getElementById("certificationMessage")
const certificationsList = document.getElementById("certificationsList")

// Save a new certification and reload the certification list.
certificationForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const objCertification = {
        txtCertificationName: document.getElementById("txtCertificationName").value,
        txtOrganization: document.getElementById("txtOrganization").value,
        txtDateEarned: document.getElementById("txtDateEarned").value
    }

    const response = await fetch("/certifications", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objCertification)
    })

    const data = await response.json()

    certificationMessage.textContent = data.message
    loadCertifications()
})

const awardForm = document.getElementById("awardForm")
const awardMessage = document.getElementById("awardMessage")
const awardsList = document.getElementById("awardsList")

// Save a new award and reload the award list.
awardForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const objAward = {
        txtAwardName: document.getElementById("txtAwardName").value,
        txtAwardOrganization: document.getElementById("txtAwardOrganization").value,
        txtAwardDate: document.getElementById("txtAwardDate").value
    }

    const response = await fetch("/awards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objAward)
    })

    const data = await response.json()

    awardMessage.textContent = data.message
    loadAwards()
})

const educationForm = document.getElementById("educationForm")
const educationMessage = document.getElementById("educationMessage")
const educationList = document.getElementById("educationList")

// Save a new education entry and reload the education list.
educationForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const objEducation = {
        txtSchoolName: document.getElementById("txtSchoolName").value,
        txtDegree: document.getElementById("txtDegree").value,
        txtGraduationDate: document.getElementById("txtGraduationDate").value,
        txtSchoolLocation: document.getElementById("txtSchoolLocation").value
    }

    const response = await fetch("/education", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objEducation)
    })

    const data = await response.json()

    educationMessage.textContent = data.message
    loadEducation()
})

const apiKeyForm = document.getElementById("apiKeyForm")
const apiKeyMessage = document.getElementById("apiKeyMessage")

// Save the user's Gemini API key locally.
apiKeyForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const objAPISettings = {
        txtGeminiAPIKey: document.getElementById("txtGeminiAPIKey").value
    }

    const response = await fetch("/api-settings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objAPISettings)
    })

    const data = await response.json()

    apiKeyMessage.textContent = data.message
})

const jobsList = document.getElementById("jobsList")

// Load the saved profile information into the profile form.
async function loadProfile(){

    const response = await fetch("/profile")
    const profile = await response.json()

    document.getElementById("txtFullName").value = profile.txtFullName || ""
    document.getElementById("txtEmail").value = profile.txtEmail || ""
    document.getElementById("txtPhone").value = profile.txtPhone || ""
    document.getElementById("txtLinkedIn").value = profile.txtLinkedIn || ""
    document.getElementById("txtGitHub").value = profile.txtGitHub || ""
}

// Load all jobs and their details, then add event listeners for details, suggestions, and deletes.
async function loadJobs(){
    
    const response = await fetch("/jobs")
    const jobs = await response.json()

    jobsList.innerHTML = ""

    for(const job of jobs){

        const detailsResponse = await fetch(`/job-details/${job.jobID}`)
        const details = await detailsResponse.json()

        let detailsHTML = ""

        details.forEach(detail => {
            detailsHTML += `
                <li>
                    ${detail.txtDetail}
                    <button class="btn btn-sm btn-danger deleteDetailButton" data-detailid="${detail.detailID}">&times;</button>
                </li>
            `
        })

        jobsList.innerHTML += `
            <div class="card bg-dark text-light p-3 mb-3">
                <div class="d-flex justify-content-between align-items-start">
                    <h3>${job.txtJobTitle}</h3>

                    <button class="btn btn-sm btn-danger deleteJobButton" data-jobid="${job.jobID}" title="Delete job">
                        Delete Job
                    </button>
                </div>

                <p>${job.txtCompany}</p>
                <p>${job.txtStartDate} - ${job.txtEndDate}</p>
                <p>${job.txtLocation}</p>

                <ul>
                    ${detailsHTML}
                </ul>

                <form class="detailForm" data-jobid="${job.jobID}">
                    <input class="form-control mb-2" type="text" name="txtDetail" placeholder="Add responsibility/detail" required>
                    <button class="btn btn-warning mb-2 suggestDetailButton" type="button">Suggest Improvement</button>
                    <button class="btn btn-primary mb-2" type="submit">Add Detail</button>
                </form>

                <hr>
            </div>
        `
    }

    const detailForms = document.querySelectorAll(".detailForm")

    detailForms.forEach(form => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault()

            const objDetail = {
                jobID: form.dataset.jobid,
                txtDetail: form.txtDetail.value
            }

            const response = await fetch("/job-details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(objDetail)
            })

            const data = await response.json()

            jobMessage.textContent = data.message
            loadJobs()
        })
    })
    const suggestButtons = document.querySelectorAll(".suggestDetailButton")

    suggestButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const form = button.closest(".detailForm")
            const txtDetailInput = form.txtDetail

            const objDetail = {
                txtDetail: txtDetailInput.value
            }

            jobMessage.textContent = "Creating suggestion..."

            const response = await fetch("/suggest-detail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(objDetail)
            })

            const data = await response.json()

            console.log(data)

            if(data.suggestion){
                txtDetailInput.value = data.suggestion
                jobMessage.textContent = data.message
            } else {
                jobMessage.textContent = data.message || "Suggestion failed"
            }
        })
    })

    const deleteJobButtons = document.querySelectorAll(".deleteJobButton")

deleteJobButtons.forEach(button => {
    button.addEventListener("click", async () => {
        const jobID = button.dataset.jobid

        const response = await fetch(`/jobs/${jobID}`, {
            method: "DELETE"
        })

        const data = await response.json()

        jobMessage.textContent = data.message
        loadJobs()
    })
})

const deleteDetailButtons = document.querySelectorAll(".deleteDetailButton")

deleteDetailButtons.forEach(button => {
    button.addEventListener("click", async () => {
        const detailID = button.dataset.detailid

        const response = await fetch(`/job-details/${detailID}`, {
            method: "DELETE"
        })

        const data = await response.json()

        jobMessage.textContent = data.message
        loadJobs()
    })
})
}

// Load all saved skills and display them in the Skills section.
async function loadSkills(){
    
    const response = await fetch ("/skills")
    const skills = await response.json()

    skillsList.innerHTML = ""

    skills.forEach(skill => {
        skillsList.innerHTML += `
            <div class="card bg-dark text-light border-secondary p-3 mb-3">
                <div class="d-flex justify-content-between align-items-start">
                    <h3>${skill.txtSkillName}</h3>

                    <button class="btn btn-sm btn-danger deleteSkillButton" data-skillid="${skill.skillID}" title="Delete skill">Delete Skill</button>
                </div>

                <p>${skill.txtSkillCategory}</p>
                <hr>
            </div>
        `
    })

    const deleteSkillButtons = document.querySelectorAll(".deleteSkillButton")

    deleteSkillButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const skillID = button.dataset.skillid

            const response = await fetch(`/skills/${skillID}`, {
                method: "DELETE"
            })

            const data = await response.json()

            skillMessage.textContent = data.message
            loadSkills()
        })
    })
}

// Load all saved certifications and display them in the Certifications section.
async function loadCertifications(){

    const response = await fetch("/certifications")
    const certifications = await response.json()

    certificationsList.innerHTML = ""

    certifications.forEach(certification => {
        certificationsList.innerHTML += `
            <div class="card bg-dark text-light border-secondary p-3 mb-3">
                <div class="d-flex justify-content-between align-items-start">
                    <h3>${certification.txtCertificationName}</h3>

                    <button class="btn btn-sm btn-danger deleteCertificationButton" data-certificationid="${certification.certificationID}" title="Delete certification">Delete Certification</button>
                </div>

                <p>${certification.txtOrganization}</p>
                <p>${certification.txtDateEarned}</p>
                <hr>
            </div>
        `
    })

    const deleteCertificationButtons = document.querySelectorAll(".deleteCertificationButton")

    deleteCertificationButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const certificationID = button.dataset.certificationid

            const response = await fetch(`/certifications/${certificationID}`, {
                method: "DELETE"
            })

            const data = await response.json()

            certificationMessage.textContent = data.message
            loadCertifications()
        })
    })
}

// Load all saved awards and display them in the Awards section.
async function loadAwards(){

    const response = await fetch("/awards")
    const awards = await response.json()

    awardsList.innerHTML = ""

    awards.forEach(award => {
        awardsList.innerHTML += `
            <div class="card bg-dark text-light border-secondary p-3 mb-3">
                <div class="d-flex justify-content-between align-items-start">
                    <h3>${award.txtAwardName}</h3>

                    <button class="btn btn-sm btn-danger deleteAwardButton" data-awardid="${award.awardID}" title="Delete award">Delete Award</button>
                </div>

                <p>${award.txtAwardOrganization}</p>
                <p>${award.txtAwardDate}</p>
                <hr>
            </div>
        `
    })

    const deleteAwardButtons = document.querySelectorAll(".deleteAwardButton")

    deleteAwardButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const awardID = button.dataset.awardid

            const response = await fetch(`/awards/${awardID}`, {
                method: "DELETE"
            })

            const data = await response.json()

            awardMessage.textContent = data.message
            loadAwards()
        })
    })
}

// Load all saved education entries and display them in the Education section.
async function loadEducation(){

    const response = await fetch("/education")
    const education = await response.json()

    educationList.innerHTML = ""

    education.forEach(item => {
        educationList.innerHTML += `
            <div class="card bg-dark text-light border-secondary p-3 mb-3">
                <div class="d-flex justify-content-between align-items-start">
                    <h3>${item.txtSchoolName}</h3>

                    <button class="btn btn-sm btn-danger deleteEducationButton" data-educationid="${item.educationID}" title="Delete education">Delete Education</button>
                </div>

                <p>${item.txtDegree}</p>
                <p>${item.txtGraduationDate}</p>
                <p>${item.txtSchoolLocation}</p>
                <hr>
            </div>
        `
    })

    const deleteEducationButtons = document.querySelectorAll(".deleteEducationButton")

    deleteEducationButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const educationID = button.dataset.educationid

            const response = await fetch(`/education/${educationID}`, {
                method: "DELETE"
            })

            const data = await response.json()

            educationMessage.textContent = data.message
            loadEducation()
        })
    })
}

// Build the resume selection controls and preview using data from the database.
// The user selects which items should appear before building the final preview.
async function loadResumePreview(){

    const profileResponse = await fetch("/profile")
    const profile = await profileResponse.json()

    const jobsResponse = await fetch("/jobs")
    const jobs = await jobsResponse.json()

    const skillsResponse = await fetch("/skills")
    const skills = await skillsResponse.json()

    const certificationsResponse = await fetch("/certifications")
    const certifications = await certificationsResponse.json()

    const awardsResponse = await fetch("/awards")
    const awards = await awardsResponse.json()

    const educationResponse = await fetch("/education")
    const education = await educationResponse.json()

    const resumeOptions = document.getElementById("resumeOptions")
    const resumePreview = document.getElementById("resumePreview")

    resumeOptions.innerHTML = `
        <div class="card bg-dark border-secondary text-light p-3 mb-3">
            <h4>Jobs</h4>
            <div class="mb-3" id="jobOptions"></div>

            <h4>Skills</h4>
            <div class="mb-3" id="skillOptions"></div>

            <h4>Certifications</h4>
            <div class="mb-3" id="certificationOptions"></div>

            <h4>Awards</h4>
            <div class="mb-3" id="awardOptions"></div>

            <h4>Education</h4>
            <div class="mb-3" id="educationOptions"></div>

            <button class="btn btn-primary mt-3 mb-3" id="btnBuildResume">Build Resume Preview</button>
        </div>
    `

    const jobOptions = document.getElementById("jobOptions")
    const skillOptions = document.getElementById("skillOptions")
    const certificationOptions = document.getElementById("certificationOptions")
    const awardOptions = document.getElementById("awardOptions")
    const educationOptions = document.getElementById("educationOptions")

    for(const job of jobs){

        const detailsResponse = await fetch(`/job-details/${job.jobID}`)
        const details = await detailsResponse.json()

        let detailOptionsHTML = ""

        details.forEach(detail => {
            detailOptionsHTML += `
                <div class="form-check ms-4">
                    <input class="form-check-input detailCheckbox" type="checkbox" data-jobid="${job.jobID}" value="${detail.detailID}" id="detail${detail.detailID}">
                    <label class="form-check-label" for="detail${detail.detailID}">
                        ${detail.txtDetail}
                    </label>
                </div>
            `
        })

        jobOptions.innerHTML += `
            <div class="form-check">
                <input class="form-check-input jobCheckbox" type="checkbox" value="${job.jobID}" id="job${job.jobID}">
                <label class="form-check-label" for="job${job.jobID}">
                    ${job.txtJobTitle} - ${job.txtCompany}
                </label>
            </div> 
            ${detailOptionsHTML}
        `
    }

    skills.forEach(skill => {
        skillOptions.innerHTML += `
            <label>
                <input type="checkbox" class="skillCheckbox" value="${skill.skillID}">
                ${skill.txtSkillName}
            </label>
            <br>
        `
    })

    certifications.forEach(certification => {
        certificationOptions.innerHTML += `
            <label>
                <input type="checkbox" class="certificationCheckbox" value="${certification.certificationID}">
                ${certification.txtCertificationName}
            </label>
            <br>
        `
    })

    awards.forEach(award => {
        awardOptions.innerHTML += `
            <label>
                <input type="checkbox" class="awardCheckbox" value="${award.awardID}">
                ${award.txtAwardName}
            </label>
            <br>
        `
    })

    education.forEach(item => {
        educationOptions.innerHTML += `
            <div class="form-check">
                <input class="form-check-input educationCheckbox" type="checkbox" value="${item.educationID}" id="education${item.educationID}">
                <label class="form-check-label" for="education${item.educationID}">
                    ${item.txtSchoolName} - ${item.txtDegree}
                </label>
            </div>
        `   
    })

    async function buildResume(){

        const selectedJobIDs = Array.from(document.querySelectorAll(".jobCheckbox:checked")).map(checkbox => Number(checkbox.value))
        const selectedDetailIDs = Array.from(document.querySelectorAll(".detailCheckbox:checked")).map(checkbox => Number(checkbox.value))
        const selectedSkillIDs = Array.from(document.querySelectorAll(".skillCheckbox:checked")).map(checkbox => Number(checkbox.value))
        const selectedCertificationIDs = Array.from(document.querySelectorAll(".certificationCheckbox:checked")).map(checkbox => Number(checkbox.value))
        const selectedAwardIDs = Array.from(document.querySelectorAll(".awardCheckbox:checked")).map(checkbox => Number(checkbox.value))
        const selectedEducationIDs = Array.from(document.querySelectorAll(".educationCheckbox:checked")).map(checkbox => Number(checkbox.value))
        let jobsHTML = ""

        for(const job of jobs){

            if(selectedJobIDs.includes(job.jobID)){

                const detailsResponse = await fetch(`/job-details/${job.jobID}`)
                const details = await detailsResponse.json()

                let detailsHTML = ""

                details.forEach(detail => {
                    if(selectedDetailIDs.includes(detail.detailID)){
                        detailsHTML += `<li>${detail.txtDetail}</li>`
                    }
                })

                jobsHTML += `
                    <div class="mb-3">
                        <p class="mb-1 fw-semibold fs-5">${job.txtJobTitle} - ${job.txtCompany}</p>
                        <p class="mb-1">${job.txtStartDate} - ${job.txtEndDate} | ${job.txtLocation}</p>
                        <ul>
                            ${detailsHTML}
                        </ul>
                    </div>
                `
            }
        }

        let skillsHTML = ""

        skills.forEach(skill => {
            if(selectedSkillIDs.includes(skill.skillID)){
                skillsHTML += `<li>${skill.txtSkillName} ${skill.txtSkillCategory ? "- " + skill.txtSkillCategory : ""}</li>`
            }
        })

        let certificationsHTML = ""

        certifications.forEach(certification => {
            if(selectedCertificationIDs.includes(certification.certificationID)){
                certificationsHTML += `
                    <li>${certification.txtCertificationName} - ${certification.txtOrganization} ${certification.txtDateEarned}</li>
                `
            }
        })

        let awardsHTML = ""

        awards.forEach(award => {
            if(selectedAwardIDs.includes(award.awardID)){
                awardsHTML += `
                    <li>${award.txtAwardName} - ${award.txtAwardOrganization} ${award.txtAwardDate}</li>
                `
            }
        })

        let educationHTML = ""

        education.forEach(item => {
            if(selectedEducationIDs.includes(item.educationID)){
                educationHTML += `
                    <li>
                        ${item.txtSchoolName}
                        ${item.txtDegree ? " - " + item.txtDegree : ""}
                        ${item.txtGraduationDate ? " " + item.txtGraduationDate : ""}
                        ${item.txtSchoolLocation ? " | " + item.txtSchoolLocation : ""}
                    </li>
                `
            }
        })

        resumePreview.innerHTML = `
            <div class="bg-white text-dark p-5 rounded shadow border border-dark">
                <h1 class="text-center mb-1">${profile.txtFullName || "Your Name"}</h1>
                <p class="text-center border-bottom pb-3 mb-4">
                    ${profile.txtEmail || ""}
                    ${profile.txtPhone ? " | " + profile.txtPhone : ""}
                    ${profile.txtLinkedIn ? " | " + profile.txtLinkedIn : ""}
                    ${profile.txtGitHub ? " | " + profile.txtGitHub : ""}
                </p>

                    <h2 class="border-bottom border-secondary pb-1 mt-4">Experience</h2>
                    ${jobsHTML}

                    <h2 class="border-bottom border-secondary pb-1 mt-4">Skills</h2>
                    <ul>
                        ${skillsHTML}
                    </ul>

                    <h2 class="border-bottom border-secondary pb-1 mt-4">Certifications</h2>
                    <ul>
                        ${certificationsHTML}
                    </ul>

                    <h2 class="border-bottom border-secondary pb-1 mt-4">Awards</h2>
                    <ul>
                        ${awardsHTML}
                    </ul>

                    <h2 class="border-bottom border-secondary pb-1 mt-4">Education</h2>
                    <ul>
                        ${educationHTML}
                    </ul>
            </div>
        `
    }

    document.getElementById("btnBuildResume").addEventListener("click", buildResume)

    buildResume()
}

// Load the saved Gemini API key into the API key input field.
async function loadAPISettings(){

    const response = await fetch("/api-settings")
    const settings = await response.json()

    document.getElementById("txtGeminiAPIKey").value = settings.txtGeminiAPIKey || ""
}

// Load saved data when the page first opens.
loadProfile()
loadJobs()
loadSkills()
loadCertifications()
loadAwards()
loadEducation()
loadAPISettings()