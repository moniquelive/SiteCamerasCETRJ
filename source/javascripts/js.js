function Camera(id, label) {
  this.id = id;
  this.label = label;
}

var live_cams_prefix = "http://radar_g1-f.akamaihd.net";
var live_cams = [
    ["/radarg1_rj_riodejaneiro1w@18765", "Av. Rodrigues Alves x R. Prof. Pereira Reis"],
    ["/radarg1_rj_riodejaneiro2w@18765", "Elevado da Perimetral, descida para Av. Presidente Vargas"],
    ["/radarg1_rj_riodejaneiro3w@18765", "Av. Brasil, altura da R. Eduardo Luiz Lopes"],
    ["/radarg1_rj_riodejaneiro4w@18765", "Av. Borges de Medeiros x Av. Epitácio Pessoa"],
    ["/radarg1_rj_riodejaneiro5w@18765", "R. Mário Ribeiro x Av. Borges de Medeiros"],
    ["/radarg1_rj_riodejaneiro6w@18765", "Aterro x Av. Oswaldo Cruz"],
    ["/radarg1_rj_riodejaneiro7w@18765", "Av. Nossa Sra. de Copacabana (Lido)"],
    ["/radarg1_rj_riodejaneiro8w@18765", "Autoestrada Lagoa-Barra em frente shoping Fashion Mall"],
    ["/radarg1_rj_riodejaneiro9w@18765", "R. Barata Ribeiro x R. Constante Ramos"],
    ["/radarg1_rj_riodejaneiro10w@36574", "Praia do Flamengo x R. Barão do Flamengo"],
    ["/radarg1_rj_riodejaneiro11w@36574", "Praça Sibélius"],
    ["/radarg1_rj_riodejaneiro12w@36574", "Viaduto Saint Hilaire, saída do Túnel Rebouças, sobre a Rua Jard"],
    ["/radarg1_rj_riodejaneiro13w@36574", "R. Jardim Botânico, altura da Praça Santos Dumont"],
    ["/radarg1_rj_riodejaneiro14w@78", "Praça da Bandeira"],
    ["/radarg1_rj_riodejaneiro15w@78", "R. Conde de Bonfim x R. General Rocca"],
    ["/radarg1_rj_riodejaneiro16w@78", "R. Vinte Quatro de Maio x R. Bela Vista"],
    ["/radarg1_rj_riodejaneiro17w@78", "R. Arquias Cordeiro x R. José dos Reis (Engenhão)"],
    ["/radarg1_rj_riodejaneiro18w@78", "Av. Brasil, altura de Benfica"],
    ["/radarg1_rj_riodejaneiro19w@78", "Elevado Eng. Freyssinet, próximo ao Túnel Rebouças"],
    ["/radarg1_rj_riodejaneiro20w@78", "Av. Brasil, altura R. Paris"],
    ["/radarg1_rj_riodejaneiro21w@78", "Av. Brasil, altura da Linha Vermelha"],
    ["/radarg1_rj_riodejaneiro22w@78", "Linha Vermelha - Km 1, pista superior"],
    ["/radarg1_rj_riodejaneiro23w@36574", "Av. Ayrton Senna x R. Abelardo Bueno"],
    ["/radarg1_rj_riodejaneiro24w@36574", "Av. Ayrton Senna x Hospital Lourenço Jorge"],
    ["/radarg1_rj_riodejaneiro25w@36574", "Av. das Américas, altura da Av. Luis Carlos Prestes"],
    ["/radarg1_rj_riodejaneiro26w@36574", "Av. Armando Lombardi, acesso Barra Point"]
];

