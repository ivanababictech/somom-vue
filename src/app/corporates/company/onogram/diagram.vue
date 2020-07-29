<template>
    <div></div>
</template>

<script>
    export default {
        props: ["modelData"],  // accept model data as a parameter
        data() {
            return {
                diagram: null,
                colors: {
                    individual: '#f9f369',
                    company: '#59e7f4',
                    foundation: '#f46dd8',
                    trust: '#f4897f',
                    beneficiary: '#cbf4c4',
                }
            }
        },
        mounted() {
            //if (window.goSamples) goSamples(); // init for these samples -- you don't need to call this
            var $ = go.GraphObject.make;

            var self = this;
            var myDiagram =
                $(go.Diagram, this.$el,
                    {
                        initialDocumentSpot: go.Spot.TopCenter,
                        initialViewportSpot: go.Spot.TopCenter,
                        "toolManager.hoverDelay": 100,  // 100 milliseconds instead of the default 850
                        allowCopy: false,
                        layout:  // create a TreeLayout for the family tree
                        $(go.TreeLayout,
                        { angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform })
                    });

            myDiagram.nodeTemplate =
                $(go.Node, "Auto",
                    { deletable: false, selectable: false },
                    new go.Binding("text", "name"),
                    $(go.Shape, "Rectangle",
                        { fill: "lightgray",
                            stroke: null, strokeWidth: 0,
                            stretch: go.GraphObject.Fill,
                            alignment: go.Spot.Center },
                        new go.Binding("fill", "type", self.typeBrushConverter)
                    ),
                    $(go.TextBlock,
                        { font: "700 12px Droid Serif, sans-serif",
                            textAlign: "center",
                            stroke: "#424242",
                            margin: 10, maxSize: new go.Size(250, NaN) },
                        new go.Binding("text", "name"))
                );

            myDiagram.linkTemplate =
                $(go.Link,  // the whole link panel
                    { routing: go.Link.Orthogonal, corner: 0, selectable: false },
                    $(go.Shape, { strokeWidth: 1, stroke: '#424242' }));  // the gray link shape

            this.diagram = myDiagram;
            this.updateModel(this.modelData);
        },
        watch: {
            modelData(val) { this.updateModel(val); }
        },
        methods: {
            // define Converters to be used for Bindings
            typeBrushConverter(type) {
                return this.colors[type];
            },

            model() {
                return this.diagram.model;
            },
            updateModel(val) {
                this.diagram.model =  new go.TreeModel(val);
            },
            updateDiagramFromData() {
                this.diagram.startTransaction();
                // This is very general but very inefficient.
                // It would be better to modify the diagramData data by calling
                // Model.setDataProperty or Model.addNodeData, et al.
                this.diagram.updateAllRelationshipsFromData();
                this.diagram.updateAllTargetBindings();
                this.diagram.commitTransaction("updated");
            }
        },
    }
</script>

<style scoped>

</style>