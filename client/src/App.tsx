import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { Client } from "./pages/client/client";
import { Freelancer } from "./pages/freelancer/freelancer";
import { Gig } from "./pages/gig/gig";
import { Gigs } from "./pages/gigs/gigs";
import { Homepage } from "./pages/homepage/homepage";
import { Login } from "./pages/login/login";
import { Signup } from "./pages/signup/signup";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Message } from "./pages/message/Message";

const client = new ApolloClient({
  uri: "http://localhost:8800/graphql",
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/client" element={<Client />}></Route>
          <Route path="/freelancer" element={<Freelancer />}></Route>
          <Route path="/gigs" element={<Gigs />}></Route>
          <Route path="/gigs/:id" element={<Gig />}></Route>
          <Route path="/messages/:id" element={<Message />}></Route>

          
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};
