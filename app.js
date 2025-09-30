// Storybook App - app.js

// -------------------------
// Helpers
// -------------------------
const $ = (s, sc=document) => sc.querySelector(s);
const $$ = (s, sc=document) => Array.from(sc.querySelectorAll(s));

// -------------------------
// Background Stars
// -------------------------
function generateStars(count=80){
  const container = $(".stars");
  if(!container) return;
  for (let i=0; i<count; i++){
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random()*100 + "%";
    star.style.top = Math.random()*100 + "%";
    star.style.animationDelay = (Math.random()*5) + "s";
    container.appendChild(star);
  }
}

// 🌍 Init
window.addEventListener("DOMContentLoaded", () => {
  generateStars();
  generateLanterns();
  suspenseReveal();
});

function generateShootingStar(){
  const container = $(".stars");
  if(!container) return;
  const shoot = document.createElement("div");
  shoot.className = "shooting-star";
  shoot.style.left = Math.random()*100 + "%";
  shoot.style.top = Math.random()*50 + "%";
  container.appendChild(shoot);
  setTimeout(()=>shoot.remove(), 1000);
}

// -------------------------
// Chapter Animations
// -------------------------
function animateChapter(page, charSel){
  if (!document.body.matches(page)) return;

  if ($(".chapter-title")){
    gsap.fromTo(".chapter-title",
      {opacity:0,y:-20},
      {opacity:1,y:0,duration:1});
  }
  if ($(charSel)){
    gsap.fromTo(charSel,
      {opacity:0,scale:0.8},
      {opacity:1,scale:1,duration:1,delay:0.8});
  }
  $$(".story p").forEach((p,i)=>{
    gsap.fromTo(p,
      {opacity:0,y:10},
      {opacity:1,y:0,duration:0.8,delay:1.2+i*0.5});
  });
}

// -------------------------
// ✨ Interactive Surprises
// -------------------------

// 🌟 Stars (Luna’s story)
function enableClickableStars() {
  const sparkleSound = $("#sparkle-sound");
  $$(".star").forEach(star => {
    star.style.cursor = "pointer";
    star.addEventListener("click", () => {
      gsap.fromTo(star,
        { scale: 1, opacity: 1 },
        { scale: 2, opacity: 0, duration: 0.6, yoyo: true, repeat: 1 }
      );
      if (sparkleSound) {
        sparkleSound.currentTime = 0;
        sparkleSound.play().catch(()=>{});
      }
    });
  });
}

// 🌸 Flowers (Hidden Garden)
function enableFlowerBloom() {
  const bloomSound = $("#bloom-sound");
  $$(".flower").forEach(flower => {
    flower.addEventListener("click", () => {
      gsap.fromTo(flower,
        { scale: 1, rotate: 0 },
        { scale: 2, rotate: 360, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
      if (bloomSound) {
        bloomSound.currentTime = 0;
        bloomSound.play().catch(()=>{});
      }
    });
  });
}

// 🐉 Dragon (Brave Knight with Image)
function enableDragonRoar() {
  const dragon = $(".dragon-img");
  const roarSound = $("#roar-sound");

  if (dragon) {
    dragon.addEventListener("click", () => {
      gsap.fromTo(dragon,
        { scale: 1 },
        { scale: 1.3, duration: 0.5, yoyo: true, repeat: 1 }
      );

      if (roarSound) {
        roarSound.currentTime = 0;
        roarSound.play().catch(()=>{});
      }
    });
  }
}


// -------------------------
// Init
// -------------------------
window.addEventListener("DOMContentLoaded", ()=>{
  generateStars();
  setInterval(()=>{ if(Math.random()>0.6) generateShootingStar(); }, 3000);

  // Animations for Luna
  animateChapter('[data-page="luna1"]', '.luna');
  animateChapter('[data-page="luna2"]', '.luna');
  animateChapter('[data-page="luna3"]', '.luna');

  // Animations for Brave Knight
  animateChapter('[data-page="knight1"]', '.dragon');
  animateChapter('[data-page="knight2"]', '.dragon');
  animateChapter('[data-page="knight3"]', '.dragon');

  // Animations for Hidden Garden
  animateChapter('[data-page="garden1"]', '.flower');
  animateChapter('[data-page="garden2"]', '.flower');
  animateChapter('[data-page="garden3"]', '.flower');

  // Button sounds
  const sparkle = $("#sparkle-sound");
  $$("#start-btn, .start-btn").forEach(btn => {
    btn.addEventListener("click", ()=>{
      if (sparkle) sparkle.play().catch(()=>{});
    });
  });

  const libraryBtn = $("#library-btn");
  if (libraryBtn) {
    libraryBtn.addEventListener("click", ()=>{
      if (sparkle) sparkle.play().catch(()=>{});
      window.location.href = "app.html";
    });
  }

  // Enable story-specific interactions
  if (document.body.dataset.page?.startsWith("luna")) {
    enableClickableStars();
  }
  if (document.body.dataset.page?.startsWith("garden")) {
    enableFlowerBloom();
  }
  if (document.body.dataset.page?.startsWith("knight")) {
    enableDragonRoar();
  }
});
