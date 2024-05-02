/* Help Doc cutter */

/* Create the Google translate icon */

var translateCode = `<div id="google_translate_element"></div><script type="text/javascript">
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}
</script><script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>`;


/* Open the file */


var fs = require('fs');
var original = win1255ToUnicode(fs.readFileSync('TPUG.htm', {encoding: 'binary'}), insertHexEscape);
original = original.replace(/tanda player/gi, '<span class="notranslate">Tanda Player</span>')

/* Extract styles */

var stylesheet = `<style type="text/css">
* {
    color: #606060 !important;
}
body {
	background-color: black;
}
section .notranslate {
	margin: 0.15em;
	font-style: inherit;
	font-size: inherit;
}

img {
	margin-left: 1em;
}

header, section {
	border-radius: 15px;
	background-color: white;
	padding: 1em;
	max-width: 1200px;
	margin: 1em auto;
}

header ul {
	    list-style-position: inside;
}
header li a {
	text-decoration: underline !important;
}

header h1 {
	font-family: myFirstFont;
    font-size: 90px;
    margin: 0.1em;
}

section * {
	//font-family: Cambria!important;
}

section h1 {
	font-size: 1.75em;
}
section h2, section h3 {
	font-size: 1.25em;
}

#wrapper {
}

.TPUG_navigation {
	margin: 1em;
}

.TPUG_navigation a{
	font-size: 1.2em;
	margin: 1em;
}

header li {
	list-style-type: disc !important;
}

li {
	list-style: none;
}

section a:link, section a:visited {
	color: blue !important;
}
section li a:link, section a:visited {
	text-decoration: none !important;
}
span.index_1 {
	font-size: 1.1em;
	line-height: 2.4em;
	margin: 0.3em;
	margin-top: 1em;
	font-weight: bolder;
}
span.index_2 {
	font-size: 1em;
	line-height: 1.75em;
	margin-left: 2em;
}
span.index_3 {
	font-size: 0.9em;
	line-height: 1.5em;
	margin-left: 4em;
}

h1 {
	margin-top: 0px !important;
}
` + original.split(/style>/gi)[1] + 'style>';

/* Extract each page */

var pages = original.split(/<h1>/gi)

/* Output each page with a copy of the styles */

