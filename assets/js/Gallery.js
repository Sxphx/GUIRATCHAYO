let isPopupOpen = false;

document.getElementById('backButton').addEventListener('click', () => {
    if (isPopupOpen) {
        // ปิด Popup หากเปิดอยู่
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            document.body.removeChild(overlay);
            isPopupOpen = false;
        }
    } else {
        // ย้อนกลับไปหน้าก่อนหน้า
        window.history.back();
    }
});

const images = document.querySelectorAll('.gallery img');

images.forEach(image => {
    image.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerHTML = `<div class="popup">
                                <img src="${image.src}" alt="${image.alt}">
                                <button class="close">&times;</button>
                             </div>`;
        document.body.appendChild(overlay);
        isPopupOpen = true;

        const closeButton = overlay.querySelector('.close');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
            isPopupOpen = false;
        });
    });
});

