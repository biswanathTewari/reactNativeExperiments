module.exports = function ({types: t}) {
  const nestedVisitor = {
    ObjectProperty(path) {
      if (t.isIdentifier(path.node.key, {name: 'transform'})) {
        const parentPath = path.findParent(p => p.isObjectExpression());
        const nonSupportedTransformProperties = [
          'matrix',
          'rotateX',
          'rotateY',
          'rotateZ',
          'scale',
        ];

        for (const properties of path.node.value.elements) {
          // path.insertBefore(properties.properties[0]);
          parentPath.pushContainer(
            'properties',
            t.ObjectProperty(
              properties.properties[0].key,
              properties.properties[0].value,
            ),
          );
        }

        path.remove();
        // console.log(path.container);
        // console.log('tranform removed', parentPath.node.properties);
      }
    },
  };

  return {
    visitor: {
      CallExpression(path) {
        if (t.isIdentifier(path.node.callee, {name: 'useAnimatedStyle'})) {
          //* what i need to do
          //* visit the ReturnStatement or ObjectExpression
          //* push the transform properties to its parent
          //* delete the tranform path
          //* check for unsupported tranform properties
          //* check for ios and android

          path.traverse(nestedVisitor);
          //   console.log(
          //     'final output',
          //     path.node.arguments[0].callee.body.body[0],
          //   );

          //*  what is this? - i dont think it will work, for now lets assume its android - find this
          const isIOS = t.memberExpression(
            t.identifier('Device'),
            t.identifier('isIOS'),
          );

          //* need to do something like this
          // --> !isIOS.computed
          // path.node.arguments[0].body[index].body.argument..[index] = androidTransformProperties[0]
        }
      },
    },
  };
};

// console.log it or use some other function -> working for other functions but not for useAnimatedStyle
// check the statement explaination
