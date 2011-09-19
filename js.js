var bairros = [
    "Barra / Jardim Oceanico",  // 39
    "Barra / Recreio",          // 43
    "Botafogo",                 // 35
    "Centro",                   // 30
    "Copacabana",               // 37
    "Estacio / Cidade Nova",    // 45
    "Flamengo",                 // 42
    "Grande Meier",             // 32
    "Grande Tijuca",            // 34
    "Ipanema / Leblon",         // 38
    "Jacarepagu",               // 41
    "Lagoa",                    // 36
    "Radial Oeste / Maracana",  // 33
    "Santo Cristo",             // 46
    "Sao Conrado",              // 40
    "Sao Cristovao",            // 31
];

function camera(url, zona, label) {
    this.url = url;
    this.zona = zona;
    this.label = label;
}

var cameras = [
    new camera("1", 'Centro', "Primeiro de Marco x Presidente Vargas"),
    new camera("2", 'Centro', "Rio Branco x Presidente Vargas"),
    new camera("3", 'Centro', "Presidente Vargas x Central"),
    new camera("4", 'Centro', "Praca Maua"),
    new camera("5", 'Centro', "Rio Branco x Aterro"),
    new camera("6", 'Centro', "R.Bran/A.Barroso"),
    new camera("7", 'Centro', "Camerino"),
    new camera("8", 'Centro', "Praca da Republica"),
    new camera("9", 'Centro', "???"),
    new camera("10", 'Centro', "Campo de Santana x Frei Caneca"),
    new camera("11", 'Centro', "Largo do Estacio"),
    new camera("12", 'Sul', "Rua das Laranjeiras x Sacadura Cabral"),
    new camera("13", 'Sul', "Praia de Botafogo/Viaduto"),
    new camera("14", 'Sul', "Sao Clemente x Mena Barreto"),
    new camera("15", 'Sul', "Sao Clemente x Consulado Portugues"),
    new camera("16", 'Sul', "Jardim Botanico"),
    new camera("17", 'Sul', "Lagoa/Tunel Reboucas"),
    new camera("18", 'Sul', "M.Rib x Borges de Medeiros"),
    new camera("19", 'Sul', "Voluntarios da Patria x Real Grandeza"),
    new camera("20", 'Sul', "Aterro do Flamengo x Oswaldo Cruz"),
    new camera("21", 'Norte', "Pca da Bandeira"),
    new camera("22", 'Norte', "Radial Oeste"),
    new camera("23", 'Sul', "B.Rib/Duvivier"),
    new camera("24", 'Sul', "N.S.Copa (Lido)"),
    new camera("25", 'Sul', "Atlant/P. Isabel"),
    new camera("26", 'Sul', "Atl./F.Magalhaes"),
    new camera("27", 'Sul', "NS.Copa/St.Clara"),
    new camera("28", 'Sul', "Av.Atlantica/Rainha Elisabeth"),
    new camera("29", 'Sul', "Corte Cantagalo"),
    new camera("30", 'Sul', "Raul Pompeia/Francisco Otaviano"),
    new camera("31", 'Sul', "Vieira Souto/Rainha Elisabeth"),
    new camera("32", 'Sul', "E.Pessoa/M.Quit."),
    new camera("33", 'Sul', "Delfim Moreira/Bartolomeu Mitre"),
    new camera("34", 'Sul', "Visconde de Piraja/Gomes Carneiro"),
    new camera("35", 'Sul', "B.Rib./C.Ramos"),
    new camera("36", 'Centro', "Franc. Bicalho"),
    new camera("37", 'Centro', "Franc. Bicalho"),
    new camera("38", 'Centro', "Rodrigues Alves"),
    new camera("39", 'Centro', "Av.P.Ant.Carlos"),
    new camera("40", 'Centro', "Pca. Tiradentes"),
    new camera("41", 'Centro', "Lapa"),
    new camera("42", 'Sul', "P.Fla/B.Flamengo"),
    new camera("43", 'Sul', "Humaita/M.Sobrin"),
    new camera("44", 'Sul', "J.Bot/P.Leao"),
    new camera("45", 'Sul', "Pca.Sibelius"),
    new camera("46", 'Sul', "V.Patria/P.Bot."),
    new camera("47", 'Sul', "L.Sodre/Rio Sul"),
    new camera("48", 'Norte', "Av.Maracana"),
    new camera("49", 'Sul', "B.Rib/S.Campos"),
    new camera("50", 'Sul', "Nossa Senhora de Copa/Almirante Goncalves"),
    new camera("51", 'Sul', "V.Piraja/M.Quit."),
    new camera("52", 'Sul', "A.Paiva/Afranio"),
    new camera("53", 'Oeste', "Pr.Wilson/C. EUA"),
    new camera("54", 'Oeste', "A.Bueno/P.Correa"),
    new camera("55", 'Oeste', "Pca da Taquara"),
    new camera("56", 'Oeste', "???"),
    new camera("57", 'Oeste', "Airton Senna/A.Bueno"),
    new camera("58", 'Oeste', "Airton Senna/Via Parque"),
    new camera("59", 'Oeste', "Airton Senna/L.Jorge"),
    new camera("60", 'Oeste', "Sernambetiba/Airton Senna"),
    new camera("61", 'Oeste', "Sernambetiba/L.Costa"),
    new camera("62", 'Oeste', "Sernambetiba/Praca do O"),
    new camera("63", 'Oeste', "Av.das Americas/Barra Shopping"),
    new camera("64", 'Oeste', "Av.das Americas"),
    new camera("65", 'Oeste', "Av.das Americas/L.Costa"),
    new camera("66", 'Oeste', "A.Lombardi/ILins"),
    new camera("67", 'Oeste', "Sao Conrado"),
    new camera("68", 'Oeste', "Lagoa Barra/Fashion Mall"),
    new camera("69", 'Norte', "Radial/Canabarro"),
    new camera("70", 'Norte', "PNunes/BMesquita"),
    new camera("71", 'Norte', "SFXavier/HBeltra"),
    new camera("72", 'Norte', "CBonfim/Uruguai"),
    new camera("73", 'Norte', "Pca Saenz Pena"),
    new camera("74", 'Norte', "28 Set/SFXavier"),
    new camera("75", 'Norte', "Uruguai/Maxwell"),
    new camera("76", 'Norte', "Maracana/S.Filho"),
    new camera("77", 'Norte', "T.Silva/BSFranc."),
    new camera("78", 'Norte', "R.Oeste/SFXavier"),
    new camera("79", 'Norte', "T.Silva/BBRetiro"),
    new camera("80", 'Norte', "MRondon/BBretiro"),
    new camera("81", 'Norte', "24Maio/BelaVista"),
    new camera("82", 'Norte', "24Maio/CTobias"),
    new camera("83", 'Norte', "???"),
    new camera("84", 'Norte', "AnaNeri/LCardoso"),
    new camera("85", 'Norte', "DCruz/Hemengarda"),
    new camera("86", 'Norte', "DCruz/Maranhao"),
    new camera("87", 'Norte', "Vd. Todos Santos"),
    new camera("88", 'Norte', "Arist.Caire/S.Fe"),
    new camera("89", 'Norte', "DHelder/VPilares"),
    new camera("90", 'Norte', "D.Helder/Gandavo"),
    new camera("91", 'Norte', "DHelder/LBulhoes"),
    new camera("92", 'Norte', "O.Melo/R.Machado"),
    new camera("93", 'Norte', "BMont/C.Magalhaes"),
    new camera("94", 'Norte', "Lgo.S.Cristovao")
];

