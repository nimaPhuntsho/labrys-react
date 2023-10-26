import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, CloseButton, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FavouriteToken } from "./App";
import Token from "./Token";

interface TokenWithId extends FavouriteToken {
  _id: string;
}

const MyTokens = () => {
  const [token, setToken] = useState<TokenWithId[]>([]);
  const favouriteTokenUrl = "http://localhost:5050/";

  useEffect(() => {
    fetchData(favouriteTokenUrl);
  }, []);

  async function fetchData(url: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setToken(result);

      //   token.forEach((element) => console.log(element._id));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
    }
    const currentTokens = token.filter((element) => {
      if (element._id !== id) {
        return element;
      }
    });
    setToken(currentTokens);
  }

  const renderFavouriteTokens = () => {
    return token.map((favToken) => (
      <div className="token-wrapper" key={`token${favToken._id}`}>
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
      </div>
    ));
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              {" "}
              <Button colorScheme="telegram" leftIcon={<HamburgerIcon />}>
                Home
              </Button>{" "}
            </NavLink>
          </li>
        </ul>
      </nav>
      <Box display="flex" justifyContent="center" padding="3rem">
        <Box display="flex" flexDirection="column" gap="25px">
          <Heading size="md">Favourite Tokens</Heading>
          {token.length < 1 ? <Text>No tokens</Text> : <Text></Text>}
          {renderFavouriteTokens()}
        </Box>
      </Box>
    </>
  );
};

export default MyTokens;
