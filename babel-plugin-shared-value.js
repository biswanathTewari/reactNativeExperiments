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
