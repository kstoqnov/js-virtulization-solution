class TableRenderer extends Renderer {
    constructor(view, viewSize, data) {
        super(view, viewSize, data)
        this.rowHeight = 20
        this.startVisibleRow = 0
        this.endVisible = 0
        this.headers = undefined
    }

    calculateSize() {
        var size = {width: this.viewSize, height: 0}
        if (!this.hasFieldsAndRows()) {
            return size
        }

        size.height = this.rowHeight * (this.data.rows.length + 1)

        return size
    }

    render(startVisible, endVisible) {
        super.render(startVisible, endVisible)
        this.clearView()
        this.calculateVisibleRows()
        this.renderHeader()
        this.renderRows()
    }
    
    calculateVisibleRows() {
        this.startVisibleRow = Math.floor(this.startVisible / this.rowHeight)

        this.endVisibleRow = Math.ceil(this.endVisible / this.rowHeight)
    }

    hasFieldsAndRows() {
        return !(this.data === undefined || this.data.fields === undefined || this.data.rows === undefined)
    }

    clearView() {
        this.view.innerHTML = ""
    }

    renderHeader() {
        this.clearHeaders()

        this.headers = []
        
        var headerWidth = this.viewSize.width / this.data.fields.length
        var headerHeight = this.rowHeight

        var left = 0
        var top = 0

        for (var counter = 0; counter < this.data.fields.length; counter++ ){
            var field = this.data.fields[counter]

            var div = document.createElement("div")
            div.style.top = top + "px"
            div.style.left = left + "px"
            
            div.style.height = headerHeight + "px"
            div.style.width = headerWidth + "px"

            div.style.position = "absolute"
            div.style.overflow = "hidden"
            div.style.backgroundColor = "white"
            div.style.border = "1px solid #dddddd"
            div.style.color = "#aaaaaa"

            var labelDiv = document.createElement("div")
            labelDiv.style.verticalAlign = "middle"
            labelDiv.style.fontFamily = "Arial"
            labelDiv.style.fontSize = "10pt"
            div.appendChild(labelDiv)

            var text = document.createTextNode(field)
            labelDiv.appendChild(text)

            //this.view.parentElement.appendChild(div)
            this.view.parentElement.appendChild(div)
            this.headers.push(div)

            left += headerWidth
        }
    }

    clearHeaders() {
        if (this.headers === undefined) {
            return
        }

        this.headers.forEach(header => {
            this.view.parentElement.removeChild(header)
        });
    }

    renderRows() {
        var firstRow = this.startVisibleRow
        var lastRow = this.endVisibleRow + 1

        if (lastRow > this.data.rows.length - 1) {
            lastRow = this.data.rows.length - 1
        }

        var fieldWidth = this.viewSize.width / this.data.fields.length
        var rowHeight = this.rowHeight

        var left = 0
        var top = rowHeight + firstRow * rowHeight
        
        var fieldCount = this.data.fields.length

        for (var rowCounter = firstRow; rowCounter <= lastRow; rowCounter++) {
            var row = this.data.rows[rowCounter]
            for (var fieldCounter = 0; fieldCounter < row.length; fieldCounter++) {
                var field = row[fieldCounter]
                var div = document.createElement("div")
                div.style.top = top + "px"
                div.style.left = left + "px"
                
                div.style.height = rowHeight + "px"
                div.style.width = fieldWidth + "px"
    
                div.style.position = "absolute"
                div.style.overflow = "hidden"
                div.style.backgroundColor = "white"
                div.style.border = "1px solid #dddddd"
                div.style.color = "#aaaaaa"
                                
                var labelDiv = document.createElement("div")
                labelDiv.style.verticalAlign = "middle"
                labelDiv.style.fontFamily = "Arial"
                labelDiv.style.fontSize = "10pt"
                div.appendChild(labelDiv)
    
                var text = document.createTextNode(field)
                labelDiv.appendChild(text)

                this.view.appendChild(div)
    
                left += fieldWidth
            }
            left = 0
            top += rowHeight
        }
    }
}