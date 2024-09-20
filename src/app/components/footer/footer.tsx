import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  max-width: 376px
  height: 590px;
  display: flex;
  background-size: cover;
  background-image: url(/img/pink-bg.jpg);
  background-size: cover;
  background-color: rgba(255, 255, 255, 0.3); /* 50% transparent white */
  background-blend-mode: normal; /* or multiply, overlay depending on the effect */
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container >
        <Stack flexDirection={"row"} sx={{ mt: "94px", bg: "rgb(191,97,89)"}}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <img width={"100px"} src={"/img/skinviaLogo.webp"} />
            </Box>
            <Box className={"foot-desc-txt"}>
              Focusing on natural beauty and self-care, 
              LuxeGlow Cosmetics aims to redefine skincare for modern women. 
              LuxeGlow Cosmetics blends science and nature to create products that enhance radiant skin.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} />
              <img src={"/icons/twitter.svg"} />
              <img src={"/icons/instagram.svg"} />
              <img src={"/icons/youtube.svg"} />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Sections</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Gangnam, Seoul</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+8210 5188 3558</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>hhalimjonov1997@gmail.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>Contact 24 hours</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Copyright Beauty Global, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
