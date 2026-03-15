document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("photoUpload");
    const playerNameInput = document.getElementById("playerName");
    const generateBtn = document.getElementById("generateCardBtn");
    const downloadBtn = document.getElementById("downloadCardBtn");
    const canvas = document.getElementById("playerCardCanvas");
    const ctx = canvas.getContext("2d");

    if (!fileInput || !playerNameInput || !generateBtn || !downloadBtn || !canvas || !ctx) {
        console.error("Player card page elements missing.");
        return;
    }

    const assets = window.playerCardAssets || {};
    let uploadedImage = null;
    let currentCardData = null;

    const positions = ["ST", "LW", "RW", "CAM", "CM", "CDM", "LM", "RM", "CB", "LB", "RB", "GK"];
    const ratings = [78, 82, 84, 86, 88, 90, 92, 94, 96, 98];
    const cardTiers = ["GOLD", "SILVER", "ELITE", "SPECIAL"];

    const badgeImg = new Image();
    let badgeLoaded = false;

    badgeImg.onload = function () {
        badgeLoaded = true;
        redrawCurrentCard();
    };
    badgeImg.onerror = function () {
        console.warn("Badge image failed to load:", assets.badge);
    };

    if (assets.badge) badgeImg.src = assets.badge;

    function randomFrom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function randomStat(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function roundRect(x, y, w, h, r, fill = true, stroke = false) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();

        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    function fitImageContain(img, x, y, w, h) {
        const imgRatio = img.width / img.height;
        const boxRatio = w / h;

        let drawWidth, drawHeight, drawX, drawY;

        if (imgRatio > boxRatio) {
            drawWidth = w;
            drawHeight = w / imgRatio;
            drawX = x;
            drawY = y + (h - drawHeight) / 2;
        } else {
            drawHeight = h;
            drawWidth = h * imgRatio;
            drawX = x + (w - drawWidth) / 2;
            drawY = y;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }

    function getThemeByTier(tier) {
        switch (tier) {
            case "SILVER":
                return {
                    bgTop: "#e8edf3",
                    bgMid: "#b8c1ce",
                    bgBottom: "#7c8798",
                    stripe: "rgba(255,255,255,0.20)",
                    border1: "#d8dde5",
                    border2: "#8a95a6",
                    title: "#f8fbff",
                    titleStroke: "#5a6472",
                    rating: "#ffffff",
                    ratingStroke: "#4d5562",
                    statBox: "#6a7486",
                    statBorder: "#dce3ee",
                    statValue: "#ffffff",
                    tierColor: "#f4f7fb",
                    nameColor: "#ffffff",
                    nameStroke: "#46515f",
                    slogan: "#eef3fa",
                    glow: "rgba(255,255,255,0.18)",
                    frameGlow: "#ffffff"
                };
            case "ELITE":
                return {
                    bgTop: "#121212",
                    bgMid: "#1f1a12",
                    bgBottom: "#050505",
                    stripe: "rgba(255,190,60,0.18)",
                    border1: "#d6a329",
                    border2: "#ffe08a",
                    title: "#ffd76b",
                    titleStroke: "#3b2600",
                    rating: "#ffe08a",
                    ratingStroke: "#2c1d00",
                    statBox: "#111111",
                    statBorder: "#d6a329",
                    statValue: "#ffe08a",
                    tierColor: "#ffd76b",
                    nameColor: "#ffe08a",
                    nameStroke: "#2b1f00",
                    slogan: "#d6a329",
                    glow: "rgba(255,210,90,0.14)",
                    frameGlow: "#ffd200"
                };
            case "SPECIAL":
                return {
                    bgTop: "#ff5d00",
                    bgMid: "#7c1d95",
                    bgBottom: "#09163f",
                    stripe: "rgba(255,141,0,0.22)",
                    border1: "#ff6a00",
                    border2: "#ffd100",
                    title: "#ffcc00",
                    titleStroke: "#402000",
                    rating: "#ffd100",
                    ratingStroke: "#1b1200",
                    statBox: "#16254d",
                    statBorder: "#ff7b00",
                    statValue: "#ffe000",
                    tierColor: "#ffb300",
                    nameColor: "#ffe000",
                    nameStroke: "#2b1f00",
                    slogan: "#111111",
                    glow: "rgba(255,255,255,0.18)",
                    frameGlow: "#ffd200"
                };
            case "GOLD":
            default:
                return {
                    bgTop: "#ffd45a",
                    bgMid: "#ff9b2f",
                    bgBottom: "#c96a12",
                    stripe: "rgba(255,255,255,0.16)",
                    border1: "#ff9f1a",
                    border2: "#fff2b3",
                    title: "#fff5d1",
                    titleStroke: "#7b4b00",
                    rating: "#fff7d8",
                    ratingStroke: "#6b3f00",
                    statBox: "#9b5a14",
                    statBorder: "#ffe08a",
                    statValue: "#fff7d8",
                    tierColor: "#fff1b8",
                    nameColor: "#fff7d8",
                    nameStroke: "#6b3f00",
                    slogan: "#5a2e00",
                    glow: "rgba(255,255,255,0.15)",
                    frameGlow: "#ffe08a"
                };
        }
    }

    function drawBackground(theme) {
        const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        bg.addColorStop(0, theme.bgTop);
        bg.addColorStop(0.45, theme.bgMid);
        bg.addColorStop(1, theme.bgBottom);
        ctx.fillStyle = bg;
        roundRect(0, 0, canvas.width, canvas.height, 24);

        ctx.save();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = theme.stripe;
        ctx.lineWidth = 3;
        for (let i = -200; i < 700; i += 26) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + 230, canvas.height);
            ctx.stroke();
        }
        ctx.restore();

        const glow = ctx.createRadialGradient(210, 180, 40, 210, 180, 240);
        glow.addColorStop(0, theme.glow);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const bottom = ctx.createLinearGradient(0, 470, 0, canvas.height);
        bottom.addColorStop(0, "rgba(5,13,48,0)");
        bottom.addColorStop(1, "rgba(5,13,48,0.82)");
        ctx.fillStyle = bottom;
        ctx.fillRect(0, 430, canvas.width, 220);

        ctx.strokeStyle = theme.border1;
        ctx.lineWidth = 8;
        roundRect(8, 8, canvas.width - 16, canvas.height - 16, 22, false, true);

        ctx.strokeStyle = theme.border2;
        ctx.lineWidth = 2.5;
        roundRect(14, 14, canvas.width - 28, canvas.height - 28, 18, false, true);
    }

    function drawPhotoFrame(theme) {
        const frameX = 70;
        const frameY = 120;
        const frameW = 280;
        const frameH = 285;

        ctx.shadowColor = theme.frameGlow;
        ctx.shadowBlur = 18;
        ctx.fillStyle = theme.frameGlow;
        roundRect(frameX - 6, frameY - 6, frameW + 12, frameH + 12, 18);

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        roundRect(frameX, frameY, frameW, frameH, 16);

        if (uploadedImage) {
            ctx.save();
            roundRect(frameX + 4, frameY + 4, frameW - 8, frameH - 8, 14);
            ctx.clip();
            fitImageContain(uploadedImage, frameX + 8, frameY + 8, frameW - 16, frameH - 16);
            ctx.restore();
        } else {
            ctx.fillStyle = "#ececec";
            roundRect(frameX + 4, frameY + 4, frameW - 8, frameH - 8, 14);

            ctx.fillStyle = "#999";
            ctx.font = "bold 24px Arial";
            ctx.textAlign = "center";
            ctx.fillText("UPLOAD", canvas.width / 2, 255);
            ctx.fillText("YOUR PHOTO", canvas.width / 2, 285);
            ctx.textAlign = "start";
        }
    }

    function drawStatBox(x, y, label, value, theme) {
        ctx.fillStyle = theme.statBox;
        roundRect(x, y, 52, 58, 8);

        ctx.strokeStyle = theme.statBorder;
        ctx.lineWidth = 2;
        roundRect(x, y, 52, 58, 8, false, true);

        ctx.fillStyle = theme.statValue;
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(String(value), x + 26, y + 26);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px Arial";
        ctx.fillText(label, x + 26, y + 46);
        ctx.textAlign = "start";
    }

    function drawFallbackBadge() {
        ctx.fillStyle = "#0d2c6c";
        ctx.beginPath();
        ctx.arc(47, 47, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(47, 47, 24, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "#ff8a00";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.fillText("LT", 47, 53);
        ctx.textAlign = "start";
    }

    function drawCard(data) {
        const theme = getThemeByTier(data.tier);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBackground(theme);

        if (badgeLoaded) {
            ctx.drawImage(badgeImg, 18, 18, 58, 58);
        } else {
            drawFallbackBadge();
        }

        ctx.fillStyle = theme.title;
        ctx.font = "bold 22px Arial";
        ctx.textAlign = "center";
        ctx.strokeStyle = theme.titleStroke;
        ctx.lineWidth = 4;
        ctx.strokeText("LUTON TOWN FC", canvas.width / 2, 42);
        ctx.fillText("LUTON TOWN FC", canvas.width / 2, 42);

        ctx.fillStyle = theme.rating;
        ctx.font = "bold 72px Arial";
        ctx.strokeStyle = theme.ratingStroke;
        ctx.lineWidth = 5;
        ctx.textAlign = "right";
        ctx.strokeText(String(data.rating), 386, 74);
        ctx.fillText(String(data.rating), 386, 74);

        ctx.font = "bold 38px Arial";
        ctx.strokeText(data.position, 384, 112);
        ctx.fillText(data.position, 384, 112);

        drawPhotoFrame(theme);

        drawStatBox(18, 270, "PAC", data.pac, theme);
        drawStatBox(18, 338, "SHO", data.sho, theme);
        drawStatBox(18, 406, "PAS", data.pas, theme);

        drawStatBox(350, 270, "DRI", data.dri, theme);
        drawStatBox(350, 338, "DEF", data.def, theme);
        drawStatBox(350, 406, "PHY", data.phy, theme);

        ctx.fillStyle = theme.nameColor;
        ctx.strokeStyle = theme.nameStroke;
        ctx.lineWidth = 4;
        ctx.font = "bold 34px Arial";
        ctx.textAlign = "center";
        ctx.strokeText(data.name.toUpperCase(), canvas.width / 2, 535);
        ctx.fillText(data.name.toUpperCase(), canvas.width / 2, 535);

        ctx.font = "bold 28px Arial";
        ctx.strokeText(`#${data.number}`, canvas.width / 2, 575);
        ctx.fillText(`#${data.number}`, canvas.width / 2, 575);

        ctx.fillStyle = theme.tierColor;
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "left";
        ctx.fillText(data.tier, 18, 624);

        ctx.fillStyle = theme.slogan;
        ctx.font = "italic bold 18px Arial";
        ctx.textAlign = "right";
        ctx.fillText("The Hatters", 398, 624);

        ctx.textAlign = "start";
    }

    function buildRandomCardData() {
        const enteredName = playerNameInput.value.trim();
        return {
            name: enteredName || "Player",
            rating: randomFrom(ratings),
            position: randomFrom(positions),
            pac: randomStat(78, 99),
            sho: randomStat(75, 99),
            pas: randomStat(76, 99),
            dri: randomStat(77, 99),
            def: randomStat(60, 99),
            phy: randomStat(70, 99),
            number: randomStat(1, 99),
            tier: randomFrom(cardTiers)
        };
    }

    function redrawCurrentCard() {
        if (!currentCardData) {
            currentCardData = {
                name: "Alex",
                rating: 98,
                position: "LW",
                pac: 99,
                sho: 99,
                pas: 99,
                dri: 99,
                def: 99,
                phy: 99,
                number: 60,
                tier: "SPECIAL"
            };
        }
        drawCard(currentCardData);
    }

    function generateRandomCard() {
        currentCardData = buildRandomCardData();
        drawCard(currentCardData);
    }

    fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                uploadedImage = img;
                generateRandomCard();
            };
            img.onerror = function () {
                alert("Could not load the selected image.");
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    generateBtn.addEventListener("click", function () {
        generateRandomCard();
    });

    downloadBtn.addEventListener("click", function () {
        const link = document.createElement("a");
        link.download = "luton-player-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });

    redrawCurrentCard();
});