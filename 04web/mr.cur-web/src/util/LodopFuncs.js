﻿// (function (win) {
//   var CLODOP = {
//     strWebPageID: '0:0:044',
//     strTaskID: '',
//     strHostURI: 'http://localhost:8000',
//     VERSION: '6.2.1.7',
//     IVERSION: '6217',
//     CVERSION: '2.1.0.2',
//     HTTPS_STATUS: 0,
//     iBaseTask: 1,
//     timeThreshold: 5,
//     Priority: 0,
//     blIslocal: true,
//     Iframes: [],
//     ItemDatas: {},
//     PageData: {},
//     defStyleJson: {},
//     PageDataEx: {},
//     ItemCNameStyles: {},
//     blWorking: false,
//     blNormalItemAdded: false,
//     blTmpSelectedIndex: null,
//     Caption: null,
//     Color: null,
//     CompanyName: null,
//     Border: null,
//     Inbrowse: null,
//     webskt: null,
//     SocketEnable: false,
//     SocketOpened: false,
//     NoClearAfterPrint: false,
//     On_Return_Remain: false,
//     On_Return: null,
//     Result: null,
//     iTrySendTimes: 0,
//     blOneByone: false,
//     Printers: {
//       'default': '0',
//       'list': [{
//         'name': 'Microsoft XPS Document Writer',
//         'DriverName': 'Microsoft XPS Document Writer',
//         'PortName': 'XPSPort:',
//         'Orientation': '1',
//         'PaperSize': '9',
//         'PaperLength': '2970',
//         'PaperWidth': '2100',
//         'Copies': '1',
//         'DefaultSource': '15',
//         'PrintQuality': '600',
//         'Color': '2',
//         'Duplex': '1',
//         'FormName': 'A4',
//         'Comment': '',
//         'DriverVersion': '1536',
//         'DCOrientation': '270',
//         'MaxExtentWidth': '8636',
//         'MaxExtentLength': '11176',
//         'MinExtentWidth': '900',
//         'MinExtentlength': '900',
//         'pagelist': [{
//           'name': '信纸'
//         }, {
//           'name': '小号信纸'
//         }, {
//           'name': 'Tabloid'
//         }, {
//           'name': 'Ledger'
//         }, {
//           'name': '法律专用纸'
//         }, {
//           'name': 'Statement'
//         }, {
//           'name': 'Executive'
//         }, {
//           'name': 'A3'
//         }, {
//           'name': 'A4'
//         }, {
//           'name': 'A4 小号'
//         }, {
//           'name': 'A5'
//         }, {
//           'name': 'B4 (JIS)'
//         }, {
//           'name': 'B5 (JIS)'
//         }, {
//           'name': 'Folio'
//         }, {
//           'name': 'Quarto'
//         }, {
//           'name': '10x14'
//         }, {
//           'name': '11x17'
//         }, {
//           'name': '便笺'
//         }, {
//           'name': '信封 #9'
//         }, {
//           'name': '信封 #10'
//         }, {
//           'name': '信封 #11'
//         }, {
//           'name': '信封 #12'
//         }, {
//           'name': '信封 #14'
//         }, {
//           'name': 'C size sheet'
//         }, {
//           'name': 'D size sheet'
//         }, {
//           'name': 'E size sheet'
//         }, {
//           'name': '信封 DL'
//         }, {
//           'name': '信封 C5'
//         }, {
//           'name': '信封 C3'
//         }, {
//           'name': '信封 C4'
//         }, {
//           'name': '信封 C6'
//         }, {
//           'name': '信封 C65'
//         }, {
//           'name': '信封 B4'
//         }, {
//           'name': '信封 B5'
//         }, {
//           'name': '信封 B6'
//         }, {
//           'name': '信封'
//         }, {
//           'name': '信封 Monarch'
//         }, {
//           'name': '6 3/4 信封'
//         }, {
//           'name': '美国标准 Fanfold'
//         }, {
//           'name': '德国标准 Fanfold'
//         }, {
//           'name': '德国法律专用纸 Fanfold'
//         }, {
//           'name': 'B4 (ISO)'
//         }, {
//           'name': '日式明信片'
//         }, {
//           'name': '9x11'
//         }, {
//           'name': '10x11'
//         }, {
//           'name': '15x11'
//         }, {
//           'name': '信封邀请函'
//         }, {
//           'name': '特大信纸'
//         }, {
//           'name': '特大法律专用纸'
//         }, {
//           'name': 'A4 特大'
//         }, {
//           'name': '信纸横向'
//         }, {
//           'name': 'A4 横向'
//         }, {
//           'name': '特大信纸横向'
//         }, {
//           'name': 'Super A'
//         }, {
//           'name': 'Super B'
//         }, {
//           'name': '信纸加大'
//         }, {
//           'name': 'A4 加大'
//         }, {
//           'name': 'A5 横向'
//         }, {
//           'name': 'B5 (JIS) 横向'
//         }, {
//           'name': 'A3 特大'
//         }, {
//           'name': 'A5 特大'
//         }, {
//           'name': 'B5 (ISO) 特大'
//         }, {
//           'name': 'A2'
//         }, {
//           'name': 'A3 横向'
//         }, {
//           'name': 'A3 特大横向'
//         }, {
//           'name': '日式往返明信片'
//         }, {
//           'name': 'A6'
//         }, {
//           'name': '日式信封 Kaku #2'
//         }, {
//           'name': '日式信封 Kaku #3'
//         }, {
//           'name': '日式信封 Chou #3'
//         }, {
//           'name': '日式信封 Chou #4'
//         }, {
//           'name': '信纸旋转'
//         }, {
//           'name': 'A3 旋转'
//         }, {
//           'name': 'A4 旋转'
//         }, {
//           'name': 'A5 旋转'
//         }, {
//           'name': 'B4 (JIS) 旋转'
//         }, {
//           'name': 'B5 (JIS) 旋转'
//         }, {
//           'name': '日式明信片旋转'
//         }, {
//           'name': '双层日式明信片旋转'
//         }, {
//           'name': 'A6 旋转'
//         }, {
//           'name': '日式信封 Kaku #2 旋转'
//         }, {
//           'name': '日式信封 Kaku #3 旋转'
//         }, {
//           'name': '日式信封 Chou #3 旋转'
//         }, {
//           'name': '日式信封 Chou #4 旋转'
//         }, {
//           'name': 'B6 (JIS)'
//         }, {
//           'name': 'B6 (JIS) 旋转'
//         }, {
//           'name': '12x11'
//         }, {
//           'name': '日式信封 You #4'
//         }, {
//           'name': '日式信封 You #4 旋转'
//         }, {
//           'name': 'PRC 信封 #1'
//         }, {
//           'name': 'PRC 信封 #3'
//         }, {
//           'name': 'PRC 信封 #4'
//         }, {
//           'name': 'PRC 信封 #5'
//         }, {
//           'name': 'PRC 信封 #6'
//         }, {
//           'name': 'PRC 信封 #7'
//         }, {
//           'name': 'PRC 信封 #8'
//         }, {
//           'name': 'PRC 信封 #9'
//         }, {
//           'name': 'PRC 信封 #10'
//         }, {
//           'name': 'PRC 信封 #1 旋转'
//         }, {
//           'name': 'PRC 信封 #3 旋转'
//         }, {
//           'name': 'PRC 信封 #4 旋转'
//         }, {
//           'name': 'PRC 信封 #5 旋转'
//         }, {
//           'name': 'PRC 信封 #6 旋转'
//         }, {
//           'name': 'PRC 信封 #7 旋转'
//         }, {
//           'name': 'PRC 信封 #8 旋转'
//         }, {
//           'name': 'PRC 信封 #9 旋转'
//         }]
//       }, {
//         'name': 'HWSealPrinter',
//         'DriverName': 'HWSealDriver',
//         'PortName': 'C:\\Windows\\system32\\spool\\PRINTERS\\HWSealPort',
//         'Orientation': '1',
//         'PaperSize': '9',
//         'PaperLength': '2970',
//         'PaperWidth': '2100',
//         'Copies': '1',
//         'DefaultSource': '0',
//         'PrintQuality': '0',
//         'Color': '2',
//         'Duplex': '1',
//         'FormName': 'A4',
//         'Comment': '',
//         'DriverVersion': '1280',
//         'DCOrientation': '90',
//         'MaxExtentWidth': '32767',
//         'MaxExtentLength': '32767',
//         'MinExtentWidth': '5',
//         'MinExtentlength': '8',
//         'pagelist': [{
//           'name': 'A4'
//         }, {
//           'name': 'A4 Rotated'
//         }, {
//           'name': 'A4 Extra'
//         }, {
//           'name': 'A4 Plus'
//         }, {
//           'name': 'Letter'
//         }, {
//           'name': 'Letter Rotated'
//         }, {
//           'name': 'Letter Extra'
//         }, {
//           'name': 'Letter Plus'
//         }, {
//           'name': 'A5'
//         }, {
//           'name': 'A5 Rotated'
//         }, {
//           'name': 'A5 Extra'
//         }, {
//           'name': 'A6'
//         }, {
//           'name': 'A6 Rotated'
//         }, {
//           'name': 'A3'
//         }, {
//           'name': 'A3 Rotated'
//         }, {
//           'name': 'A3 Extra'
//         }, {
//           'name': 'A2'
//         }, {
//           'name': 'A2 Rotated'
//         }, {
//           'name': 'A1'
//         }, {
//           'name': 'A1 Rotated'
//         }, {
//           'name': 'A0'
//         }, {
//           'name': 'A0 Rotated'
//         }, {
//           'name': 'Legal'
//         }, {
//           'name': 'Legal Rotated'
//         }, {
//           'name': 'Legal Extra'
//         }, {
//           'name': 'Executive'
//         }, {
//           'name': 'Executive Rotated'
//         }, {
//           'name': 'Statement'
//         }, {
//           'name': 'Statement Rotated'
//         }, {
//           'name': 'Ledger'
//         }, {
//           'name': 'Ledger Rotated'
//         }, {
//           'name': 'Tabloid'
//         }, {
//           'name': 'Tabloid Rotated'
//         }, {
//           'name': 'Tabloid Extra'
//         }, {
//           'name': 'Super A'
//         }, {
//           'name': 'Super A Rotated'
//         }, {
//           'name': 'Super B'
//         }, {
//           'name': 'Super B Rotated'
//         }, {
//           'name': 'PRC 16K'
//         }, {
//           'name': 'PRC 16K Rotated'
//         }, {
//           'name': 'PRC 32K'
//         }, {
//           'name': 'PRC 32K Rotated'
//         }, {
//           'name': 'PRC 32K(big)'
//         }, {
//           'name': 'PRC 32K(big) Rotated'
//         }, {
//           'name': 'ANSI A 8.5 x 11 in'
//         }, {
//           'name': 'ANSI A 11 x 8.5 in'
//         }, {
//           'name': 'ANSI B 11 x 17 in'
//         }, {
//           'name': 'ANSI B 17 x 11 in'
//         }, {
//           'name': 'ANSI C 17 x 22 in'
//         }, {
//           'name': 'ANSI C 22 x 17 in'
//         }, {
//           'name': 'ANSI D 22 x 34 in'
//         }, {
//           'name': 'ANSI D 34 x 22 in'
//         }, {
//           'name': 'ANSI E 34 x 44 in'
//         }, {
//           'name': 'ANSI E 44 x 34 in'
//         }, {
//           'name': 'Arch A 9 x 12 in'
//         }, {
//           'name': 'Arch A 12 x 9 in'
//         }, {
//           'name': 'Arch B 12 x 18 in'
//         }, {
//           'name': 'Arch B 18 x 12 in'
//         }, {
//           'name': 'Arch C 18 x 24 in'
//         }, {
//           'name': 'Arch C 24 x 18 in'
//         }, {
//           'name': 'Arch D 24 x 36 in'
//         }, {
//           'name': 'Arch D 36 x 24 in'
//         }, {
//           'name': 'Arch E 36 x 48 in'
//         }, {
//           'name': 'Arch E 48 x 36 in'
//         }, {
//           'name': 'Arch E1 30 x 42 in'
//         }, {
//           'name': 'Arch E1 42 x 30 in'
//         }, {
//           'name': 'Arch E2 26 x 38 in'
//         }, {
//           'name': 'Arch E2 38 x 26 in'
//         }, {
//           'name': 'Arch E3 27 x 39 in'
//         }, {
//           'name': 'Arch E3 39 x 27 in'
//         }, {
//           'name': 'B4 (ISO)'
//         }, {
//           'name': 'B4 (ISO) Rotated'
//         }, {
//           'name': 'B4 (JIS)'
//         }, {
//           'name': 'B4 (JIS) Rotated'
//         }, {
//           'name': 'B5 (ISO) Extra'
//         }, {
//           'name': 'B5 (JIS)'
//         }, {
//           'name': 'B5 (JIS) Rotated'
//         }, {
//           'name': 'B6 (JIS)'
//         }, {
//           'name': 'B6 (JIS) Rotated'
//         }, {
//           'name': 'C size sheet'
//         }, {
//           'name': 'D size sheet'
//         }, {
//           'name': 'E size sheet'
//         }, {
//           'name': '10x11'
//         }, {
//           'name': '11x10'
//         }, {
//           'name': '10x14'
//         }, {
//           'name': '14x10'
//         }, {
//           'name': '11x17'
//         }, {
//           'name': '17x11'
//         }, {
//           'name': '12x11'
//         }, {
//           'name': '11x12'
//         }, {
//           'name': '15x11'
//         }, {
//           'name': '11x15'
//         }, {
//           'name': '9x11'
//         }, {
//           'name': '11x9'
//         }, {
//           'name': 'ISO A0 841 x 1189 mm'
//         }, {
//           'name': 'ISO A0 1189 x 841 mm'
//         }, {
//           'name': 'ISO A1 594 x 841 mm'
//         }, {
//           'name': 'ISO A1 841 x 594 mm'
//         }, {
//           'name': 'ISO A2 420 x 594 mm'
//         }, {
//           'name': 'ISO A2 594 x 420 mm'
//         }, {
//           'name': 'ISO A3 297 x 420 mm'
//         }, {
//           'name': 'ISO A3 420 x 297 mm'
//         }, {
//           'name': 'ISO A4 210 x 297 mm'
//         }, {
//           'name': 'ISO A4 297 x 210 mm'
//         }, {
//           'name': 'ISO B1 707 x 1000 mm'
//         }, {
//           'name': 'ISO B1 1000 x 707  mm'
//         }, {
//           'name': 'ISO B2 500 x 707 mm'
//         }, {
//           'name': 'ISO B2 707 x 500 mm'
//         }, {
//           'name': 'ISO B3 353 x 500 mm'
//         }, {
//           'name': 'ISO B3 500 x 353 mm'
//         }, {
//           'name': 'ISO B4 250 x 353 mm'
//         }, {
//           'name': 'ISO B4 353 x 250 mm'
//         }, {
//           'name': 'ISO OS A0 900 x 1245 mm'
//         }, {
//           'name': 'ISO OS A0 1245 x 900 mm'
//         }, {
//           'name': 'ISO OS A1 625 x 900 mm'
//         }, {
//           'name': 'ISO OS A1 900 x 625 mm'
//         }, {
//           'name': 'ISO OS A2 480 x 625 mm'
//         }, {
//           'name': 'ISO OS A2 625 x 480 mm'
//         }, {
//           'name': 'Note'
//         }, {
//           'name': 'US Std Fanfold'
//         }, {
//           'name': 'German Std Fanfold'
//         }, {
//           'name': 'German Legal Fanfold'
//         }, {
//           'name': '6 3/4 Envelope'
//         }, {
//           'name': 'Envelope Invite'
//         }, {
//           'name': 'Envelope #9'
//         }, {
//           'name': 'Envelope #10'
//         }, {
//           'name': 'Envelope #11'
//         }, {
//           'name': 'Envelope #12'
//         }, {
//           'name': 'Envelope #14'
//         }, {
//           'name': 'Envelope C3'
//         }, {
//           'name': 'Envelope C4'
//         }, {
//           'name': 'Envelope C5'
//         }, {
//           'name': 'Envelope C6'
//         }, {
//           'name': 'Envelope C65'
//         }, {
//           'name': 'Envelope DL'
//         }, {
//           'name': 'Envelope B4'
//         }, {
//           'name': 'Envelope B5'
//         }, {
//           'name': 'Envelope B6'
//         }, {
//           'name': 'Envelope'
//         }, {
//           'name': 'Envelope Monarch'
//         }, {
//           'name': 'Envelope #10 Rotated'
//         }, {
//           'name': 'Envelope DL Rotated'
//         }, {
//           'name': 'PRC Envelope #1'
//         }, {
//           'name': 'PRC Envelope #2'
//         }, {
//           'name': 'PRC Envelope #3'
//         }, {
//           'name': 'PRC Envelope #4'
//         }, {
//           'name': 'PRC Envelope #5'
//         }, {
//           'name': 'PRC Envelope #6'
//         }, {
//           'name': 'PRC Envelope #7'
//         }, {
//           'name': 'PRC Envelope #8'
//         }, {
//           'name': 'PRC Envelope #9'
//         }, {
//           'name': 'PRC Envelope #10'
//         }, {
//           'name': 'PRC Envelope #1 Rotated'
//         }, {
//           'name': 'PRC Envelope #2 Rotated'
//         }, {
//           'name': 'PRC Envelope #3 Rotated'
//         }, {
//           'name': 'PRC Envelope #4 Rotated'
//         }, {
//           'name': 'PRC Envelope #5 Rotated'
//         }, {
//           'name': 'PRC Envelope #6 Rotated'
//         }, {
//           'name': 'PRC Envelope #7 Rotated'
//         }, {
//           'name': 'PRC Envelope #8 Rotated'
//         }, {
//           'name': 'PRC Envelope #9 Rotated'
//         }, {
//           'name': 'PRC Envelope #10 Rotated'
//         }, {
//           'name': 'Japanese Envelope Kaku #2'
//         }, {
//           'name': 'Japanese Envelope Kaku #3'
//         }, {
//           'name': 'Japanese Envelope Chou #3'
//         }, {
//           'name': 'Japanese Envelope Chou #4'
//         }, {
//           'name': 'Japanese Envelope Kaku #2 Rotated'
//         }, {
//           'name': 'Japanese Envelope Kaku #3 Rotated'
//         }, {
//           'name': 'Japanese Envelope Chou #3 Rotated'
//         }, {
//           'name': 'Japanese Envelope Chou #4 Rotated'
//         }, {
//           'name': 'JIS B4 257 x 364 mm'
//         }, {
//           'name': 'JIS B3 364 x 515 mm'
//         }, {
//           'name': 'JIS B2 515 x 728 mm'
//         }, {
//           'name': 'JIS B1 728 x 1030 mm'
//         }, {
//           'name': 'DIN C4 229 x 324 mm'
//         }, {
//           'name': 'DIN C3 324 x 458 mm'
//         }, {
//           'name': 'DIN C2 458 x 648 mm'
//         }, {
//           'name': 'DIN C1 648 x 917 mm'
//         }, {
//           'name': 'DIN C0 917 x 1297 mm'
//         }, {
//           'name': '700mm'
//         }, {
//           'name': '700mm Breadthwise'
//         }, {
//           'name': 'Screen'
//         }, {
//           'name': 'Japanese Double Postcard'
//         }, {
//           'name': 'Japanese Double Postcard Rotated'
//         }, {
//           'name': 'Japanese Postcard'
//         }, {
//           'name': 'Japanese Postcard Rotated'
//         }, {
//           'name': 'Folio'
//         }, {
//           'name': 'Quarto'
//         }, {
//           'name': 'Automatic(max 1905 x 2286mm)'
//         }, {
//           'name': 'Auto small(600 x 860mm)'
//         }, {
//           'name': 'Custom'
//         }]
//       }, {
//         'name': 'Fax',
//         'DriverName': 'Microsoft Shared Fax Driver',
//         'PortName': 'SHRFAX:',
//         'Orientation': '1',
//         'PaperSize': '1',
//         'PaperLength': '0',
//         'PaperWidth': '0',
//         'Copies': '0',
//         'DefaultSource': '1',
//         'PrintQuality': '200',
//         'Color': '1',
//         'Duplex': '1',
//         'FormName': 'Letter',
//         'Comment': '',
//         'DriverVersion': '1024',
//         'DCOrientation': '90',
//         'MaxExtentWidth': '2189',
//         'MaxExtentLength': '3556',
//         'MinExtentWidth': '0',
//         'MinExtentlength': '0',
//         'pagelist': [{
//           'name': '信纸'
//         }, {
//           'name': '小号信纸'
//         }, {
//           'name': '法律专用纸'
//         }, {
//           'name': 'Statement'
//         }, {
//           'name': 'Executive'
//         }, {
//           'name': 'A4'
//         }, {
//           'name': 'A4 小号'
//         }, {
//           'name': 'A5'
//         }, {
//           'name': 'B5 (JIS)'
//         }, {
//           'name': 'Folio'
//         }, {
//           'name': 'Quarto'
//         }, {
//           'name': '便笺'
//         }, {
//           'name': '信封 #9'
//         }, {
//           'name': '信封 #10'
//         }, {
//           'name': '信封 #11'
//         }, {
//           'name': '信封 #12'
//         }, {
//           'name': '信封 #14'
//         }, {
//           'name': '信封 DL'
//         }, {
//           'name': '信封 C5'
//         }, {
//           'name': '信封 C6'
//         }, {
//           'name': '信封 C65'
//         }, {
//           'name': '信封 B5'
//         }, {
//           'name': '信封 B6'
//         }, {
//           'name': '信封'
//         }, {
//           'name': '信封 Monarch'
//         }, {
//           'name': '6 3/4 信封'
//         }, {
//           'name': '德国标准 Fanfold'
//         }, {
//           'name': '德国法律专用纸 Fanfold'
//         }, {
//           'name': '日式明信片'
//         }, {
//           'name': 'Reserved48'
//         }, {
//           'name': 'Reserved49'
//         }, {
//           'name': '信纸横向'
//         }, {
//           'name': 'A4 横向'
//         }, {
//           'name': '信纸加大'
//         }, {
//           'name': 'A4 加大'
//         }, {
//           'name': 'A5 横向'
//         }, {
//           'name': 'B5 (JIS) 横向'
//         }, {
//           'name': 'A5 特大'
//         }, {
//           'name': 'B5 (ISO) 特大'
//         }, {
//           'name': '日式往返明信片'
//         }, {
//           'name': 'A6'
//         }, {
//           'name': '日式信封 Kaku #3'
//         }, {
//           'name': '日式信封 Chou #3'
//         }, {
//           'name': '日式信封 Chou #4'
//         }, {
//           'name': 'A5 旋转'
//         }, {
//           'name': '日式明信片旋转'
//         }, {
//           'name': '双层日式明信片旋转'
//         }, {
//           'name': 'A6 旋转'
//         }, {
//           'name': '日式信封 Chou #4 旋转'
//         }, {
//           'name': 'B6 (JIS)'
//         }, {
//           'name': 'B6 (JIS) 旋转'
//         }, {
//           'name': '日式信封 You #4'
//         }, {
//           'name': 'PRC 16K'
//         }, {
//           'name': 'PRC 32K'
//         }, {
//           'name': 'PRC 32K(Big)'
//         }, {
//           'name': 'PRC 信封 #1'
//         }, {
//           'name': 'PRC 信封 #2'
//         }, {
//           'name': 'PRC 信封 #3'
//         }, {
//           'name': 'PRC 信封 #4'
//         }, {
//           'name': 'PRC 信封 #5'
//         }, {
//           'name': 'PRC 信封 #6'
//         }, {
//           'name': 'PRC 信封 #7'
//         }, {
//           'name': 'PRC 信封 #8'
//         }, {
//           'name': 'PRC 32K 旋转'
//         }, {
//           'name': 'PRC 32K(大)旋转'
//         }, {
//           'name': 'PRC 信封 #1 旋转'
//         }, {
//           'name': 'PRC 信封 #2 旋转'
//         }, {
//           'name': 'PRC 信封 #3 旋转'
//         }, {
//           'name': 'PRC 信封 #4 旋转'
//         }, {
//           'name': '日式照片卡 L'
//         }, {
//           'name': '日式照片卡 2L'
//         }, {
//           'name': '索引卡(5\'x8\')'
//         }, {
//           'name': '照片 4\'x6\''
//         }, {
//           'name': 'A4(无边距)'
//         }, {
//           'name': 'A6(无边距)'
//         }, {
//           'name': '日本明信片(无边距)'
//         }, {
//           'name': '日本照片 L(无边距)'
//         }, {
//           'name': '日本照片 2L(无边距)'
//         }, {
//           'name': '照片 4\'x6\' (无边距)'
//         }, {
//           'name': '索引卡(无边距)'
//         }, {
//           'name': 'Letter'
//         }, {
//           'name': 'Legal'
//         }, {
//           'name': 'A5Transverse'
//         }, {
//           'name': 'B5'
//         }, {
//           'name': '16K(195x270mm)'
//         }, {
//           'name': '16K(184x260mm)'
//         }, {
//           'name': '16K(197x273mm)'
//         }, {
//           'name': 'JISB5'
//         }, {
//           'name': 'Oficio'
//         }]
//       }, {
//         'name': 'Brother MFC-1919NW Printer 2',
//         'DriverName': 'Brother MFC-1919NW Printer',
//         'PortName': '192.168.1.114',
//         'Orientation': '1',
//         'PaperSize': '9',
//         'PaperLength': '2970',
//         'PaperWidth': '2100',
//         'Copies': '1',
//         'DefaultSource': '1',
//         'PrintQuality': '600',
//         'Color': '1',
//         'Duplex': '1',
//         'FormName': 'A4',
//         'Comment': '',
//         'DriverVersion': '256',
//         'DCOrientation': '90',
//         'MaxExtentWidth': '2159',
//         'MaxExtentLength': '3556',
//         'MinExtentWidth': '1480',
//         'MinExtentlength': '1480',
//         'pagelist': [{
//           'name': 'A4'
//         }, {
//           'name': 'Letter'
//         }, {
//           'name': 'Legal'
//         }, {
//           'name': 'Executive'
//         }, {
//           'name': 'A5'
//         }, {
//           'name': 'A5 长边'
//         }, {
//           'name': 'B5'
//         }, {
//           'name': '16K(195x270mm)'
//         }, {
//           'name': '16K(184x260mm)'
//         }, {
//           'name': '16K(197x273mm)'
//         }, {
//           'name': 'JIS B5'
//         }, {
//           'name': 'Folio'
//         }, {
//           'name': 'A3'
//         }, {
//           'name': 'JIS B4'
//         }, {
//           'name': 'Ledger'
//         }, {
//           'name': '用户自定义尺寸'
//         }]
//       }, {
//         'name': 'Brother MFC-1919NW Printer (副本 1)',
//         'DriverName': 'Brother MFC-1919NW Printer',
//         'PortName': 'WSD-5fbcf7c6-d9ee-47a7-a18a-c298720039f3.0030',
//         'Orientation': '1',
//         'PaperSize': '9',
//         'PaperLength': '2970',
//         'PaperWidth': '2100',
//         'Copies': '1',
//         'DefaultSource': '1',
//         'PrintQuality': '600',
//         'Color': '1',
//         'Duplex': '1',
//         'FormName': 'A4',
//         'Comment': '',
//         'DriverVersion': '256',
//         'DCOrientation': '90',
//         'MaxExtentWidth': '2159',
//         'MaxExtentLength': '3556',
//         'MinExtentWidth': '1480',
//         'MinExtentlength': '1480',
//         'pagelist': [{
//           'name': 'A4'
//         }, {
//           'name': 'Letter'
//         }, {
//           'name': 'Legal'
//         }, {
//           'name': 'Executive'
//         }, {
//           'name': 'A5'
//         }, {
//           'name': 'A5 长边'
//         }, {
//           'name': 'B5'
//         }, {
//           'name': '16K(195x270mm)'
//         }, {
//           'name': '16K(184x260mm)'
//         }, {
//           'name': '16K(197x273mm)'
//         }, {
//           'name': 'JIS B5'
//         }, {
//           'name': 'Folio'
//         }, {
//           'name': 'A3'
//         }, {
//           'name': 'JIS B4'
//         }, {
//           'name': 'Ledger'
//         }, {
//           'name': '用户自定义尺寸'
//         }]
//       }, {
//         'name': 'Brother MFC-1919NW Printer',
//         'DriverName': 'Brother MFC-1919NW Printer',
//         'PortName': 'BrotherMFC-1919NW',
//         'Orientation': '1',
//         'PaperSize': '9',
//         'PaperLength': '2970',
//         'PaperWidth': '2100',
//         'Copies': '1',
//         'DefaultSource': '1',
//         'PrintQuality': '600',
//         'Color': '1',
//         'Duplex': '1',
//         'FormName': 'A4',
//         'Comment': '',
//         'DriverVersion': '256',
//         'DCOrientation': '90',
//         'MaxExtentWidth': '2159',
//         'MaxExtentLength': '3556',
//         'MinExtentWidth': '1480',
//         'MinExtentlength': '1480',
//         'pagelist': [{
//           'name': 'A4'
//         }, {
//           'name': 'Letter'
//         }, {
//           'name': 'Legal'
//         }, {
//           'name': 'Executive'
//         }, {
//           'name': 'A5'
//         }, {
//           'name': 'A5 长边'
//         }, {
//           'name': 'B5'
//         }, {
//           'name': '16K(195x270mm)'
//         }, {
//           'name': '16K(184x260mm)'
//         }, {
//           'name': '16K(197x273mm)'
//         }, {
//           'name': 'JIS B5'
//         }, {
//           'name': 'Folio'
//         }, {
//           'name': 'A3'
//         }, {
//           'name': 'JIS B4'
//         }, {
//           'name': 'Ledger'
//         }, {
//           'name': '用户自定义尺寸'
//         }]
//       }, {
//         'name': 'Brother DCP-116C',
//         'DriverName': 'Brother DCP-116C',
//         'PortName': 'LPT1:',
//         'Orientation': '1',
//         'PaperSize': '9',
//         'PaperLength': '2970',
//         'PaperWidth': '2100',
//         'Copies': '1',
//         'DefaultSource': '15',
//         'PrintQuality': '600',
//         'Color': '2',
//         'Duplex': '1',
//         'FormName': 'A4',
//         'Comment': '',
//         'DriverVersion': '1536',
//         'DCOrientation': '270',
//         'MaxExtentWidth': '2248',
//         'MaxExtentLength': '3556',
//         'MinExtentWidth': '889',
//         'MinExtentlength': '1270',
//         'pagelist': [{
//           'name': '信纸'
//         }, {
//           'name': '法律专用纸'
//         }, {
//           'name': 'Executive'
//         }, {
//           'name': 'A4'
//         }, {
//           'name': 'A5'
//         }, {
//           'name': 'B5 (JIS)'
//         }, {
//           'name': '信封 #10'
//         }, {
//           'name': '信封 DL'
//         }, {
//           'name': '信封 C5'
//         }, {
//           'name': '信封 Monarch'
//         }, {
//           'name': '日式明信片'
//         }, {
//           'name': 'A6'
//         }, {
//           'name': '双层日式明信片旋转'
//         }, {
//           'name': '日式信封 You #4'
//         }, {
//           'name': '日式照片卡 L'
//         }, {
//           'name': '日式照片卡 2L'
//         }, {
//           'name': '索引卡(5\'x8\')'
//         }, {
//           'name': '照片 4\'x6\''
//         }, {
//           'name': 'A4(无边距)'
//         }, {
//           'name': '信封(无边距)'
//         }, {
//           'name': 'A6(无边距)'
//         }, {
//           'name': '日本明信片(无边距)'
//         }, {
//           'name': '日本照片 L(无边距)'
//         }, {
//           'name': '日本照片 2L(无边距)'
//         }, {
//           'name': '照片 4\'x6\' (无边距)'
//         }, {
//           'name': '索引卡(无边距)'
//         }]
//       }]
//     },
//     Browser: (function () {
//       var ua = navigator.userAgent
//       var isOpera = Object.prototype.toString.call(window.opera) === '[object Opera]'
//       return {
//         IE: !!window.attachEvent && !isOpera,
//         Opera: isOpera,
//         WebKit: ua.indexOf('AppleWebKit/') > -1,
//         Gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
//         MobileSafari: /Apple.*Mobile/.test(ua)
//       }
//     })(),
//     GetTaskID: function () {
//       if (!this.strTaskID || this.strTaskID === '') {
//         var dt = new Date()
//         this.iBaseTask = this.iBaseTask + 1
//         this.strTaskID = '' + dt.getHours() + dt.getMinutes() + dt.getSeconds() + '_' + this.iBaseTask
//       }
//       return this.strWebPageID + this.strTaskID
//     },
//     DoInit: function () {
//       this.strTaskID = ''
//       if (this.NoClearAfterPrint) return
//       this.ItemDatas = {
//         'count': 0
//       }
//       this.PageData = {}
//       this.ItemCNameStyles = {}
//       this.defStyleJson = {
//         'beginpage': 0,
//         'beginpagea': 0
//       }
//       this.blNormalItemAdded = false
//     },
//     OpenWebSocket: function () {
//       if (!window.WebSocket && !window.MozWebSocket) {
//         if (window.On_CLodop_Opened) {
//           if (CLODOP.Priority === window.CLODOP_OK_Priority) setTimeout('window.On_CLodop_Opened()', 1)
//         }
//         return
//       }
//       this.SocketEnable = true
//       try {
//         if (!this.webskt || this.webskt.readyState === 3) {
//           if (!window.WebSocket && window.MozWebSocket) window.WebSocket = window.MozWebSocket
//           this.webskt = new WebSocket('ws://127.0.0.1:8000/c_webskt/')
//           this.webskt.onopen = function (e) {
//             CLODOP.SocketOpened = true
//             if (window.On_CLodop_Opened) {
//               if (CLODOP.Priority === window.CLODOP_OK_Priority) setTimeout(window.On_CLodop_Opened(), 1)
//             }
//           }
//           this.webskt.onmessage = function (e) {
//             CLODOP.blOneByone = false
//             var strResult = e.data
//             CLODOP.Result = strResult
//             try {
//               var iPos = strResult.indexOf('=')
//               var strFTaskID = null
//               if (iPos >= 0 && iPos < 30) {
//                 strFTaskID = strResult.slice(0, iPos)
//                 strResult = strResult.slice(iPos + 1)
//               }
//               if (strFTaskID.indexOf('ErrorMS') > -1) {
//                 alert(strResult)
//                 return
//               }
//               if (CLODOP.On_Return) {
//                 var selfFunc = CLODOP.On_Return
//                 if (strResult === 'true' || strResult === 'false') CLODOP.On_Return(strFTaskID, strResult === 'true')
//                 else CLODOP.On_Return(strFTaskID, strResult)
//                 if (!CLODOP.On_Return_Remain && selfFunc === CLODOP.On_Return) CLODOP.On_Return = null
//               }
//             } catch (err) {}
//           }
//           this.webskt.onclose = function (e) {
//             if (!CLODOP.SocketOpened) {
//               CLODOP.SocketEnable = false
//               return
//             }
//             setTimeout(CLODOP.OpenWebSocket(), 2000)
//           }
//           this.webskt.onerror = function (e) {}
//         }
//       } catch (err) {
//         this.webskt = null
//         setTimeout(CLODOP.OpenWebSocket(), 2000)
//       }
//     },
//     wsSend: function (strData) {
//       if (!this.SocketEnable) return
//       if (this.webskt && this.webskt.readyState === 1) {
//         this.Result = null
//         this.iTrySendTimes = 0
//         this.webskt.send(strData)
//         return true
//       } else {
//         alert('WebSocket没准备好，点确定继续...')
//         this.iTrySendTimes++
//           if (this.iTrySendTimes <= 1) {
//             setTimeout(CLODOP.wsSend(strData), 500)
//           } else {
//             this.OpenWebSocket()
//           }
//       }
//     },
//     FORMAT: function (oType, oValue) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (oType !== undefined && oValue !== undefined) {
//         if (oType.replace(/^\s+|\s+$/g, '').toLowerCase().indexOf('time:') === 0) {
//           oType = oType.replace(/^\s+|\s+$/g, '').slice(5)
//           if (oValue.toLowerCase().indexOf('now') > -1) oValue = (new Date()).toString()
//           if (oValue.toLowerCase().indexOf('date') > -1) oValue = (new Date()).toString()
//           if (oValue.toLowerCase().indexOf('time') > -1) oValue = (new Date()).toString()
//           var TypeYMD = 'ymd'
//           if (oValue.toLowerCase().indexOf('ymd') > -1) {
//             TypeYMD = 'ymd'
//             oValue = oValue.slice(3)
//           }
//           if (oValue.toLowerCase().indexOf('dmy') > -1) {
//             TypeYMD = 'dmy'
//             oValue = oValue.slice(3)
//           }
//           if (oValue.toLowerCase().indexOf('mdy') > -1) {
//             TypeYMD = 'mdy'
//             oValue = oValue.slice(3)
//           }
//           oValue = oValue.replace(/ [^ ]*\+[^ ]* /g, ' ')
//           oValue = oValue.replace(/\(.*\)/g, ' ')
//           oValue = oValue.replace(/星期日|星期一|星期二|星期三|星期四|星期五|星期六/g, ' ')
//           oValue = oValue.replace(/[A-Za-z]+day|Mon|Tue|Wed|Thu|Fri|Sat|Sun/g, ' ')
//           var aMonth = 0
//           var exp = new RegExp('Oct[A-Za-z]*|十月|10月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 10
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('Nov[A-Za-z]*|十一月|11月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 11
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('Dec[A-Za-z]*|十二月|12月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 12
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('Jan[A-Za-z]*|一月|01月|1月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 1
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('Feb[A-Za-z]*|二月|02月|2月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 2
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('Mar[A-Za-z]*|三月|03月|3月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 3
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('Apr[A-Za-z]*|四月|04月|4月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 4
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('May[A-Za-z]*|五月|05月|5月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 5
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('Jun[A-Za-z]*|六月|06月|6月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 6
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('Jul[A-Za-z]*|七月|07月|7月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 7
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('Aug[A-Za-z]*|八月|08月|8月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 8
//             oValue = oValue.replace(exp, '')
//           }
//           exp = new RegExp('Sep[A-Za-z]*|九月|09月|9月', 'i')
//           if (oValue.match(exp) !== null) {
//             aMonth = 9
//             oValue = oValue.replace(exp, '')
//           }
//           oValue = oValue.replace(/日|秒/g, ' ')
//           oValue = oValue.replace(/时|分/g, ':')
//           var subTime = oValue.match(/ \d+:\d+:\d+/)
//           if (subTime === null) subTime = ''
//           oValue = oValue.replace(/ \d+:\d+:\d+/, '') + subTime
//           var dValue = new Date()
//           var iYear = 0
//           var iMonth = 0
//           var iDate = 0
//           var iHour = 0
//           var iMinutes = 0
//           var iSecond = 0
//           var tmpValue = oValue
//           var sValue = ''
//           var MC1 = 0
//           MC2 = 0
//           MC3 = 0
//           sValue = tmpValue.match(/\d+/)
//           if (sValue !== null) {
//             MC1 = parseInt(sValue[0])
//             tmpValue = tmpValue.replace(/\d+/, '')
//           }
//           sValue = tmpValue.match(/\d+/)
//           if (sValue !== null) {
//             MC2 = parseInt(sValue[0])
//             tmpValue = tmpValue.replace(/\d+/, '')
//           }
//           if (aMonth <= 0) {
//             sValue = tmpValue.match(/\d+/)
//             if (sValue !== null) {
//               MC3 = parseInt(sValue[0])
//               tmpValue = tmpValue.replace(/\d+/, '')
//             }
//           }
//           if (aMonth > 0) {
//             iMonth = aMonth
//             if (MC2 <= 31) {
//               iYear = MC1
//               iDate = MC2
//             } else {
//               iYear = MC2
//               iDate = MC1
//             }
//           } else if (TypeYMD === 'dmy') {
//             iDate = MC1
//             iMonth = MC2
//             iYear = MC3
//           } else if (TypeYMD === 'mdy') {
//             iMonth = MC1
//             iDate = MC2
//             iYear = MC3
//           } else {
//             iYear = MC1
//             iMonth = MC2
//             iDate = MC3
//             if (MC3 > 31) {
//               iYear = MC3
//               iMonth = MC1
//               iDate = MC2
//               if (MC1 > 12) {
//                 iDate = MC1
//                 iMonth = MC2
//               }
//             } else {
//               if (MC2 > 12) {
//                 iYear = MC2
//                 iMonth = MC1
//               }
//             }
//           }
//           var sValue = tmpValue.match(/\d+/)
//           if (sValue !== null) {
//             iHour = parseInt(sValue[0])
//             tmpValue = tmpValue.replace(/\d+/, '')
//           }
//           var sValue = tmpValue.match(/\d+/)
//           if (sValue !== null) {
//             iMinutes = parseInt(sValue[0])
//             tmpValue = tmpValue.replace(/\d+/, '')
//           }
//           var sValue = tmpValue.match(/\d+/)
//           if (sValue !== null) {
//             iSecond = parseInt(sValue[0])
//             tmpValue = tmpValue.replace(/\d+/, '')
//           }
//           if (oType.toLowerCase() === 'isvalidformat') oValue = (iYear > 0 && iMonth > 0 && iMonth <= 12 && iDate > 0 && iDate <= 31)
//           else {
//             if (('' + iYear).length < 4) iYear = iYear + 2000
//             dValue.setFullYear(iYear, iMonth - 1, iDate)
//             dValue.setHours(iHour)
//             dValue.setMinutes(iMinutes)
//             dValue.setSeconds(iSecond)
//             var iDay = dValue.getDay()
//             if (oType.toLowerCase() === 'weekindex') oValue = iDay
//             else if (oType.toLowerCase() === 'floatvalue') oValue = dValue.getTime()
//             else {
//               var sWeek = ''
//               switch (iDay) {
//                 case 0:
//                   sWeek = '日'
//                   break
//                 case 1:
//                   sWeek = '一'
//                   break
//                 case 2:
//                   sWeek = '二'
//                   break
//                 case 3:
//                   sWeek = '三'
//                   break
//                 case 4:
//                   sWeek = '四'
//                   break
//                 case 5:
//                   sWeek = '五'
//                   break
//                 case 6:
//                   sWeek = '六'
//                   break
//               }
//               oValue = oType.replace(/dddd/ig, '星期' + sWeek)
//               if (/(y+)/i.test(oValue)) oValue = oValue.replace(RegExp.$1, (iYear + '').substr(4 - RegExp.$1.length))
//               if (/(m+:)/i.test(oValue)) oValue = oValue.replace(RegExp.$1, ('00' + iMinutes + ':').substr(('00' + iMinutes + ':').length - RegExp.$1.length))
//               if (/(M+)/i.test(oValue)) {
//                 var dsWidth = ('' + iMonth).length > RegExp.$1.length ? ('' + iMonth).length : RegExp.$1.length
//                 oValue = oValue.replace(RegExp.$1, ('00' + iMonth).substr(('00' + iMonth).length - dsWidth))
//               }
//               if (/(d+)/i.test(oValue)) {
//                 var dsWidth = ('' + iDate).length > RegExp.$1.length ? ('' + iDate).length : RegExp.$1.length
//                 oValue = oValue.replace(RegExp.$1, ('00' + iDate).substr(('00' + iDate).length - dsWidth))
//               }
//               if (/(H+)/i.test(oValue)) oValue = oValue.replace(RegExp.$1, ('00' + iHour).substr(('00' + iHour).length - RegExp.$1.length))
//               if (/(n+)/i.test(oValue)) oValue = oValue.replace(RegExp.$1, ('00' + iMinutes).substr(('00' + iMinutes).length - RegExp.$1.length))
//               if (/(s+)/i.test(oValue)) oValue = oValue.replace(RegExp.$1, ('00' + iSecond).substr(('00' + iSecond).length - RegExp.$1.length))
//             }
//           }
//           if (CLODOP.On_Return) {
//             var selfFunc = CLODOP.On_Return
//             CLODOP.On_Return(0, oValue)
//             if (!CLODOP.On_Return_Remain && selfFunc === CLODOP.On_Return) CLODOP.On_Return = null
//           }
//           return oValue
//         } else if (this.blIslocal || oType.indexOf('FILE:') < 0) {
//           this.PageData['format_type'] = oType
//           this.PageData['format_value'] = oValue
//           if (this.DoPostDatas('format') === true) {
//             this.GetLastResult(false)
//             tResult = this.GetTaskID()
//           }
//         } else alert('不能远程读写文件!')
//       }
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     SET_PRINT_PAPER: function (Top, Left, Width, Height, strPrintTask) {
//       return this.PRINT_INITA(Top, Left, Width, Height, strPrintTask)
//     },
//     PRINT_INIT: function (strPrintTask) {
//       return this.PRINT_INITA(null, null, null, null, strPrintTask)
//     },
//     PRINT_INITA: function (Top, Left, Width, Height, strPrintTask) {
//       if (Top === undefined || Top === null) Top = ''
//       if (Left === undefined || Left === null) Left = ''
//       if (Width === undefined || Width === null) Width = ''
//       if (Height === undefined || Height === null) Height = ''
//       if (strPrintTask === undefined || strPrintTask === null) strPrintTask = ''
//       this.NoClearAfterPrint = false
//       this.DoInit()
//       this.PageData['top'] = Top
//       this.PageData['left'] = Left
//       this.PageData['width'] = Width
//       this.PageData['height'] = Height
//       this.PageData['printtask'] = strPrintTask
//     },
//     SET_PRINT_MODE: function (strModeType, ModeValue) {
//       if (strModeType === undefined || strModeType === null) strModeType = ''
//       if (ModeValue === undefined || ModeValue === null) ModeValue = ''
//       if (strModeType === '') return false
//       strModeType = strModeType.toLowerCase()
//       this.PageData[strModeType] = ModeValue
//       if (strModeType === 'noclear_after_print') this.NoClearAfterPrint = ModeValue
//       if (strModeType.indexOf('window_def') > -1 || strModeType.indexOf('control_printer') > -1) {
//         var tResult = null
//         if (this.DoPostDatas('onlysetprint') === true) {
//           this.GetLastResult(false)
//           tResult = this.GetTaskID()
//         }
//         this.DoInit()
//         this.blWorking = false
//         return tResult
//       }
//     },
//     ADD_PRINT_TEXT: function (top, left, width, height, strText) {
//       return this.AddItemArray(2, top, left, width, height, strText)
//     },
//     ADD_PRINT_TEXTA: function (itemName, top, left, width, height, strText) {
//       return this.AddItemArray(2, top, left, width, height, strText, itemName)
//     },
//     ADD_PRINT_HTM: function (top, left, width, height, strHTML) {
//       return this.AddItemArray(4, top, left, width, height, strHTML)
//     },
//     ADD_PRINT_HTML: function (top, left, width, height, strHTML) {
//       return this.AddItemArray(1, top, left, width, height, strHTML)
//     },
//     ADD_PRINT_HTMLA: function (itemName, top, left, width, height, strHTML) {
//       return this.AddItemArray(1, top, left, width, height, strHTML, itemName)
//     },
//     ADD_PRINT_BARCODE: function (top, left, width, height, BarType, BarValue) {
//       return this.AddItemArray(9, top, left, width, height, BarValue, null, null, null, null, null, null, BarType)
//     },
//     ADD_PRINT_BARCODEA: function (ItemName, top, left, width, height, BarType, BarValue) {
//       return this.AddItemArray(9, top, left, width, height, BarValue, ItemName, null, null, null, null, null, BarType)
//     },
//     ADD_PRINT_RECTA: function (top, left, width, height, intPenStyle, intPenWidth, intColor) {
//       return this.AddItemArray(3, top, left, width, height, null, null, 2, intPenStyle, intPenWidth, intColor, null)
//     },
//     ADD_PRINT_RECT: function (top, left, width, height, intPenStyle, intPenWidth) {
//       return this.AddItemArray(3, top, left, width, height, null, null, 2, intPenStyle, intPenWidth, null, null)
//     },
//     ADD_PRINT_ELLIPSEA: function (top, left, width, height, intPenStyle, intPenWidth, intColor) {
//       return this.AddItemArray(3, top, left, width, height, null, null, 3, intPenStyle, intPenWidth, intColor, null)
//     },
//     ADD_PRINT_ELLIPSE: function (top, left, width, height, intPenStyle, intPenWidth) {
//       return this.AddItemArray(3, top, left, width, height, null, null, 3, intPenStyle, intPenWidth, null, null)
//     },
//     ADD_PRINT_SHAPE: function (ShapeType, top, left, width, height, intPenStyle, intPenWidth, intColor) {
//       return this.AddItemArray(3, top, left, width, height, null, null, ShapeType, intPenStyle, intPenWidth, intColor, null)
//     },
//     ADD_PRINT_LINE: function (top1, left1, top2, left2, intPenStyle, intPenWidth) {
//       return this.AddItemArray(3, top1, left1, top2, left2, null, null, 0, intPenStyle, intPenWidth, null, '1')
//     },
//     ADD_PRINT_DNLINE: function (Top, Left, Width, Height, intPenStyle, intPenWidth) {
//       return this.AddItemArray(3, Top, Left, Width, Height, null, null, 1, intPenStyle, intPenWidth, null, null)
//     },
//     ADD_PRINT_DNLINEA: function (Top, Left, Width, Height, intPenStyle, intPenWidth, intColor) {
//       return this.AddItemArray(3, Top, Left, Width, Height, null, null, 1, intPenStyle, intPenWidth, intColor, null)
//     },
//     ADD_PRINT_UPLINE: function (Top, Left, Width, Height, intPenStyle, intPenWidth) {
//       return this.AddItemArray(3, Top, Left, Width, Height, null, null, 0, intPenStyle, intPenWidth, null, null)
//     },
//     ADD_PRINT_UPLINEA: function (Top, Left, Width, Height, intPenStyle, intPenWidth, intColor) {
//       return this.AddItemArray(3, Top, Left, Width, Height, null, null, 0, intPenStyle, intPenWidth, intColor, null)
//     },
//     ADD_PRINT_TABLE: function (top, left, width, height, strHTML) {
//       return this.AddItemArray(6, top, left, width, height, strHTML)
//     },
//     ADD_PRINT_TBURL: function (top, left, width, height, strURL) {
//       return this.AddItemArray(7, top, left, width, height, strURL)
//     },
//     ADD_PRINT_URL: function (top, left, width, height, strURL) {
//       return this.AddItemArray(5, top, left, width, height, strURL)
//     },
//     ADD_PRINT_IMAGE: function (top, left, width, height, strHTML) {
//       return this.AddItemArray(8, top, left, width, height, strHTML)
//     },
//     ADD_PRINT_CHART: function (top, left, width, height, strChartTypess, strHTML) {
//       return this.AddItemArray(10, top, left, width, height, strHTML, null, null, null, null, null, null, null, strChartTypess)
//     },
//     SET_PRINT_PROPERTY: function (ItemNO, intPageType, intHorzOrient, intVertOrient) {
//       this.SET_PRINT_STYLEA(ItemNO, 'ItemType', intPageType)
//       this.SET_PRINT_STYLEA(ItemNO, 'HOrient', intHorzOrient)
//       this.SET_PRINT_STYLEA(ItemNO, 'VOrient', intVertOrient)
//     },
//     SET_PRINT_PROPERTYA: function (ItemName, intPageType, intHorzOrient, intVertOrient) {
//       this.SET_PRINT_PROPERTY(ItemName, intPageType, intHorzOrient, intVertOrient)
//     },
//     SET_PRINT_STYLE: function (strStyleName, StyleValue) {
//       if (strStyleName === undefined || strStyleName === null) strStyleName = ''
//       if (StyleValue === undefined || StyleValue === null) StyleValue = ''
//       if (strStyleName === '') return false
//       strStyleName = strStyleName.toLowerCase()
//       this.defStyleJson[strStyleName] = StyleValue
//     },
//     SET_PRINT_STYLEA: function (ItemNo, strKey, Value) {
//       if (ItemNo === undefined || ItemNo === null) ItemNo = ''
//       if (strKey === undefined || strKey === null) strKey = ''
//       if (Value === undefined || Value === null) Value = ''
//       if (ItemNo === '' || strKey === '') return false
//       if (this.ItemDatas['count'] <= 0) {
//         if (this.PageData['add_print_program_data'] !== undefined) {
//           this.ItemCNameStyles[strKey.toLowerCase() + '-' + ItemNo] = Value
//           return true
//         } else {
//           return false
//         }
//       }
//       strKey = strKey.toLowerCase()
//       if (strKey === 'type') return false
//       var blResult = false
//       if (ItemNo === 0) {
//         ItemNo = this.ItemDatas['count']
//       }
//       for (var vItemNO in this.ItemDatas) {
//         var ItemName = this.ItemDatas[vItemNO]['itemname']
//         if ((ItemNo === vItemNO) || (ItemNo === ItemName) || ((typeof ItemNo === 'string') && (typeof ItemName === 'string') && (ItemNo.toUpperCase() === ItemName.toUpperCase()))) {
//           this.ItemDatas[vItemNO][strKey] = Value
//           blResult = true
//         }
//       }
//       if (blResult) return true
//       return false
//     },
//     SET_PRINT_TEXT_STYLE: function (ItemNO, strFontName, intSize, intBold, intItalic, intUnderline, intAlignment) {
//       this.SET_PRINT_STYLEA(ItemNO, 'fontname', strFontName)
//       this.SET_PRINT_STYLEA(ItemNO, 'fontsize', intSize)
//       this.SET_PRINT_STYLEA(ItemNO, 'bold', intBold)
//       this.SET_PRINT_STYLEA(ItemNO, 'italic', intItalic)
//       this.SET_PRINT_STYLEA(ItemNO, 'underline', intUnderline)
//       this.SET_PRINT_STYLEA(ItemNO, 'alignment', intAlignment)
//     },
//     SET_PRINT_TEXT_STYLEA: function (ItemNO, strFontName, intSize, intBold, intItalic, intUnderline, intAlignment, Color) {
//       this.SET_PRINT_TEXT_STYLE(ItemNO, strFontName, intSize, intBold, intItalic, intUnderline, intAlignment)
//       this.SET_PRINT_STYLEA(ItemNO, 'fontcolor', Color)
//     },
//     SET_PRINT_TEXT_STYLEB: function (ItemNO, strFontName, intSize, intBold, intItalic, intUnderline, intAlignment, Color) {
//       this.SET_PRINT_TEXT_STYLEA(ItemNO, strFontName, intSize, intBold, intItalic, intUnderline, intAlignment, Color)
//     },
//     NEWPAGE: function () {
//       this.NewPage()
//     },
//     NewPage: function () {
//       var blSomeNormal = false
//       var noItemType
//       for (var vItemNO in this.ItemDatas) {
//         if (vItemNO === 'count') noItemType = false
//         else noItemType = true
//         for (var vItemxx in this.ItemDatas[vItemNO]) {
//           if (vItemxx === 'itemtype') {
//             noItemType = false
//             if ((this.ItemDatas[vItemNO][vItemxx] === 0) || (this.ItemDatas[vItemNO][vItemxx] === 4)) {
//               blSomeNormal = true
//               break
//             }
//           }
//         }
//         if (noItemType) blSomeNormal = true
//         if (blSomeNormal) break
//       }
//       if (blSomeNormal) this.defStyleJson['beginpage'] = this.defStyleJson['beginpage'] + 1
//     },
//     NEWPAGEA: function () {
//       this.NewPageA()
//     },
//     NewPageA: function () {
//       var blSomeNormal = false
//       var noItemType
//       for (var vItemNO in this.ItemDatas) {
//         if (vItemNO === 'count') noItemType = false
//         else noItemType = true
//         for (var vItemxx in this.ItemDatas[vItemNO]) {
//           if (vItemxx === 'itemtype') {
//             noItemType = false
//             if ((this.ItemDatas[vItemNO][vItemxx] === 0) || (this.ItemDatas[vItemNO][vItemxx] === 4)) {
//               blSomeNormal = true
//               break
//             }
//           }
//         }
//         if (noItemType) blSomeNormal = true
//         if (blSomeNormal) break
//       }
//       if (blSomeNormal) this.defStyleJson['beginpagea'] = this.defStyleJson['beginpagea'] + 1
//     },
//     PREVIEW: function (sView, iW, iH) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if ((!sView) && (this.blIslocal)) {
//         if (this.DoPostDatas('preview') === true) {
//           this.Result = null
//           this.GetLastResult(true)
//           tResult = this.GetTaskID()
//         }
//       } else {
//         if (this.DoPostDatas('cpreview') === true) {
//           this.DoCPreview(sView, iW, iH)
//           tResult = this.GetTaskID()
//         }
//       }
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     PRINT: function (sView, iW, iH) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (this.DoPostDatas('print') === true) tResult = this.GetTaskID()
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     GET_PRINTER_COUNT: function () {
//       if (this.Printers === undefined) return 0
//       else {
//         return this.Printers['list'].length
//       }
//     },
//     GET_PRINTER_NAME: function (intNO) {
//       if (this.Printers === undefined) return ''
//       else {
//         if (typeof intNO === 'string' && intNO.indexOf(':') > -1) {
//           var strPPname = intNO.slice(intNO.indexOf(':') + 1)
//           intNO = intNO.slice(0, intNO.indexOf(':'))
//           if (intNO === -1) return this.Printers['list'][this.Printers['default']][strPPname]
//           else return this.Printers['list'][intNO][strPPname]
//         } else {
//           if (intNO === -1) return this.Printers['list'][this.Printers['default']].name
//           else if (intNO >= 0 && intNO < this.Printers['list'].length) return this.Printers['list'][intNO].name
//           else return 'Printer NO. overflow'
//         }
//       }
//     },
//     GET_PAGESIZES_LIST: function (PNameInx, Split) {
//       if (this.Printers === undefined) return ''
//       else {
//         if (PNameInx === -1) PNameInx = this.Printers['list'][this.Printers['default']].name
//         for (var intNO in this.Printers['list']) {
//           if (PNameInx === intNO || PNameInx === this.Printers['list'][intNO].name) {
//             var strList = ''
//             for (var iPNO in this.Printers['list'][intNO]['pagelist']) {
//               if (strList === '') strList = this.Printers['list'][intNO]['pagelist'][iPNO].name
//               else strList = strList + Split + this.Printers['list'][intNO]['pagelist'][iPNO].name
//             }
//             return strList
//           }
//         }
//         return ''
//       }
//     },
//     SET_PRINTER_INDEX: function (strName) {
//       if (this.Printers === undefined) return false
//       else {
//         if (strName === -1) {
//           this.PageData['printerindex'] = this.Printers['default']
//           return true
//         } else {
//           strName = strName + ''
//           strName = strName.replace(/\\/g, '')
//           for (var vNO in this.Printers['list']) {
//             if ((this.Printers['list'][vNO].name.replace(/\\/g, '') === strName) || (vNO === strName)) {
//               this.PageData['printerindex'] = vNO
//               return true
//             }
//           }
//           return false
//         }
//       }
//     },
//     SET_PRINTER_INDEXA: function (strName) {
//       return this.SET_PRINTER_INDEX(strName)
//     },
//     PRINT_DESIGN: function () {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (this.blIslocal) {
//         if (this.DoPostDatas('print_design') === true) {
//           this.Result = null
//           this.GetLastResult(true)
//           tResult = this.GetTaskID()
//         }
//       } else alert('不能远程打印设计!')
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     PRINT_SETUP: function () {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (this.blIslocal) {
//         if (this.DoPostDatas('print_setup') === true) {
//           this.Result = null
//           this.GetLastResult(true)
//           tResult = this.GetTaskID()
//         }
//       } else alert('不能远程打印维护!')
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     SET_PRINT_PAGESIZE: function (intOrient, PageWidth, PageHeight, strPageName) {
//       if (intOrient !== undefined && intOrient !== null) this.PageData['orient'] = intOrient
//       if (PageWidth !== undefined && PageWidth !== null) this.PageData['pagewidth'] = PageWidth
//       if (PageHeight !== undefined && PageHeight !== null) this.PageData['pageheight'] = PageHeight
//       if (strPageName !== undefined && strPageName !== null) this.PageData['pagename'] = strPageName
//     },
//     SET_PRINT_COPIES: function (intCopies) {
//       if (intCopies !== undefined && intCopies !== null) {
//         this.PageData['printcopies'] = intCopies
//         return true
//       }
//     },
//     SELECT_PRINTER: function (blPrint) {
//       this.SelectBox.create(388, 240, !blPrint)
//       return true
//     },
//     PRINTA: function (blPrintB, sView) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (!sView && this.blIslocal) {
//         this.Result = null
//         if (blPrintB) {
//           if (this.DoPostDatas('printb') === true) {
//             this.GetLastResult(false)
//             tResult = this.GetTaskID()
//           }
//         } else {
//           if (this.DoPostDatas('printa') === true) {
//             this.GetLastResult(true)
//             tResult = this.GetTaskID()
//           }
//         }
//         this.DoInit()
//         this.blWorking = false
//       } else {
//         this.SELECT_PRINTER(true)
//       }
//       return tResult
//     },
//     PRINTAOK: function (iPrintIndex, iPrintCopies, iStartNO, iEndNO, onlySelect) {
//       this.SET_PRINTER_INDEX(iPrintIndex)
//       this.SET_PRINT_COPIES(iPrintCopies)
//       if (iStartNO !== undefined && iStartNO !== 0) this.SET_PRINT_MODE('PRINT_START_PAGE', iStartNO)
//       if (iEndNO !== undefined && iEndNO !== 0) this.SET_PRINT_MODE('PRINT_END_PAGE', iEndNO)
//       if (!onlySelect) this.PRINT()
//       else {
//         this.blTmpSelectedIndex = iPrintIndex
//         if (CLODOP.On_Return) {
//           var selfFunc = CLODOP.On_Return
//           CLODOP.On_Return(0, iPrintIndex)
//           if (!CLODOP.On_Return_Remain && selfFunc === CLODOP.On_Return) CLODOP.On_Return = null
//         }
//       }
//     },
//     SET_LICENSES: function (strCompanyName, strLicense, strLicenseA, strLicenseB) {
//       if ((strCompanyName === 'THIRD LICENSE') && (strLicense === '')) {
//         if (strLicenseA && strLicenseA !== '') this.PageDataEx['licensec'] = strLicenseA
//         if (strLicenseB && strLicenseB !== '') this.PageDataEx['licensed'] = strLicenseB
//       } else if ((strCompanyName === 'LICENSE TETCODE') && (strLicense === '') && (strLicenseB === '')) {
//         if (strLicenseA && strLicenseA !== '') this.PageDataEx['Licensetetcode'] = strLicenseA
//       } else {
//         if (strCompanyName && strCompanyName !== '') this.PageDataEx['companyname'] = strCompanyName
//         if (strLicense && strLicense !== '') this.PageDataEx['license'] = strLicense
//         if (strLicenseA && strLicenseA !== '') this.PageDataEx['licensea'] = strLicenseA
//         if (strLicenseB && strLicenseB !== '') this.PageDataEx['licenseb'] = strLicenseB
//       }
//     },
//     PRINTB: function () {
//       this.PRINTA(true)
//     },
//     PREVIEWA: function () {
//       this.PREVIEW()
//     },
//     PREVIEWB: function () {
//       this.PREVIEW()
//     },
//     ADD_PRINT_SETUP_BKIMG: function (strContent) {
//       if (strContent !== undefined && strContent !== null) {
//         this.PageData['setup_bkimg'] = strContent
//         return true
//       }
//     },
//     SET_PREVIEW_WINDOW: function (intDispMode, intToolMode, blDirectPrint, oWidth, oHeight, strPButtonCaptoin) {
//       if (intDispMode !== undefined && intDispMode !== null) this.PageData['pvw_dispmode'] = intDispMode
//       if (intToolMode !== undefined && intToolMode !== null) this.PageData['pvw_toolmode'] = intToolMode
//       if (blDirectPrint !== undefined && blDirectPrint !== null) this.PageData['pvw_directprint'] = blDirectPrint
//       if (oWidth !== undefined && oWidth !== null) this.PageData['pvw_width'] = oWidth
//       if (oHeight !== undefined && oHeight !== null) this.PageData['pvw_height'] = oHeight
//       if (strPButtonCaptoin !== undefined && strPButtonCaptoin !== null) this.PageData['pvw_puttoncaptoin'] = strPButtonCaptoin
//     },
//     SET_PREVIEW_MODE: function (ModeValue) {
//       if (ModeValue !== undefined) this.PageData['pvw_preview_mode'] = ModeValue
//     },
//     SET_SHOW_MODE: function (strModeType, ModeValue) {
//       if (strModeType === undefined || strModeType === null) strModeType = ''
//       if (ModeValue === undefined || ModeValue === null) ModeValue = ''
//       if (strModeType === '') return false
//       strModeType = strModeType.toLowerCase()
//       this.PageData['shwmod_' + strModeType] = ModeValue
//     },
//     SAVE_TO_FILE: function (strFileName) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (this.blIslocal) {
//         if (strFileName) {
//           this.PageData['stf_file_name'] = strFileName
//           if (this.DoPostDatas('savetofile') === true) {
//             this.GetLastResult(false)
//             tResult = this.GetTaskID()
//           }
//         }
//       } else alert('不能远程写文件!')
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     SET_SAVE_MODE: function (strModeType, ModeValue) {
//       if (strModeType === undefined || strModeType === null) strModeType = ''
//       if (ModeValue === undefined || ModeValue === null) ModeValue = ''
//       if (strModeType === '') return false
//       strModeType = strModeType.toLowerCase()
//       this.PageData['stfmod_' + strModeType] = ModeValue
//     },
//     SEND_PRINT_RAWDATA: function (strRawData) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (strRawData !== undefined) {
//         this.PageData['raw_print_data'] = strRawData
//         if (this.DoPostDatas('sendrawdata') === true) {
//           this.GetLastResult(false)
//           tResult = this.GetTaskID()
//         }
//       }
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     WRITE_FILE_TEXT: function (WriteMode, strFileName, strText) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (this.blIslocal) {
//         if (strFileName !== undefined && strText !== undefined) {
//           this.PageData['write_file_mode'] = WriteMode
//           this.PageData['write_file_name'] = strFileName
//           this.PageData['write_file_text'] = strText
//           if (this.DoPostDatas('writefiletext') === true) {
//             this.GetLastResult(false)
//             tResult = this.GetTaskID()
//           }
//         }
//       } else alert('不能远程写文件!')
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     GET_DIALOG_VALUE: function (oType, oPreValue) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (oType !== undefined && oPreValue !== undefined) {
//         if (this.blIslocal) {
//           this.PageData['dialog_type'] = oType
//           this.PageData['dialog_value'] = oPreValue
//           if (this.DoPostDatas('dialog') === true) {
//             this.GetLastResult(true)
//             tResult = this.GetTaskID()
//           }
//         } else alert('不能远程读写文件!')
//       }
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     WRITE_PORT_DATA: function (strPortName, strData) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (strPortName !== undefined && strData !== undefined) {
//         this.PageData['write_port_name'] = strPortName
//         this.PageData['write_port_data'] = strData
//         if (this.DoPostDatas('writeportdata') === true) {
//           this.GetLastResult(false)
//           tResult = this.GetTaskID()
//         }
//       }
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     READ_PORT_DATA: function (strPortName) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (strPortName !== undefined) {
//         this.PageData['read_port_name'] = strPortName
//         if (this.DoPostDatas('readportdata') === true) {
//           this.GetLastResult(false)
//           tResult = this.GetTaskID()
//         }
//       }
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     GET_SYSTEM_INFO: function (InfoType) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (InfoType !== undefined) {
//         this.PageData['system_info_type'] = InfoType
//         if (this.DoPostDatas('getsysteminfo') === true) {
//           this.GetLastResult(false)
//           tResult = this.GetTaskID()
//         }
//       }
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     GET_FILE_TEXT: function (strFileName) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (this.blIslocal) {
//         if (strFileName !== undefined) {
//           this.PageData['get_file_name'] = strFileName
//           if (this.DoPostDatas('getfiletext') === true) {
//             this.GetLastResult(false)
//             tResult = this.GetTaskID()
//           }
//         }
//       } else alert('不能远程读文件!')
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     IS_FILE_EXIST: function (strFileName) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (this.blIslocal) {
//         if (strFileName !== undefined) {
//           this.PageData['file_exist_name'] = strFileName
//           if (this.DoPostDatas('isfileexist') === true) {
//             this.GetLastResult(false)
//             tResult = this.GetTaskID()
//           }
//         }
//       } else alert('不能远程读文件!')
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     GET_FILE_TIME: function (strFileName) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (this.blIslocal) {
//         if (strFileName !== undefined) {
//           this.PageData['file_time_name'] = strFileName
//           if (this.DoPostDatas('getfiletime') === true) {
//             this.GetLastResult(false)
//             tResult = this.GetTaskID()
//           }
//         }
//       } else alert('不能远程读文件!')
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     GET_PRINT_INIFFNAME: function (strPrintTaskName) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (this.blIslocal) {
//         if (strPrintTaskName !== undefined) {
//           this.PageData['iniff_task_name'] = strPrintTaskName
//           if (this.DoPostDatas('getiniffname') === true) {
//             this.GetLastResult(false)
//             tResult = this.GetTaskID()
//           }
//         }
//       } else alert('不能远程读文件!')
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     GET_VALUE: function (ValueType, ValueIndex) {
//       if (this.blWorking) {
//         alert("It's Working...just a moment.")
//         return null
//       }
//       var tResult = null
//       if (ValueType !== undefined && ValueIndex !== undefined) {
//         this.PageData['get_value_type'] = ValueType
//         this.PageData['get_value_index'] = ValueIndex
//         if (this.DoPostDatas('dogetvalue') === true) {
//           this.GetLastResult(false)
//           tResult = this.GetTaskID()
//         }
//       }
//       this.DoInit()
//       this.blWorking = false
//       return tResult
//     },
//     ADD_PRINT_DATA: function (DataType, oValue) {
//       if (DataType !== undefined && oValue !== null) {
//         if (DataType.toLowerCase().indexOf('programdata') > -1) {
//           this.PageData['add_print_program_data'] = oValue
//           return true
//         }
//       }
//     },
//     SHOW_CHART: function () {},
//     DO_ACTION: function () {},
//     Create_Printer_List: function (oElement) {
//       while (oElement.childNodes.length > 0) {
//         var children = oElement.childNodes
//         for (var i = 0; i < children.length; i++) oElement.removeChild(children[i])
//       }
//       var iCount = this.GET_PRINTER_COUNT()
//       for (let i = 0; i < iCount; i++) {
//         var option = document.createElement('option')
//         option.innerHTML = this.GET_PRINTER_NAME(i)
//         option.value = i
//         oElement.appendChild(option)
//       }
//     },
//     Create_PageSize_List: function (oElement, printIndex) {
//       while (oElement.childNodes.length > 0) {
//         var children = oElement.childNodes
//         for (var i = 0; i < children.length; i++) oElement.removeChild(children[i])
//       }
//       var strPageSizeList = CLODOP.GET_PAGESIZES_LIST(printIndex, '\n')
//       var Options = []
//       Options = strPageSizeList.split('\n')
//       for (let i in Options) {
//         var option = document.createElement('option')
//         option.innerHTML = Options[i]
//         option.value = Options[i]
//         oElement.appendChild(option)
//       }
//     },
//     AddItemArray: function (type, top, left, width, height, strContent, itemname, ShapeType, intPenStyle, intPenWidth, intColor, isLinePosition, BarType, strChartTypess) {
//       if (top === undefined || left === undefined || width === undefined || height === undefined || strContent === undefined) {
//         return false
//       }
//       var sCount = this.ItemDatas['count']
//       sCount++
//       var oneItem = {}
//       for (var vstyle in this.defStyleJson) {
//         oneItem[vstyle] = this.defStyleJson[vstyle]
//       }
//       oneItem['type'] = type
//       oneItem['top'] = top
//       oneItem['left'] = left
//       oneItem['width'] = width
//       oneItem['height'] = height
//       if ((strContent !== undefined) && (strContent != null)) oneItem['content'] = strContent
//       if ((itemname !== undefined) && (itemname != null)) oneItem['itemname'] = itemname + ''
//       if ((ShapeType !== undefined) && (ShapeType != null)) oneItem['shapetype'] = ShapeType
//       if ((intPenStyle !== undefined) && (intPenStyle != null)) oneItem['penstyle'] = intPenStyle
//       if ((intPenWidth !== undefined) && (intPenWidth != null)) oneItem['penwidth'] = intPenWidth
//       if ((intColor !== undefined) && (intColor != null)) oneItem['fontcolor'] = intColor
//       if ((isLinePosition !== undefined) && (isLinePosition != null)) oneItem['lineposition'] = '1'
//       if ((BarType !== undefined) && (BarType != null)) oneItem['fontname'] = BarType
//       if ((strChartTypess !== undefined) && (strChartTypess != null)) oneItem['charttypess'] = strChartTypess
//       oneItem['beginpage'] = this.defStyleJson['beginpage']
//       oneItem['beginpagea'] = this.defStyleJson['beginpagea']
//       this.ItemDatas['count'] = sCount
//       this.ItemDatas[sCount] = oneItem
//       this.blNormalItemAdded = true
//       return true
//     },
//     RemoveIframes: function () {
//       var obody = document.body || document.getElementsByTagName('body')[0] || document.documentElement
//       try {
//         for (var i = 0; i < this.Iframes.length; i++) {
//           var now = (new Date()).getTime()
//           if ((now - this.Iframes[i]['time']) > this.timeThreshold * 60000) {
//             obody.removeChild(this.Iframes[i]['iframe'])
//             this.Iframes.splice(i, 1)
//           }
//         }
//       } catch (err) {}
//     },
//     AddInputElement: function (odocument, oform, name, value) {
//       if (value !== undefined) {
//         var oinput = odocument.createElement('input')
//         oinput.name = name
//         oinput.type = 'hidden'
//         oinput.value = value
//         oform.appendChild(oinput)
//       }
//     },
//     createPostDataString: function (afterPostAction) {
//       var strData = 'act=' + afterPostAction + '\f'
//       strData = strData + 'browseurl=' + window.location.href + '\f'
//       for (var vMode in this.PageDataEx) {
//         strData = strData + vMode + '=' + this.PageDataEx[vMode] + '\f'
//       }
//       var PrintModeNamess = ''
//       for (var vMode in this.PageData) {
//         strData = strData + vMode + '=' + this.PageData[vMode] + '\f'
//         if (vMode !== 'top' && vMode !== 'left' && vMode !== 'width' && vMode !== 'height' && vMode !== 'printtask' && vMode != 'printerindex' && vMode != 'orient' && vMode != 'pagewidth' && vMode != 'pageheight' && vMode != 'pagename' && vMode != 'printcopies' && vMode != 'setup_bkimg') PrintModeNamess = PrintModeNamess + '' + vMode
//       }
//       if (PrintModeNamess !== '') strData = strData + 'printmodenames=' + PrintModeNamess + '\f'
//       var StyleClassNamess = ''
//       for (var vClassStyle in this.ItemCNameStyles) {
//         strData = strData + vClassStyle + '=' + this.ItemCNameStyles[vClassStyle] + '\f'
//         StyleClassNamess = StyleClassNamess + '' + vClassStyle
//       }
//       if (StyleClassNamess !== '') strData = strData + 'printstyleclassnames=' + StyleClassNamess + '\f'
//       strData = strData + 'itemcount=' + this.ItemDatas['count'] + '\f'
//       for (var vItemNO in this.ItemDatas) {
//         var ItemStyless = ''
//         for (var vItemxx in this.ItemDatas[vItemNO]) {
//           if (vItemxx !== 'beginpage' && vItemxx !== 'beginpagea' && vItemxx != 'type' && vItemxx !== 'top' && vItemxx !== 'left' && vItemxx != 'width' && vItemxx != 'height') ItemStyless = ItemStyless + '' + vItemxx
//         }
//         strData = strData + vItemNO + '_itemstylenames' + '=' + ItemStyless + '\f'
//         for (let vItemxx in this.ItemDatas[vItemNO]) {
//           strData = strData + vItemNO + '_' + vItemxx + '=' + this.ItemDatas[vItemNO][vItemxx] + '\f'
//         }
//       }
//       return strData
//     },
//     wsDoPostDatas: function (afterPostAction) {
//       var strData = 'charset=丂\f'
//       strData = strData + 'tid=' + this.GetTaskID() + '\f'
//       strData = strData + this.createPostDataString(afterPostAction)
//       return this.wsSend('post:' + strData)
//     },
//     DoPostDatas: function (afterPostAction) {
//       if (this.blOneByone === true) {
//         alert('有窗口已打开，先关闭它(持续如此时请刷新页面)!')
//         return false
//       }
//       this.blWorking = true
//       if (this.blTmpSelectedIndex !== null) this.SET_PRINTER_INDEX(this.blTmpSelectedIndex)
//       if (this.SocketEnable) {
//         return this.wsDoPostDatas(afterPostAction)
//       }
//       this.RemoveIframes()
//       var obody = document.body || document.getElementsByTagName('body')[0] || document.documentElement
//       var oiframe = document.createElement('iframe')
//       oiframe.setAttribute('src', 'about:blank')
//       oiframe.setAttribute('style', 'display:none')
//       oiframe.height = 0
//       obody.appendChild(oiframe)
//       var contentdocument = oiframe.contentWindow.document
//       contentdocument.write("<form action='" +
//         this.strHostURI + "/c_dopostdatas' method='post' enctype='application/x-www-form-urlencoded'></form>")
//       var oform = contentdocument.getElementsByTagName('form')[0]
//       this.AddInputElement(contentdocument, oform, 'charset', '丂')
//       this.AddInputElement(contentdocument, oform, 'tid', this.GetTaskID())
//       this.AddInputElement(contentdocument, oform, 'post', this.createPostDataString(afterPostAction))
//       oform.submit()
//       var IframeMS = {}
//       IframeMS['time'] = (new Date()).getTime()
//       IframeMS['iframe'] = oiframe
//       this.Iframes.push(IframeMS)
//       return true
//     },
//     GetLastResult: function (blFOneByone) {
//       if (blFOneByone) this.blOneByone = true
//       if (this.SocketEnable) {
//         return true
//       }
//       var url = this.strHostURI + '/c_lastresult.js'
//       url = url + '?times=' + (new Date().getTime())
//       url = url + '&tid=' + this.GetTaskID()
//       url = encodeURI(url).replace('%20', '+')
//       var oscript = document.createElement('script')
//       oscript.src = url
//       oscript.async = false
//       oscript.type = 'text/javascript'
//       oscript.charset = 'utf-8'
//       var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
//       head.insertBefore(oscript, head.firstChild)
//       oscript.onload = oscript.onreadystatechange = function () {
//         if ((!oscript.readyState || /loaded|complete/.test(oscript.readyState))) {
//           CLODOP.blOneByone = false
//           if (CLodop_ACTLastResult) var strResult = decodeURIComponent(CLodop_ACTLastResult)
//           var strResultTaskID = CLodop_ACTTaskID
//           CLODOP.Result = strResult
//           if (CLodop_ACTAlert) {
//             CLodop_ACTAlert()
//           }
//           if (CLODOP.On_Return) try {
//             var selfFunc = CLODOP.On_Return
//             if (strResult === 'true' || strResult === 'false') CLODOP.On_Return(strResultTaskID, strResult === 'true')
//             else CLODOP.On_Return(strResultTaskID, strResult)
//             if (!CLODOP.On_Return_Remain && selfFunc === CLODOP.On_Return) CLODOP.On_Return = null
//           } catch (err) {}
//           oscript.onload = oscript.onreadystatechange = null
//           if (oscript.parentNode) {
//             oscript.parentNode.removeChild(oscript)
//           }
//         }
//       }
//       return true
//     },
//     DoCPreview: function (sView, iW, iH) {
//       var obody = document.body || document.getElementsByTagName('body')[0] || document.documentElement
//       if (typeof iW !== 'number') iW = Math.round(obody.offsetWidth * 2 / 3)
//       else if (obody.offsetWidth < iW) iW = obody.offsetWidth
//       if (typeof iH !== 'number') iH = Math.round(window.screen.height - 200)
//       else if (window.screen.height < iH) iH = window.screen.height
//       var url = this.strHostURI + '/c_dopreview'
//       url = url + '?times=' + (new Date().getTime())
//       url = url + '&tid=' + this.GetTaskID()
//       url = url + '&iw=' + iW
//       url = url + '&ih=' + iH
//       url = encodeURI(url).replace('%20', '+')
//       this.PopView(sView, url, iW, iH)
//     },
//     PopView: function (sView, strPURL, iW, iH) {
//       try {
//         if (sView && typeof sView === 'string') {
//           if (sView.charAt(0) !== '_' && sView.length > 0) {
//             if (document.getElementById(sView)) {
//               document.getElementById(sView).src = strPURL
//             } else alert("iframe '" + sView + "' not exist!")
//           } else if (sView === '_dialog') {
//             if (!this.Browser.Opera) {
//               showModalDialog(strPURL, 'dialog', 'center:yes')
//             } else {
//               window.open(strPURL, '', 'scrollbars=yes,toolbar=no,left=150,top=100,resizable=yes')
//             }
//           } else if (sView === '_self' || sView === '_top' || sView === '_parent') {
//             window.location.href = strPURL
//           } else if (sView === '_blank') {
//             this.PreviewBox.create(strPURL, iW, iH)
//           } else alert("Element '" + sView + "' is invalid!")
//         } else this.PreviewBox.create(strPURL, iW, iH)
//       } catch (err) {
//         alert('CLODOP PopView ' + err)
//       }
//     },
//     creatMyButtonElement: function (strType, strValue) {
//       try {
//         var oElement = document.createElement("<input type='" + strType + "' value='" + strValue + "'></input>")
//       } catch (e) {}
//       if (!oElement) {
//         oElement = document.createElement('input')
//         oElement.type = strType
//         oElement.value = strValue
//       }
//       return oElement
//     },
//     creatLabelElement: function (Type, Value, Width, Left, Top) {
//       var TxtLabel = document.createElement(Type)
//       TxtLabel.innerHTML = Value
//       TxtLabel.style.cssText = 'position:absolutewidth:' + Width + 'pxleft:' + Left + 'pxtop:' + Top + 'px'
//       return TxtLabel
//     },
//     SelectBox: {
//       dragapproved: false,
//       offsetx: 0,
//       offsety: 0,
//       tempx: 0,
//       tempy: 0,
//       FrantDiv: undefined,
//       PopDiv: undefined,
//       selPrinter: undefined,
//       selCopies: undefined,
//       closeit: function () {
//         if (CLODOP.SelectBox.PopDiv && CLODOP.SelectBox.PopDiv.parentNode) CLODOP.SelectBox.PopDiv.parentNode.removeChild(CLODOP.SelectBox.PopDiv)
//         if (this.FrantDiv && this.FrantDiv.parentNode) this.FrantDiv.parentNode.removeChild(this.FrantDiv)
//         this.PopDiv = undefined
//       },
//       initializedrag: function (e) {
//         var we = window.event || e
//         this.offsetx = we.clientX
//         this.offsety = we.clientY
//         this.tempx = parseInt(this.PopDiv.style.left)
//         this.tempy = parseInt(this.PopDiv.style.top)
//         this.dragapproved = true
//       },
//       drag_drop: function (e) {
//         if (!this.dragapproved) return
//         var we = window.event || e
//         this.PopDiv.style.left = we.clientX - this.offsetx + this.tempx + 'px'
//         this.PopDiv.style.top = we.clientY - this.offsety + this.tempy + 'px'
//       },
//       stopdrag: function () {
//         this.dragapproved = false
//       },
//       clickOK: function (onlySelect) {
//         CLODOP.PRINTAOK(CLODOP.SelectBox.selPrinter.value, CLODOP.SelectBox.selCopies.value, 0, 0, onlySelect)
//         this.closeit()
//       },
//       create: function (iW, iH, onlySelect) {
//         if (CLODOP.SelectBox.PopDiv) this.closeit()
//         var obody = document.body || document.getElementsByTagName('body')[0] || document.documentElement
//         var Boxdiv = document.createElement('div')
//         obody.appendChild(Boxdiv)
//         Boxdiv.style.cssText = 'position:absolutez-index:1100display:blocktop:2pxborder:1px solid #6B97C1background:#F5F5F5color:#000font-size:13px'
//         Boxdiv.style.width = iW + 'px'
//         Boxdiv.style.left = (obody.offsetWidth - iW) / 2 + 'px'
//         Boxdiv.style.top = (obody.offsetHeight - iH) / 2 + 'px'
//         Boxdiv.style.height = iH + 'px'
//         this.PopDiv = Boxdiv
//         var titleDiv = document.createElement('div')
//         Boxdiv.appendChild(titleDiv)
//         titleDiv.style.cssText = 'font: bold 13px Arialline-height:25pxheight:27pxtext-indent:5pxcolor: whitebackground:#8BACCF'
//         titleDiv.innerHTML = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp打印'
//         titleDiv.onmousedown = function (event) {
//           CLODOP.SelectBox.initializedrag(event)
//         }
//         titleDiv.onmousemove = function (event) {
//           CLODOP.SelectBox.drag_drop(event)
//         }
//         titleDiv.onmouseup = function () {
//           CLODOP.SelectBox.stopdrag()
//         }
//         var icoButton = document.createElement('button')
//         titleDiv.appendChild(icoButton)
//         icoButton.style.cssText = 'background:transparent url(' + CLODOP.strHostURI + '/c_favicon.ico) no-repeat scroll 0 0pxmargin-left:5pxposition:absoluteheight:20pxline-height:100pxwidth:34pxleft:3pxborder:0top:5px'
//         var CloseButton = document.createElement('button')
//         titleDiv.appendChild(CloseButton)
//         CloseButton.style.cssText = 'background:transparent url(' + CLODOP.strHostURI + '/images/c_winclose.png) no-repeat scroll 0 0pxmargin-right:5pxposition:absoluteheight:20pxline-height:100pxwidth:34pxright:3pxborder:0top:4px'
//         CloseButton.onclick = function () {
//           CLODOP.SelectBox.closeit()
//           if (onlySelect && CLODOP.On_Return) {
//             var selfFunc = CLODOP.On_Return
//             CLODOP.On_Return(0, -1)
//             if (!CLODOP.On_Return_Remain && selfFunc === CLODOP.On_Return) CLODOP.On_Return = null
//           }
//         }
//         var areaDiv = document.createElement('div')
//         Boxdiv.appendChild(areaDiv)
//         areaDiv.style.cssText = 'background:#F5F5F5color:#000border:0pxleft:0pxtop:0px'
//         areaDiv.style.width = iW - 2 + 'px'
//         areaDiv.style.height = (iH - 27) + 'px'
//         var OKButton = CLODOP.creatMyButtonElement('button', '确定')
//         Boxdiv.appendChild(OKButton)
//         OKButton.style.cssText = 'position:absolutewidth:80pxf'
//         OKButton.style.left = '110px'
//         OKButton.style.top = (iH - 64) + 'px'
//         OKButton.onclick = function () {
//           CLODOP.SelectBox.clickOK(onlySelect)
//         }
//         var CancelButton = CLODOP.creatMyButtonElement('button', '取消')
//         Boxdiv.appendChild(CancelButton)
//         CancelButton.style.cssText = 'position:absolutewidth:80px'
//         CancelButton.style.left = '240px'
//         CancelButton.style.top = (iH - 64) + 'px'
//         CancelButton.onclick = function () {
//           CLODOP.SelectBox.closeit()
//           if (onlySelect && CLODOP.On_Return) {
//             var selfFunc = CLODOP.On_Return
//             CLODOP.On_Return(0, -1)
//             if (!CLODOP.On_Return_Remain && selfFunc === CLODOP.On_Return) CLODOP.On_Return = null
//           }
//         }
//         areaDiv.appendChild(CLODOP.creatLabelElement('span', '选打印机：', 200, 46, 67))
//         var oSelect = document.createElement('select')
//         Boxdiv.appendChild(oSelect)
//         this.selPrinter = oSelect
//         oSelect.style.cssText = 'position:absolutesize:1width:212pxleft:110pxtop:62px'
//         CLODOP.Create_Printer_List(oSelect)
//         areaDiv.appendChild(CLODOP.creatLabelElement('span', '打印份数：', 200, 46, 121))
//         var oCopies = CLODOP.creatMyButtonElement('text', '1')
//         Boxdiv.appendChild(oCopies)
//         this.selCopies = oCopies
//         oCopies.style.cssText = 'position:absolutesize:1width:30pxleft:110pxtop:117px'
//         this.FrantDiv = document.createElement('div')
//         obody.appendChild(this.FrantDiv)
//         this.FrantDiv.style.cssText = 'border:0pxleft:0pxtop:0pxfilter: alpha(opacity=20) position: fixed opacity: 0.2-moz-opacity: 0.2 _position: absolutez-index:1009 over-flow: hidden;'
//         if (CLODOP.Browser.IE && (document.compatMode === 'BackCompat' || navigator.userAgent.indexOf('MSIE 6.0') > 0)) {
//           this.FrantDiv.style.width = obody.scrollWidth + 'px'
//           this.FrantDiv.style.height = obody.scrollHeight + 'px'
//         } else {
//           this.FrantDiv.style.width = '100%'
//           this.FrantDiv.style.height = '100%'
//         }
//       }
//     },
//     PreviewBox: {
//       dragapproved: false,
//       offsetx: 0,
//       offsety: 0,
//       tempx: 0,
//       tempy: 0,
//       FrantDiv: undefined,
//       PopDiv: undefined,
//       ContentFrame: undefined,
//       closeit: function (oSelf) {
//         if (CLODOP.PreviewBox.PopDiv && CLODOP.PreviewBox.PopDiv.parentNode) CLODOP.PreviewBox.PopDiv.parentNode.removeChild(CLODOP.PreviewBox.PopDiv)
//         if (this.FrantDiv && this.FrantDiv.parentNode) this.FrantDiv.parentNode.removeChild(this.FrantDiv)
//         this.PopDiv = undefined
//       },
//       initializedrag: function (e, oSelf) {
//         var we = window.event || e
//         this.offsetx = we.clientX
//         this.offsety = we.clientY
//         this.tempx = parseInt(oSelf.style.left)
//         this.tempy = parseInt(oSelf.style.top)
//         this.dragapproved = true
//       },
//       drag_drop: function (e, oSelf) {
//         if (!this.dragapproved) return
//         var we = window.event || e
//         oSelf.style.left = we.clientX - this.offsetx + this.tempx + 'px'
//         oSelf.style.top = we.clientY - this.offsety + this.tempy + 'px'
//       },
//       stopdrag: function () {
//         this.dragapproved = false
//         if (this.ContentFrame) this.ContentFrame.style.display = 'block'
//       },
//       create: function (strURL, iW, iH) {
//         if (CLODOP.PreviewBox.PopDiv) this.closeit()
//         var obody = document.body || document.getElementsByTagName('body')[0] || document.documentElement
//         var vBoxDiv = document.createElement('div')
//         obody.appendChild(vBoxDiv)
//         vBoxDiv.style.cssText = 'position:absolute;z-index:1100;display:block;top:2px;border:1px solid #6B97C1;font-size:13px;'
//         vBoxDiv.style.width = iW + 'px'
//         var iLeft = (obody.offsetWidth - iW) / 2
//         if (window.screen.width < obody.offsetWidth) iLeft = (window.screen.width - iW) / 2
//         if (iLeft < 0) iLeft = 0
//         vBoxDiv.style.left = iLeft + 'px'
//         vBoxDiv.style.height = iH + 'px'
//         vBoxDiv.onmousedown = function (event) {
//           CLODOP.PreviewBox.initializedrag(event, this)
//         }
//         vBoxDiv.onmouseup = function () {
//           CLODOP.PreviewBox.stopdrag()
//         }
//         vBoxDiv.onmousemove = function (event) {
//           CLODOP.PreviewBox.drag_drop(event, this)
//         }
//         this.PopDiv = vBoxDiv
//         var titleDiv = document.createElement('div')
//         vBoxDiv.appendChild(titleDiv)
//         titleDiv.style.cssText = 'position:absolute;left:0px;width:100%;font: bold 14px Arial;line-height:27px;height:27px;text-indent:26px;color: white;background:#8BACCF'
//         titleDiv.innerHTML = '打印预览'
//         var icoButton = document.createElement('button')
//         titleDiv.appendChild(icoButton)
//         icoButton.style.cssText = 'background:transparent url(' + CLODOP.strHostURI + '/c_favicon.ico) no-repeat scroll 0 0px;margin-left:5px;position:absolute;height:20px;line-height:100px;width:34px;left:3px;border:0;top:5px'
//         var CloseButton = document.createElement('button')
//         titleDiv.appendChild(CloseButton)
//         CloseButton.style.cssText = 'background:transparent url(' + CLODOP.strHostURI + '/images/c_winclose.png) no-repeat scroll 0 0px;margin-right:5px;position:absolute;height:20px;line-height:100px;width:34px;right:3px;border:0;top:4px'
//         CloseButton.onclick = function () {
//           CLODOP.PreviewBox.closeit(this)
//         }
//         var areaDiv = document.createElement('div')
//         vBoxDiv.appendChild(areaDiv)
//         areaDiv.style.cssText = 'background:#F5F5F5;color:#000;border:0px;left:0px;top:0px;'
//         areaDiv.style.width = iW + 'px'
//         areaDiv.style.height = (iH - 0) + 'px'
//         this.ContentFrame = document.createElement('iframe')
//         areaDiv.appendChild(this.ContentFrame)
//         this.ContentFrame.style.cssText = 'width:100%;height:100%;'
//         this.ContentFrame.src = strURL
//         this.ContentFrame.frameBorder = 'no'
//         this.FrantDiv = document.createElement('div')
//         obody.appendChild(this.FrantDiv)
//         this.FrantDiv.style.cssText = 'border:0px;left:0px;top:0px;filter: alpha(opacity=20); position: fixed; opacity: 0.2; -moz-opacity: 0.2; _position: absolute;z-index:1009; over-flow: hidden;'
//         if (CLODOP.Browser.IE && (document.compatMode === 'BackCompat' || navigator.userAgent.indexOf('MSIE 6.0') > 0)) {
//           this.FrantDiv.style.width = obody.scrollWidth + 'px'
//           this.FrantDiv.style.height = obody.scrollHeight + 'px'
//         } else {
//           this.FrantDiv.style.width = '100%'
//           this.FrantDiv.style.height = '100%'
//         }
//       }
//     }
//   }
//   if (win.CLODOP2015_7028 && win.CLODOP2015_7028.Priority && win.CLODOP2015_7028.Priority > CLODOP.Priority) {
//     CLODOP = win.CLODOP2015_7028
//     win.CLODOP_OK_Priority = win.CLODOP2015_7028.Priority
//     return
//   }
//   win.LODOP = CLODOP
//   win.CLODOP = CLODOP
//   win.CLODOP2015_7028 = CLODOP
//   win.CLODOP_OK_Priority = CLODOP.Priority
//   win.CLODOP.DoInit()
//   if (navigator.userAgent.indexOf('Lodop') < 0) win.CLODOP.OpenWebSocket()
// })(window)

// function getCLodop() {
//   return window.CLODOP2015_7028
// }
//  (function (win) {
//    var CLODOP = {
//      strWebPageID: 'C70mt87',
//      strTaskID: '',
//      strHostURI: 'http://localhost:18000',
//      VERSION: '6.2.1.7',
//      IVERSION: "6217",
//      CVERSION: "2.1.0.2",
//      HTTPS_STATUS: 0,
//      iBaseTask: 1,
//      timeThreshold: 5,
//      Priority: 0,
//      blIslocal: true,
//      Iframes: [],
//      ItemDatas: {},
//      PageData: {},
//      defStyleJson: {},
//      PageDataEx: {},
//      ItemCNameStyles: {},
//      blWorking: false,
//      blNormalItemAdded: false,
//      blTmpSelectedIndex: null,
//      Caption: null,
//      Color: null,
//      CompanyName: null,
//      Border: null,
//      Inbrowse: null,
//      webskt: null,
//      SocketEnable: false,
//      SocketOpened: false,
//      NoClearAfterPrint: false,
//      On_Return_Remain: false,
//      On_Return: null,
//      Result: null,
//      iTrySendTimes: 0,
//      blOneByone: false,
//      Printers: {
//        "default": "0",
//        "list": [{
//          "name": "VeryPDF Postscript Writer",
//          "DriverName": "MS Publisher Color Printer",
//          "PortName": "FILE:",
//          "Orientation": "1",
//          "PaperSize": "9",
//          "PaperLength": "2970",
//          "PaperWidth": "2100",
//          "Copies": "1",
//          "DefaultSource": "15",
//          "PrintQuality": "600",
//          "Color": "2",
//          "Duplex": "1",
//          "FormName": "A4",
//          "Comment": '',
//          "DriverVersion": "1536",
//          "DCOrientation": "90",
//          "MaxExtentWidth": "2970",
//          "MaxExtentLength": "4318",
//          "MinExtentWidth": "2100",
//          "MinExtentlength": "2794",
//          "pagelist": [{
//            "name": "Tabloid"
//                 }, {
//            "name": "A3"
//                 }, {
//            "name": "A4"
//                 }, {
//            "name": "Letter"
//                 }, {
//            "name": "Legal"
//                 }]
//             }, {
//          "name": "pdfFactory Pro",
//          "DriverName": "pdfFactory 6",
//          "PortName": "FPP6:",
//          "Orientation": "1",
//          "PaperSize": "9",
//          "PaperLength": "0",
//          "PaperWidth": "0",
//          "Copies": "1",
//          "DefaultSource": "1",
//          "PrintQuality": "600",
//          "Color": "2",
//          "Duplex": "1",
//          "FormName": "A4",
//          "Comment": '',
//          "DriverVersion": "1547",
//          "DCOrientation": "270",
//          "MaxExtentWidth": "65535",
//          "MaxExtentLength": "65535",
//          "MinExtentWidth": "65535",
//          "MinExtentlength": "65535",
//          "pagelist": [{
//            "name": "Letter"
//                 }, {
//            "name": "Letter Small"
//                 }, {
//            "name": "Tabloid"
//                 }, {
//            "name": "Ledger"
//                 }, {
//            "name": "Legal"
//                 }, {
//            "name": "Statement"
//                 }, {
//            "name": "Executive"
//                 }, {
//            "name": "A3"
//                 }, {
//            "name": "A4"
//                 }, {
//            "name": "A4 Small"
//                 }, {
//            "name": "A5"
//                 }, {
//            "name": "B4 (JIS)"
//                 }, {
//            "name": "B5 (JIS)"
//                 }, {
//            "name": "Folio"
//                 }, {
//            "name": "Quarto"
//                 }, {
//            "name": "10x14"
//                 }, {
//            "name": "11x17"
//                 }, {
//            "name": "Note"
//                 }, {
//            "name": "Envelope #9"
//                 }, {
//            "name": "Envelope #10"
//                 }, {
//            "name": "Envelope #11"
//                 }, {
//            "name": "Envelope #12"
//                 }, {
//            "name": "Envelope #14"
//                 }, {
//            "name": "C size sheet"
//                 }, {
//            "name": "D size sheet"
//                 }, {
//            "name": "E size sheet"
//                 }, {
//            "name": "Envelope DL"
//                 }, {
//            "name": "Envelope C5"
//                 }, {
//            "name": "Envelope C3"
//                 }, {
//            "name": "Envelope C4"
//                 }, {
//            "name": "Envelope C6"
//                 }, {
//            "name": "Envelope C65"
//                 }, {
//            "name": "Envelope B4"
//                 }, {
//            "name": "Envelope B5"
//                 }, {
//            "name": "Envelope B6"
//                 }, {
//            "name": "Envelope Italy"
//                 }, {
//            "name": "Envelope Monarch"
//                 }, {
//            "name": "6 3/4 Envelope"
//                 }, {
//            "name": "US Std Fanfold"
//                 }, {
//            "name": "German Std Fanfold"
//                 }, {
//            "name": "German Legal Fanfold"
//                 }, {
//            "name": "B4 (ISO)"
//                 }, {
//            "name": "Japanese Postcard"
//                 }, {
//            "name": "9x11"
//                 }, {
//            "name": "10x11"
//                 }, {
//            "name": "11x15"
//                 }, {
//            "name": "Envelope Invite"
//                 }, {
//            "name": "Letter Extra"
//                 }, {
//            "name": "Legal Extra"
//                 }, {
//            "name": "Tabloid Extra"
//                 }, {
//            "name": "A4 Extra"
//                 }, {
//            "name": "Letter Transverse"
//                 }, {
//            "name": "A4 Transverse"
//                 }, {
//            "name": "Letter Extra Transverse"
//                 }, {
//            "name": "SuperA/SuperA/A4"
//                 }, {
//            "name": "SuperB/SuperB/A3"
//                 }, {
//            "name": "Letter Plus"
//                 }, {
//            "name": "A4 Plus"
//                 }, {
//            "name": "A5 Transverse"
//                 }, {
//            "name": "B5 (JIS) Transverse"
//                 }, {
//            "name": "A3 Extra"
//                 }, {
//            "name": "A5 Extra"
//                 }, {
//            "name": "B5 (ISO) Extra"
//                 }, {
//            "name": "A2"
//                 }, {
//            "name": "A3 Transverse"
//                 }, {
//            "name": "A3 Extra Transverse"
//                 }, {
//            "name": "A0"
//                 }, {
//            "name": "A1"
//                 }, {
//            "name": "ANSI A"
//                 }, {
//            "name": "ANSI B"
//                 }, {
//            "name": "ANSI C"
//                 }, {
//            "name": "ANSI D"
//                 }, {
//            "name": "ANSI E"
//                 }, {
//            "name": "ARCH A"
//                 }, {
//            "name": "ARCH B"
//                 }, {
//            "name": "ARCH C"
//                 }, {
//            "name": "ARCH D"
//                 }, {
//            "name": "ARCH E"
//                 }]
//             }, {
//          "name": "Microsoft XPS Document Writer",
//          "DriverName": "Microsoft XPS Document Writer",
//          "PortName": "XPSPort:",
//          "Orientation": "1",
//          "PaperSize": "9",
//          "PaperLength": "2970",
//          "PaperWidth": "2100",
//          "Copies": "1",
//          "DefaultSource": "15",
//          "PrintQuality": "600",
//          "Color": "2",
//          "Duplex": "1",
//          "FormName": "A4",
//          "Comment": '',
//          "DriverVersion": "1536",
//          "DCOrientation": "270",
//          "MaxExtentWidth": "8636",
//          "MaxExtentLength": "11176",
//          "MinExtentWidth": "900",
//          "MinExtentlength": "900",
//          "pagelist": [{
//            "name": "信纸"
//                 }, {
//            "name": "小号信纸"
//                 }, {
//            "name": "Tabloid"
//                 }, {
//            "name": "Ledger"
//                 }, {
//            "name": "法律专用纸"
//                 }, {
//            "name": "Statement"
//                 }, {
//            "name": "Executive"
//                 }, {
//            "name": "A3"
//                 }, {
//            "name": "A4"
//                 }, {
//            "name": "A4 小号"
//                 }, {
//            "name": "A5"
//                 }, {
//            "name": "B4 (JIS)"
//                 }, {
//            "name": "B5 (JIS)"
//                 }, {
//            "name": "Folio"
//                 }, {
//            "name": "Quarto"
//                 }, {
//            "name": "10x14"
//                 }, {
//            "name": "11x17"
//                 }, {
//            "name": "便笺"
//                 }, {
//            "name": "信封 #9"
//                 }, {
//            "name": "信封 #10"
//                 }, {
//            "name": "信封 #11"
//                 }, {
//            "name": "信封 #12"
//                 }, {
//            "name": "信封 #14"
//                 }, {
//            "name": "C size sheet"
//                 }, {
//            "name": "D size sheet"
//                 }, {
//            "name": "E size sheet"
//                 }, {
//            "name": "信封 DL"
//                 }, {
//            "name": "信封 C5"
//                 }, {
//            "name": "信封 C3"
//                 }, {
//            "name": "信封 C4"
//                 }, {
//            "name": "信封 C6"
//                 }, {
//            "name": "信封 C65"
//                 }, {
//            "name": "信封 B4"
//                 }, {
//            "name": "信封 B5"
//                 }, {
//            "name": "信封 B6"
//                 }, {
//            "name": "信封"
//                 }, {
//            "name": "信封 Monarch"
//                 }, {
//            "name": "6 3/4 信封"
//                 }, {
//            "name": "美国标准 Fanfold"
//                 }, {
//            "name": "德国标准 Fanfold"
//                 }, {
//            "name": "德国法律专用纸 Fanfold"
//                 }, {
//            "name": "B4 (ISO)"
//                 }, {
//            "name": "日式明信片"
//                 }, {
//            "name": "9x11"
//                 }, {
//            "name": "10x11"
//                 }, {
//            "name": "15x11"
//                 }, {
//            "name": "信封邀请函"
//                 }, {
//            "name": "特大信纸"
//                 }, {
//            "name": "特大法律专用纸"
//                 }, {
//            "name": "A4 特大"
//                 }, {
//            "name": "信纸横向"
//                 }, {
//            "name": "A4 横向"
//                 }, {
//            "name": "特大信纸横向"
//                 }, {
//            "name": "Super A"
//                 }, {
//            "name": "Super B"
//                 }, {
//            "name": "信纸加大"
//                 }, {
//            "name": "A4 加大"
//                 }, {
//            "name": "A5 横向"
//                 }, {
//            "name": "B5 (JIS) 横向"
//                 }, {
//            "name": "A3 特大"
//                 }, {
//            "name": "A5 特大"
//                 }, {
//            "name": "B5 (ISO) 特大"
//                 }, {
//            "name": "A2"
//                 }, {
//            "name": "A3 横向"
//                 }, {
//            "name": "A3 特大横向"
//                 }, {
//            "name": "日式往返明信片"
//                 }, {
//            "name": "A6"
//                 }, {
//            "name": "日式信封 Kaku #2"
//                 }, {
//            "name": "日式信封 Kaku #3"
//                 }, {
//            "name": "日式信封 Chou #3"
//                 }, {
//            "name": "日式信封 Chou #4"
//                 }, {
//            "name": "信纸旋转"
//                 }, {
//            "name": "A3 旋转"
//                 }, {
//            "name": "A4 旋转"
//                 }, {
//            "name": "A5 旋转"
//                 }, {
//            "name": "B4 (JIS) 旋转"
//                 }, {
//            "name": "B5 (JIS) 旋转"
//                 }, {
//            "name": "日式明信片旋转"
//                 }, {
//            "name": "双层日式明信片旋转"
//                 }, {
//            "name": "A6 旋转"
//                 }, {
//            "name": "日式信封 Kaku #2 旋转"
//                 }, {
//            "name": "日式信封 Kaku #3 旋转"
//                 }, {
//            "name": "日式信封 Chou #3 旋转"
//                 }, {
//            "name": "日式信封 Chou #4 旋转"
//                 }, {
//            "name": "B6 (JIS)"
//                 }, {
//            "name": "B6 (JIS) 旋转"
//                 }, {
//            "name": "12x11"
//                 }, {
//            "name": "日式信封 You #4"
//                 }, {
//            "name": "日式信封 You #4 旋转"
//                 }, {
//            "name": "PRC 信封 #1"
//                 }, {
//            "name": "PRC 信封 #3"
//                 }, {
//            "name": "PRC 信封 #4"
//                 }, {
//            "name": "PRC 信封 #5"
//                 }, {
//            "name": "PRC 信封 #6"
//                 }, {
//            "name": "PRC 信封 #7"
//                 }, {
//            "name": "PRC 信封 #8"
//                 }, {
//            "name": "PRC 信封 #9"
//                 }, {
//            "name": "PRC 信封 #10"
//                 }, {
//            "name": "PRC 信封 #1 旋转"
//                 }, {
//            "name": "PRC 信封 #3 旋转"
//                 }, {
//            "name": "PRC 信封 #4 旋转"
//                 }, {
//            "name": "PRC 信封 #5 旋转"
//                 }, {
//            "name": "PRC 信封 #6 旋转"
//                 }, {
//            "name": "PRC 信封 #7 旋转"
//                 }, {
//            "name": "PRC 信封 #8 旋转"
//                 }, {
//            "name": "PRC 信封 #9 旋转"
//                 }]
//             }, {
//          "name": "Fax",
//          "DriverName": "Microsoft Shared Fax Driver",
//          "PortName": "SHRFAX:",
//          "Orientation": "1",
//          "PaperSize": "1",
//          "PaperLength": "0",
//          "PaperWidth": "0",
//          "Copies": "0",
//          "DefaultSource": "1",
//          "PrintQuality": "200",
//          "Color": "1",
//          "Duplex": "1",
//          "FormName": "Letter",
//          "Comment": '',
//          "DriverVersion": "1024",
//          "DCOrientation": "90",
//          "MaxExtentWidth": "2160",
//          "MaxExtentLength": "3556",
//          "MinExtentWidth": "0",
//          "MinExtentlength": "0",
//          "pagelist": [{
//            "name": "信纸"
//                 }, {
//            "name": "小号信纸"
//                 }, {
//            "name": "法律专用纸"
//                 }, {
//            "name": "Statement"
//                 }, {
//            "name": "Executive"
//                 }, {
//            "name": "A4"
//                 }, {
//            "name": "A4 小号"
//                 }, {
//            "name": "A5"
//                 }, {
//            "name": "B5 (JIS)"
//                 }, {
//            "name": "Folio"
//                 }, {
//            "name": "Quarto"
//                 }, {
//            "name": "便笺"
//                 }, {
//            "name": "信封 #9"
//                 }, {
//            "name": "信封 #10"
//                 }, {
//            "name": "信封 #11"
//                 }, {
//            "name": "信封 #12"
//                 }, {
//            "name": "信封 #14"
//                 }, {
//            "name": "信封 DL"
//                 }, {
//            "name": "信封 C5"
//                 }, {
//            "name": "信封 C6"
//                 }, {
//            "name": "信封 C65"
//                 }, {
//            "name": "信封 B5"
//                 }, {
//            "name": "信封 B6"
//                 }, {
//            "name": "信封"
//                 }, {
//            "name": "信封 Monarch"
//                 }, {
//            "name": "6 3/4 信封"
//                 }, {
//            "name": "德国标准 Fanfold"
//                 }, {
//            "name": "德国法律专用纸 Fanfold"
//                 }, {
//            "name": "日式明信片"
//                 }, {
//            "name": "Reserved48"
//                 }, {
//            "name": "Reserved49"
//                 }, {
//            "name": "信纸横向"
//                 }, {
//            "name": "A4 横向"
//                 }, {
//            "name": "信纸加大"
//                 }, {
//            "name": "A4 加大"
//                 }, {
//            "name": "A5 横向"
//                 }, {
//            "name": "B5 (JIS) 横向"
//                 }, {
//            "name": "A5 特大"
//                 }, {
//            "name": "B5 (ISO) 特大"
//                 }, {
//            "name": "日式往返明信片"
//                 }, {
//            "name": "A6"
//                 }, {
//            "name": "日式信封 Kaku #3"
//                 }, {
//            "name": "日式信封 Chou #3"
//                 }, {
//            "name": "日式信封 Chou #4"
//                 }, {
//            "name": "A5 旋转"
//                 }, {
//            "name": "日式明信片旋转"
//                 }, {
//            "name": "双层日式明信片旋转"
//                 }, {
//            "name": "A6 旋转"
//                 }, {
//            "name": "日式信封 Chou #4 旋转"
//                 }, {
//            "name": "B6 (JIS)"
//                 }, {
//            "name": "B6 (JIS) 旋转"
//                 }, {
//            "name": "日式信封 You #4"
//                 }, {
//            "name": "PRC 16K"
//                 }, {
//            "name": "PRC 32K"
//                 }, {
//            "name": "PRC 32K(Big)"
//                 }, {
//            "name": "PRC 信封 #1"
//                 }, {
//            "name": "PRC 信封 #2"
//                 }, {
//            "name": "PRC 信封 #3"
//                 }, {
//            "name": "PRC 信封 #4"
//                 }, {
//            "name": "PRC 信封 #5"
//                 }, {
//            "name": "PRC 信封 #6"
//                 }, {
//            "name": "PRC 信封 #7"
//                 }, {
//            "name": "PRC 信封 #8"
//                 }, {
//            "name": "PRC 32K 旋转"
//                 }, {
//            "name": "PRC 32K(大)旋转"
//                 }, {
//            "name": "PRC 信封 #1 旋转"
//                 }, {
//            "name": "PRC 信封 #2 旋转"
//                 }, {
//            "name": "PRC 信封 #3 旋转"
//                 }, {
//            "name": "PRC 信封 #4 旋转"
//                 }, {
//            "name": "Letter"
//                 }, {
//            "name": "Legal"
//                 }]
//             }]
//      },
//      Browser: (function () {
//        var ua = navigator.userAgent
//        var isOpera = Object.prototype.toString.call(window.opera) === "[object Opera]"
//        return {
//          IE: !!window.attachEvent && !isOpera,
//          Opera: isOpera,
//          WebKit: ua.indexOf("AppleWebKit/") > -1,
//          Gecko: ua.indexOf("Gecko") > -1 && ua.indexOf("KHTML") ==== -1,
//          MobileSafari: /Apple.*Mobile/.test(ua)
//        }
//      })(),
//      GetTaskID: function () {
//        if (!this.strTaskID || this.strTaskID === '') {
//          var dt = new Date()
//          this.iBaseTask = this.iBaseTask + 1
//          this.strTaskID = '' + dt.getHours() + dt.getMinutes() + dt.getSeconds() + "_" + this.iBaseTask
//        }
//        return this.strWebPageID + this.strTaskID
//      },
//      DoInit: function () {
//        this.strTaskID = ''
//        if (this.NoClearAfterPrint) return
//        this.ItemDatas = {
//          "count": 0
//        }
//        this.PageData = {}
//        this.ItemCNameStyles = {}
//        this.defStyleJson = {
//          "beginpage": 0,
//          "beginpagea": 0
//        }
//        this.blNormalItemAdded = false
//      },
//      OpenWebSocket: function () {
//        if (!window.WebSocket && !window.MozWebSocket) {
//          if (window.On_CLodop_Opened) {
//            if (CLODOP.Priority === window.CLODOP_OK_Priority) setTimeout("window.On_CLodop_Opened()", 1)
//          }
//          return
//        }
//        this.SocketEnable = true
//        try {
//          if (!this.webskt || this.webskt.readyState === 3) {
//            if (!window.WebSocket && window.MozWebSocket) window.WebSocket = window.MozWebSocket
//            this.webskt = new WebSocket('ws://127.0.0.1:18000/c_webskt/')
//            this.webskt.onopen = function (e) {
//              CLODOP.SocketOpened = true
//              if (window.On_CLodop_Opened) {
//                if (CLODOP.Priority === window.CLODOP_OK_Priority) setTimeout(window.On_CLodop_Opened(), 1)
//              }
//            }
//            this.webskt.onmessage = function (e) {
//              CLODOP.blOneByone = false
//              var strResult = e.data
//              CLODOP.Result = strResult
//              try {
//                var iPos = strResult.indexOf("=")
//                var strFTaskID = null
//                if (iPos >= 0 && iPos < 30) {
//                  strFTaskID = strResult.slice(0, iPos)
//                  strResult = strResult.slice(iPos + 1)
//                }
//                if (strFTaskID.indexOf("ErrorMS") > -1) {
//                  alert(strResult)
//                  return
//                }
//                if (CLODOP.On_Return) {
//                  var selfFunc = CLODOP.On_Return
//                  if (strResult === "true" || strResult === "false") CLODOP.On_Return(strFTaskID, strResult === "true")
//                  else CLODOP.On_Return(strFTaskID, strResult)
//                  if (!CLODOP.On_Return_Remain && selfFunc ==== CLODOP.On_Return) CLODOP.On_Return = null
//                }
//              } catch (err) {}
//            }
//            this.webskt.onclose = function (e) {
//              if (!CLODOP.SocketOpened) {
//                CLODOP.SocketEnable = false
//                return
//              }
//              setTimeout(CLODOP.OpenWebSocket(), 2000)
//            }
//            this.webskt.onerror = function (e) {}
//          }
//        } catch (err) {
//          this.webskt = null
//          setTimeout(CLODOP.OpenWebSocket(), 2000)
//        }
//      },
//      wsSend: function (strData) {
//        if (!this.SocketEnable) return
//        if (this.webskt && this.webskt.readyState === 1) {
//          this.Result = null
//          this.iTrySendTimes = 0
//          this.webskt.send(strData)
//          return true
//        } else {
//          alert("WebSocket没准备好，点确定继续...")
//          this.iTrySendTimes++
//            if (this.iTrySendTimes <= 1) {
//              setTimeout(CLODOP.wsSend(strData), 500)
//            } else {
//              this.OpenWebSocket()
//            }
//        }
//      },
//      FORMAT: function (oType, oValue) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (oType !=== undefined && oValue !=== undefined) {
//          if (oType.replace(/^\s+|\s+$/g, '').toLowerCase().indexOf("time:") === 0) {
//            oType = oType.replace(/^\s+|\s+$/g, '').slice(5)
//            if (oValue.toLowerCase().indexOf("now") > -1) oValue = (new Date()).toString()
//            if (oValue.toLowerCase().indexOf("date") > -1) oValue = (new Date()).toString()
//            if (oValue.toLowerCase().indexOf("time") > -1) oValue = (new Date()).toString()
//            var TypeYMD = "ymd"
//            if (oValue.toLowerCase().indexOf("ymd") > -1) {
//              TypeYMD = "ymd"
//              oValue = oValue.slice(3)
//            }
//            if (oValue.toLowerCase().indexOf("dmy") > -1) {
//              TypeYMD = "dmy"
//              oValue = oValue.slice(3)
//            }
//            if (oValue.toLowerCase().indexOf("mdy") > -1) {
//              TypeYMD = "mdy"
//              oValue = oValue.slice(3)
//            }
//            oValue = oValue.replace(/ [^ ]*\+[^ ]* /g, " ")
//            oValue = oValue.replace(/\(.*\)/g, " ")
//            oValue = oValue.replace(/星期日|星期一|星期二|星期三|星期四|星期五|星期六/g, " ")
//            oValue = oValue.replace(/[A-Za-z]+day|Mon|Tue|Wed|Thu|Fri|Sat|Sun/g, " ")
//            var aMonth = 0
//            var exp = new RegExp("Oct[A-Za-z]*|十月|10月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 10
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("Nov[A-Za-z]*|十一月|11月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 11
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("Dec[A-Za-z]*|十二月|12月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 12
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("Jan[A-Za-z]*|一月|01月|1月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 1
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("Feb[A-Za-z]*|二月|02月|2月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 2
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("Mar[A-Za-z]*|三月|03月|3月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 3
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("Apr[A-Za-z]*|四月|04月|4月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 4
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("May[A-Za-z]*|五月|05月|5月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 5
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("Jun[A-Za-z]*|六月|06月|6月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 6
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("Jul[A-Za-z]*|七月|07月|7月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 7
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("Aug[A-Za-z]*|八月|08月|8月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 8
//              oValue = oValue.replace(exp, '')
//            }
//            exp = new RegExp("Sep[A-Za-z]*|九月|09月|9月", "i")
//            if (oValue.match(exp) !=== null) {
//              aMonth = 9
//              oValue = oValue.replace(exp, '')
//            }
//            oValue = oValue.replace(/日|秒/g, " ")
//            oValue = oValue.replace(/时|分/g, ":")
//            var subTime = oValue.match(/ \d+:\d+:\d+/)
//            if (subTime === null) subTime = ''
//            oValue = oValue.replace(/ \d+:\d+:\d+/, '') + subTime
//            var dValue = new Date()
//            var iYear = 0
//            var iMonth = 0
//            var iDate = 0
//            var iHour = 0
//            var iMinutes = 0
//            var iSecond = 0
//            var tmpValue = oValue
//            var sValue = ''
//            var MC1 = 0
//            MC2 = 0
//            MC3 = 0
//            sValue = tmpValue.match(/\d+/)
//            if (sValue !=== null) {
//              MC1 = parseInt(sValue[0])
//              tmpValue = tmpValue.replace(/\d+/, '')
//            }
//            sValue = tmpValue.match(/\d+/)
//            if (sValue !=== null) {
//              MC2 = parseInt(sValue[0])
//              tmpValue = tmpValue.replace(/\d+/, '')
//            }
//            if (aMonth <= 0) {
//              sValue = tmpValue.match(/\d+/)
//              if (sValue !=== null) {
//                MC3 = parseInt(sValue[0])
//                tmpValue = tmpValue.replace(/\d+/, '')
//              }
//            }
//            if (aMonth > 0) {
//              iMonth = aMonth
//              if (MC2 <= 31) {
//                iYear = MC1
//                iDate = MC2
//              } else {
//                iYear = MC2
//                iDate = MC1
//              }
//            } else if (TypeYMD === "dmy") {
//              iDate = MC1
//              iMonth = MC2
//              iYear = MC3
//            } else if (TypeYMD === "mdy") {
//              iMonth = MC1
//              iDate = MC2
//              iYear = MC3
//            } else {
//              iYear = MC1
//              iMonth = MC2
//              iDate = MC3
//              if (MC3 > 31) {
//                iYear = MC3
//                iMonth = MC1
//                iDate = MC2
//                if (MC1 > 12) {
//                  iDate = MC1
//                  iMonth = MC2
//                }
//              } else {
//                if (MC2 > 12) {
//                  iYear = MC2
//                  iMonth = MC1
//                }
//              }
//            }
//            var sValue = tmpValue.match(/\d+/)
//            if (sValue !=== null) {
//              iHour = parseInt(sValue[0])
//              tmpValue = tmpValue.replace(/\d+/, '')
//            }
//            var sValue = tmpValue.match(/\d+/)
//            if (sValue !=== null) {
//              iMinutes = parseInt(sValue[0])
//              tmpValue = tmpValue.replace(/\d+/, '')
//            }
//            var sValue = tmpValue.match(/\d+/)
//            if (sValue !=== null) {
//              iSecond = parseInt(sValue[0])
//              tmpValue = tmpValue.replace(/\d+/, '')
//            }
//            if (oType.toLowerCase() === "isvalidformat") oValue = (iYear > 0 && iMonth > 0 && iMonth <= 12 && iDate > 0 && iDate <= 31)
//            else {
//              if (('' + iYear).length < 4) iYear = iYear + 2000
//              dValue.setFullYear(iYear, iMonth - 1, iDate)
//              dValue.setHours(iHour)
//              dValue.setMinutes(iMinutes)
//              dValue.setSeconds(iSecond)
//              var iDay = dValue.getDay()
//              if (oType.toLowerCase() === "weekindex") oValue = iDay
//              else if (oType.toLowerCase() === "floatvalue") oValue = dValue.getTime()
//              else {
//                var sWeek = ''
//                switch (iDay) {
//                  case 0:
//                    sWeek = "日"
//                    break
//                  case 1:
//                    sWeek = "一"
//                    break
//                  case 2:
//                    sWeek = "二"
//                    break
//                  case 3:
//                    sWeek = "三"
//                    break
//                  case 4:
//                    sWeek = "四"
//                    break
//                  case 5:
//                    sWeek = "五"
//                    break
//                  case 6:
//                    sWeek = "六"
//                    break
//                }
//                oValue = oType.replace(/dddd/ig, "星期" + sWeek)
//                if (/(y+)/i.test(oValue)) oValue = oValue.replace(RegExp.$1, (iYear + '').substr(4 - RegExp.$1.length))
//                if (/(m+:)/i.test(oValue)) oValue = oValue.replace(RegExp.$1, ("00" + iMinutes + ":").substr(("00" + iMinutes + ":").length - RegExp.$1.length))
//                if (/(M+)/i.test(oValue)) {
//                  var dsWidth = ('' + iMonth).length > RegExp.$1.length ? ('' + iMonth).length : RegExp.$1.length
//                  oValue = oValue.replace(RegExp.$1, ("00" + iMonth).substr(("00" + iMonth).length - dsWidth))
//                }
//                if (/(d+)/i.test(oValue)) {
//                  var dsWidth = ('' + iDate).length > RegExp.$1.length ? ('' + iDate).length : RegExp.$1.length
//                  oValue = oValue.replace(RegExp.$1, ("00" + iDate).substr(("00" + iDate).length - dsWidth))
//                }
//                if (/(H+)/i.test(oValue)) oValue = oValue.replace(RegExp.$1, ("00" + iHour).substr(("00" + iHour).length - RegExp.$1.length))
//                if (/(n+)/i.test(oValue)) oValue = oValue.replace(RegExp.$1, ("00" + iMinutes).substr(("00" + iMinutes).length - RegExp.$1.length))
//                if (/(s+)/i.test(oValue)) oValue = oValue.replace(RegExp.$1, ("00" + iSecond).substr(("00" + iSecond).length - RegExp.$1.length))
//              }
//            }
//            if (CLODOP.On_Return) {
//              var selfFunc = CLODOP.On_Return
//              CLODOP.On_Return(0, oValue)
//              if (!CLODOP.On_Return_Remain && selfFunc ==== CLODOP.On_Return) CLODOP.On_Return = null
//            }
//            return oValue
//          } else if (this.blIslocal || oType.indexOf("FILE:") < 0) {
//            this.PageData["format_type"] = oType
//            this.PageData["format_value"] = oValue
//            if (this.DoPostDatas("format") === true) {
//              this.GetLastResult(false)
//              tResult = this.GetTaskID()
//            }
//          } else alert("不能远程读写文件!")
//        }
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      SET_PRINT_PAPER: function (Top, Left, Width, Height, strPrintTask) {
//        return this.PRINT_INITA(Top, Left, Width, Height, strPrintTask)
//      },
//      PRINT_INIT: function (strPrintTask) {
//        return this.PRINT_INITA(null, null, null, null, strPrintTask)
//      },
//      PRINT_INITA: function (Top, Left, Width, Height, strPrintTask) {
//        if (Top ==== undefined || Top ==== null) Top = ''
//        if (Left ==== undefined || Left ==== null) Left = ''
//        if (Width ==== undefined || Width ==== null) Width = ''
//        if (Height ==== undefined || Height ==== null) Height = ''
//        if (strPrintTask ==== undefined || strPrintTask ==== null) strPrintTask = ''
//        this.NoClearAfterPrint = false
//        this.DoInit()
//        this.PageData["top"] = Top
//        this.PageData["left"] = Left
//        this.PageData["width"] = Width
//        this.PageData["height"] = Height
//        this.PageData["printtask"] = strPrintTask
//      },
//      SET_PRINT_MODE: function (strModeType, ModeValue) {
//        if (strModeType ==== undefined || strModeType ==== null) strModeType = ''
//        if (ModeValue ==== undefined || ModeValue ==== null) ModeValue = ''
//        if (strModeType ==== '') return false
//        strModeType = strModeType.toLowerCase()
//        this.PageData[strModeType] = ModeValue
//        if (strModeType === "noclear_after_print") this.NoClearAfterPrint = ModeValue
//        if (strModeType.indexOf("window_def") > -1 || strModeType.indexOf("control_printer") > -1) {
//          var tResult = null
//          if (this.DoPostDatas("onlysetprint") === true) {
//            this.GetLastResult(false)
//            tResult = this.GetTaskID()
//          }
//          this.DoInit()
//          this.blWorking = false
//          return tResult
//        }
//      },
//      ADD_PRINT_TEXT: function (top, left, width, height, strText) {
//        return this.AddItemArray(2, top, left, width, height, strText)
//      },
//      ADD_PRINT_TEXTA: function (itemName, top, left, width, height, strText) {
//        return this.AddItemArray(2, top, left, width, height, strText, itemName)
//      },
//      ADD_PRINT_HTM: function (top, left, width, height, strHTML) {
//        return this.AddItemArray(4, top, left, width, height, strHTML)
//      },
//      ADD_PRINT_HTML: function (top, left, width, height, strHTML) {
//        return this.AddItemArray(1, top, left, width, height, strHTML)
//      },
//      ADD_PRINT_HTMLA: function (itemName, top, left, width, height, strHTML) {
//        return this.AddItemArray(1, top, left, width, height, strHTML, itemName)
//      },
//      ADD_PRINT_BARCODE: function (top, left, width, height, BarType, BarValue) {
//        return this.AddItemArray(9, top, left, width, height, BarValue, null, null, null, null, null, null, BarType)
//      },
//      ADD_PRINT_BARCODEA: function (ItemName, top, left, width, height, BarType, BarValue) {
//        return this.AddItemArray(9, top, left, width, height, BarValue, ItemName, null, null, null, null, null, BarType)
//      },
//      ADD_PRINT_RECTA: function (top, left, width, height, intPenStyle, intPenWidth, intColor) {
//        return this.AddItemArray(3, top, left, width, height, null, null, 2, intPenStyle, intPenWidth, intColor, null)
//      },
//      ADD_PRINT_RECT: function (top, left, width, height, intPenStyle, intPenWidth) {
//        return this.AddItemArray(3, top, left, width, height, null, null, 2, intPenStyle, intPenWidth, null, null)
//      },
//      ADD_PRINT_ELLIPSEA: function (top, left, width, height, intPenStyle, intPenWidth, intColor) {
//        return this.AddItemArray(3, top, left, width, height, null, null, 3, intPenStyle, intPenWidth, intColor, null)
//      },
//      ADD_PRINT_ELLIPSE: function (top, left, width, height, intPenStyle, intPenWidth) {
//        return this.AddItemArray(3, top, left, width, height, null, null, 3, intPenStyle, intPenWidth, null, null)
//      },
//      ADD_PRINT_SHAPE: function (ShapeType, top, left, width, height, intPenStyle, intPenWidth, intColor) {
//        return this.AddItemArray(3, top, left, width, height, null, null, ShapeType, intPenStyle, intPenWidth, intColor, null)
//      },
//      ADD_PRINT_LINE: function (top1, left1, top2, left2, intPenStyle, intPenWidth) {
//        return this.AddItemArray(3, top1, left1, top2, left2, null, null, 0, intPenStyle, intPenWidth, null, "1")
//      },
//      ADD_PRINT_DNLINE: function (Top, Left, Width, Height, intPenStyle, intPenWidth) {
//        return this.AddItemArray(3, Top, Left, Width, Height, null, null, 1, intPenStyle, intPenWidth, null, null)
//      },
//      ADD_PRINT_DNLINEA: function (Top, Left, Width, Height, intPenStyle, intPenWidth, intColor) {
//        return this.AddItemArray(3, Top, Left, Width, Height, null, null, 1, intPenStyle, intPenWidth, intColor, null)
//      },
//      ADD_PRINT_UPLINE: function (Top, Left, Width, Height, intPenStyle, intPenWidth) {
//        return this.AddItemArray(3, Top, Left, Width, Height, null, null, 0, intPenStyle, intPenWidth, null, null)
//      },
//      ADD_PRINT_UPLINEA: function (Top, Left, Width, Height, intPenStyle, intPenWidth, intColor) {
//        return this.AddItemArray(3, Top, Left, Width, Height, null, null, 0, intPenStyle, intPenWidth, intColor, null)
//      },
//      ADD_PRINT_TABLE: function (top, left, width, height, strHTML) {
//        return this.AddItemArray(6, top, left, width, height, strHTML)
//      },
//      ADD_PRINT_TBURL: function (top, left, width, height, strURL) {
//        return this.AddItemArray(7, top, left, width, height, strURL)
//      },
//      ADD_PRINT_URL: function (top, left, width, height, strURL) {
//        return this.AddItemArray(5, top, left, width, height, strURL)
//      },
//      ADD_PRINT_IMAGE: function (top, left, width, height, strHTML) {
//        return this.AddItemArray(8, top, left, width, height, strHTML)
//      },
//      ADD_PRINT_CHART: function (top, left, width, height, strChartTypess, strHTML) {
//        return this.AddItemArray(10, top, left, width, height, strHTML, null, null, null, null, null, null, null, strChartTypess)
//      },
//      SET_PRINT_PROPERTY: function (ItemNO, intPageType, intHorzOrient, intVertOrient) {
//        this.SET_PRINT_STYLEA(ItemNO, "ItemType", intPageType)
//        this.SET_PRINT_STYLEA(ItemNO, "HOrient", intHorzOrient)
//        this.SET_PRINT_STYLEA(ItemNO, "VOrient", intVertOrient)
//      },
//      SET_PRINT_PROPERTYA: function (ItemName, intPageType, intHorzOrient, intVertOrient) {
//        this.SET_PRINT_PROPERTY(ItemName, intPageType, intHorzOrient, intVertOrient)
//      },
//      SET_PRINT_STYLE: function (strStyleName, StyleValue) {
//        if (strStyleName ==== undefined || strStyleName ==== null) strStyleName = ''
//        if (StyleValue ==== undefined || StyleValue ==== null) StyleValue = ''
//        if (strStyleName ==== '') return false
//        strStyleName = strStyleName.toLowerCase()
//        this.defStyleJson[strStyleName] = StyleValue
//      },
//      SET_PRINT_STYLEA: function (ItemNo, strKey, Value) {
//        if (ItemNo ==== undefined || ItemNo ==== null) ItemNo = ''
//        if (strKey ==== undefined || strKey ==== null) strKey = ''
//        if (Value ==== undefined || Value ==== null) Value = ''
//        if (ItemNo ==== '' || strKey ==== '') return false
//        if (this.ItemDatas["count"] <= 0) {
//          if (this.PageData["add_print_program_data"] !=== undefined) {
//            this.ItemCNameStyles[strKey.toLowerCase() + "-" + ItemNo] = Value
//            return true
//          } else {
//            return false
//          }
//        }
//        strKey = strKey.toLowerCase()
//        if (strKey === "type") return false
//        var blResult = false
//        if (ItemNo === 0) {
//          ItemNo = this.ItemDatas["count"]
//        }
//        for (var vItemNO in this.ItemDatas) {
//          var ItemName = this.ItemDatas[vItemNO]["itemname"]
//          if ((ItemNo === vItemNO) || (ItemNo === ItemName) || ((typeof ItemNo ==== "string") && (typeof ItemName ==== "string") && (ItemNo.toUpperCase() === ItemName.toUpperCase()))) {
//            this.ItemDatas[vItemNO][strKey] = Value
//            blResult = true
//          }
//        }
//        if (blResult) return true
//        return false
//      },
//      SET_PRINT_TEXT_STYLE: function (ItemNO, strFontName, intSize, intBold, intItalic, intUnderline, intAlignment) {
//        this.SET_PRINT_STYLEA(ItemNO, "fontname", strFontName)
//        this.SET_PRINT_STYLEA(ItemNO, "fontsize", intSize)
//        this.SET_PRINT_STYLEA(ItemNO, "bold", intBold)
//        this.SET_PRINT_STYLEA(ItemNO, "italic", intItalic)
//        this.SET_PRINT_STYLEA(ItemNO, "underline", intUnderline)
//        this.SET_PRINT_STYLEA(ItemNO, "alignment", intAlignment)
//      },
//      SET_PRINT_TEXT_STYLEA: function (ItemNO, strFontName, intSize, intBold, intItalic, intUnderline, intAlignment, Color) {
//        this.SET_PRINT_TEXT_STYLE(ItemNO, strFontName, intSize, intBold, intItalic, intUnderline, intAlignment)
//        this.SET_PRINT_STYLEA(ItemNO, "fontcolor", Color)
//      },
//      SET_PRINT_TEXT_STYLEB: function (ItemNO, strFontName, intSize, intBold, intItalic, intUnderline, intAlignment, Color) {
//        this.SET_PRINT_TEXT_STYLEA(ItemNO, strFontName, intSize, intBold, intItalic, intUnderline, intAlignment, Color)
//      },
//      NEWPAGE: function () {
//        this.NewPage()
//      },
//      NewPage: function () {
//        var blSomeNormal = false
//        var noItemType
//        for (var vItemNO in this.ItemDatas) {
//          if (vItemNO === "count") noItemType = false
//          else noItemType = true
//          for (var vItemxx in this.ItemDatas[vItemNO]) {
//            if (vItemxx === "itemtype") {
//              noItemType = false
//              if ((this.ItemDatas[vItemNO][vItemxx] === 0) || (this.ItemDatas[vItemNO][vItemxx] === 4)) {
//                blSomeNormal = true
//                break
//              }
//            }
//          }
//          if (noItemType) blSomeNormal = true
//          if (blSomeNormal) break
//        }
//        if (blSomeNormal) this.defStyleJson["beginpage"] = this.defStyleJson["beginpage"] + 1
//      },
//      NEWPAGEA: function () {
//        this.NewPageA()
//      },
//      NewPageA: function () {
//        var blSomeNormal = false
//        var noItemType
//        for (var vItemNO in this.ItemDatas) {
//          if (vItemNO === "count") noItemType = false
//          else noItemType = true
//          for (var vItemxx in this.ItemDatas[vItemNO]) {
//            if (vItemxx === "itemtype") {
//              noItemType = false
//              if ((this.ItemDatas[vItemNO][vItemxx] === 0) || (this.ItemDatas[vItemNO][vItemxx] === 4)) {
//                blSomeNormal = true
//                break
//              }
//            }
//          }
//          if (noItemType) blSomeNormal = true
//          if (blSomeNormal) break
//        }
//        if (blSomeNormal) this.defStyleJson["beginpagea"] = this.defStyleJson["beginpagea"] + 1
//      },
//      PREVIEW: function (sView, iW, iH) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if ((!sView) && (this.blIslocal)) {
//          if (this.DoPostDatas("preview") === true) {
//            this.Result = null
//            this.GetLastResult(true)
//            tResult = this.GetTaskID()
//          }
//        } else {
//          if (this.DoPostDatas("cpreview") === true) {
//            this.DoCPreview(sView, iW, iH)
//            tResult = this.GetTaskID()
//          }
//        }
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      PRINT: function (sView, iW, iH) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (this.DoPostDatas("print") === true) tResult = this.GetTaskID()
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      GET_PRINTER_COUNT: function () {
//        if (this.Printers ==== undefined) return 0
//        else {
//          return this.Printers["list"].length
//        }
//      },
//      GET_PRINTER_NAME: function (intNO) {
//        if (this.Printers ==== undefined) return ''
//        else {
//          if (typeof intNO === "string" && intNO.indexOf(":") > -1) {
//            var strPPname = intNO.slice(intNO.indexOf(":") + 1)
//            intNO = intNO.slice(0, intNO.indexOf(":"))
//            if (intNO === -1) return this.Printers["list"][this.Printers["default"]][strPPname]
//            else return this.Printers["list"][intNO][strPPname]
//          } else {
//            if (intNO === -1) return this.Printers["list"][this.Printers["default"]].name
//            else if (intNO >= 0 && intNO < this.Printers["list"].length) return this.Printers["list"][intNO].name
//            else return "Printer NO. overflow"
//          }
//        }
//      },
//      GET_PAGESIZES_LIST: function (PNameInx, Split) {
//        if (this.Printers ==== undefined) return ''
//        else {
//          if (PNameInx === -1) PNameInx = this.Printers["list"][this.Printers["default"]].name
//          for (var intNO in this.Printers["list"]) {
//            if (PNameInx === intNO || PNameInx === this.Printers["list"][intNO].name) {
//              var strList = ''
//              for (var iPNO in this.Printers["list"][intNO]["pagelist"]) {
//                if (strList ==== '') strList = this.Printers["list"][intNO]["pagelist"][iPNO].name
//                else strList = strList + Split + this.Printers["list"][intNO]["pagelist"][iPNO].name
//              }
//              return strList
//            }
//          }
//          return ''
//        }
//      },
//      SET_PRINTER_INDEX: function (strName) {
//        if (this.Printers ==== undefined) return false
//        else {
//          if (strName === -1) {
//            this.PageData["printerindex"] = this.Printers["default"]
//            return true
//          } else {
//            strName = strName + ''
//            strName = strName.replace(/\\/g, '')
//            for (var vNO in this.Printers["list"]) {
//              if ((this.Printers["list"][vNO].name.replace(/\\/g, '') === strName) || (vNO === strName)) {
//                this.PageData["printerindex"] = vNO
//                return true
//              }
//            }
//            return false
//          }
//        }
//      },
//      SET_PRINTER_INDEXA: function (strName) {
//        return this.SET_PRINTER_INDEX(strName)
//      },
//      PRINT_DESIGN: function () {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (this.blIslocal) {
//          if (this.DoPostDatas("print_design") === true) {
//            this.Result = null
//            this.GetLastResult(true)
//            tResult = this.GetTaskID()
//          }
//        } else alert("不能远程打印设计!")
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      PRINT_SETUP: function () {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (this.blIslocal) {
//          if (this.DoPostDatas("print_setup") === true) {
//            this.Result = null
//            this.GetLastResult(true)
//            tResult = this.GetTaskID()
//          }
//        } else alert("不能远程打印维护!")
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      SET_PRINT_PAGESIZE: function (intOrient, PageWidth, PageHeight, strPageName) {
//        if (intOrient !=== undefined && intOrient !=== null) this.PageData["orient"] = intOrient
//        if (PageWidth !=== undefined && PageWidth !=== null) this.PageData["pagewidth"] = PageWidth
//        if (PageHeight !=== undefined && PageHeight !=== null) this.PageData["pageheight"] = PageHeight
//        if (strPageName !=== undefined && strPageName !=== null) this.PageData["pagename"] = strPageName
//      },
//      SET_PRINT_COPIES: function (intCopies) {
//        if (intCopies !=== undefined && intCopies !=== null) {
//          this.PageData["printcopies"] = intCopies
//          return true
//        }
//      },
//      SELECT_PRINTER: function (blPrint) {
//        this.SelectBox.create(388, 240, !blPrint)
//        return true
//      },
//      PRINTA: function (blPrintB, sView) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (!sView && this.blIslocal) {
//          this.Result = null
//          if (blPrintB) {
//            if (this.DoPostDatas("printb") === true) {
//              this.GetLastResult(false)
//              tResult = this.GetTaskID()
//            }
//          } else {
//            if (this.DoPostDatas("printa") === true) {
//              this.GetLastResult(true)
//              tResult = this.GetTaskID()
//            }
//          }
//          this.DoInit()
//          this.blWorking = false
//        } else {
//          this.SELECT_PRINTER(true)
//        }
//        return tResult
//      },
//      PRINTAOK: function (iPrintIndex, iPrintCopies, iStartNO, iEndNO, onlySelect) {
//        this.SET_PRINTER_INDEX(iPrintIndex)
//        this.SET_PRINT_COPIES(iPrintCopies)
//        if (iStartNO !=== undefined && iStartNO !=== 0) this.SET_PRINT_MODE("PRINT_START_PAGE", iStartNO)
//        if (iEndNO !=== undefined && iEndNO !=== 0) this.SET_PRINT_MODE("PRINT_END_PAGE", iEndNO)
//        if (!onlySelect) this.PRINT()
//        else {
//          this.blTmpSelectedIndex = iPrintIndex
//          if (CLODOP.On_Return) {
//            var selfFunc = CLODOP.On_Return
//            CLODOP.On_Return(0, iPrintIndex)
//            if (!CLODOP.On_Return_Remain && selfFunc ==== CLODOP.On_Return) CLODOP.On_Return = null
//          }
//        }
//      },
//      SET_LICENSES: function (strCompanyName, strLicense, strLicenseA, strLicenseB) {
//        if ((strCompanyName === 'THIRD LICENSE') && (strLicense === '')) {
//          if (strLicenseA && strLicenseA !=== '') this.PageDataEx["licensec"] = strLicenseA
//          if (strLicenseB && strLicenseB !=== '') this.PageDataEx["licensed"] = strLicenseB
//        } else if ((strCompanyName === 'LICENSE TETCODE') && (strLicense === '') && (strLicenseB === '')) {
//          if (strLicenseA && strLicenseA !=== '') this.PageDataEx["Licensetetcode"] = strLicenseA
//        } else {
//          if (strCompanyName && strCompanyName !=== '') this.PageDataEx["companyname"] = strCompanyName
//          if (strLicense && strLicense !=== '') this.PageDataEx["license"] = strLicense
//          if (strLicenseA && strLicenseA !=== '') this.PageDataEx["licensea"] = strLicenseA
//          if (strLicenseB && strLicenseB !=== '') this.PageDataEx["licenseb"] = strLicenseB
//        }
//      },
//      PRINTB: function () {
//        this.PRINTA(true)
//      },
//      PREVIEWA: function () {
//        this.PREVIEW()
//      },
//      PREVIEWB: function () {
//        this.PREVIEW()
//      },
//      ADD_PRINT_SETUP_BKIMG: function (strContent) {
//        if (strContent !=== undefined && strContent !=== null) {
//          this.PageData["setup_bkimg"] = strContent
//          return true
//        }
//      },
//      SET_PREVIEW_WINDOW: function (intDispMode, intToolMode, blDirectPrint, oWidth, oHeight, strPButtonCaptoin) {
//        if (intDispMode !=== undefined && intDispMode !=== null) this.PageData["pvw_dispmode"] = intDispMode
//        if (intToolMode !=== undefined && intToolMode !=== null) this.PageData["pvw_toolmode"] = intToolMode
//        if (blDirectPrint !=== undefined && blDirectPrint !=== null) this.PageData["pvw_directprint"] = blDirectPrint
//        if (oWidth !=== undefined && oWidth !=== null) this.PageData["pvw_width"] = oWidth
//        if (oHeight !=== undefined && oHeight !=== null) this.PageData["pvw_height"] = oHeight
//        if (strPButtonCaptoin !=== undefined && strPButtonCaptoin !=== null) this.PageData["pvw_puttoncaptoin"] = strPButtonCaptoin
//      },
//      SET_PREVIEW_MODE: function (ModeValue) {
//        if (ModeValue !=== undefined) this.PageData["pvw_preview_mode"] = ModeValue
//      },
//      SET_SHOW_MODE: function (strModeType, ModeValue) {
//        if (strModeType ==== undefined || strModeType ==== null) strModeType = ''
//        if (ModeValue ==== undefined || ModeValue ==== null) ModeValue = ''
//        if (strModeType ==== '') return false
//        strModeType = strModeType.toLowerCase()
//        this.PageData['shwmod_' + strModeType] = ModeValue
//      },
//      SAVE_TO_FILE: function (strFileName) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (this.blIslocal) {
//          if (strFileName) {
//            this.PageData["stf_file_name"] = strFileName
//            if (this.DoPostDatas("savetofile") === true) {
//              this.GetLastResult(false)
//              tResult = this.GetTaskID()
//            }
//          }
//        } else alert("不能远程写文件!")
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      SET_SAVE_MODE: function (strModeType, ModeValue) {
//        if (strModeType ==== undefined || strModeType ==== null) strModeType = ''
//        if (ModeValue ==== undefined || ModeValue ==== null) ModeValue = ''
//        if (strModeType ==== '') return false
//        strModeType = strModeType.toLowerCase()
//        this.PageData['stfmod_' + strModeType] = ModeValue
//      },
//      SEND_PRINT_RAWDATA: function (strRawData) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (strRawData !=== undefined) {
//          this.PageData["raw_print_data"] = strRawData
//          if (this.DoPostDatas("sendrawdata") === true) {
//            this.GetLastResult(false)
//            tResult = this.GetTaskID()
//          }
//        }
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      WRITE_FILE_TEXT: function (WriteMode, strFileName, strText) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (this.blIslocal) {
//          if (strFileName !=== undefined && strText !=== undefined) {
//            this.PageData["write_file_mode"] = WriteMode
//            this.PageData["write_file_name"] = strFileName
//            this.PageData["write_file_text"] = strText
//            if (this.DoPostDatas("writefiletext") === true) {
//              this.GetLastResult(false)
//              tResult = this.GetTaskID()
//            }
//          }
//        } else alert("不能远程写文件!")
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      GET_DIALOG_VALUE: function (oType, oPreValue) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (oType !=== undefined && oPreValue !=== undefined) {
//          if (this.blIslocal) {
//            this.PageData["dialog_type"] = oType
//            this.PageData["dialog_value"] = oPreValue
//            if (this.DoPostDatas("dialog") === true) {
//              this.GetLastResult(true)
//              tResult = this.GetTaskID()
//            }
//          } else alert("不能远程读写文件!")
//        }
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      WRITE_PORT_DATA: function (strPortName, strData) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (strPortName !=== undefined && strData !=== undefined) {
//          this.PageData["write_port_name"] = strPortName
//          this.PageData["write_port_data"] = strData
//          if (this.DoPostDatas("writeportdata") === true) {
//            this.GetLastResult(false)
//            tResult = this.GetTaskID()
//          }
//        }
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      READ_PORT_DATA: function (strPortName) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (strPortName !=== undefined) {
//          this.PageData["read_port_name"] = strPortName
//          if (this.DoPostDatas("readportdata") === true) {
//            this.GetLastResult(false)
//            tResult = this.GetTaskID()
//          }
//        }
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      GET_SYSTEM_INFO: function (InfoType) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (InfoType !=== undefined) {
//          this.PageData["system_info_type"] = InfoType
//          if (this.DoPostDatas("getsysteminfo") === true) {
//            this.GetLastResult(false)
//            tResult = this.GetTaskID()
//          }
//        }
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      GET_FILE_TEXT: function (strFileName) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (this.blIslocal) {
//          if (strFileName !=== undefined) {
//            this.PageData["get_file_name"] = strFileName
//            if (this.DoPostDatas("getfiletext") === true) {
//              this.GetLastResult(false)
//              tResult = this.GetTaskID()
//            }
//          }
//        } else alert("不能远程读文件!")
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      IS_FILE_EXIST: function (strFileName) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (this.blIslocal) {
//          if (strFileName !=== undefined) {
//            this.PageData["file_exist_name"] = strFileName
//            if (this.DoPostDatas("isfileexist") === true) {
//              this.GetLastResult(false)
//              tResult = this.GetTaskID()
//            }
//          }
//        } else alert("不能远程读文件!")
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      GET_FILE_TIME: function (strFileName) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (this.blIslocal) {
//          if (strFileName !=== undefined) {
//            this.PageData["file_time_name"] = strFileName
//            if (this.DoPostDatas("getfiletime") === true) {
//              this.GetLastResult(false)
//              tResult = this.GetTaskID()
//            }
//          }
//        } else alert("不能远程读文件!")
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      GET_PRINT_INIFFNAME: function (strPrintTaskName) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (this.blIslocal) {
//          if (strPrintTaskName !=== undefined) {
//            this.PageData["iniff_task_name"] = strPrintTaskName
//            if (this.DoPostDatas("getiniffname") === true) {
//              this.GetLastResult(false)
//              tResult = this.GetTaskID()
//            }
//          }
//        } else alert("不能远程读文件!")
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      GET_VALUE: function (ValueType, ValueIndex) {
//        if (this.blWorking) {
//          alert("It's Working... just a moment.")
//          return null
//        }
//        var tResult = null
//        if (ValueType !=== undefined && ValueIndex !=== undefined) {
//          this.PageData["get_value_type"] = ValueType
//          this.PageData["get_value_index"] = ValueIndex
//          if (this.DoPostDatas("dogetvalue") === true) {
//            this.GetLastResult(false)
//            tResult = this.GetTaskID()
//          }
//        }
//        this.DoInit()
//        this.blWorking = false
//        return tResult
//      },
//      ADD_PRINT_DATA: function (DataType, oValue) {
//        if (DataType !=== undefined && oValue !=== null) {
//          if (DataType.toLowerCase().indexOf("programdata") > -1) {
//            this.PageData["add_print_program_data"] = oValue
//            return true
//          }
//        }
//      },
//      SHOW_CHART: function () {},
//      DO_ACTION: function () {},
//      Create_Printer_List: function (oElement) {
//        while (oElement.childNodes.length > 0) {
//          var children = oElement.childNodes
//          for (var i = 0 i < children.length i++) oElement.removeChild(children[i])
//        }
//        var iCount = this.GET_PRINTER_COUNT()
//        for (var i = 0 i < iCount i++) {
//          var option = document.createElement('option')
//          option.innerHTML = this.GET_PRINTER_NAME(i)
//          option.value = i
//          oElement.appendChild(option)
//        }
//      },
//      Create_PageSize_List: function (oElement, printIndex) {
//        while (oElement.childNodes.length > 0) {
//          var children = oElement.childNodes
//          for (var i = 0 i < children.length i++) oElement.removeChild(children[i])
//        }
//        var strPageSizeList = CLODOP.GET_PAGESIZES_LIST(printIndex, "\n")
//        var Options = new Array()
//        Options = strPageSizeList.split("\n")
//        for (var i in Options) {
//          var option = document.createElement('option')
//          option.innerHTML = Options[i]
//          option.value = Options[i]
//          oElement.appendChild(option)
//        }
//      },
//      AddItemArray: function (type, top, left, width, height, strContent, itemname, ShapeType, intPenStyle, intPenWidth, intColor, isLinePosition, BarType, strChartTypess) {
//        if (top ==== undefined || left ==== undefined || width ==== undefined || height ==== undefined || strContent ==== undefined) {
//          return false
//        }
//        var sCount = this.ItemDatas["count"]
//        sCount++
//        var oneItem = {}
//        for (var vstyle in this.defStyleJson) {
//          oneItem[vstyle] = this.defStyleJson[vstyle]
//        }
//        oneItem["type"] = type
//        oneItem["top"] = top
//        oneItem["left"] = left
//        oneItem["width"] = width
//        oneItem["height"] = height
//        if ((strContent !=== undefined) && (strContent != null)) oneItem["content"] = strContent
//        if ((itemname !=== undefined) && (itemname != null)) oneItem["itemname"] = itemname + ''
//        if ((ShapeType !=== undefined) && (ShapeType != null)) oneItem["shapetype"] = ShapeType
//        if ((intPenStyle !=== undefined) && (intPenStyle != null)) oneItem["penstyle"] = intPenStyle
//        if ((intPenWidth !=== undefined) && (intPenWidth != null)) oneItem["penwidth"] = intPenWidth
//        if ((intColor !=== undefined) && (intColor != null)) oneItem["fontcolor"] = intColor
//        if ((isLinePosition !=== undefined) && (isLinePosition != null)) oneItem["lineposition"] = "1"
//        if ((BarType !=== undefined) && (BarType != null)) oneItem["fontname"] = BarType
//        if ((strChartTypess !=== undefined) && (strChartTypess != null)) oneItem["charttypess"] = strChartTypess
//        oneItem["beginpage"] = this.defStyleJson["beginpage"]
//        oneItem["beginpagea"] = this.defStyleJson["beginpagea"]
//        this.ItemDatas["count"] = sCount
//        this.ItemDatas[sCount] = oneItem
//        this.blNormalItemAdded = true
//        return true
//      },
//      RemoveIframes: function () {
//        var obody = document.body || document.getElementsByTagName("body")[0] || document.documentElement
//        try {
//          for (var i = 0 i < this.Iframes.length i++) {
//            var now = (new Date()).getTime()
//            if ((now - this.Iframes[i]["time"]) > this.timeThreshold * 60000) {
//              obody.removeChild(this.Iframes[i]["iframe"])
//              this.Iframes.splice(i, 1)
//            }
//          }
//        } catch (err) {}
//      },
//      AddInputElement: function (odocument, oform, name, value) {
//        if (value !=== undefined) {
//          var oinput = odocument.createElement("input")
//          oinput.name = name
//          oinput.type = "hidden"
//          oinput.value = value
//          oform.appendChild(oinput)
//        }
//      },
//      createPostDataString: function (afterPostAction) {
//        var strData = "act=" + afterPostAction + "\f"
//        strData = strData + "browseurl=" + window.location.href + "\f"
//        for (var vMode in this.PageDataEx) {
//          strData = strData + vMode + "=" + this.PageDataEx[vMode] + "\f"
//        }
//        var PrintModeNamess = ''
//        for (var vMode in this.PageData) {
//          strData = strData + vMode + "=" + this.PageData[vMode] + "\f"
//          if (vMode != "top" && vMode != "left" && vMode != "width" && vMode != "height" && vMode != "printtask" && vMode != "printerindex" && vMode != "orient" && vMode != "pagewidth" && vMode != "pageheight" && vMode != "pagename" && vMode != "printcopies" && vMode != "setup_bkimg") PrintModeNamess = PrintModeNamess + '' + vMode
//        }
//        if (PrintModeNamess !=== '') strData = strData + "printmodenames=" + PrintModeNamess + "\f"
//        var StyleClassNamess = ''
//        for (var vClassStyle in this.ItemCNameStyles) {
//          strData = strData + vClassStyle + "=" + this.ItemCNameStyles[vClassStyle] + "\f"
//          StyleClassNamess = StyleClassNamess + '' + vClassStyle
//        }
//        if (StyleClassNamess !=== '') strData = strData + "printstyleclassnames=" + StyleClassNamess + "\f"
//        strData = strData + "itemcount=" + this.ItemDatas["count"] + "\f"
//        for (var vItemNO in this.ItemDatas) {
//          var ItemStyless = ''
//          for (var vItemxx in this.ItemDatas[vItemNO]) {
//            if (vItemxx != "beginpage" && vItemxx != "beginpagea" && vItemxx != "type" && vItemxx != "top" && vItemxx != "left" && vItemxx != "width" && vItemxx != "height") ItemStyless = ItemStyless + '' + vItemxx
//          }
//          strData = strData + vItemNO + "_itemstylenames" + "=" + ItemStyless + "\f"
//          for (var vItemxx in this.ItemDatas[vItemNO]) {
//            strData = strData + vItemNO + "_" + vItemxx + "=" + this.ItemDatas[vItemNO][vItemxx] + "\f"
//          }
//        }
//        return strData
//      },
//      wsDoPostDatas: function (afterPostAction) {
//        var strData = "charset=丂\f"
//        strData = strData + "tid=" + this.GetTaskID() + "\f"
//        strData = strData + this.createPostDataString(afterPostAction)
//        return this.wsSend("post:" + strData)
//      },
//      DoPostDatas: function (afterPostAction) {
//        if (this.blOneByone === true) {
//          alert("有窗口已打开，先关闭它(持续如此时请刷新页面)!")
//          return false
//        }
//        this.blWorking = true
//        if (this.blTmpSelectedIndex !=== null) this.SET_PRINTER_INDEX(this.blTmpSelectedIndex)
//        if (this.SocketEnable) {
//          return this.wsDoPostDatas(afterPostAction)
//        }
//        this.RemoveIframes()
//        var obody = document.body || document.getElementsByTagName("body")[0] || document.documentElement
//        var oiframe = document.createElement("iframe")
//        oiframe.setAttribute("src", "about:blank")
//        oiframe.setAttribute("style", "display:none")
//        oiframe.height = 0
//        obody.appendChild(oiframe)
//        var contentdocument = oiframe.contentWindow.document
//        contentdocument.write("<form action='" + this.strHostURI + "/c_dopostdatas' method='post' enctype='application/x-www-form-urlencoded'></form>")
//        var oform = contentdocument.getElementsByTagName("form")[0]
//        this.AddInputElement(contentdocument, oform, "charset", "丂")
//        this.AddInputElement(contentdocument, oform, "tid", this.GetTaskID())
//        this.AddInputElement(contentdocument, oform, "post", this.createPostDataString(afterPostAction))
//        oform.submit()
//        var IframeMS = {}
//        IframeMS["time"] = (new Date()).getTime()
//        IframeMS["iframe"] = oiframe
//        this.Iframes.push(IframeMS)
//        return true
//      },
//      GetLastResult: function (blFOneByone) {
//        if (blFOneByone) this.blOneByone = true
//        if (this.SocketEnable) {
//          return true
//        }
//        var url = this.strHostURI + "/c_lastresult.js"
//        url = url + "?times=" + (new Date().getTime())
//        url = url + "&tid=" + this.GetTaskID()
//        url = encodeURI(url).replace("%20", "+")
//        var oscript = document.createElement("script")
//        oscript.src = url
//        oscript.async = false
//        oscript.type = "text/javascript"
//        oscript.charset = "utf-8"
//        var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement
//        head.insertBefore(oscript, head.firstChild)
//        oscript.onload = oscript.onreadystatechange = function () {
//          if ((!oscript.readyState || /loaded|complete/.test(oscript.readyState))) {
//            CLODOP.blOneByone = false
//            if (CLodop_ACTLastResult) var strResult = decodeURIComponent(CLodop_ACTLastResult)
//            var strResultTaskID = CLodop_ACTTaskID
//            CLODOP.Result = strResult
//            if (CLodop_ACTAlert) CLodop_ACTAlert()
//            if (CLODOP.On_Return) try {
//              var selfFunc = CLODOP.On_Return
//              if (strResult === "true" || strResult === "false") CLODOP.On_Return(strResultTaskID, strResult === "true")
//              else CLODOP.On_Return(strResultTaskID, strResult)
//              if (!CLODOP.On_Return_Remain && selfFunc ==== CLODOP.On_Return) CLODOP.On_Return = null
//            } catch (err) {}
//            oscript.onload = oscript.onreadystatechange = null
//            if (oscript.parentNode) {
//              oscript.parentNode.removeChild(oscript)
//            }
//          }
//        }
//        return true
//      },
//      DoCPreview: function (sView, iW, iH) {
//        var obody = document.body || document.getElementsByTagName("body")[0] || document.documentElement
//        if (typeof iW !=== "number") iW = Math.round(obody.offsetWidth * 2 / 3)
//        else if (obody.offsetWidth < iW) iW = obody.offsetWidth
//        if (typeof iH !=== "number") iH = Math.round(window.screen.height - 200)
//        else if (window.screen.height < iH) iH = window.screen.height
//        var url = this.strHostURI + "/c_dopreview"
//        url = url + "?times=" + (new Date().getTime())
//        url = url + "&tid=" + this.GetTaskID()
//        url = url + "&iw=" + iW
//        url = url + "&ih=" + iH
//        url = encodeURI(url).replace("%20", "+")
//        this.PopView(sView, url, iW, iH)
//      },
//      PopView: function (sView, strPURL, iW, iH) {
//        try {
//          if (sView && typeof sView ==== "string") {
//            if (sView.charAt(0) != "_" && sView.length > 0) {
//              if (document.getElementById(sView)) {
//                document.getElementById(sView).src = strPURL
//              } else alert("iframe '" + sView + "' not exist!")
//            } else if (sView ==== "_dialog") {
//              if (!this.Browser.Opera) {
//                showModalDialog(strPURL, 'dialog', 'center:yes')
//              } else {
//                window.open(strPURL, '', "scrollbars=yes,toolbar=no,left=150,top=100,resizable=yes")
//              }
//            } else if (sView ==== "_self" || sView ==== "_top" || sView ==== "_parent") {
//              window.location.href = strPURL
//            } else if (sView ==== "_blank") {
//              this.PreviewBox.create(strPURL, iW, iH)
//            } else alert("Element '" + sView + "' is invalid!")
//          } else this.PreviewBox.create(strPURL, iW, iH)
//        } catch (err) {
//          alert("CLODOP PopView " + err)
//        }
//      },
//      creatMyButtonElement: function (strType, strValue) {
//        try {
//          var oElement = document.createElement("<input type='" + strType + "' value='" + strValue + "'></input>")
//        } catch (e) {}
//        if (!oElement) {
//          oElement = document.createElement("input")
//          oElement.type = strType
//          oElement.value = strValue
//        }
//        return oElement
//      },
//      creatLabelElement: function (Type, Value, Width, Left, Top) {
//        var TxtLabel = document.createElement(Type)
//        TxtLabel.innerHTML = Value
//        TxtLabel.style.cssText = "position:absolutewidth:" + Width + "pxleft:" + Left + "pxtop:" + Top + 'px'
//        return TxtLabel
//      },
//      SelectBox: {
//        dragapproved: false,
//        offsetx: 0,
//        offsety: 0,
//        tempx: 0,
//        tempy: 0,
//        FrantDiv: undefined,
//        PopDiv: undefined,
//        selPrinter: undefined,
//        selCopies: undefined,
//        closeit: function () {
//          if (CLODOP.SelectBox.PopDiv && CLODOP.SelectBox.PopDiv.parentNode) CLODOP.SelectBox.PopDiv.parentNode.removeChild(CLODOP.SelectBox.PopDiv)
//          if (this.FrantDiv && this.FrantDiv.parentNode) this.FrantDiv.parentNode.removeChild(this.FrantDiv)
//          this.PopDiv = undefined
//        },
//        initializedrag: function (e) {
//          var we = window.event || e
//          this.offsetx = we.clientX
//          this.offsety = we.clientY
//          this.tempx = parseInt(this.PopDiv.style.left)
//          this.tempy = parseInt(this.PopDiv.style.top)
//          this.dragapproved = true
//        },
//        drag_drop: function (e) {
//          if (!this.dragapproved) return
//          var we = window.event || e
//          this.PopDiv.style.left = we.clientX - this.offsetx + this.tempx + 'px'
//          this.PopDiv.style.top = we.clientY - this.offsety + this.tempy + 'px'
//        },
//        stopdrag: function () {
//          this.dragapproved = false
//        },
//        clickOK: function (onlySelect) {
//          CLODOP.PRINTAOK(CLODOP.SelectBox.selPrinter.value, CLODOP.SelectBox.selCopies.value, 0, 0, onlySelect)
//          this.closeit()
//        },
//        create: function (iW, iH, onlySelect) {
//          if (CLODOP.SelectBox.PopDiv) this.closeit()
//          var obody = document.body || document.getElementsByTagName("body")[0] || document.documentElement
//          var Boxdiv = document.createElement('div')
//          obody.appendChild(Boxdiv)
//          Boxdiv.style.cssText = "position:absolutez-index:1100display:blocktop:2pxborder:1px solid #6B97C1background:#F5F5F5color:#000font-size:13px"
//          Boxdiv.style.width = iW + 'px'
//          Boxdiv.style.left = (obody.offsetWidth - iW) / 2 + 'px'
//          Boxdiv.style.top = (obody.offsetHeight - iH) / 2 + 'px'
//          Boxdiv.style.height = iH + 'px'
//          this.PopDiv = Boxdiv
//          var titleDiv = document.createElement('div')
//          Boxdiv.appendChild(titleDiv)
//          titleDiv.style.cssText = "font: bold 13px Arialline-height:25pxheight:27pxtext-indent:5pxcolor: whitebackground:#8BACCF"
//          titleDiv.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp打印"
//          titleDiv.onmousedown = function (event) {
//            CLODOP.SelectBox.initializedrag(event)
//          }
//          titleDiv.onmousemove = function (event) {
//            CLODOP.SelectBox.drag_drop(event)
//          }
//          titleDiv.onmouseup = function () {
//            CLODOP.SelectBox.stopdrag()
//          }
//          var icoButton = document.createElement('button')
//          titleDiv.appendChild(icoButton)
//          icoButton.style.cssText = "background:transparent url(" + CLODOP.strHostURI + "/c_favicon.ico) no-repeat scroll 0 0pxmargin-left:5pxposition:absoluteheight:20pxline-height:100pxwidth:34pxleft:3pxborder:0top:5px"
//          var CloseButton = document.createElement('button')
//          titleDiv.appendChild(CloseButton)
//          CloseButton.style.cssText = "background:transparent url(" + CLODOP.strHostURI + "/images/c_winclose.png) no-repeat scroll 0 0pxmargin-right:5pxposition:absoluteheight:20pxline-height:100pxwidth:34pxright:3pxborder:0top:4px"
//          CloseButton.onclick = function () {
//            CLODOP.SelectBox.closeit()
//            if (onlySelect && CLODOP.On_Return) {
//              var selfFunc = CLODOP.On_Return
//              CLODOP.On_Return(0, -1)
//              if (!CLODOP.On_Return_Remain && selfFunc ==== CLODOP.On_Return) CLODOP.On_Return = null
//            }
//          }
//          var areaDiv = document.createElement('div')
//          Boxdiv.appendChild(areaDiv)
//          areaDiv.style.cssText = "background:#F5F5F5color:#000border:0pxleft:0pxtop:0px"
//          areaDiv.style.width = iW - 2 + 'px'
//          areaDiv.style.height = (iH - 27) + 'px'
//          var OKButton = CLODOP.creatMyButtonElement('button', "确定")
//          Boxdiv.appendChild(OKButton)
//          OKButton.style.cssText = "position:absolutewidth:80pxf"
//          OKButton.style.left = "110px"
//          OKButton.style.top = (iH - 64) + 'px'
//          OKButton.onclick = function () {
//            CLODOP.SelectBox.clickOK(onlySelect)
//          }
//          var CancelButton = CLODOP.creatMyButtonElement('button', "取消")
//          Boxdiv.appendChild(CancelButton)
//          CancelButton.style.cssText = "position:absolutewidth:80px"
//          CancelButton.style.left = "240px"
//          CancelButton.style.top = (iH - 64) + 'px'
//          CancelButton.onclick = function () {
//            CLODOP.SelectBox.closeit()
//            if (onlySelect && CLODOP.On_Return) {
//              var selfFunc = CLODOP.On_Return
//              CLODOP.On_Return(0, -1)
//              if (!CLODOP.On_Return_Remain && selfFunc ==== CLODOP.On_Return) CLODOP.On_Return = null
//            }
//          }
//          areaDiv.appendChild(CLODOP.creatLabelElement("span", "选打印机：", 200, 46, 67))
//          var oSelect = document.createElement("select")
//          Boxdiv.appendChild(oSelect)
//          this.selPrinter = oSelect
//          oSelect.style.cssText = "position:absolutesize:1width:212pxleft:110pxtop:62px"
//          CLODOP.Create_Printer_List(oSelect)
//          areaDiv.appendChild(CLODOP.creatLabelElement("span", "打印份数：", 200, 46, 121))
//          var oCopies = CLODOP.creatMyButtonElement("text", "1")
//          Boxdiv.appendChild(oCopies)
//          this.selCopies = oCopies
//          oCopies.style.cssText = "position:absolutesize:1width:30pxleft:110pxtop:117px"
//          this.FrantDiv = document.createElement('div')
//          obody.appendChild(this.FrantDiv)
//          this.FrantDiv.style.cssText = "border:0pxleft:0pxtop:0pxfilter: alpha(opacity=20) position: fixed opacity: 0.2-moz-opacity: 0.2 _position: absolutez-index:1009 over-flow: hidden"
//          if (CLODOP.Browser.IE && (document.compatMode === "BackCompat" || navigator.userAgent.indexOf("MSIE 6.0") > 0)) {
//            this.FrantDiv.style.width = obody.scrollWidth + 'px'
//            this.FrantDiv.style.height = obody.scrollHeight + 'px'
//          } else {
//            this.FrantDiv.style.width = '100%'
//            this.FrantDiv.style.height = '100%'
//          }
//        }
//      },
//      PreviewBox: {
//        dragapproved: false,
//        offsetx: 0,
//        offsety: 0,
//        tempx: 0,
//        tempy: 0,
//        FrantDiv: undefined,
//        PopDiv: undefined,
//        ContentFrame: undefined,
//        closeit: function (oSelf) {
//          if (CLODOP.PreviewBox.PopDiv && CLODOP.PreviewBox.PopDiv.parentNode) CLODOP.PreviewBox.PopDiv.parentNode.removeChild(CLODOP.PreviewBox.PopDiv)
//          if (this.FrantDiv && this.FrantDiv.parentNode) this.FrantDiv.parentNode.removeChild(this.FrantDiv)
//          this.PopDiv = undefined
//        },
//        initializedrag: function (e, oSelf) {
//          var we = window.event || e
//          this.offsetx = we.clientX
//          this.offsety = we.clientY
//          this.tempx = parseInt(oSelf.style.left)
//          this.tempy = parseInt(oSelf.style.top)
//          this.dragapproved = true
//        },
//        drag_drop: function (e, oSelf) {
//          if (!this.dragapproved) return
//          var we = window.event || e
//          oSelf.style.left = we.clientX - this.offsetx + this.tempx + 'px'
//          oSelf.style.top = we.clientY - this.offsety + this.tempy + 'px'
//        },
//        stopdrag: function () {
//          this.dragapproved = false
//          if (this.ContentFrame) this.ContentFrame.style.display = "block"
//        },
//        create: function (strURL, iW, iH) {
//          if (CLODOP.PreviewBox.PopDiv) this.closeit()
//          var obody = document.body || document.getElementsByTagName("body")[0] || document.documentElement
//          var vBoxDiv = document.createElement('div')
//          obody.appendChild(vBoxDiv)
//          vBoxDiv.style.cssText = "position:absolutez-index:1100display:blocktop:2pxborder:1px solid #6B97C1font-size:13px"
//          vBoxDiv.style.width = iW + 'px'
//          var iLeft = (obody.offsetWidth - iW) / 2
//          if (window.screen.width < obody.offsetWidth) iLeft = (window.screen.width - iW) / 2
//          if (iLeft < 0) iLeft = 0
//          vBoxDiv.style.left = iLeft + 'px'
//          vBoxDiv.style.height = iH + 'px'
//          vBoxDiv.onmousedown = function (event) {
//            CLODOP.PreviewBox.initializedrag(event, this)
//          }
//          vBoxDiv.onmouseup = function () {
//            CLODOP.PreviewBox.stopdrag()
//          }
//          vBoxDiv.onmousemove = function (event) {
//            CLODOP.PreviewBox.drag_drop(event, this)
//          }
//          this.PopDiv = vBoxDiv
//          var titleDiv = document.createElement('div')
//          vBoxDiv.appendChild(titleDiv)
//          titleDiv.style.cssText = "position:absoluteleft:0pxwidth:100%font: bold 14px Arialline-height:27pxheight:27pxtext-indent:26pxcolor: whitebackground:#8BACCF"
//          titleDiv.innerHTML = "打印预览"
//          var icoButton = document.createElement('button')
//          titleDiv.appendChild(icoButton)
//          icoButton.style.cssText = "background:transparent url(" + CLODOP.strHostURI + "/c_favicon.ico) no-repeat scroll 0 0pxmargin-left:5pxposition:absoluteheight:20pxline-height:100pxwidth:34pxleft:3pxborder:0top:5px"
//          var CloseButton = document.createElement('button')
//          titleDiv.appendChild(CloseButton)
//          CloseButton.style.cssText = "background:transparent url(" + CLODOP.strHostURI + "/images/c_winclose.png) no-repeat scroll 0 0pxmargin-right:5pxposition:absoluteheight:20pxline-height:100pxwidth:34pxright:3pxborder:0top:4px"
//          CloseButton.onclick = function () {
//            CLODOP.PreviewBox.closeit(this)
//          }
//          var areaDiv = document.createElement('div')
//          vBoxDiv.appendChild(areaDiv)
//          areaDiv.style.cssText = "background:#F5F5F5color:#000border:0pxleft:0pxtop:0px"
//          areaDiv.style.width = iW + 'px'
//          areaDiv.style.height = (iH - 0) + 'px'
//          this.ContentFrame = document.createElement("iframe")
//          areaDiv.appendChild(this.ContentFrame)
//          this.ContentFrame.style.cssText = "width:100%height:100%"
//          this.ContentFrame.src = strURL
//          this.ContentFrame.frameBorder = 'no'
//          this.FrantDiv = document.createElement('div')
//          obody.appendChild(this.FrantDiv)
//          this.FrantDiv.style.cssText = "border:0pxleft:0pxtop:0pxfilter: alpha(opacity=20) position: fixed opacity: 0.2 -moz-opacity: 0.2 _position: absolutez-index:1009 over-flow: hidden"
//          if (CLODOP.Browser.IE && (document.compatMode === "BackCompat" || navigator.userAgent.indexOf("MSIE 6.0") > 0)) {
//            this.FrantDiv.style.width = obody.scrollWidth + 'px'
//            this.FrantDiv.style.height = obody.scrollHeight + 'px'
//          } else {
//            this.FrantDiv.style.width = '100%'
//            this.FrantDiv.style.height = '100%'
//          }
//        }
//      }
//    }
//    if (win.CLODOP2015_7028 && win.CLODOP2015_7028.Priority && win.CLODOP2015_7028.Priority > CLODOP.Priority) {
//      CLODOP = win.CLODOP2015_7028
//      win.CLODOP_OK_Priority = win.CLODOP2015_7028.Priority
//      return
//    }
//    win.LODOP = CLODOP
//    win.CLODOP = CLODOP
//    win.CLODOP2015_7028 = CLODOP
//    win.CLODOP_OK_Priority = CLODOP.Priority
//    win.CLODOP.DoInit()
//    if (navigator.userAgent.indexOf("Lodop") < 0) win.CLODOP.OpenWebSocket()
//  })(window)

//  function getCLodop() {
//    return window.CLODOP2015_7028
//  }

var CreatedOKLodop7766 = null

//  ===判断是否需要安装CLodop云打印服务器:===
function needCLodop() {
  try {
    var ua = navigator.userAgent
    if (ua.match(/Windows\sPhone/i) != null) return true
    if (ua.match(/iPhone|iPod/i) != null) return true
    if (ua.match(/Android/i) != null) return true
    if (ua.match(/Edge\D?\d+/i) != null) return true

    var verTrident = ua.match(/Trident\D?\d+/i)
    var verIE = ua.match(/MSIE\D?\d+/i)
    var verOPR = ua.match(/OPR\D?\d+/i)
    var verFF = ua.match(/Firefox\D?\d+/i)
    var x64 = ua.match(/x64/i)
    if ((verTrident === null) && (verIE === null) && (x64 !== null)) {
      return true
    } else if (verFF !== null) {
      verFF = verFF[0].match(/\d+/)
      if ((verFF[0] >= 42) || (x64 !== null)) return true
    } else
    if (verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/)
      if (verOPR[0] >= 32) return true
    } else
    if ((verTrident === null) && (verIE === null)) {
      var verChrome = ua.match(/Chrome\D?\d+/i)
      if (verChrome !== null) {
        verChrome = verChrome[0].match(/\d+/)
        if (verChrome[0] >= 42) return true
      }
    }
    return false
  } catch (err) { return true }
}

//  ===页面引用CLodop云打印必须的JS文件：===
if (needCLodop()) {
  var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
  var oscript = document.createElement('script')
  oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
  head.insertBefore(oscript, head.firstChild)

  //    引用双端口(8000和18000）避免其中某个被占用：
  oscript = document.createElement('script')
  oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=0'
  head.insertBefore(oscript, head.firstChild)
}

//  ===获取LODOP对象的主过程：===
function getLodop(oOBJECT, oEMBED) {
  var strHtmInstall = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>"
  var strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>"
  var strHtm64Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>"
  var strHtm64Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>"
  var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>"
  var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>"
  var strCLodopInstall = "<br><font color='#FF00FF'>CLodop云打印服务(localhost本地)未安装启动!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行安装</a>,安装后请刷新页面。</font>"
  var strCLodopUpdate = "<br><font color='#FF00FF'>CLodop云打印服务需升级!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>,升级后请刷新页面。</font>"
  var LODOP
  try {
    var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0)
    if (needCLodop()) {
      try {
        LODOP = getCLodop()
      } catch (err) {

      }
      if (!LODOP && document.readyState !== 'complete') {
        alert('C-Lodop没准备好，请稍后再试！')
        return
      }
      if (!LODOP) {
        if (isIE) {
          document.write(strCLodopInstall)
        } else {
          document.documentElement.innerHTML = strCLodopInstall + document.documentElement.innerHTML
          return
        }
      } else {
        if (CLODOP.CVERSION < '2.1.0.2') {
          if (isIE) {
            document.write(strCLodopUpdate)
          } else {
            document.documentElement.innerHTML = strCLodopUpdate + document.documentElement.innerHTML
          }
        }
        if (oEMBED && oEMBED.parentNode) {
          oEMBED.parentNode.removeChild(oEMBED)
        }
        if (oOBJECT && oOBJECT.parentNode) {
          oOBJECT.parentNode.removeChild(oOBJECT)
        }
      }
    } else {
      var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0)
      //    ====如果页面有Lodop就直接使用，没有则新建:=========
      if (oOBJECT !== undefined || oEMBED !== undefined) {
        if (isIE) {
          LODOP = oOBJECT
        } else {
          LODOP = oEMBED
        }
      } else if (CreatedOKLodop7766 === null) {
        LODOP = document.createElement('object')
        LODOP.setAttribute('width', 0)
        LODOP.setAttribute('height', 0)
        LODOP.setAttribute('style', 'position:absoluteleft:0pxtop:-100pxwidth:0pxheight:0px')
        if (isIE) {
          LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA')
        } else {
          LODOP.setAttribute('type', 'application/x-print-lodop')
        }
        document.documentElement.appendChild(LODOP)
        CreatedOKLodop7766 = LODOP
      } else {
        LODOP = CreatedOKLodop7766
      }
      //    ====Lodop插件未安装时提示下载地址:=========
      if ((LODOP === null) || (typeof (LODOP.VERSION) === 'undefined')) {
        if (navigator.userAgent.indexOf('Chrome') >= 0) {
          document.documentElement.innerHTML = strHtmChrome + document.documentElement.innerHTML
        }
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
          document.documentElement.innerHTML = strHtmFireFox + document.documentElement.innerHTML
        }
        if (is64IE) {
          document.write(strHtm64Install)
        } else if (isIE) {
          document.write(strHtmInstall)
        } else {
          document.documentElement.innerHTML = strHtmInstall + document.documentElement.innerHTML
        }
        return LODOP
      }
    }
    if (LODOP.VERSION < '6.2.1.7') {
      if (needCLodop()) {
        document.documentElement.innerHTML = strCLodopUpdate + document.documentElement.innerHTML
      } else if (is64IE) {
        document.write(strHtm64Update)
      } else if (isIE) {
        document.write(strHtmUpdate)
      } else {
        document.documentElement.innerHTML = strHtmUpdate + document.documentElement.innerHTML
      }
      return LODOP
    }
    // 如下空白位置适合调用统一功能(如注册语句、 语言选择等):
    return LODOP
  } catch (err) {
    alert('getLodop出错:' + err)
  }
}
