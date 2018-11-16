/**
 * scholar.js
 * ---
 * @author Jérémy Levallois (http://www.karganys.fr)
 * @version 0.1.2
 * ---
 * Note: Read the README.md
 * ---
 * @info https://github.com/jlevallois/scholar.js/
 */



var Scholar = {
  author: "SCHOLAR_AUTHOR_ID",
  scholarURL: "https://scholar.google.com/",
  debug: false,
  not_found_msg: "&#10008",
  pathToProxy: "proxy.php",

  load: function (_author) {
    "use strict";
    var i;
    this.author = _author;

    jQuery.ajax({
      url: Scholar.scholarURL + "citations?user=" + Scholar.author + "&hl=en&cstart=0&pagesize=100",
      crossOrigin: true,
      proxy: "",
      type: "GET",
      dataType: "html",
      success: function (res) {
        var tmpFind = jQuery(res).find("#gsc_rsb_st");
        var tmpPubliArray = jQuery(tmpFind).find(".gsc_rsb_std");
        var citations = [];
        for (i = 0; i < tmpPubliArray.length; i++) {
          citations.push(jQuery(tmpPubliArray[i]).text());
        }
        citationCount = Math.max.apply(null, citations.map(function (e) {
            return parseInt(e)
        }));
        var citationElem = jQuery(document).find("#citations.columns");
        citationElem.append("<div class='mod modMilestone'>\n" +
            "        <i class='fa fa-quote-left'></i>\n" +
            "        <strong data-from='0' data-to='" + citationCount + "'>" + citationCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</strong>\n" +
            "        <span><b>Citations</b></span>\n" +
            "        <div class='four spacing'></div>\n" +
            "      </div>")
      },
      error: function () {
        if (Scholar.debug) {
          console.log("Can't open requested URL.");
        }
        var allElements = document.getElementsByClassName("scholar");
        for (i = 0; i < allElements.length; i++) {
          allElements[i].innerHTML = Scholar.not_found_msg;
        }
      }
    });
  }
};
