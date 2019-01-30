//	function toggle_visibility_flex(id) {
//     var e = document.getElementById(id);
//     if(e.style.display == 'block')
//        e.style.display = 'none';
//     else
//        e.style.display = 'block';
//  }
    class homeView {
        constructor(container, model) {
            container.html("<p>\n        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut lorem est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer diam ante, commodo id dolor et, hendrerit malesuada ipsum. Nullam rutrum lorem sed arcu commodo rhoncus. Etiam sit amet molestie ligula, id dapibus est. Nullam faucibus ex ac sagittis lacinia. Vestibulum condimentum in purus non gravida. Cras tincidunt auctor erat nec commodo. In at quam at orci malesuada posuere. Sed in augue tempor, bibendum lectus et, euismod dolor. Etiam in molestie nisi, porta vestibulum urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum suscipit velit ornare purus faucibus, in maximus diam feugiat.\n</p>\n      <button class=\"button\" onclick=\"selectDish()\">\n        Create new dinner\n      </button>");
        }
    }