import { use, init, routes } from './init';
import title from './title';
import progress from './progress';
import auth from './auth';

use(title);
use(progress);
use(auth);

function findRoutePath (name, routes, paths = [], index = 0) {
  if (!name) return false;
  for (let i = 0; i < routes.length; i++) {
    const meta = routes[i].meta;
    if (meta && meta.name && meta.name === name) {
      paths[index] = routes[i].path;
      return true;
    };
    if (!routes.children) continue;
    paths[index] = routes[i].path;
    if (findRoutePath(name, routes.children, paths, index + 1)) break;
  }
  return false;
}

export default {
  use,
  init,
  getRoutePath (name) {
    const paths = [];
    findRoutePath(name, routes, paths);
    return paths.join('/');
  }
};
