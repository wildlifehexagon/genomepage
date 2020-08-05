import React from "react"
import ServerError from "./ServerError"
import NotFoundError from "./NotFoundError"
import OtherError from "./OtherError"
import { ApolloError } from "@apollo/client"

type Props = {
  /** GraphQL error object */
  error: ApolloError
}

/**
 * GraphQLErrorPage is used to display any errors found when issuing a
 * GraphQL query or mutation.
 */

const GraphQLErrorPage = ({ error }: Props) => {
  if (!error || !error.message) return null

  if (error.networkError) {
    console.error(error.networkError)
    return <ServerError />
  }

  let errorCode, errorMsg

  if (error.graphQLErrors && error.graphQLErrors[0].extensions) {
    errorCode = error.graphQLErrors[0].extensions.code
    errorMsg = error.graphQLErrors[0].message
  }

  if (errorCode === "Unavailable") {
    return <ServerError />
  }

  if (errorCode === "NotFound" && errorMsg) {
    return (
      <NotFoundError
        error={errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
      />
    )
  }

  return <OtherError />
}

GraphQLErrorPage.defaultProps = {
  error: {},
}

export default GraphQLErrorPage
