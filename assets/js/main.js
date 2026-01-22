const button = document.querySelector(".button");
const body = document.body;
const icon = button.querySelector("i");
const text = button.querySelector("span");

button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const offsetX = x - centerX;
    const offsetY = y - centerY;

    /* 3D tilt */
    const rotateX = (-offsetY / centerY) * 8;
    const rotateY = (offsetX / centerX) * 8;

    /* magnetic move */
    const moveX = offsetX * 0.08;
    const moveY = offsetY * 0.08;

    /* shadow math */
    const shadowX = offsetX / 5;
    const shadowY = offsetY / 1.5;

    const insetX = offsetX / 22;
    const insetY = offsetY / 8;

    button.style.transform = `
        translate(${moveX}px, ${moveY}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(2)
    `;

    button.style.boxShadow = `
        inset ${-insetX}px ${-insetY}px 2px var(--dark-color),
        inset ${insetX}px ${insetY}px 2px var(--white-color),
        ${shadowX}px ${shadowY}px 14px -14px var(--white-color),
        ${shadowX * 3}px ${shadowY * 3}px 48px hsla(235, 32%, 4%, .6)
    `;
});

button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0,0) rotateX(0) rotateY(0) scale(2)";
    button.style.boxShadow = `
        inset 0 -2px 2px var(--dark-color),
        inset 0 2px 2px var(--white-color),
        0 18px 14px -14px var(--white-color),
        -24px 40px 48px hsla(235, 32%, 4%, .6)
    `;
});

/* ================= THEME TOGGLE ================= */
button.addEventListener("click", (e) => {
    e.preventDefault();

    button.classList.add("switching");

    setTimeout(() => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            icon.className = "ri-moon-fill";
            text.textContent = "Dark mode";
        } else {
            icon.className = "ri-sun-fill";
            text.textContent = "Light mode";
        }

        button.classList.remove("switching");
    }, 300);
});

/* ================= SHOCKWAVE ================= */
button.addEventListener("click", () => {
    button.classList.remove("shock");
    void button.offsetWidth; // restart animation
    button.classList.add("shock");
});

/* ================= ELECTRIC RANDOMIZER ================= */
const electricPath = document.querySelector(".electric path");

function randomElectric() {
    const w = 220;
    const h = 70;
    let d = `M5 ${h / 2}`;

    for (let x = 15; x < w - 10; x += 15) {
        const y = h / 2 + (Math.random() - 0.5) * 20;
        d += ` L${x} ${y}`;
    }

    d += ` L${w - 5} ${h / 2}`;
    electricPath.setAttribute("d", d);
}

setInterval(randomElectric, 120);
randomElectric();

/* ================= BACKGROUND PARTICLES ================= */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let w,
    h,
    particles = [];

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 60; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        a: Math.random() * 0.5 + 0.2,
    });
}

function animateBG() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
    });

    requestAnimationFrame(animateBG);
}

animateBG();
