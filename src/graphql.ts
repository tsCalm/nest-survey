
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateQuestionInput {
    title: string;
    order: number;
    score: number;
    example?: Nullable<string>;
    survey_id: number;
}

export interface UpdateQuestionInput {
    title?: Nullable<string>;
    order?: Nullable<number>;
    score?: Nullable<number>;
    example?: Nullable<string>;
    survey_id?: Nullable<number>;
}

export interface CreateSurveyInput {
    title: string;
    sub_title: string;
    description: string;
}

export interface UpdateSurveyInput {
    title?: Nullable<string>;
    sub_title?: Nullable<string>;
    description?: Nullable<string>;
}

export interface Question {
    title?: Nullable<string>;
    order?: Nullable<number>;
    score?: Nullable<number>;
    example?: Nullable<string>;
    survey_id?: Nullable<number>;
}

export interface IQuery {
    questionList(): Nullable<Nullable<Question>[]> | Promise<Nullable<Nullable<Question>[]>>;
    question(id: number): Nullable<Question> | Promise<Nullable<Question>>;
    surveyList(): Nullable<Nullable<Survey>[]> | Promise<Nullable<Nullable<Survey>[]>>;
    survey(id: number): Nullable<Survey> | Promise<Nullable<Survey>>;
}

export interface IMutation {
    createQuestion(createQuestionInput?: Nullable<CreateQuestionInput>): Nullable<Question> | Promise<Nullable<Question>>;
    updateQuestion(id: number, updateQuestionInput?: Nullable<UpdateQuestionInput>): Nullable<Question> | Promise<Nullable<Question>>;
    createSurvey(createSurveyInput?: Nullable<CreateSurveyInput>): Nullable<Survey> | Promise<Nullable<Survey>>;
    updateSurvey(id: number, updateSurveyInput?: Nullable<UpdateSurveyInput>): Nullable<Survey> | Promise<Nullable<Survey>>;
}

export interface Survey {
    id: number;
    title: string;
    sub_title: string;
    description: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export type DateTime = any;
type Nullable<T> = T | null;
