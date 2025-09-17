const button = document.querySelector(".button");

button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    const centerX = rect.width / 2,
        centerY = rect.height / 2;

    const offsetX = x - centerX,
        offsetY = y - centerY;

    const shadowX = offsetX / 5,
        shadowY = offsetY / 1.5;

    const insetX = offsetX / 22,
        insetY = offsetY / 8;

    button.style.boxShadow = `inset ${-insetX}px ${-insetY}px 2px var(--dark-color),
                             inset ${insetX}px ${insetY}px 2px var(--white-color),
                             ${shadowX}px ${shadowY}px 14px -14px var(--white-color),
                             ${shadowX * 3}px ${shadowY * 3}px 48px hsla(235, 32%, 4%, .6)`;
});

button.addEventListener("mouseleave", () => {
    button.style.boxShadow = `inset 0 -2px 2px var(--dark-color),
                             inset 0 2px 2px var(--white-color),
                             0 18px 14px -14px var(--white-color),
                             -24px 40px 48px hsla(235, 32%, 4%, .6)`;
});
