

const sliderContainer = document.querySelector('.slider-container');

const sliderSwiper = new Swiper(sliderContainer, {
	slidesPerView: 1,
	spaceBeteewn: 10,
	slideClass: 'slide',
	loop: true,
	pagination: {
		el: '.slider__dots',
		type: 'bullets',
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
	}
})

document.querySelector('.slide-to').addEventListener('click', e => {
	sliderSwiper.slideTo(2)
})

document.querySelector('.next').addEventListener('click', e => {
	sliderSwiper.slideNext(1200)
})
document.querySelector('.prev').addEventListener('click', e => {
	sliderSwiper.slidePrev(1200)
})


document.querySelector('.destroy').addEventListener('click', e => {

})
document.querySelector('.hide').addEventListener('click', e => {
	sliderContainer.style.display = "none"
})
document.querySelector('.up-date').addEventListener('click', e => {

	//sliderContainer.style.display = 'block';
	//sliderSwiper.upDate()
})

window.addEventListener('resize', () => {
	if (window.innerWidth <= 1267) {
		sliderSwiper.changeDirection('vertical')
	}
	else {
		sliderSwiper.changeDirection('horizontal')
	}
})





const sliderHori = new Swiper('.gorizonal__right', {
	slidesPerView: 1,

})




// =======
const items = document.querySelectorAll('.gorizonal__item');
const gorLeft = document.querySelector('.gorizonal__left');
const maxLength = 6

items.forEach((el, index) => {
	el.setAttribute('data-it', index)
	el.addEventListener('click', e => {
		const dataIt = e.target.closest('.gorizonal__item').dataset.it
		sliderHori.slideTo(dataIt)
		showMore()
	})

})

function showMore(el) {


	let chlderenlength = gorLeft.children.length
	if (chlderenlength > maxLength) {
		document.querySelectorAll(`.gorizonal__item:nth-child(n+${maxLength})`).forEach(el => { el.style.display = 'none' })
		gorLeft.insertAdjacentHTML('beforeend', `<button  >Еще: ${chlderenlength - maxLength} </button>`)

	}
}
showMore()


sliderHori.on('slideChange', () => {
	items.forEach(el => {
		el.classList.remove('_active')
	})
	document.querySelector(`.gorizonal__item[data-it="${sliderHori.realIndex}"]`).classList.add('_active')
})


const select = document.querySelector('select');

function rederTemplate() {
	return `
		<ul class="select__list" >
		<li class="select__item" >Пункт -1 </li>
		<li class="select__item" >Пункт -2</li>
		<li class="select__item" >Пункт -3</li>
		</ul>
	`
}
let flag = 0

select.addEventListener('click', e => {
	//select.length = ""
	if (flag = 0) {
		insertAdjacentHTML(rederTemplate(), 'beforebegin')
		flag = 1
	}

})