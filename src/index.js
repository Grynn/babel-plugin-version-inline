import fs from 'fs';
import util from 'util';

const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
const name = "[magic-constants]";

export default function ({ types: t }) {
  return {
    visitor: {      
      ReferencedIdentifier(path) {
        if (path.node.name === "__VERSION__") {
          path.replaceWith(t.valueToNode(version));
          path.hub.file.log.debug(`${name} replaced __VERSION__ with ${path.node.value}`);
        }
      },
      StringLiteral(path) {
      	if (path.node.value === "__FILE__") {
      		path.node.value = path.hub.file.opts.filename;
      		path.hub.file.log.debug(`${name} replaced __FILE__ with ${path.node.value}`);
      	}
      }
    }
  };
}
