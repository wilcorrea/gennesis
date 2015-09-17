(function() {

  'use strict';

  window.path = require('path');

  global.__isLinux = /^linux/.test(process.platform);
  global.__isWin = /^win/.test(process.platform);
  global.__isMac = /^darwin/.test(process.platform);

  if (__isLinux) {
    global.__root = (__filename).replace(path.resolve('node_modules','electron-prebuilt','dist','resources','atom.asar','renderer','lib','init.js'), '');
  }

  if (__isMac) {
    global.__root = (__filename).replace(path.resolve('node_modules','electron-prebuilt','dist','Electron.app','Contents','Resources','atom.asar','renderer','lib','init.js'), '');
  }

  window.
    config = {
      host: 'http://localhost:4477',
      format: {
        "indent_size": 2,
        "indent_char": " ",
        "eol": "\n",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "jslint_happy": false,
        "space_after_anon_function": true,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "break_chained_methods": true,
        "eval_code": false,
        "unescape_strings": false,
        "wrap_line_length": 0,
        "wrap_attributes": "auto",
        "wrap_attributes_indent_size": 2,
        "end_with_newline": true
      }

    /**
     *
     * @param mode
     */
    ,
    loading: function(mode) {

      var $load = jQuery('md-progress-circular');

      if (typeof mode === 'undefined') {
        $load.toggle();
      } else {
        switch (mode) {
          case 'show':
            $load.show();
            break;
          case 'hide':
            $load.hide();
            break;
        }
      }
    }
  };


  window.app = angular

    .module('MyApp', ['ngMaterial', 'ngMessages', 'jsTree.directive', 'ui.ace' /*, 'ngDraggable', 'as.sortable'*/ ])

    .run(function($templateCache) {
  
      angular.forEach(assets, function(value, key) {
        $templateCache.put(key, value);
      });
  
      jQuery(window)
        .resize(function() {
          app.resize();
        });
  
    })

    .config(['$httpProvider', function($httpProvider) {
  
      $httpProvider.defaults.withCredentials = true;
    }])

    .directive('ngEnter', function() {

      return function(scope, element, attrs) {

        element.bind("keydown keypress", function(event) {

          if(event.which === 13) {
            scope.$apply(function(){
              scope.$eval(attrs.ngEnter);
            });

            event.preventDefault();
          }
        });
      };
    })

    .directive('ngEnterPreview', function() {
      return function(scope, element, attrs) {

        element.bind("keydown keypress", function(event) {
          var keyCode = event.which || event.keyCode;

          // If enter key is pressed
          if (keyCode === 13) {
            document.getElementById('preview').src = element[0].value;
            event.preventDefault();
          }
        });
      };
    })

    .directive('ngDragTab', function() {
  
      return function(scope, element) {
  
        var el = element[0];
  
        el.draggable = true;
  
        el.addEventListener(
          'dragover',
          function(e) {
            e.preventDefault();
            return false;
          },
          false
        );
  
        el.addEventListener(
          'dragstart',
          function(e) {
            config.transfer = el;
            return false;
          },
          false
        );
      };
    })
  
    .directive('ngDropTab', function() {
      return {
        restrict: 'EA',
        scope: {
          drop: '&'
        },
        link: function(scope, element) {
  
          var el = element[0];
  
          el.addEventListener(
            'drop',
            function(e) {
  
              e.preventDefault();
  
              var $target = jQuery(e.target),
                $source = jQuery(config.transfer),
                target = $target.attr('file-id') ? $target.attr('file-id') : $target.find('label').attr('file-id'),
                source = $source.attr('file-id') ? $source.attr('file-id') : $source.find('label').attr('file-id');
  
              scope.$parent.drop(source, target);
  
              return false;
            },
            false
          );
        }
      };
    })
  
    .directive("ngDrawerResize", function($document) {
  
      return function($scope, $element, $attr) {
  
        var resizeDrawer = function($event) {
  
          //console.log($event.pageX);
          $scope.drawer.width = $event.pageX - 7;
          $scope.$apply();
        };
  
        $element.on("mousedown", function() {
  
          $document.on("mousemove", mousemove);
          $document.on("mouseup", mouseup);
  
          function mousemove($event) {
            event.preventDefault();
            resizeDrawer($event);
          }
  
          function mouseup() {
            $document.off("mousemove", mousemove);
            $document.off("mouseup", mouseup);
          }
        });
  
      };
    })

    .controller('AppCtrl', function($scope, $mdDialog, $mdToast, $sce, $log, Storage, FileFactory) {
  
      /**
       *
       * hide
       */
      config.loading();
  
      /**
       *
       * init $scope
       */
      $scope.tabs = [
        //{ title: 'Welcome', file: "Oh boy, welcome"}
      ];
  
      $scope.__themes = ['red', 'blue'];
      $scope.path = path;
  
      $scope.title = 'File Manager';
      $scope.theme = Storage.get('theme', 'blue');
      $scope.host = 'http://localhost:4477';
      //$scope.url = 'https://siga.fagoc.br';
      $scope.url = 'http://gennesis.io/run';
      $scope.webview = $sce.trustAsResourceUrl($scope.url);
  

      $scope.preview = false;

      var preview = document.getElementById("preview");
      preview.addEventListener("did-start-loading", function() {
        jQuery('#preview-loading').show();
      });
      preview.addEventListener("did-stop-loading", function() {
        jQuery('#preview-loading').hide();
      });
  
      $scope.drawer = {
        fixed: Storage.get('drawer.fixed', true),
        width: Storage.get('drawer.width', 310),
        dom: angular.element(document.querySelector('.mdl-layout__drawer')),
        hide: function() {
          $scope.drawer.dom.removeClass('is-visible');
        }
      };
  
      $scope.__index = {};
  
      $scope.__selectedIndex = 0;
  
      $scope.$watch('drawer.fixed', function(newValue, oldValue) {
        Storage.set('drawer.fixed', newValue);
      });
  
      $scope.$watch('drawer.width', function(newValue, oldValue) {
        Storage.set('drawer.width', newValue);
      });
  
      $scope.__projects = [
          {
          id: 4,
          name: 'Gennesis Interface',
          host: 'http://localhost:4477',
          path: '/home/william/Documentos/HTML5/gennesis/',
          dir: 'www'
        }
        , {
          id: 1,
          name: 'File Manager Client',
          host: 'http://localhost:4477',
          path: '/home/william/Documentos/HTML5/gennesis/plugins/file/',
          dir: 'client'
        }
        , {
          id: 5,
          name: 'Gennesis Electron',
          host: 'http://localhost:4477',
          path: '/home/william/Documentos/HTML5/',
          dir: 'gennesis'
        }
        , {
          id: 2,
          name: 'File Manager Server',
          host: 'http://localhost:4477',
          path: '/home/william/Documentos/HTML5/gennesis/plugins/file/',
          dir: 'server'
        }
        , {
          id: 3,
          name: 'Synchronize',
          host: 'http://localhost:4477',
          path: '/home/william/Documentos/JAVA/',
          dir: 'synchronize'
        }
        , {
          id: 6,
          name: 'Ionic',
          host: 'http://localhost:4477',
          path: '/home/william/Documentos/HTML5/',
          dir: 'ionic'
        }
        , {
          id: 1,
          name: 'ti',
          host: 'http://arraysoftware.in:7744',
          path: '/var/www/gennesis.io/public_html/run/',
          dir: 'ti'
        }
        , {
            id: 1
          , name: 'Siga'
          , host: 'http://teste.fagoc.br:7744'
          , path: '/srv/www/htdocs/'
          , dir: 'siga'
        }
        /*
        , {
            id: 4
          , name: 'Siga-1'
          , host: 'http://teste.fagoc.br:7744'
          , path: '/srv/www/htdocs/'
          , dir: 'siga-1'
        }
        , {
            id: 2
          , name: 'Manager'
          , host: 'http://teste.fagoc.br:7744'
          , path: '/srv/www/htdocs/'
          , dir: 'manager'
        }
        ,{
            id: 3
          , name: 'Suporte'
          , host: 'http://teste.fagoc.br:7744'
          , path: '/srv/www/htdocs/'
          , dir: 'suporte'
        }
        */
      ];
  
      var open = Storage.get('tab.open');
  
      angular.forEach(open, function(t) {
  
        config.loading('show');
        FileFactory.get(t.id, t.project.split('#')[0]).then(function(response) {
  
          var _file = response.data
            , _mode = path.extname(t.id).substring(1);
  
          if (typeof _file == 'object') {
            _file = JSON.stringify(_file, undefined, 2);
          }
  
          config.loading('hide');
  
          $scope.addTab(t.project, t.id, t.text, _file, _mode, t.ft);
        });
      });
  
      /**
       *
       * @param title
       * @param content
       * @param ok
       * @param _ok
       * @param cancel
       * @param _cancel
       */
      $scope.confirm = function(title, content, ok, _ok, cancel, _cancel) {
  
        var confirm = $mdDialog.confirm()
          .title(title)
          .content(content)
          .ok(ok ? ok : 'Ok')
          .cancel(cancel ? cancel : 'Cancel');
  
        $mdDialog.show(confirm)
          .then(
            function() {
              try {
                _ok.call(this);
              } catch (e) {
  
              }
            },
            function() {
              try {
                _cancel.call(this);
              } catch (e) {
  
              }
            }
          );
      };
  
      /**
       *
       * @param ev
       * @param title
       * @param content
       * @param confirm
       * @param _confirm
       * @param cancel
       * @param _cancel
       */
      $scope.popup = function(ev, type, title, content, input, confirm, _confirm, cancel, _cancel) {
  
        $mdDialog.show({
            controller: function($scope, $mdDialog) {
  
              $scope.dialog = {
                title: title,
                content: content,
                type: type,
                confirm: confirm ? confirm : 'Ok',
                cancel: cancel ? cancel : 'Cancel'
              };
  
              $scope.hide = function() {
                $mdDialog.hide();
              };
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.answer = function(answer, _input) {
                $mdDialog.hide(answer);
                if (answer === 'confirm') {
                  try {
                    _confirm.call(this, _input);
                  } catch (e) {
  
                  }
                }
              };
            },
            templateUrl: '/partials/popup.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
          })
          .then(function(answer) {
  
            //$scope.status = 'You said the information was "' + answer + '".';
          }, function() {
  
            //$scope.status = 'You cancelled the dialog.';
          });
  
      };
  
      /**
       *
       * @param title
       * @param content
       */
      $scope.alert = function(title, content, ok) {
  
        $mdDialog.show($mdDialog.alert().parent(angular.element(document.body)).clickOutsideToClose(true).title(!content ? $scope.title : title).content(content ? content : title).ok(ok ? ok : 'Ok'));
      };
  
      /**
       *
       * @param _id
       */
      $scope.getTab = function(_id) {
  
        var _t = $scope.tabs;
        if (_id) {
          _t = $scope.tabs[$scope.__index[_id]];
        }
        return _t;
      };
  
      /**
       *
       * @param _project
       * @param _id
       * @param _title
       * @param _file
       * @param _mode
       * @param _ft
       * @param _line
       */
      $scope.addTab = function(_project, _id, _title, _file, _mode, _ft, _line) {
  

        if (typeof $scope.__index[_id] !== 'undefined') {

          $scope.__selectedIndex = $scope.__index[_id];

          var el = $('#__selectedIndex');
          var scope = angular.element(el[0]).scope();

          try {

            if (typeof _line === 'undefined') {
              scope.$apply(function() {
                scope.__selectedIndex = $scope.__index[_id];
              });
            } else {
              $scope.__selectedIndex = $scope.__index[_id];
            }

          } catch (e) {
            
          }

          //console.log('__selectedIndex', $scope.__selectedIndex);

        } else {

          var not = ['ico', 'zip']
            , image = ['png', 'jpg', 'gif', 'jpeg']
            , alias = {'js':'javascript', 'htaccess':'ini', 'soap':'php', 'sql':'mysql'}
            , standard = ['abap','abc','actionscript','ada','apache_conf','asciidoc','assembly_x86','autohotkey','batchfile','c_cpp','c9search','cirru','clojure','cobol','coffee','coldfusion','csharp','css','curly','d','dart','diff','dockerfile','dot','dummy','dummysyntax','eiffel','ejs','elixir','elm','erlang','forth','ftl','gcode','gherkin','gitignore','glsl','golang','groovy','haml','handlebars','haskell','haxe','html','html_ruby','ini','io','jack','jade','java','javascript','json','jsoniq','jsp','jsx','julia','latex','lean','less','liquid','lisp','livescript','logiql','lsl','lua','luapage','lucene','makefile','markdown','mask','matlab','maze','mel','mushcode','mysql','nix','objectivec','ocaml','pascal','perl','pgsql','php','powershell','praat','prolog','properties','protobuf','python','r','rdoc','rhtml','ruby','rust','sass','scad','scala','scheme','scss','sh','sjs','smarty','snippets','soy_template','space','sql','sqlserver','stylus','svg','tcl','tex','text','textile','toml','twig','typescript','vala','vbscript','velocity','verilog','vhdl','xml','xquery','yaml','django'];

          _mode = _mode.toLowerCase();

          if (not.indexOf(_mode) !== -1) {

            $scope.alert('Not suported yet "' + _title + '"');
    
          } else if (image.indexOf(_mode) !== -1) {
    
            $scope.alert('Soon we will open images like "' + _title + '"');
    
          } else {

            if (alias[_mode]) {

              _mode = alias[_mode];

            } else if (standard.indexOf(_mode) === -1) {

              _mode = 'text';
            }


            var add = $scope.tabs.push({
              project: _project,
              ft: _ft,
              id: _id,
              title: _title,
              file: _file,
              mode: _mode,
              loaded: false,
              edited: false,
              disabled: false,
              _line: _line
            });
    
            $scope.__index[_id] = add - 1;
    
            var open = [];
            angular.forEach($scope.tabs, function(_tab, key) {
              open.push({
                i: key
                , project: _tab.project
                , id: _tab.id
                , text: _tab.title
                , ft: _tab.ft
              });
            });
            Storage.set('tab.open', open);
          }

        }

        if (jQuery('#preview-switch').attr('aria-checked') === 'true') {
          jQuery('#preview-switch').click();
        }

        if (jQuery('#search-switch').attr('aria-checked') === 'true') {
          jQuery('#search-switch').click();
        }
        
        if (typeof _line !== 'undefined') {
          if (typeof $scope.tabs[$scope.__index[_id]].editor !== 'undefined') {
            $scope.tabs[$scope.__index[_id]].editor.gotoLine(_line, 0);
          }
        }

        $scope.drawer.hide();
      };
  
      /**
       *
       * @param tab
       */
      $scope.removeTab = function(tab) {
  
        var remove = function() {
  
          $scope.__index = {};
  
          var i = $scope.tabs.indexOf(tab),
            open = [];
          $scope.tabs.splice(i, 1);
  
          angular.forEach($scope.tabs, function(_tab, key) {
            $scope.__index[_tab.id] = key;
            open.push({
              i: key
              , project: _tab.project
              , id: _tab.id
              , text: _tab.title
              , ft: _tab.ft
            });
          });
  
          Storage.set('tab.open', open);
        };
  
        if (tab.edited) {
  
          $scope.confirm('Close Tab', 'Are you sure what we can close this tab without save?', 'Close', remove);
        } else {
  
          remove();
        }
  
      };
  
      /**
       *
       * @param _id
       */
      $scope.format = function(_id) {
  
        //https://github.com/beautify-web/js-beautify
  
        var tab = $scope.tabs[$scope.__index[_id]];
        if (tab) {
  
          var js = require('js-beautify').js;
  
          if (tab.mode === 'javascript') {
  
            tab.file = (js(tab.file, config.format));
          } else {
  
            $scope.alert('The mode "' + tab.mode + '" is not suported yet');
          }
  
        }
      };
  
      /**
       *
       * @param _id
       */
      $scope.download = function(_id) {
  
        //https://github.com/beautify-web/js-beautify
  
        var tab = $scope.tabs[$scope.__index[_id]];
        if (tab) {
  
          download(tab.file, tab.title, "text/plain");
        }
      };
  
  
      var position = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
  
      $scope.toastPosition = angular.extend({}, position);
  
      /**
       *
       */
      $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) {
            return $scope.toastPosition[pos];
          })
          .join(' ');
      };
  
      /**
       *
       * @param title
       * @param action
       */
      $scope.toast = function(title, action) {
  
        var toast = $mdToast.simple()
          .content(title)
          .action(action ? action : 'x')
          .highlightAction(false)
          .hideDelay(10000)
          .position($scope.getToastPosition());
  
        $mdToast.show(toast)
          .then(function(response) {
            if (response == 'ok') {
              $mdToast.hide();
            }
          });
      };
  
      function sanitizePosition() {
        var current = $scope.toastPosition;
        if (current.bottom && position.top) current.top = false;
        if (current.top && position.bottom) current.bottom = false;
        if (current.right && position.left) current.left = false;
        if (current.left && position.right) current.right = false;
        position = angular.extend({}, current);
      }
  
      /**
       * @param source
       * @param target
       */
      $scope.drop = function(source, target) {
  
        var s = $scope.__index[source],
          t = $scope.__index[target];
  
        //$scope.tabs.move(s, t);
  
        if (t >= $scope.tabs.length) {
          var k = t - $scope.tabs.length;
          while ((k--) + 1) {
            $scope.tabs.push(undefined);
          }
        }
        $scope.tabs.splice(t, 0, $scope.tabs.splice(s, 1)[0]);
  
        var open = [];
  
        $scope.__index = {};
  
        angular.forEach($scope.tabs, function(_tab, key) {
          //console.log(_tab.id, key);
          open.push({
            i: key
            , project: _tab.project
            , id: _tab.id
            , text: _tab.title
            , ft: _tab.ft
          });
          $scope.__index[_tab.id] = key;
        });
  
        Storage.set('tab.open', open);
  
        $scope.$apply();
      };
  
      $scope.sProject = '';
      $scope.sHost = '';
      $scope.sFolder = '';
      $scope.sPath = '';
      $scope.sQuery = '';

      $scope.sResults = [];

      $scope.seachQuery = function() {
        
        var 
            _host = jQuery('[ng-model="sHost"]').val()
          , _folder = jQuery('[ng-model="sFolder"]').val()
          , _path = jQuery('[ng-model="sPath"]').val()
          , _query = jQuery('[ng-model="sQuery"]').val();

        FileFactory.search(_host, path.resolve(_folder, _path), _query, function(response){
          //console.log(response.data);
          $scope.sResults = response.data;
        });
      };

      /**
       * 
       * @param _project
       * @param _id
       * @param _text
       * @param _ft
       * @param _line
       */
      $scope.searchOpen = function(_project, _id, _text, _ft, _line) {

        config.loading('show');

        FileFactory.get(_id, _project.split('#')[0]).then(function(response) {
  
          var _file = response.data
            , _mode = path.extname(_id).substring(1);
  
          if (typeof _file == 'object') {
            _file = JSON.stringify(_file, undefined, 2);
          }
  
          config.loading('hide');
  
          $scope.addTab(_project, _id, _text, _file, _mode, _ft, _line);
        });
      };
      
      /**
       * 
       * @param _project
       */
      $scope.searchChange = function(_project) {

        angular.forEach($scope.__projects, function(_p) {
          /**
           * ,{
           *   id: 1
           * , name: 'Siga'
           * , host: 'http://teste.fagoc.br:7744'
           * , path: '/srv/www/htdocs/'
           * , dir: 'siga'
           * }
           */
          if (_project === _p.host + '#' + _p.id) {
            $scope.sHost = _p.host;
            $scope.sFolder = path.resolve(_p.path, _p.dir);
          }
        });
      };

    });

    app.resize = function() {
    jQuery('[ui-ace], result')
      .height(jQuery(window)
        .height() - 115);
  };

})();
