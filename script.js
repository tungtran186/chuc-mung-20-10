/**
 * ==============================================================================
 * THIỆP CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10 - SCRIPT.JS
 * HTML5 + Canvas + Vanilla JavaScript (Không framework, không cần build)
 * ==============================================================================
 */

/* ==============================================================================
 * 1. CẤU HÌNH DỄ SỬA (CONFIG)
 * Bạn có thể tùy chỉnh nhanh thông tin thiệp tại đây mà không cần đụng vào code bên dưới.
 * ============================================================================== */
const CONFIG = {
  // Tên người nhận mặc định (nếu không có tham số ?to= trên URL)
  recipientName: "chị em",

  // Tên người hoặc đơn vị gửi thiệp
  senderName: "Những người luôn yêu quý bạn",

  // Câu chúc chính ({name} sẽ tự động thay bằng tên người nhận)
  wishMessage: "Chúc {name} ngày 20/10 hạnh phúc ngập tràn, luôn luôn xinh đẹp, rạng ngời và ngập tràn yêu thương!",

  // Các lời chúc nhỏ dạng thẻ (tags)
  subWishes: [
    "🌹 Trẻ Trung & Xinh Đẹp",
    "✨ Hạnh Phúc Ngập Tràn",
    "🌸 Vạn Sự Bình An",
    "💖 Luôn Được Trân Quý"
  ],

  // Bật / tắt các hiệu ứng đồ họa
  effects: {
    fallingPetals: true,     // Rơi cánh hoa hồng
    backgroundSparkles: true,// Đốm sáng lấp lánh nền
    mouseTrail: true,        // Vệt sáng khi rê chuột / chạm màn hình
    clickFireworks: true     // Pháo hoa nhỏ khi bấm chuột / chạm bất kỳ đâu
  },

  // Số lượng cánh hoa rơi (Tự động thích ứng máy tính / điện thoại để mượt mà)
  petalsCount: {
    desktop: 36,
    mobile: 12
  },

  // Đường dẫn file nhạc nền (để file nhạc vào thư mục audio/music.mp3)
  // Nếu chưa có file nhạc, web vẫn hoạt động trơn tru và tự ẩn nút nhạc!
  audioSrc: "audio/music.mp3"
};


/* ==============================================================================
 * 2. DANH SÁCH ẢNH KHOẢNH KHẮC ĐẸP (PHOTOS)
 * Thêm hoặc sửa ảnh của bạn ở đây.
 * Chép file ảnh vào thư mục 'images/' (ví dụ images/anh1.jpg).
 * Nếu mảng rỗng hoặc file ảnh chưa có, web sẽ hiển thị khung thiệp minh họa
 * tuyệt đẹp tự động, không bao giờ bị vỡ hay lỗi giao diện!
 * ============================================================================== */
const PHOTOS = [
  {
    src: "images/anh1.jpg",
    caption: "Nụ cười rạng rỡ như nắng mai 🌸",
    alt: "Khoảnh khắc nụ cười xinh đẹp ngày 20/10"
  },
  {
    src: "images/anh2.jpg",
    caption: "Tự tin, kiêu sa và tỏa sáng ✨",
    alt: "Vẻ đẹp tự tin và thanh lịch"
  },
  {
    src: "images/anh3.jpg",
    caption: "Hạnh phúc đong đầy từng phút giây 💖",
    alt: "Khoảnh khắc hạnh phúc ngập tràn"
  },
  {
    src: "images/anh4.jpg",
    caption: "Mãi tươi trẻ và ngát hương hoa 🌷",
    alt: "Bình an và rạng ngời yêu thương"
  }
];


/* ==============================================================================
 * 3. QUẢN LÝ THAM SỐ URL (CÁ NHÂN HÓA THIỆP GỬI BẠN BÈ)
 * Hỗ trợ các link dạng:
 * - index.html?to=Chị%20Lan
 * - index.html?to=Mẹ%20Yêu&from=Con%20Trai
 * - index.html?to=Em%20Hương&wish=Chúc%20em%20luôn%20xinh%20đẹp
 * ============================================================================== */
function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    to: params.get('to') || params.get('name') || '',
    from: params.get('from') || params.get('sender') || '',
    wish: params.get('wish') || ''
  };
}

