
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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

export interface Survey {
    id: number;
    title: string;
    sub_title: string;
    description: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface IQuery {
    surveyList(): Nullable<Nullable<Survey>[]> | Promise<Nullable<Nullable<Survey>[]>>;
    survey(id: number): Nullable<Survey> | Promise<Nullable<Survey>>;
}

export interface IMutation {
    createSurvey(createSurveyInput?: Nullable<CreateSurveyInput>): Nullable<Survey> | Promise<Nullable<Survey>>;
    updateSurvey(id: number, updateSurveyInput?: Nullable<UpdateSurveyInput>): Nullable<Survey> | Promise<Nullable<Survey>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
