export const TEAM_EVENT_VALIDATION_TRAINING_DATA: any = {
        id : 22,
        metadata: {
                isNew: true,
                startTime: 1576147936000,
                endTime: 1576156936000,
                offset: 3,
                tags: ['tag1', 'tag2'],
                velocityVector: {
                        startTimeInterpMs: 222,
                        timeDtMs: 333,
                        velInterpMs: [ 444, 555, 666 ]
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
                                { startTime: 1576147936000, endTime: 1576156936000 ,  errorId: '12'} 
                        ],
                        isParticipated: true
                }
           }
        },
        phases:{ 
                phasesList: [
                        {
                                id: 12,
                                type: 1,
                                subType: 2,
                                subTypeAnalysis : 1,
                                phaseName: 'phase name',
                                startTime: 1576147936000,
                                endTime: 1576156936000,
                                offset: 3,
                                pitchWidth: 200,
                                pitchLength: 350,
                                lineup: {
                                        1: [321,523],
                                        2: [532,32],
                                        0: []
                                }       
                        }
                ] 
        },
        draft: false
};