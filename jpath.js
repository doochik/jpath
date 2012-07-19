(function() {

// var jpath = function() {};
var jpath = function() {
    var a = 1;
};


if (typeof exports !== 'undefined') {
    exports = jpath;
} else {
    window.jpath = jpath;
}

(function() {
jpath.extend = function(to, from) {
    if (!from) {
        from = to;
        to = {};
    }

    for (var key in from) {
        to[key] = from[key];
    }

    return to;
};

jpath.util = jpath.extend({
    /**
     * Прокидывает параметр в вызов функции
     * @param {Function} func
     * @param {Object} param
     */
    carry: function(func) {
        var slice = Array.prototype.slice;
        var carries = slice.apply(arguments, 1);
        return function() {
            func.apply(null, carries.concat( slice.apply(arguments) ));
        }
    }

});
})();

jpath.operator = {};

(function(){

/**
 * Регулярка для сплита jpath-a в шаги
 * @example
 *  '.foo[.bar].loo' -> ['foo[.bar]', 'loo'];
 * @type RegExp
 */
var reSplit = /\.(?![^\[]+\])/;

/**
 * Извелекает содержимое предиката
 * @type RegExp
 */
var rePredicate = /([^\[]+)\[([^\]]+)\]/;

/**
 * Используется для заполнения строки предиката пробелами,
 * когда из него извлекаются значения
 * @type String
 */
var placeholder = Array(100).join(' ');

/**
 * Сплитит jpath в массив,
 * который потом используется для поиска по json-у
 * @example
 *  '.foo' -> ['node', 'foo']
 *  '.foo[.bar]' -> ['node', 'foo', 'pred', ['node', 'bar']]
 */
jpath.split = function(path) {
    var step;
    var result = [];
    var carry = jpath.util.carry;
    var steps = path.split(reSplit).slice(1);

    while (step = steps.shift()) {
        var match = step.match(rePredicate);

        // если удалось извлечь предикат
        if (match) {

        } else {
            result.push('node', step);
        }
    }

    return result;
};

})();

jpath.predicate = function() {};

jpath.exec = function() {};


})();
