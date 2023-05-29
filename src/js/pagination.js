export const renderPageNumber = (page, totalPages) => {
  if (page > 1) {
    const headerHeight = document.querySelector('header').offsetHeight;
    window.scrollTo({
      top: headerHeight,
      behavior: 'smooth',
    });
  }
  const pagePrevious = document.getElementById('previous');
  const pageFirst = document.getElementById('first');
  const pageDot = document.getElementById('dot');
  const pageMinus2 = document.getElementById('minus2');
  const pageMinus1 = document.getElementById('minus1');
  const pageCurrent = document.getElementById('current');
  const pagePlus1 = document.getElementById('plus1');
  const pagePlus2 = document.getElementById('plus2');
  const pageDot2 = document.getElementById('dot2');
  const pageLast = document.getElementById('last');
  const pageNext = document.getElementById('next');
  pageFirst.innerHTML = 1;
  pageMinus2.innerHTML = Number(page) - 2;
  pageMinus1.innerHTML = Number(page) - 1;
  pageCurrent.innerHTML = page;
  pagePlus1.innerHTML = Number(page) + 1;
  pagePlus2.innerHTML = Number(page) + 2;
  pageLast.innerHTML = Number(+totalPages);

  if (+totalPages === 1) {
    pagePrevious.classList.add('is-hidden');
    pageFirst.classList.add('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.add('is-hidden');

    pagePlus1.classList.add('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.add('is-hidden');
    pageNext.classList.add('is-hidden');
  } else if (+totalPages === 2) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.add('is-hidden');

    pagePlus1.classList.add('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+totalPages === 3) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+totalPages === 4) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+totalPages === 5) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === 1) {
    pagePrevious.classList.add('is-hidden');
    pageFirst.classList.add('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.add('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === 2) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.add('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === 3) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === 4) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === +totalPages) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.add('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.add('is-hidden');
    pageNext.classList.add('is-hidden');
  } else if (+page === +totalPages - 1) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.add('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === +totalPages - 2) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else if (+page === +totalPages - 3) {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  } else {
    pagePrevious.classList.remove('is-hidden');
    pageFirst.classList.remove('is-hidden');
    pageDot.classList.remove('is-hidden');
    pageMinus2.classList.remove('is-hidden');
    pageMinus1.classList.remove('is-hidden');

    pagePlus1.classList.remove('is-hidden');
    pagePlus2.classList.remove('is-hidden');
    pageDot2.classList.remove('is-hidden');
    pageLast.classList.remove('is-hidden');
    pageNext.classList.remove('is-hidden');
  }

  // LEFT:

  if (+pageCurrent.innerHTML === 1) {
    pagePrevious.classList.add('is-hidden');
    pageFirst.classList.add('is-hidden');
    pageDot.classList.add('is-hidden');
    pageMinus1.classList.add('is-hidden');
    pageMinus2.classList.add('is-hidden');
  }
  if (+pageMinus2.innerHTML <= 1) {
    pageMinus2.classList.add('is-hidden');
  }
  if (+pageMinus1.innerHTML <= 1) {
    pageMinus1.classList.add('is-hidden');
  }
  if (+pageCurrent.innerHTML === 2) {
    pageDot.classList.add('is-hidden');
  }
  if (+pageMinus1.innerHTML - 1 === 1) {
    pageDot.classList.add('is-hidden');
  }
  if (+pageMinus2.innerHTML - 1 === 1) {
    pageDot.classList.add('is-hidden');
  }

  // RIGHT:

  if (+pageCurrent.innerHTML === +totalPages) {
    pagePlus2.classList.add('is-hidden');
    pagePlus1.classList.add('is-hidden');
    pageDot2.classList.add('is-hidden');
    pageLast.classList.add('is-hidden');
    pageNext.classList.add('is-hidden');
  }
  if (+pagePlus1.innerHTML >= +totalPages) {
    pagePlus1.classList.add('is-hidden');
  }
  if (+pagePlus2.innerHTML >= +totalPages) {
    pagePlus2.classList.add('is-hidden');
  }
  if (+pageCurrent.innerHTML + 1 === +totalPages) {
    pageDot2.classList.add('is-hidden');
  }
  if (+pagePlus1.innerHTML + 1 === +totalPages) {
    pageDot2.classList.add('is-hidden');
  }
  if (+pagePlus2.innerHTML + 1 === +totalPages) {
    pageDot2.classList.add('is-hidden');
  }
};
