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
  validated_consent_cgu: Scalars['String'];
};

export type InputUpdateUser = {
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
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
  deleteUser: ResponseMessage;
  forgotPassword: ResponseMessage;
  googleAuth: ResponseMessage;
  logout: Scalars['Boolean'];
  registerVisitor: ResponseMessage;
  resetPassword: ResponseMessage;
  updatePassword: ResponseMessage;
  updateUser: UserWoPassword;
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
  data: EmailInput;
};


export type MutationGoogleAuthArgs = {
  token: Scalars['String'];
};


export type MutationRegisterVisitorArgs = {
  data: EmailInput;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  resetToken: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  data: UpdatePasswordInput;
};


export type MutationUpdateUserArgs = {
  data: InputUpdateUser;
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
  getUserFromCtx?: Maybe<UserWoPassword>;
  login: ResponseMessage;
  projectBySlug?: Maybe<Project>;
  projects?: Maybe<Array<ProjectCard>>;
  teamMembers?: Maybe<Array<TeamMember>>;
  technologies?: Maybe<Array<Technology>>;
  userById?: Maybe<UserWoPassword>;
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


export type QueryUserByIdArgs = {
  id: Scalars['Float'];
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

export type UpdatePasswordInput = {
  confirmNewPassword: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type UserWoPassword = {
  __typename?: 'UserWoPassword';
  email: Scalars['String'];
  first_name: Scalars['String'];
  id: Scalars['Int'];
  last_name: Scalars['String'];
  role: Scalars['String'];
};

export type ConfirmRegisterMutationVariables = Exact<{
  data: InputRegisterValidation;
}>;


export type ConfirmRegisterMutation = { __typename?: 'Mutation', confirmRegister: { __typename?: 'ResponseMessage', message: string, success: boolean } };

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

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'ResponseMessage', message: string, success: boolean } };

export type ForgotPasswordMutationVariables = Exact<{
  data: EmailInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ResponseMessage', message: string, success: boolean } };

export type GetUserFromCtxQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFromCtxQuery = { __typename?: 'Query', getUserFromCtx?: { __typename?: 'UserWoPassword', id: number, first_name: string, last_name: string, email: string, role: string } | null };

export type GoogleAuthMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type GoogleAuthMutation = { __typename?: 'Mutation', googleAuth: { __typename?: 'ResponseMessage', message: string, success: boolean } };

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'ResponseMessage', message: string, success: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ProjectBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ProjectBySlugQuery = { __typename?: 'Query', projectBySlug?: { __typename?: 'Project', id: number, title: string, slug: string, completion_date: string, duration: string, excerpt: string, description: string, area_of_improvement?: string | null, src_picture?: string | null, src_video?: string | null, created_at: string, updated_at: string, team_members?: Array<{ __typename?: 'TeamMember', name: string, linkedin?: string | null, src_icon: string }> | null, technologies: Array<{ __typename?: 'Technology', name: string, src_icon: string }> } | null };

export type ProjectsQueryVariables = Exact<{
  technologyIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'ProjectCard', id: number, title: string, slug: string, completion_date: string, duration: string, excerpt: string, prof_env: boolean, company_name?: string | null, src_picture?: string | null, team_members?: Array<{ __typename?: 'TeamMemberWOProjectRelation', id: number, name: string, linkedin?: string | null, src_icon: string }> | null, technologies: Array<{ __typename?: 'TechnologyWOProjectRelation', id: number, name: string, src_icon: string }> }> | null };

export type RegisterVisitorMutationVariables = Exact<{
  data: EmailInput;
}>;


export type RegisterVisitorMutation = { __typename?: 'Mutation', registerVisitor: { __typename?: 'ResponseMessage', message: string, success: boolean } };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  resetToken: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'ResponseMessage', message: string, success: boolean } };

export type TeamMembersQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamMembersQuery = { __typename?: 'Query', teamMembers?: Array<{ __typename?: 'TeamMember', id: number, name: string, linkedin?: string | null, src_icon: string }> | null };

export type TechnologiesQueryVariables = Exact<{ [key: string]: never; }>;


export type TechnologiesQuery = { __typename?: 'Query', technologies?: Array<{ __typename?: 'Technology', id: number, name: string, src_icon: string }> | null };

export type UpdatePasswordMutationVariables = Exact<{
  data: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: { __typename?: 'ResponseMessage', message: string, success: boolean } };

