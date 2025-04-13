"use strict";

/**
 * Namespace manager
 */
var App = App || {};
var createNamespace = function(ns) {

    var parts = ns.split(".");
    var pl = parts.length;
    var parent = App || {};

    if (parts[0] === "App"){
        parts = parts.slice(1);
    }

    for (var i = 0; i < pl; i++){
        if (typeof parent[parts[i]] === "undefined"){
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    
    return parent;
};