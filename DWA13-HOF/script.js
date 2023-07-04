const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

names.forEach((name, i) => {
    console.log(name,`(${provinces[i]})`)
})

console.log(' ')

provinces.map(function (province) {
    console.log(province.toUpperCase())
})


const name = names.map((name) => {
   return name.length
})

console.log(' ')
console.log(name)
console.log(' ')

console.log(provinces.toSorted())

const province = provinces.filter((province) => {
    return !province.includes('Cape')
})

console.log(' ')
console.log(province, '\n',  province.length)
console.log(' ')

const nameContainS = names.map((name) => {
   return name.split('').some(char => char.toLocaleLowerCase() == 's')
});
  
console.log(nameContainS);
console.log(' ')


// reduce
const provinceReduce = provinces.reduce((a, b, c) => {

    a[b] = names[c];
    return a;
    
  }, {});
  

console.log(provinceReduce)
console.log(' ')

const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
]

products.forEach((product) => {
     console.log(product.product)
})

const productArrange = products.filter((product) =>{
  if( product.product.length >= 5){
    return product
  }
})


const productPrice = products
    .filter((product) => product.price !== '' && product.price !== ' ')
    .map((product) => {
    return {
      ...product,
      price: parseFloat(product.price)
    };
  });

 const productNames = products.reduce((a, b) => {
    return a + b.product + ', ';
  }, '');

console.log(productArrange, '\n' ,productPrice, '\n' , productNames)

const result = productPrice.reduce((a, b) => {
    if (b.price > a.highest.price) {
      a.highest = b;
    }
    if (b.price < a.lowest.price) {
      a.lowest = b;
    }
    return a;
  }, { highest: { price: -Infinity }, lowest: { price: Infinity } });

  console.log(result)
