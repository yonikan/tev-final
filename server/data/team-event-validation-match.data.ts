export const TEAM_EVENT_VALIDATION_MATCH_DATA: any = {
        id: 23,
        metadata: {
                isNew: true,
                startTime: 1576147936000,
                endTime: 1576156936000,
                offset: 3,
                venue: 1,
                myScore: 4,
                opponentScore: 3,
                opponentName: 'opponent name',
                opponentPrevNames: ['opponent prev name1', 'opponent prev name2'],
                tags: ['tag1', 'tag2'],
                competition: 1,
                velocityVector: {
                        startTimeInterpMs: 222,
                        timeDtMs: 333,
                        velInterpMs: [ 444, 555, 666 ]
                },
                tagsList: ['tag1', 'tag2'],
                opponentList: ['opponent1', 'opponent2']
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