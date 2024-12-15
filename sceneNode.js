/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        // Combine the model matrix with the node's transformation
        const localTransform = this.trs.getTransformationMatrix();
        const updatedModelMatrix = MatrixMult(modelMatrix, localTransform);
    
        // Update MVP, MV, and normal matrices
        const updatedModelView = MatrixMult(modelView, localTransform);
        const updatedMvp = MatrixMult(mvp, localTransform);
        const updatedNormals = getNormalMatrix(updatedModelView);
    
        // Draw the current node
        if (this.meshDrawer) {
            this.meshDrawer.draw(updatedMvp, updatedModelView, updatedNormals, updatedModelMatrix);
        }
    
        // Recursively draw child nodes
        for (const child of this.children) {
            child.draw(updatedMvp, updatedModelView, updatedNormals, updatedModelMatrix);
        }
    }
    

    

}