Inspired by <a href="https://github.com/Surye/mfp-keto-userscript">Surye/mfp-keto-userscript</a> to make this into a userscript.
<h1>Usage</h1>
<p>This userscript will add a new button to the diary screen that allows you to set macros by gram, escaping the 5% rounding.</p>
<p>Please note: These custom macros are cosmetic only, and will not be reflected anywhere else in MFP except the diary screen.</p>
<h1>Installation: </h1>
<ul>
<li><b>Chrome</b>: Drag <a href="../../raw/master/mfp-keto-macrograms.user.js">mfp-keto-macrograms.user.js</a> onto the <a href="chrome://extensions">chrome://extensions</a> page.</li>
<li><b>Safari</b>: Install <a href="https://tampermonkey.net/?ext=dhdg&browser=safari">Tampermonkey</a>.</li>
<li><b>Firefox</b>: Install <a href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/">Greasemonkey</a></li>
<li><b>Safari/Firefox: After installing the plugin, go to <a href="../../raw/master/mfp-keto-macrograms.user.js">mfp-keto-macrograms.user.js</a> to install.</b>
</ul>
<img src="../../raw/master/chrome_installation.gif" />

<h1>Upgrade:</h1>
<ul>
<li><b>Chrome</b>: Uninstall the extension at <a href="chrome://extensions">chrome://extensions</a> and reinstall using the instructions above.</li>
<li><b>Safari/Firefox</b>: Just visit <a href="../../raw/master/mfp-keto-macrograms.user.js">mfp-keto-macrograms.user.js</a> and click Upgrade.</li>
</ul>

