import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider, useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { Navbar2 } from "./components/navbar2/navbar2";
import { Add } from "./pages/add/Add";
import { Client } from "./pages/client/client";
import { EditClient } from "./pages/editClient/editClient";
import { EditGig } from "./pages/editGig/editGig";
import { Freelancer } from "./pages/freelancer/freelancer";
import { Gig } from "./pages/gig/gig";
import { Gigs } from "./pages/gigs/gigs";
import { Homepage } from "./pages/homepage/homepage";
import { Login } from "./pages/login/login";
import { Message } from "./pages/message/Message";
import { MyGigs } from "./pages/myGigs/myGigs";
import { OrderDashboard } from "./pages/orderDashboard/orderDashboard";
import { Privacy } from "./pages/privacy/privacy";
import { Signup } from "./pages/signup/signup";


const httpLink = createHttpLink({
  uri: "http://localhost:8800",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("userJwtToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client: any = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

const state = () => {
  const [cookies, setCookie] = useCookies(["userJwtToken"]);
  if (cookies.userJwtToken) {
    return <Navbar2 />;
  } else {
    return <Navbar />;
  }
};

export const App = () => (
  <ChakraProvider>
    <ApolloProvider client={client}>
      <CookiesProvider>
        <BrowserRouter>
          {state()}
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/client" element={<Client />}></Route>
            <Route path="/freelancer" element={<Freelancer />}></Route>
            <Route path="/gigs" element={<Gigs />}></Route>
            <Route path="/gig/:id" element={<Gig />}></Route>
            <Route path="/messages" element={<Message />}></Route>
            <Route path="/message" element={<Message />}></Route>
            <Route path="/add" element={<Add />}></Route>
            <Route path="/privacy" element={<Privacy />}></Route>
            <Route path="/editClient" element={<EditClient />}></Route>
            <Route path="/orderDashboard" element={<OrderDashboard />}></Route>
            <Route path="/editGig/:id" element={<EditGig />}></Route>
            <Route path="/myGigs" element={<MyGigs />}></Route>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </ApolloProvider>
  </ChakraProvider>
);
