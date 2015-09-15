(function() {
  'use strict';

  app

  .controller('MenuCtrl', ['$scope', 'FileFactory', function($scope, FileFactory) {

      var remote = require('remote');
      var Menu = remote.require('menu');
      var MenuItem = remote.require('menu-item');


      window.addEventListener('contextmenu', function (e) {

        e.preventDefault();

        var type = ''
          , $target = jQuery(e.target)
          , id = null
          , text = null
          , $node = null
          , $_tree = null
          , map = {
             'file': {
                'element': 'jstree-custom-file'
              , 'child': '.jstree-custom-file'
              , 'parent': '.none'
            }
            , 'folder': {
                'element': 'jstree-custom-folder'
              , 'child': '.jstree-custom-folder'
              , 'parent': '.none'
            }
            , 'editor': {
                'element': 'ace_text-input'
              , 'child': '.ace_text-input'
              , 'parent': '.none'
            }
            , 'tab': {
                'element': 'md-tab'
              , 'child': '.md-label'
              , 'parent': '.md-tab'
            }
            ,'preview': {
                'element': 'preview-webview'
              , 'child': '.none'
              , 'parent': '.none'
            }
          };

        for (var _type in map) {
          if ($target.hasClass(map[_type].element) || $target.find(map[_type].child).length || $target.closest(map[_type].parent).length) {
            type = _type;
          }
        }

        var menu = new Menu()
          , _items = [];

        switch(type) {

          case 'file':
            //{

            id = $target.closest('li').attr('id');
            $node = jQuery('[id="' + id + '"]');
            $_tree = $node.closest('js-tree').jstree(true);
            text = $target.closest('li').text();

            _items = [
              {
                label: 'Open', click: function(_item) {

                  var _host = jQuery('[id="' + id + '"]').closest('js-tree').attr('file-host');

                  FileFactory.get(id, host).then(function(response) {

                    var _file = response.data;
                      if (typeof _file == 'object') {
                      _file = JSON.stringify(_file, undefined, 2);
                    }
                    var path = require('path')
                      , ext = path.extname(id)
                      , _mode = ext.substring(1);

                    $scope.addTab(id, text, _file, _mode, _host);
                  });
                }
              }
              , {
                label: 'Copy', click: function(_item) {
                  
                }
              }
              , '-'
              , {
                label: 'Rename', click: function(_item) {

                  var node = $_tree.get_node(id);

                  if (node) {
                    $_tree.edit(node);
                  }
                }
              }
              , {
                label: 'Trash', click: function(_item) {

                  var node = $_tree.get_node(id);

                  if (node) {

                    $scope.confirm('Trash', 'Are you sure what we can delete "' + node.text + '"?', 'Yep', function() {
                      
                      FileFactory.rm(id, function(response) {
      
                        if (response.data.status) {
                          $_tree.delete_node(node);
                          $scope.toast('File removed "' + node.text + '"');
                        }
                      }, jQuery('[id="' + id + '"]').closest('js-tree').attr('file-host'));
                    });
                  }
                }
              }
            ];
            //}
            break;

          case 'folder':
            //{

            id = $target.closest('li').attr('id');
            $node = jQuery('[id="' + id + '"]');
            $_tree = $node.closest('js-tree').jstree(true);
            text = $target.closest('li').text();

            _items = [
              {
                label: 'Search', click: function(_item) {
                  
                }
              }
              ,{
                label: 'Refresh', click: function(_item) {
                  
                  var node = $_tree.get_node(id);
                    
                  if (node) {
                    $_tree.refresh_node(node);
                  }
                }
              } 
              , '-'
              , {
                label: 'New File', click: function(_item) {

                  var path = id, node = null, _id = '', _file = '';

                  if (path) {

                    $scope.popup(e, 'input', 'New File', 'Give a new Name to file', '', 'Yep', function(name) {

                      if (name) {
    
                        _id = path + '/' + name;

                        FileFactory.set(_id, _file, function(response) {

                          if (response.data.status) {

                            node = $_tree.create_node(path, {
                              "id": _id,
                              "text": name,
                              "icon" : 'jstree-custom-file',
                              "state": {
                                "opened": false,
                                "disabled": false,
                                "selected": false
                              },
                              "li_attr": {
                                "base":  _id,
                                "isLeaf": true
                              },
                              "children": false
                            });

                            $_tree.refresh_node(path);
                            $_tree.select_node(_id);

                            $scope.toast('File created "' + name + '"');
                          }
                        }, jQuery('[id="' + path + '"]').closest('js-tree').attr('file-host'));
                      }
                    });//, confirm, _confirm, cancel, _cancel

                  }
                }
              }
              , {
                label: 'New Folder', click: function(_item) {

                  var path = id, node = null, _id = '', _file = '';

                  if (path) {

                    $scope.popup(e, 'input', 'New Folder', 'Give a new Name to folder', '', 'Yep', function(name) {

                      if (name) {
    
                        _id = path + '/' + name;

                        FileFactory.mkdir(_id, function(response) {

                          if (response.data.status) {

                            node = $_tree.create_node(path, {
                              "id": _id,
                              "text": name,
                              "icon" : 'jstree-custom-folder',
                              "state": {
                                "opened": false,
                                "disabled": false,
                                "selected": false
                              },
                              "li_attr": {
                                "base":  _id,
                                "isLeaf": false
                              },
                              "children": true
                            });

                            $_tree.refresh_node(path);
                            $_tree.select_node(_id);

                            $scope.toast('Folder created "' + name + '"');
                          }
                        }, jQuery('[id="' + path + '"]').closest('js-tree').attr('file-host'));
                      }
                    });//, confirm, _confirm, cancel, _cancel

                  }
                }
              }
              , '-'
              , {
                label: 'Rename', click: function(_item) {

                  var node = $_tree.get_node(id);

                  if (node) {
                    $_tree.edit(node);
                  }
                }
              }
              , {
                label: 'Trash', click: function(_item) {

                  var node = $_tree.get_node(id);

                  if (node) {

                    $scope.confirm('Trash', 'Are you sure what we can delete "' + node.text + '"?', 'Yep', function() {
                      
                      FileFactory.rm(id, function(response) {
      
                        if (response.data.status) {
                          $_tree.delete_node(node);
                          $scope.toast('File removed "' + node.text + '"');
                        }
                      }, jQuery('[id="' + id + '"]').closest('js-tree').attr('file-host'));
                    });
                  }
                }
              }
            ];
            //}
            break;

          case 'editor':
            //{

            id = $target.closest('.md-editor').attr('file-id');

            _items = [
              {
                label: 'Format', click: function(_item) {
                  $scope.format(id);
                }}
              , {
                label: 'Refactor', click: function(_item) {
                  
                }
              }
              , {
                label: 'Download', click: function(_item) {
                  $scope.download(id);
                }
              }
              , '-'
              , {
                label: 'Copy', click: function(_item) {
                  
                }
              }
              , {
                label: 'Paste', click: function(_item) {
                  
                }
              }
              , {
                label: 'Cut', click: function(_item) {
                  
                }
              }
            ];
            //}
            break;

          case 'tab':
            //{

            id = $target.attr('file-id') ? $target.attr('file-id') : $target.find('label').attr('file-id');

            _items = [
              {
                label: 'Close', click: function(_item) {

                  $scope.removeTab($scope.getTab(id));
                }}
              , {
                label: 'Close All', click: function(_item) {

                  var tabs = $scope.getTab();
                  for (var i = tabs.length - 1; i >= 0; i--) {
                    $scope.removeTab(tabs[i]);
                  }
                }
              }
              , {
                label: 'Close Others', click: function(_item) {

                  var tabs = $scope.getTab();
                  for (var i = tabs.length - 1; i >= 0; i--) {
                    if (tabs[i].id !== id) {
                      $scope.removeTab(tabs[i]);
                    }
                  }
                }
              }
              , '-'
              , {
                label: 'Download', click: function(_item) {
                  $scope.download(id);
                }
              }
              , '-'
              , {
                label: 'Rename', click: function(_item) {
                  
                }
              }
              , {
                label: 'Trash', click: function(_item) {

                  var node = $_tree.get_node(id);

                  if (node) {

                    $scope.confirm('Trash', 'Are you sure what we can delete "' + node.text + '"?', 'Yep', function() {
                      
                      FileFactory.rm(id, function(response) {
      
                        if (response.data.status) {
                          $_tree.delete_node(node);
                          $scope.toast('File removed "' + node.text + '"');
                        }
                      }, jQuery('[id="' + id + '"]').closest('js-tree').attr('file-host'));
                    });
                  }
                }
              }
            ];
            //}
            break;

          case 'preview':
            //{

            id = $target.attr('id');
            var preview = document.getElementById(id);

            _items = [
              {
                label: 'Reload', click: function(_item) {
                  preview.reload();
                }
              }
              , {
                label: 'Forced Reload', click: function(_item) {
                  preview.reloadIgnoringCache();
                }
              }
              , '-'
              , {
                label: 'Back', click: function(_item) {
                  preview.goBack();
                }
              }
              , {
                label: 'Forward', click: function(_item) {
                  preview.goForward();
                }
              }
            ];
            //}
            break;
        }

        if (app.debug === 'menu')
          console.log(id, type, e.target);

        if (_items.length) {

          _items.push('-');
        }

        _items.push({
          label: 'Reload'
          , click: function(_item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.reload();
            }
          }
        );

        _items.push('-');

        _items.push({
          label: 'Tools'
          , click: function(_item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.toggleDevTools();
            }
          }
        );
        _items.push({
          label: 'Toggle Drawer Fixed'
          , click: function(_item, focusedWindow) {
              $scope.drawer.fixed = !$scope.drawer.fixed;
              $scope.drawer.hide();
            }
          }
        );

        angular.forEach(_items, function(__item, i) {

          if (__item === '-') {

            menu.append(new MenuItem({type: 'separator' }));
          } else {

            var menuItem = new MenuItem({
                label: __item.label, click: __item.click
              }
            );

            menu.append(menuItem);
          }
        });

        menu.popup(remote.getCurrentWindow());

      }, false);

    }
  ]);

}());