// Cập nhật nội dung hiển thị dựa theo CONFIG và tham số URL
function applyPersonalizedData() {
  const urlParams = getUrlParams();
  
  // 1. Tên người nhận
  const recipient = (urlParams.to || CONFIG.recipientName).trim();
  const recipientEls = [
    document.getElementById('recipient-name'),
    document.getElementById('recipient-highlight')
  ];
  recipientEls.forEach(el => {
    if (el) el.textContent = recipient;
  });

  // 2. Tên người gửi
  const sender = (urlParams.from || CONFIG.senderName).trim();
  const senderEl = document.getElementById('sender-name');
  if (senderEl) {
    senderEl.textContent = sender;
  }

  // 3. Câu chúc (dựng bằng text node, không dùng innerHTML để tránh chèn mã qua URL)
  const wishTemplate = urlParams.wish || CONFIG.wishMessage;
  const wishEl = document.getElementById('wish-text');
  if (wishEl) {
    wishEl.textContent = '';
    const parts = `“${wishTemplate}”`.split('{name}');
    parts.forEach((part, i) => {
      wishEl.appendChild(document.createTextNode(part));
      if (i < parts.length - 1) {
        const nameSpan = document.createElement('span');
        nameSpan.textContent = recipient;
        wishEl.appendChild(nameSpan);
      }
    });
  }

  // 4. Các thẻ lời chúc nhỏ
  const tagsEl = document.querySelector('.tags-container');
  if (tagsEl && Array.isArray(CONFIG.subWishes) && CONFIG.subWishes.length > 0) {
    tagsEl.textContent = '';
    CONFIG.subWishes.forEach(text => {
      const pill = document.createElement('span');
      pill.className = 'tag-pill';
      pill.textContent = text;
      tagsEl.appendChild(pill);
    });
  }

  // Cập nhật tiêu đề trang
  document.title = `Chúc Mừng 20/10 Thân Gửi ${recipient} 🌸`;
}


/* ==============================================================================
 * 4. HỆ THỐNG CANVAS & HIỆU ỨNG HÌNH ẢNH CAO CẤP
 * - Canvas 1: Đốm sáng nền lấp lánh (Sparkles/Stars)
 * - Canvas 2: Cánh hoa hồng rơi lả tả (Falling Petals)
 * - Canvas 3: Vệt sáng chuột (Mouse Trail) & Pháo hoa nhỏ (Click Burst)
 *
 * Tối ưu cho điện thoại yếu:
 * - Mỗi loại hạt được vẽ sẵn MỘT lần thành "sprite" (canvas phụ), mỗi khung hình chỉ drawImage.
 *   Không dùng shadowBlur hay tạo gradient trong vòng lặp (rất nặng trên mobile).
 * - Vòng lặp chỉ chạy sau khi chữ chính đã hiện xong (startEffects), hạt xuất hiện tăng dần.
 * ============================================================================== */

// Kiểm tra chế độ giảm chuyển động của hệ điều hành
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hàm kiểm tra thiết bị màn hình nhỏ (mobile) động
function isMobileDevice() {
  return window.innerWidth <= 768;
}

// Kích thước vùng vẽ (CSS px) và mật độ điểm ảnh (điện thoại tối đa 1.5, máy tính tối đa 2)
const view = { w: window.innerWidth, h: window.innerHeight, dpr: 1 };

function measureView() {
  const box = document.querySelector('.canvas-container');
  view.w = (box && box.clientWidth) || window.innerWidth;
  view.h = (box && box.clientHeight) || window.innerHeight;
  view.dpr = Math.min(window.devicePixelRatio || 1, isMobileDevice() ? 1.5 : 2);
}

function resizeCanvas(canvas) {
  if (!canvas) return;
  canvas.width = Math.round(view.w * view.dpr);
  canvas.height = Math.round(view.h * view.dpr);
  canvas.getContext('2d').setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
}

function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

// Vẽ sẵn một hình lên canvas phụ kích thước w x h (CSS px)
function makeSprite(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = Math.ceil(w * view.dpr);
  c.height = Math.ceil(h * view.dpr);
  const ctx = c.getContext('2d');
  ctx.scale(view.dpr, view.dpr);
  draw(ctx);
  return c;
}

// Đốm sáng tròn có quầng (thay cho arc + shadowBlur). Lõi đặc chiếm 22% bán kính sprite.
const GLOW_CORE = 0.11;
function makeGlowSprite(color) {
  const S = 32;
  return makeSprite(S, S, ctx => {
    const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, color);
    g.addColorStop(GLOW_CORE * 2, color);
    g.addColorStop(0.4, hexToRgba(color, 0.3));
    g.addColorStop(1, hexToRgba(color, 0));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
  });
}

// Trái tim nhỏ có quầng sáng (shadowBlur chỉ chạy một lần lúc vẽ sẵn)
const HEART_S = 10, HEART_PAD = 7;
function makeHeartSprite(color) {
  const s = HEART_S, w = s * 2.2 + HEART_PAD * 2, h = s * 2 + HEART_PAD * 2;
  return makeSprite(w, h, ctx => {
    ctx.translate(w / 2, HEART_PAD + s * 0.8);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s, -s, -s * 1.4, s / 2, 0, s * 1.2);
    ctx.bezierCurveTo(s * 1.4, s / 2, s, -s, 0, 0);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fill();
  });
}

