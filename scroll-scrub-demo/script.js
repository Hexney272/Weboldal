// ===== GSAP ScrollTrigger Registration =====
gsap.registerPlugin(ScrollTrigger);

// ===== VIDEO SCRUB SETUP =====
const video = document.getElementById('scrubVideo');
const progressBar = document.getElementById('progressBar');
const videoSection = document.getElementById('videoSection');

// Wait for video metadata to load before setting up scrub
video.addEventListener('loadedmetadata', () => {
    initScrollScrub();
});

// Fallback: if metadata is already loaded (cached)
if (video.readyState >= 1) {
    initScrollScrub();
}

function initScrollScrub() {
    const duration = video.duration;

    // ===== MAIN VIDEO SCRUB =====
    // Pin the video container and scrub through the video as user scrolls
    ScrollTrigger.create({
        trigger: videoSection,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.video-container',
        scrub: true, // smooth scrub (true = 1 second smoothing)
        onUpdate: (self) => {
            // Set video currentTime based on scroll progress
            const time = self.progress * duration;
            
            // Only update if the difference is significant (performance)
            if (Math.abs(video.currentTime - time) > 0.05) {
                video.currentTime = time;
            }

            // Update progress bar
            progressBar.style.width = (self.progress * 100) + '%';
        }
    });

    // ===== OVERLAY TEXT ANIMATIONS =====
    // Text 1: Appears at 10% scroll, disappears at 30%
    gsap.timeline({
        scrollTrigger: {
            trigger: videoSection,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
        }
    })
    // Text 1: 10% - 30%
    .fromTo('#text1', 
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.1 },
        0.08 // starts at 8% of timeline
    )
    .to('#text1', 
        { opacity: 0, y: -30, scale: 1.1, duration: 0.1 },
        0.22 // fades out at 22%
    )
    // Text 2: 35% - 55%
    .fromTo('#text2',
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.1 },
        0.33
    )
    .to('#text2',
        { opacity: 0, y: -30, scale: 1.1, duration: 0.1 },
        0.48
    )
    // Text 3: 60% - 80%
    .fromTo('#text3',
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.1 },
        0.58
    )
    .to('#text3',
        { opacity: 0, y: -30, scale: 1.1, duration: 0.1 },
        0.75
    );

    // ===== INTRO FADE OUT ON SCROLL =====
    gsap.to('.intro-content', {
        opacity: 0,
        y: -50,
        scrollTrigger: {
            trigger: '.intro',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ===== AFTER SECTION ANIMATION =====
gsap.from('.after-content', {
    opacity: 0,
    y: 60,
    duration: 1,
    scrollTrigger: {
        trigger: '.after-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});
