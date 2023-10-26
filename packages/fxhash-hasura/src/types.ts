export default {
    "scalars": [
        1,
        6,
        15,
        19,
        21,
        23,
        24,
        25,
        32,
        42,
        50,
        63,
        73,
        77,
        90,
        100,
        112,
        120,
        130,
        145,
        149,
        151,
        153,
        163,
        173,
        177,
        184,
        193,
        201,
        206,
        207,
        210,
        211,
        213,
        215,
        217
    ],
    "types": {
        "Account": {
            "authoredProjects": [
                79,
                {
                    "distinct_on": [
                        145,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        142,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        129
                    ]
                }
            ],
            "authoredProjects_aggregate": [
                122,
                {
                    "distinct_on": [
                        145,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        142,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        129
                    ]
                }
            ],
            "curatedProjects": [
                79,
                {
                    "distinct_on": [
                        145,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        142,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        129
                    ]
                }
            ],
            "curatedProjects_aggregate": [
                122,
                {
                    "distinct_on": [
                        145,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        142,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        129
                    ]
                }
            ],
            "id": [
                217
            ],
            "profile": [
                55,
                {
                    "distinct_on": [
                        73,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        71,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "profile_aggregate": [
                56,
                {
                    "distinct_on": [
                        73,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        71,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "status": [
                1
            ],
            "username": [
                153
            ],
            "wallets": [
                155,
                {
                    "distinct_on": [
                        173,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        171,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "wallets_aggregate": [
                156,
                {
                    "distinct_on": [
                        173,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        171,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "__typename": [
                153
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
                153
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
                153
            ]
        },
        "Account_aggregate_fields": {
            "count": [
                25,
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
                153
            ]
        },
        "Account_bool_exp": {
            "_and": [
                5
            ],
            "_not": [
                5
            ],
            "_or": [
                5
            ],
            "authoredProjects": [
                129
            ],
            "authoredProjects_aggregate": [
                123
            ],
            "curatedProjects": [
                129
            ],
            "curatedProjects_aggregate": [
                123
            ],
            "id": [
                218
            ],
            "profile": [
                62
            ],
            "profile_aggregate": [
                57
            ],
            "status": [
                2
            ],
            "username": [
                154
            ],
            "wallets": [
                162
            ],
            "wallets_aggregate": [
                157
            ],
            "__typename": [
                153
            ]
        },
        "Account_constraint": {},
        "Account_insert_input": {
            "authoredProjects": [
                128
            ],
            "curatedProjects": [
                128
            ],
            "id": [
                217
            ],
            "profile": [
                61
            ],
            "status": [
                1
            ],
            "username": [
                153
            ],
            "wallets": [
                161
            ],
            "__typename": [
                153
            ]
        },
        "Account_max_fields": {
            "id": [
                217
            ],
            "status": [
                1
            ],
            "username": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Account_min_fields": {
            "id": [
                217
            ],
            "status": [
                1
            ],
            "username": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Account_mutation_response": {
            "affected_rows": [
                25
            ],
            "returning": [
                0
            ],
            "__typename": [
                153
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
                153
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
                153
            ]
        },
        "Account_order_by": {
            "authoredProjects_aggregate": [
                126
            ],
            "curatedProjects_aggregate": [
                126
            ],
            "id": [
                210
            ],
            "profile_aggregate": [
                60
            ],
            "status": [
                210
            ],
            "username": [
                210
            ],
            "wallets_aggregate": [
                160
            ],
            "__typename": [
                153
            ]
        },
        "Account_pk_columns_input": {
            "id": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "Account_select_column": {},
        "Account_set_input": {
            "id": [
                217
            ],
            "status": [
                1
            ],
            "username": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Account_stream_cursor_input": {
            "initial_value": [
                18
            ],
            "ordering": [
                206
            ],
            "__typename": [
                153
            ]
        },
        "Account_stream_cursor_value_input": {
            "id": [
                217
            ],
            "status": [
                1
            ],
            "username": [
                153
            ],
            "__typename": [
                153
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
                153
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
                153
            ]
        },
        "Boolean": {},
        "Float": {},
        "Int": {},
        "Int_comparison_exp": {
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
                153
            ]
        },
        "Media": {
            "bucketId": [
                153
            ],
            "createdAt": [
                213
            ],
            "etag": [
                153
            ],
            "id": [
                217
            ],
            "name": [
                153
            ],
            "project": [
                80,
                {
                    "distinct_on": [
                        100,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        99,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "project_aggregate": [
                81,
                {
                    "distinct_on": [
                        100,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        99,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "s3key": [
                153
            ],
            "size": [
                25
            ],
            "updatedAt": [
                213
            ],
            "uploader": [
                0
            ],
            "uploaderId": [
                217
            ],
            "url": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Media_aggregate": {
            "aggregate": [
                29
            ],
            "nodes": [
                27
            ],
            "__typename": [
                153
            ]
        },
        "Media_aggregate_fields": {
            "avg": [
                30
            ],
            "count": [
                25,
                {
                    "columns": [
                        42,
                        "[Media_select_column!]"
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
            "stddev": [
                44
            ],
            "stddev_pop": [
                45
            ],
            "stddev_samp": [
                46
            ],
            "sum": [
                49
            ],
            "var_pop": [
                52
            ],
            "var_samp": [
                53
            ],
            "variance": [
                54
            ],
            "__typename": [
                153
            ]
        },
        "Media_avg_fields": {
            "size": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "Media_bool_exp": {
            "_and": [
                31
            ],
            "_not": [
                31
            ],
            "_or": [
                31
            ],
            "bucketId": [
                154
            ],
            "createdAt": [
                214
            ],
            "etag": [
                154
            ],
            "id": [
                218
            ],
            "name": [
                154
            ],
            "project": [
                89
            ],
            "project_aggregate": [
                82
            ],
            "s3key": [
                154
            ],
            "size": [
                26
            ],
            "updatedAt": [
                214
            ],
            "uploader": [
                5
            ],
            "uploaderId": [
                218
            ],
            "__typename": [
                153
            ]
        },
        "Media_constraint": {},
        "Media_inc_input": {
            "size": [
                25
            ],
            "__typename": [
                153
            ]
        },
        "Media_insert_input": {
            "bucketId": [
                153
            ],
            "createdAt": [
                213
            ],
            "etag": [
                153
            ],
            "id": [
                217
            ],
            "name": [
                153
            ],
            "project": [
                86
            ],
            "s3key": [
                153
            ],
            "size": [
                25
            ],
            "updatedAt": [
                213
            ],
            "uploader": [
                11
            ],
            "uploaderId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "Media_max_fields": {
            "bucketId": [
                153
            ],
            "createdAt": [
                213
            ],
            "etag": [
                153
            ],
            "id": [
                217
            ],
            "name": [
                153
            ],
            "s3key": [
                153
            ],
            "size": [
                25
            ],
            "updatedAt": [
                213
            ],
            "uploaderId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "Media_min_fields": {
            "bucketId": [
                153
            ],
            "createdAt": [
                213
            ],
            "etag": [
                153
            ],
            "id": [
                217
            ],
            "name": [
                153
            ],
            "s3key": [
                153
            ],
            "size": [
                25
            ],
            "updatedAt": [
                213
            ],
            "uploaderId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "Media_mutation_response": {
            "affected_rows": [
                25
            ],
            "returning": [
                27
            ],
            "__typename": [
                153
            ]
        },
        "Media_obj_rel_insert_input": {
            "data": [
                34
            ],
            "on_conflict": [
                39
            ],
            "__typename": [
                153
            ]
        },
        "Media_on_conflict": {
            "constraint": [
                32
            ],
            "update_columns": [
                50
            ],
            "where": [
                31
            ],
            "__typename": [
                153
            ]
        },
        "Media_order_by": {
            "bucketId": [
                210
            ],
            "createdAt": [
                210
            ],
            "etag": [
                210
            ],
            "id": [
                210
            ],
            "name": [
                210
            ],
            "project_aggregate": [
                85
            ],
            "s3key": [
                210
            ],
            "size": [
                210
            ],
            "updatedAt": [
                210
            ],
            "uploader": [
                13
            ],
            "uploaderId": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "Media_pk_columns_input": {
            "id": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "Media_select_column": {},
        "Media_set_input": {
            "bucketId": [
                153
            ],
            "createdAt": [
                213
            ],
            "etag": [
                153
            ],
            "id": [
                217
            ],
            "name": [
                153
            ],
            "s3key": [
                153
            ],
            "size": [
                25
            ],
            "updatedAt": [
                213
            ],
            "uploaderId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "Media_stddev_fields": {
            "size": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "Media_stddev_pop_fields": {
            "size": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "Media_stddev_samp_fields": {
            "size": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "Media_stream_cursor_input": {
            "initial_value": [
                48
            ],
            "ordering": [
                206
            ],
            "__typename": [
                153
            ]
        },
        "Media_stream_cursor_value_input": {
            "bucketId": [
                153
            ],
            "createdAt": [
                213
            ],
            "etag": [
                153
            ],
            "id": [
                217
            ],
            "name": [
                153
            ],
            "s3key": [
                153
            ],
            "size": [
                25
            ],
            "updatedAt": [
                213
            ],
            "uploaderId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "Media_sum_fields": {
            "size": [
                25
            ],
            "__typename": [
                153
            ]
        },
        "Media_update_column": {},
        "Media_updates": {
            "_inc": [
                33
            ],
            "_set": [
                43
            ],
            "where": [
                31
            ],
            "__typename": [
                153
            ]
        },
        "Media_var_pop_fields": {
            "size": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "Media_var_samp_fields": {
            "size": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "Media_variance_fields": {
            "size": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "Profile": {
            "accountId": [
                217
            ],
            "description": [
                153
            ],
            "instagram": [
                153
            ],
            "picture": [
                153
            ],
            "twitter": [
                153
            ],
            "website": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Profile_aggregate": {
            "aggregate": [
                59
            ],
            "nodes": [
                55
            ],
            "__typename": [
                153
            ]
        },
        "Profile_aggregate_bool_exp": {
            "count": [
                58
            ],
            "__typename": [
                153
            ]
        },
        "Profile_aggregate_bool_exp_count": {
            "arguments": [
                73
            ],
            "distinct": [
                23
            ],
            "filter": [
                62
            ],
            "predicate": [
                26
            ],
            "__typename": [
                153
            ]
        },
        "Profile_aggregate_fields": {
            "count": [
                25,
                {
                    "columns": [
                        73,
                        "[Profile_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                65
            ],
            "min": [
                67
            ],
            "__typename": [
                153
            ]
        },
        "Profile_aggregate_order_by": {
            "count": [
                210
            ],
            "max": [
                66
            ],
            "min": [
                68
            ],
            "__typename": [
                153
            ]
        },
        "Profile_arr_rel_insert_input": {
            "data": [
                64
            ],
            "on_conflict": [
                70
            ],
            "__typename": [
                153
            ]
        },
        "Profile_bool_exp": {
            "_and": [
                62
            ],
            "_not": [
                62
            ],
            "_or": [
                62
            ],
            "accountId": [
                218
            ],
            "description": [
                154
            ],
            "instagram": [
                154
            ],
            "picture": [
                154
            ],
            "twitter": [
                154
            ],
            "website": [
                154
            ],
            "__typename": [
                153
            ]
        },
        "Profile_constraint": {},
        "Profile_insert_input": {
            "accountId": [
                217
            ],
            "description": [
                153
            ],
            "instagram": [
                153
            ],
            "picture": [
                153
            ],
            "twitter": [
                153
            ],
            "website": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Profile_max_fields": {
            "accountId": [
                217
            ],
            "description": [
                153
            ],
            "instagram": [
                153
            ],
            "picture": [
                153
            ],
            "twitter": [
                153
            ],
            "website": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Profile_max_order_by": {
            "accountId": [
                210
            ],
            "description": [
                210
            ],
            "instagram": [
                210
            ],
            "picture": [
                210
            ],
            "twitter": [
                210
            ],
            "website": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "Profile_min_fields": {
            "accountId": [
                217
            ],
            "description": [
                153
            ],
            "instagram": [
                153
            ],
            "picture": [
                153
            ],
            "twitter": [
                153
            ],
            "website": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Profile_min_order_by": {
            "accountId": [
                210
            ],
            "description": [
                210
            ],
            "instagram": [
                210
            ],
            "picture": [
                210
            ],
            "twitter": [
                210
            ],
            "website": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "Profile_mutation_response": {
            "affected_rows": [
                25
            ],
            "returning": [
                55
            ],
            "__typename": [
                153
            ]
        },
        "Profile_on_conflict": {
            "constraint": [
                63
            ],
            "update_columns": [
                77
            ],
            "where": [
                62
            ],
            "__typename": [
                153
            ]
        },
        "Profile_order_by": {
            "accountId": [
                210
            ],
            "description": [
                210
            ],
            "instagram": [
                210
            ],
            "picture": [
                210
            ],
            "twitter": [
                210
            ],
            "website": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "Profile_pk_columns_input": {
            "accountId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "Profile_select_column": {},
        "Profile_set_input": {
            "accountId": [
                217
            ],
            "description": [
                153
            ],
            "instagram": [
                153
            ],
            "picture": [
                153
            ],
            "twitter": [
                153
            ],
            "website": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Profile_stream_cursor_input": {
            "initial_value": [
                76
            ],
            "ordering": [
                206
            ],
            "__typename": [
                153
            ]
        },
        "Profile_stream_cursor_value_input": {
            "accountId": [
                217
            ],
            "description": [
                153
            ],
            "instagram": [
                153
            ],
            "picture": [
                153
            ],
            "twitter": [
                153
            ],
            "website": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Profile_update_column": {},
        "Profile_updates": {
            "_set": [
                74
            ],
            "where": [
                62
            ],
            "__typename": [
                153
            ]
        },
        "Project": {
            "author": [
                0
            ],
            "authorId": [
                217
            ],
            "blockchain": [
                21
            ],
            "createdAt": [
                213
            ],
            "curator": [
                0
            ],
            "curatorId": [
                217
            ],
            "description": [
                153
            ],
            "id": [
                217
            ],
            "pricing": [
                207,
                {
                    "path": [
                        153
                    ]
                }
            ],
            "projectMedias": [
                80,
                {
                    "distinct_on": [
                        100,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        99,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "projectMedias_aggregate": [
                81,
                {
                    "distinct_on": [
                        100,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        99,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "releaseAt": [
                213
            ],
            "state": [
                120
            ],
            "storage": [
                151
            ],
            "title": [
                153
            ],
            "updatedAt": [
                213
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia": {
            "index": [
                211
            ],
            "media": [
                27
            ],
            "mediaId": [
                217
            ],
            "project": [
                79
            ],
            "projectId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_aggregate": {
            "aggregate": [
                84
            ],
            "nodes": [
                80
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_aggregate_bool_exp": {
            "count": [
                83
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_aggregate_bool_exp_count": {
            "arguments": [
                100
            ],
            "distinct": [
                23
            ],
            "filter": [
                89
            ],
            "predicate": [
                26
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_aggregate_fields": {
            "avg": [
                87
            ],
            "count": [
                25,
                {
                    "columns": [
                        100,
                        "[ProjectMedia_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                93
            ],
            "min": [
                95
            ],
            "stddev": [
                102
            ],
            "stddev_pop": [
                104
            ],
            "stddev_samp": [
                106
            ],
            "sum": [
                110
            ],
            "var_pop": [
                114
            ],
            "var_samp": [
                116
            ],
            "variance": [
                118
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_aggregate_order_by": {
            "avg": [
                88
            ],
            "count": [
                210
            ],
            "max": [
                94
            ],
            "min": [
                96
            ],
            "stddev": [
                103
            ],
            "stddev_pop": [
                105
            ],
            "stddev_samp": [
                107
            ],
            "sum": [
                111
            ],
            "var_pop": [
                115
            ],
            "var_samp": [
                117
            ],
            "variance": [
                119
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_arr_rel_insert_input": {
            "data": [
                92
            ],
            "on_conflict": [
                98
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_avg_fields": {
            "index": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_avg_order_by": {
            "index": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_bool_exp": {
            "_and": [
                89
            ],
            "_not": [
                89
            ],
            "_or": [
                89
            ],
            "index": [
                212
            ],
            "media": [
                31
            ],
            "mediaId": [
                218
            ],
            "project": [
                129
            ],
            "projectId": [
                218
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_constraint": {},
        "ProjectMedia_inc_input": {
            "index": [
                211
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_insert_input": {
            "index": [
                211
            ],
            "media": [
                38
            ],
            "mediaId": [
                217
            ],
            "project": [
                140
            ],
            "projectId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_max_fields": {
            "index": [
                211
            ],
            "mediaId": [
                217
            ],
            "projectId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_max_order_by": {
            "index": [
                210
            ],
            "mediaId": [
                210
            ],
            "projectId": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_min_fields": {
            "index": [
                211
            ],
            "mediaId": [
                217
            ],
            "projectId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_min_order_by": {
            "index": [
                210
            ],
            "mediaId": [
                210
            ],
            "projectId": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_mutation_response": {
            "affected_rows": [
                25
            ],
            "returning": [
                80
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_on_conflict": {
            "constraint": [
                90
            ],
            "update_columns": [
                112
            ],
            "where": [
                89
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_order_by": {
            "index": [
                210
            ],
            "media": [
                40
            ],
            "mediaId": [
                210
            ],
            "project": [
                142
            ],
            "projectId": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_select_column": {},
        "ProjectMedia_set_input": {
            "index": [
                211
            ],
            "mediaId": [
                217
            ],
            "projectId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_stddev_fields": {
            "index": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_stddev_order_by": {
            "index": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_stddev_pop_fields": {
            "index": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_stddev_pop_order_by": {
            "index": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_stddev_samp_fields": {
            "index": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_stddev_samp_order_by": {
            "index": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_stream_cursor_input": {
            "initial_value": [
                109
            ],
            "ordering": [
                206
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_stream_cursor_value_input": {
            "index": [
                211
            ],
            "mediaId": [
                217
            ],
            "projectId": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_sum_fields": {
            "index": [
                211
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_sum_order_by": {
            "index": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_update_column": {},
        "ProjectMedia_updates": {
            "_inc": [
                91
            ],
            "_set": [
                101
            ],
            "where": [
                89
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_var_pop_fields": {
            "index": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_var_pop_order_by": {
            "index": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_var_samp_fields": {
            "index": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_var_samp_order_by": {
            "index": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_variance_fields": {
            "index": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "ProjectMedia_variance_order_by": {
            "index": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "ProjectState": {},
        "ProjectState_comparison_exp": {
            "_eq": [
                120
            ],
            "_gt": [
                120
            ],
            "_gte": [
                120
            ],
            "_in": [
                120
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                120
            ],
            "_lte": [
                120
            ],
            "_neq": [
                120
            ],
            "_nin": [
                120
            ],
            "__typename": [
                153
            ]
        },
        "Project_aggregate": {
            "aggregate": [
                125
            ],
            "nodes": [
                79
            ],
            "__typename": [
                153
            ]
        },
        "Project_aggregate_bool_exp": {
            "count": [
                124
            ],
            "__typename": [
                153
            ]
        },
        "Project_aggregate_bool_exp_count": {
            "arguments": [
                145
            ],
            "distinct": [
                23
            ],
            "filter": [
                129
            ],
            "predicate": [
                26
            ],
            "__typename": [
                153
            ]
        },
        "Project_aggregate_fields": {
            "count": [
                25,
                {
                    "columns": [
                        145,
                        "[Project_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                135
            ],
            "min": [
                137
            ],
            "__typename": [
                153
            ]
        },
        "Project_aggregate_order_by": {
            "count": [
                210
            ],
            "max": [
                136
            ],
            "min": [
                138
            ],
            "__typename": [
                153
            ]
        },
        "Project_append_input": {
            "pricing": [
                207
            ],
            "__typename": [
                153
            ]
        },
        "Project_arr_rel_insert_input": {
            "data": [
                134
            ],
            "on_conflict": [
                141
            ],
            "__typename": [
                153
            ]
        },
        "Project_bool_exp": {
            "_and": [
                129
            ],
            "_not": [
                129
            ],
            "_or": [
                129
            ],
            "author": [
                5
            ],
            "authorId": [
                218
            ],
            "blockchain": [
                22
            ],
            "createdAt": [
                214
            ],
            "curator": [
                5
            ],
            "curatorId": [
                218
            ],
            "description": [
                154
            ],
            "id": [
                218
            ],
            "pricing": [
                209
            ],
            "projectMedias": [
                89
            ],
            "projectMedias_aggregate": [
                82
            ],
            "releaseAt": [
                214
            ],
            "state": [
                121
            ],
            "storage": [
                152
            ],
            "title": [
                154
            ],
            "updatedAt": [
                214
            ],
            "__typename": [
                153
            ]
        },
        "Project_constraint": {},
        "Project_delete_at_path_input": {
            "pricing": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Project_delete_elem_input": {
            "pricing": [
                25
            ],
            "__typename": [
                153
            ]
        },
        "Project_delete_key_input": {
            "pricing": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Project_insert_input": {
            "author": [
                11
            ],
            "authorId": [
                217
            ],
            "blockchain": [
                21
            ],
            "createdAt": [
                213
            ],
            "curator": [
                11
            ],
            "curatorId": [
                217
            ],
            "description": [
                153
            ],
            "id": [
                217
            ],
            "pricing": [
                207
            ],
            "projectMedias": [
                86
            ],
            "releaseAt": [
                213
            ],
            "state": [
                120
            ],
            "storage": [
                151
            ],
            "title": [
                153
            ],
            "updatedAt": [
                213
            ],
            "__typename": [
                153
            ]
        },
        "Project_max_fields": {
            "authorId": [
                217
            ],
            "blockchain": [
                21
            ],
            "createdAt": [
                213
            ],
            "curatorId": [
                217
            ],
            "description": [
                153
            ],
            "id": [
                217
            ],
            "releaseAt": [
                213
            ],
            "state": [
                120
            ],
            "storage": [
                151
            ],
            "title": [
                153
            ],
            "updatedAt": [
                213
            ],
            "__typename": [
                153
            ]
        },
        "Project_max_order_by": {
            "authorId": [
                210
            ],
            "blockchain": [
                210
            ],
            "createdAt": [
                210
            ],
            "curatorId": [
                210
            ],
            "description": [
                210
            ],
            "id": [
                210
            ],
            "releaseAt": [
                210
            ],
            "state": [
                210
            ],
            "storage": [
                210
            ],
            "title": [
                210
            ],
            "updatedAt": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "Project_min_fields": {
            "authorId": [
                217
            ],
            "blockchain": [
                21
            ],
            "createdAt": [
                213
            ],
            "curatorId": [
                217
            ],
            "description": [
                153
            ],
            "id": [
                217
            ],
            "releaseAt": [
                213
            ],
            "state": [
                120
            ],
            "storage": [
                151
            ],
            "title": [
                153
            ],
            "updatedAt": [
                213
            ],
            "__typename": [
                153
            ]
        },
        "Project_min_order_by": {
            "authorId": [
                210
            ],
            "blockchain": [
                210
            ],
            "createdAt": [
                210
            ],
            "curatorId": [
                210
            ],
            "description": [
                210
            ],
            "id": [
                210
            ],
            "releaseAt": [
                210
            ],
            "state": [
                210
            ],
            "storage": [
                210
            ],
            "title": [
                210
            ],
            "updatedAt": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "Project_mutation_response": {
            "affected_rows": [
                25
            ],
            "returning": [
                79
            ],
            "__typename": [
                153
            ]
        },
        "Project_obj_rel_insert_input": {
            "data": [
                134
            ],
            "on_conflict": [
                141
            ],
            "__typename": [
                153
            ]
        },
        "Project_on_conflict": {
            "constraint": [
                130
            ],
            "update_columns": [
                149
            ],
            "where": [
                129
            ],
            "__typename": [
                153
            ]
        },
        "Project_order_by": {
            "author": [
                13
            ],
            "authorId": [
                210
            ],
            "blockchain": [
                210
            ],
            "createdAt": [
                210
            ],
            "curator": [
                13
            ],
            "curatorId": [
                210
            ],
            "description": [
                210
            ],
            "id": [
                210
            ],
            "pricing": [
                210
            ],
            "projectMedias_aggregate": [
                85
            ],
            "releaseAt": [
                210
            ],
            "state": [
                210
            ],
            "storage": [
                210
            ],
            "title": [
                210
            ],
            "updatedAt": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "Project_pk_columns_input": {
            "id": [
                217
            ],
            "__typename": [
                153
            ]
        },
        "Project_prepend_input": {
            "pricing": [
                207
            ],
            "__typename": [
                153
            ]
        },
        "Project_select_column": {},
        "Project_set_input": {
            "authorId": [
                217
            ],
            "blockchain": [
                21
            ],
            "createdAt": [
                213
            ],
            "curatorId": [
                217
            ],
            "description": [
                153
            ],
            "id": [
                217
            ],
            "pricing": [
                207
            ],
            "releaseAt": [
                213
            ],
            "state": [
                120
            ],
            "storage": [
                151
            ],
            "title": [
                153
            ],
            "updatedAt": [
                213
            ],
            "__typename": [
                153
            ]
        },
        "Project_stream_cursor_input": {
            "initial_value": [
                148
            ],
            "ordering": [
                206
            ],
            "__typename": [
                153
            ]
        },
        "Project_stream_cursor_value_input": {
            "authorId": [
                217
            ],
            "blockchain": [
                21
            ],
            "createdAt": [
                213
            ],
            "curatorId": [
                217
            ],
            "description": [
                153
            ],
            "id": [
                217
            ],
            "pricing": [
                207
            ],
            "releaseAt": [
                213
            ],
            "state": [
                120
            ],
            "storage": [
                151
            ],
            "title": [
                153
            ],
            "updatedAt": [
                213
            ],
            "__typename": [
                153
            ]
        },
        "Project_update_column": {},
        "Project_updates": {
            "_append": [
                127
            ],
            "_delete_at_path": [
                131
            ],
            "_delete_elem": [
                132
            ],
            "_delete_key": [
                133
            ],
            "_prepend": [
                144
            ],
            "_set": [
                146
            ],
            "where": [
                129
            ],
            "__typename": [
                153
            ]
        },
        "Storage": {},
        "Storage_comparison_exp": {
            "_eq": [
                151
            ],
            "_gt": [
                151
            ],
            "_gte": [
                151
            ],
            "_in": [
                151
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                151
            ],
            "_lte": [
                151
            ],
            "_neq": [
                151
            ],
            "_nin": [
                151
            ],
            "__typename": [
                153
            ]
        },
        "String": {},
        "String_comparison_exp": {
            "_eq": [
                153
            ],
            "_gt": [
                153
            ],
            "_gte": [
                153
            ],
            "_ilike": [
                153
            ],
            "_in": [
                153
            ],
            "_iregex": [
                153
            ],
            "_is_null": [
                23
            ],
            "_like": [
                153
            ],
            "_lt": [
                153
            ],
            "_lte": [
                153
            ],
            "_neq": [
                153
            ],
            "_nilike": [
                153
            ],
            "_nin": [
                153
            ],
            "_niregex": [
                153
            ],
            "_nlike": [
                153
            ],
            "_nregex": [
                153
            ],
            "_nsimilar": [
                153
            ],
            "_regex": [
                153
            ],
            "_similar": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Wallet": {
            "accountId": [
                217
            ],
            "address": [
                153
            ],
            "network": [
                21
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_aggregate": {
            "aggregate": [
                159
            ],
            "nodes": [
                155
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_aggregate_bool_exp": {
            "count": [
                158
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_aggregate_bool_exp_count": {
            "arguments": [
                173
            ],
            "distinct": [
                23
            ],
            "filter": [
                162
            ],
            "predicate": [
                26
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_aggregate_fields": {
            "count": [
                25,
                {
                    "columns": [
                        173,
                        "[Wallet_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                165
            ],
            "min": [
                167
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_aggregate_order_by": {
            "count": [
                210
            ],
            "max": [
                166
            ],
            "min": [
                168
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_arr_rel_insert_input": {
            "data": [
                164
            ],
            "on_conflict": [
                170
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_bool_exp": {
            "_and": [
                162
            ],
            "_not": [
                162
            ],
            "_or": [
                162
            ],
            "accountId": [
                218
            ],
            "address": [
                154
            ],
            "network": [
                22
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_constraint": {},
        "Wallet_insert_input": {
            "accountId": [
                217
            ],
            "address": [
                153
            ],
            "network": [
                21
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_max_fields": {
            "accountId": [
                217
            ],
            "address": [
                153
            ],
            "network": [
                21
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_max_order_by": {
            "accountId": [
                210
            ],
            "address": [
                210
            ],
            "network": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_min_fields": {
            "accountId": [
                217
            ],
            "address": [
                153
            ],
            "network": [
                21
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_min_order_by": {
            "accountId": [
                210
            ],
            "address": [
                210
            ],
            "network": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_mutation_response": {
            "affected_rows": [
                25
            ],
            "returning": [
                155
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_on_conflict": {
            "constraint": [
                163
            ],
            "update_columns": [
                177
            ],
            "where": [
                162
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_order_by": {
            "accountId": [
                210
            ],
            "address": [
                210
            ],
            "network": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_pk_columns_input": {
            "address": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_select_column": {},
        "Wallet_set_input": {
            "accountId": [
                217
            ],
            "address": [
                153
            ],
            "network": [
                21
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_stream_cursor_input": {
            "initial_value": [
                176
            ],
            "ordering": [
                206
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_stream_cursor_value_input": {
            "accountId": [
                217
            ],
            "address": [
                153
            ],
            "network": [
                21
            ],
            "__typename": [
                153
            ]
        },
        "Wallet_update_column": {},
        "Wallet_updates": {
            "_set": [
                174
            ],
            "where": [
                162
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations": {
            "applied_steps_count": [
                25
            ],
            "checksum": [
                153
            ],
            "finished_at": [
                215
            ],
            "id": [
                153
            ],
            "logs": [
                153
            ],
            "migration_name": [
                153
            ],
            "rolled_back_at": [
                215
            ],
            "started_at": [
                215
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_aggregate": {
            "aggregate": [
                181
            ],
            "nodes": [
                179
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_aggregate_fields": {
            "avg": [
                182
            ],
            "count": [
                25,
                {
                    "columns": [
                        193,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "distinct": [
                        23
                    ]
                }
            ],
            "max": [
                187
            ],
            "min": [
                188
            ],
            "stddev": [
                195
            ],
            "stddev_pop": [
                196
            ],
            "stddev_samp": [
                197
            ],
            "sum": [
                200
            ],
            "var_pop": [
                203
            ],
            "var_samp": [
                204
            ],
            "variance": [
                205
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_avg_fields": {
            "applied_steps_count": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_bool_exp": {
            "_and": [
                183
            ],
            "_not": [
                183
            ],
            "_or": [
                183
            ],
            "applied_steps_count": [
                26
            ],
            "checksum": [
                154
            ],
            "finished_at": [
                216
            ],
            "id": [
                154
            ],
            "logs": [
                154
            ],
            "migration_name": [
                154
            ],
            "rolled_back_at": [
                216
            ],
            "started_at": [
                216
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_constraint": {},
        "_prisma_migrations_inc_input": {
            "applied_steps_count": [
                25
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_insert_input": {
            "applied_steps_count": [
                25
            ],
            "checksum": [
                153
            ],
            "finished_at": [
                215
            ],
            "id": [
                153
            ],
            "logs": [
                153
            ],
            "migration_name": [
                153
            ],
            "rolled_back_at": [
                215
            ],
            "started_at": [
                215
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_max_fields": {
            "applied_steps_count": [
                25
            ],
            "checksum": [
                153
            ],
            "finished_at": [
                215
            ],
            "id": [
                153
            ],
            "logs": [
                153
            ],
            "migration_name": [
                153
            ],
            "rolled_back_at": [
                215
            ],
            "started_at": [
                215
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_min_fields": {
            "applied_steps_count": [
                25
            ],
            "checksum": [
                153
            ],
            "finished_at": [
                215
            ],
            "id": [
                153
            ],
            "logs": [
                153
            ],
            "migration_name": [
                153
            ],
            "rolled_back_at": [
                215
            ],
            "started_at": [
                215
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_mutation_response": {
            "affected_rows": [
                25
            ],
            "returning": [
                179
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_on_conflict": {
            "constraint": [
                184
            ],
            "update_columns": [
                201
            ],
            "where": [
                183
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_order_by": {
            "applied_steps_count": [
                210
            ],
            "checksum": [
                210
            ],
            "finished_at": [
                210
            ],
            "id": [
                210
            ],
            "logs": [
                210
            ],
            "migration_name": [
                210
            ],
            "rolled_back_at": [
                210
            ],
            "started_at": [
                210
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_pk_columns_input": {
            "id": [
                153
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_select_column": {},
        "_prisma_migrations_set_input": {
            "applied_steps_count": [
                25
            ],
            "checksum": [
                153
            ],
            "finished_at": [
                215
            ],
            "id": [
                153
            ],
            "logs": [
                153
            ],
            "migration_name": [
                153
            ],
            "rolled_back_at": [
                215
            ],
            "started_at": [
                215
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_stddev_fields": {
            "applied_steps_count": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_stddev_pop_fields": {
            "applied_steps_count": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_stddev_samp_fields": {
            "applied_steps_count": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_stream_cursor_input": {
            "initial_value": [
                199
            ],
            "ordering": [
                206
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_stream_cursor_value_input": {
            "applied_steps_count": [
                25
            ],
            "checksum": [
                153
            ],
            "finished_at": [
                215
            ],
            "id": [
                153
            ],
            "logs": [
                153
            ],
            "migration_name": [
                153
            ],
            "rolled_back_at": [
                215
            ],
            "started_at": [
                215
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_sum_fields": {
            "applied_steps_count": [
                25
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_update_column": {},
        "_prisma_migrations_updates": {
            "_inc": [
                185
            ],
            "_set": [
                194
            ],
            "where": [
                183
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_var_pop_fields": {
            "applied_steps_count": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_var_samp_fields": {
            "applied_steps_count": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "_prisma_migrations_variance_fields": {
            "applied_steps_count": [
                24
            ],
            "__typename": [
                153
            ]
        },
        "cursor_ordering": {},
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                154
            ],
            "__typename": [
                153
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                208
            ],
            "_contained_in": [
                207
            ],
            "_contains": [
                207
            ],
            "_eq": [
                207
            ],
            "_gt": [
                207
            ],
            "_gte": [
                207
            ],
            "_has_key": [
                153
            ],
            "_has_keys_all": [
                153
            ],
            "_has_keys_any": [
                153
            ],
            "_in": [
                207
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                207
            ],
            "_lte": [
                207
            ],
            "_neq": [
                207
            ],
            "_nin": [
                207
            ],
            "__typename": [
                153
            ]
        },
        "order_by": {},
        "smallint": {},
        "smallint_comparison_exp": {
            "_eq": [
                211
            ],
            "_gt": [
                211
            ],
            "_gte": [
                211
            ],
            "_in": [
                211
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                211
            ],
            "_lte": [
                211
            ],
            "_neq": [
                211
            ],
            "_nin": [
                211
            ],
            "__typename": [
                153
            ]
        },
        "timestamp": {},
        "timestamp_comparison_exp": {
            "_eq": [
                213
            ],
            "_gt": [
                213
            ],
            "_gte": [
                213
            ],
            "_in": [
                213
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                213
            ],
            "_lte": [
                213
            ],
            "_neq": [
                213
            ],
            "_nin": [
                213
            ],
            "__typename": [
                153
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                215
            ],
            "_gt": [
                215
            ],
            "_gte": [
                215
            ],
            "_in": [
                215
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                215
            ],
            "_lte": [
                215
            ],
            "_neq": [
                215
            ],
            "_nin": [
                215
            ],
            "__typename": [
                153
            ]
        },
        "uuid": {},
        "uuid_comparison_exp": {
            "_eq": [
                217
            ],
            "_gt": [
                217
            ],
            "_gte": [
                217
            ],
            "_in": [
                217
            ],
            "_is_null": [
                23
            ],
            "_lt": [
                217
            ],
            "_lte": [
                217
            ],
            "_neq": [
                217
            ],
            "_nin": [
                217
            ],
            "__typename": [
                153
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
                        25
                    ],
                    "offset": [
                        25
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
                        25
                    ],
                    "offset": [
                        25
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
                        217,
                        "uuid!"
                    ]
                }
            ],
            "Media": [
                27,
                {
                    "distinct_on": [
                        42,
                        "[Media_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        40,
                        "[Media_order_by!]"
                    ],
                    "where": [
                        31
                    ]
                }
            ],
            "Media_aggregate": [
                28,
                {
                    "distinct_on": [
                        42,
                        "[Media_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        40,
                        "[Media_order_by!]"
                    ],
                    "where": [
                        31
                    ]
                }
            ],
            "Media_by_pk": [
                27,
                {
                    "id": [
                        217,
                        "uuid!"
                    ]
                }
            ],
            "Profile": [
                55,
                {
                    "distinct_on": [
                        73,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        71,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "Profile_aggregate": [
                56,
                {
                    "distinct_on": [
                        73,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        71,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "Profile_by_pk": [
                55,
                {
                    "accountId": [
                        217,
                        "uuid!"
                    ]
                }
            ],
            "Project": [
                79,
                {
                    "distinct_on": [
                        145,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        142,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        129
                    ]
                }
            ],
            "ProjectMedia": [
                80,
                {
                    "distinct_on": [
                        100,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        99,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "ProjectMedia_aggregate": [
                81,
                {
                    "distinct_on": [
                        100,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        99,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "Project_aggregate": [
                122,
                {
                    "distinct_on": [
                        145,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        142,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        129
                    ]
                }
            ],
            "Project_by_pk": [
                79,
                {
                    "id": [
                        217,
                        "uuid!"
                    ]
                }
            ],
            "Wallet": [
                155,
                {
                    "distinct_on": [
                        173,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        171,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "Wallet_aggregate": [
                156,
                {
                    "distinct_on": [
                        173,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        171,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "Wallet_by_pk": [
                155,
                {
                    "address": [
                        153,
                        "String!"
                    ]
                }
            ],
            "_prisma_migrations": [
                179,
                {
                    "distinct_on": [
                        193,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        191,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        183
                    ]
                }
            ],
            "_prisma_migrations_aggregate": [
                180,
                {
                    "distinct_on": [
                        193,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        191,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        183
                    ]
                }
            ],
            "_prisma_migrations_by_pk": [
                179,
                {
                    "id": [
                        153,
                        "String!"
                    ]
                }
            ],
            "mediaFullUrl": [
                153,
                {
                    "s3key": [
                        153,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                153
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
                        217,
                        "uuid!"
                    ]
                }
            ],
            "delete_Media": [
                37,
                {
                    "where": [
                        31,
                        "Media_bool_exp!"
                    ]
                }
            ],
            "delete_Media_by_pk": [
                27,
                {
                    "id": [
                        217,
                        "uuid!"
                    ]
                }
            ],
            "delete_Profile": [
                69,
                {
                    "where": [
                        62,
                        "Profile_bool_exp!"
                    ]
                }
            ],
            "delete_Profile_by_pk": [
                55,
                {
                    "accountId": [
                        217,
                        "uuid!"
                    ]
                }
            ],
            "delete_Project": [
                139,
                {
                    "where": [
                        129,
                        "Project_bool_exp!"
                    ]
                }
            ],
            "delete_ProjectMedia": [
                97,
                {
                    "where": [
                        89,
                        "ProjectMedia_bool_exp!"
                    ]
                }
            ],
            "delete_Project_by_pk": [
                79,
                {
                    "id": [
                        217,
                        "uuid!"
                    ]
                }
            ],
            "delete_Wallet": [
                169,
                {
                    "where": [
                        162,
                        "Wallet_bool_exp!"
                    ]
                }
            ],
            "delete_Wallet_by_pk": [
                155,
                {
                    "address": [
                        153,
                        "String!"
                    ]
                }
            ],
            "delete__prisma_migrations": [
                189,
                {
                    "where": [
                        183,
                        "_prisma_migrations_bool_exp!"
                    ]
                }
            ],
            "delete__prisma_migrations_by_pk": [
                179,
                {
                    "id": [
                        153,
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
            "insert_Media": [
                37,
                {
                    "objects": [
                        34,
                        "[Media_insert_input!]!"
                    ],
                    "on_conflict": [
                        39
                    ]
                }
            ],
            "insert_Media_one": [
                27,
                {
                    "object": [
                        34,
                        "Media_insert_input!"
                    ],
                    "on_conflict": [
                        39
                    ]
                }
            ],
            "insert_Profile": [
                69,
                {
                    "objects": [
                        64,
                        "[Profile_insert_input!]!"
                    ],
                    "on_conflict": [
                        70
                    ]
                }
            ],
            "insert_Profile_one": [
                55,
                {
                    "object": [
                        64,
                        "Profile_insert_input!"
                    ],
                    "on_conflict": [
                        70
                    ]
                }
            ],
            "insert_Project": [
                139,
                {
                    "objects": [
                        134,
                        "[Project_insert_input!]!"
                    ],
                    "on_conflict": [
                        141
                    ]
                }
            ],
            "insert_ProjectMedia": [
                97,
                {
                    "objects": [
                        92,
                        "[ProjectMedia_insert_input!]!"
                    ],
                    "on_conflict": [
                        98
                    ]
                }
            ],
            "insert_ProjectMedia_one": [
                80,
                {
                    "object": [
                        92,
                        "ProjectMedia_insert_input!"
                    ],
                    "on_conflict": [
                        98
                    ]
                }
            ],
            "insert_Project_one": [
                79,
                {
                    "object": [
                        134,
                        "Project_insert_input!"
                    ],
                    "on_conflict": [
                        141
                    ]
                }
            ],
            "insert_Wallet": [
                169,
                {
                    "objects": [
                        164,
                        "[Wallet_insert_input!]!"
                    ],
                    "on_conflict": [
                        170
                    ]
                }
            ],
            "insert_Wallet_one": [
                155,
                {
                    "object": [
                        164,
                        "Wallet_insert_input!"
                    ],
                    "on_conflict": [
                        170
                    ]
                }
            ],
            "insert__prisma_migrations": [
                189,
                {
                    "objects": [
                        186,
                        "[_prisma_migrations_insert_input!]!"
                    ],
                    "on_conflict": [
                        190
                    ]
                }
            ],
            "insert__prisma_migrations_one": [
                179,
                {
                    "object": [
                        186,
                        "_prisma_migrations_insert_input!"
                    ],
                    "on_conflict": [
                        190
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
            "update_Media": [
                37,
                {
                    "_inc": [
                        33
                    ],
                    "_set": [
                        43
                    ],
                    "where": [
                        31,
                        "Media_bool_exp!"
                    ]
                }
            ],
            "update_Media_by_pk": [
                27,
                {
                    "_inc": [
                        33
                    ],
                    "_set": [
                        43
                    ],
                    "pk_columns": [
                        41,
                        "Media_pk_columns_input!"
                    ]
                }
            ],
            "update_Media_many": [
                37,
                {
                    "updates": [
                        51,
                        "[Media_updates!]!"
                    ]
                }
            ],
            "update_Profile": [
                69,
                {
                    "_set": [
                        74
                    ],
                    "where": [
                        62,
                        "Profile_bool_exp!"
                    ]
                }
            ],
            "update_Profile_by_pk": [
                55,
                {
                    "_set": [
                        74
                    ],
                    "pk_columns": [
                        72,
                        "Profile_pk_columns_input!"
                    ]
                }
            ],
            "update_Profile_many": [
                69,
                {
                    "updates": [
                        78,
                        "[Profile_updates!]!"
                    ]
                }
            ],
            "update_Project": [
                139,
                {
                    "_append": [
                        127
                    ],
                    "_delete_at_path": [
                        131
                    ],
                    "_delete_elem": [
                        132
                    ],
                    "_delete_key": [
                        133
                    ],
                    "_prepend": [
                        144
                    ],
                    "_set": [
                        146
                    ],
                    "where": [
                        129,
                        "Project_bool_exp!"
                    ]
                }
            ],
            "update_ProjectMedia": [
                97,
                {
                    "_inc": [
                        91
                    ],
                    "_set": [
                        101
                    ],
                    "where": [
                        89,
                        "ProjectMedia_bool_exp!"
                    ]
                }
            ],
            "update_ProjectMedia_many": [
                97,
                {
                    "updates": [
                        113,
                        "[ProjectMedia_updates!]!"
                    ]
                }
            ],
            "update_Project_by_pk": [
                79,
                {
                    "_append": [
                        127
                    ],
                    "_delete_at_path": [
                        131
                    ],
                    "_delete_elem": [
                        132
                    ],
                    "_delete_key": [
                        133
                    ],
                    "_prepend": [
                        144
                    ],
                    "_set": [
                        146
                    ],
                    "pk_columns": [
                        143,
                        "Project_pk_columns_input!"
                    ]
                }
            ],
            "update_Project_many": [
                139,
                {
                    "updates": [
                        150,
                        "[Project_updates!]!"
                    ]
                }
            ],
            "update_Wallet": [
                169,
                {
                    "_set": [
                        174
                    ],
                    "where": [
                        162,
                        "Wallet_bool_exp!"
                    ]
                }
            ],
            "update_Wallet_by_pk": [
                155,
                {
                    "_set": [
                        174
                    ],
                    "pk_columns": [
                        172,
                        "Wallet_pk_columns_input!"
                    ]
                }
            ],
            "update_Wallet_many": [
                169,
                {
                    "updates": [
                        178,
                        "[Wallet_updates!]!"
                    ]
                }
            ],
            "update__prisma_migrations": [
                189,
                {
                    "_inc": [
                        185
                    ],
                    "_set": [
                        194
                    ],
                    "where": [
                        183,
                        "_prisma_migrations_bool_exp!"
                    ]
                }
            ],
            "update__prisma_migrations_by_pk": [
                179,
                {
                    "_inc": [
                        185
                    ],
                    "_set": [
                        194
                    ],
                    "pk_columns": [
                        192,
                        "_prisma_migrations_pk_columns_input!"
                    ]
                }
            ],
            "update__prisma_migrations_many": [
                189,
                {
                    "updates": [
                        202,
                        "[_prisma_migrations_updates!]!"
                    ]
                }
            ],
            "__typename": [
                153
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
                        25
                    ],
                    "offset": [
                        25
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
                        25
                    ],
                    "offset": [
                        25
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
                        217,
                        "uuid!"
                    ]
                }
            ],
            "Account_stream": [
                0,
                {
                    "batch_size": [
                        25,
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
            "Media": [
                27,
                {
                    "distinct_on": [
                        42,
                        "[Media_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        40,
                        "[Media_order_by!]"
                    ],
                    "where": [
                        31
                    ]
                }
            ],
            "Media_aggregate": [
                28,
                {
                    "distinct_on": [
                        42,
                        "[Media_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        40,
                        "[Media_order_by!]"
                    ],
                    "where": [
                        31
                    ]
                }
            ],
            "Media_by_pk": [
                27,
                {
                    "id": [
                        217,
                        "uuid!"
                    ]
                }
            ],
            "Media_stream": [
                27,
                {
                    "batch_size": [
                        25,
                        "Int!"
                    ],
                    "cursor": [
                        47,
                        "[Media_stream_cursor_input]!"
                    ],
                    "where": [
                        31
                    ]
                }
            ],
            "Profile": [
                55,
                {
                    "distinct_on": [
                        73,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        71,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "Profile_aggregate": [
                56,
                {
                    "distinct_on": [
                        73,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        71,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "Profile_by_pk": [
                55,
                {
                    "accountId": [
                        217,
                        "uuid!"
                    ]
                }
            ],
            "Profile_stream": [
                55,
                {
                    "batch_size": [
                        25,
                        "Int!"
                    ],
                    "cursor": [
                        75,
                        "[Profile_stream_cursor_input]!"
                    ],
                    "where": [
                        62
                    ]
                }
            ],
            "Project": [
                79,
                {
                    "distinct_on": [
                        145,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        142,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        129
                    ]
                }
            ],
            "ProjectMedia": [
                80,
                {
                    "distinct_on": [
                        100,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        99,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "ProjectMedia_aggregate": [
                81,
                {
                    "distinct_on": [
                        100,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        99,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "ProjectMedia_stream": [
                80,
                {
                    "batch_size": [
                        25,
                        "Int!"
                    ],
                    "cursor": [
                        108,
                        "[ProjectMedia_stream_cursor_input]!"
                    ],
                    "where": [
                        89
                    ]
                }
            ],
            "Project_aggregate": [
                122,
                {
                    "distinct_on": [
                        145,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        142,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        129
                    ]
                }
            ],
            "Project_by_pk": [
                79,
                {
                    "id": [
                        217,
                        "uuid!"
                    ]
                }
            ],
            "Project_stream": [
                79,
                {
                    "batch_size": [
                        25,
                        "Int!"
                    ],
                    "cursor": [
                        147,
                        "[Project_stream_cursor_input]!"
                    ],
                    "where": [
                        129
                    ]
                }
            ],
            "Wallet": [
                155,
                {
                    "distinct_on": [
                        173,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        171,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "Wallet_aggregate": [
                156,
                {
                    "distinct_on": [
                        173,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        171,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "Wallet_by_pk": [
                155,
                {
                    "address": [
                        153,
                        "String!"
                    ]
                }
            ],
            "Wallet_stream": [
                155,
                {
                    "batch_size": [
                        25,
                        "Int!"
                    ],
                    "cursor": [
                        175,
                        "[Wallet_stream_cursor_input]!"
                    ],
                    "where": [
                        162
                    ]
                }
            ],
            "_prisma_migrations": [
                179,
                {
                    "distinct_on": [
                        193,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        191,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        183
                    ]
                }
            ],
            "_prisma_migrations_aggregate": [
                180,
                {
                    "distinct_on": [
                        193,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        25
                    ],
                    "offset": [
                        25
                    ],
                    "order_by": [
                        191,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        183
                    ]
                }
            ],
            "_prisma_migrations_by_pk": [
                179,
                {
                    "id": [
                        153,
                        "String!"
                    ]
                }
            ],
            "_prisma_migrations_stream": [
                179,
                {
                    "batch_size": [
                        25,
                        "Int!"
                    ],
                    "cursor": [
                        198,
                        "[_prisma_migrations_stream_cursor_input]!"
                    ],
                    "where": [
                        183
                    ]
                }
            ],
            "__typename": [
                153
            ]
        }
    }
}