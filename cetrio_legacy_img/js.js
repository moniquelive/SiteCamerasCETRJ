var bairros = [
    "Barra / Jardim Ocenico",   // 39
    "Barra / Recreio",          // 43
    "Botafogo",                 // 35
    "Centro",                   // 30
    "Copacabana",               // 37
    "Estacio / Cidade Nova",    // 45
    "Flamengo",                 // 42
    "Grande Mier",              // 32
    "Grande Tijuca",            // 34
    "Ipanema / Leblon",         // 38
    "Jacarepagu",               // 41
    "Lagoa",                    // 36
    "Radial Oeste / Maracan",   // 33
    "Santo Cristo",             // 46
    "Sao Conrado",              // 40
    "Sao Cristovo",             // 31
];

function camera(url, zona, label) {
    this.url = url;
    this.zona = zona;
    this.label = label;
}

var cameras = [
    new camera("1", 2, "Primeiro de Marco x Presidente Vargas"),
    new camera("2", 2, "Rio Branco x Presidente Vargas"),
    new camera("3", 2, "Presidente Vargas x Central"),
    new camera("4", 2, "Praca Maua"),
    new camera("5", 2, "Rio Branco x Aterro"),
    new camera("6", 2, "R.Bran/A.Barroso"),
    new camera("7", 2, "Camerino"),
    new camera("8", 2, "Praca da Republica"),
    new camera("9", 2, "???"),
    new camera("10", 2, "Campo de Santana x Frei Caneca"),
    new camera("11", 2, "Largo do Estacio"),
    new camera("12", 1, "Rua das Laranjeiras x Sacadura Cabral"),
    new camera("13", 1, "Praia de Botafogo/Viaduto"),
    new camera("14", 1, "Sao Clemente x Mena Barreto"),
    new camera("15", 1, "Sao Clemente x Consulado Portugues"),
    new camera("16", 1, "Jardim Botanico"),
    new camera("17", 1, "Lagoa/Tunel Reboucas"),
    new camera("18", 1, "M.Rib x Borges de Medeiros"),
    new camera("19", 1, "Voluntarios da Patria x Real Grandeza"),
    new camera("20", 1, "Aterro do Flamengo x Oswaldo Cruz"),
    new camera("21", 0, "Pca da Bandeira"),
    new camera("22", 0, "Radial Oeste"),
    new camera("23", 1, "B.Rib/Duvivier"),
    new camera("24", 1, "N.S.Copa (Lido)"),
    new camera("25", 1, "Atlant/P. Isabel"),
    new camera("26", 1, "Atl./F.Magalhaes"),
    new camera("27", 1, "NS.Copa/St.Clara"),
    new camera("28", 1, "Av.Atlantica/Rainha Elisabeth"),
    new camera("29", 1, "Corte Cantagalo"),
    new camera("30", 1, "Raul Pompeia/Francisco Otaviano"),
    new camera("31", 1, "Vieira Souto/Rainha Elisabeth"),
    new camera("32", 1, "E.Pessoa/M.Quit."),
    new camera("33", 1, "Delfim Moreira/Bartolomeu Mitre"),
    new camera("34", 1, "Visconde de Piraja/Gomes Carneiro"),
    new camera("35", 1, "B.Rib./C.Ramos"),
    new camera("36", 2, "Franc. Bicalho"),
    new camera("37", 2, "Franc. Bicalho"),
    new camera("38", 2, "Rodrigues Alves"),
    new camera("39", 2, "Av.P.Ant.Carlos"),
    new camera("40", 2, "Pca. Tiradentes"),
    new camera("41", 2, "Lapa"),
    new camera("42", 1, "P.Fla/B.Flamengo"),
    new camera("43", 1, "Humaita/M.Sobrin"),
    new camera("44", 1, "J.Bot/P.Leao"),
    new camera("45", 1, "Pca.Sibelius"),
    new camera("46", 1, "V.Patria/P.Bot."),
    new camera("47", 1, "L.Sodre/Rio Sul"),
    new camera("48", 0, "Av.Maracana"),
    new camera("49", 1, "B.Rib/S.Campos"),
    new camera("50", 1, "Nossa Senhora de Copa/Almirante Goncalves"),
    new camera("51", 1, "V.Piraja/M.Quit."),
    new camera("52", 1, "A.Paiva/Afranio"),
    new camera("53", 3, "Pr.Wilson/C. EUA"),
    new camera("54", 3, "A.Bueno/P.Correa"),
    new camera("55", 3, "Pca da Taquara"),
    new camera("56", 3, "???"),
    new camera("57", 3, "Airton Senna/A.Bueno"),
    new camera("58", 3, "Airton Senna/Via Parque"),
    new camera("59", 3, "Airton Senna/L.Jorge"),
    new camera("60", 3, "Sernambetiba/Airton Senna"),
    new camera("61", 3, "Sernambetiba/L.Costa"),
    new camera("62", 3, "Sernambetiba/Praca do O"),
    new camera("63", 3, "Av.das Americas/Barra Shopping"),
    new camera("64", 3, "Av.das Americas"),
    new camera("65", 3, "Av.das Americas/L.Costa"),
    new camera("66", 3, "A.Lombardi/ILins"),
    new camera("67", 3, "Sao Conrado"),
    new camera("68", 3, "Lagoa Barra/Fashion Mall"),
    new camera("69", 0, "Radial/Canabarro"),
    new camera("70", 0, "PNunes/BMesquita"),
    new camera("71", 0, "SFXavier/HBeltra"),
    new camera("72", 0, "CBonfim/Uruguai"),
    new camera("73", 0, "Pca Saenz Pena"),
    new camera("74", 0, "28 Set/SFXavier"),
    new camera("75", 0, "Uruguai/Maxwell"),
    new camera("76", 0, "Maracana/S.Filho"),
    new camera("77", 0, "T.Silva/BSFranc."),
    new camera("78", 0, "R.Oeste/SFXavier"),
    new camera("79", 0, "T.Silva/BBRetiro"),
    new camera("80", 0, "MRondon/BBretiro"),
    new camera("81", 0, "24Maio/BelaVista"),
    new camera("82", 0, "24Maio/CTobias"),
    new camera("83", 0, "???"),
    new camera("84", 0, "AnaNeri/LCardoso"),
    new camera("85", 0, "DCruz/Hemengarda"),
    new camera("86", 0, "DCruz/Maranhao"),
    new camera("87", 0, "Vd. Todos Santos"),
    new camera("88", 0, "Arist.Caire/S.Fe"),
    new camera("89", 0, "DHelder/VPilares"),
    new camera("90", 0, "D.Helder/Gandavo"),
    new camera("91", 0, "DHelder/LBulhoes"),
    new camera("92", 0, "O.Melo/R.Machado"),
    new camera("93", 0, "BMont/C.Magalhaes"),
    new camera("94", 0, "Lgo.S.Cristovao")
];

