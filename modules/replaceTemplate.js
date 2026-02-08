module.exports = (templatePage, product) => {
  let current = templatePage.replace(/{%PRODUCTNAME%}/g, product.productName);
  current = current.replace(/{%IMAGE%}/g, product.image);
  current = current.replace(/{%FROM%}/g, product.from);
  current = current.replace(/{%QAUNTITY%}/g, product.quantity);
  current = current.replace(/{%NUTRIENTS%}/g, product.nutrients);
  current = current.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
  current = current.replace(/{%PRICE%}/g, product.price);
  current = current.replace(/{%ID%}/g, product.id);

  if (!product.organic) current = current.replace(/{%NOT-ORGANIC%}/g, 'not-organic');
  return current;
};
