jQuery(document).ready(function($) {
    var $menu = $("#menu-to-edit"), observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            var newNodes = mutation.addedNodes;
            if (newNodes !== null) {
                $(newNodes).each(function() {
                    new menuLevel($(this)).makeCollapseable().changeMenuItem();
                });
            }
            $(".menu-item").each(function() {
                new menuLevel($(this)).notFollowedBy();
            });
        });
    }), config = {
        childList: true
    }, $customizer = $(".wp-full-overlay-sidebar-content"), initItems = function() {
        $(".menu-item").each(function() {
            var $item = $(this);
            var lvl = new menuLevel($item).makeCollapseable().changeMenuItem();
            $item.find(".collapser").addClass("is-collapsed").parent().nextUntil(".menu-item-depth-0, .customize-control-nav_menu").hide();
            lvl.notFollowedBy();
        });
    };
    if ($customizer.length) {
        $(document).on("click", $customizer, function() {
            var $menu = $("#menu-to-edit");
            if (!$menu.length) {
                $menu = undefined;
                return;
            }
            initItems();
            observer.observe($menu[0], config);
        });
    }
    if ($menu.length) {
        initItems();
        observer.observe($menu[0], config);
    }
    $(document).on("click", ".collapser", function(e) {
        var $collapser = $(this), $menuItem = $collapser.parent(), lvl = new menuLevel($menuItem);
        if (!$collapser.hasClass("is-disabled")) {
            if ($collapser.hasClass("is-collapsed")) {
                $menuItem.nextUntil(".menu-item-depth-" + lvl.depth(), ".menu-item-depth-" + (lvl.depth() + 1)).show();
                if (e.altKey) {
                    var $items = $menuItem.nextUntil(".menu-item-depth-" + lvl.depth());
                    $items.show();
                    $.each($items, function() {
                        var $collapser = $(this).find(".collapser");
                        if (!$collapser.hasClass("is-disabled")) {
                            $collapser.removeClass("is-collapsed");
                        }
                    });
                }
            } else {
                var nextMenuItems = $menuItem.nextUntil(".menu-item-depth-" + lvl.depth());
                $.each(nextMenuItems, function(i, el) {
                    var matchingClass = "menu-item-depth-[0-" + lvl.depth() + "]";
                    if (!$(el).attr("class").match(matchingClass)) {
                        $(el).find(".collapser").addClass("is-collapsed").parent().hide();
                    }
                });
            }
            $collapser.toggleClass("is-collapsed");
        }
        return false;
    });
});

var menuLevel = function($item) {
    this.$item = $item;
    var $ = jQuery;
    this.changeMenuItem = function() {
        if (this.$item.children(".menu-item-bar").find(".item-delete").length === 0) {
            this.$item.find(".menu-item-handle");
            var remove = this.$item.find($(".item-delete")).clone();
            remove.css({
                display: "inline",
                float: "none",
                "margin-left": "10px"
            }).appendTo(this.$item.find(".item-title"));
        }
        return this;
    };
    this.makeCollapseable = function() {
        if (!this.$item.find(".collapser").length) {
            this.$item.prepend($("<span>").addClass("collapser"));
        }
        return this;
    };
    this.notFollowedBy = function() {
        if (this.$item.next(".menu-item-depth-" + (this.depth() + 1)).length === 0) {
            this.$item.find(".collapser").addClass("is-disabled is-collapsed");
        } else {
            this.$item.find(".collapser").removeClass("is-disabled");
            if (this.$item.next(".menu-item-depth-" + (this.depth() + 1)).is(":visible")) {
                this.$item.find(".collapser").removeClass("is-collapsed");
            }
        }
        return this;
    };
    this.depth = function() {
        var classes = this.$item.attr("class").split(" "), depth = 0, matchedClass = null;
        $.each(classes, function(index, classname) {
            matchedClass = $.trim(classname).match(/^menu-item-depth-(\d)$/);
            if (matchedClass) {
                depth = matchedClass[1];
                return false;
            }
        });
        return parseInt(depth, 10);
    };
};