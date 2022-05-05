'use strict';
window.addEventListener('DOMContentLoaded', () => {
  const $input = document.getElementById('input');
  const $mainModal = document.querySelector('.main__modal');
  const $nav = document.querySelector('nav');
  const $cart = document.getElementById('cart');
  const $contPrevAndNextBtn = document.querySelector('.main__cont-imgs');

  // draw in the DOM the added and removed products.
  const drawDOM = () => {
    if (numProducts) {
      document.querySelector('.header__cont-prods').classList.remove('header__cont-prods--hide');
      document.querySelector('.header__cart-cont-span').classList.add('header__cart-cont-span--hide');
      document.querySelector('.header__number-prod').classList.add('header__number-prod--show');
      document.querySelector('.header__total-price').textContent = `$${numProducts * 125}.00`;
      document.querySelector('.header__num-prods').textContent = numProducts;
      document.querySelector('.header__number-prod').textContent = numProducts;
    } else {
      document.querySelector('.header__cont-prods').classList.add('header__cont-prods--hide');
      document.querySelector('.header__cart-cont-span').classList.remove('header__cart-cont-span--hide');
      document.querySelector('.header__number-prod').classList.remove('header__number-prod--show');
      document.querySelector('.header__total-price').textContent = `$0.00`;
      document.querySelector('.header__num-prods').textContent = '';
      document.querySelector('.header__number-prod').textContent = '';
    }
  };
  // we take the last quantity of products and draw it to the DOM but  if it's zero we do nothing.
  let numProducts = +localStorage.getItem('quantity') || 0;
  if (numProducts) drawDOM();

  //we show a success or error message depending if the product has been added to the cart or not.
  const showSpanMessage = (type, text) => {
    const $span = document.querySelector('.main__span-message');
    $span.textContent = text;
    type === 'error' ? $span.classList.add('main__span-message--error') : $span.classList.add('main__span-message--success');
    setTimeout(() => $span.classList.remove('main__span-message--error', 'main__span-message--success'), 2000);
  };

  // this function adds the products to the cart if these conditions are true.
  const addProducts = () => {
    if (+$input.value > 0 && +$input.value < 10 && numProducts < 10) {
      numProducts += +$input.value;
      document.getElementById('number-prod').textContent = numProducts;
      $input.value = 0;
      drawDOM();
      showSpanMessage('success', 'The items have been added successfully');
      localStorage.setItem('quantity', numProducts);
    } else showSpanMessage('error', "An error can be because you can't add a zero value or you've reached the maximum products.");
  };

  // romoved all the added products.
  const remove = () => {
    numProducts = 0;
    localStorage.setItem('quantity', 0);
    drawDOM();
  };
  document.querySelector('.header__cont-delete-svg').addEventListener('click', remove);

  document.getElementById('main__cont-add-to-cart').addEventListener('click', e => {
    if (e.target.matches('#minus-btn') || e.target.matches('#plus-btn') || e.target.matches('#add-to-cart-btn')) {
      if (e.target.matches('#minus-btn') && +$input.value > 0) $input.value = +$input.value - 1;
      else if (e.target.matches('#plus-btn') && +$input.value < 10) $input.value = +$input.value + 1;
      else if (e.target.matches('#add-to-cart-btn')) addProducts();
      else showSpanMessage('error', `An error can be because you can't add a zero value or you've reached the maximum products.`);
    }
  });

  // This function allows us to scroll through clicks.
  const scroller = (direction, $currentTarget) => {
    const MAXSCROLL = $currentTarget.offsetWidth * 4;
    const options = { top: 0, behavior: 'smooth' };

    if (direction === 'left') $currentTarget.scrollLeft === 0 ? (options.left = 9999) : (options.left = -+`${MAXSCROLL / 4}`);
    else $currentTarget.scrollLeft + MAXSCROLL / 4 >= MAXSCROLL - 200 ? (options.left = -9999) : (options.left = MAXSCROLL / 4);
    $currentTarget.scrollBy(options);
  };

  // Change the big image depending on which image has been clicked.
  const changeImg = (id, num) => {
    const $bigImg = document.querySelector(id);
    $bigImg.src = `./assets/images/image-product-${num}.jpg`;
    $bigImg.dataset.imgActive = num;
    $bigImg
      .closest('.main__cont-imgs')
      .querySelectorAll('div[data-imgid]')
      .forEach($element => $element.classList.toggle('main__cont-img--active', $bigImg.dataset.imgActive === $element.dataset.imgid));
  };

  // header actions.
  document.querySelector('header').addEventListener('click', e => {
    if (e.target.matches('#menu')) $nav.classList.add('header__nav--show');
    else if (e.target.matches('#close-nav')) $nav.classList.remove('header__nav--show');
    else if (e.target.matches('#cont-cart-svg')) $cart.classList.add('header__cart--show');
    else if (e.target.matches('#close-cart')) $cart.classList.remove('header__cart--show');
  });

  // next an prev btn in the main.
  $contPrevAndNextBtn.addEventListener('click', e => {
    if (e.target.matches('#main-prev-btn')) scroller('left', e.currentTarget);
    else if (e.target.matches('#main-next-btn')) scroller('right', e.currentTarget);
  });

  // imgs in the main tag.
  document.getElementById('cont-imgs').addEventListener('click', e => {
    if (e.target.hasAttribute('data-imgid')) changeImg('#main-big-img', e.target.dataset.imgid);
    else if (e.target.matches('.main__cont-big--img')) $mainModal.classList.add('main__modal--active');
  });

  // modal events.
  $mainModal.addEventListener('click', e => {
    if (e.target.matches('.main__modal') || e.target.matches('.main__modal-cont-svg')) $mainModal.classList.remove('main__modal--active');
    else if (e.target.hasAttribute('data-imgid')) changeImg('#modal-big-img', e.target.dataset.imgid);
  });
});
