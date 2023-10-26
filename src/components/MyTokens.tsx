import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FavouriteToken } from "../App";
import Token from "./Token";

// Define a TypeScript interface for tokens with an additional _id field
interface TokenWithId extends FavouriteToken {
  _id: string;
}

const MyTokens = () => {
  const toast = useToast();

  // State to hold favorite tokens
  const [token, setToken] = useState<TokenWithId[]>([]);

  // Define the API endpoint URL
  const favouriteTokenUrl = "http://52.21.132.238:5050/";

  // Fetch favorite tokens from the server on component mount
  useEffect(() => {
    fetchData(`${favouriteTokenUrl}cmp`);
  }, []);

  // Function to fetch favorite tokens from the server
  async function fetchData(url: string) {
    try {
      const response = await fetch(`${url}`);
      if (!response) {
        throw new Error(`HTTP error! Status:`);
      }
      const result = await response.json();
      setToken(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Function to handle deleting a favorite token
  async function handleDelete(id: string) {
    const request = await fetch(`${favouriteTokenUrl}delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const response = await request.json();
    if (!response) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      // Show a success toast notification
      toast({
        title: "Token deleted",
        description: "Your token has been deleted'",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
    const currentTokens = token.filter((element) => {
      if (element._id !== id) {
        return element;
      }
    });
    setToken(currentTokens);
  }

  // Function to render favorite tokens
  const renderFavouriteTokens = () => {
    return token.map((favToken) => (
      <Box position="relative" key={`token${favToken._id}`}>
        <Token
          id={favToken.id}
          symbol={favToken.symbol}
          price={favToken.price}
          percent_change_1h={favToken.percent_change_1h}
          market_cap={favToken.market_cap}
        />
        <CloseButton
          position="absolute"
          bottom="80%"
          left="97%"
          key={`delete${favToken._id}`}
          size="sm"
          background="burlywood"
          color="black"
          onClick={() => {
            handleDelete(favToken._id);
          }}
        />
      </Box>
    ));
  };

  // Function to render navigation link
  const navigation = () => {
    return (
      <nav>
        <NavLink to="/">
          {" "}
          <Button colorScheme="telegram" leftIcon={<HamburgerIcon />}>
            Home
          </Button>{" "}
        </NavLink>
      </nav>
    );
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          gap="25px"
          padding={{ base: "1rem", sm: "1rem" }}
        >
          {navigation()} {/* Render the navigation link */}
          <Heading size="md">Favourite Tokens</Heading>
          {token.length < 1 ? <Text>No tokens</Text> : <Text></Text>}
          {renderFavouriteTokens()} {/* Render favorite tokens */}
        </Box>
      </Box>
    </>
  );
};

export default MyTokens;
