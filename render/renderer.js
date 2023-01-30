class Renderer {
    constructor(view, viewSize, data) {
        this.view = view
        this.viewSize = viewSize
        this.data = data
        this.startVisible = 0
        this.endVisible = 0
    }

    calculateSize() {
        return {width: 0, height: 0}
    }

    setData(data) {
        this.data = data
    }

    render(startVisible, endVisible) {
        this.startVisible = startVisible
        this.endVisible = endVisible
    }
}