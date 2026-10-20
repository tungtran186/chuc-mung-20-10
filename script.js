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
    mobile: 18
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
 * ============================================================================== */

// Kiểm tra chế độ giảm chuyển động của hệ điều hành
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hàm kiểm tra thiết bị màn hình nhỏ (mobile) động
function isMobileDevice() {
  return window.innerWidth <= 768;
}

// Thiết lập kích thước Canvas theo màn hình (DPR giới hạn tối đa 2 để mượt)
function resizeCanvas(canvas) {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
}

/* --- A. CANVAS ĐỐM SÁNG NỀN (SPARKLES) --- */
class SparklesEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.stars = [];
    this.init();
  }

  init() {
    if (!this.ctx) return;
    this.stars = [];
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMob = isMobileDevice();
    this.count = isMob ? 24 : 60;
    for (let i = 0; i < this.count; i++) {
      this.stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.6 + 0.6,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.008,
        color: Math.random() > 0.4 ? '#fff8e7' : '#ffd1dc'
      });
    }
  }

  render() {
    if (!this.ctx || prefersReducedMotion) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.ctx.clearRect(0, 0, w, h);

    for (let s of this.stars) {
      s.alpha += s.speed;
      const currentAlpha = (Math.sin(s.alpha) + 1) / 2 * 0.85 + 0.15;
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = s.color;
      this.ctx.globalAlpha = currentAlpha;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = s.color;
      this.ctx.fill();
    }
    this.ctx.shadowBlur = 0;
    this.ctx.globalAlpha = 1;
  }
}

/* --- B. CANVAS CÁNH HOA RƠI LẢ TẢ (FALLING PETALS) --- */
class Petal {
  constructor(w, h) {
    this.reset(w, h, true);
  }

  reset(w, h, isFirst = false) {
    this.w = w;
    this.h = h;
    this.x = Math.random() * (w + 100) - 50;
    this.y = isFirst ? Math.random() * h : -30;
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
    
    // Tông màu pastel hồng phấn và san hô
    const tones = [
      { r: 255, g: 182, b: 193 }, // Light pink
      { r: 255, g: 192, b: 203 }, // Pink
      { r: 255, g: 213, b: 220 }, // Blush
      { r: 255, g: 160, b: 175 }  // Coral pink
    ];
    this.color = tones[Math.floor(Math.random() * tones.length)];
  }

