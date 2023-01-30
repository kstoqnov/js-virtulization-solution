class SimpleBar {
    constructor() {
        this.viewElement = undefined
        this.childViewElement = undefined
        
        this.barWidth = 10
        this.tickerHeight = 4
        
        this.viewWidth = undefined
        this.viewHeight = undefined

        this.childViewWidth = undefined
        this.childViewHeight = undefined
        
        this.scrollBarDiv = undefined
        this.tickerDiv = undefined
        this.tickerPosition = 0

        this.outOfViewHeight = 0

        this.onMouseMoveHandler = undefined
        this.onScrolled = undefined
        this.fixedChildHeight = undefined
    }

    attachViews(viewElement, childViewElement, onScrolled, fixedChildHeight) {
        this.viewElement = viewElement
        this.childViewElement = childViewElement
        this.onScrolled = onScrolled
        this.fixedChildHeight = fixedChildHeight

        this.calculateWidthsAndHeights()

        this.createScrollBar()
        this.createTicker()

        this.registerForMouseEvents()
        this.scrollToTickerY(0)
    }

    calculateWidthsAndHeights() {
        this.viewWidth = this.viewElement.offsetWidth
        this.viewHeight = this.viewElement.offsetHeight

        this.childViewWidth = this.childViewElement.offsetWidth
        this.childViewHeight = this.fixedChildHeight === undefined ? this.childViewElement.offsetHeight : this.fixedChildHeight

        this.outOfViewHeight = this.childViewHeight - this.viewHeight
        this.outOfViewHeight = this.outOfViewHeight < 0 ? 0 : this.outOfViewHeight
    }

    createScrollBar() {
        var scrollBarDiv = document.createElement("div")
        this.scrollBarDiv = scrollBarDiv

        scrollBarDiv.style.position = "absolute"
        scrollBarDiv.style.width = this.barWidth - 2 + "px"
        scrollBarDiv.style.height = this.viewHeight - 2 + "px"
        scrollBarDiv.style.backgroundColor = "#dddddd"
        scrollBarDiv.style.border = "1px solid #aaaaaa"
        scrollBarDiv.style.cursor = "default"
        scrollBarDiv.style.left = this.viewWidth - this.barWidth + "px"
        scrollBarDiv.style.top = 0 + "px"
        scrollBarDiv.style.zIndex = 1000
        viewElement.appendChild(this.scrollBarDiv)
    }

    createTicker() {
        var tickerDiv = document.createElement("div")
        this.tickerDiv = tickerDiv
        tickerDiv.style.position = "absolute"
        tickerDiv.style.width = this.barWidth - 2 + "px"
        tickerDiv.style.height = this.tickerHeight
        tickerDiv.style.backgroundColor = "#aaaaaa"
        tickerDiv.style.left = 0 + "px"
        tickerDiv.style.top = 0 + "px"
        tickerDiv.style.zIndex = 1001
        this.scrollBarDiv.appendChild(this.tickerDiv)
    }

    registerForMouseEvents() {
        this.onMouseMoveHandler = this.onMouseMove.bind(this)

        this.scrollBarDiv.onpointerdown = this.onPointerDown.bind(this)
        this.scrollBarDiv.onmousedown = this.onMouseDown.bind(this)
        this.scrollBarDiv.onmouseup = this.onMouseUp.bind(this)
    }

    onPointerDown(event) {
        this.scrollBarDiv.setPointerCapture(event.pointerId)
    }

    onMouseDown(event) {
        event.target.addEventListener("mousemove", this.onMouseMoveHandler , false)
        this.scrollToTickerY(event.clientY)
    }

    onMouseUp(event) {
        event.target.removeEventListener("mousemove", this.onMouseMoveHandler, false)
    }

    onMouseMove(event) {
        this.scrollToTickerY(event.clientY)
        event.preventDefault()
    }

    scrollToTickerY(tickerPosition) {
        //var tickerPosition = event.clientY
        tickerPosition = tickerPosition > this.viewHeight ? this.viewHeight : tickerPosition
        tickerPosition = tickerPosition < 0 ? 0 : tickerPosition
        
        this.tickerDiv.style.top = tickerPosition + "px"

        var proportionMovedAlongY = tickerPosition / this.viewHeight

        var lengthViewShouldMove = proportionMovedAlongY * this.outOfViewHeight

        this.childViewElement.style.top = -1 * lengthViewShouldMove + "px"

        if (this.onScrolled == null) {
            return
        }

        //let client know view has scrolled and what the range of visibility is. For virtual scrolling
        this.onScrolled(lengthViewShouldMove, lengthViewShouldMove + this.viewHeight)
    }
}