var zonas = ['Norte','Sul','Centro','Oeste'];

var cameraURL = (window.location.href.split(':',1)[0] === 'file'?'http://cetrio.cyberleo.com.br':'')+'/camera.php?id=';
var prefixoURL = 'http://transito.rio.rj.gov.br/imagens1/';
var headerPrefixoURL = 'p.php?mode=native&url=http://transito.rio.rj.gov.br/imagens1/';
var sufixoURL = '.jpg';

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
        var tabBody = "";
        for (var i = 0; i < cameras.length; ++i) {
            var camera = cameras[i];
            var zona = zonas[camera.zona];
            if (camera.zona == j) {
                var title = 'camera cet-rio(' + (1+i) + ') ' + zona + ': ' + camera.label;
                var url = camera.label;
                var src = cameraURL + (1+i) + "&caption=" + escape(url);
                //tabBody += '<div>';
                tabBody += '<img class="camera" src="'+src+'" title="'+title+'" />';
                //tabBody += '<iframe src="http://transito.rio.rj.gov.br/iframeTrechosCamera.cfm?codigo='+(1+i)+'">';
                //tabBody += '</div>';
            }
        }
        $('#tabs').append("<div style='border:0' id='tabs-" + (1+j) + "'>" + tabBody + "</div>");
    }
    $('#tabs').tabs();
});