var zonas = {
  'AvBrasil':[
  new Camera(92, 'Av. Brasil, altura de Benfica'),
  new Camera(107, 'Alfredo Agache, ENTRADA do Mergulhão, sentido Brasil'),
  new Camera(139, 'Av. Brasil, altura da R. Eduardo Luiz Lopes'),
  new Camera(144, 'Av. Brasil, altura da Linha Amarela'),
  new Camera(146, 'Av. Brasil, altura R. Paris'),
  new Camera(145, 'Av. Brasil x Canal do Cunha'),
  new Camera(147, 'Av. Brasil, entrada da Ilha'),
  new Camera(150, 'Prédio Prefeitura - CASS'),
  new Camera(152, 'Av. Brasil, altura Av. Automóvel Clube'),
  new Camera(153, 'Av. Brasil, altura da R. João Paulo'),
  new Camera(154, 'Av. Brasil, altura de Deodoro'),
  new Camera(156, 'Av. Brasil x Estr. do Quafá'),
  new Camera(157, 'Av. Brasil, altura Km 42 - Mendanha'),
  new Camera(158, 'Av. Brasil x Av Padre Guilherme Decaminada (em frente ao Extra)'),
  new Camera(169, 'Av. Brasil, altura da Linha Vermelha'),
  new Camera(170, 'Av. Brasil, altura do Cemitério do Caju'),
  new Camera(172, 'Rua Visconde de Cabo Frio x Praça Barão Corumbá'),
  new Camera(173, 'Av. Brasil x GAE')
  ],
  'Sul':[
  new Camera(12, 'R. das Laranjeiras X Soares Cabral'),
  new Camera(13, 'Praia de Botafogo x Viaduto'),
  new Camera(14, 'R. São Clemente x R. Muniz de Barreto'),
  new Camera(15, 'R. São Clemente x Consulado Português'),
  new Camera(16, 'R. Jardim Botânico próximo ao Parque Lage'),
  new Camera(17, 'Av. Borges de Medeiros x Av. Epitácio Pessoa'),
  new Camera(18, 'R. Mário Ribeiro x Av. Borges de Medeiros'),
  new Camera(19, 'R. Voluntários da Pátria x R. Real Grandeza'),
  new Camera(20, 'Aterro x Av. Oswaldo Cruz'),
  new Camera(23, 'R. Barata Ribeiro x R. Duvivier'),
  new Camera(24, 'Av. Nossa Sra. de Copacabana (Lido'),
  new Camera(25, 'Av. Atlântica x Av. Princesa Isabel'),
  new Camera(26, 'Av. Atlântica x R. Figueiredo de Magalhães'),
  new Camera(27, 'Av. N. Sra. de Copacabana x R. Sta. Clara'),
  new Camera(28, 'Av. Atlântica x R. Rainha Elisabeth'),
  new Camera(29, 'Corte do Cantagalo, Pça. Eugênio Jardim'),
  new Camera(30, 'R. Raul Pompéia x R. Francisco Otaviano'),
  new Camera(31, 'Av. Vieira Souto x R. Rainha Elizabeth'),
  new Camera(32, 'Av. Epitácio Pessoa x R. Maria Quitéria'),
  new Camera(33, 'Av. Delfim Moreira x R. Bartolomeu Mitre'),
  new Camera(34, 'R. Visconde de Pirajá x R. Gomes Carneiro'),
  new Camera(35, 'R. Barata Ribeiro x R. Constante Ramos'),
  new Camera(42, 'R. Praia do Flamengo x R. Barão do Flamengo'),
  new Camera(43, 'R. Humaitá x R. Macedo Sobrinho'),
  new Camera(44, 'R. Jardim Botânico x R. Pacheco Leão'),
  new Camera(45, 'Praça Sibélius'),
  new Camera(46, 'R. Voluntários da Pátria x R. Praia de Botafogo'),
  new Camera(47, 'Av. Lauro Sodré x R. Venceslau Brás'),
  new Camera(49, 'R.Barata Ribeiro x R. Siqueira Campos'),
  new Camera(50, 'Av. N. Sra. de Copacabana x R. Alm. Gonçalves'),
  new Camera(51, 'R. Visconde de Pirajá x R. Maria Quitéria'),
  new Camera(52, 'R. Ataulfo de Paiva x R. Afrânio de Melo Franco'),
  new Camera(95, 'R. Pinheiro Machado, altura da R. Carlos de Campos'),
  new Camera(96, 'R. Pinheiro Machado, altura da R. das Laranjeiras'),
  new Camera(97, 'Viaduto Eng. Noronha, sob Viaduto Jardel Filho'),
  new Camera(112, 'Viaduto Saint Hilaire, saída do Túnel Rebouças, sobre a Rua Jardim Botânico'),
  new Camera(113, 'Av. Borges de Medeiros, altura da Av. Lineu de Paula Machado'),
  new Camera(114, 'Av. Borges de  Medeiros, altura da R. J. J. Seabra'),
  new Camera(115, 'Av. Borges de  Medeiros, altura da R. Gal. Garzon'),
  new Camera(116, 'Av. Epitácio Pessoa, próximo ao Jardim de Alah'),
  new Camera(117, 'R. Jardim Botânico, altura da Praça Santos Dumont'),
  new Camera(118, 'Av. Epitácio Pessoa, próximo ao Corte do Cantagalo'),
  new Camera(119, 'Av. Epitácio Pessoa, próximo ao Parque da Catacumba'),
  new Camera(122, 'Auto Estrada / Estr. do Joá, Próximo ao Túnel de São Conrado'),
  new Camera(123, 'Auto Estrada, alt. Túnel de São Conrado'),
  new Camera(141, 'Saída do Túnel Rebouças')
  ],
  'Centro':[
  new Camera(1, 'Av. Pres.Vargas X R. 1º Março - teste'),
  new Camera(2, 'Av. Pres.Vargas X Av. Rio Branco'),
  new Camera(3, 'Av. Pres.Vargas X Pça. da República'),
  new Camera(4, 'Praça Mauá'),
  new Camera(5, 'Av. Rio Branco X Aterro'),
  new Camera(6, 'Av. Rio Branco X Av. Alm. Barroso'),
  new Camera(7, 'R. Camerino X R. Barão de São Felix'),
  new Camera(8, 'R. Visconde do Rio Branco X Pça. da República'),
  new Camera(9, "Av. Presidente Antonio Carlos x Av. Almirante Barroso"),
  new Camera(10, 'R. Santana X R. Frei Caneca'),
  new Camera(11, 'Largo do Estácio'),
  new Camera(36, 'Trevo das Forças Armadas'),
  new Camera(37, 'Av. Francisco Bicalho x R. Francisco Eugênio'),
  new Camera(38, 'Av. Rodrigues Alves x R. Prof. Pereira Reis'),
  new Camera(39, 'Av. Pres. Antonio Carlos x Av. Franklin Roosevelt'),
  new Camera(40, 'Praça Tiradentes'),
  new Camera(41, 'Lapa'),
  new Camera(53, 'Av. Presidente Wilson x Consulado EUA'),
  new Camera(98, 'Av. 31 de Março, saída do Túnel Santa Bárbara'),
  new Camera(99, 'Av. 31 de Março, praça da Apoteose, próximo. à R. Frei Caneca'),
  new Camera(100, 'Av. 31 de Março, altura da Av. Salvador de Sá'),
  new Camera(101, 'Av. 31 de Março, altura da Av. Presidente Vargas'),
  new Camera(102, 'Vias Elevadas Prof. Eng. Rufino de Almeida, altura Leopoldina, pista inferior'),
  new Camera(104, 'Vias Elevadas Prof. Eng. Rufino de Almeida, altura Leopoldina, pista superior'),
  new Camera(105, 'Elevado Eng. Freyssinet, próximo R. João Paulo'),
  new Camera(106, 'Elevado da Perimetral, descida para Av. Presidente Vargas'),
  new Camera(108, 'Av. General Justo, próximo ao Aeroporto Santos Dumont'),
  new Camera(109, 'Elevado da Perimetral, altura da Av. Gal. Justo'),
  new Camera(110, 'Alfredo Agache, SAÍDA do Mergulhão, sentido Aterro'),
  new Camera(111, 'Av. Venceslau Brás, próximo ao GMAR')
  ],
  'LinVermelha':[
  new Camera(103, 'Linha Vermelha, Km 0'),
  new Camera(160, 'Av. Cesário de Melo x Estrada do Monteiro'),
  new Camera(161, 'Linha Vermelha - Km 1, pista superior'),
  new Camera(162, 'Linha Vermelha KM1 x Pista Inferior'),
  new Camera(163, 'Linha Vermelha KM3 x altura do Caju'),
  new Camera(164, 'Linha Vermelha KM4 x Linha Amarela'),
  new Camera(165, 'Linha Vermelha KM5 x Batalhão da Maré'),
  new Camera(166, 'Linha Vermelha x Altura da Ilha'),
  new Camera(167, 'Linha Vermelha x Altura da Ilha')
  ],
  'Oeste':[
  new Camera(54, 'Av. Embaixador Abelardo Bueno x Estr. Cel. Pedro Correa'),
  new Camera(55, 'Praça da Taquara'),
  new Camera(57, 'Av. Ayrton Senna x R. Abelardo Bueno'),
  new Camera(58, 'Av. Ayrton Senna x Av.Via Parque'),
  new Camera(59, 'Av. Ayrton Senna x Hospital Lourenço Jorge'),
  new Camera(60, 'Av. Ayrton Senna x Av. Lúcio Costa'),
  new Camera(61, 'Av. Sernambetiba x Ponte Lúcio Costa'),
  new Camera(62, 'Av. Sernambetiba x Praça do O'),
  new Camera(63, 'Av. das Américas x R. Felicissimo Cardoso'),
  new Camera(64, 'Av. das Américas (Supermercado Extra'),
  new Camera(65, 'Av. das Américas x Ponte Lúcio Costa'),
  new Camera(66, 'R. Armando Lombardi x Av. Min. Ivan Lins'),
  new Camera(67, 'Praia de São Conrado'),
  new Camera(68, 'Auto-estrada Lagoa-Barra em frente shopping Fashion Mall'),
  new Camera(120, 'Auto Estrada Lagoa-Barra x Av. Niemeyer'),
  new Camera(125, 'Elevado das Bandeiras, pista superior, entre os túneis São Conrado e Joá'),
  new Camera(126, 'Auto Estrada Lagoa-Barra, próximo à R. Maria Luiza Pitanga'),
  new Camera(127, 'Av. Armando Lombardi, acesso Barra Point'),
  new Camera(129, 'Av. das Américas, próximo ao nº 2211, Hotel Dunas'),
  new Camera(130, 'Av. das Américas, Próximo ao n° 3434, Centro Empresarial Mário Henrique Simonsem'),
  new Camera(131, 'Av. das Américas, Altura da Av. Luis Carlos Prestes'),
  new Camera(132, 'Av. das Américas, altura da Av. Ayrton Senna, sobre o Cebolão'),
  new Camera(133, 'Av. das Américas x R. Jornalista Ricardo Marinho'),
  new Camera(134, 'Av. das Américas, altura da A. Afonso Arinos de Mello Franco, EuroBarra'),
  new Camera(135, 'Av. Ayrton Senna, subida da Linha Amarela'),
  new Camera(136, 'Av. Ayrton Senna, próximo ao SENAC'),
  new Camera(140, 'Elevado Eng. Freyssinet, próximo ao Túnel Rebouças'),
  new Camera(142, 'R. Visconde de Niterói, altura Mangueira'),
  new Camera(143, 'Praça Santo Cristo, antes da Igreja, sentido Rodrigues Alves')
  ],
  'Norte':[
  new Camera(21, 'Praça da Bandeira'),
  new Camera(22, 'Av. Pres. Castelo Branco x R. Radialista Waldir Amaral'),
  new Camera(48, 'Av. Maracanã x R. Eurico Rabelo'),
  new Camera(69, 'Av. Pres. Castelo Branco x R. General Canabarro'),
  new Camera(70, 'R. Pereira Nunes x R. Barão de Mesquita'),
  new Camera(71, 'R. São Francisco Xavier x R. Heitor Beltrão'),
  new Camera(72, 'R. Conde de Bonfim x R. Uruguai'),
  new Camera(73, 'R. Conde de Bonfim x R. General Rocca'),
  new Camera(74, 'Boulevard 28 de Setembro x R. São Francisco Xavier'),
  new Camera(75, 'R. Uruguai x R. Maxwell'),
  new Camera(76, 'Av. Maracanã x R. Deputado Soares Filho'),
  new Camera(77, 'R. Teodoro da Silva x R. Barão de São Francisco'),
  new Camera(78, 'Av. Pres. Castelo Branco x R. São Francisco Xavier'),
  new Camera(79, 'R. Teodoro da Silva x R. Barão Bom Retiro'),
  new Camera(80, 'Av. Marechal Rondom x R. Barão do Bom Retiro'),
  new Camera(81, 'R. Vinte Quatro de Maio x R. Bela Vista'),
  new Camera(82, 'R. 24 de Maio x R. Cônego Tobias'),
  new Camera(83, 'R. Arquias Cordeiro x R. José dos Reis (Engenhão'),
  new Camera(84, 'R. Ana Néri x R. Licínio Cardoso'),
  new Camera(85, 'R. Dias da Cruz x R. Hermengarda'),
  new Camera(86, 'R. Dias da Cruz x R. Maranhão'),
  new Camera(87, 'R. Amaro Cavalcanti x Viaduto Todos os Santos'),
  new Camera(88, 'R. Aristides Caire x R. Santa Fé'),
  new Camera(89, 'Av. Dom Helder Câmara x Viaduto de Pilares'),
  new Camera(90, 'Av. Dom Helder Câmara x R. Gandavo'),
  new Camera(91, 'Av. Dom Helder Câmara x R. Leopoldo Bulhões'),
  new Camera(93, 'R. Sen. Bernardo Monteiro x R. São Luis Gonzaga'),
  new Camera(94, 'Largo da Cancela, R. S. Luis Gonzaga x R. João Ricardo'),
  new Camera(138, 'Elevado Paulo de Frontin - Altura da Rua João Paulo I')
  ]
};

