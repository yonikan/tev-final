export const TEAM_EVENT_VALIDATION_MATCH_DATA: any = {
        id: 23,
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
                velocityVector: {
                        "start_time_interp_ms": 1550037600000,
                        "time_dt_ms": 1800000,
                        "vel_interp_ms": [
                                4.9297,
                                7.4327,
                                3.807,
                                8.2209,
                                5.1861,
                                7.2354,
                                3.8126,
                                6.3656,
                                6.3442
                        ]
                }
        },
        participatingPlayers :{
                playersList: {
                     444: {
                             id: 444,
                             firstName: 'yossi',
                             lastName: 'cohen',
                             defaultPositionId: 3,
                             activeTime: [
                                     { startTime: 1576147936000, endTime: 1576156936000 , timeFrameType: 'active'}
                             ],
                             isParticipated: true
                     }
                }
        },
        formation: [
                {
                        name: 'formation 1',
                        formationPosition: [
                                {
                                        positionName: 'pos name',
                                        positionX: 2,
                                        positionY: 3,
                                        playerId: 343
                                },
                                {
                                        positionName: 'pos name',
                                        positionX: 2,
                                        positionY: 3,
                                        playerId: 343
                                }
                         ]
                }
        ],
        phases: {
          phasesList: [
                {
                        id: 2,
                        type: 1,
                        name: 3,
                        startTime: 1576147936000,
                        endTime: 1576156936000,
                        offset: 3,
                        numberOfSubs: 2
                }
           ]
        },
        substitutions: {
          subList: [
                {
                        id: 3,
                        inPlayerId: 44,
                        outPlayerId: 55,
                        timeMin: 33
                }
          ],
          suggestedSubs: [
                {
                        id: 3,
                        inPlayerId: 44,
                        outPlayerId: 55,
                        timeMin: 33
                }
          ]
        },
        draft: false
};
