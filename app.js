
var drop = require('component~drop-anywhere@0.7.0');
var Spinner = require('component~spinner@1.1.1')
var each = node('each-async');
// import remote from 'remote';
var remote = node('remote');
var request = node('superagent');


window.remote = remote;




// console.log("SPinner", Spinner);

// console.log("HELLO WORLD");


/**
 * Create spinner
 *
 * @api private
 */

function spin() {
    var w = document.body.offsetWidth;
    var h = document.body.offsetHeight;
    var s = new Spinner()
        .size(w / 4)
        .light();

    s.el.style.position = 'absolute';
    s.el.style.top = h / 2 - (w / 4) / 2 + 'px';
    s.el.style.left = w / 2 - (w / 4) / 2 + 'px';

    spin.remove = function () {
        document.body.removeChild(s.el);
    };

    document.body.appendChild(s.el);
    return s;
}


/**
 * Toggle display
 *
 * @param {Element} el
 * @api private
 */

function toggle(el) {
    el = document.querySelector(el);

    if (el.style.display === 'none') {
        el.style.display = 'block';
        return;
    }

    el.style.display = 'none';
}

/**
 * Run
 */

drop(function (e) {
  console.log("DROP DROP");
    e.preventDefault();
    var ret = [];
    toggle('#drop-anywhere');
    spin();

    each(e.items, function (item, i, done) {
      // do sth (err) =>
      ret.push(item);
      request
        .post('http://cmmc.xyz:8000/hello2')
        .end(function(err, res){
          // console.log(err, res);
          done();
        });

      console.log("EACH", i, item, "ret", ret);

    }, function (err) {
        if (err) {
            console.error(err);
            return;
        }

        spin.remove();
        toggle('#drop-anywhere');

        ret = [];
    });
});
