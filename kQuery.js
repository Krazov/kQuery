window.kQuery = (function () {
    'use strict';

    class $ {
        constructor(selector, context = document.body) {
            switch (selector.slice(0, 1)) {
            case '<':
                Object.assign(this, $.parseHTML(selector));
                return;
            case null:
                Object.assign(this, {length: 0});
                return;
            default:
                Object.assign(this, $.getBySelector(selector, context));
                return;
            }
        }

        static getBySelector(selector, context) {
            return $.createNodesObject(context.querySelectorAll(selector));
        }

        static parseHTML(HTMLString) {
            return $.createNodesObject(document.createRange().createContextualFragment(HTMLString).children);
        }

        static createNodesObject(nodes) {
            return Object.assign({}, nodes, {length: nodes.length});
        }

        // general utils
        static arrify(object) {
            return Array.from(object);
        }

        static pipe(initial, ...functions) {
            return functions.reduce((soFar, fn) => fn(soFar, initial));
        }

        // appending
        append($children) {
            $.appending(this[0], $.arrify($children));

            return this;
        }

        appendTo($parent) {
            $.appending($parent[0], $.arrify(this));

            return this;
        }

        static appending(parent, children) {
            children.forEach(child => {
                parent.appendChild(child);
            });
        }

        // class operations
        addClass(className) {
            $.arrify(this)
                .forEach(item => {
                    item.classList.add(className);
                });

            return this;
        }

        removeClass(className) {
            $.arrify(this)
                .forEach(item => {
                    item.classList.remove(className);
                });

            return this;
        }

        toggleClass(className, force) {
            $.arrify(this)
                .forEach(item => {
                    item.classList.toggle(className, force);
                });

            return this;
        }

        hasClass(className) {
            return $.arrify(this).some(item => item.classList.contains(className));
        }
    }

    return (selector, context) => new $(selector, context);
}());
