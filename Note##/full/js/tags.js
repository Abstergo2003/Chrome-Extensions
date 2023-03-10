class abstergos_note extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<textarea id="textarea-title"></textarea><br>
        <textarea id="textarea-note"></textarea>`
    }
}
customElements.define("abstergos-note", abstergos_note)

class abstergos_paint extends HTMLElement {
    connectedCallback() {
        var color_black = '<input type="radio" name="color" id="black" checked class="colors">'
        var color_red = '<input type="radio" name="color" id="red" class="colors">'
        var color_green = '<input type="radio" name="color" id="green" class="colors">'
        var color_blue = '<input type="radio" name="color" id="blue" class="colors">'
        var color_yellow = '<input type="radio" name="color" id="yellow" class="colors">'
        var color_custom = '<form id="customColorForm" onsubmit="return false"><input type="text" id="customColor" placeholder="#444"><input type="submit" style="position: absolute; left: -9999999px"></form>'
        var stroke_width = '<a style="padding-top: 20px;">Stroke Width</a><br><input type="range"  min="1" max="50" id="stroke" value="5"><br>'
        var tools_fill = '<li><input type="checkbox" id="fill" class="options-op"><img src="img/fill.svg"> fill</li>'
        var tools_rectangle = '<li><input type="radio" name="type" class="options-op" id="rectangle"><img src="img/rectangle.svg"> rectangle</li>'
        var tools_triangle = '<li><input type="radio" name="type" class="options-op" id="triangle"><img src="img/triangle.svg"> triangle</li>'
        var tools_circle = '<li><input type="radio" name="type" class="options-op" id="circle"><img src="img/oval.svg"> circle</li>'
        var tools_line = '<li><input type="radio" name="type" class="options-op" id="line"><img src="img/line.svg"> line</li>'
        var tools_brush = '<li><input type="radio" name="type" class="options-op" id="brush" checked><img src="img/brush.svg"> brush</li>'
        var tools_rubber = '<li><input type="radio" name="type" class="options-op" id="rubber"><img src="img/rubber.svg"> rubber</li>'
        var tools_text = '<li><input type="radio" name="type" class="options-op" id="text"><img src="img/text.svg"> text<input type="text" id="textIn"></li>'
        var button_clear = '<button id="clear">Clear</button><br>'
        var button_save = '<button id="save">Save</button>'
        var title = '<textarea id="title_p"></textarea>'
        var canvas = '<div class="canvas"><canvas id="canvas"></canvas></div>'
        this.innerHTML = '<div class="options">' + color_black + color_red + color_green + color_blue + color_yellow + color_custom + stroke_width + '<ul style="width: 100%; text-align: left; list-style: none; line-height: 40px;">' + tools_fill + tools_rectangle + tools_triangle + tools_circle + tools_line + tools_brush + tools_rubber + tools_text + '</ul>' + button_clear + button_save + title + '</div>' + canvas
    }
}
customElements.define('abstergos-paint', abstergos_paint)