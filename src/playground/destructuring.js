//
// ---- Object destructuring
// 

// const person = {
//     age: 29,
//     location: {
//         city: 'Trier',
//         temp: 12
//     }
// }

// const name = person.name
// const age = person.age

// const { name: firstName = 'Anonymous', age } = person

// console.log(`${firstName} is ${age}.`)

// const { city, temp: temperature } = person.location
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}.`)
// }

// 
// ---- Array destructuring
// 

const address = ['gilberststr. 67', 'Trier', 'Rheinland-Pfalz', '54291']

const [, city, state = 'New York'] = address

console.log(`You are in ${city} ${state}`)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75']

const [ itemName, , mediumPrize ] = item

console.log(`A medium ${itemName} costs ${mediumPrize}`)