export default {
    "scalars": [
        1,
        6,
        15,
        19,
        21,
        23,
        25,
        27,
        33,
        42,
        46,
        49,
        59,
        69,
        73,
        86,
        97,
        109,
        120,
        129,
        133,
        135,
        137,
        139,
        141,
        154,
        169,
        181,
        183,
        203,
        204,
        211,
        220,
        228,
        245,
        256,
        268,
        295,
        306,
        318,
        326,
        327,
        328,
        340,
        367,
        378,
        396,
        410,
        418,
        423,
        432,
        444,
        456,
        464,
        466,
        478,
        489,
        490,
        491,
        495,
        497,
        506,
        516,
        518,
        522,
        533,
        543,
        547,
        559,
        570,
        582,
        590,
        591,
        605,
        606,
        619,
        620,
        621,
        633,
        641,
        648,
        658,
        660,
        668,
        677,
        685,
        689,
        691,
        693,
        706,
        718,
        730,
        743,
        754,
        765,
        777,
        794,
        802,
        812,
        822,
        830,
        845,
        856,
        868,
        879,
        891,
        909,
        921,
        930,
        934,
        936,
        960,
        972,
        973,
        974,
        975,
        976,
        977,
        978,
        979,
        980,
        981,
        982,
        994,
        1012,
        1023,
        1035,
        1043,
        1054,
        1065,
        1077,
        1095,
        1106,
        1118,
        1136,
        1148,
        1160,
        1178,
        1189,
        1201,
        1217,
        1227,
        1231,
        1244,
        1259,
        1271,
        1279,
        1291,
        1302,
        1314,
        1322,
        1334,
        1345,
        1357,
        1359,
        1376,
        1380,
        1393,
        1400,
        1410,
        1418,
        1425,
        1427,
        1429
    ],
    "types": {
        "Account": {
            "Profile": [
                29
            ],
            "Wallets": [
                51,
                {
                    "distinct_on": [
                        69,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        67,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        58
                    ]
                }
            ],
            "Wallets_aggregate": [
                52,
                {
                    "distinct_on": [
                        69,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        67,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        58
                    ]
                }
            ],
            "id": [
                1429
            ],
            "status": [
                1
            ],
            "username": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "AccountStatus": {},
        "AccountStatus_comparison_exp": {
            "_eq": [
                1
            ],
            "_gt": [
                1
            ],
            "_gte": [
                1
            ],
            "_in": [
                1
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                1
            ],
            "_lte": [
                1
            ],
            "_neq": [
                1
            ],
            "_nin": [
                1
            ],
            "__typename": [
                49
            ]
        },
        "Account_aggregate": {
            "aggregate": [
                4
            ],
            "nodes": [
                0
            ],
            "__typename": [
                49
            ]
        },
        "Account_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        15,
                        "[Account_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                8
            ],
            "min": [
                9
            ],
            "__typename": [
                49
            ]
        },
        "Account_bool_exp": {
            "Profile": [
                32
            ],
            "Wallets": [
                58
            ],
            "Wallets_aggregate": [
                53
            ],
            "_and": [
                5
            ],
            "_not": [
                5
            ],
            "_or": [
                5
            ],
            "id": [
                1430
            ],
            "status": [
                2
            ],
            "username": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "Account_constraint": {},
        "Account_insert_input": {
            "Profile": [
                38
            ],
            "Wallets": [
                57
            ],
            "id": [
                1429
            ],
            "status": [
                1
            ],
            "username": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Account_max_fields": {
            "id": [
                1429
            ],
            "status": [
                1
            ],
            "username": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Account_min_fields": {
            "id": [
                1429
            ],
            "status": [
                1
            ],
            "username": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Account_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                0
            ],
            "__typename": [
                49
            ]
        },
        "Account_obj_rel_insert_input": {
            "data": [
                7
            ],
            "on_conflict": [
                12
            ],
            "__typename": [
                49
            ]
        },
        "Account_on_conflict": {
            "constraint": [
                6
            ],
            "update_columns": [
                19
            ],
            "where": [
                5
            ],
            "__typename": [
                49
            ]
        },
        "Account_order_by": {
            "Profile": [
                40
            ],
            "Wallets_aggregate": [
                56
            ],
            "id": [
                1043
            ],
            "status": [
                1043
            ],
            "username": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "Account_pk_columns_input": {
            "id": [
                1429
            ],
            "__typename": [
                49
            ]
        },
        "Account_select_column": {},
        "Account_set_input": {
            "id": [
                1429
            ],
            "status": [
                1
            ],
            "username": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Account_stream_cursor_input": {
            "initial_value": [
                18
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "Account_stream_cursor_value_input": {
            "id": [
                1429
            ],
            "status": [
                1
            ],
            "username": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Account_update_column": {},
        "Account_updates": {
            "_set": [
                16
            ],
            "where": [
                5
            ],
            "__typename": [
                49
            ]
        },
        "BlockchainNetwork": {},
        "BlockchainNetwork_comparison_exp": {
            "_eq": [
                21
            ],
            "_gt": [
                21
            ],
            "_gte": [
                21
            ],
            "_in": [
                21
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                21
            ],
            "_lte": [
                21
            ],
            "_neq": [
                21
            ],
            "_nin": [
                21
            ],
            "__typename": [
                49
            ]
        },
        "Boolean": {},
        "Boolean_comparison_exp": {
            "_eq": [
                23
            ],
            "_gt": [
                23
            ],
            "_gte": [
                23
            ],
            "_in": [
                23
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                23
            ],
            "_lte": [
                23
            ],
            "_neq": [
                23
            ],
            "_nin": [
                23
            ],
            "__typename": [
                49
            ]
        },
        "Float": {},
        "Float_comparison_exp": {
            "_eq": [
                25
            ],
            "_gt": [
                25
            ],
            "_gte": [
                25
            ],
            "_in": [
                25
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                25
            ],
            "_lte": [
                25
            ],
            "_neq": [
                25
            ],
            "_nin": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "Int": {},
        "Int_comparison_exp": {
            "_eq": [
                27
            ],
            "_gt": [
                27
            ],
            "_gte": [
                27
            ],
            "_in": [
                27
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                27
            ],
            "_lte": [
                27
            ],
            "_neq": [
                27
            ],
            "_nin": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "Profile": {
            "Account": [
                0
            ],
            "accountId": [
                1429
            ],
            "description": [
                49
            ],
            "instagram": [
                49
            ],
            "picture": [
                49
            ],
            "twitter": [
                49
            ],
            "website": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Profile_aggregate": {
            "aggregate": [
                31
            ],
            "nodes": [
                29
            ],
            "__typename": [
                49
            ]
        },
        "Profile_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        42,
                        "[Profile_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                35
            ],
            "min": [
                36
            ],
            "__typename": [
                49
            ]
        },
        "Profile_bool_exp": {
            "Account": [
                5
            ],
            "_and": [
                32
            ],
            "_not": [
                32
            ],
            "_or": [
                32
            ],
            "accountId": [
                1430
            ],
            "description": [
                50
            ],
            "instagram": [
                50
            ],
            "picture": [
                50
            ],
            "twitter": [
                50
            ],
            "website": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "Profile_constraint": {},
        "Profile_insert_input": {
            "Account": [
                11
            ],
            "accountId": [
                1429
            ],
            "description": [
                49
            ],
            "instagram": [
                49
            ],
            "picture": [
                49
            ],
            "twitter": [
                49
            ],
            "website": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Profile_max_fields": {
            "accountId": [
                1429
            ],
            "description": [
                49
            ],
            "instagram": [
                49
            ],
            "picture": [
                49
            ],
            "twitter": [
                49
            ],
            "website": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Profile_min_fields": {
            "accountId": [
                1429
            ],
            "description": [
                49
            ],
            "instagram": [
                49
            ],
            "picture": [
                49
            ],
            "twitter": [
                49
            ],
            "website": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Profile_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                29
            ],
            "__typename": [
                49
            ]
        },
        "Profile_obj_rel_insert_input": {
            "data": [
                34
            ],
            "on_conflict": [
                39
            ],
            "__typename": [
                49
            ]
        },
        "Profile_on_conflict": {
            "constraint": [
                33
            ],
            "update_columns": [
                46
            ],
            "where": [
                32
            ],
            "__typename": [
                49
            ]
        },
        "Profile_order_by": {
            "Account": [
                13
            ],
            "accountId": [
                1043
            ],
            "description": [
                1043
            ],
            "instagram": [
                1043
            ],
            "picture": [
                1043
            ],
            "twitter": [
                1043
            ],
            "website": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "Profile_pk_columns_input": {
            "accountId": [
                1429
            ],
            "__typename": [
                49
            ]
        },
        "Profile_select_column": {},
        "Profile_set_input": {
            "accountId": [
                1429
            ],
            "description": [
                49
            ],
            "instagram": [
                49
            ],
            "picture": [
                49
            ],
            "twitter": [
                49
            ],
            "website": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Profile_stream_cursor_input": {
            "initial_value": [
                45
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "Profile_stream_cursor_value_input": {
            "accountId": [
                1429
            ],
            "description": [
                49
            ],
            "instagram": [
                49
            ],
            "picture": [
                49
            ],
            "twitter": [
                49
            ],
            "website": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Profile_update_column": {},
        "Profile_updates": {
            "_set": [
                43
            ],
            "where": [
                32
            ],
            "__typename": [
                49
            ]
        },
        "SetWhitelistOutput": {
            "merkleRoot": [
                49
            ],
            "message": [
                49
            ],
            "success": [
                23
            ],
            "__typename": [
                49
            ]
        },
        "String": {},
        "String_comparison_exp": {
            "_eq": [
                49
            ],
            "_gt": [
                49
            ],
            "_gte": [
                49
            ],
            "_ilike": [
                49
            ],
            "_in": [
                49
            ],
            "_iregex": [
                49
            ],
            "_is_null": [
                23
            ],
            "_like": [
                49
            ],
            "_lt": [
                49
            ],
            "_lte": [
                49
            ],
            "_neq": [
                49
            ],
            "_nilike": [
                49
            ],
            "_nin": [
                49
            ],
            "_niregex": [
                49
            ],
            "_nlike": [
                49
            ],
            "_nregex": [
                49
            ],
            "_nsimilar": [
                49
            ],
            "_regex": [
                49
            ],
            "_similar": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Wallet": {
            "Account": [
                0
            ],
            "accountId": [
                1429
            ],
            "address": [
                49
            ],
            "network": [
                21
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_aggregate": {
            "aggregate": [
                55
            ],
            "nodes": [
                51
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_aggregate_bool_exp": {
            "count": [
                54
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_aggregate_bool_exp_count": {
            "arguments": [
                69
            ],
            "distinct": [
                23
            ],
            "filter": [
                58
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        69,
                        "[Wallet_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                61
            ],
            "min": [
                63
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_aggregate_order_by": {
            "count": [
                1043
            ],
            "max": [
                62
            ],
            "min": [
                64
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_arr_rel_insert_input": {
            "data": [
                60
            ],
            "on_conflict": [
                66
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_bool_exp": {
            "Account": [
                5
            ],
            "_and": [
                58
            ],
            "_not": [
                58
            ],
            "_or": [
                58
            ],
            "accountId": [
                1430
            ],
            "address": [
                50
            ],
            "network": [
                22
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_constraint": {},
        "Wallet_insert_input": {
            "Account": [
                11
            ],
            "accountId": [
                1429
            ],
            "address": [
                49
            ],
            "network": [
                21
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_max_fields": {
            "accountId": [
                1429
            ],
            "address": [
                49
            ],
            "network": [
                21
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_max_order_by": {
            "accountId": [
                1043
            ],
            "address": [
                1043
            ],
            "network": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_min_fields": {
            "accountId": [
                1429
            ],
            "address": [
                49
            ],
            "network": [
                21
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_min_order_by": {
            "accountId": [
                1043
            ],
            "address": [
                1043
            ],
            "network": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                51
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_on_conflict": {
            "constraint": [
                59
            ],
            "update_columns": [
                73
            ],
            "where": [
                58
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_order_by": {
            "Account": [
                13
            ],
            "accountId": [
                1043
            ],
            "address": [
                1043
            ],
            "network": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_pk_columns_input": {
            "address": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_select_column": {},
        "Wallet_set_input": {
            "accountId": [
                1429
            ],
            "address": [
                49
            ],
            "network": [
                21
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_stream_cursor_input": {
            "initial_value": [
                72
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_stream_cursor_value_input": {
            "accountId": [
                1429
            ],
            "address": [
                49
            ],
            "network": [
                21
            ],
            "__typename": [
                49
            ]
        },
        "Wallet_update_column": {},
        "Wallet_updates": {
            "_set": [
                70
            ],
            "where": [
                58
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist": {
            "Whitelist_WhitelistEntries": [
                76,
                {
                    "distinct_on": [
                        97,
                        "[WhitelistEntries_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        95,
                        "[WhitelistEntries_order_by!]"
                    ],
                    "where": [
                        85
                    ]
                }
            ],
            "Whitelist_WhitelistEntries_aggregate": [
                77,
                {
                    "distinct_on": [
                        97,
                        "[WhitelistEntries_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        95,
                        "[WhitelistEntries_order_by!]"
                    ],
                    "where": [
                        85
                    ]
                }
            ],
            "merkleRoot": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries": {
            "WhitelistEntries_Whitelist": [
                75
            ],
            "merkleRoot": [
                49
            ],
            "walletAddress": [
                49
            ],
            "whitelistIndex": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_aggregate": {
            "aggregate": [
                80
            ],
            "nodes": [
                76
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_aggregate_bool_exp": {
            "count": [
                79
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_aggregate_bool_exp_count": {
            "arguments": [
                97
            ],
            "distinct": [
                23
            ],
            "filter": [
                85
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_aggregate_fields": {
            "avg": [
                83
            ],
            "count": [
                27,
                {
                    "columns": [
                        97,
                        "[WhitelistEntries_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                89
            ],
            "min": [
                91
            ],
            "stddev": [
                99
            ],
            "stddev_pop": [
                101
            ],
            "stddev_samp": [
                103
            ],
            "sum": [
                107
            ],
            "var_pop": [
                111
            ],
            "var_samp": [
                113
            ],
            "variance": [
                115
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_aggregate_order_by": {
            "avg": [
                84
            ],
            "count": [
                1043
            ],
            "max": [
                90
            ],
            "min": [
                92
            ],
            "stddev": [
                100
            ],
            "stddev_pop": [
                102
            ],
            "stddev_samp": [
                104
            ],
            "sum": [
                108
            ],
            "var_pop": [
                112
            ],
            "var_samp": [
                114
            ],
            "variance": [
                116
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_arr_rel_insert_input": {
            "data": [
                88
            ],
            "on_conflict": [
                94
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_avg_fields": {
            "whitelistIndex": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_avg_order_by": {
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_bool_exp": {
            "WhitelistEntries_Whitelist": [
                119
            ],
            "_and": [
                85
            ],
            "_not": [
                85
            ],
            "_or": [
                85
            ],
            "merkleRoot": [
                50
            ],
            "walletAddress": [
                50
            ],
            "whitelistIndex": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_constraint": {},
        "WhitelistEntries_inc_input": {
            "whitelistIndex": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_insert_input": {
            "WhitelistEntries_Whitelist": [
                125
            ],
            "merkleRoot": [
                49
            ],
            "walletAddress": [
                49
            ],
            "whitelistIndex": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_max_fields": {
            "merkleRoot": [
                49
            ],
            "walletAddress": [
                49
            ],
            "whitelistIndex": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_max_order_by": {
            "merkleRoot": [
                1043
            ],
            "walletAddress": [
                1043
            ],
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_min_fields": {
            "merkleRoot": [
                49
            ],
            "walletAddress": [
                49
            ],
            "whitelistIndex": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_min_order_by": {
            "merkleRoot": [
                1043
            ],
            "walletAddress": [
                1043
            ],
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                76
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_on_conflict": {
            "constraint": [
                86
            ],
            "update_columns": [
                109
            ],
            "where": [
                85
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_order_by": {
            "WhitelistEntries_Whitelist": [
                127
            ],
            "merkleRoot": [
                1043
            ],
            "walletAddress": [
                1043
            ],
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_pk_columns_input": {
            "merkleRoot": [
                49
            ],
            "whitelistIndex": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_select_column": {},
        "WhitelistEntries_set_input": {
            "merkleRoot": [
                49
            ],
            "walletAddress": [
                49
            ],
            "whitelistIndex": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_stddev_fields": {
            "whitelistIndex": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_stddev_order_by": {
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_stddev_pop_fields": {
            "whitelistIndex": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_stddev_pop_order_by": {
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_stddev_samp_fields": {
            "whitelistIndex": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_stddev_samp_order_by": {
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_stream_cursor_input": {
            "initial_value": [
                106
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_stream_cursor_value_input": {
            "merkleRoot": [
                49
            ],
            "walletAddress": [
                49
            ],
            "whitelistIndex": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_sum_fields": {
            "whitelistIndex": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_sum_order_by": {
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_update_column": {},
        "WhitelistEntries_updates": {
            "_inc": [
                87
            ],
            "_set": [
                98
            ],
            "where": [
                85
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_var_pop_fields": {
            "whitelistIndex": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_var_pop_order_by": {
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_var_samp_fields": {
            "whitelistIndex": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_var_samp_order_by": {
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_variance_fields": {
            "whitelistIndex": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "WhitelistEntries_variance_order_by": {
            "whitelistIndex": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_aggregate": {
            "aggregate": [
                118
            ],
            "nodes": [
                75
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        129,
                        "[Whitelist_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                122
            ],
            "min": [
                123
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_bool_exp": {
            "Whitelist_WhitelistEntries": [
                85
            ],
            "Whitelist_WhitelistEntries_aggregate": [
                78
            ],
            "_and": [
                119
            ],
            "_not": [
                119
            ],
            "_or": [
                119
            ],
            "merkleRoot": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_constraint": {},
        "Whitelist_insert_input": {
            "Whitelist_WhitelistEntries": [
                82
            ],
            "merkleRoot": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_max_fields": {
            "merkleRoot": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_min_fields": {
            "merkleRoot": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                75
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_obj_rel_insert_input": {
            "data": [
                121
            ],
            "on_conflict": [
                126
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_on_conflict": {
            "constraint": [
                120
            ],
            "update_columns": [
                133
            ],
            "where": [
                119
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_order_by": {
            "Whitelist_WhitelistEntries_aggregate": [
                81
            ],
            "merkleRoot": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_pk_columns_input": {
            "merkleRoot": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_select_column": {},
        "Whitelist_set_input": {
            "merkleRoot": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_stream_cursor_input": {
            "initial_value": [
                132
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_stream_cursor_value_input": {
            "merkleRoot": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "Whitelist_update_column": {},
        "Whitelist_updates": {
            "_set": [
                130
            ],
            "where": [
                119
            ],
            "__typename": [
                49
            ]
        },
        "_int2": {},
        "_int2_comparison_exp": {
            "_eq": [
                135
            ],
            "_gt": [
                135
            ],
            "_gte": [
                135
            ],
            "_in": [
                135
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                135
            ],
            "_lte": [
                135
            ],
            "_neq": [
                135
            ],
            "_nin": [
                135
            ],
            "__typename": [
                49
            ]
        },
        "_int4": {},
        "_int4_comparison_exp": {
            "_eq": [
                137
            ],
            "_gt": [
                137
            ],
            "_gte": [
                137
            ],
            "_in": [
                137
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                137
            ],
            "_lte": [
                137
            ],
            "_neq": [
                137
            ],
            "_nin": [
                137
            ],
            "__typename": [
                49
            ]
        },
        "_int8": {},
        "_int8_comparison_exp": {
            "_eq": [
                139
            ],
            "_gt": [
                139
            ],
            "_gte": [
                139
            ],
            "_in": [
                139
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                139
            ],
            "_lte": [
                139
            ],
            "_neq": [
                139
            ],
            "_nin": [
                139
            ],
            "__typename": [
                49
            ]
        },
        "_text": {},
        "_text_comparison_exp": {
            "_eq": [
                141
            ],
            "_gt": [
                141
            ],
            "_gte": [
                141
            ],
            "_in": [
                141
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                141
            ],
            "_lte": [
                141
            ],
            "_neq": [
                141
            ],
            "_nin": [
                141
            ],
            "__typename": [
                49
            ]
        },
        "action": {
            "article": [
                191
            ],
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "generative_token": [
                593
            ],
            "id": [
                1429
            ],
            "issuer_id": [
                49
            ],
            "metadata": [
                693,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "numeric_value": [
                936
            ],
            "objkt": [
                938
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "redeemable": [
                1126
            ],
            "redeemable_address": [
                49
            ],
            "target_id": [
                49
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                181
            ],
            "user": [
                1367
            ],
            "userByIssuerId": [
                1367
            ],
            "__typename": [
                49
            ]
        },
        "action_aggregate": {
            "aggregate": [
                147
            ],
            "nodes": [
                143
            ],
            "__typename": [
                49
            ]
        },
        "action_aggregate_bool_exp": {
            "count": [
                146
            ],
            "__typename": [
                49
            ]
        },
        "action_aggregate_bool_exp_count": {
            "arguments": [
                169
            ],
            "distinct": [
                23
            ],
            "filter": [
                153
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "action_aggregate_fields": {
            "avg": [
                151
            ],
            "count": [
                27,
                {
                    "columns": [
                        169,
                        "[action_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                160
            ],
            "min": [
                162
            ],
            "stddev": [
                171
            ],
            "stddev_pop": [
                173
            ],
            "stddev_samp": [
                175
            ],
            "sum": [
                179
            ],
            "var_pop": [
                185
            ],
            "var_samp": [
                187
            ],
            "variance": [
                189
            ],
            "__typename": [
                49
            ]
        },
        "action_aggregate_order_by": {
            "avg": [
                152
            ],
            "count": [
                1043
            ],
            "max": [
                161
            ],
            "min": [
                163
            ],
            "stddev": [
                172
            ],
            "stddev_pop": [
                174
            ],
            "stddev_samp": [
                176
            ],
            "sum": [
                180
            ],
            "var_pop": [
                186
            ],
            "var_samp": [
                188
            ],
            "variance": [
                190
            ],
            "__typename": [
                49
            ]
        },
        "action_append_input": {
            "metadata": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "action_arr_rel_insert_input": {
            "data": [
                159
            ],
            "on_conflict": [
                165
            ],
            "__typename": [
                49
            ]
        },
        "action_avg_fields": {
            "article_id": [
                25
            ],
            "numeric_value": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "action_avg_order_by": {
            "article_id": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "action_bool_exp": {
            "_and": [
                153
            ],
            "_not": [
                153
            ],
            "_or": [
                153
            ],
            "article": [
                202
            ],
            "article_id": [
                28
            ],
            "created_at": [
                1323
            ],
            "generative_token": [
                604
            ],
            "id": [
                1430
            ],
            "issuer_id": [
                50
            ],
            "metadata": [
                695
            ],
            "numeric_value": [
                937
            ],
            "objkt": [
                959
            ],
            "objkt_id": [
                50
            ],
            "objkt_issuer_version": [
                642
            ],
            "op_hash": [
                50
            ],
            "redeemable": [
                1135
            ],
            "redeemable_address": [
                50
            ],
            "target_id": [
                50
            ],
            "ticket_id": [
                50
            ],
            "token_id": [
                50
            ],
            "type": [
                182
            ],
            "user": [
                1375
            ],
            "userByIssuerId": [
                1375
            ],
            "__typename": [
                49
            ]
        },
        "action_constraint": {},
        "action_delete_at_path_input": {
            "metadata": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "action_delete_elem_input": {
            "metadata": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "action_delete_key_input": {
            "metadata": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "action_inc_input": {
            "article_id": [
                27
            ],
            "numeric_value": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "action_insert_input": {
            "article": [
                281
            ],
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "generative_token": [
                615
            ],
            "id": [
                1429
            ],
            "issuer_id": [
                49
            ],
            "metadata": [
                693
            ],
            "numeric_value": [
                936
            ],
            "objkt": [
                968
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "redeemable": [
                1144
            ],
            "redeemable_address": [
                49
            ],
            "target_id": [
                49
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                181
            ],
            "user": [
                1388
            ],
            "userByIssuerId": [
                1388
            ],
            "__typename": [
                49
            ]
        },
        "action_max_fields": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "issuer_id": [
                49
            ],
            "numeric_value": [
                936
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "redeemable_address": [
                49
            ],
            "target_id": [
                49
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                181
            ],
            "__typename": [
                49
            ]
        },
        "action_max_order_by": {
            "article_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "issuer_id": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "op_hash": [
                1043
            ],
            "redeemable_address": [
                1043
            ],
            "target_id": [
                1043
            ],
            "ticket_id": [
                1043
            ],
            "token_id": [
                1043
            ],
            "type": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "action_min_fields": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "issuer_id": [
                49
            ],
            "numeric_value": [
                936
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "redeemable_address": [
                49
            ],
            "target_id": [
                49
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                181
            ],
            "__typename": [
                49
            ]
        },
        "action_min_order_by": {
            "article_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "issuer_id": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "op_hash": [
                1043
            ],
            "redeemable_address": [
                1043
            ],
            "target_id": [
                1043
            ],
            "ticket_id": [
                1043
            ],
            "token_id": [
                1043
            ],
            "type": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "action_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                143
            ],
            "__typename": [
                49
            ]
        },
        "action_on_conflict": {
            "constraint": [
                154
            ],
            "update_columns": [
                183
            ],
            "where": [
                153
            ],
            "__typename": [
                49
            ]
        },
        "action_order_by": {
            "article": [
                283
            ],
            "article_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "generative_token": [
                617
            ],
            "id": [
                1043
            ],
            "issuer_id": [
                1043
            ],
            "metadata": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "objkt": [
                970
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "op_hash": [
                1043
            ],
            "redeemable": [
                1146
            ],
            "redeemable_address": [
                1043
            ],
            "target_id": [
                1043
            ],
            "ticket_id": [
                1043
            ],
            "token_id": [
                1043
            ],
            "type": [
                1043
            ],
            "user": [
                1390
            ],
            "userByIssuerId": [
                1390
            ],
            "__typename": [
                49
            ]
        },
        "action_pk_columns_input": {
            "id": [
                1429
            ],
            "__typename": [
                49
            ]
        },
        "action_prepend_input": {
            "metadata": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "action_select_column": {},
        "action_set_input": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "issuer_id": [
                49
            ],
            "metadata": [
                693
            ],
            "numeric_value": [
                936
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "redeemable_address": [
                49
            ],
            "target_id": [
                49
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                181
            ],
            "__typename": [
                49
            ]
        },
        "action_stddev_fields": {
            "article_id": [
                25
            ],
            "numeric_value": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "action_stddev_order_by": {
            "article_id": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "action_stddev_pop_fields": {
            "article_id": [
                25
            ],
            "numeric_value": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "action_stddev_pop_order_by": {
            "article_id": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "action_stddev_samp_fields": {
            "article_id": [
                25
            ],
            "numeric_value": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "action_stddev_samp_order_by": {
            "article_id": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "action_stream_cursor_input": {
            "initial_value": [
                178
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "action_stream_cursor_value_input": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "issuer_id": [
                49
            ],
            "metadata": [
                693
            ],
            "numeric_value": [
                936
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "redeemable_address": [
                49
            ],
            "target_id": [
                49
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                181
            ],
            "__typename": [
                49
            ]
        },
        "action_sum_fields": {
            "article_id": [
                27
            ],
            "numeric_value": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "action_sum_order_by": {
            "article_id": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "action_type_enum": {},
        "action_type_enum_comparison_exp": {
            "_eq": [
                181
            ],
            "_gt": [
                181
            ],
            "_gte": [
                181
            ],
            "_in": [
                181
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                181
            ],
            "_lte": [
                181
            ],
            "_neq": [
                181
            ],
            "_nin": [
                181
            ],
            "__typename": [
                49
            ]
        },
        "action_update_column": {},
        "action_updates": {
            "_append": [
                149
            ],
            "_delete_at_path": [
                155
            ],
            "_delete_elem": [
                156
            ],
            "_delete_key": [
                157
            ],
            "_inc": [
                158
            ],
            "_prepend": [
                168
            ],
            "_set": [
                170
            ],
            "where": [
                153
            ],
            "__typename": [
                49
            ]
        },
        "action_var_pop_fields": {
            "article_id": [
                25
            ],
            "numeric_value": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "action_var_pop_order_by": {
            "article_id": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "action_var_samp_fields": {
            "article_id": [
                25
            ],
            "numeric_value": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "action_var_samp_order_by": {
            "article_id": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "action_variance_fields": {
            "article_id": [
                25
            ],
            "numeric_value": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "action_variance_order_by": {
            "article_id": [
                1043
            ],
            "numeric_value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article": {
            "actions": [
                143,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "actions_aggregate": [
                144,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "article_ledgers": [
                235,
                {
                    "distinct_on": [
                        256,
                        "[article_ledger_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        254,
                        "[article_ledger_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "article_ledgers_aggregate": [
                236,
                {
                    "distinct_on": [
                        256,
                        "[article_ledger_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        254,
                        "[article_ledger_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "article_revisions": [
                285,
                {
                    "distinct_on": [
                        306,
                        "[article_revision_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        304,
                        "[article_revision_order_by!]"
                    ],
                    "where": [
                        294
                    ]
                }
            ],
            "article_revisions_aggregate": [
                286,
                {
                    "distinct_on": [
                        306,
                        "[article_revision_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        304,
                        "[article_revision_order_by!]"
                    ],
                    "where": [
                        294
                    ]
                }
            ],
            "artifact_uri": [
                49
            ],
            "author_id": [
                49
            ],
            "body": [
                49
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "display_uri": [
                49
            ],
            "editions": [
                464
            ],
            "flag": [
                204
            ],
            "id": [
                27
            ],
            "language": [
                49
            ],
            "listings": [
                696,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "listings_aggregate": [
                697,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "media_image": [
                807
            ],
            "metadata": [
                691,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "metadata_locked": [
                23
            ],
            "metadata_uri": [
                49
            ],
            "mint_op_hash": [
                49
            ],
            "moderation_reason": [
                917
            ],
            "moderation_reason_id": [
                49
            ],
            "platforms": [
                141
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "splits": [
                1281,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "splits_aggregate": [
                1282,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "tags": [
                141
            ],
            "thumbnailMediaId": [
                466
            ],
            "thumbnail_caption": [
                49
            ],
            "thumbnail_uri": [
                49
            ],
            "title": [
                49
            ],
            "transactions": [
                1324,
                {
                    "distinct_on": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1343,
                        "[transaction_order_by!]"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "transactions_aggregate": [
                1325,
                {
                    "distinct_on": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1343,
                        "[transaction_order_by!]"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "user": [
                1367
            ],
            "__typename": [
                49
            ]
        },
        "article_aggregate": {
            "aggregate": [
                197
            ],
            "nodes": [
                191
            ],
            "__typename": [
                49
            ]
        },
        "article_aggregate_bool_exp": {
            "bool_and": [
                194
            ],
            "bool_or": [
                195
            ],
            "count": [
                196
            ],
            "__typename": [
                49
            ]
        },
        "article_aggregate_bool_exp_bool_and": {
            "arguments": [
                327
            ],
            "distinct": [
                23
            ],
            "filter": [
                202
            ],
            "predicate": [
                24
            ],
            "__typename": [
                49
            ]
        },
        "article_aggregate_bool_exp_bool_or": {
            "arguments": [
                328
            ],
            "distinct": [
                23
            ],
            "filter": [
                202
            ],
            "predicate": [
                24
            ],
            "__typename": [
                49
            ]
        },
        "article_aggregate_bool_exp_count": {
            "arguments": [
                326
            ],
            "distinct": [
                23
            ],
            "filter": [
                202
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "article_aggregate_fields": {
            "avg": [
                200
            ],
            "count": [
                27,
                {
                    "columns": [
                        326,
                        "[article_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                276
            ],
            "min": [
                278
            ],
            "stddev": [
                330
            ],
            "stddev_pop": [
                332
            ],
            "stddev_samp": [
                334
            ],
            "sum": [
                338
            ],
            "var_pop": [
                342
            ],
            "var_samp": [
                344
            ],
            "variance": [
                346
            ],
            "__typename": [
                49
            ]
        },
        "article_aggregate_order_by": {
            "avg": [
                201
            ],
            "count": [
                1043
            ],
            "max": [
                277
            ],
            "min": [
                279
            ],
            "stddev": [
                331
            ],
            "stddev_pop": [
                333
            ],
            "stddev_samp": [
                335
            ],
            "sum": [
                339
            ],
            "var_pop": [
                343
            ],
            "var_samp": [
                345
            ],
            "variance": [
                347
            ],
            "__typename": [
                49
            ]
        },
        "article_arr_rel_insert_input": {
            "data": [
                234
            ],
            "on_conflict": [
                282
            ],
            "__typename": [
                49
            ]
        },
        "article_avg_fields": {
            "editions": [
                25
            ],
            "id": [
                25
            ],
            "royalties": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_avg_order_by": {
            "editions": [
                1043
            ],
            "id": [
                1043
            ],
            "royalties": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_bool_exp": {
            "_and": [
                202
            ],
            "_not": [
                202
            ],
            "_or": [
                202
            ],
            "actions": [
                153
            ],
            "actions_aggregate": [
                145
            ],
            "article_ledgers": [
                244
            ],
            "article_ledgers_aggregate": [
                237
            ],
            "article_revisions": [
                294
            ],
            "article_revisions_aggregate": [
                287
            ],
            "artifact_uri": [
                50
            ],
            "author_id": [
                50
            ],
            "body": [
                50
            ],
            "created_at": [
                1323
            ],
            "description": [
                50
            ],
            "display_uri": [
                50
            ],
            "editions": [
                465
            ],
            "flag": [
                205
            ],
            "id": [
                28
            ],
            "language": [
                50
            ],
            "listings": [
                705
            ],
            "listings_aggregate": [
                698
            ],
            "media_image": [
                811
            ],
            "metadata": [
                692
            ],
            "metadata_locked": [
                24
            ],
            "metadata_uri": [
                50
            ],
            "mint_op_hash": [
                50
            ],
            "moderation_reason": [
                920
            ],
            "moderation_reason_id": [
                50
            ],
            "platforms": [
                142
            ],
            "royalties": [
                28
            ],
            "slug": [
                50
            ],
            "splits": [
                1290
            ],
            "splits_aggregate": [
                1283
            ],
            "tags": [
                142
            ],
            "thumbnailMediaId": [
                467
            ],
            "thumbnail_caption": [
                50
            ],
            "thumbnail_uri": [
                50
            ],
            "title": [
                50
            ],
            "transactions": [
                1333
            ],
            "transactions_aggregate": [
                1326
            ],
            "user": [
                1375
            ],
            "__typename": [
                49
            ]
        },
        "article_constraint": {},
        "article_flag_enum": {},
        "article_flag_enum_comparison_exp": {
            "_eq": [
                204
            ],
            "_gt": [
                204
            ],
            "_gte": [
                204
            ],
            "_in": [
                204
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                204
            ],
            "_lte": [
                204
            ],
            "_neq": [
                204
            ],
            "_nin": [
                204
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token": {
            "article_id": [
                27
            ],
            "generative_token_id": [
                49
            ],
            "line": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_aggregate": {
            "aggregate": [
                208
            ],
            "nodes": [
                206
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_aggregate_fields": {
            "avg": [
                209
            ],
            "count": [
                27,
                {
                    "columns": [
                        220,
                        "[article_generative_token_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                214
            ],
            "min": [
                215
            ],
            "stddev": [
                222
            ],
            "stddev_pop": [
                223
            ],
            "stddev_samp": [
                224
            ],
            "sum": [
                227
            ],
            "var_pop": [
                230
            ],
            "var_samp": [
                231
            ],
            "variance": [
                232
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_avg_fields": {
            "article_id": [
                25
            ],
            "line": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_bool_exp": {
            "_and": [
                210
            ],
            "_not": [
                210
            ],
            "_or": [
                210
            ],
            "article_id": [
                28
            ],
            "generative_token_id": [
                50
            ],
            "line": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_constraint": {},
        "article_generative_token_inc_input": {
            "article_id": [
                27
            ],
            "line": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_insert_input": {
            "article_id": [
                27
            ],
            "generative_token_id": [
                49
            ],
            "line": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_max_fields": {
            "article_id": [
                27
            ],
            "generative_token_id": [
                49
            ],
            "line": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_min_fields": {
            "article_id": [
                27
            ],
            "generative_token_id": [
                49
            ],
            "line": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                206
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_on_conflict": {
            "constraint": [
                211
            ],
            "update_columns": [
                228
            ],
            "where": [
                210
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_order_by": {
            "article_id": [
                1043
            ],
            "generative_token_id": [
                1043
            ],
            "line": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_pk_columns_input": {
            "article_id": [
                27
            ],
            "generative_token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_select_column": {},
        "article_generative_token_set_input": {
            "article_id": [
                27
            ],
            "generative_token_id": [
                49
            ],
            "line": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_stddev_fields": {
            "article_id": [
                25
            ],
            "line": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_stddev_pop_fields": {
            "article_id": [
                25
            ],
            "line": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_stddev_samp_fields": {
            "article_id": [
                25
            ],
            "line": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_stream_cursor_input": {
            "initial_value": [
                226
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_stream_cursor_value_input": {
            "article_id": [
                27
            ],
            "generative_token_id": [
                49
            ],
            "line": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_sum_fields": {
            "article_id": [
                27
            ],
            "line": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_update_column": {},
        "article_generative_token_updates": {
            "_inc": [
                212
            ],
            "_set": [
                221
            ],
            "where": [
                210
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_var_pop_fields": {
            "article_id": [
                25
            ],
            "line": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_var_samp_fields": {
            "article_id": [
                25
            ],
            "line": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_generative_token_variance_fields": {
            "article_id": [
                25
            ],
            "line": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_inc_input": {
            "editions": [
                464
            ],
            "id": [
                27
            ],
            "royalties": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_insert_input": {
            "actions": [
                150
            ],
            "article_ledgers": [
                241
            ],
            "article_revisions": [
                291
            ],
            "artifact_uri": [
                49
            ],
            "author_id": [
                49
            ],
            "body": [
                49
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "display_uri": [
                49
            ],
            "editions": [
                464
            ],
            "flag": [
                204
            ],
            "id": [
                27
            ],
            "language": [
                49
            ],
            "listings": [
                702
            ],
            "media_image": [
                818
            ],
            "metadata": [
                691
            ],
            "metadata_locked": [
                23
            ],
            "metadata_uri": [
                49
            ],
            "mint_op_hash": [
                49
            ],
            "moderation_reason": [
                926
            ],
            "moderation_reason_id": [
                49
            ],
            "platforms": [
                141
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "splits": [
                1287
            ],
            "tags": [
                141
            ],
            "thumbnailMediaId": [
                466
            ],
            "thumbnail_caption": [
                49
            ],
            "thumbnail_uri": [
                49
            ],
            "title": [
                49
            ],
            "transactions": [
                1330
            ],
            "user": [
                1388
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger": {
            "amount": [
                464
            ],
            "article": [
                191
            ],
            "article_id": [
                27
            ],
            "owner_id": [
                49
            ],
            "user": [
                1367
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_aggregate": {
            "aggregate": [
                239
            ],
            "nodes": [
                235
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_aggregate_bool_exp": {
            "count": [
                238
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_aggregate_bool_exp_count": {
            "arguments": [
                256
            ],
            "distinct": [
                23
            ],
            "filter": [
                244
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_aggregate_fields": {
            "avg": [
                242
            ],
            "count": [
                27,
                {
                    "columns": [
                        256,
                        "[article_ledger_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                248
            ],
            "min": [
                250
            ],
            "stddev": [
                258
            ],
            "stddev_pop": [
                260
            ],
            "stddev_samp": [
                262
            ],
            "sum": [
                266
            ],
            "var_pop": [
                270
            ],
            "var_samp": [
                272
            ],
            "variance": [
                274
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_aggregate_order_by": {
            "avg": [
                243
            ],
            "count": [
                1043
            ],
            "max": [
                249
            ],
            "min": [
                251
            ],
            "stddev": [
                259
            ],
            "stddev_pop": [
                261
            ],
            "stddev_samp": [
                263
            ],
            "sum": [
                267
            ],
            "var_pop": [
                271
            ],
            "var_samp": [
                273
            ],
            "variance": [
                275
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_arr_rel_insert_input": {
            "data": [
                247
            ],
            "on_conflict": [
                253
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_avg_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_avg_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_bool_exp": {
            "_and": [
                244
            ],
            "_not": [
                244
            ],
            "_or": [
                244
            ],
            "amount": [
                465
            ],
            "article": [
                202
            ],
            "article_id": [
                28
            ],
            "owner_id": [
                50
            ],
            "user": [
                1375
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_constraint": {},
        "article_ledger_inc_input": {
            "amount": [
                464
            ],
            "article_id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_insert_input": {
            "amount": [
                464
            ],
            "article": [
                281
            ],
            "article_id": [
                27
            ],
            "owner_id": [
                49
            ],
            "user": [
                1388
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_max_fields": {
            "amount": [
                464
            ],
            "article_id": [
                27
            ],
            "owner_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_max_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "owner_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_min_fields": {
            "amount": [
                464
            ],
            "article_id": [
                27
            ],
            "owner_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_min_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "owner_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                235
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_on_conflict": {
            "constraint": [
                245
            ],
            "update_columns": [
                268
            ],
            "where": [
                244
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_order_by": {
            "amount": [
                1043
            ],
            "article": [
                283
            ],
            "article_id": [
                1043
            ],
            "owner_id": [
                1043
            ],
            "user": [
                1390
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_pk_columns_input": {
            "article_id": [
                27
            ],
            "owner_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_select_column": {},
        "article_ledger_set_input": {
            "amount": [
                464
            ],
            "article_id": [
                27
            ],
            "owner_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_stddev_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_stddev_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_stddev_pop_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_stddev_pop_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_stddev_samp_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_stddev_samp_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_stream_cursor_input": {
            "initial_value": [
                265
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_stream_cursor_value_input": {
            "amount": [
                464
            ],
            "article_id": [
                27
            ],
            "owner_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_sum_fields": {
            "amount": [
                464
            ],
            "article_id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_sum_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_update_column": {},
        "article_ledger_updates": {
            "_inc": [
                246
            ],
            "_set": [
                257
            ],
            "where": [
                244
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_var_pop_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_var_pop_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_var_samp_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_var_samp_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_variance_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_ledger_variance_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_max_fields": {
            "artifact_uri": [
                49
            ],
            "author_id": [
                49
            ],
            "body": [
                49
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "display_uri": [
                49
            ],
            "editions": [
                464
            ],
            "flag": [
                204
            ],
            "id": [
                27
            ],
            "language": [
                49
            ],
            "metadata_uri": [
                49
            ],
            "mint_op_hash": [
                49
            ],
            "moderation_reason_id": [
                49
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "thumbnailMediaId": [
                466
            ],
            "thumbnail_caption": [
                49
            ],
            "thumbnail_uri": [
                49
            ],
            "title": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_max_order_by": {
            "artifact_uri": [
                1043
            ],
            "author_id": [
                1043
            ],
            "body": [
                1043
            ],
            "created_at": [
                1043
            ],
            "description": [
                1043
            ],
            "display_uri": [
                1043
            ],
            "editions": [
                1043
            ],
            "flag": [
                1043
            ],
            "id": [
                1043
            ],
            "language": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "mint_op_hash": [
                1043
            ],
            "moderation_reason_id": [
                1043
            ],
            "royalties": [
                1043
            ],
            "slug": [
                1043
            ],
            "thumbnailMediaId": [
                1043
            ],
            "thumbnail_caption": [
                1043
            ],
            "thumbnail_uri": [
                1043
            ],
            "title": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_min_fields": {
            "artifact_uri": [
                49
            ],
            "author_id": [
                49
            ],
            "body": [
                49
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "display_uri": [
                49
            ],
            "editions": [
                464
            ],
            "flag": [
                204
            ],
            "id": [
                27
            ],
            "language": [
                49
            ],
            "metadata_uri": [
                49
            ],
            "mint_op_hash": [
                49
            ],
            "moderation_reason_id": [
                49
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "thumbnailMediaId": [
                466
            ],
            "thumbnail_caption": [
                49
            ],
            "thumbnail_uri": [
                49
            ],
            "title": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_min_order_by": {
            "artifact_uri": [
                1043
            ],
            "author_id": [
                1043
            ],
            "body": [
                1043
            ],
            "created_at": [
                1043
            ],
            "description": [
                1043
            ],
            "display_uri": [
                1043
            ],
            "editions": [
                1043
            ],
            "flag": [
                1043
            ],
            "id": [
                1043
            ],
            "language": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "mint_op_hash": [
                1043
            ],
            "moderation_reason_id": [
                1043
            ],
            "royalties": [
                1043
            ],
            "slug": [
                1043
            ],
            "thumbnailMediaId": [
                1043
            ],
            "thumbnail_caption": [
                1043
            ],
            "thumbnail_uri": [
                1043
            ],
            "title": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                191
            ],
            "__typename": [
                49
            ]
        },
        "article_obj_rel_insert_input": {
            "data": [
                234
            ],
            "on_conflict": [
                282
            ],
            "__typename": [
                49
            ]
        },
        "article_on_conflict": {
            "constraint": [
                203
            ],
            "update_columns": [
                340
            ],
            "where": [
                202
            ],
            "__typename": [
                49
            ]
        },
        "article_order_by": {
            "actions_aggregate": [
                148
            ],
            "article_ledgers_aggregate": [
                240
            ],
            "article_revisions_aggregate": [
                290
            ],
            "artifact_uri": [
                1043
            ],
            "author_id": [
                1043
            ],
            "body": [
                1043
            ],
            "created_at": [
                1043
            ],
            "description": [
                1043
            ],
            "display_uri": [
                1043
            ],
            "editions": [
                1043
            ],
            "flag": [
                1043
            ],
            "id": [
                1043
            ],
            "language": [
                1043
            ],
            "listings_aggregate": [
                701
            ],
            "media_image": [
                820
            ],
            "metadata": [
                1043
            ],
            "metadata_locked": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "mint_op_hash": [
                1043
            ],
            "moderation_reason": [
                928
            ],
            "moderation_reason_id": [
                1043
            ],
            "platforms": [
                1043
            ],
            "royalties": [
                1043
            ],
            "slug": [
                1043
            ],
            "splits_aggregate": [
                1286
            ],
            "tags": [
                1043
            ],
            "thumbnailMediaId": [
                1043
            ],
            "thumbnail_caption": [
                1043
            ],
            "thumbnail_uri": [
                1043
            ],
            "title": [
                1043
            ],
            "transactions_aggregate": [
                1329
            ],
            "user": [
                1390
            ],
            "__typename": [
                49
            ]
        },
        "article_pk_columns_input": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_revision": {
            "article": [
                191
            ],
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "iteration": [
                1279
            ],
            "metadata_uri": [
                49
            ],
            "op_hash": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_aggregate": {
            "aggregate": [
                289
            ],
            "nodes": [
                285
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_aggregate_bool_exp": {
            "count": [
                288
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_aggregate_bool_exp_count": {
            "arguments": [
                306
            ],
            "distinct": [
                23
            ],
            "filter": [
                294
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_aggregate_fields": {
            "avg": [
                292
            ],
            "count": [
                27,
                {
                    "columns": [
                        306,
                        "[article_revision_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                298
            ],
            "min": [
                300
            ],
            "stddev": [
                308
            ],
            "stddev_pop": [
                310
            ],
            "stddev_samp": [
                312
            ],
            "sum": [
                316
            ],
            "var_pop": [
                320
            ],
            "var_samp": [
                322
            ],
            "variance": [
                324
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_aggregate_order_by": {
            "avg": [
                293
            ],
            "count": [
                1043
            ],
            "max": [
                299
            ],
            "min": [
                301
            ],
            "stddev": [
                309
            ],
            "stddev_pop": [
                311
            ],
            "stddev_samp": [
                313
            ],
            "sum": [
                317
            ],
            "var_pop": [
                321
            ],
            "var_samp": [
                323
            ],
            "variance": [
                325
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_arr_rel_insert_input": {
            "data": [
                297
            ],
            "on_conflict": [
                303
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_avg_fields": {
            "article_id": [
                25
            ],
            "iteration": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_avg_order_by": {
            "article_id": [
                1043
            ],
            "iteration": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_bool_exp": {
            "_and": [
                294
            ],
            "_not": [
                294
            ],
            "_or": [
                294
            ],
            "article": [
                202
            ],
            "article_id": [
                28
            ],
            "created_at": [
                1323
            ],
            "iteration": [
                1280
            ],
            "metadata_uri": [
                50
            ],
            "op_hash": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_constraint": {},
        "article_revision_inc_input": {
            "article_id": [
                27
            ],
            "iteration": [
                1279
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_insert_input": {
            "article": [
                281
            ],
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "iteration": [
                1279
            ],
            "metadata_uri": [
                49
            ],
            "op_hash": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_max_fields": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "iteration": [
                1279
            ],
            "metadata_uri": [
                49
            ],
            "op_hash": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_max_order_by": {
            "article_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "iteration": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "op_hash": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_min_fields": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "iteration": [
                1279
            ],
            "metadata_uri": [
                49
            ],
            "op_hash": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_min_order_by": {
            "article_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "iteration": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "op_hash": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                285
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_on_conflict": {
            "constraint": [
                295
            ],
            "update_columns": [
                318
            ],
            "where": [
                294
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_order_by": {
            "article": [
                283
            ],
            "article_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "iteration": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "op_hash": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_pk_columns_input": {
            "article_id": [
                27
            ],
            "iteration": [
                1279
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_select_column": {},
        "article_revision_set_input": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "iteration": [
                1279
            ],
            "metadata_uri": [
                49
            ],
            "op_hash": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_stddev_fields": {
            "article_id": [
                25
            ],
            "iteration": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_stddev_order_by": {
            "article_id": [
                1043
            ],
            "iteration": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_stddev_pop_fields": {
            "article_id": [
                25
            ],
            "iteration": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_stddev_pop_order_by": {
            "article_id": [
                1043
            ],
            "iteration": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_stddev_samp_fields": {
            "article_id": [
                25
            ],
            "iteration": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_stddev_samp_order_by": {
            "article_id": [
                1043
            ],
            "iteration": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_stream_cursor_input": {
            "initial_value": [
                315
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_stream_cursor_value_input": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "iteration": [
                1279
            ],
            "metadata_uri": [
                49
            ],
            "op_hash": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_sum_fields": {
            "article_id": [
                27
            ],
            "iteration": [
                1279
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_sum_order_by": {
            "article_id": [
                1043
            ],
            "iteration": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_update_column": {},
        "article_revision_updates": {
            "_inc": [
                296
            ],
            "_set": [
                307
            ],
            "where": [
                294
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_var_pop_fields": {
            "article_id": [
                25
            ],
            "iteration": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_var_pop_order_by": {
            "article_id": [
                1043
            ],
            "iteration": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_var_samp_fields": {
            "article_id": [
                25
            ],
            "iteration": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_var_samp_order_by": {
            "article_id": [
                1043
            ],
            "iteration": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_variance_fields": {
            "article_id": [
                25
            ],
            "iteration": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_revision_variance_order_by": {
            "article_id": [
                1043
            ],
            "iteration": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_select_column": {},
        "article_select_column_article_aggregate_bool_exp_bool_and_arguments_columns": {},
        "article_select_column_article_aggregate_bool_exp_bool_or_arguments_columns": {},
        "article_set_input": {
            "artifact_uri": [
                49
            ],
            "author_id": [
                49
            ],
            "body": [
                49
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "display_uri": [
                49
            ],
            "editions": [
                464
            ],
            "flag": [
                204
            ],
            "id": [
                27
            ],
            "language": [
                49
            ],
            "metadata": [
                691
            ],
            "metadata_locked": [
                23
            ],
            "metadata_uri": [
                49
            ],
            "mint_op_hash": [
                49
            ],
            "moderation_reason_id": [
                49
            ],
            "platforms": [
                141
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "tags": [
                141
            ],
            "thumbnailMediaId": [
                466
            ],
            "thumbnail_caption": [
                49
            ],
            "thumbnail_uri": [
                49
            ],
            "title": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_stddev_fields": {
            "editions": [
                25
            ],
            "id": [
                25
            ],
            "royalties": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_stddev_order_by": {
            "editions": [
                1043
            ],
            "id": [
                1043
            ],
            "royalties": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_stddev_pop_fields": {
            "editions": [
                25
            ],
            "id": [
                25
            ],
            "royalties": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_stddev_pop_order_by": {
            "editions": [
                1043
            ],
            "id": [
                1043
            ],
            "royalties": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_stddev_samp_fields": {
            "editions": [
                25
            ],
            "id": [
                25
            ],
            "royalties": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_stddev_samp_order_by": {
            "editions": [
                1043
            ],
            "id": [
                1043
            ],
            "royalties": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_stream_cursor_input": {
            "initial_value": [
                337
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "article_stream_cursor_value_input": {
            "artifact_uri": [
                49
            ],
            "author_id": [
                49
            ],
            "body": [
                49
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "display_uri": [
                49
            ],
            "editions": [
                464
            ],
            "flag": [
                204
            ],
            "id": [
                27
            ],
            "language": [
                49
            ],
            "metadata": [
                691
            ],
            "metadata_locked": [
                23
            ],
            "metadata_uri": [
                49
            ],
            "mint_op_hash": [
                49
            ],
            "moderation_reason_id": [
                49
            ],
            "platforms": [
                141
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "tags": [
                141
            ],
            "thumbnailMediaId": [
                466
            ],
            "thumbnail_caption": [
                49
            ],
            "thumbnail_uri": [
                49
            ],
            "title": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "article_sum_fields": {
            "editions": [
                464
            ],
            "id": [
                27
            ],
            "royalties": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "article_sum_order_by": {
            "editions": [
                1043
            ],
            "id": [
                1043
            ],
            "royalties": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_update_column": {},
        "article_updates": {
            "_inc": [
                233
            ],
            "_set": [
                329
            ],
            "where": [
                202
            ],
            "__typename": [
                49
            ]
        },
        "article_var_pop_fields": {
            "editions": [
                25
            ],
            "id": [
                25
            ],
            "royalties": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_var_pop_order_by": {
            "editions": [
                1043
            ],
            "id": [
                1043
            ],
            "royalties": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_var_samp_fields": {
            "editions": [
                25
            ],
            "id": [
                25
            ],
            "royalties": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_var_samp_order_by": {
            "editions": [
                1043
            ],
            "id": [
                1043
            ],
            "royalties": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "article_variance_fields": {
            "editions": [
                25
            ],
            "id": [
                25
            ],
            "royalties": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "article_variance_order_by": {
            "editions": [
                1043
            ],
            "id": [
                1043
            ],
            "royalties": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction": {
            "auction_bid_table": [
                390
            ],
            "auction_bids": [
                357,
                {
                    "distinct_on": [
                        378,
                        "[auction_bid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        376,
                        "[auction_bid_order_by!]"
                    ],
                    "where": [
                        366
                    ]
                }
            ],
            "auction_bids_aggregate": [
                358,
                {
                    "distinct_on": [
                        378,
                        "[auction_bid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        376,
                        "[auction_bid_order_by!]"
                    ],
                    "where": [
                        366
                    ]
                }
            ],
            "bid_table_id": [
                27
            ],
            "bid_time_increment": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "ends_at": [
                1322
            ],
            "fulfilled_at": [
                1322
            ],
            "id": [
                27
            ],
            "min_duration": [
                27
            ],
            "objkt": [
                938
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "reserve_price": [
                464
            ],
            "seller_id": [
                49
            ],
            "user": [
                1367
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_aggregate": {
            "aggregate": [
                352
            ],
            "nodes": [
                348
            ],
            "__typename": [
                49
            ]
        },
        "auction_aggregate_bool_exp": {
            "count": [
                351
            ],
            "__typename": [
                49
            ]
        },
        "auction_aggregate_bool_exp_count": {
            "arguments": [
                444
            ],
            "distinct": [
                23
            ],
            "filter": [
                431
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "auction_aggregate_fields": {
            "avg": [
                355
            ],
            "count": [
                27,
                {
                    "columns": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                435
            ],
            "min": [
                437
            ],
            "stddev": [
                446
            ],
            "stddev_pop": [
                448
            ],
            "stddev_samp": [
                450
            ],
            "sum": [
                454
            ],
            "var_pop": [
                458
            ],
            "var_samp": [
                460
            ],
            "variance": [
                462
            ],
            "__typename": [
                49
            ]
        },
        "auction_aggregate_order_by": {
            "avg": [
                356
            ],
            "count": [
                1043
            ],
            "max": [
                436
            ],
            "min": [
                438
            ],
            "stddev": [
                447
            ],
            "stddev_pop": [
                449
            ],
            "stddev_samp": [
                451
            ],
            "sum": [
                455
            ],
            "var_pop": [
                459
            ],
            "var_samp": [
                461
            ],
            "variance": [
                463
            ],
            "__typename": [
                49
            ]
        },
        "auction_arr_rel_insert_input": {
            "data": [
                434
            ],
            "on_conflict": [
                441
            ],
            "__typename": [
                49
            ]
        },
        "auction_avg_fields": {
            "bid_table_id": [
                25
            ],
            "bid_time_increment": [
                25
            ],
            "id": [
                25
            ],
            "min_duration": [
                25
            ],
            "reserve_price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_avg_order_by": {
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid": {
            "auction": [
                348
            ],
            "auction_id": [
                27
            ],
            "auction_version": [
                27
            ],
            "bidder_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "price": [
                936
            ],
            "user": [
                1367
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_aggregate": {
            "aggregate": [
                361
            ],
            "nodes": [
                357
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_aggregate_bool_exp": {
            "count": [
                360
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_aggregate_bool_exp_count": {
            "arguments": [
                378
            ],
            "distinct": [
                23
            ],
            "filter": [
                366
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_aggregate_fields": {
            "avg": [
                364
            ],
            "count": [
                27,
                {
                    "columns": [
                        378,
                        "[auction_bid_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                370
            ],
            "min": [
                372
            ],
            "stddev": [
                380
            ],
            "stddev_pop": [
                382
            ],
            "stddev_samp": [
                384
            ],
            "sum": [
                388
            ],
            "var_pop": [
                425
            ],
            "var_samp": [
                427
            ],
            "variance": [
                429
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_aggregate_order_by": {
            "avg": [
                365
            ],
            "count": [
                1043
            ],
            "max": [
                371
            ],
            "min": [
                373
            ],
            "stddev": [
                381
            ],
            "stddev_pop": [
                383
            ],
            "stddev_samp": [
                385
            ],
            "sum": [
                389
            ],
            "var_pop": [
                426
            ],
            "var_samp": [
                428
            ],
            "variance": [
                430
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_arr_rel_insert_input": {
            "data": [
                369
            ],
            "on_conflict": [
                375
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_avg_fields": {
            "auction_id": [
                25
            ],
            "auction_version": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_avg_order_by": {
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_bool_exp": {
            "_and": [
                366
            ],
            "_not": [
                366
            ],
            "_or": [
                366
            ],
            "auction": [
                431
            ],
            "auction_id": [
                28
            ],
            "auction_version": [
                28
            ],
            "bidder_id": [
                50
            ],
            "created_at": [
                1323
            ],
            "id": [
                1430
            ],
            "price": [
                937
            ],
            "user": [
                1375
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_constraint": {},
        "auction_bid_inc_input": {
            "auction_id": [
                27
            ],
            "auction_version": [
                27
            ],
            "price": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_insert_input": {
            "auction": [
                440
            ],
            "auction_id": [
                27
            ],
            "auction_version": [
                27
            ],
            "bidder_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "price": [
                936
            ],
            "user": [
                1388
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_max_fields": {
            "auction_id": [
                27
            ],
            "auction_version": [
                27
            ],
            "bidder_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "price": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_max_order_by": {
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "bidder_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_min_fields": {
            "auction_id": [
                27
            ],
            "auction_version": [
                27
            ],
            "bidder_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "price": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_min_order_by": {
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "bidder_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                357
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_on_conflict": {
            "constraint": [
                367
            ],
            "update_columns": [
                423
            ],
            "where": [
                366
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_order_by": {
            "auction": [
                442
            ],
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "bidder_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "user": [
                1390
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_pk_columns_input": {
            "id": [
                1429
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_select_column": {},
        "auction_bid_set_input": {
            "auction_id": [
                27
            ],
            "auction_version": [
                27
            ],
            "bidder_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "price": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_stddev_fields": {
            "auction_id": [
                25
            ],
            "auction_version": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_stddev_order_by": {
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_stddev_pop_fields": {
            "auction_id": [
                25
            ],
            "auction_version": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_stddev_pop_order_by": {
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_stddev_samp_fields": {
            "auction_id": [
                25
            ],
            "auction_version": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_stddev_samp_order_by": {
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_stream_cursor_input": {
            "initial_value": [
                387
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_stream_cursor_value_input": {
            "auction_id": [
                27
            ],
            "auction_version": [
                27
            ],
            "bidder_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "price": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_sum_fields": {
            "auction_id": [
                27
            ],
            "auction_version": [
                27
            ],
            "price": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_sum_order_by": {
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table": {
            "auctions": [
                348,
                {
                    "distinct_on": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        442,
                        "[auction_order_by!]"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "auctions_aggregate": [
                349,
                {
                    "distinct_on": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        442,
                        "[auction_order_by!]"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "id": [
                27
            ],
            "table": [
                693,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_aggregate": {
            "aggregate": [
                392
            ],
            "nodes": [
                390
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_aggregate_fields": {
            "avg": [
                394
            ],
            "count": [
                27,
                {
                    "columns": [
                        410,
                        "[auction_bid_table_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                402
            ],
            "min": [
                403
            ],
            "stddev": [
                412
            ],
            "stddev_pop": [
                413
            ],
            "stddev_samp": [
                414
            ],
            "sum": [
                417
            ],
            "var_pop": [
                420
            ],
            "var_samp": [
                421
            ],
            "variance": [
                422
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_append_input": {
            "table": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_avg_fields": {
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_bool_exp": {
            "_and": [
                395
            ],
            "_not": [
                395
            ],
            "_or": [
                395
            ],
            "auctions": [
                431
            ],
            "auctions_aggregate": [
                350
            ],
            "id": [
                28
            ],
            "table": [
                695
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_constraint": {},
        "auction_bid_table_delete_at_path_input": {
            "table": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_delete_elem_input": {
            "table": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_delete_key_input": {
            "table": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_inc_input": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_insert_input": {
            "auctions": [
                354
            ],
            "id": [
                27
            ],
            "table": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_max_fields": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_min_fields": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                390
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_obj_rel_insert_input": {
            "data": [
                401
            ],
            "on_conflict": [
                406
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_on_conflict": {
            "constraint": [
                396
            ],
            "update_columns": [
                418
            ],
            "where": [
                395
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_order_by": {
            "auctions_aggregate": [
                353
            ],
            "id": [
                1043
            ],
            "table": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_pk_columns_input": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_prepend_input": {
            "table": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_select_column": {},
        "auction_bid_table_set_input": {
            "id": [
                27
            ],
            "table": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_stddev_fields": {
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_stddev_pop_fields": {
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_stddev_samp_fields": {
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_stream_cursor_input": {
            "initial_value": [
                416
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_stream_cursor_value_input": {
            "id": [
                27
            ],
            "table": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_sum_fields": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_update_column": {},
        "auction_bid_table_updates": {
            "_append": [
                393
            ],
            "_delete_at_path": [
                397
            ],
            "_delete_elem": [
                398
            ],
            "_delete_key": [
                399
            ],
            "_inc": [
                400
            ],
            "_prepend": [
                409
            ],
            "_set": [
                411
            ],
            "where": [
                395
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_var_pop_fields": {
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_var_samp_fields": {
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_table_variance_fields": {
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_update_column": {},
        "auction_bid_updates": {
            "_inc": [
                368
            ],
            "_set": [
                379
            ],
            "where": [
                366
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_var_pop_fields": {
            "auction_id": [
                25
            ],
            "auction_version": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_var_pop_order_by": {
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_var_samp_fields": {
            "auction_id": [
                25
            ],
            "auction_version": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_var_samp_order_by": {
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_variance_fields": {
            "auction_id": [
                25
            ],
            "auction_version": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_bid_variance_order_by": {
            "auction_id": [
                1043
            ],
            "auction_version": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_bool_exp": {
            "_and": [
                431
            ],
            "_not": [
                431
            ],
            "_or": [
                431
            ],
            "auction_bid_table": [
                395
            ],
            "auction_bids": [
                366
            ],
            "auction_bids_aggregate": [
                359
            ],
            "bid_table_id": [
                28
            ],
            "bid_time_increment": [
                28
            ],
            "cancelled_at": [
                1323
            ],
            "created_at": [
                1323
            ],
            "ends_at": [
                1323
            ],
            "fulfilled_at": [
                1323
            ],
            "id": [
                28
            ],
            "min_duration": [
                28
            ],
            "objkt": [
                959
            ],
            "objkt_id": [
                50
            ],
            "objkt_issuer_version": [
                642
            ],
            "reserve_price": [
                465
            ],
            "seller_id": [
                50
            ],
            "user": [
                1375
            ],
            "version": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "auction_constraint": {},
        "auction_inc_input": {
            "bid_table_id": [
                27
            ],
            "bid_time_increment": [
                27
            ],
            "id": [
                27
            ],
            "min_duration": [
                27
            ],
            "reserve_price": [
                464
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_insert_input": {
            "auction_bid_table": [
                405
            ],
            "auction_bids": [
                363
            ],
            "bid_table_id": [
                27
            ],
            "bid_time_increment": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "ends_at": [
                1322
            ],
            "fulfilled_at": [
                1322
            ],
            "id": [
                27
            ],
            "min_duration": [
                27
            ],
            "objkt": [
                968
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "reserve_price": [
                464
            ],
            "seller_id": [
                49
            ],
            "user": [
                1388
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_max_fields": {
            "bid_table_id": [
                27
            ],
            "bid_time_increment": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "ends_at": [
                1322
            ],
            "fulfilled_at": [
                1322
            ],
            "id": [
                27
            ],
            "min_duration": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "reserve_price": [
                464
            ],
            "seller_id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_max_order_by": {
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "ends_at": [
                1043
            ],
            "fulfilled_at": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "seller_id": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_min_fields": {
            "bid_table_id": [
                27
            ],
            "bid_time_increment": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "ends_at": [
                1322
            ],
            "fulfilled_at": [
                1322
            ],
            "id": [
                27
            ],
            "min_duration": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "reserve_price": [
                464
            ],
            "seller_id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_min_order_by": {
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "ends_at": [
                1043
            ],
            "fulfilled_at": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "seller_id": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                348
            ],
            "__typename": [
                49
            ]
        },
        "auction_obj_rel_insert_input": {
            "data": [
                434
            ],
            "on_conflict": [
                441
            ],
            "__typename": [
                49
            ]
        },
        "auction_on_conflict": {
            "constraint": [
                432
            ],
            "update_columns": [
                456
            ],
            "where": [
                431
            ],
            "__typename": [
                49
            ]
        },
        "auction_order_by": {
            "auction_bid_table": [
                407
            ],
            "auction_bids_aggregate": [
                362
            ],
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "ends_at": [
                1043
            ],
            "fulfilled_at": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "objkt": [
                970
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "seller_id": [
                1043
            ],
            "user": [
                1390
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_pk_columns_input": {
            "id": [
                27
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_select_column": {},
        "auction_set_input": {
            "bid_table_id": [
                27
            ],
            "bid_time_increment": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "ends_at": [
                1322
            ],
            "fulfilled_at": [
                1322
            ],
            "id": [
                27
            ],
            "min_duration": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "reserve_price": [
                464
            ],
            "seller_id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_stddev_fields": {
            "bid_table_id": [
                25
            ],
            "bid_time_increment": [
                25
            ],
            "id": [
                25
            ],
            "min_duration": [
                25
            ],
            "reserve_price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_stddev_order_by": {
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_stddev_pop_fields": {
            "bid_table_id": [
                25
            ],
            "bid_time_increment": [
                25
            ],
            "id": [
                25
            ],
            "min_duration": [
                25
            ],
            "reserve_price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_stddev_pop_order_by": {
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_stddev_samp_fields": {
            "bid_table_id": [
                25
            ],
            "bid_time_increment": [
                25
            ],
            "id": [
                25
            ],
            "min_duration": [
                25
            ],
            "reserve_price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_stddev_samp_order_by": {
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_stream_cursor_input": {
            "initial_value": [
                453
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "auction_stream_cursor_value_input": {
            "bid_table_id": [
                27
            ],
            "bid_time_increment": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "ends_at": [
                1322
            ],
            "fulfilled_at": [
                1322
            ],
            "id": [
                27
            ],
            "min_duration": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "reserve_price": [
                464
            ],
            "seller_id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_sum_fields": {
            "bid_table_id": [
                27
            ],
            "bid_time_increment": [
                27
            ],
            "id": [
                27
            ],
            "min_duration": [
                27
            ],
            "reserve_price": [
                464
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "auction_sum_order_by": {
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_update_column": {},
        "auction_updates": {
            "_inc": [
                433
            ],
            "_set": [
                445
            ],
            "where": [
                431
            ],
            "__typename": [
                49
            ]
        },
        "auction_var_pop_fields": {
            "bid_table_id": [
                25
            ],
            "bid_time_increment": [
                25
            ],
            "id": [
                25
            ],
            "min_duration": [
                25
            ],
            "reserve_price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_var_pop_order_by": {
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_var_samp_fields": {
            "bid_table_id": [
                25
            ],
            "bid_time_increment": [
                25
            ],
            "id": [
                25
            ],
            "min_duration": [
                25
            ],
            "reserve_price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_var_samp_order_by": {
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "auction_variance_fields": {
            "bid_table_id": [
                25
            ],
            "bid_time_increment": [
                25
            ],
            "id": [
                25
            ],
            "min_duration": [
                25
            ],
            "reserve_price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "auction_variance_order_by": {
            "bid_table_id": [
                1043
            ],
            "bid_time_increment": [
                1043
            ],
            "id": [
                1043
            ],
            "min_duration": [
                1043
            ],
            "reserve_price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "bigint": {},
        "bigint_comparison_exp": {
            "_eq": [
                464
            ],
            "_gt": [
                464
            ],
            "_gte": [
                464
            ],
            "_in": [
                464
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                464
            ],
            "_lte": [
                464
            ],
            "_neq": [
                464
            ],
            "_nin": [
                464
            ],
            "__typename": [
                49
            ]
        },
        "bpchar": {},
        "bpchar_comparison_exp": {
            "_eq": [
                466
            ],
            "_gt": [
                466
            ],
            "_gte": [
                466
            ],
            "_ilike": [
                466
            ],
            "_in": [
                466
            ],
            "_iregex": [
                466
            ],
            "_is_null": [
                23
            ],
            "_like": [
                466
            ],
            "_lt": [
                466
            ],
            "_lte": [
                466
            ],
            "_neq": [
                466
            ],
            "_nilike": [
                466
            ],
            "_nin": [
                466
            ],
            "_niregex": [
                466
            ],
            "_nlike": [
                466
            ],
            "_nregex": [
                466
            ],
            "_nsimilar": [
                466
            ],
            "_regex": [
                466
            ],
            "_similar": [
                466
            ],
            "__typename": [
                49
            ]
        },
        "codex": {
            "author_id": [
                49
            ],
            "generative_tokens": [
                593,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "generative_tokens_aggregate": [
                594,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "id": [
                49
            ],
            "locked": [
                23
            ],
            "token_version": [
                641
            ],
            "type": [
                495
            ],
            "user": [
                1367
            ],
            "value": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "codex_aggregate": {
            "aggregate": [
                474
            ],
            "nodes": [
                468
            ],
            "__typename": [
                49
            ]
        },
        "codex_aggregate_bool_exp": {
            "bool_and": [
                471
            ],
            "bool_or": [
                472
            ],
            "count": [
                473
            ],
            "__typename": [
                49
            ]
        },
        "codex_aggregate_bool_exp_bool_and": {
            "arguments": [
                490
            ],
            "distinct": [
                23
            ],
            "filter": [
                477
            ],
            "predicate": [
                24
            ],
            "__typename": [
                49
            ]
        },
        "codex_aggregate_bool_exp_bool_or": {
            "arguments": [
                491
            ],
            "distinct": [
                23
            ],
            "filter": [
                477
            ],
            "predicate": [
                24
            ],
            "__typename": [
                49
            ]
        },
        "codex_aggregate_bool_exp_count": {
            "arguments": [
                489
            ],
            "distinct": [
                23
            ],
            "filter": [
                477
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "codex_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        489,
                        "[codex_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                480
            ],
            "min": [
                482
            ],
            "__typename": [
                49
            ]
        },
        "codex_aggregate_order_by": {
            "count": [
                1043
            ],
            "max": [
                481
            ],
            "min": [
                483
            ],
            "__typename": [
                49
            ]
        },
        "codex_arr_rel_insert_input": {
            "data": [
                479
            ],
            "on_conflict": [
                486
            ],
            "__typename": [
                49
            ]
        },
        "codex_bool_exp": {
            "_and": [
                477
            ],
            "_not": [
                477
            ],
            "_or": [
                477
            ],
            "author_id": [
                50
            ],
            "generative_tokens": [
                604
            ],
            "generative_tokens_aggregate": [
                595
            ],
            "id": [
                50
            ],
            "locked": [
                24
            ],
            "token_version": [
                642
            ],
            "type": [
                496
            ],
            "user": [
                1375
            ],
            "value": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "codex_constraint": {},
        "codex_insert_input": {
            "author_id": [
                49
            ],
            "generative_tokens": [
                601
            ],
            "id": [
                49
            ],
            "locked": [
                23
            ],
            "token_version": [
                641
            ],
            "type": [
                495
            ],
            "user": [
                1388
            ],
            "value": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "codex_max_fields": {
            "author_id": [
                49
            ],
            "id": [
                49
            ],
            "token_version": [
                641
            ],
            "type": [
                495
            ],
            "value": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "codex_max_order_by": {
            "author_id": [
                1043
            ],
            "id": [
                1043
            ],
            "token_version": [
                1043
            ],
            "type": [
                1043
            ],
            "value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "codex_min_fields": {
            "author_id": [
                49
            ],
            "id": [
                49
            ],
            "token_version": [
                641
            ],
            "type": [
                495
            ],
            "value": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "codex_min_order_by": {
            "author_id": [
                1043
            ],
            "id": [
                1043
            ],
            "token_version": [
                1043
            ],
            "type": [
                1043
            ],
            "value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "codex_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                468
            ],
            "__typename": [
                49
            ]
        },
        "codex_obj_rel_insert_input": {
            "data": [
                479
            ],
            "on_conflict": [
                486
            ],
            "__typename": [
                49
            ]
        },
        "codex_on_conflict": {
            "constraint": [
                478
            ],
            "update_columns": [
                497
            ],
            "where": [
                477
            ],
            "__typename": [
                49
            ]
        },
        "codex_order_by": {
            "author_id": [
                1043
            ],
            "generative_tokens_aggregate": [
                600
            ],
            "id": [
                1043
            ],
            "locked": [
                1043
            ],
            "token_version": [
                1043
            ],
            "type": [
                1043
            ],
            "user": [
                1390
            ],
            "value": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "codex_pk_columns_input": {
            "id": [
                49
            ],
            "token_version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "codex_select_column": {},
        "codex_select_column_codex_aggregate_bool_exp_bool_and_arguments_columns": {},
        "codex_select_column_codex_aggregate_bool_exp_bool_or_arguments_columns": {},
        "codex_set_input": {
            "author_id": [
                49
            ],
            "id": [
                49
            ],
            "locked": [
                23
            ],
            "token_version": [
                641
            ],
            "type": [
                495
            ],
            "value": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "codex_stream_cursor_input": {
            "initial_value": [
                494
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "codex_stream_cursor_value_input": {
            "author_id": [
                49
            ],
            "id": [
                49
            ],
            "locked": [
                23
            ],
            "token_version": [
                641
            ],
            "type": [
                495
            ],
            "value": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "codex_type_enum": {},
        "codex_type_enum_comparison_exp": {
            "_eq": [
                495
            ],
            "_gt": [
                495
            ],
            "_gte": [
                495
            ],
            "_in": [
                495
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                495
            ],
            "_lte": [
                495
            ],
            "_neq": [
                495
            ],
            "_nin": [
                495
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_column": {},
        "codex_update_request": {
            "codex_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "generative_token": [
                593
            ],
            "status": [
                518
            ],
            "token_id": [
                49
            ],
            "token_version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_aggregate": {
            "aggregate": [
                502
            ],
            "nodes": [
                498
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_aggregate_bool_exp": {
            "count": [
                501
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_aggregate_bool_exp_count": {
            "arguments": [
                516
            ],
            "distinct": [
                23
            ],
            "filter": [
                505
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        516,
                        "[codex_update_request_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                508
            ],
            "min": [
                510
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_aggregate_order_by": {
            "count": [
                1043
            ],
            "max": [
                509
            ],
            "min": [
                511
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_arr_rel_insert_input": {
            "data": [
                507
            ],
            "on_conflict": [
                513
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_bool_exp": {
            "_and": [
                505
            ],
            "_not": [
                505
            ],
            "_or": [
                505
            ],
            "codex_id": [
                50
            ],
            "created_at": [
                1323
            ],
            "generative_token": [
                604
            ],
            "status": [
                519
            ],
            "token_id": [
                50
            ],
            "token_version": [
                642
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_constraint": {},
        "codex_update_request_insert_input": {
            "codex_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "generative_token": [
                615
            ],
            "status": [
                518
            ],
            "token_id": [
                49
            ],
            "token_version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_max_fields": {
            "codex_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "status": [
                518
            ],
            "token_id": [
                49
            ],
            "token_version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_max_order_by": {
            "codex_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "status": [
                1043
            ],
            "token_id": [
                1043
            ],
            "token_version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_min_fields": {
            "codex_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "status": [
                518
            ],
            "token_id": [
                49
            ],
            "token_version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_min_order_by": {
            "codex_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "status": [
                1043
            ],
            "token_id": [
                1043
            ],
            "token_version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                498
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_on_conflict": {
            "constraint": [
                506
            ],
            "update_columns": [
                522
            ],
            "where": [
                505
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_order_by": {
            "codex_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "generative_token": [
                617
            ],
            "status": [
                1043
            ],
            "token_id": [
                1043
            ],
            "token_version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_pk_columns_input": {
            "codex_id": [
                49
            ],
            "token_id": [
                49
            ],
            "token_version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_select_column": {},
        "codex_update_request_set_input": {
            "codex_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "status": [
                518
            ],
            "token_id": [
                49
            ],
            "token_version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_status_enum": {},
        "codex_update_request_status_enum_comparison_exp": {
            "_eq": [
                518
            ],
            "_gt": [
                518
            ],
            "_gte": [
                518
            ],
            "_in": [
                518
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                518
            ],
            "_lte": [
                518
            ],
            "_neq": [
                518
            ],
            "_nin": [
                518
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_stream_cursor_input": {
            "initial_value": [
                521
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_stream_cursor_value_input": {
            "codex_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "status": [
                518
            ],
            "token_id": [
                49
            ],
            "token_version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "codex_update_request_update_column": {},
        "codex_update_request_updates": {
            "_set": [
                517
            ],
            "where": [
                505
            ],
            "__typename": [
                49
            ]
        },
        "codex_updates": {
            "_set": [
                492
            ],
            "where": [
                477
            ],
            "__typename": [
                49
            ]
        },
        "collaboration": {
            "collaboration_contract_id": [
                49
            ],
            "collaborator_id": [
                49
            ],
            "user": [
                1367
            ],
            "userByCollaboratorId": [
                1367
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_aggregate": {
            "aggregate": [
                529
            ],
            "nodes": [
                525
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_aggregate_bool_exp": {
            "count": [
                528
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_aggregate_bool_exp_count": {
            "arguments": [
                543
            ],
            "distinct": [
                23
            ],
            "filter": [
                532
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        543,
                        "[collaboration_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                535
            ],
            "min": [
                537
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_aggregate_order_by": {
            "count": [
                1043
            ],
            "max": [
                536
            ],
            "min": [
                538
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_arr_rel_insert_input": {
            "data": [
                534
            ],
            "on_conflict": [
                540
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_bool_exp": {
            "_and": [
                532
            ],
            "_not": [
                532
            ],
            "_or": [
                532
            ],
            "collaboration_contract_id": [
                50
            ],
            "collaborator_id": [
                50
            ],
            "user": [
                1375
            ],
            "userByCollaboratorId": [
                1375
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_constraint": {},
        "collaboration_insert_input": {
            "collaboration_contract_id": [
                49
            ],
            "collaborator_id": [
                49
            ],
            "user": [
                1388
            ],
            "userByCollaboratorId": [
                1388
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_max_fields": {
            "collaboration_contract_id": [
                49
            ],
            "collaborator_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_max_order_by": {
            "collaboration_contract_id": [
                1043
            ],
            "collaborator_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_min_fields": {
            "collaboration_contract_id": [
                49
            ],
            "collaborator_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_min_order_by": {
            "collaboration_contract_id": [
                1043
            ],
            "collaborator_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                525
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_on_conflict": {
            "constraint": [
                533
            ],
            "update_columns": [
                547
            ],
            "where": [
                532
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_order_by": {
            "collaboration_contract_id": [
                1043
            ],
            "collaborator_id": [
                1043
            ],
            "user": [
                1390
            ],
            "userByCollaboratorId": [
                1390
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_pk_columns_input": {
            "collaboration_contract_id": [
                49
            ],
            "collaborator_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_select_column": {},
        "collaboration_set_input": {
            "collaboration_contract_id": [
                49
            ],
            "collaborator_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_stream_cursor_input": {
            "initial_value": [
                546
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_stream_cursor_value_input": {
            "collaboration_contract_id": [
                49
            ],
            "collaborator_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "collaboration_update_column": {},
        "collaboration_updates": {
            "_set": [
                544
            ],
            "where": [
                532
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer": {
            "amount": [
                936
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "completed_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "generative_token": [
                593
            ],
            "id": [
                49
            ],
            "initial_amount": [
                936
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "user": [
                1367
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_aggregate": {
            "aggregate": [
                553
            ],
            "nodes": [
                549
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_aggregate_bool_exp": {
            "count": [
                552
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_aggregate_bool_exp_count": {
            "arguments": [
                570
            ],
            "distinct": [
                23
            ],
            "filter": [
                558
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_aggregate_fields": {
            "avg": [
                556
            ],
            "count": [
                27,
                {
                    "columns": [
                        570,
                        "[collection_offer_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                562
            ],
            "min": [
                564
            ],
            "stddev": [
                572
            ],
            "stddev_pop": [
                574
            ],
            "stddev_samp": [
                576
            ],
            "sum": [
                580
            ],
            "var_pop": [
                584
            ],
            "var_samp": [
                586
            ],
            "variance": [
                588
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_aggregate_order_by": {
            "avg": [
                557
            ],
            "count": [
                1043
            ],
            "max": [
                563
            ],
            "min": [
                565
            ],
            "stddev": [
                573
            ],
            "stddev_pop": [
                575
            ],
            "stddev_samp": [
                577
            ],
            "sum": [
                581
            ],
            "var_pop": [
                585
            ],
            "var_samp": [
                587
            ],
            "variance": [
                589
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_arr_rel_insert_input": {
            "data": [
                561
            ],
            "on_conflict": [
                567
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_avg_fields": {
            "amount": [
                25
            ],
            "initial_amount": [
                25
            ],
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_avg_order_by": {
            "amount": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_bool_exp": {
            "_and": [
                558
            ],
            "_not": [
                558
            ],
            "_or": [
                558
            ],
            "amount": [
                937
            ],
            "buyer_id": [
                50
            ],
            "cancelled_at": [
                1323
            ],
            "completed_at": [
                1323
            ],
            "created_at": [
                1323
            ],
            "generative_token": [
                604
            ],
            "id": [
                50
            ],
            "initial_amount": [
                937
            ],
            "price": [
                937
            ],
            "token_id": [
                50
            ],
            "user": [
                1375
            ],
            "version": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_constraint": {},
        "collection_offer_inc_input": {
            "amount": [
                936
            ],
            "initial_amount": [
                936
            ],
            "price": [
                936
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_insert_input": {
            "amount": [
                936
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "completed_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "generative_token": [
                615
            ],
            "id": [
                49
            ],
            "initial_amount": [
                936
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "user": [
                1388
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_max_fields": {
            "amount": [
                936
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "completed_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "initial_amount": [
                936
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_max_order_by": {
            "amount": [
                1043
            ],
            "buyer_id": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "completed_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "token_id": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_min_fields": {
            "amount": [
                936
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "completed_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "initial_amount": [
                936
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_min_order_by": {
            "amount": [
                1043
            ],
            "buyer_id": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "completed_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "token_id": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                549
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_on_conflict": {
            "constraint": [
                559
            ],
            "update_columns": [
                582
            ],
            "where": [
                558
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_order_by": {
            "amount": [
                1043
            ],
            "buyer_id": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "completed_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "generative_token": [
                617
            ],
            "id": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "token_id": [
                1043
            ],
            "user": [
                1390
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_pk_columns_input": {
            "id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_select_column": {},
        "collection_offer_set_input": {
            "amount": [
                936
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "completed_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "initial_amount": [
                936
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_stddev_fields": {
            "amount": [
                25
            ],
            "initial_amount": [
                25
            ],
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_stddev_order_by": {
            "amount": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_stddev_pop_fields": {
            "amount": [
                25
            ],
            "initial_amount": [
                25
            ],
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_stddev_pop_order_by": {
            "amount": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_stddev_samp_fields": {
            "amount": [
                25
            ],
            "initial_amount": [
                25
            ],
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_stddev_samp_order_by": {
            "amount": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_stream_cursor_input": {
            "initial_value": [
                579
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_stream_cursor_value_input": {
            "amount": [
                936
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "completed_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "initial_amount": [
                936
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_sum_fields": {
            "amount": [
                936
            ],
            "initial_amount": [
                936
            ],
            "price": [
                936
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_sum_order_by": {
            "amount": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_update_column": {},
        "collection_offer_updates": {
            "_inc": [
                560
            ],
            "_set": [
                571
            ],
            "where": [
                558
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_var_pop_fields": {
            "amount": [
                25
            ],
            "initial_amount": [
                25
            ],
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_var_pop_order_by": {
            "amount": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_var_samp_fields": {
            "amount": [
                25
            ],
            "initial_amount": [
                25
            ],
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_var_samp_order_by": {
            "amount": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_variance_fields": {
            "amount": [
                25
            ],
            "initial_amount": [
                25
            ],
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "collection_offer_variance_order_by": {
            "amount": [
                1043
            ],
            "initial_amount": [
                1043
            ],
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "cursor_ordering": {},
        "float8": {},
        "float8_comparison_exp": {
            "_eq": [
                591
            ],
            "_gt": [
                591
            ],
            "_gte": [
                591
            ],
            "_in": [
                591
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                591
            ],
            "_lte": [
                591
            ],
            "_neq": [
                591
            ],
            "_nin": [
                591
            ],
            "__typename": [
                49
            ]
        },
        "generative_token": {
            "actions": [
                143,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "actions_aggregate": [
                144,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "author_id": [
                49
            ],
            "balance": [
                936
            ],
            "captureMediaId": [
                466
            ],
            "codex": [
                468
            ],
            "codexId": [
                49
            ],
            "codex_id": [
                49
            ],
            "codex_update_requests": [
                498,
                {
                    "distinct_on": [
                        516,
                        "[codex_update_request_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        514,
                        "[codex_update_request_order_by!]"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "codex_update_requests_aggregate": [
                499,
                {
                    "distinct_on": [
                        516,
                        "[codex_update_request_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        514,
                        "[codex_update_request_order_by!]"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "collection_offers": [
                549,
                {
                    "distinct_on": [
                        570,
                        "[collection_offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        568,
                        "[collection_offer_order_by!]"
                    ],
                    "where": [
                        558
                    ]
                }
            ],
            "collection_offers_aggregate": [
                550,
                {
                    "distinct_on": [
                        570,
                        "[collection_offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        568,
                        "[collection_offer_order_by!]"
                    ],
                    "where": [
                        558
                    ]
                }
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                49
            ],
            "enabled": [
                23
            ],
            "flag": [
                606
            ],
            "generative_uri": [
                49
            ],
            "id": [
                49
            ],
            "input_bytes_size": [
                27
            ],
            "iterations_count": [
                936
            ],
            "labels": [
                137
            ],
            "lock_end": [
                1322
            ],
            "lock_price_for_reserves": [
                23
            ],
            "locked_seconds": [
                27
            ],
            "market_stat": [
                738
            ],
            "market_stats_histories": [
                744,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "market_stats_histories_aggregate": [
                745,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "media_image": [
                807
            ],
            "metadata": [
                691,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "metadata_uri": [
                49
            ],
            "mint_opens_at": [
                1322
            ],
            "mint_ticket_settings": [
                858,
                {
                    "distinct_on": [
                        879,
                        "[mint_ticket_settings_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        877,
                        "[mint_ticket_settings_order_by!]"
                    ],
                    "where": [
                        867
                    ]
                }
            ],
            "mint_ticket_settings_aggregate": [
                859,
                {
                    "distinct_on": [
                        879,
                        "[mint_ticket_settings_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        877,
                        "[mint_ticket_settings_order_by!]"
                    ],
                    "where": [
                        867
                    ]
                }
            ],
            "mint_tickets": [
                835,
                {
                    "distinct_on": [
                        856,
                        "[mint_ticket_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        854,
                        "[mint_ticket_order_by!]"
                    ],
                    "where": [
                        844
                    ]
                }
            ],
            "mint_tickets_aggregate": [
                836,
                {
                    "distinct_on": [
                        856,
                        "[mint_ticket_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        854,
                        "[mint_ticket_order_by!]"
                    ],
                    "where": [
                        844
                    ]
                }
            ],
            "moderation_reason": [
                917
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "objkts": [
                938,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "objkts_aggregate": [
                939,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "open_editions": [
                23
            ],
            "open_editions_ends_at": [
                1322
            ],
            "original_supply": [
                936
            ],
            "params_definition": [
                691,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "preview_input_bytes": [
                49
            ],
            "pricing_dutch_auctions": [
                1044,
                {
                    "distinct_on": [
                        1065,
                        "[pricing_dutch_auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1063,
                        "[pricing_dutch_auction_order_by!]"
                    ],
                    "where": [
                        1053
                    ]
                }
            ],
            "pricing_dutch_auctions_aggregate": [
                1045,
                {
                    "distinct_on": [
                        1065,
                        "[pricing_dutch_auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1063,
                        "[pricing_dutch_auction_order_by!]"
                    ],
                    "where": [
                        1053
                    ]
                }
            ],
            "pricing_fixeds": [
                1085,
                {
                    "distinct_on": [
                        1106,
                        "[pricing_fixed_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1104,
                        "[pricing_fixed_order_by!]"
                    ],
                    "where": [
                        1094
                    ]
                }
            ],
            "pricing_fixeds_aggregate": [
                1086,
                {
                    "distinct_on": [
                        1106,
                        "[pricing_fixed_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1104,
                        "[pricing_fixed_order_by!]"
                    ],
                    "where": [
                        1094
                    ]
                }
            ],
            "redeemables": [
                1126,
                {
                    "distinct_on": [
                        1148,
                        "[redeemable_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1146,
                        "[redeemable_order_by!]"
                    ],
                    "where": [
                        1135
                    ]
                }
            ],
            "redeemables_aggregate": [
                1127,
                {
                    "distinct_on": [
                        1148,
                        "[redeemable_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1146,
                        "[redeemable_order_by!]"
                    ],
                    "where": [
                        1135
                    ]
                }
            ],
            "reports": [
                1209,
                {
                    "distinct_on": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1225,
                        "[report_order_by!]"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "reports_aggregate": [
                1210,
                {
                    "distinct_on": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1225,
                        "[report_order_by!]"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "reserves": [
                1233,
                {
                    "distinct_on": [
                        1259,
                        "[reserve_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1256,
                        "[reserve_order_by!]"
                    ],
                    "where": [
                        1243
                    ]
                }
            ],
            "reserves_aggregate": [
                1234,
                {
                    "distinct_on": [
                        1259,
                        "[reserve_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1256,
                        "[reserve_order_by!]"
                    ],
                    "where": [
                        1243
                    ]
                }
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "splits": [
                1281,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "splitsByGenerativeTokenPrimaryId": [
                1281,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "splitsByGenerativeTokenPrimaryId_aggregate": [
                1282,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "splits_aggregate": [
                1282,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "supply": [
                936
            ],
            "tags": [
                141
            ],
            "thumbnail_uri": [
                49
            ],
            "transactions": [
                1324,
                {
                    "distinct_on": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1343,
                        "[transaction_order_by!]"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "transactions_aggregate": [
                1325,
                {
                    "distinct_on": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1343,
                        "[transaction_order_by!]"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "updated_at": [
                1322
            ],
            "user": [
                1367
            ],
            "version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_aggregate": {
            "aggregate": [
                599
            ],
            "nodes": [
                593
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_aggregate_bool_exp": {
            "bool_and": [
                596
            ],
            "bool_or": [
                597
            ],
            "count": [
                598
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_aggregate_bool_exp_bool_and": {
            "arguments": [
                620
            ],
            "distinct": [
                23
            ],
            "filter": [
                604
            ],
            "predicate": [
                24
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_aggregate_bool_exp_bool_or": {
            "arguments": [
                621
            ],
            "distinct": [
                23
            ],
            "filter": [
                604
            ],
            "predicate": [
                24
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_aggregate_bool_exp_count": {
            "arguments": [
                619
            ],
            "distinct": [
                23
            ],
            "filter": [
                604
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_aggregate_fields": {
            "avg": [
                602
            ],
            "count": [
                27,
                {
                    "columns": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                610
            ],
            "min": [
                612
            ],
            "stddev": [
                623
            ],
            "stddev_pop": [
                625
            ],
            "stddev_samp": [
                627
            ],
            "sum": [
                631
            ],
            "var_pop": [
                635
            ],
            "var_samp": [
                637
            ],
            "variance": [
                639
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_aggregate_order_by": {
            "avg": [
                603
            ],
            "count": [
                1043
            ],
            "max": [
                611
            ],
            "min": [
                613
            ],
            "stddev": [
                624
            ],
            "stddev_pop": [
                626
            ],
            "stddev_samp": [
                628
            ],
            "sum": [
                632
            ],
            "var_pop": [
                636
            ],
            "var_samp": [
                638
            ],
            "variance": [
                640
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_arr_rel_insert_input": {
            "data": [
                609
            ],
            "on_conflict": [
                616
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_avg_fields": {
            "balance": [
                25
            ],
            "input_bytes_size": [
                25
            ],
            "iterations_count": [
                25
            ],
            "locked_seconds": [
                25
            ],
            "original_supply": [
                25
            ],
            "royalties": [
                25
            ],
            "supply": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_avg_order_by": {
            "balance": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "royalties": [
                1043
            ],
            "supply": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_bool_exp": {
            "_and": [
                604
            ],
            "_not": [
                604
            ],
            "_or": [
                604
            ],
            "actions": [
                153
            ],
            "actions_aggregate": [
                145
            ],
            "author_id": [
                50
            ],
            "balance": [
                937
            ],
            "captureMediaId": [
                467
            ],
            "codex": [
                477
            ],
            "codexId": [
                50
            ],
            "codex_id": [
                50
            ],
            "codex_update_requests": [
                505
            ],
            "codex_update_requests_aggregate": [
                500
            ],
            "collection_offers": [
                558
            ],
            "collection_offers_aggregate": [
                551
            ],
            "created_at": [
                1323
            ],
            "display_uri": [
                50
            ],
            "enabled": [
                24
            ],
            "flag": [
                607
            ],
            "generative_uri": [
                50
            ],
            "id": [
                50
            ],
            "input_bytes_size": [
                28
            ],
            "iterations_count": [
                937
            ],
            "labels": [
                138
            ],
            "lock_end": [
                1323
            ],
            "lock_price_for_reserves": [
                24
            ],
            "locked_seconds": [
                28
            ],
            "market_stat": [
                742
            ],
            "market_stats_histories": [
                753
            ],
            "market_stats_histories_aggregate": [
                746
            ],
            "media_image": [
                811
            ],
            "metadata": [
                692
            ],
            "metadata_uri": [
                50
            ],
            "mint_opens_at": [
                1323
            ],
            "mint_ticket_settings": [
                867
            ],
            "mint_ticket_settings_aggregate": [
                860
            ],
            "mint_tickets": [
                844
            ],
            "mint_tickets_aggregate": [
                837
            ],
            "moderation_reason": [
                920
            ],
            "moderation_reason_id": [
                50
            ],
            "name": [
                50
            ],
            "objkts": [
                959
            ],
            "objkts_aggregate": [
                940
            ],
            "open_editions": [
                24
            ],
            "open_editions_ends_at": [
                1323
            ],
            "original_supply": [
                937
            ],
            "params_definition": [
                692
            ],
            "preview_input_bytes": [
                50
            ],
            "pricing_dutch_auctions": [
                1053
            ],
            "pricing_dutch_auctions_aggregate": [
                1046
            ],
            "pricing_fixeds": [
                1094
            ],
            "pricing_fixeds_aggregate": [
                1087
            ],
            "redeemables": [
                1135
            ],
            "redeemables_aggregate": [
                1128
            ],
            "reports": [
                1216
            ],
            "reports_aggregate": [
                1211
            ],
            "reserves": [
                1243
            ],
            "reserves_aggregate": [
                1235
            ],
            "royalties": [
                28
            ],
            "slug": [
                50
            ],
            "splits": [
                1290
            ],
            "splitsByGenerativeTokenPrimaryId": [
                1290
            ],
            "splitsByGenerativeTokenPrimaryId_aggregate": [
                1283
            ],
            "splits_aggregate": [
                1283
            ],
            "supply": [
                937
            ],
            "tags": [
                142
            ],
            "thumbnail_uri": [
                50
            ],
            "transactions": [
                1333
            ],
            "transactions_aggregate": [
                1326
            ],
            "updated_at": [
                1323
            ],
            "user": [
                1375
            ],
            "version": [
                642
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_constraint": {},
        "generative_token_flag_enum": {},
        "generative_token_flag_enum_comparison_exp": {
            "_eq": [
                606
            ],
            "_gt": [
                606
            ],
            "_gte": [
                606
            ],
            "_in": [
                606
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                606
            ],
            "_lte": [
                606
            ],
            "_neq": [
                606
            ],
            "_nin": [
                606
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_inc_input": {
            "balance": [
                936
            ],
            "input_bytes_size": [
                27
            ],
            "iterations_count": [
                936
            ],
            "locked_seconds": [
                27
            ],
            "original_supply": [
                936
            ],
            "royalties": [
                27
            ],
            "supply": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_insert_input": {
            "actions": [
                150
            ],
            "author_id": [
                49
            ],
            "balance": [
                936
            ],
            "captureMediaId": [
                466
            ],
            "codex": [
                485
            ],
            "codexId": [
                49
            ],
            "codex_id": [
                49
            ],
            "codex_update_requests": [
                504
            ],
            "collection_offers": [
                555
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                49
            ],
            "enabled": [
                23
            ],
            "flag": [
                606
            ],
            "generative_uri": [
                49
            ],
            "id": [
                49
            ],
            "input_bytes_size": [
                27
            ],
            "iterations_count": [
                936
            ],
            "labels": [
                137
            ],
            "lock_end": [
                1322
            ],
            "lock_price_for_reserves": [
                23
            ],
            "locked_seconds": [
                27
            ],
            "market_stat": [
                790
            ],
            "market_stats_histories": [
                750
            ],
            "media_image": [
                818
            ],
            "metadata": [
                691
            ],
            "metadata_uri": [
                49
            ],
            "mint_opens_at": [
                1322
            ],
            "mint_ticket_settings": [
                864
            ],
            "mint_tickets": [
                841
            ],
            "moderation_reason": [
                926
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "objkts": [
                956
            ],
            "open_editions": [
                23
            ],
            "open_editions_ends_at": [
                1322
            ],
            "original_supply": [
                936
            ],
            "params_definition": [
                691
            ],
            "preview_input_bytes": [
                49
            ],
            "pricing_dutch_auctions": [
                1050
            ],
            "pricing_fixeds": [
                1091
            ],
            "redeemables": [
                1132
            ],
            "reports": [
                1215
            ],
            "reserves": [
                1240
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "splits": [
                1287
            ],
            "splitsByGenerativeTokenPrimaryId": [
                1287
            ],
            "supply": [
                936
            ],
            "tags": [
                141
            ],
            "thumbnail_uri": [
                49
            ],
            "transactions": [
                1330
            ],
            "updated_at": [
                1322
            ],
            "user": [
                1388
            ],
            "version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_max_fields": {
            "author_id": [
                49
            ],
            "balance": [
                936
            ],
            "captureMediaId": [
                466
            ],
            "codexId": [
                49
            ],
            "codex_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                49
            ],
            "flag": [
                606
            ],
            "generative_uri": [
                49
            ],
            "id": [
                49
            ],
            "input_bytes_size": [
                27
            ],
            "iterations_count": [
                936
            ],
            "lock_end": [
                1322
            ],
            "locked_seconds": [
                27
            ],
            "metadata_uri": [
                49
            ],
            "mint_opens_at": [
                1322
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "open_editions_ends_at": [
                1322
            ],
            "original_supply": [
                936
            ],
            "preview_input_bytes": [
                49
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "supply": [
                936
            ],
            "thumbnail_uri": [
                49
            ],
            "updated_at": [
                1322
            ],
            "version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_max_order_by": {
            "author_id": [
                1043
            ],
            "balance": [
                1043
            ],
            "captureMediaId": [
                1043
            ],
            "codexId": [
                1043
            ],
            "codex_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "display_uri": [
                1043
            ],
            "flag": [
                1043
            ],
            "generative_uri": [
                1043
            ],
            "id": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "lock_end": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "mint_opens_at": [
                1043
            ],
            "moderation_reason_id": [
                1043
            ],
            "name": [
                1043
            ],
            "open_editions_ends_at": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "preview_input_bytes": [
                1043
            ],
            "royalties": [
                1043
            ],
            "slug": [
                1043
            ],
            "supply": [
                1043
            ],
            "thumbnail_uri": [
                1043
            ],
            "updated_at": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_min_fields": {
            "author_id": [
                49
            ],
            "balance": [
                936
            ],
            "captureMediaId": [
                466
            ],
            "codexId": [
                49
            ],
            "codex_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                49
            ],
            "flag": [
                606
            ],
            "generative_uri": [
                49
            ],
            "id": [
                49
            ],
            "input_bytes_size": [
                27
            ],
            "iterations_count": [
                936
            ],
            "lock_end": [
                1322
            ],
            "locked_seconds": [
                27
            ],
            "metadata_uri": [
                49
            ],
            "mint_opens_at": [
                1322
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "open_editions_ends_at": [
                1322
            ],
            "original_supply": [
                936
            ],
            "preview_input_bytes": [
                49
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "supply": [
                936
            ],
            "thumbnail_uri": [
                49
            ],
            "updated_at": [
                1322
            ],
            "version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_min_order_by": {
            "author_id": [
                1043
            ],
            "balance": [
                1043
            ],
            "captureMediaId": [
                1043
            ],
            "codexId": [
                1043
            ],
            "codex_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "display_uri": [
                1043
            ],
            "flag": [
                1043
            ],
            "generative_uri": [
                1043
            ],
            "id": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "lock_end": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "mint_opens_at": [
                1043
            ],
            "moderation_reason_id": [
                1043
            ],
            "name": [
                1043
            ],
            "open_editions_ends_at": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "preview_input_bytes": [
                1043
            ],
            "royalties": [
                1043
            ],
            "slug": [
                1043
            ],
            "supply": [
                1043
            ],
            "thumbnail_uri": [
                1043
            ],
            "updated_at": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                593
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_obj_rel_insert_input": {
            "data": [
                609
            ],
            "on_conflict": [
                616
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_on_conflict": {
            "constraint": [
                605
            ],
            "update_columns": [
                633
            ],
            "where": [
                604
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_order_by": {
            "actions_aggregate": [
                148
            ],
            "author_id": [
                1043
            ],
            "balance": [
                1043
            ],
            "captureMediaId": [
                1043
            ],
            "codex": [
                487
            ],
            "codexId": [
                1043
            ],
            "codex_id": [
                1043
            ],
            "codex_update_requests_aggregate": [
                503
            ],
            "collection_offers_aggregate": [
                554
            ],
            "created_at": [
                1043
            ],
            "display_uri": [
                1043
            ],
            "enabled": [
                1043
            ],
            "flag": [
                1043
            ],
            "generative_uri": [
                1043
            ],
            "id": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "labels": [
                1043
            ],
            "lock_end": [
                1043
            ],
            "lock_price_for_reserves": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "market_stat": [
                792
            ],
            "market_stats_histories_aggregate": [
                749
            ],
            "media_image": [
                820
            ],
            "metadata": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "mint_opens_at": [
                1043
            ],
            "mint_ticket_settings_aggregate": [
                863
            ],
            "mint_tickets_aggregate": [
                840
            ],
            "moderation_reason": [
                928
            ],
            "moderation_reason_id": [
                1043
            ],
            "name": [
                1043
            ],
            "objkts_aggregate": [
                955
            ],
            "open_editions": [
                1043
            ],
            "open_editions_ends_at": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "params_definition": [
                1043
            ],
            "preview_input_bytes": [
                1043
            ],
            "pricing_dutch_auctions_aggregate": [
                1049
            ],
            "pricing_fixeds_aggregate": [
                1090
            ],
            "redeemables_aggregate": [
                1131
            ],
            "reports_aggregate": [
                1214
            ],
            "reserves_aggregate": [
                1238
            ],
            "royalties": [
                1043
            ],
            "slug": [
                1043
            ],
            "splitsByGenerativeTokenPrimaryId_aggregate": [
                1286
            ],
            "splits_aggregate": [
                1286
            ],
            "supply": [
                1043
            ],
            "tags": [
                1043
            ],
            "thumbnail_uri": [
                1043
            ],
            "transactions_aggregate": [
                1329
            ],
            "updated_at": [
                1043
            ],
            "user": [
                1390
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_pk_columns_input": {
            "id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_select_column": {},
        "generative_token_select_column_generative_token_aggregate_bool_exp_bool_and_arguments_columns": {},
        "generative_token_select_column_generative_token_aggregate_bool_exp_bool_or_arguments_columns": {},
        "generative_token_set_input": {
            "author_id": [
                49
            ],
            "balance": [
                936
            ],
            "captureMediaId": [
                466
            ],
            "codexId": [
                49
            ],
            "codex_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                49
            ],
            "enabled": [
                23
            ],
            "flag": [
                606
            ],
            "generative_uri": [
                49
            ],
            "id": [
                49
            ],
            "input_bytes_size": [
                27
            ],
            "iterations_count": [
                936
            ],
            "labels": [
                137
            ],
            "lock_end": [
                1322
            ],
            "lock_price_for_reserves": [
                23
            ],
            "locked_seconds": [
                27
            ],
            "metadata": [
                691
            ],
            "metadata_uri": [
                49
            ],
            "mint_opens_at": [
                1322
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "open_editions": [
                23
            ],
            "open_editions_ends_at": [
                1322
            ],
            "original_supply": [
                936
            ],
            "params_definition": [
                691
            ],
            "preview_input_bytes": [
                49
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "supply": [
                936
            ],
            "tags": [
                141
            ],
            "thumbnail_uri": [
                49
            ],
            "updated_at": [
                1322
            ],
            "version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_stddev_fields": {
            "balance": [
                25
            ],
            "input_bytes_size": [
                25
            ],
            "iterations_count": [
                25
            ],
            "locked_seconds": [
                25
            ],
            "original_supply": [
                25
            ],
            "royalties": [
                25
            ],
            "supply": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_stddev_order_by": {
            "balance": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "royalties": [
                1043
            ],
            "supply": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_stddev_pop_fields": {
            "balance": [
                25
            ],
            "input_bytes_size": [
                25
            ],
            "iterations_count": [
                25
            ],
            "locked_seconds": [
                25
            ],
            "original_supply": [
                25
            ],
            "royalties": [
                25
            ],
            "supply": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_stddev_pop_order_by": {
            "balance": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "royalties": [
                1043
            ],
            "supply": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_stddev_samp_fields": {
            "balance": [
                25
            ],
            "input_bytes_size": [
                25
            ],
            "iterations_count": [
                25
            ],
            "locked_seconds": [
                25
            ],
            "original_supply": [
                25
            ],
            "royalties": [
                25
            ],
            "supply": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_stddev_samp_order_by": {
            "balance": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "royalties": [
                1043
            ],
            "supply": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_stream_cursor_input": {
            "initial_value": [
                630
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_stream_cursor_value_input": {
            "author_id": [
                49
            ],
            "balance": [
                936
            ],
            "captureMediaId": [
                466
            ],
            "codexId": [
                49
            ],
            "codex_id": [
                49
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                49
            ],
            "enabled": [
                23
            ],
            "flag": [
                606
            ],
            "generative_uri": [
                49
            ],
            "id": [
                49
            ],
            "input_bytes_size": [
                27
            ],
            "iterations_count": [
                936
            ],
            "labels": [
                137
            ],
            "lock_end": [
                1322
            ],
            "lock_price_for_reserves": [
                23
            ],
            "locked_seconds": [
                27
            ],
            "metadata": [
                691
            ],
            "metadata_uri": [
                49
            ],
            "mint_opens_at": [
                1322
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "open_editions": [
                23
            ],
            "open_editions_ends_at": [
                1322
            ],
            "original_supply": [
                936
            ],
            "params_definition": [
                691
            ],
            "preview_input_bytes": [
                49
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "supply": [
                936
            ],
            "tags": [
                141
            ],
            "thumbnail_uri": [
                49
            ],
            "updated_at": [
                1322
            ],
            "version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_sum_fields": {
            "balance": [
                936
            ],
            "input_bytes_size": [
                27
            ],
            "iterations_count": [
                936
            ],
            "locked_seconds": [
                27
            ],
            "original_supply": [
                936
            ],
            "royalties": [
                27
            ],
            "supply": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_sum_order_by": {
            "balance": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "royalties": [
                1043
            ],
            "supply": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_update_column": {},
        "generative_token_updates": {
            "_inc": [
                608
            ],
            "_set": [
                622
            ],
            "where": [
                604
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_var_pop_fields": {
            "balance": [
                25
            ],
            "input_bytes_size": [
                25
            ],
            "iterations_count": [
                25
            ],
            "locked_seconds": [
                25
            ],
            "original_supply": [
                25
            ],
            "royalties": [
                25
            ],
            "supply": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_var_pop_order_by": {
            "balance": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "royalties": [
                1043
            ],
            "supply": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_var_samp_fields": {
            "balance": [
                25
            ],
            "input_bytes_size": [
                25
            ],
            "iterations_count": [
                25
            ],
            "locked_seconds": [
                25
            ],
            "original_supply": [
                25
            ],
            "royalties": [
                25
            ],
            "supply": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_var_samp_order_by": {
            "balance": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "royalties": [
                1043
            ],
            "supply": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_variance_fields": {
            "balance": [
                25
            ],
            "input_bytes_size": [
                25
            ],
            "iterations_count": [
                25
            ],
            "locked_seconds": [
                25
            ],
            "original_supply": [
                25
            ],
            "royalties": [
                25
            ],
            "supply": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_variance_order_by": {
            "balance": [
                1043
            ],
            "input_bytes_size": [
                1043
            ],
            "iterations_count": [
                1043
            ],
            "locked_seconds": [
                1043
            ],
            "original_supply": [
                1043
            ],
            "royalties": [
                1043
            ],
            "supply": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "generative_token_version": {},
        "generative_token_version_comparison_exp": {
            "_eq": [
                641
            ],
            "_gt": [
                641
            ],
            "_gte": [
                641
            ],
            "_in": [
                641
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                641
            ],
            "_lte": [
                641
            ],
            "_neq": [
                641
            ],
            "_nin": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign": {
            "assigned_at": [
                1322
            ],
            "attempts": [
                27
            ],
            "created_at": [
                1322
            ],
            "gentk_id": [
                49
            ],
            "gentk_issuer_version": [
                641
            ],
            "objkt": [
                938
            ],
            "retries": [
                27
            ],
            "state": [
                660
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_aggregate": {
            "aggregate": [
                645
            ],
            "nodes": [
                643
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_aggregate_fields": {
            "avg": [
                646
            ],
            "count": [
                27,
                {
                    "columns": [
                        658,
                        "[gentk_assign_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                651
            ],
            "min": [
                652
            ],
            "stddev": [
                662
            ],
            "stddev_pop": [
                663
            ],
            "stddev_samp": [
                664
            ],
            "sum": [
                667
            ],
            "var_pop": [
                670
            ],
            "var_samp": [
                671
            ],
            "variance": [
                672
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_avg_fields": {
            "attempts": [
                25
            ],
            "retries": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_bool_exp": {
            "_and": [
                647
            ],
            "_not": [
                647
            ],
            "_or": [
                647
            ],
            "assigned_at": [
                1323
            ],
            "attempts": [
                28
            ],
            "created_at": [
                1323
            ],
            "gentk_id": [
                50
            ],
            "gentk_issuer_version": [
                642
            ],
            "objkt": [
                959
            ],
            "retries": [
                28
            ],
            "state": [
                661
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_constraint": {},
        "gentk_assign_inc_input": {
            "attempts": [
                27
            ],
            "retries": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_insert_input": {
            "assigned_at": [
                1322
            ],
            "attempts": [
                27
            ],
            "created_at": [
                1322
            ],
            "gentk_id": [
                49
            ],
            "gentk_issuer_version": [
                641
            ],
            "objkt": [
                968
            ],
            "retries": [
                27
            ],
            "state": [
                660
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_max_fields": {
            "assigned_at": [
                1322
            ],
            "attempts": [
                27
            ],
            "created_at": [
                1322
            ],
            "gentk_id": [
                49
            ],
            "gentk_issuer_version": [
                641
            ],
            "retries": [
                27
            ],
            "state": [
                660
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_min_fields": {
            "assigned_at": [
                1322
            ],
            "attempts": [
                27
            ],
            "created_at": [
                1322
            ],
            "gentk_id": [
                49
            ],
            "gentk_issuer_version": [
                641
            ],
            "retries": [
                27
            ],
            "state": [
                660
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                643
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_obj_rel_insert_input": {
            "data": [
                650
            ],
            "on_conflict": [
                655
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_on_conflict": {
            "constraint": [
                648
            ],
            "update_columns": [
                668
            ],
            "where": [
                647
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_order_by": {
            "assigned_at": [
                1043
            ],
            "attempts": [
                1043
            ],
            "created_at": [
                1043
            ],
            "gentk_id": [
                1043
            ],
            "gentk_issuer_version": [
                1043
            ],
            "objkt": [
                970
            ],
            "retries": [
                1043
            ],
            "state": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_pk_columns_input": {
            "gentk_id": [
                49
            ],
            "gentk_issuer_version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_select_column": {},
        "gentk_assign_set_input": {
            "assigned_at": [
                1322
            ],
            "attempts": [
                27
            ],
            "created_at": [
                1322
            ],
            "gentk_id": [
                49
            ],
            "gentk_issuer_version": [
                641
            ],
            "retries": [
                27
            ],
            "state": [
                660
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_state_enum": {},
        "gentk_assign_state_enum_comparison_exp": {
            "_eq": [
                660
            ],
            "_gt": [
                660
            ],
            "_gte": [
                660
            ],
            "_in": [
                660
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                660
            ],
            "_lte": [
                660
            ],
            "_neq": [
                660
            ],
            "_nin": [
                660
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_stddev_fields": {
            "attempts": [
                25
            ],
            "retries": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_stddev_pop_fields": {
            "attempts": [
                25
            ],
            "retries": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_stddev_samp_fields": {
            "attempts": [
                25
            ],
            "retries": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_stream_cursor_input": {
            "initial_value": [
                666
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_stream_cursor_value_input": {
            "assigned_at": [
                1322
            ],
            "attempts": [
                27
            ],
            "created_at": [
                1322
            ],
            "gentk_id": [
                49
            ],
            "gentk_issuer_version": [
                641
            ],
            "retries": [
                27
            ],
            "state": [
                660
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_sum_fields": {
            "attempts": [
                27
            ],
            "retries": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_update_column": {},
        "gentk_assign_updates": {
            "_inc": [
                649
            ],
            "_set": [
                659
            ],
            "where": [
                647
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_var_pop_fields": {
            "attempts": [
                25
            ],
            "retries": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_var_samp_fields": {
            "attempts": [
                25
            ],
            "retries": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "gentk_assign_variance_fields": {
            "attempts": [
                25
            ],
            "retries": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid": {
            "cid": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_aggregate": {
            "aggregate": [
                675
            ],
            "nodes": [
                673
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        685,
                        "[ipfs_cid_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                679
            ],
            "min": [
                680
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_bool_exp": {
            "_and": [
                676
            ],
            "_not": [
                676
            ],
            "_or": [
                676
            ],
            "cid": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_constraint": {},
        "ipfs_cid_insert_input": {
            "cid": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_max_fields": {
            "cid": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_min_fields": {
            "cid": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                673
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_on_conflict": {
            "constraint": [
                677
            ],
            "update_columns": [
                689
            ],
            "where": [
                676
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_order_by": {
            "cid": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_pk_columns_input": {
            "cid": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_select_column": {},
        "ipfs_cid_set_input": {
            "cid": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_stream_cursor_input": {
            "initial_value": [
                688
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_stream_cursor_value_input": {
            "cid": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "ipfs_cid_update_column": {},
        "ipfs_cid_updates": {
            "_set": [
                686
            ],
            "where": [
                676
            ],
            "__typename": [
                49
            ]
        },
        "json": {},
        "json_comparison_exp": {
            "_eq": [
                691
            ],
            "_gt": [
                691
            ],
            "_gte": [
                691
            ],
            "_in": [
                691
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                691
            ],
            "_lte": [
                691
            ],
            "_neq": [
                691
            ],
            "_nin": [
                691
            ],
            "__typename": [
                49
            ]
        },
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                694
            ],
            "_contained_in": [
                693
            ],
            "_contains": [
                693
            ],
            "_eq": [
                693
            ],
            "_gt": [
                693
            ],
            "_gte": [
                693
            ],
            "_has_key": [
                49
            ],
            "_has_keys_all": [
                49
            ],
            "_has_keys_any": [
                49
            ],
            "_in": [
                693
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                693
            ],
            "_lte": [
                693
            ],
            "_neq": [
                693
            ],
            "_nin": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "listing": {
            "accepted_at": [
                1322
            ],
            "accepted_by_id": [
                49
            ],
            "amount": [
                936
            ],
            "article": [
                191
            ],
            "article_id": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "issuer_id": [
                49
            ],
            "marketStatByIdVersion": [
                738
            ],
            "marketStatByVersionId": [
                738
            ],
            "marketStatsHistoriesByFloorlistingversionFloorlistingid": [
                744,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "marketStatsHistoriesByFloorlistingversionFloorlistingid_aggregate": [
                745,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "marketStatsHistoriesByHighestsoldlistingversionHighestsoldlistingid": [
                744,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "marketStatsHistoriesByHighestsoldlistingversionHighestsoldlistingid_aggregate": [
                745,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "market_stat": [
                738
            ],
            "market_stats_histories": [
                744,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "market_stats_histories_aggregate": [
                745,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "objkt": [
                938
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "royalties": [
                27
            ],
            "user": [
                1367
            ],
            "userByAcceptedById": [
                1367
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "listing_aggregate": {
            "aggregate": [
                700
            ],
            "nodes": [
                696
            ],
            "__typename": [
                49
            ]
        },
        "listing_aggregate_bool_exp": {
            "count": [
                699
            ],
            "__typename": [
                49
            ]
        },
        "listing_aggregate_bool_exp_count": {
            "arguments": [
                718
            ],
            "distinct": [
                23
            ],
            "filter": [
                705
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "listing_aggregate_fields": {
            "avg": [
                703
            ],
            "count": [
                27,
                {
                    "columns": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                709
            ],
            "min": [
                711
            ],
            "stddev": [
                720
            ],
            "stddev_pop": [
                722
            ],
            "stddev_samp": [
                724
            ],
            "sum": [
                728
            ],
            "var_pop": [
                732
            ],
            "var_samp": [
                734
            ],
            "variance": [
                736
            ],
            "__typename": [
                49
            ]
        },
        "listing_aggregate_order_by": {
            "avg": [
                704
            ],
            "count": [
                1043
            ],
            "max": [
                710
            ],
            "min": [
                712
            ],
            "stddev": [
                721
            ],
            "stddev_pop": [
                723
            ],
            "stddev_samp": [
                725
            ],
            "sum": [
                729
            ],
            "var_pop": [
                733
            ],
            "var_samp": [
                735
            ],
            "variance": [
                737
            ],
            "__typename": [
                49
            ]
        },
        "listing_arr_rel_insert_input": {
            "data": [
                708
            ],
            "on_conflict": [
                715
            ],
            "__typename": [
                49
            ]
        },
        "listing_avg_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "price": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "listing_avg_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "listing_bool_exp": {
            "_and": [
                705
            ],
            "_not": [
                705
            ],
            "_or": [
                705
            ],
            "accepted_at": [
                1323
            ],
            "accepted_by_id": [
                50
            ],
            "amount": [
                937
            ],
            "article": [
                202
            ],
            "article_id": [
                28
            ],
            "cancelled_at": [
                1323
            ],
            "created_at": [
                1323
            ],
            "id": [
                50
            ],
            "issuer_id": [
                50
            ],
            "marketStatByIdVersion": [
                742
            ],
            "marketStatByVersionId": [
                742
            ],
            "marketStatsHistoriesByFloorlistingversionFloorlistingid": [
                753
            ],
            "marketStatsHistoriesByFloorlistingversionFloorlistingid_aggregate": [
                746
            ],
            "marketStatsHistoriesByHighestsoldlistingversionHighestsoldlistingid": [
                753
            ],
            "marketStatsHistoriesByHighestsoldlistingversionHighestsoldlistingid_aggregate": [
                746
            ],
            "market_stat": [
                742
            ],
            "market_stats_histories": [
                753
            ],
            "market_stats_histories_aggregate": [
                746
            ],
            "objkt": [
                959
            ],
            "objkt_id": [
                50
            ],
            "objkt_issuer_version": [
                642
            ],
            "price": [
                937
            ],
            "royalties": [
                28
            ],
            "user": [
                1375
            ],
            "userByAcceptedById": [
                1375
            ],
            "version": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "listing_constraint": {},
        "listing_inc_input": {
            "amount": [
                936
            ],
            "article_id": [
                27
            ],
            "price": [
                936
            ],
            "royalties": [
                27
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "listing_insert_input": {
            "accepted_at": [
                1322
            ],
            "accepted_by_id": [
                49
            ],
            "amount": [
                936
            ],
            "article": [
                281
            ],
            "article_id": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "issuer_id": [
                49
            ],
            "marketStatByIdVersion": [
                790
            ],
            "marketStatByVersionId": [
                790
            ],
            "marketStatsHistoriesByFloorlistingversionFloorlistingid": [
                750
            ],
            "marketStatsHistoriesByHighestsoldlistingversionHighestsoldlistingid": [
                750
            ],
            "market_stat": [
                790
            ],
            "market_stats_histories": [
                750
            ],
            "objkt": [
                968
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "royalties": [
                27
            ],
            "user": [
                1388
            ],
            "userByAcceptedById": [
                1388
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "listing_max_fields": {
            "accepted_at": [
                1322
            ],
            "accepted_by_id": [
                49
            ],
            "amount": [
                936
            ],
            "article_id": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "issuer_id": [
                49
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "royalties": [
                27
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "listing_max_order_by": {
            "accepted_at": [
                1043
            ],
            "accepted_by_id": [
                1043
            ],
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "issuer_id": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "listing_min_fields": {
            "accepted_at": [
                1322
            ],
            "accepted_by_id": [
                49
            ],
            "amount": [
                936
            ],
            "article_id": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "issuer_id": [
                49
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "royalties": [
                27
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "listing_min_order_by": {
            "accepted_at": [
                1043
            ],
            "accepted_by_id": [
                1043
            ],
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "issuer_id": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "listing_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                696
            ],
            "__typename": [
                49
            ]
        },
        "listing_obj_rel_insert_input": {
            "data": [
                708
            ],
            "on_conflict": [
                715
            ],
            "__typename": [
                49
            ]
        },
        "listing_on_conflict": {
            "constraint": [
                706
            ],
            "update_columns": [
                730
            ],
            "where": [
                705
            ],
            "__typename": [
                49
            ]
        },
        "listing_order_by": {
            "accepted_at": [
                1043
            ],
            "accepted_by_id": [
                1043
            ],
            "amount": [
                1043
            ],
            "article": [
                283
            ],
            "article_id": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "issuer_id": [
                1043
            ],
            "marketStatByIdVersion": [
                792
            ],
            "marketStatByVersionId": [
                792
            ],
            "marketStatsHistoriesByFloorlistingversionFloorlistingid_aggregate": [
                749
            ],
            "marketStatsHistoriesByHighestsoldlistingversionHighestsoldlistingid_aggregate": [
                749
            ],
            "market_stat": [
                792
            ],
            "market_stats_histories_aggregate": [
                749
            ],
            "objkt": [
                970
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "user": [
                1390
            ],
            "userByAcceptedById": [
                1390
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "listing_pk_columns_input": {
            "id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "listing_select_column": {},
        "listing_set_input": {
            "accepted_at": [
                1322
            ],
            "accepted_by_id": [
                49
            ],
            "amount": [
                936
            ],
            "article_id": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "issuer_id": [
                49
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "royalties": [
                27
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "listing_stddev_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "price": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "listing_stddev_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "listing_stddev_pop_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "price": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "listing_stddev_pop_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "listing_stddev_samp_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "price": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "listing_stddev_samp_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "listing_stream_cursor_input": {
            "initial_value": [
                727
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "listing_stream_cursor_value_input": {
            "accepted_at": [
                1322
            ],
            "accepted_by_id": [
                49
            ],
            "amount": [
                936
            ],
            "article_id": [
                27
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "issuer_id": [
                49
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "royalties": [
                27
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "listing_sum_fields": {
            "amount": [
                936
            ],
            "article_id": [
                27
            ],
            "price": [
                936
            ],
            "royalties": [
                27
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "listing_sum_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "listing_update_column": {},
        "listing_updates": {
            "_inc": [
                707
            ],
            "_set": [
                719
            ],
            "where": [
                705
            ],
            "__typename": [
                49
            ]
        },
        "listing_var_pop_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "price": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "listing_var_pop_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "listing_var_samp_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "price": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "listing_var_samp_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "listing_variance_fields": {
            "amount": [
                25
            ],
            "article_id": [
                25
            ],
            "price": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "listing_variance_order_by": {
            "amount": [
                1043
            ],
            "article_id": [
                1043
            ],
            "price": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats": {
            "average_sale_price": [
                936
            ],
            "floor": [
                936
            ],
            "floor7d": [
                936
            ],
            "floor24": [
                936
            ],
            "floor30d": [
                936
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "generative_token": [
                593
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                936
            ],
            "highest_sold": [
                936
            ],
            "highest_sold7d": [
                936
            ],
            "highest_sold24": [
                936
            ],
            "highest_sold30d": [
                936
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "listed": [
                27
            ],
            "listing": [
                696
            ],
            "listingByFloorlistingversionFloorlistingid": [
                696
            ],
            "listingByLowestsoldlistingidLowestsoldlistingversion": [
                696
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                936
            ],
            "lowest_sold7d": [
                936
            ],
            "lowest_sold24": [
                936
            ],
            "lowest_sold30d": [
                936
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                936
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                936
            ],
            "prim_volume_tz": [
                936
            ],
            "sec_volume_nb": [
                936
            ],
            "sec_volume_nb7d": [
                936
            ],
            "sec_volume_nb24": [
                936
            ],
            "sec_volume_nb30d": [
                936
            ],
            "sec_volume_tz": [
                936
            ],
            "sec_volume_tz7d": [
                936
            ],
            "sec_volume_tz24": [
                936
            ],
            "sec_volume_tz30d": [
                936
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_aggregate": {
            "aggregate": [
                740
            ],
            "nodes": [
                738
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_aggregate_fields": {
            "avg": [
                741
            ],
            "count": [
                27,
                {
                    "columns": [
                        794,
                        "[market_stats_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                787
            ],
            "min": [
                788
            ],
            "stddev": [
                796
            ],
            "stddev_pop": [
                797
            ],
            "stddev_samp": [
                798
            ],
            "sum": [
                801
            ],
            "var_pop": [
                804
            ],
            "var_samp": [
                805
            ],
            "variance": [
                806
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_avg_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floor7d": [
                25
            ],
            "floor24": [
                25
            ],
            "floor30d": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold7d": [
                25
            ],
            "highest_sold24": [
                25
            ],
            "highest_sold30d": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold7d": [
                25
            ],
            "lowest_sold24": [
                25
            ],
            "lowest_sold30d": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_bool_exp": {
            "_and": [
                742
            ],
            "_not": [
                742
            ],
            "_or": [
                742
            ],
            "average_sale_price": [
                937
            ],
            "floor": [
                937
            ],
            "floor7d": [
                937
            ],
            "floor24": [
                937
            ],
            "floor30d": [
                937
            ],
            "floorListingId": [
                50
            ],
            "floorListingVersion": [
                28
            ],
            "floor_listing_id": [
                50
            ],
            "floor_listing_version": [
                28
            ],
            "from": [
                1323
            ],
            "generative_token": [
                604
            ],
            "highestSoldListingId": [
                50
            ],
            "highestSoldListingVersion": [
                28
            ],
            "highest_collection_offer": [
                937
            ],
            "highest_sold": [
                937
            ],
            "highest_sold7d": [
                937
            ],
            "highest_sold24": [
                937
            ],
            "highest_sold30d": [
                937
            ],
            "highest_sold_listing_id": [
                50
            ],
            "highest_sold_listing_version": [
                28
            ],
            "listed": [
                28
            ],
            "listing": [
                705
            ],
            "listingByFloorlistingversionFloorlistingid": [
                705
            ],
            "listingByLowestsoldlistingidLowestsoldlistingversion": [
                705
            ],
            "longest_average_held_in_seconds": [
                465
            ],
            "lowestSoldListingId": [
                50
            ],
            "lowestSoldListingVersion": [
                28
            ],
            "lowest_sold": [
                937
            ],
            "lowest_sold7d": [
                937
            ],
            "lowest_sold24": [
                937
            ],
            "lowest_sold30d": [
                937
            ],
            "lowest_sold_listing_id": [
                50
            ],
            "lowest_sold_listing_version": [
                28
            ],
            "median": [
                937
            ],
            "percent_listed": [
                26
            ],
            "percent_never_listed": [
                26
            ],
            "prim_volume_nb": [
                937
            ],
            "prim_volume_tz": [
                937
            ],
            "sec_volume_nb": [
                937
            ],
            "sec_volume_nb7d": [
                937
            ],
            "sec_volume_nb24": [
                937
            ],
            "sec_volume_nb30d": [
                937
            ],
            "sec_volume_tz": [
                937
            ],
            "sec_volume_tz7d": [
                937
            ],
            "sec_volume_tz24": [
                937
            ],
            "sec_volume_tz30d": [
                937
            ],
            "to": [
                1323
            ],
            "token_id": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_constraint": {},
        "market_stats_history": {
            "average_sale_price": [
                464
            ],
            "floor": [
                464
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "generative_token": [
                593
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                464
            ],
            "highest_sold": [
                464
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "id": [
                27
            ],
            "listed": [
                27
            ],
            "listing": [
                696
            ],
            "listingByFloorlistingversionFloorlistingid": [
                696
            ],
            "listingByHighestsoldlistingversionHighestsoldlistingid": [
                696
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                464
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                464
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_aggregate": {
            "aggregate": [
                748
            ],
            "nodes": [
                744
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_aggregate_bool_exp": {
            "count": [
                747
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_aggregate_bool_exp_count": {
            "arguments": [
                765
            ],
            "distinct": [
                23
            ],
            "filter": [
                753
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_aggregate_fields": {
            "avg": [
                751
            ],
            "count": [
                27,
                {
                    "columns": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                757
            ],
            "min": [
                759
            ],
            "stddev": [
                767
            ],
            "stddev_pop": [
                769
            ],
            "stddev_samp": [
                771
            ],
            "sum": [
                775
            ],
            "var_pop": [
                779
            ],
            "var_samp": [
                781
            ],
            "variance": [
                783
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_aggregate_order_by": {
            "avg": [
                752
            ],
            "count": [
                1043
            ],
            "max": [
                758
            ],
            "min": [
                760
            ],
            "stddev": [
                768
            ],
            "stddev_pop": [
                770
            ],
            "stddev_samp": [
                772
            ],
            "sum": [
                776
            ],
            "var_pop": [
                780
            ],
            "var_samp": [
                782
            ],
            "variance": [
                784
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_arr_rel_insert_input": {
            "data": [
                756
            ],
            "on_conflict": [
                762
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_avg_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "id": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_avg_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_bool_exp": {
            "_and": [
                753
            ],
            "_not": [
                753
            ],
            "_or": [
                753
            ],
            "average_sale_price": [
                465
            ],
            "floor": [
                465
            ],
            "floorListingId": [
                50
            ],
            "floorListingVersion": [
                28
            ],
            "floor_listing_id": [
                50
            ],
            "floor_listing_version": [
                28
            ],
            "from": [
                1323
            ],
            "generative_token": [
                604
            ],
            "highestSoldListingId": [
                50
            ],
            "highestSoldListingVersion": [
                28
            ],
            "highest_collection_offer": [
                465
            ],
            "highest_sold": [
                465
            ],
            "highest_sold_listing_id": [
                50
            ],
            "highest_sold_listing_version": [
                28
            ],
            "id": [
                28
            ],
            "listed": [
                28
            ],
            "listing": [
                705
            ],
            "listingByFloorlistingversionFloorlistingid": [
                705
            ],
            "listingByHighestsoldlistingversionHighestsoldlistingid": [
                705
            ],
            "longest_average_held_in_seconds": [
                465
            ],
            "lowestSoldListingId": [
                50
            ],
            "lowestSoldListingVersion": [
                28
            ],
            "lowest_sold": [
                465
            ],
            "lowest_sold_listing_id": [
                50
            ],
            "lowest_sold_listing_version": [
                28
            ],
            "median": [
                465
            ],
            "percent_listed": [
                26
            ],
            "percent_never_listed": [
                26
            ],
            "prim_volume_nb": [
                465
            ],
            "prim_volume_tz": [
                465
            ],
            "sec_volume_nb": [
                465
            ],
            "sec_volume_tz": [
                465
            ],
            "to": [
                1323
            ],
            "token_id": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_constraint": {},
        "market_stats_history_inc_input": {
            "average_sale_price": [
                464
            ],
            "floor": [
                464
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_version": [
                27
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                464
            ],
            "highest_sold": [
                464
            ],
            "highest_sold_listing_version": [
                27
            ],
            "id": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                464
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                464
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_insert_input": {
            "average_sale_price": [
                464
            ],
            "floor": [
                464
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "generative_token": [
                615
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                464
            ],
            "highest_sold": [
                464
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "id": [
                27
            ],
            "listed": [
                27
            ],
            "listing": [
                714
            ],
            "listingByFloorlistingversionFloorlistingid": [
                714
            ],
            "listingByHighestsoldlistingversionHighestsoldlistingid": [
                714
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                464
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                464
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_max_fields": {
            "average_sale_price": [
                464
            ],
            "floor": [
                464
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                464
            ],
            "highest_sold": [
                464
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "id": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                464
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                464
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_max_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingId": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_id": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "from": [
                1043
            ],
            "highestSoldListingId": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_id": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingId": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_id": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "to": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_min_fields": {
            "average_sale_price": [
                464
            ],
            "floor": [
                464
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                464
            ],
            "highest_sold": [
                464
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "id": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                464
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                464
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_min_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingId": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_id": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "from": [
                1043
            ],
            "highestSoldListingId": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_id": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingId": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_id": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "to": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                744
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_on_conflict": {
            "constraint": [
                754
            ],
            "update_columns": [
                777
            ],
            "where": [
                753
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingId": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_id": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "from": [
                1043
            ],
            "generative_token": [
                617
            ],
            "highestSoldListingId": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_id": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "listing": [
                716
            ],
            "listingByFloorlistingversionFloorlistingid": [
                716
            ],
            "listingByHighestsoldlistingversionHighestsoldlistingid": [
                716
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingId": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_id": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "to": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_pk_columns_input": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_select_column": {},
        "market_stats_history_set_input": {
            "average_sale_price": [
                464
            ],
            "floor": [
                464
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                464
            ],
            "highest_sold": [
                464
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "id": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                464
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                464
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_stddev_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "id": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_stddev_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_stddev_pop_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "id": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_stddev_pop_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_stddev_samp_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "id": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_stddev_samp_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_stream_cursor_input": {
            "initial_value": [
                774
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_stream_cursor_value_input": {
            "average_sale_price": [
                464
            ],
            "floor": [
                464
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                464
            ],
            "highest_sold": [
                464
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "id": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                464
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                464
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_sum_fields": {
            "average_sale_price": [
                464
            ],
            "floor": [
                464
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_version": [
                27
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                464
            ],
            "highest_sold": [
                464
            ],
            "highest_sold_listing_version": [
                27
            ],
            "id": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                464
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                464
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_sum_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_update_column": {},
        "market_stats_history_updates": {
            "_inc": [
                755
            ],
            "_set": [
                766
            ],
            "where": [
                753
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_var_pop_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "id": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_var_pop_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_var_samp_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "id": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_var_samp_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_variance_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "id": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_history_variance_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "id": [
                1043
            ],
            "listed": [
                1043
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_inc_input": {
            "average_sale_price": [
                936
            ],
            "floor": [
                936
            ],
            "floor7d": [
                936
            ],
            "floor24": [
                936
            ],
            "floor30d": [
                936
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_version": [
                27
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                936
            ],
            "highest_sold": [
                936
            ],
            "highest_sold7d": [
                936
            ],
            "highest_sold24": [
                936
            ],
            "highest_sold30d": [
                936
            ],
            "highest_sold_listing_version": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                936
            ],
            "lowest_sold7d": [
                936
            ],
            "lowest_sold24": [
                936
            ],
            "lowest_sold30d": [
                936
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                936
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                936
            ],
            "prim_volume_tz": [
                936
            ],
            "sec_volume_nb": [
                936
            ],
            "sec_volume_nb7d": [
                936
            ],
            "sec_volume_nb24": [
                936
            ],
            "sec_volume_nb30d": [
                936
            ],
            "sec_volume_tz": [
                936
            ],
            "sec_volume_tz7d": [
                936
            ],
            "sec_volume_tz24": [
                936
            ],
            "sec_volume_tz30d": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_insert_input": {
            "average_sale_price": [
                936
            ],
            "floor": [
                936
            ],
            "floor7d": [
                936
            ],
            "floor24": [
                936
            ],
            "floor30d": [
                936
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "generative_token": [
                615
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                936
            ],
            "highest_sold": [
                936
            ],
            "highest_sold7d": [
                936
            ],
            "highest_sold24": [
                936
            ],
            "highest_sold30d": [
                936
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "listed": [
                27
            ],
            "listing": [
                714
            ],
            "listingByFloorlistingversionFloorlistingid": [
                714
            ],
            "listingByLowestsoldlistingidLowestsoldlistingversion": [
                714
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                936
            ],
            "lowest_sold7d": [
                936
            ],
            "lowest_sold24": [
                936
            ],
            "lowest_sold30d": [
                936
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                936
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                936
            ],
            "prim_volume_tz": [
                936
            ],
            "sec_volume_nb": [
                936
            ],
            "sec_volume_nb7d": [
                936
            ],
            "sec_volume_nb24": [
                936
            ],
            "sec_volume_nb30d": [
                936
            ],
            "sec_volume_tz": [
                936
            ],
            "sec_volume_tz7d": [
                936
            ],
            "sec_volume_tz24": [
                936
            ],
            "sec_volume_tz30d": [
                936
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_max_fields": {
            "average_sale_price": [
                936
            ],
            "floor": [
                936
            ],
            "floor7d": [
                936
            ],
            "floor24": [
                936
            ],
            "floor30d": [
                936
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                936
            ],
            "highest_sold": [
                936
            ],
            "highest_sold7d": [
                936
            ],
            "highest_sold24": [
                936
            ],
            "highest_sold30d": [
                936
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                936
            ],
            "lowest_sold7d": [
                936
            ],
            "lowest_sold24": [
                936
            ],
            "lowest_sold30d": [
                936
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                936
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                936
            ],
            "prim_volume_tz": [
                936
            ],
            "sec_volume_nb": [
                936
            ],
            "sec_volume_nb7d": [
                936
            ],
            "sec_volume_nb24": [
                936
            ],
            "sec_volume_nb30d": [
                936
            ],
            "sec_volume_tz": [
                936
            ],
            "sec_volume_tz7d": [
                936
            ],
            "sec_volume_tz24": [
                936
            ],
            "sec_volume_tz30d": [
                936
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_min_fields": {
            "average_sale_price": [
                936
            ],
            "floor": [
                936
            ],
            "floor7d": [
                936
            ],
            "floor24": [
                936
            ],
            "floor30d": [
                936
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                936
            ],
            "highest_sold": [
                936
            ],
            "highest_sold7d": [
                936
            ],
            "highest_sold24": [
                936
            ],
            "highest_sold30d": [
                936
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                936
            ],
            "lowest_sold7d": [
                936
            ],
            "lowest_sold24": [
                936
            ],
            "lowest_sold30d": [
                936
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                936
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                936
            ],
            "prim_volume_tz": [
                936
            ],
            "sec_volume_nb": [
                936
            ],
            "sec_volume_nb7d": [
                936
            ],
            "sec_volume_nb24": [
                936
            ],
            "sec_volume_nb30d": [
                936
            ],
            "sec_volume_tz": [
                936
            ],
            "sec_volume_tz7d": [
                936
            ],
            "sec_volume_tz24": [
                936
            ],
            "sec_volume_tz30d": [
                936
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                738
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_obj_rel_insert_input": {
            "data": [
                786
            ],
            "on_conflict": [
                791
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_on_conflict": {
            "constraint": [
                743
            ],
            "update_columns": [
                802
            ],
            "where": [
                742
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_order_by": {
            "average_sale_price": [
                1043
            ],
            "floor": [
                1043
            ],
            "floor7d": [
                1043
            ],
            "floor24": [
                1043
            ],
            "floor30d": [
                1043
            ],
            "floorListingId": [
                1043
            ],
            "floorListingVersion": [
                1043
            ],
            "floor_listing_id": [
                1043
            ],
            "floor_listing_version": [
                1043
            ],
            "from": [
                1043
            ],
            "generative_token": [
                617
            ],
            "highestSoldListingId": [
                1043
            ],
            "highestSoldListingVersion": [
                1043
            ],
            "highest_collection_offer": [
                1043
            ],
            "highest_sold": [
                1043
            ],
            "highest_sold7d": [
                1043
            ],
            "highest_sold24": [
                1043
            ],
            "highest_sold30d": [
                1043
            ],
            "highest_sold_listing_id": [
                1043
            ],
            "highest_sold_listing_version": [
                1043
            ],
            "listed": [
                1043
            ],
            "listing": [
                716
            ],
            "listingByFloorlistingversionFloorlistingid": [
                716
            ],
            "listingByLowestsoldlistingidLowestsoldlistingversion": [
                716
            ],
            "longest_average_held_in_seconds": [
                1043
            ],
            "lowestSoldListingId": [
                1043
            ],
            "lowestSoldListingVersion": [
                1043
            ],
            "lowest_sold": [
                1043
            ],
            "lowest_sold7d": [
                1043
            ],
            "lowest_sold24": [
                1043
            ],
            "lowest_sold30d": [
                1043
            ],
            "lowest_sold_listing_id": [
                1043
            ],
            "lowest_sold_listing_version": [
                1043
            ],
            "median": [
                1043
            ],
            "percent_listed": [
                1043
            ],
            "percent_never_listed": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_nb7d": [
                1043
            ],
            "sec_volume_nb24": [
                1043
            ],
            "sec_volume_nb30d": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "sec_volume_tz7d": [
                1043
            ],
            "sec_volume_tz24": [
                1043
            ],
            "sec_volume_tz30d": [
                1043
            ],
            "to": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_pk_columns_input": {
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_select_column": {},
        "market_stats_set_input": {
            "average_sale_price": [
                936
            ],
            "floor": [
                936
            ],
            "floor7d": [
                936
            ],
            "floor24": [
                936
            ],
            "floor30d": [
                936
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                936
            ],
            "highest_sold": [
                936
            ],
            "highest_sold7d": [
                936
            ],
            "highest_sold24": [
                936
            ],
            "highest_sold30d": [
                936
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                936
            ],
            "lowest_sold7d": [
                936
            ],
            "lowest_sold24": [
                936
            ],
            "lowest_sold30d": [
                936
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                936
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                936
            ],
            "prim_volume_tz": [
                936
            ],
            "sec_volume_nb": [
                936
            ],
            "sec_volume_nb7d": [
                936
            ],
            "sec_volume_nb24": [
                936
            ],
            "sec_volume_nb30d": [
                936
            ],
            "sec_volume_tz": [
                936
            ],
            "sec_volume_tz7d": [
                936
            ],
            "sec_volume_tz24": [
                936
            ],
            "sec_volume_tz30d": [
                936
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_stddev_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floor7d": [
                25
            ],
            "floor24": [
                25
            ],
            "floor30d": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold7d": [
                25
            ],
            "highest_sold24": [
                25
            ],
            "highest_sold30d": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold7d": [
                25
            ],
            "lowest_sold24": [
                25
            ],
            "lowest_sold30d": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_stddev_pop_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floor7d": [
                25
            ],
            "floor24": [
                25
            ],
            "floor30d": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold7d": [
                25
            ],
            "highest_sold24": [
                25
            ],
            "highest_sold30d": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold7d": [
                25
            ],
            "lowest_sold24": [
                25
            ],
            "lowest_sold30d": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_stddev_samp_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floor7d": [
                25
            ],
            "floor24": [
                25
            ],
            "floor30d": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold7d": [
                25
            ],
            "highest_sold24": [
                25
            ],
            "highest_sold30d": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold7d": [
                25
            ],
            "lowest_sold24": [
                25
            ],
            "lowest_sold30d": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_stream_cursor_input": {
            "initial_value": [
                800
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_stream_cursor_value_input": {
            "average_sale_price": [
                936
            ],
            "floor": [
                936
            ],
            "floor7d": [
                936
            ],
            "floor24": [
                936
            ],
            "floor30d": [
                936
            ],
            "floorListingId": [
                49
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_id": [
                49
            ],
            "floor_listing_version": [
                27
            ],
            "from": [
                1322
            ],
            "highestSoldListingId": [
                49
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                936
            ],
            "highest_sold": [
                936
            ],
            "highest_sold7d": [
                936
            ],
            "highest_sold24": [
                936
            ],
            "highest_sold30d": [
                936
            ],
            "highest_sold_listing_id": [
                49
            ],
            "highest_sold_listing_version": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingId": [
                49
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                936
            ],
            "lowest_sold7d": [
                936
            ],
            "lowest_sold24": [
                936
            ],
            "lowest_sold30d": [
                936
            ],
            "lowest_sold_listing_id": [
                49
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                936
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                936
            ],
            "prim_volume_tz": [
                936
            ],
            "sec_volume_nb": [
                936
            ],
            "sec_volume_nb7d": [
                936
            ],
            "sec_volume_nb24": [
                936
            ],
            "sec_volume_nb30d": [
                936
            ],
            "sec_volume_tz": [
                936
            ],
            "sec_volume_tz7d": [
                936
            ],
            "sec_volume_tz24": [
                936
            ],
            "sec_volume_tz30d": [
                936
            ],
            "to": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_sum_fields": {
            "average_sale_price": [
                936
            ],
            "floor": [
                936
            ],
            "floor7d": [
                936
            ],
            "floor24": [
                936
            ],
            "floor30d": [
                936
            ],
            "floorListingVersion": [
                27
            ],
            "floor_listing_version": [
                27
            ],
            "highestSoldListingVersion": [
                27
            ],
            "highest_collection_offer": [
                936
            ],
            "highest_sold": [
                936
            ],
            "highest_sold7d": [
                936
            ],
            "highest_sold24": [
                936
            ],
            "highest_sold30d": [
                936
            ],
            "highest_sold_listing_version": [
                27
            ],
            "listed": [
                27
            ],
            "longest_average_held_in_seconds": [
                464
            ],
            "lowestSoldListingVersion": [
                27
            ],
            "lowest_sold": [
                936
            ],
            "lowest_sold7d": [
                936
            ],
            "lowest_sold24": [
                936
            ],
            "lowest_sold30d": [
                936
            ],
            "lowest_sold_listing_version": [
                27
            ],
            "median": [
                936
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                936
            ],
            "prim_volume_tz": [
                936
            ],
            "sec_volume_nb": [
                936
            ],
            "sec_volume_nb7d": [
                936
            ],
            "sec_volume_nb24": [
                936
            ],
            "sec_volume_nb30d": [
                936
            ],
            "sec_volume_tz": [
                936
            ],
            "sec_volume_tz7d": [
                936
            ],
            "sec_volume_tz24": [
                936
            ],
            "sec_volume_tz30d": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_update_column": {},
        "market_stats_updates": {
            "_inc": [
                785
            ],
            "_set": [
                795
            ],
            "where": [
                742
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_var_pop_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floor7d": [
                25
            ],
            "floor24": [
                25
            ],
            "floor30d": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold7d": [
                25
            ],
            "highest_sold24": [
                25
            ],
            "highest_sold30d": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold7d": [
                25
            ],
            "lowest_sold24": [
                25
            ],
            "lowest_sold30d": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_var_samp_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floor7d": [
                25
            ],
            "floor24": [
                25
            ],
            "floor30d": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold7d": [
                25
            ],
            "highest_sold24": [
                25
            ],
            "highest_sold30d": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold7d": [
                25
            ],
            "lowest_sold24": [
                25
            ],
            "lowest_sold30d": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "market_stats_variance_fields": {
            "average_sale_price": [
                25
            ],
            "floor": [
                25
            ],
            "floor7d": [
                25
            ],
            "floor24": [
                25
            ],
            "floor30d": [
                25
            ],
            "floorListingVersion": [
                25
            ],
            "floor_listing_version": [
                25
            ],
            "highestSoldListingVersion": [
                25
            ],
            "highest_collection_offer": [
                25
            ],
            "highest_sold": [
                25
            ],
            "highest_sold7d": [
                25
            ],
            "highest_sold24": [
                25
            ],
            "highest_sold30d": [
                25
            ],
            "highest_sold_listing_version": [
                25
            ],
            "listed": [
                25
            ],
            "longest_average_held_in_seconds": [
                25
            ],
            "lowestSoldListingVersion": [
                25
            ],
            "lowest_sold": [
                25
            ],
            "lowest_sold7d": [
                25
            ],
            "lowest_sold24": [
                25
            ],
            "lowest_sold30d": [
                25
            ],
            "lowest_sold_listing_version": [
                25
            ],
            "median": [
                25
            ],
            "percent_listed": [
                25
            ],
            "percent_never_listed": [
                25
            ],
            "prim_volume_nb": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "media_image": {
            "articles": [
                191,
                {
                    "distinct_on": [
                        326,
                        "[article_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        283,
                        "[article_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "articles_aggregate": [
                192,
                {
                    "distinct_on": [
                        326,
                        "[article_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        283,
                        "[article_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "cid": [
                466
            ],
            "generative_tokens": [
                593,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "generative_tokens_aggregate": [
                594,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "height": [
                27
            ],
            "metadata": [
                691,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "mime_type": [
                49
            ],
            "mint_ticket_settings": [
                858,
                {
                    "distinct_on": [
                        879,
                        "[mint_ticket_settings_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        877,
                        "[mint_ticket_settings_order_by!]"
                    ],
                    "where": [
                        867
                    ]
                }
            ],
            "mint_ticket_settings_aggregate": [
                859,
                {
                    "distinct_on": [
                        879,
                        "[mint_ticket_settings_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        877,
                        "[mint_ticket_settings_order_by!]"
                    ],
                    "where": [
                        867
                    ]
                }
            ],
            "objkts": [
                938,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "objkts_aggregate": [
                939,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "placeholder": [
                49
            ],
            "process_counters": [
                1279
            ],
            "processed": [
                23
            ],
            "users": [
                1367,
                {
                    "distinct_on": [
                        1393,
                        "[user_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1390,
                        "[user_order_by!]"
                    ],
                    "where": [
                        1375
                    ]
                }
            ],
            "users_aggregate": [
                1368,
                {
                    "distinct_on": [
                        1393,
                        "[user_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1390,
                        "[user_order_by!]"
                    ],
                    "where": [
                        1375
                    ]
                }
            ],
            "width": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "media_image_aggregate": {
            "aggregate": [
                809
            ],
            "nodes": [
                807
            ],
            "__typename": [
                49
            ]
        },
        "media_image_aggregate_fields": {
            "avg": [
                810
            ],
            "count": [
                27,
                {
                    "columns": [
                        822,
                        "[media_image_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                815
            ],
            "min": [
                816
            ],
            "stddev": [
                824
            ],
            "stddev_pop": [
                825
            ],
            "stddev_samp": [
                826
            ],
            "sum": [
                829
            ],
            "var_pop": [
                832
            ],
            "var_samp": [
                833
            ],
            "variance": [
                834
            ],
            "__typename": [
                49
            ]
        },
        "media_image_avg_fields": {
            "height": [
                25
            ],
            "process_counters": [
                25
            ],
            "width": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "media_image_bool_exp": {
            "_and": [
                811
            ],
            "_not": [
                811
            ],
            "_or": [
                811
            ],
            "articles": [
                202
            ],
            "articles_aggregate": [
                193
            ],
            "cid": [
                467
            ],
            "generative_tokens": [
                604
            ],
            "generative_tokens_aggregate": [
                595
            ],
            "height": [
                28
            ],
            "metadata": [
                692
            ],
            "mime_type": [
                50
            ],
            "mint_ticket_settings": [
                867
            ],
            "mint_ticket_settings_aggregate": [
                860
            ],
            "objkts": [
                959
            ],
            "objkts_aggregate": [
                940
            ],
            "placeholder": [
                50
            ],
            "process_counters": [
                1280
            ],
            "processed": [
                24
            ],
            "users": [
                1375
            ],
            "users_aggregate": [
                1369
            ],
            "width": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "media_image_constraint": {},
        "media_image_inc_input": {
            "height": [
                27
            ],
            "process_counters": [
                1279
            ],
            "width": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "media_image_insert_input": {
            "articles": [
                199
            ],
            "cid": [
                466
            ],
            "generative_tokens": [
                601
            ],
            "height": [
                27
            ],
            "metadata": [
                691
            ],
            "mime_type": [
                49
            ],
            "mint_ticket_settings": [
                864
            ],
            "objkts": [
                956
            ],
            "placeholder": [
                49
            ],
            "process_counters": [
                1279
            ],
            "processed": [
                23
            ],
            "users": [
                1374
            ],
            "width": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "media_image_max_fields": {
            "cid": [
                466
            ],
            "height": [
                27
            ],
            "mime_type": [
                49
            ],
            "placeholder": [
                49
            ],
            "process_counters": [
                1279
            ],
            "width": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "media_image_min_fields": {
            "cid": [
                466
            ],
            "height": [
                27
            ],
            "mime_type": [
                49
            ],
            "placeholder": [
                49
            ],
            "process_counters": [
                1279
            ],
            "width": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "media_image_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                807
            ],
            "__typename": [
                49
            ]
        },
        "media_image_obj_rel_insert_input": {
            "data": [
                814
            ],
            "on_conflict": [
                819
            ],
            "__typename": [
                49
            ]
        },
        "media_image_on_conflict": {
            "constraint": [
                812
            ],
            "update_columns": [
                830
            ],
            "where": [
                811
            ],
            "__typename": [
                49
            ]
        },
        "media_image_order_by": {
            "articles_aggregate": [
                198
            ],
            "cid": [
                1043
            ],
            "generative_tokens_aggregate": [
                600
            ],
            "height": [
                1043
            ],
            "metadata": [
                1043
            ],
            "mime_type": [
                1043
            ],
            "mint_ticket_settings_aggregate": [
                863
            ],
            "objkts_aggregate": [
                955
            ],
            "placeholder": [
                1043
            ],
            "process_counters": [
                1043
            ],
            "processed": [
                1043
            ],
            "users_aggregate": [
                1372
            ],
            "width": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "media_image_pk_columns_input": {
            "cid": [
                466
            ],
            "__typename": [
                49
            ]
        },
        "media_image_select_column": {},
        "media_image_set_input": {
            "cid": [
                466
            ],
            "height": [
                27
            ],
            "metadata": [
                691
            ],
            "mime_type": [
                49
            ],
            "placeholder": [
                49
            ],
            "process_counters": [
                1279
            ],
            "processed": [
                23
            ],
            "width": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "media_image_stddev_fields": {
            "height": [
                25
            ],
            "process_counters": [
                25
            ],
            "width": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "media_image_stddev_pop_fields": {
            "height": [
                25
            ],
            "process_counters": [
                25
            ],
            "width": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "media_image_stddev_samp_fields": {
            "height": [
                25
            ],
            "process_counters": [
                25
            ],
            "width": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "media_image_stream_cursor_input": {
            "initial_value": [
                828
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "media_image_stream_cursor_value_input": {
            "cid": [
                466
            ],
            "height": [
                27
            ],
            "metadata": [
                691
            ],
            "mime_type": [
                49
            ],
            "placeholder": [
                49
            ],
            "process_counters": [
                1279
            ],
            "processed": [
                23
            ],
            "width": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "media_image_sum_fields": {
            "height": [
                27
            ],
            "process_counters": [
                1279
            ],
            "width": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "media_image_update_column": {},
        "media_image_updates": {
            "_inc": [
                813
            ],
            "_set": [
                823
            ],
            "where": [
                811
            ],
            "__typename": [
                49
            ]
        },
        "media_image_var_pop_fields": {
            "height": [
                25
            ],
            "process_counters": [
                25
            ],
            "width": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "media_image_var_samp_fields": {
            "height": [
                25
            ],
            "process_counters": [
                25
            ],
            "width": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "media_image_variance_fields": {
            "height": [
                25
            ],
            "process_counters": [
                25
            ],
            "width": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket": {
            "created_at": [
                1322
            ],
            "generative_token": [
                593
            ],
            "id": [
                49
            ],
            "owner_id": [
                49
            ],
            "price": [
                936
            ],
            "taxation_locked": [
                936
            ],
            "taxation_paid_until": [
                1322
            ],
            "taxation_start": [
                1322
            ],
            "token_id": [
                49
            ],
            "user": [
                1367
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_aggregate": {
            "aggregate": [
                839
            ],
            "nodes": [
                835
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_aggregate_bool_exp": {
            "count": [
                838
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_aggregate_bool_exp_count": {
            "arguments": [
                856
            ],
            "distinct": [
                23
            ],
            "filter": [
                844
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_aggregate_fields": {
            "avg": [
                842
            ],
            "count": [
                27,
                {
                    "columns": [
                        856,
                        "[mint_ticket_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                848
            ],
            "min": [
                850
            ],
            "stddev": [
                899
            ],
            "stddev_pop": [
                901
            ],
            "stddev_samp": [
                903
            ],
            "sum": [
                907
            ],
            "var_pop": [
                911
            ],
            "var_samp": [
                913
            ],
            "variance": [
                915
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_aggregate_order_by": {
            "avg": [
                843
            ],
            "count": [
                1043
            ],
            "max": [
                849
            ],
            "min": [
                851
            ],
            "stddev": [
                900
            ],
            "stddev_pop": [
                902
            ],
            "stddev_samp": [
                904
            ],
            "sum": [
                908
            ],
            "var_pop": [
                912
            ],
            "var_samp": [
                914
            ],
            "variance": [
                916
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_arr_rel_insert_input": {
            "data": [
                847
            ],
            "on_conflict": [
                853
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_avg_fields": {
            "price": [
                25
            ],
            "taxation_locked": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_avg_order_by": {
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_bool_exp": {
            "_and": [
                844
            ],
            "_not": [
                844
            ],
            "_or": [
                844
            ],
            "created_at": [
                1323
            ],
            "generative_token": [
                604
            ],
            "id": [
                50
            ],
            "owner_id": [
                50
            ],
            "price": [
                937
            ],
            "taxation_locked": [
                937
            ],
            "taxation_paid_until": [
                1323
            ],
            "taxation_start": [
                1323
            ],
            "token_id": [
                50
            ],
            "user": [
                1375
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_constraint": {},
        "mint_ticket_inc_input": {
            "price": [
                936
            ],
            "taxation_locked": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_insert_input": {
            "created_at": [
                1322
            ],
            "generative_token": [
                615
            ],
            "id": [
                49
            ],
            "owner_id": [
                49
            ],
            "price": [
                936
            ],
            "taxation_locked": [
                936
            ],
            "taxation_paid_until": [
                1322
            ],
            "taxation_start": [
                1322
            ],
            "token_id": [
                49
            ],
            "user": [
                1388
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_max_fields": {
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "owner_id": [
                49
            ],
            "price": [
                936
            ],
            "taxation_locked": [
                936
            ],
            "taxation_paid_until": [
                1322
            ],
            "taxation_start": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_max_order_by": {
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "owner_id": [
                1043
            ],
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "taxation_paid_until": [
                1043
            ],
            "taxation_start": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_min_fields": {
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "owner_id": [
                49
            ],
            "price": [
                936
            ],
            "taxation_locked": [
                936
            ],
            "taxation_paid_until": [
                1322
            ],
            "taxation_start": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_min_order_by": {
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "owner_id": [
                1043
            ],
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "taxation_paid_until": [
                1043
            ],
            "taxation_start": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                835
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_on_conflict": {
            "constraint": [
                845
            ],
            "update_columns": [
                909
            ],
            "where": [
                844
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_order_by": {
            "created_at": [
                1043
            ],
            "generative_token": [
                617
            ],
            "id": [
                1043
            ],
            "owner_id": [
                1043
            ],
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "taxation_paid_until": [
                1043
            ],
            "taxation_start": [
                1043
            ],
            "token_id": [
                1043
            ],
            "user": [
                1390
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_pk_columns_input": {
            "id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_select_column": {},
        "mint_ticket_set_input": {
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "owner_id": [
                49
            ],
            "price": [
                936
            ],
            "taxation_locked": [
                936
            ],
            "taxation_paid_until": [
                1322
            ],
            "taxation_start": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings": {
            "captureMediaId": [
                466
            ],
            "generative_token": [
                593
            ],
            "gracing_period": [
                27
            ],
            "id": [
                49
            ],
            "media_image": [
                807
            ],
            "metadata": [
                691,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "metadata_uri": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_aggregate": {
            "aggregate": [
                862
            ],
            "nodes": [
                858
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_aggregate_bool_exp": {
            "count": [
                861
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_aggregate_bool_exp_count": {
            "arguments": [
                879
            ],
            "distinct": [
                23
            ],
            "filter": [
                867
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_aggregate_fields": {
            "avg": [
                865
            ],
            "count": [
                27,
                {
                    "columns": [
                        879,
                        "[mint_ticket_settings_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                871
            ],
            "min": [
                873
            ],
            "stddev": [
                881
            ],
            "stddev_pop": [
                883
            ],
            "stddev_samp": [
                885
            ],
            "sum": [
                889
            ],
            "var_pop": [
                893
            ],
            "var_samp": [
                895
            ],
            "variance": [
                897
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_aggregate_order_by": {
            "avg": [
                866
            ],
            "count": [
                1043
            ],
            "max": [
                872
            ],
            "min": [
                874
            ],
            "stddev": [
                882
            ],
            "stddev_pop": [
                884
            ],
            "stddev_samp": [
                886
            ],
            "sum": [
                890
            ],
            "var_pop": [
                894
            ],
            "var_samp": [
                896
            ],
            "variance": [
                898
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_arr_rel_insert_input": {
            "data": [
                870
            ],
            "on_conflict": [
                876
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_avg_fields": {
            "gracing_period": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_avg_order_by": {
            "gracing_period": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_bool_exp": {
            "_and": [
                867
            ],
            "_not": [
                867
            ],
            "_or": [
                867
            ],
            "captureMediaId": [
                467
            ],
            "generative_token": [
                604
            ],
            "gracing_period": [
                28
            ],
            "id": [
                50
            ],
            "media_image": [
                811
            ],
            "metadata": [
                692
            ],
            "metadata_uri": [
                50
            ],
            "token_id": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_constraint": {},
        "mint_ticket_settings_inc_input": {
            "gracing_period": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_insert_input": {
            "captureMediaId": [
                466
            ],
            "generative_token": [
                615
            ],
            "gracing_period": [
                27
            ],
            "id": [
                49
            ],
            "media_image": [
                818
            ],
            "metadata": [
                691
            ],
            "metadata_uri": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_max_fields": {
            "captureMediaId": [
                466
            ],
            "gracing_period": [
                27
            ],
            "id": [
                49
            ],
            "metadata_uri": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_max_order_by": {
            "captureMediaId": [
                1043
            ],
            "gracing_period": [
                1043
            ],
            "id": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_min_fields": {
            "captureMediaId": [
                466
            ],
            "gracing_period": [
                27
            ],
            "id": [
                49
            ],
            "metadata_uri": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_min_order_by": {
            "captureMediaId": [
                1043
            ],
            "gracing_period": [
                1043
            ],
            "id": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                858
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_on_conflict": {
            "constraint": [
                868
            ],
            "update_columns": [
                891
            ],
            "where": [
                867
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_order_by": {
            "captureMediaId": [
                1043
            ],
            "generative_token": [
                617
            ],
            "gracing_period": [
                1043
            ],
            "id": [
                1043
            ],
            "media_image": [
                820
            ],
            "metadata": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_pk_columns_input": {
            "id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_select_column": {},
        "mint_ticket_settings_set_input": {
            "captureMediaId": [
                466
            ],
            "gracing_period": [
                27
            ],
            "id": [
                49
            ],
            "metadata": [
                691
            ],
            "metadata_uri": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_stddev_fields": {
            "gracing_period": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_stddev_order_by": {
            "gracing_period": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_stddev_pop_fields": {
            "gracing_period": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_stddev_pop_order_by": {
            "gracing_period": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_stddev_samp_fields": {
            "gracing_period": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_stddev_samp_order_by": {
            "gracing_period": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_stream_cursor_input": {
            "initial_value": [
                888
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_stream_cursor_value_input": {
            "captureMediaId": [
                466
            ],
            "gracing_period": [
                27
            ],
            "id": [
                49
            ],
            "metadata": [
                691
            ],
            "metadata_uri": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_sum_fields": {
            "gracing_period": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_sum_order_by": {
            "gracing_period": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_update_column": {},
        "mint_ticket_settings_updates": {
            "_inc": [
                869
            ],
            "_set": [
                880
            ],
            "where": [
                867
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_var_pop_fields": {
            "gracing_period": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_var_pop_order_by": {
            "gracing_period": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_var_samp_fields": {
            "gracing_period": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_var_samp_order_by": {
            "gracing_period": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_variance_fields": {
            "gracing_period": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_settings_variance_order_by": {
            "gracing_period": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_stddev_fields": {
            "price": [
                25
            ],
            "taxation_locked": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_stddev_order_by": {
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_stddev_pop_fields": {
            "price": [
                25
            ],
            "taxation_locked": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_stddev_pop_order_by": {
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_stddev_samp_fields": {
            "price": [
                25
            ],
            "taxation_locked": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_stddev_samp_order_by": {
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_stream_cursor_input": {
            "initial_value": [
                906
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_stream_cursor_value_input": {
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "owner_id": [
                49
            ],
            "price": [
                936
            ],
            "taxation_locked": [
                936
            ],
            "taxation_paid_until": [
                1322
            ],
            "taxation_start": [
                1322
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_sum_fields": {
            "price": [
                936
            ],
            "taxation_locked": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_sum_order_by": {
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_update_column": {},
        "mint_ticket_updates": {
            "_inc": [
                846
            ],
            "_set": [
                857
            ],
            "where": [
                844
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_var_pop_fields": {
            "price": [
                25
            ],
            "taxation_locked": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_var_pop_order_by": {
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_var_samp_fields": {
            "price": [
                25
            ],
            "taxation_locked": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_var_samp_order_by": {
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_variance_fields": {
            "price": [
                25
            ],
            "taxation_locked": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "mint_ticket_variance_order_by": {
            "price": [
                1043
            ],
            "taxation_locked": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason": {
            "articles": [
                191,
                {
                    "distinct_on": [
                        326,
                        "[article_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        283,
                        "[article_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "articles_aggregate": [
                192,
                {
                    "distinct_on": [
                        326,
                        "[article_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        283,
                        "[article_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "generative_tokens": [
                593,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "generative_tokens_aggregate": [
                594,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "id": [
                49
            ],
            "reason": [
                49
            ],
            "reports": [
                1209,
                {
                    "distinct_on": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1225,
                        "[report_order_by!]"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "reports_aggregate": [
                1210,
                {
                    "distinct_on": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1225,
                        "[report_order_by!]"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "users": [
                1367,
                {
                    "distinct_on": [
                        1393,
                        "[user_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1390,
                        "[user_order_by!]"
                    ],
                    "where": [
                        1375
                    ]
                }
            ],
            "users_aggregate": [
                1368,
                {
                    "distinct_on": [
                        1393,
                        "[user_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1390,
                        "[user_order_by!]"
                    ],
                    "where": [
                        1375
                    ]
                }
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_aggregate": {
            "aggregate": [
                919
            ],
            "nodes": [
                917
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        930,
                        "[moderation_reason_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                923
            ],
            "min": [
                924
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_bool_exp": {
            "_and": [
                920
            ],
            "_not": [
                920
            ],
            "_or": [
                920
            ],
            "articles": [
                202
            ],
            "articles_aggregate": [
                193
            ],
            "generative_tokens": [
                604
            ],
            "generative_tokens_aggregate": [
                595
            ],
            "id": [
                50
            ],
            "reason": [
                50
            ],
            "reports": [
                1216
            ],
            "reports_aggregate": [
                1211
            ],
            "users": [
                1375
            ],
            "users_aggregate": [
                1369
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_constraint": {},
        "moderation_reason_insert_input": {
            "articles": [
                199
            ],
            "generative_tokens": [
                601
            ],
            "id": [
                49
            ],
            "reason": [
                49
            ],
            "reports": [
                1215
            ],
            "users": [
                1374
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_max_fields": {
            "id": [
                49
            ],
            "reason": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_min_fields": {
            "id": [
                49
            ],
            "reason": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                917
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_obj_rel_insert_input": {
            "data": [
                922
            ],
            "on_conflict": [
                927
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_on_conflict": {
            "constraint": [
                921
            ],
            "update_columns": [
                934
            ],
            "where": [
                920
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_order_by": {
            "articles_aggregate": [
                198
            ],
            "generative_tokens_aggregate": [
                600
            ],
            "id": [
                1043
            ],
            "reason": [
                1043
            ],
            "reports_aggregate": [
                1214
            ],
            "users_aggregate": [
                1372
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_pk_columns_input": {
            "id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_select_column": {},
        "moderation_reason_set_input": {
            "id": [
                49
            ],
            "reason": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_stream_cursor_input": {
            "initial_value": [
                933
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_stream_cursor_value_input": {
            "id": [
                49
            ],
            "reason": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "moderation_reason_update_column": {},
        "moderation_reason_updates": {
            "_set": [
                931
            ],
            "where": [
                920
            ],
            "__typename": [
                49
            ]
        },
        "numeric": {},
        "numeric_comparison_exp": {
            "_eq": [
                936
            ],
            "_gt": [
                936
            ],
            "_gte": [
                936
            ],
            "_in": [
                936
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                936
            ],
            "_lte": [
                936
            ],
            "_neq": [
                936
            ],
            "_nin": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "objkt": {
            "actions": [
                143,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "actions_aggregate": [
                144,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "assigned": [
                23
            ],
            "assigned_at": [
                1322
            ],
            "auctions": [
                348,
                {
                    "distinct_on": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        442,
                        "[auction_order_by!]"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "auctions_aggregate": [
                349,
                {
                    "distinct_on": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        442,
                        "[auction_order_by!]"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "captureMediaId": [
                466
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                466
            ],
            "duplicate": [
                23
            ],
            "features": [
                691,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "generation_hash": [
                49
            ],
            "generative_token": [
                593
            ],
            "gentk_assign": [
                643
            ],
            "id": [
                49
            ],
            "input_bytes": [
                49
            ],
            "issuer_id": [
                49
            ],
            "issuer_version": [
                641
            ],
            "iteration": [
                936
            ],
            "listings": [
                696,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "listings_aggregate": [
                697,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "media_image": [
                807
            ],
            "metadata": [
                691,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "metadata_uri": [
                49
            ],
            "minter_id": [
                49
            ],
            "name": [
                49
            ],
            "offers": [
                1002,
                {
                    "distinct_on": [
                        1023,
                        "[offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1021,
                        "[offer_order_by!]"
                    ],
                    "where": [
                        1011
                    ]
                }
            ],
            "offers_aggregate": [
                1003,
                {
                    "distinct_on": [
                        1023,
                        "[offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1021,
                        "[offer_order_by!]"
                    ],
                    "where": [
                        1011
                    ]
                }
            ],
            "owner_id": [
                49
            ],
            "rarity": [
                591
            ],
            "redemptions": [
                1168,
                {
                    "distinct_on": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1187,
                        "[redemption_order_by!]"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "redemptions_aggregate": [
                1169,
                {
                    "distinct_on": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1187,
                        "[redemption_order_by!]"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "splits": [
                1281,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "splits_aggregate": [
                1282,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "tags": [
                141
            ],
            "thumbnail_uri": [
                466
            ],
            "transactions": [
                1324,
                {
                    "distinct_on": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1343,
                        "[transaction_order_by!]"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "transactions_aggregate": [
                1325,
                {
                    "distinct_on": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1343,
                        "[transaction_order_by!]"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "updated_at": [
                1322
            ],
            "user": [
                1367
            ],
            "userByOwnerId": [
                1367
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate": {
            "aggregate": [
                954
            ],
            "nodes": [
                938
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp": {
            "avg": [
                941
            ],
            "bool_and": [
                942
            ],
            "bool_or": [
                943
            ],
            "corr": [
                944
            ],
            "count": [
                946
            ],
            "covar_samp": [
                947
            ],
            "max": [
                949
            ],
            "min": [
                950
            ],
            "stddev_samp": [
                951
            ],
            "sum": [
                952
            ],
            "var_samp": [
                953
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_avg": {
            "arguments": [
                973
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                592
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_bool_and": {
            "arguments": [
                974
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                24
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_bool_or": {
            "arguments": [
                975
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                24
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_corr": {
            "arguments": [
                945
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                592
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_corr_arguments": {
            "X": [
                976
            ],
            "Y": [
                976
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_count": {
            "arguments": [
                972
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_covar_samp": {
            "arguments": [
                948
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                592
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_covar_samp_arguments": {
            "X": [
                977
            ],
            "Y": [
                977
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_max": {
            "arguments": [
                978
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                592
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_min": {
            "arguments": [
                979
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                592
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_stddev_samp": {
            "arguments": [
                980
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                592
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_sum": {
            "arguments": [
                981
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                592
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_bool_exp_var_samp": {
            "arguments": [
                982
            ],
            "distinct": [
                23
            ],
            "filter": [
                959
            ],
            "predicate": [
                592
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_fields": {
            "avg": [
                957
            ],
            "count": [
                27,
                {
                    "columns": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                963
            ],
            "min": [
                965
            ],
            "stddev": [
                984
            ],
            "stddev_pop": [
                986
            ],
            "stddev_samp": [
                988
            ],
            "sum": [
                992
            ],
            "var_pop": [
                996
            ],
            "var_samp": [
                998
            ],
            "variance": [
                1000
            ],
            "__typename": [
                49
            ]
        },
        "objkt_aggregate_order_by": {
            "avg": [
                958
            ],
            "count": [
                1043
            ],
            "max": [
                964
            ],
            "min": [
                966
            ],
            "stddev": [
                985
            ],
            "stddev_pop": [
                987
            ],
            "stddev_samp": [
                989
            ],
            "sum": [
                993
            ],
            "var_pop": [
                997
            ],
            "var_samp": [
                999
            ],
            "variance": [
                1001
            ],
            "__typename": [
                49
            ]
        },
        "objkt_arr_rel_insert_input": {
            "data": [
                962
            ],
            "on_conflict": [
                969
            ],
            "__typename": [
                49
            ]
        },
        "objkt_avg_fields": {
            "iteration": [
                25
            ],
            "rarity": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "objkt_avg_order_by": {
            "iteration": [
                1043
            ],
            "rarity": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "objkt_bool_exp": {
            "_and": [
                959
            ],
            "_not": [
                959
            ],
            "_or": [
                959
            ],
            "actions": [
                153
            ],
            "actions_aggregate": [
                145
            ],
            "assigned": [
                24
            ],
            "assigned_at": [
                1323
            ],
            "auctions": [
                431
            ],
            "auctions_aggregate": [
                350
            ],
            "captureMediaId": [
                467
            ],
            "created_at": [
                1323
            ],
            "display_uri": [
                467
            ],
            "duplicate": [
                24
            ],
            "features": [
                692
            ],
            "generation_hash": [
                50
            ],
            "generative_token": [
                604
            ],
            "gentk_assign": [
                647
            ],
            "id": [
                50
            ],
            "input_bytes": [
                50
            ],
            "issuer_id": [
                50
            ],
            "issuer_version": [
                642
            ],
            "iteration": [
                937
            ],
            "listings": [
                705
            ],
            "listings_aggregate": [
                698
            ],
            "media_image": [
                811
            ],
            "metadata": [
                692
            ],
            "metadata_uri": [
                50
            ],
            "minter_id": [
                50
            ],
            "name": [
                50
            ],
            "offers": [
                1011
            ],
            "offers_aggregate": [
                1004
            ],
            "owner_id": [
                50
            ],
            "rarity": [
                592
            ],
            "redemptions": [
                1177
            ],
            "redemptions_aggregate": [
                1170
            ],
            "royalties": [
                28
            ],
            "slug": [
                50
            ],
            "splits": [
                1290
            ],
            "splits_aggregate": [
                1283
            ],
            "tags": [
                142
            ],
            "thumbnail_uri": [
                467
            ],
            "transactions": [
                1333
            ],
            "transactions_aggregate": [
                1326
            ],
            "updated_at": [
                1323
            ],
            "user": [
                1375
            ],
            "userByOwnerId": [
                1375
            ],
            "version": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "objkt_constraint": {},
        "objkt_inc_input": {
            "iteration": [
                936
            ],
            "rarity": [
                591
            ],
            "royalties": [
                27
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "objkt_insert_input": {
            "actions": [
                150
            ],
            "assigned": [
                23
            ],
            "assigned_at": [
                1322
            ],
            "auctions": [
                354
            ],
            "captureMediaId": [
                466
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                466
            ],
            "duplicate": [
                23
            ],
            "features": [
                691
            ],
            "generation_hash": [
                49
            ],
            "generative_token": [
                615
            ],
            "gentk_assign": [
                654
            ],
            "id": [
                49
            ],
            "input_bytes": [
                49
            ],
            "issuer_id": [
                49
            ],
            "issuer_version": [
                641
            ],
            "iteration": [
                936
            ],
            "listings": [
                702
            ],
            "media_image": [
                818
            ],
            "metadata": [
                691
            ],
            "metadata_uri": [
                49
            ],
            "minter_id": [
                49
            ],
            "name": [
                49
            ],
            "offers": [
                1008
            ],
            "owner_id": [
                49
            ],
            "rarity": [
                591
            ],
            "redemptions": [
                1174
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "splits": [
                1287
            ],
            "tags": [
                141
            ],
            "thumbnail_uri": [
                466
            ],
            "transactions": [
                1330
            ],
            "updated_at": [
                1322
            ],
            "user": [
                1388
            ],
            "userByOwnerId": [
                1388
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "objkt_max_fields": {
            "assigned_at": [
                1322
            ],
            "captureMediaId": [
                466
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                466
            ],
            "generation_hash": [
                49
            ],
            "id": [
                49
            ],
            "input_bytes": [
                49
            ],
            "issuer_id": [
                49
            ],
            "issuer_version": [
                641
            ],
            "iteration": [
                936
            ],
            "metadata_uri": [
                49
            ],
            "minter_id": [
                49
            ],
            "name": [
                49
            ],
            "owner_id": [
                49
            ],
            "rarity": [
                591
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "thumbnail_uri": [
                466
            ],
            "updated_at": [
                1322
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "objkt_max_order_by": {
            "assigned_at": [
                1043
            ],
            "captureMediaId": [
                1043
            ],
            "created_at": [
                1043
            ],
            "display_uri": [
                1043
            ],
            "generation_hash": [
                1043
            ],
            "id": [
                1043
            ],
            "input_bytes": [
                1043
            ],
            "issuer_id": [
                1043
            ],
            "issuer_version": [
                1043
            ],
            "iteration": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "minter_id": [
                1043
            ],
            "name": [
                1043
            ],
            "owner_id": [
                1043
            ],
            "rarity": [
                1043
            ],
            "royalties": [
                1043
            ],
            "slug": [
                1043
            ],
            "thumbnail_uri": [
                1043
            ],
            "updated_at": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "objkt_min_fields": {
            "assigned_at": [
                1322
            ],
            "captureMediaId": [
                466
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                466
            ],
            "generation_hash": [
                49
            ],
            "id": [
                49
            ],
            "input_bytes": [
                49
            ],
            "issuer_id": [
                49
            ],
            "issuer_version": [
                641
            ],
            "iteration": [
                936
            ],
            "metadata_uri": [
                49
            ],
            "minter_id": [
                49
            ],
            "name": [
                49
            ],
            "owner_id": [
                49
            ],
            "rarity": [
                591
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "thumbnail_uri": [
                466
            ],
            "updated_at": [
                1322
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "objkt_min_order_by": {
            "assigned_at": [
                1043
            ],
            "captureMediaId": [
                1043
            ],
            "created_at": [
                1043
            ],
            "display_uri": [
                1043
            ],
            "generation_hash": [
                1043
            ],
            "id": [
                1043
            ],
            "input_bytes": [
                1043
            ],
            "issuer_id": [
                1043
            ],
            "issuer_version": [
                1043
            ],
            "iteration": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "minter_id": [
                1043
            ],
            "name": [
                1043
            ],
            "owner_id": [
                1043
            ],
            "rarity": [
                1043
            ],
            "royalties": [
                1043
            ],
            "slug": [
                1043
            ],
            "thumbnail_uri": [
                1043
            ],
            "updated_at": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "objkt_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                938
            ],
            "__typename": [
                49
            ]
        },
        "objkt_obj_rel_insert_input": {
            "data": [
                962
            ],
            "on_conflict": [
                969
            ],
            "__typename": [
                49
            ]
        },
        "objkt_on_conflict": {
            "constraint": [
                960
            ],
            "update_columns": [
                994
            ],
            "where": [
                959
            ],
            "__typename": [
                49
            ]
        },
        "objkt_order_by": {
            "actions_aggregate": [
                148
            ],
            "assigned": [
                1043
            ],
            "assigned_at": [
                1043
            ],
            "auctions_aggregate": [
                353
            ],
            "captureMediaId": [
                1043
            ],
            "created_at": [
                1043
            ],
            "display_uri": [
                1043
            ],
            "duplicate": [
                1043
            ],
            "features": [
                1043
            ],
            "generation_hash": [
                1043
            ],
            "generative_token": [
                617
            ],
            "gentk_assign": [
                656
            ],
            "id": [
                1043
            ],
            "input_bytes": [
                1043
            ],
            "issuer_id": [
                1043
            ],
            "issuer_version": [
                1043
            ],
            "iteration": [
                1043
            ],
            "listings_aggregate": [
                701
            ],
            "media_image": [
                820
            ],
            "metadata": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "minter_id": [
                1043
            ],
            "name": [
                1043
            ],
            "offers_aggregate": [
                1007
            ],
            "owner_id": [
                1043
            ],
            "rarity": [
                1043
            ],
            "redemptions_aggregate": [
                1173
            ],
            "royalties": [
                1043
            ],
            "slug": [
                1043
            ],
            "splits_aggregate": [
                1286
            ],
            "tags": [
                1043
            ],
            "thumbnail_uri": [
                1043
            ],
            "transactions_aggregate": [
                1329
            ],
            "updated_at": [
                1043
            ],
            "user": [
                1390
            ],
            "userByOwnerId": [
                1390
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "objkt_pk_columns_input": {
            "id": [
                49
            ],
            "issuer_version": [
                641
            ],
            "__typename": [
                49
            ]
        },
        "objkt_select_column": {},
        "objkt_select_column_objkt_aggregate_bool_exp_avg_arguments_columns": {},
        "objkt_select_column_objkt_aggregate_bool_exp_bool_and_arguments_columns": {},
        "objkt_select_column_objkt_aggregate_bool_exp_bool_or_arguments_columns": {},
        "objkt_select_column_objkt_aggregate_bool_exp_corr_arguments_columns": {},
        "objkt_select_column_objkt_aggregate_bool_exp_covar_samp_arguments_columns": {},
        "objkt_select_column_objkt_aggregate_bool_exp_max_arguments_columns": {},
        "objkt_select_column_objkt_aggregate_bool_exp_min_arguments_columns": {},
        "objkt_select_column_objkt_aggregate_bool_exp_stddev_samp_arguments_columns": {},
        "objkt_select_column_objkt_aggregate_bool_exp_sum_arguments_columns": {},
        "objkt_select_column_objkt_aggregate_bool_exp_var_samp_arguments_columns": {},
        "objkt_set_input": {
            "assigned": [
                23
            ],
            "assigned_at": [
                1322
            ],
            "captureMediaId": [
                466
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                466
            ],
            "duplicate": [
                23
            ],
            "features": [
                691
            ],
            "generation_hash": [
                49
            ],
            "id": [
                49
            ],
            "input_bytes": [
                49
            ],
            "issuer_id": [
                49
            ],
            "issuer_version": [
                641
            ],
            "iteration": [
                936
            ],
            "metadata": [
                691
            ],
            "metadata_uri": [
                49
            ],
            "minter_id": [
                49
            ],
            "name": [
                49
            ],
            "owner_id": [
                49
            ],
            "rarity": [
                591
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "tags": [
                141
            ],
            "thumbnail_uri": [
                466
            ],
            "updated_at": [
                1322
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "objkt_stddev_fields": {
            "iteration": [
                25
            ],
            "rarity": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "objkt_stddev_order_by": {
            "iteration": [
                1043
            ],
            "rarity": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "objkt_stddev_pop_fields": {
            "iteration": [
                25
            ],
            "rarity": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "objkt_stddev_pop_order_by": {
            "iteration": [
                1043
            ],
            "rarity": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "objkt_stddev_samp_fields": {
            "iteration": [
                25
            ],
            "rarity": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "objkt_stddev_samp_order_by": {
            "iteration": [
                1043
            ],
            "rarity": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "objkt_stream_cursor_input": {
            "initial_value": [
                991
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "objkt_stream_cursor_value_input": {
            "assigned": [
                23
            ],
            "assigned_at": [
                1322
            ],
            "captureMediaId": [
                466
            ],
            "created_at": [
                1322
            ],
            "display_uri": [
                466
            ],
            "duplicate": [
                23
            ],
            "features": [
                691
            ],
            "generation_hash": [
                49
            ],
            "id": [
                49
            ],
            "input_bytes": [
                49
            ],
            "issuer_id": [
                49
            ],
            "issuer_version": [
                641
            ],
            "iteration": [
                936
            ],
            "metadata": [
                691
            ],
            "metadata_uri": [
                49
            ],
            "minter_id": [
                49
            ],
            "name": [
                49
            ],
            "owner_id": [
                49
            ],
            "rarity": [
                591
            ],
            "royalties": [
                27
            ],
            "slug": [
                49
            ],
            "tags": [
                141
            ],
            "thumbnail_uri": [
                466
            ],
            "updated_at": [
                1322
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "objkt_sum_fields": {
            "iteration": [
                936
            ],
            "rarity": [
                591
            ],
            "royalties": [
                27
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "objkt_sum_order_by": {
            "iteration": [
                1043
            ],
            "rarity": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "objkt_update_column": {},
        "objkt_updates": {
            "_inc": [
                961
            ],
            "_set": [
                983
            ],
            "where": [
                959
            ],
            "__typename": [
                49
            ]
        },
        "objkt_var_pop_fields": {
            "iteration": [
                25
            ],
            "rarity": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "objkt_var_pop_order_by": {
            "iteration": [
                1043
            ],
            "rarity": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "objkt_var_samp_fields": {
            "iteration": [
                25
            ],
            "rarity": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "objkt_var_samp_order_by": {
            "iteration": [
                1043
            ],
            "rarity": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "objkt_variance_fields": {
            "iteration": [
                25
            ],
            "rarity": [
                25
            ],
            "royalties": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "objkt_variance_order_by": {
            "iteration": [
                1043
            ],
            "rarity": [
                1043
            ],
            "royalties": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer": {
            "accepted_at": [
                1322
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "objkt": [
                938
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "user": [
                1367
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "offer_aggregate": {
            "aggregate": [
                1006
            ],
            "nodes": [
                1002
            ],
            "__typename": [
                49
            ]
        },
        "offer_aggregate_bool_exp": {
            "count": [
                1005
            ],
            "__typename": [
                49
            ]
        },
        "offer_aggregate_bool_exp_count": {
            "arguments": [
                1023
            ],
            "distinct": [
                23
            ],
            "filter": [
                1011
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "offer_aggregate_fields": {
            "avg": [
                1009
            ],
            "count": [
                27,
                {
                    "columns": [
                        1023,
                        "[offer_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1015
            ],
            "min": [
                1017
            ],
            "stddev": [
                1025
            ],
            "stddev_pop": [
                1027
            ],
            "stddev_samp": [
                1029
            ],
            "sum": [
                1033
            ],
            "var_pop": [
                1037
            ],
            "var_samp": [
                1039
            ],
            "variance": [
                1041
            ],
            "__typename": [
                49
            ]
        },
        "offer_aggregate_order_by": {
            "avg": [
                1010
            ],
            "count": [
                1043
            ],
            "max": [
                1016
            ],
            "min": [
                1018
            ],
            "stddev": [
                1026
            ],
            "stddev_pop": [
                1028
            ],
            "stddev_samp": [
                1030
            ],
            "sum": [
                1034
            ],
            "var_pop": [
                1038
            ],
            "var_samp": [
                1040
            ],
            "variance": [
                1042
            ],
            "__typename": [
                49
            ]
        },
        "offer_arr_rel_insert_input": {
            "data": [
                1014
            ],
            "on_conflict": [
                1020
            ],
            "__typename": [
                49
            ]
        },
        "offer_avg_fields": {
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "offer_avg_order_by": {
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer_bool_exp": {
            "_and": [
                1011
            ],
            "_not": [
                1011
            ],
            "_or": [
                1011
            ],
            "accepted_at": [
                1323
            ],
            "buyer_id": [
                50
            ],
            "cancelled_at": [
                1323
            ],
            "created_at": [
                1323
            ],
            "id": [
                50
            ],
            "objkt": [
                959
            ],
            "objkt_id": [
                50
            ],
            "objkt_issuer_version": [
                642
            ],
            "price": [
                937
            ],
            "user": [
                1375
            ],
            "version": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "offer_constraint": {},
        "offer_inc_input": {
            "price": [
                936
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "offer_insert_input": {
            "accepted_at": [
                1322
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "objkt": [
                968
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "user": [
                1388
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "offer_max_fields": {
            "accepted_at": [
                1322
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "offer_max_order_by": {
            "accepted_at": [
                1043
            ],
            "buyer_id": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer_min_fields": {
            "accepted_at": [
                1322
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "offer_min_order_by": {
            "accepted_at": [
                1043
            ],
            "buyer_id": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1002
            ],
            "__typename": [
                49
            ]
        },
        "offer_on_conflict": {
            "constraint": [
                1012
            ],
            "update_columns": [
                1035
            ],
            "where": [
                1011
            ],
            "__typename": [
                49
            ]
        },
        "offer_order_by": {
            "accepted_at": [
                1043
            ],
            "buyer_id": [
                1043
            ],
            "cancelled_at": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt": [
                970
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "price": [
                1043
            ],
            "user": [
                1390
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer_pk_columns_input": {
            "id": [
                49
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "offer_select_column": {},
        "offer_set_input": {
            "accepted_at": [
                1322
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "offer_stddev_fields": {
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "offer_stddev_order_by": {
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer_stddev_pop_fields": {
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "offer_stddev_pop_order_by": {
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer_stddev_samp_fields": {
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "offer_stddev_samp_order_by": {
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer_stream_cursor_input": {
            "initial_value": [
                1032
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "offer_stream_cursor_value_input": {
            "accepted_at": [
                1322
            ],
            "buyer_id": [
                49
            ],
            "cancelled_at": [
                1322
            ],
            "created_at": [
                1322
            ],
            "id": [
                49
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "price": [
                936
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "offer_sum_fields": {
            "price": [
                936
            ],
            "version": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "offer_sum_order_by": {
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer_update_column": {},
        "offer_updates": {
            "_inc": [
                1013
            ],
            "_set": [
                1024
            ],
            "where": [
                1011
            ],
            "__typename": [
                49
            ]
        },
        "offer_var_pop_fields": {
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "offer_var_pop_order_by": {
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer_var_samp_fields": {
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "offer_var_samp_order_by": {
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "offer_variance_fields": {
            "price": [
                25
            ],
            "version": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "offer_variance_order_by": {
            "price": [
                1043
            ],
            "version": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "order_by": {},
        "pricing_dutch_auction": {
            "decrement_duration": [
                464
            ],
            "final_price": [
                464
            ],
            "generative_token": [
                593
            ],
            "id": [
                49
            ],
            "levels": [
                139
            ],
            "opens_at": [
                1322
            ],
            "resting_price": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_aggregate": {
            "aggregate": [
                1048
            ],
            "nodes": [
                1044
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_aggregate_bool_exp": {
            "count": [
                1047
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_aggregate_bool_exp_count": {
            "arguments": [
                1065
            ],
            "distinct": [
                23
            ],
            "filter": [
                1053
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_aggregate_fields": {
            "avg": [
                1051
            ],
            "count": [
                27,
                {
                    "columns": [
                        1065,
                        "[pricing_dutch_auction_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1057
            ],
            "min": [
                1059
            ],
            "stddev": [
                1067
            ],
            "stddev_pop": [
                1069
            ],
            "stddev_samp": [
                1071
            ],
            "sum": [
                1075
            ],
            "var_pop": [
                1079
            ],
            "var_samp": [
                1081
            ],
            "variance": [
                1083
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_aggregate_order_by": {
            "avg": [
                1052
            ],
            "count": [
                1043
            ],
            "max": [
                1058
            ],
            "min": [
                1060
            ],
            "stddev": [
                1068
            ],
            "stddev_pop": [
                1070
            ],
            "stddev_samp": [
                1072
            ],
            "sum": [
                1076
            ],
            "var_pop": [
                1080
            ],
            "var_samp": [
                1082
            ],
            "variance": [
                1084
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_arr_rel_insert_input": {
            "data": [
                1056
            ],
            "on_conflict": [
                1062
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_avg_fields": {
            "decrement_duration": [
                25
            ],
            "final_price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_avg_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_bool_exp": {
            "_and": [
                1053
            ],
            "_not": [
                1053
            ],
            "_or": [
                1053
            ],
            "decrement_duration": [
                465
            ],
            "final_price": [
                465
            ],
            "generative_token": [
                604
            ],
            "id": [
                50
            ],
            "levels": [
                140
            ],
            "opens_at": [
                1323
            ],
            "resting_price": [
                50
            ],
            "token_id": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_constraint": {},
        "pricing_dutch_auction_inc_input": {
            "decrement_duration": [
                464
            ],
            "final_price": [
                464
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_insert_input": {
            "decrement_duration": [
                464
            ],
            "final_price": [
                464
            ],
            "generative_token": [
                615
            ],
            "id": [
                49
            ],
            "levels": [
                139
            ],
            "opens_at": [
                1322
            ],
            "resting_price": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_max_fields": {
            "decrement_duration": [
                464
            ],
            "final_price": [
                464
            ],
            "id": [
                49
            ],
            "opens_at": [
                1322
            ],
            "resting_price": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_max_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "id": [
                1043
            ],
            "opens_at": [
                1043
            ],
            "resting_price": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_min_fields": {
            "decrement_duration": [
                464
            ],
            "final_price": [
                464
            ],
            "id": [
                49
            ],
            "opens_at": [
                1322
            ],
            "resting_price": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_min_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "id": [
                1043
            ],
            "opens_at": [
                1043
            ],
            "resting_price": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1044
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_on_conflict": {
            "constraint": [
                1054
            ],
            "update_columns": [
                1077
            ],
            "where": [
                1053
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "generative_token": [
                617
            ],
            "id": [
                1043
            ],
            "levels": [
                1043
            ],
            "opens_at": [
                1043
            ],
            "resting_price": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_pk_columns_input": {
            "id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_select_column": {},
        "pricing_dutch_auction_set_input": {
            "decrement_duration": [
                464
            ],
            "final_price": [
                464
            ],
            "id": [
                49
            ],
            "levels": [
                139
            ],
            "opens_at": [
                1322
            ],
            "resting_price": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_stddev_fields": {
            "decrement_duration": [
                25
            ],
            "final_price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_stddev_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_stddev_pop_fields": {
            "decrement_duration": [
                25
            ],
            "final_price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_stddev_pop_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_stddev_samp_fields": {
            "decrement_duration": [
                25
            ],
            "final_price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_stddev_samp_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_stream_cursor_input": {
            "initial_value": [
                1074
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_stream_cursor_value_input": {
            "decrement_duration": [
                464
            ],
            "final_price": [
                464
            ],
            "id": [
                49
            ],
            "levels": [
                139
            ],
            "opens_at": [
                1322
            ],
            "resting_price": [
                49
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_sum_fields": {
            "decrement_duration": [
                464
            ],
            "final_price": [
                464
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_sum_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_update_column": {},
        "pricing_dutch_auction_updates": {
            "_inc": [
                1055
            ],
            "_set": [
                1066
            ],
            "where": [
                1053
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_var_pop_fields": {
            "decrement_duration": [
                25
            ],
            "final_price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_var_pop_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_var_samp_fields": {
            "decrement_duration": [
                25
            ],
            "final_price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_var_samp_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_variance_fields": {
            "decrement_duration": [
                25
            ],
            "final_price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_dutch_auction_variance_order_by": {
            "decrement_duration": [
                1043
            ],
            "final_price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed": {
            "generative_token": [
                593
            ],
            "id": [
                49
            ],
            "opens_at": [
                1322
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_aggregate": {
            "aggregate": [
                1089
            ],
            "nodes": [
                1085
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_aggregate_bool_exp": {
            "count": [
                1088
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_aggregate_bool_exp_count": {
            "arguments": [
                1106
            ],
            "distinct": [
                23
            ],
            "filter": [
                1094
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_aggregate_fields": {
            "avg": [
                1092
            ],
            "count": [
                27,
                {
                    "columns": [
                        1106,
                        "[pricing_fixed_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1098
            ],
            "min": [
                1100
            ],
            "stddev": [
                1108
            ],
            "stddev_pop": [
                1110
            ],
            "stddev_samp": [
                1112
            ],
            "sum": [
                1116
            ],
            "var_pop": [
                1120
            ],
            "var_samp": [
                1122
            ],
            "variance": [
                1124
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_aggregate_order_by": {
            "avg": [
                1093
            ],
            "count": [
                1043
            ],
            "max": [
                1099
            ],
            "min": [
                1101
            ],
            "stddev": [
                1109
            ],
            "stddev_pop": [
                1111
            ],
            "stddev_samp": [
                1113
            ],
            "sum": [
                1117
            ],
            "var_pop": [
                1121
            ],
            "var_samp": [
                1123
            ],
            "variance": [
                1125
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_arr_rel_insert_input": {
            "data": [
                1097
            ],
            "on_conflict": [
                1103
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_avg_fields": {
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_avg_order_by": {
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_bool_exp": {
            "_and": [
                1094
            ],
            "_not": [
                1094
            ],
            "_or": [
                1094
            ],
            "generative_token": [
                604
            ],
            "id": [
                50
            ],
            "opens_at": [
                1323
            ],
            "price": [
                937
            ],
            "token_id": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_constraint": {},
        "pricing_fixed_inc_input": {
            "price": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_insert_input": {
            "generative_token": [
                615
            ],
            "id": [
                49
            ],
            "opens_at": [
                1322
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_max_fields": {
            "id": [
                49
            ],
            "opens_at": [
                1322
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_max_order_by": {
            "id": [
                1043
            ],
            "opens_at": [
                1043
            ],
            "price": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_min_fields": {
            "id": [
                49
            ],
            "opens_at": [
                1322
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_min_order_by": {
            "id": [
                1043
            ],
            "opens_at": [
                1043
            ],
            "price": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1085
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_on_conflict": {
            "constraint": [
                1095
            ],
            "update_columns": [
                1118
            ],
            "where": [
                1094
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_order_by": {
            "generative_token": [
                617
            ],
            "id": [
                1043
            ],
            "opens_at": [
                1043
            ],
            "price": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_pk_columns_input": {
            "id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_select_column": {},
        "pricing_fixed_set_input": {
            "id": [
                49
            ],
            "opens_at": [
                1322
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_stddev_fields": {
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_stddev_order_by": {
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_stddev_pop_fields": {
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_stddev_pop_order_by": {
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_stddev_samp_fields": {
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_stddev_samp_order_by": {
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_stream_cursor_input": {
            "initial_value": [
                1115
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_stream_cursor_value_input": {
            "id": [
                49
            ],
            "opens_at": [
                1322
            ],
            "price": [
                936
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_sum_fields": {
            "price": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_sum_order_by": {
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_update_column": {},
        "pricing_fixed_updates": {
            "_inc": [
                1096
            ],
            "_set": [
                1107
            ],
            "where": [
                1094
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_var_pop_fields": {
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_var_pop_order_by": {
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_var_samp_fields": {
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_var_samp_order_by": {
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_variance_fields": {
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "pricing_fixed_variance_order_by": {
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable": {
            "actions": [
                143,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "actions_aggregate": [
                144,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "address": [
                49
            ],
            "base_amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "fa2": [
                49
            ],
            "generative_token": [
                593
            ],
            "max_consumptions_per_token": [
                27
            ],
            "redemptions": [
                1168,
                {
                    "distinct_on": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1187,
                        "[redemption_order_by!]"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "redemptions_aggregate": [
                1169,
                {
                    "distinct_on": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1187,
                        "[redemption_order_by!]"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "splits": [
                1281,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "splits_aggregate": [
                1282,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_aggregate": {
            "aggregate": [
                1130
            ],
            "nodes": [
                1126
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_aggregate_bool_exp": {
            "count": [
                1129
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_aggregate_bool_exp_count": {
            "arguments": [
                1148
            ],
            "distinct": [
                23
            ],
            "filter": [
                1135
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_aggregate_fields": {
            "avg": [
                1133
            ],
            "count": [
                27,
                {
                    "columns": [
                        1148,
                        "[redeemable_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1139
            ],
            "min": [
                1141
            ],
            "stddev": [
                1150
            ],
            "stddev_pop": [
                1152
            ],
            "stddev_samp": [
                1154
            ],
            "sum": [
                1158
            ],
            "var_pop": [
                1162
            ],
            "var_samp": [
                1164
            ],
            "variance": [
                1166
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_aggregate_order_by": {
            "avg": [
                1134
            ],
            "count": [
                1043
            ],
            "max": [
                1140
            ],
            "min": [
                1142
            ],
            "stddev": [
                1151
            ],
            "stddev_pop": [
                1153
            ],
            "stddev_samp": [
                1155
            ],
            "sum": [
                1159
            ],
            "var_pop": [
                1163
            ],
            "var_samp": [
                1165
            ],
            "variance": [
                1167
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_arr_rel_insert_input": {
            "data": [
                1138
            ],
            "on_conflict": [
                1145
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_avg_fields": {
            "base_amount": [
                25
            ],
            "max_consumptions_per_token": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_avg_order_by": {
            "base_amount": [
                1043
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_bool_exp": {
            "_and": [
                1135
            ],
            "_not": [
                1135
            ],
            "_or": [
                1135
            ],
            "actions": [
                153
            ],
            "actions_aggregate": [
                145
            ],
            "address": [
                50
            ],
            "base_amount": [
                937
            ],
            "created_at": [
                1323
            ],
            "fa2": [
                50
            ],
            "generative_token": [
                604
            ],
            "max_consumptions_per_token": [
                28
            ],
            "redemptions": [
                1177
            ],
            "redemptions_aggregate": [
                1170
            ],
            "splits": [
                1290
            ],
            "splits_aggregate": [
                1283
            ],
            "token_id": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_constraint": {},
        "redeemable_inc_input": {
            "base_amount": [
                936
            ],
            "max_consumptions_per_token": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_insert_input": {
            "actions": [
                150
            ],
            "address": [
                49
            ],
            "base_amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "fa2": [
                49
            ],
            "generative_token": [
                615
            ],
            "max_consumptions_per_token": [
                27
            ],
            "redemptions": [
                1174
            ],
            "splits": [
                1287
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_max_fields": {
            "address": [
                49
            ],
            "base_amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "fa2": [
                49
            ],
            "max_consumptions_per_token": [
                27
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_max_order_by": {
            "address": [
                1043
            ],
            "base_amount": [
                1043
            ],
            "created_at": [
                1043
            ],
            "fa2": [
                1043
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_min_fields": {
            "address": [
                49
            ],
            "base_amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "fa2": [
                49
            ],
            "max_consumptions_per_token": [
                27
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_min_order_by": {
            "address": [
                1043
            ],
            "base_amount": [
                1043
            ],
            "created_at": [
                1043
            ],
            "fa2": [
                1043
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1126
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_obj_rel_insert_input": {
            "data": [
                1138
            ],
            "on_conflict": [
                1145
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_on_conflict": {
            "constraint": [
                1136
            ],
            "update_columns": [
                1160
            ],
            "where": [
                1135
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_order_by": {
            "actions_aggregate": [
                148
            ],
            "address": [
                1043
            ],
            "base_amount": [
                1043
            ],
            "created_at": [
                1043
            ],
            "fa2": [
                1043
            ],
            "generative_token": [
                617
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "redemptions_aggregate": [
                1173
            ],
            "splits_aggregate": [
                1286
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_pk_columns_input": {
            "address": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_select_column": {},
        "redeemable_set_input": {
            "address": [
                49
            ],
            "base_amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "fa2": [
                49
            ],
            "max_consumptions_per_token": [
                27
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_stddev_fields": {
            "base_amount": [
                25
            ],
            "max_consumptions_per_token": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_stddev_order_by": {
            "base_amount": [
                1043
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_stddev_pop_fields": {
            "base_amount": [
                25
            ],
            "max_consumptions_per_token": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_stddev_pop_order_by": {
            "base_amount": [
                1043
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_stddev_samp_fields": {
            "base_amount": [
                25
            ],
            "max_consumptions_per_token": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_stddev_samp_order_by": {
            "base_amount": [
                1043
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_stream_cursor_input": {
            "initial_value": [
                1157
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_stream_cursor_value_input": {
            "address": [
                49
            ],
            "base_amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "fa2": [
                49
            ],
            "max_consumptions_per_token": [
                27
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_sum_fields": {
            "base_amount": [
                936
            ],
            "max_consumptions_per_token": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_sum_order_by": {
            "base_amount": [
                1043
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_update_column": {},
        "redeemable_updates": {
            "_inc": [
                1137
            ],
            "_set": [
                1149
            ],
            "where": [
                1135
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_var_pop_fields": {
            "base_amount": [
                25
            ],
            "max_consumptions_per_token": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_var_pop_order_by": {
            "base_amount": [
                1043
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_var_samp_fields": {
            "base_amount": [
                25
            ],
            "max_consumptions_per_token": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_var_samp_order_by": {
            "base_amount": [
                1043
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_variance_fields": {
            "base_amount": [
                25
            ],
            "max_consumptions_per_token": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redeemable_variance_order_by": {
            "base_amount": [
                1043
            ],
            "max_consumptions_per_token": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redemption": {
            "amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "id": [
                27
            ],
            "objkt": [
                938
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "redeemable": [
                1126
            ],
            "redeemable_address": [
                49
            ],
            "redeemer_id": [
                49
            ],
            "user": [
                1367
            ],
            "__typename": [
                49
            ]
        },
        "redemption_aggregate": {
            "aggregate": [
                1172
            ],
            "nodes": [
                1168
            ],
            "__typename": [
                49
            ]
        },
        "redemption_aggregate_bool_exp": {
            "count": [
                1171
            ],
            "__typename": [
                49
            ]
        },
        "redemption_aggregate_bool_exp_count": {
            "arguments": [
                1189
            ],
            "distinct": [
                23
            ],
            "filter": [
                1177
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "redemption_aggregate_fields": {
            "avg": [
                1175
            ],
            "count": [
                27,
                {
                    "columns": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1181
            ],
            "min": [
                1183
            ],
            "stddev": [
                1191
            ],
            "stddev_pop": [
                1193
            ],
            "stddev_samp": [
                1195
            ],
            "sum": [
                1199
            ],
            "var_pop": [
                1203
            ],
            "var_samp": [
                1205
            ],
            "variance": [
                1207
            ],
            "__typename": [
                49
            ]
        },
        "redemption_aggregate_order_by": {
            "avg": [
                1176
            ],
            "count": [
                1043
            ],
            "max": [
                1182
            ],
            "min": [
                1184
            ],
            "stddev": [
                1192
            ],
            "stddev_pop": [
                1194
            ],
            "stddev_samp": [
                1196
            ],
            "sum": [
                1200
            ],
            "var_pop": [
                1204
            ],
            "var_samp": [
                1206
            ],
            "variance": [
                1208
            ],
            "__typename": [
                49
            ]
        },
        "redemption_arr_rel_insert_input": {
            "data": [
                1180
            ],
            "on_conflict": [
                1186
            ],
            "__typename": [
                49
            ]
        },
        "redemption_avg_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redemption_avg_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redemption_bool_exp": {
            "_and": [
                1177
            ],
            "_not": [
                1177
            ],
            "_or": [
                1177
            ],
            "amount": [
                937
            ],
            "created_at": [
                1323
            ],
            "id": [
                28
            ],
            "objkt": [
                959
            ],
            "objkt_id": [
                50
            ],
            "objkt_issuer_version": [
                642
            ],
            "redeemable": [
                1135
            ],
            "redeemable_address": [
                50
            ],
            "redeemer_id": [
                50
            ],
            "user": [
                1375
            ],
            "__typename": [
                49
            ]
        },
        "redemption_constraint": {},
        "redemption_inc_input": {
            "amount": [
                936
            ],
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "redemption_insert_input": {
            "amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "id": [
                27
            ],
            "objkt": [
                968
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "redeemable": [
                1144
            ],
            "redeemable_address": [
                49
            ],
            "redeemer_id": [
                49
            ],
            "user": [
                1388
            ],
            "__typename": [
                49
            ]
        },
        "redemption_max_fields": {
            "amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "redeemable_address": [
                49
            ],
            "redeemer_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redemption_max_order_by": {
            "amount": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "redeemable_address": [
                1043
            ],
            "redeemer_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redemption_min_fields": {
            "amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "redeemable_address": [
                49
            ],
            "redeemer_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redemption_min_order_by": {
            "amount": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "redeemable_address": [
                1043
            ],
            "redeemer_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redemption_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1168
            ],
            "__typename": [
                49
            ]
        },
        "redemption_on_conflict": {
            "constraint": [
                1178
            ],
            "update_columns": [
                1201
            ],
            "where": [
                1177
            ],
            "__typename": [
                49
            ]
        },
        "redemption_order_by": {
            "amount": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt": [
                970
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "redeemable": [
                1146
            ],
            "redeemable_address": [
                1043
            ],
            "redeemer_id": [
                1043
            ],
            "user": [
                1390
            ],
            "__typename": [
                49
            ]
        },
        "redemption_pk_columns_input": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "redemption_select_column": {},
        "redemption_set_input": {
            "amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "redeemable_address": [
                49
            ],
            "redeemer_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redemption_stddev_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redemption_stddev_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redemption_stddev_pop_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redemption_stddev_pop_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redemption_stddev_samp_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redemption_stddev_samp_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redemption_stream_cursor_input": {
            "initial_value": [
                1198
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "redemption_stream_cursor_value_input": {
            "amount": [
                936
            ],
            "created_at": [
                1322
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "redeemable_address": [
                49
            ],
            "redeemer_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "redemption_sum_fields": {
            "amount": [
                936
            ],
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "redemption_sum_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redemption_update_column": {},
        "redemption_updates": {
            "_inc": [
                1179
            ],
            "_set": [
                1190
            ],
            "where": [
                1177
            ],
            "__typename": [
                49
            ]
        },
        "redemption_var_pop_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redemption_var_pop_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redemption_var_samp_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redemption_var_samp_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "redemption_variance_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "redemption_variance_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "report": {
            "created_at": [
                1322
            ],
            "generative_token": [
                593
            ],
            "id": [
                1429
            ],
            "moderation_reason": [
                917
            ],
            "reason_id": [
                49
            ],
            "token_id": [
                49
            ],
            "user": [
                1367
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "report_aggregate": {
            "aggregate": [
                1213
            ],
            "nodes": [
                1209
            ],
            "__typename": [
                49
            ]
        },
        "report_aggregate_bool_exp": {
            "count": [
                1212
            ],
            "__typename": [
                49
            ]
        },
        "report_aggregate_bool_exp_count": {
            "arguments": [
                1227
            ],
            "distinct": [
                23
            ],
            "filter": [
                1216
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "report_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1219
            ],
            "min": [
                1221
            ],
            "__typename": [
                49
            ]
        },
        "report_aggregate_order_by": {
            "count": [
                1043
            ],
            "max": [
                1220
            ],
            "min": [
                1222
            ],
            "__typename": [
                49
            ]
        },
        "report_arr_rel_insert_input": {
            "data": [
                1218
            ],
            "on_conflict": [
                1224
            ],
            "__typename": [
                49
            ]
        },
        "report_bool_exp": {
            "_and": [
                1216
            ],
            "_not": [
                1216
            ],
            "_or": [
                1216
            ],
            "created_at": [
                1323
            ],
            "generative_token": [
                604
            ],
            "id": [
                1430
            ],
            "moderation_reason": [
                920
            ],
            "reason_id": [
                50
            ],
            "token_id": [
                50
            ],
            "user": [
                1375
            ],
            "user_id": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "report_constraint": {},
        "report_insert_input": {
            "created_at": [
                1322
            ],
            "generative_token": [
                615
            ],
            "id": [
                1429
            ],
            "moderation_reason": [
                926
            ],
            "reason_id": [
                49
            ],
            "token_id": [
                49
            ],
            "user": [
                1388
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "report_max_fields": {
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "reason_id": [
                49
            ],
            "token_id": [
                49
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "report_max_order_by": {
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "reason_id": [
                1043
            ],
            "token_id": [
                1043
            ],
            "user_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "report_min_fields": {
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "reason_id": [
                49
            ],
            "token_id": [
                49
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "report_min_order_by": {
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "reason_id": [
                1043
            ],
            "token_id": [
                1043
            ],
            "user_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "report_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1209
            ],
            "__typename": [
                49
            ]
        },
        "report_on_conflict": {
            "constraint": [
                1217
            ],
            "update_columns": [
                1231
            ],
            "where": [
                1216
            ],
            "__typename": [
                49
            ]
        },
        "report_order_by": {
            "created_at": [
                1043
            ],
            "generative_token": [
                617
            ],
            "id": [
                1043
            ],
            "moderation_reason": [
                928
            ],
            "reason_id": [
                1043
            ],
            "token_id": [
                1043
            ],
            "user": [
                1390
            ],
            "user_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "report_pk_columns_input": {
            "id": [
                1429
            ],
            "__typename": [
                49
            ]
        },
        "report_select_column": {},
        "report_set_input": {
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "reason_id": [
                49
            ],
            "token_id": [
                49
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "report_stream_cursor_input": {
            "initial_value": [
                1230
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "report_stream_cursor_value_input": {
            "created_at": [
                1322
            ],
            "id": [
                1429
            ],
            "reason_id": [
                49
            ],
            "token_id": [
                49
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "report_update_column": {},
        "report_updates": {
            "_set": [
                1228
            ],
            "where": [
                1216
            ],
            "__typename": [
                49
            ]
        },
        "reserve": {
            "amount": [
                936
            ],
            "data": [
                693,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "generative_token": [
                593
            ],
            "id": [
                27
            ],
            "method": [
                27
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "reserve_aggregate": {
            "aggregate": [
                1237
            ],
            "nodes": [
                1233
            ],
            "__typename": [
                49
            ]
        },
        "reserve_aggregate_bool_exp": {
            "count": [
                1236
            ],
            "__typename": [
                49
            ]
        },
        "reserve_aggregate_bool_exp_count": {
            "arguments": [
                1259
            ],
            "distinct": [
                23
            ],
            "filter": [
                1243
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "reserve_aggregate_fields": {
            "avg": [
                1241
            ],
            "count": [
                27,
                {
                    "columns": [
                        1259,
                        "[reserve_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1250
            ],
            "min": [
                1252
            ],
            "stddev": [
                1261
            ],
            "stddev_pop": [
                1263
            ],
            "stddev_samp": [
                1265
            ],
            "sum": [
                1269
            ],
            "var_pop": [
                1273
            ],
            "var_samp": [
                1275
            ],
            "variance": [
                1277
            ],
            "__typename": [
                49
            ]
        },
        "reserve_aggregate_order_by": {
            "avg": [
                1242
            ],
            "count": [
                1043
            ],
            "max": [
                1251
            ],
            "min": [
                1253
            ],
            "stddev": [
                1262
            ],
            "stddev_pop": [
                1264
            ],
            "stddev_samp": [
                1266
            ],
            "sum": [
                1270
            ],
            "var_pop": [
                1274
            ],
            "var_samp": [
                1276
            ],
            "variance": [
                1278
            ],
            "__typename": [
                49
            ]
        },
        "reserve_append_input": {
            "data": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "reserve_arr_rel_insert_input": {
            "data": [
                1249
            ],
            "on_conflict": [
                1255
            ],
            "__typename": [
                49
            ]
        },
        "reserve_avg_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "method": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "reserve_avg_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "reserve_bool_exp": {
            "_and": [
                1243
            ],
            "_not": [
                1243
            ],
            "_or": [
                1243
            ],
            "amount": [
                937
            ],
            "data": [
                695
            ],
            "generative_token": [
                604
            ],
            "id": [
                28
            ],
            "method": [
                28
            ],
            "token_id": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "reserve_constraint": {},
        "reserve_delete_at_path_input": {
            "data": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "reserve_delete_elem_input": {
            "data": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "reserve_delete_key_input": {
            "data": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "reserve_inc_input": {
            "amount": [
                936
            ],
            "id": [
                27
            ],
            "method": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "reserve_insert_input": {
            "amount": [
                936
            ],
            "data": [
                693
            ],
            "generative_token": [
                615
            ],
            "id": [
                27
            ],
            "method": [
                27
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "reserve_max_fields": {
            "amount": [
                936
            ],
            "id": [
                27
            ],
            "method": [
                27
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "reserve_max_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "reserve_min_fields": {
            "amount": [
                936
            ],
            "id": [
                27
            ],
            "method": [
                27
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "reserve_min_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "reserve_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1233
            ],
            "__typename": [
                49
            ]
        },
        "reserve_on_conflict": {
            "constraint": [
                1244
            ],
            "update_columns": [
                1271
            ],
            "where": [
                1243
            ],
            "__typename": [
                49
            ]
        },
        "reserve_order_by": {
            "amount": [
                1043
            ],
            "data": [
                1043
            ],
            "generative_token": [
                617
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "token_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "reserve_pk_columns_input": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "reserve_prepend_input": {
            "data": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "reserve_select_column": {},
        "reserve_set_input": {
            "amount": [
                936
            ],
            "data": [
                693
            ],
            "id": [
                27
            ],
            "method": [
                27
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "reserve_stddev_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "method": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "reserve_stddev_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "reserve_stddev_pop_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "method": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "reserve_stddev_pop_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "reserve_stddev_samp_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "method": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "reserve_stddev_samp_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "reserve_stream_cursor_input": {
            "initial_value": [
                1268
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "reserve_stream_cursor_value_input": {
            "amount": [
                936
            ],
            "data": [
                693
            ],
            "id": [
                27
            ],
            "method": [
                27
            ],
            "token_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "reserve_sum_fields": {
            "amount": [
                936
            ],
            "id": [
                27
            ],
            "method": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "reserve_sum_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "reserve_update_column": {},
        "reserve_updates": {
            "_append": [
                1239
            ],
            "_delete_at_path": [
                1245
            ],
            "_delete_elem": [
                1246
            ],
            "_delete_key": [
                1247
            ],
            "_inc": [
                1248
            ],
            "_prepend": [
                1258
            ],
            "_set": [
                1260
            ],
            "where": [
                1243
            ],
            "__typename": [
                49
            ]
        },
        "reserve_var_pop_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "method": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "reserve_var_pop_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "reserve_var_samp_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "method": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "reserve_var_samp_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "reserve_variance_fields": {
            "amount": [
                25
            ],
            "id": [
                25
            ],
            "method": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "reserve_variance_order_by": {
            "amount": [
                1043
            ],
            "id": [
                1043
            ],
            "method": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "smallint": {},
        "smallint_comparison_exp": {
            "_eq": [
                1279
            ],
            "_gt": [
                1279
            ],
            "_gte": [
                1279
            ],
            "_in": [
                1279
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                1279
            ],
            "_lte": [
                1279
            ],
            "_neq": [
                1279
            ],
            "_nin": [
                1279
            ],
            "__typename": [
                49
            ]
        },
        "split": {
            "article": [
                191
            ],
            "article_id": [
                27
            ],
            "generativeTokenByGenerativeTokenPrimaryId": [
                593
            ],
            "generative_token": [
                593
            ],
            "generative_token_primary_id": [
                49
            ],
            "generative_token_secondary_id": [
                49
            ],
            "id": [
                27
            ],
            "objkt": [
                938
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "pct": [
                27
            ],
            "redeemable": [
                1126
            ],
            "redeemable_address": [
                49
            ],
            "user": [
                1367
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "split_aggregate": {
            "aggregate": [
                1285
            ],
            "nodes": [
                1281
            ],
            "__typename": [
                49
            ]
        },
        "split_aggregate_bool_exp": {
            "count": [
                1284
            ],
            "__typename": [
                49
            ]
        },
        "split_aggregate_bool_exp_count": {
            "arguments": [
                1302
            ],
            "distinct": [
                23
            ],
            "filter": [
                1290
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "split_aggregate_fields": {
            "avg": [
                1288
            ],
            "count": [
                27,
                {
                    "columns": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1294
            ],
            "min": [
                1296
            ],
            "stddev": [
                1304
            ],
            "stddev_pop": [
                1306
            ],
            "stddev_samp": [
                1308
            ],
            "sum": [
                1312
            ],
            "var_pop": [
                1316
            ],
            "var_samp": [
                1318
            ],
            "variance": [
                1320
            ],
            "__typename": [
                49
            ]
        },
        "split_aggregate_order_by": {
            "avg": [
                1289
            ],
            "count": [
                1043
            ],
            "max": [
                1295
            ],
            "min": [
                1297
            ],
            "stddev": [
                1305
            ],
            "stddev_pop": [
                1307
            ],
            "stddev_samp": [
                1309
            ],
            "sum": [
                1313
            ],
            "var_pop": [
                1317
            ],
            "var_samp": [
                1319
            ],
            "variance": [
                1321
            ],
            "__typename": [
                49
            ]
        },
        "split_arr_rel_insert_input": {
            "data": [
                1293
            ],
            "on_conflict": [
                1299
            ],
            "__typename": [
                49
            ]
        },
        "split_avg_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "pct": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "split_avg_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "pct": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "split_bool_exp": {
            "_and": [
                1290
            ],
            "_not": [
                1290
            ],
            "_or": [
                1290
            ],
            "article": [
                202
            ],
            "article_id": [
                28
            ],
            "generativeTokenByGenerativeTokenPrimaryId": [
                604
            ],
            "generative_token": [
                604
            ],
            "generative_token_primary_id": [
                50
            ],
            "generative_token_secondary_id": [
                50
            ],
            "id": [
                28
            ],
            "objkt": [
                959
            ],
            "objkt_id": [
                50
            ],
            "objkt_issuer_version": [
                642
            ],
            "pct": [
                28
            ],
            "redeemable": [
                1135
            ],
            "redeemable_address": [
                50
            ],
            "user": [
                1375
            ],
            "user_id": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "split_constraint": {},
        "split_inc_input": {
            "article_id": [
                27
            ],
            "id": [
                27
            ],
            "pct": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "split_insert_input": {
            "article": [
                281
            ],
            "article_id": [
                27
            ],
            "generativeTokenByGenerativeTokenPrimaryId": [
                615
            ],
            "generative_token": [
                615
            ],
            "generative_token_primary_id": [
                49
            ],
            "generative_token_secondary_id": [
                49
            ],
            "id": [
                27
            ],
            "objkt": [
                968
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "pct": [
                27
            ],
            "redeemable": [
                1144
            ],
            "redeemable_address": [
                49
            ],
            "user": [
                1388
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "split_max_fields": {
            "article_id": [
                27
            ],
            "generative_token_primary_id": [
                49
            ],
            "generative_token_secondary_id": [
                49
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "pct": [
                27
            ],
            "redeemable_address": [
                49
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "split_max_order_by": {
            "article_id": [
                1043
            ],
            "generative_token_primary_id": [
                1043
            ],
            "generative_token_secondary_id": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "pct": [
                1043
            ],
            "redeemable_address": [
                1043
            ],
            "user_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "split_min_fields": {
            "article_id": [
                27
            ],
            "generative_token_primary_id": [
                49
            ],
            "generative_token_secondary_id": [
                49
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "pct": [
                27
            ],
            "redeemable_address": [
                49
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "split_min_order_by": {
            "article_id": [
                1043
            ],
            "generative_token_primary_id": [
                1043
            ],
            "generative_token_secondary_id": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "pct": [
                1043
            ],
            "redeemable_address": [
                1043
            ],
            "user_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "split_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1281
            ],
            "__typename": [
                49
            ]
        },
        "split_on_conflict": {
            "constraint": [
                1291
            ],
            "update_columns": [
                1314
            ],
            "where": [
                1290
            ],
            "__typename": [
                49
            ]
        },
        "split_order_by": {
            "article": [
                283
            ],
            "article_id": [
                1043
            ],
            "generativeTokenByGenerativeTokenPrimaryId": [
                617
            ],
            "generative_token": [
                617
            ],
            "generative_token_primary_id": [
                1043
            ],
            "generative_token_secondary_id": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt": [
                970
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "pct": [
                1043
            ],
            "redeemable": [
                1146
            ],
            "redeemable_address": [
                1043
            ],
            "user": [
                1390
            ],
            "user_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "split_pk_columns_input": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "split_select_column": {},
        "split_set_input": {
            "article_id": [
                27
            ],
            "generative_token_primary_id": [
                49
            ],
            "generative_token_secondary_id": [
                49
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "pct": [
                27
            ],
            "redeemable_address": [
                49
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "split_stddev_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "pct": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "split_stddev_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "pct": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "split_stddev_pop_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "pct": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "split_stddev_pop_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "pct": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "split_stddev_samp_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "pct": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "split_stddev_samp_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "pct": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "split_stream_cursor_input": {
            "initial_value": [
                1311
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "split_stream_cursor_value_input": {
            "article_id": [
                27
            ],
            "generative_token_primary_id": [
                49
            ],
            "generative_token_secondary_id": [
                49
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "pct": [
                27
            ],
            "redeemable_address": [
                49
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "split_sum_fields": {
            "article_id": [
                27
            ],
            "id": [
                27
            ],
            "pct": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "split_sum_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "pct": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "split_update_column": {},
        "split_updates": {
            "_inc": [
                1292
            ],
            "_set": [
                1303
            ],
            "where": [
                1290
            ],
            "__typename": [
                49
            ]
        },
        "split_var_pop_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "pct": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "split_var_pop_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "pct": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "split_var_samp_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "pct": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "split_var_samp_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "pct": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "split_variance_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "pct": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "split_variance_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "pct": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                1322
            ],
            "_gt": [
                1322
            ],
            "_gte": [
                1322
            ],
            "_in": [
                1322
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                1322
            ],
            "_lte": [
                1322
            ],
            "_neq": [
                1322
            ],
            "_nin": [
                1322
            ],
            "__typename": [
                49
            ]
        },
        "transaction": {
            "article": [
                191
            ],
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "generative_token": [
                593
            ],
            "id": [
                27
            ],
            "objkt": [
                938
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "price": [
                936
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                1357
            ],
            "__typename": [
                49
            ]
        },
        "transaction_aggregate": {
            "aggregate": [
                1328
            ],
            "nodes": [
                1324
            ],
            "__typename": [
                49
            ]
        },
        "transaction_aggregate_bool_exp": {
            "count": [
                1327
            ],
            "__typename": [
                49
            ]
        },
        "transaction_aggregate_bool_exp_count": {
            "arguments": [
                1345
            ],
            "distinct": [
                23
            ],
            "filter": [
                1333
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "transaction_aggregate_fields": {
            "avg": [
                1331
            ],
            "count": [
                27,
                {
                    "columns": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1337
            ],
            "min": [
                1339
            ],
            "stddev": [
                1347
            ],
            "stddev_pop": [
                1349
            ],
            "stddev_samp": [
                1351
            ],
            "sum": [
                1355
            ],
            "var_pop": [
                1361
            ],
            "var_samp": [
                1363
            ],
            "variance": [
                1365
            ],
            "__typename": [
                49
            ]
        },
        "transaction_aggregate_order_by": {
            "avg": [
                1332
            ],
            "count": [
                1043
            ],
            "max": [
                1338
            ],
            "min": [
                1340
            ],
            "stddev": [
                1348
            ],
            "stddev_pop": [
                1350
            ],
            "stddev_samp": [
                1352
            ],
            "sum": [
                1356
            ],
            "var_pop": [
                1362
            ],
            "var_samp": [
                1364
            ],
            "variance": [
                1366
            ],
            "__typename": [
                49
            ]
        },
        "transaction_arr_rel_insert_input": {
            "data": [
                1336
            ],
            "on_conflict": [
                1342
            ],
            "__typename": [
                49
            ]
        },
        "transaction_avg_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "transaction_avg_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "transaction_bool_exp": {
            "_and": [
                1333
            ],
            "_not": [
                1333
            ],
            "_or": [
                1333
            ],
            "article": [
                202
            ],
            "article_id": [
                28
            ],
            "created_at": [
                1323
            ],
            "generative_token": [
                604
            ],
            "id": [
                28
            ],
            "objkt": [
                959
            ],
            "objkt_id": [
                50
            ],
            "objkt_issuer_version": [
                642
            ],
            "op_hash": [
                50
            ],
            "price": [
                937
            ],
            "ticket_id": [
                50
            ],
            "token_id": [
                50
            ],
            "type": [
                1358
            ],
            "__typename": [
                49
            ]
        },
        "transaction_constraint": {},
        "transaction_inc_input": {
            "article_id": [
                27
            ],
            "id": [
                27
            ],
            "price": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "transaction_insert_input": {
            "article": [
                281
            ],
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "generative_token": [
                615
            ],
            "id": [
                27
            ],
            "objkt": [
                968
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "price": [
                936
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                1357
            ],
            "__typename": [
                49
            ]
        },
        "transaction_max_fields": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "price": [
                936
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                1357
            ],
            "__typename": [
                49
            ]
        },
        "transaction_max_order_by": {
            "article_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "op_hash": [
                1043
            ],
            "price": [
                1043
            ],
            "ticket_id": [
                1043
            ],
            "token_id": [
                1043
            ],
            "type": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "transaction_min_fields": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "price": [
                936
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                1357
            ],
            "__typename": [
                49
            ]
        },
        "transaction_min_order_by": {
            "article_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "id": [
                1043
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "op_hash": [
                1043
            ],
            "price": [
                1043
            ],
            "ticket_id": [
                1043
            ],
            "token_id": [
                1043
            ],
            "type": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "transaction_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1324
            ],
            "__typename": [
                49
            ]
        },
        "transaction_on_conflict": {
            "constraint": [
                1334
            ],
            "update_columns": [
                1359
            ],
            "where": [
                1333
            ],
            "__typename": [
                49
            ]
        },
        "transaction_order_by": {
            "article": [
                283
            ],
            "article_id": [
                1043
            ],
            "created_at": [
                1043
            ],
            "generative_token": [
                617
            ],
            "id": [
                1043
            ],
            "objkt": [
                970
            ],
            "objkt_id": [
                1043
            ],
            "objkt_issuer_version": [
                1043
            ],
            "op_hash": [
                1043
            ],
            "price": [
                1043
            ],
            "ticket_id": [
                1043
            ],
            "token_id": [
                1043
            ],
            "type": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "transaction_pk_columns_input": {
            "id": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "transaction_select_column": {},
        "transaction_set_input": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "price": [
                936
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                1357
            ],
            "__typename": [
                49
            ]
        },
        "transaction_stddev_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "transaction_stddev_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "transaction_stddev_pop_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "transaction_stddev_pop_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "transaction_stddev_samp_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "transaction_stddev_samp_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "transaction_stream_cursor_input": {
            "initial_value": [
                1354
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "transaction_stream_cursor_value_input": {
            "article_id": [
                27
            ],
            "created_at": [
                1322
            ],
            "id": [
                27
            ],
            "objkt_id": [
                49
            ],
            "objkt_issuer_version": [
                641
            ],
            "op_hash": [
                49
            ],
            "price": [
                936
            ],
            "ticket_id": [
                49
            ],
            "token_id": [
                49
            ],
            "type": [
                1357
            ],
            "__typename": [
                49
            ]
        },
        "transaction_sum_fields": {
            "article_id": [
                27
            ],
            "id": [
                27
            ],
            "price": [
                936
            ],
            "__typename": [
                49
            ]
        },
        "transaction_sum_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "transaction_type_enum": {},
        "transaction_type_enum_comparison_exp": {
            "_eq": [
                1357
            ],
            "_gt": [
                1357
            ],
            "_gte": [
                1357
            ],
            "_in": [
                1357
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                1357
            ],
            "_lte": [
                1357
            ],
            "_neq": [
                1357
            ],
            "_nin": [
                1357
            ],
            "__typename": [
                49
            ]
        },
        "transaction_update_column": {},
        "transaction_updates": {
            "_inc": [
                1335
            ],
            "_set": [
                1346
            ],
            "where": [
                1333
            ],
            "__typename": [
                49
            ]
        },
        "transaction_var_pop_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "transaction_var_pop_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "transaction_var_samp_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "transaction_var_samp_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "transaction_variance_fields": {
            "article_id": [
                25
            ],
            "id": [
                25
            ],
            "price": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "transaction_variance_order_by": {
            "article_id": [
                1043
            ],
            "id": [
                1043
            ],
            "price": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "user": {
            "actions": [
                143,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "actionsByIssuerId": [
                143,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "actionsByIssuerId_aggregate": [
                144,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "actions_aggregate": [
                144,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "article_ledgers": [
                235,
                {
                    "distinct_on": [
                        256,
                        "[article_ledger_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        254,
                        "[article_ledger_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "article_ledgers_aggregate": [
                236,
                {
                    "distinct_on": [
                        256,
                        "[article_ledger_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        254,
                        "[article_ledger_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "articles": [
                191,
                {
                    "distinct_on": [
                        326,
                        "[article_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        283,
                        "[article_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "articles_aggregate": [
                192,
                {
                    "distinct_on": [
                        326,
                        "[article_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        283,
                        "[article_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "auction_bids": [
                357,
                {
                    "distinct_on": [
                        378,
                        "[auction_bid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        376,
                        "[auction_bid_order_by!]"
                    ],
                    "where": [
                        366
                    ]
                }
            ],
            "auction_bids_aggregate": [
                358,
                {
                    "distinct_on": [
                        378,
                        "[auction_bid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        376,
                        "[auction_bid_order_by!]"
                    ],
                    "where": [
                        366
                    ]
                }
            ],
            "auctions": [
                348,
                {
                    "distinct_on": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        442,
                        "[auction_order_by!]"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "auctions_aggregate": [
                349,
                {
                    "distinct_on": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        442,
                        "[auction_order_by!]"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "authorizations": [
                135
            ],
            "avatarMediaId": [
                466
            ],
            "avatar_uri": [
                49
            ],
            "codexes": [
                468,
                {
                    "distinct_on": [
                        489,
                        "[codex_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        487,
                        "[codex_order_by!]"
                    ],
                    "where": [
                        477
                    ]
                }
            ],
            "codexes_aggregate": [
                469,
                {
                    "distinct_on": [
                        489,
                        "[codex_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        487,
                        "[codex_order_by!]"
                    ],
                    "where": [
                        477
                    ]
                }
            ],
            "collaborations": [
                525,
                {
                    "distinct_on": [
                        543,
                        "[collaboration_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        541,
                        "[collaboration_order_by!]"
                    ],
                    "where": [
                        532
                    ]
                }
            ],
            "collaborationsByCollaboratorId": [
                525,
                {
                    "distinct_on": [
                        543,
                        "[collaboration_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        541,
                        "[collaboration_order_by!]"
                    ],
                    "where": [
                        532
                    ]
                }
            ],
            "collaborationsByCollaboratorId_aggregate": [
                526,
                {
                    "distinct_on": [
                        543,
                        "[collaboration_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        541,
                        "[collaboration_order_by!]"
                    ],
                    "where": [
                        532
                    ]
                }
            ],
            "collaborations_aggregate": [
                526,
                {
                    "distinct_on": [
                        543,
                        "[collaboration_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        541,
                        "[collaboration_order_by!]"
                    ],
                    "where": [
                        532
                    ]
                }
            ],
            "collection_offers": [
                549,
                {
                    "distinct_on": [
                        570,
                        "[collection_offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        568,
                        "[collection_offer_order_by!]"
                    ],
                    "where": [
                        558
                    ]
                }
            ],
            "collection_offers_aggregate": [
                550,
                {
                    "distinct_on": [
                        570,
                        "[collection_offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        568,
                        "[collection_offer_order_by!]"
                    ],
                    "where": [
                        558
                    ]
                }
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "flag": [
                1380
            ],
            "generative_tokens": [
                593,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "generative_tokens_aggregate": [
                594,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "id": [
                49
            ],
            "listings": [
                696,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "listingsByAcceptedById": [
                696,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "listingsByAcceptedById_aggregate": [
                697,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "listings_aggregate": [
                697,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "media_image": [
                807
            ],
            "metadata": [
                693,
                {
                    "path": [
                        49
                    ]
                }
            ],
            "metadata_uri": [
                49
            ],
            "mint_tickets": [
                835,
                {
                    "distinct_on": [
                        856,
                        "[mint_ticket_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        854,
                        "[mint_ticket_order_by!]"
                    ],
                    "where": [
                        844
                    ]
                }
            ],
            "mint_tickets_aggregate": [
                836,
                {
                    "distinct_on": [
                        856,
                        "[mint_ticket_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        854,
                        "[mint_ticket_order_by!]"
                    ],
                    "where": [
                        844
                    ]
                }
            ],
            "moderation_reason": [
                917
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "objkts": [
                938,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "objktsByOwnerId": [
                938,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "objktsByOwnerId_aggregate": [
                939,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "objkts_aggregate": [
                939,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "offers": [
                1002,
                {
                    "distinct_on": [
                        1023,
                        "[offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1021,
                        "[offer_order_by!]"
                    ],
                    "where": [
                        1011
                    ]
                }
            ],
            "offers_aggregate": [
                1003,
                {
                    "distinct_on": [
                        1023,
                        "[offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1021,
                        "[offer_order_by!]"
                    ],
                    "where": [
                        1011
                    ]
                }
            ],
            "redemptions": [
                1168,
                {
                    "distinct_on": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1187,
                        "[redemption_order_by!]"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "redemptions_aggregate": [
                1169,
                {
                    "distinct_on": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1187,
                        "[redemption_order_by!]"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "reports": [
                1209,
                {
                    "distinct_on": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1225,
                        "[report_order_by!]"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "reports_aggregate": [
                1210,
                {
                    "distinct_on": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1225,
                        "[report_order_by!]"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "splits": [
                1281,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "splits_aggregate": [
                1282,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "type": [
                1425
            ],
            "updated_at": [
                1322
            ],
            "user_stat": [
                1395
            ],
            "__typename": [
                49
            ]
        },
        "user_aggregate": {
            "aggregate": [
                1371
            ],
            "nodes": [
                1367
            ],
            "__typename": [
                49
            ]
        },
        "user_aggregate_bool_exp": {
            "count": [
                1370
            ],
            "__typename": [
                49
            ]
        },
        "user_aggregate_bool_exp_count": {
            "arguments": [
                1393
            ],
            "distinct": [
                23
            ],
            "filter": [
                1375
            ],
            "predicate": [
                28
            ],
            "__typename": [
                49
            ]
        },
        "user_aggregate_fields": {
            "count": [
                27,
                {
                    "columns": [
                        1393,
                        "[user_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1383
            ],
            "min": [
                1385
            ],
            "__typename": [
                49
            ]
        },
        "user_aggregate_order_by": {
            "count": [
                1043
            ],
            "max": [
                1384
            ],
            "min": [
                1386
            ],
            "__typename": [
                49
            ]
        },
        "user_append_input": {
            "metadata": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "user_arr_rel_insert_input": {
            "data": [
                1382
            ],
            "on_conflict": [
                1389
            ],
            "__typename": [
                49
            ]
        },
        "user_bool_exp": {
            "_and": [
                1375
            ],
            "_not": [
                1375
            ],
            "_or": [
                1375
            ],
            "actions": [
                153
            ],
            "actionsByIssuerId": [
                153
            ],
            "actionsByIssuerId_aggregate": [
                145
            ],
            "actions_aggregate": [
                145
            ],
            "article_ledgers": [
                244
            ],
            "article_ledgers_aggregate": [
                237
            ],
            "articles": [
                202
            ],
            "articles_aggregate": [
                193
            ],
            "auction_bids": [
                366
            ],
            "auction_bids_aggregate": [
                359
            ],
            "auctions": [
                431
            ],
            "auctions_aggregate": [
                350
            ],
            "authorizations": [
                136
            ],
            "avatarMediaId": [
                467
            ],
            "avatar_uri": [
                50
            ],
            "codexes": [
                477
            ],
            "codexes_aggregate": [
                470
            ],
            "collaborations": [
                532
            ],
            "collaborationsByCollaboratorId": [
                532
            ],
            "collaborationsByCollaboratorId_aggregate": [
                527
            ],
            "collaborations_aggregate": [
                527
            ],
            "collection_offers": [
                558
            ],
            "collection_offers_aggregate": [
                551
            ],
            "created_at": [
                1323
            ],
            "description": [
                50
            ],
            "flag": [
                1381
            ],
            "generative_tokens": [
                604
            ],
            "generative_tokens_aggregate": [
                595
            ],
            "id": [
                50
            ],
            "listings": [
                705
            ],
            "listingsByAcceptedById": [
                705
            ],
            "listingsByAcceptedById_aggregate": [
                698
            ],
            "listings_aggregate": [
                698
            ],
            "media_image": [
                811
            ],
            "metadata": [
                695
            ],
            "metadata_uri": [
                50
            ],
            "mint_tickets": [
                844
            ],
            "mint_tickets_aggregate": [
                837
            ],
            "moderation_reason": [
                920
            ],
            "moderation_reason_id": [
                50
            ],
            "name": [
                50
            ],
            "objkts": [
                959
            ],
            "objktsByOwnerId": [
                959
            ],
            "objktsByOwnerId_aggregate": [
                940
            ],
            "objkts_aggregate": [
                940
            ],
            "offers": [
                1011
            ],
            "offers_aggregate": [
                1004
            ],
            "redemptions": [
                1177
            ],
            "redemptions_aggregate": [
                1170
            ],
            "reports": [
                1216
            ],
            "reports_aggregate": [
                1211
            ],
            "splits": [
                1290
            ],
            "splits_aggregate": [
                1283
            ],
            "type": [
                1426
            ],
            "updated_at": [
                1323
            ],
            "user_stat": [
                1399
            ],
            "__typename": [
                49
            ]
        },
        "user_constraint": {},
        "user_delete_at_path_input": {
            "metadata": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "user_delete_elem_input": {
            "metadata": [
                27
            ],
            "__typename": [
                49
            ]
        },
        "user_delete_key_input": {
            "metadata": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "user_flag_enum": {},
        "user_flag_enum_comparison_exp": {
            "_eq": [
                1380
            ],
            "_gt": [
                1380
            ],
            "_gte": [
                1380
            ],
            "_in": [
                1380
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                1380
            ],
            "_lte": [
                1380
            ],
            "_neq": [
                1380
            ],
            "_nin": [
                1380
            ],
            "__typename": [
                49
            ]
        },
        "user_insert_input": {
            "actions": [
                150
            ],
            "actionsByIssuerId": [
                150
            ],
            "article_ledgers": [
                241
            ],
            "articles": [
                199
            ],
            "auction_bids": [
                363
            ],
            "auctions": [
                354
            ],
            "authorizations": [
                135
            ],
            "avatarMediaId": [
                466
            ],
            "avatar_uri": [
                49
            ],
            "codexes": [
                476
            ],
            "collaborations": [
                531
            ],
            "collaborationsByCollaboratorId": [
                531
            ],
            "collection_offers": [
                555
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "flag": [
                1380
            ],
            "generative_tokens": [
                601
            ],
            "id": [
                49
            ],
            "listings": [
                702
            ],
            "listingsByAcceptedById": [
                702
            ],
            "media_image": [
                818
            ],
            "metadata": [
                693
            ],
            "metadata_uri": [
                49
            ],
            "mint_tickets": [
                841
            ],
            "moderation_reason": [
                926
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "objkts": [
                956
            ],
            "objktsByOwnerId": [
                956
            ],
            "offers": [
                1008
            ],
            "redemptions": [
                1174
            ],
            "reports": [
                1215
            ],
            "splits": [
                1287
            ],
            "type": [
                1425
            ],
            "updated_at": [
                1322
            ],
            "user_stat": [
                1406
            ],
            "__typename": [
                49
            ]
        },
        "user_max_fields": {
            "avatarMediaId": [
                466
            ],
            "avatar_uri": [
                49
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "flag": [
                1380
            ],
            "id": [
                49
            ],
            "metadata_uri": [
                49
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "type": [
                1425
            ],
            "updated_at": [
                1322
            ],
            "__typename": [
                49
            ]
        },
        "user_max_order_by": {
            "avatarMediaId": [
                1043
            ],
            "avatar_uri": [
                1043
            ],
            "created_at": [
                1043
            ],
            "description": [
                1043
            ],
            "flag": [
                1043
            ],
            "id": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "moderation_reason_id": [
                1043
            ],
            "name": [
                1043
            ],
            "type": [
                1043
            ],
            "updated_at": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "user_min_fields": {
            "avatarMediaId": [
                466
            ],
            "avatar_uri": [
                49
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "flag": [
                1380
            ],
            "id": [
                49
            ],
            "metadata_uri": [
                49
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "type": [
                1425
            ],
            "updated_at": [
                1322
            ],
            "__typename": [
                49
            ]
        },
        "user_min_order_by": {
            "avatarMediaId": [
                1043
            ],
            "avatar_uri": [
                1043
            ],
            "created_at": [
                1043
            ],
            "description": [
                1043
            ],
            "flag": [
                1043
            ],
            "id": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "moderation_reason_id": [
                1043
            ],
            "name": [
                1043
            ],
            "type": [
                1043
            ],
            "updated_at": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "user_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1367
            ],
            "__typename": [
                49
            ]
        },
        "user_obj_rel_insert_input": {
            "data": [
                1382
            ],
            "on_conflict": [
                1389
            ],
            "__typename": [
                49
            ]
        },
        "user_on_conflict": {
            "constraint": [
                1376
            ],
            "update_columns": [
                1427
            ],
            "where": [
                1375
            ],
            "__typename": [
                49
            ]
        },
        "user_order_by": {
            "actionsByIssuerId_aggregate": [
                148
            ],
            "actions_aggregate": [
                148
            ],
            "article_ledgers_aggregate": [
                240
            ],
            "articles_aggregate": [
                198
            ],
            "auction_bids_aggregate": [
                362
            ],
            "auctions_aggregate": [
                353
            ],
            "authorizations": [
                1043
            ],
            "avatarMediaId": [
                1043
            ],
            "avatar_uri": [
                1043
            ],
            "codexes_aggregate": [
                475
            ],
            "collaborationsByCollaboratorId_aggregate": [
                530
            ],
            "collaborations_aggregate": [
                530
            ],
            "collection_offers_aggregate": [
                554
            ],
            "created_at": [
                1043
            ],
            "description": [
                1043
            ],
            "flag": [
                1043
            ],
            "generative_tokens_aggregate": [
                600
            ],
            "id": [
                1043
            ],
            "listingsByAcceptedById_aggregate": [
                701
            ],
            "listings_aggregate": [
                701
            ],
            "media_image": [
                820
            ],
            "metadata": [
                1043
            ],
            "metadata_uri": [
                1043
            ],
            "mint_tickets_aggregate": [
                840
            ],
            "moderation_reason": [
                928
            ],
            "moderation_reason_id": [
                1043
            ],
            "name": [
                1043
            ],
            "objktsByOwnerId_aggregate": [
                955
            ],
            "objkts_aggregate": [
                955
            ],
            "offers_aggregate": [
                1007
            ],
            "redemptions_aggregate": [
                1173
            ],
            "reports_aggregate": [
                1214
            ],
            "splits_aggregate": [
                1286
            ],
            "type": [
                1043
            ],
            "updated_at": [
                1043
            ],
            "user_stat": [
                1408
            ],
            "__typename": [
                49
            ]
        },
        "user_pk_columns_input": {
            "id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "user_prepend_input": {
            "metadata": [
                693
            ],
            "__typename": [
                49
            ]
        },
        "user_select_column": {},
        "user_set_input": {
            "authorizations": [
                135
            ],
            "avatarMediaId": [
                466
            ],
            "avatar_uri": [
                49
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "flag": [
                1380
            ],
            "id": [
                49
            ],
            "metadata": [
                693
            ],
            "metadata_uri": [
                49
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "type": [
                1425
            ],
            "updated_at": [
                1322
            ],
            "__typename": [
                49
            ]
        },
        "user_stats": {
            "from": [
                1322
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_nb7d": [
                464
            ],
            "prim_volume_nb24": [
                464
            ],
            "prim_volume_nb30d": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "prim_volume_tz7d": [
                464
            ],
            "prim_volume_tz24": [
                464
            ],
            "prim_volume_tz30d": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_nb7d": [
                464
            ],
            "sec_volume_nb24": [
                464
            ],
            "sec_volume_nb30d": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "sec_volume_tz7d": [
                464
            ],
            "sec_volume_tz24": [
                464
            ],
            "sec_volume_tz30d": [
                464
            ],
            "to": [
                1322
            ],
            "user": [
                1367
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_aggregate": {
            "aggregate": [
                1397
            ],
            "nodes": [
                1395
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_aggregate_fields": {
            "avg": [
                1398
            ],
            "count": [
                27,
                {
                    "columns": [
                        1410,
                        "[user_stats_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                1403
            ],
            "min": [
                1404
            ],
            "stddev": [
                1412
            ],
            "stddev_pop": [
                1413
            ],
            "stddev_samp": [
                1414
            ],
            "sum": [
                1417
            ],
            "var_pop": [
                1420
            ],
            "var_samp": [
                1421
            ],
            "variance": [
                1422
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_avg_fields": {
            "prim_volume_nb": [
                25
            ],
            "prim_volume_nb7d": [
                25
            ],
            "prim_volume_nb24": [
                25
            ],
            "prim_volume_nb30d": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "prim_volume_tz7d": [
                25
            ],
            "prim_volume_tz24": [
                25
            ],
            "prim_volume_tz30d": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_bool_exp": {
            "_and": [
                1399
            ],
            "_not": [
                1399
            ],
            "_or": [
                1399
            ],
            "from": [
                1323
            ],
            "prim_volume_nb": [
                465
            ],
            "prim_volume_nb7d": [
                465
            ],
            "prim_volume_nb24": [
                465
            ],
            "prim_volume_nb30d": [
                465
            ],
            "prim_volume_tz": [
                465
            ],
            "prim_volume_tz7d": [
                465
            ],
            "prim_volume_tz24": [
                465
            ],
            "prim_volume_tz30d": [
                465
            ],
            "sec_volume_nb": [
                465
            ],
            "sec_volume_nb7d": [
                465
            ],
            "sec_volume_nb24": [
                465
            ],
            "sec_volume_nb30d": [
                465
            ],
            "sec_volume_tz": [
                465
            ],
            "sec_volume_tz7d": [
                465
            ],
            "sec_volume_tz24": [
                465
            ],
            "sec_volume_tz30d": [
                465
            ],
            "to": [
                1323
            ],
            "user": [
                1375
            ],
            "user_id": [
                50
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_constraint": {},
        "user_stats_inc_input": {
            "prim_volume_nb": [
                464
            ],
            "prim_volume_nb7d": [
                464
            ],
            "prim_volume_nb24": [
                464
            ],
            "prim_volume_nb30d": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "prim_volume_tz7d": [
                464
            ],
            "prim_volume_tz24": [
                464
            ],
            "prim_volume_tz30d": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_nb7d": [
                464
            ],
            "sec_volume_nb24": [
                464
            ],
            "sec_volume_nb30d": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "sec_volume_tz7d": [
                464
            ],
            "sec_volume_tz24": [
                464
            ],
            "sec_volume_tz30d": [
                464
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_insert_input": {
            "from": [
                1322
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_nb7d": [
                464
            ],
            "prim_volume_nb24": [
                464
            ],
            "prim_volume_nb30d": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "prim_volume_tz7d": [
                464
            ],
            "prim_volume_tz24": [
                464
            ],
            "prim_volume_tz30d": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_nb7d": [
                464
            ],
            "sec_volume_nb24": [
                464
            ],
            "sec_volume_nb30d": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "sec_volume_tz7d": [
                464
            ],
            "sec_volume_tz24": [
                464
            ],
            "sec_volume_tz30d": [
                464
            ],
            "to": [
                1322
            ],
            "user": [
                1388
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_max_fields": {
            "from": [
                1322
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_nb7d": [
                464
            ],
            "prim_volume_nb24": [
                464
            ],
            "prim_volume_nb30d": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "prim_volume_tz7d": [
                464
            ],
            "prim_volume_tz24": [
                464
            ],
            "prim_volume_tz30d": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_nb7d": [
                464
            ],
            "sec_volume_nb24": [
                464
            ],
            "sec_volume_nb30d": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "sec_volume_tz7d": [
                464
            ],
            "sec_volume_tz24": [
                464
            ],
            "sec_volume_tz30d": [
                464
            ],
            "to": [
                1322
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_min_fields": {
            "from": [
                1322
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_nb7d": [
                464
            ],
            "prim_volume_nb24": [
                464
            ],
            "prim_volume_nb30d": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "prim_volume_tz7d": [
                464
            ],
            "prim_volume_tz24": [
                464
            ],
            "prim_volume_tz30d": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_nb7d": [
                464
            ],
            "sec_volume_nb24": [
                464
            ],
            "sec_volume_nb30d": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "sec_volume_tz7d": [
                464
            ],
            "sec_volume_tz24": [
                464
            ],
            "sec_volume_tz30d": [
                464
            ],
            "to": [
                1322
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_mutation_response": {
            "affected_rows": [
                27
            ],
            "returning": [
                1395
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_obj_rel_insert_input": {
            "data": [
                1402
            ],
            "on_conflict": [
                1407
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_on_conflict": {
            "constraint": [
                1400
            ],
            "update_columns": [
                1418
            ],
            "where": [
                1399
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_order_by": {
            "from": [
                1043
            ],
            "prim_volume_nb": [
                1043
            ],
            "prim_volume_nb7d": [
                1043
            ],
            "prim_volume_nb24": [
                1043
            ],
            "prim_volume_nb30d": [
                1043
            ],
            "prim_volume_tz": [
                1043
            ],
            "prim_volume_tz7d": [
                1043
            ],
            "prim_volume_tz24": [
                1043
            ],
            "prim_volume_tz30d": [
                1043
            ],
            "sec_volume_nb": [
                1043
            ],
            "sec_volume_nb7d": [
                1043
            ],
            "sec_volume_nb24": [
                1043
            ],
            "sec_volume_nb30d": [
                1043
            ],
            "sec_volume_tz": [
                1043
            ],
            "sec_volume_tz7d": [
                1043
            ],
            "sec_volume_tz24": [
                1043
            ],
            "sec_volume_tz30d": [
                1043
            ],
            "to": [
                1043
            ],
            "user": [
                1390
            ],
            "user_id": [
                1043
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_pk_columns_input": {
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_select_column": {},
        "user_stats_set_input": {
            "from": [
                1322
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_nb7d": [
                464
            ],
            "prim_volume_nb24": [
                464
            ],
            "prim_volume_nb30d": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "prim_volume_tz7d": [
                464
            ],
            "prim_volume_tz24": [
                464
            ],
            "prim_volume_tz30d": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_nb7d": [
                464
            ],
            "sec_volume_nb24": [
                464
            ],
            "sec_volume_nb30d": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "sec_volume_tz7d": [
                464
            ],
            "sec_volume_tz24": [
                464
            ],
            "sec_volume_tz30d": [
                464
            ],
            "to": [
                1322
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_stddev_fields": {
            "prim_volume_nb": [
                25
            ],
            "prim_volume_nb7d": [
                25
            ],
            "prim_volume_nb24": [
                25
            ],
            "prim_volume_nb30d": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "prim_volume_tz7d": [
                25
            ],
            "prim_volume_tz24": [
                25
            ],
            "prim_volume_tz30d": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_stddev_pop_fields": {
            "prim_volume_nb": [
                25
            ],
            "prim_volume_nb7d": [
                25
            ],
            "prim_volume_nb24": [
                25
            ],
            "prim_volume_nb30d": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "prim_volume_tz7d": [
                25
            ],
            "prim_volume_tz24": [
                25
            ],
            "prim_volume_tz30d": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_stddev_samp_fields": {
            "prim_volume_nb": [
                25
            ],
            "prim_volume_nb7d": [
                25
            ],
            "prim_volume_nb24": [
                25
            ],
            "prim_volume_nb30d": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "prim_volume_tz7d": [
                25
            ],
            "prim_volume_tz24": [
                25
            ],
            "prim_volume_tz30d": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_stream_cursor_input": {
            "initial_value": [
                1416
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_stream_cursor_value_input": {
            "from": [
                1322
            ],
            "prim_volume_nb": [
                464
            ],
            "prim_volume_nb7d": [
                464
            ],
            "prim_volume_nb24": [
                464
            ],
            "prim_volume_nb30d": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "prim_volume_tz7d": [
                464
            ],
            "prim_volume_tz24": [
                464
            ],
            "prim_volume_tz30d": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_nb7d": [
                464
            ],
            "sec_volume_nb24": [
                464
            ],
            "sec_volume_nb30d": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "sec_volume_tz7d": [
                464
            ],
            "sec_volume_tz24": [
                464
            ],
            "sec_volume_tz30d": [
                464
            ],
            "to": [
                1322
            ],
            "user_id": [
                49
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_sum_fields": {
            "prim_volume_nb": [
                464
            ],
            "prim_volume_nb7d": [
                464
            ],
            "prim_volume_nb24": [
                464
            ],
            "prim_volume_nb30d": [
                464
            ],
            "prim_volume_tz": [
                464
            ],
            "prim_volume_tz7d": [
                464
            ],
            "prim_volume_tz24": [
                464
            ],
            "prim_volume_tz30d": [
                464
            ],
            "sec_volume_nb": [
                464
            ],
            "sec_volume_nb7d": [
                464
            ],
            "sec_volume_nb24": [
                464
            ],
            "sec_volume_nb30d": [
                464
            ],
            "sec_volume_tz": [
                464
            ],
            "sec_volume_tz7d": [
                464
            ],
            "sec_volume_tz24": [
                464
            ],
            "sec_volume_tz30d": [
                464
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_update_column": {},
        "user_stats_updates": {
            "_inc": [
                1401
            ],
            "_set": [
                1411
            ],
            "where": [
                1399
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_var_pop_fields": {
            "prim_volume_nb": [
                25
            ],
            "prim_volume_nb7d": [
                25
            ],
            "prim_volume_nb24": [
                25
            ],
            "prim_volume_nb30d": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "prim_volume_tz7d": [
                25
            ],
            "prim_volume_tz24": [
                25
            ],
            "prim_volume_tz30d": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_var_samp_fields": {
            "prim_volume_nb": [
                25
            ],
            "prim_volume_nb7d": [
                25
            ],
            "prim_volume_nb24": [
                25
            ],
            "prim_volume_nb30d": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "prim_volume_tz7d": [
                25
            ],
            "prim_volume_tz24": [
                25
            ],
            "prim_volume_tz30d": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "user_stats_variance_fields": {
            "prim_volume_nb": [
                25
            ],
            "prim_volume_nb7d": [
                25
            ],
            "prim_volume_nb24": [
                25
            ],
            "prim_volume_nb30d": [
                25
            ],
            "prim_volume_tz": [
                25
            ],
            "prim_volume_tz7d": [
                25
            ],
            "prim_volume_tz24": [
                25
            ],
            "prim_volume_tz30d": [
                25
            ],
            "sec_volume_nb": [
                25
            ],
            "sec_volume_nb7d": [
                25
            ],
            "sec_volume_nb24": [
                25
            ],
            "sec_volume_nb30d": [
                25
            ],
            "sec_volume_tz": [
                25
            ],
            "sec_volume_tz7d": [
                25
            ],
            "sec_volume_tz24": [
                25
            ],
            "sec_volume_tz30d": [
                25
            ],
            "__typename": [
                49
            ]
        },
        "user_stream_cursor_input": {
            "initial_value": [
                1424
            ],
            "ordering": [
                590
            ],
            "__typename": [
                49
            ]
        },
        "user_stream_cursor_value_input": {
            "authorizations": [
                135
            ],
            "avatarMediaId": [
                466
            ],
            "avatar_uri": [
                49
            ],
            "created_at": [
                1322
            ],
            "description": [
                49
            ],
            "flag": [
                1380
            ],
            "id": [
                49
            ],
            "metadata": [
                693
            ],
            "metadata_uri": [
                49
            ],
            "moderation_reason_id": [
                49
            ],
            "name": [
                49
            ],
            "type": [
                1425
            ],
            "updated_at": [
                1322
            ],
            "__typename": [
                49
            ]
        },
        "user_type_enum": {},
        "user_type_enum_comparison_exp": {
            "_eq": [
                1425
            ],
            "_gt": [
                1425
            ],
            "_gte": [
                1425
            ],
            "_in": [
                1425
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                1425
            ],
            "_lte": [
                1425
            ],
            "_neq": [
                1425
            ],
            "_nin": [
                1425
            ],
            "__typename": [
                49
            ]
        },
        "user_update_column": {},
        "user_updates": {
            "_append": [
                1373
            ],
            "_delete_at_path": [
                1377
            ],
            "_delete_elem": [
                1378
            ],
            "_delete_key": [
                1379
            ],
            "_prepend": [
                1392
            ],
            "_set": [
                1394
            ],
            "where": [
                1375
            ],
            "__typename": [
                49
            ]
        },
        "uuid": {},
        "uuid_comparison_exp": {
            "_eq": [
                1429
            ],
            "_gt": [
                1429
            ],
            "_gte": [
                1429
            ],
            "_in": [
                1429
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                1429
            ],
            "_lte": [
                1429
            ],
            "_neq": [
                1429
            ],
            "_nin": [
                1429
            ],
            "__typename": [
                49
            ]
        },
        "Query": {
            "Account": [
                0,
                {
                    "distinct_on": [
                        15,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        13,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        5
                    ]
                }
            ],
            "Account_aggregate": [
                3,
                {
                    "distinct_on": [
                        15,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        13,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        5
                    ]
                }
            ],
            "Account_by_pk": [
                0,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "Profile": [
                29,
                {
                    "distinct_on": [
                        42,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        40,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        32
                    ]
                }
            ],
            "Profile_aggregate": [
                30,
                {
                    "distinct_on": [
                        42,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        40,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        32
                    ]
                }
            ],
            "Profile_by_pk": [
                29,
                {
                    "accountId": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "Wallet": [
                51,
                {
                    "distinct_on": [
                        69,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        67,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        58
                    ]
                }
            ],
            "Wallet_aggregate": [
                52,
                {
                    "distinct_on": [
                        69,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        67,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        58
                    ]
                }
            ],
            "Wallet_by_pk": [
                51,
                {
                    "address": [
                        49,
                        "String!"
                    ]
                }
            ],
            "Whitelist": [
                75,
                {
                    "distinct_on": [
                        129,
                        "[Whitelist_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        127,
                        "[Whitelist_order_by!]"
                    ],
                    "where": [
                        119
                    ]
                }
            ],
            "WhitelistEntries": [
                76,
                {
                    "distinct_on": [
                        97,
                        "[WhitelistEntries_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        95,
                        "[WhitelistEntries_order_by!]"
                    ],
                    "where": [
                        85
                    ]
                }
            ],
            "WhitelistEntries_aggregate": [
                77,
                {
                    "distinct_on": [
                        97,
                        "[WhitelistEntries_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        95,
                        "[WhitelistEntries_order_by!]"
                    ],
                    "where": [
                        85
                    ]
                }
            ],
            "WhitelistEntries_by_pk": [
                76,
                {
                    "merkleRoot": [
                        49,
                        "String!"
                    ],
                    "whitelistIndex": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "Whitelist_aggregate": [
                117,
                {
                    "distinct_on": [
                        129,
                        "[Whitelist_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        127,
                        "[Whitelist_order_by!]"
                    ],
                    "where": [
                        119
                    ]
                }
            ],
            "Whitelist_by_pk": [
                75,
                {
                    "merkleRoot": [
                        49,
                        "String!"
                    ]
                }
            ],
            "action": [
                143,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "action_aggregate": [
                144,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "action_by_pk": [
                143,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "article": [
                191,
                {
                    "distinct_on": [
                        326,
                        "[article_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        283,
                        "[article_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "article_aggregate": [
                192,
                {
                    "distinct_on": [
                        326,
                        "[article_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        283,
                        "[article_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "article_by_pk": [
                191,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "article_generative_token": [
                206,
                {
                    "distinct_on": [
                        220,
                        "[article_generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        218,
                        "[article_generative_token_order_by!]"
                    ],
                    "where": [
                        210
                    ]
                }
            ],
            "article_generative_token_aggregate": [
                207,
                {
                    "distinct_on": [
                        220,
                        "[article_generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        218,
                        "[article_generative_token_order_by!]"
                    ],
                    "where": [
                        210
                    ]
                }
            ],
            "article_generative_token_by_pk": [
                206,
                {
                    "article_id": [
                        27,
                        "Int!"
                    ],
                    "generative_token_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "article_ledger": [
                235,
                {
                    "distinct_on": [
                        256,
                        "[article_ledger_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        254,
                        "[article_ledger_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "article_ledger_aggregate": [
                236,
                {
                    "distinct_on": [
                        256,
                        "[article_ledger_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        254,
                        "[article_ledger_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "article_ledger_by_pk": [
                235,
                {
                    "article_id": [
                        27,
                        "Int!"
                    ],
                    "owner_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "article_revision": [
                285,
                {
                    "distinct_on": [
                        306,
                        "[article_revision_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        304,
                        "[article_revision_order_by!]"
                    ],
                    "where": [
                        294
                    ]
                }
            ],
            "article_revision_aggregate": [
                286,
                {
                    "distinct_on": [
                        306,
                        "[article_revision_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        304,
                        "[article_revision_order_by!]"
                    ],
                    "where": [
                        294
                    ]
                }
            ],
            "article_revision_by_pk": [
                285,
                {
                    "article_id": [
                        27,
                        "Int!"
                    ],
                    "iteration": [
                        1279,
                        "smallint!"
                    ]
                }
            ],
            "auction": [
                348,
                {
                    "distinct_on": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        442,
                        "[auction_order_by!]"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "auction_aggregate": [
                349,
                {
                    "distinct_on": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        442,
                        "[auction_order_by!]"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "auction_bid": [
                357,
                {
                    "distinct_on": [
                        378,
                        "[auction_bid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        376,
                        "[auction_bid_order_by!]"
                    ],
                    "where": [
                        366
                    ]
                }
            ],
            "auction_bid_aggregate": [
                358,
                {
                    "distinct_on": [
                        378,
                        "[auction_bid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        376,
                        "[auction_bid_order_by!]"
                    ],
                    "where": [
                        366
                    ]
                }
            ],
            "auction_bid_by_pk": [
                357,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "auction_bid_table": [
                390,
                {
                    "distinct_on": [
                        410,
                        "[auction_bid_table_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        407,
                        "[auction_bid_table_order_by!]"
                    ],
                    "where": [
                        395
                    ]
                }
            ],
            "auction_bid_table_aggregate": [
                391,
                {
                    "distinct_on": [
                        410,
                        "[auction_bid_table_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        407,
                        "[auction_bid_table_order_by!]"
                    ],
                    "where": [
                        395
                    ]
                }
            ],
            "auction_bid_table_by_pk": [
                390,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "auction_by_pk": [
                348,
                {
                    "id": [
                        27,
                        "Int!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "codex": [
                468,
                {
                    "distinct_on": [
                        489,
                        "[codex_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        487,
                        "[codex_order_by!]"
                    ],
                    "where": [
                        477
                    ]
                }
            ],
            "codex_aggregate": [
                469,
                {
                    "distinct_on": [
                        489,
                        "[codex_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        487,
                        "[codex_order_by!]"
                    ],
                    "where": [
                        477
                    ]
                }
            ],
            "codex_by_pk": [
                468,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "token_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "codex_update_request": [
                498,
                {
                    "distinct_on": [
                        516,
                        "[codex_update_request_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        514,
                        "[codex_update_request_order_by!]"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "codex_update_request_aggregate": [
                499,
                {
                    "distinct_on": [
                        516,
                        "[codex_update_request_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        514,
                        "[codex_update_request_order_by!]"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "codex_update_request_by_pk": [
                498,
                {
                    "codex_id": [
                        49,
                        "String!"
                    ],
                    "token_id": [
                        49,
                        "String!"
                    ],
                    "token_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "collaboration": [
                525,
                {
                    "distinct_on": [
                        543,
                        "[collaboration_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        541,
                        "[collaboration_order_by!]"
                    ],
                    "where": [
                        532
                    ]
                }
            ],
            "collaboration_aggregate": [
                526,
                {
                    "distinct_on": [
                        543,
                        "[collaboration_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        541,
                        "[collaboration_order_by!]"
                    ],
                    "where": [
                        532
                    ]
                }
            ],
            "collaboration_by_pk": [
                525,
                {
                    "collaboration_contract_id": [
                        49,
                        "String!"
                    ],
                    "collaborator_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "collection_offer": [
                549,
                {
                    "distinct_on": [
                        570,
                        "[collection_offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        568,
                        "[collection_offer_order_by!]"
                    ],
                    "where": [
                        558
                    ]
                }
            ],
            "collection_offer_aggregate": [
                550,
                {
                    "distinct_on": [
                        570,
                        "[collection_offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        568,
                        "[collection_offer_order_by!]"
                    ],
                    "where": [
                        558
                    ]
                }
            ],
            "collection_offer_by_pk": [
                549,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "generative_token": [
                593,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "generative_token_aggregate": [
                594,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "generative_token_by_pk": [
                593,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "gentk_assign": [
                643,
                {
                    "distinct_on": [
                        658,
                        "[gentk_assign_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        656,
                        "[gentk_assign_order_by!]"
                    ],
                    "where": [
                        647
                    ]
                }
            ],
            "gentk_assign_aggregate": [
                644,
                {
                    "distinct_on": [
                        658,
                        "[gentk_assign_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        656,
                        "[gentk_assign_order_by!]"
                    ],
                    "where": [
                        647
                    ]
                }
            ],
            "gentk_assign_by_pk": [
                643,
                {
                    "gentk_id": [
                        49,
                        "String!"
                    ],
                    "gentk_issuer_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "ipfs_cid": [
                673,
                {
                    "distinct_on": [
                        685,
                        "[ipfs_cid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        683,
                        "[ipfs_cid_order_by!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "ipfs_cid_aggregate": [
                674,
                {
                    "distinct_on": [
                        685,
                        "[ipfs_cid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        683,
                        "[ipfs_cid_order_by!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "ipfs_cid_by_pk": [
                673,
                {
                    "cid": [
                        49,
                        "String!"
                    ]
                }
            ],
            "listing": [
                696,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "listing_aggregate": [
                697,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "listing_by_pk": [
                696,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "market_stats": [
                738,
                {
                    "distinct_on": [
                        794,
                        "[market_stats_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        792,
                        "[market_stats_order_by!]"
                    ],
                    "where": [
                        742
                    ]
                }
            ],
            "market_stats_aggregate": [
                739,
                {
                    "distinct_on": [
                        794,
                        "[market_stats_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        792,
                        "[market_stats_order_by!]"
                    ],
                    "where": [
                        742
                    ]
                }
            ],
            "market_stats_by_pk": [
                738,
                {
                    "token_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "market_stats_history": [
                744,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "market_stats_history_aggregate": [
                745,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "market_stats_history_by_pk": [
                744,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "media_image": [
                807,
                {
                    "distinct_on": [
                        822,
                        "[media_image_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        820,
                        "[media_image_order_by!]"
                    ],
                    "where": [
                        811
                    ]
                }
            ],
            "media_image_aggregate": [
                808,
                {
                    "distinct_on": [
                        822,
                        "[media_image_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        820,
                        "[media_image_order_by!]"
                    ],
                    "where": [
                        811
                    ]
                }
            ],
            "media_image_by_pk": [
                807,
                {
                    "cid": [
                        466,
                        "bpchar!"
                    ]
                }
            ],
            "mint_ticket": [
                835,
                {
                    "distinct_on": [
                        856,
                        "[mint_ticket_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        854,
                        "[mint_ticket_order_by!]"
                    ],
                    "where": [
                        844
                    ]
                }
            ],
            "mint_ticket_aggregate": [
                836,
                {
                    "distinct_on": [
                        856,
                        "[mint_ticket_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        854,
                        "[mint_ticket_order_by!]"
                    ],
                    "where": [
                        844
                    ]
                }
            ],
            "mint_ticket_by_pk": [
                835,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "mint_ticket_settings": [
                858,
                {
                    "distinct_on": [
                        879,
                        "[mint_ticket_settings_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        877,
                        "[mint_ticket_settings_order_by!]"
                    ],
                    "where": [
                        867
                    ]
                }
            ],
            "mint_ticket_settings_aggregate": [
                859,
                {
                    "distinct_on": [
                        879,
                        "[mint_ticket_settings_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        877,
                        "[mint_ticket_settings_order_by!]"
                    ],
                    "where": [
                        867
                    ]
                }
            ],
            "mint_ticket_settings_by_pk": [
                858,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "moderation_reason": [
                917,
                {
                    "distinct_on": [
                        930,
                        "[moderation_reason_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        928,
                        "[moderation_reason_order_by!]"
                    ],
                    "where": [
                        920
                    ]
                }
            ],
            "moderation_reason_aggregate": [
                918,
                {
                    "distinct_on": [
                        930,
                        "[moderation_reason_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        928,
                        "[moderation_reason_order_by!]"
                    ],
                    "where": [
                        920
                    ]
                }
            ],
            "moderation_reason_by_pk": [
                917,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "objkt": [
                938,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "objkt_aggregate": [
                939,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "objkt_by_pk": [
                938,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "issuer_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "offer": [
                1002,
                {
                    "distinct_on": [
                        1023,
                        "[offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1021,
                        "[offer_order_by!]"
                    ],
                    "where": [
                        1011
                    ]
                }
            ],
            "offer_aggregate": [
                1003,
                {
                    "distinct_on": [
                        1023,
                        "[offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1021,
                        "[offer_order_by!]"
                    ],
                    "where": [
                        1011
                    ]
                }
            ],
            "offer_by_pk": [
                1002,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "pricing_dutch_auction": [
                1044,
                {
                    "distinct_on": [
                        1065,
                        "[pricing_dutch_auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1063,
                        "[pricing_dutch_auction_order_by!]"
                    ],
                    "where": [
                        1053
                    ]
                }
            ],
            "pricing_dutch_auction_aggregate": [
                1045,
                {
                    "distinct_on": [
                        1065,
                        "[pricing_dutch_auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1063,
                        "[pricing_dutch_auction_order_by!]"
                    ],
                    "where": [
                        1053
                    ]
                }
            ],
            "pricing_dutch_auction_by_pk": [
                1044,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "pricing_fixed": [
                1085,
                {
                    "distinct_on": [
                        1106,
                        "[pricing_fixed_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1104,
                        "[pricing_fixed_order_by!]"
                    ],
                    "where": [
                        1094
                    ]
                }
            ],
            "pricing_fixed_aggregate": [
                1086,
                {
                    "distinct_on": [
                        1106,
                        "[pricing_fixed_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1104,
                        "[pricing_fixed_order_by!]"
                    ],
                    "where": [
                        1094
                    ]
                }
            ],
            "pricing_fixed_by_pk": [
                1085,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "redeemable": [
                1126,
                {
                    "distinct_on": [
                        1148,
                        "[redeemable_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1146,
                        "[redeemable_order_by!]"
                    ],
                    "where": [
                        1135
                    ]
                }
            ],
            "redeemable_aggregate": [
                1127,
                {
                    "distinct_on": [
                        1148,
                        "[redeemable_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1146,
                        "[redeemable_order_by!]"
                    ],
                    "where": [
                        1135
                    ]
                }
            ],
            "redeemable_by_pk": [
                1126,
                {
                    "address": [
                        49,
                        "String!"
                    ]
                }
            ],
            "redemption": [
                1168,
                {
                    "distinct_on": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1187,
                        "[redemption_order_by!]"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "redemption_aggregate": [
                1169,
                {
                    "distinct_on": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1187,
                        "[redemption_order_by!]"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "redemption_by_pk": [
                1168,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "report": [
                1209,
                {
                    "distinct_on": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1225,
                        "[report_order_by!]"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "report_aggregate": [
                1210,
                {
                    "distinct_on": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1225,
                        "[report_order_by!]"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "report_by_pk": [
                1209,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "reserve": [
                1233,
                {
                    "distinct_on": [
                        1259,
                        "[reserve_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1256,
                        "[reserve_order_by!]"
                    ],
                    "where": [
                        1243
                    ]
                }
            ],
            "reserve_aggregate": [
                1234,
                {
                    "distinct_on": [
                        1259,
                        "[reserve_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1256,
                        "[reserve_order_by!]"
                    ],
                    "where": [
                        1243
                    ]
                }
            ],
            "reserve_by_pk": [
                1233,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "split": [
                1281,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "split_aggregate": [
                1282,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "split_by_pk": [
                1281,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "transaction": [
                1324,
                {
                    "distinct_on": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1343,
                        "[transaction_order_by!]"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "transaction_aggregate": [
                1325,
                {
                    "distinct_on": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1343,
                        "[transaction_order_by!]"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "transaction_by_pk": [
                1324,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "user": [
                1367,
                {
                    "distinct_on": [
                        1393,
                        "[user_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1390,
                        "[user_order_by!]"
                    ],
                    "where": [
                        1375
                    ]
                }
            ],
            "user_aggregate": [
                1368,
                {
                    "distinct_on": [
                        1393,
                        "[user_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1390,
                        "[user_order_by!]"
                    ],
                    "where": [
                        1375
                    ]
                }
            ],
            "user_by_pk": [
                1367,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "user_stats": [
                1395,
                {
                    "distinct_on": [
                        1410,
                        "[user_stats_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1408,
                        "[user_stats_order_by!]"
                    ],
                    "where": [
                        1399
                    ]
                }
            ],
            "user_stats_aggregate": [
                1396,
                {
                    "distinct_on": [
                        1410,
                        "[user_stats_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1408,
                        "[user_stats_order_by!]"
                    ],
                    "where": [
                        1399
                    ]
                }
            ],
            "user_stats_by_pk": [
                1395,
                {
                    "user_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                49
            ]
        },
        "Mutation": {
            "delete_Account": [
                10,
                {
                    "where": [
                        5,
                        "Account_bool_exp!"
                    ]
                }
            ],
            "delete_Account_by_pk": [
                0,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "delete_Profile": [
                37,
                {
                    "where": [
                        32,
                        "Profile_bool_exp!"
                    ]
                }
            ],
            "delete_Profile_by_pk": [
                29,
                {
                    "accountId": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "delete_Wallet": [
                65,
                {
                    "where": [
                        58,
                        "Wallet_bool_exp!"
                    ]
                }
            ],
            "delete_Wallet_by_pk": [
                51,
                {
                    "address": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_Whitelist": [
                124,
                {
                    "where": [
                        119,
                        "Whitelist_bool_exp!"
                    ]
                }
            ],
            "delete_WhitelistEntries": [
                93,
                {
                    "where": [
                        85,
                        "WhitelistEntries_bool_exp!"
                    ]
                }
            ],
            "delete_WhitelistEntries_by_pk": [
                76,
                {
                    "merkleRoot": [
                        49,
                        "String!"
                    ],
                    "whitelistIndex": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_Whitelist_by_pk": [
                75,
                {
                    "merkleRoot": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_action": [
                164,
                {
                    "where": [
                        153,
                        "action_bool_exp!"
                    ]
                }
            ],
            "delete_action_by_pk": [
                143,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "delete_article": [
                280,
                {
                    "where": [
                        202,
                        "article_bool_exp!"
                    ]
                }
            ],
            "delete_article_by_pk": [
                191,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_article_generative_token": [
                216,
                {
                    "where": [
                        210,
                        "article_generative_token_bool_exp!"
                    ]
                }
            ],
            "delete_article_generative_token_by_pk": [
                206,
                {
                    "article_id": [
                        27,
                        "Int!"
                    ],
                    "generative_token_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_article_ledger": [
                252,
                {
                    "where": [
                        244,
                        "article_ledger_bool_exp!"
                    ]
                }
            ],
            "delete_article_ledger_by_pk": [
                235,
                {
                    "article_id": [
                        27,
                        "Int!"
                    ],
                    "owner_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_article_revision": [
                302,
                {
                    "where": [
                        294,
                        "article_revision_bool_exp!"
                    ]
                }
            ],
            "delete_article_revision_by_pk": [
                285,
                {
                    "article_id": [
                        27,
                        "Int!"
                    ],
                    "iteration": [
                        1279,
                        "smallint!"
                    ]
                }
            ],
            "delete_auction": [
                439,
                {
                    "where": [
                        431,
                        "auction_bool_exp!"
                    ]
                }
            ],
            "delete_auction_bid": [
                374,
                {
                    "where": [
                        366,
                        "auction_bid_bool_exp!"
                    ]
                }
            ],
            "delete_auction_bid_by_pk": [
                357,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "delete_auction_bid_table": [
                404,
                {
                    "where": [
                        395,
                        "auction_bid_table_bool_exp!"
                    ]
                }
            ],
            "delete_auction_bid_table_by_pk": [
                390,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_auction_by_pk": [
                348,
                {
                    "id": [
                        27,
                        "Int!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_codex": [
                484,
                {
                    "where": [
                        477,
                        "codex_bool_exp!"
                    ]
                }
            ],
            "delete_codex_by_pk": [
                468,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "token_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "delete_codex_update_request": [
                512,
                {
                    "where": [
                        505,
                        "codex_update_request_bool_exp!"
                    ]
                }
            ],
            "delete_codex_update_request_by_pk": [
                498,
                {
                    "codex_id": [
                        49,
                        "String!"
                    ],
                    "token_id": [
                        49,
                        "String!"
                    ],
                    "token_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "delete_collaboration": [
                539,
                {
                    "where": [
                        532,
                        "collaboration_bool_exp!"
                    ]
                }
            ],
            "delete_collaboration_by_pk": [
                525,
                {
                    "collaboration_contract_id": [
                        49,
                        "String!"
                    ],
                    "collaborator_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_collection_offer": [
                566,
                {
                    "where": [
                        558,
                        "collection_offer_bool_exp!"
                    ]
                }
            ],
            "delete_collection_offer_by_pk": [
                549,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_generative_token": [
                614,
                {
                    "where": [
                        604,
                        "generative_token_bool_exp!"
                    ]
                }
            ],
            "delete_generative_token_by_pk": [
                593,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_gentk_assign": [
                653,
                {
                    "where": [
                        647,
                        "gentk_assign_bool_exp!"
                    ]
                }
            ],
            "delete_gentk_assign_by_pk": [
                643,
                {
                    "gentk_id": [
                        49,
                        "String!"
                    ],
                    "gentk_issuer_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "delete_ipfs_cid": [
                681,
                {
                    "where": [
                        676,
                        "ipfs_cid_bool_exp!"
                    ]
                }
            ],
            "delete_ipfs_cid_by_pk": [
                673,
                {
                    "cid": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_listing": [
                713,
                {
                    "where": [
                        705,
                        "listing_bool_exp!"
                    ]
                }
            ],
            "delete_listing_by_pk": [
                696,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_market_stats": [
                789,
                {
                    "where": [
                        742,
                        "market_stats_bool_exp!"
                    ]
                }
            ],
            "delete_market_stats_by_pk": [
                738,
                {
                    "token_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_market_stats_history": [
                761,
                {
                    "where": [
                        753,
                        "market_stats_history_bool_exp!"
                    ]
                }
            ],
            "delete_market_stats_history_by_pk": [
                744,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_media_image": [
                817,
                {
                    "where": [
                        811,
                        "media_image_bool_exp!"
                    ]
                }
            ],
            "delete_media_image_by_pk": [
                807,
                {
                    "cid": [
                        466,
                        "bpchar!"
                    ]
                }
            ],
            "delete_mint_ticket": [
                852,
                {
                    "where": [
                        844,
                        "mint_ticket_bool_exp!"
                    ]
                }
            ],
            "delete_mint_ticket_by_pk": [
                835,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_mint_ticket_settings": [
                875,
                {
                    "where": [
                        867,
                        "mint_ticket_settings_bool_exp!"
                    ]
                }
            ],
            "delete_mint_ticket_settings_by_pk": [
                858,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_moderation_reason": [
                925,
                {
                    "where": [
                        920,
                        "moderation_reason_bool_exp!"
                    ]
                }
            ],
            "delete_moderation_reason_by_pk": [
                917,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_objkt": [
                967,
                {
                    "where": [
                        959,
                        "objkt_bool_exp!"
                    ]
                }
            ],
            "delete_objkt_by_pk": [
                938,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "issuer_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "delete_offer": [
                1019,
                {
                    "where": [
                        1011,
                        "offer_bool_exp!"
                    ]
                }
            ],
            "delete_offer_by_pk": [
                1002,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_pricing_dutch_auction": [
                1061,
                {
                    "where": [
                        1053,
                        "pricing_dutch_auction_bool_exp!"
                    ]
                }
            ],
            "delete_pricing_dutch_auction_by_pk": [
                1044,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_pricing_fixed": [
                1102,
                {
                    "where": [
                        1094,
                        "pricing_fixed_bool_exp!"
                    ]
                }
            ],
            "delete_pricing_fixed_by_pk": [
                1085,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_redeemable": [
                1143,
                {
                    "where": [
                        1135,
                        "redeemable_bool_exp!"
                    ]
                }
            ],
            "delete_redeemable_by_pk": [
                1126,
                {
                    "address": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_redemption": [
                1185,
                {
                    "where": [
                        1177,
                        "redemption_bool_exp!"
                    ]
                }
            ],
            "delete_redemption_by_pk": [
                1168,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_report": [
                1223,
                {
                    "where": [
                        1216,
                        "report_bool_exp!"
                    ]
                }
            ],
            "delete_report_by_pk": [
                1209,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "delete_reserve": [
                1254,
                {
                    "where": [
                        1243,
                        "reserve_bool_exp!"
                    ]
                }
            ],
            "delete_reserve_by_pk": [
                1233,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_split": [
                1298,
                {
                    "where": [
                        1290,
                        "split_bool_exp!"
                    ]
                }
            ],
            "delete_split_by_pk": [
                1281,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_transaction": [
                1341,
                {
                    "where": [
                        1333,
                        "transaction_bool_exp!"
                    ]
                }
            ],
            "delete_transaction_by_pk": [
                1324,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "delete_user": [
                1387,
                {
                    "where": [
                        1375,
                        "user_bool_exp!"
                    ]
                }
            ],
            "delete_user_by_pk": [
                1367,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "delete_user_stats": [
                1405,
                {
                    "where": [
                        1399,
                        "user_stats_bool_exp!"
                    ]
                }
            ],
            "delete_user_stats_by_pk": [
                1395,
                {
                    "user_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "insert_Account": [
                10,
                {
                    "objects": [
                        7,
                        "[Account_insert_input!]!"
                    ],
                    "on_conflict": [
                        12
                    ]
                }
            ],
            "insert_Account_one": [
                0,
                {
                    "object": [
                        7,
                        "Account_insert_input!"
                    ],
                    "on_conflict": [
                        12
                    ]
                }
            ],
            "insert_Profile": [
                37,
                {
                    "objects": [
                        34,
                        "[Profile_insert_input!]!"
                    ],
                    "on_conflict": [
                        39
                    ]
                }
            ],
            "insert_Profile_one": [
                29,
                {
                    "object": [
                        34,
                        "Profile_insert_input!"
                    ],
                    "on_conflict": [
                        39
                    ]
                }
            ],
            "insert_Wallet": [
                65,
                {
                    "objects": [
                        60,
                        "[Wallet_insert_input!]!"
                    ],
                    "on_conflict": [
                        66
                    ]
                }
            ],
            "insert_Wallet_one": [
                51,
                {
                    "object": [
                        60,
                        "Wallet_insert_input!"
                    ],
                    "on_conflict": [
                        66
                    ]
                }
            ],
            "insert_Whitelist": [
                124,
                {
                    "objects": [
                        121,
                        "[Whitelist_insert_input!]!"
                    ],
                    "on_conflict": [
                        126
                    ]
                }
            ],
            "insert_WhitelistEntries": [
                93,
                {
                    "objects": [
                        88,
                        "[WhitelistEntries_insert_input!]!"
                    ],
                    "on_conflict": [
                        94
                    ]
                }
            ],
            "insert_WhitelistEntries_one": [
                76,
                {
                    "object": [
                        88,
                        "WhitelistEntries_insert_input!"
                    ],
                    "on_conflict": [
                        94
                    ]
                }
            ],
            "insert_Whitelist_one": [
                75,
                {
                    "object": [
                        121,
                        "Whitelist_insert_input!"
                    ],
                    "on_conflict": [
                        126
                    ]
                }
            ],
            "insert_action": [
                164,
                {
                    "objects": [
                        159,
                        "[action_insert_input!]!"
                    ],
                    "on_conflict": [
                        165
                    ]
                }
            ],
            "insert_action_one": [
                143,
                {
                    "object": [
                        159,
                        "action_insert_input!"
                    ],
                    "on_conflict": [
                        165
                    ]
                }
            ],
            "insert_article": [
                280,
                {
                    "objects": [
                        234,
                        "[article_insert_input!]!"
                    ],
                    "on_conflict": [
                        282
                    ]
                }
            ],
            "insert_article_generative_token": [
                216,
                {
                    "objects": [
                        213,
                        "[article_generative_token_insert_input!]!"
                    ],
                    "on_conflict": [
                        217
                    ]
                }
            ],
            "insert_article_generative_token_one": [
                206,
                {
                    "object": [
                        213,
                        "article_generative_token_insert_input!"
                    ],
                    "on_conflict": [
                        217
                    ]
                }
            ],
            "insert_article_ledger": [
                252,
                {
                    "objects": [
                        247,
                        "[article_ledger_insert_input!]!"
                    ],
                    "on_conflict": [
                        253
                    ]
                }
            ],
            "insert_article_ledger_one": [
                235,
                {
                    "object": [
                        247,
                        "article_ledger_insert_input!"
                    ],
                    "on_conflict": [
                        253
                    ]
                }
            ],
            "insert_article_one": [
                191,
                {
                    "object": [
                        234,
                        "article_insert_input!"
                    ],
                    "on_conflict": [
                        282
                    ]
                }
            ],
            "insert_article_revision": [
                302,
                {
                    "objects": [
                        297,
                        "[article_revision_insert_input!]!"
                    ],
                    "on_conflict": [
                        303
                    ]
                }
            ],
            "insert_article_revision_one": [
                285,
                {
                    "object": [
                        297,
                        "article_revision_insert_input!"
                    ],
                    "on_conflict": [
                        303
                    ]
                }
            ],
            "insert_auction": [
                439,
                {
                    "objects": [
                        434,
                        "[auction_insert_input!]!"
                    ],
                    "on_conflict": [
                        441
                    ]
                }
            ],
            "insert_auction_bid": [
                374,
                {
                    "objects": [
                        369,
                        "[auction_bid_insert_input!]!"
                    ],
                    "on_conflict": [
                        375
                    ]
                }
            ],
            "insert_auction_bid_one": [
                357,
                {
                    "object": [
                        369,
                        "auction_bid_insert_input!"
                    ],
                    "on_conflict": [
                        375
                    ]
                }
            ],
            "insert_auction_bid_table": [
                404,
                {
                    "objects": [
                        401,
                        "[auction_bid_table_insert_input!]!"
                    ],
                    "on_conflict": [
                        406
                    ]
                }
            ],
            "insert_auction_bid_table_one": [
                390,
                {
                    "object": [
                        401,
                        "auction_bid_table_insert_input!"
                    ],
                    "on_conflict": [
                        406
                    ]
                }
            ],
            "insert_auction_one": [
                348,
                {
                    "object": [
                        434,
                        "auction_insert_input!"
                    ],
                    "on_conflict": [
                        441
                    ]
                }
            ],
            "insert_codex": [
                484,
                {
                    "objects": [
                        479,
                        "[codex_insert_input!]!"
                    ],
                    "on_conflict": [
                        486
                    ]
                }
            ],
            "insert_codex_one": [
                468,
                {
                    "object": [
                        479,
                        "codex_insert_input!"
                    ],
                    "on_conflict": [
                        486
                    ]
                }
            ],
            "insert_codex_update_request": [
                512,
                {
                    "objects": [
                        507,
                        "[codex_update_request_insert_input!]!"
                    ],
                    "on_conflict": [
                        513
                    ]
                }
            ],
            "insert_codex_update_request_one": [
                498,
                {
                    "object": [
                        507,
                        "codex_update_request_insert_input!"
                    ],
                    "on_conflict": [
                        513
                    ]
                }
            ],
            "insert_collaboration": [
                539,
                {
                    "objects": [
                        534,
                        "[collaboration_insert_input!]!"
                    ],
                    "on_conflict": [
                        540
                    ]
                }
            ],
            "insert_collaboration_one": [
                525,
                {
                    "object": [
                        534,
                        "collaboration_insert_input!"
                    ],
                    "on_conflict": [
                        540
                    ]
                }
            ],
            "insert_collection_offer": [
                566,
                {
                    "objects": [
                        561,
                        "[collection_offer_insert_input!]!"
                    ],
                    "on_conflict": [
                        567
                    ]
                }
            ],
            "insert_collection_offer_one": [
                549,
                {
                    "object": [
                        561,
                        "collection_offer_insert_input!"
                    ],
                    "on_conflict": [
                        567
                    ]
                }
            ],
            "insert_generative_token": [
                614,
                {
                    "objects": [
                        609,
                        "[generative_token_insert_input!]!"
                    ],
                    "on_conflict": [
                        616
                    ]
                }
            ],
            "insert_generative_token_one": [
                593,
                {
                    "object": [
                        609,
                        "generative_token_insert_input!"
                    ],
                    "on_conflict": [
                        616
                    ]
                }
            ],
            "insert_gentk_assign": [
                653,
                {
                    "objects": [
                        650,
                        "[gentk_assign_insert_input!]!"
                    ],
                    "on_conflict": [
                        655
                    ]
                }
            ],
            "insert_gentk_assign_one": [
                643,
                {
                    "object": [
                        650,
                        "gentk_assign_insert_input!"
                    ],
                    "on_conflict": [
                        655
                    ]
                }
            ],
            "insert_ipfs_cid": [
                681,
                {
                    "objects": [
                        678,
                        "[ipfs_cid_insert_input!]!"
                    ],
                    "on_conflict": [
                        682
                    ]
                }
            ],
            "insert_ipfs_cid_one": [
                673,
                {
                    "object": [
                        678,
                        "ipfs_cid_insert_input!"
                    ],
                    "on_conflict": [
                        682
                    ]
                }
            ],
            "insert_listing": [
                713,
                {
                    "objects": [
                        708,
                        "[listing_insert_input!]!"
                    ],
                    "on_conflict": [
                        715
                    ]
                }
            ],
            "insert_listing_one": [
                696,
                {
                    "object": [
                        708,
                        "listing_insert_input!"
                    ],
                    "on_conflict": [
                        715
                    ]
                }
            ],
            "insert_market_stats": [
                789,
                {
                    "objects": [
                        786,
                        "[market_stats_insert_input!]!"
                    ],
                    "on_conflict": [
                        791
                    ]
                }
            ],
            "insert_market_stats_history": [
                761,
                {
                    "objects": [
                        756,
                        "[market_stats_history_insert_input!]!"
                    ],
                    "on_conflict": [
                        762
                    ]
                }
            ],
            "insert_market_stats_history_one": [
                744,
                {
                    "object": [
                        756,
                        "market_stats_history_insert_input!"
                    ],
                    "on_conflict": [
                        762
                    ]
                }
            ],
            "insert_market_stats_one": [
                738,
                {
                    "object": [
                        786,
                        "market_stats_insert_input!"
                    ],
                    "on_conflict": [
                        791
                    ]
                }
            ],
            "insert_media_image": [
                817,
                {
                    "objects": [
                        814,
                        "[media_image_insert_input!]!"
                    ],
                    "on_conflict": [
                        819
                    ]
                }
            ],
            "insert_media_image_one": [
                807,
                {
                    "object": [
                        814,
                        "media_image_insert_input!"
                    ],
                    "on_conflict": [
                        819
                    ]
                }
            ],
            "insert_mint_ticket": [
                852,
                {
                    "objects": [
                        847,
                        "[mint_ticket_insert_input!]!"
                    ],
                    "on_conflict": [
                        853
                    ]
                }
            ],
            "insert_mint_ticket_one": [
                835,
                {
                    "object": [
                        847,
                        "mint_ticket_insert_input!"
                    ],
                    "on_conflict": [
                        853
                    ]
                }
            ],
            "insert_mint_ticket_settings": [
                875,
                {
                    "objects": [
                        870,
                        "[mint_ticket_settings_insert_input!]!"
                    ],
                    "on_conflict": [
                        876
                    ]
                }
            ],
            "insert_mint_ticket_settings_one": [
                858,
                {
                    "object": [
                        870,
                        "mint_ticket_settings_insert_input!"
                    ],
                    "on_conflict": [
                        876
                    ]
                }
            ],
            "insert_moderation_reason": [
                925,
                {
                    "objects": [
                        922,
                        "[moderation_reason_insert_input!]!"
                    ],
                    "on_conflict": [
                        927
                    ]
                }
            ],
            "insert_moderation_reason_one": [
                917,
                {
                    "object": [
                        922,
                        "moderation_reason_insert_input!"
                    ],
                    "on_conflict": [
                        927
                    ]
                }
            ],
            "insert_objkt": [
                967,
                {
                    "objects": [
                        962,
                        "[objkt_insert_input!]!"
                    ],
                    "on_conflict": [
                        969
                    ]
                }
            ],
            "insert_objkt_one": [
                938,
                {
                    "object": [
                        962,
                        "objkt_insert_input!"
                    ],
                    "on_conflict": [
                        969
                    ]
                }
            ],
            "insert_offer": [
                1019,
                {
                    "objects": [
                        1014,
                        "[offer_insert_input!]!"
                    ],
                    "on_conflict": [
                        1020
                    ]
                }
            ],
            "insert_offer_one": [
                1002,
                {
                    "object": [
                        1014,
                        "offer_insert_input!"
                    ],
                    "on_conflict": [
                        1020
                    ]
                }
            ],
            "insert_pricing_dutch_auction": [
                1061,
                {
                    "objects": [
                        1056,
                        "[pricing_dutch_auction_insert_input!]!"
                    ],
                    "on_conflict": [
                        1062
                    ]
                }
            ],
            "insert_pricing_dutch_auction_one": [
                1044,
                {
                    "object": [
                        1056,
                        "pricing_dutch_auction_insert_input!"
                    ],
                    "on_conflict": [
                        1062
                    ]
                }
            ],
            "insert_pricing_fixed": [
                1102,
                {
                    "objects": [
                        1097,
                        "[pricing_fixed_insert_input!]!"
                    ],
                    "on_conflict": [
                        1103
                    ]
                }
            ],
            "insert_pricing_fixed_one": [
                1085,
                {
                    "object": [
                        1097,
                        "pricing_fixed_insert_input!"
                    ],
                    "on_conflict": [
                        1103
                    ]
                }
            ],
            "insert_redeemable": [
                1143,
                {
                    "objects": [
                        1138,
                        "[redeemable_insert_input!]!"
                    ],
                    "on_conflict": [
                        1145
                    ]
                }
            ],
            "insert_redeemable_one": [
                1126,
                {
                    "object": [
                        1138,
                        "redeemable_insert_input!"
                    ],
                    "on_conflict": [
                        1145
                    ]
                }
            ],
            "insert_redemption": [
                1185,
                {
                    "objects": [
                        1180,
                        "[redemption_insert_input!]!"
                    ],
                    "on_conflict": [
                        1186
                    ]
                }
            ],
            "insert_redemption_one": [
                1168,
                {
                    "object": [
                        1180,
                        "redemption_insert_input!"
                    ],
                    "on_conflict": [
                        1186
                    ]
                }
            ],
            "insert_report": [
                1223,
                {
                    "objects": [
                        1218,
                        "[report_insert_input!]!"
                    ],
                    "on_conflict": [
                        1224
                    ]
                }
            ],
            "insert_report_one": [
                1209,
                {
                    "object": [
                        1218,
                        "report_insert_input!"
                    ],
                    "on_conflict": [
                        1224
                    ]
                }
            ],
            "insert_reserve": [
                1254,
                {
                    "objects": [
                        1249,
                        "[reserve_insert_input!]!"
                    ],
                    "on_conflict": [
                        1255
                    ]
                }
            ],
            "insert_reserve_one": [
                1233,
                {
                    "object": [
                        1249,
                        "reserve_insert_input!"
                    ],
                    "on_conflict": [
                        1255
                    ]
                }
            ],
            "insert_split": [
                1298,
                {
                    "objects": [
                        1293,
                        "[split_insert_input!]!"
                    ],
                    "on_conflict": [
                        1299
                    ]
                }
            ],
            "insert_split_one": [
                1281,
                {
                    "object": [
                        1293,
                        "split_insert_input!"
                    ],
                    "on_conflict": [
                        1299
                    ]
                }
            ],
            "insert_transaction": [
                1341,
                {
                    "objects": [
                        1336,
                        "[transaction_insert_input!]!"
                    ],
                    "on_conflict": [
                        1342
                    ]
                }
            ],
            "insert_transaction_one": [
                1324,
                {
                    "object": [
                        1336,
                        "transaction_insert_input!"
                    ],
                    "on_conflict": [
                        1342
                    ]
                }
            ],
            "insert_user": [
                1387,
                {
                    "objects": [
                        1382,
                        "[user_insert_input!]!"
                    ],
                    "on_conflict": [
                        1389
                    ]
                }
            ],
            "insert_user_one": [
                1367,
                {
                    "object": [
                        1382,
                        "user_insert_input!"
                    ],
                    "on_conflict": [
                        1389
                    ]
                }
            ],
            "insert_user_stats": [
                1405,
                {
                    "objects": [
                        1402,
                        "[user_stats_insert_input!]!"
                    ],
                    "on_conflict": [
                        1407
                    ]
                }
            ],
            "insert_user_stats_one": [
                1395,
                {
                    "object": [
                        1402,
                        "user_stats_insert_input!"
                    ],
                    "on_conflict": [
                        1407
                    ]
                }
            ],
            "set_whitelist": [
                48,
                {
                    "whitelist": [
                        693,
                        "jsonb!"
                    ]
                }
            ],
            "update_Account": [
                10,
                {
                    "_set": [
                        16
                    ],
                    "where": [
                        5,
                        "Account_bool_exp!"
                    ]
                }
            ],
            "update_Account_by_pk": [
                0,
                {
                    "_set": [
                        16
                    ],
                    "pk_columns": [
                        14,
                        "Account_pk_columns_input!"
                    ]
                }
            ],
            "update_Account_many": [
                10,
                {
                    "updates": [
                        20,
                        "[Account_updates!]!"
                    ]
                }
            ],
            "update_Profile": [
                37,
                {
                    "_set": [
                        43
                    ],
                    "where": [
                        32,
                        "Profile_bool_exp!"
                    ]
                }
            ],
            "update_Profile_by_pk": [
                29,
                {
                    "_set": [
                        43
                    ],
                    "pk_columns": [
                        41,
                        "Profile_pk_columns_input!"
                    ]
                }
            ],
            "update_Profile_many": [
                37,
                {
                    "updates": [
                        47,
                        "[Profile_updates!]!"
                    ]
                }
            ],
            "update_Wallet": [
                65,
                {
                    "_set": [
                        70
                    ],
                    "where": [
                        58,
                        "Wallet_bool_exp!"
                    ]
                }
            ],
            "update_Wallet_by_pk": [
                51,
                {
                    "_set": [
                        70
                    ],
                    "pk_columns": [
                        68,
                        "Wallet_pk_columns_input!"
                    ]
                }
            ],
            "update_Wallet_many": [
                65,
                {
                    "updates": [
                        74,
                        "[Wallet_updates!]!"
                    ]
                }
            ],
            "update_Whitelist": [
                124,
                {
                    "_set": [
                        130
                    ],
                    "where": [
                        119,
                        "Whitelist_bool_exp!"
                    ]
                }
            ],
            "update_WhitelistEntries": [
                93,
                {
                    "_inc": [
                        87
                    ],
                    "_set": [
                        98
                    ],
                    "where": [
                        85,
                        "WhitelistEntries_bool_exp!"
                    ]
                }
            ],
            "update_WhitelistEntries_by_pk": [
                76,
                {
                    "_inc": [
                        87
                    ],
                    "_set": [
                        98
                    ],
                    "pk_columns": [
                        96,
                        "WhitelistEntries_pk_columns_input!"
                    ]
                }
            ],
            "update_WhitelistEntries_many": [
                93,
                {
                    "updates": [
                        110,
                        "[WhitelistEntries_updates!]!"
                    ]
                }
            ],
            "update_Whitelist_by_pk": [
                75,
                {
                    "_set": [
                        130
                    ],
                    "pk_columns": [
                        128,
                        "Whitelist_pk_columns_input!"
                    ]
                }
            ],
            "update_Whitelist_many": [
                124,
                {
                    "updates": [
                        134,
                        "[Whitelist_updates!]!"
                    ]
                }
            ],
            "update_action": [
                164,
                {
                    "_append": [
                        149
                    ],
                    "_delete_at_path": [
                        155
                    ],
                    "_delete_elem": [
                        156
                    ],
                    "_delete_key": [
                        157
                    ],
                    "_inc": [
                        158
                    ],
                    "_prepend": [
                        168
                    ],
                    "_set": [
                        170
                    ],
                    "where": [
                        153,
                        "action_bool_exp!"
                    ]
                }
            ],
            "update_action_by_pk": [
                143,
                {
                    "_append": [
                        149
                    ],
                    "_delete_at_path": [
                        155
                    ],
                    "_delete_elem": [
                        156
                    ],
                    "_delete_key": [
                        157
                    ],
                    "_inc": [
                        158
                    ],
                    "_prepend": [
                        168
                    ],
                    "_set": [
                        170
                    ],
                    "pk_columns": [
                        167,
                        "action_pk_columns_input!"
                    ]
                }
            ],
            "update_action_many": [
                164,
                {
                    "updates": [
                        184,
                        "[action_updates!]!"
                    ]
                }
            ],
            "update_article": [
                280,
                {
                    "_inc": [
                        233
                    ],
                    "_set": [
                        329
                    ],
                    "where": [
                        202,
                        "article_bool_exp!"
                    ]
                }
            ],
            "update_article_by_pk": [
                191,
                {
                    "_inc": [
                        233
                    ],
                    "_set": [
                        329
                    ],
                    "pk_columns": [
                        284,
                        "article_pk_columns_input!"
                    ]
                }
            ],
            "update_article_generative_token": [
                216,
                {
                    "_inc": [
                        212
                    ],
                    "_set": [
                        221
                    ],
                    "where": [
                        210,
                        "article_generative_token_bool_exp!"
                    ]
                }
            ],
            "update_article_generative_token_by_pk": [
                206,
                {
                    "_inc": [
                        212
                    ],
                    "_set": [
                        221
                    ],
                    "pk_columns": [
                        219,
                        "article_generative_token_pk_columns_input!"
                    ]
                }
            ],
            "update_article_generative_token_many": [
                216,
                {
                    "updates": [
                        229,
                        "[article_generative_token_updates!]!"
                    ]
                }
            ],
            "update_article_ledger": [
                252,
                {
                    "_inc": [
                        246
                    ],
                    "_set": [
                        257
                    ],
                    "where": [
                        244,
                        "article_ledger_bool_exp!"
                    ]
                }
            ],
            "update_article_ledger_by_pk": [
                235,
                {
                    "_inc": [
                        246
                    ],
                    "_set": [
                        257
                    ],
                    "pk_columns": [
                        255,
                        "article_ledger_pk_columns_input!"
                    ]
                }
            ],
            "update_article_ledger_many": [
                252,
                {
                    "updates": [
                        269,
                        "[article_ledger_updates!]!"
                    ]
                }
            ],
            "update_article_many": [
                280,
                {
                    "updates": [
                        341,
                        "[article_updates!]!"
                    ]
                }
            ],
            "update_article_revision": [
                302,
                {
                    "_inc": [
                        296
                    ],
                    "_set": [
                        307
                    ],
                    "where": [
                        294,
                        "article_revision_bool_exp!"
                    ]
                }
            ],
            "update_article_revision_by_pk": [
                285,
                {
                    "_inc": [
                        296
                    ],
                    "_set": [
                        307
                    ],
                    "pk_columns": [
                        305,
                        "article_revision_pk_columns_input!"
                    ]
                }
            ],
            "update_article_revision_many": [
                302,
                {
                    "updates": [
                        319,
                        "[article_revision_updates!]!"
                    ]
                }
            ],
            "update_auction": [
                439,
                {
                    "_inc": [
                        433
                    ],
                    "_set": [
                        445
                    ],
                    "where": [
                        431,
                        "auction_bool_exp!"
                    ]
                }
            ],
            "update_auction_bid": [
                374,
                {
                    "_inc": [
                        368
                    ],
                    "_set": [
                        379
                    ],
                    "where": [
                        366,
                        "auction_bid_bool_exp!"
                    ]
                }
            ],
            "update_auction_bid_by_pk": [
                357,
                {
                    "_inc": [
                        368
                    ],
                    "_set": [
                        379
                    ],
                    "pk_columns": [
                        377,
                        "auction_bid_pk_columns_input!"
                    ]
                }
            ],
            "update_auction_bid_many": [
                374,
                {
                    "updates": [
                        424,
                        "[auction_bid_updates!]!"
                    ]
                }
            ],
            "update_auction_bid_table": [
                404,
                {
                    "_append": [
                        393
                    ],
                    "_delete_at_path": [
                        397
                    ],
                    "_delete_elem": [
                        398
                    ],
                    "_delete_key": [
                        399
                    ],
                    "_inc": [
                        400
                    ],
                    "_prepend": [
                        409
                    ],
                    "_set": [
                        411
                    ],
                    "where": [
                        395,
                        "auction_bid_table_bool_exp!"
                    ]
                }
            ],
            "update_auction_bid_table_by_pk": [
                390,
                {
                    "_append": [
                        393
                    ],
                    "_delete_at_path": [
                        397
                    ],
                    "_delete_elem": [
                        398
                    ],
                    "_delete_key": [
                        399
                    ],
                    "_inc": [
                        400
                    ],
                    "_prepend": [
                        409
                    ],
                    "_set": [
                        411
                    ],
                    "pk_columns": [
                        408,
                        "auction_bid_table_pk_columns_input!"
                    ]
                }
            ],
            "update_auction_bid_table_many": [
                404,
                {
                    "updates": [
                        419,
                        "[auction_bid_table_updates!]!"
                    ]
                }
            ],
            "update_auction_by_pk": [
                348,
                {
                    "_inc": [
                        433
                    ],
                    "_set": [
                        445
                    ],
                    "pk_columns": [
                        443,
                        "auction_pk_columns_input!"
                    ]
                }
            ],
            "update_auction_many": [
                439,
                {
                    "updates": [
                        457,
                        "[auction_updates!]!"
                    ]
                }
            ],
            "update_codex": [
                484,
                {
                    "_set": [
                        492
                    ],
                    "where": [
                        477,
                        "codex_bool_exp!"
                    ]
                }
            ],
            "update_codex_by_pk": [
                468,
                {
                    "_set": [
                        492
                    ],
                    "pk_columns": [
                        488,
                        "codex_pk_columns_input!"
                    ]
                }
            ],
            "update_codex_many": [
                484,
                {
                    "updates": [
                        524,
                        "[codex_updates!]!"
                    ]
                }
            ],
            "update_codex_update_request": [
                512,
                {
                    "_set": [
                        517
                    ],
                    "where": [
                        505,
                        "codex_update_request_bool_exp!"
                    ]
                }
            ],
            "update_codex_update_request_by_pk": [
                498,
                {
                    "_set": [
                        517
                    ],
                    "pk_columns": [
                        515,
                        "codex_update_request_pk_columns_input!"
                    ]
                }
            ],
            "update_codex_update_request_many": [
                512,
                {
                    "updates": [
                        523,
                        "[codex_update_request_updates!]!"
                    ]
                }
            ],
            "update_collaboration": [
                539,
                {
                    "_set": [
                        544
                    ],
                    "where": [
                        532,
                        "collaboration_bool_exp!"
                    ]
                }
            ],
            "update_collaboration_by_pk": [
                525,
                {
                    "_set": [
                        544
                    ],
                    "pk_columns": [
                        542,
                        "collaboration_pk_columns_input!"
                    ]
                }
            ],
            "update_collaboration_many": [
                539,
                {
                    "updates": [
                        548,
                        "[collaboration_updates!]!"
                    ]
                }
            ],
            "update_collection_offer": [
                566,
                {
                    "_inc": [
                        560
                    ],
                    "_set": [
                        571
                    ],
                    "where": [
                        558,
                        "collection_offer_bool_exp!"
                    ]
                }
            ],
            "update_collection_offer_by_pk": [
                549,
                {
                    "_inc": [
                        560
                    ],
                    "_set": [
                        571
                    ],
                    "pk_columns": [
                        569,
                        "collection_offer_pk_columns_input!"
                    ]
                }
            ],
            "update_collection_offer_many": [
                566,
                {
                    "updates": [
                        583,
                        "[collection_offer_updates!]!"
                    ]
                }
            ],
            "update_generative_token": [
                614,
                {
                    "_inc": [
                        608
                    ],
                    "_set": [
                        622
                    ],
                    "where": [
                        604,
                        "generative_token_bool_exp!"
                    ]
                }
            ],
            "update_generative_token_by_pk": [
                593,
                {
                    "_inc": [
                        608
                    ],
                    "_set": [
                        622
                    ],
                    "pk_columns": [
                        618,
                        "generative_token_pk_columns_input!"
                    ]
                }
            ],
            "update_generative_token_many": [
                614,
                {
                    "updates": [
                        634,
                        "[generative_token_updates!]!"
                    ]
                }
            ],
            "update_gentk_assign": [
                653,
                {
                    "_inc": [
                        649
                    ],
                    "_set": [
                        659
                    ],
                    "where": [
                        647,
                        "gentk_assign_bool_exp!"
                    ]
                }
            ],
            "update_gentk_assign_by_pk": [
                643,
                {
                    "_inc": [
                        649
                    ],
                    "_set": [
                        659
                    ],
                    "pk_columns": [
                        657,
                        "gentk_assign_pk_columns_input!"
                    ]
                }
            ],
            "update_gentk_assign_many": [
                653,
                {
                    "updates": [
                        669,
                        "[gentk_assign_updates!]!"
                    ]
                }
            ],
            "update_ipfs_cid": [
                681,
                {
                    "_set": [
                        686
                    ],
                    "where": [
                        676,
                        "ipfs_cid_bool_exp!"
                    ]
                }
            ],
            "update_ipfs_cid_by_pk": [
                673,
                {
                    "_set": [
                        686
                    ],
                    "pk_columns": [
                        684,
                        "ipfs_cid_pk_columns_input!"
                    ]
                }
            ],
            "update_ipfs_cid_many": [
                681,
                {
                    "updates": [
                        690,
                        "[ipfs_cid_updates!]!"
                    ]
                }
            ],
            "update_listing": [
                713,
                {
                    "_inc": [
                        707
                    ],
                    "_set": [
                        719
                    ],
                    "where": [
                        705,
                        "listing_bool_exp!"
                    ]
                }
            ],
            "update_listing_by_pk": [
                696,
                {
                    "_inc": [
                        707
                    ],
                    "_set": [
                        719
                    ],
                    "pk_columns": [
                        717,
                        "listing_pk_columns_input!"
                    ]
                }
            ],
            "update_listing_many": [
                713,
                {
                    "updates": [
                        731,
                        "[listing_updates!]!"
                    ]
                }
            ],
            "update_market_stats": [
                789,
                {
                    "_inc": [
                        785
                    ],
                    "_set": [
                        795
                    ],
                    "where": [
                        742,
                        "market_stats_bool_exp!"
                    ]
                }
            ],
            "update_market_stats_by_pk": [
                738,
                {
                    "_inc": [
                        785
                    ],
                    "_set": [
                        795
                    ],
                    "pk_columns": [
                        793,
                        "market_stats_pk_columns_input!"
                    ]
                }
            ],
            "update_market_stats_history": [
                761,
                {
                    "_inc": [
                        755
                    ],
                    "_set": [
                        766
                    ],
                    "where": [
                        753,
                        "market_stats_history_bool_exp!"
                    ]
                }
            ],
            "update_market_stats_history_by_pk": [
                744,
                {
                    "_inc": [
                        755
                    ],
                    "_set": [
                        766
                    ],
                    "pk_columns": [
                        764,
                        "market_stats_history_pk_columns_input!"
                    ]
                }
            ],
            "update_market_stats_history_many": [
                761,
                {
                    "updates": [
                        778,
                        "[market_stats_history_updates!]!"
                    ]
                }
            ],
            "update_market_stats_many": [
                789,
                {
                    "updates": [
                        803,
                        "[market_stats_updates!]!"
                    ]
                }
            ],
            "update_media_image": [
                817,
                {
                    "_inc": [
                        813
                    ],
                    "_set": [
                        823
                    ],
                    "where": [
                        811,
                        "media_image_bool_exp!"
                    ]
                }
            ],
            "update_media_image_by_pk": [
                807,
                {
                    "_inc": [
                        813
                    ],
                    "_set": [
                        823
                    ],
                    "pk_columns": [
                        821,
                        "media_image_pk_columns_input!"
                    ]
                }
            ],
            "update_media_image_many": [
                817,
                {
                    "updates": [
                        831,
                        "[media_image_updates!]!"
                    ]
                }
            ],
            "update_mint_ticket": [
                852,
                {
                    "_inc": [
                        846
                    ],
                    "_set": [
                        857
                    ],
                    "where": [
                        844,
                        "mint_ticket_bool_exp!"
                    ]
                }
            ],
            "update_mint_ticket_by_pk": [
                835,
                {
                    "_inc": [
                        846
                    ],
                    "_set": [
                        857
                    ],
                    "pk_columns": [
                        855,
                        "mint_ticket_pk_columns_input!"
                    ]
                }
            ],
            "update_mint_ticket_many": [
                852,
                {
                    "updates": [
                        910,
                        "[mint_ticket_updates!]!"
                    ]
                }
            ],
            "update_mint_ticket_settings": [
                875,
                {
                    "_inc": [
                        869
                    ],
                    "_set": [
                        880
                    ],
                    "where": [
                        867,
                        "mint_ticket_settings_bool_exp!"
                    ]
                }
            ],
            "update_mint_ticket_settings_by_pk": [
                858,
                {
                    "_inc": [
                        869
                    ],
                    "_set": [
                        880
                    ],
                    "pk_columns": [
                        878,
                        "mint_ticket_settings_pk_columns_input!"
                    ]
                }
            ],
            "update_mint_ticket_settings_many": [
                875,
                {
                    "updates": [
                        892,
                        "[mint_ticket_settings_updates!]!"
                    ]
                }
            ],
            "update_moderation_reason": [
                925,
                {
                    "_set": [
                        931
                    ],
                    "where": [
                        920,
                        "moderation_reason_bool_exp!"
                    ]
                }
            ],
            "update_moderation_reason_by_pk": [
                917,
                {
                    "_set": [
                        931
                    ],
                    "pk_columns": [
                        929,
                        "moderation_reason_pk_columns_input!"
                    ]
                }
            ],
            "update_moderation_reason_many": [
                925,
                {
                    "updates": [
                        935,
                        "[moderation_reason_updates!]!"
                    ]
                }
            ],
            "update_objkt": [
                967,
                {
                    "_inc": [
                        961
                    ],
                    "_set": [
                        983
                    ],
                    "where": [
                        959,
                        "objkt_bool_exp!"
                    ]
                }
            ],
            "update_objkt_by_pk": [
                938,
                {
                    "_inc": [
                        961
                    ],
                    "_set": [
                        983
                    ],
                    "pk_columns": [
                        971,
                        "objkt_pk_columns_input!"
                    ]
                }
            ],
            "update_objkt_many": [
                967,
                {
                    "updates": [
                        995,
                        "[objkt_updates!]!"
                    ]
                }
            ],
            "update_offer": [
                1019,
                {
                    "_inc": [
                        1013
                    ],
                    "_set": [
                        1024
                    ],
                    "where": [
                        1011,
                        "offer_bool_exp!"
                    ]
                }
            ],
            "update_offer_by_pk": [
                1002,
                {
                    "_inc": [
                        1013
                    ],
                    "_set": [
                        1024
                    ],
                    "pk_columns": [
                        1022,
                        "offer_pk_columns_input!"
                    ]
                }
            ],
            "update_offer_many": [
                1019,
                {
                    "updates": [
                        1036,
                        "[offer_updates!]!"
                    ]
                }
            ],
            "update_pricing_dutch_auction": [
                1061,
                {
                    "_inc": [
                        1055
                    ],
                    "_set": [
                        1066
                    ],
                    "where": [
                        1053,
                        "pricing_dutch_auction_bool_exp!"
                    ]
                }
            ],
            "update_pricing_dutch_auction_by_pk": [
                1044,
                {
                    "_inc": [
                        1055
                    ],
                    "_set": [
                        1066
                    ],
                    "pk_columns": [
                        1064,
                        "pricing_dutch_auction_pk_columns_input!"
                    ]
                }
            ],
            "update_pricing_dutch_auction_many": [
                1061,
                {
                    "updates": [
                        1078,
                        "[pricing_dutch_auction_updates!]!"
                    ]
                }
            ],
            "update_pricing_fixed": [
                1102,
                {
                    "_inc": [
                        1096
                    ],
                    "_set": [
                        1107
                    ],
                    "where": [
                        1094,
                        "pricing_fixed_bool_exp!"
                    ]
                }
            ],
            "update_pricing_fixed_by_pk": [
                1085,
                {
                    "_inc": [
                        1096
                    ],
                    "_set": [
                        1107
                    ],
                    "pk_columns": [
                        1105,
                        "pricing_fixed_pk_columns_input!"
                    ]
                }
            ],
            "update_pricing_fixed_many": [
                1102,
                {
                    "updates": [
                        1119,
                        "[pricing_fixed_updates!]!"
                    ]
                }
            ],
            "update_redeemable": [
                1143,
                {
                    "_inc": [
                        1137
                    ],
                    "_set": [
                        1149
                    ],
                    "where": [
                        1135,
                        "redeemable_bool_exp!"
                    ]
                }
            ],
            "update_redeemable_by_pk": [
                1126,
                {
                    "_inc": [
                        1137
                    ],
                    "_set": [
                        1149
                    ],
                    "pk_columns": [
                        1147,
                        "redeemable_pk_columns_input!"
                    ]
                }
            ],
            "update_redeemable_many": [
                1143,
                {
                    "updates": [
                        1161,
                        "[redeemable_updates!]!"
                    ]
                }
            ],
            "update_redemption": [
                1185,
                {
                    "_inc": [
                        1179
                    ],
                    "_set": [
                        1190
                    ],
                    "where": [
                        1177,
                        "redemption_bool_exp!"
                    ]
                }
            ],
            "update_redemption_by_pk": [
                1168,
                {
                    "_inc": [
                        1179
                    ],
                    "_set": [
                        1190
                    ],
                    "pk_columns": [
                        1188,
                        "redemption_pk_columns_input!"
                    ]
                }
            ],
            "update_redemption_many": [
                1185,
                {
                    "updates": [
                        1202,
                        "[redemption_updates!]!"
                    ]
                }
            ],
            "update_report": [
                1223,
                {
                    "_set": [
                        1228
                    ],
                    "where": [
                        1216,
                        "report_bool_exp!"
                    ]
                }
            ],
            "update_report_by_pk": [
                1209,
                {
                    "_set": [
                        1228
                    ],
                    "pk_columns": [
                        1226,
                        "report_pk_columns_input!"
                    ]
                }
            ],
            "update_report_many": [
                1223,
                {
                    "updates": [
                        1232,
                        "[report_updates!]!"
                    ]
                }
            ],
            "update_reserve": [
                1254,
                {
                    "_append": [
                        1239
                    ],
                    "_delete_at_path": [
                        1245
                    ],
                    "_delete_elem": [
                        1246
                    ],
                    "_delete_key": [
                        1247
                    ],
                    "_inc": [
                        1248
                    ],
                    "_prepend": [
                        1258
                    ],
                    "_set": [
                        1260
                    ],
                    "where": [
                        1243,
                        "reserve_bool_exp!"
                    ]
                }
            ],
            "update_reserve_by_pk": [
                1233,
                {
                    "_append": [
                        1239
                    ],
                    "_delete_at_path": [
                        1245
                    ],
                    "_delete_elem": [
                        1246
                    ],
                    "_delete_key": [
                        1247
                    ],
                    "_inc": [
                        1248
                    ],
                    "_prepend": [
                        1258
                    ],
                    "_set": [
                        1260
                    ],
                    "pk_columns": [
                        1257,
                        "reserve_pk_columns_input!"
                    ]
                }
            ],
            "update_reserve_many": [
                1254,
                {
                    "updates": [
                        1272,
                        "[reserve_updates!]!"
                    ]
                }
            ],
            "update_split": [
                1298,
                {
                    "_inc": [
                        1292
                    ],
                    "_set": [
                        1303
                    ],
                    "where": [
                        1290,
                        "split_bool_exp!"
                    ]
                }
            ],
            "update_split_by_pk": [
                1281,
                {
                    "_inc": [
                        1292
                    ],
                    "_set": [
                        1303
                    ],
                    "pk_columns": [
                        1301,
                        "split_pk_columns_input!"
                    ]
                }
            ],
            "update_split_many": [
                1298,
                {
                    "updates": [
                        1315,
                        "[split_updates!]!"
                    ]
                }
            ],
            "update_transaction": [
                1341,
                {
                    "_inc": [
                        1335
                    ],
                    "_set": [
                        1346
                    ],
                    "where": [
                        1333,
                        "transaction_bool_exp!"
                    ]
                }
            ],
            "update_transaction_by_pk": [
                1324,
                {
                    "_inc": [
                        1335
                    ],
                    "_set": [
                        1346
                    ],
                    "pk_columns": [
                        1344,
                        "transaction_pk_columns_input!"
                    ]
                }
            ],
            "update_transaction_many": [
                1341,
                {
                    "updates": [
                        1360,
                        "[transaction_updates!]!"
                    ]
                }
            ],
            "update_user": [
                1387,
                {
                    "_append": [
                        1373
                    ],
                    "_delete_at_path": [
                        1377
                    ],
                    "_delete_elem": [
                        1378
                    ],
                    "_delete_key": [
                        1379
                    ],
                    "_prepend": [
                        1392
                    ],
                    "_set": [
                        1394
                    ],
                    "where": [
                        1375,
                        "user_bool_exp!"
                    ]
                }
            ],
            "update_user_by_pk": [
                1367,
                {
                    "_append": [
                        1373
                    ],
                    "_delete_at_path": [
                        1377
                    ],
                    "_delete_elem": [
                        1378
                    ],
                    "_delete_key": [
                        1379
                    ],
                    "_prepend": [
                        1392
                    ],
                    "_set": [
                        1394
                    ],
                    "pk_columns": [
                        1391,
                        "user_pk_columns_input!"
                    ]
                }
            ],
            "update_user_many": [
                1387,
                {
                    "updates": [
                        1428,
                        "[user_updates!]!"
                    ]
                }
            ],
            "update_user_stats": [
                1405,
                {
                    "_inc": [
                        1401
                    ],
                    "_set": [
                        1411
                    ],
                    "where": [
                        1399,
                        "user_stats_bool_exp!"
                    ]
                }
            ],
            "update_user_stats_by_pk": [
                1395,
                {
                    "_inc": [
                        1401
                    ],
                    "_set": [
                        1411
                    ],
                    "pk_columns": [
                        1409,
                        "user_stats_pk_columns_input!"
                    ]
                }
            ],
            "update_user_stats_many": [
                1405,
                {
                    "updates": [
                        1419,
                        "[user_stats_updates!]!"
                    ]
                }
            ],
            "__typename": [
                49
            ]
        },
        "Subscription": {
            "Account": [
                0,
                {
                    "distinct_on": [
                        15,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        13,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        5
                    ]
                }
            ],
            "Account_aggregate": [
                3,
                {
                    "distinct_on": [
                        15,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        13,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        5
                    ]
                }
            ],
            "Account_by_pk": [
                0,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "Account_stream": [
                0,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        17,
                        "[Account_stream_cursor_input]!"
                    ],
                    "where": [
                        5
                    ]
                }
            ],
            "Profile": [
                29,
                {
                    "distinct_on": [
                        42,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        40,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        32
                    ]
                }
            ],
            "Profile_aggregate": [
                30,
                {
                    "distinct_on": [
                        42,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        40,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        32
                    ]
                }
            ],
            "Profile_by_pk": [
                29,
                {
                    "accountId": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "Profile_stream": [
                29,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        44,
                        "[Profile_stream_cursor_input]!"
                    ],
                    "where": [
                        32
                    ]
                }
            ],
            "Wallet": [
                51,
                {
                    "distinct_on": [
                        69,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        67,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        58
                    ]
                }
            ],
            "Wallet_aggregate": [
                52,
                {
                    "distinct_on": [
                        69,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        67,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        58
                    ]
                }
            ],
            "Wallet_by_pk": [
                51,
                {
                    "address": [
                        49,
                        "String!"
                    ]
                }
            ],
            "Wallet_stream": [
                51,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        71,
                        "[Wallet_stream_cursor_input]!"
                    ],
                    "where": [
                        58
                    ]
                }
            ],
            "Whitelist": [
                75,
                {
                    "distinct_on": [
                        129,
                        "[Whitelist_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        127,
                        "[Whitelist_order_by!]"
                    ],
                    "where": [
                        119
                    ]
                }
            ],
            "WhitelistEntries": [
                76,
                {
                    "distinct_on": [
                        97,
                        "[WhitelistEntries_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        95,
                        "[WhitelistEntries_order_by!]"
                    ],
                    "where": [
                        85
                    ]
                }
            ],
            "WhitelistEntries_aggregate": [
                77,
                {
                    "distinct_on": [
                        97,
                        "[WhitelistEntries_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        95,
                        "[WhitelistEntries_order_by!]"
                    ],
                    "where": [
                        85
                    ]
                }
            ],
            "WhitelistEntries_by_pk": [
                76,
                {
                    "merkleRoot": [
                        49,
                        "String!"
                    ],
                    "whitelistIndex": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "WhitelistEntries_stream": [
                76,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        105,
                        "[WhitelistEntries_stream_cursor_input]!"
                    ],
                    "where": [
                        85
                    ]
                }
            ],
            "Whitelist_aggregate": [
                117,
                {
                    "distinct_on": [
                        129,
                        "[Whitelist_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        127,
                        "[Whitelist_order_by!]"
                    ],
                    "where": [
                        119
                    ]
                }
            ],
            "Whitelist_by_pk": [
                75,
                {
                    "merkleRoot": [
                        49,
                        "String!"
                    ]
                }
            ],
            "Whitelist_stream": [
                75,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        131,
                        "[Whitelist_stream_cursor_input]!"
                    ],
                    "where": [
                        119
                    ]
                }
            ],
            "action": [
                143,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "action_aggregate": [
                144,
                {
                    "distinct_on": [
                        169,
                        "[action_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        166,
                        "[action_order_by!]"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "action_by_pk": [
                143,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "action_stream": [
                143,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        177,
                        "[action_stream_cursor_input]!"
                    ],
                    "where": [
                        153
                    ]
                }
            ],
            "article": [
                191,
                {
                    "distinct_on": [
                        326,
                        "[article_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        283,
                        "[article_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "article_aggregate": [
                192,
                {
                    "distinct_on": [
                        326,
                        "[article_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        283,
                        "[article_order_by!]"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "article_by_pk": [
                191,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "article_generative_token": [
                206,
                {
                    "distinct_on": [
                        220,
                        "[article_generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        218,
                        "[article_generative_token_order_by!]"
                    ],
                    "where": [
                        210
                    ]
                }
            ],
            "article_generative_token_aggregate": [
                207,
                {
                    "distinct_on": [
                        220,
                        "[article_generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        218,
                        "[article_generative_token_order_by!]"
                    ],
                    "where": [
                        210
                    ]
                }
            ],
            "article_generative_token_by_pk": [
                206,
                {
                    "article_id": [
                        27,
                        "Int!"
                    ],
                    "generative_token_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "article_generative_token_stream": [
                206,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        225,
                        "[article_generative_token_stream_cursor_input]!"
                    ],
                    "where": [
                        210
                    ]
                }
            ],
            "article_ledger": [
                235,
                {
                    "distinct_on": [
                        256,
                        "[article_ledger_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        254,
                        "[article_ledger_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "article_ledger_aggregate": [
                236,
                {
                    "distinct_on": [
                        256,
                        "[article_ledger_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        254,
                        "[article_ledger_order_by!]"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "article_ledger_by_pk": [
                235,
                {
                    "article_id": [
                        27,
                        "Int!"
                    ],
                    "owner_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "article_ledger_stream": [
                235,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        264,
                        "[article_ledger_stream_cursor_input]!"
                    ],
                    "where": [
                        244
                    ]
                }
            ],
            "article_revision": [
                285,
                {
                    "distinct_on": [
                        306,
                        "[article_revision_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        304,
                        "[article_revision_order_by!]"
                    ],
                    "where": [
                        294
                    ]
                }
            ],
            "article_revision_aggregate": [
                286,
                {
                    "distinct_on": [
                        306,
                        "[article_revision_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        304,
                        "[article_revision_order_by!]"
                    ],
                    "where": [
                        294
                    ]
                }
            ],
            "article_revision_by_pk": [
                285,
                {
                    "article_id": [
                        27,
                        "Int!"
                    ],
                    "iteration": [
                        1279,
                        "smallint!"
                    ]
                }
            ],
            "article_revision_stream": [
                285,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        314,
                        "[article_revision_stream_cursor_input]!"
                    ],
                    "where": [
                        294
                    ]
                }
            ],
            "article_stream": [
                191,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        336,
                        "[article_stream_cursor_input]!"
                    ],
                    "where": [
                        202
                    ]
                }
            ],
            "auction": [
                348,
                {
                    "distinct_on": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        442,
                        "[auction_order_by!]"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "auction_aggregate": [
                349,
                {
                    "distinct_on": [
                        444,
                        "[auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        442,
                        "[auction_order_by!]"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "auction_bid": [
                357,
                {
                    "distinct_on": [
                        378,
                        "[auction_bid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        376,
                        "[auction_bid_order_by!]"
                    ],
                    "where": [
                        366
                    ]
                }
            ],
            "auction_bid_aggregate": [
                358,
                {
                    "distinct_on": [
                        378,
                        "[auction_bid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        376,
                        "[auction_bid_order_by!]"
                    ],
                    "where": [
                        366
                    ]
                }
            ],
            "auction_bid_by_pk": [
                357,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "auction_bid_stream": [
                357,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        386,
                        "[auction_bid_stream_cursor_input]!"
                    ],
                    "where": [
                        366
                    ]
                }
            ],
            "auction_bid_table": [
                390,
                {
                    "distinct_on": [
                        410,
                        "[auction_bid_table_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        407,
                        "[auction_bid_table_order_by!]"
                    ],
                    "where": [
                        395
                    ]
                }
            ],
            "auction_bid_table_aggregate": [
                391,
                {
                    "distinct_on": [
                        410,
                        "[auction_bid_table_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        407,
                        "[auction_bid_table_order_by!]"
                    ],
                    "where": [
                        395
                    ]
                }
            ],
            "auction_bid_table_by_pk": [
                390,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "auction_bid_table_stream": [
                390,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        415,
                        "[auction_bid_table_stream_cursor_input]!"
                    ],
                    "where": [
                        395
                    ]
                }
            ],
            "auction_by_pk": [
                348,
                {
                    "id": [
                        27,
                        "Int!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "auction_stream": [
                348,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        452,
                        "[auction_stream_cursor_input]!"
                    ],
                    "where": [
                        431
                    ]
                }
            ],
            "codex": [
                468,
                {
                    "distinct_on": [
                        489,
                        "[codex_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        487,
                        "[codex_order_by!]"
                    ],
                    "where": [
                        477
                    ]
                }
            ],
            "codex_aggregate": [
                469,
                {
                    "distinct_on": [
                        489,
                        "[codex_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        487,
                        "[codex_order_by!]"
                    ],
                    "where": [
                        477
                    ]
                }
            ],
            "codex_by_pk": [
                468,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "token_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "codex_stream": [
                468,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        493,
                        "[codex_stream_cursor_input]!"
                    ],
                    "where": [
                        477
                    ]
                }
            ],
            "codex_update_request": [
                498,
                {
                    "distinct_on": [
                        516,
                        "[codex_update_request_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        514,
                        "[codex_update_request_order_by!]"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "codex_update_request_aggregate": [
                499,
                {
                    "distinct_on": [
                        516,
                        "[codex_update_request_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        514,
                        "[codex_update_request_order_by!]"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "codex_update_request_by_pk": [
                498,
                {
                    "codex_id": [
                        49,
                        "String!"
                    ],
                    "token_id": [
                        49,
                        "String!"
                    ],
                    "token_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "codex_update_request_stream": [
                498,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        520,
                        "[codex_update_request_stream_cursor_input]!"
                    ],
                    "where": [
                        505
                    ]
                }
            ],
            "collaboration": [
                525,
                {
                    "distinct_on": [
                        543,
                        "[collaboration_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        541,
                        "[collaboration_order_by!]"
                    ],
                    "where": [
                        532
                    ]
                }
            ],
            "collaboration_aggregate": [
                526,
                {
                    "distinct_on": [
                        543,
                        "[collaboration_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        541,
                        "[collaboration_order_by!]"
                    ],
                    "where": [
                        532
                    ]
                }
            ],
            "collaboration_by_pk": [
                525,
                {
                    "collaboration_contract_id": [
                        49,
                        "String!"
                    ],
                    "collaborator_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "collaboration_stream": [
                525,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        545,
                        "[collaboration_stream_cursor_input]!"
                    ],
                    "where": [
                        532
                    ]
                }
            ],
            "collection_offer": [
                549,
                {
                    "distinct_on": [
                        570,
                        "[collection_offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        568,
                        "[collection_offer_order_by!]"
                    ],
                    "where": [
                        558
                    ]
                }
            ],
            "collection_offer_aggregate": [
                550,
                {
                    "distinct_on": [
                        570,
                        "[collection_offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        568,
                        "[collection_offer_order_by!]"
                    ],
                    "where": [
                        558
                    ]
                }
            ],
            "collection_offer_by_pk": [
                549,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "collection_offer_stream": [
                549,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        578,
                        "[collection_offer_stream_cursor_input]!"
                    ],
                    "where": [
                        558
                    ]
                }
            ],
            "generative_token": [
                593,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "generative_token_aggregate": [
                594,
                {
                    "distinct_on": [
                        619,
                        "[generative_token_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        617,
                        "[generative_token_order_by!]"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "generative_token_by_pk": [
                593,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "generative_token_stream": [
                593,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        629,
                        "[generative_token_stream_cursor_input]!"
                    ],
                    "where": [
                        604
                    ]
                }
            ],
            "gentk_assign": [
                643,
                {
                    "distinct_on": [
                        658,
                        "[gentk_assign_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        656,
                        "[gentk_assign_order_by!]"
                    ],
                    "where": [
                        647
                    ]
                }
            ],
            "gentk_assign_aggregate": [
                644,
                {
                    "distinct_on": [
                        658,
                        "[gentk_assign_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        656,
                        "[gentk_assign_order_by!]"
                    ],
                    "where": [
                        647
                    ]
                }
            ],
            "gentk_assign_by_pk": [
                643,
                {
                    "gentk_id": [
                        49,
                        "String!"
                    ],
                    "gentk_issuer_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "gentk_assign_stream": [
                643,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        665,
                        "[gentk_assign_stream_cursor_input]!"
                    ],
                    "where": [
                        647
                    ]
                }
            ],
            "ipfs_cid": [
                673,
                {
                    "distinct_on": [
                        685,
                        "[ipfs_cid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        683,
                        "[ipfs_cid_order_by!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "ipfs_cid_aggregate": [
                674,
                {
                    "distinct_on": [
                        685,
                        "[ipfs_cid_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        683,
                        "[ipfs_cid_order_by!]"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "ipfs_cid_by_pk": [
                673,
                {
                    "cid": [
                        49,
                        "String!"
                    ]
                }
            ],
            "ipfs_cid_stream": [
                673,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        687,
                        "[ipfs_cid_stream_cursor_input]!"
                    ],
                    "where": [
                        676
                    ]
                }
            ],
            "listing": [
                696,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "listing_aggregate": [
                697,
                {
                    "distinct_on": [
                        718,
                        "[listing_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        716,
                        "[listing_order_by!]"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "listing_by_pk": [
                696,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "listing_stream": [
                696,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        726,
                        "[listing_stream_cursor_input]!"
                    ],
                    "where": [
                        705
                    ]
                }
            ],
            "market_stats": [
                738,
                {
                    "distinct_on": [
                        794,
                        "[market_stats_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        792,
                        "[market_stats_order_by!]"
                    ],
                    "where": [
                        742
                    ]
                }
            ],
            "market_stats_aggregate": [
                739,
                {
                    "distinct_on": [
                        794,
                        "[market_stats_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        792,
                        "[market_stats_order_by!]"
                    ],
                    "where": [
                        742
                    ]
                }
            ],
            "market_stats_by_pk": [
                738,
                {
                    "token_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "market_stats_history": [
                744,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "market_stats_history_aggregate": [
                745,
                {
                    "distinct_on": [
                        765,
                        "[market_stats_history_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        763,
                        "[market_stats_history_order_by!]"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "market_stats_history_by_pk": [
                744,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "market_stats_history_stream": [
                744,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        773,
                        "[market_stats_history_stream_cursor_input]!"
                    ],
                    "where": [
                        753
                    ]
                }
            ],
            "market_stats_stream": [
                738,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        799,
                        "[market_stats_stream_cursor_input]!"
                    ],
                    "where": [
                        742
                    ]
                }
            ],
            "media_image": [
                807,
                {
                    "distinct_on": [
                        822,
                        "[media_image_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        820,
                        "[media_image_order_by!]"
                    ],
                    "where": [
                        811
                    ]
                }
            ],
            "media_image_aggregate": [
                808,
                {
                    "distinct_on": [
                        822,
                        "[media_image_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        820,
                        "[media_image_order_by!]"
                    ],
                    "where": [
                        811
                    ]
                }
            ],
            "media_image_by_pk": [
                807,
                {
                    "cid": [
                        466,
                        "bpchar!"
                    ]
                }
            ],
            "media_image_stream": [
                807,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        827,
                        "[media_image_stream_cursor_input]!"
                    ],
                    "where": [
                        811
                    ]
                }
            ],
            "mint_ticket": [
                835,
                {
                    "distinct_on": [
                        856,
                        "[mint_ticket_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        854,
                        "[mint_ticket_order_by!]"
                    ],
                    "where": [
                        844
                    ]
                }
            ],
            "mint_ticket_aggregate": [
                836,
                {
                    "distinct_on": [
                        856,
                        "[mint_ticket_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        854,
                        "[mint_ticket_order_by!]"
                    ],
                    "where": [
                        844
                    ]
                }
            ],
            "mint_ticket_by_pk": [
                835,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "mint_ticket_settings": [
                858,
                {
                    "distinct_on": [
                        879,
                        "[mint_ticket_settings_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        877,
                        "[mint_ticket_settings_order_by!]"
                    ],
                    "where": [
                        867
                    ]
                }
            ],
            "mint_ticket_settings_aggregate": [
                859,
                {
                    "distinct_on": [
                        879,
                        "[mint_ticket_settings_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        877,
                        "[mint_ticket_settings_order_by!]"
                    ],
                    "where": [
                        867
                    ]
                }
            ],
            "mint_ticket_settings_by_pk": [
                858,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "mint_ticket_settings_stream": [
                858,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        887,
                        "[mint_ticket_settings_stream_cursor_input]!"
                    ],
                    "where": [
                        867
                    ]
                }
            ],
            "mint_ticket_stream": [
                835,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        905,
                        "[mint_ticket_stream_cursor_input]!"
                    ],
                    "where": [
                        844
                    ]
                }
            ],
            "moderation_reason": [
                917,
                {
                    "distinct_on": [
                        930,
                        "[moderation_reason_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        928,
                        "[moderation_reason_order_by!]"
                    ],
                    "where": [
                        920
                    ]
                }
            ],
            "moderation_reason_aggregate": [
                918,
                {
                    "distinct_on": [
                        930,
                        "[moderation_reason_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        928,
                        "[moderation_reason_order_by!]"
                    ],
                    "where": [
                        920
                    ]
                }
            ],
            "moderation_reason_by_pk": [
                917,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "moderation_reason_stream": [
                917,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        932,
                        "[moderation_reason_stream_cursor_input]!"
                    ],
                    "where": [
                        920
                    ]
                }
            ],
            "objkt": [
                938,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "objkt_aggregate": [
                939,
                {
                    "distinct_on": [
                        972,
                        "[objkt_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        970,
                        "[objkt_order_by!]"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "objkt_by_pk": [
                938,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "issuer_version": [
                        641,
                        "generative_token_version!"
                    ]
                }
            ],
            "objkt_stream": [
                938,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        990,
                        "[objkt_stream_cursor_input]!"
                    ],
                    "where": [
                        959
                    ]
                }
            ],
            "offer": [
                1002,
                {
                    "distinct_on": [
                        1023,
                        "[offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1021,
                        "[offer_order_by!]"
                    ],
                    "where": [
                        1011
                    ]
                }
            ],
            "offer_aggregate": [
                1003,
                {
                    "distinct_on": [
                        1023,
                        "[offer_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1021,
                        "[offer_order_by!]"
                    ],
                    "where": [
                        1011
                    ]
                }
            ],
            "offer_by_pk": [
                1002,
                {
                    "id": [
                        49,
                        "String!"
                    ],
                    "version": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "offer_stream": [
                1002,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1031,
                        "[offer_stream_cursor_input]!"
                    ],
                    "where": [
                        1011
                    ]
                }
            ],
            "pricing_dutch_auction": [
                1044,
                {
                    "distinct_on": [
                        1065,
                        "[pricing_dutch_auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1063,
                        "[pricing_dutch_auction_order_by!]"
                    ],
                    "where": [
                        1053
                    ]
                }
            ],
            "pricing_dutch_auction_aggregate": [
                1045,
                {
                    "distinct_on": [
                        1065,
                        "[pricing_dutch_auction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1063,
                        "[pricing_dutch_auction_order_by!]"
                    ],
                    "where": [
                        1053
                    ]
                }
            ],
            "pricing_dutch_auction_by_pk": [
                1044,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "pricing_dutch_auction_stream": [
                1044,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1073,
                        "[pricing_dutch_auction_stream_cursor_input]!"
                    ],
                    "where": [
                        1053
                    ]
                }
            ],
            "pricing_fixed": [
                1085,
                {
                    "distinct_on": [
                        1106,
                        "[pricing_fixed_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1104,
                        "[pricing_fixed_order_by!]"
                    ],
                    "where": [
                        1094
                    ]
                }
            ],
            "pricing_fixed_aggregate": [
                1086,
                {
                    "distinct_on": [
                        1106,
                        "[pricing_fixed_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1104,
                        "[pricing_fixed_order_by!]"
                    ],
                    "where": [
                        1094
                    ]
                }
            ],
            "pricing_fixed_by_pk": [
                1085,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "pricing_fixed_stream": [
                1085,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1114,
                        "[pricing_fixed_stream_cursor_input]!"
                    ],
                    "where": [
                        1094
                    ]
                }
            ],
            "redeemable": [
                1126,
                {
                    "distinct_on": [
                        1148,
                        "[redeemable_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1146,
                        "[redeemable_order_by!]"
                    ],
                    "where": [
                        1135
                    ]
                }
            ],
            "redeemable_aggregate": [
                1127,
                {
                    "distinct_on": [
                        1148,
                        "[redeemable_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1146,
                        "[redeemable_order_by!]"
                    ],
                    "where": [
                        1135
                    ]
                }
            ],
            "redeemable_by_pk": [
                1126,
                {
                    "address": [
                        49,
                        "String!"
                    ]
                }
            ],
            "redeemable_stream": [
                1126,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1156,
                        "[redeemable_stream_cursor_input]!"
                    ],
                    "where": [
                        1135
                    ]
                }
            ],
            "redemption": [
                1168,
                {
                    "distinct_on": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1187,
                        "[redemption_order_by!]"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "redemption_aggregate": [
                1169,
                {
                    "distinct_on": [
                        1189,
                        "[redemption_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1187,
                        "[redemption_order_by!]"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "redemption_by_pk": [
                1168,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "redemption_stream": [
                1168,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1197,
                        "[redemption_stream_cursor_input]!"
                    ],
                    "where": [
                        1177
                    ]
                }
            ],
            "report": [
                1209,
                {
                    "distinct_on": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1225,
                        "[report_order_by!]"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "report_aggregate": [
                1210,
                {
                    "distinct_on": [
                        1227,
                        "[report_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1225,
                        "[report_order_by!]"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "report_by_pk": [
                1209,
                {
                    "id": [
                        1429,
                        "uuid!"
                    ]
                }
            ],
            "report_stream": [
                1209,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1229,
                        "[report_stream_cursor_input]!"
                    ],
                    "where": [
                        1216
                    ]
                }
            ],
            "reserve": [
                1233,
                {
                    "distinct_on": [
                        1259,
                        "[reserve_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1256,
                        "[reserve_order_by!]"
                    ],
                    "where": [
                        1243
                    ]
                }
            ],
            "reserve_aggregate": [
                1234,
                {
                    "distinct_on": [
                        1259,
                        "[reserve_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1256,
                        "[reserve_order_by!]"
                    ],
                    "where": [
                        1243
                    ]
                }
            ],
            "reserve_by_pk": [
                1233,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "reserve_stream": [
                1233,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1267,
                        "[reserve_stream_cursor_input]!"
                    ],
                    "where": [
                        1243
                    ]
                }
            ],
            "split": [
                1281,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "split_aggregate": [
                1282,
                {
                    "distinct_on": [
                        1302,
                        "[split_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1300,
                        "[split_order_by!]"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "split_by_pk": [
                1281,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "split_stream": [
                1281,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1310,
                        "[split_stream_cursor_input]!"
                    ],
                    "where": [
                        1290
                    ]
                }
            ],
            "transaction": [
                1324,
                {
                    "distinct_on": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1343,
                        "[transaction_order_by!]"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "transaction_aggregate": [
                1325,
                {
                    "distinct_on": [
                        1345,
                        "[transaction_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1343,
                        "[transaction_order_by!]"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "transaction_by_pk": [
                1324,
                {
                    "id": [
                        27,
                        "Int!"
                    ]
                }
            ],
            "transaction_stream": [
                1324,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1353,
                        "[transaction_stream_cursor_input]!"
                    ],
                    "where": [
                        1333
                    ]
                }
            ],
            "user": [
                1367,
                {
                    "distinct_on": [
                        1393,
                        "[user_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1390,
                        "[user_order_by!]"
                    ],
                    "where": [
                        1375
                    ]
                }
            ],
            "user_aggregate": [
                1368,
                {
                    "distinct_on": [
                        1393,
                        "[user_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1390,
                        "[user_order_by!]"
                    ],
                    "where": [
                        1375
                    ]
                }
            ],
            "user_by_pk": [
                1367,
                {
                    "id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "user_stats": [
                1395,
                {
                    "distinct_on": [
                        1410,
                        "[user_stats_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1408,
                        "[user_stats_order_by!]"
                    ],
                    "where": [
                        1399
                    ]
                }
            ],
            "user_stats_aggregate": [
                1396,
                {
                    "distinct_on": [
                        1410,
                        "[user_stats_select_column!]"
                    ],
                    "limit": [
                        27
                    ],
                    "offset": [
                        27
                    ],
                    "order_by": [
                        1408,
                        "[user_stats_order_by!]"
                    ],
                    "where": [
                        1399
                    ]
                }
            ],
            "user_stats_by_pk": [
                1395,
                {
                    "user_id": [
                        49,
                        "String!"
                    ]
                }
            ],
            "user_stats_stream": [
                1395,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1415,
                        "[user_stats_stream_cursor_input]!"
                    ],
                    "where": [
                        1399
                    ]
                }
            ],
            "user_stream": [
                1367,
                {
                    "batch_size": [
                        27,
                        "Int!"
                    ],
                    "cursor": [
                        1423,
                        "[user_stream_cursor_input]!"
                    ],
                    "where": [
                        1375
                    ]
                }
            ],
            "__typename": [
                49
            ]
        }
    }
}