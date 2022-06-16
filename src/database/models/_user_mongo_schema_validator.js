throw Error('its file only for comfort, not usage')

let user_validator =
{
    $jsonSchema: {
        bsonType: 'object',
        required: [
            'email',
            'password_hash',
            'wallets',
            'transaction_categories',
            'transactions',
        ],
        properties: {
            email: {
                bsonType: 'string',
                minLength: 5
            },
            password_hash: {
                bsonType: 'string',
                minLength: 60,
                maxLength: 60
            },
            wallets: {
                bsonType: ['array'],
                items: {
                    required: [
                        'name',
                        'wallet_type',
                        'currency',
                        'balance',
                        'archived',
                    ],
                    properties: {
                        name: {
                            bsonType: 'string',
                        },
                        wallet_type: {
                            bsonType: 'string',
                            'enum': [
                                'cash',
                                'card',
                            ]
                        },
                        currency: {
                            bsonType: 'string',
                            enum: [
                                'USD',
                                'EUR',
                                'UAH',
                            ]
                        },
                        balance: {
                            bsonType: 'decimal',
                        },
                        archived: {
                            bsonType: 'bool',
                        }
                    }
                }
            },
            transaction_categories: {
                bsonType: ['array'],
                items: {
                    required: [
                        'name',
                        'type',
                    ],
                    properties: {
                        name: {
                            bsonType: 'string',
                        },
                        type: {
                            bsonType: 'string',
                            enum: [
                                'expence',
                                'income',
                            ]
                        },
                    }
                }
            },
            transactions: {
                bsonType: ['array'],
                items: {
                    required: [
                        'categorie',
                        'wallet',
                        'amount',
                        'comment',
                        'time',
                    ],
                    properties: {
                        categorie: {
                            bsonType: 'objectId',
                        },
                        wallet: {
                            bsonType: 'objectId'
                        },
                        amount: {
                            bsonType: 'decimal',
                        },
                        comment: {
                            bsonType: 'string'
                        },
                        time: {
                            bsonType: 'number'
                        },
                    }
                }
            },
        }
    }
}
