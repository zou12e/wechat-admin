export function isPlainObject (val) {
  return val && !Array.isArray(val) && typeof val === 'object';
}

export function merge (target = {}, source) {
  if (!target || !source) return target;
  Object.keys(source).forEach(key => {
    if (isPlainObject(source[key]) && isPlainObject(target[key])) {
      return merge(target[key], source[key]);
    }
    target[key] = source[key];
  });
  return target;
}

export function isNotNull (val) {
  return val !== undefined && val !== null && val !== '';
}

const BOM = '\uFEFF';
export function exportCsv (inputData, filename = 'export.csv') {
  // const csv = arrayToCsv(inputData);
  const csv = inputData;

  if (navigator.msSaveOrOpenBlob) {
    let blob = new Blob([BOM + csv], {
      type: 'text/csv;charset=utf-8;'
    });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    let uri = encodeURI(`data:text/csv;charset=utf-8,${BOM}${csv}`);
    let downloadLink = document.createElement('a');
    downloadLink.href = uri;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}

export function checkUndefined(obj, arr = []) {
  return arr.every(attr => {
    if (obj.hasOwnProperty(attr)) {
      return obj[attr] !== '';
    } else {
      return true;
    }
  });
}
