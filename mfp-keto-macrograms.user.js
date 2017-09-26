// ==UserScript==
// @name           MFP Fine Grained Macros
// @description    Allows you to escape the 5% macro rounding on MFPs diary page
// @include        *www.myfitnesspal.com/food/diary*
// @version        1.0
// ==/UserScript==
(function () {
  // load and execute jquery, chrome does not support the @requires tag
  function load(url, onLoad, onError) {
    e = document.createElement("script");
    e.setAttribute("src", url);

    if (onLoad !== null) { e.addEventListener("load", onLoad); }
    if (onError !== null) { e.addEventListener("error", onError); }

    document.body.appendChild(e);

    return e;
  }

  function execute(functionOrCode) {
    if (typeof functionOrCode === "function") {
      code = "(" + functionOrCode + ")();";
    } else {
      code = functionOrCode;
    }

    e = document.createElement("script");
    e.textContent = code;

    document.body.appendChild(e);

    return e;
  }

  function loadAndExecute(url, functionOrCode) {
    load(url, function() { execute(functionOrCode); });
  }

  loadAndExecute("https://code.jquery.com/jquery-3.2.1.min.js", function () {
    var populateInputs = function () {
      var values = JSON.parse(localStorage.getItem("mfp-keto-goals"));
      $("#mfp-keto-carbs").val(values.carbs);
      $("#mfp-keto-fat").val(values.fat);
      $("#mfp-keto-protein").val(values.protein);
    };

    var saveInputs = function () {
      var values = JSON.parse(localStorage.getItem("mfp-keto-goals"));
      values.carbs = parseInt($("#mfp-keto-carbs").val());
      values.fat = parseInt($("#mfp-keto-fat").val());
      values.protein = parseInt($("#mfp-keto-protein").val());
      localStorage.setItem("mfp-keto-goals", JSON.stringify(values));
      calculate();
    };

    var calculate = function () {
      var inputs = JSON.parse(localStorage.getItem("mfp-keto-goals"));

      var totalRow = $(".total:not(.alt):not(.remaining)");
      var goalRow = $(".total.alt");
      var remainingRow = $(".total.remaining");

      // find out which columns are the macro columns
      var carbIdx = -1;
      var fatIdx = -1;
      var proteinIdx = -1;
      $.each($(".food_container tfoot td"), function (idx, val) {
        val = $(val);
        if (val.text().indexOf("Carbs") > -1) {
          carbIdx = idx + 1;
        } else if (val.text().indexOf("Fat") > -1) {
          fatIdx = idx + 1;
        } else if (val.text().indexOf("Protein") > -1) {
          proteinIdx = idx + 1;
        }
      });

      // find all the holes where our totals are, and where our new values need to go
      var totalEl = {
        carbs: totalRow.find("td:nth-child(" + carbIdx + ")"),
        fat: totalRow.find("td:nth-child(" + fatIdx + ")"),
        protein: totalRow.find("td:nth-child(" + proteinIdx + ")"),
      };
      var goalsEl = {
        carbs: goalRow.find("td:nth-child(" + carbIdx + ")"),
        fat: goalRow.find("td:nth-child(" + fatIdx + ")"),
        protein: goalRow.find("td:nth-child(" + proteinIdx + ")"),
      };
      var remainingEl = {
        carbs: remainingRow.find("td:nth-child(" + carbIdx + ")"),
        fat: remainingRow.find("td:nth-child(" + fatIdx + ")"),
        protein: remainingRow.find("td:nth-child(" + proteinIdx + ")"),
      };

      // display the updated goals
      goalsEl.carbs.text(inputs.carbs.toLocaleString());
      goalsEl.fat.text(inputs.fat.toLocaleString());
      goalsEl.protein.text(inputs.protein.toLocaleString());

      // work out the new remaining values
      var outputs = {
        carbs: parseInt(goalsEl.carbs.text().replace(",", "")) - parseInt(totalEl.carbs.text().replace(",", "")),
        fat: parseInt(goalsEl.fat.text().replace(",", "")) - parseInt(totalEl.fat.text().replace(",", "")),
        protein: parseInt(goalsEl.protein.text().replace(",", "")) - parseInt(totalEl.protein.text().replace(",", "")),
      };

      // display the updated remaining values
      remainingEl.carbs.text(outputs.carbs.toLocaleString());
      remainingEl.fat.text(outputs.fat.toLocaleString());
      remainingEl.protein.text(outputs.protein.toLocaleString());

      // apply the default red/green styling
      remainingEl.carbs.removeClass("positive").removeClass("negative");
      remainingEl.fat.removeClass("positive").removeClass("negative");
      remainingEl.protein.removeClass("positive").removeClass("negative");
      remainingEl.carbs.addClass(outputs.carbs < 0 ? "negative" : "positive");
      remainingEl.fat.addClass(outputs.fat < 0 ? "negative" : "positive");
      remainingEl.protein.addClass(outputs.protein < 0 ? "negative" : "positive");
    };

    var setup = function () {
      // preload the user's goal values
      if (localStorage.getItem("mfp-keto-goals") === null) {
        var carbIdx = -1;
        var fatIdx = -1;
        var proteinIdx = -1;
        $.each($(".food_container tfoot td"), function (idx, val) {
          val = $(val);
          if (val.text().indexOf("Carbs") > -1) {
            carbIdx = idx + 1;
          } else if (val.text().indexOf("Fat") > -1) {
            fatIdx = idx + 1;
          } else if (val.text().indexOf("Protein") > -1) {
            proteinIdx = idx + 1;
          }
        });

        var goalRow = $(".total.alt");
        var goalsEl = {
          carbs: goalRow.find("td:nth-child(" + carbIdx + ")"),
          fat: goalRow.find("td:nth-child(" + fatIdx + ")"),
          protein: goalRow.find("td:nth-child(" + proteinIdx + ")"),
        };

        var preloadedValues = {
          carbs: 0,
          fat: 0,
          protein: 0
        };

        if (goalsEl.carbs.length) {
          preloadedValues.carbs = parseInt(goalsEl.carbs.text().replace(",", ""));
        }
        if (goalsEl.fat.length) {
          preloadedValues.fat = parseInt(goalsEl.fat.text().replace(",", ""));
        }
        if (goalsEl.protein.length) {
          preloadedValues.protein = parseInt(goalsEl.protein.text().replace(",", ""));
        }
        localStorage.setItem("mfp-keto-goals", JSON.stringify(preloadedValues));
      }

      var settingsButtonEl = $("<input style=\"margin-right: 5px\" id=\"mfp-keto-edit\" type=\"button\" value=\"Edit\" />");
      $(".food_container .total.alt .first").prepend(settingsButtonEl);

      var settingsEl = $("<div style=\"position:absolute; display:none; border: 2px solid; border-radius: 25px; padding: 0px 20px 20px 20px; background: white;\" id=\"mfp-keto-macrograms\"><h3 style=\"text-align:center\">Custom Macro Settings</h3><div style=\"padding-bottom: 10px\"><label style=\"font-style:bold; padding:5px; display:inline-block; width:75px; text-align:right;\" for=\"mfp-keto-carbs\">Carbs(g)</label><input style=\"padding:5px\" type=\"number\" id=\"mfp-keto-carbs\" /></div><div style=\"padding-bottom: 10px\"><label style=\"font-style:bold; padding:5px; display:inline-block; width:75px; text-align:right;\" for=\"mfp-keto-fat\">Fat(g)</label><input style=\"padding:5px\" type=\"number\" id=\"mfp-keto-fat\" /></div><div style=\"padding-bottom: 10px\"><label style=\"font-style:bold; padding:5px; display:inline-block; width:75px; text-align:right;\" for=\"mfp-keto-protein\">Protein(g)</label><input style=\"padding:5px\" type=\"number\" id=\"mfp-keto-protein\" /></div><input id=\"mfp-keto-save\" type=\"button\" value=\"Save\" /> <input id=\"mfp-keto-cancel\" type=\"button\" value=\"Cancel\" /></div>");
      $(".food_container .total.alt .first").append(settingsEl);

      $("#mfp-keto-edit").on("click", function () {
        $("#mfp-keto-macrograms").toggle();
        populateInputs();
      });

      $("#mfp-keto-cancel").on("click", function () {
        $("#mfp-keto-macrograms").hide();
        populateInputs();
      });

      $("#mfp-keto-save").on("click", function () {
        $("#mfp-keto-macrograms").hide();
        saveInputs();
      });

      populateInputs();
      calculate();
    };
    setup();
  });
})();