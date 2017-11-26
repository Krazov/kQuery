window.kQuery = (function () {
    'use strict';

    class kQuery {
        constructor(selector, context = document.body) {
            switch (selector.slice(0, 1)) {
            case '.':
                Object.assign(this, kQuery.getBySelector(selector, context));
                return;
            case '<':
                Object.assign(this, kQuery.parseHTML(selector));
                return;
            default:
                console.log(`TODO: create null object`)
            }
        }

        static getBySelector(selector, context) {
            return kQuery.createNodesObject(context.querySelectorAll(selector));
        }

        static parseHTML(HTMLstring) {
            return kQuery.createNodesObject(document.createRange().createContextualFragment(HTMLstring).children);
        }

        static createNodesObject(nodes) {
            return Object.assign({}, nodes, {length: nodes.length});
        }

        // general utils
        static arrify(object) {
            return Array.from(object);
        }

        // appending
        append($element) {
            kQuery.appending(this[0], kQuery.arrify($element));

            return this;
        }

        appendTo($container) {
            kQuery.appending($container[0], kQuery.arrify(this));

            return this;
        }

        static appending(parent, children) {
            children.forEach(child => {
                parent.appendChild(child);
            });
        }

        // class operations
        addClass(className) {
            kQuery
                .arrify(this)
                .forEach(item => {
                    item.classList.add(className);
                });

            return this;
        }

        removeClass() {}

        toggleClass() {}

        hasClass() {}
    }

    return (selector, context) => new kQuery(selector, context);
}());