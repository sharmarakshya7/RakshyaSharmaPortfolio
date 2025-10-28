// Store resume data in memory
let resumeData = {
    contact: {},
    summary: '',
    skills: [],
    experience: [],
    projects: [],
    education: [],
    certifications: []
};

// Current tab tracking
const tabs = ['contact', 'summary', 'skills', 'experience', 'education'];
let currentTabIndex = 0;

// Tab functionality with navigation
function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');
    
    // Update current tab index
    currentTabIndex = tabs.indexOf(tabName);
}

function toggleMenu() {
  const menu = document.getElementById("navMenu");
  menu.classList.toggle("active");
}


function nextTab() {
    if (currentTabIndex < tabs.length - 1) {
        currentTabIndex++;
        const nextTabName = tabs[currentTabIndex];
        showTabByName(nextTabName);
    }
}

function previousTab() {
    if (currentTabIndex > 0) {
        currentTabIndex--;
        const prevTabName = tabs[currentTabIndex];
        showTabByName(prevTabName);
    }
}

function showTabByName(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
    
    // Update current tab index
    currentTabIndex = tabs.indexOf(tabName);
}

function completeResume() {
    collectData();
    renderPreview();
    showSuccessMessage('🎉 Resume completed successfully! You can now download your resume below.');
}

function saveProgress() {
    collectData();
    renderPreview();
    showSuccessMessage('✅ Progress saved successfully!');
}

function showSuccessMessage(message) {
    const messageEl = document.getElementById('successMessage');
    messageEl.textContent = message;
    messageEl.style.display = 'block';
    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 4000);
}

function togglePreviewMode() {
    const preview = document.getElementById('resume-preview');
    if (preview.style.position === 'fixed') {
        // Exit full screen
        preview.style.position = 'static';
        preview.style.top = 'auto';
        preview.style.left = 'auto';
        preview.style.width = 'auto';
        preview.style.height = 'auto';
        preview.style.zIndex = 'auto';
        preview.style.backgroundColor = 'transparent';
        preview.style.overflow = 'visible';
        document.querySelector('.preview-btn').textContent = '👁️ Full Screen Preview';
    } else {
        // Enter full screen
        preview.style.position = 'fixed';
        preview.style.top = '0';
        preview.style.left = '0';
        preview.style.width = '100vw';
        preview.style.height = '100vh';
        preview.style.zIndex = '9999';
        preview.style.backgroundColor = 'white';
        preview.style.overflow = 'auto';
        document.querySelector('.preview-btn').textContent = '❌ Exit Full Screen';
    }
}

// Data collection functions
function collectData() {
    // Collect contact information
    resumeData.contact = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        location: document.getElementById('location').value
    };

    // Collect summary
    resumeData.summary = document.getElementById('summary').value;

    // Collect skills
    resumeData.skills = [];
    document.querySelectorAll('.skill-group').forEach(group => {
        const category = group.querySelector('.skill-category').value;
        const items = group.querySelector('.skill-items').value;
        if (category && items) {
            resumeData.skills.push({ category, items });
        }
    });

    // Collect experience
    resumeData.experience = [];
    document.querySelectorAll('.experience-item').forEach(item => {
        const jobTitle = item.querySelector('.job-title').value;
        const company = item.querySelector('.company').value;
        const location = item.querySelector('.job-location').value;
        const duration = item.querySelector('.duration').value;
        const responsibilities = item.querySelector('.responsibilities').value;
        
        if (jobTitle && company) {
            resumeData.experience.push({
                jobTitle, company, location, duration, responsibilities
            });
        }
    });

    // Collect projects
    resumeData.projects = [];
    document.querySelectorAll('.project-item').forEach(item => {
        const name = item.querySelector('.project-name').value;
        const tech = item.querySelector('.project-tech').value;
        const description = item.querySelector('.project-desc').value;
        
        if (name && tech && description) {
            resumeData.projects.push({ name, tech, description });
        }
    });

    // Collect education
    resumeData.education = [];
    document.querySelectorAll('.education-item').forEach(item => {
        const degree = item.querySelector('.degree').value;
        const university = item.querySelector('.university').value;
        const gradYear = item.querySelector('.grad-year').value;
        const gpa = item.querySelector('.gpa').value;
        
        if (degree && university) {
            resumeData.education.push({ degree, university, gradYear, gpa });
        }
    });

    // Collect certifications
    resumeData.certifications = [];
    document.querySelectorAll('.certification-item').forEach(item => {
        const name = item.querySelector('.cert-name').value;
        const org = item.querySelector('.cert-org').value;
        const date = item.querySelector('.cert-date').value;
        
        if (name && org) {
            resumeData.certifications.push({ name, org, date });
        }
    });
}

