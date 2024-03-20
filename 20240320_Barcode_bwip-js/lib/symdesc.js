// file: bwip-js/lib/symdesc.js
//
// This code was automatically generated from:
// Barcode Writer in Pure PostScript - Version 2024-01-03
//
// Copyright (c) 2011-2024 Mark Warren
// Copyright (c) 2004-2024 Terry Burton
//
// Licensed MIT.  See the LICENSE file in the bwip-js root directory
// for the extended copyright notice.
var symdesc = {
    "ean5": {
        sym: "ean5",
        desc: "EAN-5 (5 digit addon)",
        text: "90200",
        opts: "includetext guardwhitespace"
    },
    "ean2": {
        sym: "ean2",
        desc: "EAN-2 (2 digit addon)",
        text: "05",
        opts: "includetext guardwhitespace"
    },
    "ean13": {
        sym: "ean13",
        desc: "EAN-13",
        text: "9520123456788",
        opts: "includetext guardwhitespace"
    },
    "ean8": {
        sym: "ean8",
        desc: "EAN-8",
        text: "95200002",
        opts: "includetext guardwhitespace"
    },
    "upca": {
        sym: "upca",
        desc: "UPC-A",
        text: "012345000058",
        opts: "includetext"
    },
    "upce": {
        sym: "upce",
        desc: "UPC-E",
        text: "01234558",
        opts: "includetext"
    },
    "isbn": {
        sym: "isbn",
        desc: "ISBN",
        text: "978-1-56581-231-4 90000",
        opts: "includetext guardwhitespace"
    },
    "ismn": {
        sym: "ismn",
        desc: "ISMN",
        text: "979-0-2605-3211-3",
        opts: "includetext guardwhitespace"
    },
    "issn": {
        sym: "issn",
        desc: "ISSN",
        text: "0311-175X 00 17",
        opts: "includetext guardwhitespace"
    },
    "mands": {
        sym: "mands",
        desc: "Marks & Spencer",
        text: "0642118",
        opts: "includetext"
    },
    "code128": {
        sym: "code128",
        desc: "Code 128",
        text: "Count01234567!",
        opts: "includetext"
    },
    "gs1-128": {
        sym: "gs1-128",
        desc: "GS1-128",
        text: "(01)09521234543213(3103)000123",
        opts: "includetext"
    },
    "ean14": {
        sym: "ean14",
        desc: "GS1-14",
        text: "(01) 0 952 8765 43210 8",
        opts: "includetext"
    },
    "sscc18": {
        sym: "sscc18",
        desc: "SSCC-18",
        text: "(00) 0 9528765 432101234 6",
        opts: "includetext"
    },
    "code39": {
        sym: "code39",
        desc: "Code 39",
        text: "THIS IS CODE 39",
        opts: "includetext includecheck includecheckintext"
    },
    "code39ext": {
        sym: "code39ext",
        desc: "Code 39 Extended",
        text: "Code39 Ext!",
        opts: "includetext includecheck includecheckintext"
    },
    "code32": {
        sym: "code32",
        desc: "Italian Pharmacode",
        text: "01234567",
        opts: "includetext"
    },
    "pzn": {
        sym: "pzn",
        desc: "Pharmazentralnummer (PZN)",
        text: "123456",
        opts: "includetext"
    },
    "code93": {
        sym: "code93",
        desc: "Code 93",
        text: "THIS IS CODE 93",
        opts: "includetext includecheck"
    },
    "code93ext": {
        sym: "code93ext",
        desc: "Code 93 Extended",
        text: "Code93 Ext!",
        opts: "includetext includecheck"
    },
    "interleaved2of5": {
        sym: "interleaved2of5",
        desc: "Interleaved 2 of 5 (ITF)",
        text: "2401234567",
        opts: "height=12 includecheck includetext includecheckintext"
    },
    "itf14": {
        sym: "itf14",
        desc: "ITF-14",
        text: "0 952 1234 54321 3",
        opts: "includetext"
    },
    "identcode": {
        sym: "identcode",
        desc: "Deutsche Post Identcode",
        text: "563102430313",
        opts: "includetext"
    },
    "leitcode": {
        sym: "leitcode",
        desc: "Deutsche Post Leitcode",
        text: "21348075016401",
        opts: "includetext"
    },
    "databaromni": {
        sym: "databaromni",
        desc: "GS1 DataBar Omnidirectional",
        text: "(01)09521234543213",
        opts: ""
    },
    "databarstacked": {
        sym: "databarstacked",
        desc: "GS1 DataBar Stacked",
        text: "(01)09521234543213",
        opts: ""
    },
    "databarstackedomni": {
        sym: "databarstackedomni",
        desc: "GS1 DataBar Stacked Omnidirectional",
        text: "(01)24012345678905",
        opts: ""
    },
    "databartruncated": {
        sym: "databartruncated",
        desc: "GS1 DataBar Truncated",
        text: "(01)09521234543213",
        opts: ""
    },
    "databarlimited": {
        sym: "databarlimited",
        desc: "GS1 DataBar Limited",
        text: "(01)09521234543213",
        opts: ""
    },
    "databarexpanded": {
        sym: "databarexpanded",
        desc: "GS1 DataBar Expanded",
        text: "(01)09521234543213(3103)000123",
        opts: ""
    },
    "databarexpandedstacked": {
        sym: "databarexpandedstacked",
        desc: "GS1 DataBar Expanded Stacked",
        text: "(01)09521234543213(3103)000123",
        opts: "segments=4"
    },
    "gs1northamericancoupon": {
        sym: "gs1northamericancoupon",
        desc: "GS1 North American Coupon",
        text: "(8110)106141416543213500110000310123196000",
        opts: "includetext segments=8"
    },
    "pharmacode": {
        sym: "pharmacode",
        desc: "Pharmaceutical Binary Code",
        text: "117480",
        opts: "showborder"
    },
    "pharmacode2": {
        sym: "pharmacode2",
        desc: "Two-track Pharmacode",
        text: "117480",
        opts: "includetext showborder"
    },
    "code2of5": {
        sym: "code2of5",
        desc: "Code 25",
        text: "01234567",
        opts: "includetext includecheck includecheckintext"
    },
    "industrial2of5": {
        sym: "industrial2of5",
        desc: "Industrial 2 of 5",
        text: "01234567",
        opts: "includetext includecheck includecheckintext"
    },
    "iata2of5": {
        sym: "iata2of5",
        desc: "IATA 2 of 5",
        text: "01234567",
        opts: "includetext includecheck includecheckintext"
    },
    "matrix2of5": {
        sym: "matrix2of5",
        desc: "Matrix 2 of 5",
        text: "01234567",
        opts: "includetext includecheck includecheckintext"
    },
    "coop2of5": {
        sym: "coop2of5",
        desc: "COOP 2 of 5",
        text: "01234567",
        opts: "includetext includecheck includecheckintext"
    },
    "datalogic2of5": {
        sym: "datalogic2of5",
        desc: "Datalogic 2 of 5",
        text: "01234567",
        opts: "includetext includecheck includecheckintext"
    },
    "code11": {
        sym: "code11",
        desc: "Code 11",
        text: "0123456789",
        opts: "includetext includecheck includecheckintext"
    },
    "bc412": {
        sym: "bc412",
        desc: "BC412",
        text: "BC412SEMI",
        opts: "semi includetext includecheckintext"
    },
    "rationalizedCodabar": {
        sym: "rationalizedCodabar",
        desc: "Codabar",
        text: "A0123456789B",
        opts: "includetext includecheck includecheckintext"
    },
    "onecode": {
        sym: "onecode",
        desc: "USPS Intelligent Mail",
        text: "0123456709498765432101234567891",
        opts: "barcolor=FF0000"
    },
    "postnet": {
        sym: "postnet",
        desc: "USPS POSTNET",
        text: "01234",
        opts: "includetext includecheckintext"
    },
    "planet": {
        sym: "planet",
        desc: "USPS PLANET",
        text: "01234567890",
        opts: "includetext includecheckintext"
    },
    "royalmail": {
        sym: "royalmail",
        desc: "Royal Mail 4 State Customer Code",
        text: "LE28HS9Z",
        opts: "includetext barcolor=FF0000"
    },
    "auspost": {
        sym: "auspost",
        desc: "AusPost 4 State Customer Code",
        text: "5956439111ABA 9",
        opts: "includetext custinfoenc=character"
    },
    "kix": {
        sym: "kix",
        desc: "Royal Dutch TPG Post KIX",
        text: "1231FZ13XHS",
        opts: "includetext"
    },
    "japanpost": {
        sym: "japanpost",
        desc: "Japan Post 4 State Customer Code",
        text: "6540123789-A-K-Z",
        opts: "includetext includecheckintext"
    },
    "msi": {
        sym: "msi",
        desc: "MSI Modified Plessey",
        text: "0123456789",
        opts: "includetext includecheck includecheckintext"
    },
    "plessey": {
        sym: "plessey",
        desc: "Plessey UK",
        text: "01234ABCD",
        opts: "includetext includecheckintext"
    },
    "telepen": {
        sym: "telepen",
        desc: "Telepen",
        text: "ABCDEF",
        opts: "includetext"
    },
    "telepennumeric": {
        sym: "telepennumeric",
        desc: "Telepen Numeric",
        text: "01234567",
        opts: "includetext"
    },
    "posicode": {
        sym: "posicode",
        desc: "PosiCode",
        text: "ABC123",
        opts: "version=b inkspread=-0.5 parsefnc includetext"
    },
    "codablockf": {
        sym: "codablockf",
        desc: "Codablock F",
        text: "CODABLOCK F 34567890123456789010040digit",
        opts: "columns=8"
    },
    "code16k": {
        sym: "code16k",
        desc: "Code 16K",
        text: "Abcd-1234567890-wxyZ",
        opts: ""
    },
    "code49": {
        sym: "code49",
        desc: "Code 49",
        text: "MULTIPLE ROWS IN CODE 49",
        opts: ""
    },
    "channelcode": {
        sym: "channelcode",
        desc: "Channel Code",
        text: "3493",
        opts: "height=12 includetext"
    },
    "flattermarken": {
        sym: "flattermarken",
        desc: "Flattermarken",
        text: "11099",
        opts: "inkspread=-0.25 showborder borderleft=0 borderright=0"
    },
    "raw": {
        sym: "raw",
        desc: "Custom 1D symbology",
        text: "331132131313411122131311333213114131131221323",
        opts: "height=12"
    },
    "daft": {
        sym: "daft",
        desc: "Custom 4 state symbology",
        text: "FATDAFTDAD",
        opts: ""
    },
    "symbol": {
        sym: "symbol",
        desc: "Miscellaneous symbols",
        text: "fima",
        opts: "backgroundcolor=DD000011"
    },
    "pdf417": {
        sym: "pdf417",
        desc: "PDF417",
        text: "This is PDF417",
        opts: "columns=2"
    },
    "pdf417compact": {
        sym: "pdf417compact",
        desc: "Compact PDF417",
        text: "This is compact PDF417",
        opts: "columns=2"
    },
    "micropdf417": {
        sym: "micropdf417",
        desc: "MicroPDF417",
        text: "MicroPDF417",
        opts: ""
    },
    "datamatrix": {
        sym: "datamatrix",
        desc: "Data Matrix",
        text: "This is Data Matrix!",
        opts: ""
    },
    "datamatrixrectangular": {
        sym: "datamatrixrectangular",
        desc: "Data Matrix Rectangular",
        text: "1234",
        opts: ""
    },
    "datamatrixrectangularextension": {
        sym: "datamatrixrectangularextension",
        desc: "Data Matrix Rectangular Extension",
        text: "1234",
        opts: "version=8x96"
    },
    "mailmark": {
        sym: "mailmark",
        desc: "Royal Mail Mailmark",
        text: "JGB 012100123412345678AB19XY1A 0             www.xyz.com",
        opts: "type=29"
    },
    "qrcode": {
        sym: "qrcode",
        desc: "QR Code",
        text: "http://goo.gl/0bis",
        opts: "eclevel=M"
    },
    "swissqrcode": {
        sym: "swissqrcode",
        desc: "Swiss QR Code",
        text: "SPC^CR^LF0200^CR^LF1^CR^LFCH5800791123000889012^CR^LFS^CR^LFRobert Schneider AG^CR^LFRue du Lac^CR^LF1268^CR^LF2501^CR^LFBiel^CR^LFCH^CR^LF^CR^LF^CR^LF^CR^LF^CR^LF^CR^LF^CR^LF^CR^LF199.95^CR^LFCHF^CR^LFK^CR^LFPia-Maria Rutschmann-Schnyder^CR^LFGrosse Marktgasse 28^CR^LF9400 Rorschach^CR^LF^CR^LF^CR^LFCH^CR^LFSCOR^CR^LFRF18539007547034^CR^LF^CR^LFEPD",
        opts: "parse"
    },
    "microqrcode": {
        sym: "microqrcode",
        desc: "Micro QR Code",
        text: "1234",
        opts: ""
    },
    "rectangularmicroqrcode": {
        sym: "rectangularmicroqrcode",
        desc: "Rectangular Micro QR Code",
        text: "1234",
        opts: "version=R17x139"
    },
    "maxicode": {
        sym: "maxicode",
        desc: "MaxiCode",
        text: "[)>^03001^02996152382802^029840^029001^0291Z00004951^029UPSN^02906X610^029159^0291234567^0291/1^029^029Y^029634 ALPHA DR^029PITTSBURGH^029PA^029^004",
        opts: "mode=2 parse"
    },
    "azteccode": {
        sym: "azteccode",
        desc: "Aztec Code",
        text: "This is Aztec Code",
        opts: "format=full"
    },
    "azteccodecompact": {
        sym: "azteccodecompact",
        desc: "Compact Aztec Code",
        text: "1234",
        opts: ""
    },
    "aztecrune": {
        sym: "aztecrune",
        desc: "Aztec Runes",
        text: "1",
        opts: ""
    },
    "codeone": {
        sym: "codeone",
        desc: "Code One",
        text: "Code One",
        opts: ""
    },
    "hanxin": {
        sym: "hanxin",
        desc: "Han Xin Code",
        text: "This is Han Xin",
        opts: ""
    },
    "dotcode": {
        sym: "dotcode",
        desc: "DotCode",
        text: "This is DotCode",
        opts: "inkspread=0.16"
    },
    "ultracode": {
        sym: "ultracode",
        desc: "Ultracode",
        text: "Awesome colours!",
        opts: "eclevel=EC2"
    },
    "gs1-cc": {
        sym: "gs1-cc",
        desc: "GS1 Composite 2D Component",
        text: "(01)09521234543213(3103)000123",
        opts: "ccversion=b cccolumns=4"
    },
    "ean13composite": {
        sym: "ean13composite",
        desc: "EAN-13 Composite",
        text: "9520123456788|(99)1234-abcd",
        opts: "includetext"
    },
    "ean8composite": {
        sym: "ean8composite",
        desc: "EAN-8 Composite",
        text: "95200002|(21)A12345678",
        opts: "includetext"
    },
    "upcacomposite": {
        sym: "upcacomposite",
        desc: "UPC-A Composite",
        text: "012345000058|(99)1234-abcd",
        opts: "includetext"
    },
    "upcecomposite": {
        sym: "upcecomposite",
        desc: "UPC-E Composite",
        text: "01234558|(15)021231",
        opts: "includetext"
    },
    "databaromnicomposite": {
        sym: "databaromnicomposite",
        desc: "GS1 DataBar Omnidirectional Composite",
        text: "(01)09521234543213|(11)990102",
        opts: ""
    },
    "databarstackedcomposite": {
        sym: "databarstackedcomposite",
        desc: "GS1 DataBar Stacked Composite",
        text: "(01)09521234543213|(17)010200",
        opts: ""
    },
    "databarstackedomnicomposite": {
        sym: "databarstackedomnicomposite",
        desc: "GS1 DataBar Stacked Omnidirectional Composite",
        text: "(01)03612345678904|(11)990102",
        opts: ""
    },
    "databartruncatedcomposite": {
        sym: "databartruncatedcomposite",
        desc: "GS1 DataBar Truncated Composite",
        text: "(01)09521234543213|(11)990102",
        opts: ""
    },
    "databarlimitedcomposite": {
        sym: "databarlimitedcomposite",
        desc: "GS1 DataBar Limited Composite",
        text: "(01)09521234543213|(21)abcdefghijklmnopqrst",
        opts: ""
    },
    "databarexpandedcomposite": {
        sym: "databarexpandedcomposite",
        desc: "GS1 DataBar Expanded Composite",
        text: "(01)09521234543213(3103)001234|(91)1A2B3C4D5E",
        opts: ""
    },
    "databarexpandedstackedcomposite": {
        sym: "databarexpandedstackedcomposite",
        desc: "GS1 DataBar Expanded Stacked Composite",
        text: "(01)09521234543213(10)ABCDEF|(21)12345678",
        opts: "segments=4"
    },
    "gs1-128composite": {
        sym: "gs1-128composite",
        desc: "GS1-128 Composite",
        text: "(00)095287654321012346|(02)09521234543213(37)24(10)1234567ABCDEFG",
        opts: "ccversion=c"
    },
    "gs1datamatrix": {
        sym: "gs1datamatrix",
        desc: "GS1 Data Matrix",
        text: "(01)09521234543213(17)120508(10)ABCD1234(410)9501101020917",
        opts: ""
    },
    "gs1datamatrixrectangular": {
        sym: "gs1datamatrixrectangular",
        desc: "GS1 Data Matrix Rectangular",
        text: "(01)09521234543213(17)120508(10)ABCD1234(410)9501101020917",
        opts: ""
    },
    "gs1dldatamatrix": {
        sym: "gs1dldatamatrix",
        desc: "GS1 Digital Link Data Matrix",
        text: "https://id.gs1.org/01/09521234543213/22/ABC%2d123?99=XYZ%2f987",
        opts: ""
    },
    "gs1qrcode": {
        sym: "gs1qrcode",
        desc: "GS1 QR Code",
        text: "(01)09521234543213(8200)http://www.abc.net(10)ABCD1234(410)9501101020917",
        opts: ""
    },
    "gs1dlqrcode": {
        sym: "gs1dlqrcode",
        desc: "GS1 Digital Link QR Code",
        text: "https://id.gs1.org/01/09521234543213/22/ABC%2d123?99=XYZ%2f987",
        opts: ""
    },
    "gs1dotcode": {
        sym: "gs1dotcode",
        desc: "GS1 DotCode",
        text: "(235)5vBZIF%!<B;?oa%(01)09521234543213(8008)19052001",
        opts: "rows=16"
    },
    "hibccode39": {
        sym: "hibccode39",
        desc: "HIBC Code 39",
        text: "A999BJC5D6E71",
        opts: "includetext"
    },
    "hibccode128": {
        sym: "hibccode128",
        desc: "HIBC Code 128",
        text: "A999BJC5D6E71",
        opts: "includetext"
    },
    "hibcdatamatrix": {
        sym: "hibcdatamatrix",
        desc: "HIBC Data Matrix",
        text: "A999BJC5D6E71",
        opts: ""
    },
    "hibcdatamatrixrectangular": {
        sym: "hibcdatamatrixrectangular",
        desc: "HIBC Data Matrix Rectangular",
        text: "A999BJC5D6E71",
        opts: ""
    },
    "hibcpdf417": {
        sym: "hibcpdf417",
        desc: "HIBC PDF417",
        text: "A999BJC5D6E71",
        opts: ""
    },
    "hibcmicropdf417": {
        sym: "hibcmicropdf417",
        desc: "HIBC MicroPDF417",
        text: "A999BJC5D6E71",
        opts: ""
    },
    "hibcqrcode": {
        sym: "hibcqrcode",
        desc: "HIBC QR Code",
        text: "A999BJC5D6E71",
        opts: ""
    },
    "hibccodablockf": {
        sym: "hibccodablockf",
        desc: "HIBC Codablock F",
        text: "A999BJC5D6E71",
        opts: ""
    },
    "hibcazteccode": {
        sym: "hibcazteccode",
        desc: "HIBC Aztec Code",
        text: "A999BJC5D6E71",
        opts: ""
    }
};

if (typeof module == 'object' && typeof module.exports == 'object') {
    module.exports = symdesc;
}