// Cánh hoa (gradient + bóng mờ vẽ sẵn). Gốc cánh hoa nằm ở (W/2, H - PAD) của sprite.
const PETAL_S = 20, PETAL_PAD = 6;
const PETAL_W = PETAL_S + PETAL_PAD * 2, PETAL_H = PETAL_S * 1.4 + PETAL_PAD * 2;
const PETAL_TONES = [
  { r: 255, g: 182, b: 193 }, // Light pink
  { r: 255, g: 192, b: 203 }, // Pink
  { r: 255, g: 213, b: 220 }, // Blush
  { r: 255, g: 160, b: 175 }  // Coral pink
];
function makePetalSprite(c) {
  const s = PETAL_S;
  return makeSprite(PETAL_W, PETAL_H, ctx => {
    ctx.translate(PETAL_W / 2, PETAL_H - PETAL_PAD);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-s / 2, -s / 2, -s / 2, -s * 1.2, 0, -s * 1.4);
    ctx.bezierCurveTo(s / 2, -s * 1.2, s / 2, -s / 2, 0, 0);
    const grad = ctx.createLinearGradient(0, 0, 0, -s * 1.4);
    grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, 0.95)`);
    grad.addColorStop(0.6, 'rgba(255, 230, 235, 0.9)');
    grad.addColorStop(1, 'rgba(255, 250, 252, 1)');
    ctx.fillStyle = grad;
    ctx.shadowColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.3)`;
    ctx.shadowBlur = 6;
    ctx.fill();
  });
}

/* --- A. CANVAS ĐỐM SÁNG NỀN (SPARKLES) --- */
class SparklesEngine {
  constructor(canvas) {
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.stars = [];
  }

  init() {
    if (!this.ctx) return;
    const sprites = [makeGlowSprite('#fff8e7'), makeGlowSprite('#ffd1dc')];
    this.stars = [];
    const count = isMobileDevice() ? 14 : 50;
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * view.w,
        y: Math.random() * view.h,
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.008,
        sprite: sprites[Math.random() > 0.4 ? 0 : 1]
      });
    }
  }

  render() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, view.w, view.h);
    for (const s of this.stars) {
      s.alpha += s.speed;
      ctx.globalAlpha = (Math.sin(s.alpha) + 1) / 2 * 0.85 + 0.15;
      const d = s.radius / GLOW_CORE;
      ctx.drawImage(s.sprite, s.x - d / 2, s.y - d / 2, d, d);
    }
    ctx.globalAlpha = 1;
  }
}

/* --- B. CANVAS CÁNH HOA RƠI LẢ TẢ (FALLING PETALS) --- */
class Petal {
  // start: 'screen' = rải ngẫu nhiên trên màn hình, 'above' = xếp so le phía trên để rơi vào dần
  constructor(w, h, start) {
    this.reset(w, h, start);
  }

  reset(w, h, start = 'top') {
    this.x = Math.random() * (w + 100) - 50;
    this.y = start === 'screen' ? Math.random() * h
      : start === 'above' ? -30 - Math.random() * h * 0.9
      : -30;
    this.size = Math.random() * 11 + 10; // Kích cỡ cánh hoa
    this.speedY = Math.random() * 1.2 + 0.8;
    this.speedX = Math.random() * 0.8 - 0.4;
    this.flip = Math.random() * Math.PI;
    this.flipSpeed = Math.random() * 0.025 + 0.015;
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = (Math.random() - 0.5) * 0.02;
    this.swing = Math.random() * Math.PI * 2;
    this.swingSpeed = Math.random() * 0.02 + 0.01;
    this.alpha = Math.random() * 0.35 + 0.65;
    this.tone = Math.floor(Math.random() * PETAL_TONES.length); // Tông màu pastel hồng phấn và san hô
  }

  update(w, h) {
    this.y += this.speedY;
    this.swing += this.swingSpeed;
    this.x += Math.sin(this.swing) * 0.9 + this.speedX;
    this.flip += this.flipSpeed;
    this.angle += this.angleSpeed;

    if (this.y > h + 30 || this.x < -60 || this.x > w + 60) {
      this.reset(w, h);
    }
  }

  draw(ctx, sprite, dpr) {
    // Xoay + lật (scale trục y theo cos) gộp thành một ma trận, không cần save/restore
    const k = this.size / PETAL_S * dpr, f = Math.cos(this.flip);
    const cos = Math.cos(this.angle), sin = Math.sin(this.angle);
    ctx.setTransform(cos * k, sin * k, -sin * k * f, cos * k * f, this.x * dpr, this.y * dpr);
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(sprite, -PETAL_W / 2, -(PETAL_H - PETAL_PAD), PETAL_W, PETAL_H);
  }
}

class PetalsEngine {
  constructor(canvas) {
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.petals = [];
  }