translateCode = '';
pages.forEach(function(p,i){
	var next = (i+1 >= pages.length )?'':'<a href="help_section_' + (i+1) + '.html">Next Section &gt;&gt;&gt;</a>';
	fs.writeFileSync('help_section_' + i + '.html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
		<title>Tanda Player - User Guide OnLine</title>
		<link href="../css/style.css" rel="stylesheet" type="text/css" />
		${stylesheet}
	</head>
	<body>
		<div id="wrapper">
			<header>
			</header>
			<script src="../js/header.js" type="text/javascript"></script>
			<section>
				<div class="TPUG_navigation">
					<a href="help_section_${i-1}.html">&lt;&lt;&lt; Previous Section</a>
					<a href="help_section_0.html">Index</a>
					${next}
				</div>
				<h1>${p}
				<div class="TPUG_navigation">
					<a href="help_section_${i-1}.html">&lt;&lt;&lt; Previous Section</a>
					<a href="help_section_0.html">Index</a>
					${next}
				</div>
			</section>
		</div>
	</body>
</html>
`, {encoding: 'utf8'});
});

/* Create an index page */

var links = '<ul>'
var sections = original.split(/<h1|<h2|<h3/gi)
var page = 0;
sections.forEach(function(p,i){
	if ( i > 0 ){
		var title = p.split(/<\/h/)[0].split(/<span.*?>/)[1]
		var id = p.split(/<\/h/)[1].charAt(0);
		if ( id == 1 ){
			page++;
		}
		//console.log('Content: ' + id, title)
		links += '<li><a href="help_section_' + page + '.html"><span class="index_' + id + '">' + title + '</span></a></li>' ;
	}
});
links += '</ul>'
fs.writeFileSync('help_section_0.html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
		<title>Tanda Player - User Guide OnLine Index</title>
		<link href="../css/style.css" rel="stylesheet" type="text/css" />
		${stylesheet}
	</head>
	<body>
		<div id="wrapper">
			<header>
			</header>
			<script src="../js/header.js" type="text/javascript"></script>
			<section>
				<h1>Page Index</h1>
				${links}
				<div class="TPUG_navigation">
					<a href="help_section_1.html">Next Section &gt;&gt;&gt;</a>
				</div>
			</section>
		</div>
	</body>
</html>
`, {encoding: 'utf8'});




/* Horrible utility to support Microsoft */

function insertHexEscape (otherCode)
{
	console.log('Unknown char', '\\x'+otherCode.charCodeAt(0).toString(16));
    return '\\x'+otherCode.charCodeAt(0).toString(16);
}

function win1255ToUnicode (source, undefHandler /* function! */)
{
	/* From http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP1255.TXT

	#
	#    Name:     cp1255 to Unicode table
	#    Unicode version: 2.0
	#    Table version: 2.01
	#    Table format:  Format A
	#    Date:          1/7/2000
	#
	#    Contact:       Shawn.Steele@microsoft.com
	#
	#    General notes: none
	#
	#    Format: Three tab-separated columns
	#        Column #1 is the cp1255 code (in hex)
	#        Column #2 is the Unicode (in hex as 0xXXXX)
	#        Column #3 is the Unicode name (follows a comment sign, '#')
	#
	#    The entries are in cp1255 order

	*/

	var win1255Encoding = {
		"\x00":"\u0000",    // #NULL
		"\x01":"\u0001",    // #START OF HEADING
		"\x02":"\u0002",    // #START OF TEXT
		"\x03":"\u0003",    // #END OF TEXT
		"\x04":"\u0004",    // #END OF TRANSMISSION
		"\x05":"\u0005",    // #ENQUIRY
		"\x06":"\u0006",    // #ACKNOWLEDGE
		"\x07":"\u0007",    // #BELL
		"\x08":"\u0008",    // #BACKSPACE
		"\x09":"\u0009",    // #HORIZONTAL TABULATION
		"\x0A":"\u000A",    // #LINE FEED
		"\x0B":"\u000B",    // #VERTICAL TABULATION
		"\x0C":"\u000C",    // #FORM FEED
		"\x0D":"\u000D",    // #CARRIAGE RETURN
		"\x0E":"\u000E",    // #SHIFT OUT
		"\x0F":"\u000F",    // #SHIFT IN
		"\x10":"\u0010",    // #DATA LINK ESCAPE
		"\x11":"\u0011",    // #DEVICE CONTROL ONE
		"\x12":"\u0012",    // #DEVICE CONTROL TWO
		"\x13":"\u0013",    // #DEVICE CONTROL THREE
		"\x14":"\u0014",    // #DEVICE CONTROL FOUR
		"\x15":"\u0015",    // #NEGATIVE ACKNOWLEDGE
		"\x16":"\u0016",    // #SYNCHRONOUS IDLE
		"\x17":"\u0017",    // #END OF TRANSMISSION BLOCK
		"\x18":"\u0018",    // #CANCEL
		"\x19":"\u0019",    // #END OF MEDIUM
		"\x1A":"\u001A",    // #SUBSTITUTE
		"\x1B":"\u001B",    // #ESCAPE
		"\x1C":"\u001C",    // #FILE SEPARATOR
		"\x1D":"\u001D",    // #GROUP SEPARATOR
		"\x1E":"\u001E",    // #RECORD SEPARATOR
		"\x1F":"\u001F",    // #UNIT SEPARATOR
		"\x20":"\u0020",    // #SPACE
		"\x21":"\u0021",    // #EXCLAMATION MARK
		"\x22":"\u0022",    // #QUOTATION MARK
		"\x23":"\u0023",    // #NUMBER SIGN
		"\x24":"\u0024",    // #DOLLAR SIGN
		"\x25":"\u0025",    // #PERCENT SIGN
		"\x26":"\u0026",    // #AMPERSAND
		"\x27":"\u0027",    // #APOSTROPHE
		"\x28":"\u0028",    // #LEFT PARENTHESIS
		"\x29":"\u0029",    // #RIGHT PARENTHESIS
		"\x2A":"\u002A",    // #ASTERISK
		"\x2B":"\u002B",    // #PLUS SIGN
		"\x2C":"\u002C",    // #COMMA
		"\x2D":"\u002D",    // #HYPHEN-MINUS
		"\x2E":"\u002E",    // #FULL STOP
		"\x2F":"\u002F",    // #SOLIDUS
		"\x30":"\u0030",    // #DIGIT ZERO
		"\x31":"\u0031",    // #DIGIT ONE
		"\x32":"\u0032",    // #DIGIT TWO
		"\x33":"\u0033",    // #DIGIT THREE
		"\x34":"\u0034",    // #DIGIT FOUR
		"\x35":"\u0035",    // #DIGIT FIVE
		"\x36":"\u0036",    // #DIGIT SIX
		"\x37":"\u0037",    // #DIGIT SEVEN
		"\x38":"\u0038",    // #DIGIT EIGHT
		"\x39":"\u0039",    // #DIGIT NINE
		"\x3A":"\u003A",    // #COLON
		"\x3B":"\u003B",    // #SEMICOLON
		"\x3C":"\u003C",    // #LESS-THAN SIGN
		"\x3D":"\u003D",    // #EQUALS SIGN
		"\x3E":"\u003E",    // #GREATER-THAN SIGN
		"\x3F":"\u003F",    // #QUESTION MARK
		"\x40":"\u0040",    // #COMMERCIAL AT
		"\x41":"\u0041",    // #LATIN CAPITAL LETTER A
		"\x42":"\u0042",    // #LATIN CAPITAL LETTER B
		"\x43":"\u0043",    // #LATIN CAPITAL LETTER C
		"\x44":"\u0044",    // #LATIN CAPITAL LETTER D
		"\x45":"\u0045",    // #LATIN CAPITAL LETTER E
		"\x46":"\u0046",    // #LATIN CAPITAL LETTER F
		"\x47":"\u0047",    // #LATIN CAPITAL LETTER G
		"\x48":"\u0048",    // #LATIN CAPITAL LETTER H
		"\x49":"\u0049",    // #LATIN CAPITAL LETTER I
		"\x4A":"\u004A",    // #LATIN CAPITAL LETTER J
		"\x4B":"\u004B",    // #LATIN CAPITAL LETTER K
		"\x4C":"\u004C",    // #LATIN CAPITAL LETTER L
		"\x4D":"\u004D",    // #LATIN CAPITAL LETTER M
		"\x4E":"\u004E",    // #LATIN CAPITAL LETTER N
		"\x4F":"\u004F",    // #LATIN CAPITAL LETTER O
		"\x50":"\u0050",    // #LATIN CAPITAL LETTER P
		"\x51":"\u0051",    // #LATIN CAPITAL LETTER Q
		"\x52":"\u0052",    // #LATIN CAPITAL LETTER R
		"\x53":"\u0053",    // #LATIN CAPITAL LETTER S
		"\x54":"\u0054",    // #LATIN CAPITAL LETTER T
		"\x55":"\u0055",    // #LATIN CAPITAL LETTER U
		"\x56":"\u0056",    // #LATIN CAPITAL LETTER V
		"\x57":"\u0057",    // #LATIN CAPITAL LETTER W
		"\x58":"\u0058",    // #LATIN CAPITAL LETTER X
		"\x59":"\u0059",    // #LATIN CAPITAL LETTER Y
		"\x5A":"\u005A",    // #LATIN CAPITAL LETTER Z
		"\x5B":"\u005B",    // #LEFT SQUARE BRACKET
		"\x5C":"\u005C",    // #REVERSE SOLIDUS
		"\x5D":"\u005D",    // #RIGHT SQUARE BRACKET
		"\x5E":"\u005E",    // #CIRCUMFLEX ACCENT
		"\x5F":"\u005F",    // #LOW LINE
		"\x60":"\u0060",    // #GRAVE ACCENT
		"\x61":"\u0061",    // #LATIN SMALL LETTER A
		"\x62":"\u0062",    // #LATIN SMALL LETTER B
		"\x63":"\u0063",    // #LATIN SMALL LETTER C
		"\x64":"\u0064",    // #LATIN SMALL LETTER D
		"\x65":"\u0065",    // #LATIN SMALL LETTER E
		"\x66":"\u0066",    // #LATIN SMALL LETTER F
		"\x67":"\u0067",    // #LATIN SMALL LETTER G
		"\x68":"\u0068",    // #LATIN SMALL LETTER H
		"\x69":"\u0069",    // #LATIN SMALL LETTER I
		"\x6A":"\u006A",    // #LATIN SMALL LETTER J
		"\x6B":"\u006B",    // #LATIN SMALL LETTER K
		"\x6C":"\u006C",    // #LATIN SMALL LETTER L
		"\x6D":"\u006D",    // #LATIN SMALL LETTER M
		"\x6E":"\u006E",    // #LATIN SMALL LETTER N
		"\x6F":"\u006F",    // #LATIN SMALL LETTER O
		"\x70":"\u0070",    // #LATIN SMALL LETTER P
		"\x71":"\u0071",    // #LATIN SMALL LETTER Q
		"\x72":"\u0072",    // #LATIN SMALL LETTER R
		"\x73":"\u0073",    // #LATIN SMALL LETTER S
		"\x74":"\u0074",    // #LATIN SMALL LETTER T
		"\x75":"\u0075",    // #LATIN SMALL LETTER U
		"\x76":"\u0076",    // #LATIN SMALL LETTER V
		"\x77":"\u0077",    // #LATIN SMALL LETTER W
		"\x78":"\u0078",    // #LATIN SMALL LETTER X
		"\x79":"\u0079",    // #LATIN SMALL LETTER Y
		"\x7A":"\u007A",    // #LATIN SMALL LETTER Z
		"\x7B":"\u007B",    // #LEFT CURLY BRACKET
		"\x7C":"\u007C",    // #VERTICAL LINE
		"\x7D":"\u007D",    // #RIGHT CURLY BRACKET
		"\x7E":"\u007E",    // #TILDE
		"\x7F":"\u007F",    // #DELETE
		"\x80":"\u20AC",    // #EURO SIGN
		"\x82":"\u201A",    // #SINGLE LOW-9 QUOTATION MARK
		"\x83":"\u0192",    // #LATIN SMALL LETTER F WITH HOOK
		"\x84":"\u201E",    // #DOUBLE LOW-9 QUOTATION MARK
		"\x85":"\u2026",    // #HORIZONTAL ELLIPSIS
		"\x86":"\u2020",    // #DAGGER
		"\x87":"\u2021",    // #DOUBLE DAGGER
		"\x88":"\u02C6",    // #MODIFIER LETTER CIRCUMFLEX ACCENT
		"\x89":"\u2030",    // #PER MILLE SIGN
		"\x8B":"\u2039",    // #SINGLE LEFT-POINTING ANGLE QUOTATION MARK
		"\x91":"\u2018",    // #LEFT SINGLE QUOTATION MARK
		"\x92":"\u2019",    // #RIGHT SINGLE QUOTATION MARK
		"\x93":"\u201C",    // #LEFT DOUBLE QUOTATION MARK
		"\x94":"\u201D",    // #RIGHT DOUBLE QUOTATION MARK
		"\x95":"\u2022",    // #BULLET
		"\x96":"\u2013",    // #EN DASH
		"\x97":"\u2014",    // #EM DASH
		"\x98":"\u02DC",    // #SMALL TILDE
		"\x99":"\u2122",    // #TRADE MARK SIGN
		"\x9B":"\u203A",    // #SINGLE RIGHT-POINTING ANGLE QUOTATION MARK
		"\xA0":"\u00A0",    // #NO-BREAK SPACE
		"\xA1":"\u00A1",    // #INVERTED EXCLAMATION MARK
		"\xA2":"\u00A2",    // #CENT SIGN
		"\xA3":"\u00A3",    // #POUND SIGN
		"\xA4":"\u20AA",    // #NEW SHEQEL SIGN
		"\xA5":"\u00A5",    // #YEN SIGN
		"\xA6":"\u00A6",    // #BROKEN BAR
		"\xA7":"\u00A7",    // #SECTION SIGN
		"\xA8":"\u00A8",    // #DIAERESIS
		"\xA9":"\u00A9",    // #COPYRIGHT SIGN
		"\xAA":"\u00D7",    // #MULTIPLICATION SIGN
		"\xAB":"\u00AB",    // #LEFT-POINTING DOUBLE ANGLE QUOTATION MARK
		"\xAC":"\u00AC",    // #NOT SIGN
		"\xAD":"\u00AD",    // #SOFT HYPHEN
		"\xAE":"\u00AE",    // #REGISTERED SIGN
		"\xAF":"\u00AF",    // #MACRON
		"\xB0":"\u00B0",    // #DEGREE SIGN
		"\xB1":"\u00B1",    // #PLUS-MINUS SIGN
		"\xB2":"\u00B2",    // #SUPERSCRIPT TWO
		"\xB3":"\u00B3",    // #SUPERSCRIPT THREE
		"\xB4":"\u00B4",    // #ACUTE ACCENT
		"\xB5":"\u00B5",    // #MICRO SIGN
		"\xB6":"\u00B6",    // #PILCROW SIGN
		"\xB7":"\u00B7",    // #MIDDLE DOT
		"\xB8":"\u00B8",    // #CEDILLA
		"\xB9":"\u00B9",    // #SUPERSCRIPT ONE
		"\xBA":"\u00F7",    // #DIVISION SIGN
		"\xBB":"\u00BB",    // #RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK
		"\xBC":"\u00BC",    // #VULGAR FRACTION ONE QUARTER
		"\xBD":"\u00BD",    // #VULGAR FRACTION ONE HALF
		"\xBE":"\u00BE",    // #VULGAR FRACTION THREE QUARTERS
		"\xBF":"\u00BF",    // #INVERTED QUESTION MARK
		"\xC0":"\u05B0",    // #HEBREW POINT SHEVA
		"\xC1":"\u05B1",    // #HEBREW POINT HATAF SEGOL
		"\xC2":"\u05B2",    // #HEBREW POINT HATAF PATAH
		"\xC3":"\u05B3",    // #HEBREW POINT HATAF QAMATS
		"\xC4":"\u05B4",    // #HEBREW POINT HIRIQ
		"\xC5":"\u05B5",    // #HEBREW POINT TSERE
		"\xC6":"\u05B6",    // #HEBREW POINT SEGOL
		"\xC7":"\u05B7",    // #HEBREW POINT PATAH
		"\xC8":"\u05B8",    // #HEBREW POINT QAMATS
		"\xC9":"\u05B9",    // #HEBREW POINT HOLAM
		"\xCB":"\u05BB",    // #HEBREW POINT QUBUTS
		"\xCC":"\u05BC",    // #HEBREW POINT DAGESH OR MAPIQ
		"\xCD":"\u05BD",    // #HEBREW POINT METEG
		"\xCE":"\u05BE",    // #HEBREW PUNCTUATION MAQAF
		"\xCF":"\u05BF",    // #HEBREW POINT RAFE
		"\xD0":"\u05C0",    // #HEBREW PUNCTUATION PASEQ
		"\xD1":"\u05C1",    // #HEBREW POINT SHIN DOT
		"\xD2":"\u05C2",    // #HEBREW POINT SIN DOT
		"\xD3":"\u05C3",    // #HEBREW PUNCTUATION SOF PASUQ
		"\xD4":"\u05F0",    // #HEBREW LIGATURE YIDDISH DOUBLE VAV
		"\xD5":"\u05F1",    // #HEBREW LIGATURE YIDDISH VAV YOD
		"\xD6":"\u05F2",    // #HEBREW LIGATURE YIDDISH DOUBLE YOD
		"\xD7":"\u05F3",    // #HEBREW PUNCTUATION GERESH
		"\xD8":"\u05F4",    // #HEBREW PUNCTUATION GERSHAYIM
		"\xE0":"\u05D0",    // #HEBREW LETTER ALEF
		"\xE1":"\u05D1",    // #HEBREW LETTER BET
		"\xE2":"\u05D2",    // #HEBREW LETTER GIMEL
		"\xE3":"\u05D3",    // #HEBREW LETTER DALET
		"\xE4":"\u05D4",    // #HEBREW LETTER HE
		"\xE5":"\u05D5",    // #HEBREW LETTER VAV
		"\xE6":"\u05D6",    // #HEBREW LETTER ZAYIN
		"\xE7":"\u05D7",    // #HEBREW LETTER HET
		"\xE8":"\u05D8",    // #HEBREW LETTER TET
		"\xE9":"\u05D9",    // #HEBREW LETTER YOD
		"\xEA":"\u05DA",    // #HEBREW LETTER FINAL KAF
		"\xEB":"\u05DB",    // #HEBREW LETTER KAF
		"\xEC":"\u05DC",    // #HEBREW LETTER LAMED
		"\xED":"\u05DD",    // #HEBREW LETTER FINAL MEM
		"\xEE":"\u05DE",    // #HEBREW LETTER MEM
		"\xEF":"\u05DF",    // #HEBREW LETTER FINAL NUN
		"\xF0":"\u05E0",    // #HEBREW LETTER NUN
		"\xF1":"\u05E1",    // #HEBREW LETTER SAMEKH
		"\xF2":"\u05E2",    // #HEBREW LETTER AYIN
		"\xF3":"\u05E3",    // #HEBREW LETTER FINAL PE
		"\xF4":"\u05E4",    // #HEBREW LETTER PE
		"\xF5":"\u05E5",    // #HEBREW LETTER FINAL TSADI
		"\xF6":"\u05E6",    // #HEBREW LETTER TSADI
		"\xF7":"\u05E7",    // #HEBREW LETTER QOF
		"\xF8":"\u05E8",    // #HEBREW LETTER RESH
		"\xF9":"\u05E9",    // #HEBREW LETTER SHIN
		"\xFA":"\u05EA",    // #HEBREW LETTER TAV
		"\xFD":"\u200E",    // #LEFT-TO-RIGHT MARK
		"\xFE":"\u200F"     // #RIGHT-TO-LEFT MARK
		}, i=0,l,dest = '';

    l = source.length;
    while (l--)
    {
        if (win1255Encoding[source[i]])
            dest += win1255Encoding[source[i]];
        else
        {
            if (undefHandler)
            {
                dest += undefHandler (source[i]);
            } else
            {
                dest += '\uFFFD';
            }
        }
        i++;
    }
    return dest;
}

