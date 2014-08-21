(function(){ // just a scope

  var cameras = {
    zonas: [
      { title: 'AvBrasil',
        cameras: [
        {id:  92, caption: 'Av. Brasil, altura de Benfica'},
        {id: 107, caption: 'Alfredo Agache, ENTRADA do Mergulhão, sentido Brasil'},
        {id: 139, caption: 'Av. Brasil, altura da R. Eduardo Luiz Lopes'},
        {id: 144, caption: 'Av. Brasil, altura da Linha Amarela'},
        {id: 146, caption: 'Av. Brasil, altura R. Paris'},
        {id: 145, caption: 'Av. Brasil x Canal do Cunha'},
        {id: 147, caption: 'Av. Brasil, entrada da Ilha'},
        {id: 150, caption: 'Prédio Prefeitura - CASS'},
        {id: 152, caption: 'Av. Brasil, altura Av. Automóvel Clube'},
        {id: 153, caption: 'Av. Brasil, altura da R. João Paulo'},
        {id: 154, caption: 'Av. Brasil, altura de Deodoro'},
        {id: 156, caption: 'Av. Brasil x Estr. do Quafá'},
        {id: 157, caption: 'Av. Brasil, altura Km 42 - Mendanha'},
        {id: 158, caption: 'Av. Brasil x Av Padre Guilherme Decaminada (em frente ao Extra)'},
        {id: 169, caption: 'Av. Brasil, altura da Linha Vermelha'},
        {id: 170, caption: 'Av. Brasil, altura do Cemitério do Caju'},
        {id: 172, caption: 'Rua Visconde de Cabo Frio x Praça Barão Corumbá'},
        {id: 173, caption: 'Av. Brasil x GAE'}
        ]},

      { title: 'Sul',
        cameras: [
        {id: 12, caption: 'R. das Laranjeiras X Soares Cabral'},
        {id: 13, caption: 'Praia de Botafogo x Viaduto'},
        {id: 14, caption: 'R. São Clemente x R. Muniz de Barreto'},
        {id: 15, caption: 'R. São Clemente x Consulado Português'},
        {id: 16, caption: 'R. Jardim Botânico próximo ao Parque Lage'},
        {id: 17, caption: 'Av. Borges de Medeiros x Av. Epitácio Pessoa'},
        {id: 18, caption: 'R. Mário Ribeiro x Av. Borges de Medeiros'},
        {id: 19, caption: 'R. Voluntários da Pátria x R. Real Grandeza'},
        {id: 20, caption: 'Aterro x Av. Oswaldo Cruz'},
        {id: 23, caption: 'R. Barata Ribeiro x R. Duvivier'},
        {id: 24, caption: 'Av. Nossa Sra. de Copacabana (Lido'},
        {id: 25, caption: 'Av. Atlântica x Av. Princesa Isabel'},
        {id: 26, caption: 'Av. Atlântica x R. Figueiredo de Magalhães'},
        {id: 27, caption: 'Av. N. Sra. de Copacabana x R. Sta. Clara'},
        {id: 28, caption: 'Av. Atlântica x R. Rainha Elisabeth'},
        {id: 29, caption: 'Corte do Cantagalo, Pça. Eugênio Jardim'},
        {id: 30, caption: 'R. Raul Pompéia x R. Francisco Otaviano'},
        {id: 31, caption: 'Av. Vieira Souto x R. Rainha Elizabeth'},
        {id: 32, caption: 'Av. Epitácio Pessoa x R. Maria Quitéria'},
        {id: 33, caption: 'Av. Delfim Moreira x R. Bartolomeu Mitre'},
        {id: 34, caption: 'R. Visconde de Pirajá x R. Gomes Carneiro'},
        {id: 35, caption: 'R. Barata Ribeiro x R. Constante Ramos'},
        {id: 42, caption: 'R. Praia do Flamengo x R. Barão do Flamengo'},
        {id: 43, caption: 'R. Humaitá x R. Macedo Sobrinho'},
        {id: 44, caption: 'R. Jardim Botânico x R. Pacheco Leão'},
        {id: 45, caption: 'Praça Sibélius'},
        {id: 46, caption: 'R. Voluntários da Pátria x R. Praia de Botafogo'},
        {id: 47, caption: 'Av. Lauro Sodré x R. Venceslau Brás'},
        {id: 49, caption: 'R.Barata Ribeiro x R. Siqueira Campos'},
        {id: 50, caption: 'Av. N. Sra. de Copacabana x R. Alm. Gonçalves'},
        {id: 51, caption: 'R. Visconde de Pirajá x R. Maria Quitéria'},
        {id: 52, caption: 'R. Ataulfo de Paiva x R. Afrânio de Melo Franco'},
        {id: 95, caption: 'R. Pinheiro Machado, altura da R. Carlos de Campos'},
        {id: 96, caption: 'R. Pinheiro Machado, altura da R. das Laranjeiras'},
        {id: 97, caption: 'Viaduto Eng. Noronha, sob Viaduto Jardel Filho'},
        {id:112, caption: 'Viaduto Saint Hilaire, saída do Túnel Rebouças, sobre a Rua Jardim Botânico'},
        {id:113, caption: 'Av. Borges de Medeiros, altura da Av. Lineu de Paula Machado'},
        {id:114, caption: 'Av. Borges de  Medeiros, altura da R. J. J. Seabra'},
        {id:115, caption: 'Av. Borges de  Medeiros, altura da R. Gal. Garzon'},
        {id:116, caption: 'Av. Epitácio Pessoa, próximo ao Jardim de Alah'},
        {id:117, caption: 'R. Jardim Botânico, altura da Praça Santos Dumont'},
        {id:118, caption: 'Av. Epitácio Pessoa, próximo ao Corte do Cantagalo'},
        {id:119, caption: 'Av. Epitácio Pessoa, próximo ao Parque da Catacumba'},
        {id:122, caption: 'Auto Estrada / Estr. do Joá, Próximo ao Túnel de São Conrado'},
        {id:123, caption: 'Auto Estrada, alt. Túnel de São Conrado'},
        {id:141, caption: 'Saída do Túnel Rebouças'}
        ]},

      { title: 'Centro',
        cameras: [
        {id:  1, caption: 'Av. Pres.Vargas X R. 1º Março - teste'},
        {id:  2, caption: 'Av. Pres.Vargas X Av. Rio Branco'},
        {id:  3, caption: 'Av. Pres.Vargas X Pça. da República'},
        {id:  4, caption: 'Praça Mauá'},
        {id:  5, caption: 'Av. Rio Branco X Aterro'},
        {id:  6, caption: 'Av. Rio Branco X Av. Alm. Barroso'},
        {id:  7, caption: 'R. Camerino X R. Barão de São Felix'},
        {id:  8, caption: 'R. Visconde do Rio Branco X Pça. da República'},
        {id:  9, caption: 'Av. Presidente Antonio Carlos x Av. Almirante Barroso'},
        {id: 10, caption: 'R. Santana X R. Frei Caneca'},
        {id: 11, caption: 'Largo do Estácio'},
        {id: 36, caption: 'Trevo das Forças Armadas'},
        {id: 37, caption: 'Av. Francisco Bicalho x R. Francisco Eugênio'},
        {id: 38, caption: 'Av. Rodrigues Alves x R. Prof. Pereira Reis'},
        {id: 39, caption: 'Av. Pres. Antonio Carlos x Av. Franklin Roosevelt'},
        {id: 40, caption: 'Praça Tiradentes'},
        {id: 41, caption: 'Lapa'},
        {id: 53, caption: 'Av. Presidente Wilson x Consulado EUA'},
        {id: 98, caption: 'Av. 31 de Março, saída do Túnel Santa Bárbara'},
        {id: 99, caption: 'Av. 31 de Março, praça da Apoteose, próximo. à R. Frei Caneca'},
        {id:100, caption: 'Av. 31 de Março, altura da Av. Salvador de Sá'},
        {id:101, caption: 'Av. 31 de Março, altura da Av. Presidente Vargas'},
        {id:102, caption: 'Vias Elevadas Prof. Eng. Rufino de Almeida, altura Leopoldina, pista inferior'},
        {id:104, caption: 'Vias Elevadas Prof. Eng. Rufino de Almeida, altura Leopoldina, pista superior'},
        {id:105, caption: 'Elevado Eng. Freyssinet, próximo R. João Paulo'},
        {id:106, caption: 'Elevado da Perimetral, descida para Av. Presidente Vargas'},
        {id:108, caption: 'Av. General Justo, próximo ao Aeroporto Santos Dumont'},
        {id:109, caption: 'Elevado da Perimetral, altura da Av. Gal. Justo'},
        {id:110, caption: 'Alfredo Agache, SAÍDA do Mergulhão, sentido Aterro'},
        {id:111, caption: 'Av. Venceslau Brás, próximo ao GMAR'}
        ]},

      { title: 'LinVermelha',
        cameras: [
        {id:103, caption: 'Linha Vermelha, Km 0'},
        {id:160, caption: 'Av. Cesário de Melo x Estrada do Monteiro'},
        {id:161, caption: 'Linha Vermelha - Km 1, pista superior'},
        {id:162, caption: 'Linha Vermelha KM1 x Pista Inferior'},
        {id:163, caption: 'Linha Vermelha KM3 x altura do Caju'},
        {id:164, caption: 'Linha Vermelha KM4 x Linha Amarela'},
        {id:165, caption: 'Linha Vermelha KM5 x Batalhão da Maré'},
        {id:166, caption: 'Linha Vermelha x Altura da Ilha'},
        {id:167, caption: 'Linha Vermelha x Altura da Ilha'}
        ]},

      { title: 'Oeste',
        cameras: [
        {id: 54, caption: 'Av. Embaixador Abelardo Bueno x Estr. Cel. Pedro Correa'},
        {id: 55, caption: 'Praça da Taquara'},
        {id: 57, caption: 'Av. Ayrton Senna x R. Abelardo Bueno'},
        {id: 58, caption: 'Av. Ayrton Senna x Av.Via Parque'},
        {id: 59, caption: 'Av. Ayrton Senna x Hospital Lourenço Jorge'},
        {id: 60, caption: 'Av. Ayrton Senna x Av. Lúcio Costa'},
        {id: 61, caption: 'Av. Sernambetiba x Ponte Lúcio Costa'},
        {id: 62, caption: 'Av. Sernambetiba x Praça do O'},
        {id: 63, caption: 'Av. das Américas x R. Felicissimo Cardoso'},
        {id: 64, caption: 'Av. das Américas (Supermercado Extra'},
        {id: 65, caption: 'Av. das Américas x Ponte Lúcio Costa'},
        {id: 66, caption: 'R. Armando Lombardi x Av. Min. Ivan Lins'},
        {id: 67, caption: 'Praia de São Conrado'},
        {id: 68, caption: 'Auto-estrada Lagoa-Barra em frente shopping Fashion Mall'},
        {id:120, caption: 'Auto Estrada Lagoa-Barra x Av. Niemeyer'},
        {id:125, caption: 'Elevado das Bandeiras, pista superior, entre os túneis São Conrado e Joá'},
        {id:126, caption: 'Auto Estrada Lagoa-Barra, próximo à R. Maria Luiza Pitanga'},
        {id:127, caption: 'Av. Armando Lombardi, acesso Barra Point'},
        {id:129, caption: 'Av. das Américas, próximo ao nº 2211, Hotel Dunas'},
        {id:130, caption: 'Av. das Américas, Próximo ao n° 3434, Centro Empresarial Mário Henrique Simonsem'},
        {id:131, caption: 'Av. das Américas, Altura da Av. Luis Carlos Prestes'},
        {id:132, caption: 'Av. das Américas, altura da Av. Ayrton Senna, sobre o Cebolão'},
        {id:133, caption: 'Av. das Américas x R. Jornalista Ricardo Marinho'},
        {id:134, caption: 'Av. das Américas, altura da A. Afonso Arinos de Mello Franco, EuroBarra'},
        {id:135, caption: 'Av. Ayrton Senna, subida da Linha Amarela'},
        {id:136, caption: 'Av. Ayrton Senna, próximo ao SENAC'},
        {id:140, caption: 'Elevado Eng. Freyssinet, próximo ao Túnel Rebouças'},
        {id:142, caption: 'R. Visconde de Niterói, altura Mangueira'},
        {id:143, caption: 'Praça Santo Cristo, antes da Igreja, sentido Rodrigues Alves'}
        ]},

      { title: 'Norte',
        cameras: [
        {id: 21, caption: 'Praça da Bandeira'},
        {id: 22, caption: 'Av. Pres. Castelo Branco x R. Radialista Waldir Amaral'},
        {id: 48, caption: 'Av. Maracanã x R. Eurico Rabelo'},
        {id: 69, caption: 'Av. Pres. Castelo Branco x R. General Canabarro'},
        {id: 70, caption: 'R. Pereira Nunes x R. Barão de Mesquita'},
        {id: 71, caption: 'R. São Francisco Xavier x R. Heitor Beltrão'},
        {id: 72, caption: 'R. Conde de Bonfim x R. Uruguai'},
        {id: 73, caption: 'R. Conde de Bonfim x R. General Rocca'},
        {id: 74, caption: 'Boulevard 28 de Setembro x R. São Francisco Xavier'},
        {id: 75, caption: 'R. Uruguai x R. Maxwell'},
        {id: 76, caption: 'Av. Maracanã x R. Deputado Soares Filho'},
        {id: 77, caption: 'R. Teodoro da Silva x R. Barão de São Francisco'},
        {id: 78, caption: 'Av. Pres. Castelo Branco x R. São Francisco Xavier'},
        {id: 79, caption: 'R. Teodoro da Silva x R. Barão Bom Retiro'},
        {id: 80, caption: 'Av. Marechal Rondom x R. Barão do Bom Retiro'},
        {id: 81, caption: 'R. Vinte Quatro de Maio x R. Bela Vista'},
        {id: 82, caption: 'R. 24 de Maio x R. Cônego Tobias'},
        {id: 83, caption: 'R. Arquias Cordeiro x R. José dos Reis (Engenhão'},
        {id: 84, caption: 'R. Ana Néri x R. Licínio Cardoso'},
        {id: 85, caption: 'R. Dias da Cruz x R. Hermengarda'},
        {id: 86, caption: 'R. Dias da Cruz x R. Maranhão'},
        {id: 87, caption: 'R. Amaro Cavalcanti x Viaduto Todos os Santos'},
        {id: 88, caption: 'R. Aristides Caire x R. Santa Fé'},
        {id: 89, caption: 'Av. Dom Helder Câmara x Viaduto de Pilares'},
        {id: 90, caption: 'Av. Dom Helder Câmara x R. Gandavo'},
        {id: 91, caption: 'Av. Dom Helder Câmara x R. Leopoldo Bulhões'},
        {id: 93, caption: 'R. Sen. Bernardo Monteiro x R. São Luis Gonzaga'},
        {id: 94, caption: 'Largo da Cancela, R. S. Luis Gonzaga x R. João Ricardo'},
        {id:138, caption: 'Elevado Paulo de Frontin - Altura da Rua João Paulo I'}
        ]}
      ]
    ,
    live_cams: [
      {url:'1w@18765',  caption: 'Av. Rodrigues Alves x R. Prof. Pereira Reis'},
      {url:'2w@18765',  caption: 'Elevado da Perimetral, descida para Av. Presidente Vargas'},
      {url:'3w@18765',  caption: 'Av. Brasil, altura da R. Eduardo Luiz Lopes'},
      {url:'4w@18765',  caption: 'Av. Borges de Medeiros x Av. Epitácio Pessoa'},
      {url:'5w@18765',  caption: 'R. Mário Ribeiro x Av. Borges de Medeiros'},
      {url:'6w@18765',  caption: 'Aterro x Av. Oswaldo Cruz'},
      {url:'7w@18765',  caption: 'Av. Nossa Sra. de Copacabana (Lido)'},
      {url:'8w@18765',  caption: 'Autoestrada Lagoa-Barra em frente shoping Fashion Mall'},
      {url:'9w@18765',  caption: 'R. Barata Ribeiro x R. Constante Ramos'},
      {url:'10w@36574', caption: 'Praia do Flamengo x R. Barão do Flamengo'},
      {url:'11w@36574', caption: 'Praça Sibélius'},
      {url:'12w@36574', caption: 'Viaduto Saint Hilaire, saída do Túnel Rebouças, sobre a Rua Jard'},
      {url:'13w@36574', caption: 'R. Jardim Botânico, altura da Praça Santos Dumont'},
      {url:'14w@78',    caption: 'Praça da Bandeira'},
      {url:'15w@78',    caption: 'R. Conde de Bonfim x R. General Rocca'},
      {url:'16w@78',    caption: 'R. Vinte Quatro de Maio x R. Bela Vista'},
      {url:'17w@78',    caption: 'R. Arquias Cordeiro x R. José dos Reis (Engenhão)'},
      {url:'18w@78',    caption: 'Av. Brasil, altura de Benfica'},
      {url:'19w@78',    caption: 'Elevado Eng. Freyssinet, próximo ao Túnel Rebouças'},
      {url:'20w@78',    caption: 'Av. Brasil, altura R. Paris'},
      {url:'21w@78',    caption: 'Av. Brasil, altura da Linha Vermelha'},
      {url:'22w@78',    caption: 'Linha Vermelha - Km 1, pista superior'},
      {url:'23w@36574', caption: 'Av. Ayrton Senna x R. Abelardo Bueno'},
      {url:'24w@36574', caption: 'Av. Ayrton Senna x Hospital Lourenço Jorge'},
      {url:'25w@36574', caption: 'Av. das Américas, altura da Av. Luis Carlos Prestes'},
      {url:'26w@36574', caption: 'Av. Armando Lombardi, acesso Barra Point'}
    ]
  };

  window.initAngular = function () {
    angular.module('camerasrj', [])

      .factory('globals', function(){
        return {
          CAM_PREFIX  : 'http://cdn.camerasrj.com.br/cam/',
          LIVE_PREFIX : 'http://radar_g1-f.akamaihd.net/radarg1_rj_riodejaneiro'
        };
      })

      .directive('camerasTabs', function(){
        return {
          restrict: 'E',
          replace: true,
          transclude: true,
          template:
            '<ul class="accordion-tabs" ng-transclude>'+
            '</ul>',
          controller: function(){
            var activeTab = 0;
            this.setActiveTab = function(n) { if (n === -1) activeTab = cameras.zonas.length; else activeTab = n; }
            this.isSelected   = function(n) { return n === -1 ? activeTab === cameras.zonas.length : activeTab === n; }
          }
        };
      })

      .directive('imgCameras', function(){
        return {
          require: '^camerasTabs',
          replace: true,
          restrict: 'E',
          template:
            '<li class="tab-header-and-content" ng-repeat="tab in imgCtrl.tabs">' +
            '  <a href class="tab-link" ng-class="{\'is-active\':tabsCtrl.isSelected($index)}" ng-click="tabsCtrl.setActiveTab($index); ga(\'send\', \'event\', \'Zona\', \'{{::tab.title}}\');">{{::tab.title}}</a>'+
            '  <section ng-class="{\'is-open\':tabsCtrl.isSelected($index)}" ng-show="tabsCtrl.isSelected($index)">'+
            '    <ul>'+
            '      <li ng-style="{background: \'url({{::CAM_PREFIX + cam.id}}.gif) no-repeat center\'}" ng-repeat="cam in tab.cameras">'+
            '        <p class="caption">{{::cam.caption}}</p>'+
            '        <img ng-src="{{::CAM_PREFIX + cam.id}}.jpg">'+
            '      </li>'+
            '    </ul>'+
            '  </section>'+
            '</li>',
          controller: ['globals','$scope', function(globals,$scope) {
            $scope.CAM_PREFIX  = globals.CAM_PREFIX;
            this.tabs          = cameras.zonas;
          }],
          link: function(scope, element, attrs, tabsCtrl) {
            scope.tabsCtrl = tabsCtrl;
          },
          controllerAs: 'imgCtrl'
        };
      })

      .directive('videoCameras', function() {
        return {
          require: '^camerasTabs',
          replace: true,
          restrict: 'E',
          template:
            '<li class="tab-header-and-content">'+
            '  <a href class="tab-link" ng-class="{\'is-active\':tabsCtrl.isSelected(-1)}" ng-click="tabsCtrl.setActiveTab(-1); ga(\'send\', \'event\', \'Zona\', \'AoVivo\');">AoVivo</a>'+
            '  <section ng-class="{\'is-open\':tabsCtrl.isSelected(-1)}" ng-show="tabsCtrl.isSelected(-1)">'+
            '    <ul>'+
            '      <li ng-repeat="cam in videoCtrl.live">'+
            '        <p class="caption">{{::cam.caption}}</p>'+
            '        <embed src="http://radar.g1.globo.com/FinxiPlayer.swf"'+
            '               flashvars="urlMedia={{::LIVE_PREFIX + cam.url}}"'+
            '               width="476"'+
            '               height="238"'+
            '               quality="high"'+
            '               align="middle"'+
            '               type="application/x-shockwave-flash"'+
            '               pluginspage="http://www.adobe.com/go/getflashplayer">'+
            '      </li>'+
            '    </ul>'+
            '  </section>'+
            '</li>',
          controller: ['globals','$scope', function(globals,$scope) {
            $scope.LIVE_PREFIX = globals.LIVE_PREFIX;
            this.live          = cameras.live_cams;
          }],
          link: function(scope, element, attrs, tabsCtrl) {
            scope.tabsCtrl = tabsCtrl;
          },
          controllerAs: 'videoCtrl'
        };
      })

      ;

    angular.element(document).ready(function() {
      angular.bootstrap(document, ['camerasrj']);

      $('.tab-header-and-content > a').bind('click', function(e) { $.smoothScroll(); });

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

      var menu = $('#navigation-menu');
      var menuToggle = $('#js-mobile-menu');

      $(menuToggle).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle(function(){
          if (menu.is(':hidden')) {
            menu.removeAttr('style');
          }
        });
      });

      // social thangs
      if (navigator.userAgent.match(/Chrome/i)) { $(".for-chrome-only").fadeIn(); }
      $('a.addthis_button_facebook_like').bind('edge.create', function (targetUrl) { ga('send', 'social', 'facebook', 'like', targetUrl); });
      $('a.addthis_button_facebook_like').bind('edge.remove', function (targetUrl) { ga('send', 'social', 'facebook', 'unlike', targetUrl); });
      $('a.addthis_button_tweet').bind('tweet', function (event) {
        if (event) {
          var targetUrl='';
          if (event.target && event.target.nodeName == 'IFRAME') {
            targetUrl = extractParamFromUri(event.target.src, 'url');
          }
          ga('send', 'social', 'twitter', 'tweet', targetUrl);
        }
      });

    });
  }

})(); // end of scope