  init(enterFromTop = false) {
    if (!this.ctx) return;
    this.sprites = PETAL_TONES.map(makePetalSprite);
    this.petals = [];
    const count = isMobileDevice() ? (CONFIG.petalsCount.mobile || 12) : (CONFIG.petalsCount.desktop || 36);
    for (let i = 0; i < count; i++) {
      this.petals.push(new Petal(view.w, view.h, enterFromTop ? 'above' : 'screen'));
    }
  }

  render() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.clearRect(0, 0, view.w, view.h);
    for (const p of this.petals) {
      p.update(view.w, view.h);
      if (p.y < -40) continue; // Chưa rơi vào màn hình
      p.draw(ctx, this.sprites[p.tone], view.dpr);
    }
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    ctx.globalAlpha = 1;
  }
}

/* --- C. CANVAS TƯƠNG TÁC (CHUỘT RÊ & PHÁO HOA CLICK) --- */
class InteractiveEngine {
  constructor(canvas) {
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.particles = [];
    this.sprites = {};
  }

  init() {
    this.sprites = {}; // Vẽ lại sprite theo mật độ điểm ảnh hiện tại
  }

  sprite(shape, color) {
    const key = shape + color;
    if (!this.sprites[key]) {
      this.sprites[key] = shape === 'heart' ? makeHeartSprite(color) : makeGlowSprite(color);
    }
    return this.sprites[key];
  }

  // Thêm tia sáng pháo hoa khi bấm
  burst(x, y) {
    if (!CONFIG.effects.clickFireworks || prefersReducedMotion) return;
    const count = isMobileDevice() ? 10 : 24;
    const colors = ['#ffd166', '#ff758c', '#ffb6c1', '#ffffff', '#ff9f43', '#ffeaa7'];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 5 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.02 + 0.02,
        gravity: 0.12,
        shape: Math.random() > 0.6 ? 'heart' : 'spark'
      });
    }
  }

  // Thêm bụi sao khi di chuyển chuột hoặc vuốt
  addTrail(x, y) {
    if (!CONFIG.effects.mouseTrail || prefersReducedMotion) return;
    if (Math.random() > (isMobileDevice() ? 0.3 : 0.45)) return; // Tiết chế để mượt mà
    const colors = ['#ffe082', '#ffb6c1', '#ffffff'];
    this.particles.push({
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2 - 0.5,
      size: Math.random() * 3 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.9,
      decay: 0.035,
      gravity: -0.02,
      shape: Math.random() > 0.7 ? 'heart' : 'spark'
    });
  }

  render() {
    const ctx = this.ctx;
    if (!ctx || this.particles.length === 0) return;
    ctx.clearRect(0, 0, view.w, view.h);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = p.alpha;
      if (p.shape === 'heart') {
        // Trái tim nhỏ
        const k = p.size / HEART_S;
        const w = (HEART_S * 2.2 + HEART_PAD * 2) * k, h = (HEART_S * 2 + HEART_PAD * 2) * k;
        ctx.drawImage(this.sprite('heart', p.color), p.x - w / 2, p.y - (HEART_PAD + HEART_S * 0.8) * k, w, h);
      } else {
        // Đốm sáng lấp lánh
        const d = p.size / GLOW_CORE * 0.7;
        ctx.drawImage(this.sprite('spark', p.color), p.x - d / 2, p.y - d / 2, d, d);
      }
    }
    ctx.globalAlpha = 1;
  }
}


/* ==============================================================================
 * 5. KHỞI TẠO VÒNG LẶP HOẠT ẢNH & XỬ LÝ SỰ KIỆN CANVAS
 * ============================================================================== */
let sparklesEngine, petalsEngine, interactiveEngine;
let canvases = [];
let effectsStarted = false;
let isTabActive = true;

