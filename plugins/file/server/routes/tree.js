/**
 * 
 * resolve tree requests
 */

module.exports = function(router) {

  var fs = require('fs');
  var path = require('path');

  /* Serve the Tree */
  router.get('/api/tree/:project', function(req, res) {

    var _p = ''
      , _n = ''
      , _t = '';

    if (req.query.id == 0) {

      switch(req.params.project) {
        case '1':
          _t = 'File Manager Client';
          _p = '/home/william/Documentos/HTML5/gennesis/plugins/file/';
          _n = 'client';
          break;
        case '2':
          _t = 'File Manager Server';
          _p = '/home/william/Documentos/HTML5/gennesis/plugins/file/';
          _n = 'server';
          break;
        case '3':
          _t = 'Synchronize';
          _p = '/home/william/Documentos/JAVA/';
          _n = 'synchronize';
          break;
        case '4':
          _t = 'Gennesis Interface';
          _p = '/home/william/Documentos/HTML5/gennesis/';
          _n = 'www';
          break;
        case '5':
          _t = 'Gennesis Electron';
          _p = '/home/william/Documentos/HTML5/';
          _n = 'gennesis';
          break;
        case '6':
          _t = 'Ionic';
          _p = '/home/william/Documentos/HTML5/';
          _n = 'ionic';
          break;
      }

      if (typeof __root !== 'undefined') {
        _p = __root;
      }

      processReq(_p, res, _n, _t);

    } else {

      if (req.query.id) {
        _p = req.query.id;
        processReq(_p, res);
      } else {
        res.json(['No valid data found']);
      }
    }
  });


  var BLACK_LIST = ['node_modules', '.git'];

  /**
   * 
   * @param _p
   * @param res
   * @param _n
   * @param _t
   */
  function processReq(_p, res, _n, _t) {
    
    var _dir = []
      , _file = []
      , _root = null;

    if (_n) {
      _root = processNode(_p, _n, true);
      _p = _p + '/' + _n;
    } 

    fs.readdir(_p, function(err, files) {

      if (files) {

        files.sort(function(a, b) {

          return a.toLowerCase() < b.toLowerCase() ? -1 : 1;

        }).forEach(function(name, key) {

          if (BLACK_LIST.indexOf(name) == -1) {

            var _n = processNode(_p, name);
    
            if (fs.statSync(path.join(_p + '/' + name)).isDirectory()) {
    
              _dir.push(_n);
            } else {
    
              _file.push(_n);
            }
          }
        });

        var all = _dir.concat(_file);
        if (_root) {
          _root.text = _t;
          _root.children = all;
          all = _root;
        }
        res.json(all);
      }
    });
  }

  /**
   * 
   * @param _p
   * @param f
   */
  function processNode(_p, f, u) {

    var s = fs.statSync(path.join(_p, f));

    return {
      "id": path.join(_p, f),
      "text": f,
      "icon": s.isDirectory() ? 'jstree-custom-folder' : 'jstree-custom-file',
      "type": s.isDirectory() ? 'folder' : 'file',
      "data": {"ft": s.mtime.getTime()},
      "state": {
        "opened": false,
        "disabled": false,
        "selected": false,
        "undetermined": u
      },
      "li_attr": {
        "base": path.join(_p, f),
        "isLeaf": !s.isDirectory()
      },
      "children": s.isDirectory()
    };
  }
  
  return router;
}
