export const TEAM_EVENT_VALIDATION_TRAINING: any = {
	id: 1,
	draft: {

    },
    metadata: {
		startTime: 1,
		endTime: 1,
		offset: 1,
		tags: [
			'tag1',
			'tag2'
		],
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
    phases: {
        phasesList: [
            {
                id: 1,
                type: 1,
                name: 1,
                startTime: 1,
				endTime: 1,
				subject: 'test subject',
                pitch_size: 'test pitch size',
				lineup: {
					subTeam: [
						333,
						444,
						555
				    ]
				}
			},
			{
                id: 2,
                type: 2,
                name: 2,
                startTime: 2,
				endTime: 2,
				subject: 'test subject',
                pitch_size: 'test pitch size',
				lineup: {
					subTeam: [ 
						333, 
						444, 
						555
					]
				}
            }
        ]
    }
}