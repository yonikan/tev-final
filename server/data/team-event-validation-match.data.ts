export const TEAM_EVENT_VALIDATION_MATCH: any = {
    id: 1,
    draft: {

    },
    metadata: {
        isNew: true,
        startTime: 4,
        endTime: 5,
        offset: 6,
        vanue: 1,
        myScore: 1,
        opponentScore: 1,
        opponentName: 'opponent name',
        tags: [
            'test1',
            'test2'
        ],
        competition: 2,
		velocityVector: [
			{
				startTimeInterpMs: 2,
				timeDtMs: 3,
				velInterpMs: 4.2
			}
        ]
    },
    participatingPlayers : {
		playersList: {
			222: {
					id: 222,
					firstName: 'yossi',
					lastName: 'levi',
					defaultPositionId: 4,
					activeTime: [
						{
							startTime: 3,
							endTime: 3,
							error: 4
						}
					],
					isParticipated: true,
			},
			333: {
					id: 333,
					firstName: 'yossi',
					lastName: 'cohen',
					defaultPositionId: 4,
					activeTime: [
						{
							startTime: 3,
							endTime: 3,
							error: 4
						},
						{
							startTime: 3,
							endTime: 3,
							error: 4
						}
					],
					isParticipated: true,
			}
		},
		swapsList: [
			{
				id: 3,
				srcPlayerId: 4,
				destPlayerId: 5
			},
			{
				id: 4,
				srcPlayerId: 4,
				destPlayerId: 5
			}
		]
    },
    formation: [
		{
			"_id": 1,
			"name": "4-4-2",
			"formationPosition": [
				{
					"positionId": 1,
					"playerId": "",
					"positionX": 5,
					"positionY": 8,
					"positionName": "XX"
				},
				{
					"positionId": 2,
					"playerId": "",
					"positionX": 4,
					"positionY": 2,
					"positionName": "XX"
				},
				{
					"positionId": 3,
					"playerId": "",
					"positionX": 6,
					"positionY": 2,
					"positionName": "XX"
				},
				{
					"positionId": 4,
					"playerId": "",
					"positionX": 4,
					"positionY": 4,
					"positionName": "XX"
				},
				{
					"positionId": 5,
					"playerId": "",
					"positionX": 6,
					"positionY": 4,
					"positionName": "XX"
				},
				{
					"positionId": 6,
					"playerId": "",
					"positionX": 8,
					"positionY": 4,
					"positionName": "XX"
				},
				{
					"positionId": 7,
					"playerId": "",
					"positionX": 2,
					"positionY": 4,
					"positionName": "XX"
				},
				{
					"positionId": 8,
					"playerId": "",
					"positionX": 2,
					"positionY": 6,
					"positionName": "XX"
				},
				{
					"positionId": 9,
					"playerId": "",
					"positionX": 4,
					"positionY": 6,
					"positionName": "XX"
				},
				{
					"positionId": 10,
					"playerId": "",
					"positionX": 6,
					"positionY": 6,
					"positionName": "XX"
				},
				{
					"positionId": 11,
					"playerId": "",
					"positionX": 8,
					"positionY": 6,
					"positionName": "XX"
				}
			]
		},
		{
			"_id": 2,
			"name": "4-1-2-3",
			"formationPosition": [
				{
					"playerId": "5dfb821a6b341e94340bdff9",
					"positionX": 5,
					"positionY": 8,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821a2a96b063ce51e7ef",
					"positionX": 2,
					"positionY": 6,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821a43ff5cc4749a8da1",
					"positionX": 4,
					"positionY": 6,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821af98fbd9f08b3cf83",
					"positionX": 6,
					"positionY": 6,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821ac6208b1f92386bfb",
					"positionX": 8,
					"positionY": 6,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821a36dd78c83750115c",
					"positionX": 5,
					"positionY": 5,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821a373a1a17f0f92c1b",
					"positionX": 4,
					"positionY": 4,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821ac237fcbf646f6516",
					"positionX": 6,
					"positionY": 4,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821a90be093b21869f6a",
					"positionX": 2,
					"positionY": 2,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821a549b7d3a13df98cc",
					"positionX": 8,
					"positionY": 2,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821ac68009fe26f34b6e",
					"positionX": 5,
					"positionY": 1,
					"positionName": "XX"
				}
			]
		},
		{
			"_id": 3,
			"name": "4-5-1",
			"formationPosition": [
				{
					"playerId": "5dfb821af0cc17c8ca43bd93",
					"positionX": 5,
					"positionY": 8,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821a11d8308f7a192c46",
					"positionX": 4,
					"positionY": 6,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821aaa585af4212baa5a",
					"positionX": 5,
					"positionY": 6,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821ad416f04b4f99ac95",
					"positionX": 6,
					"positionY": 6,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821a4c38ab5bb609d52a",
					"positionX": 2,
					"positionY": 5,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821ab1d3b3de7eb0c67e",
					"positionX": 5,
					"positionY": 5,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821abe6fc814ac48f5d1",
					"positionX": 8,
					"positionY": 5,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821af051a9a6a960fad7",
					"positionX": 4,
					"positionY": 4,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821af697c3a8ea54115b",
					"positionX": 6,
					"positionY": 4,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821ac078999ef09f1ba0",
					"positionX": 5,
					"positionY": 3,
					"positionName": "XX"
				},
				{
					"playerId": "5dfb821ac1027ffb979936fe",
					"positionX": 5,
					"positionY": 2,
					"positionName": "XX"
				}
			]
		}
	  ]
	,
    phases: {
        phasesList: [
            {
                id: 1,
                type: 1,
                name: 1,
                startTime: 1,
                endTime: 1,
                offset: 1,
                numberOfSubs: 1
            },
            {
                id: 2,
                type: 2,
                name: 2,
                startTime: 2,
                endTime: 2,
                offset: 2,
                numberOfSubs: 2
            }
        ]
    },
    substitutions: {
        subList: [
            {
                id: 1,
                inPlayerId: 1,
                outPlayerId: 1,
                timeMin: 1
            },
            {
                id: 2,
                inPlayerId: 2,
                outPlayerId: 2,
                timeMin: 2
            }
        ]
    }
}