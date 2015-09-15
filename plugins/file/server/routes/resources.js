/**
 * 
 * resolve resource requests
 */

module.exports = function(router) {

  var fs = require('fs');
  var path = require('path');

  /* get a File */
  router.get('/api/resource/get/:id', function(req, res) {
    res.send(fs.readFileSync(req.params.id, 'UTF-8'));
  });

  /* set a File */
  router.post('/api/resource/set/:id', function(req, res) {

    var response = {
      status: true,
      message: 'All right'
    };
    fs.writeFile(req.params.id, req.param('file', null), function(err) {
      if (err) {
        response.status = false;
        response.message = err;
      }
      res.send(response);
    });
  });

  /* create a Folder */
  router.post('/api/resource/mkdir/:id', function(req, res) {

    var response = {
      status: true,
      message: 'All right'
    };
    var mkdirp = require('mkdirp');
    mkdirp(req.params.id, function(err) {

      if (err) {
        response.status = false;
        response.message = err;
      }
      res.send(response);
    });
  });

  /* mv a File */
  router.post('/api/resource/mv/:source/:target', function(req, res) {

    var response = {
      status: true,
      message: 'All right'
    };
    fs.rename(req.params.source, req.params.target, function(err) {
      if (err) {
        response.status = false;
        response.message = err;
      }
      res.send(response);
    });
  });

  /* rm a File */
  router.post('/api/resource/rm/:id', function(req, res) {

    var response = {
      status: true,
      message: 'All right'
    };

    var fs = require('fs'),
      id = req.params.id;

    if (fs.statSync(id).isDirectory()) {

      var deleteFolderRecursive = function(p) {
        if (fs.existsSync(p)) {
          fs.readdirSync(p).forEach(function(file, index) {
            var curPath = p + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
              deleteFolderRecursive(curPath);
            } else { // delete file
              fs.unlinkSync(curPath);
            }
          });

          fs.rmdir(p, function(err) {
            if (err) {
              response.status = false;
              response.message = err;
            }
            res.send(response);
          });
        }
      };

      deleteFolderRecursive(id);

    } else {

      fs.unlink(id, function(err) {
        if (err) {
          response.status = false;
          response.message = err;
        }
        res.send(response);
      });
    }


  });


  /* search a String in a Folder */
  router.get('/api/resource/search/:id/:query', function(req, res) {

    var grep = require('simple-grep');
    grep(req.params.query, req.params.id, function(list){
      res.send(list);
    });
  });


  /* cp a File */
  router.post('/api/resource/cp/:source/:target', function(req, res) {

    var response = {
      status: true,
      message: 'All right'
    };
    fs.createReadStream(source).pipe(fs.createWriteStream(target)).on('end', function(err) {
      if (err) {
        response.status = false;
        response.message = err;
      }
      res.send(response);
    });

  });

  return router;
}