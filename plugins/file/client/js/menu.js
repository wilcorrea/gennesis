  
var remote = require('remote')
  , ipc = require('ipc')
  , Menu = remote.require('menu');

var template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: 'Ctrl+Q',
        click: function() {
          ipc.send('app.quit');
        }
      },
      {
        label: 'Tools',
        accelerator: 'F12',
        click: function() {
          ipc.send('app.tools.open');
        }
      },
      {
        label: 'Refresh',
        accelerator: 'F5',
        click: function() {
          ipc.send('app.reload');
        }
      }
    ]
  },
  {
    label: 'Preview',
    submenu: [
      {
        label: 'Show',
        click: function() {
          ipc.send('preview.show');
        }
      }
      ,{
        label: 'Hide',
        click: function() {
          ipc.send('preview.hide');
        }
      }
      ,{
        label: 'Open',
        click: function() {
          var 
              drawer = +(jQuery('#drawer-width').val())
            , header = +(jQuery('.mdl-layout__header').height())
            , tabs = +(jQuery('md-tabs-wrapper').height())
            , top = window.screen.availTop
            , left = window.screen.availLeft
            , x = left + drawer + 30
            , y = top + header + 2
            , w = +(jQuery('md-content.md-default-theme').width())
            , h = +(jQuery('md-content.md-default-theme').height()) - top - 10;
          ipc.send('preview.open', 'http://www.google.com', x, y, w, h);
        }
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'About',
        click: function() {

        }
      }
    ]
  }];

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
//menu.items[1].submenu.items[0].enabled = false;
