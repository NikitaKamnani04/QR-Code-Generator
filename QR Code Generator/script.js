const btnEle = document.querySelector(".btn");
const imgEle = document.getElementById("qr-img");
const boxEle = document.getElementById("img-box");
const inputEle = document.getElementById("qr-text");
const downloadIcon = document.getElementById("download-icon");

btnEle.addEventListener("click", () => {
    const inputValue = inputEle.value.trim(); // Trim any whitespace

    if (inputValue.length > 0) {
        let qrData;

        // If input is a valid email
        if (/\S+@\S+\.\S+/.test(inputValue)) {
            qrData = `mailto:${encodeURIComponent(inputValue)}`; // Create mailto URL
        } else {
            qrData = inputValue; // Use input directly for text or URL
        }

        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`;
        imgEle.src = qrUrl;
        boxEle.classList.add("show-img");

        // Show download icon after QR code is loaded
        imgEle.onload = () => {
            downloadIcon.style.display = "block";
            downloadIcon.onclick = () => {
                const link = document.createElement("a");
                link.href = qrUrl;
                link.download = "qr-code.png";
                link.click();
            };
        };
    } else {
        alert("Please enter a valid email, URL, or text!");
    }
});
