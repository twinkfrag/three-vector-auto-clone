import * as ts from "typescript";
import * as path from "path";

// "import(*)"を除いたTypeName
const regex_typename = new RegExp(/^(?:import\(.*?\)\.)?(.*)$/);
// エントリーポイントより外側(node_modules等)を除外
const regex_filename = new RegExp(/^(?!\.{2}).*/);
const requireCloneClasses = [
    ".Vector2",
    ".Vector3",
    ".Vector4",
];
// setXXを除いた，thisを返すメンバを指定
const requireCloneMembers = [
    "add",
    "addScalar",
    "addScaledVector",
    "addVectors",
    "sub",
    "subScalar",
    "subVectors",
    "multiply",
    "multiplyScalar",
    "multiplyVectors",
    "divide",
    "divideScalar",

    "applyEuler",
    "applyAxisAngle",
    "applyMatrix3",
    "applyNormalMatrix",
    "applyMatrix4",
    "applyQuaternion",
    "project",
    "unproject",
    "transformDirection",

    "min",
    "max",
    "clamp",
    "clampScalar",
    "clampLength",
    "floor",
    "ceil",
    "round",
    "roundToZero",
    "negate",
    "normalize",
    "lerp",
    "lerpVectors",
    "rotateAround",

    "cross",
    "crossVectors",
    "projectOnVector",
    "projectOnPlane",
    "reflect",
];

const transformerFactory = (program: ts.Program) => (context: ts.TransformationContext) => {

    const checker = program.getTypeChecker();

    const visitor: ts.Visitor = (node: ts.Node) => {

        // 現在処理中のsourceFileを取るがundefinedなことがある
        const sourceFile = node.getSourceFile();
        if (sourceFile && regex_filename.test(path.relative(program.getCurrentDirectory(), sourceFile.fileName))) {

            if (node.kind === ts.SyntaxKind.PropertyAccessExpression) {
                const exp = (node as ts.PropertyAccessExpression);

                const type = checker.getTypeAtLocation(exp.expression);
                const typeNameWithNamespace = checker.typeToString(type, undefined, ts.TypeFormatFlags.UseFullyQualifiedType);

                let isTargetClass = false;
                for (const reqireCloneClass of requireCloneClasses) {
                    if (typeNameWithNamespace.endsWith(reqireCloneClass)) {
                        isTargetClass = true;
                        break;
                    }
                }

                if (isTargetClass) {
                    if (requireCloneMembers.includes(exp.name.text)) {
                        node = ts.factory.createPropertyAccessExpression(
                            ts.factory.createCallExpression(
                                ts.factory.createPropertyAccessExpression(
                                    exp.expression,
                                    ts.factory.createIdentifier("clone")
                                ),
                                undefined,
                                []
                            ),
                            exp.name
                        )
                    }
                }
            }
        }
        return ts.visitEachChild(node, visitor, context);
    };
    return (node: ts.Node) => { return ts.visitNode(node, visitor); };
};

export default transformerFactory;
