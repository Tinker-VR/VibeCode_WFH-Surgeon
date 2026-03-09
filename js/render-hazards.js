/**
 * WFH SURGEON — Render: All 7 Hazard Types + Desk-Level Elements
 */

function drawHazards() {
    if (!GAME.hazard) return;
    const M = MONITOR;
    const mcx = M.sx + M.sw/2, mcy = M.sy + M.sh/2;
    const now = performance.now();

    // === CAT HAZARD: Fills the WHOLE SCREEN ===
    if (GAME.hazard === 'cat') {
        ctx.fillStyle = 'rgba(0,0,0,0.65)';
        ctx.fillRect(0, 0, CW, CH);

        const cx2 = CW/2, cy2 = CH/2 - 20;
        // F. Body bobbing
        const catBob = Math.sin(now/300)*8;
        const cy2b = cy2 + catBob;
        const shrinkFactor = GAME.catFlashTimer > 0 ? 1 - 0.15 * (GAME.catFlashTimer / 300) : 1;
        const s = 2.2 * shrinkFactor;
        // Cat body
        drawShadowRoundRect(cx2-85*s, cy2b-65*s, 170*s, 140*s, 75*s, '#FFA000', '#E65100', 4);
        // Ears
        ctx.fillStyle='#FFA000'; ctx.strokeStyle='#E65100'; ctx.lineWidth=4;
        ctx.beginPath(); ctx.moveTo(cx2-65*s,cy2b-45*s); ctx.lineTo(cx2-90*s,cy2b-120*s); ctx.lineTo(cx2-28*s,cy2b-55*s); ctx.fill(); ctx.stroke();
        ctx.fillStyle='#FFCDD2'; ctx.beginPath(); ctx.moveTo(cx2-58*s,cy2b-50*s); ctx.lineTo(cx2-80*s,cy2b-105*s); ctx.lineTo(cx2-35*s,cy2b-56*s); ctx.fill();
        ctx.fillStyle='#FFA000'; ctx.strokeStyle='#E65100';
        ctx.beginPath(); ctx.moveTo(cx2+65*s,cy2b-45*s); ctx.lineTo(cx2+90*s,cy2b-120*s); ctx.lineTo(cx2+28*s,cy2b-55*s); ctx.fill(); ctx.stroke();
        ctx.fillStyle='#FFCDD2'; ctx.beginPath(); ctx.moveTo(cx2+58*s,cy2b-50*s); ctx.lineTo(cx2+80*s,cy2b-105*s); ctx.lineTo(cx2+35*s,cy2b-56*s); ctx.fill();
        // Eyes (whites)
        ctx.fillStyle='#FFF'; ctx.strokeStyle='#000'; ctx.lineWidth=3;
        const leyX = cx2-30*s, leyY = cy2b-15*s;
        const reyX = cx2+30*s, reyY = cy2b-15*s;
        ctx.beginPath(); ctx.ellipse(leyX,leyY,22*s,30*s,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(reyX,reyY,22*s,30*s,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
        // F. Cursor-tracking pupils
        const lAngle = Math.atan2(GAME.mouseY - leyY, GAME.mouseX - leyX);
        const rAngle = Math.atan2(GAME.mouseY - reyY, GAME.mouseX - reyX);
        const pupilOff = 6;
        ctx.fillStyle='#000';
        ctx.beginPath(); ctx.ellipse(leyX + Math.cos(lAngle)*pupilOff, leyY + Math.sin(lAngle)*pupilOff, 9*s, 22*s, 0, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(reyX + Math.cos(rAngle)*pupilOff, reyY + Math.sin(rAngle)*pupilOff, 9*s, 22*s, 0, 0, Math.PI*2); ctx.fill();
        // Eye highlights
        ctx.fillStyle='#FFF';
        ctx.beginPath(); ctx.arc(cx2-36*s, cy2b-24*s, 5*s, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(cx2+24*s, cy2b-24*s, 5*s, 0, Math.PI*2); ctx.fill();
        // Nose & mouth
        ctx.fillStyle='#F48FB1'; ctx.beginPath(); ctx.moveTo(cx2-12*s,cy2b+16*s); ctx.lineTo(cx2+12*s,cy2b+16*s); ctx.lineTo(cx2,cy2b+28*s); ctx.fill();
        ctx.strokeStyle='#000'; ctx.lineWidth=3;
        ctx.beginPath(); ctx.arc(cx2-14*s,cy2b+32*s,14*s,0,Math.PI); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx2+14*s,cy2b+32*s,14*s,0,Math.PI); ctx.stroke();
        // Whiskers
        ctx.strokeStyle='#FFF'; ctx.lineWidth=3;
        [-1,1].forEach(dir => {
            ctx.beginPath(); ctx.moveTo(cx2+dir*25*s,cy2b+18*s); ctx.lineTo(cx2+dir*95*s,cy2b+8*s); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx2+dir*25*s,cy2b+26*s); ctx.lineTo(cx2+dir*100*s,cy2b+26*s); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx2+dir*25*s,cy2b+34*s); ctx.lineTo(cx2+dir*95*s,cy2b+44*s); ctx.stroke();
        });
        // Paws
        drawShadowRoundRect(cx2-70*s,cy2b+55*s,55*s,32*s,22*s,'#FFA000','#E65100',3);
        drawShadowRoundRect(cx2+15*s,cy2b+55*s,55*s,32*s,22*s,'#FFA000','#E65100',3);
        // SCREAMING text
        let pulse = 1+Math.sin(now/120)*0.08;
        ctx.save(); ctx.translate(cx2, 55); ctx.scale(pulse, pulse);
        drawText(`\uD83D\uDC31 SHOO THE CAT!! Click ${3-GAME.catClicks} more!! \uD83D\uDC31`, 0, 0, 42, '#FFA000', 'center', '#000', 6);
        ctx.restore();
        ctx.save(); ctx.translate(cx2, CH - 80); ctx.scale(pulse, pulse);
        drawText('YOUR CAT IS ON THE DESK AGAIN!!!', 0, 0, 28, '#FF6F00', 'center', '#000', 4);
        ctx.restore();

        // Click flash overlay
        if (GAME.catFlashTimer > 0) {
            ctx.fillStyle = `rgba(255,255,255,${GAME.catFlashTimer/300 * 0.4})`;
            ctx.fillRect(0, 0, CW, CH);
        }
        // Star burst particles
        GAME.catStars.forEach(star => {
            const alpha = star.life / star.maxLife;
            ctx.globalAlpha = alpha;
            drawText('\u2B50', star.x, star.y, star.size, '#FFD54F', 'center');
            ctx.globalAlpha = 1;
        });
        return;
    }

    // === ALL OTHER HAZARDS: Clipped to monitor ===
    ctx.save();
    ctx.beginPath(); ctx.roundRectPolyfill(M.sx, M.sy, M.sw, M.sh, 4); ctx.clip();
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(M.sx, M.sy, M.sw, M.sh);

    if (GAME.hazard === 'ad') {
        const {x,y,w,h} = GAME.adPos;
        const ad = CHEEKY_ADS[GAME.adIndex];
        const flashColor = Math.floor(now/200) % 2 === 0 ? ad.color : '#FFD600';
        // B. Thicker/flashier outer glow border
        const glowFlash = Math.floor(now/100) % 2 === 0 ? flashColor : '#FF00FF';
        drawShadowRoundRect(x-8, y-8, w+16, h+16, 18, glowFlash, null);
        drawShadowRoundRect(x-4, y-4, w+8, h+8, 16, flashColor, null);
        drawShadowRoundRect(x, y, w, h, 14, ad.bg, '#333', 3);
        // Header bar
        drawRoundRect(x, y, w, 50, 14, ad.color, null); drawRect(x, y+20, w, 30, ad.color);

        // Single X button — randomized corner position + B. wiggle/shake
        const corner = GAME.adCloseCorner;
        let closeX, closeY;
        if (corner === 0)      { closeX = x + 8;       closeY = y + 8; }
        else if (corner === 1) { closeX = x + w - 58;  closeY = y + 8; }
        else if (corner === 2) { closeX = x + 8;       closeY = y + h - 58; }
        else                   { closeX = x + w - 58;  closeY = y + h - 58; }
        const wigX = Math.sin(now/80)*4;
        const wigY = Math.cos(now/100)*3;
        drawRoundRect(closeX + wigX, closeY + wigY, 50, 50, 8, '#424242', null);
        ctx.strokeStyle = '#FFF'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(closeX+14+wigX, closeY+14+wigY); ctx.lineTo(closeX+36+wigX, closeY+36+wigY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(closeX+36+wigX, closeY+14+wigY); ctx.lineTo(closeX+14+wigX, closeY+36+wigY); ctx.stroke();

        // Ad content
        const headPulse = 1 + Math.sin(now/150)*0.04;
        ctx.save(); ctx.translate(x+w/2, y+80); ctx.scale(headPulse, headPulse);
        drawText(ad.headline, 0, 0, 34, ad.color, 'center', null, 0, 'bold');
        ctx.restore();
        drawText(ad.sub, x+w/2, y+h*0.38, 22, '#555', 'center', null, 0, 'normal');
        // B. Bigger CTA button
        const ctaW = 380, ctaH = 70;
        const ctaPulse = 1 + Math.sin(now/200)*0.05;
        ctx.save(); ctx.translate(x+w/2, y+h*0.55); ctx.scale(ctaPulse, ctaPulse);
        drawRoundRect(-ctaW/2, -ctaH/2, ctaW, ctaH, ctaH/2, ad.color, null);
        drawText(ad.cta, 0, 0, 28, '#FFF', 'center');
        ctx.restore();
        // A. Bump small text to 16px minimum
        drawText('*Not responsible for any surgical outcomes', x+w/2, y+h*0.72, 16, '#BBB', 'center', null, 0, 'normal');
        drawText('Find the X or press ESC to dismiss', x+w/2, y+h-18, 16, '#999', 'center', null, 0, 'normal');
        // B. Fake countdown timer
        drawText('Ad closes in ' + (Math.floor(now/1000) % 99 + 1) + '...', x+w/2, y+h-40, 16, '#AAA', 'center', null, 0, 'normal');
        // B. More sparkle emojis (10 instead of 5)
        for (let sp = 0; sp < 10; sp++) {
            const spx = x + 30 + Math.random()*(w-60);
            const spy = y + 60 + Math.random()*(h-100);
            const spEmoji = ['\u2728','\uD83D\uDCAB','\u2B50','\uD83C\uDF89','\uD83D\uDD25','\uD83C\uDF1F','\uD83D\uDCA5','\u2764\uFE0F','\uD83C\uDF08','\uD83D\uDE80'][sp];
            drawText(spEmoji, spx, spy, 16+Math.random()*8, '#FFF', 'center');
        }
    }
    else if (GAME.hazard === 'coffee') {
        // E. Use coffeeWiping-aware progress
        const s = Math.max(0, 1-(GAME.coffeeWipe/3000));
        // Multiple organic splat blobs
        const browns = ['#3E2723', '#4E342E', '#5D4037', '#6D4C41'];
        const splats = [
            {ox: 0, oy: 0, r: 0.4}, {ox: -0.25, oy: 0.15, r: 0.22}, {ox: 0.22, oy: -0.12, r: 0.25},
            {ox: -0.12, oy: -0.22, r: 0.18}, {ox: 0.18, oy: 0.22, r: 0.20}, {ox: -0.3, oy: -0.08, r: 0.15},
            {ox: 0.28, oy: 0.05, r: 0.17}, {ox: -0.05, oy: 0.3, r: 0.14}, {ox: 0.1, oy: -0.28, r: 0.16},
            {ox: -0.18, oy: 0.25, r: 0.12}, {ox: 0.32, oy: -0.2, r: 0.13}, {ox: -0.08, oy: -0.32, r: 0.11}
        ];
        splats.forEach((sp, i) => {
            ctx.fillStyle = browns[i % browns.length];
            const bx = mcx + sp.ox * M.sw * s;
            const by = mcy + sp.oy * M.sh * s;
            const br = sp.r * M.sw * 0.5 * s;
            if (br > 2) {
                ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI*2); ctx.fill();
            }
        });
        // Splash droplets radiating outward
        for (let d = 0; d < 8; d++) {
            const angle = (d / 8) * Math.PI * 2 + 0.3;
            const dist = M.sw * 0.32 * s;
            const dx = mcx + Math.cos(angle) * dist;
            const dy = mcy + Math.sin(angle) * dist;
            ctx.fillStyle = browns[d % browns.length];
            ctx.beginPath(); ctx.arc(dx, dy, 8 * s, 0, Math.PI*2); ctx.fill();
        }
        // Drip effect
        ctx.fillStyle = '#5D4037';
        for (let d = 0; d < 4; d++) {
            const dx = mcx + (d-1.5)*80;
            const dripLen = Math.sin(now/400 + d)*20 + 30;
            ctx.beginPath(); ctx.moveTo(dx-8, mcy+M.sw*0.15*s); ctx.quadraticCurveTo(dx, mcy+M.sw*0.15*s+dripLen*s, dx+8, mcy+M.sw*0.15*s); ctx.fill();
        }
        let pulse2 = 1+Math.sin(now/120)*0.08;
        ctx.save(); ctx.translate(mcx, M.sy + 28); ctx.scale(pulse2, pulse2);
        drawText('\u2615 COFFEE SPILL!! WIPE IT UP!! \u2615', 0, 0, 38, '#D7CCC8', 'center', '#000', 6);
        ctx.restore();
        // E. Cloth/rag at cursor when wiping
        if (GAME.coffeeWiping) {
            ctx.save();
            ctx.translate(GAME.mouseX, GAME.mouseY);
            ctx.rotate(Math.sin(now/100)*0.1);
            drawRoundRect(-20, -12, 40, 24, 6, '#42A5F5', '#1E88E5', 2);
            // White texture lines
            ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1;
            for (let tl = 0; tl < 4; tl++) {
                ctx.beginPath(); ctx.moveTo(-16, -8+tl*6); ctx.lineTo(16, -8+tl*6); ctx.stroke();
            }
            ctx.restore();
        }
    }
    else if (GAME.hazard === 'battery') {
        // C. Dimmer effect stays inside monitor clip
        const dimAlpha = GAME.dimLevel || 0;
        if (dimAlpha > 0) {
            ctx.fillStyle = `rgba(0,0,0,${dimAlpha})`;
            ctx.fillRect(M.sx, M.sy, M.sw, M.sh);
        }
    }
    else if (GAME.hazard === 'lag') {
        // D. Scan lines and glitch text drawn inside monitor clip
        for (let i = 0; i < 120; i++) {
            const sx2 = M.sx + Math.random()*M.sw;
            const sy2 = M.sy + Math.random()*M.sh;
            const sw2 = Math.random()*80+15;
            ctx.fillStyle = `rgba(255,255,255,${Math.random()*0.2})`;
            ctx.fillRect(sx2, sy2, sw2, 2);
        }
        for (let t = 0; t < 4; t++) {
            const tearY = M.sy + (now/3 + t*120) % M.sh;
            ctx.fillStyle = 'rgba(0,255,255,0.05)';
            ctx.fillRect(M.sx, tearY, M.sw, 4);
        }
        let pulse4 = 1+Math.sin(now/120)*0.08;
        ctx.save(); ctx.translate(mcx, mcy-20); ctx.scale(pulse4, pulse4);
        drawText(`\uD83D\uDCF6 WI-FI IS DOWN!!!`, 0, 0, 52, COLORS.red, 'center', '#000', 8);
        ctx.restore();
        drawText(`SMASH THE ROUTER!! ${3-GAME.routerClicks} more clicks!`, mcx, mcy+35, 28, '#CCC', 'center', null, 0, 'normal');
        // D. Fist rendering for smash animation
        if (GAME.routerSmashAnim > 0) {
            drawText('\uD83D\uDC4A', mcx, mcy + 60, 60, '#FFF', 'center');
        }
    }
    else if (GAME.hazard === 'kbbreak') {
        drawText('\u2328\uFE0F', mcx, mcy - 30, 80, '#FFF', 'center');
        let pulse5 = 1+Math.sin(now/120)*0.08;
        ctx.save(); ctx.translate(mcx, mcy+40); ctx.scale(pulse5, pulse5);
        drawText('KEYBOARD DISCONNECTED!!', 0, 0, 40, COLORS.red, 'center', '#000', 6);
        ctx.restore();
        const fixedCount = GAME.kbScrews.filter(s => s).length;
        drawText(`Fix the screws! ${fixedCount}/4 done`, mcx, mcy+85, 24, '#CCC', 'center', null, 0, 'normal');
        if (!GAME.hasScrewdriver) drawText('Pick up the screwdriver from the desk!', mcx, mcy+115, 18, COLORS.gold, 'center', null, 0, 'normal');
    }
    else if (GAME.hazard === 'malware') {
        // H. Reduced glitch rectangles from 60 to 20
        for (let i = 0; i < 20; i++) {
            const gx = M.sx + Math.random()*M.sw;
            const gy = M.sy + Math.random()*M.sh;
            ctx.fillStyle = `rgba(${Math.random()>0.5?255:0},${Math.random()*255|0},${Math.random()>0.5?255:0},${Math.random()*0.3})`;
            ctx.fillRect(gx, gy, Math.random()*40+5, Math.random()*4+1);
        }
        const popW = 500, popH = 280;
        const popX = mcx - popW/2, popY = mcy - popH/2;
        // H. Flashing border on popup window
        const popBorderColor = Math.floor(now/150) % 2 === 0 ? '#FF4444' : '#FFFF00';
        drawShadowRoundRect(popX, popY, popW, popH, 14, '#1A1A2E', popBorderColor, 3);
        drawRoundRect(popX, popY, popW, 45, 14, '#C62828', null); drawRect(popX, popY+20, popW, 25, '#C62828');
        drawText('\u26A0\uFE0F MALWARE DETECTED \u26A0\uFE0F', popX+popW/2, popY+22, 22, '#FFF', 'center');
        drawText('\uD83E\uDDA0 SYSTEM INFECTED \uD83E\uDDA0', popX+popW/2, popY+75, 32, '#FF4444', 'center');
        drawText(`Click all virus icons to clean! (${GAME.virusesClicked}/5)`, popX+popW/2, popY+115, 20, '#CCC', 'center', null, 0, 'normal');
        drawRoundRect(popX+40, popY+140, popW-80, 20, 10, '#333', null);
        const scanPct = GAME.virusesClicked / 5;
        if (scanPct > 0) drawRoundRect(popX+43, popY+143, (popW-86)*scanPct, 14, 7, COLORS.green, null);
        // H. Bump SCANNING text to 16px
        drawText('SCANNING...', popX+popW/2, popY+150, 16, '#AAA', 'center', null, 0, 'normal');
        // Virus icons — H. reduced pulse amplitude, single smaller glow
        GAME.virusIcons.forEach(v => {
            if (!v.alive) return;
            // H. Reduced pulse from 0.15 to 0.08
            const vPulse = 1 + Math.sin(now/200 + v.x)*0.08;
            const vRot = (now/1000 + v.x * 0.01) % (Math.PI * 2);
            ctx.save(); ctx.translate(v.x, v.y); ctx.rotate(vRot); ctx.scale(vPulse, vPulse);
            drawText('\uD83E\uDDA0', 0, 0, 195, '#FFF', 'center');
            ctx.restore();
            // H. Single glow at ~100px, lower alpha ~0.10 (removed 165px outer glow)
            ctx.fillStyle = 'rgba(255,0,0,0.10)';
            ctx.beginPath(); ctx.arc(v.x, v.y, 100, 0, Math.PI*2); ctx.fill();
        });
    }

    ctx.restore();

    // === DESK-LEVEL hazard elements (outside monitor clip) ===
    if (GAME.hazard === 'battery') {
        // C. Battery icon and warning text drawn OUTSIDE monitor clip
        const bw = 180, bh = 90;
        drawRoundRect(mcx-bw/2, mcy-bh/2-20, bw, bh, 14, '#333', '#FF4444', 4);
        drawRect(mcx+bw/2, mcy-22-20, 14, 44, '#FF4444');
        const flashPct = (Math.sin(now/200)+1)/2 * 0.3;
        drawRoundRect(mcx-bw/2+8, mcy-bh/2+8-20, (bw-16)*flashPct, bh-16, 10, COLORS.red, null);
        ctx.fillStyle = COLORS.red;
        ctx.beginPath();
        ctx.moveTo(mcx-10, mcy-bh/2+14-20); ctx.lineTo(mcx+15, mcy-10-20);
        ctx.lineTo(mcx+2, mcy-8-20); ctx.lineTo(mcx+20, mcy+bh/2-18-20);
        ctx.lineTo(mcx-5, mcy+2-20); ctx.lineTo(mcx+8, mcy+4-20);
        ctx.closePath(); ctx.fill();
        let pulse3 = 1+Math.sin(now/120)*0.08;
        ctx.save(); ctx.translate(mcx, mcy+65); ctx.scale(pulse3, pulse3);
        drawText('\uD83D\uDD0B BATTERY DYING!! PLUG IN NOW!! \u26A1', 0, 0, 36, COLORS.red, 'center', '#000', 6);
        ctx.restore();
        drawText('Drag the charger to the outlet!', mcx, mcy+100, 22, '#CCC', 'center', null, 0, 'normal');

        // C. Plug and socket at desk level with wiggle
        const plugWig = Math.sin(now/150)*3;
        const sockWig = Math.sin(now/150 + 1)*3;
        const plugX = GAME.batteryDrag ? GAME.mouseX : 80;
        const plugY = GAME.batteryDrag ? GAME.mouseY : DESK_Y + 80 + plugWig;
        const sockX = CW - 130;
        const sockY = DESK_Y + 80 + sockWig;

        // C. Cord — thick black bezier from plug to socket (left to right)
        ctx.lineWidth = 22; ctx.strokeStyle = '#1A1A1A';
        ctx.beginPath(); ctx.moveTo(plugX, plugY);
        ctx.bezierCurveTo(plugX + (sockX - plugX)*0.33, plugY + 80, plugX + (sockX - plugX)*0.66, sockY + 80, sockX, sockY);
        ctx.stroke();
        ctx.lineWidth = 18; ctx.strokeStyle = '#333';
        ctx.beginPath(); ctx.moveTo(plugX, plugY);
        ctx.bezierCurveTo(plugX + (sockX - plugX)*0.33, plugY + 80, plugX + (sockX - plugX)*0.66, sockY + 80, sockX, sockY);
        ctx.stroke();

        // C. Outlet/socket — wall plate with 2 vertical slots and ground hole
        drawShadowRoundRect(sockX-60, sockY-60, 120, 120, 12, '#FAFAFA', '#B0BEC5', 3);
        drawRoundRect(sockX-50, sockY-50, 100, 100, 8, '#F5F5F5', '#E0E0E0', 1);
        // Two vertical slots
        drawRoundRect(sockX-18, sockY-20, 14, 36, 4, '#1A1A1A', null);
        drawRoundRect(sockX+4, sockY-20, 14, 36, 4, '#1A1A1A', null);
        // Ground hole
        ctx.fillStyle = '#1A1A1A';
        ctx.beginPath(); ctx.arc(sockX, sockY+28, 8, 0, Math.PI*2); ctx.fill();
        drawText('\u26A1', sockX, sockY+48, 22, '#888', 'center');

        // C. Plug — thick rectangle body with 2 prongs sticking UP, grip ridges
        drawShadowRoundRect(plugX-40, plugY-30, 80, 60, 10, '#333', '#1A1A1A', 3);
        // Grip ridges on plug body
        ctx.strokeStyle = '#555'; ctx.lineWidth = 2;
        for (let gr = 0; gr < 4; gr++) {
            ctx.beginPath(); ctx.moveTo(plugX-28, plugY-18+gr*12); ctx.lineTo(plugX+28, plugY-18+gr*12); ctx.stroke();
        }
        // Prongs sticking UP
        drawRoundRect(plugX-18, plugY-65, 12, 38, 3, '#CCC', '#AAA', 1);
        drawRoundRect(plugX+6, plugY-65, 12, 38, 3, '#CCC', '#AAA', 1);
    }

    if (GAME.hazard === 'kbbreak') {
        // Screw indicators at keyboard corners
        const screws = getKBScrewPositions();
        screws.forEach((sp, idx) => {
            const fixed = GAME.kbScrews[idx];
            const screwColor = fixed ? COLORS.green : '#FF4444';
            // G. Pulsing glow behind unfixed screws
            if (!fixed) {
                const glowAlpha = 0.3 + Math.sin(now/200)*0.2;
                ctx.fillStyle = `rgba(255,100,0,${glowAlpha})`;
                ctx.beginPath(); ctx.arc(sp.x, sp.y, 50, 0, Math.PI*2); ctx.fill();
            }
            const screwBg = fixed ? 'rgba(0,230,118,0.3)' : 'rgba(255,68,68,0.3)';
            // Bigger glow
            ctx.fillStyle = screwBg;
            ctx.beginPath(); ctx.arc(sp.x, sp.y, 40, 0, Math.PI*2); ctx.fill();
            // Bigger screw head
            ctx.fillStyle = fixed ? '#4CAF50' : '#888';
            ctx.beginPath(); ctx.arc(sp.x, sp.y, 22, 0, Math.PI*2); ctx.fill();
            ctx.strokeStyle = screwColor; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(sp.x, sp.y, 22, 0, Math.PI*2); ctx.stroke();
            // Cross slot
            ctx.strokeStyle = fixed ? '#1B5E20' : '#444'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(sp.x-10, sp.y); ctx.lineTo(sp.x+10, sp.y); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(sp.x, sp.y-10); ctx.lineTo(sp.x, sp.y+10); ctx.stroke();
            if (fixed) drawText('\u2713', sp.x, sp.y-28, 28, COLORS.green, 'center');
        });

        // G. Screwdriver — 3X BIGGER (comically large)
        const sdx = GAME.hasScrewdriver ? GAME.mouseX : GAME.screwdriverPos.x;
        const sdy = GAME.hasScrewdriver ? GAME.mouseY : GAME.screwdriverPos.y;
        ctx.save();
        ctx.translate(sdx, sdy);
        ctx.rotate(GAME.hasScrewdriver ? -0.3 : 0.5);
        // G. Glow when held
        if (GAME.hasScrewdriver) {
            ctx.shadowColor = '#FFA000';
            ctx.shadowBlur = 25;
        }
        // Handle — 126x216 (3x scale)
        drawRoundRect(-63, -225, 126, 216, 27, '#FFA000', '#E65100', 3);
        // Grip ridges
        ctx.strokeStyle = '#E65100'; ctx.lineWidth = 4;
        for (let gr = 0; gr < 8; gr++) {
            ctx.beginPath(); ctx.moveTo(-45, -195+gr*26); ctx.lineTo(45, -195+gr*26); ctx.stroke();
        }
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(-54, -216, 36, 198);
        // Shaft — 45x240 (3x scale)
        ctx.fillStyle = '#B0BEC5'; ctx.fillRect(-22.5, -9, 45, 240);
        // Tip — wider (3x scale)
        ctx.fillStyle = '#78909C';
        ctx.beginPath(); ctx.moveTo(-27, 231); ctx.lineTo(27, 231); ctx.lineTo(15, 291); ctx.lineTo(-15, 291); ctx.fill();
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.restore();
        if (!GAME.hasScrewdriver) {
            // G. Proportionally positioned hint text for larger screwdriver
            drawText('\uD83D\uDD27 GRAB ME!', GAME.screwdriverPos.x, GAME.screwdriverPos.y - 240, 28, COLORS.gold, 'center');
        }
    }
}
