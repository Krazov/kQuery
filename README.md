# kQuery

_Draft #1, December 9th, 2017_

## Preface

>The only way to get rid of temptation is to yield to it... I can resist everything but temptation.
>
>-- Oscar Wilde

[jQuery](https://github.com/jquery/jquery) is probably the most popular library used around the web. [_citation needed_] When it showed for the first time, it was a gamechanger because DOM API was nowhere near where it’s today. According to Douglas Crockford, DOM API was a thing that scared away a lot of good people from JavaScript.

Over the years more and more native methods were added which allowed user to go relatively easier with vanilla than a decade ago. For years there were temptations to drop this lovely library and write vanilla JS instead but after initial successes (i.e. `classList` property) I was hitting a wall when some need required more work than it was worth (on one occasion it was `closest(..)`). After all, DRY principle extends to using tools (libraries, frameworks, etc.) instead of writing them anew. Of course, if project is small, then vanilla might be just enough. (On the other hand, if it’s bigger, then maybe something more serious is needed.)

Recently, my collegue tried to parse string to HTML instead of using jQuery (which we had in project, so that wouldn’t be any new dependency). We fought a while, resigned, and after all learned about existence of `document.createRange().createContextualFragment(..)`. While we stayed with jQuery in our project, for me it was a spark to give it another shot, as I understood that it simply will not let me be.

_Sliema, Malta, December 9th, 2017_

## Purpose

The main purpose of this project is my own education. I am going to explore which jQuery methods, and how easy, can be replicated with native functions only. (I did something similar with `Array.prototype.reduce` [here](https://medium.com/@Krazov/reduce-everything-a6f142f74eb1) a while back, inspired by Haskell tutorial, and I find this method going well with me.)

While a lot can be done natively, it requires sometimes more writing. Which leads us to wrapping them elaborate calls for our own sake. I usually was going back to jQuery at this point because I didn’t feel like writing wrapper was making any more sense than simply sticking with it. The other thing I want to train is writing this kind of tools. I decided not to check how jQuery itself achieves those goals; I will do that later, to compare it. I will be, though, using jQuery’s

jQuery has one advantage: it has been developed for over 10 years and has been tested by millions of users. I don’t think I can beat that, nor that I should. So while I want to make kQuery interchangable with jQuery, I don’t think I will really get there. I am going to start with methods I use on my own and if I run out of those I will worry then.

**Note:** if you want me to look into some specific method that hasn’t been looked into yet, do please open issue on GitHub. I don’t have any precise plan apart from focusing on DOM manipulations.

Last but not least, I tend to find a pleasure in writin low level JS, and professionally it’s not always good choice (DRY, fool). Here I don’t have those constraints.

## Name

kQuery comes from jQuery and my handle (Krazov). As I see this as more of a tribute to the original library than competition, I hope it’s not a problematic choice.

## Technicalities

### General

kQuery utlizes native `class` but as internal implementation, so this might or might not change in the future. `class` produces object with prototyped methods, as well as `static` methods for utility _pure_ functions (to avoid confusion: functions that produce output for given input).

**Note:** I am considering at the moment to move `static` functions outside of `class` but so far I find it helpful to organize them this way.

I use all the new stuff that JavaScript gives so apart from `class` there are arrow functions but also a lot of new native `Object` or `Array` prototype methods. This means that compatibility of my lib is much much smaller than the original. Also, I don’t give any guarantee. If anything, use it for education purposes as well.

### Chaining

All the methods that mutate `this` elements and not return some specific value (i.e. `hasClass(..)` returning `true`/`false`) are chainable (`return this;`). This makes jQuery object behave like endofunctor (on more generous day we could even say monad-like object), and that made me respect jQuery even more as I found working with chains more approchable and clearer to me.

### Creating object

So far for strings starting with `<` are parsed, `null` creates null object, and the rest is passed to `querySelectorAll`. Those are the only situations I needed but I am planning to check if that’s all. (It just struck me that I should also check if it’s not `nodeList` or DOM element.)

Inside, jQuery object looks like array with extra properties (not covered yet). To achieve that I `Object.assign(..)` `this` with `nodeList` and its length (`length` is not enumerable property). Thanks to that I can then arrify it back with `Array.from(..)` to have access to `Array.prototype` methods.

### Appending/prepending elements

Appending has been done, prepending still waits for its day. Here I utilize probably one of the oldest JS function, `appendChild`.

### Manipulating DOM elements class names

Here it was pretty easy because of [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList). This set of functions is nothing more than mapping to vanilla JS.