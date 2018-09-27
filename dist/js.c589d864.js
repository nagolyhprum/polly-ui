// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/js/prototype.js":[function(require,module,exports) {
Array.prototype.contains = function (item) {
  return this.indexOf(item) !== -1;
};
},{}],"src/js/res/drawable/phrase_apple.svg":[function(require,module,exports) {
module.exports = "/phrase_apple.9a8b9c44.svg";
},{}],"src/js/res/drawable/phrase_banana.svg":[function(require,module,exports) {
module.exports = "/phrase_banana.162f76dd.svg";
},{}],"src/js/res/drawable/phrase_beer.svg":[function(require,module,exports) {
module.exports = "/phrase_beer.79bb67b9.svg";
},{}],"src/js/res/drawable/phrase_chopsticks.svg":[function(require,module,exports) {
module.exports = "/phrase_chopsticks.ea01d10b.svg";
},{}],"src/js/res/drawable/phrase_clock.svg":[function(require,module,exports) {
module.exports = "/phrase_clock.60f9656e.svg";
},{}],"src/js/res/drawable/phrase_coffee.svg":[function(require,module,exports) {
module.exports = "/phrase_coffee.5778b23f.svg";
},{}],"src/js/res/drawable/phrase_egg.svg":[function(require,module,exports) {
module.exports = "/phrase_egg.8c509235.svg";
},{}],"src/js/res/drawable/phrase_eight.svg":[function(require,module,exports) {
module.exports = "/phrase_eight.5481e99d.svg";
},{}],"src/js/res/drawable/phrase_five.svg":[function(require,module,exports) {
module.exports = "/phrase_five.bbcb9f8e.svg";
},{}],"src/js/res/drawable/phrase_four.svg":[function(require,module,exports) {
module.exports = "/phrase_four.0cec59e3.svg";
},{}],"src/js/res/drawable/phrase_half.svg":[function(require,module,exports) {
module.exports = "/phrase_half.4f6f56f3.svg";
},{}],"src/js/res/drawable/phrase_nine.svg":[function(require,module,exports) {
module.exports = "/phrase_nine.a8937791.svg";
},{}],"src/js/res/drawable/phrase_one.svg":[function(require,module,exports) {
module.exports = "/phrase_one.a9a8ff7f.svg";
},{}],"src/js/res/drawable/phrase_red_wine.svg":[function(require,module,exports) {
module.exports = "/phrase_red_wine.d39d8988.svg";
},{}],"src/js/res/drawable/phrase_seven.svg":[function(require,module,exports) {
module.exports = "/phrase_seven.0185b09c.svg";
},{}],"src/js/res/drawable/phrase_six.svg":[function(require,module,exports) {
module.exports = "/phrase_six.58ce74b2.svg";
},{}],"src/js/res/drawable/phrase_three.svg":[function(require,module,exports) {
module.exports = "/phrase_three.4c8d5460.svg";
},{}],"src/js/res/drawable/phrase_twenty_five.svg":[function(require,module,exports) {
module.exports = "/phrase_twenty_five.cd49e2d6.svg";
},{}],"src/js/res/drawable/phrase_two.svg":[function(require,module,exports) {
module.exports = "/phrase_two.24352577.svg";
},{}],"src/js/res/drawable/phrase_white_wine.svg":[function(require,module,exports) {
module.exports = "/phrase_white_wine.ebb61acb.svg";
},{}],"src/js/res/drawable/star_normal.svg":[function(require,module,exports) {
module.exports = "/star_normal.4dc5a4ae.svg";
},{}],"src/js/res/drawable/star_filled.svg":[function(require,module,exports) {
module.exports = "/star_filled.ee19a6f4.svg";
},{}],"src/js/res/drawable/star_blue.svg":[function(require,module,exports) {
module.exports = "/star_blue.f52caf73.svg";
},{}],"src/js/res/drawable/streak_normal.svg":[function(require,module,exports) {
module.exports = "/streak_normal.974cac3a.svg";
},{}],"src/js/res/drawable/streak_highlighted.svg":[function(require,module,exports) {
module.exports = "/streak_highlighted.20461245.svg";
},{}],"src/js/res/drawable/streak_filled.svg":[function(require,module,exports) {
module.exports = "/streak_filled.5b49735c.svg";
},{}],"src/js/res/drawable/streak_hollow.svg":[function(require,module,exports) {
module.exports = "/streak_hollow.cb0dff4a.svg";
},{}],"src/js/res/drawable/download_complete.svg":[function(require,module,exports) {
module.exports = "/download_complete.1a50ee4a.svg";
},{}],"src/js/res/drawable/download_normal.svg":[function(require,module,exports) {
module.exports = "/download_normal.a25637b4.svg";
},{}],"src/js/res/drawable/phrases_normal.svg":[function(require,module,exports) {
module.exports = "/phrases_normal.cad6bd5c.svg";
},{}],"src/js/res/drawable/logos_lexicon_blue.svg":[function(require,module,exports) {
module.exports = "/logos_lexicon_blue.ad48de77.svg";
},{}],"src/js/res/drawable/logos_lexicon_white.svg":[function(require,module,exports) {
module.exports = "/logos_lexicon_white.4b04f85d.svg";
},{}],"src/js/res/drawable/logos_google.svg":[function(require,module,exports) {
module.exports = "/logos_google.233284fe.svg";
},{}],"src/js/res/drawable/logos_facebook.svg":[function(require,module,exports) {
module.exports = "/logos_facebook.892c4c03.svg";
},{}],"src/js/res/drawable/icons_lexicon_celebrate.svg":[function(require,module,exports) {
module.exports = "/icons_lexicon_celebrate.79477a26.svg";
},{}],"src/js/res/drawable/icons_down.svg":[function(require,module,exports) {
module.exports = "/icons_down.2aceedcb.svg";
},{}],"src/js/res/drawable/icons_report_blue.svg":[function(require,module,exports) {
module.exports = "/icons_report_blue.92972793.svg";
},{}],"src/js/res/drawable/icons_share.svg":[function(require,module,exports) {
module.exports = "/icons_share.9623bbd3.svg";
},{}],"src/js/res/drawable/icons_forward.svg":[function(require,module,exports) {
module.exports = "/icons_forward.634b3c20.svg";
},{}],"src/js/res/drawable/icons_play.svg":[function(require,module,exports) {
module.exports = "/icons_play.d4f48c28.svg";
},{}],"src/js/res/drawable/icons_menu.svg":[function(require,module,exports) {
module.exports = "/icons_menu.f493788d.svg";
},{}],"src/js/res/drawable/icons_tip.svg":[function(require,module,exports) {
module.exports = "/icons_tip.b60c84e2.svg";
},{}],"src/js/res/drawable/icons_skip.svg":[function(require,module,exports) {
module.exports = "/icons_skip.fa01345b.svg";
},{}],"src/js/res/drawable/icons_ignore.svg":[function(require,module,exports) {
module.exports = "/icons_ignore.98003d53.svg";
},{}],"src/js/res/drawable/icons_report.svg":[function(require,module,exports) {
module.exports = "/icons_report.8044b23c.svg";
},{}],"src/js/res/drawable/icons_mic_off_black.svg":[function(require,module,exports) {
module.exports = "/icons_mic_off_black.94261429.svg";
},{}],"src/js/res/drawable/icons_volume_off_black.svg":[function(require,module,exports) {
module.exports = "/icons_volume_off_black.2179ea90.svg";
},{}],"src/js/res/drawable/icons_pause_blue.svg":[function(require,module,exports) {
module.exports = "/icons_pause_blue.9cebe756.svg";
},{}],"src/js/res/drawable/icons_record_blue_inactive.svg":[function(require,module,exports) {
module.exports = "/icons_record_blue_inactive.af19390d.svg";
},{}],"src/js/res/drawable/icons_play_blue_inactive.svg":[function(require,module,exports) {
module.exports = "/icons_play_blue_inactive.71a8fb07.svg";
},{}],"src/js/res/drawable/icons_badge.svg":[function(require,module,exports) {
module.exports = "/icons_badge.a9e043bd.svg";
},{}],"src/js/res/drawable/icons_test_audio.svg":[function(require,module,exports) {
module.exports = "/icons_test_audio.0049af1d.svg";
},{}],"src/js/res/drawable/icons_test_all.svg":[function(require,module,exports) {
module.exports = "/icons_test_all.cd820420.svg";
},{}],"src/js/res/drawable/icons_test_favorites.svg":[function(require,module,exports) {
module.exports = "/icons_test_favorites.16666156.svg";
},{}],"src/js/res/drawable/icons_back.svg":[function(require,module,exports) {
module.exports = "/icons_back.f6597599.svg";
},{}],"src/js/res/drawable/icons_back_white.svg":[function(require,module,exports) {
module.exports = "/icons_back_white.6deea74a.svg";
},{}],"src/js/res/drawable/icons_search.svg":[function(require,module,exports) {
module.exports = "/icons_search.870aea51.svg";
},{}],"src/js/res/drawable/icons_clear.svg":[function(require,module,exports) {
module.exports = "/icons_clear.a207c1ee.svg";
},{}],"src/js/res/drawable/icons_clear_gray.svg":[function(require,module,exports) {
module.exports = "/icons_clear_gray.94fef9f3.svg";
},{}],"src/js/res/drawable/icons_add_white.svg":[function(require,module,exports) {
module.exports = "/icons_add_white.17f04f3b.svg";
},{}],"src/js/res/drawable/icons_account.svg":[function(require,module,exports) {
module.exports = "/icons_account.a29dbcef.svg";
},{}],"src/js/res/drawable/icons_settings.svg":[function(require,module,exports) {
module.exports = "/icons_settings.251440d3.svg";
},{}],"src/js/res/drawable/icons_group.svg":[function(require,module,exports) {
module.exports = "/icons_group.95de8d4b.svg";
},{}],"src/js/res/drawable/icons_question_mark.svg":[function(require,module,exports) {
module.exports = "/icons_question_mark.fabccc9e.svg";
},{}],"src/js/res/drawable/icons_profile.svg":[function(require,module,exports) {
module.exports = "/icons_profile.03daa1d2.svg";
},{}],"src/js/res/drawable/icons_check_blue.svg":[function(require,module,exports) {
module.exports = "/icons_check_blue.5c641a7d.svg";
},{}],"src/js/res/drawable/icons_add_black.svg":[function(require,module,exports) {
module.exports = "/icons_add_black.323a9352.svg";
},{}],"src/js/res/drawable/languages_english.svg":[function(require,module,exports) {
module.exports = "/languages_english.33405c47.svg";
},{}],"src/js/res/drawable/languages_chinese_cantonese.svg":[function(require,module,exports) {
module.exports = "/languages_chinese_cantonese.62793fd4.svg";
},{}],"src/js/res/drawable/languages_chinese_mandarin.svg":[function(require,module,exports) {
module.exports = "/languages_chinese_mandarin.958c0ae5.svg";
},{}],"src/js/res/drawable/languages_polish.svg":[function(require,module,exports) {
module.exports = "/languages_polish.067b5ccb.svg";
},{}],"src/js/res/drawable/languages_spanish.svg":[function(require,module,exports) {
module.exports = "/languages_spanish.0b2a068e.svg";
},{}],"src/js/res/drawable/languages_arabic.png":[function(require,module,exports) {
module.exports = "/languages_arabic.188a8d20.png";
},{}],"src/js/res/drawable/languages_bengali.png":[function(require,module,exports) {
module.exports = "/languages_bengali.a00d1ed7.png";
},{}],"src/js/res/drawable/languages_catalan.png":[function(require,module,exports) {
module.exports = "/languages_catalan.b9ef09bd.png";
},{}],"src/js/res/drawable/languages_czech.png":[function(require,module,exports) {
module.exports = "/languages_czech.d3ad412a.png";
},{}],"src/js/res/drawable/languages_danish.png":[function(require,module,exports) {
module.exports = "/languages_danish.a5ffe6de.png";
},{}],"src/js/res/drawable/languages_dutch.png":[function(require,module,exports) {
module.exports = "/languages_dutch.ef096daa.png";
},{}],"src/js/res/drawable/languages_filipino.png":[function(require,module,exports) {
module.exports = "/languages_filipino.e9b5022e.png";
},{}],"src/js/res/drawable/languages_finnish.png":[function(require,module,exports) {
module.exports = "/languages_finnish.a4a787d2.png";
},{}],"src/js/res/drawable/languages_french.png":[function(require,module,exports) {
module.exports = "/languages_french.d5cfa44d.png";
},{}],"src/js/res/drawable/languages_german.png":[function(require,module,exports) {
module.exports = "/languages_german.9570e697.png";
},{}],"src/js/res/drawable/languages_greek.png":[function(require,module,exports) {
module.exports = "/languages_greek.ec5b4508.png";
},{}],"src/js/res/drawable/languages_gujrati.png":[function(require,module,exports) {
module.exports = "/languages_gujrati.f80175da.png";
},{}],"src/js/res/drawable/languages_hebrew.png":[function(require,module,exports) {
module.exports = "/languages_hebrew.7e6a39dc.png";
},{}],"src/js/res/drawable/languages_hindi.png":[function(require,module,exports) {
module.exports = "/languages_hindi.1a4058be.png";
},{}],"src/js/res/drawable/languages_indonesian.png":[function(require,module,exports) {
module.exports = "/languages_indonesian.bff2ffe0.png";
},{}],"src/js/res/drawable/languages_italian.png":[function(require,module,exports) {
module.exports = "/languages_italian.cbacda74.png";
},{}],"src/js/res/drawable/languages_japanese.png":[function(require,module,exports) {
module.exports = "/languages_japanese.76504e4a.png";
},{}],"src/js/res/drawable/languages_korean.png":[function(require,module,exports) {
module.exports = "/languages_korean.7432faca.png";
},{}],"src/js/res/drawable/languages_persian.png":[function(require,module,exports) {
module.exports = "/languages_persian.325fd3a1.png";
},{}],"src/js/res/drawable/languages_portuguese.png":[function(require,module,exports) {
module.exports = "/languages_portuguese.6ec2ccaa.png";
},{}],"src/js/res/drawable/languages_russian.png":[function(require,module,exports) {
module.exports = "/languages_russian.32a4d566.png";
},{}],"src/js/res/drawable/languages_slovak.png":[function(require,module,exports) {
module.exports = "/languages_slovak.ce5219f1.png";
},{}],"src/js/res/drawable/languages_swedish.png":[function(require,module,exports) {
module.exports = "/languages_swedish.dc82cdf2.png";
},{}],"src/js/res/drawable/languages_thai.png":[function(require,module,exports) {
module.exports = "/languages_thai.c7c3fa62.png";
},{}],"src/js/res/drawable/languages_turkish.png":[function(require,module,exports) {
module.exports = "/languages_turkish.5975b3b9.png";
},{}],"src/js/res/drawable/languages_urdu.png":[function(require,module,exports) {
module.exports = "/languages_urdu.e3b5eb2a.png";
},{}],"src/js/res/drawable/languages_vietnamese.png":[function(require,module,exports) {
module.exports = "/languages_vietnamese.6a7efefd.png";
},{}],"src/js/res/drawable/chapters_adjectives.svg":[function(require,module,exports) {
module.exports = "/chapters_adjectives.ea56a917.svg";
},{}],"src/js/res/drawable/chapters_date.svg":[function(require,module,exports) {
module.exports = "/chapters_date.147f76d3.svg";
},{}],"src/js/res/drawable/chapters_greetings.svg":[function(require,module,exports) {
module.exports = "/chapters_greetings.9ab9a1eb.svg";
},{}],"src/js/res/drawable/chapters_life_choices.svg":[function(require,module,exports) {
module.exports = "/chapters_life_choices.ae7920e0.svg";
},{}],"src/js/res/drawable/chapters_possessive.svg":[function(require,module,exports) {
module.exports = "/chapters_possessive.53ed9b48.svg";
},{}],"src/js/res/drawable/chapters_restaurant.svg":[function(require,module,exports) {
module.exports = "/chapters_restaurant.0b27ac0d.svg";
},{}],"src/js/res/drawable/chapters_shopping.svg":[function(require,module,exports) {
module.exports = "/chapters_shopping.a9d1d35a.svg";
},{}],"src/js/res/drawable/chapters_tenses.svg":[function(require,module,exports) {
module.exports = "/chapters_tenses.2faed5dc.svg";
},{}],"src/js/res/drawable/chapters_travel.svg":[function(require,module,exports) {
module.exports = "/chapters_travel.fdd52fd9.svg";
},{}],"src/js/res/drawable/sections_beginner.svg":[function(require,module,exports) {
module.exports = "/sections_beginner.7bc7655a.svg";
},{}],"src/js/res/drawable/sections_intermediate.svg":[function(require,module,exports) {
module.exports = "/sections_intermediate.9730a6fe.svg";
},{}],"src/js/res/drawable/sections_advanced.svg":[function(require,module,exports) {
module.exports = "/sections_advanced.35759fdd.svg";
},{}],"src/js/res/drawable/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  account: {},
  phrase: {
    apple: require('./phrase_apple.svg'),
    banana: require('./phrase_banana.svg'),
    beer: require('./phrase_beer.svg'),
    chopsticks: require('./phrase_chopsticks.svg'),
    clock: require('./phrase_clock.svg'),
    coffee: require('./phrase_coffee.svg'),
    egg: require('./phrase_egg.svg'),
    eight: require('./phrase_eight.svg'),
    five: require('./phrase_five.svg'),
    four: require('./phrase_four.svg'),
    half: require('./phrase_half.svg'),
    nine: require('./phrase_nine.svg'),
    one: require('./phrase_one.svg'),
    red_wine: require('./phrase_red_wine.svg'),
    seven: require('./phrase_seven.svg'),
    six: require('./phrase_six.svg'),
    three: require('./phrase_three.svg'),
    twenty_five: require('./phrase_twenty_five.svg'),
    two: require('./phrase_two.svg'),
    white_wine: require('./phrase_white_wine.svg')
  },
  star: {
    normal: require('./star_normal.svg'),
    filled: require('./star_filled.svg'),
    blue: require('./star_blue.svg')
  },
  streak: {
    normal: require('./streak_normal.svg'),
    highlighted: require('./streak_highlighted.svg'),
    filled: require('./streak_filled.svg'),
    hollow: require('./streak_hollow.svg')
  },
  download: {
    complete: require('./download_complete.svg'),
    normal: require('./download_normal.svg')
  },
  phrases: {
    normal: require('./phrases_normal.svg')
  },
  logos: {
    lexicon_blue: require('./logos_lexicon_blue.svg'),
    lexicon_white: require('./logos_lexicon_white.svg'),
    google: require('./logos_google.svg'),
    facebook: require('./logos_facebook.svg')
  },
  icons: {
    lexicon_celebrate: require('./icons_lexicon_celebrate.svg'),
    down: require('./icons_down.svg'),
    report_blue: require('./icons_report_blue.svg'),
    share: require('./icons_share.svg'),
    forward: require('./icons_forward.svg'),
    play: require('./icons_play.svg'),
    menu: require('./icons_menu.svg'),
    tip: require('./icons_tip.svg'),
    skip: require('./icons_skip.svg'),
    ignore: require('./icons_ignore.svg'),
    report: require('./icons_report.svg'),
    mic_off_black: require('./icons_mic_off_black.svg'),
    volume_off_black: require('./icons_volume_off_black.svg'),
    pause_blue: require('./icons_pause_blue.svg'),
    record_blue_inactive: require('./icons_record_blue_inactive.svg'),
    play_blue_inactive: require('./icons_play_blue_inactive.svg'),
    badge: require('./icons_badge.svg'),
    test_audio: require('./icons_test_audio.svg'),
    test_all: require('./icons_test_all.svg'),
    test_favorites: require('./icons_test_favorites.svg'),
    back: require('./icons_back.svg'),
    back_white: require('./icons_back_white.svg'),
    search: require('./icons_search.svg'),
    clear: require('./icons_clear.svg'),
    clear_gray: require('./icons_clear_gray.svg'),
    add_white: require('./icons_add_white.svg'),
    account: require('./icons_account.svg'),
    settings: require('./icons_settings.svg'),
    group: require('./icons_group.svg'),
    question_mark: require('./icons_question_mark.svg'),
    profile: require('./icons_profile.svg'),
    check_blue: require('./icons_check_blue.svg'),
    add_black: require('./icons_add_black.svg')
  },
  languages: {
    // SVGS
    english: require('./languages_english.svg'),
    chinese_cantonese: require('./languages_chinese_cantonese.svg'),
    chinese_mandarin: require('./languages_chinese_mandarin.svg'),
    polish: require('./languages_polish.svg'),
    spanish: require('./languages_spanish.svg'),
    // PNGS
    arabic: require('./languages_arabic.png'),
    bengali: require('./languages_bengali.png'),
    catalan: require('./languages_catalan.png'),
    czech: require('./languages_czech.png'),
    danish: require('./languages_danish.png'),
    dutch: require('./languages_dutch.png'),
    filipino: require('./languages_filipino.png'),
    finnish: require('./languages_finnish.png'),
    french: require('./languages_french.png'),
    german: require('./languages_german.png'),
    greek: require('./languages_greek.png'),
    gujrati: require('./languages_gujrati.png'),
    hebrew: require('./languages_hebrew.png'),
    hindi: require('./languages_hindi.png'),
    indonesian: require('./languages_indonesian.png'),
    italian: require('./languages_italian.png'),
    japanese: require('./languages_japanese.png'),
    korean: require('./languages_korean.png'),
    persian: require('./languages_persian.png'),
    portuguese: require('./languages_portuguese.png'),
    russian: require('./languages_russian.png'),
    slovak: require('./languages_slovak.png'),
    swedish: require('./languages_swedish.png'),
    thai: require('./languages_thai.png'),
    turkish: require('./languages_turkish.png'),
    urdu: require('./languages_urdu.png'),
    vietnamese: require('./languages_vietnamese.png')
  },
  chapters: {
    adjectives: require('./chapters_adjectives.svg'),
    date: require('./chapters_date.svg'),
    greetings: require('./chapters_greetings.svg'),
    life_choices: require('./chapters_life_choices.svg'),
    possessive: require('./chapters_possessive.svg'),
    restaurant: require('./chapters_restaurant.svg'),
    shopping: require('./chapters_shopping.svg'),
    tenses: require('./chapters_tenses.svg'),
    travel: require('./chapters_travel.svg')
  },
  sections: {
    beginner: require('./sections_beginner.svg'),
    intermediate: require('./sections_intermediate.svg'),
    advanced: require('./sections_advanced.svg')
  }
};
},{"./phrase_apple.svg":"src/js/res/drawable/phrase_apple.svg","./phrase_banana.svg":"src/js/res/drawable/phrase_banana.svg","./phrase_beer.svg":"src/js/res/drawable/phrase_beer.svg","./phrase_chopsticks.svg":"src/js/res/drawable/phrase_chopsticks.svg","./phrase_clock.svg":"src/js/res/drawable/phrase_clock.svg","./phrase_coffee.svg":"src/js/res/drawable/phrase_coffee.svg","./phrase_egg.svg":"src/js/res/drawable/phrase_egg.svg","./phrase_eight.svg":"src/js/res/drawable/phrase_eight.svg","./phrase_five.svg":"src/js/res/drawable/phrase_five.svg","./phrase_four.svg":"src/js/res/drawable/phrase_four.svg","./phrase_half.svg":"src/js/res/drawable/phrase_half.svg","./phrase_nine.svg":"src/js/res/drawable/phrase_nine.svg","./phrase_one.svg":"src/js/res/drawable/phrase_one.svg","./phrase_red_wine.svg":"src/js/res/drawable/phrase_red_wine.svg","./phrase_seven.svg":"src/js/res/drawable/phrase_seven.svg","./phrase_six.svg":"src/js/res/drawable/phrase_six.svg","./phrase_three.svg":"src/js/res/drawable/phrase_three.svg","./phrase_twenty_five.svg":"src/js/res/drawable/phrase_twenty_five.svg","./phrase_two.svg":"src/js/res/drawable/phrase_two.svg","./phrase_white_wine.svg":"src/js/res/drawable/phrase_white_wine.svg","./star_normal.svg":"src/js/res/drawable/star_normal.svg","./star_filled.svg":"src/js/res/drawable/star_filled.svg","./star_blue.svg":"src/js/res/drawable/star_blue.svg","./streak_normal.svg":"src/js/res/drawable/streak_normal.svg","./streak_highlighted.svg":"src/js/res/drawable/streak_highlighted.svg","./streak_filled.svg":"src/js/res/drawable/streak_filled.svg","./streak_hollow.svg":"src/js/res/drawable/streak_hollow.svg","./download_complete.svg":"src/js/res/drawable/download_complete.svg","./download_normal.svg":"src/js/res/drawable/download_normal.svg","./phrases_normal.svg":"src/js/res/drawable/phrases_normal.svg","./logos_lexicon_blue.svg":"src/js/res/drawable/logos_lexicon_blue.svg","./logos_lexicon_white.svg":"src/js/res/drawable/logos_lexicon_white.svg","./logos_google.svg":"src/js/res/drawable/logos_google.svg","./logos_facebook.svg":"src/js/res/drawable/logos_facebook.svg","./icons_lexicon_celebrate.svg":"src/js/res/drawable/icons_lexicon_celebrate.svg","./icons_down.svg":"src/js/res/drawable/icons_down.svg","./icons_report_blue.svg":"src/js/res/drawable/icons_report_blue.svg","./icons_share.svg":"src/js/res/drawable/icons_share.svg","./icons_forward.svg":"src/js/res/drawable/icons_forward.svg","./icons_play.svg":"src/js/res/drawable/icons_play.svg","./icons_menu.svg":"src/js/res/drawable/icons_menu.svg","./icons_tip.svg":"src/js/res/drawable/icons_tip.svg","./icons_skip.svg":"src/js/res/drawable/icons_skip.svg","./icons_ignore.svg":"src/js/res/drawable/icons_ignore.svg","./icons_report.svg":"src/js/res/drawable/icons_report.svg","./icons_mic_off_black.svg":"src/js/res/drawable/icons_mic_off_black.svg","./icons_volume_off_black.svg":"src/js/res/drawable/icons_volume_off_black.svg","./icons_pause_blue.svg":"src/js/res/drawable/icons_pause_blue.svg","./icons_record_blue_inactive.svg":"src/js/res/drawable/icons_record_blue_inactive.svg","./icons_play_blue_inactive.svg":"src/js/res/drawable/icons_play_blue_inactive.svg","./icons_badge.svg":"src/js/res/drawable/icons_badge.svg","./icons_test_audio.svg":"src/js/res/drawable/icons_test_audio.svg","./icons_test_all.svg":"src/js/res/drawable/icons_test_all.svg","./icons_test_favorites.svg":"src/js/res/drawable/icons_test_favorites.svg","./icons_back.svg":"src/js/res/drawable/icons_back.svg","./icons_back_white.svg":"src/js/res/drawable/icons_back_white.svg","./icons_search.svg":"src/js/res/drawable/icons_search.svg","./icons_clear.svg":"src/js/res/drawable/icons_clear.svg","./icons_clear_gray.svg":"src/js/res/drawable/icons_clear_gray.svg","./icons_add_white.svg":"src/js/res/drawable/icons_add_white.svg","./icons_account.svg":"src/js/res/drawable/icons_account.svg","./icons_settings.svg":"src/js/res/drawable/icons_settings.svg","./icons_group.svg":"src/js/res/drawable/icons_group.svg","./icons_question_mark.svg":"src/js/res/drawable/icons_question_mark.svg","./icons_profile.svg":"src/js/res/drawable/icons_profile.svg","./icons_check_blue.svg":"src/js/res/drawable/icons_check_blue.svg","./icons_add_black.svg":"src/js/res/drawable/icons_add_black.svg","./languages_english.svg":"src/js/res/drawable/languages_english.svg","./languages_chinese_cantonese.svg":"src/js/res/drawable/languages_chinese_cantonese.svg","./languages_chinese_mandarin.svg":"src/js/res/drawable/languages_chinese_mandarin.svg","./languages_polish.svg":"src/js/res/drawable/languages_polish.svg","./languages_spanish.svg":"src/js/res/drawable/languages_spanish.svg","./languages_arabic.png":"src/js/res/drawable/languages_arabic.png","./languages_bengali.png":"src/js/res/drawable/languages_bengali.png","./languages_catalan.png":"src/js/res/drawable/languages_catalan.png","./languages_czech.png":"src/js/res/drawable/languages_czech.png","./languages_danish.png":"src/js/res/drawable/languages_danish.png","./languages_dutch.png":"src/js/res/drawable/languages_dutch.png","./languages_filipino.png":"src/js/res/drawable/languages_filipino.png","./languages_finnish.png":"src/js/res/drawable/languages_finnish.png","./languages_french.png":"src/js/res/drawable/languages_french.png","./languages_german.png":"src/js/res/drawable/languages_german.png","./languages_greek.png":"src/js/res/drawable/languages_greek.png","./languages_gujrati.png":"src/js/res/drawable/languages_gujrati.png","./languages_hebrew.png":"src/js/res/drawable/languages_hebrew.png","./languages_hindi.png":"src/js/res/drawable/languages_hindi.png","./languages_indonesian.png":"src/js/res/drawable/languages_indonesian.png","./languages_italian.png":"src/js/res/drawable/languages_italian.png","./languages_japanese.png":"src/js/res/drawable/languages_japanese.png","./languages_korean.png":"src/js/res/drawable/languages_korean.png","./languages_persian.png":"src/js/res/drawable/languages_persian.png","./languages_portuguese.png":"src/js/res/drawable/languages_portuguese.png","./languages_russian.png":"src/js/res/drawable/languages_russian.png","./languages_slovak.png":"src/js/res/drawable/languages_slovak.png","./languages_swedish.png":"src/js/res/drawable/languages_swedish.png","./languages_thai.png":"src/js/res/drawable/languages_thai.png","./languages_turkish.png":"src/js/res/drawable/languages_turkish.png","./languages_urdu.png":"src/js/res/drawable/languages_urdu.png","./languages_vietnamese.png":"src/js/res/drawable/languages_vietnamese.png","./chapters_adjectives.svg":"src/js/res/drawable/chapters_adjectives.svg","./chapters_date.svg":"src/js/res/drawable/chapters_date.svg","./chapters_greetings.svg":"src/js/res/drawable/chapters_greetings.svg","./chapters_life_choices.svg":"src/js/res/drawable/chapters_life_choices.svg","./chapters_possessive.svg":"src/js/res/drawable/chapters_possessive.svg","./chapters_restaurant.svg":"src/js/res/drawable/chapters_restaurant.svg","./chapters_shopping.svg":"src/js/res/drawable/chapters_shopping.svg","./chapters_tenses.svg":"src/js/res/drawable/chapters_tenses.svg","./chapters_travel.svg":"src/js/res/drawable/chapters_travel.svg","./sections_beginner.svg":"src/js/res/drawable/sections_beginner.svg","./sections_intermediate.svg":"src/js/res/drawable/sections_intermediate.svg","./sections_advanced.svg":"src/js/res/drawable/sections_advanced.svg"}],"src/js/res/style.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WEIGHTS = ["normal", "medium", "bold"];
var SIZES = Array.from({ length: 32 }).map(function (_, i) {
  return i + 8;
});
exports.default = WEIGHTS.reduce(function (font, weight) {
  return SIZES.reduce(function (font, size) {
    return Object.assign({}, font, _defineProperty({}, weight + "_" + size, {
      weight: weight,
      size: size
    }));
  }, font);
}, {});
},{}],"src/js/views/splash.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state) {
  var container = this.container,
      background = this.background,
      padding = this.padding,
      position = this.position,
      text = this.text,
      round = this.round,
      onClick = this.onClick,
      anchor = this.anchor,
      start = this.start,
      src = this.src,
      style = this.style,
      linear = this.linear,
      textColor = this.textColor,
      WRAP = this.WRAP,
      MATCH = this.MATCH,
      PERCENT = this.PERCENT,
      textAlign = this.textAlign,
      button = this.button;

  background("#2196f3");
  container(PERCENT(40), WRAP, function () {
    anchor(.5, .5);
    position(.5, .25);
    src(_drawable2.default.logos.lexicon_white);
  });
  container(WRAP, WRAP, function () {
    linear(16);
    anchor(.5, .5);
    position(.5, .5);
    container(WRAP, WRAP, function () {
      anchor(.5, 0);
      position(.5, 0);
      textColor("white");
      text("Lexicon");
      style(style.bold_34);
    });
    container(WRAP, WRAP, function () {
      text("Your language learning buddy");
      textColor("white");
      style(style.bold_20);
    });
  });
  container(PERCENT(50), WRAP, function () {
    linear(16);
    anchor(.5, .5);
    position(.5, .75);
    container(MATCH, WRAP, function () {
      button("#673ab7");
      text("GET STARTED");
      onClick(function () {
        start(LanguagePicker, state);
      });
    });
    container(MATCH, WRAP, function () {
      text("LOGIN");
      button();
      onClick(function () {
        start(Login);
      });
    });
  });
};