jQuery(function($) {
  var menu = $('#navigation-menu');
  var menuToggle = $('#js-mobile-menu');

  $(menuToggle).on('click', function(e) {
    e.preventDefault();
    menu.slideToggle(function(){
      if(menu.is(':hidden')) {
        menu.removeAttr('style');
      }
    });
  });
});

jQuery(function($) {
  $('.accordion-tabs').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();
  });
  $('.accordion-tabs').on('click', 'li > a', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs')
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
  });
});

jQuery(function ($) {
  // utility format() method for js' String
  if (!String.format) {
    String.format = function(format) {
      var args = Array.prototype.slice.call(arguments, 1);
      return format.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
  }

  // fix sub nav on scroll
  var $win    = $(window)
    , tabs    = $('.accordion-tabs')
    , $nav    = $('.accordion-tabs')
    , navTop  = $('.accordion-tabs').offset().top + 40
    , isFixed = 0;

  function processScroll() {
    var scrollTop = $win.scrollTop();
    if (scrollTop >= navTop && !isFixed) {
      isFixed = 1;
      $nav.addClass('subnav-fixed');
    } else if (scrollTop <= navTop && isFixed) {
      isFixed = 0;
      $nav.removeClass('subnav-fixed');
    }
  }

  //TODO: reenable fixed tabs
  //processScroll();
  //$win.on('scroll', processScroll);

  // update time
  $.getJSON("http://php.camerasrj.com.br/gettime.php?callback=?", function(data) {
    $("span#time").html(data.time);
  });

  // update cameras
  //var CAM_PREFIX = 'http://img.camerasrj.com.br/cam';
  // var CAM_PREFIX = 'http://cdn.camerasrj.com.br/cam';
  var CAM_PREFIX = 'https://s3-sa-east-1.amazonaws.com/camerasrj/cam';

  var tabTemplate = '<li class="tab-header-and-content">'+
                    '  <a href="#" class="tab-link" onclick=\'_gaq.push(["_trackEvent", "Zona", "{0}"]);\'>{0}</a>'+
                    '  <section>'+
                    '    <ul>'+
                    '      {1}'+
                    '    </ul>'+
                    '  </section>'+
                    '</li>';

  // for each zona
  $.each(zonas, function (zona, cameras) {
    var cc = $.map(cameras, function (camera) {
      return String.format('<li>'+
                          '<p>{0}</p>'+
                          '<img src="{1}/{2}.jpg" />'+
                          '</li>', camera.label, CAM_PREFIX, camera.id);
    }).join('');
    tabs.append(String.format(tabTemplate, zona, cc));
  });

  // live cams
  var cc = $.map(live_cams, function (camera) {
    return String.format('<li>'+
                         '<p class="caption">{0}</p>'+
                         '<embed src="http://radar.g1.globo.com/FinxiPlayer.swf" flashvars="urlMedia={1}" width="476" height="238" quality="high" align="middle" type="application/x-shockwave-flash" pluginspage="http://www.adobe.com/go/getflashplayer">'+
                         '</li>', camera[1], live_cams_prefix + camera[0]);
  }).join('');
  tabs.append(String.format(tabTemplate, "AoVivo", cc));

  // initial state
  tabs.find(':first > a').addClass('is-active');
  tabs.find(':first > section').addClass('is-open').attr('style','display:block;');

  $('.tab-header-and-content > a').bind('click', function(e) {
    $.smoothScroll();
  });
});
