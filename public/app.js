const homeSection = document.getElementById("homeSection")
const jobsSection = document.getElementById("jobsSection")
const skillsSection = document.getElementById("skillsSection")
const resumeSection = document.getElementById("resumeSection")
const certificationsSection = document.getElementById("certificationsSection")
const awardsSection = document.getElementById("awardsSection")


const btnHome = document.getElementById("btnHome")
const btnJobs = document.getElementById("btnJobs")
const btnSkills = document.getElementById("btnSkills")
const btnResume = document.getElementById("btnResume")
const btnCertifications = document.getElementById("btnCertifications")
const btnAwards = document.getElementById("btnAwards")
const btnPrintResume = document.getElementById("btnPrintResume")

function hideAllSections (){
    homeSection.classList.add("d-none")
    jobsSection.classList.add("d-none")
    skillsSection.classList.add("d-none")
    resumeSection.classList.add("d-none")
    certificationsSection.classList.add("d-none")
    awardsSection.classList.add("d-none")
}

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

btnPrintResume.addEventListener("click", () => {
    const resumeContent = document.getElementById("resumePreview").innerHTML

    const printWindow = window.open("", "", "width=800,height=1000")

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Resume</title>
            <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
        </head>
        <body>
            <main class="container my-4">
                ${resumeContent}
            </main>
        </body>
        </html>
    `)

    printWindow.document.close()
    printWindow.focus()

    setTimeout(() => {
        printWindow.print()
    }, 500)
})

const jobForm = document.getElementById("jobForm")
const jobMessage = document.getElementById("jobMessage")

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

const profileForm = document.getElementById("profileForm")
const profileMessage = document.getElementById("profileMessage")

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

const apiKeyForm = document.getElementById("apiKeyForm")
const apiKeyMessage = document.getElementById("apiKeyMessage")

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

async function loadProfile(){

    const response = await fetch("/profile")
    const profile = await response.json()

    document.getElementById("txtFullName").value = profile.txtFullName || ""
    document.getElementById("txtEmail").value = profile.txtEmail || ""
    document.getElementById("txtPhone").value = profile.txtPhone || ""
    document.getElementById("txtLinkedIn").value = profile.txtLinkedIn || ""
    document.getElementById("txtGitHub").value = profile.txtGitHub || ""
}

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

async function loadSkills(){
    
    const response = await fetch ("/skills")
    const skills = await response.json()

    skillsList.innerHTML = ""

    skills.forEach(skill => {
        skillsList.innerHTML += `
            <div>
                <h3>${skill.txtSkillName}</h3>
                <p>${skill.txtSkillCategory}</p>
                <hr>
            </div>
        `
    })
}

async function loadCertifications(){

    const response = await fetch("/certifications")
    const certifications = await response.json()

    certificationsList.innerHTML = ""

    certifications.forEach(certification => {
        certificationsList.innerHTML += `
            <div>
                <h3>${certification.txtCertificationName}</h3>
                <p>${certification.txtOrganization}</p>
                <p>${certification.txtDateEarned}</p>
                <hr>
            </div>
        `
    })
}

async function loadAwards(){

    const response = await fetch("/awards")
    const awards = await response.json()

    awardsList.innerHTML = ""

    awards.forEach(award => {
        awardsList.innerHTML += `
            <div>
                <h3>${award.txtAwardName}</h3>
                <p>${award.txtAwardOrganization}</p>
                <p>${award.txtAwardDate}</p>
                <hr>
            </div>
        `
    })
}

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

    const resumeOptions = document.getElementById("resumeOptions")
    const resumePreview = document.getElementById("resumePreview")

    resumeOptions.innerHTML = `
        <h4>Jobs</h4>
        <div id="jobOptions"></div>

        <h4>Skills</h4>
        <div id="skillOptions"></div>

        <h4>Certifications</h4>
        <div id="certificationOptions"></div>

        <h4>Awards</h4>
        <div id="awardOptions"></div>

        <button id="btnBuildResume">Build Resume Preview</button>
    `

    const jobOptions = document.getElementById("jobOptions")
    const skillOptions = document.getElementById("skillOptions")
    const certificationOptions = document.getElementById("certificationOptions")
    const awardOptions = document.getElementById("awardOptions")

    for(const job of jobs){

        const detailsResponse = await fetch(`/job-details/${job.jobID}`)
        const details = await detailsResponse.json()

        let detailOptionsHTML = ""

        details.forEach(detail => {
            detailOptionsHTML += `
                <label style="margin-left: 25px;">
                    <input type="checkbox" class="detailCheckbox" data-jobid="${job.jobID}" value="${detail.detailID}">
                    ${detail.txtDetail}
                </label>
                <br>
            `
        })

        jobOptions.innerHTML += `
            <label>
                <input type="checkbox" class="jobCheckbox" value="${job.jobID}">
                ${job.txtJobTitle} - ${job.txtCompany}
            </label>
            <br>
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

    async function buildResume(){

        const selectedJobIDs = Array.from(document.querySelectorAll(".jobCheckbox:checked")).map(checkbox => Number(checkbox.value))
        const selectedDetailIDs = Array.from(document.querySelectorAll(".detailCheckbox:checked")).map(checkbox => Number(checkbox.value))
        const selectedSkillIDs = Array.from(document.querySelectorAll(".skillCheckbox:checked")).map(checkbox => Number(checkbox.value))
        const selectedCertificationIDs = Array.from(document.querySelectorAll(".certificationCheckbox:checked")).map(checkbox => Number(checkbox.value))
        const selectedAwardIDs = Array.from(document.querySelectorAll(".awardCheckbox:checked")).map(checkbox => Number(checkbox.value))

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
                    <div>
                        <h3>${job.txtJobTitle} - ${job.txtCompany}</h3>
                        <p>${job.txtStartDate} - ${job.txtEndDate} | ${job.txtLocation}</p>
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

        resumePreview.innerHTML = `
            <div>
                <h1>${profile.txtFullName || "Your Name"}</h1>
                <p>
                    ${profile.txtEmail || ""}
                    ${profile.txtPhone ? " | " + profile.txtPhone : ""}
                    ${profile.txtLinkedIn ? " | " + profile.txtLinkedIn : ""}
                    ${profile.txtGitHub ? " | " + profile.txtGitHub : ""}
                </p>

                <h2>Experience</h2>
                ${jobsHTML}

                <h2>Skills</h2>
                <ul>
                    ${skillsHTML}
                </ul>

                <h2>Certifications</h2>
                <ul>
                    ${certificationsHTML}
                </ul>

                <h2>Awards</h2>
                <ul>
                    ${awardsHTML}
                </ul>
            </div>
        `
    }

    document.getElementById("btnBuildResume").addEventListener("click", buildResume)

    buildResume()
}

async function loadAPISettings(){

    const response = await fetch("/api-settings")
    const settings = await response.json()

    document.getElementById("txtGeminiAPIKey").value = settings.txtGeminiAPIKey || ""
}
loadProfile()
loadJobs()
loadSkills()
loadCertifications()
loadAwards()
loadAPISettings()