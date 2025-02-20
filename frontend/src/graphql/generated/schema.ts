import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type EmailInput = {
  email: Scalars['String'];
};

export type InputLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type InputRegisterValidation = {
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MemberInput = {
  linkedin?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  src_icon: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmRegister: ResponseMessage;
  createProject: Project;
  createTeamMember: TeamMember;
  createTechnology: Technology;
  forgotPassword: ResponseMessage;
  googleAuth: ResponseMessage;
  logout: Scalars['Boolean'];
  refreshToken: Scalars['String'];
  registerVisitor: ResponseMessage;
  resetPassword: ResponseMessage;
};


export type MutationConfirmRegisterArgs = {
  data: InputRegisterValidation;
};


export type MutationCreateProjectArgs = {
  data: ProjectInput;
};


export type MutationCreateTeamMemberArgs = {
  data: MemberInput;
};


export type MutationCreateTechnologyArgs = {
  data: TechnologyInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationGoogleAuthArgs = {
  token: Scalars['String'];
};


export type MutationRegisterVisitorArgs = {
  data: EmailInput;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  area_of_improvement?: Maybe<Scalars['String']>;
  company_name?: Maybe<Scalars['String']>;
  completion_date: Scalars['String'];
  created_at: Scalars['String'];
  description: Scalars['String'];
  duration: Scalars['String'];
  excerpt: Scalars['String'];
  id: Scalars['Int'];
  prof_env: Scalars['Boolean'];
  slug: Scalars['String'];
  src_picture?: Maybe<Scalars['String']>;
  src_video?: Maybe<Scalars['String']>;
  team_members?: Maybe<Array<TeamMember>>;
  technologies: Array<Technology>;
  title: Scalars['String'];
  updated_at: Scalars['String'];
};

export type ProjectCard = {
  __typename?: 'ProjectCard';
  company_name?: Maybe<Scalars['String']>;
  completion_date: Scalars['String'];
  duration: Scalars['String'];
  excerpt: Scalars['String'];
  id: Scalars['Int'];
  prof_env: Scalars['Boolean'];
  slug: Scalars['String'];
  src_picture?: Maybe<Scalars['String']>;
  team_members?: Maybe<Array<TeamMemberWoProjectRelation>>;
  technologies: Array<TechnologyWoProjectRelation>;
  title: Scalars['String'];
};

export type ProjectInput = {
  area_of_improvement?: InputMaybe<Scalars['String']>;
  company_name?: InputMaybe<Scalars['String']>;
  completion_date: Scalars['String'];
  description: Scalars['String'];
  duration: Scalars['String'];
  excerpt: Scalars['String'];
  prof_env?: Scalars['Boolean'];
  src_picture?: InputMaybe<Scalars['String']>;
  src_video?: InputMaybe<Scalars['String']>;
  team_members?: InputMaybe<Array<Scalars['Int']>>;
  technologies: Array<Scalars['Int']>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getRole: Array<UserWoPassword>;
  login: ResponseMessage;
  projectBySlug?: Maybe<Project>;
  projects?: Maybe<Array<ProjectCard>>;
  teamMembers?: Maybe<Array<TeamMember>>;
  technologies?: Maybe<Array<Technology>>;
  users: Array<UserWoPassword>;
};


export type QueryLoginArgs = {
  infos: InputLogin;
};


export type QueryProjectBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryProjectsArgs = {
  technologyIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type ResponseMessage = {
  __typename?: 'ResponseMessage';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type TeamMember = {
  __typename?: 'TeamMember';
  id: Scalars['Int'];
  linkedin?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  projects: Array<Project>;
  src_icon: Scalars['String'];
};

export type TeamMemberWoProjectRelation = {
  __typename?: 'TeamMemberWOProjectRelation';
  id: Scalars['Int'];
  linkedin?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  src_icon: Scalars['String'];
};

export type Technology = {
  __typename?: 'Technology';
  id: Scalars['Int'];
  name: Scalars['String'];
  projects?: Maybe<Array<Project>>;
  src_icon: Scalars['String'];
};

export type TechnologyInput = {
  name: Scalars['String'];
  src_icon: Scalars['String'];
};

export type TechnologyWoProjectRelation = {
  __typename?: 'TechnologyWOProjectRelation';
  id: Scalars['Int'];
  name: Scalars['String'];
  src_icon: Scalars['String'];
};

export type UserWoPassword = {
  __typename?: 'UserWOPassword';
  created_at: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['Int'];
  last_name: Scalars['String'];
  modified_at: Scalars['String'];
  role: Scalars['String'];
};

export type CreateTeamMemberMutationVariables = Exact<{
  data: MemberInput;
}>;


export type CreateTeamMemberMutation = { __typename?: 'Mutation', createTeamMember: { __typename?: 'TeamMember', name: string, linkedin?: string | null, src_icon: string } };

export type CreateProjectMutationVariables = Exact<{
  data: ProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: number, title: string, slug: string, completion_date: string, duration: string, excerpt: string, description: string, area_of_improvement?: string | null, prof_env: boolean, company_name?: string | null, src_picture?: string | null, src_video?: string | null, created_at: string, updated_at: string, team_members?: Array<{ __typename?: 'TeamMember', name: string, linkedin?: string | null, src_icon: string, id: number }> | null, technologies: Array<{ __typename?: 'Technology', id: number, name: string, src_icon: string }> } };

export type CreateTechnologyMutationVariables = Exact<{
  data: TechnologyInput;
}>;


export type CreateTechnologyMutation = { __typename?: 'Mutation', createTechnology: { __typename?: 'Technology', id: number, name: string, src_icon: string } };

export type ProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ProjectBySlugQuery = { __typename?: 'Query', projectBySlug?: { __typename?: 'Project', id: number, title: string, slug: string, completion_date: string, duration: string, excerpt: string, description: string, area_of_improvement?: string | null, src_picture?: string | null, src_video?: string | null, created_at: string, updated_at: string, team_members?: Array<{ __typename?: 'TeamMember', name: string, linkedin?: string | null, src_icon: string }> | null, technologies: Array<{ __typename?: 'Technology', name: string, src_icon: string }> } | null };

export type ProjectsQueryVariables = Exact<{
  technologyIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'ProjectCard', id: number, title: string, slug: string, completion_date: string, duration: string, excerpt: string, prof_env: boolean, company_name?: string | null, src_picture?: string | null, team_members?: Array<{ __typename?: 'TeamMemberWOProjectRelation', id: number, name: string, linkedin?: string | null, src_icon: string }> | null, technologies: Array<{ __typename?: 'TechnologyWOProjectRelation', id: number, name: string, src_icon: string }> }> | null };

export type TeamMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamMembersQuery = { __typename?: 'Query', teamMembers?: Array<{ __typename?: 'TeamMember', id: number, name: string, linkedin?: string | null, src_icon: string }> | null };

export type TechnologiesQueryVariables = Exact<{ [key: string]: never; }>;


export type TechnologiesQuery = { __typename?: 'Query', technologies?: Array<{ __typename?: 'Technology', id: number, name: string, src_icon: string }> | null };


export const CreateTeamMemberDocument = gql`
    mutation CreateTeamMember($data: MemberInput!) {
  createTeamMember(data: $data) {
    name
    linkedin
    src_icon
  }
}
    `;
export type CreateTeamMemberMutationFn = Apollo.MutationFunction<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>;

/**
 * __useCreateTeamMemberMutation__
 *
 * To run a mutation, you first call `useCreateTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMemberMutation, { data, loading, error }] = useCreateTeamMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTeamMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>(CreateTeamMemberDocument, options);
      }
export type CreateTeamMemberMutationHookResult = ReturnType<typeof useCreateTeamMemberMutation>;
export type CreateTeamMemberMutationResult = Apollo.MutationResult<CreateTeamMemberMutation>;
export type CreateTeamMemberMutationOptions = Apollo.BaseMutationOptions<CreateTeamMemberMutation, CreateTeamMemberMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($data: ProjectInput!) {
  createProject(data: $data) {
    id
    title
    slug
    completion_date
    duration
    excerpt
    description
    area_of_improvement
    prof_env
    company_name
    src_picture
    src_video
    team_members {
      name
      linkedin
      src_icon
      id
    }
    technologies {
      id
      name
      src_icon
    }
    created_at
    updated_at
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateTechnologyDocument = gql`
    mutation CreateTechnology($data: TechnologyInput!) {
  createTechnology(data: $data) {
    id
    name
    src_icon
  }
}
    `;
export type CreateTechnologyMutationFn = Apollo.MutationFunction<CreateTechnologyMutation, CreateTechnologyMutationVariables>;

/**
 * __useCreateTechnologyMutation__
 *
 * To run a mutation, you first call `useCreateTechnologyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTechnologyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTechnologyMutation, { data, loading, error }] = useCreateTechnologyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTechnologyMutation(baseOptions?: Apollo.MutationHookOptions<CreateTechnologyMutation, CreateTechnologyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTechnologyMutation, CreateTechnologyMutationVariables>(CreateTechnologyDocument, options);
      }
export type CreateTechnologyMutationHookResult = ReturnType<typeof useCreateTechnologyMutation>;
export type CreateTechnologyMutationResult = Apollo.MutationResult<CreateTechnologyMutation>;
export type CreateTechnologyMutationOptions = Apollo.BaseMutationOptions<CreateTechnologyMutation, CreateTechnologyMutationVariables>;
export const ProjectBySlugDocument = gql`
    query ProjectBySlug($slug: String!) {
  projectBySlug(slug: $slug) {
    id
    title
    slug
    completion_date
    duration
    excerpt
    description
    area_of_improvement
    src_picture
    src_video
    team_members {
      name
      linkedin
      src_icon
    }
    technologies {
      name
      src_icon
    }
    created_at
    updated_at
  }
}
    `;

/**
 * __useProjectBySlugQuery__
 *
 * To run a query within a React component, call `useProjectBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProjectBySlugQuery(baseOptions: Apollo.QueryHookOptions<ProjectBySlugQuery, ProjectBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectBySlugQuery, ProjectBySlugQueryVariables>(ProjectBySlugDocument, options);
      }
export function useProjectBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectBySlugQuery, ProjectBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectBySlugQuery, ProjectBySlugQueryVariables>(ProjectBySlugDocument, options);
        }
export type ProjectBySlugQueryHookResult = ReturnType<typeof useProjectBySlugQuery>;
export type ProjectBySlugLazyQueryHookResult = ReturnType<typeof useProjectBySlugLazyQuery>;
export type ProjectBySlugQueryResult = Apollo.QueryResult<ProjectBySlugQuery, ProjectBySlugQueryVariables>;
export const ProjectsDocument = gql`
    query Projects($technologyIds: [Int!]) {
  projects(technologyIds: $technologyIds) {
    id
    title
    slug
    completion_date
    duration
    excerpt
    prof_env
    company_name
    src_picture
    team_members {
      id
      name
      linkedin
      src_icon
    }
    technologies {
      id
      name
      src_icon
    }
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      technologyIds: // value for 'technologyIds'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const TeamMembersDocument = gql`
    query TeamMembers {
  teamMembers {
    id
    name
    linkedin
    src_icon
  }
}
    `;

/**
 * __useTeamMembersQuery__
 *
 * To run a query within a React component, call `useTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useTeamMembersQuery(baseOptions?: Apollo.QueryHookOptions<TeamMembersQuery, TeamMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamMembersQuery, TeamMembersQueryVariables>(TeamMembersDocument, options);
      }
export function useTeamMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamMembersQuery, TeamMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamMembersQuery, TeamMembersQueryVariables>(TeamMembersDocument, options);
        }
export type TeamMembersQueryHookResult = ReturnType<typeof useTeamMembersQuery>;
export type TeamMembersLazyQueryHookResult = ReturnType<typeof useTeamMembersLazyQuery>;
export type TeamMembersQueryResult = Apollo.QueryResult<TeamMembersQuery, TeamMembersQueryVariables>;
export const TechnologiesDocument = gql`
    query Technologies {
  technologies {
    id
    name
    src_icon
  }
}
    `;

/**
 * __useTechnologiesQuery__
 *
 * To run a query within a React component, call `useTechnologiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTechnologiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTechnologiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTechnologiesQuery(baseOptions?: Apollo.QueryHookOptions<TechnologiesQuery, TechnologiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TechnologiesQuery, TechnologiesQueryVariables>(TechnologiesDocument, options);
      }
export function useTechnologiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TechnologiesQuery, TechnologiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TechnologiesQuery, TechnologiesQueryVariables>(TechnologiesDocument, options);
        }
export type TechnologiesQueryHookResult = ReturnType<typeof useTechnologiesQuery>;
export type TechnologiesLazyQueryHookResult = ReturnType<typeof useTechnologiesLazyQuery>;
export type TechnologiesQueryResult = Apollo.QueryResult<TechnologiesQuery, TechnologiesQueryVariables>;