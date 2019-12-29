export interface TrainingValidation {
    id?: number,
    metadata?: any,
    draft?: any;
    step1GeneralData: any;
    step2PlayersData: any;
    step3PhasesData: any;
}

export interface MatchValidation {
    id?: number,
    metadata?: any,
    step1OverviewData: any;
    step2PlayersData: any;
    step3FormationsData: any;
    step4PhasesData: any;
    step5SubsData: any;
}