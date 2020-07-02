import filtersListNames  from './filter.names'

const filtersLists = [
    {
        id: 1,
        name: filtersListNames.PRICE,
        label:'Price',
        lists: [
            {
                id: 0,
                label: 'Any',
                value: undefined
            },
            {
                id: 1,
                label: 'Under $25',
                value: {
                    pmin: 0,
                    pmax: 25
                }
            },
            {
                id: 2,
                label: '$25 to $50',
                value: {
                    pmin: 25,
                    pmax: 50
                }
            },
            {
                id: 3,
                label: '$50 to $100',
                value: {
                    pmin: 50,
                    pmax: 100
                }
            },
            {
                id: 4,
                label: '$100 to $200',
                value: {
                    pmin: 100,
                    pmax: 200
                }
            },
            {
                id: 5,
                label: '$200 and up',
                value: {
                    pmin: 200,
                    pmax: 999999999
                }
            },
        ]
    },
    {
        id: 2,
        name: filtersListNames.CONDITION,
        label:'Condition',
        lists: [
            {
                id: 0,
                label: 'Any',
                value: undefined
            },
            {
                id: 1,
                label: 'New',
                value: 'new'
            },
            {
                id: 2,
                label: 'Like new',
                value: 'like new'
            },
            {
                id: 3,
                label: 'Good',
                value: 'good'
            },
            {
                id: 4,
                label: 'Fair',
                value: 'fair'
            },
            {
                id: 5,
                label: 'Poor',
                value: 'poor'
            },
        ]
    },
    {
        id: 3,
        name: filtersListNames.SHIPPING,
        label:'Shipping',
        lists: [
            {
                id: 0,
                label: 'Any',
                value: undefined
            },
            {
                id: 1,
                label: 'Free',
                value: 'free'
            },
        ]
    }
]

export default filtersLists;