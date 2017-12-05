window.kQuery = (function () {
    'use strict';

    class $ {
        constructor(selector, context = document.body) {
            switch (selector.slice(0, 1)) {
            case '.':
                Object.assign(this, $.getBySelector(selector, context));
                return;
            case '<':
                Object.assign(this, $.parseHTML(selector));
                return;
            default:
                console.log(`TODO: create null object`)
            }
        }

        static pipe(initial, ...functions) {
            return functions.reduce((soFar, fn) => fn(soFar, initial));
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

        removeClass() {}

        toggleClass() {}

        hasClass() {}
    }

    return (selector, context) => new $(selector, context);
}());