// Dynamic form functions
function addSkillGroup() {
    const container = document.getElementById('skills-container');
    const skillGroup = document.createElement('div');
    skillGroup.className = 'skill-group';
    skillGroup.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Category</label>
                <input type="text" class="skill-category" placeholder="Frameworks">
            </div>
            <div class="form-group">
                <label>Skills (comma separated)</label>
                <input type="text" class="skill-items" placeholder="Spring Boot, React, Angular">
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeElement(this.parentElement)">Remove</button>
    `;
    container.appendChild(skillGroup);
}

function addExperience() {
    const container = document.getElementById('experience-container');
    const experienceItem = document.createElement('div');
    experienceItem.className = 'experience-item';
    experienceItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Job Title *</label>
                <input type="text" class="job-title" placeholder="Senior Java Developer">
            </div>
            <div class="form-group">
                <label>Company Name *</label>
                <input type="text" class="company" placeholder="ABC Corp">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Location</label>
                <input type="text" class="job-location" placeholder="Virginia">
            </div>
            <div class="form-group">
                <label>Duration *</label>
                <input type="text" class="duration" placeholder="Jun 2020 – Dec 2021">
            </div>
        </div>
        <div class="form-group">
            <label>Responsibilities (one per line) *</label>
            <textarea class="responsibilities" rows="4" placeholder="• Developed microservices architecture using Spring Boot&#10;• Led team of 3 developers in agile environment"></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeElement(this.parentElement)">Remove Experience</button>
    `;
    container.appendChild(experienceItem);
}

function addProject() {
    const container = document.getElementById('projects-container');
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';
    projectItem.innerHTML = `
        <div class="form-group">
            <label>Project Name</label>
            <input type="text" class="project-name" placeholder="Banking Management System">
        </div>
        <div class="form-group">
            <label>Technologies Used</label>
            <input type="text" class="project-tech" placeholder="Java, Spring Boot, PostgreSQL">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="project-desc" rows="3" placeholder="• Developed secure banking application&#10;• Implemented JWT authentication"></textarea>
        </div>
        <button type="button" class="remove-btn" onclick="removeElement(this.parentElement)">Remove Project</button>
    `;
    container.appendChild(projectItem);
}

