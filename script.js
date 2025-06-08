// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// File upload handling
document.getElementById('generateBtn').addEventListener('click', async () => {
  const fileInput = document.getElementById('imageInput');
  const outputBox = document.getElementById('output');
  const loading = document.getElementById('loading');
  const codeBox = document.getElementById('codeBox');
  const buttonText = document.getElementById('buttonText');
  const buttonSpinner = document.getElementById('buttonSpinner');

  if (!fileInput.files.length) {
    // Shake animation for error
    anime({
      targets: fileInput,
      translateX: [-10, 10, -10, 10, 0],
      duration: 600,
      elasticity: 0
    });
    return alert("Please select an image first.");
  }

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  // Show loading state
  buttonText.textContent = "Generating...";
  buttonSpinner.classList.remove('hidden');
  loading.classList.remove('hidden');
  outputBox.classList.add('hidden');

  try {
    const res = await fetch("https://empire-ui-51b6.onrender.com/generate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.code) {
      codeBox.value = data.code;
      outputBox.classList.remove('hidden');
      
      // Scroll to output
      outputBox.scrollIntoView({ behavior: 'smooth' });
      
      // Celebration animation
      anime({
        targets: '#output',
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic'
      });
    } else {
      alert("Failed to generate code.");
    }
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    buttonText.textContent = "Generate Tailwind HTML";
    buttonSpinner.classList.add('hidden');
    loading.classList.add('hidden');
  }
});

function copyCode() {
  const code = document.getElementById('codeBox');
  const copySuccess = document.getElementById('copySuccess');
  
  code.select();
  document.execCommand('copy');
  
  // Show success message
  copySuccess.style.opacity = '1';
  anime({
    targets: copySuccess,
    opacity: [1, 0],
    duration: 2000,
    easing: 'easeOutExpo'
  });
  
  // Button feedback
  anime({
    targets: '#codeBox',
    backgroundColor: ['#f8fafc', '#e9d5ff', '#f8fafc'],
    duration: 1000,
    easing: 'easeInOutQuad'
  });
}

// Drag and drop highlight
const fileInput = document.getElementById('imageInput');
const label = fileInput.closest('label');

['dragenter', 'dragover'].forEach(eventName => {
  label.addEventListener(eventName, (e) => {
    e.preventDefault();
    label.classList.add('border-purple-500', 'bg-purple-100');
  });
});

['dragleave', 'drop'].forEach(eventName => {
  label.addEventListener(eventName, (e) => {
    e.preventDefault();
    label.classList.remove('border-purple-500', 'bg-purple-100');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
