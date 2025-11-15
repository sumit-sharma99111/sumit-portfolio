/* Baby-simple JS for:
   - dark/light mode
   - typewriter effect
   - section reveal
   - scrollspy
   - project hover tilt
   - resume PDF
*/

document.addEventListener("DOMContentLoaded", () => {

  /* YEAR IN FOOTER */
  document.getElementById("year").textContent = new Date().getFullYear();


  /* -----------------------------------
     THEME TOGGLE (dark <-> light)
     ----------------------------------- */
  const themeBtn = document.getElementById("themeToggle");

  function setTheme(t) {
    document.body.setAttribute("data-theme", t);
    themeBtn.textContent = t === "dark" ? "🌙" : "☀️";
    localStorage.setItem("theme", t);
  }

  const saved = localStorage.getItem("theme");
  setTheme(saved || "light");

  themeBtn.addEventListener("click", () => {
    const now = document.body.getAttribute("data-theme");
    setTheme(now === "dark" ? "light" : "dark");
  });


  /* -----------------------------------
     TYPEWRITER
     ----------------------------------- */
  const tw = document.getElementById("typewriter");
  const lines = [
    "Building clean interfaces.",
    "Writing maintainable code.",
    "Improving user experience."
  ];
  let li = 0, ci = 0, forward = true;

  function type() {
    const txt = lines[li];

    if (forward) {
      ci++;
      if (ci > txt.length) { forward = false; setTimeout(type, 800); return; }
    } else {
      ci--;
      if (ci < 0) { forward = true; li = (li+1)%lines.length; }
    }

    tw.textContent = txt.slice(0, ci);
    setTimeout(type, forward ? 40 : 25);
  }
  type();


  /* -----------------------------------
     SECTION REVEAL + SCROLLSPY
     ----------------------------------- */
  const sections = document.querySelectorAll(".section");
  const navItems = document.querySelectorAll(".nav__item");

  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("is-visible");

        const id = e.target.id;
        navItems.forEach(n=>{
          n.classList.toggle("active", n.dataset.target === id);
        });
      }
    });
  },{threshold:0.4});

  sections.forEach(s=>obs.observe(s));


  navItems.forEach(n=>{
    n.addEventListener("click", e=>{
      e.preventDefault();
      const t = document.getElementById(n.dataset.target);
      t.scrollIntoView({behavior:"smooth"});
    });
  });


  /* -----------------------------------
     PROJECT CARDS — simple tilt
     ----------------------------------- */
  const cards = document.querySelectorAll(".project");

  cards.forEach(card=>{
    card.addEventListener("mousemove", e=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width - 0.5;
      const y = (e.clientY-r.top)/r.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${y*5}deg) rotateY(${x*-5}deg)`;
    });
    card.addEventListener("mouseleave", ()=>card.style.transform="");
  });


  /* -----------------------------------
     RESUME PDF (simple clean)
     ----------------------------------- */
  document.getElementById("downloadResume").addEventListener("click", ()=>{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Sumit Sharma", 20, 20);

    doc.setFontSize(12);
    doc.text("Web Developer", 20, 38);
    doc.text("Email: sumitsharma15272004@gmail.com", 20, 54);

    doc.setFontSize(14);
    doc.text("Skills", 20, 80);
    doc.setFontSize(11);
    doc.text("HTML, CSS, JS, Responsive Design, Accessibility", 20, 98);

    doc.setFontSize(14);
    doc.text("Projects", 20, 130);

    let y = 150;
    const list = [
      "Tic Tac Toe – Vanilla JS",
      "Clock App – Digital clock",
      "Portfolio Template – Simple, clean template"
    ];

    list.forEach(line=>{
      doc.setFontSize(11);
      doc.text("- "+line, 20, y);
      y += 16;
    });

    doc.save("Sumit_Sharma_Resume.pdf");
  });

});
