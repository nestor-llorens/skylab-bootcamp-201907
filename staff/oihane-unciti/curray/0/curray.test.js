'use strict';

describe('Curray', function() {
    describe('push', function() {
        it('should push a string', function() {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0], 'hola mundo');
            expect(result, 1);
        });
    });

    describe('pop', function() {
        it('should pop a string', function() {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result, 'mundo');
            expect(curray.length, 1);
            expect(curray[1], undefined);
        });
    });

    describe('forEach', function() {
        it('should output each element index and curray', function () {
            var curray = new Curray('a', 'b', 'c');
    
            var outputs = [];
    
            curray.forEach(function (element, index, curray) {
                outputs.push([element, index, curray]);
            });
    
            expectArrays(outputs, [
                ['a', 0, curray],
                ['b', 1, curray],
                ['c', 2, curray]
            ]);
        });
    
    });


    describe('arrayConcat', function() {
        it('should concat 2 elements', function() {
            var curray = new Curray (1 ,2, 3);
            var curray2 = new Curray (4, 5, 6);

            var result = curray.concat(curray2);
            expectArrays(Array.from(result), [1, 2, 3, 4, 5, 6]);
        });
    });


    describe('flat', function() {
        it('should flatten a curray to the given depth', function() {
            var curray1 = new Curray (1, 2, 3, new Curray ("a", "b", "c", new Curray (true, false, new Curray (undefined, null, new Curray ({}, function () { }, new Curray (NaN))))));
            var result = flat(curray);
            expectArrays(Array.from(result), [1, 2, 3, 'a', 'b', 'c', [true, false, [undefined, null, [{}, function () { }, [NaN]]]]]);
    
        });
    });

   
    /* describe('copyWithin', function() {
        it('copies and modifies the array', function() {
            var curray = new Curray("a","b","c");

            var result = copyWithin(curray, 2 , 1);

            expect(result, "a", "b", "a");
        });
    }); */
});