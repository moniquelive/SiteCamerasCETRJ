/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('cameras', {
    title: 'Câmeras da CET-RIO (CET-RJ) em tempo real. Condições do trânsito ao vivo gratuitamente',
    is_chrome: req.headers['user-agent'].match('Chrome')
  });
};
