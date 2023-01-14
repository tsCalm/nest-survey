
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateOptionInput {
    text: string;
    order: number;
    question_id: number;
}

export interface UpdateOptionInput {
    text?: Nullable<string>;
    order?: Nullable<number>;
}

export interface CreateQuestionInput {
    title: string;
    order: number;
    score: number;
    is_multiple_answer?: Nullable<boolean>;
    example?: Nullable<string>;
    survey_id: number;
}

export interface UpdateQuestionInput {
    title?: Nullable<string>;
    is_multiple_answer?: Nullable<boolean>;
    order?: Nullable<number>;
    score?: Nullable<number>;
    example?: Nullable<string>;
    survey_id: number;
}

export interface CreateSurveyInput {
    title: string;
    goodbye_message: string;
    description: string;
}

export interface UpdateSurveyInput {
    title?: Nullable<string>;
    goodbye_message?: Nullable<string>;
    description?: Nullable<string>;
}

export interface SaveUserResponseInput {
    survey_id: number;
    question_id: number;
    user_id: number;
    user_answer: string;
}

export interface UserResponseInput {
    survey_id: number;
    question_id: number;
    user_id: number;
}

export interface UserSurveyInput {
    survey_id: number;
    user_id: number;
}

export interface SurveyQuestionOption {
    id?: Nullable<number>;
    text?: Nullable<string>;
    order?: Nullable<number>;
    question_id?: Nullable<number>;
    created_at?: Nullable<DateTime>;
    updated_at?: Nullable<DateTime>;
}

export interface IQuery {
    optionList(): Nullable<Nullable<SurveyQuestionOption>[]> | Promise<Nullable<Nullable<SurveyQuestionOption>[]>>;
    option(id: number): Nullable<SurveyQuestionOption> | Promise<Nullable<SurveyQuestionOption>>;
    questionList(): Nullable<Nullable<SurveyQuestion>[]> | Promise<Nullable<Nullable<SurveyQuestion>[]>>;
    question(id: number): Nullable<SurveyQuestion> | Promise<Nullable<SurveyQuestion>>;
    surveyList(): Nullable<Nullable<Survey>[]> | Promise<Nullable<Nullable<Survey>[]>>;
    survey(id: number): Nullable<Survey> | Promise<Nullable<Survey>>;
    userResponseList(): Nullable<Nullable<UserResponse>[]> | Promise<Nullable<Nullable<UserResponse>[]>>;
    userResponse(findUserResponseInput?: Nullable<UserResponseInput>): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;
    completedSurveyList(): Nullable<Nullable<UserSurvey>[]> | Promise<Nullable<Nullable<UserSurvey>[]>>;
    completedSurvey(userSurveyInput?: Nullable<UserSurveyInput>): Nullable<UserSurvey> | Promise<Nullable<UserSurvey>>;
}

export interface IMutation {
    createOption(createOptionInput?: Nullable<CreateOptionInput>): Nullable<SurveyQuestionOption> | Promise<Nullable<SurveyQuestionOption>>;
    updateOption(id: number, updateOptionInput?: Nullable<UpdateOptionInput>): Nullable<SurveyQuestionOption> | Promise<Nullable<SurveyQuestionOption>>;
    deleteOption(id: number): Nullable<SurveyQuestionOption> | Promise<Nullable<SurveyQuestionOption>>;
    createQuestion(createQuestionInput?: Nullable<CreateQuestionInput>): Nullable<SurveyQuestion> | Promise<Nullable<SurveyQuestion>>;
    updateQuestion(id: number, updateQuestionInput?: Nullable<UpdateQuestionInput>): Nullable<SurveyQuestion> | Promise<Nullable<SurveyQuestion>>;
    deleteQuestion(id: number): Nullable<SurveyQuestion> | Promise<Nullable<SurveyQuestion>>;
    createSurvey(createSurveyInput?: Nullable<CreateSurveyInput>): Nullable<Survey> | Promise<Nullable<Survey>>;
    updateSurvey(id: number, updateSurveyInput?: Nullable<UpdateSurveyInput>): Nullable<Survey> | Promise<Nullable<Survey>>;
    deleteSurvey(id: number): Nullable<Survey> | Promise<Nullable<Survey>>;
    completeSurvey(id?: Nullable<number>): Nullable<Survey> | Promise<Nullable<Survey>>;
    saveUserSelectOption(saveUserResponseInput?: Nullable<SaveUserResponseInput>): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;
    deleteUserSelectOption(findUserResponseInput?: Nullable<UserResponseInput>): Nullable<UserResponse> | Promise<Nullable<UserResponse>>;
    startUserSurvey(userSurveyInput?: Nullable<UserSurveyInput>): Nullable<UserSurvey> | Promise<Nullable<UserSurvey>>;
    completeUserSurvey(userSurveyInput?: Nullable<UserSurveyInput>): Nullable<UserSurvey> | Promise<Nullable<UserSurvey>>;
}

export interface SurveyQuestion {
    id?: Nullable<number>;
    title?: Nullable<string>;
    order?: Nullable<number>;
    score?: Nullable<number>;
    example?: Nullable<string>;
    survey_id?: Nullable<number>;
    is_multiple_answer?: Nullable<boolean>;
    options?: Nullable<Nullable<SurveyQuestionOption>[]>;
    created_at?: Nullable<DateTime>;
    updated_at?: Nullable<DateTime>;
}

export interface Survey {
    id: number;
    title: string;
    goodbye_message: string;
    total_score?: Nullable<number>;
    is_complete?: Nullable<boolean>;
    description: string;
    questions?: Nullable<Nullable<SurveyQuestion>[]>;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface UserResponse {
    survey_id?: Nullable<number>;
    question_id?: Nullable<number>;
    user_id?: Nullable<number>;
    user_answer?: Nullable<string>;
}

export interface UserSurvey {
    survey_id?: Nullable<number>;
    user_id?: Nullable<number>;
    is_complete?: Nullable<boolean>;
    user_total_score?: Nullable<number>;
}

export type DateTime = any;
type Nullable<T> = T | null;
