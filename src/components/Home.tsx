import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FavouriteToken } from "../App";
import Token from "./Token";
import { NavLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";

const Home = () => {
  // Create a toast notification
  const toast = useToast();

  // Define the API endpoint URL
  const favouriteTokenUrl = "http://52.21.132.238:5050/";

  // State to hold token data
  const [token, setToken] = useState<FavouriteToken[]>([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    fetchData(`${favouriteTokenUrl}coinmarket`);
  }, []);

  // Function to fetch data from the API
  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      // Transform the API data into FavouriteToken objects
      const tokens: FavouriteToken[] = result.data.map((item: any) => ({
        id: item.id,
        symbol: item.symbol,
        price: item.quote.USD.price,
        percent_change_1h: item.quote.USD.percent_change_1h,
        market_cap: item.quote.USD.market_cap,
      }));
      setToken(tokens);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Function to handle adding a token to "My tokens"
  async function handleTokenClick(token: FavouriteToken) {
    const request = await fetch(`${favouriteTokenUrl}posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(token),
    });

    if (!request.ok) {
      throw new Error(`HTTP error! Status: ${request.status}`);
    } else {
      const response = await request.json();
      if (response) {
        // Show a success toast notification
        toast({
          title: "Token added",
          description: "Token added to 'My tokens'",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }

  // Function to render a loading skeleton if no tokens are available
  function skeleton() {
    return (
      token.length < 1 && (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )
    );
  }

  // Function to render the token components
  function renderTokens() {
    return token.map((favToken) => (
      <Token
        key={favToken.id}
        id={favToken.id}
        symbol={favToken.symbol}
        price={favToken.price}
        percent_change_1h={favToken.percent_change_1h}
        market_cap={favToken.market_cap}
        onTokenClick={() => {
          handleTokenClick(favToken);
        }}
      />
    ));
  }

  // Function to render navigation link
  const navigation = () => {
    return (
      <nav>
        <NavLink to="/mytokens">
          <Button colorScheme={"telegram"} leftIcon={<StarIcon />}>
            My token
          </Button>
        </NavLink>
      </nav>
    );
  };

  return (
    <>
      <Box position="relative" display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" gap="10px">
          {navigation()} {/* Render the navigation link */}
          <Heading size="md">Labrys technical tasks</Heading>
          {skeleton()} {/* Render loading skeleton */}
          {renderTokens()} {/* Render token components */}
        </Box>
      </Box>
    </>
  );
};

export default Home;
