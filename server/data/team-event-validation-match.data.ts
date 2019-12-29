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
    formation: {
        name: 'formation name',
        formationPosition: {
            positionName: 'position name',
            playerId: 333,
            matrixXPosition: 4,
            matrixYPosition: 5
        }            
    },
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