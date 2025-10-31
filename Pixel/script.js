window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const shrinkPoint = 80; // на сколько пикселей прокрутить, чтобы уменьшить
  const isShrink = header.classList.contains('shrink');

  if (window.scrollY > shrinkPoint && !isShrink) {
    header.classList.add('shrink');
  } else if (window.scrollY <= shrinkPoint && isShrink) {
    header.classList.remove('shrink');
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('dynamicSelect');
  if (!select) return;

  function getNumericStyleProp(style, prop) {
    const v = style.getPropertyValue(prop);
    return v ? parseFloat(v) : 0;
  }

  function adjustWidth() {
    // выбранный текст (если ничего не выбрано — берем первый)
    const idx = select.selectedIndex >= 0 ? select.selectedIndex : 0;
    const text = select.options[idx] ? select.options[idx].text : '';

    // временный span для точного измерения ширины текста
    const temp = document.createElement('span');
    const cs = getComputedStyle(select);

    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.style.whiteSpace = 'nowrap';

    // перенимаем свойства шрифта и межбуквенное расстояние
    temp.style.font = cs.font;
    temp.style.letterSpacing = cs.letterSpacing;
    temp.style.fontSize = cs.fontSize;
    temp.style.fontWeight = cs.fontWeight;
    temp.style.fontFamily = cs.fontFamily;
    temp.textContent = text || select.placeholder || '';

    document.body.appendChild(temp);

    // учёт padding/border/outline и небольшой запас под стрелку
    const paddingLeft = getNumericStyleProp(cs, 'padding-left');
    const paddingRight = getNumericStyleProp(cs, 'padding-right');
    const borderLeft = getNumericStyleProp(cs, 'border-left-width');
    const borderRight = getNumericStyleProp(cs, 'border-right-width');
    const outline = getNumericStyleProp(cs, 'outline-width');

    // резерв для нативной стрелки и кривой отрисовки (подстрой под нужды)
    const arrowReserve = 28; // можно увеличить если в браузере обрезает

    const newWidth = Math.ceil(temp.offsetWidth + paddingLeft + paddingRight + borderLeft + borderRight + outline + arrowReserve);

    // минимальная и максимальная ширина (защитные пределы)
    const minWidth = 120;
    const maxWidth = window.innerWidth - 40;

    select.style.width = Math.max(minWidth, Math.min(newWidth, maxWidth)) + 'px';

    temp.remove();
  }

  // Вызовы: при загрузке, при изменении и при ресайзе окна
  adjustWidth();
  select.addEventListener('change', adjustWidth);
  window.addEventListener('resize', adjustWidth);

  // Если select может меняться динамически (например, текст опций позже), 
  // можно также отслеживать мутации — закомментировал на случай необходимости:
  // const observer = new MutationObserver(adjustWidth);
  // observer.observe(select, { childList: true, subtree: true, characterData: true });
});
