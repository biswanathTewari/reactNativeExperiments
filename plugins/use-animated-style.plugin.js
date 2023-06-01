// looks for tranform properties passed to useAnimatedStyle
// and converts them to the depricated Android props
// e.g. { transform: [{ translateX: 10 }] } -> { translationX: 10 }

module.exports = function ({types: t}) {
  const nestedVisitor = {
    ObjectProperty(path) {
      if (t.isIdentifier(path.node.key, {name: 'transform'})) {
        const parentPath = path.findParent(p => p.isObjectExpression());
        const depricatedAndroidProperties = [];
        const newAndroidTransformProperties = [
          'matrix',
          'rotateX',
          'rotateY',
          'rotateZ',
          'scale',
          'perspective',
          'skewX',
          'skewY',
        ];

        for (const properties of path.node.value.elements) {
          if (
            !newAndroidTransformProperties.includes(
              properties.properties[0].key.name,
            )
          ) {
            depricatedAndroidProperties.push(properties);
          }
        }

        if (
          path.node.value.elements.length === depricatedAndroidProperties.length
        ) {
          for (const properties of path.node.value.elements) {
            const key =
              properties.properties[0].key === 'rotate'
                ? 'rotation'
                : properties.properties[0].key;
            const value = properties.properties[0].value;

            parentPath.pushContainer(
              'properties',
              t.ObjectProperty(key, value),
            );
          }
          path.remove();
        } else {
          console.warn(
            'transform cannot be 100% converted to deprecated Android props',
          );
        }

        // console.log(path.container);
        // console.log('tranform removed', parentPath.node.properties);
      }
    },
  };

  return {
    visitor: {
      CallExpression(path) {
        if (t.isIdentifier(path.node.callee, {name: 'useAnimatedStyle'})) {
          path.traverse(nestedVisitor);
        }
      },
    },
  };
};
