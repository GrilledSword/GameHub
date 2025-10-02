/**
 * Az előtér (fák, fű, virágok) dinamikus generálása és rétegezése.
 */
export function generateForeground() {
    const container = document.getElementById('foreground-elements');
    if (!container) return;

    const groundPoints = [
        [-10, 780], [100, 740], [250, 790], [400, 770], [600, 730],
        [800, 760], [1000, 790], [1200, 740], [1410, 790]
    ];

    const getGroundY = (x) => {
        for (let i = 0; i < groundPoints.length - 1; i++) {
            const p1 = groundPoints[i];
            const p2 = groundPoints[i + 1];
            if (x >= p1[0] && x <= p2[0]) {
                return p1[1] + ((x - p1[0]) * (p2[1] - p1[1])) / (p2[0] - p1[0]);
            }
        }
        return 800;
    };

    let allObjects = [];
    const svgWidth = 1400;

    const objectDefinitions = [
        { type: 'bush', d: 'M300 780 C 280 750, 340 750, 320 780 Z', y: getGroundY(300) },
        { type: 'bush', d: 'M900 790 C 880 760, 940 760, 920 790 Z', y: getGroundY(900) },
        { type: 'bush', d: 'M1300 780 C 1280 750, 1340 750, 1320 780 Z', y: getGroundY(1300) },
        { type: 'rock', d: 'M850,740 L820,790 h60 Z', y: getGroundY(835) + 30 },
        { type: 'rock', d: 'M50,800v-10 c0,-10 10,-10 20,-5 s15,10 25,10 s15,-10 25,-10 v15z', y: getGroundY(80) + 10 },
        { type: 'tree', class: 'tree-sway', d: 'M180,650 L150,770 h60 Z M180,620 L160,740 h40 Z', y: getGroundY(180) + 20 },
        { type: 'tree', class: 'tree-sway', d: 'M230,670 L200,790 h60 Z M230,650 L210,760 h40 Z', y: getGroundY(230) + 40 },
        { type: 'tree', class: 'tree-sway', d: 'M1130,640 L1100,760 h60 Z M1130,610 L1110,730 h40 Z', y: getGroundY(1130) + 10 },
        { type: 'tree', class: 'tree-sway', d: 'M1180,680 L1160,770 h40 Z M1180,660 L1170,740 h20 Z', y: getGroundY(1180) + 25 },
        { type: 'tree', class: 'tree-sway', style: 'animation-delay: -1.5s;', d: 'M730,690 L700,800 h60 Z M730,670 L710,780 h40 Z', y: getGroundY(730) + 50 },
    ];

    objectDefinitions.forEach(obj => {
        const fill = obj.type === 'rock' ? 'url(#rockGradient)' : obj.type === 'bush' ? 'url(#bushGradient)' : 'url(#treesNearGradient)';
        const shadowRx = obj.type === 'tree' ? 30 : 25;
        const shadowRy = obj.type === 'tree' ? 8 : 7;
        const cxMatch = obj.d.match(/M(\d+(\.\d+)?)/);
        const cx = cxMatch ? parseFloat(cxMatch[1]) : 0;
        const cy = obj.y;

        let html = `<g>`;
        html += `<ellipse cx="${cx}" cy="${cy}" rx="${shadowRx}" ry="${shadowRy}" fill="url(#softShadow)" />`;
        html += obj.class 
            ? `<g class="${obj.class}" style="${obj.style || ''}"><path d="${obj.d}" fill="${fill}"/></g>`
            : `<path d="${obj.d}" fill="${fill}"/>`;
        html += `</g>`;
        allObjects.push({ y: cy, html: html });
    });

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * svgWidth;
        const topY = getGroundY(x);
        const y = topY + Math.random() * (800 - topY);
        if (y > 802) continue;

        const height = 20 + Math.random() * 30;
        const bend = (Math.random() - 0.5) * 15;
        const d = `M ${x.toFixed(2)} ${y.toFixed(2)} q ${bend} -${height / 2} 0 -${height}`;
        const strokeWidth = (1.5 + Math.random()).toFixed(2);
        const animationDuration = (3 + Math.random() * 4).toFixed(2);
        const animationDelay = `-${(Math.random() * 5).toFixed(2)}s`;
        const style = `animation-duration: ${animationDuration}s; animation-delay: ${animationDelay};`;
        const html = `<path d="${d}" class="grass-blade" style="${style}" stroke="url(#grassGradient)" stroke-width="${strokeWidth}" fill="none"/>`;
        allObjects.push({ y: y, html: html });
    }

    for (let i = 0; i < 30; i++) {
        const x = Math.random() * svgWidth;
        const groundY = getGroundY(x);
        if (groundY > 802) continue;

        const stemHeight = 10 + Math.random() * 20;
        const y = groundY - 2;
        const flowerSize = 3 + Math.random() * 3;
        const colors = ['#f87171', '#fbbf24', '#a78bfa', '#f0f9ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const style = `transform-origin: ${x.toFixed(2)}px ${y.toFixed(2)}px; animation-duration: ${(6 + Math.random() * 5).toFixed(2)}s; animation-delay: -${(Math.random() * 8).toFixed(2)}s;`;

        const html = `
            <g>
                <ellipse cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" rx="4" ry="2" fill="url(#softShadow)" />
                <g class="flower-sway" style="${style}">
                    <line x1="${x.toFixed(2)}" y1="${y.toFixed(2)}" x2="${x.toFixed(2)}" y2="${(y - stemHeight).toFixed(2)}" stroke="#65a30d" stroke-width="1.5" />
                    <circle cx="${x.toFixed(2)}" cy="${(y - stemHeight).toFixed(2)}" r="${flowerSize.toFixed(2)}" fill="${color}" stroke="#000" stroke-opacity="0.2" stroke-width="0.5" />
                    <circle cx="${x.toFixed(2)}" cy="${(y - stemHeight).toFixed(2)}" r="${(flowerSize / 2.5).toFixed(2)}" fill="#fde047" />
                </g>
            </g>
        `;
        allObjects.push({ y: y, html: html });
    }

    allObjects.sort((a, b) => a.y - b.y);
    container.innerHTML = allObjects.map(obj => obj.html).join('');
}
