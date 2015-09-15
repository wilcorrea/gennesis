(function() {

  'use strict';

  app

    .controller('TreeCtrl', ['$scope', 'FileFactory', function($scope, FileFactory) {
  
      /**
       * 
       * @object tree_core
       */
      $scope.tree_core = {
  
        multiple: false,
  
        draggable: false,
  
        check_callback: function(operation, node, node_parent, data, more) {
  
          if (operation === 'move_node') {
            return false;
          } else {
  
            //console.log(operation);
  
            switch (operation) {
  
              case 'rename_node':

                var source = node.id,
                  target = node_parent.id + '/' + data;

                FileFactory.mv(source, target, function(response) {

                  if (response.data.status) {

                    var $_tree = jQuery('js-tree').jstree(true);

                    $_tree.delete_node(node);

                    $_tree.create_node(node_parent.id, {
                      "id": target,
                      "text": data,
                      "icon": 'jstree-custom-file',
                      "state": {
                        "opened": false,
                        "disabled": false,
                        "selected": false
                      },
                      "li_attr": {
                        "base": target,
                        "isLeaf": true
                      },
                      "children": false
                    });

                    $_tree.refresh_node(node_parent.id);
                  }
                }, jQuery('[id="' + node.id + '"]').closest('js-tree').attr('file-host'));
                break;
            }
          }

          return true;
        }
      };

      /**
       * 
       * @param e
       * @param data
       */
      $scope.nodeSelected = function(e, data) {

        var _node = data.node
          , _host = jQuery('[id="' + _node.id + '"]').closest('js-tree').attr('file-host')
          , _project = jQuery('[id="' + _node.id + '"]').closest('js-tree').attr('file-project');

        if (_node.li_attr.isLeaf) {
  
          if (typeof $scope.__index[_node.id] !== 'undefined') {
  
            $scope.addTab(_project, _node.id);

          } else {

            config.loading('show');

            FileFactory.get(_node.id, _host).then(function(response) {

              var _file = response.data;
              if (typeof _file == 'object') {
                _file = JSON.stringify(_file, undefined, 2);
              }
              var path = require('path')
                , ext = path.extname(_node.id)
                , _mode = ext.substring(1);

              config.loading('hide');

              $scope.addTab(_project, _node.id, _node.text, _file, _mode, _node.data.ft);
            });

          }
        }
      };

    }])
  
    .controller('AceCtrl', ['$scope', 'FileFactory', function($scope, FileFactory) {
  
      $scope.aceLoaded = function(_ace) {
  
        app.resize();

        $scope._tab.loaded = true;
        $scope._tab.editor = _ace;

        var line = +($scope._tab._line);

        window.setTimeout(function() {
          _ace.gotoLine(line, 0);
        }, 500);

        _ace.setPrintMarginColumn(120);

        _ace.getSession().setTabSize(2);
        _ace.getSession();
        _ace.getSession().setUseSoftTabs(true);
  
        var _session = _ace.getSession(),
          _renderer = _ace.renderer;
  
        _ace.commands.addCommand({
          name: 'save',
          bindKey: {
            win: 'Ctrl-S',
            mac: 'Command-S'
          },
          exec: function(editor) {
            try {
  
              if ($scope._tab.id) {
  
                $scope._tab.edited = false;
  
                var title = $scope._tab.title,
                  host = $scope._tab.project.split('#')[0];
  
                config.loading('show');
  
                FileFactory.set($scope._tab.id, $scope._tab.file, function(response) {
  
                  if (response.data.status) {
  
                    config.loading('hide');
                    $scope.toast('File saved "' + title + '"');
                    _ace.original = $scope._tab.file;
                  }
                }, host);
              }
            } catch (e) {
              console.log(e);
            }
          }
        });
  
        // Options
        //_ace.setReadOnly(true);
        //_session.setUndoManager(new ace.UndoManager());
        //_renderer.setShowGutter(false);
  
        _ace.original = $scope._tab.file;
  
        _ace.on('input', function() {
  
          if (_ace.original !== $scope._tab.file) {
            $scope._tab.edited = true;
          } else {
            $scope._tab.edited = false;
          }
        });
  
        _ace.on("change", function(e) {
  
          var typed = 'programatically';
          if (_ace.curOp && _ace.curOp.command.name) {
            typed = 'typed';
          }
  
          if ($scope._tab.loaded) {
            $scope._tab.edited = true;
            //console.log("change", typed);
          }
        });
  
        $scope.modeChanged = function(mode) {
  
          _ace.getSession().setMode("ace/mode/" + mode.toLowerCase());
        };
      };
  
  
    }]);

}());

