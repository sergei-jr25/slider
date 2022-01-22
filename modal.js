class Modal {
	constructor(options) {
		let defaultOptions = {
			isOpen: () => { },
			isClose: () => { }
		}
		this.options = Object.assign(defaultOptions, options)
		this.modal = document.querySelector('.modal__body')
		this.speed = 300
		this.animation = false
		this.isOpen = false
		this.modalItem = false
		this.previousActiveElement = false
		this.fixBlocks = document.querySelectorAll('.fix-block')
		this.focusElemnt = [
			'a[href]',
			'input',
			'button',
			'select',
			'textarea',
			'[tabIndex]'
		]
		this.events()
	}
	events() {
		if (this.modal) {
			document.addEventListener('click', function (e) {
				const clickedElement = e.target.closest('[data-path]')
				if (clickedElement) {
					let taregtId = clickedElement.dataset.path
					let animation = clickedElement.dataset.atnimation
					let speed = clickedElement.dataset.speed
					this.animation = animation ? animation : 'fade'
					this.speed = speed ? parseInt(speed) : 300
					this.modalItem = document.querySelector(`[data-id="${taregtId}"]`)
					console.log(this.modalItem);
					this.open();
					return;
				}
				if (e.target.closest('.modal__close')) {
					this.close()
					return
				}

			}.bind(this))
			window.addEventListener('keydown', function (e) {
				if (e.keyCode == 27) {
					if (this.isOpen) {
						this.close()
					}
				}
				if (e.keyCode == 9 && this.isOpen) {
					this.focucCath(e)
					return
				}
			}.bind(this))



			this.modal.addEventListener('click', function (e) {
				if (!e.target.closest('.modal__item') && this.isOpen) {
					this.close()
				}
			}.bind(this))
		}
	}

	open() {
		// отркыть окно
		// Отменить скролл
		// нет прыжка
		// фокус внутри окна
		// выделение первого
		// анимация
		this.previousActiveElement = document.activeElement;
		this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`)
		this.modal.classList.add('_open')
		this.disableScroll()

		this.modalItem.classList.add('modal-open')
		this.modalItem.classList.add(this.animation)

		setTimeout(() => {
			this.modalItem.classList.add('animate-open')
			this.options.isOpen(this)
			this.isOpen = true
			this.focusTrap()
		}, this.speed)
	}

	close() {
		if (this.modalItem) {
			this.modalItem.classList.remove('modal-open')
			this.modalItem.classList.remove(this.animation)
			this.modal.classList.remove('_open')
			this.modalItem.classList.remove('animate-open')


			this.enableScroll()
			this.options.isClose(this)
			this.isOpen = false
			this.focusTrap()
		}
	}

	focucCath(e) { // Метод для фокуса
		const focusable = this.modalItem.querySelectorAll(this.focusElemnt)
		const focusArray = Array.prototype.slice.call(focusable)
		const focusIndex = focusArray.indexOf(document.activeElement)
		console.log(focusIndex);

		if (e.shiftKey && focusIndex === 0) {
			focusArray[focusArray.length - 1].focus()
			e.preventDefault()
		}
		if (!e.shiftKey && focusIndex === focusArray.length - 1) {
			focusArray[0].focus()
			e.preventDefault()
		}
	}

	focusTrap() {

		const focusable = this.modalItem.querySelectorAll(this.focusElemnt)
		if (this.isOpen) {
			if (focusable) {
				focusable[0].focus()
			}
		} else {
			this.previousActiveElement.focus()
		}
	}

	disableScroll() {
		let pagePosition = window.scrollY
		this.lockPadding()
		document.body.classList.add('disable-scroll')
		document.body.dataset.position = pagePosition
		document.body.style.top = -pagePosition + 'px'

	}

	enableScroll() {
		let pagePosition = parseInt(document.dataset.position, 10)
		this.unlockPadding()
		document.body.style.top = 'auto'
		document.body.classList.remove('disable-scroll')
		window.scroll({ top: pagePosition, left: 0 })
		document.body.removeAttribute('data-position')

	}

	lockPadding() {
		const paddingOffset = window.innerWidth - document.body.offsetWidth;
		this.fixBlocks.forEach((el) => {
			el.style.paddingRight = paddingOffset
		})
		document.body.paddingRight = paddingOffset
	}

	unlockPadding() {
		this.fixBlocks.forEach((el) => {
			el.style.paddingRight = '0px'
		})
		document.body.paddingRight = '0px'
	}
}

const modal = new Modal({
	isOpen: (modal) => {
		console.log('opened');
	},
	isClose() {
		console.log('closed');
	}
})