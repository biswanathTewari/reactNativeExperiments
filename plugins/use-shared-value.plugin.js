// looks for useSharedValue and appends a boolean literal to the end of the arguments

module.exports = function ({types: t}) {
  return {
    visitor: {
      CallExpression(path) {
        if (t.isIdentifier(path.node.callee, {name: 'useSharedValue'})) {
          path.node.arguments.push(t.booleanLiteral(true));
        }
      },
    },
  };
};
