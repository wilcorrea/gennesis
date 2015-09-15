/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

ace.define('ace/theme/netbeans', ['require', 'exports', 'module' , 'ace/lib/dom'], function(require, exports, module) {


exports.isDark = false;
exports.cssText = 
".ace-netbeans .ace_gutter { " +
"    background: #ebebeb; " +
"    border-right: 1px solid #ccc; " +
"    color: rgb(136, 136, 136); " +
"  } " +
" " +
"  .ace-netbeans .ace_print-margin { " +
"    width: 1px; " +
"    background: #ebebeb; " +
"  } " +
" " +
"  .ace-netbeans { " +
"    background-color: #FFFFFF; " +
"  } " +
" " +
"  .ace-netbeans .ace_fold { " +
"    background-color: rgb(60, 76, 114); " +
"  } " +
" " +
"  .ace-netbeans .ace_cursor { " +
"    color: black; " +
"  } " +
" " +
"  .ace-netbeans .ace_storage { " +
"    /*background: rgb(181, 213, 255);*/ " +
"  } " +
" " +
"  .ace-netbeans .ace_keyword, .ace-netbeans .ace_constant.ace_language { " +
"    color: rgb(0, 0, 255); " +
"    font-weight: bold; " +
"  } " +
" " +
"  .ace-netbeans .ace_identifier { " +
"   color: rgb(0, 0, 0); " +
"  } " +
" " +
"  .ace-netbeans .ace_keyword.ace_operator { " +
"    color: rgb(0, 0, 0); " +
"    font-weight: bold; " +
"  } " +
" " +
"  .ace-netbeans .ace_variable { " +
"    color: rgb(109, 50, 6); " +
"  } " +
" " +
"  .ace-netbeans .ace_constant.ace_buildin { " +
"    color: rgb(0, 0, 0); " +
"  } " +
" " +
"  .ace-netbeans .ace_function { " +
"    color: rgb(150, 10, 10); " +
"    font-weight: bold; " +
"  } " +
" " +
"  .ace-netbeans .ace_string { " +
"    color: rgb(206,123,0); " +
"  } " +
" " +
"  .ace-netbeans .ace_comment { " +
"    color: rgb(150, 150, 150); " +
"  } " +
" " +
"  .ace-netbeans .ace_comment.ace_doc { " +
"    color: rgb(150, 150, 150); " +
"  } " +
" " +
"  .ace-netbeans .ace_comment.ace_doc.ace_tag { " +
"    color: rgb(150, 150, 150); " +
"    font-weight: bold; " +
"  } " +
" " +
"  .ace-netbeans .ace_constant.ace_numeric { " +
"    color: rgb(255,0,255); " +
"  } " +
" " +
"  .ace-netbeans .ace_type { " +
"    color: rgb(0, 0, 0); " +
"  } " +
" " +
"  .ace-netbeans .ace_xml-pe { " +
"    color: rgb(104, 104, 91); " +
"  } " +
" " +
"  .ace-netbeans .ace_marker-layer .ace_selection { " +
"    background: rgb(181, 213, 255); " +
"  } " +
" " +
"  .ace-netbeans .ace_bracket.ace_start { " +
"    font-weight: bold; " +
"  } " +
" " +
"  .ace-netbeans .ace_marker-layer .ace_bracket { " +
"    margin: -1px 0 0 -1px; " +
"    border: 1px solid rgb(192, 192, 192); " +
"    background: yellow; " +
"  } " +
" " +
"  .ace-netbeans .ace_meta.ace_tag { " +
"    color:rgb(0, 0, 230); " +
"  } " +
" " +
"  .ace-netbeans .ace_tag { " +
"    /*color: rgb(0, 0, 0);*/ " +
"  } " +
" " +
"  .ace-netbeans .ace_invisible { " +
"    color: #ddd; " +
"  } " +
" " +
"  .ace-netbeans .ace_entity.ace_other.ace_attribute-name { " +
"    color: rgb(0,153,0); " +
"  } " +
" " +
"  .ace-netbeans .ace_constant.ace_language.ace_escape { " +
"    color: rgb(30,30,30); " +
"    font-weight: bold; " +
"  } " +
" " +
"  .ace-netbeans .ace_marker-layer .ace_step { " +
"    background: rgb(255, 255, 0); " +
"  } " +
" " +
"  .ace-netbeans .ace_marker-layer .ace_active-line { " +
"    background: rgb(232, 242, 254); " +
"  } " +
" " +
"  .ace-netbeans .ace_marker-layer .ace_selected-word { " +
"    border: 1px solid rgb(181, 213, 255); " +
"  } " +
" " +
"  .ace-netbeans .ace_php_tag { " +
"    font-weight: bold; " +
"  } " +
" " +
"  .ace-netbeans .ace_storage { " +
"    color: rgb(0, 0, 255); " +
"    font-weight: bold; " +
"  } " +
" " +
"  .ace-netbeans .ace_indent-guide { " +
"    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==') right repeat-y; " +
"  }";

exports.cssClass = 'ace-netbeans';

var dom = require('../lib/dom');
dom.importCssString(exports.cssText, exports.cssClass);
});
