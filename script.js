document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    const imageInput = document.getElementById('imageInput');
    const topTextInput = document.getElementById('topText');
    const bottomTextInput = document.getElementById('bottomText');
    const textColorInput = document.getElementById('textColor');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    let currentImage = null;

    // 設定預設畫布大小
    canvas.width = 800;
    canvas.height = 600;

    // 當選擇圖片時載入圖片
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    currentImage = img;
                    generateMeme();
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 當文字輸入改變時重新生成迷因
    topTextInput.addEventListener('input', generateMeme);
    bottomTextInput.addEventListener('input', generateMeme);
    textColorInput.addEventListener('input', generateMeme);
    generateBtn.addEventListener('click', generateMeme);

    // 生成迷因的函數
    function generateMeme() {
        if (!currentImage) return;

        // 根據圖片比例調整畫布大小
        const ratio = Math.min(800 / currentImage.width, 600 / currentImage.height);
        canvas.width = currentImage.width * ratio;
        canvas.height = currentImage.height * ratio;

        // 清空畫布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 繪製圖片
        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);

        // 設定文字樣式
        const fontSize = canvas.width * 0.1;
        ctx.font = `bold ${fontSize}px Impact`;
        ctx.fillStyle = textColorInput.value;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = fontSize * 0.05;
        ctx.textAlign = 'center';

        // 繪製上方文字
        const topText = topTextInput.value.toUpperCase();
        ctx.textBaseline = 'top';
        ctx.strokeText(topText, canvas.width / 2, 10);
        ctx.fillText(topText, canvas.width / 2, 10);

        // 繪製下方文字
        const bottomText = bottomTextInput.value.toUpperCase();
        ctx.textBaseline = 'bottom';
        ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 10);
        ctx.fillText(bottomText, canvas.width / 2, canvas.height - 10);
    }

    // 下載功能
    downloadBtn.addEventListener('click', () => {
        if (!currentImage) return;
        
        // 創建一個暫時的連結來下載圖片
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});