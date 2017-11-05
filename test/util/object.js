'use strict';


const prop = (obj, name) => {
    return Object.keys(obj).reduce((accum, key) => {
        accum[key] = obj[key][name];
        return accum;
    }, {});
};


module.exports = {
    prop
};