  update(w, h) {
    this.y += this.speedY;
    this.swing += this.swingSpeed;
    this.x += Math.sin(this.swing) * 0.9 + this.speedX;
    this.flip += this.flipSpeed;
    this.angle += this.angleSpeed;

    if (this.y > h + 30 || this.x < -60 || this.x > w + 60) {
      this.reset(w, h, false);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.scale(1, Math.cos(this.flip));

    ctx.beginPath();
    ctx.moveTo(0, 0);
    // Vẽ cánh hoa cong tự nhiên
    ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size / 2, -this.size * 1.2, 0, -this.size * 1.4);
    ctx.bezierCurveTo(this.size / 2, -this.size * 1.2, this.size / 2, -this.size / 2, 0, 0);

    const grad = ctx.createLinearGradient(0, 0, 0, -this.size * 1.4);
    grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.95})`);
    grad.addColorStop(0.6, `rgba(255, 230, 235, ${this.alpha * 0.9})`);
    grad.addColorStop(1, `rgba(255, 250, 252, ${this.alpha})`);

    ctx.fillStyle = grad;
    ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }
}

class PetalsEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.petals = [];
    this.init();
  }

  init() {
    if (!this.ctx) return;
    this.petals = [];
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMob = isMobileDevice();
    this.count = isMob ? (CONFIG.petalsCount.mobile || 16) : (CONFIG.petalsCount.desktop || 36);
    for (let i = 0; i < this.count; i++) {
      this.petals.push(new Petal(w, h));
    }
  }

  render() {
    if (!this.ctx || prefersReducedMotion || !CONFIG.effects.fallingPetals) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.ctx.clearRect(0, 0, w, h);

    for (let p of this.petals) {
      p.update(w, h);
      p.draw(this.ctx);
    }
  }
}

/* --- C. CANVAS TƯƠNG TÁC (CHUỘT RÊ & PHÁO HOA CLICK) --- */
class InteractiveEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.particles = [];
  }

  // Thêm tia sáng pháo hoa khi bấm
  burst(x, y) {
    if (!CONFIG.effects.clickFireworks || prefersReducedMotion) return;
    const isMob = isMobileDevice();
    const count = isMob ? 15 : 28;
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
    if (Math.random() > 0.45) return; // Tiết chế để mượt mà
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
    if (!this.ctx || this.particles.length === 0) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.ctx.clearRect(0, 0, w, h);

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

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 6;
      this.ctx.shadowColor = p.color;

      if (p.shape === 'heart') {
        // Vẽ trái tim nhỏ
        const s = p.size;
        this.ctx.translate(p.x, p.y);
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(-s, -s, -s * 1.4, s / 2, 0, s * 1.2);
        this.ctx.bezierCurveTo(s * 1.4, s / 2, s, -s, 0, 0);
        this.ctx.fill();
      } else {
        // Vẽ ngôi sao 4 cánh lấp lánh
        const r = p.size;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }
  }
}


/* ==============================================================================
 * 5. KHỞI TẠO VÒNG LẶP HOẠT ẢNH & XỬ LÝ SỰ KIỆN CANVAS
 * ============================================================================== */
let sparklesEngine, petalsEngine, interactiveEngine;
let animationFrameId = null;
let isTabActive = true;

function setupCanvases() {
  const canvasSparkles = document.getElementById('canvas-sparkles');
  const canvasPetals = document.getElementById('canvas-petals');
  const canvasInteractive = document.getElementById('canvas-interactive');

  // Trên điện thoại, thanh địa chỉ ẩn/hiện khi cuộn cũng gây sự kiện resize:
  // chỉ tạo lại hạt khi chiều rộng đổi để cánh hoa không bị "nhảy" lại từ đầu.
  let lastWidth = window.innerWidth;
  function resizeAll() {
    resizeCanvas(canvasSparkles);
    resizeCanvas(canvasPetals);
    resizeCanvas(canvasInteractive);
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;
    if (sparklesEngine) sparklesEngine.init();
    if (petalsEngine) petalsEngine.init();
  }

  resizeAll();
  window.addEventListener('resize', debounce(resizeAll, 120));
  window.addEventListener('orientationchange', () => {
    setTimeout(resizeAll, 150);
  });

  sparklesEngine = new SparklesEngine(canvasSparkles);
  petalsEngine = new PetalsEngine(canvasPetals);
  interactiveEngine = new InteractiveEngine(canvasInteractive);

  // Vòng lặp chính requestAnimationFrame
  function loop() {
    if (isTabActive) {
      if (CONFIG.effects.backgroundSparkles) sparklesEngine.render();
      if (CONFIG.effects.fallingPetals) petalsEngine.render();
      interactiveEngine.render();
    }
    animationFrameId = requestAnimationFrame(loop);
  }

  loop();

  // Tạm dừng khi chuyển tab để tiết kiệm pin & CPU
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
  });

  // Sự kiện tương tác chuột & chạm màn hình
  window.addEventListener('pointermove', (e) => {
    interactiveEngine.addTrail(e.clientX, e.clientY);
  });

  window.addEventListener('pointerdown', (e) => {
    // Không bắn pháo hoa khi bấm vào các nút tương tác
    if (e.target.closest('button, input, a, .polaroid-card')) return;
    interactiveEngine.burst(e.clientX, e.clientY);
  });
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
function setupEnvelopeIntro(musicManager) {
  const overlay = document.getElementById('envelope-overlay');
  const openBtn = document.getElementById('btn-open-card');
  const envelopeWrapper = document.querySelector('.envelope-wrapper');

  if (!overlay || !openBtn) return;

  function openCard() {
    // 1. Phát nhạc nền
    if (musicManager) {
      musicManager.play();
    }

    // 2. Hoạt ảnh phong bì mở nắp và thư nhô lên
    if (envelopeWrapper) {
      envelopeWrapper.classList.add('open-anim');
    }

    // 3. Mờ phong bì và kích hoạt giao diện chính
    //    (đợi nắp lật + thiệp trượt ra xong: hoạt ảnh letter-rise kết thúc ở ~1.2s)
    setTimeout(() => {
      overlay.classList.add('hide-envelope');
      document.body.classList.add('card-opened');

      // Bắn pháo hoa chào mừng ở trung tâm
      if (interactiveEngine) {
        interactiveEngine.burst(window.innerWidth / 2, window.innerHeight * 0.4);
      }
    }, 1300);

    // Xóa khỏi DOM sau khi chuyển cảnh xong
    setTimeout(() => {
      overlay.style.display = 'none';
      const mainContent = document.getElementById('main-content');
      if (mainContent) mainContent.focus();
    }, 2150);
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
      card.innerHTML = `
        <div class="polaroid-img-wrapper">
          <img class="polaroid-img" 
               src="${item.src}" 
               alt="${item.alt || item.caption || 'Ảnh 20/10'}" 
               loading="lazy">
        </div>
        <p class="polaroid-caption">${item.caption}</p>
      `;

      // Xử lý tự động: Nếu ảnh chưa tồn tại trong thư mục images/, chuyển sang placeholder đẹp
      const imgEl = card.querySelector('img');
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
