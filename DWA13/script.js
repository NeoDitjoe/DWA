const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

names.forEach((name, i) => {
    console.log(name,`(${provinces[i]})`)
})

console.log(' ')

provinces.map(function (province) {
   const provinces = province.toUpperCase()
    console.log(provinces)
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
console.log(province)
console.log(' ')