var zonas = ['Sul','Norte','Centro','Oeste'];

var sufixoURL = ".stream";
var streamerURL = "rtmp://200.141.78.68/cet-rio/";
var flashPlayer = "/jwplayer/player.swf";

$(function() {
    // preapare tab headers
    var tabHeader = "";
    for (var j = 0; j < zonas.length; ++j) {
        var zona = zonas[j];
        tabHeader += "<li><a href='#tabs-" + (1+j) + "'>" + zona + "</a></li>";
    }
    $('#tabs').append("<ul style='margin-bottom:1px'>" + tabHeader + "</ul>");
    // prepare tab body
    for (var j = 0; j < zonas.length; ++j) {
        var zona = zonas[j];
        var tabBody = "";
        for (var i = 0; i < cameras.length; ++i) {
            var camera = cameras[i];
            if (camera.zona === zona) {
                var title = 'camera cet-rio(' + (1+i) + ') ' + zona + ': ' + camera.label;
                tabBody += '<div style="display:inline-block">';
                tabBody += '<div class="caption">'+camera.label+'</div>';
                tabBody += '<div id="c'+(1+i)+'">'+title+'</div>';
                tabBody += '</div>';
            }
        }
        $('#tabs').append("<div style='border:0' id='tabs-" + (1+j) + "'>" + tabBody + "</div>");
    }
    $('#tabs').tabs();
    for (var i = 0; i < cameras.length; ++i) {
        jwplayer('c'+(1+i)).setup({
            flashplayer: flashPlayer,
            file: (1+i)+sufixoURL,
            streamer: streamerURL,
            autostart: false,
            'logo.hide': true
        });
        $('#c'+(1+i)+'_wrapper').attr('style','');
        $('#c'+(1+i)+'_wrapper').addClass('camera');
    }
});
