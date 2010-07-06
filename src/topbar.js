$.widget('ui.topbar', {
    options: {
        'leftClass': 'left',
        'rightClass': 'right',
        'linkClass': 'link'
    },
    _create: function() {
        this.leftDiv = this._getDiv('leftClass').appendTo(this.element);
        this.rightDiv = this._getDiv('rightClass').appendTo(this.element);
    },
    destroy: function() {
    	this.leftDiv.remove();
    	this.rightDiv.remove();
    	$.Widget.prototype.destroy.apply(this, arguments);
	},
    _getDiv: function(cssClass) {
        return $('<div class="{class}"></div>'.replace('{class}', this.options[cssClass]))
    }
});