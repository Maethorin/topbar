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
    equals($('#topbar').html(), '', "O html do elemento deve estar vazio ao chamar destroy");
});

test('Barra criada possui opcoes padrao',
function() {
    $('#topbar').topbar();
    
    equals($('#topbar').topbar('option', 'leftClass'), '', 'leftClass');
    equals($('#topbar').topbar('option', 'rightClass'), '', 'rightClass');
    equals($('#topbar').topbar('option', 'linkClass'), '', 'linkClass');
    equals($('#topbar').topbar('option', 'useHtml'), false, 'useHtml');
    equals($('#topbar').topbar('option', 'leftSeparator'), '', 'leftSeparator');
    equals($('#topbar').topbar('option', 'rightSeparator'), '', 'rightSeparator');
    
    $('#topbar').topbar('destroy');
});

test('Barra sobrescreve opcao padrao',
function() {
    $('#topbar').topbar({'leftClass': 'other-left'});
    
    equals($('#topbar').topbar('option', 'leftClass'), 'other-left', 'leftClass deve ser alterada para "other-left"');

    $('#topbar').topbar('destroy');
});

test('Barra acrescenta opcao',
function() {
    $('#topbar').topbar({'class': 'new-class'});
    
    equals($('#topbar').topbar('option', 'class'), 'new-class', 'Deve existir nova class "new-class"');

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

test('Barra apaga html original antes de criar markup',
function() {
    $('#topbar').append($('<div id="naoDeveExistir"></div>'))
    $('#topbar').topbar();

    var $div = $('#topbar')
    equals($div.find('div#naoDeveExistir').length, 0, 'Não deve conter um div#naoDeveExistir.');

    $('#topbar').topbar('destroy');
});

test('Barra usa html original caso a opcao useHtml seja true.',
function() {
    var $div = $('#topbar')
    $div.append('<div class="left other-left"></div><div class="right other-right"></div>');
    $('#topbar').topbar({useHtml: true});

    equals($div.find('div.other-left').length, 1, 'Deve conter um div.other-left');
    equals($div.find('div.other-right').length, 1, 'Deve conter um div.other-right');

    $('#topbar').topbar('destroy');
    $div.html('');
});

test('Valida a existencia de um div.left caso useHtml seja true.',
function() {
    expect(1);
    var $div = $('#topbar')
    $div.append('<div class="other-left"></div><div class="right other-right"></div>');
    try {
        $('#topbar').topbar({useHtml: true});
    }
    catch(ex) {
        equals(ex, 'The element must have a div with a class "left".', 'Deve disparar um erro com a mensagem correta')
    }
    
    $('#topbar').topbar('destroy');
    $div.html('');
});

test('Valida a existencia de um div.right caso useHtml seja true.',
function() {
    expect(1);
    var $div = $('#topbar')
    $div.append('<div class="left other-left"></div><div class="other-right"></div>');
    try {
        $('#topbar').topbar({useHtml: true});
    }
    catch(ex) {
        equals(ex, 'The element must have a div with a class "right".', 'Deve disparar um erro com a mensagem correta')
    }
    
    $('#topbar').topbar('destroy');
    $div.html('');
});

test('Widget insere html no topo da página',
function () {
    $('#topbar').topbar();
    
    var $div = $('body div:first');
    equals($('#topbar').html(), $div.html());    
    $('#topbar').topbar('destroy');
});

test('Recebe json com links e exibe na esquerda',
function () {
    $('#topbar').topbar({
        'leftLinks': [
            {'text': 'Um link', 'href': '/umlink/'},
            {'text': 'Dois link', 'href': '/doislink/'},
            {'text': 'Três link', 'href': '/treslink/'},
        ]
    });
    
    var $div = $('#topbar')
    equals($div.find('div.left a').length, 3, 'Devem existir 3 links no div da esquerda');
    var href = $div.find('div.left a')[2].href.replace(window.location.protocol + "//" + window.location.host, '');
    equals(href, '/treslink/', 'O terceiro link deve apontar para /treslink/');
    $('#topbar').topbar('destroy');
});

test('Recebe json com links e exibe na direita',
function () {
    $('#topbar').topbar({
        'rightLinks': [
            {'text': 'Quatro link', 'href': '/quatrolink/'},
            {'text': 'Cinco link', 'href': '/cincolink/'},
            {'text': 'Seis link', 'href': '/seislink/'},
            {'text': 'Sete link', 'href': '/setelink/'},
        ]
    });
    
    var $div = $('#topbar')
    equals($div.find('div.right a').length, 4, 'Devem existir 4 links no div da direita');
    var href = $div.find('div.right a')[2].href.replace(window.location.protocol + "//" + window.location.host, '');
    equals(href, '/seislink/', 'O terceiro link deve apontar para /seislink/');

    $('#topbar').topbar('destroy');
});

test('Barra nao monta link para item marcado como current',
function () {
    $('#topbar').topbar({
        'leftLinks': [
            {'text': 'Um link', 'href': '/umlink/'},
            {'text': 'Dois link', 'href': '/doislink/'},
            {'text': 'Três link', 'href': '/treslink/'},
        ],
        'rightLinks': [
            {'text': 'Quatro link', 'href': '/quatrolink/'},
            {'text': 'Cinco link', 'current': true},
            {'text': 'Seis link', 'href': '/seislink/'},
            {'text': 'Sete link', 'href': '/setelink/'},
        ]
    });

    var $div = $('#topbar')
    equals($div.find('div.right a').length, 3, 'Devem existir 3 links no div da direita');
    var b = $div.find('div.right b');
    equals($div.find('div.right b').text(), 'Cinco link', 'O quinto elemento deve ser um b com texto "Cinco link"');

    $('#topbar').topbar('destroy');
});

test('Barra inclui separador se for diferente de vazio',
function () {
    $('#topbar').topbar({
        'leftSeparator': '#',
        'leftLinks': [
            {'text': 'Um link', 'href': '/umlink/'},
            {'text': 'Dois link', 'href': '/doislink/'},
            {'text': 'Três link', 'href': '/treslink/'},
        ],
        'rightSeparator': '|',
        'rightLinks': [
            {'text': 'Quatro link', 'href': '/quatrolink/'},
            {'text': 'Cinco link', 'current': true},
            {'text': 'Seis link', 'href': '/seislink/'},
            {'text': 'Sete link', 'href': '/setelink/'},
        ]
    });
    equals($('#topbar div.left').text(), 'Um link#Dois link#Três link')
    equals($('#topbar div.right').text(), 'Quatro link|Cinco link|Seis link|Sete link')        
});
