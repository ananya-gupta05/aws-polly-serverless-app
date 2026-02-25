const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");
const convertBtn = document.getElementById("convertBtn");
const statusText = document.getElementById("status");
const audioPlayer = document.getElementById("audioPlayer");
const downloadLink = document.getElementById("downloadLink");

let extractedText = "";

// Click upload support
dropZone.addEventListener("click", () => {
    fileInput.click();
});

// Handle file selection (click)
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
});

// Drag & Drop support
dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.style.background = "#dfe6e9";
});

dropZone.addEventListener("dragleave", () => {
    dropZone.style.background = "#ecf0f1";
});

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropZone.style.background = "#ecf0f1";

    const file = event.dataTransfer.files[0];
    if (file) {
        handleFile(file);
    }
});

// File processing
async function handleFile(file) {

    extractedText = "";
    statusText.textContent = "Processing file...";

    if (file.type === "text/plain") {

        const reader = new FileReader();
        reader.onload = function(e) {
            extractedText = e.target.result;
            statusText.textContent = "TXT loaded successfully!";
        };
        reader.readAsText(file);

    } else if (file.type === "application/pdf") {

        const reader = new FileReader();
        reader.onload = async function(e) {

            const typedArray = new Uint8Array(e.target.result);
            const pdf = await pdfjsLib.getDocument(typedArray).promise;

            let text = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const strings = content.items.map(item => item.str);
                text += strings.join(" ") + " ";
            }

            extractedText = text;
            statusText.textContent = "PDF loaded successfully!";
        };

        reader.readAsArrayBuffer(file);

    } else {
        statusText.textContent = "Unsupported file type.";
    }
}

// Convert button
convertBtn.addEventListener("click", async () => {

    if (!extractedText.trim()) {
        alert("Upload a file first.");
        return;
    }

    statusText.textContent = "Converting...";
    convertBtn.disabled = true;

    try {

        const response = await fetch("https://l27rlq0uvi.execute-api.ap-south-1.amazonaws.com/narrate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: extractedText
            })
        });

        if (!response.ok) {
            throw new Error("API error");
        }

        const blob = await response.blob();
        const audioURL = URL.createObjectURL(blob);

        audioPlayer.src = audioURL;
        audioPlayer.style.display = "block";

        downloadLink.href = audioURL;
        downloadLink.download = "polly-audio.mp3";
        downloadLink.style.display = "inline-block";
        downloadLink.textContent = "Download MP3";

        statusText.textContent = "Conversion completed!";

    } catch (error) {
        console.error(error);
        alert("Error converting text.");
        statusText.textContent = "Error occurred.";
    }

    convertBtn.disabled = false;
});