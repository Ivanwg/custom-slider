type dateAttr = string | number;

export const formatDate = (date: Date) => {

  let dd: dateAttr = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm: dateAttr = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy: dateAttr = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.' + yy + ' г.';
}