
function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}
function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
}

/* Hire button for conatct me block */

function openContactModal() {
    document.getElementById("contactModal").style.display = "block";
  }
  
  function closeContactModal() {
    document.getElementById("contactModal").style.display = "none";
  }
  
  function sendEmail(event) {
    event.preventDefault(); // prevent actual form submission
  
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
  
    const mailtoLink = `mailto:sharmarakshya7@gmail.com?subject=Hiring%20Request%20from%20${encodeURIComponent(name)}&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%0A${encodeURIComponent(message)}`;
  
    window.location.href = mailtoLink;
  
    // Optional: Close the modal
    closeContactModal();
  };


  const roles = ["Developer", "Front-end Developer", "Backend Developer"];
let roleIndex = 0;
let charIndex = 0;
let typing = true;
const roleElement = document.getElementById("role");

function typeWriter() {
  const currentRole = roles[roleIndex];
  if (typing) {
    if (charIndex < currentRole.length) {
      roleElement.textContent += currentRole.charAt(charIndex++);
      setTimeout(typeWriter, 100);
    } else {
      typing = false;
      setTimeout(typeWriter, 1500);
    }
  } else {
    if (charIndex > 0) {
      roleElement.textContent = currentRole.substring(0, --charIndex);
      setTimeout(typeWriter, 50);
    } else {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeWriter, 300);
    }
  }
}

typeWriter();

//Skills



  const skillCards = document.querySelectorAll('.skill-card');

  function revealSkills() {
    skillCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        card.classList.add('show');
      }
    });
  }

  window.addEventListener('scroll', revealSkills);
  window.addEventListener('load', revealSkills);

//Projects

function openModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "block";

  // animate bars
  modal.querySelectorAll(".progress").forEach(bar => {
    const width = bar.dataset.width;
    bar.style.width = "0";
    setTimeout(() => (bar.style.width = width), 150);
  });
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "none";
  modal.querySelectorAll(".progress").forEach(bar => (bar.style.width = "0"));
}

window.onclick = function(e) {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) closeModal(modal.id);
  });
};

