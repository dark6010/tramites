var qr = require('qr-image');

var qr_svg = qr.image('https://www.youtube.com/watch?v=c_Dxd0keXyk', { type: 'svg' });
qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));

//var svg_string = qr.imageSync('I love QR some no more!', { type: 'svg' });
console.log("sss")