var _drawable = require("../res/drawable");

var _drawable2 = _interopRequireDefault(_drawable);

var _style = require("../res/style");

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"../res/drawable":"src/js/res/drawable/index.js","../res/style":"src/js/res/style.js"}],"src/js/rave/screen.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var slight_round = 4;
var EMPTY_ARRAY = [0, 0, 0, 0];
var COMPLEMENTARY_DIMENSIONS = {
  width: 'x',
  height: 'y',
  x: 'width',
  y: 'height'
};
var OPPOSITE_DIMENSIONS = {
  x: "y",
  y: "x",
  width: "height",
  height: "width"
};
var DIMENSIONS = {
  x: "width",
  y: "height",
  width: "height",
  height: "width"
};
var LINE_SPACING = 8;

function roundRect(context, x, y, width, height, radius, fill, stroke) {
  radius = { tl: radius, tr: radius, br: radius, bl: radius };
  context.beginPath();
  context.moveTo(x + radius.tl, y);
  context.lineTo(x + width - radius.tr, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  context.lineTo(x + width, y + height - radius.br);
  context.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  context.lineTo(x + radius.bl, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  context.lineTo(x, y + radius.tl);
  context.quadraticCurveTo(x, y, x + radius.tl, y);
  context.closePath();
  if (fill) {
    context.fillStyle = fill;
    context.fill();
  }
  if (stroke) {
    context.strokeStyle = stroke;
    context.stroke();
  }
}

var getValue = function getValue(view, dim) {
  if (typeof view[dim] === "function") {
    return view[dim](view, dim);
  } else {
    return view[dim];
  }
};

var getTopBottom = function getTopBottom(r) {
  return r instanceof Array ? r[0] + r[2] : 0;
};

var getLeftRight = function getLeftRight(r) {
  return r instanceof Array ? r[1] + r[3] : 0;
};

var getName = function getName(view) {
  return view.text.display || view.image || '(' + view.children.map(getName) + ')';
};

var reposition = function reposition(view) {
  var padding = view.parent.padding instanceof Array ? view.parent.padding : EMPTY_ARRAY;
  var margin = view.parent.margin instanceof Array ? view.parent.margin : EMPTY_ARRAY;
  return {
    x: view.parent.bounds.x + padding[3] + margin[3] + view.x + (view.parent.scrollX || 0),
    y: view.parent.bounds.y + padding[0] + margin[0] + view.y + (view.parent.scrollY || 0)
  };
};

function Screen(canvas) {
  var _this = this;

  this.textbox = document.createElement("input");
  document.body.appendChild(this.textbox);
  this.textbox.onblur = function (e) {
    var view = _this.textbox.view;
    if (view) {
      _this.textbox.view = null;
      view.textbox = null;
      _this.render();
    }
  };
  this.textbox.oninput = function (e) {
    var view = _this.textbox.view;
    if (view) {
      view.text.display = _this.textbox.value;
      _this.render();
    }
  };

  this.children = [];
  this.active = this;
  this.canvas = canvas;
  this.bounds = {
    x: 0, y: 0,
    width: canvas.width, height: canvas.height
  };
  this.intersection = {
    left: 0, top: 0, right: canvas.width, bottom: canvas.height,
    x: 0, y: 0, width: canvas.width, height: canvas.height
  };
  this.context = canvas.getContext("2d");
  this.bind();

  var getMouse = function getMouse(e, name) {
    var bounds = canvas.getBoundingClientRect();
    return {
      x: e.pageX - bounds.left,
      y: e.pageY - bounds.top,
      name: name
    };
  };

  this.last = [];
  var call = function call(e, name) {
    var mouse = getMouse(e, name);
    var mouseOver = _this.mouseOver(mouse, _this);
    _this.last.forEach(function (view) {
      if (!mouseOver.contains(view)) {
        view.onMouseOut && view.onMouseOut(getMouse(e, "onMouseOut"));
      }
    });
    mouseOver.forEach(function (view) {
      if (!_this.last.contains(view)) {
        view.onMouseIn && view.onMouseIn(getMouse(e, "onMouseIn"));
      }
    });
    _this.last = mouseOver;
    var view = mouseOver[mouseOver.length - 1];
    while (view && !view[name]) {
      view = view.parent;
    }
    if (view && view !== _this) {
      view[name](mouse);
    }
  };

  var moved = void 0;
  canvas.onmousedown = function (e) {
    moved = 0;
    call(e, "onMouseDown");
  };

  canvas.onmouseout = function (e) {
    var mouse = getMouse(e, "onMouseOut");
    _this.last.forEach(function (view) {
      view.onMouseOut && view.onMouseOut(mouse);
    });
    _this.last = [];
  };

  canvas.onmousemove = function (e) {
    moved++;
    call(e, "onMouseMove");
  };

  canvas.onmouseup = function (e) {
    call(e, "onMouseUp");
  };

  canvas.onclick = function (e) {
    if (moved < 5) {
      call(e, "onClick");
    }
  };
}

Screen.prototype = {
  mouseOver: function mouseOver(mouse, view) {
    var _this2 = this;

    return view.children.reduce(function (mouseOver, child) {
      var _child$bounds = child.bounds,
          x = _child$bounds.x,
          y = _child$bounds.y,
          width = _child$bounds.width,
          height = _child$bounds.height;

      var margin = child.margin || EMPTY_ARRAY;
      child.render(_this2.context, x + margin[3], y + margin[0], width - getLeftRight(margin), height - getTopBottom(margin), getValue(child, "round"));
      if (child.isInBounds && _this2.context.isPointInPath(mouse.x, mouse.y)) {
        return mouseOver.concat([child]).concat(_this2.mouseOver(mouse, child));
      }
      return mouseOver;
    }, []);
  },
  PERCENT: function PERCENT(percent) {
    var _this3 = this;

    return function (dim) {
      return function (view) {
        var vp = _this3.getViewPortSize(view.parent);
        return _defineProperty({}, dim, vp[OPPOSITE_DIMENSIONS[DIMENSIONS[dim]]] * percent / 100);
      };
    };
  },
  MATCH: function MATCH(dim) {
    var _this4 = this;

    return function (view) {
      var vp = _this4.getViewPortSize(view.parent);
      switch (dim) {
        case "width":
          return {
            width: vp.width
          };
        case "height":
          return {
            height: vp.height
          };
      }
    };
  },

  WRAP: function () {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    return function (dim) {
      return function (view) {
        var spaceAround = {
          width: getLeftRight(view.padding) + getLeftRight(view.margin),
          height: getTopBottom(view.padding) + getTopBottom(view.margin)
        }[dim];
        if (view.image) {
          var imageBounds = {
            width: view.image.width || view.image.naturalWidth,
            height: view.image.height || view.image.naturalHeight
          };
          var other = OPPOSITE_DIMENSIONS[dim];
          var opposite = Math.max(0, view.bounds[other] - spaceAround) / imageBounds[other] * imageBounds[dim];
          return _defineProperty({}, dim, (opposite || view.image[dim]) + spaceAround);
        } else if (view.children.length) {
          return _defineProperty({}, dim, Math.max.apply(Math, _toConsumableArray(view.children.map(function (child) {
            return child[COMPLEMENTARY_DIMENSIONS[dim]] + //child.x
            //child.bounds[COMPLEMENTARY_DIMENSIONS[dim]] + //child.bounds.x
            child.bounds[dim] + //child.bounds.width
            spaceAround;
          }))));
        } else if (view.text.display || view.input) {
          if (dim === "width") {
            context.font = view.text.size + 'px sans-serif';
            return {
              width: Math.max.apply(Math, _toConsumableArray(view.text.display.split("\n").map(function (display) {
                return context.measureText(display).width;
              }))) + spaceAround
            };
          } else if (dim === "height") {
            var count = view.text.display.split("\n").length;
            return {
              height: view.text.size * count + LINE_SPACING * (count - 1) + spaceAround
            };
          }
        }
        return _defineProperty({}, dim, spaceAround);
      };
    };
  }(),
  container: function container(width, height, render) {
    var parent = this.active;
    var child = {
      render: roundRect,
      round: 0,
      //margin
      //padding
      //background
      //onClick
      managers: [typeof width === "function" ? width("width") : function () {
        return { width: width };
      }, typeof height === "function" ? height("height") : function () {
        return { height: height };
      }, reposition],
      overflow: true,
      parent: parent,
      alpha: 1,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      bounds: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      scrollX: 0,
      scrollY: 0,
      children: [],
      text: {
        //display
        size: 12,
        color: "black",
        weight: 'normal',
        align: "left"
      }
    };
    parent.children.push(child);
    this.active = child;
    render(child);
    this.active = parent;
    return child;
  },
  style: function style(text) {
    if (text.size) {
      this.active.text.size = text.size;
    }
  },
  getViewPortSize: function getViewPortSize(view) {
    return {
      width: view.bounds.width - getLeftRight(view.padding) - getLeftRight(view.margin),
      height: view.bounds.height - getTopBottom(view.padding) - getTopBottom(view.margin)
    };
  },
  position: function position(x, y) {
    var _this5 = this;

    this.active.managers.push(function (view) {
      var vp = _this5.getViewPortSize(view.parent);
      return {
        x: vp.width * x,
        y: vp.height * y
      };
    });
  },
  anchor: function anchor(x, y) {
    this.active.managers.push(function (view) {
      return {
        x: -Math.max(view.bounds.width, 0) * x,
        y: -Math.max(view.bounds.height, 0) * y
      };
    });
  },
  visibility: function visibility(visible) {
    this.active.hidden = !visible;
  },
  animateVisibility: function animateVisibility(visible) {
    var view = this.active;
    if (visible) {
      view.hidden = false;
      this.animate({
        alpha: view.alpha
      }, {
        alpha: 1
      }, this.firstRender ? 0 : 300);
    } else {
      this.animate({
        alpha: view.alpha
      }, {
        alpha: 0
      }, this.firstRender ? 0 : 300, function () {
        view.hidden = true;
      });
    }
  },
  timeout: function timeout(callback, ms) {
    var _this6 = this;

    var active = this.active;
    setTimeout(function () {
      _this6.active = active;
      callback();
      _this6.render();
    }, ms);
  },
  margin: function margin() {
    for (var _len = arguments.length, margin = Array(_len), _key = 0; _key < _len; _key++) {
      margin[_key] = arguments[_key];
    }

    if (margin.length === 1) {
      this.active.margin = [margin[0], margin[0], margin[0], margin[0]];
    } else {
      this.active.margin = margin;
    }
  },
  padding: function padding() {
    for (var _len2 = arguments.length, padding = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      padding[_key2] = arguments[_key2];
    }

    if (padding.length === 1) {
      this.active.padding = [padding[0], padding[0], padding[0], padding[0]];
    } else {
      this.active.padding = padding;
    }
  },
  background: function background(_background) {
    this.active.background = _background;
  },
  onClick: function onClick(_onClick) {
    this.active.onClick = _onClick;
  },
  text: function text(display) {
    this.active.text.display = display;
  },
  round: function round(_round) {
    this.active.round = _round;
  },
  shadow: function shadow() {
    var shadow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this.active.shadow = shadow;
  },
  src: function src(image) {
    this.active.image = image;
  },
  textColor: function textColor(_textColor) {
    this.active.text.color = _textColor;
  },
  textAlign: function textAlign(align) {
    this.active.text.align = align;
  },
  input: function input() {
    var _this7 = this;

    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "text";

    var view = this.active;
    view.input = input;
    view.overflow = false;
    view.onClick = function () {
      view.textbox = _this7.textbox;
      _this7.textbox.view = view;
      _this7.textbox.value = view.text.display;
      _this7.textbox.type = input;
      _this7.render();
    };
  },
  animate: function animate(from, to, ms, cb) {
    var _this8 = this;

    var view = this.active;
    var start = Date.now();
    var handler = function handler() {
      var now = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();

      var percent = Math.min((now - start) / ms, 1);
      var weight = percent;
      Object.keys(from).forEach(function (key) {
        view[key] = from[key] + (to[key] - from[key]) * weight;
      });
      if (percent === 1) {
        clearInterval(interval);
        cb && cb();
      }
      _this8.render();
    };
    handler(start);
    var interval = setInterval(handler, 1000 / 60);
  },
  start: function start(view, state) {
    var _this9 = this;

    this.firstRender = true;
    this.active = this;
    this.container(this.MATCH, this.MATCH, function () {
      view.call(_this9, state);
      if (_this9.children.length > 1) {
        _this9.animate({
          alpha: .25,
          x: _this9.bounds.width
        }, {
          alpha: 1,
          x: 0
        }, 300);
      }
    });
    this.render();
    this.firstRender = false;
    return this;
  },
  back: function back() {
    var _this10 = this;

    if (this.children.length > 1) {
      this.active = this.children[this.children.length - 1];
      this.animate({
        alpha: 1,
        x: 0
      }, {
        alpha: .25,
        x: this.bounds.width
      }, 300, function () {
        _this10.children.pop();
      });
    } else {
      console.log("TODO");
    }
  },
  separator: function separator() {
    this.active.separator = true;
  },
  linear: function linear() {
    var _this11 = this;

    var spacing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'vertical';

    this.active.managers.unshift(function (view) {
      var weight = view.children.reduce(function (weight, child) {
        return weight + (child.weight || 0);
      }, 0);
      if (weight) {
        var dim = direction === "vertical" ? "height" : "width";
        var vp = _this11.getViewPortSize(view);
        var span = view.bounds[dim];
        var space = view.children.reduce(function (space, child) {
          return space - (child.weight ? 0 : child.bounds[dim]);
        }, vp[dim] - spacing * (view.children.length - 1));
        view.children.forEach(function (child) {
          if (child.weight) {
            child[dim] = child.weight / weight * space;
          }
        });
      }
      view.children.forEach(function (child, index) {
        if (index) {
          var previous = view.children[index - 1];
          if (direction === 'vertical') {
            child.y = previous.y + previous.bounds.height + spacing;
          } else if (direction === 'horizontal') {
            child.x = previous.x + previous.bounds.width + spacing;
          }
        }
      });
      return {};
    });
  },
  weight: function weight(_weight) {
    this.active.weight = _weight;
  },
  render: function render() {
    var _this12 = this;

    this.textbox.style.display = "none";
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.children.forEach(function (child) {
      _this12.layoutView(child);
      _this12.renderView(child);
    });
    var ctx = this.context;
    var cvs = this.canvas;
    ctx.beginPath();

    ctx.moveTo(0, 0);
    ctx.lineTo(cvs.width, 0);
    ctx.lineTo(cvs.width, cvs.height);
    ctx.lineTo(0, cvs.height);
    ctx.lineTo(0, 0);

    ctx.moveTo(cvs.width / 4, cvs.height / 4);
    ctx.lineTo(3 * cvs.width / 4, cvs.height / 4);
    ctx.lineTo(3 * cvs.width / 4, 3 * cvs.height / 4);
    ctx.lineTo(cvs.width / 4, 3 * cvs.height / 4);
    ctx.lineTo(cvs.width / 4, cvs.height / 4);
    ctx.fillStyle = "rgba(0,0,0,.7)";
    ctx.fill();
  },
  scrollable: function scrollable() {
    var _this13 = this;

    var active = this.active;
    active.overflow = false;
    var lastMouse = void 0,
        lastTs = Date.now(),
        dx = 0,
        dy = 0;
    setInterval(function () {
      var now = Date.now();
      var dt = (now - lastTs) / 1000;
      lastTs = now;
      dx /= 1.2;
      if (Math.abs(dx) < 1) {
        dx = 0;
      }
      dy /= 1.2;
      if (Math.abs(dy) < 1) {
        dy = 0;
      }
      if (!lastMouse && (dx || dy)) {
        update();
      }
    }, 1000 / 60);
    var update = function update() {
      var right = Math.max.apply(Math, [0].concat(_toConsumableArray(active.children.map(function (child) {
        return child.bounds.x + child.bounds.width - (active.bounds.x + active.bounds.width + active.scrollX);
      }))));
      var bottom = Math.max.apply(Math, [0].concat(_toConsumableArray(active.children.map(function (child) {
        return child.bounds.y + child.bounds.height - (active.bounds.y + active.bounds.height + active.scrollY);
      }))));
      active.scrollX = Math.max(Math.min(active.scrollX + dx, 0), -right);
      active.scrollY = Math.max(Math.min(active.scrollY + dy, 0), -bottom);
      _this13.render();
    };
    active.onMouseMove = function (mouse) {
      if (lastMouse) {
        dx = mouse.x - lastMouse.x;
        dy = mouse.y - lastMouse.y;
        update();
        lastMouse = mouse;
      }
    };
    active.onMouseDown = function (mouse) {
      lastMouse = mouse;
    };
    active.onMouseUp = active.onMouseOut = function (mouse) {
      lastMouse = null;
    };
  },
  getIntersection: function getIntersection(view) {
    var parent = view.parent;
    var intersection = {
      x: Math.max(parent.intersection.x, view.bounds.x),
      y: Math.max(parent.intersection.y, view.bounds.y)
    };
    intersection.left = intersection.x;
    intersection.top = intersection.y;
    intersection.right = Math.min(parent.intersection.x + parent.intersection.width, view.bounds.x + view.bounds.width);
    intersection.bottom = Math.min(parent.intersection.y + parent.intersection.height, view.bounds.y + view.bounds.height);
    intersection.width = intersection.right - intersection.left;
    intersection.height = intersection.bottom - intersection.top;
    view.intersection = intersection;
    //then check if its in bounds
    view.isInBounds = intersection.width > 0 && intersection.height > 0 && !view.hidden;
  },
  layoutView: function layoutView(view) {
    var _this14 = this;

    var bounds = view.hidden ? { x: 0, y: 0, width: 0, height: 0 } : view.managers.reduce(function (bounds, manager) {
      var wrapper = manager(view);
      var current = typeof wrapper === "function" ? wrapper(view) : wrapper;
      return {
        x: Math.round((current.x || 0) + bounds.x),
        y: Math.round((current.y || 0) + bounds.y),
        width: Math.round((current.width || 0) + bounds.width),
        height: Math.round((current.height || 0) + bounds.height)
      };
    }, {
      x: 0,
      y: 0,
      width: view.width,
      height: view.height
    });
    var moved = !equals(view.bounds, bounds);
    view.bounds = bounds;
    if (moved) {
      this.layoutView(view);
    } else {
      this.getIntersection(view);
    }
    if (view.children.length) {
      if (view.children.reduce(function (moved, child) {
        return _this14.layoutView(child) || moved;
      }, false)) {
        this.layoutView(view);
        return true;
      }
    }
    return moved;
  },
  renderView: function renderView(view) {
    var _this15 = this;

    if (view.isInBounds) {
      this.context.save();
      this.context.globalAlpha = this.context.globalAlpha * view.alpha;
      var x = view.bounds.x;
      var y = view.bounds.y;
      var width = view.bounds.width;
      var height = view.bounds.height;
      var hw = width / 2;
      var hh = height / 2;
      var margin = view.margin || EMPTY_ARRAY;
      var padding = view.padding || EMPTY_ARRAY;
      var mw = width - getLeftRight(margin);
      var mh = height - getTopBottom(margin);

      if (view.shadow) {
        var shadow = 2;
        this.context.shadowColor = 'rgba(0, 0, 0, .7)';
        this.context.shadowBlur = shadow;
        this.context.shadowOffsetX = shadow;
        this.context.shadowOffsetY = shadow;
      }
      view.render(this.context, x + margin[3], y + margin[0], mw, mh, getValue(view, "round"), view.background || "transparent");
      this.context.shadowColor = 'transparent';
      this.context.shadowBlur = 0;
      this.context.shadowOffsetX = 0;
      this.context.shadowOffsetY = 0;
      //DEBUG HERE
      if (false) {
        this.context.translate(x, y);
        //padding
        if (padding) {
          this.context.fillStyle = "rgba(0, 255, 0, .7)";
          //top
          this.context.fillRect(margin[3], margin[0], width - (margin[3] + margin[1]), padding[0]);
          //left
          this.context.fillRect(margin[3], margin[0] + padding[0], padding[3], height - (margin[0] + margin[2] + padding[0]));
          //right
          this.context.fillRect(width - margin[1] - padding[1], margin[0] + padding[0], padding[1], height - (margin[0] + margin[2] + padding[0]));
          //bottom
          this.context.fillRect(margin[3] + padding[3], height - margin[2] - padding[2], width - (margin[3] + padding[3] + margin[1] + padding[1]), padding[2]);
        }
        //margin
        if (margin) {
          this.context.fillStyle = "rgba(0, 0, 255, .7)";
          //top
          this.context.fillRect(0, 0, width, margin[0]);
          //left
          this.context.fillRect(0, margin[0], margin[3], height - margin[0]);
          //right
          this.context.fillRect(width - margin[1], margin[0], margin[1], height - margin[0]);
          //bottom
          this.context.fillRect(margin[3], height - margin[2], width - margin[1] - margin[3], margin[2]);
        }
        //outline
        this.context.strokeStyle = "rgba(0, 0, 0, .7)";
        this.context.setLineDash([2, 4]);
        this.context.strokeRect(0, 0, width, height);
        this.context.setLineDash([]);
        this.context.translate(-x, -y);
      }
      if (view.image && view.image.complete) {
        this.context.drawImage(view.image, x + padding[3], y + padding[0], mw - getLeftRight(padding), mh - getTopBottom(padding));
      }
      //STOP DEBUG
      if (!view.overflow) {
        this.context.clip();
      }
      if (view.textbox) {
        view.textbox.style.display = "block";
        view.textbox.style.left = view.bounds.x + 'px';
        view.textbox.style.top = view.bounds.y + 'px';
        view.textbox.style.width = view.bounds.width + 'px';
        view.textbox.style.height = view.bounds.height + 'px';
        if (this.textbox !== document.activeElement) {
          this.textbox.focus();
        }
      }
      if (view.text.display) {
        var offset = view.textbox ? view.textbox.scrollLeft : 0;
        this.context.fillStyle = view.text.color;
        this.context.font = view.text.size + 'px sans-serif';
        this.context.textBaseline = "top";
        this.context.textAlign = view.text.align;
        var lines = view.text.display.split("\n");
        lines.forEach(function (line, index) {
          var offsetX = 0;
          switch (_this15.context.textAlign) {
            case "right":
              offsetX = width - getLeftRight(padding);break;
            case "center":
              offsetX = mw / 2 - padding[3];break;
          }
          // \u25CF
          // \u2022
          _this15.context.fillText(view.input === "password" ? line.split("").map(function (it) {
            return '\u2022';
          }).join("") : line, x + offsetX + padding[3] - offset, y + index * (view.text.size + LINE_SPACING) + padding[0]);
        });
      }
      view.children.forEach(function (child, index) {
        _this15.renderView(child);
        if (index > 0 && view.separator) {
          _this15.context.beginPath();
          _this15.context.moveTo(child.bounds.x, child.bounds.y);
          _this15.context.lineTo(child.bounds.x + child.bounds.width, child.bounds.y);
          _this15.context.strokeStyle = "rgba(0, 0, 0, .7)";
          _this15.context.stroke();
        }
      });
      this.context.globalAlpha = this.context.globalAlpha / view.alpha;
      this.context.restore();
    }
  },
  button: function button(color) {
    this.textAlign("center");
    this.padding(16);
    this.textColor("white");
    if (color) {
      this.round(function (child) {
        return Math.min(child.bounds.width / 2, child.bounds.height / 2);
      });
      this.background(color);
    }
  },
  card: function card() {
    this.background("white");
    this.round(slight_round);
    this.shadow();
  },
  tabs: function tabs() {
    var _this16 = this;

    for (var _len3 = arguments.length, tabs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      tabs[_key3] = arguments[_key3];
    }

    var tab$ = new Observable(0);
    this.container(this.MATCH, this.WRAP, function (container) {
      _this16.container(_this16.MATCH, _this16.WRAP, function () {
        _this16.linear(0, "horizontal");
        tabs.forEach(function (text, index) {
          _this16.container(0, _this16.WRAP, function () {
            _this16.textColor(index ? "black" : "white");
            _this16.padding(16);
            _this16.weight(1);
            _this16.text(text);
            _this16.style(normal_12);
            _this16.textAlign("center");
            _this16.onClick(function () {
              return tab$.set(index);
            });
          });
        });
      });
      var indicator = _this16.container(function (dim) {
        return function (view) {
          return {
            width: view.parent.bounds.width / tabs.length
          };
        };
      }, 5, function () {
        _this16.position(0, 1);
        _this16.anchor(0, 1);
        _this16.background("gold");
      });
      tab$.observe(function (tab) {
        container.children[0].children.forEach(function (child) {
          child.text.color = "black";
        });
        container.children[0].children[tab].text.color = "white";
        _this16.active = indicator;
        _this16.animate({
          x: indicator.x
        }, {
          x: tab * container.bounds.width / tabs.length
        }, 300);
      });
    });
    return tab$;
  },
  observe: function observe() {
    var _this17 = this;

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var observables$ = args;
    var callback = observables$.pop();
    var view = this.active;
    observables$.forEach(function (observable$, i) {
      observable$.observe(Observable.skipFirst(function (observable) {
        _this17.active = view;
        var values = observables$.map(function (it) {
          return it.get();
        });
        values[i] = observable;
        callback.apply(undefined, _toConsumableArray(values));
      }));
    });
    callback.apply(undefined, _toConsumableArray(observables$.map(function (it) {
      return it.get();
    })));
  },
  bind: function bind() {
    for (var i in this) {
      if (typeof this[i] === "function") {
        this[i] = this[i].bind(this);
      }
    }
  }
};
exports.default = Screen;
},{}],"src/js/index.js":[function(require,module,exports) {
"use strict";

require("./prototype");

var _splash = require("./views/splash");

var _splash2 = _interopRequireDefault(_splash);

var _screen = require("./rave/screen");

var _screen2 = _interopRequireDefault(_screen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _screen2.default(document.getElementsByTagName("canvas")[0]).start(_splash2.default);
},{"./prototype":"src/js/prototype.js","./views/splash":"src/js/views/splash.js","./rave/screen":"src/js/rave/screen.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '62251' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/index.js"], null)
//# sourceMappingURL=/js.c589d864.map