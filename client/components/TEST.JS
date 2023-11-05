var expect = function(val) {
    return {
     toBe: function(expectedValue) {
       if (val === expectedValue) {
         return true;
       } else {
         throw new Error("Not Equal");
       }
    },
       notToBe: function(expectedValue) {
       if (val !== expectedValue) {
         return true;
       } else {
         throw new Error("Equal");
       }
    },
     
 }
 }
 
 
 expect(5).toBe(5)
 expect(5).notToBe(5)
 