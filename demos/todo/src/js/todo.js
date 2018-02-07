/* global fluid, sjrk */

(function ($, fluid) {

    "use strict";

    fluid.defaults("sjrk.dynamicViewComponentManager.demos.todo.app", {
        gradeNames: ["fluid.component"],
        components: {
            todoControls: {
                type: "dynamicViewComponentManager.demos.todo.controls",
                container: ".sjrkc-todo-controls"
            },
            todoManager: {
                type: "sjrk.dynamicViewComponentManager",
                container: ".sjrkc-todo-list",
                options: {
                    dynamicComponents: {
                        managedViewComponents: {
                            type: "sjrk.dynamicViewComponentManager.demos.todo.item"
                        }
                    },
                    listeners: {
                        "{todoControls}.events.onAddControlClicked": {
                            func: "{that}.events.viewComponentContainerRequested",
                            namespace: "addItem"
                        }
                    }
                }
            }
        }
    });

    fluid.defaults("sjrk.dynamicViewComponentManager.demos.todo.item", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            removeControl: ".sjrkc-todo-item-remove-control"
        },
        events: {
            onRemoveControlClicked: null
        },
        listeners: {
            "onCreate.appendMarkup": {
                "this": "{that}.container",
                "method": "html",
                "args": ["<p class='sjrkc-todo-item-container sjrk-todo-item-container'><label class='sjrkc-todo-item-label 'sjrk-todo-item-label'>To-Do: <input class='sjrkc-todo-item-input sjrk-todo-item-input'></input></label> <button class='sjrkc-todo-item-remove-control sjrk-todo-item-remove-control'>Remove</button></p>"]
            },
            "onCreate.bindRemoveControl": {
                "this": "{that}.dom.removeControl",
                "method": "click",
                "args": "{that}.destroy"
            }
        }
    });

    fluid.defaults("dynamicViewComponentManager.demos.todo.controls", {
        gradeNames: ["fluid.viewComponent"],
        selectors: {
            addControl: ".sjrkc-todo-controls-add"
        },
        events: {
            onAddControlClicked: null
        },
        listeners: {
            "onCreate.appendMarkup": {
                "this": "{that}.container",
                "method": "html",
                "args": ["<button class='sjrkc-todo-controls-add sjrk-todo-controls-add'>Add Item</button>"]
            },
            "onCreate.bindAddControl": {
                "this": "{that}.dom.addControl",
                "method": "click",
                "args": "{that}.events.onAddControlClicked.fire"
            }
        }
    });


})(jQuery, fluid);
