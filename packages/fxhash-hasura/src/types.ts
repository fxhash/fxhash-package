export default {
    "scalars": [
        1,
        10,
        21,
        25,
        27,
        29,
        30,
        31,
        38,
        47,
        55,
        68,
        78,
        82,
        89,
        96,
        100,
        102,
        112,
        127,
        131,
        133,
        135,
        145,
        155,
        159,
        166,
        175,
        183,
        188,
        189,
        192,
        193,
        195,
        197
    ],
    "types": {
        "Account": {
            "Account_Profiles": [
                60,
                {
                    "distinct_on": [
                        78,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        76,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "Account_Profiles_aggregate": [
                61,
                {
                    "distinct_on": [
                        78,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        76,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "Account_Wallets": [
                137,
                {
                    "distinct_on": [
                        155,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        153,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        144
                    ]
                }
            ],
            "Account_Wallets_aggregate": [
                138,
                {
                    "distinct_on": [
                        155,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        153,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        144
                    ]
                }
            ],
            "authoredProjects": [
                84,
                {
                    "distinct_on": [
                        127,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        124,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "authoredProjects_aggregate": [
                104,
                {
                    "distinct_on": [
                        127,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        124,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "curatedProjects": [
                84,
                {
                    "distinct_on": [
                        127,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        124,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "curatedProjects_aggregate": [
                104,
                {
                    "distinct_on": [
                        127,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        124,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "id": [
                197
            ],
            "status": [
                1
            ],
            "username": [
                135
            ],
            "__typename": [
                135
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
                29
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
                135
            ]
        },
        "Account_aggregate": {
            "aggregate": [
                6
            ],
            "nodes": [
                0
            ],
            "__typename": [
                135
            ]
        },
        "Account_aggregate_bool_exp": {
            "count": [
                5
            ],
            "__typename": [
                135
            ]
        },
        "Account_aggregate_bool_exp_count": {
            "arguments": [
                21
            ],
            "distinct": [
                29
            ],
            "filter": [
                9
            ],
            "predicate": [
                32
            ],
            "__typename": [
                135
            ]
        },
        "Account_aggregate_fields": {
            "count": [
                31,
                {
                    "columns": [
                        21,
                        "[Account_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                12
            ],
            "min": [
                14
            ],
            "__typename": [
                135
            ]
        },
        "Account_aggregate_order_by": {
            "count": [
                192
            ],
            "max": [
                13
            ],
            "min": [
                15
            ],
            "__typename": [
                135
            ]
        },
        "Account_arr_rel_insert_input": {
            "data": [
                11
            ],
            "on_conflict": [
                18
            ],
            "__typename": [
                135
            ]
        },
        "Account_bool_exp": {
            "Account_Profiles": [
                67
            ],
            "Account_Profiles_aggregate": [
                62
            ],
            "Account_Wallets": [
                144
            ],
            "Account_Wallets_aggregate": [
                139
            ],
            "_and": [
                9
            ],
            "_not": [
                9
            ],
            "_or": [
                9
            ],
            "authoredProjects": [
                111
            ],
            "authoredProjects_aggregate": [
                105
            ],
            "curatedProjects": [
                111
            ],
            "curatedProjects_aggregate": [
                105
            ],
            "id": [
                198
            ],
            "status": [
                2
            ],
            "username": [
                136
            ],
            "__typename": [
                135
            ]
        },
        "Account_constraint": {},
        "Account_insert_input": {
            "Account_Profiles": [
                66
            ],
            "Account_Wallets": [
                143
            ],
            "authoredProjects": [
                110
            ],
            "curatedProjects": [
                110
            ],
            "id": [
                197
            ],
            "status": [
                1
            ],
            "username": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Account_max_fields": {
            "id": [
                197
            ],
            "status": [
                1
            ],
            "username": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Account_max_order_by": {
            "id": [
                192
            ],
            "status": [
                192
            ],
            "username": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Account_min_fields": {
            "id": [
                197
            ],
            "status": [
                1
            ],
            "username": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Account_min_order_by": {
            "id": [
                192
            ],
            "status": [
                192
            ],
            "username": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Account_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                0
            ],
            "__typename": [
                135
            ]
        },
        "Account_obj_rel_insert_input": {
            "data": [
                11
            ],
            "on_conflict": [
                18
            ],
            "__typename": [
                135
            ]
        },
        "Account_on_conflict": {
            "constraint": [
                10
            ],
            "update_columns": [
                25
            ],
            "where": [
                9
            ],
            "__typename": [
                135
            ]
        },
        "Account_order_by": {
            "Account_Profiles_aggregate": [
                65
            ],
            "Account_Wallets_aggregate": [
                142
            ],
            "authoredProjects_aggregate": [
                108
            ],
            "curatedProjects_aggregate": [
                108
            ],
            "id": [
                192
            ],
            "status": [
                192
            ],
            "username": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Account_pk_columns_input": {
            "id": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Account_select_column": {},
        "Account_set_input": {
            "id": [
                197
            ],
            "status": [
                1
            ],
            "username": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Account_stream_cursor_input": {
            "initial_value": [
                24
            ],
            "ordering": [
                188
            ],
            "__typename": [
                135
            ]
        },
        "Account_stream_cursor_value_input": {
            "id": [
                197
            ],
            "status": [
                1
            ],
            "username": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Account_update_column": {},
        "Account_updates": {
            "_set": [
                22
            ],
            "where": [
                9
            ],
            "__typename": [
                135
            ]
        },
        "BlockchainNetwork": {},
        "BlockchainNetwork_comparison_exp": {
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
                29
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
                135
            ]
        },
        "Boolean": {},
        "Float": {},
        "Int": {},
        "Int_comparison_exp": {
            "_eq": [
                31
            ],
            "_gt": [
                31
            ],
            "_gte": [
                31
            ],
            "_in": [
                31
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                31
            ],
            "_lte": [
                31
            ],
            "_neq": [
                31
            ],
            "_nin": [
                31
            ],
            "__typename": [
                135
            ]
        },
        "Media": {
            "bucketId": [
                135
            ],
            "createdAt": [
                193
            ],
            "etag": [
                135
            ],
            "id": [
                197
            ],
            "name": [
                135
            ],
            "s3key": [
                135
            ],
            "size": [
                31
            ],
            "updatedAt": [
                193
            ],
            "uploaderId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Media_aggregate": {
            "aggregate": [
                35
            ],
            "nodes": [
                33
            ],
            "__typename": [
                135
            ]
        },
        "Media_aggregate_fields": {
            "avg": [
                36
            ],
            "count": [
                31,
                {
                    "columns": [
                        47,
                        "[Media_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                41
            ],
            "min": [
                42
            ],
            "stddev": [
                49
            ],
            "stddev_pop": [
                50
            ],
            "stddev_samp": [
                51
            ],
            "sum": [
                54
            ],
            "var_pop": [
                57
            ],
            "var_samp": [
                58
            ],
            "variance": [
                59
            ],
            "__typename": [
                135
            ]
        },
        "Media_avg_fields": {
            "size": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "Media_bool_exp": {
            "_and": [
                37
            ],
            "_not": [
                37
            ],
            "_or": [
                37
            ],
            "bucketId": [
                136
            ],
            "createdAt": [
                194
            ],
            "etag": [
                136
            ],
            "id": [
                198
            ],
            "name": [
                136
            ],
            "s3key": [
                136
            ],
            "size": [
                32
            ],
            "updatedAt": [
                194
            ],
            "uploaderId": [
                198
            ],
            "__typename": [
                135
            ]
        },
        "Media_constraint": {},
        "Media_inc_input": {
            "size": [
                31
            ],
            "__typename": [
                135
            ]
        },
        "Media_insert_input": {
            "bucketId": [
                135
            ],
            "createdAt": [
                193
            ],
            "etag": [
                135
            ],
            "id": [
                197
            ],
            "name": [
                135
            ],
            "s3key": [
                135
            ],
            "size": [
                31
            ],
            "updatedAt": [
                193
            ],
            "uploaderId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Media_max_fields": {
            "bucketId": [
                135
            ],
            "createdAt": [
                193
            ],
            "etag": [
                135
            ],
            "id": [
                197
            ],
            "name": [
                135
            ],
            "s3key": [
                135
            ],
            "size": [
                31
            ],
            "updatedAt": [
                193
            ],
            "uploaderId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Media_min_fields": {
            "bucketId": [
                135
            ],
            "createdAt": [
                193
            ],
            "etag": [
                135
            ],
            "id": [
                197
            ],
            "name": [
                135
            ],
            "s3key": [
                135
            ],
            "size": [
                31
            ],
            "updatedAt": [
                193
            ],
            "uploaderId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Media_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                33
            ],
            "__typename": [
                135
            ]
        },
        "Media_on_conflict": {
            "constraint": [
                38
            ],
            "update_columns": [
                55
            ],
            "where": [
                37
            ],
            "__typename": [
                135
            ]
        },
        "Media_order_by": {
            "bucketId": [
                192
            ],
            "createdAt": [
                192
            ],
            "etag": [
                192
            ],
            "id": [
                192
            ],
            "name": [
                192
            ],
            "s3key": [
                192
            ],
            "size": [
                192
            ],
            "updatedAt": [
                192
            ],
            "uploaderId": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Media_pk_columns_input": {
            "id": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Media_select_column": {},
        "Media_set_input": {
            "bucketId": [
                135
            ],
            "createdAt": [
                193
            ],
            "etag": [
                135
            ],
            "id": [
                197
            ],
            "name": [
                135
            ],
            "s3key": [
                135
            ],
            "size": [
                31
            ],
            "updatedAt": [
                193
            ],
            "uploaderId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Media_stddev_fields": {
            "size": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "Media_stddev_pop_fields": {
            "size": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "Media_stddev_samp_fields": {
            "size": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "Media_stream_cursor_input": {
            "initial_value": [
                53
            ],
            "ordering": [
                188
            ],
            "__typename": [
                135
            ]
        },
        "Media_stream_cursor_value_input": {
            "bucketId": [
                135
            ],
            "createdAt": [
                193
            ],
            "etag": [
                135
            ],
            "id": [
                197
            ],
            "name": [
                135
            ],
            "s3key": [
                135
            ],
            "size": [
                31
            ],
            "updatedAt": [
                193
            ],
            "uploaderId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Media_sum_fields": {
            "size": [
                31
            ],
            "__typename": [
                135
            ]
        },
        "Media_update_column": {},
        "Media_updates": {
            "_inc": [
                39
            ],
            "_set": [
                48
            ],
            "where": [
                37
            ],
            "__typename": [
                135
            ]
        },
        "Media_var_pop_fields": {
            "size": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "Media_var_samp_fields": {
            "size": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "Media_variance_fields": {
            "size": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "Profile": {
            "accountId": [
                197
            ],
            "description": [
                135
            ],
            "instagram": [
                135
            ],
            "picture": [
                135
            ],
            "twitter": [
                135
            ],
            "website": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Profile_aggregate": {
            "aggregate": [
                64
            ],
            "nodes": [
                60
            ],
            "__typename": [
                135
            ]
        },
        "Profile_aggregate_bool_exp": {
            "count": [
                63
            ],
            "__typename": [
                135
            ]
        },
        "Profile_aggregate_bool_exp_count": {
            "arguments": [
                78
            ],
            "distinct": [
                29
            ],
            "filter": [
                67
            ],
            "predicate": [
                32
            ],
            "__typename": [
                135
            ]
        },
        "Profile_aggregate_fields": {
            "count": [
                31,
                {
                    "columns": [
                        78,
                        "[Profile_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                70
            ],
            "min": [
                72
            ],
            "__typename": [
                135
            ]
        },
        "Profile_aggregate_order_by": {
            "count": [
                192
            ],
            "max": [
                71
            ],
            "min": [
                73
            ],
            "__typename": [
                135
            ]
        },
        "Profile_arr_rel_insert_input": {
            "data": [
                69
            ],
            "on_conflict": [
                75
            ],
            "__typename": [
                135
            ]
        },
        "Profile_bool_exp": {
            "_and": [
                67
            ],
            "_not": [
                67
            ],
            "_or": [
                67
            ],
            "accountId": [
                198
            ],
            "description": [
                136
            ],
            "instagram": [
                136
            ],
            "picture": [
                136
            ],
            "twitter": [
                136
            ],
            "website": [
                136
            ],
            "__typename": [
                135
            ]
        },
        "Profile_constraint": {},
        "Profile_insert_input": {
            "accountId": [
                197
            ],
            "description": [
                135
            ],
            "instagram": [
                135
            ],
            "picture": [
                135
            ],
            "twitter": [
                135
            ],
            "website": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Profile_max_fields": {
            "accountId": [
                197
            ],
            "description": [
                135
            ],
            "instagram": [
                135
            ],
            "picture": [
                135
            ],
            "twitter": [
                135
            ],
            "website": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Profile_max_order_by": {
            "accountId": [
                192
            ],
            "description": [
                192
            ],
            "instagram": [
                192
            ],
            "picture": [
                192
            ],
            "twitter": [
                192
            ],
            "website": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Profile_min_fields": {
            "accountId": [
                197
            ],
            "description": [
                135
            ],
            "instagram": [
                135
            ],
            "picture": [
                135
            ],
            "twitter": [
                135
            ],
            "website": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Profile_min_order_by": {
            "accountId": [
                192
            ],
            "description": [
                192
            ],
            "instagram": [
                192
            ],
            "picture": [
                192
            ],
            "twitter": [
                192
            ],
            "website": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Profile_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                60
            ],
            "__typename": [
                135
            ]
        },
        "Profile_on_conflict": {
            "constraint": [
                68
            ],
            "update_columns": [
                82
            ],
            "where": [
                67
            ],
            "__typename": [
                135
            ]
        },
        "Profile_order_by": {
            "accountId": [
                192
            ],
            "description": [
                192
            ],
            "instagram": [
                192
            ],
            "picture": [
                192
            ],
            "twitter": [
                192
            ],
            "website": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Profile_pk_columns_input": {
            "accountId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Profile_select_column": {},
        "Profile_set_input": {
            "accountId": [
                197
            ],
            "description": [
                135
            ],
            "instagram": [
                135
            ],
            "picture": [
                135
            ],
            "twitter": [
                135
            ],
            "website": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Profile_stream_cursor_input": {
            "initial_value": [
                81
            ],
            "ordering": [
                188
            ],
            "__typename": [
                135
            ]
        },
        "Profile_stream_cursor_value_input": {
            "accountId": [
                197
            ],
            "description": [
                135
            ],
            "instagram": [
                135
            ],
            "picture": [
                135
            ],
            "twitter": [
                135
            ],
            "website": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Profile_update_column": {},
        "Profile_updates": {
            "_set": [
                79
            ],
            "where": [
                67
            ],
            "__typename": [
                135
            ]
        },
        "Project": {
            "authorId": [
                197
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                193
            ],
            "curatorId": [
                197
            ],
            "description": [
                135
            ],
            "id": [
                197
            ],
            "pricing": [
                189,
                {
                    "path": [
                        135
                    ]
                }
            ],
            "projectAuthor": [
                0
            ],
            "projectCurator": [
                0,
                {
                    "distinct_on": [
                        21,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        19,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        9
                    ]
                }
            ],
            "projectCurator_aggregate": [
                3,
                {
                    "distinct_on": [
                        21,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        19,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        9
                    ]
                }
            ],
            "releaseAt": [
                193
            ],
            "state": [
                102
            ],
            "storage": [
                133
            ],
            "title": [
                135
            ],
            "updatedAt": [
                193
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia": {
            "ProjectMedia_Project": [
                84
            ],
            "mediaId": [
                197
            ],
            "projectId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_aggregate": {
            "aggregate": [
                87
            ],
            "nodes": [
                85
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_aggregate_fields": {
            "count": [
                31,
                {
                    "columns": [
                        96,
                        "[ProjectMedia_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                91
            ],
            "min": [
                92
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_bool_exp": {
            "ProjectMedia_Project": [
                111
            ],
            "_and": [
                88
            ],
            "_not": [
                88
            ],
            "_or": [
                88
            ],
            "mediaId": [
                198
            ],
            "projectId": [
                198
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_constraint": {},
        "ProjectMedia_insert_input": {
            "ProjectMedia_Project": [
                122
            ],
            "mediaId": [
                197
            ],
            "projectId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_max_fields": {
            "mediaId": [
                197
            ],
            "projectId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_min_fields": {
            "mediaId": [
                197
            ],
            "projectId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                85
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_on_conflict": {
            "constraint": [
                89
            ],
            "update_columns": [
                100
            ],
            "where": [
                88
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_order_by": {
            "ProjectMedia_Project": [
                124
            ],
            "mediaId": [
                192
            ],
            "projectId": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_select_column": {},
        "ProjectMedia_set_input": {
            "mediaId": [
                197
            ],
            "projectId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_stream_cursor_input": {
            "initial_value": [
                99
            ],
            "ordering": [
                188
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_stream_cursor_value_input": {
            "mediaId": [
                197
            ],
            "projectId": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "ProjectMedia_update_column": {},
        "ProjectMedia_updates": {
            "_set": [
                97
            ],
            "where": [
                88
            ],
            "__typename": [
                135
            ]
        },
        "ProjectState": {},
        "ProjectState_comparison_exp": {
            "_eq": [
                102
            ],
            "_gt": [
                102
            ],
            "_gte": [
                102
            ],
            "_in": [
                102
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                102
            ],
            "_lte": [
                102
            ],
            "_neq": [
                102
            ],
            "_nin": [
                102
            ],
            "__typename": [
                135
            ]
        },
        "Project_aggregate": {
            "aggregate": [
                107
            ],
            "nodes": [
                84
            ],
            "__typename": [
                135
            ]
        },
        "Project_aggregate_bool_exp": {
            "count": [
                106
            ],
            "__typename": [
                135
            ]
        },
        "Project_aggregate_bool_exp_count": {
            "arguments": [
                127
            ],
            "distinct": [
                29
            ],
            "filter": [
                111
            ],
            "predicate": [
                32
            ],
            "__typename": [
                135
            ]
        },
        "Project_aggregate_fields": {
            "count": [
                31,
                {
                    "columns": [
                        127,
                        "[Project_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                117
            ],
            "min": [
                119
            ],
            "__typename": [
                135
            ]
        },
        "Project_aggregate_order_by": {
            "count": [
                192
            ],
            "max": [
                118
            ],
            "min": [
                120
            ],
            "__typename": [
                135
            ]
        },
        "Project_append_input": {
            "pricing": [
                189
            ],
            "__typename": [
                135
            ]
        },
        "Project_arr_rel_insert_input": {
            "data": [
                116
            ],
            "on_conflict": [
                123
            ],
            "__typename": [
                135
            ]
        },
        "Project_bool_exp": {
            "_and": [
                111
            ],
            "_not": [
                111
            ],
            "_or": [
                111
            ],
            "authorId": [
                198
            ],
            "blockchain": [
                28
            ],
            "createdAt": [
                194
            ],
            "curatorId": [
                198
            ],
            "description": [
                136
            ],
            "id": [
                198
            ],
            "pricing": [
                191
            ],
            "projectAuthor": [
                9
            ],
            "projectCurator": [
                9
            ],
            "projectCurator_aggregate": [
                4
            ],
            "releaseAt": [
                194
            ],
            "state": [
                103
            ],
            "storage": [
                134
            ],
            "title": [
                136
            ],
            "updatedAt": [
                194
            ],
            "__typename": [
                135
            ]
        },
        "Project_constraint": {},
        "Project_delete_at_path_input": {
            "pricing": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Project_delete_elem_input": {
            "pricing": [
                31
            ],
            "__typename": [
                135
            ]
        },
        "Project_delete_key_input": {
            "pricing": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Project_insert_input": {
            "authorId": [
                197
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                193
            ],
            "curatorId": [
                197
            ],
            "description": [
                135
            ],
            "id": [
                197
            ],
            "pricing": [
                189
            ],
            "projectAuthor": [
                17
            ],
            "projectCurator": [
                8
            ],
            "releaseAt": [
                193
            ],
            "state": [
                102
            ],
            "storage": [
                133
            ],
            "title": [
                135
            ],
            "updatedAt": [
                193
            ],
            "__typename": [
                135
            ]
        },
        "Project_max_fields": {
            "authorId": [
                197
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                193
            ],
            "curatorId": [
                197
            ],
            "description": [
                135
            ],
            "id": [
                197
            ],
            "releaseAt": [
                193
            ],
            "state": [
                102
            ],
            "storage": [
                133
            ],
            "title": [
                135
            ],
            "updatedAt": [
                193
            ],
            "__typename": [
                135
            ]
        },
        "Project_max_order_by": {
            "authorId": [
                192
            ],
            "blockchain": [
                192
            ],
            "createdAt": [
                192
            ],
            "curatorId": [
                192
            ],
            "description": [
                192
            ],
            "id": [
                192
            ],
            "releaseAt": [
                192
            ],
            "state": [
                192
            ],
            "storage": [
                192
            ],
            "title": [
                192
            ],
            "updatedAt": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Project_min_fields": {
            "authorId": [
                197
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                193
            ],
            "curatorId": [
                197
            ],
            "description": [
                135
            ],
            "id": [
                197
            ],
            "releaseAt": [
                193
            ],
            "state": [
                102
            ],
            "storage": [
                133
            ],
            "title": [
                135
            ],
            "updatedAt": [
                193
            ],
            "__typename": [
                135
            ]
        },
        "Project_min_order_by": {
            "authorId": [
                192
            ],
            "blockchain": [
                192
            ],
            "createdAt": [
                192
            ],
            "curatorId": [
                192
            ],
            "description": [
                192
            ],
            "id": [
                192
            ],
            "releaseAt": [
                192
            ],
            "state": [
                192
            ],
            "storage": [
                192
            ],
            "title": [
                192
            ],
            "updatedAt": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Project_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                84
            ],
            "__typename": [
                135
            ]
        },
        "Project_obj_rel_insert_input": {
            "data": [
                116
            ],
            "on_conflict": [
                123
            ],
            "__typename": [
                135
            ]
        },
        "Project_on_conflict": {
            "constraint": [
                112
            ],
            "update_columns": [
                131
            ],
            "where": [
                111
            ],
            "__typename": [
                135
            ]
        },
        "Project_order_by": {
            "authorId": [
                192
            ],
            "blockchain": [
                192
            ],
            "createdAt": [
                192
            ],
            "curatorId": [
                192
            ],
            "description": [
                192
            ],
            "id": [
                192
            ],
            "pricing": [
                192
            ],
            "projectAuthor": [
                19
            ],
            "projectCurator_aggregate": [
                7
            ],
            "releaseAt": [
                192
            ],
            "state": [
                192
            ],
            "storage": [
                192
            ],
            "title": [
                192
            ],
            "updatedAt": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Project_pk_columns_input": {
            "id": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Project_prepend_input": {
            "pricing": [
                189
            ],
            "__typename": [
                135
            ]
        },
        "Project_select_column": {},
        "Project_set_input": {
            "authorId": [
                197
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                193
            ],
            "curatorId": [
                197
            ],
            "description": [
                135
            ],
            "id": [
                197
            ],
            "pricing": [
                189
            ],
            "releaseAt": [
                193
            ],
            "state": [
                102
            ],
            "storage": [
                133
            ],
            "title": [
                135
            ],
            "updatedAt": [
                193
            ],
            "__typename": [
                135
            ]
        },
        "Project_stream_cursor_input": {
            "initial_value": [
                130
            ],
            "ordering": [
                188
            ],
            "__typename": [
                135
            ]
        },
        "Project_stream_cursor_value_input": {
            "authorId": [
                197
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                193
            ],
            "curatorId": [
                197
            ],
            "description": [
                135
            ],
            "id": [
                197
            ],
            "pricing": [
                189
            ],
            "releaseAt": [
                193
            ],
            "state": [
                102
            ],
            "storage": [
                133
            ],
            "title": [
                135
            ],
            "updatedAt": [
                193
            ],
            "__typename": [
                135
            ]
        },
        "Project_update_column": {},
        "Project_updates": {
            "_append": [
                109
            ],
            "_delete_at_path": [
                113
            ],
            "_delete_elem": [
                114
            ],
            "_delete_key": [
                115
            ],
            "_prepend": [
                126
            ],
            "_set": [
                128
            ],
            "where": [
                111
            ],
            "__typename": [
                135
            ]
        },
        "Storage": {},
        "Storage_comparison_exp": {
            "_eq": [
                133
            ],
            "_gt": [
                133
            ],
            "_gte": [
                133
            ],
            "_in": [
                133
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                133
            ],
            "_lte": [
                133
            ],
            "_neq": [
                133
            ],
            "_nin": [
                133
            ],
            "__typename": [
                135
            ]
        },
        "String": {},
        "String_comparison_exp": {
            "_eq": [
                135
            ],
            "_gt": [
                135
            ],
            "_gte": [
                135
            ],
            "_ilike": [
                135
            ],
            "_in": [
                135
            ],
            "_iregex": [
                135
            ],
            "_is_null": [
                29
            ],
            "_like": [
                135
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
            "_nilike": [
                135
            ],
            "_nin": [
                135
            ],
            "_niregex": [
                135
            ],
            "_nlike": [
                135
            ],
            "_nregex": [
                135
            ],
            "_nsimilar": [
                135
            ],
            "_regex": [
                135
            ],
            "_similar": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Wallet": {
            "accountId": [
                197
            ],
            "address": [
                135
            ],
            "network": [
                27
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_aggregate": {
            "aggregate": [
                141
            ],
            "nodes": [
                137
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_aggregate_bool_exp": {
            "count": [
                140
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_aggregate_bool_exp_count": {
            "arguments": [
                155
            ],
            "distinct": [
                29
            ],
            "filter": [
                144
            ],
            "predicate": [
                32
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_aggregate_fields": {
            "count": [
                31,
                {
                    "columns": [
                        155,
                        "[Wallet_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                147
            ],
            "min": [
                149
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_aggregate_order_by": {
            "count": [
                192
            ],
            "max": [
                148
            ],
            "min": [
                150
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_arr_rel_insert_input": {
            "data": [
                146
            ],
            "on_conflict": [
                152
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_bool_exp": {
            "_and": [
                144
            ],
            "_not": [
                144
            ],
            "_or": [
                144
            ],
            "accountId": [
                198
            ],
            "address": [
                136
            ],
            "network": [
                28
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_constraint": {},
        "Wallet_insert_input": {
            "accountId": [
                197
            ],
            "address": [
                135
            ],
            "network": [
                27
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_max_fields": {
            "accountId": [
                197
            ],
            "address": [
                135
            ],
            "network": [
                27
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_max_order_by": {
            "accountId": [
                192
            ],
            "address": [
                192
            ],
            "network": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_min_fields": {
            "accountId": [
                197
            ],
            "address": [
                135
            ],
            "network": [
                27
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_min_order_by": {
            "accountId": [
                192
            ],
            "address": [
                192
            ],
            "network": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                137
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_on_conflict": {
            "constraint": [
                145
            ],
            "update_columns": [
                159
            ],
            "where": [
                144
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_order_by": {
            "accountId": [
                192
            ],
            "address": [
                192
            ],
            "network": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_pk_columns_input": {
            "address": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_select_column": {},
        "Wallet_set_input": {
            "accountId": [
                197
            ],
            "address": [
                135
            ],
            "network": [
                27
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_stream_cursor_input": {
            "initial_value": [
                158
            ],
            "ordering": [
                188
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_stream_cursor_value_input": {
            "accountId": [
                197
            ],
            "address": [
                135
            ],
            "network": [
                27
            ],
            "__typename": [
                135
            ]
        },
        "Wallet_update_column": {},
        "Wallet_updates": {
            "_set": [
                156
            ],
            "where": [
                144
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                135
            ],
            "finished_at": [
                195
            ],
            "id": [
                135
            ],
            "logs": [
                135
            ],
            "migration_name": [
                135
            ],
            "rolled_back_at": [
                195
            ],
            "started_at": [
                195
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_aggregate": {
            "aggregate": [
                163
            ],
            "nodes": [
                161
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_aggregate_fields": {
            "avg": [
                164
            ],
            "count": [
                31,
                {
                    "columns": [
                        175,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                169
            ],
            "min": [
                170
            ],
            "stddev": [
                177
            ],
            "stddev_pop": [
                178
            ],
            "stddev_samp": [
                179
            ],
            "sum": [
                182
            ],
            "var_pop": [
                185
            ],
            "var_samp": [
                186
            ],
            "variance": [
                187
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_avg_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_bool_exp": {
            "_and": [
                165
            ],
            "_not": [
                165
            ],
            "_or": [
                165
            ],
            "applied_steps_count": [
                32
            ],
            "checksum": [
                136
            ],
            "finished_at": [
                196
            ],
            "id": [
                136
            ],
            "logs": [
                136
            ],
            "migration_name": [
                136
            ],
            "rolled_back_at": [
                196
            ],
            "started_at": [
                196
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_constraint": {},
        "_prisma_migrations_inc_input": {
            "applied_steps_count": [
                31
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_insert_input": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                135
            ],
            "finished_at": [
                195
            ],
            "id": [
                135
            ],
            "logs": [
                135
            ],
            "migration_name": [
                135
            ],
            "rolled_back_at": [
                195
            ],
            "started_at": [
                195
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_max_fields": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                135
            ],
            "finished_at": [
                195
            ],
            "id": [
                135
            ],
            "logs": [
                135
            ],
            "migration_name": [
                135
            ],
            "rolled_back_at": [
                195
            ],
            "started_at": [
                195
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_min_fields": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                135
            ],
            "finished_at": [
                195
            ],
            "id": [
                135
            ],
            "logs": [
                135
            ],
            "migration_name": [
                135
            ],
            "rolled_back_at": [
                195
            ],
            "started_at": [
                195
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                161
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_on_conflict": {
            "constraint": [
                166
            ],
            "update_columns": [
                183
            ],
            "where": [
                165
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_order_by": {
            "applied_steps_count": [
                192
            ],
            "checksum": [
                192
            ],
            "finished_at": [
                192
            ],
            "id": [
                192
            ],
            "logs": [
                192
            ],
            "migration_name": [
                192
            ],
            "rolled_back_at": [
                192
            ],
            "started_at": [
                192
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_pk_columns_input": {
            "id": [
                135
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_select_column": {},
        "_prisma_migrations_set_input": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                135
            ],
            "finished_at": [
                195
            ],
            "id": [
                135
            ],
            "logs": [
                135
            ],
            "migration_name": [
                135
            ],
            "rolled_back_at": [
                195
            ],
            "started_at": [
                195
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_stddev_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_stddev_pop_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_stddev_samp_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_stream_cursor_input": {
            "initial_value": [
                181
            ],
            "ordering": [
                188
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_stream_cursor_value_input": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                135
            ],
            "finished_at": [
                195
            ],
            "id": [
                135
            ],
            "logs": [
                135
            ],
            "migration_name": [
                135
            ],
            "rolled_back_at": [
                195
            ],
            "started_at": [
                195
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_sum_fields": {
            "applied_steps_count": [
                31
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_update_column": {},
        "_prisma_migrations_updates": {
            "_inc": [
                167
            ],
            "_set": [
                176
            ],
            "where": [
                165
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_var_pop_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_var_samp_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "_prisma_migrations_variance_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                135
            ]
        },
        "cursor_ordering": {},
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                136
            ],
            "__typename": [
                135
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                190
            ],
            "_contained_in": [
                189
            ],
            "_contains": [
                189
            ],
            "_eq": [
                189
            ],
            "_gt": [
                189
            ],
            "_gte": [
                189
            ],
            "_has_key": [
                135
            ],
            "_has_keys_all": [
                135
            ],
            "_has_keys_any": [
                135
            ],
            "_in": [
                189
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                189
            ],
            "_lte": [
                189
            ],
            "_neq": [
                189
            ],
            "_nin": [
                189
            ],
            "__typename": [
                135
            ]
        },
        "order_by": {},
        "timestamp": {},
        "timestamp_comparison_exp": {
            "_eq": [
                193
            ],
            "_gt": [
                193
            ],
            "_gte": [
                193
            ],
            "_in": [
                193
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                193
            ],
            "_lte": [
                193
            ],
            "_neq": [
                193
            ],
            "_nin": [
                193
            ],
            "__typename": [
                135
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                195
            ],
            "_gt": [
                195
            ],
            "_gte": [
                195
            ],
            "_in": [
                195
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                195
            ],
            "_lte": [
                195
            ],
            "_neq": [
                195
            ],
            "_nin": [
                195
            ],
            "__typename": [
                135
            ]
        },
        "uuid": {},
        "uuid_comparison_exp": {
            "_eq": [
                197
            ],
            "_gt": [
                197
            ],
            "_gte": [
                197
            ],
            "_in": [
                197
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                197
            ],
            "_lte": [
                197
            ],
            "_neq": [
                197
            ],
            "_nin": [
                197
            ],
            "__typename": [
                135
            ]
        },
        "Query": {
            "Account": [
                0,
                {
                    "distinct_on": [
                        21,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        19,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        9
                    ]
                }
            ],
            "Account_aggregate": [
                3,
                {
                    "distinct_on": [
                        21,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        19,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        9
                    ]
                }
            ],
            "Account_by_pk": [
                0,
                {
                    "id": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "Media": [
                33,
                {
                    "distinct_on": [
                        47,
                        "[Media_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        45,
                        "[Media_order_by!]"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "Media_aggregate": [
                34,
                {
                    "distinct_on": [
                        47,
                        "[Media_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        45,
                        "[Media_order_by!]"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "Media_by_pk": [
                33,
                {
                    "id": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "Profile": [
                60,
                {
                    "distinct_on": [
                        78,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        76,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "Profile_aggregate": [
                61,
                {
                    "distinct_on": [
                        78,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        76,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "Profile_by_pk": [
                60,
                {
                    "accountId": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "Project": [
                84,
                {
                    "distinct_on": [
                        127,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        124,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "ProjectMedia": [
                85,
                {
                    "distinct_on": [
                        96,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        95,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        88
                    ]
                }
            ],
            "ProjectMedia_aggregate": [
                86,
                {
                    "distinct_on": [
                        96,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        95,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        88
                    ]
                }
            ],
            "Project_aggregate": [
                104,
                {
                    "distinct_on": [
                        127,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        124,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "Project_by_pk": [
                84,
                {
                    "id": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "Wallet": [
                137,
                {
                    "distinct_on": [
                        155,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        153,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        144
                    ]
                }
            ],
            "Wallet_aggregate": [
                138,
                {
                    "distinct_on": [
                        155,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        153,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        144
                    ]
                }
            ],
            "Wallet_by_pk": [
                137,
                {
                    "address": [
                        135,
                        "String!"
                    ]
                }
            ],
            "_prisma_migrations": [
                161,
                {
                    "distinct_on": [
                        175,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        173,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        165
                    ]
                }
            ],
            "_prisma_migrations_aggregate": [
                162,
                {
                    "distinct_on": [
                        175,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        173,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        165
                    ]
                }
            ],
            "_prisma_migrations_by_pk": [
                161,
                {
                    "id": [
                        135,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                135
            ]
        },
        "Mutation": {
            "delete_Account": [
                16,
                {
                    "where": [
                        9,
                        "Account_bool_exp!"
                    ]
                }
            ],
            "delete_Account_by_pk": [
                0,
                {
                    "id": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "delete_Media": [
                43,
                {
                    "where": [
                        37,
                        "Media_bool_exp!"
                    ]
                }
            ],
            "delete_Media_by_pk": [
                33,
                {
                    "id": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "delete_Profile": [
                74,
                {
                    "where": [
                        67,
                        "Profile_bool_exp!"
                    ]
                }
            ],
            "delete_Profile_by_pk": [
                60,
                {
                    "accountId": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "delete_Project": [
                121,
                {
                    "where": [
                        111,
                        "Project_bool_exp!"
                    ]
                }
            ],
            "delete_ProjectMedia": [
                93,
                {
                    "where": [
                        88,
                        "ProjectMedia_bool_exp!"
                    ]
                }
            ],
            "delete_Project_by_pk": [
                84,
                {
                    "id": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "delete_Wallet": [
                151,
                {
                    "where": [
                        144,
                        "Wallet_bool_exp!"
                    ]
                }
            ],
            "delete_Wallet_by_pk": [
                137,
                {
                    "address": [
                        135,
                        "String!"
                    ]
                }
            ],
            "delete__prisma_migrations": [
                171,
                {
                    "where": [
                        165,
                        "_prisma_migrations_bool_exp!"
                    ]
                }
            ],
            "delete__prisma_migrations_by_pk": [
                161,
                {
                    "id": [
                        135,
                        "String!"
                    ]
                }
            ],
            "insert_Account": [
                16,
                {
                    "objects": [
                        11,
                        "[Account_insert_input!]!"
                    ],
                    "on_conflict": [
                        18
                    ]
                }
            ],
            "insert_Account_one": [
                0,
                {
                    "object": [
                        11,
                        "Account_insert_input!"
                    ],
                    "on_conflict": [
                        18
                    ]
                }
            ],
            "insert_Media": [
                43,
                {
                    "objects": [
                        40,
                        "[Media_insert_input!]!"
                    ],
                    "on_conflict": [
                        44
                    ]
                }
            ],
            "insert_Media_one": [
                33,
                {
                    "object": [
                        40,
                        "Media_insert_input!"
                    ],
                    "on_conflict": [
                        44
                    ]
                }
            ],
            "insert_Profile": [
                74,
                {
                    "objects": [
                        69,
                        "[Profile_insert_input!]!"
                    ],
                    "on_conflict": [
                        75
                    ]
                }
            ],
            "insert_Profile_one": [
                60,
                {
                    "object": [
                        69,
                        "Profile_insert_input!"
                    ],
                    "on_conflict": [
                        75
                    ]
                }
            ],
            "insert_Project": [
                121,
                {
                    "objects": [
                        116,
                        "[Project_insert_input!]!"
                    ],
                    "on_conflict": [
                        123
                    ]
                }
            ],
            "insert_ProjectMedia": [
                93,
                {
                    "objects": [
                        90,
                        "[ProjectMedia_insert_input!]!"
                    ],
                    "on_conflict": [
                        94
                    ]
                }
            ],
            "insert_ProjectMedia_one": [
                85,
                {
                    "object": [
                        90,
                        "ProjectMedia_insert_input!"
                    ],
                    "on_conflict": [
                        94
                    ]
                }
            ],
            "insert_Project_one": [
                84,
                {
                    "object": [
                        116,
                        "Project_insert_input!"
                    ],
                    "on_conflict": [
                        123
                    ]
                }
            ],
            "insert_Wallet": [
                151,
                {
                    "objects": [
                        146,
                        "[Wallet_insert_input!]!"
                    ],
                    "on_conflict": [
                        152
                    ]
                }
            ],
            "insert_Wallet_one": [
                137,
                {
                    "object": [
                        146,
                        "Wallet_insert_input!"
                    ],
                    "on_conflict": [
                        152
                    ]
                }
            ],
            "insert__prisma_migrations": [
                171,
                {
                    "objects": [
                        168,
                        "[_prisma_migrations_insert_input!]!"
                    ],
                    "on_conflict": [
                        172
                    ]
                }
            ],
            "insert__prisma_migrations_one": [
                161,
                {
                    "object": [
                        168,
                        "_prisma_migrations_insert_input!"
                    ],
                    "on_conflict": [
                        172
                    ]
                }
            ],
            "update_Account": [
                16,
                {
                    "_set": [
                        22
                    ],
                    "where": [
                        9,
                        "Account_bool_exp!"
                    ]
                }
            ],
            "update_Account_by_pk": [
                0,
                {
                    "_set": [
                        22
                    ],
                    "pk_columns": [
                        20,
                        "Account_pk_columns_input!"
                    ]
                }
            ],
            "update_Account_many": [
                16,
                {
                    "updates": [
                        26,
                        "[Account_updates!]!"
                    ]
                }
            ],
            "update_Media": [
                43,
                {
                    "_inc": [
                        39
                    ],
                    "_set": [
                        48
                    ],
                    "where": [
                        37,
                        "Media_bool_exp!"
                    ]
                }
            ],
            "update_Media_by_pk": [
                33,
                {
                    "_inc": [
                        39
                    ],
                    "_set": [
                        48
                    ],
                    "pk_columns": [
                        46,
                        "Media_pk_columns_input!"
                    ]
                }
            ],
            "update_Media_many": [
                43,
                {
                    "updates": [
                        56,
                        "[Media_updates!]!"
                    ]
                }
            ],
            "update_Profile": [
                74,
                {
                    "_set": [
                        79
                    ],
                    "where": [
                        67,
                        "Profile_bool_exp!"
                    ]
                }
            ],
            "update_Profile_by_pk": [
                60,
                {
                    "_set": [
                        79
                    ],
                    "pk_columns": [
                        77,
                        "Profile_pk_columns_input!"
                    ]
                }
            ],
            "update_Profile_many": [
                74,
                {
                    "updates": [
                        83,
                        "[Profile_updates!]!"
                    ]
                }
            ],
            "update_Project": [
                121,
                {
                    "_append": [
                        109
                    ],
                    "_delete_at_path": [
                        113
                    ],
                    "_delete_elem": [
                        114
                    ],
                    "_delete_key": [
                        115
                    ],
                    "_prepend": [
                        126
                    ],
                    "_set": [
                        128
                    ],
                    "where": [
                        111,
                        "Project_bool_exp!"
                    ]
                }
            ],
            "update_ProjectMedia": [
                93,
                {
                    "_set": [
                        97
                    ],
                    "where": [
                        88,
                        "ProjectMedia_bool_exp!"
                    ]
                }
            ],
            "update_ProjectMedia_many": [
                93,
                {
                    "updates": [
                        101,
                        "[ProjectMedia_updates!]!"
                    ]
                }
            ],
            "update_Project_by_pk": [
                84,
                {
                    "_append": [
                        109
                    ],
                    "_delete_at_path": [
                        113
                    ],
                    "_delete_elem": [
                        114
                    ],
                    "_delete_key": [
                        115
                    ],
                    "_prepend": [
                        126
                    ],
                    "_set": [
                        128
                    ],
                    "pk_columns": [
                        125,
                        "Project_pk_columns_input!"
                    ]
                }
            ],
            "update_Project_many": [
                121,
                {
                    "updates": [
                        132,
                        "[Project_updates!]!"
                    ]
                }
            ],
            "update_Wallet": [
                151,
                {
                    "_set": [
                        156
                    ],
                    "where": [
                        144,
                        "Wallet_bool_exp!"
                    ]
                }
            ],
            "update_Wallet_by_pk": [
                137,
                {
                    "_set": [
                        156
                    ],
                    "pk_columns": [
                        154,
                        "Wallet_pk_columns_input!"
                    ]
                }
            ],
            "update_Wallet_many": [
                151,
                {
                    "updates": [
                        160,
                        "[Wallet_updates!]!"
                    ]
                }
            ],
            "update__prisma_migrations": [
                171,
                {
                    "_inc": [
                        167
                    ],
                    "_set": [
                        176
                    ],
                    "where": [
                        165,
                        "_prisma_migrations_bool_exp!"
                    ]
                }
            ],
            "update__prisma_migrations_by_pk": [
                161,
                {
                    "_inc": [
                        167
                    ],
                    "_set": [
                        176
                    ],
                    "pk_columns": [
                        174,
                        "_prisma_migrations_pk_columns_input!"
                    ]
                }
            ],
            "update__prisma_migrations_many": [
                171,
                {
                    "updates": [
                        184,
                        "[_prisma_migrations_updates!]!"
                    ]
                }
            ],
            "__typename": [
                135
            ]
        },
        "Subscription": {
            "Account": [
                0,
                {
                    "distinct_on": [
                        21,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        19,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        9
                    ]
                }
            ],
            "Account_aggregate": [
                3,
                {
                    "distinct_on": [
                        21,
                        "[Account_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        19,
                        "[Account_order_by!]"
                    ],
                    "where": [
                        9
                    ]
                }
            ],
            "Account_by_pk": [
                0,
                {
                    "id": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "Account_stream": [
                0,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        23,
                        "[Account_stream_cursor_input]!"
                    ],
                    "where": [
                        9
                    ]
                }
            ],
            "Media": [
                33,
                {
                    "distinct_on": [
                        47,
                        "[Media_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        45,
                        "[Media_order_by!]"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "Media_aggregate": [
                34,
                {
                    "distinct_on": [
                        47,
                        "[Media_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        45,
                        "[Media_order_by!]"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "Media_by_pk": [
                33,
                {
                    "id": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "Media_stream": [
                33,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        52,
                        "[Media_stream_cursor_input]!"
                    ],
                    "where": [
                        37
                    ]
                }
            ],
            "Profile": [
                60,
                {
                    "distinct_on": [
                        78,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        76,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "Profile_aggregate": [
                61,
                {
                    "distinct_on": [
                        78,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        76,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "Profile_by_pk": [
                60,
                {
                    "accountId": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "Profile_stream": [
                60,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        80,
                        "[Profile_stream_cursor_input]!"
                    ],
                    "where": [
                        67
                    ]
                }
            ],
            "Project": [
                84,
                {
                    "distinct_on": [
                        127,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        124,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "ProjectMedia": [
                85,
                {
                    "distinct_on": [
                        96,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        95,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        88
                    ]
                }
            ],
            "ProjectMedia_aggregate": [
                86,
                {
                    "distinct_on": [
                        96,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        95,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        88
                    ]
                }
            ],
            "ProjectMedia_stream": [
                85,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        98,
                        "[ProjectMedia_stream_cursor_input]!"
                    ],
                    "where": [
                        88
                    ]
                }
            ],
            "Project_aggregate": [
                104,
                {
                    "distinct_on": [
                        127,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        124,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "Project_by_pk": [
                84,
                {
                    "id": [
                        197,
                        "uuid!"
                    ]
                }
            ],
            "Project_stream": [
                84,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        129,
                        "[Project_stream_cursor_input]!"
                    ],
                    "where": [
                        111
                    ]
                }
            ],
            "Wallet": [
                137,
                {
                    "distinct_on": [
                        155,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        153,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        144
                    ]
                }
            ],
            "Wallet_aggregate": [
                138,
                {
                    "distinct_on": [
                        155,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        153,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        144
                    ]
                }
            ],
            "Wallet_by_pk": [
                137,
                {
                    "address": [
                        135,
                        "String!"
                    ]
                }
            ],
            "Wallet_stream": [
                137,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        157,
                        "[Wallet_stream_cursor_input]!"
                    ],
                    "where": [
                        144
                    ]
                }
            ],
            "_prisma_migrations": [
                161,
                {
                    "distinct_on": [
                        175,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        173,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        165
                    ]
                }
            ],
            "_prisma_migrations_aggregate": [
                162,
                {
                    "distinct_on": [
                        175,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        173,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        165
                    ]
                }
            ],
            "_prisma_migrations_by_pk": [
                161,
                {
                    "id": [
                        135,
                        "String!"
                    ]
                }
            ],
            "_prisma_migrations_stream": [
                161,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        180,
                        "[_prisma_migrations_stream_cursor_input]!"
                    ],
                    "where": [
                        165
                    ]
                }
            ],
            "__typename": [
                135
            ]
        }
    }
}