export type UpdateUserMutationVariables = Exact<{
  data: InputUpdateUser;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserWoPassword', id: number, first_name: string, last_name: string, email: string, role: string } };

export type UserByIdQueryVariables = Exact<{
  userByIdId: Scalars['Float'];
}>;


export type UserByIdQuery = { __typename?: 'Query', userById?: { __typename?: 'UserWoPassword', id: number, first_name: string, last_name: string, email: string, role: string } | null };


export const ConfirmRegisterDocument = gql`
    mutation ConfirmRegister($data: InputRegisterValidation!) {
  confirmRegister(data: $data) {
    message
    success
  }
}
    `;
export type ConfirmRegisterMutationFn = Apollo.MutationFunction<ConfirmRegisterMutation, ConfirmRegisterMutationVariables>;

/**
 * __useConfirmRegisterMutation__
 *
 * To run a mutation, you first call `useConfirmRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmRegisterMutation, { data, loading, error }] = useConfirmRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useConfirmRegisterMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmRegisterMutation, ConfirmRegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmRegisterMutation, ConfirmRegisterMutationVariables>(ConfirmRegisterDocument, options);
      }
export type ConfirmRegisterMutationHookResult = ReturnType<typeof useConfirmRegisterMutation>;
export type ConfirmRegisterMutationResult = Apollo.MutationResult<ConfirmRegisterMutation>;
export type ConfirmRegisterMutationOptions = Apollo.BaseMutationOptions<ConfirmRegisterMutation, ConfirmRegisterMutationVariables>;
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
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser {
    message
    success
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($data: EmailInput!) {
  forgotPassword(data: $data) {
    message
    success
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetUserFromCtxDocument = gql`
    query GetUserFromCtx {
  getUserFromCtx {
    id
    first_name
    last_name
    email
    role
  }
}
    `;

/**
 * __useGetUserFromCtxQuery__
 *
 * To run a query within a React component, call `useGetUserFromCtxQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFromCtxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFromCtxQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserFromCtxQuery(baseOptions?: Apollo.QueryHookOptions<GetUserFromCtxQuery, GetUserFromCtxQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFromCtxQuery, GetUserFromCtxQueryVariables>(GetUserFromCtxDocument, options);
      }
export function useGetUserFromCtxLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFromCtxQuery, GetUserFromCtxQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFromCtxQuery, GetUserFromCtxQueryVariables>(GetUserFromCtxDocument, options);
        }
export type GetUserFromCtxQueryHookResult = ReturnType<typeof useGetUserFromCtxQuery>;
export type GetUserFromCtxLazyQueryHookResult = ReturnType<typeof useGetUserFromCtxLazyQuery>;
export type GetUserFromCtxQueryResult = Apollo.QueryResult<GetUserFromCtxQuery, GetUserFromCtxQueryVariables>;
export const GoogleAuthDocument = gql`
    mutation GoogleAuth($token: String!) {
  googleAuth(token: $token) {
    message
    success
  }
}
    `;
export type GoogleAuthMutationFn = Apollo.MutationFunction<GoogleAuthMutation, GoogleAuthMutationVariables>;

/**
 * __useGoogleAuthMutation__
 *
 * To run a mutation, you first call `useGoogleAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleAuthMutation, { data, loading, error }] = useGoogleAuthMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGoogleAuthMutation(baseOptions?: Apollo.MutationHookOptions<GoogleAuthMutation, GoogleAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleAuthMutation, GoogleAuthMutationVariables>(GoogleAuthDocument, options);
      }
export type GoogleAuthMutationHookResult = ReturnType<typeof useGoogleAuthMutation>;
export type GoogleAuthMutationResult = Apollo.MutationResult<GoogleAuthMutation>;
export type GoogleAuthMutationOptions = Apollo.BaseMutationOptions<GoogleAuthMutation, GoogleAuthMutationVariables>;
export const LoginDocument = gql`
    query Login($infos: InputLogin!) {
  login(infos: $infos) {
    message
    success
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export const RegisterVisitorDocument = gql`
    mutation RegisterVisitor($data: EmailInput!) {
  registerVisitor(data: $data) {
    message
    success
  }
}
    `;
export type RegisterVisitorMutationFn = Apollo.MutationFunction<RegisterVisitorMutation, RegisterVisitorMutationVariables>;

/**
 * __useRegisterVisitorMutation__
 *
 * To run a mutation, you first call `useRegisterVisitorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterVisitorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerVisitorMutation, { data, loading, error }] = useRegisterVisitorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterVisitorMutation(baseOptions?: Apollo.MutationHookOptions<RegisterVisitorMutation, RegisterVisitorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterVisitorMutation, RegisterVisitorMutationVariables>(RegisterVisitorDocument, options);
      }
export type RegisterVisitorMutationHookResult = ReturnType<typeof useRegisterVisitorMutation>;
export type RegisterVisitorMutationResult = Apollo.MutationResult<RegisterVisitorMutation>;
export type RegisterVisitorMutationOptions = Apollo.BaseMutationOptions<RegisterVisitorMutation, RegisterVisitorMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($newPassword: String!, $resetToken: String!) {
  resetPassword(newPassword: $newPassword, resetToken: $resetToken) {
    message
    success
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      resetToken: // value for 'resetToken'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
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
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($data: UpdatePasswordInput!) {
  updatePassword(data: $data) {
    message
    success
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($data: InputUpdateUser!) {
  updateUser(data: $data) {
    id
    first_name
    last_name
    email
    role
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserByIdDocument = gql`
    query UserById($userByIdId: Float!) {
  userById(id: $userByIdId) {
    id
    first_name
    last_name
    email
    role
  }
}
    `;

/**
 * __useUserByIdQuery__
 *
 * To run a query within a React component, call `useUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdQuery({
 *   variables: {
 *      userByIdId: // value for 'userByIdId'
 *   },
 * });
 */
export function useUserByIdQuery(baseOptions: Apollo.QueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
      }
export function useUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByIdQuery, UserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByIdQuery, UserByIdQueryVariables>(UserByIdDocument, options);
        }
export type UserByIdQueryHookResult = ReturnType<typeof useUserByIdQuery>;
export type UserByIdLazyQueryHookResult = ReturnType<typeof useUserByIdLazyQuery>;
export type UserByIdQueryResult = Apollo.QueryResult<UserByIdQuery, UserByIdQueryVariables>;