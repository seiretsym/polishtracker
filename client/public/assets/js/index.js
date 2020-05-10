// initialize materialize things
$(document).ready(function () {
  $('select').material_select();
  M = window.M;
  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, options);
  });
});