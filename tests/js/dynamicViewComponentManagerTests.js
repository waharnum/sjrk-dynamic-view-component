/* global fluid, jqUnit, sjrk */

(function ($, fluid) {

    "use strict";

    fluid.defaults("sjrk.testDynamicViewComponentManager", {
        gradeNames: ["sjrk.dynamicViewComponentManager"],
        dynamicComponents: {
            managedViewComponents: {
                type: "sjrk.testDynamicViewComponent"
            }
        }
    });

    fluid.defaults("sjrk.testDynamicViewComponent", {
        gradeNames: ["fluid.viewComponent"],
        listeners: {
            "onCreate.appendMarkup": {
                "this": "{that}.container",
                "method": "html",
                "args": ["{that}.options.managedViewComponentDetails.containerIndividualClass"]
            }
        }
    });

    fluid.defaults("sjrk.dynamicViewComponentManagerTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test the sjrk.dynamicViewComponentManager component.",
            tests: [{
                expect: 4,
                name: "Test dynamic component container addition and deletion.",
                sequence: [{
                    listener: "sjrk.dynamicViewComponentManagerTester.testInit",
                    "event": "{dynamicViewComponentManagerTests dynamicViewComponentManager}.events.onCreate",
                    args: ["{dynamicViewComponentManager}"]
                }, {
                    func: "{dynamicViewComponentManager}.events.viewComponentContainerRequested.fire"
                }, {
                    listener: "sjrk.dynamicViewComponentManagerTester.testComponentContainerAppended",
                    event: "{dynamicViewComponentManager}.events.viewComponentRegisteredWithManager",
                    args: ["{dynamicViewComponentManager}"]
                }]
            }]
        }]
    });

    sjrk.dynamicViewComponentManagerTester.testInit = function () {
        jqUnit.assert("dynamicViewComponentManager created");
    };

    sjrk.dynamicViewComponentManagerTester.testComponentContainerAppended = function (that) {

        jqUnit.assert("viewComponentRegisteredWithManager event fired");

        var registerToArray = fluid.hashToArray(that.managedViewComponentRegistry, "componentContainerIndividualClass");

        jqUnit.assertEquals("managedViewComponentRegistry length is 1", 1, registerToArray.length);

        var managedViewComponents = that.locate("managedViewComponents");

        jqUnit.assertEquals("number of managedViewComponent elements is 1", 1, managedViewComponents.length);

    };

    fluid.defaults("sjrk.dynamicViewComponentManagerTests", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            dynamicViewComponentManager: {
                type: "sjrk.testDynamicViewComponentManager",
                container: "#sjrkc-dynamicViewComponentManager",
                createOnEvent: "{dynamicViewComponentManagerTester}.events.onTestCaseStart"
            },
            dynamicViewComponentManagerTester: {
                type: "sjrk.dynamicViewComponentManagerTester"
            }
        }
    });

    sjrk.dynamicViewComponentManagerTests();

})(jQuery, fluid);
