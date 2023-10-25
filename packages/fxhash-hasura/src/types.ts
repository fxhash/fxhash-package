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
        41,
        51,
        55,
        62,
        69,
        73,
        75,
        85,
        100,
        104,
        106,
        108,
        118,
        128,
        132,
        139,
        148,
        156,
        161,
        162,
        165,
        166,
        168,
        170
    ],
    "types": {
        "Account": {
            "Account_Profiles": [
                33,
                {
                    "distinct_on": [
                        51,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        49,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "Account_Profiles_aggregate": [
                34,
                {
                    "distinct_on": [
                        51,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        49,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "Account_Wallets": [
                110,
                {
                    "distinct_on": [
                        128,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        126,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "Account_Wallets_aggregate": [
                111,
                {
                    "distinct_on": [
                        128,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        126,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "authoredProjects": [
                57,
                {
                    "distinct_on": [
                        100,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        97,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "authoredProjects_aggregate": [
                77,
                {
                    "distinct_on": [
                        100,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        97,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "curatedProjects": [
                57,
                {
                    "distinct_on": [
                        100,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        97,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "curatedProjects_aggregate": [
                77,
                {
                    "distinct_on": [
                        100,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        97,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "id": [
                170
            ],
            "status": [
                1
            ],
            "username": [
                108
            ],
            "__typename": [
                108
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
                108
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
                108
            ]
        },
        "Account_aggregate_bool_exp": {
            "count": [
                5
            ],
            "__typename": [
                108
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
                108
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
                108
            ]
        },
        "Account_aggregate_order_by": {
            "count": [
                165
            ],
            "max": [
                13
            ],
            "min": [
                15
            ],
            "__typename": [
                108
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
                108
            ]
        },
        "Account_bool_exp": {
            "Account_Profiles": [
                40
            ],
            "Account_Profiles_aggregate": [
                35
            ],
            "Account_Wallets": [
                117
            ],
            "Account_Wallets_aggregate": [
                112
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
                84
            ],
            "authoredProjects_aggregate": [
                78
            ],
            "curatedProjects": [
                84
            ],
            "curatedProjects_aggregate": [
                78
            ],
            "id": [
                171
            ],
            "status": [
                2
            ],
            "username": [
                109
            ],
            "__typename": [
                108
            ]
        },
        "Account_constraint": {},
        "Account_insert_input": {
            "Account_Profiles": [
                39
            ],
            "Account_Wallets": [
                116
            ],
            "authoredProjects": [
                83
            ],
            "curatedProjects": [
                83
            ],
            "id": [
                170
            ],
            "status": [
                1
            ],
            "username": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Account_max_fields": {
            "id": [
                170
            ],
            "status": [
                1
            ],
            "username": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Account_max_order_by": {
            "id": [
                165
            ],
            "status": [
                165
            ],
            "username": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Account_min_fields": {
            "id": [
                170
            ],
            "status": [
                1
            ],
            "username": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Account_min_order_by": {
            "id": [
                165
            ],
            "status": [
                165
            ],
            "username": [
                165
            ],
            "__typename": [
                108
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
                108
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
                108
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
                108
            ]
        },
        "Account_order_by": {
            "Account_Profiles_aggregate": [
                38
            ],
            "Account_Wallets_aggregate": [
                115
            ],
            "authoredProjects_aggregate": [
                81
            ],
            "curatedProjects_aggregate": [
                81
            ],
            "id": [
                165
            ],
            "status": [
                165
            ],
            "username": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Account_pk_columns_input": {
            "id": [
                170
            ],
            "__typename": [
                108
            ]
        },
        "Account_select_column": {},
        "Account_set_input": {
            "id": [
                170
            ],
            "status": [
                1
            ],
            "username": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Account_stream_cursor_input": {
            "initial_value": [
                24
            ],
            "ordering": [
                161
            ],
            "__typename": [
                108
            ]
        },
        "Account_stream_cursor_value_input": {
            "id": [
                170
            ],
            "status": [
                1
            ],
            "username": [
                108
            ],
            "__typename": [
                108
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
                108
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
                108
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
                108
            ]
        },
        "Profile": {
            "accountId": [
                170
            ],
            "description": [
                108
            ],
            "instagram": [
                108
            ],
            "picture": [
                108
            ],
            "twitter": [
                108
            ],
            "website": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Profile_aggregate": {
            "aggregate": [
                37
            ],
            "nodes": [
                33
            ],
            "__typename": [
                108
            ]
        },
        "Profile_aggregate_bool_exp": {
            "count": [
                36
            ],
            "__typename": [
                108
            ]
        },
        "Profile_aggregate_bool_exp_count": {
            "arguments": [
                51
            ],
            "distinct": [
                29
            ],
            "filter": [
                40
            ],
            "predicate": [
                32
            ],
            "__typename": [
                108
            ]
        },
        "Profile_aggregate_fields": {
            "count": [
                31,
                {
                    "columns": [
                        51,
                        "[Profile_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                43
            ],
            "min": [
                45
            ],
            "__typename": [
                108
            ]
        },
        "Profile_aggregate_order_by": {
            "count": [
                165
            ],
            "max": [
                44
            ],
            "min": [
                46
            ],
            "__typename": [
                108
            ]
        },
        "Profile_arr_rel_insert_input": {
            "data": [
                42
            ],
            "on_conflict": [
                48
            ],
            "__typename": [
                108
            ]
        },
        "Profile_bool_exp": {
            "_and": [
                40
            ],
            "_not": [
                40
            ],
            "_or": [
                40
            ],
            "accountId": [
                171
            ],
            "description": [
                109
            ],
            "instagram": [
                109
            ],
            "picture": [
                109
            ],
            "twitter": [
                109
            ],
            "website": [
                109
            ],
            "__typename": [
                108
            ]
        },
        "Profile_constraint": {},
        "Profile_insert_input": {
            "accountId": [
                170
            ],
            "description": [
                108
            ],
            "instagram": [
                108
            ],
            "picture": [
                108
            ],
            "twitter": [
                108
            ],
            "website": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Profile_max_fields": {
            "accountId": [
                170
            ],
            "description": [
                108
            ],
            "instagram": [
                108
            ],
            "picture": [
                108
            ],
            "twitter": [
                108
            ],
            "website": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Profile_max_order_by": {
            "accountId": [
                165
            ],
            "description": [
                165
            ],
            "instagram": [
                165
            ],
            "picture": [
                165
            ],
            "twitter": [
                165
            ],
            "website": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Profile_min_fields": {
            "accountId": [
                170
            ],
            "description": [
                108
            ],
            "instagram": [
                108
            ],
            "picture": [
                108
            ],
            "twitter": [
                108
            ],
            "website": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Profile_min_order_by": {
            "accountId": [
                165
            ],
            "description": [
                165
            ],
            "instagram": [
                165
            ],
            "picture": [
                165
            ],
            "twitter": [
                165
            ],
            "website": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Profile_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                33
            ],
            "__typename": [
                108
            ]
        },
        "Profile_on_conflict": {
            "constraint": [
                41
            ],
            "update_columns": [
                55
            ],
            "where": [
                40
            ],
            "__typename": [
                108
            ]
        },
        "Profile_order_by": {
            "accountId": [
                165
            ],
            "description": [
                165
            ],
            "instagram": [
                165
            ],
            "picture": [
                165
            ],
            "twitter": [
                165
            ],
            "website": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Profile_pk_columns_input": {
            "accountId": [
                170
            ],
            "__typename": [
                108
            ]
        },
        "Profile_select_column": {},
        "Profile_set_input": {
            "accountId": [
                170
            ],
            "description": [
                108
            ],
            "instagram": [
                108
            ],
            "picture": [
                108
            ],
            "twitter": [
                108
            ],
            "website": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Profile_stream_cursor_input": {
            "initial_value": [
                54
            ],
            "ordering": [
                161
            ],
            "__typename": [
                108
            ]
        },
        "Profile_stream_cursor_value_input": {
            "accountId": [
                170
            ],
            "description": [
                108
            ],
            "instagram": [
                108
            ],
            "picture": [
                108
            ],
            "twitter": [
                108
            ],
            "website": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Profile_update_column": {},
        "Profile_updates": {
            "_set": [
                52
            ],
            "where": [
                40
            ],
            "__typename": [
                108
            ]
        },
        "Project": {
            "authorId": [
                170
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                166
            ],
            "curatorId": [
                170
            ],
            "description": [
                108
            ],
            "id": [
                170
            ],
            "pricing": [
                162,
                {
                    "path": [
                        108
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
                166
            ],
            "state": [
                75
            ],
            "storage": [
                106
            ],
            "title": [
                108
            ],
            "updatedAt": [
                166
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia": {
            "ProjectMedia_Project": [
                57
            ],
            "mediaId": [
                108
            ],
            "projectId": [
                170
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_aggregate": {
            "aggregate": [
                60
            ],
            "nodes": [
                58
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_aggregate_fields": {
            "count": [
                31,
                {
                    "columns": [
                        69,
                        "[ProjectMedia_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                64
            ],
            "min": [
                65
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_bool_exp": {
            "ProjectMedia_Project": [
                84
            ],
            "_and": [
                61
            ],
            "_not": [
                61
            ],
            "_or": [
                61
            ],
            "mediaId": [
                109
            ],
            "projectId": [
                171
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_constraint": {},
        "ProjectMedia_insert_input": {
            "ProjectMedia_Project": [
                95
            ],
            "mediaId": [
                108
            ],
            "projectId": [
                170
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_max_fields": {
            "mediaId": [
                108
            ],
            "projectId": [
                170
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_min_fields": {
            "mediaId": [
                108
            ],
            "projectId": [
                170
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                58
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_on_conflict": {
            "constraint": [
                62
            ],
            "update_columns": [
                73
            ],
            "where": [
                61
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_order_by": {
            "ProjectMedia_Project": [
                97
            ],
            "mediaId": [
                165
            ],
            "projectId": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_select_column": {},
        "ProjectMedia_set_input": {
            "mediaId": [
                108
            ],
            "projectId": [
                170
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_stream_cursor_input": {
            "initial_value": [
                72
            ],
            "ordering": [
                161
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_stream_cursor_value_input": {
            "mediaId": [
                108
            ],
            "projectId": [
                170
            ],
            "__typename": [
                108
            ]
        },
        "ProjectMedia_update_column": {},
        "ProjectMedia_updates": {
            "_set": [
                70
            ],
            "where": [
                61
            ],
            "__typename": [
                108
            ]
        },
        "ProjectState": {},
        "ProjectState_comparison_exp": {
            "_eq": [
                75
            ],
            "_gt": [
                75
            ],
            "_gte": [
                75
            ],
            "_in": [
                75
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                75
            ],
            "_lte": [
                75
            ],
            "_neq": [
                75
            ],
            "_nin": [
                75
            ],
            "__typename": [
                108
            ]
        },
        "Project_aggregate": {
            "aggregate": [
                80
            ],
            "nodes": [
                57
            ],
            "__typename": [
                108
            ]
        },
        "Project_aggregate_bool_exp": {
            "count": [
                79
            ],
            "__typename": [
                108
            ]
        },
        "Project_aggregate_bool_exp_count": {
            "arguments": [
                100
            ],
            "distinct": [
                29
            ],
            "filter": [
                84
            ],
            "predicate": [
                32
            ],
            "__typename": [
                108
            ]
        },
        "Project_aggregate_fields": {
            "count": [
                31,
                {
                    "columns": [
                        100,
                        "[Project_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                90
            ],
            "min": [
                92
            ],
            "__typename": [
                108
            ]
        },
        "Project_aggregate_order_by": {
            "count": [
                165
            ],
            "max": [
                91
            ],
            "min": [
                93
            ],
            "__typename": [
                108
            ]
        },
        "Project_append_input": {
            "pricing": [
                162
            ],
            "__typename": [
                108
            ]
        },
        "Project_arr_rel_insert_input": {
            "data": [
                89
            ],
            "on_conflict": [
                96
            ],
            "__typename": [
                108
            ]
        },
        "Project_bool_exp": {
            "_and": [
                84
            ],
            "_not": [
                84
            ],
            "_or": [
                84
            ],
            "authorId": [
                171
            ],
            "blockchain": [
                28
            ],
            "createdAt": [
                167
            ],
            "curatorId": [
                171
            ],
            "description": [
                109
            ],
            "id": [
                171
            ],
            "pricing": [
                164
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
                167
            ],
            "state": [
                76
            ],
            "storage": [
                107
            ],
            "title": [
                109
            ],
            "updatedAt": [
                167
            ],
            "__typename": [
                108
            ]
        },
        "Project_constraint": {},
        "Project_delete_at_path_input": {
            "pricing": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Project_delete_elem_input": {
            "pricing": [
                31
            ],
            "__typename": [
                108
            ]
        },
        "Project_delete_key_input": {
            "pricing": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Project_insert_input": {
            "authorId": [
                170
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                166
            ],
            "curatorId": [
                170
            ],
            "description": [
                108
            ],
            "id": [
                170
            ],
            "pricing": [
                162
            ],
            "projectAuthor": [
                17
            ],
            "projectCurator": [
                8
            ],
            "releaseAt": [
                166
            ],
            "state": [
                75
            ],
            "storage": [
                106
            ],
            "title": [
                108
            ],
            "updatedAt": [
                166
            ],
            "__typename": [
                108
            ]
        },
        "Project_max_fields": {
            "authorId": [
                170
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                166
            ],
            "curatorId": [
                170
            ],
            "description": [
                108
            ],
            "id": [
                170
            ],
            "releaseAt": [
                166
            ],
            "state": [
                75
            ],
            "storage": [
                106
            ],
            "title": [
                108
            ],
            "updatedAt": [
                166
            ],
            "__typename": [
                108
            ]
        },
        "Project_max_order_by": {
            "authorId": [
                165
            ],
            "blockchain": [
                165
            ],
            "createdAt": [
                165
            ],
            "curatorId": [
                165
            ],
            "description": [
                165
            ],
            "id": [
                165
            ],
            "releaseAt": [
                165
            ],
            "state": [
                165
            ],
            "storage": [
                165
            ],
            "title": [
                165
            ],
            "updatedAt": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Project_min_fields": {
            "authorId": [
                170
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                166
            ],
            "curatorId": [
                170
            ],
            "description": [
                108
            ],
            "id": [
                170
            ],
            "releaseAt": [
                166
            ],
            "state": [
                75
            ],
            "storage": [
                106
            ],
            "title": [
                108
            ],
            "updatedAt": [
                166
            ],
            "__typename": [
                108
            ]
        },
        "Project_min_order_by": {
            "authorId": [
                165
            ],
            "blockchain": [
                165
            ],
            "createdAt": [
                165
            ],
            "curatorId": [
                165
            ],
            "description": [
                165
            ],
            "id": [
                165
            ],
            "releaseAt": [
                165
            ],
            "state": [
                165
            ],
            "storage": [
                165
            ],
            "title": [
                165
            ],
            "updatedAt": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Project_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                57
            ],
            "__typename": [
                108
            ]
        },
        "Project_obj_rel_insert_input": {
            "data": [
                89
            ],
            "on_conflict": [
                96
            ],
            "__typename": [
                108
            ]
        },
        "Project_on_conflict": {
            "constraint": [
                85
            ],
            "update_columns": [
                104
            ],
            "where": [
                84
            ],
            "__typename": [
                108
            ]
        },
        "Project_order_by": {
            "authorId": [
                165
            ],
            "blockchain": [
                165
            ],
            "createdAt": [
                165
            ],
            "curatorId": [
                165
            ],
            "description": [
                165
            ],
            "id": [
                165
            ],
            "pricing": [
                165
            ],
            "projectAuthor": [
                19
            ],
            "projectCurator_aggregate": [
                7
            ],
            "releaseAt": [
                165
            ],
            "state": [
                165
            ],
            "storage": [
                165
            ],
            "title": [
                165
            ],
            "updatedAt": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Project_pk_columns_input": {
            "id": [
                170
            ],
            "__typename": [
                108
            ]
        },
        "Project_prepend_input": {
            "pricing": [
                162
            ],
            "__typename": [
                108
            ]
        },
        "Project_select_column": {},
        "Project_set_input": {
            "authorId": [
                170
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                166
            ],
            "curatorId": [
                170
            ],
            "description": [
                108
            ],
            "id": [
                170
            ],
            "pricing": [
                162
            ],
            "releaseAt": [
                166
            ],
            "state": [
                75
            ],
            "storage": [
                106
            ],
            "title": [
                108
            ],
            "updatedAt": [
                166
            ],
            "__typename": [
                108
            ]
        },
        "Project_stream_cursor_input": {
            "initial_value": [
                103
            ],
            "ordering": [
                161
            ],
            "__typename": [
                108
            ]
        },
        "Project_stream_cursor_value_input": {
            "authorId": [
                170
            ],
            "blockchain": [
                27
            ],
            "createdAt": [
                166
            ],
            "curatorId": [
                170
            ],
            "description": [
                108
            ],
            "id": [
                170
            ],
            "pricing": [
                162
            ],
            "releaseAt": [
                166
            ],
            "state": [
                75
            ],
            "storage": [
                106
            ],
            "title": [
                108
            ],
            "updatedAt": [
                166
            ],
            "__typename": [
                108
            ]
        },
        "Project_update_column": {},
        "Project_updates": {
            "_append": [
                82
            ],
            "_delete_at_path": [
                86
            ],
            "_delete_elem": [
                87
            ],
            "_delete_key": [
                88
            ],
            "_prepend": [
                99
            ],
            "_set": [
                101
            ],
            "where": [
                84
            ],
            "__typename": [
                108
            ]
        },
        "Storage": {},
        "Storage_comparison_exp": {
            "_eq": [
                106
            ],
            "_gt": [
                106
            ],
            "_gte": [
                106
            ],
            "_in": [
                106
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                106
            ],
            "_lte": [
                106
            ],
            "_neq": [
                106
            ],
            "_nin": [
                106
            ],
            "__typename": [
                108
            ]
        },
        "String": {},
        "String_comparison_exp": {
            "_eq": [
                108
            ],
            "_gt": [
                108
            ],
            "_gte": [
                108
            ],
            "_ilike": [
                108
            ],
            "_in": [
                108
            ],
            "_iregex": [
                108
            ],
            "_is_null": [
                29
            ],
            "_like": [
                108
            ],
            "_lt": [
                108
            ],
            "_lte": [
                108
            ],
            "_neq": [
                108
            ],
            "_nilike": [
                108
            ],
            "_nin": [
                108
            ],
            "_niregex": [
                108
            ],
            "_nlike": [
                108
            ],
            "_nregex": [
                108
            ],
            "_nsimilar": [
                108
            ],
            "_regex": [
                108
            ],
            "_similar": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Wallet": {
            "accountId": [
                170
            ],
            "address": [
                108
            ],
            "network": [
                27
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_aggregate": {
            "aggregate": [
                114
            ],
            "nodes": [
                110
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_aggregate_bool_exp": {
            "count": [
                113
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_aggregate_bool_exp_count": {
            "arguments": [
                128
            ],
            "distinct": [
                29
            ],
            "filter": [
                117
            ],
            "predicate": [
                32
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_aggregate_fields": {
            "count": [
                31,
                {
                    "columns": [
                        128,
                        "[Wallet_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                120
            ],
            "min": [
                122
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_aggregate_order_by": {
            "count": [
                165
            ],
            "max": [
                121
            ],
            "min": [
                123
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_arr_rel_insert_input": {
            "data": [
                119
            ],
            "on_conflict": [
                125
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_bool_exp": {
            "_and": [
                117
            ],
            "_not": [
                117
            ],
            "_or": [
                117
            ],
            "accountId": [
                171
            ],
            "address": [
                109
            ],
            "network": [
                28
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_constraint": {},
        "Wallet_insert_input": {
            "accountId": [
                170
            ],
            "address": [
                108
            ],
            "network": [
                27
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_max_fields": {
            "accountId": [
                170
            ],
            "address": [
                108
            ],
            "network": [
                27
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_max_order_by": {
            "accountId": [
                165
            ],
            "address": [
                165
            ],
            "network": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_min_fields": {
            "accountId": [
                170
            ],
            "address": [
                108
            ],
            "network": [
                27
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_min_order_by": {
            "accountId": [
                165
            ],
            "address": [
                165
            ],
            "network": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                110
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_on_conflict": {
            "constraint": [
                118
            ],
            "update_columns": [
                132
            ],
            "where": [
                117
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_order_by": {
            "accountId": [
                165
            ],
            "address": [
                165
            ],
            "network": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_pk_columns_input": {
            "address": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_select_column": {},
        "Wallet_set_input": {
            "accountId": [
                170
            ],
            "address": [
                108
            ],
            "network": [
                27
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_stream_cursor_input": {
            "initial_value": [
                131
            ],
            "ordering": [
                161
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_stream_cursor_value_input": {
            "accountId": [
                170
            ],
            "address": [
                108
            ],
            "network": [
                27
            ],
            "__typename": [
                108
            ]
        },
        "Wallet_update_column": {},
        "Wallet_updates": {
            "_set": [
                129
            ],
            "where": [
                117
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                108
            ],
            "finished_at": [
                168
            ],
            "id": [
                108
            ],
            "logs": [
                108
            ],
            "migration_name": [
                108
            ],
            "rolled_back_at": [
                168
            ],
            "started_at": [
                168
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_aggregate": {
            "aggregate": [
                136
            ],
            "nodes": [
                134
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_aggregate_fields": {
            "avg": [
                137
            ],
            "count": [
                31,
                {
                    "columns": [
                        148,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "distinct": [
                        29
                    ]
                }
            ],
            "max": [
                142
            ],
            "min": [
                143
            ],
            "stddev": [
                150
            ],
            "stddev_pop": [
                151
            ],
            "stddev_samp": [
                152
            ],
            "sum": [
                155
            ],
            "var_pop": [
                158
            ],
            "var_samp": [
                159
            ],
            "variance": [
                160
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_avg_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_bool_exp": {
            "_and": [
                138
            ],
            "_not": [
                138
            ],
            "_or": [
                138
            ],
            "applied_steps_count": [
                32
            ],
            "checksum": [
                109
            ],
            "finished_at": [
                169
            ],
            "id": [
                109
            ],
            "logs": [
                109
            ],
            "migration_name": [
                109
            ],
            "rolled_back_at": [
                169
            ],
            "started_at": [
                169
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_constraint": {},
        "_prisma_migrations_inc_input": {
            "applied_steps_count": [
                31
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_insert_input": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                108
            ],
            "finished_at": [
                168
            ],
            "id": [
                108
            ],
            "logs": [
                108
            ],
            "migration_name": [
                108
            ],
            "rolled_back_at": [
                168
            ],
            "started_at": [
                168
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_max_fields": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                108
            ],
            "finished_at": [
                168
            ],
            "id": [
                108
            ],
            "logs": [
                108
            ],
            "migration_name": [
                108
            ],
            "rolled_back_at": [
                168
            ],
            "started_at": [
                168
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_min_fields": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                108
            ],
            "finished_at": [
                168
            ],
            "id": [
                108
            ],
            "logs": [
                108
            ],
            "migration_name": [
                108
            ],
            "rolled_back_at": [
                168
            ],
            "started_at": [
                168
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_mutation_response": {
            "affected_rows": [
                31
            ],
            "returning": [
                134
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_on_conflict": {
            "constraint": [
                139
            ],
            "update_columns": [
                156
            ],
            "where": [
                138
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_order_by": {
            "applied_steps_count": [
                165
            ],
            "checksum": [
                165
            ],
            "finished_at": [
                165
            ],
            "id": [
                165
            ],
            "logs": [
                165
            ],
            "migration_name": [
                165
            ],
            "rolled_back_at": [
                165
            ],
            "started_at": [
                165
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_pk_columns_input": {
            "id": [
                108
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_select_column": {},
        "_prisma_migrations_set_input": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                108
            ],
            "finished_at": [
                168
            ],
            "id": [
                108
            ],
            "logs": [
                108
            ],
            "migration_name": [
                108
            ],
            "rolled_back_at": [
                168
            ],
            "started_at": [
                168
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_stddev_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_stddev_pop_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_stddev_samp_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_stream_cursor_input": {
            "initial_value": [
                154
            ],
            "ordering": [
                161
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_stream_cursor_value_input": {
            "applied_steps_count": [
                31
            ],
            "checksum": [
                108
            ],
            "finished_at": [
                168
            ],
            "id": [
                108
            ],
            "logs": [
                108
            ],
            "migration_name": [
                108
            ],
            "rolled_back_at": [
                168
            ],
            "started_at": [
                168
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_sum_fields": {
            "applied_steps_count": [
                31
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_update_column": {},
        "_prisma_migrations_updates": {
            "_inc": [
                140
            ],
            "_set": [
                149
            ],
            "where": [
                138
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_var_pop_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_var_samp_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                108
            ]
        },
        "_prisma_migrations_variance_fields": {
            "applied_steps_count": [
                30
            ],
            "__typename": [
                108
            ]
        },
        "cursor_ordering": {},
        "jsonb": {},
        "jsonb_cast_exp": {
            "String": [
                109
            ],
            "__typename": [
                108
            ]
        },
        "jsonb_comparison_exp": {
            "_cast": [
                163
            ],
            "_contained_in": [
                162
            ],
            "_contains": [
                162
            ],
            "_eq": [
                162
            ],
            "_gt": [
                162
            ],
            "_gte": [
                162
            ],
            "_has_key": [
                108
            ],
            "_has_keys_all": [
                108
            ],
            "_has_keys_any": [
                108
            ],
            "_in": [
                162
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                162
            ],
            "_lte": [
                162
            ],
            "_neq": [
                162
            ],
            "_nin": [
                162
            ],
            "__typename": [
                108
            ]
        },
        "order_by": {},
        "timestamp": {},
        "timestamp_comparison_exp": {
            "_eq": [
                166
            ],
            "_gt": [
                166
            ],
            "_gte": [
                166
            ],
            "_in": [
                166
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                166
            ],
            "_lte": [
                166
            ],
            "_neq": [
                166
            ],
            "_nin": [
                166
            ],
            "__typename": [
                108
            ]
        },
        "timestamptz": {},
        "timestamptz_comparison_exp": {
            "_eq": [
                168
            ],
            "_gt": [
                168
            ],
            "_gte": [
                168
            ],
            "_in": [
                168
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                168
            ],
            "_lte": [
                168
            ],
            "_neq": [
                168
            ],
            "_nin": [
                168
            ],
            "__typename": [
                108
            ]
        },
        "uuid": {},
        "uuid_comparison_exp": {
            "_eq": [
                170
            ],
            "_gt": [
                170
            ],
            "_gte": [
                170
            ],
            "_in": [
                170
            ],
            "_is_null": [
                29
            ],
            "_lt": [
                170
            ],
            "_lte": [
                170
            ],
            "_neq": [
                170
            ],
            "_nin": [
                170
            ],
            "__typename": [
                108
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
                        170,
                        "uuid!"
                    ]
                }
            ],
            "Profile": [
                33,
                {
                    "distinct_on": [
                        51,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        49,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "Profile_aggregate": [
                34,
                {
                    "distinct_on": [
                        51,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        49,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "Profile_by_pk": [
                33,
                {
                    "accountId": [
                        170,
                        "uuid!"
                    ]
                }
            ],
            "Project": [
                57,
                {
                    "distinct_on": [
                        100,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        97,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "ProjectMedia": [
                58,
                {
                    "distinct_on": [
                        69,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        68,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "ProjectMedia_aggregate": [
                59,
                {
                    "distinct_on": [
                        69,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        68,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "Project_aggregate": [
                77,
                {
                    "distinct_on": [
                        100,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        97,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "Project_by_pk": [
                57,
                {
                    "id": [
                        170,
                        "uuid!"
                    ]
                }
            ],
            "Wallet": [
                110,
                {
                    "distinct_on": [
                        128,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        126,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "Wallet_aggregate": [
                111,
                {
                    "distinct_on": [
                        128,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        126,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "Wallet_by_pk": [
                110,
                {
                    "address": [
                        108,
                        "String!"
                    ]
                }
            ],
            "_prisma_migrations": [
                134,
                {
                    "distinct_on": [
                        148,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        146,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        138
                    ]
                }
            ],
            "_prisma_migrations_aggregate": [
                135,
                {
                    "distinct_on": [
                        148,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        146,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        138
                    ]
                }
            ],
            "_prisma_migrations_by_pk": [
                134,
                {
                    "id": [
                        108,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                108
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
                        170,
                        "uuid!"
                    ]
                }
            ],
            "delete_Profile": [
                47,
                {
                    "where": [
                        40,
                        "Profile_bool_exp!"
                    ]
                }
            ],
            "delete_Profile_by_pk": [
                33,
                {
                    "accountId": [
                        170,
                        "uuid!"
                    ]
                }
            ],
            "delete_Project": [
                94,
                {
                    "where": [
                        84,
                        "Project_bool_exp!"
                    ]
                }
            ],
            "delete_ProjectMedia": [
                66,
                {
                    "where": [
                        61,
                        "ProjectMedia_bool_exp!"
                    ]
                }
            ],
            "delete_Project_by_pk": [
                57,
                {
                    "id": [
                        170,
                        "uuid!"
                    ]
                }
            ],
            "delete_Wallet": [
                124,
                {
                    "where": [
                        117,
                        "Wallet_bool_exp!"
                    ]
                }
            ],
            "delete_Wallet_by_pk": [
                110,
                {
                    "address": [
                        108,
                        "String!"
                    ]
                }
            ],
            "delete__prisma_migrations": [
                144,
                {
                    "where": [
                        138,
                        "_prisma_migrations_bool_exp!"
                    ]
                }
            ],
            "delete__prisma_migrations_by_pk": [
                134,
                {
                    "id": [
                        108,
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
            "insert_Profile": [
                47,
                {
                    "objects": [
                        42,
                        "[Profile_insert_input!]!"
                    ],
                    "on_conflict": [
                        48
                    ]
                }
            ],
            "insert_Profile_one": [
                33,
                {
                    "object": [
                        42,
                        "Profile_insert_input!"
                    ],
                    "on_conflict": [
                        48
                    ]
                }
            ],
            "insert_Project": [
                94,
                {
                    "objects": [
                        89,
                        "[Project_insert_input!]!"
                    ],
                    "on_conflict": [
                        96
                    ]
                }
            ],
            "insert_ProjectMedia": [
                66,
                {
                    "objects": [
                        63,
                        "[ProjectMedia_insert_input!]!"
                    ],
                    "on_conflict": [
                        67
                    ]
                }
            ],
            "insert_ProjectMedia_one": [
                58,
                {
                    "object": [
                        63,
                        "ProjectMedia_insert_input!"
                    ],
                    "on_conflict": [
                        67
                    ]
                }
            ],
            "insert_Project_one": [
                57,
                {
                    "object": [
                        89,
                        "Project_insert_input!"
                    ],
                    "on_conflict": [
                        96
                    ]
                }
            ],
            "insert_Wallet": [
                124,
                {
                    "objects": [
                        119,
                        "[Wallet_insert_input!]!"
                    ],
                    "on_conflict": [
                        125
                    ]
                }
            ],
            "insert_Wallet_one": [
                110,
                {
                    "object": [
                        119,
                        "Wallet_insert_input!"
                    ],
                    "on_conflict": [
                        125
                    ]
                }
            ],
            "insert__prisma_migrations": [
                144,
                {
                    "objects": [
                        141,
                        "[_prisma_migrations_insert_input!]!"
                    ],
                    "on_conflict": [
                        145
                    ]
                }
            ],
            "insert__prisma_migrations_one": [
                134,
                {
                    "object": [
                        141,
                        "_prisma_migrations_insert_input!"
                    ],
                    "on_conflict": [
                        145
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
            "update_Profile": [
                47,
                {
                    "_set": [
                        52
                    ],
                    "where": [
                        40,
                        "Profile_bool_exp!"
                    ]
                }
            ],
            "update_Profile_by_pk": [
                33,
                {
                    "_set": [
                        52
                    ],
                    "pk_columns": [
                        50,
                        "Profile_pk_columns_input!"
                    ]
                }
            ],
            "update_Profile_many": [
                47,
                {
                    "updates": [
                        56,
                        "[Profile_updates!]!"
                    ]
                }
            ],
            "update_Project": [
                94,
                {
                    "_append": [
                        82
                    ],
                    "_delete_at_path": [
                        86
                    ],
                    "_delete_elem": [
                        87
                    ],
                    "_delete_key": [
                        88
                    ],
                    "_prepend": [
                        99
                    ],
                    "_set": [
                        101
                    ],
                    "where": [
                        84,
                        "Project_bool_exp!"
                    ]
                }
            ],
            "update_ProjectMedia": [
                66,
                {
                    "_set": [
                        70
                    ],
                    "where": [
                        61,
                        "ProjectMedia_bool_exp!"
                    ]
                }
            ],
            "update_ProjectMedia_many": [
                66,
                {
                    "updates": [
                        74,
                        "[ProjectMedia_updates!]!"
                    ]
                }
            ],
            "update_Project_by_pk": [
                57,
                {
                    "_append": [
                        82
                    ],
                    "_delete_at_path": [
                        86
                    ],
                    "_delete_elem": [
                        87
                    ],
                    "_delete_key": [
                        88
                    ],
                    "_prepend": [
                        99
                    ],
                    "_set": [
                        101
                    ],
                    "pk_columns": [
                        98,
                        "Project_pk_columns_input!"
                    ]
                }
            ],
            "update_Project_many": [
                94,
                {
                    "updates": [
                        105,
                        "[Project_updates!]!"
                    ]
                }
            ],
            "update_Wallet": [
                124,
                {
                    "_set": [
                        129
                    ],
                    "where": [
                        117,
                        "Wallet_bool_exp!"
                    ]
                }
            ],
            "update_Wallet_by_pk": [
                110,
                {
                    "_set": [
                        129
                    ],
                    "pk_columns": [
                        127,
                        "Wallet_pk_columns_input!"
                    ]
                }
            ],
            "update_Wallet_many": [
                124,
                {
                    "updates": [
                        133,
                        "[Wallet_updates!]!"
                    ]
                }
            ],
            "update__prisma_migrations": [
                144,
                {
                    "_inc": [
                        140
                    ],
                    "_set": [
                        149
                    ],
                    "where": [
                        138,
                        "_prisma_migrations_bool_exp!"
                    ]
                }
            ],
            "update__prisma_migrations_by_pk": [
                134,
                {
                    "_inc": [
                        140
                    ],
                    "_set": [
                        149
                    ],
                    "pk_columns": [
                        147,
                        "_prisma_migrations_pk_columns_input!"
                    ]
                }
            ],
            "update__prisma_migrations_many": [
                144,
                {
                    "updates": [
                        157,
                        "[_prisma_migrations_updates!]!"
                    ]
                }
            ],
            "__typename": [
                108
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
                        170,
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
            "Profile": [
                33,
                {
                    "distinct_on": [
                        51,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        49,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "Profile_aggregate": [
                34,
                {
                    "distinct_on": [
                        51,
                        "[Profile_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        49,
                        "[Profile_order_by!]"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "Profile_by_pk": [
                33,
                {
                    "accountId": [
                        170,
                        "uuid!"
                    ]
                }
            ],
            "Profile_stream": [
                33,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        53,
                        "[Profile_stream_cursor_input]!"
                    ],
                    "where": [
                        40
                    ]
                }
            ],
            "Project": [
                57,
                {
                    "distinct_on": [
                        100,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        97,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "ProjectMedia": [
                58,
                {
                    "distinct_on": [
                        69,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        68,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "ProjectMedia_aggregate": [
                59,
                {
                    "distinct_on": [
                        69,
                        "[ProjectMedia_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        68,
                        "[ProjectMedia_order_by!]"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "ProjectMedia_stream": [
                58,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        71,
                        "[ProjectMedia_stream_cursor_input]!"
                    ],
                    "where": [
                        61
                    ]
                }
            ],
            "Project_aggregate": [
                77,
                {
                    "distinct_on": [
                        100,
                        "[Project_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        97,
                        "[Project_order_by!]"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "Project_by_pk": [
                57,
                {
                    "id": [
                        170,
                        "uuid!"
                    ]
                }
            ],
            "Project_stream": [
                57,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        102,
                        "[Project_stream_cursor_input]!"
                    ],
                    "where": [
                        84
                    ]
                }
            ],
            "Wallet": [
                110,
                {
                    "distinct_on": [
                        128,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        126,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "Wallet_aggregate": [
                111,
                {
                    "distinct_on": [
                        128,
                        "[Wallet_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        126,
                        "[Wallet_order_by!]"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "Wallet_by_pk": [
                110,
                {
                    "address": [
                        108,
                        "String!"
                    ]
                }
            ],
            "Wallet_stream": [
                110,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        130,
                        "[Wallet_stream_cursor_input]!"
                    ],
                    "where": [
                        117
                    ]
                }
            ],
            "_prisma_migrations": [
                134,
                {
                    "distinct_on": [
                        148,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        146,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        138
                    ]
                }
            ],
            "_prisma_migrations_aggregate": [
                135,
                {
                    "distinct_on": [
                        148,
                        "[_prisma_migrations_select_column!]"
                    ],
                    "limit": [
                        31
                    ],
                    "offset": [
                        31
                    ],
                    "order_by": [
                        146,
                        "[_prisma_migrations_order_by!]"
                    ],
                    "where": [
                        138
                    ]
                }
            ],
            "_prisma_migrations_by_pk": [
                134,
                {
                    "id": [
                        108,
                        "String!"
                    ]
                }
            ],
            "_prisma_migrations_stream": [
                134,
                {
                    "batch_size": [
                        31,
                        "Int!"
                    ],
                    "cursor": [
                        153,
                        "[_prisma_migrations_stream_cursor_input]!"
                    ],
                    "where": [
                        138
                    ]
                }
            ],
            "__typename": [
                108
            ]
        }
    }
}