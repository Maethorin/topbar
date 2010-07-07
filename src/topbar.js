$.widget('ui.topbar', {
    options: {
        'leftClass': '',
        'rightClass': '',
        'linkClass': '',
        'useHtml': false,
        'leftLinks': [],
        'rightLinks': [],
        'leftSeparator': '',
        'rightSeparator': ''
    },
    _create: function() {
        if (this.options.useHtml) {
            this._validateDivPresence('left');
            this._validateDivPresence('right');
        }
        else {
            this.element.html('');
            this._createDiv('left');
            this._createDiv('right');
        }
        this.element.prependTo($('body'));
    },
    destroy: function() {
        if (!this.options.useHtml) {
        	this.leftDiv.remove();
        	this.rightDiv.remove();
	    }
    	$.Widget.prototype.destroy.apply(this, arguments);
	},
    _validateDivPresence: function(position) {
        if (this.element.find('div.' + position).length == 0) {
            throw('The element must have a div with a class "{position}".'.replace('{position}', position))
        }        
    },
    _createDiv: function(position) {
        this[position + 'Div'] = this._getDiv(position).appendTo(this.element);
        this._putLinksInDiv(position);
    },
    _getDiv: function(position) {
        return $('<div class="{position} {class}"></div>'
                    .replace('{class}', this.options[position + 'Class'])
                    .replace('{position}', position)
                );
    },
    _putLinksInDiv: function(position) {
        for (var i = 0; i < this.options[position + 'Links'].length; i++) {
            item = this.options[position + 'Links'][i];
            var $el = $('<a></a>');
            $el.attr('href', item.href);
            if (item.current) {
                $el = $('<b></b>')
            }
            $el.text(item.text);
            $el.appendTo(this[position + 'Div']);
        }
    }
});