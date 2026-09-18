const PRODUCTS = [
  {
    id: 'borsch',
    img: 'assets/img/product-borsch.jpg',
    title: 'Борщ',
    desc: 'Густой домашний борщ, который удобно держать дома и брать с собой в дорогу',
    tags: ['Суп', 'Классика', 'Говядина'],
  },
  {
    id: 'rassolnik',
    img: 'assets/img/product-rassolnik.jpg',
    title: 'Рассольник',
    desc: 'Знакомый вкус, который выручает дома, на даче и в поездках',
    tags: ['Суп', 'Домашнее', 'Говядина'],
  },
  {
    id: 'beef-buckwheat',
    img: 'assets/img/product-beef-buckwheat.jpg',
    title: 'Говядина + Гречка',
    desc: 'Сытное блюдо на каждый день — без готовки, без холодильника, без лишних хлопот',
    tags: ['Второе', 'Сытно', 'Говядина'],
  },
  {
    id: 'pork-buckwheat',
    img: 'assets/img/product-pork-buckwheat.jpg',
    title: 'Свинина + Гречка',
    desc: 'Плотный домашний вкус, который удобно открыть тогда, когда нужно нормально поесть',
    tags: ['Второе', 'Плотно', 'Свинина'],
  },
  {
    id: 'chicken-barley',
    img: 'assets/img/product-chicken-barley.jpg',
    title: 'Курица + Перловка',
    desc: 'Простой, понятный и сытный вариант на каждый день и в запас',
    tags: ['Второе', 'Полезно', 'Курица'],
  },
  {
    id: 'chicken-rice',
    img: 'assets/img/product-chicken-rice.jpg',
    title: 'Курица + Рис',
    desc: 'Универсальное блюдо, которое легко взять с собой и держать дома под рукой',
    tags: ['Второе', 'Легко', 'Курица'],
  },
];

const MAX_SELECTION = 3;
const selected = new Set();

function checkIcon(){
  return '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7" stroke="white" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}

function renderProducts(){
  const grid = document.getElementById('vote');
  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card" data-id="${p.id}">
      <div class="product-media">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        <span class="product-check">${checkIcon()}</span>
      </div>
      <div class="product-body">
        <div class="product-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <button type="button" class="product-vote">Проголосовать</button>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => toggleProduct(card.dataset.id));
  });
}

function toggleProduct(id){
  if(selected.has(id)){
    selected.delete(id);
  } else {
    if(selected.size >= MAX_SELECTION) return;
    selected.add(id);
  }
  updateUI();
}

function updateUI(){
  document.querySelectorAll('.product-card').forEach(card => {
    card.classList.toggle('selected', selected.has(card.dataset.id));
    const btn = card.querySelector('.product-vote');
    btn.textContent = selected.has(card.dataset.id) ? 'Выбрано' : 'Проголосовать';
  });
  document.getElementById('voteCount').textContent = selected.size;
}

/* Mobile nav */
function initMobileNav(){
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mobileNav');
  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

/* Signup form: channel select */
function initSignupForm(){
  const channelSelect = document.getElementById('channelSelect');
  channelSelect.querySelectorAll('.channel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      channelSelect.querySelectorAll('.channel-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const form = document.getElementById('signupForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Спасибо! Мы на связи';
    submitBtn.disabled = true;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateUI();
  initMobileNav();
  initSignupForm();
});
