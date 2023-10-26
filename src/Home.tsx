import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FavouriteToken } from "./App";
import Token from "./Token";
import { NavLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import "./App.css";

const Home = () => {
  const favouriteTokenUrl = "http://localhost:5050/";
  const [token, setToken] = useState<FavouriteToken[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData(`${favouriteTokenUrl}coinmarket`);
  }, []);

  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
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
        setSuccess(true);
      }
    }
  }

  function skeleton() {
    return token.length < 1 ? (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    ) : (
      <h1></h1>
    );
  }

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

  const navigation = () => {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to="/mytokens">
              {" "}
              <Button colorScheme={"telegram"} leftIcon={<StarIcon />}>
                My token
              </Button>{" "}
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  };

  const alert = () => {
    return (
      success && (
        <Alert className="alert" status="success" variant="subtle">
          <AlertIcon />
          Token added !!!
        </Alert>
      )
    );
  };

  return (
    <>
      {navigation()}
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        padding="3rem"
      >
        <Box display="flex" flexDirection="column" gap="10px">
          <Heading size="md">Labrys technical tasks</Heading>
          {skeleton()}
          {renderTokens()}
          {alert()}
        </Box>
      </Box>
    </>
  );
};

export default Home;