<h1>Bookmarklet Installation:</h1>
<p>If you prefer not to have it running as a userscript you can install it as a bookmarklet.</p>
<ul>
<li>Drag <a href="javascript:void%20function(){var%20t=function(){var%20t=JSON.parse(localStorage.getItem(%22mfp-keto-goals%22));$(%22%23mfp-keto-carbs%22).val(t.carbs),$(%22%23mfp-keto-fat%22).val(t.fat),$(%22%23mfp-keto-protein%22).val(t.protein)},e=function(){var%20t=JSON.parse(localStorage.getItem(%22mfp-keto-goals%22));t.carbs=parseInt($(%22%23mfp-keto-carbs%22).val()),t.fat=parseInt($(%22%23mfp-keto-fat%22).val()),t.protein=parseInt($(%22%23mfp-keto-protein%22).val()),localStorage.setItem(%22mfp-keto-goals%22,JSON.stringify(t)),a()},a=function(){var%20t=JSON.parse(localStorage.getItem(%22mfp-keto-goals%22)),e=$(%22.total:not(.alt):not(.remaining)%22),a=$(%22.total.alt%22),i=$(%22.total.remaining%22),n=-1,o=-1,r=-1;$.each($(%22.food_container%20tfoot%20td%22),function(t,e){e=$(e),e.text().indexOf(%22Carbs%22)%3E-1%3Fn=t+1:e.text().indexOf(%22Fat%22)%3E-1%3Fo=t+1:e.text().indexOf(%22Protein%22)%3E-1%26%26(r=t+1)});var%20l={carbs:e.find(%22td:nth-child(%22+n+%22)%22),fat:e.find(%22td:nth-child(%22+o+%22)%22),protein:e.find(%22td:nth-child(%22+r+%22)%22)},p={carbs:a.find(%22td:nth-child(%22+n+%22)%22),fat:a.find(%22td:nth-child(%22+o+%22)%22),protein:a.find(%22td:nth-child(%22+r+%22)%22)},d={carbs:i.find(%22td:nth-child(%22+n+%22)%22),fat:i.find(%22td:nth-child(%22+o+%22)%22),protein:i.find(%22td:nth-child(%22+r+%22)%22)};p.carbs.text(t.carbs.toLocaleString()),p.fat.text(t.fat.toLocaleString()),p.protein.text(t.protein.toLocaleString());var%20s={carbs:parseInt(p.carbs.text().replace(%22,%22,%22%22))-parseInt(l.carbs.text().replace(%22,%22,%22%22)),fat:parseInt(p.fat.text().replace(%22,%22,%22%22))-parseInt(l.fat.text().replace(%22,%22,%22%22)),protein:parseInt(p.protein.text().replace(%22,%22,%22%22))-parseInt(l.protein.text().replace(%22,%22,%22%22))};d.carbs.text(s.carbs.toLocaleString()),d.fat.text(s.fat.toLocaleString()),d.protein.text(s.protein.toLocaleString()),d.carbs.removeClass(%22positive%22).removeClass(%22negative%22),d.fat.removeClass(%22positive%22).removeClass(%22negative%22),d.protein.removeClass(%22positive%22).removeClass(%22negative%22),d.carbs.addClass(s.carbs%3C0%3F%22negative%22:%22positive%22),d.fat.addClass(s.fat%3C0%3F%22negative%22:%22positive%22),d.protein.addClass(s.protein%3C0%3F%22negative%22:%22positive%22)},i=function(){if(null==localStorage.getItem(%22mfp-keto-goals%22)){var%20i=-1,n=-1,o=-1;$.each($(%22.food_container%20tfoot%20td%22),function(t,e){e=$(e),e.text().indexOf(%22Carbs%22)%3E-1%3Fi=t+1:e.text().indexOf(%22Fat%22)%3E-1%3Fn=t+1:e.text().indexOf(%22Protein%22)%3E-1%26%26(o=t+1)});var%20r=$(%22.total.alt%22),l={carbs:r.find(%22td:nth-child(%22+i+%22)%22),fat:r.find(%22td:nth-child(%22+n+%22)%22),protein:r.find(%22td:nth-child(%22+o+%22)%22)},p={carbs:0,fat:0,protein:0};l.carbs.length%26%26(p.carbs=parseInt(l.carbs.text().replace(%22,%22,%22%22))),l.fat.length%26%26(p.fat=parseInt(l.fat.text().replace(%22,%22,%22%22))),l.protein.length%26%26(p.protein=parseInt(l.protein.text().replace(%22,%22,%22%22))),localStorage.setItem(%22mfp-keto-goals%22,JSON.stringify(p))}var%20d=$('%3Cinput%20style=%22margin-right:%205px%22%20id=%22mfp-keto-edit%22%20type=%22button%22%20value=%22Edit%22%20/%3E');$(%22.food_container%20.total.alt%20.first%22).prepend(d);var%20s=$('%3Cdiv%20style=%22position:absolute;%20display:none;%20border:%202px%20solid;%20border-radius:%2025px;%20padding:%200px%2020px%2020px%2020px;%20background:%20white;%22%20id=%22mfp-keto-macrograms%22%3E%3Ch3%20style=%22text-align:center%22%3ECustom%20Macro%20Settings%3C/h3%3E%3Cdiv%20style=%22padding-bottom:%2010px%22%3E%3Clabel%20style=%22font-style:bold;%20padding:5px;%20display:inline-block;%20width:75px;%20text-align:right;%22%20for=%22mfp-keto-carbs%22%3ECarbs(g)%3C/label%3E%3Cinput%20style=%22padding:5px%22%20type=%22number%22%20id=%22mfp-keto-carbs%22%20/%3E%3C/div%3E%3Cdiv%20style=%22padding-bottom:%2010px%22%3E%3Clabel%20style=%22font-style:bold;%20padding:5px;%20display:inline-block;%20width:75px;%20text-align:right;%22%20for=%22mfp-keto-fat%22%3EFat(g)%3C/label%3E%3Cinput%20style=%22padding:5px%22%20type=%22number%22%20id=%22mfp-keto-fat%22%20/%3E%3C/div%3E%3Cdiv%20style=%22padding-bottom:%2010px%22%3E%3Clabel%20style=%22font-style:bold;%20padding:5px;%20display:inline-block;%20width:75px;%20text-align:right;%22%20for=%22mfp-keto-protein%22%3EProtein(g)%3C/label%3E%3Cinput%20style=%22padding:5px%22%20type=%22number%22%20id=%22mfp-keto-protein%22%20/%3E%3C/div%3E%3Cinput%20id=%22mfp-keto-save%22%20type=%22button%22%20value=%22Save%22%20/%3E%20%3Cinput%20id=%22mfp-keto-cancel%22%20type=%22button%22%20value=%22Cancel%22%20/%3E%3C/div%3E');$(%22.food_container%20.total.alt%20.first%22).append(s),$(%22%23mfp-keto-edit%22).on(%22click%22,function(){$(%22%23mfp-keto-macrograms%22).toggle(),t()}),$(%22%23mfp-keto-cancel%22).on(%22click%22,function(){$(%22%23mfp-keto-macrograms%22).hide(),t()}),$(%22%23mfp-keto-save%22).on(%22click%22,function(){$(%22%23mfp-keto-macrograms%22).hide(),e()}),t(),a()};i()}();">this link</a> into your bookmark bar.</li>
<li>Click the bookmarklet while on the diary page to enable your custom macro settings.</li>
</ul>

<h1>Bookmarklet Upgrade:</h1>
<ul>
<li>Delete your existing bookmarklet.</li>
<li>Drag the link from above back into the bookmark bar.</li>
</ul>