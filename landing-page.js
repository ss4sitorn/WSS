document.addEventListener('DOMContentLoaded', () => {
    // Create basic style
    const css = `
        .lp-container{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f7fafc;font-family:system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial}
        .lp-card{max-width:720px;background:#fff;padding:28px;border-radius:12px;box-shadow:0 6px 18px rgba(15,23,42,0.08);text-align:left}
        .lp-title{margin:0 0 8px;font-size:22px;color:#0f172a}
        .lp-desc{margin:0 0 18px;color:#334155;line-height:1.45}
        .lp-actions{display:flex;gap:12px;align-items:center}
        .lp-start{background:#0369a1;color:#fff;border:none;padding:10px 16px;border-radius:8px;font-weight:600;cursor:pointer}
        .lp-start:focus{outline:2px solid #93c5fd;outline-offset:2px}
        .lp-info{color:#475569;font-size:13px}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Root container
    const container = document.createElement('div');
    container.className = 'lp-container';

    const card = document.createElement('section');
    card.className = 'lp-card';
    card.setAttribute('role', 'region');
    card.setAttribute('aria-labelledby', 'lp-title');

    const title = document.createElement('h1');
    title.id = 'lp-title';
    title.className = 'lp-title';
    title.textContent = 'Assessment Overview';

    const desc = document.createElement('p');
    desc.className = 'lp-desc';
    desc.textContent = 'You will be asked a series of questions designed to evaluate relevant skills. The assessment is timed and cannot be paused. Please ensure you have a stable connection before starting.';

    const actions = document.createElement('div');
    actions.className = 'lp-actions';

    const startBtn = document.createElement('button');
    startBtn.className = 'lp-start';
    startBtn.type = 'button';
    startBtn.textContent = 'Start Assessment';
    startBtn.addEventListener('click', () => {
        // record start timestamp and redirect
        try {
            sessionStorage.setItem('assessmentStart', new Date().toISOString());
        } catch (e) {
            // ignore storage errors
        }
        window.location.href = './assessment-config.js';     });

    const info = document.createElement('div');
    info.className = 'lp-info';
    info.textContent = 'Estimated time: 20–30 minutes • Make sure sound and browser notifications are enabled if required.';

    actions.appendChild(startBtn);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(actions);
    card.appendChild(info);
    container.appendChild(card);

    // Append to a specific mount if exists, otherwise body
    const mount = document.getElementById('landing-root') || document.body;
    // If using body, clear minimal content to center the card
    if (mount === document.body) {
        document.body.innerHTML = '';
    }
    mount.appendChild(container);
});