function addEducation() {
    const container = document.getElementById('education-container');
    const educationItem = document.createElement('div');
    educationItem.className = 'education-item';
    educationItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Degree *</label>
                <input type="text" class="degree" placeholder="Master of Science in Computer Science">
            </div>
            <div class="form-group">
                <label>University *</label>
                <input type="text" class="university" placeholder="George Mason University">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Graduation Year</label>
                <input type="text" class="grad-year" placeholder="2019">
            </div>
            <div class="form-group">
                <label>GPA (Optional)</label>
                <input type="text" class="gpa" placeholder="3.9/4.0">
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeElement(this.parentElement)">Remove Education</button>
    `;
    container.appendChild(educationItem);
}

function addCertification() {
    const container = document.getElementById('certifications-container');
    const certificationItem = document.createElement('div');
    certificationItem.className = 'certification-item';
    certificationItem.innerHTML = `
        <div class="form-group">
            <label>Certification Name</label>
            <input type="text" class="cert-name" placeholder="Oracle Certified Java Programmer">
        </div>
        <div class="form-group">
            <label>Issuing Organization</label>
            <input type="text" class="cert-org" placeholder="Oracle Corporation">
        </div>
        <div class="form-group">
            <label>Date Obtained</label>
            <input type="text" class="cert-date" placeholder="June 2022">
        </div>
        <button type="button" class="remove-btn" onclick="removeElement(this.parentElement)">Remove Certification</button>
    `;
    container.appendChild(certificationItem);
}

function removeElement(element) {
    element.remove();
    // Update preview after removal
    collectData();
    renderPreview();
}

// Preview rendering function
function renderPreview() {
    const preview = document.getElementById('resume-preview');
    
    let html = `
        <div class="resume-header">
            <div class="resume-name">${resumeData.contact.fullName || 'Your Name'}</div>
            <div class="resume-contact">
                ${resumeData.contact.phone || 'Phone'} | ${resumeData.contact.email || 'Email'} | ${resumeData.contact.location || 'Location'}
                ${resumeData.contact.linkedin ? `<br>LinkedIn: ${resumeData.contact.linkedin}` : ''}
                ${resumeData.contact.github ? `<br>GitHub: ${resumeData.contact.github}` : ''}
            </div>
        </div>
    `;

    // Professional Summary
    if (resumeData.summary) {
        html += `
            <div class="resume-section">
                <div class="resume-section-title">PROFESSIONAL SUMMARY</div>
                <p>${resumeData.summary}</p>
            </div>
        `;
    }

    // Technical Skills
    if (resumeData.skills.length > 0) {
        html += `<div class="resume-section">
            <div class="resume-section-title">TECHNICAL SKILLS</div>`;
        resumeData.skills.forEach(skill => {
            html += `<p><strong>${skill.category}:</strong> ${skill.items}</p>`;
        });
        html += `</div>`;
    }

    // Professional Experience
    if (resumeData.experience.length > 0) {
        html += `<div class="resume-section">
            <div class="resume-section-title">PROFESSIONAL EXPERIENCE</div>`;
        resumeData.experience.forEach(exp => {
            html += `
                <div class="resume-item">
                    <div class="resume-item-header">${exp.jobTitle} | ${exp.company}</div>
                    <div class="resume-item-subheader">${exp.location || ''} ${exp.location && exp.duration ? '|' : ''} ${exp.duration || ''}</div>
                    <div style="white-space: pre-line;">${exp.responsibilities}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    // Projects
    if (resumeData.projects.length > 0) {
        html += `<div class="resume-section">
            <div class="resume-section-title">PROJECTS</div>`;
        resumeData.projects.forEach(project => {
            html += `
                <div class="resume-item">
                    <div class="resume-item-header">${project.name}</div>
                    <div class="resume-item-subheader">Technologies: ${project.tech}</div>
                    <div style="white-space: pre-line;">${project.description}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    // Education
    if (resumeData.education.length > 0) {
        html += `<div class="resume-section">
            <div class="resume-section-title">EDUCATION</div>`;
        resumeData.education.forEach(edu => {
            html += `
                <div class="resume-item">
                    <div class="resume-item-header">${edu.degree}</div>
                    <div class="resume-item-subheader">${edu.university} ${edu.gradYear ? `| ${edu.gradYear}` : ''} ${edu.gpa ? `| GPA: ${edu.gpa}` : ''}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    // Certifications
    if (resumeData.certifications.length > 0) {
        html += `<div class="resume-section">
            <div class="resume-section-title">CERTIFICATIONS</div>`;
        resumeData.certifications.forEach(cert => {
            html += `
                <div class="resume-item">
                    <div class="resume-item-header">${cert.name}</div>
                    <div class="resume-item-subheader">${cert.org} ${cert.date ? `| ${cert.date}` : ''}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    preview.innerHTML = html;
}

// Download functions
//Docx

function downloadDOCX() {
    collectData();

    const { Paragraph, TextRun, Packer, Document, AlignmentType, BorderStyle } = docx;

    const content = [];

    const lineBreak = () => new Paragraph({ spacing: { after: 200 } });

    const addCenteredHeader = (text, size = 20) =>
        content.push(new Paragraph({
            children: [new TextRun({ text, bold: true, size: size * 2 })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
        }));

    const addCenteredContactLine = (line) =>
        content.push(new Paragraph({
            children: [new TextRun({ text: line, size: 18 })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 }
        }));

    const addSectionTitle = (title) =>
        content.push(new Paragraph({
            text: title,
            heading: "HEADING_2",
            spacing: { before: 200, after: 100 },
            thematicBreak: true
        }));

    const addBulletPoints = (lines) =>
        lines.forEach(line =>
            content.push(new Paragraph({
                text: line,
                bullet: { level: 0 },
                spacing: { after: 100 }
            }))
        );

    const addLeftBoldRightText = (left, right) =>
        content.push(new Paragraph({
            children: [
                new TextRun({ text: left, bold: true }),
                new TextRun({ text: ' '.repeat(50), size: 1 }), // spacing hack
                new TextRun({ text: right, bold: false })
            ],
            alignment: AlignmentType.LEFT,
            spacing: { after: 100 }
        }));

    // --- Header ---
    addCenteredHeader(resumeData.contact.fullName || 'Your Name', 18);

    let contactLine = [
        resumeData.contact.location || 'Location',
        resumeData.contact.email || 'Email',
        resumeData.contact.phone || 'Phone'
    ];
    if (resumeData.contact.linkedin) contactLine.push(`LinkedIn: ${resumeData.contact.linkedin}`);
    if (resumeData.contact.github) contactLine.push(`GitHub: ${resumeData.contact.github}`);
    addCenteredContactLine(contactLine.join(' | '));

    // --- Professional Summary ---
    if (resumeData.summary) {
        addSectionTitle('Professional Summary');
        content.push(new Paragraph({
            text: resumeData.summary,
            spacing: { after: 200 }
        }));
    }

    // --- Skills ---
    if (resumeData.skills.length > 0) {
        addSectionTitle('Technical Skills');
        resumeData.skills.forEach(skill => {
            content.push(new Paragraph({
                text: `${skill.category}: ${skill.items}`,
                spacing: { after: 100 }
            }));
        });
    }

    // --- Experience ---
    if (resumeData.experience.length > 0) {
        addSectionTitle('Professional Experience');
        resumeData.experience.forEach(exp => {
            addLeftBoldRightText(`${exp.jobTitle} | ${exp.company}`, exp.duration || '');
            if (exp.location) {
                content.push(new Paragraph({
                    text: exp.location,
                    italics: true,
                    spacing: { after: 100 }
                }));
            }

            // Split responsibilities by line or dot
            const bullets = exp.responsibilities.split('\n').filter(Boolean);
            addBulletPoints(bullets);

            content.push(lineBreak());
        });
    }

    // --- Projects ---
    if (resumeData.projects.length > 0) {
        addSectionTitle('Projects');
        resumeData.projects.forEach(project => {
            content.push(new Paragraph({ text: project.name, bold: true }));
            content.push(new Paragraph({ text: `Technologies: ${project.tech}` }));
            content.push(new Paragraph({ text: project.description }));
            content.push(lineBreak());
        });
    }

    // --- Education ---
    if (resumeData.education.length > 0) {
        addSectionTitle('Education');
        resumeData.education.forEach(edu => {
            addLeftBoldRightText(`${edu.degree}`, `${edu.gradYear || ''}`);
            content.push(new Paragraph({
                text: `${edu.university}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`,
                spacing: { after: 200 }
            }));
        });
    }

    // --- Certifications ---
    if (resumeData.certifications.length > 0) {
        addSectionTitle('Certifications');
        resumeData.certifications.forEach(cert => {
            addLeftBoldRightText(cert.name, cert.date || '');
            content.push(new Paragraph({ text: cert.org, spacing: { after: 200 } }));
        });
    }

    // --- Final Document Assembly ---
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: 720, // 0.5 in (in twips)
                        right: 720,
                        bottom: 720,
                        left: 720
                    }
                }
            },
            children: content
        }]
    });

    docx.Packer.toBlob(doc).then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resumeData.contact.fullName || 'Resume'}.docx`;
        a.click();
        URL.revokeObjectURL(url);
    }).catch(e => console.error("DOCX generation error:", e));
}



function printResume() {
    collectData();
    renderPreview();

    const printWindow = window.open('', '_blank');
    const resumeContent = document.getElementById('resume-preview').innerHTML;

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Resume</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.4; color: #333; padding: 20px; }
                .resume-header { text-align: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 2px solid #2b3618; }
                .resume-name { font-size: 2rem; font-weight: bold; color: #2b3618; margin-bottom: 0.5rem; }
                .resume-contact { color: #666; font-size: 0.9rem; }
                .resume-section { margin-bottom: 1.5rem; }
                .resume-section-title { background: #2b3618; color: white; padding: 0.5rem 1rem; font-weight: bold; font-size: 1.1rem; margin-bottom: 1rem; }
                .resume-item { margin-bottom: 1rem; }
                .resume-item-header { font-weight: bold; color: #2b3618; }
                .resume-item-subheader { color: #666; font-style: italic; margin-bottom: 0.5rem; }
            </style>
        </head>
        <body onload="window.print(); window.close();">
            ${resumeContent}
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Live preview rendering and data tracking
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            collectData();
            renderPreview();
        });
    });

    renderPreview();
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
// DOCX Resume Upload and Scanner
function scanResume() {
  const scanContainer = document.getElementById("scan-section");

  // Fetch the UploadExistingResume HTML and inject it into the current page
  fetch("./UploadExistingResume/index.html")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load Scan section");
      return response.text();
    })
    .then(data => {
      scanContainer.innerHTML = data;
      // Smooth scroll to the newly loaded section
      scanContainer.scrollIntoView({ behavior: "smooth" });
    })
    .catch(error => {
      scanContainer.innerHTML = `<p style="color:red; text-align:center;">Error: ${error.message}</p>`;
    });
}

async function handleFileUpload(event) {
    const file = event.target.files[0];
    const statusDiv = document.getElementById('upload-status');
    
    if (!file) return;
    
    if (!file.name.toLowerCase().endsWith('.docx')) {
        statusDiv.innerHTML = `<div class="error">❌ Please upload a DOCX file only.</div>`;
        return;
    }
    
    statusDiv.innerHTML = `<div class="processing">⏳ Processing your resume...</div>`;
    
    try {
        // Read the DOCX file using mammoth
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
        const text = result.value;
        
        if (text.trim().length === 0) {
            statusDiv.innerHTML = `<div class="error">❌ Could not extract text from the file. Please check if it's a valid DOCX file.</div>`;
            return;
        }
        
        // Parse the extracted text and populate form
        const parsedData = parseResumeText(text);
        populateForm(parsedData);
        
        // Show success message and scan results
        statusDiv.innerHTML = `<div class="success">✅ Resume uploaded and processed successfully!</div>`;
        
        // Wait a moment then perform the scan
        setTimeout(() => {
            scanCurrentForm();
        }, 1500);
        
    } catch (error) {
        console.error('Error processing file:', error);
        statusDiv.innerHTML = `<div class="error">❌ Error processing file: ${error.message}</div>`;
    }
}

function parseResumeText(text) {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const parsedData = {
        contact: {},
        summary: '',
        skills: [],
        experience: [],
        education: [],
        projects: [],
        certifications: []
    };
    
    // Helper function to find email
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    // Helper function to find phone
    const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/;
    // Helper function to find LinkedIn
    const linkedinRegex = /(linkedin\.com\/in\/[^\s]+|linkedin\.com\/pub\/[^\s]+)/i;
    // Helper function to find GitHub
    const githubRegex = /(github\.com\/[^\s]+)/i;
    
    // Extract contact information from first few lines
    for (let i = 0; i < Math.min(10, lines.length); i++) {
        const line = lines[i];
        
        // Extract name (usually first non-empty line that's not an email/phone)
        if (!parsedData.contact.fullName && !emailRegex.test(line) && !phoneRegex.test(line) && line.length > 2) {
            parsedData.contact.fullName = line;
        }
        
        // Extract email
        const email = line.match(emailRegex);
        if (email) {
            parsedData.contact.email = email[0];
        }
        
        // Extract phone
        const phone = line.match(phoneRegex);
        if (phone) {
            parsedData.contact.phone = phone[0];
        }
        
        // Extract LinkedIn
        const linkedin = line.match(linkedinRegex);
        if (linkedin) {
            parsedData.contact.linkedin = 'https://' + linkedin[0];
        }
        
        // Extract GitHub
        const github = line.match(githubRegex);
        if (github) {
            parsedData.contact.github = 'https://' + github[0];
        }
        
        // Extract location (look for state abbreviations or common location patterns)
        if (line.match(/\b[A-Z]{2}\b|\b(City|State|USA|United States)\b/i) && !emailRegex.test(line) && !phoneRegex.test(line)) {
            parsedData.contact.location = line;
        }
    }
    
    // Extract sections based on common headings
    let currentSection = '';
    let sectionContent = [];
    
    for (const line of lines) {
        const lowerLine = line.toLowerCase();
        
        // Identify section headers
        if (lowerLine.includes('summary') || lowerLine.includes('objective') || lowerLine.includes('profile')) {
            if (sectionContent.length > 0) {
                processSectionContent(currentSection, sectionContent, parsedData);
            }
            currentSection = 'summary';
            sectionContent = [];
        } else if (lowerLine.includes('skill') || lowerLine.includes('technical') || lowerLine.includes('competencies')) {
            if (sectionContent.length > 0) {
                processSectionContent(currentSection, sectionContent, parsedData);
            }
            currentSection = 'skills';
            sectionContent = [];
        } else if (lowerLine.includes('experience') || lowerLine.includes('work') || lowerLine.includes('employment')) {
            if (sectionContent.length > 0) {
                processSectionContent(currentSection, sectionContent, parsedData);
            }
            currentSection = 'experience';
            sectionContent = [];
        } else if (lowerLine.includes('education') || lowerLine.includes('academic')) {
            if (sectionContent.length > 0) {
                processSectionContent(currentSection, sectionContent, parsedData);
            }
            currentSection = 'education';
            sectionContent = [];
        } else if (lowerLine.includes('project') || lowerLine.includes('portfolio')) {
            if (sectionContent.length > 0) {
                processSectionContent(currentSection, sectionContent, parsedData);
            }
            currentSection = 'projects';
            sectionContent = [];
        } else if (lowerLine.includes('certification') || lowerLine.includes('certificate')) {
            if (sectionContent.length > 0) {
                processSectionContent(currentSection, sectionContent, parsedData);
            }
            currentSection = 'certifications';
            sectionContent = [];
        } else {
            // Add to current section content
            if (currentSection && line.length > 3) {
                sectionContent.push(line);
            }
        }
    }
    
    // Process the last section
    if (sectionContent.length > 0) {
        processSectionContent(currentSection, sectionContent, parsedData);
    }
    
    return parsedData;
}

function processSectionContent(section, content, parsedData) {
    switch (section) {
        case 'summary':
            parsedData.summary = content.join(' ').substring(0, 500); // Limit length
            break;
            
        case 'skills':
            // Try to extract skills from various formats
            const skillText = content.join(' ');
            if (skillText.includes(':')) {
                // Format: "Languages: Java, Python"
                const skillLines = skillText.split(/[:\n]/).filter(s => s.trim());
                for (let i = 0; i < skillLines.length - 1; i += 2) {
                    if (skillLines[i] && skillLines[i + 1]) {
                        parsedData.skills.push({
                            category: skillLines[i].trim(),
                            items: skillLines[i + 1].trim()
                        });
                    }
                }
            } else {
                // Default format
                parsedData.skills.push({
                    category: 'Technical Skills',
                    items: skillText.replace(/[•\-\n]/g, ',').replace(/,+/g, ',').trim()
                });
            }
            break;
            
        case 'experience':
            // Basic experience parsing (this is simplified)
            const expText = content.join('\n');
            parsedData.experience.push({
                jobTitle: content[0] || 'Position Title',
                company: content[1] || 'Company Name',
                location: 'Location',
                duration: 'Duration',
                responsibilities: expText
            });
            break;
            
        case 'education':
            parsedData.education.push({
                degree: content[0] || 'Degree',
                university: content[1] || 'University',
                gradYear: '',
                gpa: ''
            });
            break;
            
        case 'projects':
            parsedData.projects.push({
                name: content[0] || 'Project Name',
                tech: 'Technologies',
                description: content.join('\n')
            });
            break;
            
        case 'certifications':
            parsedData.certifications.push({
                name: content[0] || 'Certification Name',
                org: content[1] || 'Organization',
                date: ''
            });
            break;
    }
}

function populateForm(data) {
    // Populate contact information
    if (data.contact.fullName) document.getElementById('fullName').value = data.contact.fullName;
    if (data.contact.email) document.getElementById('email').value = data.contact.email;
    if (data.contact.phone) document.getElementById('phone').value = data.contact.phone;
    if (data.contact.linkedin) document.getElementById('linkedin').value = data.contact.linkedin;
    if (data.contact.github) document.getElementById('github').value = data.contact.github;
    if (data.contact.location) document.getElementById('location').value = data.contact.location;
    
    // Populate summary
    if (data.summary) document.getElementById('summary').value = data.summary;
    
    // Populate skills
    if (data.skills.length > 0) {
        const firstSkill = document.querySelector('.skill-category');
        const firstSkillItems = document.querySelector('.skill-items');
        if (firstSkill && firstSkillItems) {
            firstSkill.value = data.skills[0].category;
            firstSkillItems.value = data.skills[0].items;
        }
        
        // Add additional skill groups
        for (let i = 1; i < data.skills.length; i++) {
            addSkillGroup();
            const skillGroups = document.querySelectorAll('.skill-group');
            const lastGroup = skillGroups[skillGroups.length - 1];
            lastGroup.querySelector('.skill-category').value = data.skills[i].category;
            lastGroup.querySelector('.skill-items').value = data.skills[i].items;
        }
    }
    
    // Populate experience
    if (data.experience.length > 0) {
        const firstExp = document.querySelector('.experience-item');
        if (firstExp) {
            firstExp.querySelector('.job-title').value = data.experience[0].jobTitle;
            firstExp.querySelector('.company').value = data.experience[0].company;
            firstExp.querySelector('.job-location').value = data.experience[0].location;
            firstExp.querySelector('.duration').value = data.experience[0].duration;
            firstExp.querySelector('.responsibilities').value = data.experience[0].responsibilities;
        }
    }
    
    // Populate education
    if (data.education.length > 0) {
        const firstEdu = document.querySelector('.education-item');
        if (firstEdu) {
            firstEdu.querySelector('.degree').value = data.education[0].degree;
            firstEdu.querySelector('.university').value = data.education[0].university;
            firstEdu.querySelector('.grad-year').value = data.education[0].gradYear;
            firstEdu.querySelector('.gpa').value = data.education[0].gpa;
        }
    }
    
    // Update the preview
    collectData();
    renderPreview();
}