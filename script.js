document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const nameInput = document.getElementById('name-input');
    const updateBtn = document.getElementById('update-btn');
    const senderName = document.getElementById('sender-name');
    const shareUrl = document.getElementById('share-url');
    const copyBtn = document.getElementById('copy-btn');
    
    // Load name from URL if available
    loadFromUrl();
    
    // Card flip functionality
    card.addEventListener('click', function(e) {
        // Don't flip if clicking on the customization panel
        if (e.target.closest('.customization-panel')) {
            return;
        }
        card.classList.toggle('flipped');
    });
    
    // Update name functionality
    updateBtn.addEventListener('click', function() {
        if (nameInput.value.trim() !== '') {
            senderName.textContent = nameInput.value.trim();
            updateShareUrl();
        }
    });
    
    // Copy link functionality
    copyBtn.addEventListener('click', function() {
        shareUrl.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Link';
        }, 2000);
    });
    
    // Add some floating particles for a festive effect
    const body = document.querySelector('body');
    
    for (let i = 0; i < 30; i++) {
        createParticle(body);
    }
    
    function createParticle(parent) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(255, 255, 255, ' + (Math.random() * 0.3 + 0.1) + ')';
        particle.style.borderRadius = '50%';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Add animation
        particle.style.animation = 'float ' + (Math.random() * 10 + 10) + 's linear infinite';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        parent.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Function to update share URL
    function updateShareUrl() {
        const url = new URL(window.location.href);
        url.searchParams.set('name', encodeURIComponent(senderName.textContent));
        
        // Update URL without reloading the page
        window.history.replaceState({}, '', url);
        
        // Update share URL input
        shareUrl.value = url.href;
    }
    
    // Function to load name from URL
    function loadFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.has('name')) {
            const name = decodeURIComponent(urlParams.get('name'));
            senderName.textContent = name;
            nameInput.value = name;
        }
        
        // Initialize share URL
        updateShareUrl();
    }
});
