var form            = document.querySelector(".form");
var find            = document.querySelector(".input_find");
var replace         = document.querySelector(".input_replace");
var find_verif      = document.querySelector(".input_find_verif");
var replace_verif   = document.querySelector(".input_replace_verif");
var sentence_html   = document.querySelector(".sentence");
var sentence;
var count;

var sentence_list = [
  "Lots of homeless people died in the streets during winter.",
  "The death toll has reached tremendous amounts as war is raging.",
  "Meanwhile, the government increased the taxes for everyone.",
  "Meat and dairy products aren't necessary for a human to live healthy.",
  "Another shooting left 17 kids dead in a Florida school.",
  "Al-Qaeda claimed to be the origin of the Brexit.",
  "A recent study proved that a great absorption of sun's light can satisfy all human needs.",
  "Koreans once again won the world championship of League of Legends.",
  "Tourists say they have seen Michael Jackson in Australia.",
  "A recent study proved that B12 vitamin increases the risk of cancer.",
  "Amazon now deliver packages with self-piloted drones.",
  "AI developpement should create a thousand of jobs during the next two year.",
  "NASA researchers received a creepy message from mars.",
  "Hunting is now illegal, hunters will have to find another job.",
  "Eating plants is now illegal, vegans will have to eat corpses or die",
  "Google was hacked by a young studient.",
  "The most precious diamond on earth has been sold for 2.7 billions USD.",
  "World hunger can be resolved if 2.7 billions people gave 1 USD.",
  "Corruption has been increasing a lot in the last 3 months.",
  "'To eat animals or to love animals, that is the question', a philosopher says.",
  "Two tsunamis were detected in the pacific ocean. They should cross in two days."
];
var changed_sentence_list = [];

function set_find_correct(i) {
  find_verif.textContent = "count: " + i;
  find_verif.classList.remove("input_find_verif_wrong");
}

function set_find_wrong() {
  find_verif.textContent = "no match!";
  find_verif.classList.add("input_find_verif_wrong");
}

function check_words() {
  var i;
  var j;
  var k = 0;

  sentence = document.querySelector(".sentence").textContent;
  sentence_html.innerHTML = sentence;
  if (find.value === "") {
    set_find_wrong();
    return;
  }
  sentence  = sentence.slice(1, sentence.length - 1);
  count = 0;
  for (i = 0; i < sentence.length; i++) {
    if (sentence[i].toLowerCase() === find.value[0].toLowerCase() && sentence.length - i >= find.value.length) {
      for (j = 0; j < find.value.length; j++) {
        if (sentence[i + j].toLowerCase() !== find.value[j].toLowerCase()) {
          break;
        }
      }
      if (j === find.value.length) {
        count++;
      }
    }
  }
  var regexp = new RegExp(find.value, "g");
  sentence_html.innerHTML = sentence_html.innerHTML.replace(regexp, "<span class='selected_text'>" + find.value + "</span>");
  if (count === 0) {
    set_find_wrong();
  } else {
    set_find_correct(count);
  }
}

function get_new_sentence() {
  sentence_html.textContent = "\"" + sentence_list[Math.floor(Math.random() * sentence_list.length)] + "\"";
}

function replace_words() {
  var regexp = new RegExp(find.value, "g");

  console.log("\"" + sentence.replace(regexp, replace.value) + "\"");
  sentence_html.textContent = "\"" + sentence.replace(regexp, replace.value) + "\"";
  console.log(sentence_html.textContent.slice(1, sentence_html.textContent.length - 1));
  changed_sentence_list.push(sentence_html.textContent.slice(1, sentence_html.textContent.length - 1));
  setTimeout(function() {
    get_new_sentence();
    find.value = "";
    replace.value = "";
    find.focus();
  }, 500);
}

function key_down() {
  setTimeout(function() {
    check_words();
  }, 0.30);
  if (find.value !== "" && event.keyCode === 13 && count !== 0) {
    console.log("replace");
    replace_words();
  }
}

get_new_sentence();

form.addEventListener("submit", function(event) {
  event.preventDefault();
});

find.addEventListener("keydown", function(event) {
  key_down();
});

replace.addEventListener("keydown", function(event) {
  key_down();
});