function setupCanvases() {
  canvases = ['canvas-sparkles', 'canvas-petals', 'canvas-interactive'].map(id => document.getElementById(id));
  sparklesEngine = new SparklesEngine(canvases[0]);
  petalsEngine = new PetalsEngine(canvases[1]);
  interactiveEngine = new InteractiveEngine(canvases[2]);

  // Vùng vẽ cao 100lvh nên thanh địa chỉ điện thoại ẩn/hiện không đổi kích thước:
  // chỉ cấp phát lại canvas khi xoay máy / đổi cỡ cửa sổ thật sự.
  window.addEventListener('resize', debounce(() => {
    if (!effectsStarted) return;
    const prev = { w: view.w, h: view.h, dpr: view.dpr };
    measureView();
    if (prev.w === view.w && prev.h === view.h && prev.dpr === view.dpr) return;
    canvases.forEach(resizeCanvas);
    sparklesEngine.init();
    petalsEngine.init();
    interactiveEngine.init();
  }, 150));

  // Tạm dừng khi chuyển tab để tiết kiệm pin & CPU
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
  });

  // Sự kiện tương tác chuột & chạm màn hình (chỉ khi hiệu ứng đã bật)
  window.addEventListener('pointermove', (e) => {
    if (effectsStarted) interactiveEngine.addTrail(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('pointerdown', (e) => {
    // Không bắn pháo hoa khi bấm vào các nút tương tác
    if (!effectsStarted || e.target.closest('button, input, a, .polaroid-card')) return;
    interactiveEngine.burst(e.clientX, e.clientY);
  }, { passive: true });
}

// Bật hiệu ứng hạt: gọi sau khi phần chữ chính đã hiện xong.
// Lớp canvas mờ dần vào (CSS), cánh hoa rơi vào từ phía trên nên số lượng trên màn hình tăng dần.
function startEffects() {
  if (effectsStarted || prefersReducedMotion) return;
  effectsStarted = true;

  measureView();
  canvases.forEach(resizeCanvas);
  sparklesEngine.init();
  petalsEngine.init(true);
  interactiveEngine.init();
  document.body.classList.add('effects-on');

  // Pháo hoa chào mừng ở trung tâm
  interactiveEngine.burst(view.w / 2, view.h * 0.4);

  function loop() {
    if (isTabActive) {
      if (CONFIG.effects.backgroundSparkles) sparklesEngine.render();
      if (CONFIG.effects.fallingPetals) petalsEngine.render();
      interactiveEngine.render();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}


/* ==============================================================================
 * 6. QUẢN LÝ NHẠC NỀN (AUDIO PLAYER)
 * Tự động ẩn nếu file audio/music.mp3 không tồn tại, không báo lỗi.
 * ============================================================================== */
class MusicManager {
  constructor() {
    this.audio = document.getElementById('bg-audio');
    this.controlWrapper = document.getElementById('music-control');
    this.toggleBtn = document.getElementById('btn-music-toggle');
    this.isPlaying = false;
    this.isSupported = false;

    this.init();
  }

  init() {
    if (!this.audio || !CONFIG.audioSrc) return;

    this.audio.src = CONFIG.audioSrc;
    this.audio.volume = 0.65;

    // Kiểm tra xem file audio có load được không
    this.audio.addEventListener('canplaythrough', () => {
      this.isSupported = true;
      if (this.controlWrapper) {
        this.controlWrapper.style.display = 'block';
      }
    });

    // Nếu không tìm thấy file nhạc (404), ẩn nút nhẹ nhàng
    this.audio.addEventListener('error', () => {
      this.isSupported = false;
      if (this.controlWrapper) {
        this.controlWrapper.style.display = 'none';
      }
    });

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }
  }

  play() {
    if (!this.audio || !this.audio.src) return;
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.updateUI(true);
        if (this.controlWrapper) this.controlWrapper.style.display = 'block';
      }).catch(() => {
        // Trình duyệt chặn autoplay, chờ người dùng bấm lại
        this.isPlaying = false;
        this.updateUI(false);
      });
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (!this.toggleBtn) return;
    if (playing) {
      this.toggleBtn.classList.add('music-playing');
      this.toggleBtn.setAttribute('aria-label', 'Tắt nhạc nền');
      this.toggleBtn.title = 'Tắt nhạc nền';
    } else {
      this.toggleBtn.classList.remove('music-playing');
      this.toggleBtn.setAttribute('aria-label', 'Bật nhạc nền');
      this.toggleBtn.title = 'Bật nhạc nền';
    }
  }
}


/* ==============================================================================
 * 7. QUẢN LÝ MÀN HÌNH MỞ ĐẦU (ENVELOPE OVERLAY)
 * ============================================================================== */
// Font của màn phong bì và của thiệp chính. Câu mẫu có dấu tiếng Việt để tải đúng bộ ký tự.
const ENVELOPE_FONTS = ['400 1em "Plus Jakarta Sans"', '500 1em "Plus Jakarta Sans"', '600 1em "Plus Jakarta Sans"', '700 1em "Plus Jakarta Sans"'];
const CARD_FONTS = ['700 1em "Dancing Script"', '700 1em "Playfair Display"', '900 1em "Playfair Display"',
  'italic 400 1em "Playfair Display"', 'italic 600 1em "Playfair Display"', 'italic 400 1em "Plus Jakarta Sans"'];
const FONT_SAMPLE = 'Chúc Mừng NGÀY PHỤ NỮ VIỆT NAM 20-10 Một tấm thiệp đong đầy yêu thương đang chờ bạn';
const FONT_WAIT_MAX = 1500;

// Dựng sẵn thiệp chính bên dưới phong bì (vẫn ẩn) và tải trước font của thiệp.
// will-change đặt từ lúc này để trình duyệt vẽ sẵn các lớp nặng (hoa SVG, chữ 20-10 nhiều lớp bóng)
// khi đang rảnh, thay vì vẽ đúng lúc chúng bắt đầu hiện (gây khựng). Gỡ ngay khi hiệu ứng xong.
let mainCardPrepared = false;
function prepareMainCard() {
  if (mainCardPrepared) return;
  mainCardPrepared = true;
  // Gắn class lên đúng phần tử (không phải <html>) để trình duyệt chỉ tính lại style phần đó
  document.getElementById('main-content').classList.add('main-ready');
  primeWillChange(document.querySelectorAll('.animate-item, .corner-flower'));
  waitForFonts(CARD_FONTS, 0);
}

function startMainEntrance() {
  const overlay = document.getElementById('envelope-overlay');

  primeWillChange([overlay, overlay.querySelector('.envelope-card-box')]);

  // Crossfade: phong bì mờ dần + thu nhỏ, cùng lúc thiệp chính hiện lên bên dưới (0.8s)
  requestAnimationFrame(() => {
    document.body.classList.add('card-opened');
    overlay.classList.add('hide-envelope');
  });

  // Xóa phong bì khỏi luồng hiển thị sau khi mờ hẳn
  setTimeout(() => {
    overlay.style.display = 'none';
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.focus({ preventScroll: true });
  }, 850);

  // Hiệu ứng hạt chỉ bắt đầu khi phần chữ chính (đến lời chúc) đã hiện xong
  setTimeout(startEffects, 2100);
}

function setupEnvelopeIntro(musicManager) {
  const overlay = document.getElementById('envelope-overlay');
  const openBtn = document.getElementById('btn-open-card');
  const envelopeWrapper = document.querySelector('.envelope-wrapper');

  if (!overlay || !openBtn) return;

  // Tạo lớp riêng cho phong bì ngay từ đầu để trình duyệt vẽ sẵn trong lúc chờ font
  primeWillChange([overlay.querySelector('.envelope-card-box')]);

  // 1. Chờ font của phong bì (tối đa 1.5s) rồi mới cho phong bì hiện lên -> không thấy chữ đổi font.
  //    Chờ thêm 2 khung hình để việc dàn lại chữ theo font mới xong hẳn trước khi bắt đầu hiệu ứng.
  waitForFonts(ENVELOPE_FONTS, FONT_WAIT_MAX).then(nextFrames).then(() => {
    overlay.classList.add('is-ready');

    // 2. Phong bì hiện xong thì dựng sẵn thiệp chính bên dưới
    setTimeout(prepareMainCard, 1000);
  });

  function openCard() {
    overlay.classList.add('is-ready');
    prepareMainCard();

    // Phát nhạc nền
    if (musicManager) {
      musicManager.play();
    }

    // Hoạt ảnh phong bì mở nắp và thư trượt ra (letter-rise kết thúc ở ~1.2s)
    if (envelopeWrapper) {
      envelopeWrapper.classList.add('open-anim');
    }

    // Chuyển sang thiệp chính khi thư đã trượt ra VÀ font của thiệp đã sẵn sàng (chờ font tối đa 1.5s)
    Promise.all([delay(1150), waitForFonts(CARD_FONTS, FONT_WAIT_MAX)]).then(startMainEntrance);
  }

  openBtn.addEventListener('click', openCard, { once: true });
}


/* ==============================================================================
 * 8. RENDER ALBUM ẢNH POLAROID & LIGHTBOX XEM ẢNH LỚN
 * ============================================================================== */
let currentLightboxIndex = 0;
let validPhotos = [];

function setupPhotoGallery() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;

  grid.innerHTML = '';
  validPhotos = Array.isArray(PHOTOS) && PHOTOS.length > 0 ? PHOTOS : [];

  // Nếu không có ảnh nào được khai báo, tạo sẵn 4 khung thiệp nghệ thuật
  if (validPhotos.length === 0) {
    validPhotos = [
      { placeholder: true, caption: "Nụ cười rạng rỡ 🌸", icon: "✨", quote: "Vẻ đẹp của sự tự tin & dịu dàng" },
      { placeholder: true, caption: "Hạnh phúc đong đầy 💖", icon: "🌷", quote: "Luôn an yên và tỏa sáng mỗi ngày" },
      { placeholder: true, caption: "Tươi trẻ & Yêu đời 🌹", icon: "🎀", quote: "Mỗi ngày đều là ngày ngập tràn yêu thương" },
      { placeholder: true, caption: "Thành công & Như ý 🌟", icon: "💐", quote: "Vạn sự viên mãn và ngọt ngào" }
    ];
  }

  validPhotos.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Xem ảnh: ${item.caption || 'Kỷ niệm'}`);

    if (item.placeholder) {
      card.innerHTML = `
        <div class="polaroid-img-wrapper">
          <div class="polaroid-placeholder">
            <span class="placeholder-icon">${item.icon || '🌸'}</span>
            <span class="placeholder-text">${item.quote || 'Khoảnh khắc tươi đẹp'}</span>
          </div>
        </div>
        <p class="polaroid-caption">${item.caption}</p>
      `;
    } else {
      // Chưa gán src: ảnh chỉ tải khi cuộn gần tới (xem observeGallery bên dưới)
      card.innerHTML = `
        <div class="polaroid-img-wrapper">
          <img class="polaroid-img"
               data-src="${item.src}"
               alt="${item.alt || item.caption || 'Ảnh 20/10'}"
               width="1024" height="1024" decoding="async">
        </div>
        <p class="polaroid-caption">${item.caption}</p>
      `;

      // Ảnh tải xong mới mờ dần hiện lên
      const imgEl = card.querySelector('img');
      imgEl.onload = function() {
        this.classList.add('is-loaded');
      };

      // Xử lý tự động: Nếu ảnh chưa tồn tại trong thư mục images/, chuyển sang placeholder đẹp
      imgEl.onerror = function() {
        this.onerror = null;
        const wrapper = card.querySelector('.polaroid-img-wrapper');
        wrapper.innerHTML = `
          <div class="polaroid-placeholder">
            <span class="placeholder-icon">📸</span>
            <span class="placeholder-text">Thêm ảnh vào<br><strong>${item.src}</strong></span>
          </div>
        `;
      };
    }

    // Sự kiện click mở Lightbox
    card.addEventListener('click', () => openLightbox(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    grid.appendChild(card);
  });

  observeGallery(grid);
}

// Thẻ ảnh hiện dần khi cuộn tới; ảnh được tải trước khi vào màn hình một đoạn
function observeGallery(grid) {
  const cards = Array.from(grid.querySelectorAll('.polaroid-card'));
  const loadImage = card => {
    const img = card.querySelector('img[data-src]');
    if (!img) return;
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  };

  if (!('IntersectionObserver' in window)) {
    cards.forEach(card => { loadImage(card); card.classList.add('in-view'); });
    return;
  }

  const loadObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      loadImage(entry.target);
      loadObserver.unobserve(entry.target);
    });
  }, { rootMargin: '400px 0px' });

  const revealObserver = new IntersectionObserver(entries => {
    // Các thẻ cùng vào màn hình một lượt thì hiện gối đầu nhau 0.15s
    entries.filter(entry => entry.isIntersecting).forEach((entry, i) => {
      const card = entry.target;
      card.style.setProperty('--d', `${i * 0.15}s`);
      primeWillChange([card]);
      card.classList.add('in-view');
      revealObserver.unobserve(card);
    });
  }, { threshold: 0.15 });

  cards.forEach(card => {
    loadObserver.observe(card);
    revealObserver.observe(card);
  });
}

// Lightbox Modal
function setupLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const overlay = document.getElementById('lightbox-overlay');

  if (!modal) return;

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  closeBtn?.addEventListener('click', closeLightbox);
  overlay?.addEventListener('click', closeLightbox);

  prevBtn?.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + validPhotos.length) % validPhotos.length;
    updateLightboxContent();
  });

  nextBtn?.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % validPhotos.length;
    updateLightboxContent();
  });

  // Điều khiển bằng phím
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevBtn?.click();
    if (e.key === 'ArrowRight') nextBtn?.click();
  });

  // Hỗ trợ vuốt chạm (swipe) trên điện thoại: chuyển ảnh trái/phải, vuốt xuống để đóng
  let touchStartX = 0;
  let touchStartY = 0;
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Vuốt xuống để đóng Lightbox
    if (diffY > 60 && Math.abs(diffX) < 60) {
      closeLightbox();
      return;
    }

    // Vuốt ngang để chuyển ảnh
    if (Math.abs(diffX) > 40 && Math.abs(diffY) < 65) {
      if (diffX > 0) prevBtn?.click();
      else nextBtn?.click();
    }
  }, { passive: true });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function updateLightboxContent() {
  const photo = validPhotos[currentLightboxIndex];
  if (!photo) return;

  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const counterEl = document.getElementById('lightbox-counter');

  if (captionEl) captionEl.textContent = photo.caption || '';
  if (counterEl) counterEl.textContent = `Ảnh ${currentLightboxIndex + 1} / ${validPhotos.length}`;

  if (imgEl) {
    if (photo.placeholder) {
      // Dùng SVG minh họa dạng Data URL nếu là placeholder
      imgEl.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='100%25' height='100%25' fill='%23fce4ec'/%3E%3Ctext x='50%25' y='45%25' font-size='60' text-anchor='middle' fill='%23ff7a8a'%3E🌸%3C/text%3E%3Ctext x='50%25' y='65%25' font-family='sans-serif' font-size='22' font-weight='bold' text-anchor='middle' fill='%23633'%3E${encodeURIComponent(photo.caption || 'Chúc Mừng 20/10')}%3C/text%3E%3C/svg%3E`;
    } else {
      imgEl.src = photo.src;
      imgEl.alt = photo.alt || photo.caption || 'Ảnh 20/10';
      imgEl.onerror = function() {
        this.onerror = null;
        this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='100%25' height='100%25' fill='%23fce4ec'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='20' text-anchor='middle' fill='%23888'%3EHãy thêm file ảnh vào ${encodeURIComponent(photo.src)}%3C/text%3E%3C/svg%3E`;
      };
    }
  }
}


/* ==============================================================================
 * 9. TIỆN ÍCH TẠO LINK CHIA SẺ CÁ NHÂN HÓA (SHARE MODAL)
 * Giúp người dùng nhập tên người nhận rồi copy link gửi qua Zalo/Messenger
 * ============================================================================== */
function setupShareModal() {
  const openBtn = document.getElementById('btn-share-link');
  const modal = document.getElementById('share-modal');
  const closeBtn = document.getElementById('share-modal-close');
  const backdrop = document.getElementById('share-modal-backdrop');
  const recipientInput = document.getElementById('input-recipient');
  const senderInput = document.getElementById('input-sender');
  const outputInput = document.getElementById('output-share-url');
  const copyBtn = document.getElementById('btn-copy-link');
  const toast = document.getElementById('copy-toast');

  if (!modal || !openBtn) return;

  function updateGeneratedUrl() {
    const toVal = recipientInput.value.trim();
    const fromVal = senderInput.value.trim();
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();

    if (toVal) params.set('to', toVal);
    if (fromVal) params.set('from', fromVal);

    const fullUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    outputInput.value = fullUrl;
    if (toast) toast.textContent = '';
  }

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    const urlParams = getUrlParams();
    recipientInput.value = urlParams.to || '';
    senderInput.value = urlParams.from || '';
    updateGeneratedUrl();
    recipientInput.focus();
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  openBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  recipientInput?.addEventListener('input', updateGeneratedUrl);
  senderInput?.addEventListener('input', updateGeneratedUrl);

  copyBtn?.addEventListener('click', () => {
    outputInput.select();
    outputInput.setSelectionRange(0, 99999);
    
    // Sao chép an toàn vào Clipboard
    // (Trình duyệt trong Zalo/Messenger có thể từ chối Clipboard API -> dùng cách cũ)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(outputInput.value).then(onCopied).catch(legacyCopy);
    } else {
      legacyCopy();
    }
  });

  function legacyCopy() {
    try {
      document.execCommand('copy');
      onCopied();
    } catch (err) {
      if (toast) toast.textContent = 'Hãy nhấn giữ vào ô link để sao chép thủ công nhé!';
    }
  }

  function onCopied() {
    if (toast) {
      toast.textContent = "✨ Đã sao chép link thành công! Gửi ngay cho người ấy nhé 💌";
      setTimeout(() => { if (toast) toast.textContent = ''; }, 3500);
    }
  }
}


/* ==============================================================================
 * 10. HÀM BỔ TRỢ (UTILITIES)
 * ============================================================================== */
function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Đợi qua 2 khung hình (để trình duyệt vẽ xong thay đổi trước đó)
function nextFrames() {
  return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

// Tải các font cần thiết; xong hoặc quá maxWait (ms) thì tiếp tục (font-display: swap lo phần còn lại)
function waitForFonts(fonts, maxWait) {
  if (!document.fonts || !document.fonts.load) return Promise.resolve();
  const loads = Promise.all(fonts.map(f => document.fonts.load(f, FONT_SAMPLE).catch(() => {})));
  return Promise.race([loads, delay(maxWait)]);
}

// Đặt will-change cho phần tử sắp chuyển động và gỡ đi khi hoạt ảnh xuất hiện của nó kết thúc
function primeWillChange(elements) {
  elements.forEach(el => {
    if (!el) return;
    el.style.willChange = 'opacity, transform';
    el.addEventListener('animationend', function done(e) {
      if (e.target !== el) return;
      el.style.willChange = '';
      el.removeEventListener('animationend', done);
    });
  });
}


/* ==============================================================================
 * 11. KHỞI CHẠY KHI TẢI TRANG
 * ============================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Áp dụng thông tin cá nhân hóa
  applyPersonalizedData();

  // 2. Thiết lập trình phát nhạc
  const musicManager = new MusicManager();

  // 3. Thiết lập hoạt ảnh Canvas
  setupCanvases();

  // 4. Thiết lập màn hình mở đầu thiệp
  setupEnvelopeIntro(musicManager);

  // 5. Khởi tạo album ảnh & Lightbox
  setupPhotoGallery();
  setupLightbox();

  // 6. Khởi tạo popup tạo link chia sẻ
  setupShareModal();
});
