import $ from "jquery";

var elements = [];
export default function($node) {
  $node.find(".brz-counter").each(function() {
    var $this = $(this);
    elements.push({
      elem: this,
      start: $this.attr("data-start"),
      end: $this.attr("data-end"),
      duration: $this.attr("data-duration")
    });

    $this.addClass("brz-initialized");
  });

  var isScrolledIntoView = function(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
    return isVisible;
  };

  var animate = function(value) {
    var $figures = $(value.elem).find(".counter-figures .numbers");
    var $chart = $(value.elem).find(".pie-chart");

    var step = function(countNum) {
      $figures.text(parseInt(countNum));
      $chart &&
        $chart.css("stroke-dasharray", "calc(" + countNum + " + 0.5) 100");
    };

    $({ countNum: Number(value.start) }).animate(
      {
        countNum: Number(value.end)
      },
      {
        duration: Number(value.duration * 1000),
        easing: "linear",

        step: function() {
          step(this.countNum);
        },

        complete: function() {
          step(value.end);
        }
      }
    );
  };

  var onScroll = function() {
    elements = elements.filter(function(value) {
      if (isScrolledIntoView(value.elem)) {
        animate(value);
        return false;
      }
      return true;
    });

    if (!elements.length) {
      document.removeEventListener("scroll", onScroll);
    }
  };

  $(document).on("brz.popup.show", onScroll);
  document.addEventListener("scroll", onScroll);
  onScroll();
}
