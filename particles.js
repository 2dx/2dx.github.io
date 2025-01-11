// パーティクルの設定
const particleConfig = {
    particles: {
        number: {
            value: 150,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#6495ED'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.7,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 120,
            color: '#6495ED',
            opacity: 0.5,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'bounce',
            bounce: true
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
};

// パーティクルの初期化関数
function initParticles() {
    particlesJS('particles-js', particleConfig);

    // パーティクルの色を更新（青色の範囲でランダム）
    let blueHue = 220;
    return setInterval(() => {
        if (!pJSDom || !pJSDom[0] || !pJSDom[0].pJS) return;

        const pJS = pJSDom[0].pJS;
        const particles = pJS.particles.array;

        particles.forEach(particle => {
            particle.color.value = `hsl(${220 + Math.random() * 20}, 85%, ${60 + Math.random() * 20}%)`;
        });

        // 線の色を更新
        const lineColor = `hsl(220, 85%, 75%)`;
        pJS.particles.line_linked.color = lineColor;
        pJS.particles.line_linked.color_rgb_line = pJS.fn.hexToRgb(lineColor);

        // キャンバスを再描画
        pJS.fn.particlesRefresh();
    }, 50);
}

// 初期化
let colorInterval = initParticles();

// リサイズイベントの処理
let resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    clearInterval(colorInterval);

    resizeTimeout = setTimeout(function () {
        // パーティクルを再初期化
        if (pJSDom && pJSDom.length) {
            pJSDom[0].pJS.fn.vendors.destroypJS();
            pJSDom = [];
        }
        colorInterval = initParticles();
    }, 250);
}); 