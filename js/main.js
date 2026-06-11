const menuBtn = document.querySelector('[data-menu-btn]');
const navLinks = document.querySelector('[data-nav-links]');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-nav-link]').forEach(a => {
  if (a.getAttribute('href') === path) a.classList.add('active');
});

const calcForm = document.querySelector('[data-calc-form]');
const totalEl = document.querySelector('[data-calc-total]');
if (calcForm && totalEl) {
  const prices = {
    diagnosis: 900,
    cleaning: 1500,
    pump: 3900,
    seals: 1200,
    thermoblock: 5200,
    delivery: 800,
  };

  const update = () => {
    let total = 0;
    calcForm.querySelectorAll('input[type="checkbox"]').forEach(input => {
      if (input.checked) total += Number(prices[input.value] || 0);
    });

    const discount = calcForm.querySelector('[value="bundle"]').checked ? 0.1 : 0;
    if (discount) total = Math.round(total * (1 - discount));

    totalEl.textContent = `${total.toLocaleString('ru-RU')} ₽`;
  };

  calcForm.addEventListener('change', update);
  update();
}

// Калькулятор для нового блока с чекбоксами
function initChecklistCalculator() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
  const totalSpan = document.querySelector('.checklist-total .total-price');
  if (!checkboxes.length || !totalSpan) return;

  function updateTotal() {
    let total = 0;
    let hasBundle = false;
    checkboxes.forEach(cb => {
      if (cb.checked) {
        const price = parseFloat(cb.getAttribute('data-service-price') || 0);
        if (cb.hasAttribute('data-bundle')) {
          hasBundle = true;
        } else {
          total += price;
        }
      }
    });
    if (hasBundle) {
      total = Math.round(total * 0.9); // скидка 10%
    }
    totalSpan.textContent = total.toLocaleString('ru-RU') + ' ₽';
  }

  checkboxes.forEach(cb => cb.addEventListener('change', updateTotal));
  updateTotal();
}

// Запускаем после загрузки страницы
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChecklistCalculator);
} else {
  initChecklistCalculator();
}
