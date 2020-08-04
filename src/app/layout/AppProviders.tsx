import React from "react"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { BrowserRouter } from "react-router-dom"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { useAuthStore } from "features/Authentication/AuthStore"
import { mutationList } from "common/graphql/mutation"
import "typeface-roboto"

const isMutation = (value: string) => {
  if (mutationList.includes(value)) {
    return true
  }
  return false
}

const createClient = async (token: string) => {
  const authLink = setContext((request, { headers }) => {
    const mutation = isMutation(request.operationName || "")
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
        "X-GraphQL-Method": mutation ? "Mutation" : "Query",
      },
    }
  })
  const link = authLink.concat(
    createHttpLink({
      uri: `${process.env.REACT_APP_GRAPHQL_SERVER}/graphql`,
      credentials: "include",
    }),
  )

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  })
}

const muiTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#cce6ff",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
      },
    },
  },
})

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = React.useState<ApolloClient<any> | undefined>(
    undefined,
  )
  const [{ token }] = useAuthStore()
  React.useEffect(() => {
    createClient(token).then((apollo) => setClient(apollo))
    return () => {}
  }, [token])

  if (client === undefined) return <div /> // maybe we could replace with animated dicty logo someday

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={muiTheme}>
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
          {children}
        </BrowserRouter>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}

export { isMutation }
export default AppProviders