module('TopBar Tests');

test('Componentes necessários',
function() {
    ok($.fn, 'JQuery');
    ok($.ui, 'JQuery UI');
    ok($.widget, 'JQuery Widget');
    //ok($.template, 'JQuery Template');
    ok($.fn.topbar, 'TopBar');
});

test('Barra é destruida com sucesso',
function() {
    $('#topbar').topbar();
    $('#topbar').topbar('destroy');
    equals($('#topbar').html(), '');
});

test('Barra criada possui opcoes padrao',
function() {
    $('#topbar').topbar();
    
    equals($('#topbar').topbar('option', 'leftClass'), 'left');
    equals($('#topbar').topbar('option', 'rightClass'), 'right');
    equals($('#topbar').topbar('option', 'linkClass'), 'link');
    
    $('#topbar').topbar('destroy');
});

test('Barra sobrescreve opcao padrao',
function() {
    $('#topbar').topbar({'leftClass': 'other-left'});
    
    equals($('#topbar').topbar('option', 'leftClass'), 'other-left');

    $('#topbar').topbar('destroy');
});

test('Barra acrescenta opcao',
function() {
    $('#topbar').topbar({'class': 'new-class'});
    
    equals($('#topbar').topbar('option', 'class'), 'new-class');

    $('#topbar').topbar('destroy');
});

test('Barra cria markup left e right padrao na div',
function() {
    $('#topbar').topbar();
    var $div = $('#topbar')
    equals($div.find('div.left').length, 1, 'Deve conter um div.left');
    equals($div.find('div.right').length, 1, 'Deve conter um div.right');

    $('#topbar').topbar('destroy');
});

test('Barra cria markup com classe passada',
function() {
    $('#topbar').topbar({'leftClass': 'new-left', 'rightClass': 'new-right'});
    var $div = $('#topbar')
    equals($div.find('div.new-left').length, 1, 'Deve conter um div.new-left');
    equals($div.find('div.new-right').length, 1, 'Deve conter um div.new-right');

    $('#topbar').topbar('destroy');
});
