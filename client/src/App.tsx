import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { Client } from "./pages/client/client";
import { Freelancer } from "./pages/freelancer/freelancer";
import { Gig } from "./pages/gig/gig";
import { Gigs } from "./pages/gigs/gigs";
import { Homepage } from "./pages/homepage/homepage";
import { Login } from "./pages/login/login";
import { Message } from "./pages/message/Message";
import { Signup } from "./pages/signup/signup";

const link = from([new HttpLink({ uri: "http://localhost:8800" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
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
          <Route path="/message" element={<Message />}></Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};
