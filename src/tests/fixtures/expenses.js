import moment from 'moment'

export default [
    {
        id: '1',
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 0,
    },
    {
        id: '2',
        description: 'Water Bill',
        note: '',
        amount: 15000,
        createdAt: moment(0).subtract(4, 'days').valueOf(),
    },
    {
        id: '3',
        description: 'Credit Card',
        note: '',
        amount: 50000,
        createdAt: moment(0).add(4, 'days').valueOf(),
    },
]